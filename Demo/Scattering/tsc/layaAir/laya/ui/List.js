import { Box } from "./Box";
import { VScrollBar } from "./VScrollBar";
import { HScrollBar } from "./HScrollBar";
import { UIUtils } from "./UIUtils";
import { Event } from "../events/Event";
import { Point } from "../maths/Point";
import { Rectangle } from "../maths/Rectangle";
import { Tween } from "../utils/Tween";
import { LegacyUIParser } from "../loaders/LegacyUIParser";
import { HideFlags } from "../Const";
import { HierarchyParser } from "../loaders/HierarchyParser";
import { ScrollType } from "./Styles";
export class List extends Box {
    constructor() {
        super(...arguments);
        this.selectEnable = false;
        this.totalPage = 0;
        this.disableStopScroll = false;
        this._repeatX = 0;
        this._repeatY = 0;
        this._repeatX2 = 0;
        this._repeatY2 = 0;
        this._spaceX = 0;
        this._spaceY = 0;
        this._cells = [];
        this._startIndex = 0;
        this._selectedIndex = -1;
        this._page = 0;
        this._isVertical = true;
        this._cellSize = 20;
        this._cellOffset = 0;
        this._createdLine = 0;
        this._offset = new Point();
        this._usedCache = null;
        this._elasticEnabled = false;
        this._scrollType = 0;
        this._preLen = 0;
    }
    destroy(destroyChild = true) {
        this._content && this._content.destroy(destroyChild);
        this._scrollBar && this._scrollBar.destroy(destroyChild);
        super.destroy(destroyChild);
        this._content = null;
        this._scrollBar = null;
        this._itemRender = null;
        this._cells = null;
        this._array = null;
        this.selectHandler = this.renderHandler = this.mouseHandler = null;
    }
    createChildren() {
        this._content = new Box();
        this._content.hideFlags = HideFlags.HideAndDontSave;
        this.addChild(this._content);
    }
    set cacheAs(value) {
        super.cacheAs = value;
        if (this._scrollBar) {
            this._usedCache = null;
            if (value !== "none")
                this._scrollBar.on(Event.START, this, this.onScrollStart);
            else
                this._scrollBar.off(Event.START, this, this.onScrollStart);
        }
    }
    get cacheAs() {
        return super.cacheAs;
    }
    onScrollStart() {
        this._usedCache || (this._usedCache = super.cacheAs);
        super.cacheAs = "none";
        this._scrollBar.once(Event.END, this, this.onScrollEnd);
    }
    onScrollEnd() {
        super.cacheAs = this._usedCache || 'none';
    }
    get content() {
        return this._content;
    }
    get scrollType() {
        return this._scrollType;
    }
    set scrollType(value) {
        this._scrollType = value;
        if (this._scrollType == ScrollType.None) {
            if (this._scrollBar) {
                this._scrollBar.destroy();
                this._scrollBar = null;
                this._content.scrollRect = null;
            }
        }
        else if (this._scrollType == ScrollType.Horizontal) {
            if (this._scrollBar && !this._scrollBar.isVertical) {
                this._scrollBar.skin = this._hScrollBarSkin;
                return;
            }
            if (this._scrollBar) {
                this._scrollBar.destroy();
                this._scrollBar = null;
            }
            let scrollBar = new HScrollBar();
            scrollBar.name = "scrollBar";
            scrollBar.bottom = 0;
            scrollBar._skinBaseUrl = this._skinBaseUrl;
            scrollBar.skin = this._hScrollBarSkin;
            scrollBar.elasticDistance = this._elasticEnabled ? 200 : 0;
            scrollBar.hideFlags = HideFlags.HideAndDontSave;
            this.scrollBar = scrollBar;
            this._setCellChanged();
        }
        else {
            if (this._scrollBar && this._scrollBar.isVertical) {
                this._scrollBar.skin = this._vScrollBarSkin;
                return;
            }
            if (this._scrollBar) {
                this._scrollBar.destroy();
                this._scrollBar = null;
            }
            let scrollBar = new VScrollBar();
            scrollBar.name = "scrollBar";
            scrollBar.right = 0;
            scrollBar._skinBaseUrl = this._skinBaseUrl;
            scrollBar.skin = this._vScrollBarSkin;
            scrollBar.elasticDistance = this._elasticEnabled ? 200 : 0;
            scrollBar.hideFlags = HideFlags.HideAndDontSave;
            this.scrollBar = scrollBar;
            this._setCellChanged();
        }
    }
    get vScrollBarSkin() {
        return this._vScrollBarSkin;
    }
    set vScrollBarSkin(value) {
        if (value == "")
            value = null;
        if (this._vScrollBarSkin != value) {
            this._vScrollBarSkin = value;
            if (this._scrollType == 0)
                this.scrollType = ScrollType.Vertical;
            else
                this.scrollType = this._scrollType;
        }
    }
    get hScrollBarSkin() {
        return this._hScrollBarSkin;
    }
    set hScrollBarSkin(value) {
        if (value == "")
            value = null;
        if (this._hScrollBarSkin != value) {
            this._hScrollBarSkin = value;
            if (this._scrollType == 0)
                this.scrollType = ScrollType.Horizontal;
            else
                this.scrollType = this._scrollType;
        }
    }
    get scrollBar() {
        return this._scrollBar;
    }
    set scrollBar(value) {
        if (this._scrollBar != value) {
            this._scrollBar = value;
            if (value) {
                this._isVertical = this._scrollBar.isVertical;
                this._scrollBar.target = this._content;
                this._scrollBar.on(Event.CHANGE, this, this.onScrollBarChange);
                this.addChild(this._scrollBar);
                this._content.scrollRect = Rectangle.create();
            }
        }
    }
    get itemRender() {
        return this._itemRender;
    }
    set itemRender(value) {
        if (this._itemRender != value) {
            this._itemRender = value;
            for (let i = this._cells.length - 1; i > -1; i--) {
                this._cells[i].destroy();
            }
            this._cells.length = 0;
            this._setCellChanged();
        }
    }
    _setWidth(value) {
        super._setWidth(value);
        this._setCellChanged();
    }
    _setHeight(value) {
        super._setWidth(value);
        this._setCellChanged();
    }
    get repeatX() {
        return this._repeatX > 0 ? this._repeatX : this._repeatX2 > 0 ? this._repeatX2 : 1;
    }
    set repeatX(value) {
        this._repeatX = value;
        this._setCellChanged();
    }
    get repeatY() {
        return this._repeatY > 0 ? this._repeatY : this._repeatY2 > 0 ? this._repeatY2 : 1;
    }
    set repeatY(value) {
        this._repeatY = value;
        this._setCellChanged();
    }
    get spaceX() {
        return this._spaceX;
    }
    set spaceX(value) {
        this._spaceX = value;
        this._setCellChanged();
    }
    get spaceY() {
        return this._spaceY;
    }
    set spaceY(value) {
        this._spaceY = value;
        this._setCellChanged();
    }
    changeCells() {
        this._cellChanged = false;
        if (this._itemRender) {
            this.scrollBar = this.getChildByName("scrollBar");
            let cell = this._getOneCell();
            let cellWidth = (cell.width + this._spaceX) || 1;
            let cellHeight = (cell.height + this._spaceY) || 1;
            if (this._width > 0)
                this._repeatX2 = this._isVertical ? Math.round(this._width / cellWidth) : Math.ceil(this._width / cellWidth);
            if (this._height > 0)
                this._repeatY2 = this._isVertical ? Math.ceil(this._height / cellHeight) : Math.round(this._height / cellHeight);
            let listWidth = this._isWidthSet ? this._width : (cellWidth * this.repeatX - this._spaceX);
            let listHeight = this._isHeightSet ? this._height : (cellHeight * this.repeatY - this._spaceY);
            this._cellSize = this._isVertical ? cellHeight : cellWidth;
            this._cellOffset = this._isVertical ? (cellHeight * Math.max(this._repeatY2, this._repeatY) - listHeight - this._spaceY) : (cellWidth * Math.max(this._repeatX2, this._repeatX) - listWidth - this._spaceX);
            if (this._scrollBar) {
                if (this._isVertical)
                    this._scrollBar.height = listHeight;
                else
                    this._scrollBar.width = listWidth;
            }
            this.setContentSize(listWidth, listHeight);
            let numX = this._isVertical ? this.repeatX : this.repeatY;
            let numY = (this._isVertical ? this.repeatY : this.repeatX) + (this._scrollBar ? 1 : 0);
            this._createItems(0, numX, numY);
            this._createdLine = numY;
            if (this._array) {
                this.array = this._array;
                this.runCallLater(this.renderItems);
            }
            else
                this.changeSelectStatus();
        }
    }
    _getOneCell() {
        if (this._cells.length === 0) {
            let item = this.createItem();
            this._offset.setTo(item._x, item._y);
            if (this.cacheContent)
                return item;
            this._cells.push(item);
        }
        return this._cells[0];
    }
    _createItems(startY, numX, numY) {
        let box = this._content;
        let cell = this._getOneCell();
        let cellWidth = cell.width + this._spaceX;
        let cellHeight = cell.height + this._spaceY;
        let arr;
        if (this.cacheContent) {
            let cacheBox = new Box();
            cacheBox.hideFlags = HideFlags.HideAndDontSave;
            cacheBox.cacheAs = "normal";
            cacheBox.pos((this._isVertical ? 0 : startY) * cellWidth, (this._isVertical ? startY : 0) * cellHeight);
            this._content.addChild(cacheBox);
            box = cacheBox;
        }
        else {
            arr = [];
            for (let i = this._cells.length - 1; i > -1; i--) {
                let item = this._cells[i];
                item.removeSelf();
                arr.push(item);
            }
            this._cells.length = 0;
        }
        for (let k = startY; k < numY; k++) {
            for (let l = 0; l < numX; l++) {
                if (arr && arr.length) {
                    cell = arr.pop();
                }
                else {
                    cell = this.createItem();
                    cell.hideFlags = HideFlags.HideAndDontSave;
                }
                cell.x = (this._isVertical ? l : k) * cellWidth - box._x;
                cell.y = (this._isVertical ? k : l) * cellHeight - box._y;
                cell.name = "item" + (k * numX + l);
                box.addChild(cell);
                this.addCell(cell);
            }
        }
    }
    createItem() {
        let arr = [];
        let box;
        if (typeof (this._itemRender) == "function") {
            box = new this._itemRender();
            box._skinBaseUrl = this._skinBaseUrl;
        }
        else {
            if (this._itemRender._$type || this._itemRender._$prefab)
                box = HierarchyParser.parse(this._itemRender, { skinBaseUrl: this._skinBaseUrl })[0];
            else
                box = LegacyUIParser.createComp(this._itemRender, null, null, arr);
            if (!box) {
                console.warn("cannot create item");
                box = new Box();
            }
        }
        box.hideFlags = HideFlags.HideAndDontSave;
        if (arr.length == 0 && box["_watchMap"]) {
            let watchMap = box["_watchMap"];
            for (let name in watchMap) {
                let a = watchMap[name];
                for (let i = 0; i < a.length; i++) {
                    let watcher = a[i];
                    arr.push(watcher.comp, watcher.prop, watcher.value);
                }
            }
        }
        if (arr.length)
            box["_$bindData"] = arr;
        return box;
    }
    addCell(cell) {
        cell.on(Event.CLICK, this, this.onCellMouse);
        cell.on(Event.RIGHT_CLICK, this, this.onCellMouse);
        cell.on(Event.MOUSE_OVER, this, this.onCellMouse);
        cell.on(Event.MOUSE_OUT, this, this.onCellMouse);
        cell.on(Event.MOUSE_DOWN, this, this.onCellMouse);
        cell.on(Event.MOUSE_UP, this, this.onCellMouse);
        this._cells.push(cell);
    }
    onAfterDeserialize() {
        super.onAfterDeserialize();
        this.initItems();
    }
    _afterInited() {
        this.initItems();
    }
    initItems() {
        if (!this._itemRender && this.getChildByName("item0") != null) {
            this.repeatX = 1;
            let count;
            count = 0;
            for (let i = 0; i < 10000; i++) {
                let cell = this.getChildByName("item" + i);
                if (cell) {
                    this.addCell(cell);
                    count++;
                    continue;
                }
                break;
            }
            this.repeatY = count;
        }
    }
    setContentSize(width, height) {
        this._content.width = width;
        this._content.height = height;
        if (this._scrollBar) {
            let r = this._content.scrollRect;
            if (!r)
                r = Rectangle.create();
            r.setTo(-this._offset.x, -this._offset.y, width, height);
            this._content.scrollRect = r;
        }
        this.event(Event.RESIZE);
    }
    onCellMouse(e) {
        if (e.type === Event.MOUSE_DOWN)
            this._isMoved = false;
        let cell = e.currentTarget;
        let index = this._startIndex + this._cells.indexOf(cell);
        if (index < 0)
            return;
        if (e.type === Event.CLICK || e.type === Event.RIGHT_CLICK) {
            if (this.selectEnable && !this._isMoved)
                this.selectedIndex = index;
            else
                this.changeCellState(cell, true, 0);
        }
        else if ((e.type === Event.MOUSE_OVER || e.type === Event.MOUSE_OUT) && this._selectedIndex !== index) {
            this.changeCellState(cell, e.type === Event.MOUSE_OVER, 0);
        }
        this.mouseHandler && this.mouseHandler.runWith([e, index]);
    }
    changeCellState(cell, visible, index) {
        let selectBox = cell.getChildByName("selectBox");
        if (selectBox) {
            this.selectEnable = true;
            selectBox.visible = visible;
            selectBox.index = index;
        }
    }
    _sizeChanged() {
        super._sizeChanged();
        this.setContentSize(this.width, this.height);
        if (this._scrollBar)
            this.callLater(this.onScrollBarChange);
    }
    onScrollBarChange(e = null) {
        this.runCallLater(this.changeCells);
        let scrollValue = this._scrollBar.value;
        let lineX = (this._isVertical ? this.repeatX : this.repeatY);
        let lineY = (this._isVertical ? this.repeatY : this.repeatX);
        let scrollLine = Math.floor(scrollValue / this._cellSize);
        if (!this.cacheContent) {
            let index = scrollLine * lineX;
            let num = 0;
            let down = true;
            let toIndex = 0;
            if (index > this._startIndex) {
                num = index - this._startIndex;
                toIndex = this._startIndex + lineX * (lineY + 1);
                this._isMoved = true;
            }
            else if (index < this._startIndex) {
                num = this._startIndex - index;
                down = false;
                toIndex = this._startIndex - 1;
                this._isMoved = true;
            }
            let cell;
            let cellIndex;
            for (let i = 0; i < num; i++) {
                if (down) {
                    cell = this._cells.shift();
                    this._cells[this._cells.length] = cell;
                    cellIndex = toIndex + i;
                }
                else {
                    cell = this._cells.pop();
                    this._cells.unshift(cell);
                    cellIndex = toIndex - i;
                }
                let pos = Math.floor(cellIndex / lineX) * this._cellSize;
                this._isVertical ? cell.y = pos : cell.x = pos;
                this.renderItem(cell, cellIndex);
            }
            this._startIndex = index;
            this.changeSelectStatus();
        }
        else {
            let num = (lineY + 1);
            if (this._createdLine - scrollLine < num) {
                this._createItems(this._createdLine, lineX, this._createdLine + num);
                this.renderItems(this._createdLine * lineX, 0);
                this._createdLine += num;
            }
        }
        let r = this._content._style.scrollRect;
        if (this._isVertical) {
            r.y = scrollValue - this._offset.y;
            r.x = -this._offset.x;
        }
        else {
            r.y = -this._offset.y;
            r.x = scrollValue - this._offset.x;
        }
        this._content.scrollRect = r;
    }
    posCell(cell, cellIndex) {
        if (!this._scrollBar)
            return;
        let lineX = (this._isVertical ? this.repeatX : this.repeatY);
        let pos = Math.floor(cellIndex / lineX) * this._cellSize;
        this._isVertical ? cell._y = pos : cell.x = pos;
    }
    get selectedIndex() {
        return this._selectedIndex;
    }
    set selectedIndex(value) {
        if (this._selectedIndex != value) {
            this._selectedIndex = value;
            this.changeSelectStatus();
            this.event(Event.CHANGE);
            this.selectHandler && this.selectHandler.runWith(value);
            this.startIndex = this._startIndex;
        }
    }
    changeSelectStatus() {
        for (let i = 0, n = this._cells.length; i < n; i++) {
            this.changeCellState(this._cells[i], this._selectedIndex === this._startIndex + i, 1);
        }
    }
    get selectedItem() {
        if (!this._array)
            return null;
        return this._selectedIndex != -1 ? this._array[this._selectedIndex] : null;
    }
    set selectedItem(value) {
        this._array && (this.selectedIndex = this._array.indexOf(value));
    }
    get selection() {
        return this.getCell(this._selectedIndex);
    }
    set selection(value) {
        this.selectedIndex = this._startIndex + this._cells.indexOf(value);
    }
    get startIndex() {
        return this._startIndex;
    }
    set startIndex(value) {
        this._startIndex = value > 0 ? value : 0;
        this.callLater(this.renderItems);
    }
    renderItems(from = 0, to = 0) {
        for (let i = from, n = to || this._cells.length; i < n; i++) {
            this.renderItem(this._cells[i], this._startIndex + i);
        }
        this.changeSelectStatus();
    }
    renderItem(cell, index) {
        if (!this._array || index >= 0 && index < this._array.length) {
            cell.visible = true;
            if (this._array) {
                if (cell["_$bindData"]) {
                    cell["_dataSource"] = this._array[index];
                    this._bindData(cell, this._array[index]);
                }
                else
                    cell.dataSource = this._array[index];
            }
            if (!this.cacheContent) {
                this.posCell(cell, index);
            }
            if (this.hasListener(Event.RENDER))
                this.event(Event.RENDER, [cell, index]);
            if (this.renderHandler)
                this.renderHandler.runWith([cell, index]);
        }
        else {
            cell.visible = false;
            cell.dataSource = null;
        }
    }
    _bindData(cell, data) {
        let arr = cell._$bindData;
        for (let i = 0, n = arr.length; i < n; i++) {
            let ele = arr[i++];
            let prop = arr[i++];
            let value = arr[i];
            let fun = UIUtils.getBindFun(value);
            ele[prop] = fun.call(this, data);
        }
    }
    get array() {
        return this._array;
    }
    set array(value) {
        this.runCallLater(this.changeCells);
        this._array = value || [];
        this._preLen = this._array.length;
        let length = this._array.length;
        this.totalPage = Math.ceil(length / (this.repeatX * this.repeatY));
        this._selectedIndex = this._selectedIndex < length ? this._selectedIndex : length - 1;
        this.startIndex = this._startIndex;
        if (this._scrollBar) {
            (!this.disableStopScroll && this._scrollBar.stopScroll());
            let numX = this._isVertical ? this.repeatX : this.repeatY;
            let numY = this._isVertical ? this.repeatY : this.repeatX;
            let lineCount = Math.ceil(length / numX);
            let total = this._cellOffset > 0 ? this.totalPage + 1 : this.totalPage;
            if (total > 1 && lineCount >= numY) {
                this._scrollBar.scrollSize = this._cellSize;
                this._scrollBar.thumbPercent = numY / lineCount;
                this._scrollBar.setScroll(0, (lineCount - numY) * this._cellSize + this._cellOffset, this._scrollBar.value);
            }
            else {
                this._scrollBar.setScroll(0, 0, 0);
            }
        }
    }
    updateArray(array) {
        this._array = array;
        if (this._array) {
            let freshStart = this._preLen - this._startIndex;
            if (freshStart >= 0)
                this.renderItems(freshStart);
            this._preLen = this._array.length;
        }
        if (this._scrollBar) {
            let length = array.length;
            let numX = this._isVertical ? this.repeatX : this.repeatY;
            let numY = this._isVertical ? this.repeatY : this.repeatX;
            let lineCount = Math.ceil(length / numX);
            if (lineCount >= numY) {
                this._scrollBar.thumbPercent = numY / lineCount;
                this._scrollBar.slider["_max"] = (lineCount - numY) * this._cellSize + this._cellOffset;
            }
        }
    }
    get page() {
        return this._page;
    }
    set page(value) {
        this._page = value;
        if (this._array) {
            this._page = value > 0 ? value : 0;
            this._page = this._page < this.totalPage ? this._page : this.totalPage - 1;
            this.startIndex = this._page * this.repeatX * this.repeatY;
        }
    }
    get length() {
        return this._array ? this._array.length : 0;
    }
    set_dataSource(value) {
        this._dataSource = value;
        if (typeof (value) == 'number' || typeof (value) == 'string')
            this.selectedIndex = parseInt(value);
        else if (value instanceof Array)
            this.array = value;
        else
            super.set_dataSource(value);
    }
    get cells() {
        this.runCallLater(this.changeCells);
        return this._cells;
    }
    get elasticEnabled() {
        return this._elasticEnabled;
    }
    set elasticEnabled(value) {
        this._elasticEnabled = value;
        if (this._scrollBar) {
            this._scrollBar.elasticDistance = value ? 200 : 0;
        }
    }
    refresh() {
        this.array = this._array;
    }
    getItem(index) {
        if (!this._array)
            return null;
        if (index > -1 && index < this._array.length) {
            return this._array[index];
        }
        return null;
    }
    changeItem(index, source) {
        if (index > -1 && this._array && index < this._array.length) {
            this._array[index] = source;
            if (index >= this._startIndex && index < this._startIndex + this._cells.length) {
                this.renderItem(this.getCell(index), index);
            }
        }
    }
    setItem(index, source) {
        this.changeItem(index, source);
    }
    addItem(source) {
        if (!this.array) {
            this.array = [source];
        }
        else {
            this._array.push(source);
        }
        this.array = this._array;
    }
    addItemAt(souce, index) {
        this._array.splice(index, 0, souce);
        this.array = this._array;
    }
    deleteItem(index) {
        if (this._array) {
            this._array.splice(index, 1);
            this.array = this._array;
        }
    }
    getCell(index) {
        this.runCallLater(this.changeCells);
        if (index > -1 && this._cells) {
            return this._cells[(index - this._startIndex) % this._cells.length];
        }
        return null;
    }
    scrollTo(index) {
        if (this._scrollBar) {
            let numX = this._isVertical ? this.repeatX : this.repeatY;
            this._scrollBar.value = Math.floor(index / numX) * this._cellSize;
        }
        else {
            this.startIndex = index;
        }
    }
    tweenTo(index, time = 200, complete = null) {
        if (this._scrollBar) {
            this._scrollBar.stopScroll();
            let numX = this._isVertical ? this.repeatX : this.repeatY;
            Tween.to(this._scrollBar, { value: Math.floor(index / numX) * this._cellSize }, time, null, complete, 0, true);
        }
        else {
            this.startIndex = index;
            if (complete)
                complete.run();
        }
    }
    _setCellChanged() {
        if (!this._cellChanged) {
            this._cellChanged = true;
            this.callLater(this.changeCells);
        }
    }
    commitMeasure() {
        this.runCallLater(this.changeCells);
    }
}

//# sourceMappingURL=List.js.map
