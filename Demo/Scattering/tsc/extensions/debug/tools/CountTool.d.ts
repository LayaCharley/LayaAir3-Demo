export declare class CountTool {
    constructor();
    data: any;
    preO: any;
    changeO: any;
    count: number;
    reset(): void;
    add(name: string, num?: number): void;
    getKeyCount(key: string): number;
    getKeyChange(key: string): number;
    record(): void;
    getCount(dataO: any): number;
    traceSelf(dataO?: any): string;
    traceSelfR(dataO?: any): string;
}
