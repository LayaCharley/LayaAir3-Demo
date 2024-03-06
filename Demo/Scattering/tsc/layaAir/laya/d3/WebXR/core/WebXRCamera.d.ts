import { Camera } from "../../core/Camera";
import { Shader3D } from "../../../RenderEngine/RenderShader/Shader3D";
import { RenderTexture } from "../../../resource/RenderTexture";
export declare class WebXRCamera extends Camera {
    private _webXRManager;
    private _clientWidth;
    private _clientHeight;
    get renderTarget(): RenderTexture;
    render(shader?: Shader3D, replacementTag?: string): void;
    protected _calculateProjectionMatrix(): void;
    destroy(): void;
}
