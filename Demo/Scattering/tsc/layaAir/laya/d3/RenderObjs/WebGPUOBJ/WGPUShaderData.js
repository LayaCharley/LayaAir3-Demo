import { WGPUBindGroupHelper } from "../../../RenderEngine/RenderEngine/WebGPUEngine/WGPUBindGroupHelper";
import { WebGPUBuffer } from "../../../RenderEngine/RenderEngine/WebGPUEngine/WebGPUBuffer";
import { ShaderData } from "../../../RenderEngine/RenderShader/ShaderData";
import { LayaGL } from "../../../layagl/LayaGL";
import { Color } from "../../../maths/Color";
import { Matrix4x4 } from "../../../maths/Matrix4x4";
import { Vector2 } from "../../../maths/Vector2";
import { Vector3 } from "../../../maths/Vector3";
import { Vector4 } from "../../../maths/Vector4";
import { BaseTexture } from "../../../resource/BaseTexture";
import { Resource } from "../../../resource/Resource";
import { SingletonList } from "../../../utils/SingletonList";
;
export class WGPUShaderData extends ShaderData {
    constructor() {
        super();
        this._ownerResource = null;
        this._dataBindGroupResourceMap = {};
        this._dataBindGroupCacheMap = {};
        this.changeList = new SingletonList();
        this.reBindResourceList = new SingletonList();
        this.needReBuildDataCacheNode = new SingletonList();
        this._device = LayaGL.renderEngine._device;
    }
    _setChangeFlag(index) {
        this.changeList.add(index);
    }
    uploadUniformOneValue(value, index) {
        let gpubuffer = this._dataBindGroupResourceMap[index];
        if (typeof value == "boolean") {
            value = value ? 1 : 0;
        }
        if (!gpubuffer || !(gpubuffer instanceof WebGPUBuffer) || gpubuffer._size != 4) {
            if (gpubuffer && gpubuffer instanceof WebGPUBuffer) {
                gpubuffer.destroy();
            }
            gpubuffer = this._dataBindGroupResourceMap[index] = LayaGL.renderEngine.createUniformBuffer(4);
            this.reBindResourceList.add(index);
        }
        WGPUShaderData.arrayOne[0] = value;
        this._device.queue.writeBuffer(gpubuffer._gpuBuffer, 0, WGPUShaderData.arrayOne.buffer, 0, 4);
    }
    uploadUniformVec2Value(value, index) {
        let gpubuffer = this._dataBindGroupResourceMap[index];
        let size = 8;
        if (!gpubuffer || !(gpubuffer instanceof WebGPUBuffer) || gpubuffer._size != size) {
            if (gpubuffer && gpubuffer instanceof WebGPUBuffer) {
                gpubuffer.destroy();
            }
            gpubuffer = this._dataBindGroupResourceMap[index] = LayaGL.renderEngine.createUniformBuffer(size);
            this.reBindResourceList.add(index);
        }
        WGPUShaderData.arrayVec2[0] = value.x;
        WGPUShaderData.arrayVec2[1] = value.y;
        this._device.queue.writeBuffer(gpubuffer._gpuBuffer, 0, WGPUShaderData.arrayVec2.buffer, 0, size);
    }
    uploadUniformVec3Value(value, index) {
        let gpubuffer = this._dataBindGroupResourceMap[index];
        let size = 12;
        if (!gpubuffer || !(gpubuffer instanceof WebGPUBuffer) || gpubuffer._size != size) {
            if (gpubuffer && gpubuffer instanceof WebGPUBuffer) {
                gpubuffer.destroy();
            }
            gpubuffer = this._dataBindGroupResourceMap[index] = LayaGL.renderEngine.createUniformBuffer(size);
            this.reBindResourceList.add(index);
        }
        WGPUShaderData.arrayVec3[0] = value.x;
        WGPUShaderData.arrayVec3[1] = value.y;
        WGPUShaderData.arrayVec3[2] = value.z;
        this._device.queue.writeBuffer(gpubuffer._gpuBuffer, 0, WGPUShaderData.arrayVec3.buffer, 0, size);
    }
    uploadUniformVec4Value(value, index) {
        let gpubuffer = this._dataBindGroupResourceMap[index];
        let size = 16;
        if (gpubuffer || !(gpubuffer instanceof WebGPUBuffer) || gpubuffer._size != size) {
            if (gpubuffer && gpubuffer instanceof WebGPUBuffer) {
                gpubuffer.destroy();
            }
            gpubuffer = this._dataBindGroupResourceMap[index] = LayaGL.renderEngine.createUniformBuffer(size);
            this.reBindResourceList.add(index);
        }
        WGPUShaderData.arrayVec4[0] = value.x;
        WGPUShaderData.arrayVec4[1] = value.y;
        WGPUShaderData.arrayVec4[2] = value.z;
        WGPUShaderData.arrayVec4[3] = value.w;
        this._device.queue.writeBuffer(gpubuffer._gpuBuffer, 0, WGPUShaderData.arrayVec4.buffer, 0, size);
    }
    uploadUniformMatValue(value, index) {
        let gpubuffer = this._dataBindGroupResourceMap[index];
        let size = 16 * 4;
        if (gpubuffer || !(gpubuffer instanceof WebGPUBuffer) || gpubuffer._size != size) {
            if (gpubuffer && gpubuffer instanceof WebGPUBuffer) {
                gpubuffer.destroy();
            }
            gpubuffer = this._dataBindGroupResourceMap[index] = LayaGL.renderEngine.createUniformBuffer(size);
            this.reBindResourceList.add(index);
        }
        this._device.queue.writeBuffer(gpubuffer._gpuBuffer, 0, value.elements.buffer, 0, size);
    }
    uploadUniformBufferValue(value, index) {
        let gpubuffer = this._dataBindGroupResourceMap[index];
        let size = value.byteLength;
        if (gpubuffer || !(gpubuffer instanceof WebGPUBuffer) || gpubuffer._size != size) {
            if (gpubuffer && gpubuffer instanceof WebGPUBuffer) {
                gpubuffer.destroy();
            }
            gpubuffer = this._dataBindGroupResourceMap[index] = LayaGL.renderEngine.createUniformBuffer(size);
            this.reBindResourceList.add(index);
        }
        this._device.queue.writeBuffer(gpubuffer._gpuBuffer, 0, value, 0, size);
    }
    uploadUniformTexture(value, index) {
        this.reBindResourceList.add(index);
        this._dataBindGroupResourceMap[index] = value._texture;
    }
    rebindResource() {
        this.needReBuildDataCacheNode.length = 0;
        for (var i = 0, n = this.reBindResourceList.length; i < n; i++) {
            let propertyID = this.reBindResourceList.elements[i];
            for (var cacheIndex in this._dataBindGroupCacheMap) {
                let cacheBindGroupData = this._dataBindGroupCacheMap[cacheIndex];
                if (cacheBindGroupData.needUpdate(propertyID)) {
                    this.needReBuildDataCacheNode.add(cacheBindGroupData);
                }
            }
        }
        for (var i = 0, n = this.needReBuildDataCacheNode.length; i < n; i++) {
            let cacheNode = this.needReBuildDataCacheNode.elements[i];
            cacheNode.rebuild(this);
        }
    }
    setInt(index, value) {
        if (this._data[index] == value)
            return;
        super.setInt(index, value);
        this._setChangeFlag(index);
    }
    setBool(index, value) {
        if (this._data[index] == value)
            return;
        super.setBool(index, value);
        this._setChangeFlag(index);
    }
    setNumber(index, value) {
        if (this._data[index] == value)
            return;
        super.setNumber(index, value);
        this._setChangeFlag(index);
    }
    setVector2(index, value) {
        let v2 = this._data[index];
        if (v2 && v2 instanceof Vector2 && Vector2.equals(v2, value))
            return;
        super.setVector2(index, value);
        this._setChangeFlag(index);
    }
    setVector3(index, value) {
        let v3 = this._data[index];
        if (v3 && v3 instanceof Vector3 && Vector3.equals(v3, value))
            return;
        super.setVector3(index, value);
        this._setChangeFlag(index);
    }
    setVector(index, value) {
        let v4 = this._data[index];
        if (v4 && v4 instanceof Vector4 && Vector4.equals(v4, value))
            return;
        super.setVector(index, value);
        this._setChangeFlag(index);
    }
    setColor(index, value) {
        let color = this.getColor(index);
        if (color && color instanceof Color && color.equal(value))
            return;
        super.setColor(index, value);
        this._setChangeFlag(index);
    }
    setMatrix4x4(index, value) {
        let mat = this._data[index];
        if (mat && mat instanceof Matrix4x4 && value.equalsOtherMatrix(mat))
            return;
        super.setMatrix4x4(index, value);
        this._setChangeFlag(index);
    }
    setBuffer(index, value) {
        super.setBuffer(index, value);
        this._setChangeFlag(index);
    }
    setTexture(index, value) {
        super.setTexture(index, value);
        this._setChangeFlag(index);
    }
    updateBindGroup() {
        if (!this.changeList.length)
            return;
        this.reBindResourceList.length = 0;
        for (var i = 0, n = this.changeList.length; i < n; i++) {
            let index = this.changeList.elements[i];
            let value = this._data[index];
            if (typeof value == "number" || typeof value == "number" || typeof value == "boolean") {
                this.uploadUniformOneValue(value, index);
            }
            else if (value instanceof Vector2) {
                this.uploadUniformVec2Value(value, index);
            }
            else if (value instanceof Vector3) {
                this.uploadUniformVec3Value(value, index);
            }
            else if (value instanceof Vector4) {
                this.uploadUniformVec4Value(value, index);
            }
            else if (value instanceof Matrix4x4) {
                this.uploadUniformMatValue(value, index);
            }
            else if (value instanceof BaseTexture) {
                this.uploadUniformTexture(value, index);
            }
            else if (value instanceof SharedArrayBuffer) {
                this.uploadUniformBufferValue(value, index);
            }
            else if (value instanceof Resource) {
            }
        }
        this.changeList.length = 0;
        this.rebindResource();
    }
    clearBindGroup() {
    }
    getBindGroup(shaderVariable) {
        let cacheNode = this._dataBindGroupCacheMap[shaderVariable.onID];
        if (!cacheNode) {
            cacheNode = this._dataBindGroupCacheMap[shaderVariable.onID] = new ShaderDataCacheNode(shaderVariable, this);
        }
        return cacheNode.bindGroup;
    }
    destroy() {
        super.destroy();
    }
}
WGPUShaderData.arrayOne = new Float32Array(1);
WGPUShaderData.arrayVec2 = new Float32Array(2);
WGPUShaderData.arrayVec3 = new Float32Array(3);
WGPUShaderData.arrayVec4 = new Float32Array(4);
export class ShaderDataCacheNode {
    constructor(variable, shaderData) {
        this.shaderVariable = variable;
        this.rebuild(shaderData);
    }
    needUpdate(propertyIndex) {
        return this.shaderVariable.containProperty(propertyIndex);
    }
    rebuild(shaderData) {
        if (this.bindGroup)
            delete this.bindGroup;
        this.bindGroup = WGPUBindGroupHelper.getBindGroupbyUniformMap(this.shaderVariable, shaderData);
    }
    destroy() {
        delete this.bindGroup;
    }
}

//# sourceMappingURL=WGPUShaderData.js.map
