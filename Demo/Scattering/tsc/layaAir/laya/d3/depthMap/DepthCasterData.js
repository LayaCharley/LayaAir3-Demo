import { Shader3D } from "../../RenderEngine/RenderShader/Shader3D";
import { UniformBufferParamsType, UnifromBufferData } from "../../RenderEngine/UniformBufferData";
export class DepthCasterData {
    static createDepthCasterUniformBlock() {
        if (!DepthCasterData.DepthCasterUBOData) {
            let uniformpara = new Map();
            uniformpara.set(Shader3D.propertyNameToID("u_ShadowBias"), UniformBufferParamsType.Vector4);
            uniformpara.set(Shader3D.propertyNameToID("u_ShadowLightDirection"), UniformBufferParamsType.Vector3);
            DepthCasterData.DepthCasterUBOData = new UnifromBufferData(uniformpara);
        }
        return DepthCasterData.DepthCasterUBOData;
    }
}

//# sourceMappingURL=DepthCasterData.js.map
