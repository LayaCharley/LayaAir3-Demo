import { MathTools } from "./MathTools";
import { Utils } from "laya/utils/Utils";
export class ColorTool {
    constructor() {
    }
    static toHexColor(color) {
        return Utils.toHexColor(color);
    }
    static getRGBByRGBStr(str) {
        str.charAt(0) == '#' && (str = str.substr(1));
        var color = parseInt(str, 16);
        var flag = (str.length == 8);
        var _color;
        _color = [((0x00FF0000 & color) >> 16), ((0x0000FF00 & color) >> 8), (0x000000FF & color)];
        return _color;
    }
    static getColorBit(value) {
        var rst;
        rst = Math.floor(value).toString(16);
        rst = rst.length > 1 ? rst : "0" + rst;
        return rst;
    }
    static getRGBStr(rgb, coefficient = 1) {
        return "#" + ColorTool.getColorBit(rgb[0] * coefficient) + ColorTool.getColorBit(rgb[1] * coefficient) + ColorTool.getColorBit(rgb[2] * coefficient);
    }
    static traseHSB(hsb) {
        console.log("hsb:", hsb[0], hsb[1], hsb[2]);
    }
    static rgb2hsb(rgbR, rgbG, rgbB) {
        var rgb = [rgbR, rgbG, rgbB];
        rgb.sort(MathTools.sortNumSmallFirst);
        var max = rgb[2];
        var min = rgb[0];
        var hsbB = max / 255.0;
        var hsbS = max == 0 ? 0 : (max - min) / max;
        var hsbH = 0;
        if (max == min) {
            hsbH = 1;
        }
        else if (rgbR == 0 && rgbG == 0 && rgbB == 0) {
        }
        else if (max == rgbR && rgbG >= rgbB) {
            hsbH = (rgbG - rgbB) * 60 / (max - min) + 0;
        }
        else if (max == rgbR && rgbG < rgbB) {
            hsbH = (rgbG - rgbB) * 60 / (max - min) + 360;
        }
        else if (max == rgbG) {
            hsbH = (rgbB - rgbR) * 60 / (max - min) + 120;
        }
        else if (max == rgbB) {
            hsbH = (rgbR - rgbG) * 60 / (max - min) + 240;
        }
        return [hsbH, hsbS, hsbB];
    }
    static hsb2rgb(h, s, v) {
        var r = 0, g = 0, b = 0;
        var i = Math.floor((h / 60) % 6);
        var f = (h / 60) - i;
        var p = v * (1 - s);
        var q = v * (1 - f * s);
        var t = v * (1 - (1 - f) * s);
        switch (i) {
            case 0:
                r = v;
                g = t;
                b = p;
                break;
            case 1:
                r = q;
                g = v;
                b = p;
                break;
            case 2:
                r = p;
                g = v;
                b = t;
                break;
            case 3:
                r = p;
                g = q;
                b = v;
                break;
            case 4:
                r = t;
                g = p;
                b = v;
                break;
            case 5:
                r = v;
                g = p;
                b = q;
                break;
            default:
                break;
        }
        return [Math.floor(r * 255.0), Math.floor(g * 255.0), Math.floor(b * 255.0)];
    }
}
