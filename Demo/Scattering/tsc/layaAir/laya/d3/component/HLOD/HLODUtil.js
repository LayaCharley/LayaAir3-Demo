import { Laya } from "../../../../Laya";
import { Handler } from "../../../utils/Handler";
export class HLODConfig {
}
export class HLODBatchSubMesh {
}
export class HLODElement {
    get material() {
        return this._material;
    }
    set material(value) {
        if (this._material != value) {
            this._material && this._material._removeReference();
            this._material = value;
            this._material._addReference();
        }
    }
    get lightmap() {
        return this._lightmap;
    }
    set lightmap(value) {
        if (this._lightmap != value) {
            if (this._lightmap) {
                this._lightmap.lightmapColor._removeReference();
                this._lightmap.lightmapDirection._removeReference();
            }
            this._lightmap = value;
            this._lightmap.lightmapColor._addReference();
            this._lightmap.lightmapDirection._addReference();
        }
        this._lightmap = value;
    }
    release() {
        this.HLODMesh.destroy();
        this.material.destroy();
        if (this.lightmap) {
            this._lightmap.lightmapColor.destroy();
            this._lightmap.lightmapDirection.destroy();
        }
    }
}
export class HLODResourceGroup {
    load(callFun, hlod) {
        if (!this.loaded) {
            Laya.loader.load(this.url, Handler.create(this, (res) => {
                callFun.apply(hlod, [this]);
                this.loaded = true;
            }, [this]));
        }
    }
    release() {
        this.resources.forEach(element => {
            element.release();
        });
        this.loaded = false;
    }
}

//# sourceMappingURL=HLODUtil.js.map
