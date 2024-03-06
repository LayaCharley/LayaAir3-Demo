import { RenderStateType } from "./RenderEnum/RenderStateType";
export declare class RenderStateCommand {
    cmdArray: Map<RenderStateType, any>;
    constructor();
    addCMD(renderstate: RenderStateType, value: number | boolean | Array<number>): void;
    applyCMD(): void;
    clear(): void;
}
