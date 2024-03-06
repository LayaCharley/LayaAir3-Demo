export class ComponentDriver {
    constructor() {
        this._onUpdates = new Set();
        this._onLateUpdates = new Set();
        this._onPreRenders = new Set();
        this._onPostRenders = new Set();
        this._toStarts = new Set();
        this._toDestroys = new Set();
    }
    callStart() {
        for (let ele of this._toStarts) {
            if (ele._status == 2) {
                ele._status = 3;
                try {
                    ele.onStart();
                }
                catch (err) {
                    console.log(err);
                }
            }
        }
        this._toStarts.clear();
    }
    callUpdate() {
        for (let ele of this._onUpdates) {
            if (ele._status == 3) {
                try {
                    ele.onUpdate();
                }
                catch (err) {
                    console.log(err);
                }
            }
        }
    }
    callLateUpdate() {
        for (let ele of this._onLateUpdates) {
            if (ele._status == 3) {
                try {
                    ele.onLateUpdate();
                }
                catch (err) {
                    console.log(err);
                }
            }
        }
    }
    callPreRender() {
        for (let ele of this._onPreRenders) {
            if (ele._status == 3) {
                try {
                    ele.onPreRender();
                }
                catch (err) {
                    console.log(err);
                }
            }
        }
    }
    callPostRender() {
        for (let ele of this._onPostRenders) {
            if (ele._status == 3) {
                try {
                    ele.onPostRender();
                }
                catch (err) {
                    console.log(err);
                }
            }
        }
    }
    callDestroy() {
        for (let ele of this._toDestroys) {
            try {
                ele._destroy(true);
            }
            catch (err) {
                console.log(err);
            }
        }
        this._toDestroys.clear();
    }
    add(comp) {
        if (comp._status == 1) {
            if (comp.onStart) {
                comp._status = 2;
                this._toStarts.add(comp);
            }
            else
                comp._status = 3;
        }
        if (comp.onUpdate)
            this._onUpdates.add(comp);
        if (comp.onLateUpdate)
            this._onLateUpdates.add(comp);
        if (comp.onPreRender)
            this._onPreRenders.add(comp);
        if (comp.onPostRender)
            this._onPostRenders.add(comp);
    }
    remove(comp) {
        if (comp._status == 2)
            comp._status = 1;
        if (comp.onUpdate)
            this._onUpdates.delete(comp);
        if (comp.onLateUpdate)
            this._onLateUpdates.delete(comp);
        if (comp.onPreRender)
            this._onPreRenders.delete(comp);
        if (comp.onPostRender)
            this._onPostRenders.delete(comp);
    }
    destroy() {
    }
}

//# sourceMappingURL=ComponentDriver.js.map
