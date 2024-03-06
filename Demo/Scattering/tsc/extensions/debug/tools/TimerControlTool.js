import { Browser } from "laya/utils/Browser";
export class TimerControlTool {
    constructor() {
    }
    static now() {
        if (TimerControlTool._timeRate != 1)
            return TimerControlTool.getRatedNow();
        return Date.now();
    }
    static getRatedNow() {
        var dTime;
        dTime = TimerControlTool.getNow() - TimerControlTool._startTime;
        return dTime * TimerControlTool._timeRate + TimerControlTool._startTime;
    }
    static getNow() {
        return Date.now();
    }
    static setTimeRate(rate) {
        if (TimerControlTool._browerNow == null)
            TimerControlTool._browerNow = Browser["now"];
        TimerControlTool._startTime = TimerControlTool.getNow();
        TimerControlTool._timeRate = rate;
        if (rate != 1) {
            Browser["now"] = TimerControlTool.now;
        }
        else {
            if (TimerControlTool._browerNow != null)
                Browser["now"] = TimerControlTool._browerNow;
        }
    }
    static recoverRate() {
        TimerControlTool.setTimeRate(1);
    }
}
TimerControlTool._timeRate = 1;
