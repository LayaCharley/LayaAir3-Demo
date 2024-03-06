import { Laya } from "Laya";
export class CallLaterTool {
    constructor() {
    }
    static initCallLaterRecorder() {
        if (CallLaterTool.oldCallLater)
            return;
        CallLaterTool.oldCallLater = Laya.timer["callLater"];
        Laya.timer["callLater"] = CallLaterTool["prototype"]["callLater"];
    }
    static beginRecordCallLater() {
        CallLaterTool.initCallLaterRecorder();
        CallLaterTool._isRecording = true;
    }
    static runRecordedCallLaters() {
        CallLaterTool._isRecording = false;
        var timer;
        timer = Laya.timer;
        var laters = timer["_laters"];
        laters = CallLaterTool._recordedCallLaters;
        for (var i = 0, n = laters.length - 1; i <= n; i++) {
            var handler = laters[i];
            if (CallLaterTool._recordedCallLaters.indexOf(handler) < 0)
                continue;
            handler.method !== null && handler.run(false);
            timer["_recoverHandler"](handler);
            laters.splice(i, 1);
        }
        CallLaterTool._recordedCallLaters.length = 0;
    }
    callLater(caller, method, args = null) {
        if (this._getHandler(caller, method) == null) {
            CallLaterTool.oldCallLater.call(this, caller, method, args);
            if (CallLaterTool._isRecording) {
                CallLaterTool._recordedCallLaters.push(this._laters[this._laters.length - 1]);
            }
        }
    }
}
CallLaterTool._recordedCallLaters = [];
CallLaterTool._isRecording = false;
