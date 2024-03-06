import { Laya } from "Laya";
import { Event } from "laya/events/Event";
import { Browser } from "laya/utils/Browser";
import { Stat } from "laya/utils/Stat";
export class Skeleton_SpineIkMesh {
    constructor(maincls) {
        this.mStartX = 180;
        this.mStartY = 340;
        this.mActionIndex = 0;
        this.mCurrIndex = 0;
        this.mCurrSkinIndex = 0;
        this.Main = null;
        this.Main = maincls;
        Laya.init(Browser.width, Browser.height).then(() => {
            Laya.stage.bgColor = "#ffffff";
            Stat.show();
            Laya.loader.load("res/spine/spineRes3/raptor.sk").then((templet) => {
                //创建模式为1，可以启用换装
                this.mArmature = templet.buildArmature(1);
                this.mArmature.x = this.mStartX;
                this.mArmature.y = this.mStartY;
                this.mArmature.scale(0.3, 0.3);
                this.Main.box2D.addChild(this.mArmature);
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
    dispose() {
        if (this.mArmature == null)
            return;
        this.mArmature.stop();
        this.mArmature.off(Event.STOPPED, this, this.completeHandler);
    }
}
