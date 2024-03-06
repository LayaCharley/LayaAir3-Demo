import { ILaya } from "./ILaya";
import { Input } from "./laya/display/Input";
import { Sprite } from "./laya/display/Sprite";
import { Stage } from "./laya/display/Stage";
import { InputManager } from "./laya/events/InputManager";
import { LayaGL } from "./laya/layagl/LayaGL";
import { SoundManager } from "./laya/media/SoundManager";
import { Loader } from "./laya/net/Loader";
import { LocalStorage } from "./laya/net/LocalStorage";
import { Render } from "./laya/renders/Render";
import { RenderSprite } from "./laya/renders/RenderSprite";
import { Context } from "./laya/resource/Context";
import { HTMLCanvas } from "./laya/resource/HTMLCanvas";
import { RenderTexture2D } from "./laya/resource/RenderTexture2D";
import { Browser } from "./laya/utils/Browser";
import { CacheManger } from "./laya/utils/CacheManger";
import { ColorUtils } from "./laya/utils/ColorUtils";
import { Stat } from "./laya/utils/Stat";
import { StatUI } from "./laya/utils/StatUI";
import { Timer } from "./laya/utils/Timer";
import { ShaderDefines2D } from "./laya/webgl/shader/d2/ShaderDefines2D";
import { SkinSV } from "./laya/webgl/shader/d2/skinAnishader/SkinSV";
import { PrimitiveSV } from "./laya/webgl/shader/d2/value/PrimitiveSV";
import { TextureSV } from "./laya/webgl/shader/d2/value/TextureSV";
import { Value2D } from "./laya/webgl/shader/d2/value/Value2D";
import { RenderState2D } from "./laya/webgl/utils/RenderState2D";
import { WebGL } from "./laya/webgl/WebGL";
import { Mouse } from "./laya/utils/Mouse";
import { MeshVG } from "./laya/webgl/utils/MeshVG";
import { MeshParticle2D } from "./laya/webgl/utils/MeshParticle2D";
import { MeshQuadTexture } from "./laya/webgl/utils/MeshQuadTexture";
import { MeshTexture } from "./laya/webgl/utils/MeshTexture";
import { WeakObject } from "./laya/utils/WeakObject";
import { RenderStateContext } from "./laya/RenderEngine/RenderStateContext";
import { RenderClearFlag } from "./laya/RenderEngine/RenderEnum/RenderClearFlag";
import { LayaEnv } from "./LayaEnv";
import { Color } from "./laya/maths/Color";
import { URL } from "./laya/net/URL";
import { RunDriver } from "./laya/utils/RunDriver";
import { Config } from "./Config";
import { Shader3D } from "./laya/RenderEngine/RenderShader/Shader3D";
export class Laya {
    static init(...args) {
        if (_isinit)
            return Promise.resolve();
        _isinit = true;
        let stageConfig;
        if (typeof (args[0]) === "number") {
            stageConfig = {
                designWidth: args[0],
                designHeight: args[1]
            };
        }
        else
            stageConfig = args[0];
        ArrayBuffer.prototype.slice || (ArrayBuffer.prototype.slice = arrayBufferSlice);
        Float32Array.prototype.slice || (Float32Array.prototype.slice = float32ArraySlice);
        Uint16Array.prototype.slice || (Uint16Array.prototype.slice = uint16ArraySlice);
        Uint8Array.prototype.slice || (Uint8Array.prototype.slice = uint8ArraySlice);
        Browser.__init__();
        URL.__init__();
        let laya3D = window["Laya3D"];
        if (laya3D) {
            if (!WebGL.enable())
                return Promise.reject("Must support webGL!");
            RunDriver.changeWebGLSize = laya3D._changeWebGLSize;
            Render.is3DMode = true;
        }
        var mainCanv = Browser.mainCanvas = new HTMLCanvas(true);
        var style = mainCanv.source.style;
        style.position = 'absolute';
        style.top = style.left = "0px";
        style.background = "#000000";
        if (!Browser.onKGMiniGame && !Browser.onAlipayMiniGame) {
            Browser.container.appendChild(mainCanv.source);
        }
        Browser.canvas = new HTMLCanvas(true);
        Browser.context = Browser.canvas.getContext('2d');
        Browser.supportWebAudio = SoundManager.__init__();
        Browser.supportLocalStorage = LocalStorage.__init__();
        Laya.systemTimer = new Timer(false);
        systemTimer = Timer.gSysTimer = Laya.systemTimer;
        Laya.physicsTimer = new Timer(false);
        Laya.timer = new Timer(false);
        ILaya.systemTimer = Laya.systemTimer;
        timer = ILaya.timer = Laya.timer;
        physicsTimer = ILaya.physicsTimer = Laya.physicsTimer;
        Laya.loader = new Loader();
        ILaya.Laya = Laya;
        loader = ILaya.loader = Laya.loader;
        WeakObject.__init__();
        Mouse.__init__();
        if (LayaEnv.beforeInit) {
            if (LayaEnv.isPlaying)
                LayaEnv.beforeInit(stageConfig);
            else
                LayaEnv.beforeInit = null;
        }
        if (LayaEnv.isConch) {
            Laya.enableNative();
        }
        CacheManger.beginCheck();
        stage = Laya.stage = new Stage();
        ILaya.stage = Laya.stage;
        if (LayaEnv.isConch && window.conch.setGlobalRepaint) {
            window.conch.setGlobalRepaint(stage.setGlobalRepaint.bind(stage));
        }
        Shader3D.init();
        MeshQuadTexture.__int__();
        MeshVG.__init__();
        MeshTexture.__init__();
        return LayaGL.renderOBJCreate.createEngine(null, Browser.mainCanvas).then(() => {
            return Laya.initRender2D(stageConfig);
        });
    }
    static initRender2D(stageConfig) {
        Laya.render = new Render(0, 0, Browser.mainCanvas);
        render = Laya.render;
        stage.size(stageConfig.designWidth, stageConfig.designHeight);
        if (stageConfig.scaleMode)
            stage.scaleMode = stageConfig.scaleMode;
        if (stageConfig.screenMode)
            stage.screenMode = stageConfig.screenMode;
        if (stageConfig.alignV)
            stage.alignV = stageConfig.alignV;
        if (stageConfig.alignH)
            stage.alignH = stageConfig.alignH;
        if (Config.isAlpha)
            stage.bgColor = null;
        else if (stageConfig.backgroundColor)
            stage.bgColor = stageConfig.backgroundColor;
        window.stage = stage;
        RenderStateContext.__init__();
        MeshParticle2D.__init__();
        RenderSprite.__init__();
        InputManager.__init__(stage, Render.canvas);
        if (!!window.conch && "conchUseWXAdapter" in Browser.window) {
            Input.isAppUseNewInput = true;
        }
        Input.__init__();
        SoundManager.autoStopMusic = true;
        Stat._StatRender = new StatUI();
        Value2D._initone(ShaderDefines2D.TEXTURE2D, TextureSV);
        Value2D._initone(ShaderDefines2D.TEXTURE2D | ShaderDefines2D.FILTERGLOW, TextureSV);
        Value2D._initone(ShaderDefines2D.PRIMITIVE, PrimitiveSV);
        Value2D._initone(ShaderDefines2D.SKINMESH, SkinSV);
        let laya3D = window["Laya3D"];
        if (laya3D) {
            return laya3D.__init__().then(() => {
                _onInitModuleCallbacks.forEach(c => c());
                _onInitModuleCallbacks.length = 0;
                if (LayaEnv.afterInit) {
                    if (LayaEnv.isPlaying)
                        LayaEnv.afterInit();
                    else
                        LayaEnv.afterInit = null;
                }
                return Promise.resolve();
            });
        }
        else {
            _onInitModuleCallbacks.forEach(c => c());
            _onInitModuleCallbacks.length = 0;
            if (LayaEnv.afterInit) {
                if (LayaEnv.isPlaying)
                    LayaEnv.afterInit();
                else
                    LayaEnv.afterInit = null;
            }
            return Promise.resolve();
        }
    }
    static createRender() {
        return new Render(0, 0, Browser.mainCanvas);
    }
    static addWasmModule(id, exports, memory) {
        Laya.WasmModules[id] = { exports, memory };
    }
    static alertGlobalError(value) {
        var erralert = 0;
        if (value) {
            Browser.window.onerror = function (msg, url, line, column, detail) {
                if (erralert++ < 5 && detail)
                    this.alert("出错啦，请把此信息截图给研发商\n" + msg + "\n" + detail.stack);
            };
        }
        else {
            Browser.window.onerror = null;
        }
    }
    static _runScript(script) {
        return Browser.window[Laya._evcode](script);
    }
    static enableDebugPanel(debugJsPath = "libs/laya.debugtool.js") {
        if (!window['Laya']["DebugPanel"]) {
            var script = Browser.createElement("script");
            script.onload = function () {
                window['Laya']["DebugPanel"].enable();
            };
            script.src = debugJsPath;
            Browser.document.body.appendChild(script);
        }
        else {
            window['Laya']["DebugPanel"].enable();
        }
    }
    static enableNative() {
        if (Laya.isNativeRender_enable)
            return;
        Laya.isNativeRender_enable = true;
        RenderState2D.width = Browser.window.innerWidth;
        RenderState2D.height = Browser.window.innerHeight;
        Browser.measureText = function (txt, font) {
            window["conchTextCanvas"].font = font;
            return window["conchTextCanvas"].measureText(txt);
        };
        Stage.clear = function (color) {
            Context.set2DRenderConfig();
            var c = ColorUtils.create(color).arrColor;
            LayaGL.renderEngine.clearRenderTexture(RenderClearFlag.Color | RenderClearFlag.Depth, new Color(c[0], c[1], c[2], c[3]), 1);
            RenderState2D.clear();
        };
        Sprite.drawToCanvas = function (sprite, _renderType, canvasWidth, canvasHeight, offsetX, offsetY) {
            offsetX -= sprite.x;
            offsetY -= sprite.y;
            offsetX |= 0;
            offsetY |= 0;
            canvasWidth |= 0;
            canvasHeight |= 0;
            var canv = new HTMLCanvas(false);
            var ctx = canv.getContext('2d');
            canv.size(canvasWidth, canvasHeight);
            ctx.asBitmap = true;
            ctx._targets.start();
            RenderSprite.renders[_renderType]._fun(sprite, ctx, offsetX, offsetY);
            ctx.flush();
            ctx._targets.end();
            ctx._targets.restore();
            return canv;
        };
        Object["defineProperty"](RenderTexture2D.prototype, "uv", {
            "get": function () {
                return this._uv;
            },
            "set": function (v) {
                this._uv = v;
            }
        });
        HTMLCanvas.prototype.getTexture = function () {
            if (!this._texture) {
                this._texture = this.context._targets;
                this._texture.uv = RenderTexture2D.flipyuv;
                this._texture.bitmap = this._texture;
            }
            return this._texture;
        };
    }
    static onInitModule(callback) {
        if (_isinit)
            callback();
        else
            _onInitModuleCallbacks.push(callback);
    }
}
Laya.stage = null;
Laya.systemTimer = null;
Laya.physicsTimer = null;
Laya.timer = null;
Laya.loader = null;
Laya.isWXOpenDataContext = false;
Laya.isWXPosMsg = false;
Laya.WasmModules = {};
Laya._evcode = "eva" + "l";
Laya.isNativeRender_enable = false;
function arrayBufferSlice(start, end) {
    var arrU8List = new Uint8Array(this, start, end - start);
    var newU8List = new Uint8Array(arrU8List.length);
    newU8List.set(arrU8List);
    return newU8List.buffer;
}
function uint8ArraySlice() {
    var sz = this.length;
    var dec = new Uint8Array(this.length);
    for (var i = 0; i < sz; i++)
        dec[i] = this[i];
    return dec;
}
function float32ArraySlice() {
    var sz = this.length;
    var dec = new Float32Array(this.length);
    for (var i = 0; i < sz; i++)
        dec[i] = this[i];
    return dec;
}
function uint16ArraySlice(...arg) {
    var sz;
    var dec;
    var i;
    if (arg.length === 0) {
        sz = this.length;
        dec = new Uint16Array(sz);
        for (i = 0; i < sz; i++)
            dec[i] = this[i];
    }
    else if (arg.length === 2) {
        var start = arg[0];
        var end = arg[1];
        if (end > start) {
            sz = end - start;
            dec = new Uint16Array(sz);
            for (i = start; i < end; i++)
                dec[i - start] = this[i];
        }
        else {
            dec = new Uint16Array(0);
        }
    }
    return dec;
}
ILaya.Loader = Loader;
ILaya.Context = Context;
ILaya.Browser = Browser;
var _isinit = false;
var _onInitModuleCallbacks = [];
export var init = Laya.init;
export var stage;
export var systemTimer;
export var physicsTimer;
export var timer;
export var loader;
export var render;
export var isWXOpenDataContext;
export var isWXPosMsg;
export var alertGlobalError = Laya.alertGlobalError;
export var enableDebugPanel = Laya.enableDebugPanel;

//# sourceMappingURL=Laya.js.map
