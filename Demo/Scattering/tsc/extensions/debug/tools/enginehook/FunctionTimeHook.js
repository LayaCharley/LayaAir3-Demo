import { Browser } from "laya/utils/Browser";
import { ClassTool } from "../ClassTool";
import { CountTool } from "../CountTool";
import { FunHook } from "../hook/FunHook";
export class FunctionTimeHook {
    constructor() {
    }
    static hookFun(obj, funName) {
        if (!obj)
            return;
        if (obj.timeHooked)
            return;
        var myKey;
        FunctionTimeHook.HookID++;
        myKey = ClassTool.getNodeClassAndName(obj) + "." + funName + "():" + FunctionTimeHook.HookID;
        var timePreFun = function (...args) {
            FunctionTimeHook.funBegin(myKey);
        };
        var timeEndFun = function (...args) {
            FunctionTimeHook.funEnd(myKey);
        };
        obj.timeHooked = true;
        FunHook.hook(obj, funName, timePreFun, timeEndFun);
    }
    static funBegin(funKey) {
        FunctionTimeHook.funPre[funKey] = Browser.now();
    }
    static funEnd(funKey) {
        if (!FunctionTimeHook.funPre[funKey])
            FunctionTimeHook.funPre[funKey] = 0;
        FunctionTimeHook.counter.add(funKey, Browser.now() - FunctionTimeHook.funPre[funKey]);
    }
    static fresh() {
        FunctionTimeHook.funEnd(FunctionTimeHook.TotalSign);
        FunctionTimeHook.counter.record();
        FunctionTimeHook.funBegin(FunctionTimeHook.TotalSign);
    }
}
FunctionTimeHook.HookID = 1;
FunctionTimeHook.counter = new CountTool();
FunctionTimeHook.funPre = {};
FunctionTimeHook.TotalSign = "TotalSign";
