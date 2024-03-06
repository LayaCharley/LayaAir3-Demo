import { DebugTxt } from "./DebugTxt";
export class TouchDebugTools {
    constructor() {
    }
    static getTouchIDs(events) {
        var rst;
        rst = [];
        var i, len;
        len = events.length;
        for (i = 0; i < len; i++) {
            rst.push(events[i].identifier || 0);
        }
        return rst;
    }
    static traceTouchIDs(msg, events) {
        DebugTxt.dTrace(msg + ":" + TouchDebugTools.getTouchIDs(events).join(","));
    }
}
