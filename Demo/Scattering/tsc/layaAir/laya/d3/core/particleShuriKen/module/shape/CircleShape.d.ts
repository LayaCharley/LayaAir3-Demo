import { BaseShape } from "./BaseShape";
import { Rand } from "../../../../math/Rand";
import { Vector3 } from "../../../../../maths/Vector3";
export declare class CircleShape extends BaseShape {
    radius: number;
    arc: number;
    emitFromEdge: boolean;
    constructor();
    set arcDEG(deg: number);
    get arcDEG(): number;
    generatePositionAndDirection(position: Vector3, direction: Vector3, rand?: Rand, randomSeeds?: Uint32Array): void;
    cloneTo(destObject: any): void;
    clone(): any;
}
