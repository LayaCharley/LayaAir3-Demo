import { Vector3 } from "../../../../maths/Vector3";
import { ShaderData } from "../../../../RenderEngine/RenderShader/ShaderData";
import { Texture2D } from "../../../../resource/Texture2D";
import { Volume } from "../Volume";
export declare class VolumetricGI extends Volume {
    probeCounts: Vector3;
    probeStep: Vector3;
    private _params;
    private _irradiance;
    set irradiance(value: Texture2D);
    private _distance;
    set distance(value: Texture2D);
    intensity: number;
    constructor();
    get normalBias(): number;
    set normalBias(value: number);
    get viewBias(): number;
    set viewBias(value: number);
    get irradianceTexel(): number;
    get distanceTexel(): number;
    applyVolumetricGI(shaderData: ShaderData): void;
    _onDestroy(): void;
    _cloneTo(dest: VolumetricGI): void;
}
