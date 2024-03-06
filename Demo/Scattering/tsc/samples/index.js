import "laya/d3/core/scene/Scene3D";
import "laya/ModuleDef";
import "laya/d3/ModuleDef";
import "laya/d3/physics/ModuleDef";
import "laya/ui/ModuleDef";
import "laya/particle/ModuleDef";
import "laya/ani/ModuleDef";
import "laya/spine/ModuleDef";
import "laya/gltf/glTFLoader";
import { Resource } from "laya/resource/Resource";
import { LayaGL } from "laya/layagl/LayaGL";
import { RenderOBJCreateUtil } from "laya/d3/RenderObjs/RenderObj/RenderOBJCreateUtil";
import { Laya3D } from "Laya3D";
import { CustomPostProcess_VolumeticLIghtScattering } from "./3d/LayaAir3D_PostProcess/CustomPostProcess_VolumeticLIghtScattering";
Resource.DEBUG = true;
LayaGL.renderOBJCreate = new RenderOBJCreateUtil();
Laya3D;
// new Main(false);
// new Skeleton_MultiTexture(null)
new CustomPostProcess_VolumeticLIghtScattering();