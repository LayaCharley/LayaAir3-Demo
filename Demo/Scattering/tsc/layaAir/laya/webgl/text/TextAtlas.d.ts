import { TextTexture } from "./TextTexture";
import { Point } from "../../maths/Point";
export declare class TextAtlas {
    texWidth: number;
    texHeight: number;
    private atlasgrid;
    texture: TextTexture | null;
    charMaps: any;
    static atlasGridW: number;
    constructor();
    setProtecteDist(d: number): void;
    getAEmpty(w: number, h: number, pt: Point): boolean;
    get usedRate(): number;
    destroy(): void;
    printDebugInfo(): void;
}
