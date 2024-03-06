import { Context } from "../../resource/Context";
export declare class DrawLineCmd {
    static ID: string;
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
    lineColor: string;
    lineWidth: number;
    percent: boolean;
    static create(fromX: number, fromY: number, toX: number, toY: number, lineColor: string, lineWidth: number): DrawLineCmd;
    recover(): void;
    run(context: Context, gx: number, gy: number): void;
    get cmdID(): string;
    getBoundPoints(sp?: {
        width: number;
        height?: number;
    }): number[];
}
