import { DebugConsts } from "../../../tools/DebugConsts";
import { Sprite } from "laya/display/Sprite";
import { Text } from "laya/display/Text";
import { GrahamScan } from "laya/maths/GrahamScan";
import { Rectangle } from "laya/maths/Rectangle";
import { WalkTools } from "../../../tools/WalkTools";
export class NodeRecInfo extends Sprite {
    constructor() {
        super();
        this.recColor = "#00ff00";
        this.txt = new Text();
        this.txt.color = "#ff0000";
        this.txt.bgColor = "#00ff00";
        this.txt.fontSize = 12;
        this.addChild(this.txt);
    }
    setInfo(str) {
        this.txt.text = str;
    }
    setTarget(tar) {
        this._tar = tar;
    }
    showInfo(node) {
        this._tar = node;
        if (!node)
            return;
        if (node.destroyed)
            return;
        this.graphics.clear();
        var pointList;
        pointList = node._getBoundPointsM(true);
        if (!pointList || pointList.length < 1)
            return;
        pointList = GrahamScan.pListToPointList(pointList, true);
        WalkTools.walkArr(pointList, node.localToGlobal, node);
        pointList = GrahamScan.pointListToPlist(pointList);
        NodeRecInfo._disBoundRec = Rectangle._getWrapRec(pointList, NodeRecInfo._disBoundRec);
        this.graphics.drawRect(0, 0, NodeRecInfo._disBoundRec.width, NodeRecInfo._disBoundRec.height, null, DebugConsts.RECACHE_REC_COLOR, 2);
        this.pos(NodeRecInfo._disBoundRec.x, NodeRecInfo._disBoundRec.y);
    }
    fresh() {
        this.showInfo(this._tar);
    }
    clearMe() {
        this._tar = null;
    }
}
NodeRecInfo._disBoundRec = new Rectangle();
