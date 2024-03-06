import { DifferTool } from "./DifferTool";
import { FunHook } from "./hook/FunHook";
import { VarHook } from "./hook/VarHook";
export class Watcher {
    constructor() {
    }
    static watch(obj, name, funs) {
        VarHook.hookVar(obj, name, funs);
    }
    static traceChange(obj, name, sign = "var changed:") {
        VarHook.hookVar(obj, name, [Watcher.getTraceValueFun(name), VarHook.getLocFun(sign)]);
    }
    static debugChange(obj, name) {
        VarHook.hookVar(obj, name, [VarHook.getLocFun("debug loc"), FunHook.debugHere]);
    }
    static differChange(obj, name, sign, msg = "") {
        VarHook.hookVar(obj, name, [Watcher.getDifferFun(obj, name, sign, msg)]);
    }
    static getDifferFun(obj, name, sign, msg = "") {
        var rst;
        rst = function () {
            DifferTool.differ(sign, obj[name], msg);
        };
        return rst;
    }
    static traceValue(value) {
        console.log("value:", value);
    }
    static getTraceValueFun(name) {
        var rst;
        rst = function (value) {
            console.log("set " + name + " :", value);
        };
        return rst;
    }
}
