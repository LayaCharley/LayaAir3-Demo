import { Vector3 } from "../../../maths/Vector3";
import { ColliderShape } from "./ColliderShape";
export declare class HeightfieldTerrainShape extends ColliderShape {
    dataPtr: number;
    initSize: Vector3;
    constructor(heightfieldData: Uint16Array | Float32Array | Uint8Array, heightStickWidth: number, heightStickLength: number, minHeight: number, maxHeight: number, heightScale: number);
    setMargin(margin: number): void;
    destroy(): void;
    clone(): any;
}
