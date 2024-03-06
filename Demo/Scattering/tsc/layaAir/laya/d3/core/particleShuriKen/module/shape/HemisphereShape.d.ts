import { BaseShape } from "./BaseShape";
import { Rand } from "../../../../math/Rand";
import { Vector3 } from "../../../../../maths/Vector3";
export declare class HemisphereShape extends BaseShape {
    radius: number;
    emitFromShell: boolean;
    constructor();
    generatePositionAndDirection(position: Vector3, direction: Vector3, rand?: Rand, randomSeeds?: Uint32Array): void;
    cloneTo(destObject: any): void;
    clone(): any;
}
