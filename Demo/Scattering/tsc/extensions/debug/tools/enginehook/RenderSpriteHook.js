import { CacheAnalyser } from "../CacheAnalyser";
import { RenderSprite } from "laya/renders/RenderSprite";
import { Browser } from "laya/utils/Browser";
export class RenderSpriteHook {
    constructor() {
    }
    static init() {
        if (RenderSpriteHook._oldCanvas)
            return;
        RenderSpriteHook._oldCanvas = RenderSprite["prototype"]["_canvas"];
        RenderSprite["prototype"]["_canvas"] = RenderSpriteHook["prototype"]["_canvas"];
    }
    _canvas(sprite, context, x, y) {
        var _cacheStyle = sprite._cacheStyle;
        var _next = this._next;
        var _repaint;
        if (!_cacheStyle.enableCanvasRender) {
            RenderSpriteHook._oldCanvas.call(this, sprite, context, x, y);
            return;
        }
        if (sprite._needRepaint() || (!_cacheStyle.canvas)) {
            _repaint = true;
        }
        else {
            _repaint = false;
        }
        var preTime;
        preTime = Browser.now();
        RenderSpriteHook._oldCanvas.call(this, sprite, context, x, y);
        if (_repaint) {
            CacheAnalyser.I.reCacheCanvas(sprite, Browser.now() - preTime);
        }
        else {
            CacheAnalyser.I.renderCanvas(sprite, Browser.now() - preTime);
        }
    }
}
RenderSpriteHook.IMAGE = 0x01;
RenderSpriteHook.FILTERS = 0x02;
RenderSpriteHook.ALPHA = 0x04;
RenderSpriteHook.TRANSFORM = 0x08;
RenderSpriteHook.CANVAS = 0x10;
RenderSpriteHook.BLEND = 0x20;
RenderSpriteHook.CLIP = 0x40;
RenderSpriteHook.STYLE = 0x80;
RenderSpriteHook.GRAPHICS = 0x100;
RenderSpriteHook.CUSTOM = 0x200;
RenderSpriteHook.ENABLERENDERMERGE = 0x400;
RenderSpriteHook.CHILDS = 0x800;
RenderSpriteHook.INIT = 0x11111;
RenderSpriteHook.renders = [];
