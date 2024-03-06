import { CameraClearFlags } from "../Camera";
import { Ray } from "../../math/Ray";
import { HitResult } from "../../physics/HitResult";
import { Config3D } from "../../../../Config3D";
import { InputManager } from "../../../events/InputManager";
import { Vector2 } from "../../../maths/Vector2";
import { Vector3 } from "../../../maths/Vector3";
import { Render } from "../../../renders/Render";
const _vec2 = new Vector2();
const _ray = new Ray(new Vector3(), new Vector3());
const _hitResult = new HitResult();
InputManager.prototype.getSprite3DUnderPoint = function (x, y) {
    _hitResult.succeeded = false;
    x = x * this._stage.clientScaleX;
    y = y * this._stage.clientScaleY;
    var pageX = x;
    var pageY = y;
    var normalWidth = x / Render._mainCanvas.width;
    var normalHeight = y / Render._mainCanvas.height;
    x = this._stage.width * normalWidth;
    y = this._stage.height * normalHeight;
    _vec2.setValue(x, y);
    for (let scene of this._stage._scene3Ds) {
        let sim = scene._physicsSimulation;
        let uiManager = scene._UI3DManager;
        let cameras = scene._cameraPool;
        for (let i = cameras.length - 1; i >= 0; i--) {
            let camera = cameras[i];
            let viewport = camera.viewport;
            let ratio = Config3D.pixelRatio;
            if (pageX >= viewport.x && pageY >= viewport.y && pageX <= viewport.width / ratio && pageY <= viewport.height / ratio) {
                camera.viewportPointToRay(_vec2, _ray);
                let sprite = uiManager.rayCast(_ray);
                if (sprite)
                    return sprite;
                if (!sim)
                    continue;
                var sucess = sim.rayCast(_ray, _hitResult);
                if (sucess || (camera.clearFlag === CameraClearFlags.SolidColor || camera.clearFlag === CameraClearFlags.Sky))
                    break;
            }
        }
        if (_hitResult.succeeded)
            return _hitResult.collider.owner;
    }
    return null;
};

//# sourceMappingURL=Input3D.js.map
