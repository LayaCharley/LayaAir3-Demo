export declare class CallLaterTool {
    constructor();
    static initCallLaterRecorder(): void;
    private static _recordedCallLaters;
    private static _isRecording;
    static beginRecordCallLater(): void;
    static runRecordedCallLaters(): void;
    _getHandler: Function;
    _indexHandler: Function;
    _pool: any[];
    _laters: any[];
    static oldCallLater: Function;
    callLater(caller: any, method: Function, args?: any[]): void;
}
