import { Laya } from "Laya";
import { Sprite } from "laya/display/Sprite";
import { Byte } from "laya/utils/Byte";
import { Stat } from "laya/utils/Stat";
import ProfileHelper from "./ProfileHelper";
export class PerformanceDataTool {
    constructor() {
        this._enable = false;
        this._AllPathMap = {};
        this._pathColor = {};
        this._pathCount = 0;
        this._runtimeShowPathIndex = -1;
        this._nodeList = [];
        this.samplerFramStep = 6;
        this._memoryDataMap = {};
        this.pointArray = [];
        this.fpsArray = [];
    }
    static InitLayaPerformanceInfo() {
        PerformanceDataTool.instance.InitLayaPerformanceInfo();
    }
    InitLayaPerformanceInfo() {
        this.setPathDataColor(PerformanceDataTool.PERFORMANCE_LAYA_2D, [255, 128, 128, 255]);
        this.setPathDataColor(PerformanceDataTool.PERFORMANCE_LAYA_3D, [255, 255, 128, 255]);
        this.setPathDataColor(PerformanceDataTool.PERFORMANCE_LAYA_3D_RENDER, [128, 255, 128, 255]);
        this.setPathDataColor(PerformanceDataTool.PERFORMANCE_LAYA_3D_UPDATESCRIPT, [128, 255, 255, 255]);
        this.setPathDataColor(PerformanceDataTool.PERFORMANCE_LAYA_3D_PHYSICS, [0, 128, 255, 255]);
        this.setPathDataColor(PerformanceDataTool.PERFORMANCE_LAYA_3D_PHYSICS_SIMULATE, [255, 0, 0, 255]);
        this.setPathDataColor(PerformanceDataTool.PERFORMANCE_LAYA_3D_PHYSICS_CHARACTORCOLLISION, [255, 128, 0, 255]);
        this.setPathDataColor(PerformanceDataTool.PERFORMANCE_LAYA_3D_PHYSICS_EVENTSCRIPTS, [128, 0, 0, 255]);
        this.setPathDataColor(PerformanceDataTool.PERFORMANCE_LAYA_3D_RENDER, [64, 128, 128, 255]);
        this.setPathDataColor(PerformanceDataTool.PERFORMANCE_LAYA_3D_RENDER_SHADOWMAP, [192, 192, 192, 255]);
        this.setPathDataColor(PerformanceDataTool.PERFORMANCE_LAYA_3D_RENDER_CLUSTER, [128, 64, 64, 255]);
        this.setPathDataColor(PerformanceDataTool.PERFORMANCE_LAYA_3D_RENDER_CULLING, [0, 64, 128, 255]);
        this.setPathDataColor(PerformanceDataTool.PERFORMANCE_LAYA_3D_RENDER_RENDERDEPTHMDOE, [128, 0, 64, 255]);
        this.setPathDataColor(PerformanceDataTool.PERFORMANCE_LAYA_3D_RENDER_RENDEROPAQUE, [128, 0, 255, 255]);
        this.setPathDataColor(PerformanceDataTool.PERFORMANCE_LAYA_3D_RENDER_RENDERCOMMANDBUFFER, [128, 128, 64, 255]);
        this.setPathDataColor(PerformanceDataTool.PERFORMANCE_LAYA_3D_RENDER_RENDERTRANSPARENT, [128, 0, 255, 255]);
        this.setPathDataColor(PerformanceDataTool.PERFORMANCE_LAYA_3D_RENDER_POSTPROCESS, [0, 255, 0, 255]);
    }
    set enable(value) {
        if (value) {
            this._startFram = Stat.loopCount;
            this.resetReCordData();
            this._sp = new Sprite();
            this._sp.pos(0, 400).zOrder = 99;
            Laya.stage.addChild(this._sp);
        }
        else {
            Laya.stage.removeChild(this._sp);
        }
        this._enable = value;
    }
    get enable() {
        return this._enable;
    }
    get enableDataExport() {
        return this._enableDataExport;
    }
    set enableDataExport(value) {
        if (value) {
            ProfileHelper.init('player', this);
            ProfileHelper.enable = value;
            this.samplerFramStep = 1;
        }
        else {
            ProfileHelper.enable = value;
        }
        this._enableDataExport = value;
    }
    static setDataExportHost(host) {
        ProfileHelper.Host = host;
    }
    set runtimeShowPath(path) {
        let showPathIndex = this._AllPathMap[path];
        for (let i in this.pointArray) {
            delete this.pointArray[i];
            delete PerformanceDataTool.stepLengthArrayMap[i];
        }
        if (showPathIndex != null)
            this._runtimeShowPathIndex = showPathIndex;
        else
            this._runtimeShowPathIndex = -1;
    }
    getNodePathIndex(path) {
        var id;
        if (this._AllPathMap[path] != null)
            id = this._AllPathMap[path];
        else {
            id = this._pathCount++;
            this._AllPathMap[path] = id;
            ProfileHelper.sendConfigData(this.getPathInfo());
        }
        return id;
    }
    getPathInfo() {
        let pathInfo = {};
        if (Object.keys(this._pathColor).length == 0) {
            this.InitLayaPerformanceInfo();
        }
        pathInfo["_pathColor"] = this._pathColor;
        pathInfo["_AllPathMap"] = this._AllPathMap;
        return pathInfo;
    }
    exportPerformanceFile(fromProfiler = false) {
        PerformanceDataTool.InitLayaPerformanceInfo();
        if (!fromProfiler) {
            this.enable = false;
        }
        let blockstr = [];
        let blockStart = [];
        let blocklength = [];
        let tempNum = 0;
        let blockStartPos;
        let tempStartPos;
        let tempEndPos;
        let dataByte = new Byte();
        dataByte.pos = 0;
        dataByte.writeUTFString(PerformanceDataTool.VERSION);
        blockstr.push("DataInfo01", "Color", "NodeInfo");
        dataByte.writeUint16(blockstr.length);
        for (let i = 0; i < blockstr.length; i++) {
            dataByte.writeUTFString(blockstr[i]);
        }
        blockStart.length = blockstr.length;
        blocklength.length = blockstr.length;
        blockStartPos = dataByte.pos;
        for (let i = 0; i < blockstr.length; i++) {
            dataByte.writeInt32(0);
            dataByte.writeInt32(0);
        }
        blockStart[0] = dataByte.pos;
        dataByte.writeInt32(this._nodeList.length);
        dataByte.writeInt32(this.samplerFramStep);
        dataByte.writeInt32(this._pathCount);
        for (let j in this._AllPathMap) {
            dataByte.writeUTFString(j);
        }
        tempStartPos = dataByte.pos;
        dataByte.writeInt32(0);
        for (let k in this._memoryDataMap) {
            dataByte.writeUTFString(k);
            tempNum++;
        }
        tempEndPos = dataByte.pos;
        dataByte.pos = tempStartPos;
        dataByte.writeInt32(tempNum);
        dataByte.pos = tempEndPos;
        blocklength[0] = dataByte.pos - blockStart[0];
        blockStart[1] = dataByte.pos;
        tempStartPos = dataByte.pos;
        tempNum = 0;
        dataByte.writeInt32(0);
        for (let l in this._pathColor) {
            var vec4 = this._pathColor[l];
            dataByte.writeUTFString(l);
            dataByte.writeUint32(vec4[0]);
            dataByte.writeUint32(vec4[1]);
            dataByte.writeUint32(vec4[2]);
            dataByte.writeUint32(vec4[3]);
            tempNum++;
        }
        tempEndPos = dataByte.pos;
        dataByte.pos = tempStartPos;
        dataByte.writeInt32(tempNum);
        dataByte.pos = tempEndPos;
        blocklength[1] = dataByte.pos - blockStart[1];
        blockStart[2] = dataByte.pos;
        for (let n = 0; n < this._nodeList.length; n++) {
            let node = this._nodeList[n];
            dataByte.writeInt32(node.nodeNum);
            for (var ii = 0; ii < node.nodeNum; ii++) {
                dataByte.writeFloat32(node.nodeDelty[ii] ? node.nodeDelty[ii] : 0);
            }
        }
        blocklength[2] = dataByte.pos - blockStart[2];
        dataByte.pos = blockStartPos;
        for (let v = 0; v < blockstr.length; v++) {
            dataByte.writeInt32(blockStart[v]);
            dataByte.writeInt32(blocklength[v]);
        }
        return dataByte;
    }
    BegainSample(samplePath) {
        if (!this.enable)
            return;
        this.update();
        this._runtimeNode.getFunStart(this.getNodePathIndex(samplePath));
    }
    EndSample(samplePath) {
        if (!this.enable)
            return 0;
        return this._runtimeNode.getFunEnd(this.getNodePathIndex(samplePath));
    }
    AddMemory(memoryPath, size) {
        this._memoryDataMap[memoryPath] = this._memoryDataMap[memoryPath] ? (this._memoryDataMap[memoryPath] + size) : size;
    }
    setPathDataColor(path, color) {
        this._pathColor[path] = color;
    }
    resetReCordData() {
        this._nodeList.forEach(element => {
            PerforManceNode.revert(element);
        });
        this._nodeList = [];
        this._runtimeNode = null;
        this._AllPathMap = {};
        this._memoryDataMap = {};
        this._pathColor = {};
        this._pathCount = 0;
    }
    exportFrontNode(ob, pathIndex) {
        if (!ob || !ob.nodeDelty || pathIndex == -1) {
            return;
        }
        const width = PerformanceDataTool.DrawWidth;
        const height = PerformanceDataTool.DrawHeight;
        const stepLength = PerformanceDataTool.StepLength;
        const fullStepTime = 33;
        const bgColor = "rgba(150, 150, 150, 0.8)";
        let array, value, percent;
        this._sp.graphics.clear();
        this._sp.graphics.drawRect(0, 0, width, height, bgColor);
        for (let i = 0, len = ob.nodeDelty.length; i < len; i++) {
            if (i != pathIndex && i != this.getNodePathIndex(PerformanceDataTool.PERFORMANCE_DELTYTIME)) {
                continue;
            }
            value = ob.nodeDelty[i];
            percent = value / fullStepTime;
            if (!this.pointArray[i]) {
                this.pointArray[i] = [];
            }
            array = this.pointArray[i];
            if (array.length >= stepLength) {
                array.shift();
            }
            array.push(percent);
            let color = i.toString(16);
            let fillColor = `#${color}${color}C4${color}${color}`;
            if (i == this.getNodePathIndex(PerformanceDataTool.PERFORMANCE_DELTYTIME)) {
                fillColor = "#FFFFFF";
            }
            if (!PerformanceDataTool.stepLengthArrayMap[i]) {
                PerformanceDataTool.stepLengthArrayMap[i] = new Array(PerformanceDataTool.StepLength * 2);
            }
            this.updatelineChart(width, height, stepLength, array, fillColor, 1, PerformanceDataTool.stepLengthArrayMap[i]);
        }
        this._sp.graphics.drawLine(0, height / 2, width, height / 2, "green", 1);
        this._sp.graphics.drawLine(0, height / 4 * 3, width, height / 4 * 3, "red", 1);
    }
    updatelineChart(width, height, stepLength, array, fillColor, style, drawArray) {
        switch (style) {
            case 1:
                let copy = drawArray;
                for (let i = 0, len = array.length; i < len; i++) {
                    copy[i * 2] = width / stepLength * i;
                    copy[i * 2 + 1] = Math.max(height - array[i] * height / this.samplerFramStep, 0);
                }
                this._sp.graphics.drawLines(0, 0, copy, fillColor, 1);
                break;
            case 2:
                let widthStep = width / stepLength;
                for (let i = 0, len = array.length; i < len; i++) {
                    this._sp.graphics.drawRect(width / stepLength * i, height, widthStep, -Math.min(array[i] * height, height), fillColor);
                }
        }
    }
    update() {
        let currentFrame = Stat.loopCount;
        let nodelenth = ((currentFrame - this._startFram) / this.samplerFramStep) | 0;
        if (!nodelenth) {
            this._runtimeNode = PerforManceNode.create(this._pathCount);
            this._runtimeNode.nodeDelty[this.getNodePathIndex(PerformanceDataTool.PERFORMANCE_STARTTIME)] = performance.now();
            return;
        }
        if (nodelenth != this._nodeList.length) {
            for (let i in this._memoryDataMap) {
                this._runtimeNode.setMemory(this.getNodePathIndex(i), this._memoryDataMap[i]);
            }
            if (this._runtimeNode) {
                this._runtimeNode.nodeDelty[this.getNodePathIndex(PerformanceDataTool.PERFORMANCE_DELTYTIME)] = performance.now() - this._runtimeNode.nodeDelty[this.getNodePathIndex(PerformanceDataTool.PERFORMANCE_STARTTIME)];
                this.exportFrontNode(this._runtimeNode, this._runtimeShowPathIndex);
                ProfileHelper.sendFramData(this._runtimeNode);
            }
            this._runtimeNode = PerforManceNode.create(this._pathCount);
            this._runtimeNode.nodeDelty[this.getNodePathIndex(PerformanceDataTool.PERFORMANCE_STARTTIME)] = performance.now();
            this._nodeList.push(this._runtimeNode);
        }
    }
    static showMemoryData(memoryPath) {
    }
    static showFunSampleGroup(groupPath) {
    }
    showFunSampleFun(samplePath) {
        this.runtimeShowPath = samplePath;
    }
}
PerformanceDataTool.VERSION = "PERFORMANCEDATA:01";
PerformanceDataTool.instance = new PerformanceDataTool();
PerformanceDataTool.PERFORMANCE_DELTYTIME = "deltyTime";
PerformanceDataTool.PERFORMANCE_STARTTIME = "startTime";
PerformanceDataTool.PERFORMANCE_LAYA = "Laya";
PerformanceDataTool.PERFORMANCE_LAYA_3D = "Laya/3D";
PerformanceDataTool.PERFORMANCE_LAYA_2D = "Laya/2D";
PerformanceDataTool.PERFORMANCE_LAYA_3D_PRERENDER = "Laya/3D/PreRender";
PerformanceDataTool.PERFORMANCE_LAYA_3D_UPDATESCRIPT = "Laya/3D/UpdateScript";
PerformanceDataTool.PERFORMANCE_LAYA_3D_PHYSICS = "Laya/3D/Physics";
PerformanceDataTool.PERFORMANCE_LAYA_3D_PHYSICS_SIMULATE = "Laya/3D/Physics/simulate";
PerformanceDataTool.PERFORMANCE_LAYA_3D_PHYSICS_CHARACTORCOLLISION = "Laya/3D/Physics/updataCharacters&Collisions";
PerformanceDataTool.PERFORMANCE_LAYA_3D_PHYSICS_EVENTSCRIPTS = "Laya/3D/Physics/eventScripts";
PerformanceDataTool.PERFORMANCE_LAYA_3D_RENDER = "Laya/3D/Render";
PerformanceDataTool.PERFORMANCE_LAYA_3D_RENDER_SHADOWMAP = "Laya/3D/Render/ShadowMap";
PerformanceDataTool.PERFORMANCE_LAYA_3D_RENDER_CLUSTER = "Laya/3D/Render/Cluster";
PerformanceDataTool.PERFORMANCE_LAYA_3D_RENDER_CULLING = "Laya/3D/Render/Culling";
PerformanceDataTool.PERFORMANCE_LAYA_3D_RENDER_RENDERDEPTHMDOE = "Laya/3D/Render/RenderDepthMode";
PerformanceDataTool.PERFORMANCE_LAYA_3D_RENDER_RENDEROPAQUE = "Laya/3D/Render/RenderOpaque";
PerformanceDataTool.PERFORMANCE_LAYA_3D_RENDER_RENDERCOMMANDBUFFER = "Laya/3D/Render/RenderCommandBuffer";
PerformanceDataTool.PERFORMANCE_LAYA_3D_RENDER_RENDERTRANSPARENT = "Laya/3D/Render/RenderTransparent";
PerformanceDataTool.PERFORMANCE_LAYA_3D_RENDER_POSTPROCESS = "Laya/3D/Render/PostProcess";
PerformanceDataTool._surpport = false;
PerformanceDataTool.DrawWidth = 250;
PerformanceDataTool.DrawHeight = 250;
PerformanceDataTool.StepLength = 250;
PerformanceDataTool.stepLengthArrayMap = new Array();
export class PerforManceNode {
    constructor() {
        this.inPool = false;
        this.nodeNum = 0;
        this.nodeStart = [];
        this.nodeDelty = [];
        this.applyCount = 0;
    }
    static create(nodeNum) {
        let perNode;
        perNode = this._pool.length > 0 ? this._pool.pop() : new PerforManceNode();
        perNode.resetData(nodeNum);
        perNode.inPool = false;
        return perNode;
    }
    static revert(node) {
        node.inPool = true;
        this._pool.push(node);
        node.clearData();
    }
    clearData() {
        this.nodeStart.length = 0;
        this.nodeDelty.length = 0;
    }
    resetData(nodeNum) {
        this.nodeNum = nodeNum;
        this.nodeStart.length = nodeNum;
        this.nodeDelty.length = nodeNum;
    }
    getFunStart(index) {
        this.applyCount++;
        this.nodeStart[index] = performance.now();
    }
    getFunEnd(index) {
        if (this.nodeDelty[index])
            this.nodeDelty[index] += (this.nodeStart[index] != 0) ? (performance.now() - this.nodeStart[index]) : 0;
        else {
            this.nodeDelty[index] = (this.nodeStart[index] != 0) ? (performance.now() - this.nodeStart[index]) : 0;
            this.nodeNum = this.nodeDelty.length;
        }
        return this.nodeDelty[index];
    }
    setMemory(index, value) {
        this.nodeDelty[index] = value;
    }
    getPathData(index) {
        return this.nodeDelty[index];
    }
}
PerforManceNode._pool = [];
