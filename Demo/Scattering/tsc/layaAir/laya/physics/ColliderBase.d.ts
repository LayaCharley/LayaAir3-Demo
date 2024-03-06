import { Component } from "../components/Component";
import { RigidBody } from "./RigidBody";
export declare class ColliderBase extends Component {
    private _isSensor;
    private _density;
    private _friction;
    private _restitution;
    label: string;
    protected _shape: any;
    protected _def: any;
    fixture: any;
    rigidBody: RigidBody;
    constructor();
    protected getDef(): any;
    protected _onEnable(): void;
    private _checkRigidBody;
    protected _onDestroy(): void;
    get isSensor(): boolean;
    set isSensor(value: boolean);
    get density(): number;
    set density(value: number);
    get friction(): number;
    set friction(value: number);
    get restitution(): number;
    set restitution(value: number);
    refresh(): void;
    resetShape(re?: boolean): void;
}
