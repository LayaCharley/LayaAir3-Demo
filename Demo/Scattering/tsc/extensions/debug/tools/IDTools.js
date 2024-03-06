export class IDTools {
    constructor() {
        this.tID = 1;
    }
    getID() {
        return this.tID++;
    }
    static getAID() {
        return IDTools._ID.getID();
    }
    static idObjE(obj, sign = "default") {
        if (obj[IDTools.idSign])
            return obj;
        if (!sign) {
            sign = "default";
        }
        if (!IDTools._idDic[sign]) {
            IDTools._idDic[sign] = new IDTools();
        }
        obj[IDTools.idSign] = IDTools._idDic[sign].getAID();
        return obj;
    }
    static setObjID(obj, id) {
        obj[IDTools.idSign] = id;
        return obj;
    }
    static idObj(obj) {
        if (obj[IDTools.idSign])
            return obj;
        obj[IDTools.idSign] = IDTools.getAID();
        return obj;
    }
    static getObjID(obj) {
        if (!obj)
            return -1;
        return obj[IDTools.idSign];
    }
}
IDTools._ID = new IDTools();
IDTools._idDic = { "default": new IDTools() };
IDTools.idSign = "_M_id_";
