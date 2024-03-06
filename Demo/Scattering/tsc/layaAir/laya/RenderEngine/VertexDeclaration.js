import { VertexElementFormat } from "../renders/VertexElementFormat";
export class VertexDeclaration {
    constructor(vertexStride, vertexElements) {
        this._id = ++VertexDeclaration._uniqueIDCounter;
        this._vertexElementsDic = {};
        this._vertexStride = vertexStride;
        this._vertexElements = vertexElements;
        this._VAElements = [];
        var count = vertexElements.length;
        this._shaderValues = {};
        for (var j = 0; j < count; j++) {
            var vertexElement = vertexElements[j];
            var name = vertexElement._elementUsage;
            this._vertexElementsDic[name] = vertexElement;
            var value = new Int32Array(5);
            var elmentInfo = VertexElementFormat.getElementInfos(vertexElement._elementFormat);
            value[0] = elmentInfo[0];
            value[1] = elmentInfo[1];
            value[2] = elmentInfo[2];
            value[3] = this._vertexStride;
            value[4] = vertexElement._offset;
            this._shaderValues[name] = value;
            this._VAElements.push({ format: vertexElement._elementFormat, stride: vertexElement._offset, shaderLocation: name });
        }
    }
    get id() {
        return this._id;
    }
    get vertexStride() {
        return this._vertexStride;
    }
    get vertexElementCount() {
        return this._vertexElements.length;
    }
    getVertexElementByIndex(index) {
        return this._vertexElements[index];
    }
    getVertexElementByUsage(usage) {
        return this._vertexElementsDic[usage];
    }
}
VertexDeclaration._uniqueIDCounter = 1;

//# sourceMappingURL=VertexDeclaration.js.map
