import { Sprite } from "laya/display/Sprite";
import { Browser } from "laya/utils/Browser";
export class TraceTool {
    constructor() { }
    static closeAllLog() {
        var logFun;
        logFun = TraceTool.emptyLog;
        Browser.window.console.log = logFun;
    }
    static emptyLog() {
    }
    static traceObj(obj) {
        TraceTool.tempArr.length = 0;
        var key;
        for (key in obj) {
            TraceTool.tempArr.push(key + ":" + obj[key]);
        }
        var rst;
        rst = TraceTool.tempArr.join("\n");
        console.log(rst);
        return rst;
    }
    static traceObjR(obj) {
        TraceTool.tempArr.length = 0;
        var key;
        for (key in obj) {
            TraceTool.tempArr.push(obj[key] + ":" + key);
        }
        var rst;
        rst = TraceTool.tempArr.join("\n");
        console.log(rst);
        return rst;
    }
    static traceSize(tar) {
        TraceTool._debugtrace("Size: x:" + tar.x + " y:" + tar.y + " w:" + tar.width + " h:" + tar.height + " scaleX:" + tar.scaleX + " scaleY:" + tar.scaleY);
    }
    static traceSplit(msg) {
        console.log("---------------------" + msg + "---------------------------");
    }
    static group(gName) {
        console.group(gName);
    }
    static groupEnd() {
        console.groupEnd();
    }
    static getCallStack(life = 1, s = 1) {
        var caller;
        caller = TraceTool.getCallStack;
        caller = caller.caller.caller;
        var msg;
        msg = "";
        while (caller && life > 0) {
            if (s <= 0) {
                msg += caller + "<-";
                life--;
            }
            else {
            }
            caller = caller.caller;
            s--;
        }
        return msg;
    }
    static getCallLoc(index = 2) {
        var loc;
        try {
            TraceTool.Erroer.i++;
        }
        catch (e) {
            var arr;
            arr = this.e.stack.replace(/Error\n/).split(/\n/);
            if (arr[index]) {
                loc = arr[index].replace(/^\s+|\s+$/, "");
            }
            else {
                loc = "unknow";
            }
        }
        return loc;
    }
    static traceCallStack() {
        var loc;
        try {
            TraceTool.Erroer.i++;
        }
        catch (e) {
            loc = this.e.stack;
        }
        console.log(loc);
        return loc;
    }
    static getPlaceHolder(len) {
        if (!TraceTool.holderDic.hasOwnProperty(len)) {
            var rst;
            rst = "";
            var i;
            for (i = 0; i < len; i++) {
                rst += "-";
            }
            TraceTool.holderDic[len] = rst;
        }
        return TraceTool.holderDic[len];
    }
    static traceTree(tar, depth = 0, isFirst = true) {
        if (isFirst) {
            console.log("traceTree");
        }
        if (!tar)
            return;
        var i;
        var len;
        if (tar.numChildren < 1) {
            console.log(tar);
            return;
        }
        TraceTool.group(tar);
        len = tar.numChildren;
        depth++;
        for (i = 0; i < len; i++) {
            TraceTool.traceTree(tar.getChildAt(i), depth, false);
        }
        TraceTool.groupEnd();
    }
    static getClassName(tar) {
        return tar["constructor"].name;
    }
    static traceSpriteInfo(tar, showBounds = true, showSize = true, showTree = true) {
        if (!(tar instanceof Sprite)) {
            console.log("not Sprite");
            return;
        }
        if (!tar) {
            console.log("null Sprite");
            return;
        }
        TraceTool.traceSplit("traceSpriteInfo");
        TraceTool._debugtrace(TraceTool.getClassName(tar) + ":" + tar.name);
        if (showTree) {
            TraceTool.traceTree(tar);
        }
        else {
            console.log(tar);
        }
        if (showSize) {
            TraceTool.traceSize(tar);
        }
        if (showBounds) {
            console.log("bounds:" + tar.getBounds());
        }
    }
}
TraceTool.tempArr = [];
TraceTool.Erroer = null;
TraceTool.holderDic = {};
