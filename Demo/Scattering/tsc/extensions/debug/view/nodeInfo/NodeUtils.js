import { Laya } from "Laya";
import { DebugInfoLayer } from "./DebugInfoLayer";
import { ClassTool } from "../../tools/ClassTool";
import { RenderAnalyser } from "../../tools/RenderAnalyser";
import { StringTool } from "../../tools/StringTool";
import { WalkTools } from "../../tools/WalkTools";
import { Node } from "laya/display/Node";
import { GrahamScan } from "laya/maths/GrahamScan";
import { Sprite } from "laya/display/Sprite";
import { Point } from "laya/maths/Point";
import { Rectangle } from "laya/maths/Rectangle";
export class NodeUtils {
    constructor() {
    }
    static getFilterdTree(sprite, keys) {
        if (!keys)
            keys = NodeUtils.defaultKeys;
        var me;
        me = {};
        var key;
        var i, len;
        len = keys.length;
        for (i = 0; i < len; i++) {
            key = keys[i];
            me[key] = sprite[key];
        }
        var cList;
        var tChild;
        cList = sprite._children;
        len = cList.length;
        var mClist;
        mClist = [];
        for (i = 0; i < len; i++) {
            tChild = cList[i];
            mClist.push(NodeUtils.getFilterdTree(tChild, keys));
        }
        me.childs = mClist;
        return me;
    }
    static getNodeValue(node, key) {
        var rst;
        if (node instanceof Sprite) {
            var tNode;
            tNode = node;
            switch (key) {
                case "gRec":
                    rst = NodeUtils.getGRec(tNode).toString();
                    break;
                case "gAlpha":
                    rst = NodeUtils.getGAlpha(tNode) + "";
                    break;
                case "cmdCount":
                    rst = NodeUtils.getNodeCmdCount(tNode) + "";
                    break;
                case "cmdAll":
                    rst = NodeUtils.getNodeCmdTotalCount(tNode) + "";
                    break;
                case "nodeAll":
                    rst = "" + NodeUtils.getNodeCount(tNode);
                    break;
                case "nodeVisible":
                    rst = "" + NodeUtils.getNodeCount(tNode, true);
                    break;
                case "nodeRender":
                    rst = "" + NodeUtils.getRenderNodeCount(tNode);
                    break;
                case "nodeReCache":
                    rst = "" + NodeUtils.getReFreshRenderNodeCount(tNode);
                    break;
                case "renderCost":
                    rst = "" + RenderAnalyser.I.getTime(tNode);
                    break;
                case "renderCount":
                    rst = "" + RenderAnalyser.I.getCount(tNode);
                    break;
                default:
                    rst = node[key] + "";
            }
        }
        else {
            rst = node[key] + "";
        }
        return rst;
    }
    static getPropertyDesO(tValue, keys) {
        if (!keys)
            keys = NodeUtils.defaultKeys;
        var rst = {};
        if (typeof (tValue) == 'object') {
            rst.label = "" + ClassTool.getNodeClassAndName(tValue);
        }
        else {
            rst.label = "" + tValue;
        }
        rst.type = "";
        rst.path = tValue;
        rst.childs = [];
        rst.isDirectory = false;
        var key;
        var i, len;
        var tChild;
        if (tValue instanceof Node) {
            rst.des = ClassTool.getNodeClassAndName(tValue);
            rst.isDirectory = true;
            len = keys.length;
            for (i = 0; i < len; i++) {
                key = keys[i];
                tChild = NodeUtils.getPropertyDesO(tValue[key], keys);
                if (tValue.hasOwnProperty(key)) {
                    tChild.label = "" + key + ":" + tChild.des;
                }
                else {
                    tChild.label = "" + key + ":" + NodeUtils.getNodeValue(tValue, key);
                }
                rst.childs.push(tChild);
            }
            key = "_children";
            tChild = NodeUtils.getPropertyDesO(tValue[key], keys);
            tChild.label = "" + key + ":" + tChild.des;
            tChild.isChilds = true;
            rst.childs.push(tChild);
        }
        else if (tValue instanceof Array) {
            rst.des = "Array[" + tValue.length + "]";
            rst.isDirectory = true;
            var tList;
            tList = tValue;
            len = tList.length;
            for (i = 0; i < len; i++) {
                tChild = NodeUtils.getPropertyDesO(tList[i], keys);
                tChild.label = "" + i + ":" + tChild.des;
                rst.childs.push(tChild);
            }
        }
        else if (typeof (tValue) == 'object') {
            rst.des = ClassTool.getNodeClassAndName(tValue);
            rst.isDirectory = true;
            for (key in tValue) {
                tChild = NodeUtils.getPropertyDesO(tValue[key], keys);
                tChild.label = "" + key + ":" + tChild.des;
                rst.childs.push(tChild);
            }
        }
        else {
            rst.des = "" + tValue;
        }
        rst.hasChild = rst.childs.length > 0;
        return rst;
    }
    static adptShowKeys(keys) {
        var i, len;
        len = keys.length;
        for (i = len - 1; i >= 0; i--) {
            keys[i] = StringTool.trimSide(keys[i]);
            if (keys[i].length < 1) {
                keys.splice(i, 1);
            }
        }
        return keys;
    }
    static getNodeTreeData(sprite, keys) {
        NodeUtils.adptShowKeys(keys);
        var treeO;
        treeO = NodeUtils.getPropertyDesO(sprite, keys);
        var treeArr;
        treeArr = [];
        NodeUtils.getTreeArr(treeO, treeArr);
        return treeArr;
    }
    static getTreeArr(treeO, arr, add = true) {
        if (add)
            arr.push(treeO);
        var tArr = treeO.childs;
        var i, len = tArr.length;
        for (i = 0; i < len; i++) {
            if (!add) {
                tArr[i].nodeParent = null;
            }
            else {
                tArr[i].nodeParent = treeO;
            }
            if (tArr[i].isDirectory) {
                NodeUtils.getTreeArr(tArr[i], arr);
            }
            else {
                arr.push(tArr[i]);
            }
        }
    }
    static traceStage() {
        console.log(NodeUtils.getFilterdTree(Laya.stage, null));
        console.log("treeArr:", NodeUtils.getNodeTreeData(Laya.stage, null));
    }
    static getNodeCount(node, visibleRequire = false) {
        if (visibleRequire) {
            if (!node.visible)
                return 0;
        }
        var rst;
        rst = 1;
        var i, len;
        var cList;
        cList = node._children;
        len = cList.length;
        for (i = 0; i < len; i++) {
            rst += NodeUtils.getNodeCount(cList[i], visibleRequire);
        }
        return rst;
    }
    static getGVisible(node) {
        while (node) {
            if (!node.visible)
                return false;
            node = node.parent;
        }
        return true;
    }
    static getGAlpha(node) {
        var rst;
        rst = 1;
        while (node) {
            rst *= node.alpha;
            node = node.parent;
        }
        return rst;
    }
    static getGPos(node) {
        var point;
        point = new Point();
        node.localToGlobal(point);
        return point;
    }
    static getGRec(node) {
        var pointList;
        pointList = node._getBoundPointsM(true);
        if (!pointList || pointList.length < 1)
            return Rectangle.TEMP.setTo(0, 0, 0, 0);
        pointList = GrahamScan.pListToPointList(pointList, true);
        WalkTools.walkArr(pointList, node.localToGlobal, node);
        pointList = GrahamScan.pointListToPlist(pointList);
        var _disBoundRec;
        _disBoundRec = Rectangle._getWrapRec(pointList, _disBoundRec);
        return _disBoundRec;
    }
    static getGGraphicRec(node) {
        var pointList;
        pointList = node.getGraphicBounds()._getBoundPoints();
        if (!pointList || pointList.length < 1)
            return Rectangle.TEMP.setTo(0, 0, 0, 0);
        pointList = GrahamScan.pListToPointList(pointList, true);
        WalkTools.walkArr(pointList, node.localToGlobal, node);
        pointList = GrahamScan.pointListToPlist(pointList);
        var _disBoundRec;
        _disBoundRec = Rectangle._getWrapRec(pointList, _disBoundRec);
        return _disBoundRec;
    }
    static getNodeCmdCount(node) {
        var rst;
        if (node.graphics) {
            if (node.graphics.cmds) {
                rst = node.graphics.cmds.length;
            }
            else {
                if (node.graphics._one) {
                    rst = 1;
                }
                else {
                    rst = 0;
                }
            }
        }
        else {
            rst = 0;
        }
        return rst;
    }
    static getNodeCmdTotalCount(node) {
        var rst;
        var i, len;
        var cList;
        cList = node._children;
        len = cList.length;
        rst = NodeUtils.getNodeCmdCount(node);
        for (i = 0; i < len; i++) {
            rst += NodeUtils.getNodeCmdTotalCount(cList[i]);
        }
        return rst;
    }
    static getRenderNodeCount(node) {
        if (node.cacheAs != "none")
            return 1;
        var rst;
        var i, len;
        var cList;
        cList = node._children;
        len = cList.length;
        rst = 1;
        for (i = 0; i < len; i++) {
            rst += NodeUtils.getRenderNodeCount(cList[i]);
        }
        return rst;
    }
    static getReFreshRenderNodeCount(node) {
        var rst;
        var i, len;
        var cList;
        cList = node._children;
        len = cList.length;
        rst = 1;
        for (i = 0; i < len; i++) {
            rst += NodeUtils.getRenderNodeCount(cList[i]);
        }
        return rst;
    }
    static showCachedSpriteRecs() {
        NodeUtils.g = DebugInfoLayer.I.graphicLayer.graphics;
        NodeUtils.g.clear();
        WalkTools.walkTarget(Laya.stage, NodeUtils.drawCachedBounds, null);
    }
    static drawCachedBounds(sprite) {
        if (sprite.cacheAs == "none")
            return;
        if (DebugInfoLayer.I.isDebugItem(sprite))
            return;
        var rec;
        rec = NodeUtils.getGRec(sprite);
        NodeUtils.g.drawRect(rec.x, rec.y, rec.width, rec.height, null, "#0000ff", 2);
    }
}
NodeUtils.defaultKeys = ["x", "y", "width", "height"];
