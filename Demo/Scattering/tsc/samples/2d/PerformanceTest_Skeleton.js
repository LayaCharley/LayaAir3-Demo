import { Laya } from "Laya";
import { Event } from "laya/events/Event";
import { Browser } from "laya/utils/Browser";
import { Stat } from "laya/utils/Stat";
export class PerformanceTest_Skeleton {
    constructor(maincls) {
        this.fileName = "Dragon";
        this.rowCount = 10;
        this.colCount = 10;
        this.xOff = 50;
        this.yOff = 100;
        this.mAnimationArray = [];
        this.Main = null;
        this.mActionIndex = 0;
        this.Main = maincls;
        this.mSpacingX = Browser.width / this.colCount;
        this.mSpacingY = Browser.height / this.rowCount;
        Laya.init(Browser.width, Browser.height).then(() => {
            Stat.show();
            Laya.loader.load("res/skeleton/" + this.fileName + "/" + this.fileName + ".sk", { mainTexture: true }).then((templet) => {
                for (var i = 0; i < this.rowCount; i++) {
                    for (var j = 0; j < this.colCount; j++) {
                        this.mArmature = templet.buildArmature(1);
                        this.mArmature.x = this.xOff + j * this.mSpacingX;
                        this.mArmature.y = this.yOff + i * this.mSpacingY;
                        this.mAnimationArray.push(this.mArmature);
                        this.mArmature.play(0, true);
                        this.Main.box2D.addChild(this.mArmature);
                    }
                }
                Laya.stage.on(Event.CLICK, this, this.toggleAction);
            });
        });
    }
    dispose() {
        Laya.stage.off(Event.CLICK, this, this.toggleAction);
    }
    toggleAction(e = null) {
        this.mActionIndex++;
        var tAnimNum = this.mArmature.getAnimNum();
        if (this.mActionIndex >= tAnimNum) {
            this.mActionIndex = 0;
        }
        for (var i = 0, n = this.mAnimationArray.length; i < n; i++) {
            this.mAnimationArray[i].play(this.mActionIndex, true);
        }
    }
}
