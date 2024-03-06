import { Node } from "../../display/Node";
import { Handler } from "../../utils/Handler";
import { Transform3D } from "./Transform3D";
import { Quaternion } from "../../maths/Quaternion";
import { Vector3 } from "../../maths/Vector3";
import { Scene3D } from "./scene/Scene3D";
export declare class Sprite3D extends Node {
    static WORLDINVERTFRONT: number;
    static instantiate(original: Sprite3D, parent?: Node, worldPositionStays?: boolean, position?: Vector3, rotation?: Quaternion): Sprite3D;
    static load(url: string, complete: Handler): void;
    get id(): number;
    get layer(): number;
    set layer(value: number);
    get isStatic(): boolean;
    get transform(): Transform3D;
    get scene(): Scene3D;
    constructor(name?: string, isStatic?: boolean);
    protected _onActive(): void;
    protected _onInActive(): void;
    protected _onAdded(): void;
    protected _onRemoved(): void;
    protected onStartListeningToType(type: string): void;
    clone(): Node;
    destroy(destroyChild?: boolean): void;
}
