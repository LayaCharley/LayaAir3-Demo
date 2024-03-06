import { Laya } from "Laya";
import { Script } from "laya/components/Script";
import { Scene3D } from "laya/d3/core/scene/Scene3D";
import { Stage } from "laya/display/Stage";
import { Text } from "laya/display/Text";
import { Event } from "laya/events/Event";
import { Vector3 } from "laya/maths/Vector3";
import { Browser } from "laya/utils/Browser";
import { Handler } from "laya/utils/Handler";
/**
 * model rotation script.
 */
class RotationScript extends Script {
    constructor() {
        super();
        this._mouseDown = false;
        this._rotate = new Vector3();
        this._autoRotateSpeed = new Vector3(0, 0.25, 0);
        Laya.stage.on(Event.MOUSE_DOWN, this, function () {
            this._mouseDown = true;
            this._lastMouseX = Laya.stage.mouseX;
        });
        Laya.stage.on(Event.MOUSE_UP, this, function () {
            this._mouseDown = false;
        });
    }
    onUpdate() {
        if (this._mouseDown) {
            var deltaX = Laya.stage.mouseX - this._lastMouseX;
            this._rotate.y = deltaX * 0.2;
            this.model.transform.rotate(this._rotate, false, false);
            this._lastMouseX = Laya.stage.mouseX;
        }
        else {
            this.model.transform.rotate(this._autoRotateSpeed, false, false);
        }
    }
}
export class DamagedHelmetModelShow {
    constructor() {
        Laya.init(0, 0).then(() => {
            Laya.stage.scaleMode = Stage.SCALE_FULL;
            Laya.stage.screenMode = Stage.SCREEN_NONE;
            Scene3D.load("res/threeDimen/scene/LayaScene_DamagedHelmetScene/Conventional/DamagedHelmetScene.ls", Handler.create(this, function (scene) {
                Laya.stage.addChild(scene);
                var damagedHelmet = scene.getChildAt(1).getChildAt(0);
                var rotationScript = damagedHelmet.addComponent(RotationScript);
                rotationScript.model = damagedHelmet;
                var size = 20;
                this.addText(size, size * 4, "Drag the screen to rotate the model.", "#F09900");
                size = 10;
                this.addText(size, Laya.stage.height - size * 4, "Battle Damaged Sci-fi Helmet by theblueturtle_    www.leonardocarrion.com", "#FFFF00");
            }));
        });
    }
    /**
     * add text.
     */
    addText(size, y, text, color) {
        var cerberusText = new Text();
        cerberusText.color = color;
        cerberusText.fontSize = size * Browser.pixelRatio;
        cerberusText.x = size;
        cerberusText.y = y;
        cerberusText.text = text;
        Laya.stage.addChild(cerberusText);
    }
}
