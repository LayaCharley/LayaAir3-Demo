import { XMLUtils } from "./XMLUtils";
export var XMLTagType;
(function (XMLTagType) {
    XMLTagType[XMLTagType["Start"] = 0] = "Start";
    XMLTagType[XMLTagType["End"] = 1] = "End";
    XMLTagType[XMLTagType["Void"] = 2] = "Void";
    XMLTagType[XMLTagType["CDATA"] = 3] = "CDATA";
    XMLTagType[XMLTagType["Comment"] = 4] = "Comment";
    XMLTagType[XMLTagType["Instruction"] = 5] = "Instruction";
})(XMLTagType || (XMLTagType = {}));
;
const CDATA_START = "<![CDATA[";
const CDATA_END = "]]>";
const COMMENT_START = "<!--";
const COMMENT_END = "-->";
export class XMLIterator {
    static begin(source, lowerCaseName) {
        XMLIterator.source = source;
        XMLIterator.lowerCaseName = lowerCaseName;
        this.sourceLen = source.length;
        this.parsePos = 0;
        this.lastTagEnd = 0;
        this.tagPos = 0;
        this.tagLength = 0;
        this.tagName = null;
    }
    static nextTag() {
        let pos;
        let c;
        let buffer = "";
        this.tagType = XMLTagType.Start;
        this.lastTagEnd = this.parsePos;
        this.attrParsed = false;
        this.lastTagName = this.tagName;
        while ((pos = this.source.indexOf('<', this.parsePos)) != -1) {
            this.parsePos = pos;
            pos++;
            if (pos == this.sourceLen)
                break;
            c = this.source[pos];
            if (c == '!') {
                if (this.sourceLen > pos + 7 && this.source.substring(pos - 1, pos + 8) == CDATA_START) {
                    pos = this.source.indexOf(CDATA_END, pos);
                    this.tagType = XMLTagType.CDATA;
                    this.tagName = "";
                    this.tagPos = this.parsePos;
                    if (pos == -1)
                        this.tagLength = this.sourceLen - this.parsePos;
                    else
                        this.tagLength = pos + 3 - this.parsePos;
                    this.parsePos += this.tagLength;
                    return true;
                }
                else if (this.sourceLen > pos + 2 && this.source.substring(pos - 1, pos + 3) == COMMENT_START) {
                    pos = this.source.indexOf(COMMENT_END, pos);
                    this.tagType = XMLTagType.Comment;
                    this.tagName = "";
                    this.tagPos = this.parsePos;
                    if (pos == -1)
                        this.tagLength = this.sourceLen - this.parsePos;
                    else
                        this.tagLength = pos + 3 - this.parsePos;
                    this.parsePos += this.tagLength;
                    return true;
                }
                else {
                    pos++;
                    this.tagType = XMLTagType.Instruction;
                }
            }
            else if (c == '/') {
                pos++;
                this.tagType = XMLTagType.End;
            }
            else if (c == '?') {
                pos++;
                this.tagType = XMLTagType.Instruction;
            }
            for (; pos < this.sourceLen; pos++) {
                c = this.source[pos];
                if (' \t\n\r\v'.indexOf(c) != -1 || c == '>' || c == '/')
                    break;
            }
            if (pos == this.sourceLen)
                break;
            buffer += this.source.substring(this.parsePos + 1, pos);
            if (buffer.length > 0 && buffer[0] == '/')
                buffer = buffer.substring(1);
            let singleQuoted = false, doubleQuoted = false;
            let possibleEnd = -1;
            for (; pos < this.sourceLen; pos++) {
                c = this.source[pos];
                if (c == '"') {
                    if (!singleQuoted)
                        doubleQuoted = !doubleQuoted;
                }
                else if (c == '\'') {
                    if (!doubleQuoted)
                        singleQuoted = !singleQuoted;
                }
                if (c == '>') {
                    if (!(singleQuoted || doubleQuoted)) {
                        possibleEnd = -1;
                        break;
                    }
                    possibleEnd = pos;
                }
                else if (c == '<')
                    break;
            }
            if (possibleEnd != -1)
                pos = possibleEnd;
            if (pos == this.sourceLen)
                break;
            if (this.source[pos - 1] == '/')
                this.tagType = XMLTagType.Void;
            this.tagName = buffer;
            if (this.lowerCaseName)
                this.tagName = this.tagName.toLowerCase();
            this.tagPos = this.parsePos;
            this.tagLength = pos + 1 - this.parsePos;
            this.parsePos += this.tagLength;
            return true;
        }
        this.tagPos = this.sourceLen;
        this.tagLength = 0;
        this.tagName = null;
        return false;
    }
    static getTagSource() {
        return this.source.substring(this.tagPos, this.tagPos + this.tagLength);
    }
    static getRawText(trim) {
        if (this.lastTagEnd == this.tagPos)
            return "";
        else if (trim) {
            let i = this.lastTagEnd;
            for (; i < this.tagPos; i++) {
                let c = this.source[i];
                if (' \t\n\r\v'.indexOf(c) == -1)
                    break;
            }
            if (i == this.tagPos)
                return "";
            else
                return this.source.substring(i, this.tagPos).trim();
        }
        else
            return this.source.substring(this.lastTagEnd, this.tagPos);
    }
    static getText(trim) {
        if (this.lastTagEnd == this.tagPos)
            return "";
        else if (trim) {
            let i = this.lastTagEnd;
            for (; i < this.tagPos; i++) {
                let c = this.source[i];
                if (' \t\n\r\v'.indexOf(c) == -1)
                    break;
            }
            if (i == this.tagPos)
                return "";
            else
                return XMLUtils.decodeString(this.source.substring(i, this.tagPos)).trimEnd();
        }
        else
            return XMLUtils.decodeString(this.source.substring(this.lastTagEnd, this.tagPos));
    }
    static get attributes() {
        if (!this.attrParsed) {
            for (let key in this._attrs) {
                delete this._attrs[key];
            }
            this.parseAttributes(this._attrs);
            this.attrParsed = true;
        }
        return this._attrs;
    }
    static getAttribute(attrName) {
        return this.attributes[attrName];
    }
    static parseAttributes(attrs) {
        let attrName;
        let valueStart = 0;
        let valueEnd = 0;
        let waitValue = false;
        let quoted = 0;
        let buffer = "";
        let i = this.tagPos;
        let attrEnd = this.tagPos + this.tagLength;
        if (i < attrEnd && this.source[i] == '<') {
            for (; i < attrEnd; i++) {
                let c = this.source[i];
                if (' \t\n\r\v'.indexOf(c) != -1 || c == '>' || c == '/')
                    break;
            }
        }
        for (; i < attrEnd; i++) {
            let c = this.source[i];
            if (c == '=') {
                valueStart = -1;
                valueEnd = -1;
                quoted = 0;
                for (let j = i + 1; j < attrEnd; j++) {
                    let c2 = this.source[j];
                    if (' \t\n\r\v'.indexOf(c2) != -1) {
                        if (valueStart != -1 && quoted == 0) {
                            valueEnd = j - 1;
                            break;
                        }
                    }
                    else if (c2 == '>') {
                        if (quoted == 0) {
                            valueEnd = j - 1;
                            break;
                        }
                    }
                    else if (c2 == '"') {
                        if (valueStart != -1) {
                            if (quoted != 1) {
                                valueEnd = j - 1;
                                break;
                            }
                        }
                        else {
                            quoted = 2;
                            valueStart = j + 1;
                        }
                    }
                    else if (c2 == '\'') {
                        if (valueStart != -1) {
                            if (quoted != 2) {
                                valueEnd = j - 1;
                                break;
                            }
                        }
                        else {
                            quoted = 1;
                            valueStart = j + 1;
                        }
                    }
                    else if (valueStart == -1) {
                        valueStart = j;
                    }
                }
                if (valueStart != -1 && valueEnd != -1) {
                    attrName = buffer;
                    if (this.lowerCaseName)
                        attrName = attrName.toLowerCase();
                    buffer = "";
                    attrs[attrName] = XMLUtils.decodeString(this.source.substring(valueStart, valueEnd + 1));
                    i = valueEnd + 1;
                }
                else
                    break;
            }
            else if (' \t\n\r\v'.indexOf(c) == -1) {
                if (waitValue || c == '/' || c == '>') {
                    if (buffer.length > 0) {
                        attrName = buffer;
                        if (this.lowerCaseName)
                            attrName = attrName.toLowerCase();
                        attrs[attrName] = "";
                        buffer = "";
                    }
                    waitValue = false;
                }
                if (c != '/' && c != '>')
                    buffer += c;
            }
            else {
                if (buffer.length > 0)
                    waitValue = true;
            }
        }
    }
}
XMLIterator._attrs = {};
if (!String.prototype.trimEnd) {
    String.prototype.trimEnd = function () {
        return this.replace(/\s+$/g, "");
    };
}

//# sourceMappingURL=XMLIterator.js.map
