import { LayaGL } from "../../../layagl/LayaGL";
import { DrawType } from "../../RenderEnum/DrawType";
import { IndexFormat } from "../../RenderEnum/IndexFormat";
export class WebGPURenderCommandEncoder {
    constructor() {
        this.cachemap = {};
        this.engine = LayaGL.renderEngine;
    }
    startRender(renderpassDes) {
        this.commandEncoder = this.engine._device.createCommandEncoder();
        this.renderpassEncoder = this.commandEncoder.beginRenderPass(renderpassDes);
        this.curpipeline = null;
        this.curGeometry = null;
        this.cachemap = {};
    }
    setPipeline(pipeline) {
        if (pipeline != this.curpipeline) {
            this.renderpassEncoder.setPipeline(pipeline.pipeline);
            this.curpipeline = pipeline;
        }
    }
    applyGeometry(geometry) {
        if (geometry != this.curGeometry) {
            this.curGeometry = geometry;
            let state = geometry.bufferState;
            let vertexbuffers = geometry.bufferState._vertexBuffers;
            let indexbuffer = geometry.bufferState._bindedIndexBuffer;
            for (let i = 0; i < vertexbuffers.length; i++) {
                this.renderpassEncoder.setVertexBuffer(state.vertexlayout.VAElements[i][0].shaderLocation, vertexbuffers[i]._glBuffer._gpuBuffer);
            }
            if (indexbuffer) {
                let format = (geometry.indexFormat == IndexFormat.UInt16) ? "uint16" : "uint32";
                this.renderpassEncoder.setIndexBuffer(indexbuffer._glBuffer._gpuBuffer, format);
            }
        }
        let element = geometry.drawParams.elements;
        let length = geometry.drawParams.length;
        switch (geometry.drawType) {
            case DrawType.DrawArray:
                for (let i = 0; i < length; i += 2) {
                    this.renderpassEncoder.draw(element[i + 1], 1, element[i], 0);
                }
                break;
            case DrawType.DrawElement:
                for (let i = 0; i < length; i += 2) {
                    this.renderpassEncoder.drawIndexed(element[i + 1], 1, element[i]);
                }
                break;
            case DrawType.DrawArrayInstance:
                for (let i = 0; i < length; i += 2) {
                    this.renderpassEncoder.draw(element[i + 1], geometry.instanceCount, element[i]);
                }
                break;
            case DrawType.DrawElementInstance:
                for (let i = 0; i < length; i += 2) {
                    this.renderpassEncoder.drawIndexed(element[i + 1], geometry.instanceCount, element[i], 0);
                }
                break;
        }
    }
    setIndexBuffer(buffer, indexformat, offset = 0, byteSize) {
        this.renderpassEncoder.setIndexBuffer(buffer._gpuBuffer, indexformat, offset, byteSize);
    }
    setVertexBuffer(slot, buffer, offset, size) {
        this.renderpassEncoder.setVertexBuffer(slot, buffer, offset, size);
    }
    drawIndirect(indirectBuffer, indirectOffset) {
    }
    drawIndexedIndirect(indirectBuffer, indirectOffset) {
    }
    setBindGroup(index, bindGroup, dynamicOffsets) {
        if (this.cachemap[index] != bindGroup) {
            this.cachemap[index] = bindGroup;
            this.renderpassEncoder.setBindGroup(index, bindGroup);
        }
    }
    setBindGroupByDataOffaset(index, bindGroup, dynamicOffsetsData, dynamicOffsetsDataStart, dynamicOffsetsDataLength) {
        this.renderpassEncoder.setBindGroup(index, bindGroup, dynamicOffsetsData, dynamicOffsetsDataStart, dynamicOffsetsDataLength);
    }
    end() {
        this.renderpassEncoder.end();
    }
    setViewport(x, y, width, height, minDepth, maxDepth) {
        this.renderpassEncoder.setViewport(x, y, width, height, minDepth, maxDepth);
    }
    setScissorRect(x, y, width, height) {
        this.renderpassEncoder.setScissorRect(x, y, width, height);
    }
    setBlendConstant(color) {
        this.renderpassEncoder.setBlendConstant(color);
    }
    setStencilReference(reference) {
        this.renderpassEncoder.setStencilReference(reference);
    }
    executeBundles(bundles) {
        this.renderpassEncoder.executeBundles(bundles);
    }
    finish() {
        return this.commandEncoder.finish();
    }
}

//# sourceMappingURL=WebGPURenderCommandEncoder.js.map
