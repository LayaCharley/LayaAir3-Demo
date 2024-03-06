import { LayaGL } from "../../../layagl/LayaGL";
import { Vector4 } from "../../../maths/Vector4";
import { Viewport } from "../../math/Viewport";
export class NativeRenderContext3DOBJ {
    constructor() {
        this._viewPort = new Viewport(0, 0, 0, 0);
        this._scissor = new Vector4();
        this._nativeObj = new window.conchRenderContext3D(LayaGL.renderEngine._nativeObj);
        this.pipelineMode = "Forward";
    }
    end() {
    }
    drawRenderElement(renderelemt) {
        renderelemt._render(this);
    }
    applyContext(cameraUpdateMark) {
        this._nativeObj.changeViewport(this._viewPort.x, this._viewPort.y, this._viewPort.width, this._viewPort.height);
        this._nativeObj.changeScissor(this._scissor.x, this._scissor.y, this._scissor.z, this._scissor.w);
        this.destTarget && this.destTarget._start();
        this._nativeObj.applyContext(cameraUpdateMark);
    }
    set destTarget(destTarget) {
        this._destTarget = destTarget;
        this._nativeObj.destTarget = destTarget ? destTarget._renderTarget : null;
    }
    get destTarget() {
        return this._destTarget;
    }
    set viewPort(viewPort) {
        this._viewPort = viewPort;
        this._nativeObj.changeViewport(viewPort.x, viewPort.y, viewPort.width, viewPort.height);
    }
    get viewPort() {
        return this._viewPort;
    }
    set scissor(scissor) {
        this._scissor = scissor;
        this._nativeObj.changeScissor(scissor.x, scissor.y, scissor.z, scissor.w);
    }
    get scissor() {
        return this._scissor;
    }
    set invertY(invertY) {
        this._nativeObj.invertY = invertY;
    }
    get invertY() {
        return this._nativeObj.invertY;
    }
    set pipelineMode(pipelineMode) {
        this._nativeObj.pipelineMode = pipelineMode;
    }
    get pipelineMode() {
        return this._nativeObj.pipelineMode;
    }
    set globalShaderData(globalShaderData) {
        this._globalShaderData = globalShaderData;
        this._nativeObj.globalShaderData = globalShaderData ? globalShaderData._nativeObj : null;
    }
    get globalShaderData() {
        return this._globalShaderData;
    }
    set sceneShaderData(sceneShaderData) {
        this._sceneShaderData = sceneShaderData;
        this._nativeObj.sceneShaderData = sceneShaderData ? sceneShaderData._nativeObj : null;
    }
    get sceneShaderData() {
        return this._sceneShaderData;
    }
    set cameraShaderData(cameraShaderData) {
        this._cameraShaderData = cameraShaderData;
        this._nativeObj.cameraShaderData = cameraShaderData ? cameraShaderData._nativeObj : null;
    }
    get cameraShaderData() {
        return this._cameraShaderData;
    }
    set sceneID(sceneID) {
        this._nativeObj.sceneID = sceneID;
    }
    get sceneID() {
        return this._nativeObj.sceneID;
    }
    set cameraUpdateMark(cameraUpdateMark) {
        this._nativeObj.cameraUpdateMark = cameraUpdateMark;
    }
    get cameraUpdateMark() {
        return this._nativeObj.cameraUpdateMark;
    }
}

//# sourceMappingURL=NativeRenderContext3DOBJ.js.map
