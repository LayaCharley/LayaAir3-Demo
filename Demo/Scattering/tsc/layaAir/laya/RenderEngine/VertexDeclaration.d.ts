import { VertexElement } from "../renders/VertexElement";
export declare class VertexDeclaration {
    get id(): number;
    get vertexStride(): number;
    get vertexElementCount(): number;
    constructor(vertexStride: number, vertexElements: Array<VertexElement>);
    getVertexElementByIndex(index: number): VertexElement;
    getVertexElementByUsage(usage: number): VertexElement;
}
