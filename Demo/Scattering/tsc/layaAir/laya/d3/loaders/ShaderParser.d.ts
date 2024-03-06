import { IShaderObjStructor, Shader3D } from "../../RenderEngine/RenderShader/Shader3D";
import { ShaderDataType } from "../../RenderEngine/RenderShader/ShaderData";
export declare class ShaderParser {
    static parse(data: string, basePath?: string): Shader3D;
    static compileToTree(sliceFlag: string[], data: string, sliceIndex: number): string[];
    static getMapKey(value: string): string;
    static getShaderBlock(source: string): IShaderObjStructor;
    static getCGBlock(source: string): {
        [key: string]: string;
    };
    static bindCG(shaderObj: IShaderObjStructor, cgmap: {
        [key: string]: string;
    }): void;
    static getShaderDataType(value: string): ShaderDataType;
    static getDefaultData(type: ShaderDataType, data: any): any;
}
