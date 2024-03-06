import { SubShader } from "./SubShader";
import { ShaderCompileDefineBase } from "../../webgl/utils/ShaderCompileDefineBase";
import { IShaderCompiledObj } from "../../webgl/utils/ShaderCompile";
import { RenderState } from "./RenderState";
export declare class ShaderPass extends ShaderCompileDefineBase {
    statefirst: boolean;
    get renderState(): RenderState;
    constructor(owner: SubShader, compiledObj: IShaderCompiledObj);
}
