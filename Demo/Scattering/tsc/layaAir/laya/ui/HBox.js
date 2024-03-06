import { LayoutBox } from "./LayoutBox";
export class HBox extends LayoutBox {
    sortItem(items) {
        if (items)
            items.sort(function (a, b) { return a.x - b.x; });
    }
    _setHeight(value) {
        super._setHeight(value);
        this.callLater(this.changeItems);
    }
    changeItems() {
        this._itemChanged = false;
        var items = [];
        var maxHeight = 0;
        for (let i = 0, n = this.numChildren; i < n; i++) {
            let item = this.getChildAt(i);
            if (item) {
                items.push(item);
                maxHeight = this._isHeightSet ? this._height : Math.max(maxHeight, item.height * item.scaleY);
            }
        }
        this.sortItem(items);
        let left = 0;
        for (let i = 0, n = items.length; i < n; i++) {
            let item = items[i];
            item.x = left;
            left += item.width * item.scaleX + this._space;
            if (this._align == HBox.TOP) {
                item.y = 0;
            }
            else if (this._align == HBox.MIDDLE) {
                item.y = (maxHeight - item.height * item.scaleY) * 0.5;
            }
            else if (this._align == HBox.BOTTOM) {
                item.y = maxHeight - item.height * item.scaleY;
            }
        }
        this._sizeChanged();
    }
}
HBox.NONE = "none";
HBox.TOP = "top";
HBox.MIDDLE = "middle";
HBox.BOTTOM = "bottom";

//# sourceMappingURL=HBox.js.map
