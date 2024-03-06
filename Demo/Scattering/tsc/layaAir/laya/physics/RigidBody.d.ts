import { Component } from "../components/Component";
export declare class RigidBody extends Component {
    protected _type: string;
    protected _allowSleep: boolean;
    protected _angularVelocity: number;
    protected _angularDamping: number;
    protected _linearVelocity: any;
    protected _linearDamping: number;
    protected _bullet: boolean;
    protected _allowRotation: boolean;
    protected _gravityScale: number;
    group: number;
    category: number;
    mask: number;
    label: string;
    protected _body: any;
    private _createBody;
    protected _onAwake(): void;
    protected _onEnable(): void;
    private accessGetSetFunc;
    private resetCollider;
    onUpdate(): void;
    private _sysNodeToPhysic;
    private _sysPosToPhysic;
    private _overSet;
    protected _onDisable(): void;
    getBody(): any;
    _getOriBody(): any;
    get body(): any;
    applyForce(position: any, force: any): void;
    applyForceToCenter(force: any): void;
    applyLinearImpulse(position: any, impulse: any): void;
    applyLinearImpulseToCenter(impulse: any): void;
    applyTorque(torque: number): void;
    setVelocity(velocity: any): void;
    setAngle(value: any): void;
    getMass(): number;
    getCenter(): any;
    getWorldCenter(): any;
    get type(): string;
    set type(value: string);
    get gravityScale(): number;
    set gravityScale(value: number);
    get allowRotation(): boolean;
    set allowRotation(value: boolean);
    get allowSleep(): boolean;
    set allowSleep(value: boolean);
    get angularDamping(): number;
    set angularDamping(value: number);
    get angularVelocity(): number;
    set angularVelocity(value: number);
    get linearDamping(): number;
    set linearDamping(value: number);
    get linearVelocity(): any;
    set linearVelocity(value: any);
    get bullet(): boolean;
    set bullet(value: boolean);
}
