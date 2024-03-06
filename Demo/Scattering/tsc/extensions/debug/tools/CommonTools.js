import { Sprite } from "laya/display/Sprite";
export class CommonTools {
    constructor() {
    }
    static bind(fun, scope) {
        var rst;
        rst = fun.bind(scope);
        return rst;
    }
    static insertP(tar, x, y, scaleX, scaleY, rotation) {
        var nSp;
        nSp = new Sprite();
        tar.parent.addChild(nSp);
        nSp.x = x;
        nSp.y = y;
        nSp.scaleX = scaleX;
        nSp.scaleY = scaleY;
        nSp.rotation = rotation;
        nSp.addChild(tar);
        CommonTools.count++;
        nSp.name = "insertP:" + CommonTools.count;
    }
    static insertChild(tar, x, y, scaleX, scaleY, rotation, color = "#ff00ff") {
        var nSp;
        nSp = new Sprite();
        tar.addChild(nSp);
        nSp.x = x;
        nSp.y = y;
        nSp.scaleX = scaleX;
        nSp.scaleY = scaleY;
        nSp.rotation = rotation;
        nSp.graphics.drawRect(0, 0, 20, 20, color);
        nSp.name = "child:" + tar.numChildren;
        return nSp;
    }
    static createSprite(width, height, color = "#ff0000") {
        var sp;
        sp = new Sprite();
        sp.graphics.drawRect(0, 0, width, height, color);
        sp.size(width, height);
        return sp;
    }
    static createBtn(txt, width = 100, height = 40) {
        var sp;
        sp = new Sprite();
        sp.size(width, height);
        sp.graphics.drawRect(0, 0, sp.width, sp.height, "#ff0000");
        sp.graphics.fillText(txt, sp.width * 0.5, sp.height * 0.5, null, "#ffff00", "center");
        return sp;
    }
}
CommonTools.count = 0;
