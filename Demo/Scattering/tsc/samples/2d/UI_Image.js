import { Laya } from "Laya";
import { Stage } from "laya/display/Stage";
import { Image } from "laya/ui/Image";
export class UI_Image {
    constructor(maincls) {
        this.Main = null;
        this.Main = maincls;
        Laya.init(550, 400).then(() => {
            Laya.stage.alignV = Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Stage.ALIGN_CENTER;
            Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
            Laya.stage.bgColor = "#232628";
            this.setup();
        });
    }
    setup() {
        var dialog = new Image("res/ui/dialog (3).png");
        dialog.pos(165, 62.5);
        this.Main.box2D.addChild(dialog);
    }
}
