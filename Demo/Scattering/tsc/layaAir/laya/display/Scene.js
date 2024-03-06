import { Sprite } from "./Sprite";
import { Widget } from "../components/Widget";
import { Event } from "../events/Event";
import { Resource } from "../resource/Resource";
import { Handler } from "../utils/Handler";
import { ILaya } from "../../ILaya";
import { LegacyUIParser } from "../loaders/LegacyUIParser";
import { NodeFlags } from "../Const";
export class Scene extends Sprite {
    constructor(createChildren = true) {
        super();
        this.autoDestroyAtClosed = false;
        this._viewCreated = false;
        this._timer = ILaya.timer;
        this._widget = Widget.EMPTY;
        this._scene = this;
        if (createChildren)
            this.createChildren();
    }
    createChildren() {
    }
    static setUIMap(url) {
        let uimap = ILaya.loader.getRes(url);
        if (uimap) {
            for (let key in uimap) {
                ILaya.Loader.loadedMap[key + ".scene"] = uimap[key];
            }
        }
        else {
            throw "请提前加载uimap的json，再使用该接口设置！";
        }
    }
    loadScene(path) {
        Scene.unDestroyedScenes.add(this);
        let url = path.indexOf(".") > -1 ? path : path + ".scene";
        let content = ILaya.loader.getRes(url);
        if (content) {
            if (!this._viewCreated) {
                content.create({ root: this });
                this._viewCreated = true;
                Scene.unDestroyedScenes.add(this);
            }
        }
        else {
            this._setBit(NodeFlags.NOT_READY, true);
            ILaya.loader.load(url, null, value => {
                if (Scene._loadPage)
                    Scene._loadPage.event("progress", value);
            }).then((content) => {
                if (!content)
                    throw "Can not find scene:" + path;
                if (!this._viewCreated) {
                    this.url = url;
                    Scene.hideLoadingPage();
                    content.create({ root: this });
                    this._viewCreated = true;
                    Scene.unDestroyedScenes.add(this);
                }
                else
                    this._setBit(NodeFlags.NOT_READY, false);
            });
        }
    }
    createView(view) {
        if (view && !this._viewCreated) {
            this._viewCreated = true;
            LegacyUIParser.createByData(this, view);
        }
    }
    getNodeByID(id) {
        if (this._idMap)
            return this._idMap[id];
        return null;
    }
    open(closeOther = true, param = null) {
        if (closeOther)
            Scene.closeAll();
        Scene.root.addChild(this);
        if (this._scene3D)
            ILaya.stage.addChildAt(this._scene3D, 0);
        this.onOpened(param);
    }
    onOpened(param) {
    }
    close(type = null) {
        this.onClosed(type);
        if (this.autoDestroyAtClosed) {
            this.destroy();
            if (this._scene3D)
                this._scene3D.destroy();
        }
        else {
            this.removeSelf();
            if (this._scene3D)
                this._scene3D.removeSelf();
        }
    }
    onClosed(type = null) {
    }
    destroy(destroyChild = true) {
        super.destroy(destroyChild);
        if (this._scene3D) {
            this._scene3D.destroy();
            this._scene3D = null;
        }
        this._idMap = null;
        Scene.unDestroyedScenes.delete(this);
    }
    get_width() {
        if (this._isWidthSet)
            return this._width;
        var max = 0;
        for (var i = this.numChildren - 1; i > -1; i--) {
            var comp = this.getChildAt(i);
            if (comp._visible) {
                max = Math.max(comp._x + comp.width * comp.scaleX, max);
            }
        }
        return max;
    }
    get_height() {
        if (this._isHeightSet)
            return this._height;
        var max = 0;
        for (var i = this.numChildren - 1; i > -1; i--) {
            var comp = this.getChildAt(i);
            if (comp._visible) {
                max = Math.max(comp._y + comp.height * comp.scaleY, max);
            }
        }
        return max;
    }
    get timer() {
        return this._timer;
    }
    set timer(value) {
        this._timer = value;
    }
    get scene3D() {
        return this._scene3D;
    }
    get top() {
        return this._widget.top;
    }
    set top(value) {
        if (value != this._widget.top) {
            this._getWidget().top = value;
        }
    }
    get bottom() {
        return this._widget.bottom;
    }
    set bottom(value) {
        if (value != this._widget.bottom) {
            this._getWidget().bottom = value;
        }
    }
    get left() {
        return this._widget.left;
    }
    set left(value) {
        if (value != this._widget.left) {
            this._getWidget().left = value;
        }
    }
    get right() {
        return this._widget.right;
    }
    set right(value) {
        if (value != this._widget.right) {
            this._getWidget().right = value;
        }
    }
    get centerX() {
        return this._widget.centerX;
    }
    set centerX(value) {
        if (value != this._widget.centerX) {
            this._getWidget().centerX = value;
        }
    }
    get centerY() {
        return this._widget.centerY;
    }
    set centerY(value) {
        if (value != this._widget.centerY) {
            this._getWidget().centerY = value;
        }
    }
    _shouldRefreshLayout() {
        super._shouldRefreshLayout();
        this.callLater(this._sizeChanged);
    }
    _sizeChanged() {
        this.event(Event.RESIZE);
        if (this._widget !== Widget.EMPTY)
            this._widget.resetLayout();
    }
    freshLayout() {
        if (this._widget != Widget.EMPTY) {
            this._widget.resetLayout();
        }
    }
    _getWidget() {
        this._widget === Widget.EMPTY && (this._widget = this.addComponent(Widget));
        return this._widget;
    }
    static get root() {
        let root = Scene._root;
        if (!root) {
            root = Scene._root = ILaya.stage.addChild(new Sprite());
            root.name = "root";
            root.mouseThrough = true;
            ILaya.stage.on("resize", null, () => {
                root.size(ILaya.stage.width, ILaya.stage.height);
                root.event(Event.RESIZE);
            });
            root.size(ILaya.stage.width, ILaya.stage.height);
            root.event(Event.RESIZE);
        }
        return root;
    }
    static load(url, complete = null, progress = null) {
        return ILaya.loader.load(url, null, value => {
            if (Scene._loadPage)
                Scene._loadPage.event("progress", value);
            progress && progress.runWith(value);
        }).then((content) => {
            if (!content)
                throw "Can not find scene:" + url;
            let scene;
            let errors = [];
            let ret = content.create(null, errors);
            if (errors.length > 0)
                console.warn(`Error loading ${url}: \n${errors.join("\n")}`);
            if (ret instanceof Scene)
                scene = ret;
            else if (ret._is3D) {
                scene = new Scene();
                scene.left = scene.right = scene.top = scene.bottom = 0;
                scene._scene3D = ret;
            }
            else
                throw "Not a scene:" + url;
            scene._viewCreated = true;
            if (scene._scene3D)
                scene._scene3D._scene2D = scene;
            Scene.unDestroyedScenes.add(scene);
            Scene.hideLoadingPage();
            complete && complete.runWith(scene);
            return scene;
        });
    }
    static open(url, closeOther = true, param = null, complete = null, progress = null) {
        if (param instanceof Handler) {
            var temp = complete;
            complete = param;
            param = temp;
        }
        Scene.showLoadingPage();
        return Scene.load(url, Handler.create(null, this._onSceneLoaded, [closeOther, complete, param]), progress);
    }
    static _onSceneLoaded(closeOther, complete, param, scene) {
        scene.open(closeOther, param);
        if (complete)
            complete.runWith(scene);
    }
    static close(url, name) {
        let flag = false;
        for (let scene of Scene.unDestroyedScenes) {
            if (scene && scene.parent && scene.url === url && (name == null || scene.name == name)) {
                scene.close();
                flag = true;
                break;
            }
        }
        return flag;
    }
    static closeAll() {
        let root = Scene.root;
        for (let i = 0, n = root.numChildren; i < n; i++) {
            var scene = root.getChildAt(0);
            if (scene instanceof Scene)
                scene.close();
            else
                scene.removeSelf();
        }
    }
    static destroy(url, name) {
        let flag = false;
        for (let scene of Scene.unDestroyedScenes) {
            if (scene.url === url && (name == null || scene.name == name) && !scene._destroyed) {
                scene.destroy();
                flag = true;
                break;
            }
        }
        return flag;
    }
    static gc() {
        Resource.destroyUnusedResources();
    }
    static setLoadingPage(loadPage) {
        Scene._loadPage = loadPage;
    }
    static showLoadingPage(param = null, delay = 500) {
        if (Scene._loadPage) {
            ILaya.systemTimer.clear(null, Scene._showLoading);
            ILaya.systemTimer.clear(null, Scene._hideLoading);
            ILaya.systemTimer.once(delay, null, Scene._showLoading, [param], false);
        }
    }
    static _showLoading(param) {
        ILaya.stage.addChild(Scene._loadPage);
        if (Scene._loadPage instanceof Scene)
            Scene._loadPage.onOpened(param);
    }
    static _hideLoading() {
        if (Scene._loadPage instanceof Scene)
            Scene._loadPage.close();
        else
            Scene._loadPage.removeSelf();
    }
    static hideLoadingPage(delay = 500) {
        if (Scene._loadPage) {
            ILaya.systemTimer.clear(null, Scene._showLoading);
            ILaya.systemTimer.clear(null, Scene._hideLoading);
            ILaya.systemTimer.once(delay, null, Scene._hideLoading);
        }
    }
}
Scene.unDestroyedScenes = new Set();

//# sourceMappingURL=Scene.js.map
