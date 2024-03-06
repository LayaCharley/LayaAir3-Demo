import { Laya } from "Laya";
import { Sprite } from "laya/display/Sprite";
import { Stage } from "laya/display/Stage";
import { Event } from "laya/events/Event";
import { Browser } from "laya/utils/Browser";
export class Interaction_Rotate {
    constructor(maincls) {
        this.preRadian = 0;
        this.Main = null;
        this.Main = maincls;
        Laya.init(Browser.clientWidth, Browser.clientHeight).then(() => {
            //
            Laya.stage.alignV = Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Stage.ALIGN_CENTER;
            //
            Laya.stage.scaleMode = "showall";
            Laya.stage.bgColor = "#232628";
            this.setup();
        });
    }
    setup() {
        this.createSprite();
        Laya.stage.on(Event.MOUSE_UP, this, this.onMouseUp);
        Laya.stage.on(Event.MOUSE_OUT, this, this.onMouseUp);
    }
    createSprite() {
        this.sp = new Sprite();
        var w = 200, h = 300;
        this.sp.graphics.drawRect(0, 0, w, h, "#FF7F50");
        this.sp.size(w, h);
        this.sp.pivot(w / 2, h / 2);
        this.sp.pos(Laya.stage.width / 2, Laya.stage.height / 2);
        this.Main.box2D.addChild(this.sp);
        this.sp.on(Event.MOUSE_DOWN, this, this.onMouseDown);
    }
    onMouseDown(e) {
        let touches = e.touches;
        if (touches && touches.length == 2) {
            this.preRadian = Math.atan2(touches[0].pos.y - touches[1].pos.y, touches[0].pos.x - touches[1].pos.y);
            Laya.stage.on(Event.MOUSE_MOVE, this, this.onMouseMove);
        }
    }
    onMouseMove(e) {
        var touches = e.touches;
        if (touches && touches.length == 2) {
            var nowRadian = Math.atan2(touches[0].pos.y - touches[1].pos.y, touches[0].pos.x - touches[1].pos.x);
            this.sp.rotation += 180 / Math.PI * (nowRadian - this.preRadian);
            this.preRadian = nowRadian;
        }
    }
    onMouseUp(e) {
        Laya.stage.off(Event.MOUSE_MOVE, this, this.onMouseMove);
    }
    dispose() {
        if (this.sp) {
            this.sp.off(Event.MOUSE_DOWN, this, this.onMouseDown);
        }
        Laya.stage.off(Event.MOUSE_UP, this, this.onMouseUp);
        Laya.stage.off(Event.MOUSE_OUT, this, this.onMouseUp);
        Laya.stage.off(Event.MOUSE_MOVE, this, this.onMouseMove);
    }
}
