import { Laya } from "Laya";
import { Sprite } from "laya/display/Sprite";
import { Stage } from "laya/display/Stage";
import { Event } from "laya/events/Event";
import { Rectangle } from "laya/maths/Rectangle";
import { Browser } from "laya/utils/Browser";
import { Handler } from "laya/utils/Handler";
export class Interaction_Drag {
    constructor(maincls) {
        this.ApePath = "res/apes/monkey2.png";
        this.Main = null;
        this.Main = maincls;
        Laya.init(Browser.clientWidth, Browser.clientHeight).then(() => {
            //
            Laya.stage.alignV = Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Stage.ALIGN_CENTER;
            //
            Laya.stage.scaleMode = "showall";
            Laya.stage.bgColor = "#232628";
            Laya.loader.load(this.ApePath, Handler.create(this, this.setup));
        });
    }
    setup(_e = null) {
        this.createApe();
        this.showDragRegion();
    }
    createApe() {
        this.ape = new Sprite();
        this.ape.loadImage(this.ApePath);
        this.Main.box2D.addChild(this.ape);
        var texture = Laya.loader.getRes(this.ApePath);
        this.ape.pivot(texture.width / 2, texture.height / 2);
        this.ape.x = Laya.stage.width / 2;
        this.ape.y = Laya.stage.height / 2;
        this.ape.on(Event.MOUSE_DOWN, this, this.onStartDrag);
    }
    showDragRegion() {
        //拖动限制区域
        var dragWidthLimit = 350;
        var dragHeightLimit = 200;
        this.dragRegion = new Rectangle(Laya.stage.width - dragWidthLimit >> 1, Laya.stage.height - dragHeightLimit >> 1, dragWidthLimit, dragHeightLimit);
        //画出拖动限制区域
        Laya.stage.graphics.drawRect(this.dragRegion.x, this.dragRegion.y, this.dragRegion.width, this.dragRegion.height, null, "#FFFFFF", 2);
    }
    onStartDrag(e = null) {
        //鼠标按下开始拖拽(设置了拖动区域和超界弹回的滑动效果)
        this.ape.startDrag(this.dragRegion, true, 100);
    }
    dispose() {
        if (this.ape) {
            this.ape.off(Event.MOUSE_DOWN, this, this.onStartDrag);
        }
    }
}
