import { Laya } from "Laya";
import { Browser } from "laya/utils/Browser";
export class TimeTool {
    constructor() {
    }
    static getTime(sign, update = true) {
        if (!TimeTool.timeDic[sign]) {
            TimeTool.timeDic[sign] = 0;
        }
        var tTime;
        tTime = Browser.now();
        var rst;
        rst = tTime - TimeTool.timeDic[sign];
        TimeTool.timeDic[sign] = tTime;
        return rst;
    }
    static runAllCallLater() {
        if (TimeTool._deep > 0)
            debugger;
        TimeTool._deep++;
        var timer;
        timer = Laya.timer;
        var laters = timer["_laters"];
        for (var i = 0, n = laters.length - 1; i <= n; i++) {
            var handler = laters[i];
            if (handler) {
                handler.method !== null && handler.run(false);
                timer["_recoverHandler"](handler);
            }
            else {
                debugger;
            }
            i === n && (n = laters.length - 1);
        }
        laters.length = 0;
        TimeTool._deep--;
    }
}
TimeTool.timeDic = {};
TimeTool._deep = 0;
