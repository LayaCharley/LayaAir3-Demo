import { Loader } from "../../net/Loader";
import { MeshFilter } from "./MeshFilter";
import { RenderableSprite3D } from "./RenderableSprite3D";
import { Sprite3D } from "./Sprite3D";
import { SimpleSkinnedMeshRenderer } from "./SimpleSkinnedMeshRenderer";
import { Shader3D } from "../../RenderEngine/RenderShader/Shader3D";
import { LayaGL } from "../../layagl/LayaGL";
import { Vector3 } from "../../maths/Vector3";
import { Vector4 } from "../../maths/Vector4";
import { ShaderDataType } from "../../RenderEngine/RenderShader/ShaderData";
export class SimpleSkinnedMeshSprite3D extends RenderableSprite3D {
    constructor(mesh = null, name = null) {
        super(name);
        this._meshFilter = this.addComponent(MeshFilter);
        this._render = this.addComponent(SimpleSkinnedMeshRenderer);
        (mesh) && (this._meshFilter.sharedMesh = mesh);
    }
    static __init__() {
        SimpleSkinnedMeshRenderer.SIMPLE_SIMPLEANIMATORPARAMS = SimpleSkinnedMeshSprite3D.SIMPLE_SIMPLEANIMATORPARAMS;
        SimpleSkinnedMeshRenderer.SIMPLE_SIMPLEANIMATORTEXTURE = SimpleSkinnedMeshSprite3D.SIMPLE_SIMPLEANIMATORTEXTURE;
        SimpleSkinnedMeshRenderer.SIMPLE_SIMPLEANIMATORTEXTURESIZE = SimpleSkinnedMeshSprite3D.SIMPLE_SIMPLEANIMATORTEXTURESIZE;
        SimpleSkinnedMeshSprite3D.SIMPLE_SIMPLEANIMATORTEXTURE = Shader3D.propertyNameToID("u_SimpleAnimatorTexture");
        SimpleSkinnedMeshSprite3D.SIMPLE_SIMPLEANIMATORPARAMS = Shader3D.propertyNameToID("u_SimpleAnimatorParams");
        SimpleSkinnedMeshSprite3D.SIMPLE_SIMPLEANIMATORTEXTURESIZE = Shader3D.propertyNameToID("u_SimpleAnimatorTextureSize");
        const commandUniform = LayaGL.renderOBJCreate.createGlobalUniformMap("SimpleSkinnedMesh");
        commandUniform.addShaderUniform(SimpleSkinnedMeshSprite3D.SIMPLE_SIMPLEANIMATORTEXTURE, "u_SimpleAnimatorTexture", ShaderDataType.Texture2D);
        commandUniform.addShaderUniform(SimpleSkinnedMeshSprite3D.SIMPLE_SIMPLEANIMATORPARAMS, "u_SimpleAnimatorParams", ShaderDataType.Vector4);
        commandUniform.addShaderUniform(SimpleSkinnedMeshSprite3D.SIMPLE_SIMPLEANIMATORTEXTURESIZE, "u_SimpleAnimatorTextureSize", ShaderDataType.Float);
    }
    get meshFilter() {
        return this._meshFilter;
    }
    get simpleSkinnedMeshRenderer() {
        return this._render;
    }
    _parse(data, spriteMap) {
        super._parse(data, spriteMap);
        var render = this.simpleSkinnedMeshRenderer;
        var lightmapIndex = data.lightmapIndex;
        (lightmapIndex != null) && (render.lightmapIndex = lightmapIndex);
        var lightmapScaleOffsetArray = data.lightmapScaleOffset;
        (lightmapScaleOffsetArray) && (render.lightmapScaleOffset = new Vector4(lightmapScaleOffsetArray[0], lightmapScaleOffsetArray[1], lightmapScaleOffsetArray[2], lightmapScaleOffsetArray[3]));
        (data.enableRender != undefined) && (render.enabled = data.enableRender);
        (data.receiveShadows != undefined) && (render.receiveShadow = data.receiveShadows);
        (data.castShadow != undefined) && (render.castShadow = data.castShadow);
        let meshPath = data.meshPath;
        if (meshPath) {
            let mesh = Loader.getRes(meshPath);
            (mesh) && (this.meshFilter.sharedMesh = mesh);
        }
        var materials = data.materials;
        if (materials) {
            let sharedMaterials = render.sharedMaterials;
            let materialCount = materials.length;
            sharedMaterials.length = materialCount;
            for (let i = 0; i < materialCount; i++) {
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
            let rootBoneData = data.rootBone;
            render.rootBone = spriteMap[rootBoneData];
            let bonesData = data.bones;
            for (let i = 0, n = bonesData.length; i < n; i++)
                render.bones.push(spriteMap[bonesData[i]]);
            render._bonesNums = data.bonesNums ? data.bonesNums : render.bones.length;
        }
        var animatorTexture = data.animatorTexture;
        if (animatorTexture) {
            let animatortexture = Loader.getRes(animatorTexture, Loader.TEXTURE2D);
            render.simpleAnimatorTexture = animatortexture;
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
SimpleSkinnedMeshSprite3D._tempArray0 = [];

//# sourceMappingURL=SimpleSkinnedMeshSprite3D.js.map
