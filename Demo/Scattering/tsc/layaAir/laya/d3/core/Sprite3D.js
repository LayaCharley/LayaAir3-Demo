import { Node } from "../../display/Node";
import { Shader3D } from "../../RenderEngine/RenderShader/Shader3D";
import { LayaGL } from "../../layagl/LayaGL";
import { Stat } from "../../utils/Stat";
import { ILaya } from "../../../ILaya";
import { NodeFlags } from "../../Const";
import { Event } from "../../events/Event";
import { ShaderDataType } from "../../RenderEngine/RenderShader/ShaderData";
export var StaticFlag;
(function (StaticFlag) {
    StaticFlag[StaticFlag["Normal"] = 1] = "Normal";
    StaticFlag[StaticFlag["StaticBatch"] = 2] = "StaticBatch";
})(StaticFlag || (StaticFlag = {}));
export class Sprite3D extends Node {
    constructor(name = null, isStatic = false) {
        super();
        this._isRenderNode = 0;
        this._id = ++Sprite3D._uniqueIDCounter;
        this._is3D = true;
        this._transform = LayaGL.renderOBJCreate.createTransform(this);
        this._isStatic = isStatic ? StaticFlag.StaticBatch : StaticFlag.Normal;
        this.layer = 0;
        this.name = name ? name : "New Sprite3D";
    }
    static __init__() {
        Sprite3D.WORLDMATRIX = Shader3D.propertyNameToID("u_WorldMat");
        Sprite3D.WORLDINVERTFRONT = Shader3D.propertyNameToID("u_WroldInvertFront");
        Sprite3D.sprite3DCommandUniformMap = LayaGL.renderOBJCreate.createGlobalUniformMap("Sprite3D");
        Sprite3D.sprite3DCommandUniformMap.addShaderUniform(Sprite3D.WORLDMATRIX, "u_WorldMat", ShaderDataType.Matrix4x4);
        Sprite3D.sprite3DCommandUniformMap.addShaderUniform(Sprite3D.WORLDINVERTFRONT, "u_WroldInvertFront", ShaderDataType.Vector4);
    }
    static instantiate(original, parent = null, worldPositionStays = true, position = null, rotation = null) {
        var destSprite3D = original.clone();
        (parent) && (parent.addChild(destSprite3D));
        var transform = destSprite3D.transform;
        if (worldPositionStays) {
            var worldMatrix = transform.worldMatrix;
            original.transform.worldMatrix.cloneTo(worldMatrix);
            transform.worldMatrix = worldMatrix;
        }
        else {
            (position) && (transform.position = position);
            (rotation) && (transform.rotation = rotation);
        }
        return destSprite3D;
    }
    static load(url, complete) {
        ILaya.loader.load(url).then((res) => {
            complete && complete.runWith([res === null || res === void 0 ? void 0 : res.create()]);
        });
    }
    get id() {
        return this._id;
    }
    get layer() {
        return this._layer;
    }
    set layer(value) {
        if (this._layer !== value) {
            if (value >= 0 && value <= 30) {
                this._layer = value;
                this.event(Event.LAYERCHANGE, value);
            }
            else {
                throw new Error("Layer value must be 0-30.");
            }
        }
    }
    get isStatic() {
        return !!(this._isStatic >> 1 | 0x0);
    }
    set isStatic(value) {
        this._isStatic = value ? StaticFlag.StaticBatch : StaticFlag.Normal;
        this.event(Event.staticMask, this._isStatic);
    }
    get transform() {
        return this._transform;
    }
    get scene() {
        return this._scene;
    }
    _onActive() {
        super._onActive();
        Stat.sprite3DCount++;
    }
    _onInActive() {
        super._onInActive();
        Stat.sprite3DCount--;
    }
    _onAdded() {
        if (this._parent instanceof Sprite3D) {
            var parent3D = this._parent;
            this.transform._setParent(parent3D.transform);
        }
        else
            this.transform._onWorldTransform();
        super._onAdded();
    }
    _onRemoved() {
        super._onRemoved();
        if (this._parent instanceof Sprite3D)
            this.transform._setParent(null);
    }
    onStartListeningToType(type) {
        super.onStartListeningToType(type);
        if (type.startsWith("collision"))
            this._setBit(NodeFlags.PROCESS_COLLISIONS, true);
        else if (type.startsWith("trigger"))
            this._setBit(NodeFlags.PROCESS_TRIGGERS, true);
    }
    _parse(data, spriteMap) {
        (data.isStatic !== undefined) && (this.isStatic = data.isStatic);
        (data.active !== undefined) && (this.active = data.active);
        (data.name != undefined) && (this.name = data.name);
        (data.tag != undefined) && (this.tag = data.tag);
        if (data.position !== undefined) {
            var loccalPosition = this.transform.localPosition;
            loccalPosition.fromArray(data.position);
            this.transform.localPosition = loccalPosition;
        }
        if (data.rotationEuler !== undefined) {
            var localRotationEuler = this.transform.localRotationEuler;
            localRotationEuler.fromArray(data.rotationEuler);
            this.transform.localRotationEuler = localRotationEuler;
        }
        if (data.rotation !== undefined) {
            var localRotation = this.transform.localRotation;
            localRotation.fromArray(data.rotation);
            this.transform.localRotation = localRotation;
        }
        if (data.scale !== undefined) {
            var localScale = this.transform.localScale;
            localScale.fromArray(data.scale);
            this.transform.localScale = localScale;
        }
        (data.layer != undefined) && (this.layer = data.layer);
    }
    _cloneTo(destObject, srcRoot, dstRoot) {
        if (this._destroyed)
            throw new Error("Sprite3D: Can't be cloned if the Sprite3D has destroyed.");
        var destSprite3D = destObject;
        var trans = this._transform;
        var destTrans = destSprite3D._transform;
        destSprite3D.name = this.name;
        destSprite3D.tag = this.tag;
        destSprite3D._destroyed = this._destroyed;
        destSprite3D.active = this.active;
        destTrans.localPosition = trans.localPosition;
        destTrans.localRotation = trans.localRotation;
        destTrans.localScale = trans.localScale;
        destSprite3D._isStatic = this._isStatic;
        destSprite3D.layer = this.layer;
        super._cloneTo(destSprite3D, srcRoot, dstRoot);
    }
    static _createSprite3DInstance(scrSprite) {
        var node = scrSprite._create();
        var children = scrSprite._children;
        for (var i = 0, n = children.length; i < n; i++) {
            var child = Sprite3D._createSprite3DInstance(children[i]);
            node.addChild(child);
        }
        return node;
    }
    static _parseSprite3DInstance(srcRoot, dstRoot, scrSprite, dstSprite) {
        var srcChildren = scrSprite._children;
        var dstChildren = dstSprite._children;
        for (var i = 0, n = srcChildren.length; i < n; i++)
            Sprite3D._parseSprite3DInstance(srcRoot, dstRoot, srcChildren[i], dstChildren[i]);
        scrSprite._cloneTo(dstSprite, srcRoot, dstRoot);
    }
    clone() {
        var dstSprite3D = Sprite3D._createSprite3DInstance(this);
        Sprite3D._parseSprite3DInstance(this, dstSprite3D, this, dstSprite3D);
        return dstSprite3D;
    }
    destroy(destroyChild = true) {
        if (this._destroyed)
            return;
        super.destroy(destroyChild);
        this._transform = null;
    }
    _create() {
        return new Sprite3D();
    }
}
Sprite3D._uniqueIDCounter = 0;

//# sourceMappingURL=Sprite3D.js.map
