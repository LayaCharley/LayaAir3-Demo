import { ShaderVariable } from "../RenderShader/ShaderVariable";
export interface IRenderShaderInstance {
    getUniformMap(): ShaderVariable[];
    destroy(): void;
}
