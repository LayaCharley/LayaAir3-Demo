import { Laya } from "Laya";
import { DebugTool } from "../../DebugTool";
import { CacheAnalyser } from "../CacheAnalyser";
import { DebugConsts } from "../DebugConsts";
import { RenderAnalyser } from "../RenderAnalyser";
import { DebugInfoLayer } from "../../view/nodeInfo/DebugInfoLayer";
import { Sprite } from "laya/display/Sprite";
import { RenderSprite } from "laya/renders/RenderSprite";
import { Browser } from "laya/utils/Browser";
export class SpriteRenderHook {
    constructor() {
        this._repaint = 1;
        this._renderType = 1;
    }
    static init() {
        if (SpriteRenderHook.I)
            return;
        SpriteRenderHook.I = new SpriteRenderHook();
        SpriteRenderHook.setRenderHook();
    }
    static setRenderHook() {
        Sprite["prototype"]["render"] = SpriteRenderHook.I.render;
    }
    static showDisplayBorder(sprite, ifShowBorder = true) {
        sprite[SpriteRenderHook.ShowBorderSign] = ifShowBorder;
    }
    static isDisplayShowBorder(sprite) {
        return sprite[SpriteRenderHook.ShowBorderSign];
    }
    render(context, x, y) {
        if (this == Laya.stage) {
            CacheAnalyser.renderLoopBegin();
        }
        var preTime;
        preTime = Browser.now();
        if (this[SpriteRenderHook.ShowBorderSign]) {
            DebugTool.showDisBoundToSprite(this, DebugInfoLayer.I.cacheViewLayer, DebugConsts.SPRITE_REC_COLOR, DebugConsts.SPRITE_REC_LINEWIDTH);
        }
        RenderSprite.renders[this._renderType]._fun(this, context, x + this._x, y + this._y);
        this._repaint = 0;
        RenderAnalyser.I.render(this, Browser.now() - preTime);
    }
}
SpriteRenderHook.ShowBorderSign = "ShowBorderSign";
