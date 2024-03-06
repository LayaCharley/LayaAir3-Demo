import { CountTool } from "./CountTool";
import { TraceTool } from "./TraceTool";
import { DTrace } from "./DTrace";
import { Browser } from "laya/utils/Browser";
export class RunProfile {
    constructor() {
    }
    static run(funName, callLen = 3) {
        var tCount;
        if (!RunProfile.infoDic.hasOwnProperty(funName)) {
            RunProfile.infoDic[funName] = new CountTool();
        }
        tCount = RunProfile.infoDic[funName];
        var msg;
        msg = TraceTool.getCallLoc(callLen) + "\n" + TraceTool.getCallStack(1, callLen - 3);
        tCount.add(msg);
        if (RunProfile._runShowDic[funName]) {
            console.log("Create:" + funName);
            console.log(msg);
        }
    }
    static showClassCreate(funName) {
        RunProfile._runShowDic[funName] = true;
    }
    static hideClassCreate(funName) {
        RunProfile._runShowDic[funName] = false;
    }
    static getRunInfo(funName) {
        var rst;
        rst = RunProfile.infoDic[funName];
        if (rst) {
        }
        return RunProfile.infoDic[funName];
    }
    static runTest(fun, count, sign = "runTest") {
        DTrace.timeStart(sign);
        var i;
        for (i = 0; i < count; i++) {
            fun();
        }
        DTrace.timeEnd(sign);
    }
    static runTest2(fun, count, sign = "runTest") {
        var preTime;
        preTime = Browser.now();
        var i;
        for (i = 0; i < count; i++) {
            fun();
        }
        return Browser.now() - preTime;
    }
}
RunProfile.infoDic = {};
RunProfile._runShowDic = {};
