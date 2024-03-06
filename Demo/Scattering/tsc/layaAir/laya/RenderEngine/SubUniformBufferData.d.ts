import { UniformBufferParamsType, UnifromBufferData } from "./UniformBufferData";
export declare class SubUniformBufferData extends UnifromBufferData {
    _isInPool: boolean;
    _needUpdate: boolean;
    constructor(uniformParamsStat: Map<number, UniformBufferParamsType>, bufferOffset: number);
}
