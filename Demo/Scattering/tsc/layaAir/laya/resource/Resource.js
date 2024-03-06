import { ILaya } from "../../ILaya";
import { EventDispatcher } from "../events/EventDispatcher";
var _idCounter = 0;
var _disposingCounter = 0;
var _clearRetry = 0;
export class Resource extends EventDispatcher {
    constructor(managed) {
        super();
        this._cpuMemory = 0;
        this._gpuMemory = 0;
        this._id = 0;
        this._referenceCount = 0;
        this._id = ++_idCounter;
        this._destroyed = false;
        this._referenceCount = 0;
        if (managed == null || managed)
            Resource._idResourcesMap[this.id] = this;
        this.lock = false;
        this.destroyedImmediately = true;
    }
    static get cpuMemory() {
        return Resource._cpuMemory;
    }
    static get gpuMemory() {
        return Resource._gpuMemory;
    }
    static _addCPUMemory(size) {
        Resource._cpuMemory += size;
    }
    static _addGPUMemory(size) {
        Resource._gpuMemory += size;
    }
    static _addMemory(cpuSize, gpuSize) {
        Resource._cpuMemory += cpuSize;
        Resource._gpuMemory += gpuSize;
    }
    static destroyUnusedResources() {
        _disposingCounter = 0;
        _clearRetry = 0;
        if (!ILaya.loader.loading)
            Resource._destroyUnusedResources(true);
        else
            ILaya.timer.frameLoop(1, Resource, Resource._destroyUnusedResources);
    }
    static _destroyUnusedResources(force) {
        if (!force && ILaya.loader.loading)
            return;
        ILaya.timer.clear(Resource, Resource._destroyUnusedResources);
        let destroyCnt = 0;
        for (let k in Resource._idResourcesMap) {
            let res = Resource._idResourcesMap[k];
            if (!res.lock && res._referenceCount === 0) {
                res.destroy();
                destroyCnt++;
            }
        }
        if (Resource.DEBUG && destroyCnt > 0)
            console.debug(`destroyUnusedResources(${destroyCnt})`);
        if (destroyCnt > 0 && _clearRetry < 5) {
            _clearRetry++;
            ILaya.timer.frameLoop(1, Resource, Resource._destroyUnusedResources);
        }
    }
    get id() {
        return this._id;
    }
    get cpuMemory() {
        return this._cpuMemory;
    }
    get gpuMemory() {
        return this._gpuMemory;
    }
    get destroyed() {
        return this._destroyed;
    }
    get obsolute() {
        return this._obsolute;
    }
    set obsolute(value) {
        this._obsolute = value;
    }
    get referenceCount() {
        return this._referenceCount;
    }
    _setCPUMemory(value) {
        var offsetValue = value - this._cpuMemory;
        this._cpuMemory = value;
        Resource._addCPUMemory(offsetValue);
    }
    _setGPUMemory(value) {
        var offsetValue = value - this._gpuMemory;
        this._gpuMemory = value;
        Resource._addGPUMemory(offsetValue);
    }
    _setCreateURL(url, uuid) {
        this.url = url;
        this.uuid = uuid;
    }
    isCreateFromURL(url) {
        return this.uuid && url.length === this.uuid.length + 6 && url.endsWith(this.uuid)
            || this.url === url;
    }
    _addReference(count = 1) {
        this._referenceCount += count;
    }
    _removeReference(count = 1) {
        this._referenceCount -= count;
        if (_disposingCounter > 0 && this._referenceCount <= 0 && !this.lock && this.destroyedImmediately) {
            this.destroy();
        }
    }
    _clearReference() {
        this._referenceCount = 0;
    }
    _recoverResource() {
    }
    _disposeResource() {
    }
    _activeResource() {
    }
    destroy() {
        if (this._destroyed)
            return;
        this._destroyed = true;
        this.lock = false;
        _disposingCounter++;
        this._disposeResource();
        _disposingCounter--;
        this.offAll();
        delete Resource._idResourcesMap[this.id];
        if (this.url) {
            if (Resource.DEBUG)
                console.debug(`destroy ${Object.getPrototypeOf(this).constructor.name} ${this.url}`);
            ILaya.loader.clearRes(this.url, this);
        }
    }
}
Resource._idResourcesMap = {};
Resource._cpuMemory = 0;
Resource._gpuMemory = 0;
Resource.DEBUG = false;

//# sourceMappingURL=Resource.js.map
