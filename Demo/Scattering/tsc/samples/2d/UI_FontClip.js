import { Laya } from "Laya";
import { Stage } from "laya/display/Stage";
import { FontClip } from "laya/ui/FontClip";
import { Handler } from "laya/utils/Handler";
export class UI_FontClip {
    constructor(maincls) {
        this.TestClipNum = "res/comp/fontClip_num.png";
        this._ClipNum = "res/comp/fontClip_num.png";
        this._ClipNum1 = "res/comp/fontClip_num.png";
        this.TestFontClip = "res/comp/fontClip.png";
        this._FontClip = "res/comp/fontClip.png";
        this.Main = null;
        this.Main = maincls;
        Laya.init(800, 600).then(() => {
            Laya.stage.alignV = Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Stage.ALIGN_CENTER;
            Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
            Laya.stage.bgColor = "#232628";
            Laya.loader.load([this.TestClipNum, this.TestFontClip, this._ClipNum, this._FontClip, this._ClipNum1], Handler.create(this, this.ShowContent));
        });
    }
    ShowContent() {
        var clipnum = new FontClip(this._ClipNum);
        var fontClip = new FontClip(this._FontClip);
        var testFontClip = new FontClip(this.TestFontClip);
        var testClipNum = new FontClip(this.TestClipNum);
        var clipnum1 = new FontClip(this._ClipNum1);
        clipnum.pos(240, 500);
        clipnum.size(250, 50);
        clipnum.sheet = "0123456789";
        clipnum.value = "114499";
        clipnum.spaceY = 10;
        testClipNum.pos(200, 400);
        testClipNum.sheet = "0123456789";
        testClipNum.value = "0123456789";
        clipnum1.pos(150, 200);
        clipnum1.direction = "vertical";
        clipnum1.sheet = "0123456789";
        clipnum1.value = "223388";
        fontClip.pos(240, 300);
        fontClip.sheet = "鼠牛虎兔龙蛇马羊 猴鸡狗猪年快乐";
        fontClip.value = "猪年快乐";
        fontClip.spaceY = 10;
        testFontClip.pos(200, 200);
        testFontClip.sheet = "鼠牛虎兔龙蛇马羊猴鸡狗猪年快乐";
        testFontClip.value = "鼠牛虎兔龙蛇马羊猴鸡狗猪年快乐";
        testFontClip.spaceY = 10;
        this.Main.box2D.addChild(clipnum);
        this.Main.box2D.addChild(fontClip);
        this.Main.box2D.addChild(testFontClip);
        this.Main.box2D.addChild(testClipNum);
        this.Main.box2D.addChild(clipnum1);
    }
}
