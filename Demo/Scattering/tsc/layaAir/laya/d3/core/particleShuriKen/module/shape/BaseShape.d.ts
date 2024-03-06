import { Vector3 } from "../../../../../maths/Vector3";
import { IClone } from "../../../../../utils/IClone";
import { Rand } from "../../../../math/Rand";
export declare enum ParticleSystemShapeType {
    Box = 0,
    Circle = 1,
    Cone = 2,
    Hemisphere = 3,
    Sphere = 4
}
export declare class BaseShape implements IClone {
    enable: boolean;
    randomDirection: number;
    shapeType: ParticleSystemShapeType;
    constructor();
    generatePositionAndDirection(position: Vector3, direction: Vector3, rand?: Rand, randomSeeds?: Uint32Array): void;
    cloneTo(destObject: any): void;
    clone(): any;
}
