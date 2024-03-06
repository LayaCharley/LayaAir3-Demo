export declare class DifferTool {
    constructor(sign?: string, autoTrace?: boolean);
    autoTrace: boolean;
    sign: string;
    obj: any;
    update(data: any, msg?: string): any;
    private static _differO;
    static differ(sign: string, data: any, msg?: string): any;
}
