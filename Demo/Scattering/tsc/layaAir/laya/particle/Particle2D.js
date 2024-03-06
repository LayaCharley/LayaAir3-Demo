import { Sprite } from "../display/Sprite";
import { ILaya } from "../../ILaya";
import { Emitter2D } from "./emitter/Emitter2D";
import { DrawParticleCmd } from "../display/cmd/DrawParticleCmd";
export class Particle2D extends Sprite {
    constructor() {
        super();
        this._matrix4 = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
        this.autoPlay = true;
        this.customRenderEnable = true;
    }
    get source() {
        return this._source;
    }
    set source(value) {
        this._source = value;
        if (value) {
            ILaya.loader.load(value).then((template) => {
                if (template && !template.isCreateFromURL(this._source))
                    return;
                this.init(template);
            });
        }
        else
            this.init(null);
    }
    get template() {
        return this._template;
    }
    set template(value) {
        this.init(value);
    }
    get emitter() {
        return this._emitter;
    }
    init(template) {
        if (this._template) {
            this.reset();
        }
        this._template = template;
        if (!this._template)
            return;
        this._template._addReference();
        this.customRenderEnable = true;
        this.graphics.addCmd(DrawParticleCmd.create(this._template));
        if (!this._emitter) {
            this._emitter = new Emitter2D(this._template);
        }
        else {
            this._emitter.template = this._template;
        }
        if (this.autoPlay) {
            this.emitter.start();
            this.play();
        }
    }
    play() {
        ILaya.timer.frameLoop(1, this, this._loop);
    }
    stop() {
        ILaya.timer.clear(this, this._loop);
    }
    _loop() {
        this.advanceTime(1 / 60);
    }
    advanceTime(passedTime = 1) {
        if (this._canvasTemplate) {
            this._canvasTemplate.advanceTime(passedTime);
        }
        if (this._emitter) {
            this._emitter.advanceTime(passedTime);
        }
    }
    customRender(context, x, y) {
        this._matrix4[0] = context._curMat.a;
        this._matrix4[1] = context._curMat.b;
        this._matrix4[4] = context._curMat.c;
        this._matrix4[5] = context._curMat.d;
        this._matrix4[12] = context._curMat.tx;
        this._matrix4[13] = context._curMat.ty;
        if (!this._template)
            return;
        var sv = this._template.sv;
        sv.u_mmat = this._matrix4;
        if (this._canvasTemplate) {
            this._canvasTemplate.render(context, x, y);
        }
    }
    reset() {
        this.stop();
    }
    destroy(destroyChild = true) {
        super.destroy(destroyChild);
        if (this._template)
            this.reset();
    }
}

//# sourceMappingURL=Particle2D.js.map
