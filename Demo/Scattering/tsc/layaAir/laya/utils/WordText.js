export class WordText {
    constructor() {
        this.pagecharsCtx = null;
        if (window.conch && !window.conchConfig.conchWebGL)
            this._nativeObj = new window._conchWordText();
        else {
            this.width = -1;
            this.pageChars = [];
            this.scalex = 1;
            this.scaley = 1;
        }
    }
    setText(txt) {
        this.text = txt;
        if (this._nativeObj)
            this._nativeObj._text = txt;
        else
            this.width = -1;
        this.cleanCache();
    }
    toString() {
        return this.text;
    }
    get length() {
        return this.text ? this.text.length : 0;
    }
    cleanCache() {
        if (this._nativeObj) {
            this._nativeObj.cleanCache();
            return;
        }
        let chars = this.pageChars;
        if (chars.length > 0) {
            for (let p of chars) {
                let tex = p.tex;
                let words = p.words;
                if (words.length == 1 && tex && tex.ri) {
                    tex.destroy();
                }
            }
            this.pageChars = [];
        }
        this.scalex = 1;
        this.scaley = 1;
    }
    get splitRender() {
        return this._splitRender;
    }
    set splitRender(value) {
        this._splitRender = value;
        if (this._nativeObj)
            this._nativeObj.splitRender = value;
    }
}

//# sourceMappingURL=WordText.js.map
