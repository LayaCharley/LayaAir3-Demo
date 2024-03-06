import { Laya } from "Laya";
import { Browser } from "laya/utils/Browser";
import { Sprite } from "laya/display/Sprite";
import { Point } from "laya/maths/Point";
import { Texture } from "laya/resource/Texture";
export class JSTools {
    constructor() {
    }
    static showToBody(el, x = 0, y = 0) {
        Browser.document.body.appendChild(el);
        var style;
        style = el.style;
        style.position = "absolute";
        style.top = y + "px";
        style.left = x + "px";
    }
    static showToParent(el, x = 0, y = 0, parent = null) {
        parent.appendChild(el);
        var style;
        style = el.style;
        style.position = "absolute";
        style.top = y + "px";
        style.left = x + "px";
    }
    static addToBody(el) {
        Browser.document.body.appendChild(el);
    }
    static setPos(el, x, y) {
        var style;
        style = el.style;
        style.top = y + "px";
        style.left = x + "px";
    }
    static setSize(el, width, height) {
        var style;
        style = el.style;
        style.width = width + "px";
        style.height = height + "px";
    }
    static setTransform(el, mat) {
        var style;
        style = el.style;
        style.transformOrigin = style.webkitTransformOrigin = style.msTransformOrigin = style.mozTransformOrigin = style.oTransformOrigin = "0px 0px 0px";
        style.transform = style.webkitTransform = style.msTransform = style.mozTransform = style.oTransform = "matrix(" + mat.toString() + ")";
    }
    static noMouseEvent(el) {
        var style;
        style = el.style;
        style["pointer-events"] = "none";
    }
    static setMouseEnable(el, enable) {
        var style;
        style = el.style;
        style["pointer-events"] = enable ? "auto" : "none";
    }
    static setZIndex(el, zIndex) {
        var style;
        style = el.style;
        style["z-index"] = zIndex;
    }
    static showAboveSprite(el, sprite, dx = 0, dy = 0) {
        var pos;
        pos = new Point();
        pos = sprite.localToGlobal(pos);
        pos.x += dx;
        pos.y += dy;
        pos.x += Laya.stage.offset.x;
        pos.y += Laya.stage.offset.y;
        JSTools.showToBody(el, pos.x, pos.y);
    }
    static removeElement(el) {
        Browser.removeElement(el);
    }
    static isElementInDom(el) {
        return el && el.parentNode;
    }
    static getImageSpriteByFile(file, width = 0, height = 0) {
        var reader;
        reader = new FileReader();
        ;
        reader.readAsDataURL(file);
        var sprite;
        sprite = new Sprite();
        reader.onload = function (e) {
            var txt;
            txt = new Texture();
            txt.load(reader.result);
            sprite.graphics.drawTexture(txt, 0, 0, width, height);
        };
        return sprite;
    }
    static getPixelRatio() {
        if (JSTools._pixelRatio > 0)
            return JSTools._pixelRatio;
        var canvas = Browser.createElement("canvas");
        var context = canvas.getContext('2d');
        var devicePixelRatio = Browser.window.devicePixelRatio || 1;
        var backingStoreRatio = context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio || 1;
        var ratio = devicePixelRatio / backingStoreRatio;
        console.log("pixelRatioc:", ratio);
        JSTools._pixelRatio = ratio;
        return ratio;
    }
}
JSTools._pixelRatio = -1;
