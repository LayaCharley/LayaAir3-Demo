import { UIComponent } from "./UIComponent";
import { AutoBitmap } from "./AutoBitmap";
import { UIUtils } from "./UIUtils";
import { Styles } from "./Styles";
import { NodeFlags } from "../Const";
import { Event } from "../events/Event";
import { Loader } from "../net/Loader";
import { Handler } from "../utils/Handler";
import { ILaya } from "../../ILaya";
import { URL } from "../net/URL";
export class Clip extends UIComponent {
    constructor(url = null, clipX = 1, clipY = 1) {
        super();
        this._clipX = 1;
        this._clipY = 1;
        this._clipWidth = 0;
        this._clipHeight = 0;
        this._interval = 50;
        this._index = 0;
        this._toIndex = -1;
        this._sources = [];
        this._clipX = clipX;
        this._clipY = clipY;
        this.skin = url;
    }
    createChildren() {
        this.graphics = new AutoBitmap();
    }
    _onDisplay(e) {
        if (this._isPlaying) {
            if (this._getBit(NodeFlags.DISPLAYED_INSTAGE))
                this.play();
            else
                this.stop();
        }
        else if (this._autoPlay) {
            this.play();
        }
    }
    get skin() {
        return this._skin;
    }
    set skin(value) {
        if (this._skin == value)
            return;
        this._setSkin(value);
    }
    _setSkin(url) {
        this._skin = url;
        if (url) {
            if (this._skinBaseUrl)
                url = URL.formatURL(url, this._skinBaseUrl);
            if (!Loader.getRes(url))
                return ILaya.loader.load(url, Loader.IMAGE).then(() => this._skinLoaded());
            else {
                this._skinLoaded();
                return Promise.resolve();
            }
        }
        else {
            this._graphics.source = null;
            return Promise.resolve();
        }
    }
    _skinLoaded() {
        this._setClipChanged();
        this._sizeChanged();
        this.event(Event.LOADED);
    }
    get clipX() {
        return this._clipX;
    }
    set clipX(value) {
        this._clipX = value || 1;
        this._setClipChanged();
    }
    get clipY() {
        return this._clipY;
    }
    set clipY(value) {
        this._clipY = value || 1;
        this._setClipChanged();
    }
    get clipWidth() {
        return this._clipWidth;
    }
    set clipWidth(value) {
        this._clipWidth = value;
        this._setClipChanged();
    }
    get clipHeight() {
        return this._clipHeight;
    }
    set clipHeight(value) {
        this._clipHeight = value;
        this._setClipChanged();
    }
    changeClip() {
        this._clipChanged = false;
        if (!this._skin || this._destroyed)
            return;
        let url = this._skinBaseUrl ? URL.formatURL(this._skin, this._skinBaseUrl) : this._skin;
        let img = Loader.getRes(url);
        if (img) {
            this.loadComplete(this._skin, img);
        }
        else {
            ILaya.loader.load(url, Handler.create(this, this.loadComplete, [this._skin]), null, Loader.IMAGE);
        }
    }
    loadComplete(url, img) {
        if (url !== this._skin)
            return;
        this._sources.length = 0;
        if (img) {
            var w = this._clipWidth || Math.ceil(img.sourceWidth / this._clipX);
            var h = this._clipHeight || Math.ceil(img.sourceHeight / this._clipY);
            for (let i = 0; i < this._clipY; i++) {
                for (let j = 0; j < this._clipX; j++) {
                    this._sources.push(img.getCachedClip(w * j, h * i, w, h));
                }
            }
        }
        this.index = this._index;
        this.event(Event.LOADED);
        this.onCompResize();
    }
    get sources() {
        return this._sources;
    }
    set sources(value) {
        this._sources = value;
        this.index = this._index;
        this.event(Event.LOADED);
    }
    get group() {
        return this._group;
    }
    set group(value) {
        if (value && this._skin)
            Loader.setGroup(this._skin, value);
        this._group = value;
    }
    _setWidth(value) {
        super._setWidth(value);
        this._graphics.width = value;
    }
    _setHeight(value) {
        super._setHeight(value);
        this._graphics.height = value;
    }
    measureWidth() {
        this.runCallLater(this.changeClip);
        return this._graphics.width;
    }
    measureHeight() {
        this.runCallLater(this.changeClip);
        return this._graphics.height;
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
    get index() {
        return this._index;
    }
    set index(value) {
        this._index = value;
        this._graphics && (this._graphics.source = this._sources[value]);
        this.event(Event.CHANGE);
    }
    get total() {
        this.runCallLater(this.changeClip);
        return this._sources.length;
    }
    get autoPlay() {
        return this._autoPlay;
    }
    set autoPlay(value) {
        if (this._autoPlay != value) {
            this._autoPlay = value;
            value ? this.play() : this.stop();
        }
    }
    get interval() {
        return this._interval;
    }
    set interval(value) {
        if (this._interval != value) {
            this._interval = value;
            if (this._isPlaying)
                this.play();
        }
    }
    get isPlaying() {
        return this._isPlaying;
    }
    set isPlaying(value) {
        this._isPlaying = value;
    }
    play(from = 0, to = -1) {
        this._setClipChanged();
        this._isPlaying = true;
        this.index = from;
        this._toIndex = to;
        ILaya.timer.loop(this.interval, this, this._loop);
        this.on(Event.DISPLAY, this, this._onDisplay);
        this.on(Event.UNDISPLAY, this, this._onDisplay);
    }
    _loop() {
        if (this._visible) {
            this._index++;
            if (this._toIndex > -1 && this._index >= this._toIndex)
                this.stop();
            else if (this._index >= this._sources.length)
                this._index = 0;
            this.index = this._index;
        }
    }
    stop() {
        this._isPlaying = false;
        ILaya.timer.clear(this, this._loop);
        this.event(Event.COMPLETE);
    }
    set_dataSource(value) {
        this._dataSource = value;
        if (typeof (value) == 'number' || typeof (value) == 'string')
            this.index = parseInt(value);
        else
            super.set_dataSource(value);
    }
    _setClipChanged() {
        if (!this._clipChanged) {
            this._clipChanged = true;
            this.callLater(this.changeClip);
        }
    }
}

//# sourceMappingURL=Clip.js.map
