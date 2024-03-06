export declare class ClassTool {
    constructor();
    static defineProperty(obj: any, name: string, des: any): void;
    static getOwnPropertyDescriptor(obj: any, name: string): any;
    static getOwnPropertyDescriptors(obj: any): any;
    static getOwnPropertyNames(obj: any): any[];
    static getObjectGetSetKeys(obj: any, rst?: any[]): any[];
    static displayTypes: any;
    static getObjectDisplayAbleKeys(obj: any, rst?: any[]): any[];
    static getClassName(tar: any): string;
    static getNodeClassAndName(tar: any): string;
    static getClassNameByClz(clz: new () => any): string;
    static getClassByName(className: string): new () => any;
    static createObjByName(className: string): any;
}
