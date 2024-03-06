import { ByteEx } from "./ByteEx";
export declare class Base64Tool {
    constructor();
    static chars: string;
    static lookup: Uint8Array;
    static init(): void;
    static encode(arraybuffer: ArrayBuffer): string;
    static encodeStr(str: string): string;
    static encodeStr2(str: string): string;
    static encodeByte(byte: ByteEx, start?: number, end?: number): string;
    static decodeToByte(base64: string): ByteEx;
    static decode(base64: string): ArrayBuffer;
}
