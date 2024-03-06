import { Clip } from "./Clip";
export class FontClip extends Clip {
    constructor(skin = null, sheet = null) {
        super();
        this._valueArr = '';
        this._indexMap = null;
        this._sheet = null;
        this._direction = "horizontal";
        this._spaceX = 0;
        this._spaceY = 0;
        this._align = "left";
        this._wordsW = 0;
        this._wordsH = 0;
        if (skin)
            this.skin = skin;
        if (sheet)
            this.sheet = sheet;
    }
    loadComplete(url, img) {
        super.loadComplete(url, img);
        this.callLater(this.changeValue);
    }
    get index() {
        return this._index;
    }
    set index(value) {
        this._index = value;
    }
    get sheet() {
        return this._sheet;
    }
    set sheet(value) {
        value += "";
        this._sheet = value;
        var arr = value.split(" ");
        this._clipX = String(arr[0]).length;
        this.clipY = arr.length;
        this._indexMap = {};
        for (var i = 0; i < this._clipY; i++) {
            var line = arr[i].split("");
            for (var j = 0, n = line.length; j < n; j++) {
                this._indexMap[line[j]] = i * this._clipX + j;
            }
        }
    }
    get value() {
        if (!this._valueArr)
            return "";
        return this._valueArr;
    }
    set value(value) {
        value += "";
        this._valueArr = value;
        this.callLater(this.changeValue);
    }
    get direction() {
        return this._direction;
    }
    set direction(value) {
        this._direction = value;
        this.callLater(this.changeValue);
    }
    get spaceX() {
        return this._spaceX;
    }
    set spaceX(value) {
        this._spaceX = value;
        if (this._direction === "horizontal")
            this.callLater(this.changeValue);
    }
    get spaceY() {
        return this._spaceY;
    }
    set spaceY(value) {
        this._spaceY = value;
        if (!(this._direction === "horizontal"))
            this.callLater(this.changeValue);
    }
    set align(v) {
        this._align = v;
        this.callLater(this.changeValue);
    }
    get align() {
        return this._align;
    }
    changeValue() {
        if (!this._sources)
            return;
        if (!this._valueArr)
            return;
        this.graphics.clear(true);
        let texture;
        texture = this._sources[0];
        if (!texture)
            return;
        var isHorizontal = (this._direction === "horizontal");
        if (isHorizontal) {
            this._wordsW = this._valueArr.length * (texture.sourceWidth + this.spaceX);
            this._wordsH = texture.sourceHeight;
        }
        else {
            this._wordsW = texture.sourceWidth;
            this._wordsH = (texture.sourceHeight + this.spaceY) * this._valueArr.length;
        }
        let dX = 0;
        if (this._isWidthSet) {
            switch (this._align) {
                case "center":
                    dX = 0.5 * (this._width - this._wordsW);
                    break;
                case "right":
                    dX = this._width - this._wordsW;
                    break;
                default:
                    dX = 0;
            }
        }
        for (let i = 0, sz = this._valueArr.length; i < sz; i++) {
            let index = this._indexMap[this._valueArr.charAt(i)];
            texture = this._sources[index];
            if (!texture)
                continue;
            if (isHorizontal)
                this.graphics.drawImage(texture, dX + i * (texture.sourceWidth + this.spaceX), 0, texture.sourceWidth, texture.sourceHeight);
            else
                this.graphics.drawImage(texture, 0 + dX, i * (texture.sourceHeight + this.spaceY), texture.sourceWidth, texture.sourceHeight);
        }
        if (!this._isWidthSet) {
            this._widget.resetLayoutX();
            this.callLater(this._sizeChanged);
        }
        if (!this._isHeightSet) {
            this._widget.resetLayoutY();
            this.callLater(this._sizeChanged);
        }
    }
    _setWidth(value) {
        super._setWidth(value);
        this.callLater(this.changeValue);
    }
    _setHeight(value) {
        super._setHeight(value);
        this.callLater(this.changeValue);
    }
    measureWidth() {
        return this._wordsW;
    }
    measureHeight() {
        return this._wordsH;
    }
    destroy(destroyChild = true) {
        this._valueArr = null;
        this._indexMap = null;
        this.graphics.clear(true);
        super.destroy(destroyChild);
    }
}

//# sourceMappingURL=FontClip.js.map
