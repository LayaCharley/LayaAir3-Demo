import { Laya } from "Laya";
import { CanvasTools } from "./CanvasTools";
import { WalkTools } from "./WalkTools";
import { ClassTool } from "./ClassTool";
import { ColorTool } from "./ColorTool";
import { DebugInfoLayer } from "../view/nodeInfo/DebugInfoLayer";
import { NodeUtils } from "../view/nodeInfo/NodeUtils";
import { Rectangle } from "laya/maths/Rectangle";
export class VisibleAnalyser {
    constructor() {
    }
    static analyseTarget(node) {
        var isInstage;
        isInstage = node.displayedInStage;
        var gRec;
        gRec = NodeUtils.getGRec(node);
        var stageRec = new Rectangle();
        stageRec.setTo(0, 0, Laya.stage.width, Laya.stage.height);
        var isInVisibleRec;
        var visibleRec;
        visibleRec = stageRec.intersection(gRec);
        if (visibleRec.width > 0 && visibleRec.height > 0) {
            isInVisibleRec = true;
        }
        else {
            isInVisibleRec = false;
        }
        var gAlpha;
        gAlpha = NodeUtils.getGAlpha(node);
        var gVisible;
        gVisible = NodeUtils.getGVisible(node);
        var msg;
        msg = "";
        msg += "isInstage:" + isInstage + "\n";
        msg += "isInVisibleRec:" + isInVisibleRec + "\n";
        msg += "gVisible:" + gVisible + "\n";
        msg += "gAlpha:" + gAlpha + "\n";
        if (isInstage && isInVisibleRec && gVisible && gAlpha > 0) {
            VisibleAnalyser.anlyseRecVisible(node);
            msg += "coverRate:" + VisibleAnalyser.coverRate + "\n";
            if (VisibleAnalyser._coverList.length > 0) {
                Laya.timer.once(1000, null, VisibleAnalyser.showListLater);
            }
        }
        console.log(msg);
    }
    static showListLater() {
    }
    static isCoverByBrother(node) {
        var parent = node.parent;
        if (!parent)
            return;
        var _childs = parent._children;
        var index;
        index = _childs.indexOf(node);
        if (index < 0)
            return;
        var i, len;
        var canvas;
        var rec;
        rec = parent.getSelfBounds();
        if (rec.width <= 0 || rec.height <= 0)
            return;
    }
    static anlyseRecVisible(node) {
        VisibleAnalyser.isNodeWalked = false;
        VisibleAnalyser._analyseTarget = node;
        if (!VisibleAnalyser.mainCanvas)
            VisibleAnalyser.mainCanvas = CanvasTools.createCanvas(Laya.stage.width, Laya.stage.height);
        CanvasTools.clearCanvas(VisibleAnalyser.mainCanvas);
        VisibleAnalyser.tColor = 1;
        VisibleAnalyser.resetCoverList();
        WalkTools.walkTargetEX(Laya.stage, VisibleAnalyser.recVisibleWalker, null, VisibleAnalyser.filterFun);
        if (!VisibleAnalyser.isTarRecOK) {
            VisibleAnalyser.coverRate = 0;
        }
        else {
            VisibleAnalyser.coverRate = CanvasTools.getDifferRate(VisibleAnalyser.preImageData, VisibleAnalyser.tarImageData);
        }
        console.log("coverRate:", VisibleAnalyser.coverRate);
    }
    static getRecArea(rec) {
        return rec.width * rec.height;
    }
    static addCoverNode(node, coverRate) {
        var data;
        data = {};
        data.path = node;
        data.label = ClassTool.getNodeClassAndName(node) + ":" + coverRate;
        data.coverRate = coverRate;
        VisibleAnalyser._coverList.push(data);
        console.log("coverByNode:", node, coverRate);
    }
    static resetCoverList() {
        VisibleAnalyser._coverList.length = 0;
    }
    static recVisibleWalker(node) {
        if (node == VisibleAnalyser._analyseTarget) {
            VisibleAnalyser.isNodeWalked = true;
            VisibleAnalyser.tarRec.copyFrom(NodeUtils.getGRec(node));
            console.log("tarRec:", VisibleAnalyser.tarRec.toString());
            if (VisibleAnalyser.tarRec.width > 0 && VisibleAnalyser.tarRec.height > 0) {
                VisibleAnalyser.isTarRecOK = true;
                VisibleAnalyser.tColor++;
                CanvasTools.fillCanvasRec(VisibleAnalyser.mainCanvas, VisibleAnalyser.tarRec, ColorTool.toHexColor(VisibleAnalyser.tColor));
                VisibleAnalyser.preImageData = CanvasTools.getImageDataFromCanvasByRec(VisibleAnalyser.mainCanvas, VisibleAnalyser.tarRec);
                VisibleAnalyser.tarImageData = CanvasTools.getImageDataFromCanvasByRec(VisibleAnalyser.mainCanvas, VisibleAnalyser.tarRec);
            }
            else {
                console.log("tarRec Not OK:", VisibleAnalyser.tarRec);
            }
        }
        else {
            if (VisibleAnalyser.isTarRecOK) {
                var tRec;
                tRec = NodeUtils.getGRec(node);
                VisibleAnalyser.interRec = VisibleAnalyser.tarRec.intersection(tRec, VisibleAnalyser.interRec);
                if (VisibleAnalyser.interRec && VisibleAnalyser.interRec.width > 0 && VisibleAnalyser.interRec.height > 0) {
                    VisibleAnalyser.tColor++;
                    CanvasTools.fillCanvasRec(VisibleAnalyser.mainCanvas, tRec, ColorTool.toHexColor(VisibleAnalyser.tColor));
                    VisibleAnalyser.tImageData = CanvasTools.getImageDataFromCanvasByRec(VisibleAnalyser.mainCanvas, VisibleAnalyser.tarRec);
                    var dRate;
                    dRate = CanvasTools.getDifferRate(VisibleAnalyser.preImageData, VisibleAnalyser.tImageData);
                    VisibleAnalyser.preImageData = VisibleAnalyser.tImageData;
                    VisibleAnalyser.addCoverNode(node, dRate);
                }
            }
        }
    }
    static filterFun(node) {
        if (node.visible == false)
            return false;
        if (node.alpha < 0)
            return false;
        if (DebugInfoLayer.I.isDebugItem(node))
            return false;
        return true;
    }
}
VisibleAnalyser.tarRec = new Rectangle();
VisibleAnalyser.interRec = new Rectangle();
VisibleAnalyser._coverList = [];
