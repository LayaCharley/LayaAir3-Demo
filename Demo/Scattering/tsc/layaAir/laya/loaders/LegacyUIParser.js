import { Component } from "../components/Component";
import { FrameAnimation } from "../display/FrameAnimation";
import { Node } from "../display/Node";
import { ILaya } from "../../ILaya";
import { Graphics } from "../display/Graphics";
import { Matrix } from "../maths/Matrix";
import { Loader } from "../net/Loader";
import { ClassUtils } from "../utils/ClassUtils";
import { HitArea } from "../utils/HitArea";
import { Pool } from "../utils/Pool";
import { WeakObject } from "../utils/WeakObject";
import { NodeFlags } from "../Const";
import { PrefabImpl } from "../resource/PrefabImpl";
import { Scene } from "../display/Scene";
import { LayaEnv } from "../../LayaEnv";
var _listClass;
var _viewClass;
export class LegacyUIParser {
    static parse(data, options) {
        let root = options === null || options === void 0 ? void 0 : options.root;
        if (!root) {
            let runtime = (LayaEnv.isPlaying && data.props.runtime) ? data.props.runtime : data.type;
            let clas = ClassUtils.getClass(runtime);
            if (data.props.renderType == "instance")
                root = clas.instance || (clas.instance = new clas());
            else
                root = new clas();
        }
        if (root && root._viewCreated)
            return root;
        return LegacyUIParser.createByData(root, data);
    }
    static getBindFun(value) {
        let map = LegacyUIParser._funMap;
        if (!map)
            map = LegacyUIParser._funMap = new WeakObject();
        var fun = LegacyUIParser._funMap.get(value);
        if (fun == null) {
            var temp = "\"" + value + "\"";
            temp = temp.replace(/^"\${|}"$/g, "").replace(/\${/g, "\"+").replace(/}/g, "+\"");
            var str = "(function(data){if(data==null)return;with(data){try{\nreturn " + temp + "\n}catch(e){}}})";
            fun = window.Laya._runScript(str);
            LegacyUIParser._funMap.set(value, fun);
        }
        return fun;
    }
    static createByData(root, uiView) {
        var tInitTool = InitTool.create();
        root = LegacyUIParser.createComp(uiView, root, root, null, tInitTool);
        if ("_idMap" in root) {
            root["_idMap"] = tInitTool._idMap;
        }
        if (uiView.animations) {
            var anilist = [];
            var animations = uiView.animations;
            var i, len = animations.length;
            var tAni;
            var tAniO;
            for (i = 0; i < len; i++) {
                tAni = new FrameAnimation();
                tAniO = animations[i];
                tAni._setUp(tInitTool._idMap, tAniO);
                root[tAniO.name] = tAni;
                tAni._setControlNode(root);
                switch (tAniO.action) {
                    case 1:
                        tAni.play(0, false);
                        break;
                    case 2:
                        tAni.play(0, true);
                        break;
                }
                anilist.push(tAni);
            }
            root._aniList = anilist;
        }
        if ((root instanceof Scene) && root._width > 0 && uiView.props.hitTestPrior == null && !root.mouseThrough)
            root.hitTestPrior = true;
        tInitTool.finish();
        root._setBit(NodeFlags.NOT_READY, false);
        if (root.parent && root.parent.activeInHierarchy && root.active)
            root._processActive(true);
        return root;
    }
    static createInitTool() {
        return InitTool.create();
    }
    static createComp(uiView, comp = null, view = null, dataMap = null, initTool = null) {
        comp = comp || LegacyUIParser.getCompInstance(uiView);
        if (!comp) {
            if (uiView.props && uiView.props.runtime)
                console.warn("runtime not found:" + uiView.props.runtime);
            else
                console.warn("can not create:" + uiView.type);
            return null;
        }
        var child = uiView.child;
        if (child) {
            var isList = comp instanceof (_listClass || (_listClass = ClassUtils.getClass("List")));
            for (var i = 0, n = child.length; i < n; i++) {
                var node = child[i];
                if ('itemRender' in comp && (node.props.name == "render" || node.props.renderType === "render")) {
                    comp["itemRender"] = node;
                }
                else if (node.type == "Graphic") {
                    this._addGraphicsToSprite(node, comp);
                }
                else if (this._isDrawType(node.type)) {
                    this._addGraphicToSprite(node, comp, true);
                }
                else {
                    if (isList) {
                        var arr = [];
                        var tChild = LegacyUIParser.createComp(node, null, view, arr, initTool);
                        if (arr.length)
                            tChild["_$bindData"] = arr;
                    }
                    else {
                        tChild = LegacyUIParser.createComp(node, null, view, dataMap, initTool);
                    }
                    if (node.type == "Script") {
                        if (tChild instanceof Component) {
                            comp.addComponentInstance(tChild);
                        }
                        else {
                            if ("owner" in tChild) {
                                tChild["owner"] = comp;
                            }
                            else if ("target" in tChild) {
                                tChild["target"] = comp;
                            }
                        }
                    }
                    else if (node.props.renderType == "mask" || node.props.name == "mask") {
                        comp.mask = tChild;
                    }
                    else {
                        tChild instanceof Node && comp.addChild(tChild);
                    }
                }
            }
        }
        var props = uiView.props;
        for (var prop in props) {
            var value = props[prop];
            if (typeof (value) == 'string' && (value.indexOf("@node:") >= 0 || value.indexOf("@Prefab:") >= 0)) {
                if (initTool) {
                    initTool.addNodeRef(comp, prop, value);
                }
            }
            else
                LegacyUIParser.setCompValue(comp, prop, value, view, dataMap);
        }
        if (comp._afterInited) {
            comp._afterInited();
        }
        if (uiView.compId && initTool && initTool._idMap) {
            initTool._idMap[uiView.compId] = comp;
        }
        return comp;
    }
    static setCompValue(comp, prop, value, view = null, dataMap = null) {
        if (typeof (value) == 'string' && value.indexOf("${") > -1) {
            LegacyUIParser._sheet || (LegacyUIParser._sheet = ClassUtils.getClass("laya.data.Table"));
            if (!LegacyUIParser._sheet) {
                console.warn("Can not find class Sheet");
                return;
            }
            if (dataMap) {
                dataMap.push(comp, prop, value);
            }
            else if (view) {
                if (value.indexOf("].") == -1) {
                    value = value.replace(".", "[0].");
                }
                var watcher = new DataWatcher(comp, prop, value);
                watcher.exe(view);
                var one, temp;
                var str = value.replace(/\[.*?\]\./g, ".");
                while ((one = LegacyUIParser._parseWatchData.exec(str)) != null) {
                    var key1 = one[1];
                    while ((temp = LegacyUIParser._parseKeyWord.exec(key1)) != null) {
                        var key2 = temp[0];
                        var arr = (view._watchMap[key2] || (view._watchMap[key2] = []));
                        arr.push(watcher);
                        LegacyUIParser._sheet.I.notifer.on(key2, view, view.changeData, [key2]);
                    }
                    arr = (view._watchMap[key1] || (view._watchMap[key1] = []));
                    arr.push(watcher);
                    LegacyUIParser._sheet.I.notifer.on(key1, view, view.changeData, [key1]);
                }
            }
            return;
        }
        if (prop === "var" && view) {
            view[value] = comp;
        }
        else {
            comp[prop] = (value === "true" ? true : (value === "false" ? false : value));
        }
    }
    static getCompInstance(json) {
        if (json.type == "UIView") {
            if (json.props && json.props.pageData) {
                return LegacyUIParser.createByData(null, json.props.pageData);
            }
        }
        var runtime = LayaEnv.isPlaying ? ((json.props && json.props.runtime) || json.type) : json.type;
        var compClass = ClassUtils.getClass(runtime);
        if (!compClass)
            throw "Can not find class " + runtime;
        if (json.type === "Script" && compClass.prototype._doAwake) {
            var comp = Pool.createByClass(compClass);
            comp._destroyed = false;
            return comp;
        }
        if (json.props && "renderType" in json.props && json.props["renderType"] == "instance") {
            if (!compClass["instance"])
                compClass["instance"] = new compClass();
            return compClass["instance"];
        }
        let ret = new compClass();
        if (ret instanceof (_viewClass || (_viewClass = ClassUtils.getClass("View"))))
            ret._scene = ret;
        return ret;
    }
    static collectResourceLinks(uiView) {
        let test = new Set();
        let innerUrls = [];
        function addInnerUrl(url) {
            if (!test.has(url)) {
                test.add(url);
                innerUrls.push(url);
            }
        }
        function check(uiView) {
            let props = uiView.props;
            for (let prop in props) {
                let value = props[prop];
                if (typeof (value) == 'string' && value.indexOf("@Prefab:") >= 0) {
                    let url = value.replace("@Prefab:", "");
                    addInnerUrl(url);
                }
            }
            let child = uiView.child;
            if (child) {
                for (let i = 0, n = child.length; i < n; i++) {
                    let node = child[i];
                    check(node);
                }
            }
        }
        if (uiView.loadList) {
            for (let url of uiView.loadList)
                addInnerUrl(url);
        }
        if (uiView.loadList3D) {
            for (let url of uiView.loadList3D)
                addInnerUrl(url);
        }
        check(uiView);
        return innerUrls;
    }
    static createByJson(json, node = null, root = null, customHandler = null, instanceHandler = null) {
        if (typeof (json) == 'string')
            json = JSON.parse(json);
        var props = json.props;
        if (!node) {
            node = instanceHandler ? instanceHandler.runWith(json) : ClassUtils.getInstance(LayaEnv.isPlaying ? (props.runtime || json.type) : json.type);
            if (!node)
                return null;
        }
        var child = json.child;
        if (child) {
            for (var i = 0, n = child.length; i < n; i++) {
                var data = child[i];
                if ((data.props.name === "render" || data.props.renderType === "render") && node["_$set_itemRender"])
                    node.itemRender = data;
                else {
                    if (data.type == "Graphic") {
                        this._addGraphicsToSprite(data, node);
                    }
                    else if (this._isDrawType(data.type)) {
                        this._addGraphicToSprite(data, node, true);
                    }
                    else {
                        var tChild = this.createByJson(data, null, root, customHandler, instanceHandler);
                        if (data.type === "Script") {
                            if ("owner" in tChild) {
                                tChild["owner"] = node;
                            }
                            else if ("target" in tChild) {
                                tChild["target"] = node;
                            }
                        }
                        else if (data.props.renderType == "mask") {
                            node.mask = tChild;
                        }
                        else {
                            node.addChild(tChild);
                        }
                    }
                }
            }
        }
        if (props) {
            for (var prop in props) {
                var value = props[prop];
                if (prop === "var" && root) {
                    root[value] = node;
                }
                else if (value instanceof Array && node[prop] instanceof Function) {
                    node[prop].apply(node, value);
                }
                else {
                    node[prop] = value;
                }
            }
        }
        if (customHandler && json.customProps) {
            customHandler.runWith([node, json]);
        }
        if (node["created"])
            node.created();
        return node;
    }
    static _addGraphicsToSprite(graphicO, sprite) {
        var graphics = graphicO.child;
        if (!graphics || graphics.length < 1)
            return;
        var g = this._getGraphicsFromSprite(graphicO, sprite);
        var ox = 0;
        var oy = 0;
        if (graphicO.props) {
            ox = this._getObjVar(graphicO.props, "x", 0);
            oy = this._getObjVar(graphicO.props, "y", 0);
        }
        if (ox != 0 && oy != 0) {
            g.translate(ox, oy);
        }
        var i, len;
        len = graphics.length;
        for (i = 0; i < len; i++) {
            this._addGraphicToGraphics(graphics[i], g);
        }
        if (ox != 0 && oy != 0) {
            g.translate(-ox, -oy);
        }
    }
    static _addGraphicToSprite(graphicO, sprite, isChild = false) {
        var g = isChild ? this._getGraphicsFromSprite(graphicO, sprite) : sprite.graphics;
        this._addGraphicToGraphics(graphicO, g);
    }
    static _getGraphicsFromSprite(dataO, sprite) {
        if (!dataO || !dataO.props)
            return sprite.graphics;
        var propsName = dataO.props.renderType;
        if (propsName === "hit" || propsName === "unHit") {
            var hitArea = sprite._style.hitArea || (sprite.hitArea = new HitArea());
            if (!hitArea[propsName]) {
                hitArea[propsName] = new Graphics();
            }
            var g = hitArea[propsName];
        }
        if (!g)
            g = sprite.graphics;
        return g;
    }
    static _getTransformData(propsO) {
        var m;
        if ("pivotX" in propsO || "pivotY" in propsO) {
            m = m || new Matrix();
            m.translate(-this._getObjVar(propsO, "pivotX", 0), -this._getObjVar(propsO, "pivotY", 0));
        }
        var sx = this._getObjVar(propsO, "scaleX", 1), sy = this._getObjVar(propsO, "scaleY", 1);
        var rotate = this._getObjVar(propsO, "rotation", 0);
        var skewX = this._getObjVar(propsO, "skewX", 0);
        var skewY = this._getObjVar(propsO, "skewY", 0);
        if (sx != 1 || sy != 1 || rotate != 0) {
            m = m || new Matrix();
            m.scale(sx, sy);
            m.rotate(rotate * 0.0174532922222222);
        }
        return m;
    }
    static _addGraphicToGraphics(graphicO, graphic) {
        var propsO;
        propsO = graphicO.props;
        if (!propsO)
            return;
        var drawConfig;
        drawConfig = this.DrawTypeDic[graphicO.type];
        if (!drawConfig)
            return;
        var g = graphic;
        var params = this._getParams(propsO, drawConfig[1], drawConfig[2], drawConfig[3]);
        var m = this._tM;
        if (m || this._alpha != 1) {
            g.save();
            if (m)
                g.transform(m);
            if (this._alpha != 1)
                g.alpha(this._alpha);
        }
        g[drawConfig[0]].apply(g, params);
        if (m || this._alpha != 1) {
            g.restore();
        }
    }
    static _adptLineData(params) {
        params[2] = parseFloat(params[0]) + parseFloat(params[2]);
        params[3] = parseFloat(params[1]) + parseFloat(params[3]);
        return params;
    }
    static _adptTextureData(params) {
        params[0] = ILaya.Loader.getRes(params[0]);
        return params;
    }
    static _adptLinesData(params) {
        params[2] = this._getPointListByStr(params[2]);
        return params;
    }
    static _isDrawType(type) {
        if (type === "Image")
            return false;
        return type in this.DrawTypeDic;
    }
    static _getParams(obj, params, xPos = 0, adptFun = null) {
        var rst = this._temParam;
        rst.length = params.length;
        var i, len;
        len = params.length;
        for (i = 0; i < len; i++) {
            rst[i] = this._getObjVar(obj, params[i][0], params[i][1]);
        }
        this._alpha = this._getObjVar(obj, "alpha", 1);
        var m;
        m = this._getTransformData(obj);
        if (m) {
            if (!xPos)
                xPos = 0;
            m.translate(rst[xPos], rst[xPos + 1]);
            rst[xPos] = rst[xPos + 1] = 0;
            this._tM = m;
        }
        else {
            this._tM = null;
        }
        if (adptFun && this[adptFun]) {
            rst = this[adptFun](rst);
        }
        return rst;
    }
    static _getPointListByStr(str) {
        var pointArr = str.split(",");
        var i, len;
        len = pointArr.length;
        for (i = 0; i < len; i++) {
            pointArr[i] = parseFloat(pointArr[i]);
        }
        return pointArr;
    }
    static _getObjVar(obj, key, noValue) {
        if (key in obj) {
            return obj[key];
        }
        return noValue;
    }
}
LegacyUIParser._parseWatchData = /\${(.*?)}/g;
LegacyUIParser._parseKeyWord = /[a-zA-Z_][a-zA-Z0-9_]*(?:(?:\.[a-zA-Z_][a-zA-Z0-9_]*)+)/g;
LegacyUIParser.DrawTypeDic = { "Rect": ["drawRect", [["x", 0], ["y", 0], ["width", 0], ["height", 0], ["fillColor", null], ["lineColor", null], ["lineWidth", 1]]], "Circle": ["drawCircle", [["x", 0], ["y", 0], ["radius", 0], ["fillColor", null], ["lineColor", null], ["lineWidth", 1]]], "Pie": ["drawPie", [["x", 0], ["y", 0], ["radius", 0], ["startAngle", 0], ["endAngle", 0], ["fillColor", null], ["lineColor", null], ["lineWidth", 1]]], "Image": ["drawTexture", [["x", 0], ["y", 0], ["width", 0], ["height", 0]]], "Texture": ["drawTexture", [["skin", null], ["x", 0], ["y", 0], ["width", 0], ["height", 0]], 1, "_adptTextureData"], "FillTexture": ["fillTexture", [["skin", null], ["x", 0], ["y", 0], ["width", 0], ["height", 0], ["repeat", null]], 1, "_adptTextureData"], "FillText": ["fillText", [["text", ""], ["x", 0], ["y", 0], ["font", null], ["color", null], ["textAlign", null]], 1], "Line": ["drawLine", [["x", 0], ["y", 0], ["toX", 0], ["toY", 0], ["lineColor", null], ["lineWidth", 0]], 0, "_adptLineData"], "Lines": ["drawLines", [["x", 0], ["y", 0], ["points", ""], ["lineColor", null], ["lineWidth", 0]], 0, "_adptLinesData"], "Curves": ["drawCurves", [["x", 0], ["y", 0], ["points", ""], ["lineColor", null], ["lineWidth", 0]], 0, "_adptLinesData"], "Poly": ["drawPoly", [["x", 0], ["y", 0], ["points", ""], ["fillColor", null], ["lineColor", null], ["lineWidth", 1]], 0, "_adptLinesData"] };
LegacyUIParser._temParam = [];
class DataWatcher {
    constructor(comp, prop, value) {
        this.comp = comp;
        this.prop = prop;
        this.value = value;
    }
    exe(view) {
        var fun = LegacyUIParser.getBindFun(this.value);
        this.comp[this.prop] = fun.call(this, view);
    }
}
class InitTool {
    reset() {
        this._nodeRefList = null;
        this._initList = null;
        this._idMap = null;
    }
    recover() {
        this.reset();
        Pool.recover("InitTool", this);
    }
    static create() {
        var tool = Pool.getItemByClass("InitTool", InitTool);
        tool._idMap = {};
        return tool;
    }
    addNodeRef(node, prop, referStr) {
        if (!this._nodeRefList)
            this._nodeRefList = [];
        this._nodeRefList.push([node, prop, referStr]);
    }
    setNodeRef() {
        if (!this._nodeRefList)
            return;
        if (!this._idMap) {
            this._nodeRefList = null;
            return;
        }
        var i, len;
        len = this._nodeRefList.length;
        var tRefInfo;
        for (i = 0; i < len; i++) {
            tRefInfo = this._nodeRefList[i];
            tRefInfo[0][tRefInfo[1]] = this.getReferData(tRefInfo[2]);
        }
        this._nodeRefList = null;
    }
    getReferData(referStr) {
        if (referStr.indexOf("@Prefab:") >= 0) {
            return new PrefabImpl(LegacyUIParser, Loader.getRes(referStr.replace("@Prefab:", "")), 2);
        }
        else if (referStr.indexOf("@arr:") >= 0) {
            referStr = referStr.replace("@arr:", "");
            var list;
            list = referStr.split(",");
            var i, len;
            var tStr;
            len = list.length;
            var list2 = [];
            for (i = 0; i < len; i++) {
                tStr = list[i];
                if (tStr) {
                    list2.push(this._idMap[tStr.replace("@node:", "")]);
                }
                else {
                    list2.push(null);
                }
            }
            return list2;
        }
        else {
            return this._idMap[referStr.replace("@node:", "")];
        }
    }
    addInitItem(item) {
        if (!this._initList)
            this._initList = [];
        this._initList.push(item);
    }
    doInits() {
        if (!this._initList)
            return;
        this._initList = null;
    }
    finish() {
        this.setNodeRef();
        this.doInits();
        this.recover();
    }
}

//# sourceMappingURL=LegacyUIParser.js.map
