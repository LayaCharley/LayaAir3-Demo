import { TraceTool } from "./TraceTool";
export class CountTool {
    constructor() {
        this.data = {};
        this.preO = {};
        this.changeO = {};
    }
    reset() {
        this.data = {};
        this.count = 0;
    }
    add(name, num = 1) {
        this.count++;
        if (!this.data.hasOwnProperty(name)) {
            this.data[name] = 0;
        }
        this.data[name] = this.data[name] + num;
    }
    getKeyCount(key) {
        if (!this.data.hasOwnProperty(key)) {
            this.data[key] = 0;
        }
        return this.data[key];
    }
    getKeyChange(key) {
        if (!this.changeO[key])
            return 0;
        return this.changeO[key];
    }
    record() {
        var key;
        for (key in this.changeO) {
            this.changeO[key] = 0;
        }
        for (key in this.data) {
            if (!this.preO[key])
                this.preO[key] = 0;
            this.changeO[key] = this.data[key] - this.preO[key];
            this.preO[key] = this.data[key];
        }
    }
    getCount(dataO) {
        var rst = 0;
        var key;
        for (key in dataO) {
            rst += dataO[key];
        }
        return rst;
    }
    traceSelf(dataO = null) {
        if (!dataO)
            dataO = this.data;
        var tCount;
        tCount = this.getCount(dataO);
        console.log("total:" + tCount);
        return "total:" + tCount + "\n" + TraceTool.traceObj(dataO);
    }
    traceSelfR(dataO = null) {
        if (!dataO)
            dataO = this.data;
        var tCount;
        tCount = this.getCount(dataO);
        console.log("total:" + tCount);
        return "total:" + tCount + "\n" + TraceTool.traceObjR(dataO);
    }
}
