export declare class MorphTarget {
    name: string;
    fullWeight: number;
    data: Float32Array;
    constructor();
}
export declare class MorphTargetChannel {
    name: string;
    targetCount: number;
    constructor();
    getTargetByIndex(index: number): MorphTarget;
    addTarget(target: MorphTarget): void;
}
