import { DefineDatas } from "./DefineDatas";
import { ShaderDefine } from "./ShaderDefine";
import { ShaderVariantCollection } from "./ShaderVariantCollection";
import { SubShader } from "./SubShader";
export interface IShaderObjStructor {
    name: string;
    enableInstancing: boolean;
    supportReflectionProbe: boolean;
    attributeMap: any;
    uniformMap: any;
    defaultValue: any;
    shaderPass: Array<any>;
}
export interface IShaderpassStructor {
    VS?: string;
    FS?: string;
    VSPath?: string;
    FSPath?: string;
    pipeline?: string;
}
export declare class Shader3D {
    static _configDefineValues: DefineDatas;
    static CULL: number;
    static BLEND: number;
    static BLEND_SRC: number;
    static BLEND_DST: number;
    static BLEND_SRC_RGB: number;
    static BLEND_DST_RGB: number;
    static BLEND_SRC_ALPHA: number;
    static BLEND_DST_ALPHA: number;
    static BLEND_EQUATION: number;
    static BLEND_EQUATION_RGB: number;
    static BLEND_EQUATION_ALPHA: number;
    static DEPTH_TEST: number;
    static DEPTH_WRITE: number;
    static STENCIL_TEST: number;
    static STENCIL_WRITE: number;
    static STENCIL_Ref: number;
    static STENCIL_Op: number;
    static PERIOD_CUSTOM: number;
    static PERIOD_MATERIAL: number;
    static PERIOD_SPRITE: number;
    static PERIOD_CAMERA: number;
    static PERIOD_SCENE: number;
    static debugMode: boolean;
    static debugShaderVariantCollection: ShaderVariantCollection;
    static init(): void;
    static getDefineByName(name: string): ShaderDefine;
    static propertyNameToID(name: string): number;
    static propertyIDToName(id: number): string;
    static addInclude(fileName: string, txt: string): void;
    static compileShaderByDefineNames(shaderName: string, subShaderIndex: number, passIndex: number, defineNames: string[], nodeCommonMap: string[]): void;
    static add(name: string, enableInstancing?: boolean, supportReflectionProbe?: boolean): Shader3D;
    static find(name: string): Shader3D;
    static parse(data: IShaderObjStructor, basePath: string): Shader3D;
    get name(): string;
    constructor(name: string, enableInstancing: boolean, supportReflectionProbe: boolean);
    addSubShader(subShader: SubShader): void;
    getSubShaderAt(index: number): SubShader;
}
