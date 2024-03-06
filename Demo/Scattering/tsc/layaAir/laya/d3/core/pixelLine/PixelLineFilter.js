import { LayaGL } from "../../../layagl/LayaGL";
import { Vector3 } from "../../../maths/Vector3";
import { BufferUsage } from "../../../RenderEngine/RenderEnum/BufferTargetType";
import { DrawType } from "../../../RenderEngine/RenderEnum/DrawType";
import { MeshTopology } from "../../../RenderEngine/RenderEnum/RenderPologyMode";
import { BufferState } from "../../../webgl/utils/BufferState";
import { Bounds } from "../../math/Bounds";
import { GeometryElement } from "../GeometryElement";
import { PixelLineVertex } from "./PixelLineVertex";
export class PixelLineFilter extends GeometryElement {
    constructor(owner, maxLineCount) {
        super(MeshTopology.Lines, DrawType.DrawArray);
        this._floatCountPerVertices = 7;
        this._minUpdate = Number.MAX_VALUE;
        this._maxUpdate = Number.MIN_VALUE;
        this._floatBound = new Float32Array(6);
        this._calculateBound = false;
        this._maxLineCount = 0;
        this._lineCount = 0;
        var pointCount = maxLineCount * 2;
        this._ownerRender = owner;
        this._maxLineCount = maxLineCount;
        this._vertices = new Float32Array(pointCount * this._floatCountPerVertices);
        this._vertexBuffer = LayaGL.renderOBJCreate.createVertexBuffer3D(PixelLineVertex.vertexDeclaration.vertexStride * pointCount, BufferUsage.Static, false);
        this._vertexBuffer.vertexDeclaration = PixelLineVertex.vertexDeclaration;
        var bufferState = new BufferState();
        this.bufferState = bufferState;
        this.bufferState.applyState([this._vertexBuffer], null);
        var min = PixelLineFilter._tempVector0;
        var max = PixelLineFilter._tempVector1;
        min.setValue(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
        max.setValue(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);
        this._bounds = new Bounds(min, max);
    }
    _getType() {
        return PixelLineFilter._type;
    }
    _resizeLineData(maxCount) {
        var pointCount = maxCount * 2;
        var lastVertices = this._vertices;
        this._vertexBuffer.destroy();
        this._maxLineCount = maxCount;
        var vertexCount = pointCount * this._floatCountPerVertices;
        this._vertices = new Float32Array(vertexCount);
        this._vertexBuffer = LayaGL.renderOBJCreate.createVertexBuffer3D(PixelLineVertex.vertexDeclaration.vertexStride * pointCount, BufferUsage.Static, false);
        this._vertexBuffer.vertexDeclaration = PixelLineVertex.vertexDeclaration;
        if (vertexCount < lastVertices.length) {
            this._vertices.set(new Float32Array(lastVertices.buffer, 0, vertexCount));
            this._vertexBuffer.setData(this._vertices.buffer, 0, 0, vertexCount * 4);
        }
        else {
            this._vertices.set(lastVertices);
            this._vertexBuffer.setData(this._vertices.buffer, 0, 0, lastVertices.length * 4);
        }
        this.bufferState.applyState([this._vertexBuffer], null);
        this._minUpdate = Number.MAX_VALUE;
        this._maxUpdate = Number.MIN_VALUE;
    }
    _updateLineVertices(offset, startPosition, endPosition, startColor, endColor) {
        if (startPosition) {
            this._vertices[offset + 0] = startPosition.x;
            this._vertices[offset + 1] = startPosition.y;
            this._vertices[offset + 2] = startPosition.z;
        }
        if (startColor) {
            this._vertices[offset + 3] = startColor.r;
            this._vertices[offset + 4] = startColor.g;
            this._vertices[offset + 5] = startColor.b;
            this._vertices[offset + 6] = startColor.a;
        }
        if (endPosition) {
            this._vertices[offset + 7] = endPosition.x;
            this._vertices[offset + 8] = endPosition.y;
            this._vertices[offset + 9] = endPosition.z;
        }
        if (endColor) {
            this._vertices[offset + 10] = endColor.r;
            this._vertices[offset + 11] = endColor.g;
            this._vertices[offset + 12] = endColor.b;
            this._vertices[offset + 13] = endColor.a;
        }
        this._minUpdate = Math.min(this._minUpdate, offset);
        this._maxUpdate = Math.max(this._maxUpdate, offset + this._floatCountPerVertices * 2);
        var bounds = this._bounds;
        var floatBound = this._floatBound;
        var min = bounds.getMin(), max = bounds.getMax();
        Vector3.min(min, startPosition, min);
        Vector3.min(min, endPosition, min);
        Vector3.max(max, startPosition, max);
        Vector3.max(max, endPosition, max);
        bounds.setMin(min);
        bounds.setMax(max);
        floatBound[0] = min.x, floatBound[1] = min.y, floatBound[2] = min.z;
        floatBound[3] = max.x, floatBound[4] = max.y, floatBound[5] = max.z;
        this._ownerRender.boundsChange = true;
    }
    _reCalculateBound() {
        if (this._calculateBound) {
            var vertices = this._vertices;
            var min = PixelLineFilter._tempVector0;
            var max = PixelLineFilter._tempVector1;
            min.setValue(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
            max.setValue(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);
            for (var i = 0; i < this._lineCount * 2; ++i) {
                var offset = this._floatCountPerVertices * i;
                var x = vertices[offset + 0], y = vertices[offset + 1], z = vertices[offset + 2];
                min.x = Math.min(x, min.x);
                min.y = Math.min(y, min.y);
                min.z = Math.min(z, min.z);
                max.x = Math.max(x, max.x);
                max.y = Math.max(y, max.y);
                max.z = Math.max(z, max.z);
            }
            this._bounds.setMin(min);
            this._bounds.setMax(max);
            var floatBound = this._floatBound;
            floatBound[0] = min.x, floatBound[1] = min.y, floatBound[2] = min.z;
            floatBound[3] = max.x, floatBound[4] = max.y, floatBound[5] = max.z;
            this._calculateBound = false;
        }
    }
    _removeLineData(index) {
        var floatCount = this._floatCountPerVertices * 2;
        var nextIndex = index + 1;
        var offset = index * floatCount;
        var vertices = this._vertices;
        var rightPartVertices = new Float32Array(vertices.buffer, nextIndex * floatCount * 4, (this._lineCount - nextIndex) * floatCount);
        vertices.set(rightPartVertices, offset);
        this._minUpdate = Math.min(this._minUpdate, offset);
        this._maxUpdate = Math.max(this._maxUpdate, offset + rightPartVertices.length);
        this._lineCount--;
        var floatBound = this._floatBound;
        var startX = vertices[offset], startY = vertices[offset + 1], startZ = vertices[offset + 2];
        var endX = vertices[offset + 7], endY = vertices[offset + 8], endZ = vertices[offset + 9];
        var minX = floatBound[0], minY = floatBound[1], minZ = floatBound[2];
        var maxX = floatBound[3], maxY = floatBound[4], maxZ = floatBound[5];
        if ((startX === minX) || (startX === maxX) || (startY === minY) || (startY === maxY) || (startZ === minZ) || (startZ === maxZ) ||
            (endX === minX) || (endX === maxX) || (endY === minY) || (endY === maxY) || (endZ === minZ) || (endZ === maxZ))
            this._calculateBound = true;
    }
    _updateLineData(index, startPosition, endPosition, startColor, endColor) {
        var floatCount = this._floatCountPerVertices * 2;
        this._updateLineVertices(index * floatCount, startPosition, endPosition, startColor, endColor);
    }
    _updateLineDatas(index, data) {
        var floatCount = this._floatCountPerVertices * 2;
        var count = data.length;
        for (var i = 0; i < count; i++) {
            var line = data[i];
            this._updateLineVertices((index + i) * floatCount, line.startPosition, line.endPosition, line.startColor, line.endColor);
        }
    }
    _getLineData(index, out) {
        var startPosition = out.startPosition;
        var startColor = out.startColor;
        var endPosition = out.endPosition;
        var endColor = out.endColor;
        var vertices = this._vertices;
        var offset = index * this._floatCountPerVertices * 2;
        startPosition.x = vertices[offset + 0];
        startPosition.y = vertices[offset + 1];
        startPosition.z = vertices[offset + 2];
        startColor.r = vertices[offset + 3];
        startColor.g = vertices[offset + 4];
        startColor.b = vertices[offset + 5];
        startColor.a = vertices[offset + 6];
        endPosition.x = vertices[offset + 7];
        endPosition.y = vertices[offset + 8];
        endPosition.z = vertices[offset + 9];
        endColor.r = vertices[offset + 10];
        endColor.g = vertices[offset + 11];
        endColor.b = vertices[offset + 12];
        endColor.a = vertices[offset + 13];
    }
    _prepareRender(state) {
        return true;
    }
    _updateRenderParams(state) {
        this.clearRenderParams();
        if (this._minUpdate !== Number.MAX_VALUE && this._maxUpdate !== Number.MIN_VALUE) {
            this._vertexBuffer.setData(this._vertices.buffer, this._minUpdate * 4, this._minUpdate * 4, (this._maxUpdate - this._minUpdate) * 4);
            this._minUpdate = Number.MAX_VALUE;
            this._maxUpdate = Number.MIN_VALUE;
        }
        if (this._lineCount > 0) {
            this.setDrawArrayParams(0, this._lineCount * 2);
        }
    }
    destroy() {
        if (this._destroyed)
            return;
        super.destroy();
        this.bufferState.destroy();
        this._vertexBuffer.destroy();
        this.bufferState = null;
        this._vertexBuffer = null;
        this._vertices = null;
    }
}
PixelLineFilter._tempVector0 = new Vector3();
PixelLineFilter._tempVector1 = new Vector3();
PixelLineFilter._type = GeometryElement._typeCounter++;

//# sourceMappingURL=PixelLineFilter.js.map
