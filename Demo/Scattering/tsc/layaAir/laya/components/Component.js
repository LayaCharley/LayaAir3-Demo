import { ILaya } from "../../ILaya";
import { LayaEnv } from "../../LayaEnv";
import { NodeFlags } from "../Const";
import { Pool } from "../utils/Pool";
import { Utils } from "../utils/Utils";
export class Component {
    constructor() {
        this._hideFlags = 0;
        this._status = 0;
        this._enabled = true;
        this._singleton = true;
        this._id = Utils.getGID();
        this._initialize();
    }
    get hideFlags() {
        return this._hideFlags;
    }
    set hideFlags(value) {
        this._hideFlags = value;
    }
    _initialize() {
        this._extra = {};
    }
    hasHideFlag(flag) {
        return (this._hideFlags & flag) != 0;
    }
    get id() {
        return this._id;
    }
    get enabled() {
        return this._enabled;
    }
    set enabled(value) {
        if (this._enabled != value) {
            this._enabled = value;
            if (this.owner)
                this._setActive(value && this.owner.activeInHierarchy);
        }
    }
    get awaked() {
        return this._status > 0;
    }
    get destroyed() {
        return this._status == 4;
    }
    _isScript() {
        return false;
    }
    _resetComp() {
        this._enabled = true;
        this._status = 0;
        this._enableState = false;
        this.owner = null;
    }
    _setOwner(node) {
        if (this._status != 0) {
            throw 'reuse a destroyed component';
        }
        this.owner = node;
        if (this._isScript())
            node._setBit(NodeFlags.HAS_SCRIPT, true);
        this._onAdded();
        this.onAdded();
    }
    _onAdded() {
    }
    _onAwake() {
    }
    _onEnable() {
        this.onEnable();
    }
    _onDisable() {
        this.onDisable();
    }
    _onDestroy() {
    }
    _parse(data, interactMap = null) {
    }
    _parseInteractive(data = null, spriteMap = null) {
    }
    _cloneTo(dest) {
    }
    _setActive(value) {
        var _a, _b;
        if (value) {
            if (this._status == 0) {
                this._status = 1;
                if (LayaEnv.isPlaying || this.runInEditor) {
                    this._onAwake();
                    this.onAwake();
                }
            }
            if (this._enabled && !this._enableState) {
                this._enableState = true;
                if (LayaEnv.isPlaying || this.runInEditor) {
                    let driver = ((_a = (this.owner._is3D && this.owner._scene)) === null || _a === void 0 ? void 0 : _a._componentDriver) || ILaya.stage._componentDriver;
                    driver.add(this);
                    if (LayaEnv.isPlaying && this._isScript())
                        this.setupScript();
                    this._onEnable();
                }
            }
        }
        else if (this._enableState) {
            this._enableState = false;
            if (LayaEnv.isPlaying || this.runInEditor) {
                let driver = ((_b = (this.owner._is3D && this.owner._scene)) === null || _b === void 0 ? void 0 : _b._componentDriver) || ILaya.stage._componentDriver;
                driver.remove(this);
                this.owner.offAllCaller(this);
                ILaya.stage.offAllCaller(this);
                this._onDisable();
            }
        }
    }
    setupScript() {
    }
    destroy() {
        if (this._status == 4)
            return;
        if (this.owner)
            this.owner._destroyComponent(this);
        else if (!this.destroyed)
            this._destroy(true);
    }
    _destroy(second) {
        var _a;
        if (second) {
            this._onDestroy();
            this.onDestroy();
            if (this.onReset) {
                this.onReset();
                this._resetComp();
                Pool.recoverByClass(this);
            }
            this._status = 4;
            return;
        }
        this._setActive(false);
        this._status = 4;
        let driver = ((_a = (this.owner._is3D && this.owner._scene)) === null || _a === void 0 ? void 0 : _a._componentDriver) || ILaya.stage._componentDriver;
        driver._toDestroys.add(this);
    }
    onAdded() {
    }
    onAwake() {
    }
    onEnable() {
    }
    onDisable() {
    }
    onDestroy() {
    }
}

//# sourceMappingURL=Component.js.map
