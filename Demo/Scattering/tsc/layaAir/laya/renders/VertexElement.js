export class VertexElement {
    constructor(offset, elementFormat, elementUsage) {
        this._offset = offset;
        this._elementFormat = elementFormat;
        this._elementUsage = elementUsage;
    }
    get offset() {
        return this._offset;
    }
    get elementFormat() {
        return this._elementFormat;
    }
    get elementUsage() {
        return this._elementUsage;
    }
}

//# sourceMappingURL=VertexElement.js.map
