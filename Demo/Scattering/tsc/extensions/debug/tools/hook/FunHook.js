import { ClassTool } from "../ClassTool";
import { TraceTool } from "../TraceTool";
export class FunHook {
    constructor() {
    }
    static hook(obj, funName, preFun = null, aftFun = null) {
        FunHook.hookFuns(obj, funName, [preFun, obj[funName], aftFun], 1);
    }
    static hookAllFun(obj) {
        var key;
        var arr;
        arr = ClassTool.getOwnPropertyNames(obj);
        for (key in arr) {
            key = arr[key];
            if (FunHook.special[key])
                continue;
            console.log("try hook:", key);
            if (obj[key] instanceof Function) {
                console.log("hook:", key);
                FunHook.hookFuns(obj, key, [FunHook.getTraceMsg("call:" + key), obj[key]], 1);
            }
        }
        if (obj["__proto__"]) {
            FunHook.hookAllFun(obj["__proto__"]);
        }
        else {
            console.log("end:", obj);
        }
    }
    static getTraceMsg(msg) {
        var rst;
        rst = function () {
            console.log(msg);
        };
        return rst;
    }
    static hookFuns(obj, funName, funList, rstI = -1) {
        var _preFun = obj[funName];
        var newFun;
        newFun = function (...args) {
            var rst;
            var i;
            var len;
            len = funList.length;
            for (i = 0; i < len; i++) {
                if (!funList[i])
                    continue;
                if (i == rstI) {
                    rst = funList[i].apply(this, args);
                }
                else {
                    funList[i].apply(this, args);
                }
            }
            return rst;
        };
        newFun["pre"] = _preFun;
        obj[funName] = newFun;
    }
    static removeHook(obj, funName) {
        if (obj[funName].pre != null) {
            obj[funName] = obj[funName].pre;
        }
    }
    static debugHere() {
        debugger;
        ;
    }
    static traceLoc(level = 0, msg = "") {
        console.log(msg, "fun loc:", TraceTool.getCallLoc(3 + level));
    }
    static getLocFun(level = 0, msg = "") {
        level += 1;
        var rst;
        rst = function () {
            FunHook.traceLoc(level, msg);
        };
        return rst;
    }
}
FunHook.special = {
    "length": true,
    "name": true,
    "arguments": true,
    "caller": true,
    "prototype": true,
    "is": true,
    "isExtensible": true,
    "isFrozen": true,
    "isSealed": true,
    "preventExtensions": true,
    "seal": true,
    "apply": true,
    "call": true,
    "bind": true,
    "freeze": true,
    "unobserve": true
};
