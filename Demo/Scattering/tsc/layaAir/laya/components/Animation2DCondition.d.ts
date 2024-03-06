export declare enum AniConditionType {
    Greater = 0,
    Less = 1,
    Equals = 2,
    NotEqual = 3
}
export declare class Animation2DCondition {
    id: number;
    type: AniConditionType;
    checkValue: any;
}
