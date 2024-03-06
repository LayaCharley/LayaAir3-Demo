export declare class CommonMemoryAllocater {
    static creatBlock(size: number): ArrayBuffer;
    static freeMemoryBlock(buffer: ArrayBuffer): void;
}
