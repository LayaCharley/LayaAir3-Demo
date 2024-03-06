import { INativeUploadNode } from "./INativeUploadNode";
import { NativeMemory } from "./NativeMemory";
export declare class UploadMemory extends NativeMemory {
    constructor(size: number);
    addBlockCell(node: INativeUploadNode, dataSizeInByte: number): void;
    check(size: number): boolean;
    clear(): void;
}
