import { UIComponent } from "./UIComponent";
import { Button } from "./Button";
import { List } from "./List";
import { Styles } from "./Styles";
import { UIUtils } from "./UIUtils";
import { Event } from "../events/Event";
import { Point } from "../maths/Point";
import { Handler } from "../utils/Handler";
import { ILaya } from "../../ILaya";
import { HideFlags } from "../Const";
export class ComboBox extends UIComponent {
    constructor(skin = null, labels = null) {
        super();
        this._visibleNum = 6;
        this._itemSize = 12;
        this._labels = [];
        this._defaultLabel = '';
        this._selectedIndex = -1;
        this._scrollType = 0;
        this.itemRender = null;
        this._itemColors = Styles.comboBoxItemColors;
        this._itemPadding = [3, 3, 3, 3];
        this.skin = skin;
        this.labels = labels;
    }
    destroy(destroyChild = true) {
        ILaya.stage.off(Event.MOUSE_DOWN, this, this.removeList);
        ILaya.stage.off(Event.MOUSE_WHEEL, this, this._onStageMouseWheel);
        super.destroy(destroyChild);
        this._button && this._button.destroy(destroyChild);
        this._list && this._list.destroy(destroyChild);
        this._button = null;
        this._list = null;
        this._itemColors = null;
        this._itemPadding = null;
        this._itemHeight = null;
        this._labels = null;
        this._selectHandler = null;
        this._defaultLabel = null;
    }
    createChildren() {
        this._button = new Button();
        this._button.hideFlags = HideFlags.HideAndDontSave;
        this._button.text.align = "left";
        this._button.labelPadding = "0,0,0,5";
        this._button.on(Event.MOUSE_DOWN, this, this.onButtonMouseDown);
        this.addChild(this._button);
    }
    _createList() {
        this._list = new List();
        this._list.hideFlags = HideFlags.HideAndDontSave;
        this._list.scrollType = this._scrollType;
        if (this._scrollBarSkin)
            this._list.vScrollBarSkin = this._scrollBarSkin;
        this._setListEvent(this._list);
    }
    _setListEvent(list) {
        this._list.selectEnable = true;
        this._list.on(Event.MOUSE_DOWN, this, this.onListDown);
        this._list.mouseHandler = Handler.create(this, this.onlistItemMouse, null, false);
        if (this._list.scrollBar)
            this._list.scrollBar.on(Event.MOUSE_DOWN, this, this.onScrollBarDown);
    }
    onListDown(e) {
        e.stopPropagation();
    }
    onScrollBarDown(e) {
        e.stopPropagation();
    }
    onButtonMouseDown(e) {
        this.callLater(this.switchTo, [!this._isOpen]);
    }
    get skin() {
        return this._button.skin;
    }
    set skin(value) {
        if (this._button.skin != value) {
            this._button.skin = value;
            this._listChanged = true;
        }
    }
    measureWidth() {
        return this._button.width;
    }
    measureHeight() {
        return this._button.height;
    }
    changeList() {
        this._listChanged = false;
        var labelWidth = this.width - 2;
        var labelColor = this._itemColors[2];
        this._itemHeight = (this._itemHeight) ? this._itemHeight : this._itemSize + 6;
        let _padding = (this.itemPadding) ? this.itemPadding : "3,3,3,3";
        this._list.itemRender = this.itemRender || { type: "Box", child: [{ type: "Label", props: { name: "label", x: 1, padding: _padding, width: labelWidth, height: this._itemHeight, fontSize: this._itemSize, color: labelColor } }] };
        this._list.repeatY = this._visibleNum;
        this._list.refresh();
    }
    onlistItemMouse(e, index) {
        let type = e.type;
        if (type === Event.MOUSE_OVER || type === Event.MOUSE_OUT) {
            if (this._isCustomList)
                return;
            let box = this._list.getCell(index);
            if (!box)
                return;
            let label = box.getChildByName("label");
            if (label) {
                if (type === Event.ROLL_OVER) {
                    label.bgColor = this._itemColors[0];
                    label.color = this._itemColors[1];
                }
                else {
                    label.bgColor = null;
                    label.color = this._itemColors[2];
                }
            }
        }
        else if (type === Event.CLICK) {
            this.selectedIndex = index;
            this.isOpen = false;
        }
    }
    switchTo(value) {
        this.isOpen = value;
    }
    changeOpen() {
        this.isOpen = !this._isOpen;
    }
    _setWidth(value) {
        super._setWidth(value);
        this._button.width = this._width;
        this._itemChanged = true;
        this._listChanged = true;
    }
    get itemPadding() {
        return this._itemPadding.join(",");
    }
    set itemPadding(value) {
        this._itemPadding = UIUtils.fillArray(this._itemPadding, value, Number);
    }
    _setHeight(value) {
        super._setHeight(value);
        this._button.height = this._height;
    }
    get labels() {
        return this._labels.join(",");
    }
    set labels(value) {
        if (this._labels.length > 0)
            this.selectedIndex = -1;
        if (value)
            this._labels = value.split(",");
        else
            this._labels.length = 0;
        this._itemChanged = true;
    }
    changeItem() {
        this._itemChanged = false;
        this._listHeight = this._labels.length > 0 ? Math.min(this._visibleNum, this._labels.length) * this._itemHeight : this._itemHeight;
        if (!this._isCustomList) {
            var g = this._list.graphics;
            g.clear();
            g.drawRect(0, 0, this.width - 1, this._listHeight, this._itemColors[4], this._itemColors[3]);
        }
        let a = this._list.array || [];
        a.length = 0;
        for (let i = 0, n = this._labels.length; i < n; i++) {
            a.push({ label: this._labels[i] });
        }
        this._list.size(this.width, this._listHeight);
        this._list.array = a;
    }
    get selectedIndex() {
        return this._selectedIndex;
    }
    set selectedIndex(value) {
        if (this._selectedIndex != value) {
            this._selectedIndex = value;
            if (this._labels.length > 0)
                this.changeSelected();
            else
                this.callLater(this.changeSelected);
            this.event(Event.CHANGE, Event.EMPTY);
            this._selectHandler && this._selectHandler.runWith(this._selectedIndex);
        }
    }
    changeSelected() {
        this._button.label = this.selectedLabel;
    }
    get defaultLabel() {
        return this._defaultLabel;
    }
    set defaultLabel(value) {
        this._defaultLabel = value;
        this._selectedIndex < 0 && (this._button.label = value);
    }
    get selectHandler() {
        return this._selectHandler;
    }
    set selectHandler(value) {
        this._selectHandler = value;
    }
    get selectedLabel() {
        return this._selectedIndex > -1 && this._selectedIndex < this._labels.length ? this._labels[this._selectedIndex] : this.defaultLabel;
    }
    set selectedLabel(value) {
        this.selectedIndex = this._labels.indexOf(value);
    }
    get visibleNum() {
        return this._visibleNum;
    }
    set visibleNum(value) {
        this._visibleNum = value;
        this._listChanged = true;
    }
    get itemHeight() {
        return this._itemHeight;
    }
    set itemHeight(value) {
        this._itemHeight = value;
        this._listChanged = true;
    }
    get itemColors() {
        return this._itemColors.join(",");
    }
    set itemColors(value) {
        this._itemColors = UIUtils.fillArray(this._itemColors, value, String);
        this._listChanged = true;
    }
    get itemSize() {
        return this._itemSize;
    }
    set itemSize(value) {
        this._itemSize = value;
        this._listChanged = true;
    }
    get isOpen() {
        return this._isOpen;
    }
    set isOpen(value) {
        if (this._isOpen != value) {
            this._isOpen = value;
            this._button.selected = this._isOpen;
            if (this._isOpen) {
                this._list || this._createList();
                this._listChanged && !this._isCustomList && this.changeList();
                this._itemChanged && this.changeItem();
                var p = this.localToGlobal(Point.TEMP.setTo(0, 0));
                var py = p.y + this._button.height;
                py = py + this._listHeight <= ILaya.stage.height ? py : p.y - this._listHeight < 0 ? py : p.y - this._listHeight;
                this._list.pos(p.x, py);
                this._list.zOrder = 1001;
                ILaya.stage.addChild(this._list);
                ILaya.stage.once(Event.MOUSE_DOWN, this, this.removeList);
                ILaya.stage.on(Event.MOUSE_WHEEL, this, this._onStageMouseWheel);
                this._list.selectedIndex = this._selectedIndex;
            }
            else {
                this._list && this._list.removeSelf();
            }
        }
    }
    _onStageMouseWheel(e) {
        if (!this._list || this._list.contains(e.target))
            return;
        this.removeList(null);
    }
    removeList(e) {
        ILaya.stage.off(Event.MOUSE_DOWN, this, this.removeList);
        ILaya.stage.off(Event.MOUSE_WHEEL, this, this._onStageMouseWheel);
        this.isOpen = false;
    }
    get scrollType() {
        return this._scrollType;
    }
    set scrollType(value) {
        this._scrollType = value;
    }
    get scrollBarSkin() {
        return this._scrollBarSkin;
    }
    set scrollBarSkin(value) {
        this._scrollBarSkin = value;
    }
    get sizeGrid() {
        return this._button.sizeGrid;
    }
    set sizeGrid(value) {
        this._button.sizeGrid = value;
    }
    get scrollBar() {
        return this.list.scrollBar;
    }
    get button() {
        return this._button;
    }
    get list() {
        this._list || this._createList();
        return this._list;
    }
    set list(value) {
        if (value) {
            value.removeSelf();
            this._isCustomList = true;
            this._list = value;
            this._setListEvent(value);
            this._itemHeight = value.getCell(0).height + value.spaceY;
        }
    }
    set_dataSource(value) {
        this._dataSource = value;
        if (typeof (value) == 'number' || typeof (value) == 'string')
            this.selectedIndex = parseInt(value);
        else if (value instanceof Array)
            this.labels = value.join(",");
        else
            super.set_dataSource(value);
    }
    get labelColors() {
        return this._button.labelColors;
    }
    set labelColors(value) {
        if (this._button.labelColors != value) {
            this._button.labelColors = value;
        }
    }
    get labelPadding() {
        return this._button.text.padding.join(",");
    }
    set labelPadding(value) {
        this._button.text.padding = UIUtils.fillArray(Styles.labelPadding, value, Number);
    }
    get labelSize() {
        return this._button.text.fontSize;
    }
    set labelSize(value) {
        this._button.text.fontSize = value;
    }
    get labelBold() {
        return this._button.text.bold;
    }
    set labelBold(value) {
        this._button.text.bold = value;
    }
    get labelFont() {
        return this._button.text.font;
    }
    set labelFont(value) {
        this._button.text.font = value;
    }
    get stateNum() {
        return this._button.stateNum;
    }
    set stateNum(value) {
        this._button.stateNum = value;
    }
}

//# sourceMappingURL=ComboBox.js.map
