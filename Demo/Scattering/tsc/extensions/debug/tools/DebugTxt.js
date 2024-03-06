import { Laya } from "Laya";
import { Text } from "laya/display/Text";
export class DebugTxt {
    constructor() {
    }
    static init() {
        if (DebugTxt._txt)
            return;
        DebugTxt._txt = new Text();
        DebugTxt._txt.pos(100, 100);
        DebugTxt._txt.color = "#ff00ff";
        DebugTxt._txt.zOrder = 999;
        DebugTxt._txt.fontSize = 24;
        DebugTxt._txt.text = "debugTxt inited";
        Laya.stage.addChild(DebugTxt._txt);
    }
    static getArgArr(arg) {
        var rst;
        rst = [];
        var i, len = arg.length;
        for (i = 0; i < len; i++) {
            rst.push(arg[i]);
        }
        return rst;
    }
    static dTrace(...arg) {
        arg = DebugTxt.getArgArr(arg);
        var str;
        str = arg.join(" ");
        if (DebugTxt._txt) {
            DebugTxt._txt.text = str + "\n" + DebugTxt._txt.text;
        }
    }
    static getTimeStr() {
        var dateO = new Date();
        return dateO.toTimeString();
    }
    static traceTime(msg) {
        DebugTxt.dTrace(DebugTxt.getTimeStr());
        DebugTxt.dTrace(msg);
    }
    static show(...arg) {
        arg = DebugTxt.getArgArr(arg);
        var str;
        str = arg.join(" ");
        if (DebugTxt._txt) {
            DebugTxt._txt.text = str;
        }
    }
}
