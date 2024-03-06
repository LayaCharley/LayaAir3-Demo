import { ShaderDataType } from "../../RenderShader/ShaderData";
export class WGPUBindGroupHelper {
    static getBindGroupbyUniformMap(shaderVariable, shaderData) {
        let sourceMap = shaderData._dataBindGroupResourceMap;
        let bindgroup;
        if (shaderVariable.block) {
            let entrys = [];
            let map = shaderVariable.blockProperty;
            let bindIndex = 0;
            for (var i = 0, n = map.length; i < n; i++) {
                let property = map[i];
                switch (property.uniformtype) {
                    case ShaderDataType.Buffer:
                    case ShaderDataType.Matrix4x4:
                    case ShaderDataType.Vector4:
                    case ShaderDataType.Color:
                    case ShaderDataType.Vector3:
                    case ShaderDataType.Vector2:
                    case ShaderDataType.Bool:
                    case ShaderDataType.Float:
                        entrys.push(WGPUBindGroupHelper.createBufferBindGroupEntry(bindIndex++, sourceMap[shaderVariable.dataOffset]._gpuBuffer, sourceMap[shaderVariable.dataOffset]._size));
                        break;
                    case ShaderDataType.Texture2D:
                    case ShaderDataType.TextureCube:
                        entrys.push(WGPUBindGroupHelper.createTextureBindGroupEntry(bindIndex++, sourceMap[shaderVariable.dataOffset].textureView));
                        entrys.push(WGPUBindGroupHelper.createSamplerBindGroupEntry(bindIndex++, sourceMap[shaderVariable.dataOffset].webgpuSampler));
                        break;
                }
            }
            let descriptor = {
                layout: shaderVariable.groupLayout,
                entries: entrys
            };
            bindgroup = this.device.createBindGroup(descriptor);
        }
        else {
            switch (shaderVariable.type) {
                case ShaderDataType.Buffer:
                case ShaderDataType.Matrix4x4:
                case ShaderDataType.Vector4:
                case ShaderDataType.Color:
                case ShaderDataType.Vector3:
                case ShaderDataType.Vector2:
                case ShaderDataType.Bool:
                case ShaderDataType.Float:
                    bindgroup = WGPUBindGroupHelper.getBufferBindGroup(shaderVariable, sourceMap[shaderVariable.dataOffset]._gpuBuffer, sourceMap[shaderVariable.dataOffset]._size);
                    break;
                case ShaderDataType.Texture2D:
                case ShaderDataType.TextureCube:
                    bindgroup = WGPUBindGroupHelper.getTextureBindGroup(shaderVariable, sourceMap[shaderVariable.dataOffset]);
                    break;
            }
        }
        return bindgroup;
    }
    static getBufferBindGroup(shaderVariable, databuffer, size, offset = 0) {
        let descriptor = {
            layout: shaderVariable.groupLayout,
            entries: [WGPUBindGroupHelper.createBufferBindGroupEntry(0, databuffer, size, offset)]
        };
        let bindgroup = this.device.createBindGroup(descriptor);
        bindgroup.label = "buffer: \n \tsize:" + size.toString() + "\n\t name:" + shaderVariable.name + "\n\t location" + shaderVariable.location;
        return bindgroup;
    }
    static getTextureBindGroup(shaderVariable, internalTexture) {
        let descriptor = {
            layout: shaderVariable.groupLayout,
            entries: [WGPUBindGroupHelper.createTextureBindGroupEntry(0, internalTexture.textureView),
                WGPUBindGroupHelper.createSamplerBindGroupEntry(1, internalTexture.webgpuSampler)
            ]
        };
        return this.device.createBindGroup(descriptor);
    }
    static createBufferBindGroupEntry(bindIndex, databuffer, size, offset = 0) {
        let gpubufferResource = {
            buffer: databuffer,
            offset: offset
        };
        if (size < 0) {
            gpubufferResource.size = size;
        }
        let entry = {
            binding: bindIndex,
            resource: gpubufferResource
        };
        return entry;
    }
    static createSamplerBindGroupEntry(bindIndex, sampler) {
        let entry = {
            binding: bindIndex,
            resource: sampler
        };
        return entry;
    }
    static createTextureBindGroupEntry(bindIndex, texture) {
        let entry = {
            binding: bindIndex,
            resource: texture
        };
        return entry;
    }
    static createExternalTextureBindGroupEntry() {
    }
}

//# sourceMappingURL=WGPUBindGroupHelper.js.map
