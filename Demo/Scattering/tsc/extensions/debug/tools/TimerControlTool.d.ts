export declare class TimerControlTool {
    constructor();
    static now(): number;
    static getRatedNow(): number;
    static getNow(): number;
    private static _startTime;
    private static _timeRate;
    static _browerNow: any;
    static setTimeRate(rate: number): void;
    static recoverRate(): void;
}
