export declare class EventDispatcher {
    private _events;
    protected onStartListeningToType(type: string): void;
    hasListener(type: string): boolean;
    event(type: string, data?: any): boolean;
    on(type: string, listener: Function): EventDispatcher;
    on(type: string, caller: any, listener: Function, args?: any[]): EventDispatcher;
    once(type: string, listener: Function): EventDispatcher;
    once(type: string, caller: any, listener: Function, args?: any[]): EventDispatcher;
    off(type: string, listener: Function): EventDispatcher;
    off(type: string, caller: any, listener?: Function, args?: any[]): EventDispatcher;
    offAll(type?: string): EventDispatcher;
    offAllCaller(caller: any): EventDispatcher;
}
