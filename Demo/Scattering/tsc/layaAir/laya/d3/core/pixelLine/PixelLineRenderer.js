import { Matrix4x4 } from "../../../maths/Matrix4x4";
import { Vector4 } from "../../../maths/Vector4";
import { MeshSprite3DShaderDeclaration } from "../MeshSprite3DShaderDeclaration";
import { BaseRender } from "../render/BaseRender";
import { RenderElement } from "../render/RenderElement";
import { Sprite3D } from "../Sprite3D";
import { PixelLineData } from "./PixelLineData";
import { PixelLineFilter } from "./PixelLineFilter";
import { PixelLineMaterial } from "./PixelLineMaterial";
export class PixelLineRenderer extends BaseRender {
    constructor() {
        super();
        this._isRenderActive = false;
        this._isInRenders = false;
        this._needUpdatelines = false;
        this._lines = [];
        this._projectionViewWorldMatrix = new Matrix4x4();
        this._pixelLineFilter = new PixelLineFilter(this, 20);
        this._shaderValues.addDefine(MeshSprite3DShaderDeclaration.SHADERDEFINE_COLOR);
    }
    get pixelLinesDatas() {
        if (this._needUpdatelines) {
            this._updateLineDatas();
        }
        return this._lines;
    }
    set pixelLinesDatas(value) {
        this.clear();
        this.addLines(value);
    }
    get maxLineCount() {
        return this._pixelLineFilter._maxLineCount;
    }
    set maxLineCount(value) {
        this._pixelLineFilter._resizeLineData(value);
        this._pixelLineFilter._lineCount = Math.min(this._pixelLineFilter._lineCount, value);
    }
    get lineCount() {
        return this._pixelLineFilter._lineCount;
    }
    _onAdded() {
        super._onAdded();
        this._changeRenderObjects(0, PixelLineMaterial.defaultMaterial);
    }
    _onEnable() {
        this._isRenderActive = true;
        if (this._pixelLineFilter._lineCount != 0) {
            (this.owner.scene)._addRenderObject(this);
            this._isInRenders = true;
        }
        this._setBelongScene(this.owner.scene);
    }
    _onDisable() {
        if (this._pixelLineFilter && this._pixelLineFilter._lineCount != 0 && this._isRenderActive) {
            this.owner.scene._removeRenderObject(this);
            this._isInRenders = false;
        }
        this._isRenderActive = false;
        this._setUnBelongScene();
    }
    _calculateBoundingBox() {
        var worldMat = this.owner.transform.worldMatrix;
        var lineFilter = this._pixelLineFilter;
        lineFilter._reCalculateBound();
        lineFilter._bounds._tranform(worldMat, this._bounds);
    }
    _renderUpdateWithCamera(context, transform) {
        var projectionView = context.projectionViewMatrix;
        var sv = this._shaderValues;
        if (transform) {
            var worldMat = transform.worldMatrix;
            sv.setMatrix4x4(Sprite3D.WORLDMATRIX, worldMat);
            this._worldParams.x = transform.getFrontFaceValue();
            sv.setVector(Sprite3D.WORLDINVERTFRONT, this._worldParams);
        }
        else {
            sv.setMatrix4x4(Sprite3D.WORLDMATRIX, Matrix4x4.DEFAULT);
            sv.setVector(Sprite3D.WORLDINVERTFRONT, Vector4.UnitX);
        }
    }
    _changeRenderObjects(index, material) {
        var renderObjects = this._renderElements;
        (material) || (material = PixelLineMaterial.defaultMaterial);
        var renderElement = renderObjects[index];
        (renderElement) || (renderElement = renderObjects[index] = new RenderElement());
        renderElement.setTransform(this.owner._transform);
        renderElement.setGeometry(this._pixelLineFilter);
        renderElement.render = this;
        renderElement.material = material;
    }
    _pixelLinesDataChange(key) {
        if (key != null) {
            let keyN = parseInt(key);
            let line = this._lines[keyN];
            if (line) {
                this.setLine(keyN, line.startPosition, line.endPosition, line.startColor, line.endColor);
            }
        }
    }
    addLine(startPosition, endPosition, startColor, endColor) {
        if (this._pixelLineFilter._lineCount !== this._pixelLineFilter._maxLineCount)
            this._pixelLineFilter._updateLineData(this._pixelLineFilter._lineCount++, startPosition, endPosition, startColor, endColor);
        else
            throw "PixelLineSprite3D: lineCount has equal with maxLineCount.";
        if (this._isRenderActive && !this._isInRenders && this._pixelLineFilter._lineCount > 0) {
            this.owner.scene && this.owner.scene._addRenderObject(this);
            this._isInRenders = true;
        }
        this._needUpdatelines = true;
    }
    addLines(lines) {
        var lineCount = this._pixelLineFilter._lineCount;
        var addCount = lines.length;
        if (lineCount + addCount > this._pixelLineFilter._maxLineCount) {
            throw "PixelLineSprite3D: lineCount plus lines count must less than maxLineCount.";
        }
        else {
            this._pixelLineFilter._updateLineDatas(lineCount, lines);
            this._pixelLineFilter._lineCount += addCount;
        }
        if (this._isRenderActive && !this._isInRenders && this._pixelLineFilter._lineCount > 0) {
            this.owner.scene && this.owner.scene._addRenderObject(this);
            this._isInRenders = true;
        }
        this._needUpdatelines = true;
    }
    removeLine(index) {
        if (index < this._pixelLineFilter._lineCount)
            this._pixelLineFilter._removeLineData(index);
        else
            throw "PixelLineSprite3D: index must less than lineCount.";
        if (this._isRenderActive && this._isInRenders && this._pixelLineFilter._lineCount == 0) {
            this.owner.scene && this.owner.scene._removeRenderObject(this);
            this._isInRenders = false;
        }
        this._needUpdatelines = true;
    }
    setLine(index, startPosition, endPosition, startColor, endColor) {
        if (index < this._pixelLineFilter._lineCount) {
            this._pixelLineFilter._updateLineData(index, startPosition, endPosition, startColor, endColor);
            let pixeldata = this._lines[index];
            if (pixeldata) {
                startColor.cloneTo(pixeldata.startColor);
                endColor.cloneTo(pixeldata.endColor);
                startPosition.cloneTo(pixeldata.startPosition);
                endPosition.cloneTo(pixeldata.endPosition);
            }
        }
        else
            throw "PixelLineSprite3D: index must less than lineCount.";
    }
    getLine(index, out) {
        if (index < this.lineCount)
            this._pixelLineFilter._getLineData(index, out);
        else
            throw "PixelLineSprite3D: index must less than lineCount.";
    }
    _updateLineDatas() {
        let n = this.lineCount;
        this._lines = [];
        for (let i = 0; i < n; i++) {
            let pixelLineDatas = new PixelLineData();
            this.getLine(i, pixelLineDatas);
            this._lines.push(pixelLineDatas);
        }
        this._needUpdatelines = false;
    }
    clear() {
        this._pixelLineFilter._lineCount = 0;
        if (this._isRenderActive && this._isInRenders) {
            this.owner.scene && this.owner.scene._removeRenderObject(this);
            this._isInRenders = false;
        }
    }
    _onDestroy() {
        this._pixelLineFilter.destroy();
        this._pixelLineFilter = null;
        super._onDestroy();
    }
    _cloneTo(dest) {
        super._cloneTo(dest);
        let render = dest;
        render.maxLineCount = this.maxLineCount;
        const lineCount = this.lineCount;
        let linedata = new PixelLineData();
        for (let i = 0, n = lineCount; i < n; i++) {
            this.getLine(i, linedata);
            render.addLine(linedata.startPosition, linedata.endPosition, linedata.startColor, linedata.endColor);
        }
    }
}

//# sourceMappingURL=PixelLineRenderer.js.map
