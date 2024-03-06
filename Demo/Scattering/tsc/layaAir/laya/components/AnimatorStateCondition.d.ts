import { AniStateConditionType, AniStateConditionNumberCompressType } from "./AnimatorControllerParse";
export declare class AnimatorStateCondition {
    static conditionNameToID(name: string): number;
    static conditionIDToName(id: number): string;
    private _name;
    constructor(name?: string);
    get id(): number;
    get name(): string;
    set name(value: string);
    get type(): AniStateConditionType;
    checkState(value: number | boolean): boolean;
}
export declare class AnimatorStateNumberCondition extends AnimatorStateCondition {
    constructor(name: string);
    get numberValue(): number;
    set numberValue(value: number);
    get compareFlag(): AniStateConditionNumberCompressType;
    set compareFlag(value: AniStateConditionNumberCompressType);
    checkState(value: number): boolean;
}
export declare class AnimatorStateBoolCondition extends AnimatorStateCondition {
    constructor(name: string);
    get compareFlag(): boolean;
    set compareFlag(value: boolean);
    checkState(value: boolean): boolean;
}
export declare class AnimatorStateTriggerCondition extends AnimatorStateCondition {
    constructor(name: string);
    checkState(value: boolean): boolean;
}
