import { JointBase } from "./JointBase";
import { RigidBody } from "../RigidBody";
export declare class RevoluteJoint extends JointBase {
    private static _temp;
    selfBody: RigidBody;
    otherBody: RigidBody;
    anchor: any[];
    collideConnected: boolean;
    private _enableMotor;
    private _motorSpeed;
    private _maxMotorTorque;
    private _enableLimit;
    private _lowerAngle;
    private _upperAngle;
    protected _createJoint(): void;
    get enableMotor(): boolean;
    set enableMotor(value: boolean);
    get motorSpeed(): number;
    set motorSpeed(value: number);
    get maxMotorTorque(): number;
    set maxMotorTorque(value: number);
    get enableLimit(): boolean;
    set enableLimit(value: boolean);
    get lowerAngle(): number;
    set lowerAngle(value: number);
    get upperAngle(): number;
    set upperAngle(value: number);
}
