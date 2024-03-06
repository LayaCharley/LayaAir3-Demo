import { Laya } from "Laya";
import { Input } from "laya/display/Input";
import { Stage } from "laya/display/Stage";
import { Browser } from "laya/utils/Browser";
export class Text_Editable {
    constructor(maincls) {
        this.Main = null;
        this.Main = maincls;
        Laya.init(Browser.clientWidth, Browser.clientHeight).then(() => {
            Laya.stage.alignV = Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Stage.ALIGN_CENTER;
            Laya.stage.scaleMode = "showall";
            Laya.stage.bgColor = "#232628";
            this.createInput();
        });
    }
    createInput() {
        var inputText = new Input();
        inputText.size(350, 100);
        inputText.x = Laya.stage.width - inputText.width >> 1;
        inputText.y = Laya.stage.height - inputText.height >> 1;
        inputText.text = "这段文本不可编辑，但可复制";
        inputText.editable = false;
        // 设置字体样式
        inputText.bold = true;
        inputText.bgColor = "#666666";
        inputText.color = "#ffffff";
        inputText.fontSize = 20;
        this.Main.box2D.addChild(inputText);
    }
}
