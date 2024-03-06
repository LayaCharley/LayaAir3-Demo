import { PixelLineRenderer } from "./PixelLineRenderer";
import { RenderableSprite3D } from "../RenderableSprite3D";
import { Sprite3D } from "../Sprite3D";
import { UnlitMaterial } from "../material/UnlitMaterial";
export class PixelLineSprite3D extends RenderableSprite3D {
    constructor(maxCount = 2, name = null) {
        super(name);
        this._isRenderActive = false;
        this._isInRenders = false;
        this._render = this.addComponent(PixelLineRenderer);
        this._geometryFilter = this._render._pixelLineFilter;
        this._render.maxLineCount = maxCount;
        let material = this._render.material = new UnlitMaterial();
        material.enableVertexColor = true;
    }
    get maxLineCount() {
        return this._render.maxLineCount;
    }
    set maxLineCount(value) {
        this._render.maxLineCount = value;
    }
    get lineCount() {
        return this._render.lineCount;
    }
    get pixelLineRenderer() {
        return this._render;
    }
    addLine(startPosition, endPosition, startColor, endColor) {
        this._render.addLine(startPosition, endPosition, startColor, endColor);
    }
    addLines(lines) {
        this._render.addLines(lines);
    }
    removeLine(index) {
        this._render.removeLine(index);
    }
    setLine(index, startPosition, endPosition, startColor, endColor) {
        this._render.setLine(index, startPosition, endPosition, startColor, endColor);
    }
    getLine(index, out) {
        this._render.getLine(index, out);
    }
    clear() {
        this._render.clear();
    }
    _create() {
        return new Sprite3D();
    }
}

//# sourceMappingURL=PixelLineSprite3D.js.map
