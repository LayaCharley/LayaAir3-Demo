import { UIConfig } from "./../../UIConfig";
import { NodeFlags } from "../Const";
import { Sprite } from "../display/Sprite";
import { Event } from "../events/Event";
import { Box } from "./Box";
import { Dialog } from "./Dialog";
import { Ease } from "../utils/Ease";
import { Handler } from "../utils/Handler";
import { Tween } from "../utils/Tween";
import { ILaya } from "../../ILaya";
export class DialogManager extends Sprite {
    constructor() {
        super();
        this.maskLayer = new Sprite();
        this.popupEffect = (dialog) => {
            dialog.scale(1, 1);
            dialog._effectTween = Tween.from(dialog, { x: ILaya.stage.width / 2, y: ILaya.stage.height / 2, scaleX: 0, scaleY: 0 }, 300, Ease.backOut, Handler.create(this, this.doOpen, [dialog]), 0, false, false);
        };
        this.closeEffect = (dialog) => {
            dialog._effectTween = Tween.to(dialog, { x: ILaya.stage.width / 2, y: ILaya.stage.height / 2, scaleX: 0, scaleY: 0 }, 300, Ease.strongOut, Handler.create(this, this.doClose, [dialog]), 0, false, false);
        };
        this.popupEffectHandler = new Handler(this, this.popupEffect);
        this.closeEffectHandler = new Handler(this, this.closeEffect);
        this.mouseEnabled = this.maskLayer.mouseEnabled = true;
        this.zOrder = 1000;
        ILaya.stage.addChild(this);
        ILaya.stage.on(Event.RESIZE, this, this._onResize);
        if (UIConfig.closeDialogOnSide)
            this.maskLayer.on("click", this, this._closeOnSide);
        this._onResize(null);
    }
    _closeOnSide() {
        var dialog = this.getChildAt(this.numChildren - 1);
        if (dialog instanceof Dialog)
            dialog.close("side");
    }
    setLockView(value) {
        if (!this.lockLayer) {
            this.lockLayer = new Box();
            this.lockLayer.mouseEnabled = true;
            this.lockLayer.size(ILaya.stage.width, ILaya.stage.height);
        }
        this.lockLayer.removeChildren();
        if (value) {
            value.centerX = value.centerY = 0;
            this.lockLayer.addChild(value);
        }
    }
    _onResize(e = null) {
        var width = this.maskLayer.width = ILaya.stage.width;
        var height = this.maskLayer.height = ILaya.stage.height;
        if (this.lockLayer)
            this.lockLayer.size(width, height);
        this.maskLayer.graphics.clear(true);
        this.maskLayer.graphics.drawRect(0, 0, width, height, UIConfig.popupBgColor);
        this.maskLayer.alpha = UIConfig.popupBgAlpha;
        for (var i = this.numChildren - 1; i > -1; i--) {
            var item = this.getChildAt(i);
            if (item.isPopupCenter)
                this._centerDialog(item);
        }
    }
    _centerDialog(dialog) {
        dialog.x = Math.round(((ILaya.stage.width - dialog.width) >> 1) + dialog.pivotX);
        dialog.y = Math.round(((ILaya.stage.height - dialog.height) >> 1) + dialog.pivotY);
    }
    open(dialog, closeOther = false, showEffect = false) {
        if (closeOther)
            this._closeAll();
        this._clearDialogEffect(dialog);
        if (dialog.isPopupCenter)
            this._centerDialog(dialog);
        this.addChild(dialog);
        if (dialog.isModal || this._getBit(NodeFlags.HAS_ZORDER))
            ILaya.timer.callLater(this, this._checkMask);
        if (showEffect && dialog.popupEffect != null)
            dialog.popupEffect.runWith(dialog);
        else
            this.doOpen(dialog);
        this.event(Event.OPEN);
    }
    _clearDialogEffect(dialog) {
        if (dialog._effectTween) {
            Tween.clear(dialog._effectTween);
            dialog._effectTween = null;
        }
    }
    doOpen(dialog) {
        dialog.onOpened(dialog._param);
    }
    lock(value) {
        if (this.lockLayer) {
            if (value)
                this.addChild(this.lockLayer);
            else
                this.lockLayer.removeSelf();
        }
    }
    close(dialog) {
        this._clearDialogEffect(dialog);
        if (dialog.isShowEffect && dialog.closeEffect != null)
            dialog.closeEffect.runWith([dialog]);
        else
            this.doClose(dialog);
        this.event(Event.CLOSE);
    }
    doClose(dialog) {
        dialog.removeSelf();
        dialog.isModal && this._checkMask();
        dialog.closeHandler && dialog.closeHandler.runWith(dialog.closeType);
        dialog.onClosed(dialog.closeType);
        if (dialog.autoDestroyAtClosed)
            dialog.destroy();
    }
    closeAll() {
        this._closeAll();
        this.event(Event.CLOSE);
    }
    _closeAll() {
        for (var i = this.numChildren - 1; i > -1; i--) {
            var item = this.getChildAt(i);
            if (item && item.close != null) {
                this.doClose(item);
            }
        }
    }
    getDialogsByGroup(group) {
        var arr = [];
        for (var i = this.numChildren - 1; i > -1; i--) {
            var item = this.getChildAt(i);
            if (item && item.group === group) {
                arr.push(item);
            }
        }
        return arr;
    }
    closeByGroup(group) {
        var arr = [];
        for (var i = this.numChildren - 1; i > -1; i--) {
            var item = this.getChildAt(i);
            if (item && item.group === group) {
                item.close();
                arr.push(item);
            }
        }
        return arr;
    }
    _checkMask() {
        this.maskLayer.removeSelf();
        for (var i = this.numChildren - 1; i > -1; i--) {
            var dialog = this.getChildAt(i);
            if (dialog && dialog.isModal) {
                this.addChildAt(this.maskLayer, i);
                return;
            }
        }
    }
}

//# sourceMappingURL=DialogManager.js.map
