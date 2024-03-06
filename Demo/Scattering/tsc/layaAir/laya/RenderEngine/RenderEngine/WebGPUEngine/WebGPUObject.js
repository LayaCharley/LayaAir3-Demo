export class WebGPUObject {
    constructor(engine) {
        this._destroyed = false;
        this._engine = engine;
        this._context = this._engine._context;
        this._id = this._engine._IDCounter++;
        this._device = this._engine._device;
    }
    get destroyed() {
        return this._destroyed;
    }
    destroy() {
        if (this._destroyed)
            return;
        this._destroyed = true;
    }
}

//# sourceMappingURL=WebGPUObject.js.map
