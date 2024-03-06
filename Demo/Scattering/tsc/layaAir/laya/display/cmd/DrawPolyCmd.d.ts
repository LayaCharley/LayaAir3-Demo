import { Context } from "../../resource/Context";
export declare class DrawPolyCmd {
    static ID: string;
    x: number;
    y: number;
    points: number[] | null;
    fillColor: any;
    lineColor: any;
    lineWidth: number;
    static create(x: number, y: number, points: any[], fillColor: any, lineColor: any, lineWidth: number): DrawPolyCmd;
    recover(): void;
    run(context: Context, gx: number, gy: number): void;
    get cmdID(): string;
}
