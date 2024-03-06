import { Command } from "./Command";
import { RenderContext3D } from "../RenderContext3D";
import { LayaGL } from "../../../../layagl/LayaGL";
import { ShaderDataType } from "../../../../RenderEngine/RenderShader/ShaderData";
export class SetGlobalShaderDataCMD extends Command {
    constructor() {
        super(...arguments);
        this._nameID = 0;
        this._value = null;
        this._dataType = -1;
    }
    static create(nameID, value, shaderDataType, commandBuffer) {
        var cmd;
        cmd = SetGlobalShaderDataCMD._pool.length > 0 ? SetGlobalShaderDataCMD._pool.pop() : new SetGlobalShaderDataCMD();
        cmd._nameID = nameID;
        cmd._value = value;
        cmd._dataType = shaderDataType;
        cmd._commandBuffer = commandBuffer;
        return cmd;
    }
    run() {
        let context = RenderContext3D._instance;
        let shaderData = context._contextOBJ.globalShaderData;
        if (!shaderData)
            shaderData = context._contextOBJ.globalShaderData = LayaGL.renderOBJCreate.createShaderData(null);
        switch (this._dataType) {
            case ShaderDataType.Int:
                shaderData.setInt(this._nameID, this._value);
                break;
            case ShaderDataType.Float:
                shaderData.setNumber(this._nameID, this._value);
                break;
            case ShaderDataType.Bool:
                shaderData.setBool(this._nameID, this._value);
                break;
            case ShaderDataType.Matrix4x4:
                shaderData.setMatrix4x4(this._nameID, this._value);
                break;
            case ShaderDataType.Texture2D:
                shaderData.setTexture(this._nameID, this._value);
                break;
            case ShaderDataType.Vector4:
                shaderData.setVector(this._nameID, this._value);
                break;
            case ShaderDataType.Vector2:
                shaderData.setVector2(this._nameID, this._value);
                break;
            case ShaderDataType.Vector3:
                shaderData.setVector3(this._nameID, this._value);
                break;
            case ShaderDataType.Buffer:
                shaderData.setBuffer(this._nameID, this._value);
                break;
            case ShaderDataType.Color:
                shaderData.setColor(this._nameID, this._value);
                break;
            default:
                throw "no type shaderValue on this CommendBuffer";
        }
    }
    recover() {
        SetGlobalShaderDataCMD._pool.push(this);
        this._nameID = 0;
        this._value = null;
        this._dataType = -1;
    }
}
SetGlobalShaderDataCMD._pool = [];

//# sourceMappingURL=SetGlobalShaderDataCMD.js.map
