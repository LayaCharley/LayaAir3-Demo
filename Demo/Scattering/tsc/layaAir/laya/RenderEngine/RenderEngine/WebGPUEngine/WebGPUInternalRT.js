import { WebGPUObject } from "./WebGPUObject";
export class WebGPUInternalRT extends WebGPUObject {
    constructor(engine, colorFormat, depthStencilFormat, isCube, generateMipmap, samples) {
        super(engine);
        this.isOffscreenRT = false;
        this.colorFormat = colorFormat;
        this.depthStencilFormat = depthStencilFormat;
        this._isCube = isCube;
        this._generateMipmap = generateMipmap;
        this._samples = samples;
        this._textures = [];
    }
    dispose() {
        super.destroy();
        this._textures.length && this._textures.forEach(element => {
            element.destroy();
        });
        this._depthTexture && this._depthTexture.destroy();
    }
}

//# sourceMappingURL=WebGPUInternalRT.js.map
