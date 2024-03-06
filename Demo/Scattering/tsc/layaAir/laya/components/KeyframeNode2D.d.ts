import { Keyframe2D } from "./KeyFrame2D";
export declare class KeyframeNode2D {
    _ownerPath: string[];
    _propertys: string[];
    fullPath: string;
    nodePath: string;
    _indexInList: number;
    _keyFrames: Keyframe2D[];
    get keyFramesCount(): number;
    _setOwnerPathCount(value: number): void;
    _setOwnerPathByIndex(index: number, value: string): void;
    _setPropertyCount(value: number): void;
    _setPropertyByIndex(index: number, value: string): void;
    _setKeyframeCount(value: number): void;
    _joinOwnerPath(sep: string): string;
    _joinProperty(sep: string): string;
    getKeyframeByIndex(index: number): Keyframe2D;
    get ownerPathCount(): number;
    get propertyCount(): number;
    getOwnerPathByIndex(index: number): string;
    getPropertyByIndex(index: number): string;
}
