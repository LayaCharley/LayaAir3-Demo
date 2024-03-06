import { Node } from "../display/Node";
import { ILoadURL } from "../net/Loader";
export declare class HierarchyParser {
    static parse(data: any, options?: Record<string, any>, errors?: Array<any>): Array<Node>;
    static collectResourceLinks(data: any, basePath: string): (string | ILoadURL)[];
}
