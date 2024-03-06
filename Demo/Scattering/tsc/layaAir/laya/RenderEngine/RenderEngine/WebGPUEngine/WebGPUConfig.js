export class WebGPUConfig {
    constructor() {
        this.deviceDescriptor = {};
        this.alphaMode = "premultiplied";
        this.usage = GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC;
        this.colorSpace = "srgb";
    }
}

//# sourceMappingURL=WebGPUConfig.js.map
