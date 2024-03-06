import { Laya } from "Laya";
import { Shake } from "laya/device/Shake";
import { Sprite } from "laya/display/Sprite";
import { Stage } from "laya/display/Stage";
import { Text } from "laya/display/Text";
import { Event } from "laya/events/Event";
import { Browser } from "laya/utils/Browser";
/**
 * ...
 * @author Survivor
 */
export class InputDevice_Shake {
    constructor(maincls) {
        this.picW = 824;
        this.picH = 484;
        this.shakeCount = 0;
        this.Main = null;
        this.Main = maincls;
        Laya.init(this.picW, Browser.height * this.picW / Browser.width).then(() => {
            Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
            this.showShakePic();
            this.showConsoleText();
            this.startShake();
        });
    }
    showShakePic() {
        var shakePic = new Sprite();
        shakePic.loadImage("res/inputDevice/shake.png");
        this.Main.box2D.addChild(shakePic);
    }
    showConsoleText() {
        this.console = new Text();
        this.Main.box2D.addChild(this.console);
        this.console.y = this.picH + 10;
        this.console.width = Laya.stage.width;
        this.console.height = Laya.stage.height - this.console.y;
        this.console.color = "#FFFFFF";
        this.console.fontSize = 50;
        this.console.align = "center";
        this.console.valign = 'middle';
        this.console.leading = 10;
    }
    startShake() {
        Shake.instance.start(5, 500);
        Shake.instance.on(Event.CHANGE, this, this.onShake);
        this.console.text = '开始接收设备摇动\n';
    }
    onShake() {
        this.shakeCount++;
        this.console.text += "设备摇晃了" + this.shakeCount + "次\n";
        if (this.shakeCount >= 3) {
            Shake.instance.stop();
            this.console.text += "停止接收设备摇动";
        }
    }
}
