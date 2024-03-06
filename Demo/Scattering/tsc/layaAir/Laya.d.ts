import { Stage } from "./laya/display/Stage";
import { Loader } from "./laya/net/Loader";
import { Render } from "./laya/renders/Render";
import { Timer } from "./laya/utils/Timer";
import { IStageConfig } from "./LayaEnv";
export declare class Laya {
    static stage: Stage;
    static systemTimer: Timer;
    static physicsTimer: Timer;
    static timer: Timer;
    static loader: Loader;
    static render: Render;
    static isWXOpenDataContext: boolean;
    static isWXPosMsg: boolean;
    static init(stageConfig?: IStageConfig): Promise<void>;
    static init(width: number, height: number, ...plugins: any[]): Promise<void>;
    static initRender2D(stageConfig: IStageConfig): Promise<void>;
    static createRender(): Render;
    static addWasmModule(id: string, exports: WebAssembly.Exports, memory: WebAssembly.Memory): void;
    static alertGlobalError(value: boolean): void;
    static enableDebugPanel(debugJsPath?: string): void;
    private static isNativeRender_enable;
    private static enableNative;
}
