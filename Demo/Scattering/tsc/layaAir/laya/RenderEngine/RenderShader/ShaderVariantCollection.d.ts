import { Shader3D } from "./Shader3D";
export declare class ShaderVariant {
    get shader(): Shader3D;
    get subShaderIndex(): number;
    get passIndex(): number;
    get defineNames(): Readonly<string[]>;
    constructor(shader: Shader3D, subShaderIndex: number, passIndex: number, defines: string[]);
    setValue(shader: Shader3D, subShaderIndex: number, passIndex: number, defineNames: string[]): void;
    equal(other: ShaderVariant): boolean;
    clone(): ShaderVariant;
}
export declare class ShaderVariantCollection {
    get allCompiled(): boolean;
    get variantCount(): number;
    add(variant: ShaderVariant): boolean;
    remove(variant: ShaderVariant): boolean;
    contatins(variant: ShaderVariant): boolean;
    getByIndex(index: number): ShaderVariant;
    clear(): void;
    compile(): void;
}
