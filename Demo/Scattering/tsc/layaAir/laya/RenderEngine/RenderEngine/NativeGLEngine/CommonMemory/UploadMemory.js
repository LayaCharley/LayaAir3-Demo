import { NativeMemory } from "./NativeMemory";
export class UploadMemory extends NativeMemory {
    constructor(size) {
        super(size, false);
        this._currentOffsetInByte = 0;
    }
    addBlockCell(node, dataSizeInByte) {
        if (node.uploadDataTOShareMemory(this, this._currentOffsetInByte)) {
            this._currentOffsetInByte += dataSizeInByte;
        }
    }
    check(size) {
        return this._currentOffsetInByte + size < this._byteLength;
    }
    clear() {
        this._currentOffsetInByte = 0;
    }
}

//# sourceMappingURL=UploadMemory.js.map
