export declare class Watch {
    constructor();
    static watch(obj: any, name: string, callBack: Function): void;
    static unwatch(obj: any, name: string, callBack: Function): void;
}
