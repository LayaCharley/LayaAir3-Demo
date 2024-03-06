export class JsonTool {
    constructor() {
        this.meta = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        };
    }
    static getJsonString(obj, singleLine = true, split = "\n", depth = 0, Width = 4) {
        var preStr = "";
        preStr = JsonTool.getEmptyStr(depth * Width);
        var rst;
        var keyValues;
        keyValues = {};
        var tKey;
        var tValue;
        var type;
        var keys;
        keys = [];
        for (tKey in obj) {
            keys.push(tKey);
            tValue = obj[tKey];
            if (JsonTool.singleLineKey[tKey]) {
                keyValues[tKey] = JsonTool.getValueStr(tValue, true, split, depth + 1, Width);
            }
            else {
                keyValues[tKey] = JsonTool.getValueStr(tValue, singleLine, split, depth + 1, Width);
            }
        }
        var i, len;
        len = keys.length;
        keys.sort();
        keys = keys.reverse();
        var keyPreStr;
        keyPreStr = JsonTool.getEmptyStr((depth + 1) * Width);
        if (singleLine) {
            split = "";
            preStr = "";
            keyPreStr = "";
        }
        var keyValueStrArr;
        keyValueStrArr = [];
        for (i = 0; i < len; i++) {
            tKey = keys[i];
            keyValueStrArr.push(keyPreStr + JsonTool.wrapValue(tKey) + ":" + keyValues[tKey]);
        }
        rst = "{" + split + keyValueStrArr.join("," + split) + split + preStr + "}";
        return rst;
    }
    static wrapValue(value, wraper = "\"") {
        return wraper + value + wraper;
    }
    static getArrStr(arr, singleLine = true, split = "\n", depth = 0, Width = 4) {
        var rst;
        var i, len;
        len = arr.length;
        var valueStrArr;
        valueStrArr = [];
        for (i = 0; i < len; i++) {
            valueStrArr.push(JsonTool.getValueStr(arr[i], singleLine, split, depth + 1, Width));
        }
        var preStr = "";
        preStr = JsonTool.getEmptyStr((depth + 1) * Width);
        if (singleLine) {
            split = "";
            preStr = "";
        }
        rst = "[" + split + preStr + valueStrArr.join("," + split + preStr) + "]";
        return rst;
    }
    static quote(string) {
        JsonTool.escapable.lastIndex = 0;
        return JsonTool.escapable.test(string) ? '"' + string.replace(JsonTool.escapable, function (a) {
            var c = this.meta[a];
            return typeof c === 'string' ? c :
                '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }
    static getValueStr(tValue, singleLine = true, split = "\n", depth = 0, Width = 0) {
        var rst;
        if (typeof (tValue) == 'string') {
            rst = JsonTool.quote(tValue);
        }
        else if (tValue == null) {
            rst = "null";
        }
        else if (typeof (tValue) == 'number' || typeof (tValue) == 'number' || tValue instanceof Boolean) {
            rst = tValue;
        }
        else if (tValue instanceof Array) {
            rst = JsonTool.getArrStr(tValue, singleLine, split, depth, Width);
        }
        else if (typeof (tValue) == 'object') {
            rst = JsonTool.getJsonString(tValue, singleLine, split, depth, Width);
        }
        else {
            rst = tValue;
        }
        return rst;
    }
    static getEmptyStr(width) {
        if (!JsonTool.emptyDic.hasOwnProperty(width)) {
            var i;
            var len;
            len = width;
            var rst;
            rst = "";
            for (i = 0; i < len; i++) {
                rst += " ";
            }
            JsonTool.emptyDic[width] = rst;
        }
        return JsonTool.emptyDic[width];
    }
}
JsonTool.singleLineKey = {
    "props": true
};
JsonTool.escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
JsonTool.emptyDic = {};
