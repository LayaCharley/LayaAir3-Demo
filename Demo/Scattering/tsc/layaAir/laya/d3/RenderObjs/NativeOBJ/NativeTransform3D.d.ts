import { EventDispatcher } from "../../../events/EventDispatcher";
import { Matrix4x4 } from "../../../maths/Matrix4x4";
import { Quaternion } from "../../../maths/Quaternion";
import { Vector3 } from "../../../maths/Vector3";
import { Sprite3D } from "../../core/Sprite3D";
import { Transform3D } from "../../core/Transform3D";
export declare class NativeTransform3D extends Transform3D {
    static MemoryBlock_size: number;
    private nativeMemory;
    private float32Array;
    private float64Array;
    private int32Array;
    private eventDispatcher;
    _nativeObj: any;
    get owner(): Sprite3D;
    get localPositionX(): number;
    set localPositionX(x: number);
    get localPositionY(): number;
    set localPositionY(y: number);
    get localPositionZ(): number;
    set localPositionZ(z: number);
    get localPosition(): Vector3;
    set localPosition(value: Vector3);
    get localRotationX(): number;
    set localRotationX(x: number);
    get localRotationY(): number;
    set localRotationY(y: number);
    get localRotationZ(): number;
    set localRotationZ(z: number);
    get localRotationW(): number;
    set localRotationW(w: number);
    get localRotation(): Quaternion;
    set localRotation(value: Quaternion);
    get localScaleX(): number;
    set localScaleX(value: number);
    get localScaleY(): number;
    set localScaleY(value: number);
    get localScaleZ(): number;
    set localScaleZ(value: number);
    get localScale(): Vector3;
    set localScale(value: Vector3);
    get localRotationEulerX(): number;
    set localRotationEulerX(value: number);
    get localRotationEulerY(): number;
    set localRotationEulerY(value: number);
    get localRotationEulerZ(): number;
    set localRotationEulerZ(value: number);
    get localRotationEuler(): Vector3;
    set localRotationEuler(value: Vector3);
    get localMatrix(): Matrix4x4;
    set localMatrix(value: Matrix4x4);
    get position(): Vector3;
    set position(value: Vector3);
    get rotation(): Quaternion;
    set rotation(value: Quaternion);
    get rotationEuler(): Vector3;
    set rotationEuler(value: Vector3);
    get worldMatrix(): Matrix4x4;
    set worldMatrix(value: Matrix4x4);
    constructor(owner: Sprite3D);
    translate(translation: Vector3, isLocal?: boolean): void;
    rotate(rotation: Vector3, isLocal?: boolean, isRadian?: boolean): void;
    getForward(forward: Vector3): void;
    getUp(up: Vector3): void;
    getRight(right: Vector3): void;
    lookAt(target: Vector3, up: Vector3, isLocal?: boolean, isCamera?: boolean): void;
    objLookat(target: Vector3, up: Vector3, isLocal?: boolean): void;
    getWorldLossyScale(): Vector3;
    setWorldLossyScale(value: Vector3): void;
    hasListener(type: string): boolean;
    event(type: string, data?: any): boolean;
    on(type: string, listener: Function): EventDispatcher;
    on(type: string, caller: any, listener: Function, args?: any[]): EventDispatcher;
    once(type: string, listener: Function): EventDispatcher;
    once(type: string, caller: any, listener: Function, args?: any[]): EventDispatcher;
    off(type: string, listener: Function): EventDispatcher;
    off(type: string, caller: any, listener?: Function, args?: any[]): EventDispatcher;
    offAll(type?: string): EventDispatcher;
    offAllCaller(caller: any): EventDispatcher;
}