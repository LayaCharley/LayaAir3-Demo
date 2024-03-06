import { Node } from "../display/Node";
export declare const TypedArrayClasses: Record<string, any>;
export interface IDecodeObjOptions {
    outErrors?: Array<string>;
    getNodeByRef?: (id: string | string[]) => Node;
    getNodeData?: (node: Node) => any;
}
export declare class SerializeUtil {
    static isDeserializing: boolean;
    static decodeObj(data: any, obj?: any, options?: IDecodeObjOptions): any;
    private static _decodeObj;
    static getLoadTypeByEngineType(type: string): string;
    static bakeOverrideData(overrideData: any): Record<string, any[]>;
    static applyOverrideData(nodeData: any, overrideDataMap: Record<string, Array<any>>): any;
}
