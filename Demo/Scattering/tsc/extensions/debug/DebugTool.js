import { Laya } from "Laya";
import { ClassTool } from "./tools/ClassTool";
import { CountTool } from "./tools/CountTool";
import { DisController } from "./tools/DisController";
import { DisControlTool } from "./tools/DisControlTool";
import { DTrace } from "./tools/DTrace";
import { RunProfile } from "./tools/RunProfile";
import { TraceTool } from "./tools/TraceTool";
import { WalkTools } from "./tools/WalkTools";
import { DebugInfoLayer } from "./view/nodeInfo/DebugInfoLayer";
import { NodeInfoPanel } from "./view/nodeInfo/NodeInfoPanel";
import { NodeUtils } from "./view/nodeInfo/NodeUtils";
import { Browser } from "laya/utils/Browser";
import { Sprite } from "laya/display/Sprite";
import { Rectangle } from "laya/maths/Rectangle";
import { Event } from "laya/events/Event";
import { Stat } from "laya/utils/Stat";
import { GrahamScan } from "laya/maths/GrahamScan";
import { RenderSprite } from "laya/renders/RenderSprite";
import { Watcher } from "./tools/Watcher";
export class DebugTool {
    constructor() {
    }
    static getMenuShowEvent() {
        if (Browser.onMobile) {
            return Event.DOUBLE_CLICK;
        }
        else {
            return Event.RIGHT_CLICK;
        }
    }
    static initBasicFunctions() {
        if (!DebugTool.debugLayer) {
            DebugInfoLayer.init();
            DebugTool.debugLayer = DebugInfoLayer.I.graphicLayer;
            DebugTool.debugLayer.mouseEnabled = false;
            DebugTool.debugLayer.mouseThrough = true;
            DebugTool.showStatu = true;
            Laya.stage.on(Event.KEY_DOWN, null, DebugTool.keyHandler);
            DebugTool.export();
        }
    }
    static dTrace(str) {
        if (DebugTool._traceFun != null) {
            DebugTool._traceFun(str);
        }
        console.log(str);
    }
    static keyHandler(e) {
        var key;
        key = String.fromCharCode(e.keyCode);
        if (!e.altKey)
            return;
        switch (e.keyCode) {
            case 38:
                DebugTool.showParent();
                break;
            case 40:
                DebugTool.showChild();
                break;
            case 37:
                DebugTool.showBrother(DebugTool.target, 1);
                break;
            case 39:
                DebugTool.showBrother(DebugTool.target, -1);
                break;
        }
        DebugTool.dealCMDKey(key);
    }
    static dealCMDKey(key) {
        switch (key) {
            case "上":
                DebugTool.showParent();
                break;
            case "下":
                DebugTool.showChild();
                break;
            case "左":
                DebugTool.showBrother(DebugTool.target, 1);
                break;
            case "右":
                DebugTool.showBrother(DebugTool.target, -1);
                break;
            case "B":
                DebugTool.showAllBrother();
                break;
            case "C":
                DebugTool.showAllChild();
                break;
            case "E":
                DebugTool.traceDisMouseEnable();
                break;
            case "S":
                DebugTool.traceDisSizeChain();
                break;
            case "D":
                DisControlTool.downDis(DebugTool.target);
                break;
            case "U":
                DisControlTool.upDis(DebugTool.target);
                break;
            case "N":
                DebugTool.getNodeInfo();
                break;
            case "M":
                DebugTool.showAllUnderMosue();
                break;
            case "I":
                break;
            case "O":
                break;
            case "L":
                DisController.I.switchType();
                break;
            case "Q":
                DebugTool.showNodeInfo();
                break;
            case "F":
                DebugTool.showToolPanel();
                break;
            case "P":
                DebugTool.showToolFilter();
                break;
            case "V":
                DebugTool.selectNodeUnderMouse();
                break;
            case "A":
                break;
            case "K":
                NodeUtils.traceStage();
                break;
            case "T":
                DebugTool.switchNodeTree();
                break;
            case "R":
                break;
            case "X":
                break;
            case "mCMD":
                DebugTool.traceCMD();
                break;
            case "allCMD":
                DebugTool.traceCMDR();
                break;
        }
    }
    static switchNodeTree() {
    }
    static selectNodeUnderMouse() {
        DebugTool.showDisBound();
        return;
    }
    static showToolPanel() {
    }
    static showToolFilter() {
    }
    static showNodeInfo() {
        if (NodeInfoPanel.I.isWorkState) {
            NodeInfoPanel.I.recoverNodes();
        }
        else {
            NodeInfoPanel.I.showDisInfo(DebugTool.target);
        }
    }
    static switchDisController() {
        if (DisController.I.target) {
            DisController.I.target = null;
        }
        else {
            if (DebugTool.target) {
                DisController.I.target = DebugTool.target;
            }
        }
    }
    static get isThisShow() {
        return false;
    }
    static showParent(sprite = null) {
        if (!sprite)
            sprite = DebugTool.target;
        if (!sprite) {
            console.log("no targetAvalible");
            return null;
        }
        DebugTool.target = sprite.parent;
        DebugTool.autoWork();
    }
    static showChild(sprite = null) {
        if (!sprite)
            sprite = DebugTool.target;
        if (!sprite) {
            console.log("no targetAvalible");
            return null;
        }
        if (sprite.numChildren > 0) {
            DebugTool.target = sprite.getChildAt(0);
            DebugTool.autoWork();
        }
    }
    static showAllChild(sprite = null) {
        if (!sprite)
            sprite = DebugTool.target;
        if (!sprite) {
            console.log("no targetAvalible");
            return null;
        }
        DebugTool.selectedNodes = DisControlTool.getAllChild(sprite);
        DebugTool.showSelected();
    }
    static showAllUnderMosue() {
        DebugTool.selectedNodes = DisControlTool.getObjectsUnderGlobalPoint(Laya.stage);
        DebugTool.showSelected();
    }
    static showParentChain(sprite = null) {
        if (!sprite)
            return;
        DebugTool.selectedNodes = [];
        var tar;
        tar = sprite.parent;
        while (tar) {
            DebugTool.selectedNodes.push(tar);
            tar = tar.parent;
        }
        DebugTool.showSelected();
    }
    static showAllBrother(sprite = null) {
        if (!sprite)
            sprite = DebugTool.target;
        if (!sprite) {
            console.log("no targetAvalible");
            return null;
        }
        if (!sprite.parent)
            return;
        DebugTool.selectedNodes = DisControlTool.getAllChild(sprite.parent);
        DebugTool.showSelected();
    }
    static showBrother(sprite, dID = 1) {
        if (!sprite)
            sprite = DebugTool.target;
        if (!sprite) {
            console.log("no targetAvalible");
            return null;
        }
        var p;
        p = sprite.parent;
        if (!p)
            return;
        var n;
        n = p.getChildIndex(sprite);
        n += dID;
        if (n < 0)
            n += p.numChildren;
        if (n >= p.numChildren)
            n -= p.numChildren;
        DebugTool.target = p.getChildAt(n);
        DebugTool.autoWork();
    }
    static set showStatu(value) {
        if (value) {
            Stat.show();
        }
        else {
            Stat.hide();
            DebugTool.clearDebugLayer();
        }
    }
    static clearDebugLayer() {
        if (DebugTool.debugLayer.graphics)
            DebugTool.debugLayer.graphics.clear();
    }
    static set target(v) {
        DebugTool._target = v;
    }
    static get target() {
        return DebugTool._target;
    }
    static showSelected() {
        if (!DebugTool.autoShowSelected)
            return;
        if (!DebugTool.selectedNodes || DebugTool.selectedNodes.length < 1)
            return;
        console.log("selected:", DebugTool.selectedNodes);
        var i;
        var len;
        len = DebugTool.selectedNodes.length;
        DebugTool.clearDebugLayer();
        for (i = 0; i < len; i++) {
            DebugTool.showDisBound(DebugTool.selectedNodes[i], false);
        }
    }
    static getClassCreateInfo(className) {
        return RunProfile.getRunInfo(className);
    }
    static set showBound(value) {
        DebugTool._showBound = value;
        if (!DebugTool._showBound) {
            DebugTool.clearDebugLayer();
        }
    }
    static get showBound() {
        return DebugTool._showBound;
    }
    static autoWork() {
        if (!DebugTool.isThisShow)
            return;
        if (DebugTool.showBound)
            DebugTool.showDisBound();
        if (DebugTool.autoTraceSpriteInfo && DebugTool.target) {
            TraceTool.traceSpriteInfo(DebugTool.target, DebugTool.autoTraceBounds, DebugTool.autoTraceSize, DebugTool.autoTraceTree);
        }
        if (!DebugTool.target)
            return;
        if (DebugTool.autoTraceCMD) {
            DebugTool.traceCMD();
        }
        if (DebugTool.autoTraceCMDR) {
            DebugTool.traceCMDR();
        }
        if (DebugTool.autoTraceEnable) {
            DebugTool.traceDisMouseEnable(DebugTool.target);
        }
    }
    static traceDisMouseEnable(tar = null) {
        console.log("----------------traceDisMouseEnable--------------------");
        if (!tar)
            tar = DebugTool.target;
        if (!tar) {
            console.log("no targetAvalible");
            return null;
        }
        var strArr;
        strArr = [];
        DebugTool.selectedNodes = [];
        while (tar) {
            strArr.push(ClassTool.getNodeClassAndName(tar) + ": mouseEnabled:" + tar.mouseEnabled + " hitFirst:" + tar.hitTestPrior);
            DebugTool.selectedNodes.push(tar);
            tar = tar.parent;
        }
        console.log(strArr.join("\n"));
        DebugTool.showSelected();
        return strArr.join("\n");
    }
    static traceDisSizeChain(tar = null) {
        console.log("---------------------traceDisSizeChain-------------------");
        if (!tar)
            tar = DebugTool.target;
        if (!tar) {
            console.log("no targetAvalible");
            return null;
        }
        DebugTool.selectedNodes = [];
        var strArr;
        strArr = [];
        while (tar) {
            strArr.push(ClassTool.getNodeClassAndName(tar) + ": x:" + tar.x + " y:" + tar.y + " w:" + tar.width + " h:" + tar.height + " scaleX:" + tar.scaleX + " scaleY:" + tar.scaleY);
            DebugTool.selectedNodes.push(tar);
            tar = tar.parent;
        }
        console.log(strArr.join("\n"));
        DebugTool.showSelected();
        return strArr.join("\n");
    }
    static showDisBound(sprite = null, clearPre = true, color = "#ff0000") {
        if (!sprite)
            sprite = DebugTool.target;
        if (!sprite) {
            console.log("no targetAvalible");
            return null;
        }
        if (clearPre)
            DebugTool.clearDebugLayer();
        var pointList;
        pointList = sprite._getBoundPointsM(true);
        if (!pointList || pointList.length < 1)
            return;
        pointList = GrahamScan.pListToPointList(pointList, true);
        WalkTools.walkArr(pointList, sprite.localToGlobal, sprite);
        pointList = GrahamScan.pointListToPlist(pointList);
        DebugTool._disBoundRec = Rectangle._getWrapRec(pointList, DebugTool._disBoundRec);
        DebugTool.debugLayer.graphics.drawRect(DebugTool._disBoundRec.x, DebugTool._disBoundRec.y, DebugTool._disBoundRec.width, DebugTool._disBoundRec.height, null, color);
        DebugInfoLayer.I.setTop();
    }
    static showDisBoundToSprite(sprite = null, graphicSprite = null, color = "#ff0000", lineWidth = 1) {
        var pointList;
        pointList = sprite._getBoundPointsM(true);
        if (!pointList || pointList.length < 1)
            return;
        pointList = GrahamScan.pListToPointList(pointList, true);
        WalkTools.walkArr(pointList, sprite.localToGlobal, sprite);
        pointList = GrahamScan.pointListToPlist(pointList);
        DebugTool._disBoundRec = Rectangle._getWrapRec(pointList, DebugTool._disBoundRec);
        graphicSprite.graphics.drawRect(DebugTool._disBoundRec.x, DebugTool._disBoundRec.y, DebugTool._disBoundRec.width, DebugTool._disBoundRec.height, null, color, lineWidth);
    }
    static getNodeInfo() {
        DebugTool.counter.reset();
        WalkTools.walkTarget(Laya.stage, DebugTool.addNodeInfo);
        console.log("node info:");
        DebugTool.counter.traceSelf();
        return DebugTool.counter.data;
    }
    static findByClass(className) {
        DebugTool._classList = [];
        DebugTool._tFindClass = className;
        WalkTools.walkTarget(Laya.stage, DebugTool.addClassNode);
        DebugTool.selectedNodes = DebugTool._classList;
        DebugTool.showSelected();
        return DebugTool._classList;
    }
    static addClassNode(node) {
        var type;
        type = node["constructor"].name;
        if (type == DebugTool._tFindClass) {
            DebugTool._classList.push(node);
        }
    }
    static traceCMD(sprite = null) {
        if (!sprite)
            sprite = DebugTool.target;
        if (!sprite) {
            console.log("no targetAvalible");
            return null;
        }
        console.log("self CMDs:");
        console.log(sprite.graphics.cmds);
        var renderSprite;
        renderSprite = RenderSprite.renders[sprite._renderType];
        console.log("renderSprite:", renderSprite);
        DebugTool._rSpList.length = 0;
        while (renderSprite && renderSprite["_sign"] > 0) {
            DebugTool._rSpList.push(DebugTool.cmdToTypeO[renderSprite["_sign"]]);
            renderSprite = renderSprite._next;
        }
        console.log("fun:", DebugTool._rSpList.join(","));
        DebugTool.counter.reset();
        DebugTool.addCMDs(sprite.graphics.cmds);
        DebugTool.counter.traceSelf();
        return DebugTool.counter.data;
    }
    static addCMDs(cmds) {
        WalkTools.walkArr(cmds, DebugTool.addCMD);
    }
    static addCMD(cmd) {
        DebugTool.counter.add(cmd.callee);
    }
    static traceCMDR(sprite = null) {
        if (!sprite)
            sprite = DebugTool.target;
        if (!sprite) {
            console.log("no targetAvalible");
            return 0;
        }
        DebugTool.counter.reset();
        WalkTools.walkTarget(sprite, DebugTool.getCMdCount);
        console.log("cmds include children");
        DebugTool.counter.traceSelf();
        return DebugTool.counter.data;
    }
    static getCMdCount(target) {
        if (!target)
            return 0;
        if (!(target instanceof Sprite))
            return 0;
        if (!target.graphics.cmds)
            return 0;
        DebugTool.addCMDs(target.graphics.cmds);
        var rst = target.graphics.cmds.length;
        return rst;
    }
    static addNodeInfo(node) {
        var type;
        type = node["constructor"].name;
        DebugTool.counter.add(type);
    }
    static find(filter, ifShowSelected = true) {
        var rst;
        rst = DebugTool.findTarget(Laya.stage, filter);
        DebugTool.selectedNodes = rst;
        if (DebugTool.selectedNodes) {
            DebugTool.target = DebugTool.selectedNodes[0];
        }
        if (ifShowSelected)
            DebugTool.showSelected();
        return rst;
    }
    static findByName(name) {
        DebugTool.nameFilter.name = name;
        return DebugTool.find(DebugTool.nameFilter);
    }
    static findNameStartWith(startStr) {
        DebugTool.nameFilter.name = DebugTool.getStartWithFun(startStr);
        return DebugTool.find(DebugTool.nameFilter);
    }
    static findNameHas(hasStr, showSelected = true) {
        DebugTool.nameFilter.name = DebugTool.getHasFun(hasStr);
        return DebugTool.find(DebugTool.nameFilter, showSelected);
    }
    static getStartWithFun(startStr) {
        var rst = function (str) {
            if (!str)
                return false;
            if (str.indexOf(startStr) == 0)
                return true;
            return false;
        };
        return rst;
    }
    static getHasFun(hasStr) {
        var rst = function (str) {
            if (!str)
                return false;
            if (str.indexOf(hasStr) >= 0)
                return true;
            return false;
        };
        return rst;
    }
    static findTarget(target, filter) {
        var rst = [];
        if (DebugTool.isFit(target, filter))
            rst.push(target);
        var i;
        var len;
        var tChild;
        len = target.numChildren;
        for (i = 0; i < len; i++) {
            tChild = target.getChildAt(i);
            if (tChild instanceof Sprite) {
                rst = rst.concat(DebugTool.findTarget(tChild, filter));
            }
        }
        return rst;
    }
    static findClassHas(target, str) {
        var rst = [];
        if (ClassTool.getClassName(target).indexOf(str) >= 0)
            rst.push(target);
        var i;
        var len;
        var tChild;
        len = target.numChildren;
        for (i = 0; i < len; i++) {
            tChild = target.getChildAt(i);
            if (tChild instanceof Sprite) {
                rst = rst.concat(DebugTool.findClassHas(tChild, str));
            }
        }
        return rst;
    }
    static isFit(tar, filter) {
        if (!tar)
            return false;
        if (!filter)
            return true;
        if (filter instanceof Function) {
            return filter(tar);
        }
        var key;
        for (key in filter) {
            if (filter[key] instanceof Function) {
                if (!filter[key](tar[key]))
                    return false;
            }
            else {
                if (tar[key] != filter[key])
                    return false;
            }
        }
        return true;
    }
    static log(...args) {
        var arr;
        arr = DTrace.getArgArr(args);
        if (DebugTool._logFun != null) {
            DebugTool._logFun(arr.join(" "));
        }
    }
    static export() {
        var _window;
        _window = window;
        ;
        var key;
        for (key in DebugTool._exportsDic) {
            _window[key] = DebugTool._exportsDic[key];
        }
    }
}
DebugTool.enableCacheAnalyse = false;
DebugTool.enableNodeCreateAnalyse = true;
DebugTool.text = new Stat();
DebugTool.selectedNodes = [];
DebugTool.autoShowSelected = true;
DebugTool._showBound = true;
DebugTool.autoTraceEnable = false;
DebugTool.autoTraceBounds = false;
DebugTool.autoTraceSize = false;
DebugTool.autoTraceTree = true;
DebugTool.autoTraceCMD = true;
DebugTool.autoTraceCMDR = false;
DebugTool.autoTraceSpriteInfo = true;
DebugTool.cmdToTypeO = {};
DebugTool._rSpList = [];
DebugTool.counter = new CountTool();
DebugTool.nameFilter = { "name": "name" };
DebugTool._exportsDic = {
    "DebugTool": DebugTool,
    "Watcher": Watcher
};
TraceTool._debugtrace = DebugTool.dTrace;
