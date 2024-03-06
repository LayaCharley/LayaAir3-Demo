export declare class ImgUtils {
    static data: any;
    static isSavaData: boolean;
    private static compareVersion;
    static get isSupport(): boolean;
    static arrayBufferToURL(url: string, arrayBuffer: ArrayBuffer): any;
    static _arrayBufferToURL(arrayBuffer: ArrayBuffer): string;
    static destroy(url: string): void;
}
