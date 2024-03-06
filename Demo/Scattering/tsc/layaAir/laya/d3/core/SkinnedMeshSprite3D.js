import { Loader } from "../../net/Loader";
import { MeshFilter } from "./MeshFilter";
import { RenderableSprite3D } from "./RenderableSprite3D";
import { SkinnedMeshRenderer } from "./SkinnedMeshRenderer";
import { Sprite3D } from "./Sprite3D";
import { SkinnedMeshSprite3DShaderDeclaration } from "./SkinnedMeshSprite3DShaderDeclaration";
import { Shader3D } from "../../RenderEngine/RenderShader/Shader3D";
import { LayaGL } from "../../layagl/LayaGL";
import { Vector3 } from "../../maths/Vector3";
import { Vector4 } from "../../maths/Vector4";
import { ShaderDataType } from "../../RenderEngine/RenderShader/ShaderData";
export class SkinnedMeshSprite3D extends RenderableSprite3D {
    constructor(mesh = null, name = null) {
        super(name);
        this._meshFilter = this.addComponent(MeshFilter);
        this._render = this.addComponent(SkinnedMeshRenderer);
        (mesh) && (this._meshFilter.sharedMesh = mesh);
    }
    static __init__() {
        SkinnedMeshSprite3DShaderDeclaration.SHADERDEFINE_BONE = Shader3D.getDefineByName("BONE");
        SkinnedMeshSprite3DShaderDeclaration.SHADERDEFINE_SIMPLEBONE = Shader3D.getDefineByName("SIMPLEBONE");
        const commandUniform = LayaGL.renderOBJCreate.createGlobalUniformMap("Custom");
        SkinnedMeshSprite3D.BONES = Shader3D.propertyNameToID("u_Bones");
        commandUniform.addShaderUniform(SkinnedMeshSprite3D.BONES, "u_Bones", ShaderDataType.Buffer);
    }
    get meshFilter() {
        return this._meshFilter;
    }
    get skinnedMeshRenderer() {
        return this._render;
    }
    _parse(data, spriteMap) {
        super._parse(data, spriteMap);
        var render = this.skinnedMeshRenderer;
        var lightmapIndex = data.lightmapIndex;
        (lightmapIndex != null) && (render.lightmapIndex = lightmapIndex);
        var lightmapScaleOffsetArray = data.lightmapScaleOffset;
        (lightmapScaleOffsetArray) && (render.lightmapScaleOffset = new Vector4(lightmapScaleOffsetArray[0], lightmapScaleOffsetArray[1], lightmapScaleOffsetArray[2], lightmapScaleOffsetArray[3]));
        (data.enableRender != undefined) && (render.enabled = data.enableRender);
        (data.receiveShadows != undefined) && (render.receiveShadow = data.receiveShadows);
        (data.castShadow != undefined) && (render.castShadow = data.castShadow);
        var meshPath;
        meshPath = data.meshPath;
        if (meshPath) {
            var mesh = Loader.getRes(meshPath);
            (mesh) && (this.meshFilter.sharedMesh = mesh);
        }
        var materials = data.materials;
        if (materials) {
            var sharedMaterials = render.sharedMaterials;
            var materialCount = materials.length;
            sharedMaterials.length = materialCount;
            for (var i = 0; i < materialCount; i++) {
                sharedMaterials[i] = Loader.getRes(materials[i].path);
            }
            render.sharedMaterials = sharedMaterials;
        }
        var boundBox = data.boundBox;
        var min = boundBox.min;
        var max = boundBox.max;
        render.localBounds.setMin(new Vector3(min[0], min[1], min[2]));
        render.localBounds.setMax(new Vector3(max[0], max[1], max[2]));
        render.localBounds = render.localBounds;
        if (spriteMap) {
            var rootBoneData = data.rootBone;
            render.rootBone = spriteMap[rootBoneData];
            var bonesData = data.bones;
            var n;
            for (i = 0, n = bonesData.length; i < n; i++)
                render.bones.push(spriteMap[bonesData[i]]);
        }
    }
    _cloneTo(destObject, srcRoot, dstRoot) {
        super._cloneTo(destObject, srcRoot, dstRoot);
    }
    destroy(destroyChild = true) {
        if (this._destroyed)
            return;
        super.destroy(destroyChild);
        this._meshFilter.destroy();
    }
    _create() {
        return new Sprite3D();
    }
}
SkinnedMeshSprite3D._tempArray0 = [];

//# sourceMappingURL=SkinnedMeshSprite3D.js.map
