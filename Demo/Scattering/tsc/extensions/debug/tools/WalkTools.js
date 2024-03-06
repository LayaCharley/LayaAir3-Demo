import { DisControlTool } from "./DisControlTool";
export class WalkTools {
    constructor() {
    }
    static walkTarget(target, fun, _this = null) {
        fun.apply(_this, [target]);
        var i;
        var len;
        var tChild;
        len = target.numChildren;
        for (i = 0; i < len; i++) {
            tChild = target.getChildAt(i);
            WalkTools.walkTarget(tChild, fun, tChild);
        }
    }
    static walkTargetEX(target, fun, _this = null, filterFun = null) {
        if (filterFun != null && !filterFun(target))
            return;
        fun.apply(_this, [target]);
        var i;
        var len;
        var tChild;
        var childs;
        childs = target._children;
        len = childs.length;
        for (i = 0; i < len; i++) {
            tChild = childs[i];
            WalkTools.walkTarget(tChild, fun, tChild);
        }
    }
    static walkChildren(target, fun, _this = null) {
        if (!target || target.numChildren < 1)
            return;
        WalkTools.walkArr(DisControlTool.getAllChild(target), fun, _this);
    }
    static walkArr(arr, fun, _this = null) {
        if (!arr)
            return;
        var i;
        var len;
        len = arr.length;
        for (i = 0; i < len; i++) {
            fun.apply(_this, [arr[i], i]);
        }
    }
}
