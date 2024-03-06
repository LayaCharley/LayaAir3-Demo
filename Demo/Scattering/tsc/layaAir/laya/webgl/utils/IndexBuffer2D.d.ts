import { IndexBuffer } from "../../RenderEngine/IndexBuffer";
import { Buffer2D } from "./Buffer2D";
export declare class IndexBuffer2D extends IndexBuffer {
    static create: Function;
    protected _uint16Array: Uint16Array;
    buffer2D: Buffer2D;
    constructor(bufferUsage?: number);
    _bindForVAO(): void;
    destory(): void;
    disposeResource(): void;
}
