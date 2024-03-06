import { Material } from "../material/Material";
import { Component } from "../../../components/Component";
import { ShaderData } from "../../../RenderEngine/RenderShader/ShaderData";
import { IBaseRenderNode } from "../../../RenderEngine/RenderInterface/RenderPipelineInterface/IBaseRenderNode";
import { Bounds } from "../../math/Bounds";
import { Volume } from "../../component/Volume/Volume";
import { ReflectionProbeMode } from "../../component/Volume/reflectionProbe/ReflectionProbe";
import { Mesh } from "../../resource/models/Mesh";
import { IBoundsCell } from "../../math/IBoundsCell";
import { Vector4 } from "../../../maths/Vector4";
export declare enum RenderBitFlag {
    RenderBitFlag_CullFlag = 0,
    RenderBitFlag_Batch = 1,
    RenderBitFlag_Editor = 2,
    RenderBitFlag_InstanceBatch = 3,
    RenderBitFlag_VertexMergeBatch = 4
}
export declare class BaseRender extends Component implements IBoundsCell {
    static __init__(): void;
    static changeVertexDefine(oldMesh: Mesh, mesh: Mesh, defineDatas: ShaderData): void;
    static shaderValueInit(): void;
    sortingFudge: number;
    set ratioIgnor(value: number);
    get ratioIgnor(): number;
    get renderbitFlag(): number;
    set boundsChange(value: boolean);
    get boundsChange(): boolean;
    _receiveShadow: boolean;
    get renderNode(): IBaseRenderNode;
    set distanceForSort(value: number);
    get distanceForSort(): number;
    get geometryBounds(): Bounds;
    get id(): number;
    get lightmapIndex(): number;
    set lightmapIndex(value: number);
    get lightmapScaleOffset(): Vector4;
    set lightmapScaleOffset(value: Vector4);
    get material(): Material;
    set material(value: Material);
    get materials(): Material[];
    set materials(value: Material[]);
    get sharedMaterial(): Material;
    set sharedMaterial(value: Material);
    get sharedMaterials(): Material[];
    set sharedMaterials(value: Material[]);
    get bounds(): Bounds;
    set receiveShadow(value: boolean);
    get receiveShadow(): boolean;
    get castShadow(): boolean;
    set castShadow(value: boolean);
    set reflectionMode(value: ReflectionProbeMode);
    get reflectionMode(): ReflectionProbeMode;
    set volume(value: Volume);
    get volume(): Volume;
    constructor();
    protected _getcommonUniformMap(): Array<string>;
    protected _createBaseRenderNode(): IBaseRenderNode;
    private _changeLayer;
    private _changeStaticMask;
    protected _onAdded(): void;
    protected _onEnable(): void;
    protected _onDisable(): void;
    setRenderbitFlag(flag: number, pass: boolean): void;
    _applyReflection(): void;
    protected _onDestroy(): void;
    _cloneTo(dest: Component): void;
}
