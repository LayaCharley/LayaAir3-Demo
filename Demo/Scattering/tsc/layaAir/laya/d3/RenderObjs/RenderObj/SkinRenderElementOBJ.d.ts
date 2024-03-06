import { ShaderInstance } from "../../../RenderEngine/RenderShader/ShaderInstance";
import { RenderElementOBJ } from "./RenderElementOBJ";
export declare class SkinRenderElementOBJ extends RenderElementOBJ {
    skinnedData: Float32Array[];
    constructor();
    drawGeometry(shaderIns: ShaderInstance): void;
}
