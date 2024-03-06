import { Box } from "./Box";
import { Handler } from "../utils/Handler";
export class ViewStack extends Box {
    constructor() {
        super();
        this._setIndexHandler = Handler.create(this, this.setIndex, null, false);
        this._items = [];
    }
    setItems(views) {
        this.removeChildren();
        var index = 0;
        for (var i = 0, n = views.length; i < n; i++) {
            var item = views[i];
            if (item) {
                item.name = "item" + index;
                this.addChild(item);
                index++;
            }
        }
        this.initItems();
    }
    addItem(view) {
        view.name = "item" + this._items.length;
        this.addChild(view);
        this.initItems();
    }
    onAfterDeserialize() {
        super.onAfterDeserialize();
        this.initItems();
    }
    _afterInited() {
        this.initItems();
    }
    initItems() {
        this._items.length = 0;
        for (var i = 0; i < 10000; i++) {
            var item = this.getChildByName("item" + i);
            if (item == null) {
                break;
            }
            this._items.push(item);
            item.visible = (i == this._selectedIndex);
        }
    }
    get selectedIndex() {
        return this._selectedIndex;
    }
    set selectedIndex(value) {
        if (this._selectedIndex != value) {
            this.setSelect(this._selectedIndex, false);
            this._selectedIndex = value;
            this.setSelect(this._selectedIndex, true);
        }
    }
    setSelect(index, selected) {
        if (this._items && index > -1 && index < this._items.length) {
            this._items[index].visible = selected;
        }
    }
    get selection() {
        return this._selectedIndex > -1 && this._selectedIndex < this._items.length ? this._items[this._selectedIndex] : null;
    }
    set selection(value) {
        this.selectedIndex = this._items.indexOf(value);
    }
    get setIndexHandler() {
        return this._setIndexHandler;
    }
    set setIndexHandler(value) {
        this._setIndexHandler = value;
    }
    setIndex(index) {
        this.selectedIndex = index;
    }
    get items() {
        return this._items;
    }
    set_dataSource(value) {
        this._dataSource = value;
        if (typeof (value) == 'number' || typeof (value) == 'string') {
            this.selectedIndex = parseInt(value);
        }
        else {
            for (var prop in this._dataSource) {
                if (prop in this) {
                    this[prop] = this._dataSource[prop];
                }
            }
        }
    }
}

//# sourceMappingURL=ViewStack.js.map
