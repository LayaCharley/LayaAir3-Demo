import { Laya } from "Laya";
import { Sprite } from "laya/display/Sprite";
import { Event } from "laya/events/Event";
import { Browser } from "laya/utils/Browser";
import { Handler } from "laya/utils/Handler";
import { Stat } from "laya/utils/Stat";
import { Tween } from "laya/utils/Tween";
export class Skeleton_SpineEvent {
    constructor(maincls) {
        this.mStartX = 300;
        this.mStartY = 340;
        this.mActionIndex = 0;
        this.mCurrIndex = 0;
        this.mCurrSkinIndex = 0;
        this.Main = null;
        this.Main = maincls;
        Laya.init(Browser.width, Browser.height).then(() => {
            Laya.stage.bgColor = "#ffffff";
            Stat.show();
            this.mLabelSprite = new Sprite();
            Laya.loader.load("res/spine/spineRes6/alien.sk").then((templet) => {
                //创建模式为1，可以启用换装
                this.mArmature = templet.buildArmature(1);
                this.mArmature.x = this.mStartX;
                this.mArmature.y = this.mStartY;
                this.mArmature.scale(0.5, 0.5);
                this.Main.box2D.addChild(this.mArmature);
                this.mArmature.on(Event.LABEL, this, this.onEvent);
                this.mArmature.on(Event.STOPPED, this, this.completeHandler);
                this.play();
            });
        });
    }
    completeHandler() {
        this.play();
    }
    play() {
        this.mCurrIndex++;
        if (this.mCurrIndex >= this.mArmature.getAnimNum()) {
            this.mCurrIndex = 0;
        }
        this.mArmature.play(this.mCurrIndex, false);
    }
    onEvent(e) {
        var tEventData = e;
        this.Main.box2D.addChild(this.mLabelSprite);
        this.mLabelSprite.x = this.mStartX;
        this.mLabelSprite.y = this.mStartY;
        this.mLabelSprite.graphics.clear();
        this.mLabelSprite.graphics.fillText(tEventData.name, 0, 0, "20px Arial", "#ff0000", "center");
        Tween.to(this.mLabelSprite, { "y": this.mStartY - 200 }, 1000, null, Handler.create(this, this.playEnd));
    }
    playEnd() {
        this.mLabelSprite.removeSelf();
    }
    dispose() {
        if (this.mArmature == null)
            return;
        Tween.clearAll(this.mLabelSprite);
        this.mArmature.stop();
        this.mArmature.off(Event.STOPPED, this, this.completeHandler);
    }
}
