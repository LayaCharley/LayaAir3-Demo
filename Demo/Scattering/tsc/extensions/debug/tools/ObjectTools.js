import { StringTool } from "./StringTool";
export class ObjectTools {
    constructor() {
    }
    static getFlatKey(tKey, aKey) {
        if (tKey == "")
            return aKey;
        return tKey + ObjectTools.sign + aKey;
    }
    static flatObj(obj, rst = null, tKey = "") {
        rst = rst ? rst : {};
        var key;
        var tValue;
        for (key in obj) {
            if (obj[key] instanceof Object) {
                ObjectTools.flatObj(obj[key], rst, ObjectTools.getFlatKey(tKey, key));
            }
            else {
                tValue = obj[key];
                rst[ObjectTools.getFlatKey(tKey, key)] = obj[key];
            }
        }
        return rst;
    }
    static recoverObj(obj) {
        var rst = {};
        var tKey;
        for (tKey in obj) {
            ObjectTools.setKeyValue(rst, tKey, obj[tKey]);
        }
        return rst;
    }
    static differ(objA, objB) {
        var tKey;
        var valueA;
        var valueB;
        objA = ObjectTools.flatObj(objA);
        objB = ObjectTools.flatObj(objB);
        var rst = {};
        for (tKey in objA) {
            if (!objB.hasOwnProperty(tKey)) {
                rst[tKey] = "被删除";
            }
        }
        for (tKey in objB) {
            if (objB[tKey] != objA[tKey]) {
                rst[tKey] = { "pre": objA[tKey], "now": objB[tKey] };
            }
        }
        return rst;
    }
    static traceDifferObj(obj) {
        var key;
        var tO;
        for (key in obj) {
            if (obj[key] instanceof String) {
                console.log(key + ":", obj[key]);
            }
            else {
                tO = obj[key];
                console.log(key + ":", "now:", tO["now"], "pre:", tO["pre"]);
            }
        }
    }
    static setKeyValue(obj, flatKey, value) {
        if (flatKey.indexOf(ObjectTools.sign) >= 0) {
            var keys = flatKey.split(ObjectTools.sign);
            var tKey;
            while (keys.length > 1) {
                tKey = keys.shift();
                if (!obj[tKey]) {
                    obj[tKey] = {};
                    console.log("addKeyObj:", tKey);
                }
                obj = obj[tKey];
                if (!obj) {
                    console.log("wrong flatKey:", flatKey);
                    return;
                }
            }
            obj[keys.shift()] = value;
        }
        else {
            obj[flatKey] = value;
        }
    }
    static clearObj(obj) {
        var key;
        for (key in obj) {
            delete obj[key];
        }
    }
    static copyObjFast(obj) {
        var jsStr;
        jsStr = ObjectTools.getJsonString(obj);
        return ObjectTools.getObj(jsStr);
    }
    static copyObj(obj) {
        if (obj instanceof Array)
            return ObjectTools.copyArr(obj);
        var rst = {};
        var key;
        for (key in obj) {
            if (obj[key] === null || obj[key] === undefined) {
                rst[key] = obj[key];
            }
            else if (obj[key] instanceof Array) {
                rst[key] = ObjectTools.copyArr(obj[key]);
            }
            else if (obj[key] instanceof Object) {
                rst[key] = ObjectTools.copyObj(obj[key]);
            }
            else {
                rst[key] = obj[key];
            }
        }
        return rst;
    }
    static copyArr(arr) {
        var rst;
        rst = [];
        var i, len;
        len = arr.length;
        for (i = 0; i < len; i++) {
            rst.push(ObjectTools.copyObj(arr[i]));
        }
        return rst;
    }
    static concatArr(src, a) {
        if (!a)
            return src;
        if (!src)
            return a;
        var i, len = a.length;
        for (i = 0; i < len; i++) {
            src.push(a[i]);
        }
        return src;
    }
    static insertArrToArr(src, insertArr, pos = 0) {
        if (pos < 0)
            pos = 0;
        if (pos > src.length)
            pos = src.length;
        var preLen = src.length;
        var i, len;
        src.length += insertArr.length;
        var moveLen;
        moveLen = insertArr.length;
        for (i = src.length - 1; i >= pos; i--) {
            src[i] = src[i - moveLen];
        }
        len = insertArr.length;
        for (i = 0; i < len; i++) {
            src[pos + i] = insertArr[i];
        }
        return src;
    }
    static clearArr(arr) {
        if (!arr)
            return arr;
        arr.length = 0;
        return arr;
    }
    static removeFromArr(arr, item) {
        var i, len;
        len = arr.length;
        for (i = 0; i < len; i++) {
            if (arr[i] == item) {
                arr[i].splice(i, 1);
                return;
            }
        }
    }
    static setValueArr(src, v) {
        src || (src = []);
        src.length = 0;
        return ObjectTools.concatArr(src, v);
    }
    static getFrom(rst, src, count) {
        var i;
        for (i = 0; i < count; i++) {
            rst.push(src[i]);
        }
        return rst;
    }
    static getFromR(rst, src, count) {
        var i;
        for (i = 0; i < count; i++) {
            rst.push(src.pop());
        }
        return rst;
    }
    static enableDisplayTree(dis) {
        while (dis) {
            dis.mouseEnabled = true;
            dis = dis.parent;
        }
    }
    static getJsonString(obj) {
        var rst;
        rst = JSON.stringify(obj);
        return rst;
    }
    static getObj(jsonStr) {
        var rst;
        rst = JSON.parse(jsonStr);
        return rst;
    }
    static getKeyArr(obj) {
        var rst;
        var key;
        rst = [];
        for (key in obj) {
            rst.push(key);
        }
        return rst;
    }
    static getObjValues(dataList, key) {
        var rst;
        var i, len;
        len = dataList.length;
        rst = [];
        for (i = 0; i < len; i++) {
            rst.push(dataList[i][key]);
        }
        return rst;
    }
    static hasKeys(obj, keys) {
        var i, len;
        len = keys.length;
        for (i = 0; i < len; i++) {
            if (!obj.hasOwnProperty(keys[i]))
                return false;
        }
        return true;
    }
    static copyValueByArr(tar, src, keys) {
        var i, len = keys.length;
        for (i = 0; i < len; i++) {
            if (!(src[keys[i]] === null))
                tar[keys[i]] = src[keys[i]];
        }
    }
    static getNoSameArr(arr) {
        var i, len;
        var rst;
        rst = [];
        var tItem;
        len = arr.length;
        for (i = 0; i < len; i++) {
            tItem = arr[i];
            if (rst.indexOf(tItem) < 0) {
                rst.push(tItem);
            }
        }
        return rst;
    }
    static insertValue(tar, src) {
        var key;
        for (key in src) {
            tar[key] = src[key];
        }
    }
    static replaceValue(obj, replaceO) {
        var key;
        for (key in obj) {
            if (replaceO.hasOwnProperty(obj[key])) {
                obj[key] = replaceO[obj[key]];
            }
            if (obj[key] instanceof Object) {
                ObjectTools.replaceValue(obj[key], replaceO);
            }
        }
    }
    static setKeyValues(items, key, value) {
        var i, len;
        len = items.length;
        for (i = 0; i < len; i++) {
            items[i][key] = value;
        }
    }
    static findItemPos(items, sign, value) {
        var i, len;
        len = items.length;
        for (i = 0; i < len; i++) {
            if (items[i][sign] == value) {
                return i;
            }
        }
        return -1;
    }
    static setObjValue(obj, key, value) {
        obj[key] = value;
        return obj;
    }
    static setAutoTypeValue(obj, key, value) {
        if (obj.hasOwnProperty(key)) {
            if (ObjectTools.isNumber(obj[key])) {
                obj[key] = parseFloat(value);
            }
            else {
                obj[key] = value;
            }
        }
        else {
            obj[key] = value;
        }
        return obj;
    }
    static getAutoValue(value) {
        var tFloat = parseFloat(value);
        if (typeof (value) == "string") {
            if (tFloat + "" === StringTool.trimSide(value))
                return tFloat;
        }
        return value;
    }
    static isNumber(value) {
        return (parseFloat(value) == value);
    }
    static isNaNS(value) {
        return (value.toString() == "NaN");
    }
    static isNaN(value) {
        if (typeof (value) == "number")
            return false;
        if (typeof (value) == "string") {
            if (parseFloat(value).toString() != "NaN") {
                return false;
            }
        }
        return true;
    }
    static getStrTypedValue(value) {
        if (value == "false") {
            return false;
        }
        else if (value == "true") {
            return true;
        }
        else if (value == "null") {
            return null;
        }
        else if (value == "undefined") {
            return null;
        }
        else {
            return ObjectTools.getAutoValue(value);
        }
    }
    static createKeyValueDic(dataList, keySign) {
        var rst;
        rst = {};
        var i, len;
        len = dataList.length;
        var tItem;
        var tKey;
        for (i = 0; i < len; i++) {
            tItem = dataList[i];
            tKey = tItem[keySign];
            rst[tKey] = tItem;
        }
        return rst;
    }
}
ObjectTools.sign = "_";
