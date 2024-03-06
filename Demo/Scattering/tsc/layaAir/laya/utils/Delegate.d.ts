export declare class Delegate {
    private _flag;
    private _items;
    constructor();
    add(callback: Function, target?: any, args?: any[]): void;
    once(callback: Function, target?: any, args?: any[]): void;
    remove(callback: Function, target?: any): void;
    clear(): void;
    clearForTarget(target: any): void;
    get count(): number;
    invoke(...args: any[]): void;
}
