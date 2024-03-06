import { PostProcess } from "../../component/PostProcess";
export declare class PostProcessEffect {
    constructor();
    get singleton(): boolean;
    get active(): boolean;
    set active(value: boolean);
    getCameraDepthTextureModeFlag(): number;
    effectInit(postprocess: PostProcess): void;
    release(postprocess: PostProcess): void;
}
