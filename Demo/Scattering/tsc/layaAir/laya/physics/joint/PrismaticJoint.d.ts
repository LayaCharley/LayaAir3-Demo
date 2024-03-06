import { JointBase } from "./JointBase";
import { RigidBody } from "../RigidBody";
export declare class PrismaticJoint extends JointBase {
    private static _temp;
    selfBody: RigidBody;
    otherBody: RigidBody;
    anchor: any[];
    axis: any[];
    collideConnected: boolean;
    private _enableMotor;
    private _motorSpeed;
    private _maxMotorForce;
    private _enableLimit;
    private _lowerTranslation;
    private _upperTranslation;
    protected _createJoint(): void;
    get enableMotor(): boolean;
    set enableMotor(value: boolean);
    get motorSpeed(): number;
    set motorSpeed(value: number);
    get maxMotorForce(): number;
    set maxMotorForce(value: number);
    get enableLimit(): boolean;
    set enableLimit(value: boolean);
    get lowerTranslation(): number;
    set lowerTranslation(value: number);
    get upperTranslation(): number;
    set upperTranslation(value: number);
}
