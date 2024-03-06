import { Shader3D } from "../../RenderEngine/RenderShader/Shader3D";
import { ShaderDataType } from "../../RenderEngine/RenderShader/ShaderData";
import { ShaderDefine } from "../../RenderEngine/RenderShader/ShaderDefine";
import { UniformBufferParamsType, UnifromBufferData } from "../../RenderEngine/UniformBufferData";
import { ShaderCompile } from "../../webgl/utils/ShaderCompile";
import { ShaderPass } from "./ShaderPass";
import { VertexMesh } from "./VertexMesh";
export class SubShader {
    constructor(attributeMap = SubShader.DefaultAttributeMap, uniformMap = {}, uniformDefaultValue = null) {
        this._uniformBufferDataMap = new Map();
        this._flags = {};
        this._passes = [];
        this._attributeMap = attributeMap;
        this._uniformMap = uniformMap;
        this._uniformDefaultValue = uniformDefaultValue;
        this._uniformTypeMap = new Map();
        for (const key in uniformMap) {
            if (typeof uniformMap[key] == "object") {
                let block = (uniformMap[key]);
                let blockUniformMap = new Map();
                for (const uniformName in block) {
                    let uniformType = ShaderDataTypeToUniformBufferType(block[uniformName]);
                    blockUniformMap.set(uniformName, uniformType);
                    this._uniformTypeMap.set(uniformName, block[uniformName]);
                }
                let blockUniformIndexMap = new Map();
                blockUniformMap.forEach((value, key) => {
                    blockUniformIndexMap.set(Shader3D.propertyNameToID(key), value);
                });
                let blockData = new UnifromBufferData(blockUniformIndexMap);
                this._uniformBufferDataMap.set(key, blockData);
            }
            else {
                let unifromType = uniformMap[key];
                this._uniformTypeMap.set(key, unifromType);
                if (unifromType == ShaderDataType.Texture2D || unifromType == ShaderDataType.TextureCube) {
                    let textureGammaDefine = Shader3D.getDefineByName(`Gamma_${key}`);
                    let uniformIndex = Shader3D.propertyNameToID(key);
                    ShaderDefine._texGammaDefine[uniformIndex] = textureGammaDefine;
                }
            }
        }
    }
    static regIncludeBindUnifrom(includeName, uniformMap, defaultValue) {
        let obj = {};
        let data = obj[includeName] = {};
        data["uniformMap"] = uniformMap;
        data["defaultValue"] = defaultValue;
        Object.assign(SubShader.IncludeUniformMap, obj);
    }
    static __init__() {
        SubShader.IncludeUniformMap = {};
    }
    setFlag(key, value) {
        if (value)
            this._flags[key] = value;
        else
            delete this._flags[key];
    }
    getFlag(key) {
        return this._flags[key];
    }
    addShaderPass(vs, ps, pipelineMode = "Forward") {
        return this._addShaderPass(ShaderCompile.compile(vs, ps), pipelineMode);
    }
    _addShaderPass(compiledObj, pipelineMode = "Forward") {
        var shaderPass = new ShaderPass(this, compiledObj);
        shaderPass._pipelineMode = pipelineMode;
        this._passes.push(shaderPass);
        this._addIncludeUniform(compiledObj.includeNames);
        return shaderPass;
    }
    _addIncludeUniform(includemap) {
        for (let ele of includemap) {
            if (SubShader.IncludeUniformMap[ele]) {
                let includeBindInfo = SubShader.IncludeUniformMap[ele];
                let bindtypeMap = includeBindInfo["uniformMap"];
                let bindDefaultValue = includeBindInfo["defaultValue"];
                for (var i in bindtypeMap) {
                    if (!this._uniformTypeMap.has(i)) {
                        this._uniformTypeMap.set(i, bindtypeMap[i]);
                        this._uniformMap[i] = bindtypeMap[i];
                    }
                }
                for (var i in bindDefaultValue) {
                    if (!this._uniformDefaultValue[i]) {
                        this._uniformDefaultValue[i] = bindDefaultValue[i];
                    }
                }
            }
        }
    }
}
SubShader.DefaultAttributeMap = {
    'a_Position': [VertexMesh.MESH_POSITION0, ShaderDataType.Vector4],
    'a_Normal': [VertexMesh.MESH_NORMAL0, ShaderDataType.Vector3],
    'a_Tangent0': [VertexMesh.MESH_TANGENT0, ShaderDataType.Vector4],
    'a_Texcoord0': [VertexMesh.MESH_TEXTURECOORDINATE0, ShaderDataType.Vector2],
    'a_Texcoord1': [VertexMesh.MESH_TEXTURECOORDINATE1, ShaderDataType.Vector2],
    'a_Color': [VertexMesh.MESH_COLOR0, ShaderDataType.Vector4],
    'a_BoneWeights': [VertexMesh.MESH_BLENDWEIGHT0, ShaderDataType.Vector4],
    'a_BoneIndices': [VertexMesh.MESH_BLENDINDICES0, ShaderDataType.Vector4],
    'a_WorldMat': [VertexMesh.MESH_WORLDMATRIX_ROW0, ShaderDataType.Matrix4x4],
    'a_SimpleTextureParams': [VertexMesh.MESH_SIMPLEANIMATOR, ShaderDataType.Vector2]
};
function ShaderDataTypeToUniformBufferType(shaderDataType) {
    switch (shaderDataType) {
        case ShaderDataType.Float:
            return UniformBufferParamsType.Number;
        case ShaderDataType.Vector2:
            return UniformBufferParamsType.Vector2;
        case ShaderDataType.Vector3:
            return UniformBufferParamsType.Vector3;
        case ShaderDataType.Vector4:
        case ShaderDataType.Color:
            return UniformBufferParamsType.Vector4;
        case ShaderDataType.Matrix4x4:
            return UniformBufferParamsType.Matrix4x4;
        default:
            throw "ShaderDataType can not be in UniformBuffer.";
    }
}

//# sourceMappingURL=SubShader.js.map
