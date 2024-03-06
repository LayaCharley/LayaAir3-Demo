import { ShaderDataType } from "../../RenderEngine/RenderShader/ShaderData";
import { UniformMapType } from "../../RenderEngine/RenderShader/SubShader";
import { IShaderCompiledObj } from "./ShaderCompile";
import { ShaderNode } from "./ShaderNode";
export declare class ShaderProcessInfo {
    defineString: string[];
    vs: ShaderNode;
    ps: ShaderNode;
    attributeMap: {
        [name: string]: [number, ShaderDataType];
    };
    uniformMap: UniformMapType;
    is2D: boolean;
}
export declare class ShaderCompileDefineBase {
    nodeCommonMap: Array<string>;
    constructor(owner: any, name: string, compiledObj: IShaderCompiledObj);
}
