import { Laya } from "Laya";
import { Sprite } from "laya/display/Sprite";
export class DisEditor {
    constructor() {
        this.rec = new Sprite();
        this.rootContainer = new Sprite();
    }
    setTarget(target) {
        this.tar = target;
        var g;
        g = this.rec.graphics;
        g.clear();
        var bounds;
        bounds = this.tar.getSelfBounds();
        g.drawRect(bounds.x, bounds.y, bounds.width, bounds.height, null, "#00ff00");
        this.createSameDisChain();
        Laya.stage.addChild(this.rootContainer);
    }
    createSameDisChain() {
        var tParent;
        var cpParent;
        var preTar;
        preTar = this.rec;
        tParent = this.tar;
        while (tParent && tParent != Laya.stage) {
            cpParent = new Sprite();
            cpParent.addChild(preTar);
            cpParent.x = tParent.x;
            cpParent.y = tParent.y;
            cpParent.scaleX = tParent.scaleX;
            cpParent.scaleY = tParent.scaleY;
            cpParent.rotation = tParent.rotation;
            cpParent.scrollRect = tParent.scrollRect;
            preTar = cpParent;
            tParent = tParent.parent;
        }
        this.rootContainer.removeChildren();
        this.rootContainer.addChild(preTar);
    }
}
