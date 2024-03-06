import { ILaya } from "../../ILaya";
import { Sprite } from "../display/Sprite";
import { Loader } from "../net/Loader";
export class HtmlImage {
    constructor() {
        this.obj = new Sprite();
    }
    get element() {
        return this._element;
    }
    get width() {
        return this.obj.width;
    }
    get height() {
        return this.obj.height;
    }
    create(owner, element) {
        this._owner = owner;
        this._element = element;
        this._owner.objContainer.addChild(this.obj);
        let src = this._element.getAttrString("src");
        this.loadTexture(src);
    }
    loadTexture(src) {
        let width = this._element.getAttrInt("width", -1);
        let height = this._element.getAttrInt("height", -1);
        if (width != -1)
            this.obj.width = width;
        if (height != -1)
            this.obj.height = height;
        let tex = Loader.getRes(src);
        if (tex) {
            this.obj.texture = tex;
            if (width == -1)
                this.obj.width = tex.sourceWidth;
            if (height == -1)
                this.obj.height = tex.sourceHeight;
        }
        else {
            ILaya.loader.load(src, { silent: true }).then(tex => {
                let w = this.obj.width;
                let h = this.obj.height;
                this.obj.texture = tex;
                if (width == -1)
                    this.obj.width = tex ? tex.sourceWidth : 0;
                if (height == -1)
                    this.obj.height = tex ? tex.sourceHeight : 0;
                if (this._owner && (w != this.obj.width || h != this.obj.height))
                    this._owner.refreshLayout();
            });
        }
    }
    pos(x, y) {
        this.obj.pos(x, y);
    }
    release() {
        this.obj.removeSelf();
        this.obj.offAll();
        this.obj.texture = null;
        this._owner = null;
        this._element = null;
    }
    destroy() {
        this.obj.destroy();
    }
}

//# sourceMappingURL=HtmlImage.js.map
