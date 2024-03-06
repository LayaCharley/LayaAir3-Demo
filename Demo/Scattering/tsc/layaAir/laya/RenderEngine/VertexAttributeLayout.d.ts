import { VertexBuffer } from "./VertexBuffer";
export interface VAElement {
    format: string;
    stride: number;
    shaderLocation: number;
}
export declare class VertexAttributeLayout {
    static IPoint: number;
    static _pool: {
        [key: number]: VertexAttributeLayout;
    };
    static getVertexLayoutByPool(vertexs: VertexBuffer[]): VertexAttributeLayout;
    attributeByteSize: Array<number>;
    VAElements: Array<VAElement[]>;
    instanceMode: Array<boolean>;
    id: number;
    constructor(vertexs: VertexBuffer[]);
}
