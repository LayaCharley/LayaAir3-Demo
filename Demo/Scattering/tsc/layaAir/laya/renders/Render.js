import { ILaya } from "./../../ILaya";
import { Config } from "./../../Config";
import { Context } from "../resource/Context";
import { BlendMode } from "../webgl/canvas/BlendMode";
import { Shader2D } from "../webgl/shader/d2/Shader2D";
import { ShaderDefines2D } from "../webgl/shader/d2/ShaderDefines2D";
import { Value2D } from "../webgl/shader/d2/value/Value2D";
import { SubmitBase } from "../webgl/submit/SubmitBase";
import { LayaEnv } from "../../LayaEnv";
import { VertexElementFormat } from "./VertexElementFormat";
export class Render {
    constructor(width, height, mainCanv) {
        this._first = true;
        this._startTm = 0;
        this._timeId = 0;
        Render._Render = this;
        Render._mainCanvas = mainCanv;
        let source = Render._mainCanvas.source;
        source.id = "layaCanvas";
        source.width = width;
        source.height = height;
        if (LayaEnv.isConch) {
            document.body.appendChild(source);
        }
        this.initRender(Render._mainCanvas, width, height);
        window.requestAnimationFrame(loop);
        let me = this;
        let lastFrmTm = performance.now();
        let fps = Config.FPS;
        let ifps = Render.ifps = 1000 / fps;
        function loop(stamp) {
            let sttm = performance.now();
            lastFrmTm = sttm;
            if (me._first) {
                me._startTm = Math.floor(stamp / ifps) * ifps;
                me._first = false;
            }
            stamp -= me._startTm;
            let frm = Math.floor(stamp / ifps);
            let dfrm = frm - Render.lastFrm;
            if (dfrm > 0 || LayaEnv.isConch || !Config.fixedFrames) {
                Render.lastFrm = frm;
                ILaya.stage._loop();
            }
            if (!!Render._customRequestAnimationFrame && !!Render._loopFunction) {
                Render._customRequestAnimationFrame(Render._loopFunction);
            }
            else
                window.requestAnimationFrame(loop);
        }
        ILaya.stage.on("visibilitychange", this, this._onVisibilitychange);
    }
    static customRequestAnimationFrame(value, loopFun) {
        Render._customRequestAnimationFrame = value;
        Render._loopFunction = loopFun;
    }
    static set customRenderEngine(engine) {
        Render._customEngine = engine;
    }
    static get customRenderEngine() {
        return Render._customEngine;
    }
    _onVisibilitychange() {
        if (!ILaya.stage.isVisibility) {
            this._timeId = window.setInterval(this._enterFrame, 1000);
        }
        else if (this._timeId != 0) {
            window.clearInterval(this._timeId);
        }
    }
    static vsyncTime() {
        return Render.lastFrm * Render.ifps;
    }
    initRender(canvas, w, h) {
        canvas.size(w, h);
        VertexElementFormat.__init__();
        Context.__init__();
        SubmitBase.__init__();
        var ctx = new Context();
        Context._rendercontex = ctx;
        ctx.isMain = true;
        Render._context = ctx;
        canvas._setContext(ctx);
        ShaderDefines2D.__init__();
        Value2D.__init__();
        Shader2D.__init__();
        BlendMode._init_();
        return true;
    }
    _enterFrame(e = null) {
        ILaya.stage._loop();
    }
    static get context() {
        return Render._context;
    }
    static get canvas() {
        return Render._mainCanvas.source;
    }
}
Render.lastFrm = 0;
Render.ifps = 1000 / 60;

//# sourceMappingURL=Render.js.map
