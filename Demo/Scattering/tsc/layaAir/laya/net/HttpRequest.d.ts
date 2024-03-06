import { EventDispatcher } from "../events/EventDispatcher";
export declare class HttpRequest extends EventDispatcher {
    protected _http: XMLHttpRequest;
    private static _urlEncode;
    protected _responseType: string;
    protected _data: any;
    protected _url: string;
    send(url: string, data?: any, method?: "get" | "post" | "head", responseType?: "text" | "json" | "xml" | "arraybuffer", headers?: string[]): void;
    protected _onProgress(e: any): void;
    protected _onAbort(e: any): void;
    protected _onError(e: any): void;
    protected _onLoad(e: any): void;
    protected error(message: string): void;
    protected complete(): void;
    protected clear(): void;
    get url(): string;
    get data(): any;
    get http(): any;
    reset(): void;
}
