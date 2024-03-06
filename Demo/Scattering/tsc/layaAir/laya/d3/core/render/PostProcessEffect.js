export class PostProcessEffect {
    constructor() {
        this._active = true;
        this._singleton = true;
    }
    set singleton(value) {
        this._singleton = value;
    }
    get singleton() {
        return this._singleton;
    }
    get active() {
        return this._active;
    }
    set active(value) {
        this._active = value;
    }
    getCameraDepthTextureModeFlag() {
        return 0;
    }
    effectInit(postprocess) {
        return;
    }
    release(postprocess) {
    }
    render(context) {
    }
}

//# sourceMappingURL=PostProcessEffect.js.map
