import { JointBase } from "./JointBase";
import { RigidBody } from "../RigidBody";
export declare class DistanceJoint extends JointBase {
    private static _temp;
    selfBody: RigidBody;
    otherBody: RigidBody;
    selfAnchor: any[];
    otherAnchor: any[];
    collideConnected: boolean;
    private _length;
    private _maxLength;
    private _minLength;
    private _frequency;
    private _dampingRatio;
    protected _createJoint(): void;
    get length(): number;
    set length(value: number);
    get minLength(): number;
    set minLength(value: number);
    get maxLength(): number;
    set maxLength(value: number);
    get frequency(): number;
    set frequency(value: number);
    get damping(): number;
    set damping(value: number);
}
