import { Laya } from "Laya";
import { Stage } from "laya/display/Stage";
import { Text } from "laya/display/Text";
import { Browser } from "laya/utils/Browser";
import { Loader } from "laya/net/Loader";
export class Text_BitmapFont {
    constructor(maincls) {
        this.fontName = "diyFont";
        this.Main = null;
        this.Main = maincls;
        Laya.init(Browser.clientWidth, Browser.clientHeight).then(() => {
            Laya.stage.alignV = Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Stage.ALIGN_CENTER;
            Laya.stage.scaleMode = "showall";
            Laya.stage.bgColor = "#232628";
            this.loadFont();
        });
    }
    loadFont() {
        Laya.loader.load("res/bitmapFont/test.fnt", Loader.FONT).then((res) => {
            this.onFontLoaded(res);
        });
    }
    onFontLoaded(bitmapFont) {
        bitmapFont.letterSpacing = 10;
        Text.registerBitmapFont(this.fontName, bitmapFont);
        this.createText(this.fontName);
    }
    createText(font) {
        var txt = new Text();
        txt.width = 250;
        txt.wordWrap = true;
        txt.text = "Do one thing at a time, and do well.";
        txt.font = font;
        txt.leading = 5;
        txt.pos(Laya.stage.width - txt.width >> 1, Laya.stage.height - txt.height >> 1);
        this.Main.box2D.addChild(txt);
    }
}
