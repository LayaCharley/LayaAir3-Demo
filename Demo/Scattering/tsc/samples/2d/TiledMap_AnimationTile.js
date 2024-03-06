import { Laya } from "Laya";
import { Stage } from "laya/display/Stage";
import { TiledMap } from "laya/map/TiledMap";
import { Rectangle } from "laya/maths/Rectangle";
import { Handler } from "laya/utils/Handler";
export class TiledMap_AnimationTile {
    constructor(maincls) {
        this.Main = null;
        this.Main = maincls;
        Laya.init(1100, 800).then(() => {
            Laya.stage.alignV = Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Stage.ALIGN_CENTER;
            Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
            Laya.stage.bgColor = "#232628";
            this.createMap();
        });
    }
    createMap() {
        this.tiledMap = new TiledMap();
        this.tiledMap.createMap("res/tiledMap/orthogonal-test-movelayer.json", new Rectangle(0, 0, Laya.stage.width, Laya.stage.height), Handler.create(this, this.onLoaded));
    }
    onLoaded() {
        this.tiledMap.mapSprite().removeSelf();
        this.Main.box2D.addChild(this.tiledMap.mapSprite());
    }
    dispose() {
        if (this.tiledMap) {
            this.tiledMap.mapSprite().removeChildren();
            this.tiledMap.destroy();
            // Resource.destroyUnusedResources();
        }
    }
}
