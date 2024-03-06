import { RenderableSprite3D } from "./RenderableSprite3D";
import { MeshFilter } from "./MeshFilter";
import { MeshRenderer } from "./MeshRenderer";
import { Loader } from "../../net/Loader";
import { Sprite3D } from "./Sprite3D";
import { Vector4 } from "../../maths/Vector4";
export class MeshSprite3D extends RenderableSprite3D {
    constructor(mesh = null, name = null) {
        super(name);
        this._meshFilter = this.addComponent(MeshFilter);
        this._render = this.addComponent(MeshRenderer);
        (mesh) && (this._meshFilter.sharedMesh = mesh);
    }
    get meshFilter() {
        return this._meshFilter;
    }
    get meshRenderer() {
        return this._render;
    }
    _parse(data, spriteMap) {
        super._parse(data, spriteMap);
        var render = this.meshRenderer;
        var lightmapIndex = data.lightmapIndex;
        (lightmapIndex != null) && (render.lightmapIndex = lightmapIndex);
        var lightmapScaleOffsetArray = data.lightmapScaleOffset;
        (lightmapScaleOffsetArray) && (render.lightmapScaleOffset = new Vector4(lightmapScaleOffsetArray[0], lightmapScaleOffsetArray[1], lightmapScaleOffsetArray[2], lightmapScaleOffsetArray[3]));
        (data.meshPath != undefined) && (this.meshFilter.sharedMesh = Loader.getRes(data.meshPath));
        (data.enableRender != undefined) && (render._enabled = data.enableRender);
        (data.receiveShadows != undefined) && (render.receiveShadow = data.receiveShadows);
        (data.castShadow != undefined) && (render.castShadow = data.castShadow);
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
    }
    _cloneTo(destObject, rootSprite, dstSprite) {
        super._cloneTo(destObject, rootSprite, dstSprite);
    }
    _create() {
        return new Sprite3D();
    }
}

//# sourceMappingURL=MeshSprite3D.js.map
