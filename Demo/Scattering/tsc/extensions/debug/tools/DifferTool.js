import { ObjectTools } from "./ObjectTools";
export class DifferTool {
    constructor(sign = "", autoTrace = true) {
        this.autoTrace = true;
        this.sign = "";
        this.sign = sign;
        this.autoTrace = autoTrace;
    }
    update(data, msg = null) {
        if (msg) {
            console.log(msg);
        }
        var tObj = ObjectTools.copyObj(data);
        if (!this.obj)
            this.obj = {};
        var rst;
        rst = ObjectTools.differ(this.obj, tObj);
        this.obj = tObj;
        if (this.autoTrace) {
            console.log(this.sign + " differ:");
            ObjectTools.traceDifferObj(rst);
        }
        return rst;
    }
    static differ(sign, data, msg = null) {
        if (!DifferTool._differO[sign])
            DifferTool._differO[sign] = new DifferTool(sign, true);
        var tDiffer;
        tDiffer = DifferTool._differO[sign];
        return tDiffer.update(data, msg);
    }
}
DifferTool._differO = {};
