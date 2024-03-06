export declare class Base64Tool {
    static chars: string;
    static reg: RegExp;
    static reghead: RegExp;
    static lookup: Uint8Array;
    static init(): void;
    static isBase64String(str: string): boolean;
    static encode(arraybuffer: ArrayBuffer): string;
    static decode(base64: string): ArrayBuffer;
}
