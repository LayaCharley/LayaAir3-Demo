import { Styles } from "./Styles";
import { Event } from "../events/Event";
import { Loader } from "../net/Loader";
import { AutoBitmap } from "./AutoBitmap";
import { UIComponent } from "./UIComponent";
import { UIUtils } from "./UIUtils";
import { ILaya } from "../../ILaya";
import { URL } from "../net/URL";
import { SerializeUtil } from "../loaders/SerializeUtil";
export class Image extends UIComponent {
    constructor(skin = null) {
        super();
        this.skin = skin;
    }
    dispose() {
        this.destroy(true);
        ILaya.loader.clearRes(this._skin);
    }
    createChildren() {
        this.graphics = new AutoBitmap();
    }
    get skin() {
        return this._skin;
    }
    set skin(value) {
        if (value == "")
            value = null;
        if (this._skin == value)
            return;
        this._setSkin(value);
    }
    _setSkin(url) {
        this._skin = url;
        if (url) {
            if (this._skinBaseUrl)
                url = URL.formatURL(url, this._skinBaseUrl);
            let source = Loader.getRes(url);
            if (source) {
                this.source = source;
                return Promise.resolve();
            }
            else {
                let sk = this._skin;
                return ILaya.loader.load(url, { type: Loader.IMAGE, group: this._group }).then(tex => {
                    if (sk == this._skin)
                        this.source = tex;
                });
            }
        }
        else {
            this.source = null;
            return Promise.resolve();
        }
    }
    get source() {
        return this._graphics.source;
    }
    set source(value) {
        if (!this._graphics)
            return;
        this._graphics.source = value;
        this.event(Event.LOADED);
        this.repaint();
        if (this._useSourceSize && value) {
            this.size(value.sourceWidth, value.sourceHeight);
            this._useSourceSize = true;
        }
        else
            this.onCompResize();
    }
    get color() {
        return this._graphics.color;
    }
    set color(value) {
        this._graphics.color = value;
    }
    get group() {
        return this._group;
    }
    set group(value) {
        if (value && this._skin)
            Loader.setGroup(this._skin, value);
        this._group = value;
    }
    get useSourceSize() {
        return this._useSourceSize;
    }
    set useSourceSize(value) {
        if (this._useSourceSize != value) {
            if (value && this._graphics.source)
                this.size(this._graphics.source.sourceWidth, this._graphics.source.sourceHeight);
            this._useSourceSize = value;
        }
    }
    measureWidth() {
        return this._graphics.width;
    }
    measureHeight() {
        return this._graphics.height;
    }
    _setWidth(value) {
        super._setWidth(value);
        this._graphics.width = value;
        if (!SerializeUtil.isDeserializing)
            this._useSourceSize = false;
    }
    _setHeight(value) {
        super._setHeight(value);
        this._graphics.height = value;
        if (!SerializeUtil.isDeserializing)
            this._useSourceSize = false;
    }
    get sizeGrid() {
        if (this._graphics.sizeGrid)
            return this._graphics.sizeGrid.join(",");
        return null;
    }
    set sizeGrid(value) {
        if (value)
            this._graphics.sizeGrid = UIUtils.fillArray(Styles.defaultSizeGrid, value, Number);
        else
            this._graphics.sizeGrid = null;
    }
    set_dataSource(value) {
        this._dataSource = value;
        if (typeof (value) == 'string')
            this.skin = value;
        else
            super.set_dataSource(value);
    }
}

//# sourceMappingURL=Image.js.map
