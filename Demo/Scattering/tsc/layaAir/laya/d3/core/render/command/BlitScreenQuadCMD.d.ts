import { Shader3D } from "../../../../RenderEngine/RenderShader/Shader3D";
import { ShaderData } from "../../../../RenderEngine/RenderShader/ShaderData";
import { BaseTexture } from "../../../../resource/BaseTexture";
import { Command } from "./Command";
import { CommandBuffer } from "./CommandBuffer";
import { Vector4 } from "../../../../maths/Vector4";
import { RenderTexture } from "../../../../resource/RenderTexture";
export declare class BlitScreenQuadCMD extends Command {
    static create(source: BaseTexture, dest: RenderTexture, offsetScale?: Vector4, shader?: Shader3D, shaderData?: ShaderData, subShader?: number, screenType?: number, commandbuffer?: CommandBuffer): BlitScreenQuadCMD;
    constructor();
    set shaderData(value: ShaderData);
    setshader(shader: Shader3D, subShader: number, shaderData: ShaderData): void;
    run(): void;
    recover(): void;
    destroy(): void;
}
