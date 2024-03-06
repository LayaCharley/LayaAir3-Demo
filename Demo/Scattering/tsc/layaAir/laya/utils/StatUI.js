import { Browser } from "./Browser";
import { Sprite } from "../display/Sprite";
import { Text } from "../display/Text";
import { Stat } from "./Stat";
import { ILaya } from "../../ILaya";
import { IStatRender } from "./IStatRender";
import { CheckBox } from "../ui/CheckBox";
import { Laya } from "../../Laya";
import { Texture2D } from "../resource/Texture2D";
export class StatUI extends IStatRender {
    constructor() {
        super(...arguments);
        this._show = false;
        this._showToggle = false;
        this._height = 100;
        this._view = [];
        this._toggleView = [];
        this._checkBoxArray = [];
    }
    show(x = 0, y = 0, views) {
        this._view.length = views.length;
        for (let i = 0, n = this._view.length; i < n; i++) {
            this._view[i] = views[i];
        }
        if (!this._show) {
            this.createUI(x, y);
            this.enable();
        }
        this._show = true;
    }
    showToggle(x = 0, y = 0, views) {
        ILaya.Loader.cacheRes("defaultCheckBox", Texture2D.defalutUITexture, "TEXTURE2D");
        this._toggleView.length = views.length;
        for (let i = 0, n = this._toggleView.length; i < n; i++) {
            this._toggleView[i] = views[i];
        }
        if (!this._showToggle) {
            this.createToggleUI(x, y);
            this.enable();
        }
        this._showToggle = true;
    }
    createToggleUI(x, y) {
        var stat = this._toggleSprite;
        var pixel = Browser.pixelRatio;
        if (!stat) {
            stat = new Sprite();
            this._toggleleftText = new Text();
            this._toggleleftText.pos(5, 5);
            this._toggleleftText.color = "#ffffff";
            stat.addChild(this._toggleleftText);
            this._toggletxt = new Sprite();
            this._toggletxt.pos(170 * pixel, 5);
            stat.addChild(this._toggletxt);
            this._toggleSprite = stat;
            this._checkBoxArray.length = 0;
        }
        stat.pos(x, y);
        var text = "";
        for (var i = 0; i < this._toggleView.length; i++) {
            var one = this._toggleView[i];
            text += one.title + "\n";
            let checkBox = new CheckBox("defaultCheckBox");
            checkBox.selected = Stat[one.value];
            this._checkBoxArray.push(checkBox);
            checkBox.scale(StatUI._toggleSize, StatUI._toggleSize);
            this._toggletxt.addChild(checkBox);
            checkBox.pos(0, i * (StatUI._toggleSize + 5));
        }
        this._toggleleftText.text = text;
        var width = pixel * 138;
        var height = pixel * (this._toggleView.length * (StatUI._toggleSize + 5)) + 4;
        this._toggleleftText.fontSize = (StatUI._toggleSize + 5) * pixel;
        stat.size(width, height);
        stat.graphics.clear();
        stat.graphics.alpha(0.5);
        stat.graphics.drawRect(0, 0, width + 110, height + 10, "#999999");
        stat.graphics.alpha(2);
        Laya.stage.addChild(stat);
        this.loop();
    }
    createUI(x, y) {
        var stat = this._sp;
        var pixel = Browser.pixelRatio;
        if (!stat) {
            stat = new Sprite();
            this._leftText = new Text();
            this._leftText.pos(5, 5);
            this._leftText.color = "#ffffff";
            stat.addChild(this._leftText);
            this._txt = new Text();
            this._txt.pos(171 * pixel, 5);
            this._txt.color = "#ffffff";
            stat.addChild(this._txt);
            this._sp = stat;
        }
        stat.pos(x, y);
        var text = "";
        for (var i = 0; i < this._view.length; i++) {
            var one = this._view[i];
            text += one.title + "\n";
        }
        this._leftText.text = text;
        var width = pixel * 138;
        var height = pixel * (this._view.length * StatUI._fontSize) + 4;
        this._txt.fontSize = StatUI._fontSize * pixel;
        this._leftText.fontSize = StatUI._fontSize * pixel;
        stat.size(width, height);
        stat.graphics.clear();
        stat.graphics.alpha(0.5);
        stat.graphics.drawRect(0, 0, width + 110, height + 10, "#999999");
        stat.graphics.alpha(2);
        this.loop();
    }
    enable() {
        ILaya.systemTimer.frameLoop(1, this, this.loop);
    }
    hide() {
        this._show = false;
        this._showToggle = false;
        ILaya.systemTimer.clear(this, this.loop);
        if (this._canvas) {
            Browser.removeElement(this._canvas.source);
        }
    }
    set_onclick(fn) {
        if (this._sp) {
            this._sp.on("click", this._sp, fn);
        }
        if (this._canvas) {
            this._canvas.source.onclick = fn;
            this._canvas.source.style.pointerEvents = '';
        }
    }
    loop() {
        Stat._count++;
        var timer = Browser.now();
        if (timer - Stat._timer < 1000)
            return;
        var count = Stat._count;
        Stat.FPS = Math.round((count * 1000) / (timer - Stat._timer));
        if (this._show) {
            Stat.updateEngineData();
            var delay = Stat.FPS > 0 ? Math.floor(1000 / Stat.FPS).toString() : " ";
            Stat._fpsStr = Stat.FPS + (Stat.renderSlow ? " slow" : "") + " " + delay;
            this.renderInfo(count);
            Stat.clear();
        }
        if (this._showToggle) {
            for (var i = 0; i < this._toggleView.length; i++) {
                let one = this._toggleView[i];
                Stat[one.value] = this._checkBoxArray[i].selected;
            }
        }
        Stat._count = 0;
        Stat._timer = timer;
    }
    renderInfo(count) {
        var text = "";
        for (var i = 0; i < this._view.length; i++) {
            let vieparam = this._view[i];
            let isAverage = vieparam.mode == "average";
            var value = Stat[vieparam.value];
            (vieparam.units == "M") && (value = Math.floor(value / (1024 * 1024) * 100) / 100);
            (vieparam.units == "K") && (value = Math.floor(value / (1024) * 100) / 100);
            if (isAverage) {
                value /= count;
                value = Math.floor(value);
            }
            (vieparam.units == "M") && (value += "M");
            (vieparam.units == "K") && (value += "K");
            text += value + "\n";
        }
        this._txt.text = text;
    }
    renderNotCanvas(ctx, x, y) {
        this._show && this._sp && this._sp.render(ctx, 0, 0);
    }
}
StatUI._fontSize = 14;
StatUI._toggleSize = 16;

//# sourceMappingURL=StatUI.js.map
