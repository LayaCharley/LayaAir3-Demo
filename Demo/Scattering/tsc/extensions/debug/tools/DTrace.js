import { TraceTool } from "./TraceTool";
export class DTrace {
    constructor() {
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
        arg = DTrace.getArgArr(arg);
        arg.push(TraceTool.getCallLoc(2));
        console.log.apply(console, arg);
        var str;
        str = arg.join(" ");
    }
    static timeStart(sign) {
        console.time(sign);
        ;
    }
    static timeEnd(sign) {
        console.timeEnd(sign);
        ;
    }
    static traceTable(data) {
        console.table(data);
        ;
    }
}
