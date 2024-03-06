export class KeyframeNodeList2D {
    constructor() {
        this._nodes = [];
    }
    get count() {
        return this._nodes.length;
    }
    set count(value) {
        this._nodes.length = value;
    }
    getNodeByIndex(index) {
        return this._nodes[index];
    }
    setNodeByIndex(index, node) {
        this._nodes[index] = node;
    }
}

//# sourceMappingURL=KeyframeNodeList2D.js.map