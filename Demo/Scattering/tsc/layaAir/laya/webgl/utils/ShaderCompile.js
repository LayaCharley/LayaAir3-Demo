import { ILaya } from "../../../ILaya";
import { URL } from "../../net/URL";
import { IncludeFile } from "./IncludeFile";
import { ShaderNode } from "./ShaderNode";
;
const _clearCR = new RegExp("\r", "g");
const _removeAnnotation = new RegExp("(/\\*([^*]|[\\r\\\n]|(\\*+([^*/]|[\\r\\n])))*\\*+/)|(//.*)", "g");
const _reg = new RegExp("(\".*\")|('.*')|([#\\w\\*-\\.+/()=<>{}\\\\]+)|([,;:\\\\])", "g");
const _splitToWordExps = new RegExp("[(\".*\")]+|[('.*')]+|([ \\t=\\+\\-*/&%!<>!%\(\),;])", "g");
const _splitToWordExps3 = new RegExp("[ \\t=\\+\\-*/&%!<>!%\(\),;\\|]", "g");
export class ShaderCompile {
    static addInclude(fileName, txt, allowReplace) {
        if (!txt || txt.length === 0) {
            console.error("shader include file err:" + fileName);
            return null;
        }
        if (!allowReplace && ShaderCompile.includes[fileName]) {
            console.warn("shader include file already exists:" + fileName);
            return ShaderCompile.includes[fileName];
        }
        txt = txt.replace(_clearCR, "");
        let file = new IncludeFile(txt);
        ShaderCompile.includes[fileName] = file;
        return file;
    }
    static compile(vs, ps, basePath) {
        let result = {
            vsNode: new ShaderNode([]),
            psNode: new ShaderNode([]),
            includeNames: new Set(),
            defs: new Set()
        };
        let includes = [];
        vs = vs.replace(_clearCR, "");
        ps = ps.replace(_clearCR, "");
        ShaderCompile._compileToTree(result.vsNode, vs, result.defs, includes, basePath);
        ShaderCompile._compileToTree(result.psNode, ps, result.defs, includes, basePath);
        for (let inc of includes) {
            if (inc.file)
                result.includeNames.add(inc.name);
            else
                console.warn(`ShaderCompile missing file ${inc.name}`);
        }
        return result;
    }
    static compileAsync(vs, ps, basePath) {
        let result = {
            vsNode: new ShaderNode([]),
            psNode: new ShaderNode([]),
            includeNames: new Set(),
            defs: new Set()
        };
        let includes = [];
        vs = vs.replace(_clearCR, "");
        ps = ps.replace(_clearCR, "");
        ShaderCompile._compileToTree(result.vsNode, vs, result.defs, includes, basePath);
        ShaderCompile._compileToTree(result.psNode, ps, result.defs, includes, basePath);
        return this._loadIncludesDeep(result, includes, 0);
    }
    static _loadIncludesDeep(result, includes, index) {
        let toLoad;
        let includesCnt = includes.length;
        for (let i = index; i < includesCnt; i++) {
            let inc = includes[i];
            if (inc.file)
                result.includeNames.add(inc.name);
            else {
                if (!toLoad)
                    toLoad = [];
                toLoad.push(inc);
            }
        }
        if (!toLoad)
            return Promise.resolve(result);
        return ILaya.loader.load(toLoad.map(tc => tc.name)).then(files => {
            let cnt = toLoad.length;
            for (let i = 0; i < cnt; i++) {
                let inc = toLoad[i];
                let file = files[i];
                if (!file) {
                    let childs = inc.node.parent.childs;
                    childs.splice(childs.indexOf(inc.node), 1);
                }
                else {
                    result.includeNames.add(inc.name);
                    let text = file.getWith(inc.codeName);
                    if (inc.node.condition)
                        inc.node.text = text;
                    else {
                        ShaderCompile._compileToTree(inc.node, text, result.defs, includes, URL.getPath(inc.name));
                        inc.node.text = "";
                    }
                }
            }
            if (includes.length > includesCnt)
                return ShaderCompile._loadIncludesDeep(result, includes, includesCnt);
            else
                return result;
        });
    }
    static _compileToTree(parent, script, defs, includes, basePath) {
        let node, preNode;
        let text, name, fname;
        let ofs, words;
        let i, n, j;
        let lines = script.split("\n");
        for (i = 0; i < lines.length; i++) {
            text = lines[i];
            if (text.length < 1)
                continue;
            ofs = text.indexOf("//");
            if (ofs === 0)
                continue;
            if (ofs >= 0)
                text = text.substr(0, ofs);
            if ((ofs = text.indexOf("#")) < 0) {
                preNode = parent.childs[parent.childs.length - 1];
                let includefiles = parent.includefiles;
                if (preNode && !preNode.name) {
                    includefiles.length > 0 && IncludeFile.splitToWords(text, preNode);
                    preNode.text += "\n" + text;
                    continue;
                }
                node = new ShaderNode(includefiles);
                node.text = text;
                node.noCompile = true;
                includefiles.length > 0 && IncludeFile.splitToWords(text, node);
                node.setParent(parent);
                continue;
            }
            node = new ShaderNode(parent.includefiles);
            node.text = text;
            node.noCompile = true;
            name = "#";
            for (j = ofs + 1, n = text.length; j < n; j++) {
                let c = text.charAt(j);
                if (c === ' ' || c === '\t' || c === '?')
                    break;
                name += c;
            }
            node.name = name;
            switch (name) {
                case "#ifdef":
                case "#ifndef":
                    node.src = text;
                    node.noCompile = text.match(/[!&|()=<>]/) != null;
                    if (!node.noCompile) {
                        words = text.replace(/^\s*/, '').split(/\s+/);
                        node.setCondition(words[1], name === "#ifdef" ? ShaderCompile.IFDEF_YES : ShaderCompile.IFDEF_ELSE);
                        node.text = node.text;
                    }
                    else {
                        console.log("function():Boolean{return " + text.substr(ofs + node.name.length) + "}");
                    }
                    node.setParent(parent);
                    parent = node;
                    words = text.substr(j).split(_splitToWordExps3);
                    for (j = 0; j < words.length; j++) {
                        text = words[j];
                        text.length && defs.add(text);
                    }
                    break;
                case "#if":
                case "#elif":
                    node.src = text;
                    node.noCompile = true;
                    if (name == "#elif") {
                        parent = parent.parent;
                        preNode = parent.childs[parent.childs.length - 1];
                        preNode.text = preNode.src;
                        preNode.noCompile = true;
                        preNode.condition = null;
                    }
                    node.setParent(parent);
                    parent = node;
                    words = text.substr(j).split(_splitToWordExps3);
                    for (j = 0; j < words.length; j++) {
                        text = words[j];
                        text.length && text != "defined" && defs.add(text);
                    }
                    break;
                case "#else":
                    node.src = text;
                    parent = parent.parent;
                    preNode = parent.childs[parent.childs.length - 1];
                    node.noCompile = preNode.noCompile;
                    if (!node.noCompile) {
                        node.condition = preNode.condition;
                        node.conditionType = preNode.conditionType == ShaderCompile.IFDEF_YES ? ShaderCompile.IFDEF_ELSE : ShaderCompile.IFDEF_YES;
                    }
                    node.setParent(parent);
                    parent = node;
                    break;
                case "#endif":
                    parent = parent.parent;
                    preNode = parent.childs[parent.childs.length - 1];
                    node.noCompile = preNode.noCompile;
                    if (!node.noCompile) {
                        node.text = node.text;
                    }
                    node.setParent(parent);
                    break;
                case "#include":
                    words = IncludeFile.splitToWords(text, null);
                    let includeName = words[1];
                    let includeFile;
                    if (includeName.startsWith("."))
                        includeName = URL.join(basePath, includeName);
                    else if (includeName.startsWith("/"))
                        includeName = URL.formatURL(includeName.substring(1));
                    else {
                        includeFile = ShaderCompile.includes[includeName];
                        if (!includeFile)
                            includeName = "internal/" + includeName;
                    }
                    includeFile = ShaderCompile.includes[includeName];
                    if (!includeFile && ShaderCompile.loadIncludeFileSync) {
                        ShaderCompile.loadIncludeFileSync(includeName);
                        includeFile = ShaderCompile.includes[includeName];
                    }
                    let codeName = words[2] == 'with' ? words[3] : null;
                    includes.push({ name: includeName, codeName: codeName, node: node, file: includeFile });
                    node.setParent(parent);
                    if ((ofs = words[0].indexOf("?")) < 0) {
                        if (includeFile) {
                            text = includeFile.getWith(codeName);
                            this._compileToTree(node, text, defs, includes, URL.getPath(includeName));
                        }
                        node.text = "";
                    }
                    else {
                        node.setCondition(words[0].substr(ofs + 1), ShaderCompile.IFDEF_YES);
                        if (includeFile)
                            node.text = includeFile.getWith(codeName);
                    }
                    break;
                case "#import":
                    words = IncludeFile.splitToWords(text, null);
                    fname = words[1];
                    node.includefiles.push({ node: node, file: ShaderCompile.includes[fname], ofs: node.text.length });
                    break;
                default:
                    node.setParent(parent);
                    break;
            }
        }
    }
}
ShaderCompile.IFDEF_NO = 0;
ShaderCompile.IFDEF_YES = 1;
ShaderCompile.IFDEF_ELSE = 2;
ShaderCompile.IFDEF_PARENT = 3;
ShaderCompile.includes = {};

//# sourceMappingURL=ShaderCompile.js.map
