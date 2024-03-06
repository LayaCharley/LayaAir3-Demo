import { Laya } from "Laya";
import { Sprite } from "laya/display/Sprite";
import { Stage } from "laya/display/Stage";
import { BlurFilter } from "laya/filters/BlurFilter";
import { Browser } from "laya/utils/Browser";
import { Handler } from "laya/utils/Handler";
export class Filters_Blur {
    constructor(maincls) {
        this.apePath = "res/apes/monkey2.png";
        this.Main = null;
        this.Main = maincls;
        Laya.init(Browser.clientWidth, Browser.clientHeight).then(() => {
            Laya.stage.alignV = Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Stage.ALIGN_CENTER;
            Laya.stage.scaleMode = "showall";
            Laya.stage.bgColor = "#232628";
            Laya.loader.load(this.apePath, Handler.create(this, this.createApe));
        });
    }
    createApe(_e = null) {
        var ape = new Sprite();
        ape.loadImage(this.apePath);
        ape.x = (Laya.stage.width - ape.width) / 2;
        ape.y = (Laya.stage.height - ape.height) / 2;
        this.Main.box2D.addChild(ape);
        this.applayFilter(ape);
    }
    applayFilter(ape) {
        var blurFilter = new BlurFilter();
        blurFilter.strength = 5;
        ape.filters = [blurFilter];
    }
}
