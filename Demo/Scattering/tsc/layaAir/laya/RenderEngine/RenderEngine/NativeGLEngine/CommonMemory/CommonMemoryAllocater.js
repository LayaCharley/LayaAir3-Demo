export class CommonMemoryAllocater {
    static creatBlock(size) {
        const buffer = new ArrayBuffer(size);
        return buffer;
    }
    static freeMemoryBlock(buffer) {
        buffer = null;
    }
}

//# sourceMappingURL=CommonMemoryAllocater.js.map
