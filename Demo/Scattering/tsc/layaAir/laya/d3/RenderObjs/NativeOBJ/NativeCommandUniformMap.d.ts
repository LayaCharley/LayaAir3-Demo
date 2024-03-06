import { CommandUniformMap } from "../../../RenderEngine/CommandUniformMap";
export declare class NativeCommandUniformMap extends CommandUniformMap {
    private _nativeObj;
    constructor(_nativeObj: any, stateName: string);
    hasPtrID(propertyID: number): boolean;
    getMap(): {
        [key: number]: {
            block?: Object;
            propertyName: string;
            uniformtype?: import("../../../RenderEngine/RenderShader/ShaderData").ShaderDataType;
            blockProperty?: {
                id: number;
                propertyName: string;
                uniformtype?: import("../../../RenderEngine/RenderShader/ShaderData").ShaderDataType;
            }[];
        };
    };
}
