import { Utils } from "./Utils";
const _COLOR_MAP = { "purple": "#800080", "orange": "#ffa500", "white": '#FFFFFF', "red": '#FF0000', "green": '#00FF00', "blue": '#0000FF', "black": '#000000', "yellow": '#FFFF00', 'gray': '#808080' };
export class ColorUtils {
    constructor(value) {
        this.arrColor = [];
        if (value == null || value == 'none') {
            this.strColor = "#00000000";
            this.numColor = 0;
            this.arrColor = [0, 0, 0, 0];
            return;
        }
        let color;
        if (typeof (value) == 'string') {
            color = Utils.fromStringColor(value);
            this.strColor = value;
        }
        else {
            color = value;
            this.strColor = Utils.toHexColor(color);
        }
        if (this.strColor.indexOf("rgba") >= 0 || this.strColor.length === 9) {
            this.arrColor = [((0xFF000000 & color) >>> 24) / 255, ((0xFF0000 & color) >> 16) / 255, ((0xFF00 & color) >> 8) / 255, (0xFF & color) / 255];
            this.numColor = (0xff000000 & color) >>> 24 | (color & 0xff0000) >> 8 | (color & 0x00ff00) << 8 | ((color & 0xff) << 24);
        }
        else {
            this.arrColor = [((0xFF0000 & color) >> 16) / 255, ((0xFF00 & color) >> 8) / 255, (0xFF & color) / 255, 1];
            this.numColor = 0xff000000 | (color & 0xff0000) >> 16 | (color & 0x00ff00) | (color & 0xff) << 16;
        }
    }
    static _initDefault() {
        ColorUtils._DEFAULT = {};
        for (var i in _COLOR_MAP)
            ColorUtils._SAVE[i] = ColorUtils._DEFAULT[i] = new ColorUtils(_COLOR_MAP[i]);
        return ColorUtils._DEFAULT;
    }
    static _initSaveMap() {
        ColorUtils._SAVE_SIZE = 0;
        ColorUtils._SAVE = Object.assign({}, ColorUtils._DEFAULT);
    }
    static create(value) {
        let key = value + "";
        let color = ColorUtils._SAVE[key];
        if (color != null)
            return color;
        if (ColorUtils._SAVE_SIZE > 500)
            ColorUtils._initSaveMap();
        ColorUtils._SAVE_SIZE++;
        return ColorUtils._SAVE[key] = new ColorUtils(value);
    }
}
ColorUtils._SAVE = {};
ColorUtils._SAVE_SIZE = 0;
ColorUtils._DEFAULT = ColorUtils._initDefault();

//# sourceMappingURL=ColorUtils.js.map
