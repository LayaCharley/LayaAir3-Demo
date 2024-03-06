import { Laya } from "Laya";
import { Stage } from "laya/display/Stage";
import { Event } from "laya/events/Event";
import { TiledMap } from "laya/map/TiledMap";
import { Rectangle } from "laya/maths/Rectangle";
import { Browser } from "laya/utils/Browser";
import { Handler } from "laya/utils/Handler";
import { Stat } from "laya/utils/Stat";
export class TiledMap_ScrollMap {
    constructor(maincls) {
        this.mLastMouseX = 0;
        this.mLastMouseY = 0;
        this.mX = 0;
        this.mY = 0;
        this.Main = null;
        this.Main = maincls;
        Laya.init(Browser.clientWidth, Browser.clientHeight).then(() => {
            Laya.stage.scaleMode = Stage.SCALE_FULL;
            Stat.show();
            this.createMap();
            Laya.stage.on(Event.MOUSE_DOWN, this, this.mouseDown);
            Laya.stage.on(Event.MOUSE_UP, this, this.mouseUp);
        });
    }
    //创建地图
    createMap() {
        //创建地图对象
        this.tiledMap = new TiledMap();
        this.mX = this.mY = 0;
        //创建地图，适当的时候调用destroy销毁地图
        this.tiledMap.createMap("res/tiledMap/desert.json", new Rectangle(0, 0, Browser.width, Browser.height), new Handler(this, this.completeHandler));
    }
    onLoaded() {
        this.tiledMap.mapSprite().removeSelf();
        this.Main.box2D.addChild(this.tiledMap.mapSprite());
    }
    /**
     * 地图加载完成的回调
     */
    completeHandler(e = null) {
        Laya.stage.on(Event.RESIZE, this, this.resize);
        this.resize();
        this.onLoaded();
    }
    //鼠标按下拖动地图
    mouseDown(e = null) {
        this.mLastMouseX = Laya.stage.mouseX;
        this.mLastMouseY = Laya.stage.mouseY;
        Laya.stage.on(Event.MOUSE_MOVE, this, this.mouseMove);
    }
    mouseMove(e = null) {
        //移动地图视口
        this.tiledMap.moveViewPort(this.mX - (Laya.stage.mouseX - this.mLastMouseX), this.mY - (Laya.stage.mouseY - this.mLastMouseY));
    }
    mouseUp(e = null) {
        this.mX = this.mX - (Laya.stage.mouseX - this.mLastMouseX);
        this.mY = this.mY - (Laya.stage.mouseY - this.mLastMouseY);
        Laya.stage.off(Event.MOUSE_MOVE, this, this.mouseMove);
    }
    // 窗口大小改变，把地图的视口区域重设下
    resize(e = null) {
        //改变地图视口大小
        this.tiledMap.changeViewPort(this.mX, this.mY, Browser.width, Browser.height);
    }
    dispose() {
        Laya.stage.off(Event.MOUSE_DOWN, this, this.mouseDown);
        Laya.stage.off(Event.MOUSE_UP, this, this.mouseUp);
        Laya.stage.off(Event.RESIZE, this, this.resize);
        Laya.stage.off(Event.MOUSE_MOVE, this, this.mouseMove);
        if (this.tiledMap) {
            this.tiledMap.destroy();
            // Resource.destroyUnusedResources();
        }
    }
}
