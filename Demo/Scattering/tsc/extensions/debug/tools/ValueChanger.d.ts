export declare class ValueChanger {
    constructor();
    target: any;
    key: string;
    private _tValue;
    get value(): number;
    set value(nValue: number);
    get dValue(): number;
    get scaleValue(): number;
    preValue: number;
    record(): void;
    showValueByAdd(addValue: number): void;
    showValueByScale(scale: number): void;
    recover(): void;
    dispose(): void;
    static create(target: any, key: string): ValueChanger;
}
