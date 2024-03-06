import { Laya } from "Laya";
import { Scene3D } from "laya/d3/core/scene/Scene3D";
import { Stage } from "laya/display/Stage";
import { Text } from "laya/display/Text";
import { Event } from "laya/events/Event";
import { Handler } from "laya/utils/Handler";
import { Browser } from "laya/utils/Browser";
import { Script } from "laya/components/Script";
import { AmbientMode } from "laya/d3/core/scene/AmbientMode";
import { Vector3 } from "laya/maths/Vector3";
/**
 * model rotation script.
 */
class RotationScript extends Script {
    constructor() {
        super();
        this._mouseDown = false;
        this._rotate = new Vector3();
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
    }
}
export class CerberusModelShow {
    constructor() {
        Laya.init(0, 0).then(() => {
            Laya.stage.scaleMode = Stage.SCALE_FULL;
            Laya.stage.screenMode = Stage.SCREEN_NONE;
            Scene3D.load("res/threeDimen/scene/LayaScene_CerberusScene/Conventional/CerberusScene.ls", Handler.create(this, function (scene) {
                Laya.stage.addChild(scene);
                scene.ambientMode = AmbientMode.SphericalHarmonics;
                var model = scene.getChildByName("Cerberus_LP");
                var rotationScript = model.addComponent(RotationScript);
                rotationScript.model = model;
                var size = 20;
                this.addText(size, size * 4, "Drag the screen to rotate the model.", "#F09900");
                size = 10;
                this.addText(size, Laya.stage.height - size * 4, "Cerberus by Andrew Maximov     http://artisaverb.info/PBT.html", "#FFFF00");
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
