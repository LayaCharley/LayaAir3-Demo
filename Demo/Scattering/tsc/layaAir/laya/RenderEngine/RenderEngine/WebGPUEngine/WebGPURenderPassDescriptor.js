import { Color } from "../../../maths/Color";
export class WebGPURenderPassDescriptor {
    constructor() {
        this.des = {
            colorAttachments: []
        };
    }
    setColorAttachments(textures, clear, clearColor = Color.BLACK) {
        let colorArray = this.des.colorAttachments;
        colorArray.length = textures.length;
        for (let i = 0, n = textures.length; i < n; i++) {
            let attachment = colorArray[i];
            if (!attachment)
                attachment = colorArray[i] = { view: textures[i].textureView, loadOp: "clear", storeOp: "store" };
            if (clear) {
                attachment.loadOp = "clear";
                attachment.clearValue = { r: clearColor.r, g: clearColor.g, b: clearColor.b, a: clearColor.a };
            }
            else
                attachment.loadOp = "load";
        }
    }
    setDepthAttachments(depthTex, clear, clearDepthValue = 1.0) {
        if (depthTex) {
            let depthStencil = this.des.depthStencilAttachment = { view: depthTex.textureView };
            if (clear) {
                depthStencil.depthClearValue = clearDepthValue;
                depthStencil.depthLoadOp = "clear";
                depthStencil.depthStoreOp = "store";
            }
            else {
                depthStencil.depthClearValue = clearDepthValue;
                depthStencil.depthLoadOp = "load";
                depthStencil.depthStoreOp = "store";
            }
        }
        else {
            delete this.des.depthStencilAttachment;
        }
    }
}

//# sourceMappingURL=WebGPURenderPassDescriptor.js.map
