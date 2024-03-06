import { Resource } from "../../resource/Resource";
export declare class BaseShader extends Resource {
    static activeShader: BaseShader | null;
    static bindShader: BaseShader;
    constructor();
}
