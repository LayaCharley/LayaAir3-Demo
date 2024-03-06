import { Node } from "../display/Node";
export declare class Component {
    _id: number;
    private _hideFlags;
    private _enableState;
    owner: Node;
    _singleton?: boolean;
    runInEditor?: boolean;
    scriptPath?: string;
    _extra?: IComponentExtra;
    get hideFlags(): number;
    set hideFlags(value: number);
    constructor();
    hasHideFlag(flag: number): boolean;
    get id(): number;
    get enabled(): boolean;
    set enabled(value: boolean);
    get awaked(): boolean;
    get destroyed(): boolean;
    _setOwner(node: Node): void;
    protected setupScript(): void;
    destroy(): void;
    onAdded(): void;
    onReset?(): void;
    onAwake(): void;
    onEnable(): void;
    onStart?(): void;
    onUpdate?(): void;
    onLateUpdate?(): void;
    onPreRender?(): void;
    onPostRender?(): void;
    onDisable(): void;
    onDestroy(): void;
}
export interface IComponentExtra {
}
