import { WebGPURenderPassDescriptor } from "../../../RenderEngine/RenderEngine/WebGPUEngine/WebGPURenderPassDescriptor";
import { WebGPURenderCommandEncoder } from "../../../RenderEngine/RenderEngine/WebGPUEngine/WebGPURenderCommandEncoder";
import { LayaGL } from "../../../layagl/LayaGL";
import { Vector4 } from "../../../maths/Vector4";
import { Viewport } from "../../math/Viewport";
export class WGPURenderContext3D {
    constructor() {
        this.viewPort = new Viewport(0, 0, 0, 0);
        this.scissor = new Vector4();
        this.pipelineMode = "Forward";
        this.commandEncoder = new WebGPURenderCommandEncoder();
        this.renderPassDec = new WebGPURenderPassDescriptor();
        this.device = LayaGL.renderEngine._device;
    }
    get destTarget() {
        return this._destTarget;
    }
    set destTarget(value) {
        this._destTarget = value;
        this.internalRT = this._destTarget._renderTarget;
    }
    applyContext(cameraUpdateMark) {
        this.destTarget && this.destTarget._start();
        this._startRender();
        this.cameraUpdateMark = cameraUpdateMark;
    }
    drawRenderElement(renderelemt) {
        this.destTarget && this.destTarget._start();
        this._startRender();
        this.end();
    }
    end() {
        this.commandEncoder.end();
        this.device.queue.submit([this.commandEncoder.finish()]);
        this.internalRT.loadClear = false;
    }
    _startRender() {
        this.internalRT = LayaGL.renderEngine._cavansRT;
        LayaGL.renderEngine.setRenderPassDescriptor(this.internalRT, this.renderPassDec);
        this.commandEncoder.startRender(this.renderPassDec.des);
    }
}

//# sourceMappingURL=WGPURenderContext3D.js.map
