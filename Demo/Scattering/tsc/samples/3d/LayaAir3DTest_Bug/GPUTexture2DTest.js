import { Laya } from "Laya";
import { Sprite } from "laya/display/Sprite";
import { Stage } from "laya/display/Stage";
import { Handler } from "laya/utils/Handler";
import { Stat } from "laya/utils/Stat";
export class GPUTexture2DTest {
    constructor() {
        Laya.init(0, 0).then(() => {
            Stat.show();
            Laya.stage.scaleMode = Stage.SCALE_FULL;
            Laya.stage.screenMode = Stage.SCREEN_NONE;
            Laya.loader.load("Test/LayaScene_layaScene/Android/Assets/rr.ktx", Handler.create(null, function (tex) {
                var sprite = Laya.stage.addChild(new Sprite());
                sprite.texture = tex;
            }));
        });
    }
}
