import { Context } from "../../resource/Context";
export declare class DrawPieCmd {
    static ID: string;
    x: number;
    y: number;
    radius: number;
    fillColor: any;
    lineColor: any;
    lineWidth: number;
    private _startAngle;
    private _endAngle;
    static create(x: number, y: number, radius: number, startAngle: number, endAngle: number, fillColor: any, lineColor: any, lineWidth: number): DrawPieCmd;
    recover(): void;
    run(context: Context, gx: number, gy: number): void;
    get cmdID(): string;
    get startAngle(): number;
    set startAngle(value: number);
    get endAngle(): number;
    set endAngle(value: number);
    getBoundPoints(sp?: {
        width: number;
        height?: number;
    }): number[];
}
