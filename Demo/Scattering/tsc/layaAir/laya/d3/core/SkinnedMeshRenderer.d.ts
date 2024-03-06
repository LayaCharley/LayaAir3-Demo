import { MeshRenderer } from "./MeshRenderer";
import { Sprite3D } from "./Sprite3D";
import { Scene3D } from "./scene/Scene3D";
import { Bounds } from "../math/Bounds";
export declare class SkinnedMeshRenderer extends MeshRenderer {
    _bones: Sprite3D[];
    get localBounds(): Bounds;
    set localBounds(value: Bounds);
    get rootBone(): Sprite3D;
    set rootBone(value: Sprite3D);
    get bones(): Sprite3D[];
    constructor();
    protected _computeSkinnedData(): void;
    protected _computeSkinnedDataForNative(): void;
    _setBelongScene(scene: Scene3D): void;
    protected _onDestroy(): void;
}
