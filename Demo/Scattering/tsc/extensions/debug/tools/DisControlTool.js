import { Laya } from "Laya";
import { Sprite } from "laya/display/Sprite";
import { Event } from "laya/events/Event";
import { Point } from "laya/maths/Point";
import { SimpleResizer } from "./resizer/SimpleResizer";
export class DisControlTool {
    constructor() {
    }
    static getObjectsUnderPoint(sprite, x, y, rst = null, filterFun = null) {
        rst = rst ? rst : [];
        if (filterFun != null && !filterFun(sprite))
            return rst;
        if (sprite.getBounds().contains(x, y)) {
            rst.push(sprite);
            var tS;
            var tempP = new Point();
            tempP.setTo(x, y);
            tempP = sprite.fromParentPoint(tempP);
            x = tempP.x;
            y = tempP.y;
            for (var i = sprite._children.length - 1; i > -1; i--) {
                var child = sprite._children[i];
                if (child instanceof Sprite)
                    DisControlTool.getObjectsUnderPoint(child, x, y, rst, filterFun);
            }
        }
        return rst;
    }
    static getObjectsUnderGlobalPoint(sprite, filterFun = null) {
        var point = new Point();
        point.setTo(Laya.stage.mouseX, Laya.stage.mouseY);
        if (sprite.parent)
            point = sprite.parent.globalToLocal(point);
        return DisControlTool.getObjectsUnderPoint(sprite, point.x, point.y, null, filterFun);
    }
    static findFirstObjectsUnderGlobalPoint() {
        var disList;
        disList = DisControlTool.getObjectsUnderGlobalPoint(Laya.stage);
        if (!disList)
            return null;
        var i, len;
        var tDis;
        len = disList.length;
        for (i = len - 1; i >= 0; i--) {
            tDis = disList[i];
            if (tDis && tDis.numChildren < 1) {
                return tDis;
            }
        }
        return tDis;
    }
    static visibleAndEnableObjFun(tar) {
        return tar.visible && tar.mouseEnabled;
    }
    static visibleObjFun(tar) {
        return tar.visible;
    }
    static getMousePoint(sprite) {
        var point = new Point();
        point.setTo(Laya.stage.mouseX, Laya.stage.mouseY);
        point = sprite.globalToLocal(point);
        return point;
    }
    static isChildE(parent, child) {
        if (!parent)
            return false;
        while (child) {
            if (child.parent == parent)
                return true;
            child = child.parent;
        }
        return false;
    }
    static isInTree(pNode, child) {
        return pNode == child || DisControlTool.isChildE(pNode, child);
    }
    static setTop(tar) {
        if (tar && tar.parent) {
            var tParent;
            tParent = tar.parent;
            tParent.setChildIndex(tar, tParent.numChildren - 1);
        }
    }
    static clearItemRelativeInfo(item) {
        var Nan = "NaN";
        item.getLayout().left = Nan;
        item.getLayout().right = Nan;
        item.getLayout().top = Nan;
        item.getLayout().bottom = Nan;
    }
    static swap(tarA, tarB) {
        if (tarA == tarB)
            return;
        var iA;
        iA = tarA.parent.getChildIndex(tarA);
        var iB;
        iB = tarB.parent.getChildIndex(tarB);
        var bP;
        bP = tarB.parent;
        tarA.parent.addChildAt(tarB, iA);
        bP.addChildAt(tarA, iB);
    }
    static insertToTarParent(tarA, tars, after = false) {
        var tIndex;
        var parent;
        if (!tarA)
            return;
        parent = tarA.parent;
        if (!parent)
            return;
        tIndex = parent.getChildIndex(tarA);
        if (after)
            tIndex++;
        DisControlTool.insertToParent(parent, tars, tIndex);
    }
    static insertToParent(parent, tars, index = -1) {
        if (!parent)
            return;
        if (index < 0)
            index = parent.numChildren;
        var i, len;
        len = tars.length;
        for (i = 0; i < len; i++) {
            DisControlTool.transParent(tars[i], parent);
            parent.addChildAt(tars[i], index);
        }
    }
    static transParent(tar, newParent) {
        if (!tar || !newParent)
            return;
        if (!tar.parent)
            return;
        var preParent;
        preParent = tar.parent;
        var pos;
        pos = new Point(tar.x, tar.y);
        pos = preParent.localToGlobal(pos);
        pos = newParent.globalToLocal(pos);
        tar.pos(pos.x, pos.y);
    }
    static transPoint(nowParent, tarParent, point) {
        point = nowParent.localToGlobal(point);
        point = tarParent.globalToLocal(point);
        return point;
    }
    static removeItems(itemList) {
        var i, len;
        len = itemList.length;
        for (i = 0; i < len; i++) {
            itemList[i].removeSelf();
        }
    }
    static addItems(itemList, parent) {
        var i, len;
        len = itemList.length;
        for (i = 0; i < len; i++) {
            parent.addChild(itemList[i]);
        }
    }
    static getAllChild(tar) {
        if (!tar)
            return [];
        var i;
        var len;
        var rst = [];
        len = tar.numChildren;
        for (i = 0; i < len; i++) {
            rst.push(tar.getChildAt(i));
        }
        return rst;
    }
    static upDis(child) {
        if (child && child.parent) {
            var tParent;
            tParent = child.parent;
            var newIndex;
            newIndex = tParent.getChildIndex(child) + 1;
            if (newIndex >= tParent.numChildren) {
                newIndex = tParent.numChildren - 1;
            }
            console.log("setChildIndex:" + newIndex);
            tParent.setChildIndex(child, newIndex);
        }
    }
    static downDis(child) {
        if (child && child.parent) {
            var tParent;
            tParent = child.parent;
            var newIndex;
            newIndex = tParent.getChildIndex(child) - 1;
            if (newIndex < 0)
                newIndex = 0;
            console.log("setChildIndex:" + newIndex);
            tParent.setChildIndex(child, newIndex);
        }
    }
    static setResizeAbleEx(node) {
        var clickItem;
        clickItem = node.getChildByName("resizeBtn");
        if (clickItem) {
            SimpleResizer.setResizeAble(clickItem, node);
        }
    }
    static setResizeAble(node) {
        node.on(Event.CLICK, null, DisControlTool.resizeHandler, [node]);
    }
    static setDragingItem(dragBar, tar) {
        dragBar.on(Event.MOUSE_DOWN, null, DisControlTool.dragingHandler, [tar]);
        tar.on(Event.DRAG_END, null, DisControlTool.dragingEnd, [tar]);
    }
    static dragingHandler(tar) {
        if (tar) {
            tar.startDrag();
        }
    }
    static dragingEnd(tar) {
        DisControlTool.intFyDisPos(tar);
        console.log(tar.x, tar.y);
    }
    static showToStage(dis, offX = 0, offY = 0) {
        var rec = dis.getBounds();
        dis.x = Laya.stage.mouseX + offX;
        dis.y = Laya.stage.mouseY + offY;
        if (dis.x + rec.width > Laya.stage.width) {
            dis.x -= rec.width + offX;
        }
        if (dis.y + rec.height > Laya.stage.height) {
            dis.y -= rec.height + offY;
        }
        DisControlTool.intFyDisPos(dis);
    }
    static intFyDisPos(dis) {
        if (!dis)
            return;
        dis.x = Math.round(dis.x);
        dis.y = Math.round(dis.y);
    }
    static showOnly(disList, showItem) {
        var i, len;
        len = disList.length;
        for (i = 0; i < len; i++) {
            disList[i].visible = disList[i] == showItem;
        }
    }
    static showOnlyByIndex(disList, index) {
        DisControlTool.showOnly(disList, disList[index]);
    }
    static addOnly(disList, showItem, parent) {
        var i, len;
        len = disList.length;
        for (i = 0; i < len; i++) {
            if (disList[i] != showItem) {
                disList[i].removeSelf();
            }
            else {
                parent.addChild(disList[i]);
            }
        }
    }
    static addOnlyByIndex(disList, index, parent) {
        DisControlTool.addOnly(disList, disList[index], parent);
    }
}
DisControlTool.tempP = new Point();
