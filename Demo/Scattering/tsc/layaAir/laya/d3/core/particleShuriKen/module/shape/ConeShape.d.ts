import { BaseShape } from "./BaseShape";
import { Rand } from "../../../../math/Rand";
import { Vector3 } from "../../../../../maths/Vector3";
export declare class ConeShape extends BaseShape {
    angle: number;
    radius: number;
    length: number;
    emitType: number;
    constructor();
    set angleDEG(deg: number);
    get angleDEG(): number;
    generatePositionAndDirection(position: Vector3, direction: Vector3, rand?: Rand, randomSeeds?: Uint32Array): void;
    cloneTo(destObject: any): void;
    clone(): any;
}
