import { Laya } from "Laya";
import { Sprite } from "laya/display/Sprite";
import { Stage } from "laya/display/Stage";
import { Browser } from "laya/utils/Browser";
export class Sprite_DrawPath {
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
            this.drawPentagram();
        });
    }
    drawPentagram() {
        var canvas = new Sprite();
        this.Main.box2D.addChild(canvas);
        var path = [];
        path.push(0, -130);
        path.push(33, -33);
        path.push(137, -30);
        path.push(55, 32);
        path.push(85, 130);
        path.push(0, 73);
        path.push(-85, 130);
        path.push(-55, 32);
        path.push(-137, -30);
        path.push(-33, -33);
        canvas.graphics.drawPoly(Laya.stage.width / 2, Laya.stage.height / 2, path, "#FF7F50");
    }
}
