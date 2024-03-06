import { IncludeFile } from "./IncludeFile";
import { ShaderNode } from "./ShaderNode";
export interface IShaderCompiledObj {
    vsNode: ShaderNode;
    psNode: ShaderNode;
    includeNames: Set<string>;
    defs: Set<string>;
}
export declare class ShaderCompile {
    static IFDEF_NO: number;
    static IFDEF_YES: number;
    static IFDEF_ELSE: number;
    static IFDEF_PARENT: number;
    static includes: Record<string, IncludeFile>;
    static loadIncludeFileSync: (fileName: string) => void;
    static addInclude(fileName: string, txt: string, allowReplace?: boolean): IncludeFile;
    static compile(vs: string, ps: string, basePath?: string): IShaderCompiledObj;
    static compileAsync(vs: string, ps: string, basePath: string): Promise<IShaderCompiledObj>;
    private static _loadIncludesDeep;
    private static _compileToTree;
}
