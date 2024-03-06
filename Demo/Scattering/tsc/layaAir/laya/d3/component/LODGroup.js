import { Component } from "../../components/Component";
import { BaseRender, RenderBitFlag } from "../core/render/BaseRender";
import { Sprite3D } from "../core/Sprite3D";
import { Bounds } from "../math/Bounds";
import { Event } from "../../events/Event";
import { Utils3D } from "../utils/Utils3D";
import { Vector3 } from "../../maths/Vector3";
const tempVec = new Vector3();
const tempVec1 = new Vector3();
export class LODInfo {
    constructor(mincullRate) {
        this._mincullRate = mincullRate;
        this._renders = [];
        this._cachSprite3D = [];
    }
    set mincullRate(value) {
        this._mincullRate = value;
    }
    get mincullRate() {
        return this._mincullRate;
    }
    set group(value) {
        if (value == this._group)
            return;
        if (this._group) {
            for (let i = 0, n = this._renders.length; i < n; i++) {
                let element = this._renders[i];
                element.owner.transform.off(Event.TRANSFORM_CHANGED, this._group._updateRecaculateFlag);
                element._LOD = -1;
            }
        }
        this._group = value;
        for (let i = 0, n = this._renders.length; i < n; i++) {
            let element = this._renders[i];
            element.owner.transform.on(Event.TRANSFORM_CHANGED, this._group, this._group._updateRecaculateFlag);
            element._LOD = this._lodIndex;
        }
    }
    set renders(value) {
        this._cachSprite3D = value;
        for (var i = 0, n = value.length; i < n; i++) {
            this.addNode(value[i]);
        }
    }
    get renders() {
        return this._cachSprite3D;
    }
    addNode(node) {
        if (!node)
            return;
        let ren = node;
        if (ren._isRenderNode > 0) {
            let components = ren.components;
            for (let comp of components) {
                if ((comp instanceof BaseRender) && this._renders.indexOf(comp) == -1)
                    this._renders.push(comp);
            }
            this._group && node.transform.on(Event.TRANSFORM_CHANGED, this._group, this._group._updateRecaculateFlag);
        }
        for (var i = 0, n = node.numChildren; i < n; i++) {
            this.addNode(node.getChildAt(i));
        }
    }
    removeNode(node) {
        let ren = node;
        if (ren._isRenderNode > 0) {
            let components = ren.components;
            let index;
            for (let comp of components) {
                if ((comp instanceof BaseRender) && (index = this._renders.indexOf(comp)) == -1) {
                    this._renders.splice(index, 1);
                    comp.setRenderbitFlag(RenderBitFlag.RenderBitFlag_CullFlag, false);
                    this._group && node.transform.off(Event.TRANSFORM_CHANGED, this._group._updateRecaculateFlag);
                }
            }
        }
        for (var i = 0, n = node.numChildren; i < n; i++) {
            this.removeNode(node.getChildAt(i));
        }
    }
    removeAllRender() {
        this._renders.forEach(element => {
            element.setRenderbitFlag(RenderBitFlag.RenderBitFlag_CullFlag, false);
        });
    }
}
export class LODGroup extends Component {
    constructor() {
        super();
        this._needcaculateBounds = false;
        this._lods = [];
        this._visialIndex = -1;
        this._bounds = new Bounds();
        this._lodPosition = new Vector3();
        this.runInEditor = true;
    }
    shadowCullPass() {
        return false;
    }
    get lods() {
        return this._lods;
    }
    set lods(data) {
        this._lods = data;
        for (var i = 0, n = this._lods.length; i < n; i++) {
            let element = this._lods[i];
            element._lodIndex = i;
            element.group = this;
        }
        this._updateRecaculateFlag();
        this._lodCount = this._lods.length;
    }
    get nowRate() {
        return this._nowRate;
    }
    get bounds() {
        this.recalculateBounds();
        return this._bounds;
    }
    _onEnable() {
        super._onEnable();
        for (var i = 0, n = this._lods.length; i < n; i++) {
            this._setLODinvisible(i);
        }
        this._visialIndex = -1;
        this._applyVisibleRate(1);
    }
    _onDisable() {
        super._onDisable();
        this._lods.forEach(element => {
            element.removeAllRender();
        });
    }
    _applyVisibleRate(rate) {
        for (var i = 0; i < this._lodCount; i++) {
            let lod = this._lods[i];
            if (rate > lod.mincullRate) {
                if (i == -1) {
                    this._setLODvisible(i);
                    this._visialIndex = i;
                    return;
                }
                if (i == this._visialIndex)
                    return;
                else {
                    (this._visialIndex != -1) && this._setLODinvisible(this._visialIndex);
                    this._setLODvisible(i);
                    this._visialIndex = i;
                    return;
                }
            }
        }
        if (this._visialIndex != -1) {
            this._setLODinvisible(this._visialIndex);
            this._visialIndex = -1;
        }
    }
    _setLODvisible(index) {
        let lod = this._lods[index];
        for (var i = 0, n = lod._renders.length; i < n; i++) {
            lod._renders[i].setRenderbitFlag(RenderBitFlag.RenderBitFlag_CullFlag, false);
        }
    }
    _setLODinvisible(index) {
        let lod = this._lods[index];
        for (var i = 0, n = lod._renders.length; i < n; i++) {
            lod._renders[i].setRenderbitFlag(RenderBitFlag.RenderBitFlag_CullFlag, true);
        }
    }
    onDestroy() {
        this._lods.forEach(element => {
            let renderarray = element._renders;
            for (var i = 0; i < renderarray.length; i++) {
                element.removeNode(renderarray[i].owner);
            }
        });
    }
    _updateRecaculateFlag() {
        this._needcaculateBounds = true;
    }
    _cloneTo(lodGroup) {
        super._cloneTo(lodGroup);
        let getCommomParent = (rootNode, rootCheckNode) => {
            let nodeArray = [];
            let node = rootNode;
            while (!!node) {
                if (node instanceof Sprite3D)
                    nodeArray.push(node);
                node = node.parent;
            }
            let checkNode = rootCheckNode;
            while (!!checkNode && nodeArray.indexOf(checkNode) == -1) {
                checkNode = checkNode.parent;
            }
            return checkNode;
        };
        let cloneHierachFun = (rootNode, rootCheckNode, destNode) => {
            let rootparent = getCommomParent(rootNode, rootCheckNode);
            if (!rootparent)
                return null;
            let path = [];
            Utils3D._getHierarchyPath(rootparent, rootNode, path);
            let pathcheck = [];
            Utils3D._getHierarchyPath(rootparent, rootCheckNode, pathcheck);
            let destParent = Utils3D._getParentNodeByHierarchyPath(destNode, path);
            if (!destParent)
                return null;
            return Utils3D._getNodeByHierarchyPath(destParent, pathcheck);
        };
        let lodArray = [];
        for (let i = 0, n = this._lodCount; i < n; i++) {
            let lod = this._lods[i];
            let cloneLOD = new LODInfo(lod.mincullRate);
            lodArray.push(cloneLOD);
            lod._renders.forEach(element => {
                let node = cloneHierachFun(this.owner, element.owner, lodGroup.owner);
                if (node)
                    cloneLOD.addNode(node);
            });
        }
        lodGroup.lods = lodArray;
    }
    recalculateBounds() {
        if (!this._needcaculateBounds) {
            return;
        }
        let firstBounds = true;
        for (let i = 0, n = this._lods.length; i < n; i++) {
            let lod = this._lods[i];
            lod._renders.forEach(element => {
                if (firstBounds) {
                    element.bounds.cloneTo(this._bounds);
                    firstBounds = false;
                }
                else
                    Bounds.merge(this._bounds, element.bounds, this._bounds);
            });
        }
        this._lodPosition = this._bounds.getCenter();
        let extend = this._bounds.getExtent();
        this._size = 2 * Math.max(extend.x, extend.y, extend.z);
        this._needcaculateBounds = false;
    }
    onPreRender() {
        this.recalculateBounds();
        let checkCamera = this.owner.scene.cullInfoCamera;
        let maxYDistance = checkCamera.maxlocalYDistance;
        let cameraFrustum = checkCamera.boundFrustum;
        Vector3.subtract(this._lodPosition, checkCamera.transform.position, tempVec);
        let length = tempVec.length();
        if (length > checkCamera.farPlane || cameraFrustum.containsPoint(this._lodPosition) == 0) {
            return;
        }
        let rateYDistance = length / checkCamera.farPlane * maxYDistance;
        let rate = (this._size / rateYDistance);
        this._nowRate = rate;
        this._applyVisibleRate(rate);
    }
}

//# sourceMappingURL=LODGroup.js.map
