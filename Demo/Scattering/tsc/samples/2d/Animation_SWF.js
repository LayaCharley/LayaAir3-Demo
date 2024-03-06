import { Laya } from "Laya";
import { MovieClip } from "laya/ani/swf/MovieClip";
import { Stage } from "laya/display/Stage";
import { Browser } from "laya/utils/Browser";
export class Animation_SWF {
    constructor(maincls) {
        this.MCWidth = 318;
        this.MCHeight = 406;
        this.Main = null;
        this.Main = maincls;
        Laya.init(Browser.clientWidth, Browser.clientHeight).then(() => {
            Laya.stage.alignV = Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Stage.ALIGN_CENTER;
            Laya.stage.scaleMode = "showall";
            Laya.stage.bgColor = "#232628";
            this.createMovieClip();
        });
    }
    createMovieClip() {
        var mc = new MovieClip();
        mc.load("res/swf/dragon.swf");
        mc.x = (Laya.stage.width - this.MCWidth) / 2;
        mc.y = (Laya.stage.height - this.MCHeight) / 2;
        this.Main.box2D.addChild(mc);
    }
}
