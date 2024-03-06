import { ShaderDataType } from "./RenderShader/ShaderData";
declare type UniformProperty = {
    id: number;
    propertyName: string;
    uniformtype?: ShaderDataType;
};
export declare class CommandUniformMap {
    _stateName: string;
    constructor(stateName: string);
    hasPtrID(propertyID: number): boolean;
    getMap(): {
        [key: number]: {
            block?: Object;
            propertyName: string;
            uniformtype?: ShaderDataType;
            blockProperty?: UniformProperty[];
        };
    };
    addShaderBlockUniform(propertyID: number, blockname: string, blockProperty: UniformProperty[]): void;
}
export {};
