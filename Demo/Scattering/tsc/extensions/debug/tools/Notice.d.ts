import { EventDispatcher } from "laya/events/EventDispatcher";
export declare class Notice extends EventDispatcher {
    constructor();
    private static _instance;
    static get I(): Notice;
    static set I(value: Notice);
    static notify(type: string, data?: any): void;
    static listen(type: string, _scope: any, fun: Function, args?: any[], cancelBefore?: boolean): void;
    static cancel(type: string, _scope: any, fun: Function): void;
}
