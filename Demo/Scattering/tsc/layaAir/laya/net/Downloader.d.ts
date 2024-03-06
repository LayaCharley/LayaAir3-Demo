import { HttpRequest } from "./HttpRequest";
export declare class Downloader {
    common(owner: any, url: string, originalUrl: string, contentType: string, onProgress: (progress: number) => void, onComplete: (data: any, error?: string) => void): void;
    image(owner: any, url: string, originalUrl: string, onProgress: (progress: number) => void, onComplete: (data: any, error?: string) => void): void;
    imageWithBlob(owner: any, blob: ArrayBuffer, originalUrl: string, onProgress: (progress: number) => void, onComplete: (data: any, error?: string) => void): void;
    imageWithWorker(owner: any, url: string, originalUrl: string, onProgress: (progress: number) => void, onComplete: (data: any, error?: string) => void): void;
    audio(owner: any, url: string, originalUrl: string, onProgress: (progress: number) => void, onComplete: (data: any, error?: string) => void): void;
    httpRequestPool: Array<HttpRequest>;
    protected getRequestInst(): HttpRequest;
    protected returnRequestInst(inst: HttpRequest): void;
}
