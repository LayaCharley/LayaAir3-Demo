export declare class Handler {
    protected static _pool: Handler[];
    private static _gid;
    caller: Object | null;
    method: Function | null;
    args: any[] | null;
    once: boolean;
    protected _id: number;
    constructor(caller?: Object | null, method?: Function | null, args?: any[] | null, once?: boolean);
    setTo(caller: any, method: Function | null, args: any[] | null, once?: boolean): Handler;
    run(): any;
    runWith(data: any): any;
    clear(): Handler;
    recover(): void;
    static create(caller: any, method: Function | null, args?: any[] | null, once?: boolean): Handler;
}
