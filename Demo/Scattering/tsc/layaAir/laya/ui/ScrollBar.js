import { UIComponent } from "./UIComponent";
import { Button } from "./Button";
import { Slider } from "./Slider";
import { UIConfig } from "./../../UIConfig";
import { Styles } from "./Styles";
import { Event } from "../events/Event";
import { Point } from "../maths/Point";
import { Ease } from "../utils/Ease";
import { Handler } from "../utils/Handler";
import { Tween } from "../utils/Tween";
import { ILaya } from "../../ILaya";
import { HideFlags } from "../Const";
import { URL } from "../net/URL";
import { Utils } from "../utils/Utils";
import { AssetDb } from "../resource/AssetDb";
export class ScrollBar extends UIComponent {
    constructor(skin = null) {
        super();
        this.rollRatio = 0.97;
        this.scaleBar = true;
        this.autoHide = false;
        this.elasticDistance = 0;
        this.elasticBackTime = 500;
        this.topMoveLimit = 0;
        this.bottomMoveLimit = 0;
        this.disableDrag = false;
        this._scrollSize = 1;
        this._thumbPercent = 1;
        this._lastOffset = 0;
        this._checkElastic = false;
        this._isElastic = false;
        this._hide = false;
        this._clickOnly = true;
        this._showButtons = UIConfig.showButtons;
        this._touchScrollEnable = UIConfig.touchScrollEnable;
        this._mouseWheelEnable = UIConfig.mouseWheelEnable;
        this.skin = skin;
        this.max = 1;
    }
    destroy(destroyChild = true) {
        this.stopScroll();
        this.target = null;
        super.destroy(destroyChild);
        this.upButton && this.upButton.destroy(destroyChild);
        this.downButton && this.downButton.destroy(destroyChild);
        this.slider && this.slider.destroy(destroyChild);
        this.upButton = this.downButton = null;
        this.slider = null;
        this.changeHandler = null;
        this._offsets = null;
    }
    createChildren() {
        this.slider = new Slider();
        this.slider.hideFlags = HideFlags.HideAndDontSave;
        this.addChild(this.slider);
        this.upButton = new Button();
        this.upButton.hideFlags = HideFlags.HideAndDontSave;
        this.addChild(this.upButton);
        this.downButton = new Button();
        this.downButton.hideFlags = HideFlags.HideAndDontSave;
        this.addChild(this.downButton);
    }
    initialize() {
        this.slider.showLabel = false;
        this.slider.tick = 0;
        this.slider.on(Event.CHANGE, this, this.onSliderChange);
        this.slider.setSlider(0, 0, 0);
        this.upButton.on(Event.MOUSE_DOWN, this, this.onButtonMouseDown);
        this.downButton.on(Event.MOUSE_DOWN, this, this.onButtonMouseDown);
    }
    onSliderChange() {
        if (this._value != this.slider.value)
            this.value = this.slider.value;
    }
    onButtonMouseDown(e) {
        var isUp = e.currentTarget === this.upButton;
        this.slide(isUp);
        ILaya.timer.once(Styles.scrollBarDelayTime, this, this.startLoop, [isUp]);
        ILaya.stage.once(Event.MOUSE_UP, this, this.onStageMouseUp);
    }
    startLoop(isUp) {
        ILaya.timer.frameLoop(1, this, this.slide, [isUp]);
    }
    slide(isUp) {
        if (isUp)
            this.value -= this._scrollSize;
        else
            this.value += this._scrollSize;
    }
    onStageMouseUp(e) {
        ILaya.timer.clear(this, this.startLoop);
        ILaya.timer.clear(this, this.slide);
    }
    get skin() {
        return this._skin;
    }
    set skin(value) {
        if (value == "")
            value = null;
        if (this._skin == value)
            return;
        this._setSkin(value);
    }
    _setSkin(url) {
        this._skin = url;
        if (url) {
            return AssetDb.inst.resolveURL(url).then(url => {
                if (this._destroyed)
                    return null;
                if (this._skinBaseUrl)
                    url = URL.formatURL(url, this._skinBaseUrl);
                return Promise.all([
                    this.slider._setSkin(url),
                    this.upButton._setSkin(Utils.replaceFileExtension(url, "$up.png", true)),
                    this.downButton._setSkin(Utils.replaceFileExtension(url, "$down.png", true))
                ]).then(() => this._skinLoaded());
            });
        }
        else {
            this.slider.skin = null;
            this.upButton.skin = null;
            this.downButton.skin = null;
            this._skinLoaded();
            return Promise.resolve();
        }
    }
    _skinLoaded() {
        if (this._destroyed)
            return;
        this.callLater(this.changeScrollBar);
        this._sizeChanged();
        this.event(Event.LOADED);
    }
    changeScrollBar() {
        this.upButton.visible = this._showButtons;
        this.downButton.visible = this._showButtons;
        if (this.slider.isVertical)
            this.slider.y = this._showButtons ? this.upButton.height : 0;
        else
            this.slider.x = this._showButtons ? this.upButton.width : 0;
        this.resetPositions();
        this.repaint();
    }
    _sizeChanged() {
        super._sizeChanged();
        this.repaint();
        this.resetPositions();
        this.event(Event.CHANGE);
        this.changeHandler && this.changeHandler.runWith(this.value);
    }
    resetPositions() {
        if (this.slider.isVertical)
            this.slider.height = this.height - (this._showButtons ? (this.upButton.height + this.downButton.height) : 0);
        else
            this.slider.width = this.width - (this._showButtons ? (this.upButton.width + this.downButton.width) : 0);
        this.resetButtonPosition();
    }
    resetButtonPosition() {
        if (this.slider.isVertical)
            this.downButton.y = this.slider._y + this.slider.height;
        else
            this.downButton.x = this.slider._x + this.slider.width;
    }
    measureWidth() {
        if (this.slider.isVertical)
            return this.slider.width;
        return 100;
    }
    measureHeight() {
        if (this.slider.isVertical)
            return 100;
        return this.slider.height;
    }
    setScroll(min, max, value) {
        this.runCallLater(this._sizeChanged);
        this.slider.setSlider(min, max, value);
        this.slider.bar.visible = max > 0;
        if (!this._hide && this.autoHide)
            this.visible = false;
    }
    get max() {
        return this.slider.max;
    }
    set max(value) {
        this.slider.max = value;
    }
    get min() {
        return this.slider.min;
    }
    set min(value) {
        this.slider.min = value;
    }
    get value() {
        return this._value;
    }
    set value(v) {
        if (v !== this._value) {
            this._value = v;
            if (!this._isElastic) {
                if (this.slider["_value"] != v) {
                    this.slider["_value"] = v;
                    this.slider.changeValue();
                }
                this._value = this.slider["_value"];
            }
            this.event(Event.CHANGE);
            this.changeHandler && this.changeHandler.runWith(this._value);
        }
    }
    get isVertical() {
        return this.slider.isVertical;
    }
    set isVertical(value) {
        this.slider.isVertical = value;
    }
    get sizeGrid() {
        return this.slider.sizeGrid;
    }
    set sizeGrid(value) {
        this.slider.sizeGrid = value;
    }
    get scrollSize() {
        return this._scrollSize;
    }
    set scrollSize(value) {
        this._scrollSize = value;
    }
    set_dataSource(value) {
        this._dataSource = value;
        if (typeof (value) == 'number' || typeof (value) == 'string')
            this.value = Number(value);
        else
            super.set_dataSource(value);
    }
    get thumbPercent() {
        return this._thumbPercent;
    }
    set thumbPercent(value) {
        this.runCallLater(this.changeScrollBar);
        this.runCallLater(this._sizeChanged);
        value = value >= 1 ? 0.99 : value;
        this._thumbPercent = value;
        if (this.scaleBar) {
            if (this.slider.isVertical)
                this.slider.bar.height = Math.max(this.slider.height * value, Styles.scrollBarMinNum);
            else
                this.slider.bar.width = Math.max(this.slider.width * value, Styles.scrollBarMinNum);
        }
    }
    get target() {
        return this._target;
    }
    set target(value) {
        if (this._target) {
            this._target.off(Event.MOUSE_WHEEL, this, this.onTargetMouseWheel);
            this._target.off(Event.MOUSE_DOWN, this, this.onTargetMouseDown);
        }
        this._target = value;
        if (value) {
            this._mouseWheelEnable && this._target.on(Event.MOUSE_WHEEL, this, this.onTargetMouseWheel);
            this._touchScrollEnable && this._target.on(Event.MOUSE_DOWN, this, this.onTargetMouseDown);
        }
    }
    get hide() {
        return this._hide;
    }
    set hide(value) {
        this._hide = value;
        this.visible = !value;
    }
    get showButtons() {
        return this._showButtons;
    }
    set showButtons(value) {
        this._showButtons = value;
        this.callLater(this.changeScrollBar);
    }
    get touchScrollEnable() {
        return this._touchScrollEnable;
    }
    set touchScrollEnable(value) {
        this._touchScrollEnable = value;
        this.target = this._target;
    }
    get mouseWheelEnable() {
        return this._mouseWheelEnable;
    }
    set mouseWheelEnable(value) {
        this._mouseWheelEnable = value;
        this.target = this._target;
    }
    onTargetMouseWheel(e) {
        this.value += e.delta * this._scrollSize;
        this.target = this._target;
    }
    onTargetMouseDown(e) {
        if ((this.isLockedFun) && !this.isLockedFun(e))
            return;
        this.event(Event.END);
        this._clickOnly = true;
        this._lastOffset = 0;
        this._checkElastic = false;
        this._lastPoint || (this._lastPoint = new Point());
        this._lastPoint.setTo(ILaya.stage.mouseX, ILaya.stage.mouseY);
        ILaya.timer.clear(this, this.tweenMove);
        Tween.clearTween(this);
        ILaya.stage.once(Event.MOUSE_UP, this, this.onStageMouseUp2);
        ILaya.stage.once(Event.MOUSE_OUT, this, this.onStageMouseUp2);
        ILaya.timer.frameLoop(1, this, this.loop);
    }
    startDragForce() {
        this._clickOnly = true;
        this._lastOffset = 0;
        this._checkElastic = false;
        this._lastPoint || (this._lastPoint = new Point());
        this._lastPoint.setTo(ILaya.stage.mouseX, ILaya.stage.mouseY);
        ILaya.timer.clear(this, this.tweenMove);
        Tween.clearTween(this);
        ILaya.stage.once(Event.MOUSE_UP, this, this.onStageMouseUp2);
        ILaya.stage.once(Event.MOUSE_OUT, this, this.onStageMouseUp2);
        ILaya.timer.frameLoop(1, this, this.loop);
    }
    cancelDragOp() {
        ILaya.stage.off(Event.MOUSE_UP, this, this.onStageMouseUp2);
        ILaya.stage.off(Event.MOUSE_OUT, this, this.onStageMouseUp2);
        ILaya.timer.clear(this, this.tweenMove);
        ILaya.timer.clear(this, this.loop);
        this._target.mouseEnabled = true;
    }
    checkTriggers(isTweenMove = false) {
        if (this.value >= 0 && this.value - this._lastOffset <= 0) {
            if ((this.triggerDownDragLimit) && this.triggerDownDragLimit(isTweenMove)) {
                this.cancelDragOp();
                this.value = 0;
                return true;
            }
        }
        if (this.value <= this.max && (this.value - this._lastOffset >= this.max)) {
            if ((this.triggerUpDragLimit) && this.triggerUpDragLimit(isTweenMove)) {
                this.cancelDragOp();
                this.value = this.max;
                return true;
            }
        }
        return false;
    }
    get lastOffset() {
        return this._lastOffset;
    }
    startTweenMoveForce(lastOffset) {
        this._lastOffset = lastOffset;
        ILaya.timer.frameLoop(1, this, this.tweenMove, [200]);
    }
    loop() {
        if (this.disableDrag)
            return;
        var mouseY = ILaya.stage.mouseY;
        var mouseX = ILaya.stage.mouseX;
        this._lastOffset = this.isVertical ? (mouseY - this._lastPoint.y) : (mouseX - this._lastPoint.x);
        if (this._clickOnly) {
            if (Math.abs(this._lastOffset * (this.isVertical ? ILaya.stage._canvasTransform.getScaleY() : ILaya.stage._canvasTransform.getScaleX())) > 1) {
                this._clickOnly = false;
                if (this.checkTriggers())
                    return;
                this._offsets || (this._offsets = []);
                this._offsets.length = 0;
                this._target.mouseEnabled = false;
                if (!this.hide && this.autoHide) {
                    this.alpha = 1;
                    this.visible = true;
                }
                this.event(Event.START);
            }
            else
                return;
        }
        else {
            if (this.checkTriggers())
                return;
        }
        this._offsets.push(this._lastOffset);
        this._lastPoint.x = mouseX;
        this._lastPoint.y = mouseY;
        if (this._lastOffset === 0)
            return;
        if (!this._checkElastic) {
            if (this.elasticDistance > 0) {
                if (!this._checkElastic && this._lastOffset != 0) {
                    if ((this._lastOffset > 0 && this._value <= this.min) || (this._lastOffset < 0 && this._value >= this.max)) {
                        this._isElastic = true;
                        this._checkElastic = true;
                    }
                    else {
                        this._isElastic = false;
                    }
                }
            }
            else {
                this._checkElastic = true;
            }
        }
        if (this._isElastic) {
            if (this._value <= this.min) {
                if (this._lastOffset > 0) {
                    this.value -= this._lastOffset * Math.max(0, (1 - ((this.min - this._value) / this.elasticDistance)));
                }
                else {
                    this.value -= this._lastOffset * 0.5;
                    if (this._value >= this.min)
                        this._checkElastic = false;
                }
            }
            else if (this._value >= this.max) {
                if (this._lastOffset < 0) {
                    this.value -= this._lastOffset * Math.max(0, (1 - ((this._value - this.max) / this.elasticDistance)));
                }
                else {
                    this.value -= this._lastOffset * 0.5;
                    if (this._value <= this.max)
                        this._checkElastic = false;
                }
            }
        }
        else {
            this.value -= this._lastOffset;
        }
    }
    onStageMouseUp2(e) {
        ILaya.stage.off(Event.MOUSE_UP, this, this.onStageMouseUp2);
        ILaya.stage.off(Event.MOUSE_OUT, this, this.onStageMouseUp2);
        ILaya.timer.clear(this, this.loop);
        if (this._clickOnly) {
            if (this._value >= this.min && this._value <= this.max)
                return;
        }
        this._target.mouseEnabled = true;
        if (this._isElastic) {
            if (this._value < this.min) {
                this.event("dragTopLimit");
                var moveValue = (this.stopMoveLimit && this.stopMoveLimit()) ? (this.min - this.topMoveLimit) : this.min;
                Tween.to(this, { value: moveValue }, this.elasticBackTime, Ease.sineOut, Handler.create(this, this.elasticOver));
            }
            else if (this._value > this.max) {
                this.event("dragBottomLimit");
                var moveValue = (this.stopMoveLimit && this.stopMoveLimit()) ? (this.max + this.bottomMoveLimit) : this.max;
                Tween.to(this, { value: moveValue }, this.elasticBackTime, Ease.sineOut, Handler.create(this, this.elasticOver));
            }
        }
        else {
            if (!this._offsets)
                return;
            if (this._offsets.length < 1) {
                this._offsets[0] = this.isVertical ? ILaya.stage.mouseY - this._lastPoint.y : ILaya.stage.mouseX - this._lastPoint.x;
            }
            var offset = 0;
            var n = Math.min(this._offsets.length, 3);
            for (var i = 0; i < n; i++) {
                offset += this._offsets[this._offsets.length - 1 - i];
            }
            this._lastOffset = offset / n;
            offset = Math.abs(this._lastOffset);
            if (offset < 2) {
                this.event(Event.END);
                return;
            }
            if (offset > 250)
                this._lastOffset = this._lastOffset > 0 ? 250 : -250;
            var dis = Math.round(Math.abs(this.elasticDistance * (this._lastOffset / 150)));
            ILaya.timer.frameLoop(1, this, this.tweenMove, [dis]);
        }
    }
    elasticOver() {
        this._isElastic = false;
        if (!this.hide && this.autoHide) {
            Tween.to(this, { alpha: 0 }, 500);
        }
        this.event(Event.END);
    }
    tweenMove(maxDistance) {
        this._lastOffset *= this.rollRatio;
        if (this.checkTriggers(true)) {
            return;
        }
        var tarSpeed;
        if (maxDistance > 0) {
            if (this._lastOffset > 0 && this.value <= this.min) {
                this._isElastic = true;
                tarSpeed = -(this.min - maxDistance - this.value) * 0.5;
                if (this._lastOffset > tarSpeed)
                    this._lastOffset = tarSpeed;
            }
            else if (this._lastOffset < 0 && this.value >= this.max) {
                this._isElastic = true;
                tarSpeed = -(this.max + maxDistance - this.value) * 0.5;
                if (this._lastOffset < tarSpeed)
                    this._lastOffset = tarSpeed;
            }
        }
        this.value -= this._lastOffset;
        if (Math.abs(this._lastOffset) < 0.1) {
            ILaya.timer.clear(this, this.tweenMove);
            if (this._isElastic) {
                if (this._value < this.min) {
                    Tween.to(this, { value: this.min }, this.elasticBackTime, Ease.sineOut, Handler.create(this, this.elasticOver));
                }
                else if (this._value > this.max) {
                    Tween.to(this, { value: this.max }, this.elasticBackTime, Ease.sineOut, Handler.create(this, this.elasticOver));
                }
                else {
                    this.elasticOver();
                }
                return;
            }
            this.event(Event.END);
            if (!this.hide && this.autoHide) {
                Tween.to(this, { alpha: 0 }, 500);
            }
        }
    }
    stopScroll() {
        this.onStageMouseUp2(null);
        ILaya.timer.clear(this, this.tweenMove);
        Tween.clearTween(this);
    }
    get tick() {
        return this.slider.tick;
    }
    set tick(value) {
        this.slider.tick = value;
    }
    backToNormal() {
        if (this._value < this.min) {
            this._backToNormal(this.min);
        }
        else if (this._value > this.max) {
            this._backToNormal(this.max);
        }
    }
    _backToNormal(value) {
        Tween.to(this, { value: value }, this.elasticBackTime, Ease.sineOut, Handler.create(this, this.elasticOver));
    }
}

//# sourceMappingURL=ScrollBar.js.map
