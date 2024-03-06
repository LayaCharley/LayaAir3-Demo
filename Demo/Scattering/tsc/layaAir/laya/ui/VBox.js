import { LayoutBox } from "./LayoutBox";
export class VBox extends LayoutBox {
    constructor() {
        super(...arguments);
        this.isSortItem = false;
    }
    _setWidth(value) {
        super._setWidth(value);
        this.callLater(this.changeItems);
    }
    changeItems() {
        this._itemChanged = false;
        let items = [];
        let maxWidth = 0;
        for (let i = 0, n = this.numChildren; i < n; i++) {
            let item = this.getChildAt(i);
            if (item) {
                items.push(item);
                maxWidth = this._isWidthSet ? this._width : Math.max(maxWidth, item.width * item.scaleX);
            }
        }
        if (this.isSortItem) {
            this.sortItem(items);
        }
        let top = 0;
        for (let i = 0, n = items.length; i < n; i++) {
            let item = items[i];
            item.y = top;
            top += item.height * item.scaleY + this._space;
            if (this._align == VBox.LEFT) {
                item.x = 0;
            }
            else if (this._align == VBox.CENTER) {
                item.x = (maxWidth - item.width * item.scaleX) * 0.5;
            }
            else if (this._align == VBox.RIGHT) {
                item.x = maxWidth - item.width * item.scaleX;
            }
        }
        this._sizeChanged();
    }
}
VBox.NONE = "none";
VBox.LEFT = "left";
VBox.CENTER = "center";
VBox.RIGHT = "right";

//# sourceMappingURL=VBox.js.map
