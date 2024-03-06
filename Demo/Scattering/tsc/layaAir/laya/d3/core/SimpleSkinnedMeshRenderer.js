import { Event } from "../../events/Event";
import { SkinnedMeshRenderer } from "./SkinnedMeshRenderer";
import { SubMeshRenderElement } from "./render/SubMeshRenderElement";
import { Sprite3D } from "./Sprite3D";
import { SkinnedMeshSprite3DShaderDeclaration } from "./SkinnedMeshSprite3DShaderDeclaration";
import { ShaderDataType } from "../../RenderEngine/RenderShader/ShaderData";
import { Vector2 } from "../../maths/Vector2";
import { Vector4 } from "../../maths/Vector4";
export class SimpleSkinnedMeshRenderer extends SkinnedMeshRenderer {
    constructor() {
        super();
        this._simpleAnimatorParams = new Vector4();
        this._simpleAnimatorOffset = new Vector2();
        this._shaderValues.addDefine(SkinnedMeshSprite3DShaderDeclaration.SHADERDEFINE_SIMPLEBONE);
        this._shaderValues.addDefine(SkinnedMeshSprite3DShaderDeclaration.SHADERDEFINE_BONE);
    }
    get simpleAnimatorTexture() {
        return this._simpleAnimatorTexture;
    }
    set simpleAnimatorTexture(value) {
        this._simpleAnimatorTexture = value;
        this._simpleAnimatorTextureSize = value.width;
        this._shaderValues.setTexture(SimpleSkinnedMeshRenderer.SIMPLE_SIMPLEANIMATORTEXTURE, value);
        value._addReference();
        this._shaderValues.setNumber(SimpleSkinnedMeshRenderer.SIMPLE_SIMPLEANIMATORTEXTURESIZE, this._simpleAnimatorTextureSize);
    }
    get simpleAnimatorOffset() {
        return this._simpleAnimatorOffset;
    }
    set simpleAnimatorOffset(value) {
        value.cloneTo(this._simpleAnimatorOffset);
    }
    _getcommonUniformMap() {
        return ["Sprite3D", "SimpleSkinnedMesh"];
    }
    _createRenderElement() {
        let renderelement = new SubMeshRenderElement();
        return renderelement;
    }
    _computeAnimatorParamsData() {
        if (this._cacheMesh) {
            this._simpleAnimatorParams.x = this._simpleAnimatorOffset.x;
            this._simpleAnimatorParams.y = Math.round(this._simpleAnimatorOffset.y) * this._bonesNums * 4;
        }
    }
    _onMeshChange(value) {
        this._onSkinMeshChange(value);
        if (!value)
            return;
        this._cacheMesh = value;
    }
    _renderUpdate(context, transform) {
        var element = context.renderElement;
        if (this.rootBone) {
            var worldMat = this.rootBone.transform.worldMatrix;
            if (this._subUniformBufferData) {
                let oriMat = this._shaderValues.getMatrix4x4(Sprite3D.WORLDMATRIX);
                this._subUniformBufferData._needUpdate = oriMat ? !oriMat.equalsOtherMatrix(worldMat) : true;
            }
            this._setShaderValue(Sprite3D.WORLDMATRIX, ShaderDataType.Matrix4x4, worldMat);
            this._worldParams.x = this.rootBone.transform.getFrontFaceValue();
            this._setShaderValue(Sprite3D.WORLDINVERTFRONT, ShaderDataType.Vector4, this._worldParams);
        }
        else {
            this._setShaderValue(Sprite3D.WORLDMATRIX, ShaderDataType.Matrix4x4, transform.worldMatrix);
            this._worldParams.x = transform.getFrontFaceValue();
            this._setShaderValue(Sprite3D.WORLDINVERTFRONT, ShaderDataType.Vector4, this._worldParams);
        }
        this._computeAnimatorParamsData();
        this._shaderValues.setVector(SimpleSkinnedMeshRenderer.SIMPLE_SIMPLEANIMATORPARAMS, this._simpleAnimatorParams);
    }
    _renderUpdateWithCamera(context, transform) {
    }
    _cloneTo(dest) {
        let render = dest;
        render.simpleAnimatorOffset = this.simpleAnimatorOffset;
        render.simpleAnimatorTexture = this.simpleAnimatorTexture;
        render._bonesNums = this._bonesNums;
        super._cloneTo(dest);
    }
    _onDestroy() {
        if (this._cacheRootBone)
            (!this._cacheRootBone._destroyed) && (this._cacheRootBone.transform.off(Event.TRANSFORM_CHANGED, this, this._onWorldMatNeedChange));
        (this._simpleAnimatorTexture) && this._simpleAnimatorTexture._removeReference();
        this._simpleAnimatorTexture = null;
        super._onDestroy();
    }
}

//# sourceMappingURL=SimpleSkinnedMeshRenderer.js.map
