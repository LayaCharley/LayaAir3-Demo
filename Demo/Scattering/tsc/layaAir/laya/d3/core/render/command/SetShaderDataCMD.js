import { Command } from "./Command";
import { ShaderDataType } from "../../../../RenderEngine/RenderShader/ShaderData";
import { Shader3D } from "../../../../RenderEngine/RenderShader/Shader3D";
export class SetShaderDataCMD extends Command {
    constructor() {
        super(...arguments);
        this._shaderData = null;
        this._nameID = 0;
        this._value = null;
        this._dataType = -1;
    }
    static create(shaderData, nameID, value, shaderDataType, commandBuffer) {
        var cmd;
        cmd = SetShaderDataCMD._pool.length > 0 ? SetShaderDataCMD._pool.pop() : new SetShaderDataCMD();
        cmd._shaderData = shaderData;
        cmd._nameID = nameID;
        cmd._value = value.clone ? value.clone() : value;
        cmd._dataType = shaderDataType;
        cmd._commandBuffer = commandBuffer;
        return cmd;
    }
    run() {
        switch (this._dataType) {
            case ShaderDataType.Int:
                this._shaderData.setInt(this._nameID, this._value);
                break;
            case ShaderDataType.Float:
                this._shaderData.setNumber(this._nameID, this._value);
                break;
            case ShaderDataType.Bool:
                this._shaderData.setBool(this._nameID, this._value);
                break;
            case ShaderDataType.Matrix4x4:
                this._shaderData.setMatrix4x4(this._nameID, this._value);
                break;
            case ShaderDataType.Color:
                this._shaderData.setColor(this._nameID, this._value);
                break;
            case ShaderDataType.Texture2D:
                this._shaderData.setTexture(this._nameID, this._value);
                break;
            case ShaderDataType.Vector4:
                this._shaderData.setVector(this._nameID, this._value);
                break;
            case ShaderDataType.Vector2:
                this._shaderData.setVector2(this._nameID, this._value);
                break;
            case ShaderDataType.Vector3:
                this._shaderData.setVector3(this._nameID, this._value);
                break;
            case ShaderDataType.Buffer:
                this._shaderData.setBuffer(this._nameID, this._value);
                break;
            default:
                if (this._dataType == SetShaderDataCMD.ShaderDataType_define) {
                    let defineData = Shader3D.getDefineByName(this._nameID);
                    if (this._value)
                        this._shaderData.addDefine(defineData);
                    else
                        this._shaderData.removeDefine(defineData);
                    break;
                }
                else
                    throw "no type shaderValue on this CommendBuffer";
        }
    }
    recover() {
        SetShaderDataCMD._pool.push(this);
        this._shaderData = null;
        this._nameID = 0;
        this._value = null;
        this._dataType = -1;
    }
}
SetShaderDataCMD.ShaderDataType_define = -2;
SetShaderDataCMD._pool = [];

//# sourceMappingURL=SetShaderDataCMD.js.map
