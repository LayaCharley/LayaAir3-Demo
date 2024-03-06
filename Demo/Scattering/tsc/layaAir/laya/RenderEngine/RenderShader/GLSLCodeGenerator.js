import { ShaderDataType } from "../../RenderEngine/RenderShader/ShaderData";
export class GLSLCodeGenerator {
    static glslAttributeString(attributeMap) {
        let res = "";
        for (const key in attributeMap) {
            let type = getAttributeType(attributeMap[key][1]);
            res = `${res}attribute ${type} ${key};\n`;
        }
        return res;
    }
    static glslUniformString(uniformsMap, useUniformBlock) {
        if (useUniformBlock) {
            let blocksStr = "";
            let uniformsStr = "";
            for (const key in uniformsMap) {
                if (typeof uniformsMap[key] == "object") {
                    let blockUniforms = uniformsMap[key];
                    blocksStr += `uniform ${key} {\n`;
                    for (const uniformName in blockUniforms) {
                        let dataType = blockUniforms[uniformName];
                        blocksStr += `${getAttributeType(dataType)} ${uniformName};\n`;
                    }
                    blocksStr += "};\n";
                }
                else {
                    let dataType = uniformsMap[key];
                    uniformsStr += `uniform ${getAttributeType(dataType)} ${key};\n`;
                }
            }
            return blocksStr + uniformsStr;
        }
        else {
            let uniformsStr = "";
            for (const key in uniformsMap) {
                if (typeof uniformsMap[key] == "object") {
                    let blockUniforms = uniformsMap[key];
                    for (const uniformName in blockUniforms) {
                        let dataType = blockUniforms[uniformName];
                        uniformsStr += `uniform ${getAttributeType(dataType)} ${uniformName};\n`;
                    }
                }
                else {
                    let dataType = uniformsMap[key];
                    uniformsStr += `uniform ${getAttributeType(dataType)} ${key};\n`;
                }
            }
            return uniformsStr;
        }
    }
}
function getAttributeType(type) {
    switch (type) {
        case ShaderDataType.Int:
            return "int";
        case ShaderDataType.Bool:
            return "bool";
        case ShaderDataType.Float:
            return "float";
        case ShaderDataType.Vector2:
            return "vec2";
        case ShaderDataType.Vector3:
            return "vec3";
        case ShaderDataType.Vector4:
        case ShaderDataType.Color:
            return "vec4";
        case ShaderDataType.Matrix4x4:
            return "mat4";
        case ShaderDataType.Matrix3x3:
            return "mat3";
        case ShaderDataType.Texture2D:
            return "sampler2D";
        case ShaderDataType.TextureCube:
            return "samplerCube";
        default:
            return "";
    }
}

//# sourceMappingURL=GLSLCodeGenerator.js.map
