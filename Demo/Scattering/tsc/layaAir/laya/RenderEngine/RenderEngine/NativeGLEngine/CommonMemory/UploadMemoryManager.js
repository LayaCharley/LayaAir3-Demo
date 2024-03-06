import { SingletonList } from "../../../../utils/SingletonList";
import { UploadMemory } from "./UploadMemory";
export class UploadMemoryManager {
    constructor() {
        this._dataNodeList = new SingletonList();
        this._commandNums = 0;
        this._currentBlock = new UploadMemory(UploadMemoryManager.UploadMemorySize);
        this._conchUploadMemoryManager = new window.conchUploadMemoryManager();
    }
    static getInstance() {
        if (!UploadMemoryManager._instance) {
            UploadMemoryManager._instance = new UploadMemoryManager();
        }
        return UploadMemoryManager._instance;
    }
    _addNodeCommand(node, sizeInByte) {
        this._currentBlock.addBlockCell(node, sizeInByte);
        this._commandNums++;
    }
    static syncRenderMemory() {
        UploadMemoryManager.getInstance()._serialiseData();
        UploadMemoryManager.getInstance().clear();
    }
    _serialiseData() {
        const elements = this._dataNodeList.elements;
        for (let i = 0; i < this._dataNodeList.length; i++) {
            let node = elements[i];
            let dataSizeInByte = node.getUploadMemoryLength();
            if (dataSizeInByte > UploadMemoryManager.UploadMemorySize)
                throw "dataSize is too large, greater than UploadMemorySize,";
            if (this._currentBlock.check(dataSizeInByte)) {
                this.uploadData();
                this._addNodeCommand(node, dataSizeInByte);
            }
            else {
                this._addNodeCommand(node, dataSizeInByte);
            }
        }
        this.uploadData();
    }
    uploadData() {
        if (this._commandNums > 0) {
            this._conchUploadMemoryManager.uploadData(this._currentBlock._buffer, this._commandNums);
            this._commandNums = 0;
            this._currentBlock.clear();
        }
    }
    clear() {
        this._dataNodeList.length = 0;
    }
}
UploadMemoryManager.UploadMemorySize = 1024 * 1024;
UploadMemoryManager._instance = null;

//# sourceMappingURL=UploadMemoryManager.js.map
