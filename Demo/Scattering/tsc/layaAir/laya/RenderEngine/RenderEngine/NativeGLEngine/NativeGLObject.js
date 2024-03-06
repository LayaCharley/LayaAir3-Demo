export class NativeGLObject {
    constructor(engine) {
        this._destroyed = false;
        this._engine = engine;
        this._gl = this._engine.gl;
        this._id = this._engine._IDCounter++;
    }
    get destroyed() {
        return this._destroyed;
    }
    setResourceManager() {
    }
    ;
    destroy() {
        if (this._destroyed)
            return;
        this._destroyed = true;
    }
}

//# sourceMappingURL=NativeGLObject.js.map
