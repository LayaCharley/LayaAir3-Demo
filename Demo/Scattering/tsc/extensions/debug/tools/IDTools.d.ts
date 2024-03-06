export declare class IDTools {
    constructor();
    tID: number;
    getID(): number;
    static _ID: IDTools;
    static getAID(): number;
    private static _idDic;
    static idObjE(obj: any, sign?: string): any;
    static setObjID(obj: any, id: number): any;
    static idSign: string;
    static idObj(obj: any): any;
    static getObjID(obj: any): number;
}
