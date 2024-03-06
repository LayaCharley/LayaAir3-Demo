import { JointBase } from "./JointBase";
import { RigidBody } from "../RigidBody";
export declare class MotorJoint extends JointBase {
    private static _temp;
    selfBody: RigidBody;
    otherBody: RigidBody;
    collideConnected: boolean;
    private _linearOffset;
    private _angularOffset;
    private _maxForce;
    private _maxTorque;
    private _correctionFactor;
    protected _createJoint(): void;
    get linearOffset(): any[];
    set linearOffset(value: any[]);
    get angularOffset(): number;
    set angularOffset(value: number);
    get maxForce(): number;
    set maxForce(value: number);
    get maxTorque(): number;
    set maxTorque(value: number);
    get correctionFactor(): number;
    set correctionFactor(value: number);
}
