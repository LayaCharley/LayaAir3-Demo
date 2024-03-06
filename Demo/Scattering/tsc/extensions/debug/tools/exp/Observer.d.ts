export declare class Observer {
    constructor();
    static observe(obj: any, callBack: Function): void;
    static unobserve(obj: any, callBack: Function): void;
    static observeDiffer(obj: any, sign: string, msg?: string): void;
}
