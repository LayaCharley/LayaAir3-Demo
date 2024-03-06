export declare class WorkerLoader {
    static workerPath: string;
    private static _worker;
    private static _dispatcher;
    private static _enable;
    static workerSupported(): boolean;
    static set enable(value: boolean);
    static get enable(): boolean;
    static load(url: string, options: any): Promise<any>;
    private static workerMessage;
}
