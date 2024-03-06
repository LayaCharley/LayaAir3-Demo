import { ShaderDataItem, ShaderDataType } from "../../RenderEngine/RenderShader/ShaderData";
import { IShaderCompiledObj } from "../../webgl/utils/ShaderCompile";
import { ShaderPass } from "./ShaderPass";
export declare type UniformMapType = {
    [blockName: string]: {
        [uniformName: string]: ShaderDataType;
    } | ShaderDataType;
};
export declare type AttributeMapType = {
    [name: string]: [number, ShaderDataType];
};
export declare class SubShader {
    static IncludeUniformMap: any;
    static regIncludeBindUnifrom(includeName: string, uniformMap: {
        [name: string]: ShaderDataType;
    }, defaultValue: {
        [key: string]: any;
    }): void;
    static readonly DefaultAttributeMap: {
        [name: string]: [number, ShaderDataType];
    };
    static __init__(): void;
    constructor(attributeMap?: {
        [name: string]: [number, ShaderDataType];
    }, uniformMap?: UniformMapType, uniformDefaultValue?: {
        [name: string]: ShaderDataItem;
    });
    setFlag(key: string, value: string): void;
    getFlag(key: string): string;
    addShaderPass(vs: string, ps: string, pipelineMode?: string): ShaderPass;
    _addShaderPass(compiledObj: IShaderCompiledObj, pipelineMode?: string): ShaderPass;
    private _addIncludeUniform;
}
