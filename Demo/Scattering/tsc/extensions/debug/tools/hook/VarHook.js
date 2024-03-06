import { FunHook } from "./FunHook";
import { ClassTool } from "../ClassTool";
export class VarHook {
    constructor() {
    }
    static hookVar(obj, name, setHook = null, getHook = null) {
        if (!setHook)
            setHook = [];
        if (!getHook)
            getHook = [];
        var preO = obj;
        var preValue = obj[name];
        var des;
        des = ClassTool.getOwnPropertyDescriptor(obj, name);
        var ndes = {};
        var mSet = function (value) {
            console.log("var hook set " + name + ":", value);
            preValue = value;
        };
        var mGet = function () {
            console.log("var hook get" + name + ":", preValue);
            return preValue;
        };
        if (des) {
            ndes.set = mSet;
            ndes.get = mGet;
            ndes.enumerable = des.enumerable;
            setHook.push(ndes.set);
            getHook.push(ndes.get);
            FunHook.hookFuns(ndes, "set", setHook);
            FunHook.hookFuns(ndes, "get", getHook, getHook.length - 1);
            ClassTool.defineProperty(obj, name, ndes);
            return;
        }
        while (!des && obj["__proto__"]) {
            obj = obj["__proto__"];
            des = ClassTool.getOwnPropertyDescriptor(obj, name);
        }
        if (des) {
            ndes.set = des.set ? des.set : mSet;
            ndes.get = des.get ? des.get : mGet;
            ndes.enumerable = des.enumerable;
            setHook.push(ndes.set);
            getHook.push(ndes.get);
            FunHook.hookFuns(ndes, "set", setHook);
            FunHook.hookFuns(ndes, "get", getHook, getHook.length - 1);
            ClassTool.defineProperty(preO, name, ndes);
        }
        if (!des) {
            console.log("get des fail add directly");
            ndes.set = mSet;
            ndes.get = mGet;
            setHook.push(ndes.set);
            getHook.push(ndes.get);
            FunHook.hookFuns(ndes, "set", setHook);
            FunHook.hookFuns(ndes, "get", getHook, getHook.length - 1);
            ClassTool.defineProperty(obj, name, ndes);
        }
    }
    static getLocFun(msg = "", level = 0) {
        level += 1;
        var rst;
        rst = function () {
            FunHook.traceLoc(level, msg);
        };
        return rst;
    }
}
