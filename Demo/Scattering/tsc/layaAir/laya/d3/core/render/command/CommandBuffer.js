import { BlitScreenQuadCMD } from "./BlitScreenQuadCMD";
import { SetRenderTargetCMD } from "./SetRenderTargetCMD";
import { SetShaderDataCMD } from "./SetShaderDataCMD";
import { DrawMeshCMD } from "./DrawMeshCMD";
import { ClearRenderTextureCMD } from "./ClearRenderTextureCMD";
import { DrawRenderCMD } from "./DrawRenderCMD";
import { SetGlobalShaderDataCMD } from "./SetGlobalShaderDataCMD";
import { DrawMeshInstancedCMD } from "./DrawMeshInstancedCMD";
import { LayaGL } from "../../../../layagl/LayaGL";
import { RenderCapable } from "../../../../RenderEngine/RenderEnum/RenderCapable";
import { ShaderDataType } from "../../../../RenderEngine/RenderShader/ShaderData";
import { Stat } from "../../../../utils/Stat";
export class CommandBuffer {
    constructor(name = null, shadowCaster = false) {
        this._shadow = false;
        this._camera = null;
        this._commands = [];
        this._name = name;
        this._shadow = shadowCaster;
    }
    get name() {
        return this._name;
    }
    get casterShadow() {
        return this._shadow;
    }
    set context(value) {
        this._context = value;
    }
    get context() {
        return this._context;
    }
    _apply() {
        for (var i = 0, n = this._commands.length; i < n; i++)
            this._commands[i].run();
        Stat.cmdDrawCall += this._commands.length;
    }
    _applyOne() {
        if (this._commands.length) {
            var cmd = this._commands.shift();
            cmd.run();
            cmd.recover();
        }
        return this._commands.length > 0;
    }
    getCommandsSize() {
        return this._commands.length;
    }
    setShaderDataTexture(shaderData, nameID, source) {
        this._commands.push(SetShaderDataCMD.create(shaderData, nameID, source, ShaderDataType.Texture2D, this));
    }
    setGlobalTexture(nameID, source) {
        this._commands.push(SetGlobalShaderDataCMD.create(nameID, source, ShaderDataType.Texture2D, this));
    }
    setShaderDataColor(shaderData, nameID, value) {
        this._commands.push(SetShaderDataCMD.create(shaderData, nameID, value, ShaderDataType.Color, this));
    }
    setGlobalColor(nameID, source) {
        this._commands.push(SetGlobalShaderDataCMD.create(nameID, source, ShaderDataType.Color, this));
    }
    setShaderDataVector(shaderData, nameID, value) {
        this._commands.push(SetShaderDataCMD.create(shaderData, nameID, value, ShaderDataType.Vector4, this));
    }
    setGlobalVector(nameID, source) {
        this._commands.push(SetGlobalShaderDataCMD.create(nameID, source, ShaderDataType.Vector4, this));
    }
    setShaderDataVector3(shaderData, nameID, value) {
        this._commands.push(SetShaderDataCMD.create(shaderData, nameID, value, ShaderDataType.Vector3, this));
    }
    setGlobalVector3(nameID, source) {
        this._commands.push(SetGlobalShaderDataCMD.create(nameID, source, ShaderDataType.Vector3, this));
    }
    setShaderDataVector2(shaderData, nameID, value) {
        this._commands.push(SetShaderDataCMD.create(shaderData, nameID, value, ShaderDataType.Vector2, this));
    }
    setGlobalVector2(nameID, source) {
        this._commands.push(SetGlobalShaderDataCMD.create(nameID, source, ShaderDataType.Vector2, this));
    }
    setShaderDataNumber(shaderData, nameID, value) {
        this._commands.push(SetShaderDataCMD.create(shaderData, nameID, value, ShaderDataType.Float, this));
    }
    setGlobalNumber(nameID, source) {
        this._commands.push(SetGlobalShaderDataCMD.create(nameID, source, ShaderDataType.Float, this));
    }
    setShaderDataInt(shaderData, nameID, value) {
        this._commands.push(SetShaderDataCMD.create(shaderData, nameID, value, ShaderDataType.Int, this));
    }
    setGlobalInt(nameID, source) {
        this._commands.push(SetGlobalShaderDataCMD.create(nameID, source, ShaderDataType.Int, this));
    }
    setShaderDataMatrix(shaderData, nameID, value) {
        this._commands.push(SetShaderDataCMD.create(shaderData, nameID, value, ShaderDataType.Matrix4x4, this));
    }
    setShaderDefine(shaderData, define, value) {
        this._commands.push(SetShaderDataCMD.create(shaderData, define, value, SetShaderDataCMD.ShaderDataType_define, this));
    }
    setGlobalMatrix(nameID, source) {
        this._commands.push(SetGlobalShaderDataCMD.create(nameID, source, ShaderDataType.Matrix4x4, this));
    }
    blitScreenQuad(source, dest, offsetScale = null, shader = null, shaderData = null, subShader = 0) {
        this._commands.push(BlitScreenQuadCMD.create(source, dest, offsetScale, shader, shaderData, subShader, BlitScreenQuadCMD._SCREENTYPE_QUAD, this));
    }
    blitScreenQuadByMaterial(source, dest, offsetScale = null, material = null, subShader = 0) {
        var shader;
        var shaderData;
        if (material) {
            shader = material._shader;
            shaderData = material.shaderData;
        }
        this._commands.push(BlitScreenQuadCMD.create(source, dest, offsetScale, shader, shaderData, subShader, BlitScreenQuadCMD._SCREENTYPE_QUAD, this));
    }
    blitScreenTriangle(source, dest, offsetScale = null, shader = null, shaderData = null, subShader = 0) {
        this._commands.push(BlitScreenQuadCMD.create(source, dest, offsetScale, shader, shaderData, subShader, BlitScreenQuadCMD._SCREENTYPE_TRIANGLE, this));
    }
    setRenderTarget(renderTexture) {
        this._commands.push(SetRenderTargetCMD.create(renderTexture));
    }
    clearRenderTarget(clearColor, clearDepth, backgroundColor, depth = 1) {
        this._commands.push(ClearRenderTextureCMD.create(clearColor, clearDepth, backgroundColor, depth, this));
    }
    drawMesh(mesh, matrix, material, submeshIndex, subShaderIndex) {
        this._commands.push(DrawMeshCMD.create(mesh, matrix, material, submeshIndex, subShaderIndex, this));
    }
    drawRender(render, material, subShaderIndex) {
        this._commands.push(DrawRenderCMD.create(render, material, subShaderIndex, this));
    }
    drawMeshInstance(mesh, subMeshIndex = 0, matrixs, material, subShaderIndex = 0, instanceProperty, drawnums) {
        if (!LayaGL.renderEngine.getCapable(RenderCapable.DrawElement_Instance))
            return null;
        var drawMeshInstancedCMD = DrawMeshInstancedCMD.create(mesh, subMeshIndex, matrixs, material, subShaderIndex, instanceProperty, drawnums, this);
        this._commands.push(drawMeshInstancedCMD);
        return drawMeshInstancedCMD;
    }
    addCustomCMD(command) {
        command._commandBuffer = this;
        this._commands.push(command);
    }
    clear() {
        for (var i = 0, n = this._commands.length; i < n; i++)
            this._commands[i].recover();
        this._commands.length = 0;
    }
}

//# sourceMappingURL=CommandBuffer.js.map
