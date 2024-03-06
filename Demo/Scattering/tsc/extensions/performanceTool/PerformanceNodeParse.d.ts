import { Byte } from "laya/utils/Byte";
import { PerformanceDataTool } from "./PerformanceDataTool";
export declare class PerformanceNodeParse {
    private static _readData;
    private static _blockStr;
    private static _blockStart;
    private static _blocklength;
    private static _nodeNums;
    private static performanceData;
    static parsePerformanceFile(performance: Byte, outData: PerformanceDataTool): void;
    static READ_DATA(): void;
    static READ_DataInfo01(): void;
    static READ_Color(): void;
    static READ_NodeInfo(): void;
}
