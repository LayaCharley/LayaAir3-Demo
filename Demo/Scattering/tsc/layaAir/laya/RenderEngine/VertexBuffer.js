import { Buffer } from "./Buffer";
export class VertexBuffer extends Buffer {
    constructor(targetType, bufferUsageType) {
        super(targetType, bufferUsageType);
        this._instanceBuffer = false;
        this._vertexDeclaration = null;
    }
    get vertexDeclaration() {
        return this._vertexDeclaration;
    }
    set vertexDeclaration(value) {
        this._vertexDeclaration = value;
    }
    get instanceBuffer() {
        return this._instanceBuffer;
    }
    set instanceBuffer(value) {
        this._instanceBuffer = value;
    }
}

//# sourceMappingURL=VertexBuffer.js.map
