import { Loader } from "laya/net/Loader";
import { Browser } from "laya/utils/Browser";
export class Base64ImageTool {
    constructor() {
    }
    static getCanvasPic(img) {
        img = img.bitmap;
        var canvas = Browser.createElement("canvas");
        var ctx = canvas.getContext('2d');
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img.bitmap, 0, 0);
        return canvas;
    }
    static getBase64Pic(img) {
        return Base64ImageTool.getCanvasPic(img).toDataURL("image/png");
    }
    static getPreloads(base64Data) {
        var rst;
        rst = [];
        var key;
        for (key in base64Data) {
            rst.push({ url: base64Data[key], type: Loader.IMAGE });
        }
        return rst;
    }
}
