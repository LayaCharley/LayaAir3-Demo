import { Laya } from "Laya";
export class Layouter {
    constructor() {
        this._sX = 0;
        this._width = 0;
    }
    layout() {
        this.layoutFun(this._width, this._items, this.data, this._sX);
    }
    set items(arr) {
        this._items = arr;
        this.calSize();
    }
    get items() {
        return this._items;
    }
    set x(v) {
        this._sX = v;
        this.changed();
    }
    get x() {
        return this._sX;
    }
    set width(v) {
        this._width = v;
        this.changed();
    }
    get width() {
        return this._width;
    }
    changed() {
        Laya.timer.callLater(this, this.layout);
    }
    calSize() {
        var i, len;
        var tItem;
        tItem = this.items[0];
        this._sX = tItem.x;
        var maxX;
        maxX = this._sX + tItem.width;
        len = this.items.length;
        for (i = 1; i < len; i++) {
            tItem = this.items[i];
            if (this._sX > tItem.x) {
                this._sX = tItem.x;
            }
            if (maxX < tItem.x + tItem.width) {
                maxX = tItem.x + tItem.width;
            }
        }
        this._width = maxX - this._sX;
    }
}
