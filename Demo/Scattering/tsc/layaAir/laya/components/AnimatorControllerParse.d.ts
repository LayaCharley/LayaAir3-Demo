export interface TypeAnimatorControllerData {
    layerW: number;
    controllerLayers: TypeAnimatorLayer[];
    cullingMode?: number;
    enable?: boolean;
    animatorParams?: TypeAnimatorParams[];
}
export interface TypeAnimatorParams {
    id: number;
    name: string;
    type: AniParmType;
    val: number | boolean;
}
export interface TypeAnimatorLayer {
    defaultStateName?: string;
    name: string;
    blendingMode: number;
    states: TypeAnimatorState[];
    playOnWake: boolean;
    defaultWeight: number;
    avatarMask?: any;
    stageX?: number;
    stageY?: number;
    stageScale?: number;
}
export declare enum AniParmType {
    Float = 0,
    Bool = 1,
    Trigger = 2
}
export declare enum AniStateConditionType {
    Number = 0,
    Bool = 1,
    Trigger = 2
}
export interface TypeAnimatorState {
    x: number;
    y: number;
    id: string;
    name: string;
    speed?: number;
    clipStart?: number;
    clipEnd?: number;
    loop?: number;
    yoyo?: boolean;
    soloTransitions?: TypeAnimatorTransition[];
    clip?: {
        _$uuid: string;
    };
    scripts?: string[];
    states?: TypeAnimatorState[];
    defaultStateName?: string;
    stageX?: number;
    stageY?: number;
    stageScale?: number;
}
export interface TypeAnimatorTransition {
    id: string;
    name?: string;
    mute?: boolean;
    solo?: boolean;
    exitTime?: number;
    transduration?: number;
    transstartoffset?: number;
    exitByTime?: boolean;
    conditions?: TypeAnimatorConditions[];
}
export interface TypeAnimatorConditions {
    id?: number;
    type?: AniStateConditionNumberCompressType;
    checkValue?: number | boolean;
    name?: string;
}
export declare enum AniStateConditionNumberCompressType {
    Less = 0,
    Greater = 1
}
export declare class AnimatorControllerParse {
    static parse(data: TypeAnimatorControllerData): {
        ret: TypeAnimatorControllerData;
        clipsID: string[];
    };
    private static checkStates;
    private static checkNext;
    private static checkConditions;
    private static checkDefault;
    private static getStateByID;
}
