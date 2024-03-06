import { Component } from "../../components/Component";
import { MeshRenderer } from "./MeshRenderer";
export class MeshFilter extends Component {
    constructor() {
        super();
        this.runInEditor = true;
    }
    _onEnable() {
        const render = this.owner.getComponent(MeshRenderer);
        render && render._enabled && render._onMeshChange(this._sharedMesh);
    }
    _onDisable() {
        const render = this.owner.getComponent(MeshRenderer);
    }
    get sharedMesh() {
        return this._sharedMesh;
    }
    set sharedMesh(value) {
        if (this._sharedMesh !== value) {
            var lastValue = this._sharedMesh;
            if (lastValue) {
                lastValue._removeReference();
            }
            if (value) {
                value._addReference();
            }
            this._sharedMesh = value;
            const render = this.owner.getComponent(MeshRenderer);
            if (!render) {
                return;
            }
            render._onMeshChange(value);
            this._sharedMesh = value;
        }
    }
    _onDestroy() {
        (this._sharedMesh) && (this._sharedMesh._removeReference(), this._sharedMesh = null);
    }
    _cloneTo(dest) {
        let meshfilter = dest;
        meshfilter.sharedMesh = this.sharedMesh;
        super._cloneTo(dest);
    }
}
MeshFilter._meshVerticeDefine = [];

//# sourceMappingURL=MeshFilter.js.map
