export class FontInfo {
    constructor(font) {
        this._family = "Arial";
        this._size = 14;
        this._italic = false;
        this._bold = false;
        this.setFont(font || "14px Arial");
    }
    static parse(font) {
        if (font === _lastFont) {
            return _lastFontInfo;
        }
        let r = FontInfo._cache[font];
        if (!r) {
            r = FontInfo._cache[font] = new FontInfo(font);
        }
        _lastFont = font;
        _lastFontInfo = r;
        return r;
    }
    setFont(value) {
        this._font = value;
        var words = value.split(' ');
        var l = words.length;
        if (l < 2) {
            if (l == 1) {
                if (words[0].indexOf('px') > 0) {
                    this._size = parseInt(words[0]);
                }
            }
            return;
        }
        var szpos = -1;
        for (let i = 0; i < l; i++) {
            if (words[i].indexOf('px') > 0 || words[i].indexOf('pt') > 0) {
                szpos = i;
                this._size = parseInt(words[i]);
                if (this._size <= 0) {
                    console.debug('font parse error:' + value);
                    this._size = 14;
                }
                break;
            }
        }
        var fpos = szpos + 1;
        var familys = words[fpos];
        fpos++;
        for (; fpos < l; fpos++) {
            familys += ' ' + words[fpos];
        }
        this._family = (familys.split(','))[0];
        this._italic = words.indexOf('italic') >= 0;
        this._bold = words.indexOf('bold') >= 0;
    }
}
FontInfo._cache = {};
var _lastFont = '';
var _lastFontInfo;

//# sourceMappingURL=FontInfo.js.map
