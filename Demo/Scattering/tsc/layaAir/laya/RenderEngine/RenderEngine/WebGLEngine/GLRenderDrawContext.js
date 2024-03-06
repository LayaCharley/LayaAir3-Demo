import { DrawType } from "../../RenderEnum/DrawType";
import { IndexFormat } from "../../RenderEnum/IndexFormat";
import { MeshTopology } from "../../RenderEnum/RenderPologyMode";
import { RenderStatisticsInfo } from "../../RenderEnum/RenderStatInfo";
import { WebGLExtension } from "./GLEnum/WebGLExtension";
import { GLObject } from "./GLObject";
export class GLRenderDrawContext extends GLObject {
    constructor(engine) {
        super(engine);
        if (!this._engine.isWebGL2) {
            this._angleInstancedArrays = this._engine._supportCapatable.getExtension(WebGLExtension.ANGLE_instanced_arrays);
        }
    }
    getMeshTopology(mode) {
        switch (mode) {
            case MeshTopology.Points:
                return this._gl.POINTS;
            case MeshTopology.Lines:
                return this._gl.LINES;
            case MeshTopology.LineLoop:
                return this._gl.LINE_LOOP;
            case MeshTopology.LineStrip:
                return this._gl.LINE_STRIP;
            case MeshTopology.Triangles:
                return this._gl.TRIANGLES;
            case MeshTopology.TriangleStrip:
                return this._gl.TRIANGLE_STRIP;
            case MeshTopology.TriangleFan:
                return this._gl.TRIANGLE_FAN;
        }
    }
    getIndexType(type) {
        switch (type) {
            case IndexFormat.UInt8:
                return this._gl.UNSIGNED_BYTE;
            case IndexFormat.UInt16:
                return this._gl.UNSIGNED_SHORT;
            case IndexFormat.UInt32:
                return this._gl.UNSIGNED_INT;
        }
    }
    drawElementsInstanced(mode, count, type, offset, instanceCount) {
        if (this._engine.isWebGL2)
            this._gl.drawElementsInstanced(mode, count, type, offset, instanceCount);
        else
            this._angleInstancedArrays.drawElementsInstancedANGLE(mode, count, type, offset, instanceCount);
        this._engine._addStatisticsInfo(RenderStatisticsInfo.DrawCall, 1);
        this._engine._addStatisticsInfo(RenderStatisticsInfo.InstanceDrawCall, 1);
        this._engine._addStatisticsInfo(RenderStatisticsInfo.Triangle, count / 3 * instanceCount);
    }
    drawArraysInstanced(mode, first, count, instanceCount) {
        if (this._engine.isWebGL2)
            this._gl.drawArraysInstanced(mode, first, count, instanceCount);
        else
            this._angleInstancedArrays.drawArraysInstancedANGLE(mode, first, count, instanceCount);
        this._engine._addStatisticsInfo(RenderStatisticsInfo.DrawCall, 1);
        this._engine._addStatisticsInfo(RenderStatisticsInfo.InstanceDrawCall, 1);
        this._engine._addStatisticsInfo(RenderStatisticsInfo.Triangle, (count - 2) * instanceCount);
    }
    drawArrays(mode, first, count) {
        this._gl.drawArrays(mode, first, count);
        this._engine._addStatisticsInfo(RenderStatisticsInfo.DrawCall, 1);
        this._engine._addStatisticsInfo(RenderStatisticsInfo.Triangle, (count - 2));
    }
    drawElements(mode, count, type, offset) {
        this._gl.drawElements(mode, count, type, offset);
        this._engine._addStatisticsInfo(RenderStatisticsInfo.DrawCall, 1);
        this._engine._addStatisticsInfo(RenderStatisticsInfo.Triangle, count / 3);
    }
    drawElements2DTemp(mode, count, type, offset) {
        mode = this.getMeshTopology(mode);
        type = this.getIndexType(type);
        this._gl.drawElements(mode, count, type, offset);
        this._engine._addStatisticsInfo(RenderStatisticsInfo.DrawCall, 1);
        this._engine._addStatisticsInfo(RenderStatisticsInfo.Triangle, count / 3);
    }
    drawGeometryElement(geometryElement) {
        geometryElement.bufferState.bind();
        let element = geometryElement.drawParams.elements;
        let length = geometryElement.drawParams.length;
        switch (geometryElement.drawType) {
            case DrawType.DrawArray:
                for (let i = 0; i < length; i += 2) {
                    this.drawArrays(geometryElement._glmode, element[i], element[i + 1]);
                }
                break;
            case DrawType.DrawElement:
                for (let i = 0; i < length; i += 2) {
                    this.drawElements(geometryElement._glmode, element[i + 1], geometryElement._glindexFormat, element[i]);
                }
                break;
            case DrawType.DrawArrayInstance:
                for (let i = 0; i < length; i += 2) {
                    this.drawArraysInstanced(geometryElement._glmode, element[i], element[i + 1], geometryElement.instanceCount);
                }
                break;
            case DrawType.DrawElementInstance:
                for (let i = 0; i < length; i += 2) {
                    this.drawElementsInstanced(geometryElement._glmode, element[i + 1], geometryElement._glindexFormat, element[i], geometryElement.instanceCount);
                }
                break;
            default:
                break;
        }
    }
}

//# sourceMappingURL=GLRenderDrawContext.js.map
