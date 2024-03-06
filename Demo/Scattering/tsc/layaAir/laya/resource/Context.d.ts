import { Sprite } from "../display/Sprite";
import { ColorFilter } from "../filters/ColorFilter";
import { Matrix } from "../maths/Matrix";
import { Point } from "../maths/Point";
import { Rectangle } from "../maths/Rectangle";
import { RenderStateCommand } from "../RenderEngine/RenderStateCommand";
import { WordText } from "../utils/WordText";
import { Value2D } from "../webgl/shader/d2/value/Value2D";
import { ISubmit } from "../webgl/submit/ISubmit";
import { HTMLCanvas } from "./HTMLCanvas";
import { RenderTexture2D } from "./RenderTexture2D";
import { Texture } from "./Texture";
import { Color } from "../maths/Color";
export declare class Context {
    static _SUBMITVBSIZE: number;
    private static _MAXVERTNUM;
    static MAXCLIPRECT: Rectangle;
    static _COUNT: number;
    private static SEGNUM;
    private static _contextcount;
    private _drawTexToDrawTri_Vert;
    private _drawTexToDrawTri_Index;
    private _tempUV;
    private _drawTriUseAbsMatrix;
    static __init__(): void;
    drawImage(...args: any[]): void;
    getImageData(...args: any[]): any;
    measureText(text: string): any;
    setTransform(...args: any[]): void;
    $transform(a: number, b: number, c: number, d: number, tx: number, ty: number): void;
    get lineJoin(): string;
    set lineJoin(value: string);
    get lineCap(): string;
    set lineCap(value: string);
    get miterLimit(): string;
    set miterLimit(value: string);
    clearRect(x: number, y: number, width: number, height: number): void;
    drawTexture2(x: number, y: number, pivotX: number, pivotY: number, m: Matrix, args2: any[]): void;
    transformByMatrix(matrix: Matrix, tx: number, ty: number): void;
    saveTransform(matrix: Matrix): void;
    restoreTransform(matrix: Matrix): void;
    drawRect(x: number, y: number, width: number, height: number, fillColor: any, lineColor: any, lineWidth: number): void;
    alpha(value: number): void;
    drawCurves(x: number, y: number, points: any[], lineColor: any, lineWidth: number): void;
    private _fillAndStroke;
    static PI2: number;
    static const2DRenderCMD: RenderStateCommand;
    static set2DRenderConfig(): void;
    private _other;
    private _renderNextSubmitIndex;
    private _path;
    private _width;
    private _height;
    private _renderCount;
    meshlist: any[];
    private _transedPoints;
    private _temp4Points;
    private _clipID_Gen;
    private _lastMat_a;
    private _lastMat_b;
    private _lastMat_c;
    private _lastMat_d;
    sprite: Sprite | null;
    private _fillColor;
    private _flushCnt;
    private defTexture;
    drawTexAlign: boolean;
    isMain: boolean;
    clearColor: Color;
    constructor();
    clearBG(r: number, g: number, b: number, a: number): void;
    private _releaseMem;
    destroy(keepRT?: boolean): void;
    clear(): void;
    size(w: number, h: number): void;
    set asBitmap(value: boolean);
    getMatScaleX(): number;
    getMatScaleY(): number;
    setFillColor(color: number): void;
    getFillColor(): number;
    set fillStyle(value: any);
    get fillStyle(): any;
    set globalAlpha(value: number);
    get globalAlpha(): number;
    set textAlign(value: string);
    get textAlign(): string;
    set textBaseline(value: string);
    get textBaseline(): string;
    set globalCompositeOperation(value: string);
    get globalCompositeOperation(): string;
    set strokeStyle(value: any);
    get strokeStyle(): any;
    translate(x: number, y: number): void;
    set lineWidth(value: number);
    get lineWidth(): number;
    save(): void;
    restore(): void;
    set font(str: string);
    fillText(txt: string | WordText, x: number, y: number, fontStr: string, color: string, align: string, lineWidth?: number, borderColor?: string): void;
    drawText(text: string | WordText, x: number, y: number, font: string, color: string, textAlign: string): void;
    strokeWord(text: string | WordText, x: number, y: number, font: string, color: string, lineWidth: number, textAlign: string): void;
    fillBorderText(txt: string | WordText, x: number, y: number, font: string, color: string, borderColor: string, lineWidth: number, textAlign: string): void;
    filltext11(data: string | WordText, x: number, y: number, fontStr: string, color: string, strokeColor: string, lineWidth: number, textAlign: string): void;
    private _fillRect;
    fillRect(x: number, y: number, width: number, height: number, fillStyle: any): void;
    fillTexture(texture: Texture, x: number, y: number, width: number, height: number, type: string, offset: Point, color: number): void;
    setColorFilter(filter: ColorFilter): void;
    drawTexture(tex: Texture, x: number, y: number, width: number, height: number, color?: number): void;
    drawTextures(tex: Texture, pos: ArrayLike<number>, tx: number, ty: number, colors: number[]): void;
    private _drawTextureAddSubmit;
    submitDebugger(): void;
    private isSameClipInfo;
    drawCallOptimize(enable: boolean): boolean;
    transform4Points(a: any[], m: Matrix, out: any[]): void;
    clipedOff(pt: any[]): boolean;
    transformQuad(x: number, y: number, w: number, h: number, italicDeg: number, m: Matrix, out: any[]): void;
    pushRT(): void;
    popRT(): void;
    useRT(rt: RenderTexture2D): void;
    RTRestore(rt: RenderTexture2D): void;
    breakNextMerge(): void;
    private _repaintSprite;
    drawTextureWithTransform(tex: Texture, x: number, y: number, width: number, height: number, transform: Matrix | null, tx: number, ty: number, alpha: number, blendMode: string | null, uv?: number[], color?: number): void;
    private _flushToTarget;
    drawCanvas(canvas: HTMLCanvas, x: number, y: number, width: number, height: number): void;
    drawTarget(rt: RenderTexture2D, x: number, y: number, width: number, height: number, m: Matrix, shaderValue: Value2D, uv?: ArrayLike<number> | null, blend?: number, color?: number): boolean;
    drawTriangles(tex: Texture, x: number, y: number, vertices: Float32Array, uvs: Float32Array, indices: Uint16Array, matrix: Matrix, alpha: number, blendMode: string, colorNum?: number): void;
    transform(a: number, b: number, c: number, d: number, tx: number, ty: number): void;
    setTransformByMatrix(value: Matrix): void;
    rotate(angle: number): void;
    scale(scaleX: number, scaleY: number): void;
    clipRect(x: number, y: number, width: number, height: number, escape?: boolean): void;
    addRenderObject(o: ISubmit): void;
    submitElement(start: number, end: number): number;
    flush(): number;
    beginPath(convex?: boolean): void;
    closePath(): void;
    addPath(points: any[], close: boolean, convex: boolean, dx: number, dy: number): void;
    fill(): void;
    private addVGSubmit;
    stroke(): void;
    moveTo(x: number, y: number): void;
    lineTo(x: number, y: number): void;
    arcTo(x1: number, y1: number, x2: number, y2: number, r: number): void;
    arc(cx: number, cy: number, r: number, startAngle: number, endAngle: number, counterclockwise?: boolean, b?: boolean): void;
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
    mixRGBandAlpha(color: number): number;
    strokeRect(x: number, y: number, width: number, height: number, parameterLineWidth: number): void;
    clip(): void;
    drawParticle(x: number, y: number, pt: any): void;
    private _getPath;
    get canvas(): HTMLCanvas;
    private static tmpuv1;
    private _fillTexture_h;
    private _fillTexture_v;
    private static tmpUV;
    private static tmpUVRect;
    drawTextureWithSizeGrid(tex: Texture, tx: number, ty: number, width: number, height: number, sizeGrid: any[], gx: number, gy: number, color: number): void;
    addRenderObject3D(scene3D: ISubmit): void;
}