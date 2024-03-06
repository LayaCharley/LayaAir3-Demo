import { BaseTexture } from "../../../../resource/BaseTexture";
import { Viewport } from "../../../math/Viewport";
import { Shader3D } from "../../../../RenderEngine/RenderShader/Shader3D";
import { ShaderData } from "../../../../RenderEngine/RenderShader/ShaderData";
import { Vector4 } from "../../../../maths/Vector4";
import { RenderTexture } from "../../../../resource/RenderTexture";
export declare class BlitFrameBufferCMD {
    static __init__(): void;
    static create(source: BaseTexture, dest: RenderTexture, viewport: Viewport, offsetScale?: Vector4, shader?: Shader3D, shaderData?: ShaderData, subShader?: number): BlitFrameBufferCMD;
    constructor();
    set shaderData(value: ShaderData);
    setshader(shader: Shader3D, subShader: number, shaderData: ShaderData): void;
    run(): void;
    recover(): void;
}
