import { StringKey } from "../../utils/StringKey";
import { BaseShader } from "./BaseShader";
import { ShaderValue } from "./ShaderValue";
export declare class Shader extends BaseShader {
    private static _count;
    private _attribInfo;
    static SHADERNAME2ID: number;
    static nameKey: StringKey;
    static sharders: any[];
    static create(vs: string, ps: string, saveName?: any, nameMap?: any, bindAttrib?: any[]): Shader;
    static withCompile2D(nameID: number, mainID: number, define: any, shaderName: any, createShader: Function, bindAttrib?: any[]): Shader;
    static addInclude(fileName: string, txt: string): void;
    static preCompile(nameID: number, vs: string, ps: string, nameMap: any): void;
    static preCompile2D(nameID: number, mainID: number, vs: string, ps: string, nameMap: any): void;
    private _nameMap;
    private _vs;
    private _ps;
    private _curActTexIndex;
    private _reCompile;
    private _render2DContext;
    tag: any;
    constructor(vs: string, ps: string, saveName?: any, nameMap?: any, bindAttrib?: any[] | null);
    protected recreateResource(): void;
    protected _disposeResource(): void;
    private _compile;
    private static _createShader;
    getUniform(name: string): any;
    private _uniform1f;
    private _uniform1fv;
    private _uniform_vec2;
    private _uniform_vec2v;
    private _uniform_vec3;
    private _uniform_vec3v;
    private _uniform_vec4;
    private _uniform_vec4v;
    private _uniformMatrix4fv;
    private _uniform1i;
    private _uniform1iv;
    private _uniform_sampler2D;
    private _uniform_samplerCube;
    uploadTexture2D(value: any): void;
    upload(shaderValue: ShaderValue, params?: any[]): void;
}