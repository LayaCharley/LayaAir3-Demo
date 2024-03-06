export declare class Utils {
    static toRadian(angle: number): number;
    static toAngle(radian: number): number;
    static toHexColor(color: number): string;
    static fromStringColor(value: string): number;
    static getGID(): number;
    static copyArray(source: any[], array: any[]): any[];
    static transPointList(points: any[], x: number, y: number): void;
    static parseInt(str: string, radix?: number): number;
    static getBaseName(path: string): string;
    static getFileExtension(path: string): string;
    static replaceFileExtension(path: string, newExt: string, excludeDot?: boolean): string;
}
