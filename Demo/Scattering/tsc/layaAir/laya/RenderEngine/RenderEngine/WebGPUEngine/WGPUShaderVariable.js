import { ShaderVariable } from "../../RenderShader/ShaderVariable";
export class WGPUShaderVariable extends ShaderVariable {
    constructor() {
        super();
        this.block = false;
    }
    containProperty(propertyIndex) {
        if (this.block) {
            for (let i = 0, n = this.blockProperty.length; i < n; i++) {
                if (this.blockProperty[i].id == propertyIndex)
                    return true;
            }
            return false;
        }
        else {
            return this.dataOffset == propertyIndex;
        }
    }
}

//# sourceMappingURL=WGPUShaderVariable.js.map
