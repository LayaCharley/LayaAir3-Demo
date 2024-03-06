import { EventDispatcher } from "../events/EventDispatcher";
export declare class Socket extends EventDispatcher {
    static LITTLE_ENDIAN: string;
    static BIG_ENDIAN: string;
    protected _socket: any;
    private _connected;
    private _addInputPosition;
    private _input;
    private _output;
    disableInput: boolean;
    private _byteClass;
    protocols: any;
    get input(): any;
    get output(): any;
    get connected(): boolean;
    get endian(): string;
    set endian(value: string);
    constructor(host?: string | null, port?: number, byteClass?: new () => any, protocols?: any[] | null, isSecure?: boolean);
    connect(host: string, port: number, isSecure?: boolean): void;
    connectByUrl(url: string): void;
    cleanSocket(): void;
    close(): void;
    protected _onOpen(e: any): void;
    protected _onMessage(msg: any): void;
    protected _onClose(e: any): void;
    protected _onError(e: any): void;
    send(data: any): void;
    flush(): void;
}
