import { Laya } from "Laya";
import { DebugTool } from "./DebugTool";
import { DivScripts } from "./divui/DivScripts";
import { AtlasTools } from "./tools/AtlasTools";
import { CacheAnalyser } from "./tools/CacheAnalyser";
import { ClassTool } from "./tools/ClassTool";
import { ClickSelectTool } from "./tools/ClickSelectTool";
import { RenderSpriteHook } from "./tools/enginehook/RenderSpriteHook";
import { SpriteRenderHook } from "./tools/enginehook/SpriteRenderHook";
import { IDTools } from "./tools/IDTools";
import { JSTools } from "./tools/JSTools";
import { Event } from "laya/events/Event";
import { MathUtil } from "laya/maths/MathUtil";
import { Browser } from "laya/utils/Browser";
import { Handler } from "laya/utils/Handler";
import { DisplayHook } from "./tools/DisplayHook";
export class DebugPanel {
    constructor() {
        this.preValueO = {};
        this.height = 300;
        this.width = 600;
        this.dragArea = 10;
        this.fromMe = false;
        this._init();
    }
    static enable(underGame = true, bgColor = "#ffffff") {
        if (!DebugPanel._enable && !DebugPanel.I) {
            DebugPanel._enable = true;
            DebugPanel.overlay = !underGame;
            DivScripts.init();
            DisplayHook.initMe();
            DebugTool.initBasicFunctions();
            RenderSpriteHook.init();
            SpriteRenderHook.init();
            DebugPanel.I = new DebugPanel();
            DebugPanel.I.setRoot(Laya.stage);
            CacheAnalyser.showRecacheSprite = false;
            if (bgColor) {
                DebugPanel.I.div.style.background = bgColor;
            }
        }
    }
    static getSpriteTreeArr(sprite) {
        var rst;
        rst = {};
        rst[DebugPanel.LabelSign] = "" + ClassTool.getNodeClassAndName(sprite);
        rst.target = sprite;
        IDTools.idObj(sprite);
        rst.id = IDTools.getObjID(sprite);
        var childs;
        childs = sprite._children;
        var i, len;
        len = childs.length;
        var tchild;
        var childsList;
        childsList = [];
        rst[DebugPanel.ChildrenSign] = childsList;
        for (i = 0; i < len; i++) {
            childsList.push(DebugPanel.getSpriteTreeArr(childs[i]));
        }
        return rst;
    }
    removeNoDisplayKeys(arr) {
        var i;
        for (i = arr.length - 1; i >= 0; i--) {
            if (DebugPanel.noDisplayKeys[arr[i]]) {
                arr.splice(i, 1);
            }
        }
    }
    updateShowKeys() {
        DebugPanel.tObjKeys.length = 0;
        if (!this.tShowObj)
            return;
        DebugPanel.tObjKeys = ClassTool.getObjectDisplayAbleKeys(this.tShowObj, DebugPanel.tObjKeys);
        if (this.tShowObj == Laya.stage) {
            this.removeNoDisplayKeys(DebugPanel.tObjKeys);
        }
        DebugPanel.tObjKeys.sort(MathUtil.sortSmallFirst);
    }
    static getObjectData(data) {
        var dataList;
        var tData;
        var key;
        var tValue;
        var tType;
        dataList = [];
        var keys;
        keys = DebugPanel.tObjKeys;
        var i, len;
        len = keys.length;
        for (i = 0; i < len; i++) {
            key = keys[i];
            tValue = data[key];
            tType = typeof (tValue);
            if (key.charAt(0) == "_")
                continue;
            if (DebugPanel.displayTypes[tType]) {
                tData = {};
                tData["key"] = key;
                tData["value"] = tValue;
                tData["type"] = tType;
                dataList.push(tData);
            }
        }
        return dataList;
    }
    _init() {
        this.div = Browser.document.createElement('div');
        Browser.document.body.appendChild(this.div);
        this.clickedHandler = new Handler(this, this.onClickSelected);
        this.debug_view = Browser.window.layaair_debug_view;
        this.debug_view.initLayaAirDebugView(this.div);
        this.debug_view.tree.attachEvent("onSelect", (id) => {
            var dataO;
            dataO = this.getDataByID(id, this._treeDataList[0]);
            if (dataO.target) {
                DebugTool.showDisBound(dataO.target);
                this.showTargetInfo(dataO.target);
            }
        });
        this.debug_view.setValueChangeHandler((data, new_value) => {
            this.onValueChange(data, new_value);
        });
        this.debug_view.onRefresh(() => {
            DebugPanel.I.setRoot(Laya.stage);
        });
        this.debug_view.onInspectElement(() => {
            ClickSelectTool.I.beginClickSelect(this.clickedHandler);
        });
        this.debug_view.onLogInfo(() => {
            console.log(this.tShowObj);
        });
        this.debug_view.onPrintEnabledNodeChain(() => {
            DebugTool.traceDisMouseEnable(this.tShowObj);
        });
        this.debug_view.onPrintSizeChain(() => {
            DebugTool.traceDisSizeChain(this.tShowObj);
        });
        this.debug_view.onToggleVisibility((selectd) => {
            if (this.tShowObj) {
                this.tShowObj.visible = this.debug_view.getVisibility();
            }
        });
        this.debug_view.onToggleDebugBorder((selectd) => {
            if (!this.tShowObj)
                return;
            SpriteRenderHook.showDisplayBorder(this.tShowObj, this.debug_view.getShowDebugBorder());
        });
        this.debug_view.onToggleShowCurrentCache((selectd) => {
            CacheAnalyser.showRecacheSprite = this.debug_view.getShowCurrentCache();
        });
        this.debug_view.onToggleShowAllCache((selectd) => {
            CacheAnalyser.showCacheSprite = this.debug_view.getShowAllCache();
        });
        this.debug_view.onToggleShowAtlas((selectd) => {
            console.log("toggle show atlas:", this.debug_view.getShowAtlas());
            if (this.debug_view.getShowAtlas()) {
                AtlasTools.getInstance().start();
            }
            else {
                AtlasTools.getInstance().end();
            }
        });
        JSTools.showToBody(this.div, 0, 0);
        this.initNewDivs();
        this.initDragWork();
        this.initTreeWidthDrag();
        Laya.stage.on(Event.RESIZE, this, this.adptPos);
        this.adptPos();
    }
    initNewDivs() {
        var parentNode;
        parentNode = Browser.document.getElementById("show_current_cache_control").parentNode;
        var switchNode;
        switchNode = Browser.createElement("input");
        switchNode.type = "checkbox";
        parentNode.appendChild(switchNode);
        parentNode.append("右侧");
        function onSwitchChange(e) {
            if (e.target.checked) {
                DebugPanel.sideType = DebugPanel.Right;
            }
            else {
                DebugPanel.sideType = DebugPanel.Bottom;
            }
            this.adptPos();
        }
        switchNode.addEventListener("change", onSwitchChange.bind(this));
    }
    static getOffset(e, sign) {
        var target;
        target = e.target;
        var cTarget;
        cTarget = e.currentTarget;
        var kSign;
        if (sign == "X") {
            kSign = "offsetLeft";
        }
        else {
            kSign = "offsetTop";
        }
        var value;
        value = e["offset" + sign];
        while (target && target != cTarget) {
            value += target[kSign];
            target = target.offsetParent;
        }
        return value;
    }
    initTreeWidthDrag() {
        var leftDiv;
        var rightDiv;
        leftDiv = Browser.document.getElementById("tree_container");
        var parentNode;
        parentNode = leftDiv.parentNode;
        rightDiv = parentNode.children[1];
        var isMouseDown = false;
        var preX;
        var preY;
        function onDivMouseMove(e) {
            var abs;
            abs = Math.abs(DebugPanel.getOffset(e, "X") - leftDiv.clientWidth);
            if (abs < this.dragArea) {
                this.div.style.cursor = "e-resize";
            }
            else {
                this.div.style.cursor = "auto";
            }
        }
        function onDivMouseDown(e) {
            var abs;
            abs = Math.abs(DebugPanel.getOffset(e, "X") - leftDiv.clientWidth);
            if (abs < this.dragArea) {
                this.div.style.cursor = "e-resize";
                isMouseDown = true;
            }
            else {
                isMouseDown = false;
                return;
            }
            e.stopPropagation();
        }
        function onBodyMouseMove(e) {
            if (!isMouseDown)
                return;
            leftDiv.style.width = DebugPanel.getOffset(e, "X") + "px";
            e.stopPropagation();
        }
        function onDivMouseUp(e) {
            if (!isMouseDown)
                return;
            isMouseDown = false;
            e.stopPropagation();
        }
        parentNode.addEventListener("mousedown", onDivMouseDown.bind(this), true);
        parentNode.addEventListener("mousemove", onDivMouseMove.bind(this), true);
        Browser.document.body.addEventListener("mousemove", onBodyMouseMove.bind(this));
        Browser.document.body.addEventListener("mouseup", onDivMouseUp.bind(this));
    }
    initDragWork() {
        var isMouseDown = false;
        var preX;
        var preY;
        function onDivMouseMove(e) {
            if (DebugPanel.sideType == DebugPanel.Bottom) {
                if (DebugPanel.getOffset(e, "Y") < this.dragArea) {
                    this.div.style.cursor = "n-resize";
                }
                else {
                    this.div.style.cursor = "auto";
                }
            }
            else {
                if (DebugPanel.getOffset(e, "X") < this.dragArea) {
                    this.div.style.cursor = "e-resize";
                }
                else {
                    this.div.style.cursor = "auto";
                }
            }
        }
        function onDivMouseDown(e) {
            if (DebugPanel.sideType == DebugPanel.Bottom) {
                if (DebugPanel.getOffset(e, "Y") > this.dragArea)
                    return;
            }
            else {
                if (DebugPanel.getOffset(e, "X") > this.dragArea)
                    return;
            }
            isMouseDown = true;
            preX = e.pageX;
            preY = e.pageY;
            e.stopPropagation();
        }
        function onBodyMouseMove(e) {
            if (!isMouseDown)
                return;
            var curX;
            var curY;
            var dX;
            var dY;
            curX = e.pageX;
            curY = e.pageY;
            dX = curX - preX;
            dY = curY - preY;
            if (DebugPanel.sideType == DebugPanel.Bottom) {
                this.height -= dY;
            }
            else {
                this.width -= dX;
            }
            this.adptPos();
            preX = curX;
            preY = curY;
            e.stopPropagation();
        }
        function onDivMouseUp(e) {
            if (!isMouseDown)
                return;
            isMouseDown = false;
            e.stopPropagation();
        }
        this.div.addEventListener("mousedown", onDivMouseDown.bind(this), true);
        this.div.addEventListener("mousemove", onDivMouseMove.bind(this), true);
        Browser.document.body.addEventListener("mousemove", onBodyMouseMove.bind(this));
        Browser.document.body.addEventListener("mouseup", onDivMouseUp.bind(this));
    }
    onClickSelected(target) {
        var dataO;
        if (!this._treeDataList)
            return;
        this.debug_view.tree.selectItem(IDTools.getObjID(target));
        this.debug_view.bounceUpInspectButton();
    }
    updateLoop() {
        if (this.tShowObj) {
            this.showTargetInfo(this.tShowObj);
        }
    }
    onSelectItem(obj) {
        var tTarget;
        tTarget = obj.target;
        this.showTargetInfo(tTarget);
    }
    static mParseFloat(v) {
        var rst;
        rst = parseFloat(v);
        if (isNaN(rst))
            return 0;
        return rst;
    }
    onValueChange(obj, newValue) {
        if (obj["type"] == "number") {
            newValue = DebugPanel.mParseFloat(newValue);
        }
        if (obj["type"] == "boolean") {
            newValue = newValue.toString() == "true";
        }
        if (this.tShowObj) {
            var key;
            key = obj["key"];
            this.tShowObj[key] = this.preValueO[key] = newValue;
        }
    }
    showTargetInfo(tTarget) {
        if (!tTarget)
            return;
        this.debug_view.setVisibility(tTarget.visible);
        this.debug_view.setShowDebugBorder(SpriteRenderHook.isDisplayShowBorder(tTarget));
        var i, len;
        len = DebugPanel.tObjKeys.length;
        var key;
        if (this.tShowObj == tTarget) {
            for (i = 0; i < len; i++) {
                key = DebugPanel.tObjKeys[i];
                if (this.preValueO[key] != tTarget[key]) {
                    this.debug_view.changeValueByLabel(key, tTarget[key]);
                }
            }
        }
        else {
            this.tShowObj = tTarget;
            this.updateShowKeys();
            var dataList;
            dataList = DebugPanel.getObjectData(tTarget);
            this.debug_view.setContents(dataList);
        }
        for (i = 0; i < len; i++) {
            key = DebugPanel.tObjKeys[i];
            if (key !== "__proto__") {
                this.preValueO[key] = tTarget[key];
            }
        }
    }
    adptPos() {
        if (this.fromMe)
            return;
        this.fromMe = true;
        if (DebugPanel.sideType == DebugPanel.Bottom) {
            JSTools.setPos(this.div, 0, Browser.clientHeight - this.height);
            this.debug_view.resize(Browser.clientWidth, this.height);
            if (!DebugPanel.overlay) {
                Laya.stage.setScreenSize(Browser.clientWidth * Browser.pixelRatio, (Browser.clientHeight - this.height) * Browser.pixelRatio);
            }
        }
        else {
            JSTools.setPos(this.div, Browser.clientWidth - this.width, 0);
            this.debug_view.resize(this.width, Browser.clientHeight);
            if (!DebugPanel.overlay) {
                let newWidth = 0;
                if (Browser.clientWidth > this.width) {
                    newWidth = (Browser.clientWidth - this.width) * Browser.pixelRatio;
                }
                Laya.stage.setScreenSize(newWidth, Browser.clientHeight * Browser.pixelRatio);
            }
        }
        this.fromMe = false;
    }
    setRoot(sprite) {
        var mtreeo;
        mtreeo = DebugPanel.getSpriteTreeArr(sprite);
        this._treeDataList = [mtreeo];
        var wraped;
        wraped = {};
        wraped.id = 0;
        wraped.item = [mtreeo];
        this.debug_view.setTree(wraped);
        Laya.timer.loop(500, this, this.updateLoop);
    }
    getDataByID(targetID, nodeO) {
        if (!nodeO)
            return null;
        if (targetID == nodeO.id)
            return nodeO;
        var childs;
        childs = nodeO[DebugPanel.ChildrenSign];
        if (!childs)
            return null;
        var i, len;
        len = childs.length;
        var tRst;
        for (i = 0; i < len; i++) {
            tRst = this.getDataByID(targetID, childs[i]);
            if (tRst)
                return tRst;
        }
        return null;
    }
    getDataByTarget(target, nodeO) {
        if (!nodeO)
            return null;
        if (target == nodeO.target)
            return nodeO;
        var childs;
        childs = nodeO[DebugPanel.ChildrenSign];
        if (!childs)
            return null;
        var i, len;
        len = childs.length;
        var tRst;
        for (i = 0; i < len; i++) {
            tRst = this.getDataByTarget(target, childs[i]);
            if (tRst)
                return tRst;
        }
        return null;
    }
}
DebugPanel._enable = false;
DebugPanel.ChildrenSign = "item";
DebugPanel.LabelSign = "text";
DebugPanel.displayTypes = { "boolean": true, "number": true, "string": true };
DebugPanel.displayKeys = [["x", "number"], ["y", "number"], ["width", "number"], ["width", "number"], ["width", "number"], ["width", "number"], ["width", "number"], ["width", "number"], ["width", "number"], ["width", "number"], ["width", "number"]];
DebugPanel.tObjKeys = [];
DebugPanel.noDisplayKeys = { "desginWidth": true, "desginHeight": true };
DebugPanel.Bottom = "bottom";
DebugPanel.Right = "right";
DebugPanel.sideType = DebugPanel.Bottom;
