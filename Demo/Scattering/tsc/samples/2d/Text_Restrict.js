import { Laya } from "Laya";
import { Input } from "laya/display/Input";
import { Stage } from "laya/display/Stage";
import { Text } from "laya/display/Text";
export class Text_Restrict {
    constructor(maincls) {
        this.Main = null;
        this.Main = maincls;
        Laya.init(550, 300).then(() => {
            Laya.stage.alignV = Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Stage.ALIGN_CENTER;
            Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
            Laya.stage.bgColor = "#232628";
            this.createTexts();
        });
    }
    createTexts() {
        this.createLabel("只允许输入数字：").pos(50, 20);
        var input = this.createInput();
        input.pos(50, 50);
        input.restrict = "0-9";
        this.createLabel("只允许输入字母：").pos(50, 100);
        input = this.createInput();
        input.pos(50, 130);
        input.restrict = "a-zA-Z";
        this.createLabel("只允许输入中文字符：").pos(50, 180);
        input = this.createInput();
        input.pos(50, 210);
        input.restrict = "\u4e00-\u9fa5";
    }
    createLabel(text) {
        var label = new Text();
        label.text = text;
        label.color = "white";
        label.fontSize = 20;
        this.Main.box2D.addChild(label);
        return label;
    }
    createInput() {
        var input = new Input();
        input.size(200, 30);
        input.borderColor = "#FFFF00";
        input.bold = true;
        input.fontSize = 20;
        input.color = "#FFFFFF";
        input.padding = [0, 4, 0, 4];
        this.Main.box2D.addChild(input);
        return input;
    }
}
