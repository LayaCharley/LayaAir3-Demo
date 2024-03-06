import { RenderStateType } from "../../../RenderEngine/RenderEnum/RenderStateType";
import { RenderStateCommand } from "../../../RenderEngine/RenderStateCommand";
export declare class NativeRenderStateCommand extends RenderStateCommand {
    private _nativeObj;
    constructor();
    addCMD(renderstate: RenderStateType, value: any): void;
    applyCMD(): void;
    clear(): void;
}
