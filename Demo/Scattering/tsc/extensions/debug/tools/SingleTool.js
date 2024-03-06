export class SingleTool {
    constructor() {
        this._objDic = {};
    }
    static get I() {
        if (!SingleTool._instance) {
            SingleTool._instance = new SingleTool();
        }
        return SingleTool._instance;
    }
    static set I(value) {
        SingleTool._instance = value;
    }
    getArr(sign) {
        var dic;
        dic = this.getTypeDic("Array");
        if (!dic[sign])
            dic[sign] = [];
        return dic[sign];
    }
    getObject(sign) {
        var dic;
        dic = this.getTypeDic("Object");
        if (!dic[sign])
            dic[sign] = {};
        return dic[sign];
    }
    getByClass(sign, clzSign, clz) {
        var dic;
        dic = this.getTypeDic(clzSign);
        if (!dic[sign])
            dic[sign] = new clz();
        return dic[sign];
    }
    getTypeDic(type) {
        if (!this._objDic[type])
            this._objDic[type] = {};
        return this._objDic[type];
    }
}
