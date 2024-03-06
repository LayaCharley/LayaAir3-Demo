import { NodeInfosItem } from "./NodeInfosItem";
import { Sprite } from "laya/display/Sprite";
import { IDTools } from "../../tools/IDTools";
export class NodeInfoPanel extends Sprite {
    constructor() {
        super();
        this._stateDic = {};
        this.isWorkState = false;
    }
    static init() {
        if (!NodeInfoPanel.I) {
            NodeInfoPanel.I = new NodeInfoPanel();
            NodeInfosItem.init();
        }
    }
    showDisInfo(node) {
        this.recoverNodes();
        NodeInfosItem.showDisInfos(node);
        this.showOnly(node);
        this.isWorkState = true;
    }
    showOnly(node) {
        if (!node)
            return;
        this.hideBrothers(node);
        this.showOnly(node.parent);
    }
    recoverNodes() {
        NodeInfosItem.hideAllInfos();
        var key;
        var data;
        var tTar;
        for (key in this._stateDic) {
            data = this._stateDic[key];
            tTar = data["target"];
            if (tTar) {
                try {
                    tTar.visible = data.visible;
                }
                catch (e) {
                }
            }
        }
        this.isWorkState = false;
    }
    hideOtherChain(node) {
        if (!node)
            return;
        while (node) {
            this.hideBrothers(node);
            node = node.parent;
        }
    }
    hideChilds(node) {
        if (!node)
            return;
        var i, len;
        var cList;
        cList = node._children;
        len = cList.length;
        var tChild;
        for (i = 0; i < len; i++) {
            tChild = cList[i];
            if (tChild == NodeInfosItem.NodeInfoContainer)
                continue;
            this.saveNodeInfo(tChild);
            tChild.visible = false;
        }
    }
    hideBrothers(node) {
        if (!node)
            return;
        var p;
        p = node.parent;
        if (!p)
            return;
        var i, len;
        var cList;
        cList = p._children;
        len = cList.length;
        var tChild;
        for (i = 0; i < len; i++) {
            tChild = cList[i];
            if (tChild == NodeInfosItem.NodeInfoContainer)
                continue;
            if (tChild != node) {
                this.saveNodeInfo(tChild);
                tChild.visible = false;
            }
        }
    }
    saveNodeInfo(node) {
        IDTools.idObj(node);
        if (this._stateDic.hasOwnProperty(IDTools.getObjID(node)))
            return;
        var data;
        data = {};
        data.target = node;
        data.visible = node.visible;
        this._stateDic[IDTools.getObjID(node)] = data;
    }
    recoverNodeInfo(node) {
        IDTools.idObj(node);
        if (this._stateDic.hasOwnProperty(IDTools.getObjID(node))) {
            var data;
            data = this._stateDic[IDTools.getObjID(node)];
            node["visible"] = data.visible;
        }
    }
}
