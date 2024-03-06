import { Context } from "../../resource/Context";
export declare class DrawRectCmd {
    static ID: string;
    x: number;
    y: number;
    width: number;
    height: number;
    fillColor: any;
    lineColor: any;
    lineWidth: number;
    percent: boolean;
    static create(x: number, y: number, width: number, height: number, fillColor: any, lineColor: any, lineWidth: number, percent?: boolean): DrawRectCmd;
    recover(): void;
    run(context: Context, gx: number, gy: number): void;
    get cmdID(): string;
    getBoundPoints(sp?: {
        width: number;
        height?: number;
    }): number[];
}
