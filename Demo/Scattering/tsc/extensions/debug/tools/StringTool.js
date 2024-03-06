export class StringTool {
    constructor() {
    }
    static toUpCase(str) {
        return str.toUpperCase();
    }
    static toLowCase(str) {
        return str.toLowerCase();
    }
    static toUpHead(str) {
        var rst;
        if (str.length <= 1)
            return str.toUpperCase();
        rst = str.charAt(0).toUpperCase() + str.substr(1);
        return rst;
    }
    static toLowHead(str) {
        var rst;
        if (str.length <= 1)
            return str.toLowerCase();
        rst = str.charAt(0).toLowerCase() + str.substr(1);
        return rst;
    }
    static packageToFolderPath(packageName) {
        var rst;
        rst = packageName.replace(".", "/");
        return rst;
    }
    static insert(str, iStr, index) {
        return str.substring(0, index) + iStr + str.substr(index);
    }
    static insertAfter(str, iStr, tarStr, isLast = false) {
        var i;
        if (isLast) {
            i = str.lastIndexOf(tarStr);
        }
        else {
            i = str.indexOf(tarStr);
        }
        if (i >= 0) {
            return StringTool.insert(str, iStr, i + tarStr.length);
        }
        return str;
    }
    static insertBefore(str, iStr, tarStr, isLast = false) {
        var i;
        if (isLast) {
            i = str.lastIndexOf(tarStr);
        }
        else {
            i = str.indexOf(tarStr);
        }
        if (i >= 0) {
            return StringTool.insert(str, iStr, i);
        }
        return str;
    }
    static insertParamToFun(funStr, params) {
        var oldParam;
        oldParam = StringTool.getParamArr(funStr);
        var inserStr;
        inserStr = params.join(",");
        if (oldParam.length > 0) {
            inserStr = "," + inserStr;
        }
        return StringTool.insertBefore(funStr, inserStr, ")", true);
    }
    static trim(str, vList = null) {
        if (!vList) {
            vList = [" ", "\r", "\n", "\t", String.fromCharCode(65279)];
        }
        var rst;
        var i;
        var len;
        rst = str;
        len = vList.length;
        for (i = 0; i < len; i++) {
            rst = StringTool.getReplace(rst, vList[i], "");
        }
        return rst;
    }
    static isEmpty(str) {
        if (str.length < 1)
            return true;
        return StringTool.emptyStrDic.hasOwnProperty(str);
    }
    static trimLeft(str) {
        var i;
        i = 0;
        var len;
        len = str.length;
        while (StringTool.isEmpty(str.charAt(i)) && i < len) {
            i++;
        }
        if (i < len) {
            return str.substr(i);
        }
        return "";
    }
    static trimRight(str) {
        var i;
        i = str.length - 1;
        while (StringTool.isEmpty(str.charAt(i)) && i >= 0) {
            i--;
        }
        var rst;
        rst = str.substring(0, i);
        if (i >= 0) {
            return str.substring(0, i + 1);
        }
        return "";
    }
    static trimSide(str) {
        var rst;
        rst = StringTool.trimLeft(str);
        rst = StringTool.trimRight(rst);
        return rst;
    }
    static isOkFileName(fileName) {
        if (StringTool.trimSide(fileName) == "")
            return false;
        var i, len;
        len = fileName.length;
        for (i = 0; i < len; i++) {
            if (StringTool.specialChars[fileName.charAt(i)])
                return false;
        }
        return true;
    }
    static trimButEmpty(str) {
        return StringTool.trim(str, ["\r", "\n", "\t"]);
    }
    static removeEmptyStr(strArr) {
        var i;
        i = strArr.length - 1;
        var str;
        for (i = i; i >= 0; i--) {
            str = strArr[i];
            str = StringTool.trimSide(str);
            if (StringTool.isEmpty(str)) {
                strArr.splice(i, 1);
            }
            else {
                strArr[i] = str;
            }
        }
        return strArr;
    }
    static ifNoAddToTail(str, sign) {
        if (str.indexOf(sign) >= 0) {
            return str;
        }
        return str + sign;
    }
    static trimEmptyLine(str) {
        var i;
        var len;
        var tLines;
        var tLine;
        tLines = str.split("\n");
        for (i = tLines.length - 1; i >= 0; i--) {
            tLine = tLines[i];
            if (StringTool.isEmptyLine(tLine)) {
                tLines.splice(i, 1);
            }
        }
        return tLines.join("\n");
    }
    static isEmptyLine(str) {
        str = StringTool.trim(str);
        if (str == "")
            return true;
        return false;
    }
    static removeCommentLine(lines) {
        var rst;
        rst = [];
        var i;
        var tLine;
        var adptLine;
        i = 0;
        var len;
        var index;
        len = lines.length;
        while (i < len) {
            adptLine = tLine = lines[i];
            index = tLine.indexOf("/**");
            if (index >= 0) {
                adptLine = tLine.substring(0, index - 1);
                StringTool.addIfNotEmpty(rst, adptLine);
                while (i < len) {
                    tLine = lines[i];
                    index = tLine.indexOf("*/");
                    if (index >= 0) {
                        adptLine = tLine.substring(index + 2);
                        StringTool.addIfNotEmpty(rst, adptLine);
                        break;
                    }
                    i++;
                }
            }
            else if (tLine.indexOf("//") >= 0) {
                if (StringTool.trim(tLine).indexOf("//") == 0) {
                }
                else {
                    StringTool.addIfNotEmpty(rst, adptLine);
                }
            }
            else {
                StringTool.addIfNotEmpty(rst, adptLine);
            }
            i++;
        }
        return rst;
    }
    static addIfNotEmpty(arr, str) {
        if (!str)
            return;
        var tStr;
        tStr = StringTool.trim(str);
        if (tStr != "") {
            arr.push(str);
        }
    }
    static trimExt(str, vars) {
        var rst;
        rst = StringTool.trim(str);
        var i;
        var len;
        len = vars.length;
        for (i = 0; i < len; i++) {
            rst = StringTool.getReplace(rst, vars[i], "");
        }
        return rst;
    }
    static getBetween(str, left, right, ifMax = false) {
        if (!str)
            return "";
        if (!left)
            return "";
        if (!right)
            return "";
        var lId;
        var rId;
        lId = str.indexOf(left);
        if (lId < 0)
            return "";
        if (ifMax) {
            rId = str.lastIndexOf(right);
            if (rId < lId)
                return "";
        }
        else {
            rId = str.indexOf(right, lId + 1);
        }
        if (rId < 0)
            return "";
        return str.substring(lId + left.length, rId);
    }
    static getSplitLine(line, split = " ") {
        return line.split(split);
    }
    static getLeft(str, sign) {
        var i;
        i = str.indexOf(sign);
        return str.substr(0, i);
    }
    static getRight(str, sign) {
        var i;
        i = str.indexOf(sign);
        return str.substr(i + 1);
    }
    static delelteItem(arr) {
        while (arr.length > 0) {
            if (arr[0] == "") {
                arr.shift();
            }
            else {
                break;
            }
        }
    }
    static getWords(line) {
        var rst = StringTool.getSplitLine(line);
        StringTool.delelteItem(rst);
        return rst;
    }
    static getLinesI(startLine, endLine, lines) {
        var i;
        var rst = [];
        for (i = startLine; i <= endLine; i++) {
            rst.push(lines[i]);
        }
        return rst;
    }
    static structfy(str, inWidth = 4, removeEmpty = true) {
        if (removeEmpty) {
            str = StringTool.trimEmptyLine(str);
        }
        var lines;
        var tIn;
        tIn = 0;
        var tInStr;
        tInStr = StringTool.getEmptyStr(0);
        lines = str.split("\n");
        var i;
        var len;
        var tLineStr;
        len = lines.length;
        for (i = 0; i < len; i++) {
            tLineStr = lines[i];
            tLineStr = StringTool.trimLeft(tLineStr);
            tLineStr = StringTool.trimRight(tLineStr);
            tIn += StringTool.getPariCount(tLineStr);
            if (tLineStr.indexOf("}") >= 0) {
                tInStr = StringTool.getEmptyStr(tIn * inWidth);
            }
            tLineStr = tInStr + tLineStr;
            lines[i] = tLineStr;
            tInStr = StringTool.getEmptyStr(tIn * inWidth);
        }
        return lines.join("\n");
    }
    static getEmptyStr(width) {
        if (!StringTool.emptyDic.hasOwnProperty(width)) {
            var i;
            var len;
            len = width;
            var rst;
            rst = "";
            for (i = 0; i < len; i++) {
                rst += " ";
            }
            StringTool.emptyDic[width] = rst;
        }
        return StringTool.emptyDic[width];
    }
    static getPariCount(str, inChar = "{", outChar = "}") {
        var varDic;
        varDic = {};
        varDic[inChar] = 1;
        varDic[outChar] = -1;
        var i;
        var len;
        var tChar;
        len = str.length;
        var rst;
        rst = 0;
        for (i = 0; i < len; i++) {
            tChar = str.charAt(i);
            if (varDic.hasOwnProperty(tChar)) {
                rst += varDic[tChar];
            }
        }
        return rst;
    }
    static readInt(str, startI = 0) {
        var rst;
        rst = 0;
        var tNum;
        var tC;
        var i;
        var isBegin;
        isBegin = false;
        var len;
        len = str.length;
        for (i = startI; i < len; i++) {
            tC = str.charAt(i);
            if (Number(tC) > 0 || tC == "0") {
                rst = 10 * rst + Number(tC);
                if (rst > 0)
                    isBegin = true;
            }
            else {
                if (isBegin)
                    return rst;
            }
        }
        return rst;
    }
    static getReplace(str, oStr, nStr) {
        if (!str)
            return "";
        var rst;
        rst = str.replace(new RegExp(oStr, "g"), nStr);
        return rst;
    }
    static getWordCount(str, findWord) {
        var rg = new RegExp(findWord, "g");
        return str.match(rg).length;
    }
    static getResolvePath(path, basePath) {
        if (StringTool.isAbsPath(path)) {
            return path;
        }
        var tSign;
        tSign = "\\";
        if (basePath.indexOf("/") >= 0) {
            tSign = "/";
        }
        if (basePath.charAt(basePath.length - 1) == tSign) {
            basePath = basePath.substr(0, basePath.length - 1);
        }
        var parentSign;
        parentSign = ".." + tSign;
        var tISign;
        tISign = "." + tSign;
        var pCount;
        pCount = StringTool.getWordCount(path, parentSign);
        path = StringTool.getReplace(path, parentSign, "");
        path = StringTool.getReplace(path, tISign, "");
        var i;
        var len;
        len = pCount;
        var iPos;
        for (i = 0; i < len; i++) {
            basePath = StringTool.removeLastSign(path, tSign);
        }
        return basePath + tSign + path;
    }
    static isAbsPath(path) {
        if (path.indexOf(":") >= 0)
            return true;
        return false;
    }
    static removeLastSign(str, sign) {
        var iPos;
        iPos = str.lastIndexOf(sign);
        str = str.substring(0, iPos);
        return str;
    }
    static getParamArr(str) {
        var paramStr;
        paramStr = StringTool.getBetween(str, "(", ")", true);
        if (StringTool.trim(paramStr).length < 1)
            return [];
        return paramStr.split(",");
    }
    static copyStr(str) {
        return str.substring(0);
    }
    static ArrayToString(arr) {
        var rst;
        rst = "[{items}]".replace(new RegExp("\\{items\\}", "g"), StringTool.getArrayItems(arr));
        return rst;
    }
    static getArrayItems(arr) {
        var rst;
        if (arr.length < 1)
            return "";
        rst = StringTool.parseItem(arr[0]);
        var i;
        var len;
        len = arr.length;
        for (i = 1; i < len; i++) {
            rst += "," + StringTool.parseItem(arr[i]);
        }
        return rst;
    }
    static parseItem(item) {
        var rst;
        rst = "\"" + item + "\"";
        return "";
    }
    static initAlphaSign() {
        if (StringTool.alphaSigns)
            return;
        StringTool.alphaSigns = {};
        StringTool.addSign("a", "z", StringTool.alphaSigns);
        StringTool.addSign("A", "Z", StringTool.alphaSigns);
        StringTool.addSign("0", "9", StringTool.alphaSigns);
    }
    static addSign(ss, e, tar) {
        var i;
        var len;
        var s;
        s = ss.charCodeAt(0);
        len = e.charCodeAt(0);
        for (i = s; i <= len; i++) {
            tar[String.fromCharCode(i)] = true;
            console.log("add :" + String.fromCharCode(i));
        }
    }
    static isPureAlphaNum(str) {
        StringTool.initAlphaSign();
        if (!str)
            return true;
        var i, len;
        len = str.length;
        for (i = 0; i < len; i++) {
            if (!StringTool.alphaSigns[str.charAt(i)])
                return false;
        }
        return true;
    }
}
StringTool.emptyStrDic = {
    " ": true,
    "\r": true,
    "\n": true,
    "\t": true
};
StringTool.specialChars = { "*": true, "&": true, "%": true, "#": true, "?": true };
StringTool.emptyDic = {};
StringTool.alphaSigns = null;
