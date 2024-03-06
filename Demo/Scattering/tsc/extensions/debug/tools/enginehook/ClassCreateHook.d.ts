export declare class ClassCreateHook {
    private static _instance;
    static get I(): ClassCreateHook;
    static set I(value: ClassCreateHook);
    constructor();
    static isInited: boolean;
    hookClass(clz: new () => any): void;
    createInfo: any;
    classCreated(clz: new () => any, oClass: new () => any): void;
    getClassCreateInfo(clz: new () => any): any;
}
