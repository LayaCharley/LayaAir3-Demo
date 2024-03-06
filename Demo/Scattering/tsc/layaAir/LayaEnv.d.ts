export declare class LayaEnv {
    static version: string;
    static isPlaying: boolean;
    static isPreview: boolean;
    static isConch: boolean;
    static beforeInit: (stageConfig: IStageConfig) => void;
    static afterInit: () => void;
}
export interface IStageConfig {
    designWidth?: number;
    designHeight?: number;
    scaleMode?: string;
    screenMode?: string;
    alignV?: string;
    alignH?: string;
    backgroundColor?: string;
}
