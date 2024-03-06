import { IClone } from "../../utils/IClone";
import { ShaderDefine } from "./ShaderDefine";
export declare class DefineDatas implements IClone {
    constructor();
    add(define: ShaderDefine): void;
    remove(define: ShaderDefine): void;
    addDefineDatas(define: DefineDatas): void;
    removeDefineDatas(define: DefineDatas): void;
    has(define: ShaderDefine): boolean;
    clear(): void;
    cloneTo(destObject: any): void;
    clone(): any;
    destroy(): void;
}
