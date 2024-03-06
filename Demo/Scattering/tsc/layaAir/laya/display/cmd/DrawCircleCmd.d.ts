import { Context } from "../../resource/Context";
export declare class DrawCircleCmd {
    static ID: string;
    x: number;
    y: number;
    radius: number;
    fillColor: any;
    lineColor: any;
    lineWidth: number;
    percent: boolean;
    static create(x: number, y: number, radius: number, fillColor: any, lineColor: any, lineWidth: number): DrawCircleCmd;
    recover(): void;
    run(context: Context, gx: number, gy: number): void;
    get cmdID(): string;
    getBoundPoints(sp?: {
        width: number;
        height?: number;
    }): number[];
}
