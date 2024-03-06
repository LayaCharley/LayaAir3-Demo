import { ClassTool } from "./ClassTool";
import { IDTools } from "./IDTools";
import { ObjectTools } from "./ObjectTools";
import { FunHook } from "./hook/FunHook";
import { MathUtil } from "laya/maths/MathUtil";
export class GetSetProfile {
    static removeNoDisplayKeys(arr) {
        var i;
        for (i = arr.length - 1; i >= 0; i--) {
            if (GetSetProfile.noDisplayKeys[arr[i]]) {
                arr.splice(i, 1);
            }
        }
    }
    static getClassCount(className) {
        return GetSetProfile.countDic[className];
    }
    static addClassCount(className) {
        if (!GetSetProfile.countDic[className]) {
            GetSetProfile.countDic[className] = 1;
        }
        else {
            GetSetProfile.countDic[className] = GetSetProfile.countDic[className] + 1;
        }
    }
    static init() {
        if (GetSetProfile._inited)
            return;
        GetSetProfile._inited = true;
        var createFun = function (sp) {
            GetSetProfile.classCreated(sp);
        };
        FunHook.hook(Node, "call", null, createFun);
        GetSetProfile.handlerO = {};
        GetSetProfile.handlerO["get"] = function (target, key, receiver) {
            console.log("get", target, key, receiver);
            return Reflect.get(target, key, receiver);
        };
        GetSetProfile.handlerO["set"] = function (target, key, value, receiver) {
            console.log("set", target, key, value, receiver);
            return Reflect.set(target, key, value, receiver);
        };
    }
    static classCreated(obj, oClas = null) {
        if (GetSetProfile.fromMe)
            return;
        var className;
        className = ClassTool.getClassName(obj);
        GetSetProfile.addClassCount(className);
        GetSetProfile.addClassCount(GetSetProfile.ALL);
        IDTools.idObj(obj);
        var classDes;
        classDes = GetSetProfile.hookClassDic[className];
        if (!classDes) {
            GetSetProfile.profileClass(obj["constructor"]);
            classDes = GetSetProfile.hookClassDic[className];
            if (!classDes)
                return;
        }
        GetSetProfile.hookObj2(obj, classDes);
    }
    static hookObj(obj, keys) {
        var handler = GetSetProfile.handlerO;
        new Proxy(obj, handler);
    }
    static hookObj2(obj, keys) {
        var i, len;
        len = keys.length;
        for (i = 0; i < len; i++) {
            GetSetProfile.hookVar(obj, keys[i]);
        }
    }
    static profileClass(clz) {
        var className;
        className = ClassTool.getClassName(clz);
        GetSetProfile.fromMe = true;
        var tO = new clz();
        GetSetProfile.fromMe = false;
        var keys;
        keys = ClassTool.getObjectDisplayAbleKeys(tO);
        keys = ObjectTools.getNoSameArr(keys);
        var i, len;
        len = keys.length;
        var tV;
        var key;
        for (i = len - 1; i >= 0; i--) {
            key = keys[i];
            tV = tO[key];
            if (tV instanceof Function) {
                keys.splice(i, 1);
            }
        }
        len = keys.length;
        GetSetProfile.removeNoDisplayKeys(keys);
        GetSetProfile.hookClassDic[className] = keys;
    }
    static hookPrototype(tO, key) {
        console.log("hook:", key);
        try {
            GetSetProfile.hookVar(tO, key);
        }
        catch (e) {
            console.log("fail", key);
        }
    }
    static reportCall(obj, name, type) {
        IDTools.idObj(obj);
        var objID;
        objID = IDTools.getObjID(obj);
        var className;
        className = ClassTool.getClassName(obj);
        GetSetProfile.recordInfo(className, name, type, objID);
        GetSetProfile.recordInfo(GetSetProfile.ALL, name, type, objID);
    }
    static recordInfo(className, name, type, objID) {
        var propCallsDic;
        if (!GetSetProfile.infoDic[className]) {
            GetSetProfile.infoDic[className] = {};
        }
        propCallsDic = GetSetProfile.infoDic[className];
        var propCalls;
        if (!propCallsDic[name]) {
            propCallsDic[name] = {};
        }
        propCalls = propCallsDic[name];
        var propCallO;
        if (!propCalls[type]) {
            propCalls[type] = {};
        }
        propCallO = propCalls[type];
        if (!propCallO[objID]) {
            propCallO[objID] = 1;
            if (!propCallO["objCount"]) {
                propCallO["objCount"] = 1;
            }
            else {
                propCallO["objCount"] = propCallO["objCount"] + 1;
            }
        }
        else {
            propCallO[objID] = propCallO[objID] + 1;
        }
        if (!propCallO["count"]) {
            propCallO["count"] = 1;
        }
        else {
            propCallO["count"] = propCallO["count"] + 1;
        }
    }
    static showInfo() {
        var rstO;
        rstO = {};
        var rstO1;
        rstO1 = {};
        var arr;
        arr = [];
        var arr1;
        arr1 = [];
        var className;
        var keyName;
        var type;
        for (className in GetSetProfile.infoDic) {
            var tClassO;
            var tClassO1;
            tClassO = GetSetProfile.infoDic[className];
            rstO[className] = tClassO1 = {};
            for (keyName in tClassO) {
                var tKeyO;
                var tKeyO1;
                tKeyO = tClassO[keyName];
                tClassO1[keyName] = tKeyO1 = {};
                for (type in tKeyO) {
                    var tDataO;
                    var tDataO1;
                    tDataO = tKeyO[type];
                    tDataO["rate"] = tDataO["objCount"] / GetSetProfile.getClassCount(className);
                    tKeyO1[type] = tDataO["rate"];
                    var tSKey;
                    tSKey = className + "_" + keyName + "_" + type;
                    rstO1[tSKey] = tDataO["rate"];
                    if (className == GetSetProfile.ALL) {
                        if (type == "get") {
                            arr.push([tSKey, tDataO["rate"], tDataO["count"]]);
                        }
                        else {
                            arr1.push([tSKey, tDataO["rate"], tDataO["count"]]);
                        }
                    }
                }
            }
        }
        console.log(GetSetProfile.infoDic);
        console.log(GetSetProfile.countDic);
        console.log(rstO);
        console.log(rstO1);
        console.log("nodeCount:", GetSetProfile.getClassCount(GetSetProfile.ALL));
        console.log("sort by rate");
        GetSetProfile.showStaticInfo(arr, arr1, "1");
        console.log("sort by count");
        GetSetProfile.showStaticInfo(arr, arr1, "2");
    }
    static showStaticInfo(arr, arr1, sortKey) {
        console.log("get:");
        GetSetProfile.showStaticArray(arr, sortKey);
        console.log("set:");
        GetSetProfile.showStaticArray(arr1, sortKey);
    }
    static showStaticArray(arr, sortKey = "1") {
        arr.sort(MathUtil.sortByKey(sortKey, true, true));
        var i, len;
        len = arr.length;
        var tArr;
        for (i = 0; i < len; i++) {
            tArr = arr[i];
            console.log(tArr[0], Math.floor(tArr[1] * 100), tArr[2]);
        }
    }
    static hookVar(obj, name, setHook = null, getHook = null) {
        if (!setHook)
            setHook = [];
        if (!getHook)
            getHook = [];
        var preO = obj;
        var preValue;
        var newKey = "___@" + newKey;
        var des;
        des = ClassTool.getOwnPropertyDescriptor(obj, name);
        var ndes = {};
        var mSet = function (value) {
            preValue = value;
        };
        var mGet = function () {
            return preValue;
        };
        var mSet1 = function (value) {
            var _t = this;
            GetSetProfile.reportCall(_t, name, "set");
        };
        var mGet1 = function () {
            var _t = this;
            GetSetProfile.reportCall(_t, name, "get");
            return preValue;
        };
        getHook.push(mGet1);
        setHook.push(mSet1);
        while (!des && obj["__proto__"]) {
            obj = obj["__proto__"];
            des = ClassTool.getOwnPropertyDescriptor(obj, name);
        }
        if (des) {
            ndes.set = des.set ? des.set : mSet;
            ndes.get = des.get ? des.get : mGet;
            if (!des.get) {
                preValue = preO[name];
            }
            ndes.enumerable = des.enumerable;
            setHook.push(ndes.set);
            getHook.push(ndes.get);
            FunHook.hookFuns(ndes, "set", setHook);
            FunHook.hookFuns(ndes, "get", getHook, getHook.length - 1);
            ClassTool.defineProperty(preO, name, ndes);
        }
        if (!des) {
            ndes.set = mSet;
            ndes.get = mGet;
            preValue = preO[name];
            setHook.push(ndes.set);
            getHook.push(ndes.get);
            FunHook.hookFuns(ndes, "set", setHook);
            FunHook.hookFuns(ndes, "get", getHook, getHook.length - 1);
            ClassTool.defineProperty(preO, name, ndes);
        }
    }
}
GetSetProfile._inited = false;
GetSetProfile.noDisplayKeys = { "conchModel": true };
GetSetProfile.ALL = "ALL";
GetSetProfile.countDic = {};
GetSetProfile.fromMe = false;
GetSetProfile.hookClassDic = {};
GetSetProfile.infoDic = {};
