import { ShaderNode } from "./ShaderNode";
export declare class IncludeFile {
    static splitToWords(str: string, block: ShaderNode): any[];
    script: string;
    codes: any;
    funs: any;
    curUseID: number;
    funnames: string;
    constructor(txt: string);
    getWith(name?: string | null): string;
    getFunsScript(funsdef: string): string;
}
