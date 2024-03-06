export class IncludeFile {
    constructor(txt) {
        this.codes = {};
        this.funs = {};
        this.curUseID = -1;
        this.funnames = "";
        this.script = txt;
        var begin = 0, ofs, end;
        while (true) {
            begin = txt.indexOf("#begin", begin);
            if (begin < 0)
                break;
            end = begin + 5;
            while (true) {
                end = txt.indexOf("#end", end);
                if (end < 0)
                    break;
                if (txt.charAt(end + 4) === 'i')
                    end += 5;
                else
                    break;
            }
            if (end < 0) {
                throw "add include err,no #end:" + txt;
            }
            ofs = txt.indexOf('\n', begin);
            var words = IncludeFile.splitToWords(txt.substr(begin, ofs - begin), null);
            if (words[1] == 'code') {
                this.codes[words[2]] = txt.substr(ofs + 1, end - ofs - 1);
            }
            else if (words[1] == 'function') {
                ofs = txt.indexOf("function", begin);
                ofs += "function".length;
                this.funs[words[3]] = txt.substr(ofs + 1, end - ofs - 1);
                this.funnames += words[3] + ";";
            }
            begin = end + 1;
        }
    }
    static splitToWords(str, block) {
        var out = [];
        var c;
        var ofs = -1;
        var word;
        for (var i = 0, n = str.length; i < n; i++) {
            c = str.charAt(i);
            if (" \t=+-*/&%!<>()'\",;".indexOf(c) >= 0) {
                if (ofs >= 0 && (i - ofs) > 1) {
                    word = str.substr(ofs, i - ofs);
                    out.push(word);
                }
                if (c == '"' || c == "'") {
                    var ofs2 = str.indexOf(c, i + 1);
                    if (ofs2 < 0) {
                        throw "Sharder err:" + str;
                    }
                    out.push(str.substr(i + 1, ofs2 - i - 1));
                    i = ofs2;
                    ofs = -1;
                    continue;
                }
                if (c == '(' && block && out.length > 0) {
                    word = out[out.length - 1] + ";";
                    if ("vec4;main;".indexOf(word) < 0)
                        block.useFuns += word;
                }
                ofs = -1;
                continue;
            }
            if (ofs < 0)
                ofs = i;
        }
        if (ofs < n && (n - ofs) > 1) {
            word = str.substr(ofs, n - ofs);
            out.push(word);
        }
        return out;
    }
    getWith(name = null) {
        var r = name ? this.codes[name] : this.script;
        if (!r) {
            throw "get with error:" + name;
        }
        return r;
    }
    getFunsScript(funsdef) {
        var r = "";
        for (var i in this.funs) {
            if (funsdef.indexOf(i + ";") >= 0) {
                r += this.funs[i];
            }
        }
        return r;
    }
}

//# sourceMappingURL=IncludeFile.js.map
