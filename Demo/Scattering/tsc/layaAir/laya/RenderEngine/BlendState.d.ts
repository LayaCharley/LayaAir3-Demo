import { BlendEquationSeparate } from "./RenderEnum/BlendEquationSeparate";
import { BlendFactor } from "./RenderEnum/BlendFactor";
import { BlendType } from "./RenderEnum/BlendType";
export declare class BlendState {
    static _blend_All_pool: any;
    static _blend_seperate_pool: any;
    static create(blendType: number, colorBlendhash: BlendComponent, alphaBlendComponent: BlendComponent): void;
    blendType: BlendType;
    colorBlendComponent: BlendComponent;
    alphaBlendComponent: BlendComponent;
    constructor(blendType: number);
}
export declare class BlendComponent {
    static _pool: any;
    static getHash(blendOperationGLData: number, sourceBlendFactor: number, destinationFactor: number): number;
    static getBlendComponent(blendOperationGLData: number, sourceBlendFactor: number, destinationFactor: number): any;
    _blendOperation: BlendEquationSeparate;
    _blendOperationGLData: number;
    _sourceBlendFactor: BlendFactor;
    _sourceBlendFactorGLData: number;
    _destinationFactor: BlendFactor;
    _destinationFactorGLData: number;
    _hashIndex: number;
    constructor(blendOperationGLData: BlendEquationSeparate, sourceBlendFactor: BlendFactor, destinationFactor: BlendFactor, hashindex: number);
}
