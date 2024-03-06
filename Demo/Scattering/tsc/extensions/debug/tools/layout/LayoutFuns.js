import { Layouter } from "./Layouter";
export class LayoutFuns {
    constructor() {
    }
    static sameWidth(totalWidth, items, data = null, sX = 0) {
        var dWidth = 0;
        if (data && data.dWidth)
            dWidth = data.dWidth;
        var perWidth;
        perWidth = (totalWidth - (items.length - 1) * dWidth) / items.length;
        var tItem;
        var i, len;
        var tX;
        tX = sX;
        len = items.length;
        for (i = 0; i < len; i++) {
            tItem = items[i];
            tItem.x = tX;
            tItem.width = perWidth;
            tX += dWidth + perWidth;
        }
    }
    static getSameWidthLayout(items, dWidth) {
        var data;
        data = {};
        data.dWidth = dWidth;
        return LayoutFuns.getLayouter(items, data, LayoutFuns.sameWidth);
    }
    static getLayouter(items, data, fun) {
        var layouter;
        layouter = new Layouter();
        layouter.items = items;
        layouter.data = data;
        layouter.layoutFun = fun;
        return layouter;
    }
    static sameDis(totalWidth, items, data = null, sX = 0) {
        var dWidth;
        dWidth = totalWidth;
        var tItem;
        var i, len;
        len = items.length;
        LayoutFuns.prepareForLayoutWidth(totalWidth, items);
        for (i = 0; i < len; i++) {
            tItem = items[i];
            dWidth -= tItem.width;
        }
        if (items.length > 1)
            dWidth = dWidth / (items.length - 1);
        var tX;
        tX = sX;
        len = items.length;
        for (i = 0; i < len; i++) {
            tItem = items[i];
            tItem.x = tX;
            tX += dWidth + tItem.width;
        }
    }
    static getSameDisLayout(items, rateSame = false) {
        var data;
        data = {};
        if (rateSame) {
            var i, len;
            len = items.length;
            var tItem;
            var totalWidth;
            totalWidth = 0;
            for (i = 0; i < len; i++) {
                tItem = items[i];
                totalWidth += tItem.width;
            }
            totalWidth = tItem.x + tItem.width;
            for (i = 0; i < len; i++) {
                tItem = items[i];
                LayoutFuns.setItemRate(tItem, tItem.width / totalWidth);
            }
        }
        return LayoutFuns.getLayouter(items, data, LayoutFuns.sameDis);
    }
    static fullFill(totalWidth, items, data = null, sX = 0) {
        var dL = 0, dR = 0;
        if (data) {
            if (data.dL)
                dL = data.dL;
            if (data.dR)
                dR = data.dR;
        }
        var item;
        var i, len;
        len = items.length;
        for (i = 0; i < len; i++) {
            item = items[i];
            item.x = sX + dL;
            item.width = totalWidth - dL - dR;
        }
    }
    static getFullFillLayout(items, dL = 0, dR = 0) {
        var data;
        data = {};
        data.dL = dL;
        data.dR = dR;
        return LayoutFuns.getLayouter(items, data, LayoutFuns.fullFill);
    }
    static fixPos(totalWidth, items, data = null, sX = 0) {
        var dLen = 0;
        var poss = [];
        var isRate = false;
        if (data) {
            if (data.dLen)
                dLen = data.dLen;
            if (data.poss)
                poss = data.poss;
            if (data.isRate)
                isRate = data.isRate;
        }
        var item;
        var i, len;
        len = poss.length;
        var tX;
        tX = sX;
        var tValue;
        var preItem;
        preItem = null;
        for (i = 0; i < len; i++) {
            item = items[i];
            tValue = sX + poss[i];
            if (isRate) {
                tValue = sX + poss[i] * totalWidth;
            }
            item.x = tValue;
            if (preItem) {
                preItem.width = item.x - dLen - preItem.x;
            }
            preItem = item;
        }
        var lastItem;
        lastItem = items[items.length - 1];
        lastItem.width = sX + totalWidth - dLen - lastItem.x;
    }
    static getFixPos(items, dLen = 0, isRate = false, poss = null) {
        var data;
        data = {};
        var layout;
        layout = LayoutFuns.getLayouter(items, data, LayoutFuns.fixPos);
        var i, len;
        var sX;
        var totalWidth;
        sX = layout.x;
        totalWidth = layout.width;
        if (!poss) {
            poss = [];
            len = items.length;
            var tValue;
            for (i = 0; i < len; i++) {
                tValue = items[i].x - sX;
                if (isRate) {
                    tValue = tValue / totalWidth;
                }
                else {
                }
                poss.push(tValue);
            }
        }
        data.dLen = dLen;
        data.poss = poss;
        data.isRate = isRate;
        return layout;
    }
    static clearItemsRelativeInfo(items) {
        var i, len;
        len = items.length;
        for (i = 0; i < len; i++) {
            LayoutFuns.clearItemRelativeInfo(items[i]);
        }
    }
    static clearItemRelativeInfo(item) {
        var Nan = "NaN";
        item.left = Nan;
        item.right = Nan;
    }
    static prepareForLayoutWidth(totalWidth, items) {
        var i, len;
        len = items.length;
        for (i = 0; i < len; i++) {
            LayoutFuns.prepareItemForLayoutWidth(totalWidth, items[i]);
        }
    }
    static getSumWidth(items) {
        var sum;
        sum = 0;
        var i, len;
        len = items.length;
        for (i = 0; i < len; i++) {
            sum += items[i].width;
        }
        return sum;
    }
    static prepareItemForLayoutWidth(totalWidth, item) {
        if (LayoutFuns.getItemRate(item) > 0) {
            item.width = totalWidth * LayoutFuns.getItemRate(item);
        }
    }
    static setItemRate(item, rate) {
        item[LayoutFuns.RateSign] = rate;
    }
    static getItemRate(item) {
        return item[LayoutFuns.RateSign] ? item[LayoutFuns.RateSign] : -1;
    }
    static setItemFreeSize(item, free = true) {
        item[LayoutFuns.FreeSizeSign] = free;
    }
    static isItemFreeSize(item) {
        return item[LayoutFuns.FreeSizeSign];
    }
    static lockedDis(totalWidth, items, data = null, sX = 0) {
        var dists;
        dists = data.dists;
        var sumDis;
        sumDis = data.sumDis;
        var sumWidth;
        var i, len;
        var tItem;
        var preItem;
        LayoutFuns.prepareForLayoutWidth(totalWidth, items);
        sumWidth = LayoutFuns.getSumWidth(items);
        var dWidth;
        dWidth = totalWidth - sumDis - sumWidth;
        var freeItem;
        freeItem = LayoutFuns.getFreeItem(items);
        if (freeItem) {
            freeItem.width += dWidth;
        }
        preItem = items[0];
        preItem.x = sX;
        len = items.length;
        for (i = 1; i < len; i++) {
            tItem = items[i];
            tItem.x = preItem.x + preItem.width + dists[i - 1];
            preItem = tItem;
        }
    }
    static getFreeItem(items) {
        var i, len;
        len = items.length;
        for (i = 0; i < len; i++) {
            if (LayoutFuns.isItemFreeSize(items[i])) {
                return items[i];
            }
        }
        return null;
    }
    static getLockedDis(items) {
        var data;
        data = {};
        var dists;
        var i, len;
        var tItem;
        var preItem;
        var sumDis;
        sumDis = 0;
        var tDis;
        preItem = items[0];
        dists = [];
        len = items.length;
        for (i = 1; i < len; i++) {
            tItem = items[i];
            tDis = tItem.x - preItem.x - preItem.width;
            dists.push(tDis);
            sumDis += tDis;
            preItem = tItem;
        }
        data.dists = dists;
        data.sumDis = sumDis;
        return LayoutFuns.getLayouter(items, data, LayoutFuns.lockedDis);
    }
}
LayoutFuns.RateSign = "layoutRate";
LayoutFuns.FreeSizeSign = "layoutFreeSize";
