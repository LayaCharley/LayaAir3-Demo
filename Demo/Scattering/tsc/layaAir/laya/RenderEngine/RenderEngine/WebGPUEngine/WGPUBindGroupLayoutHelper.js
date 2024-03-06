import { LayaGL } from "../../../layagl/LayaGL";
import { Shader3D } from "../../RenderShader/Shader3D";
import { ShaderDataType } from "../../RenderShader/ShaderData";
import { WGPUShaderVariable } from "./WGPUShaderVariable";
export class WGPUBindGroupLayoutHelper {
    static getBindGroupLayoutByMap(map, out) {
        let data = map._idata;
        out.length = 0;
        for (var i in data) {
            let one = data[i];
            let shaderVariable = new WGPUShaderVariable();
            out.push(shaderVariable);
            if (one.blockProperty) {
                let entrys = [];
                shaderVariable.name = one.propertyName;
                shaderVariable.dataOffset = Shader3D.propertyNameToID(one.propertyName);
                shaderVariable.block = true;
                shaderVariable.blockProperty = [];
                for (var i in one.blockProperty) {
                    let property = one.blockProperty[i];
                    let index = 0;
                    switch (property.uniformtype) {
                        case ShaderDataType.Buffer:
                        case ShaderDataType.Matrix4x4:
                        case ShaderDataType.Vector4:
                        case ShaderDataType.Color:
                        case ShaderDataType.Vector3:
                        case ShaderDataType.Vector2:
                        case ShaderDataType.Bool:
                        case ShaderDataType.Float:
                        case ShaderDataType.Int:
                            entrys.push(WGPUBindGroupLayoutHelper.createBufferLayoutEntry(index, GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT, "uniform"));
                            shaderVariable.blockProperty.push(property);
                            break;
                        default:
                            break;
                    }
                }
                shaderVariable.groupLayout = LayaGL.renderEngine._device.createBindGroupLayout({ entries: entrys });
            }
            else {
                shaderVariable.name = one.propertyName;
                shaderVariable.type = one.uniformtype;
                shaderVariable.dataOffset = Shader3D.propertyNameToID(one.propertyName);
                switch (one.uniformtype) {
                    case ShaderDataType.Texture2D:
                        shaderVariable.groupLayout = WGPUBindGroupLayoutHelper.getTextureBindGroupLayout(GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT, "2d", false, "float", "filtering");
                        break;
                    case ShaderDataType.TextureCube:
                        shaderVariable.groupLayout = WGPUBindGroupLayoutHelper.getTextureBindGroupLayout(GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT, "cube", false, "float", "filtering");
                        break;
                    case ShaderDataType.Buffer:
                    case ShaderDataType.Matrix4x4:
                    case ShaderDataType.Vector4:
                    case ShaderDataType.Color:
                    case ShaderDataType.Vector3:
                    case ShaderDataType.Vector2:
                    case ShaderDataType.Bool:
                    case ShaderDataType.Float:
                    case ShaderDataType.Int:
                        shaderVariable.groupLayout = WGPUBindGroupLayoutHelper.getBufferBindGroupLayout(GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT, "uniform");
                        break;
                    default:
                        break;
                }
            }
        }
    }
    static getBindGroupLayoutByUniformMap(uniformMap, out) {
        out.length = 0;
        for (const key in uniformMap) {
            let shaderVariable = new WGPUShaderVariable();
            shaderVariable.name = key;
            shaderVariable.dataOffset = Shader3D.propertyNameToID(key);
            out.push(shaderVariable);
            if (typeof uniformMap[key] == "object") {
                shaderVariable.block = true;
                shaderVariable.blockProperty = [];
                let entrys = [];
                let index = 0;
                let block = uniformMap[key];
                for (const uniformName in block) {
                    let uniformType = block[uniformName];
                    switch (uniformType) {
                        case ShaderDataType.Buffer:
                        case ShaderDataType.Matrix4x4:
                        case ShaderDataType.Vector4:
                        case ShaderDataType.Color:
                        case ShaderDataType.Vector3:
                        case ShaderDataType.Vector2:
                        case ShaderDataType.Bool:
                        case ShaderDataType.Float:
                            entrys.push(WGPUBindGroupLayoutHelper.createBufferLayoutEntry(index++, GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT, "uniform"));
                            shaderVariable.blockProperty.push({ id: Shader3D.propertyNameToID(uniformName), propertyName: uniformName, uniformtype: uniformType });
                            break;
                        case ShaderDataType.Texture2D:
                            let texEntry = WGPUBindGroupLayoutHelper.createTextureLayoutEntry(index++, GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT, "2d", false, "float");
                            let samplerEntry = WGPUBindGroupLayoutHelper.createSamplerLayoutEntry(index++, GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT, "filtering");
                            entrys.push(texEntry, samplerEntry);
                            shaderVariable.blockProperty.push({ id: Shader3D.propertyNameToID(uniformName), propertyName: uniformName, uniformtype: uniformType });
                            break;
                        case ShaderDataType.TextureCube:
                            break;
                        default:
                            break;
                    }
                }
                shaderVariable.groupLayout = LayaGL.renderEngine._device.createBindGroupLayout({ entries: entrys });
            }
            else {
                shaderVariable.type = uniformMap[key];
                let unifromType = uniformMap[key];
                switch (unifromType) {
                    case ShaderDataType.Texture2D:
                        shaderVariable.groupLayout = WGPUBindGroupLayoutHelper.getTextureBindGroupLayout(GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT, "2d", false, "float", "filtering");
                        break;
                    case ShaderDataType.TextureCube:
                        shaderVariable.groupLayout = WGPUBindGroupLayoutHelper.getTextureBindGroupLayout(GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT, "cube", false, "float", "filtering");
                        break;
                    case ShaderDataType.Buffer:
                    case ShaderDataType.Matrix4x4:
                    case ShaderDataType.Vector4:
                    case ShaderDataType.Color:
                    case ShaderDataType.Vector3:
                    case ShaderDataType.Vector2:
                    case ShaderDataType.Bool:
                    case ShaderDataType.Float:
                        shaderVariable.groupLayout = WGPUBindGroupLayoutHelper.getBufferBindGroupLayout(GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT, "uniform");
                        break;
                    default:
                        break;
                }
            }
        }
    }
    static getTextureBindGroupLayout(visibility, dimension = "2d", mulsampler = false, GPUTtextureType = "float", samplerType = "filtering") {
        let texEntry = WGPUBindGroupLayoutHelper.createTextureLayoutEntry(0, visibility, dimension, mulsampler, GPUTtextureType);
        let samplerEntry = WGPUBindGroupLayoutHelper.createSamplerLayoutEntry(1, visibility, samplerType);
        let bindGroupLayoutDes = {
            entries: [
                texEntry,
                samplerEntry
            ]
        };
        return LayaGL.renderEngine._device.createBindGroupLayout(bindGroupLayoutDes);
    }
    static getBufferBindGroupLayout(visibility, bufferBindType = "uniform") {
        let bindGroupLayoutDes = {
            entries: [
                WGPUBindGroupLayoutHelper.createBufferLayoutEntry(0, visibility, bufferBindType)
            ]
        };
        return LayaGL.renderEngine._device.createBindGroupLayout(bindGroupLayoutDes);
    }
    static createBufferLayoutEntry(binding, visibility, bufferBindType, dynamicOffset = false) {
        let bufferLayout = {
            type: bufferBindType,
            hasDynamicOffset: dynamicOffset
        };
        let ob = {
            binding: binding,
            visibility: visibility,
            buffer: bufferLayout
        };
        return ob;
    }
    static createTextureLayoutEntry(binding, visibility, dimension = "2d", mulsampler = false, GPUTtextureType = "float") {
        let textureLayout = {
            sampleType: GPUTtextureType,
            viewDimension: dimension,
            multisampled: mulsampler
        };
        let ob = {
            binding: binding,
            visibility: visibility,
            texture: textureLayout
        };
        return ob;
    }
    static createSamplerLayoutEntry(binding, visibility, samplerType = "filtering") {
        let layout = {
            type: samplerType
        };
        let ob = {
            binding: binding,
            visibility: visibility,
            sampler: layout
        };
        return ob;
    }
    static createStorageTextureEntry(binding, visibility, textureFormat, dimension = "2d") {
        let layout = {
            access: "write-only",
            format: textureFormat,
            viewDimension: dimension
        };
        let ob = {
            binding: binding,
            visibility: visibility,
            storageTexture: layout
        };
        return ob;
    }
    static createExternalTextureEntry() {
        return null;
    }
}

//# sourceMappingURL=WGPUBindGroupLayoutHelper.js.map
