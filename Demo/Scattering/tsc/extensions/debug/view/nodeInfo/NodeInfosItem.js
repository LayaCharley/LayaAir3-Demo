import { DebugInfoLayer } from "./DebugInfoLayer";
import { Laya } from "Laya";
import { GrahamScan } from "laya/maths/GrahamScan";
import { Point } from "laya/maths/Point";
import { Pool } from "laya/utils/Pool";
import { ClassTool } from "../../tools/ClassTool";
import { DisControlTool } from "../../tools/DisControlTool";
import { IDTools } from "../../tools/IDTools";
import { WalkTools } from "../../tools/WalkTools";
import { Sprite } from "laya/display/Sprite";
import { Rectangle } from "laya/maths/Rectangle";
import { Text } from "laya/display/Text";
export class NodeInfosItem extends Sprite {
    constructor() {
        super();
        this._infoTxt = new Text();
        this._infoTxt.color = "#ff0000";
        this._infoTxt.bgColor = "#00ff00";
        this._infoTxt.fontSize = 12;
    }
    static init() {
        if (!NodeInfosItem.NodeInfoContainer) {
            DebugInfoLayer.init();
            NodeInfosItem.NodeInfoContainer = DebugInfoLayer.I;
            Laya.stage.addChild(NodeInfosItem.NodeInfoContainer);
        }
    }
    static getNodeInfoByNode(node) {
        IDTools.idObj(node);
        var key;
        key = IDTools.getObjID(node);
        if (!NodeInfosItem._nodeInfoDic[key]) {
            NodeInfosItem._nodeInfoDic[key] = new NodeInfosItem();
        }
        return NodeInfosItem._nodeInfoDic[key];
    }
    static hideAllInfos() {
        var key;
        var tInfo;
        for (key in NodeInfosItem._nodeInfoDic) {
            tInfo = NodeInfosItem._nodeInfoDic[key];
            tInfo.removeSelf();
        }
        NodeInfosItem.clearRelations();
    }
    removeSelf() {
        this._infoTxt.removeSelf();
        return super.removeSelf();
    }
    showToUI() {
        NodeInfosItem.NodeInfoContainer.nodeRecInfoLayer.addChild(this);
        this._infoTxt.removeSelf();
        NodeInfosItem.NodeInfoContainer.txtLayer.addChild(this._infoTxt);
        this.findOkPos();
    }
    randomAPos(r) {
        this._infoTxt.x = this.x + Laya.stage.width * Math.random();
        this._infoTxt.y = this.y + r * Math.random();
    }
    findOkPos() {
        var len;
        len = 20;
        this.randomAPos(len);
        return;
        var count;
        count = 1;
        while (!this.isPosOk()) {
            count++;
            if (count >= 500) {
                len += 10;
                count = 0;
            }
            this.randomAPos(len);
        }
    }
    isPosOk() {
        var tParent;
        tParent = NodeInfosItem.NodeInfoContainer.nodeRecInfoLayer;
        var i, len;
        var cList;
        cList = tParent._children;
        len = cList.length;
        var tChild;
        var mRec;
        mRec = this._infoTxt.getBounds();
        if (mRec.x < 0)
            return false;
        if (mRec.y < 0)
            return false;
        if (mRec.right > Laya.stage.width)
            return false;
        for (i = 0; i < len; i++) {
            tChild = cList[i];
            if (tChild == this._infoTxt)
                continue;
            if (mRec.intersects(tChild.getBounds()))
                return false;
        }
        return true;
    }
    static showNodeInfo(node) {
        var nodeInfo;
        nodeInfo = NodeInfosItem.getNodeInfoByNode(node);
        nodeInfo.showInfo(node);
        nodeInfo.showToUI();
    }
    static showDisInfos(node) {
        var _node;
        _node = node;
        if (!node)
            return;
        while (node) {
            NodeInfosItem.showNodeInfo(node);
            node = node.parent;
        }
        DisControlTool.setTop(NodeInfosItem.NodeInfoContainer);
        NodeInfosItem.apdtTxtInfoPoss(_node);
        NodeInfosItem.updateRelations();
    }
    static apdtTxtInfoPoss(node) {
        var disList;
        disList = [];
        while (node) {
            disList.push(node);
            node = node.parent;
        }
        var i, len;
        var tInfo;
        var tTxt;
        len = disList.length;
        var xPos;
        xPos = Laya.stage.width - 150;
        var heightLen;
        heightLen = 100;
        node = disList[0];
        if (node) {
            tInfo = NodeInfosItem.getNodeInfoByNode(node);
            if (tInfo) {
                tTxt = tInfo._infoTxt;
                xPos = Laya.stage.width - tTxt.width - 10;
                heightLen = tTxt.height + 10;
            }
        }
        disList = disList.reverse();
        for (i = 0; i < len; i++) {
            node = disList[i];
            tInfo = NodeInfosItem.getNodeInfoByNode(node);
            if (tInfo) {
                tTxt = tInfo._infoTxt;
                tTxt.pos(xPos, heightLen * i);
            }
        }
    }
    static clearRelations() {
        var g;
        g = NodeInfosItem.NodeInfoContainer.lineLayer.graphics;
        g.clear();
    }
    static updateRelations() {
        var g;
        g = NodeInfosItem.NodeInfoContainer.lineLayer.graphics;
        g.clear();
        var key;
        var tInfo;
        for (key in NodeInfosItem._nodeInfoDic) {
            tInfo = NodeInfosItem._nodeInfoDic[key];
            if (tInfo.parent) {
                g.drawLine(tInfo.x, tInfo.y, tInfo._infoTxt.x, tInfo._infoTxt.y, "#0000ff");
            }
        }
    }
    static getNodeValue(node, key) {
        var rst;
        NodeInfosItem._nodePoint.setTo(0, 0);
        switch (key) {
            case "x":
                rst = node["x"] + " (g:" + node.localToGlobal(NodeInfosItem._nodePoint).x + ")";
                break;
            case "y":
                rst = node["y"] + " (g:" + node.localToGlobal(NodeInfosItem._nodePoint).y + ")";
                break;
            default:
                rst = node[key];
        }
        return rst;
    }
    showInfo(node) {
        this._tar = node;
        if (!node)
            return;
        NodeInfosItem._txts.length = 0;
        var i, len;
        var tKey;
        len = NodeInfosItem.showValues.length;
        if (node.name) {
            NodeInfosItem._txts.push(ClassTool.getClassName(node) + "(" + node.name + ")");
        }
        else {
            NodeInfosItem._txts.push(ClassTool.getClassName(node));
        }
        for (i = 0; i < len; i++) {
            tKey = NodeInfosItem.showValues[i];
            NodeInfosItem._txts.push(tKey + ":" + NodeInfosItem.getNodeValue(node, tKey));
        }
        this._infoTxt.text = NodeInfosItem._txts.join("\n");
        this.graphics.clear();
        var pointList;
        pointList = node._getBoundPointsM(true);
        if (!pointList || pointList.length < 1)
            return;
        pointList = GrahamScan.pListToPointList(pointList, true);
        WalkTools.walkArr(pointList, node.localToGlobal, node);
        pointList = GrahamScan.pointListToPlist(pointList);
        NodeInfosItem._disBoundRec = Rectangle._getWrapRec(pointList, NodeInfosItem._disBoundRec);
        this.graphics.drawRect(0, 0, NodeInfosItem._disBoundRec.width, NodeInfosItem._disBoundRec.height, null, "#00ffff");
        this.pos(NodeInfosItem._disBoundRec.x, NodeInfosItem._disBoundRec.y);
    }
    fresh() {
        this.showInfo(this._tar);
    }
    clearMe() {
        this._tar = null;
    }
    recover() {
        Pool.recover("NodeInfosItem", this);
    }
}
NodeInfosItem.showValues = ["x", "y", "scaleX", "scaleY", "width", "height", "visible", "mouseEnabled"];
NodeInfosItem._nodeInfoDic = {};
NodeInfosItem._disBoundRec = new Rectangle();
NodeInfosItem._txts = [];
NodeInfosItem._nodePoint = new Point();
