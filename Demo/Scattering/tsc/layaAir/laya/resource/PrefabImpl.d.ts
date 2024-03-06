import { Node } from "../display/Node";
import { ILoadURL } from "../net/Loader";
import { Prefab } from "./HierarchyResource";
export interface IHierarchyParserAPI {
    collectResourceLinks: (data: any, basePath: string) => (string | ILoadURL)[];
    parse: (data: any, options?: Record<string, any>, errors?: Array<any>) => Array<Node> | Node;
}
export declare class PrefabImpl extends Prefab {
    data: any;
    api: IHierarchyParserAPI;
    constructor(api: IHierarchyParserAPI, data: any, version: number);
    create(options?: Record<string, any>, errors?: any[]): Node;
}
