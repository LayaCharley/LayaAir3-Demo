import { JointBase } from "./JointBase";
import { RigidBody } from "../RigidBody";
export declare class MouseJoint extends JointBase {
    private static _temp;
    selfBody: RigidBody;
    anchor: any[];
    private _maxForce;
    private _frequency;
    private _dampingRatio;
    protected _onEnable(): void;
    private onMouseDown;
    protected _createJoint(): void;
    private onStageMouseUp;
    private onMouseMove;
    protected _onDisable(): void;
    get maxForce(): number;
    set maxForce(value: number);
    get frequency(): number;
    set frequency(value: number);
    get damping(): number;
    set damping(value: number);
}
