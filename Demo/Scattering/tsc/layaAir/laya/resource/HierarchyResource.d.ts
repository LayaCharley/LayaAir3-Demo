import { Node } from "../display/Node";
import { Resource } from "./Resource";
export declare class Prefab extends Resource {
    readonly version: number;
    protected _deps: Array<Resource>;
    json: any;
    constructor(version?: number);
    create(options?: Record<string, any>, errors?: Array<any>): Node;
    get deps(): ReadonlyArray<Resource>;
    addDep(res: Resource): void;
    addDeps(resArr: Array<Resource>): void;
    protected _disposeResource(): void;
    get obsolute(): boolean;
    set obsolute(value: boolean);
    private onDepObsolute;
}
export declare type HierarchyResource = Prefab;
export declare var HierarchyResource: typeof Prefab;
