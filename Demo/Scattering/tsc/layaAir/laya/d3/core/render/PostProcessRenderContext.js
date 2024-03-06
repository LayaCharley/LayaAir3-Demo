export class PostProcessRenderContext {
    constructor() {
        this.source = null;
        this.indirectTarget = null;
        this.destination = null;
        this.camera = null;
        this.compositeShaderData = null;
        this.command = null;
        this.deferredReleaseTextures = [];
    }
    createRTByContextReleaseTexture(width, height, colorFormat, depthFormat, mipmap = false, multiSamples = 1, depthTexture = false, sRGB = false) {
        let n = this.deferredReleaseTextures.length;
        for (let index = 0; index < n; index++) {
            let rt = this.deferredReleaseTextures[index];
            if (rt.width == width && rt.height == height && rt.colorFormat == colorFormat && rt.depthStencilFormat == depthFormat && rt._generateMipmap == mipmap && rt.multiSamples == multiSamples && rt.generateDepthTexture == depthTexture && rt._gammaSpace == sRGB) {
                rt._inPool = false;
                let end = this.deferredReleaseTextures[n - 1];
                this.deferredReleaseTextures[index] = end;
                this.deferredReleaseTextures.length -= 1;
                return rt;
            }
        }
        return null;
    }
}

//# sourceMappingURL=PostProcessRenderContext.js.map
