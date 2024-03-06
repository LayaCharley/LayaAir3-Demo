import { JointBase } from "./JointBase";
import { RigidBody } from "../RigidBody";
export declare class WeldJoint extends JointBase {
    private static _temp;
    selfBody: RigidBody;
    otherBody: RigidBody;
    anchor: any[];
    collideConnected: boolean;
    private _frequency;
    private _dampingRatio;
    protected _createJoint(): void;
    get frequency(): number;
    set frequency(value: number);
    get damping(): number;
    set damping(value: number);
}
