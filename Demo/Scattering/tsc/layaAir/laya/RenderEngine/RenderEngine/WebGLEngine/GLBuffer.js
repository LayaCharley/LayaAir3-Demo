import { BufferTargetType, BufferUsage } from "../../RenderEnum/BufferTargetType";
import { RenderStatisticsInfo } from "../../RenderEnum/RenderStatInfo";
import { GLObject } from "./GLObject";
export class GLBuffer extends GLObject {
    constructor(engine, targetType, bufferUsageType) {
        super(engine);
        this._byteLength = 0;
        this._glTargetType = targetType;
        this._glBufferUsageType = bufferUsageType;
        this._getGLTarget(this._glTargetType);
        this._getGLUsage(this._glBufferUsageType);
        this._glBuffer = this._gl.createBuffer();
    }
    _getGLUsage(usage) {
        switch (usage) {
            case BufferUsage.Static:
                this._glUsage = this._gl.STATIC_DRAW;
                break;
            case BufferUsage.Dynamic:
                this._glUsage = this._gl.DYNAMIC_DRAW;
                break;
            case BufferUsage.Stream:
                this._glUsage = this._gl.STREAM_DRAW;
                break;
            default:
                console.error("usage is not standard");
                break;
        }
    }
    _getGLTarget(target) {
        switch (target) {
            case BufferTargetType.ARRAY_BUFFER:
                this._glTarget = this._gl.ARRAY_BUFFER;
                break;
            case BufferTargetType.UNIFORM_BUFFER:
                this._glTarget = this._gl.UNIFORM_BUFFER;
                break;
            case BufferTargetType.ELEMENT_ARRAY_BUFFER:
                this._glTarget = this._gl.ELEMENT_ARRAY_BUFFER;
                break;
            default:
                break;
        }
    }
    _memorychange(bytelength) {
        this._engine._addStatisticsInfo(RenderStatisticsInfo.BufferMemory, bytelength);
        this._engine._addStatisticsInfo(RenderStatisticsInfo.GPUMemory, bytelength);
    }
    bindBuffer() {
        if (this._engine._getbindBuffer(this._glTargetType) != this) {
            this._gl.bindBuffer(this._glTarget, this._glBuffer);
            this._engine._setbindBuffer(this._glTargetType, this);
            return true;
        }
        return false;
    }
    unbindBuffer() {
        if (this._engine._getbindBuffer(this._glTargetType) == this) {
            this._gl.bindBuffer(this._glTarget, null);
            this._engine._setbindBuffer(this._glTargetType, null);
        }
    }
    orphanStorage() {
        this.bindBuffer();
        this.setDataLength(this._byteLength);
    }
    setDataLength(srcData) {
        let gl = this._gl;
        this.bindBuffer();
        this._memorychange(-this._byteLength);
        this._byteLength = srcData;
        gl.bufferData(this._glTarget, this._byteLength, this._glUsage);
        this.unbindBuffer();
        this._memorychange(this._byteLength);
    }
    setData(srcData, offset) {
        let gl = this._gl;
        this.bindBuffer();
        gl.bufferSubData(this._glTarget, offset, srcData);
        this.unbindBuffer();
    }
    setDataEx(srcData, offset, length) {
        let gl = this._gl;
        this.bindBuffer();
        gl.bufferSubData(this._glTarget, offset, srcData, 0, length);
        this.unbindBuffer();
    }
    bindBufferBase(glPointer) {
        if (this._engine._getBindUBOBuffer(glPointer) != this) {
            const gl = this._gl;
            gl.bindBufferBase(this._glTarget, glPointer, this._glBuffer);
            this._engine._setBindUBOBuffer(glPointer, this);
        }
    }
    bindBufferRange(glPointer, offset, byteCount) {
        const gl = this._gl;
        gl.bindBufferRange(this._glTarget, glPointer, this._glBuffer, offset, byteCount);
    }
    resizeBuffer(dataLength) {
        this.bindBuffer();
        const gl = this._gl;
        this._byteLength = dataLength;
        gl.bufferData(this._glTarget, this._byteLength, this._glUsage);
    }
    destroy() {
        super.destroy();
        const gl = this._gl;
        gl.deleteBuffer(this._glBuffer);
        this._memorychange(-this._byteLength);
        this._byteLength = 0;
        this._engine = null;
        this._glBuffer = null;
        this._glTarget = null;
        this._glUsage = null;
        this._gl = null;
    }
}

//# sourceMappingURL=GLBuffer.js.map
