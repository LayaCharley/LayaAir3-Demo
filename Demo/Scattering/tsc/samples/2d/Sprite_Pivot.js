import { Laya } from "Laya";
import { Sprite } from "laya/display/Sprite";
import { Stage } from "laya/display/Stage";
import { Browser } from "laya/utils/Browser";
export class Sprite_Pivot {
    constructor(maincls) {
        this.Main = null;
        this.Main = maincls;
        Laya.init(Browser.clientWidth, Browser.clientHeight).then(() => {
            //
            Laya.stage.alignV = Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Stage.ALIGN_CENTER;
            //
            Laya.stage.scaleMode = "showall";
            Laya.stage.bgColor = "#232628";
            this.createApes();
        });
    }
    createApes() {
        var gap = 300;
        this.sp1 = new Sprite();
        this.sp1.loadImage("res/apes/monkey2.png");
        this.sp1.pos((Laya.stage.width - gap) / 2, Laya.stage.height / 2);
        //设置轴心点为中心
        this.sp1.pivot(55, 72);
        this.Main.box2D.addChild(this.sp1);
        //不设置轴心点默认为左上角
        this.sp2 = new Sprite();
        this.sp2.loadImage("res/apes/monkey2.png");
        this.sp2.pos((Laya.stage.width + gap) / 2, Laya.stage.height / 2);
        this.Main.box2D.addChild(this.sp2);
        Laya.timer.frameLoop(1, this, this.animate);
    }
    animate(e = null) {
        this.sp1.rotation += 2;
        this.sp2.rotation += 2;
    }
    dispose() {
        Laya.timer.clear(this, this.animate);
    }
}
