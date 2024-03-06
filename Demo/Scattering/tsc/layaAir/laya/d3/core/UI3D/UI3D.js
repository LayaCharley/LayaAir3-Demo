import { Sprite } from "../../../display/Sprite";
import { Matrix4x4 } from "../../../maths/Matrix4x4";
import { Vector2 } from "../../../maths/Vector2";
import { Vector3 } from "../../../maths/Vector3";
import { RenderTargetFormat } from "../../../RenderEngine/RenderEnum/RenderTargetFormat";
import { ShaderDataType } from "../../../RenderEngine/RenderShader/ShaderData";
import { RenderTexture2D } from "../../../resource/RenderTexture2D";
import { Plane } from "../../math/Plane";
import { Picker } from "../../utils/Picker";
import { Utils3D } from "../../utils/Utils3D";
import { MaterialRenderMode } from "../material/Material";
import { MeshSprite3DShaderDeclaration } from "../MeshSprite3DShaderDeclaration";
import { BaseRender } from "../render/BaseRender";
import { RenderElement } from "../render/RenderElement";
import { Sprite3D } from "../Sprite3D";
import { UI3DGeometry } from "./UI3DGeometry";
import { Event } from "../../../events/Event";
import { UnlitMaterial } from "../material/UnlitMaterial";
import { InputManager } from "../../../events/InputManager";
import { NodeFlags } from "../../../Const";
import { ILaya } from "../../../../ILaya";
import { RenderState } from "../../../RenderEngine/RenderShader/RenderState";
export class UI3D extends BaseRender {
    constructor() {
        super();
        this._sizeChange = true;
        this._view = true;
        this._bindPropertyName = "u_AlbedoTexture";
        this._hit = false;
        this._uiPlane = new Plane(new Vector3(), 0);
        this._size = new Vector2(1, 1);
        this._resolutionRate = 128;
        this._shellSprite = new Sprite();
        this._shellSprite.name = "UI3D";
        this._shellSprite._setBit(NodeFlags.DISPLAYED_INSTAGE, true);
        this._shellSprite._setBit(NodeFlags.ACTIVE_INHIERARCHY, true);
        this._shellSprite._parent = ILaya.stage;
        this._shaderValues.addDefine(MeshSprite3DShaderDeclaration.SHADERDEFINE_UV0);
        this._ui3DMat = new UnlitMaterial();
        this._ui3DMat.materialRenderMode = MaterialRenderMode.RENDERMODE_OPAQUE;
        this._ui3DMat.cull = RenderState.CULL_BACK;
    }
    set sprite(value) {
        if (value == this._uisprite)
            return;
        this._uisprite = value;
        this._shellSprite.removeChildren(0, this._shellSprite.numChildren - 1);
        if (value)
            this._shellSprite.addChild(value);
        this._resizeRT();
        this.boundsChange = true;
    }
    get sprite() {
        return this._uisprite;
    }
    set prefab(value) {
        this._prefab = value;
        if (value)
            this.sprite = value.create();
        else
            this.sprite = null;
    }
    get prefab() {
        return this._prefab;
    }
    set scale(value) {
        if (value.x <= 0 || value.y <= 0)
            return;
        value.cloneTo(this._size);
        this._resizeRT();
        this.boundsChange = true;
        this._sizeChange = true;
    }
    get scale() {
        return this._size;
    }
    set renderMode(value) {
        this.sharedMaterial.materialRenderMode = value;
        this.boundsChange = true;
    }
    get renderMode() {
        if (!this.sharedMaterial)
            this.sharedMaterial = this._ui3DMat;
        return this.sharedMaterial.materialRenderMode;
    }
    set cull(value) {
        this.sharedMaterial && (this.sharedMaterial.cull = value);
    }
    get cull() {
        let mat = this.sharedMaterial;
        if (!mat) {
            mat = this._ui3DMat;
        }
        return mat.cull;
    }
    get resolutionRate() {
        return this._resolutionRate;
    }
    set resolutionRate(value) {
        if (value <= 0)
            return;
        if (this._resolutionRate == value)
            return;
        this._resolutionRate = value;
        this._resizeRT();
    }
    get billboard() {
        return this._view;
    }
    set billboard(value) {
        this._view = value;
        this._sizeChange = true;
        this.boundsChange = true;
    }
    get enableHit() {
        return this._hit;
    }
    set enableHit(value) {
        this._hit = value;
    }
    _addRenderElement() {
        var elements = this._renderElements;
        this._setMaterialTexture();
        var material = this.sharedMaterial;
        var element = new RenderElement();
        element.setTransform(this.owner._transform);
        element.render = this;
        element.material = material;
        this._geometry = new UI3DGeometry(this);
        element.setGeometry(this._geometry);
        elements.push(element);
    }
    _resizeRT() {
        let width = this._size.x * this._resolutionRate;
        let height = this._size.y * this._resolutionRate;
        if (!this._rendertexure2D) {
            this._rendertexure2D = new RenderTexture2D(width, height, RenderTargetFormat.R8G8B8A8, RenderTargetFormat.None);
            this._rendertexure2D._invertY = true;
        }
        else {
            if (this._rendertexure2D.width != width || this._rendertexure2D.height != height) {
                this._rendertexure2D.destroy();
                this._rendertexure2D = new RenderTexture2D(width, height, RenderTargetFormat.R8G8B8A8, RenderTargetFormat.None);
                this._rendertexure2D._invertY = true;
                this._setMaterialTexture();
            }
        }
        this._submitRT();
    }
    onPreRender() {
        if (this.billboard || this._sizeChange) {
            this._sizeChange = false;
            this.boundsChange = true;
            if (this.billboard) {
                let camera = this.owner.scene.cullInfoCamera;
                this._geometry._resizeViewVertexData(this._size, camera._forward, camera._up, this.billboard, this.owner.transform.position);
            }
            else {
                this._geometry._resizeWorldVertexData(this._size, this.owner.transform.worldMatrix);
            }
        }
        this._updatePlane();
    }
    _updatePlane() {
        let posArray = this._geometry._positionArray;
        Plane.createPlaneBy3P(posArray[0], posArray[1], posArray[2], this._uiPlane);
    }
    _parseHit(hit) {
        if (!this._uisprite)
            return null;
        let WV = UI3D.temp0;
        let HV = UI3D.temp1;
        let Dir = UI3D.temp2;
        let posArray = this._geometry._positionArray;
        if (Utils3D.PointinTriangle(posArray[0], posArray[1], posArray[2], hit) || Utils3D.PointinTriangle(posArray[3], posArray[2], posArray[1], hit)) {
            Vector3.subtract(posArray[2], posArray[3], WV);
            Vector3.subtract(posArray[2], posArray[0], HV);
            Vector3.subtract(posArray[2], hit, Dir);
            Vector3.normalize(WV, WV);
            Vector3.normalize(HV, HV);
            let normalizeHitWidth = Math.abs(Vector3.dot(WV, Dir) / this.scale.x);
            let normalizeHitHeight = Math.abs(Vector3.dot(HV, Dir) / this.scale.y);
            let cx = normalizeHitWidth * this._rendertexure2D.width;
            let cy = (1 - normalizeHitHeight) * this._rendertexure2D.height;
            let target = InputManager.inst.getSpriteUnderPoint(this._uisprite, cx, cy);
            if (target)
                return target;
            else
                return this._uisprite;
        }
        return null;
    }
    getUITexture() {
        return this._rendertexure2D;
    }
    _getCameraDistance(rayOri) {
        return Vector3.distance(rayOri, this.owner.transform.position);
    }
    _renderUpdate(context, transform) {
        this._applyLightMapParams();
        this._applyReflection();
        this._setShaderValue(Sprite3D.WORLDMATRIX, ShaderDataType.Matrix4x4, Matrix4x4.DEFAULT);
        this._worldParams.x = transform.getFrontFaceValue();
        this._setShaderValue(Sprite3D.WORLDINVERTFRONT, ShaderDataType.Vector4, this._worldParams);
        return;
    }
    _submitRT() {
        this._rendertexure2D && this._shellSprite.drawToTexture(this._rendertexure2D.width, this._rendertexure2D.height, 0, 0, this._rendertexure2D);
        this._setMaterialTexture();
    }
    _setMaterialTexture() {
        if (!this.sharedMaterial)
            this.sharedMaterial = this._ui3DMat;
        if (!this.sharedMaterial.hasDefine(UnlitMaterial.SHADERDEFINE_ALBEDOTEXTURE)) {
            this.sharedMaterial.addDefine(UnlitMaterial.SHADERDEFINE_ALBEDOTEXTURE);
        }
        this.sharedMaterial.setTexture(this._bindPropertyName, this._rendertexure2D);
    }
    _checkUIPos(ray) {
        if (!this.enableHit)
            return false;
        let hitPoint = Picker.rayPlaneIntersection(ray, this._uiPlane);
        if (hitPoint) {
            return this._parseHit(hitPoint);
        }
        else {
            return false;
        }
    }
    _calculateBoundingBox() {
        var worldMat = this._transform.worldMatrix;
        this._geometry.bounds.cloneTo(this._bounds);
    }
    _onAdded() {
        super._onAdded();
        this._addRenderElement();
    }
    _onDisable() {
        super._onDisable();
        this.owner.transform.off(Event.TRANSFORM_CHANGED, this, this._transByRotate);
        this.owner.scene._UI3DManager.remove(this);
    }
    _onEnable() {
        super._onEnable();
        this.owner.scene._UI3DManager.add(this);
        this.owner.transform.on(Event.TRANSFORM_CHANGED, this, this._transByRotate);
    }
    _onDestroy() {
        super._onDestroy();
        this._rendertexure2D && this._rendertexure2D.destroy();
        this._uisprite && this._uisprite.destroy();
        this._shellSprite && this._shellSprite.destroy();
        this._ui3DMat && this._ui3DMat.destroy();
        this._resolutionRate = null;
        this._uiPlane = null;
        this._size = null;
    }
    _transByRotate() {
        if (!this.billboard) {
            this._sizeChange = true;
        }
        this.boundsChange = true;
    }
}
UI3D.temp0 = new Vector3();
UI3D.temp1 = new Vector3();
UI3D.temp2 = new Vector3();
UI3D.DEBUG = false;

//# sourceMappingURL=UI3D.js.map
