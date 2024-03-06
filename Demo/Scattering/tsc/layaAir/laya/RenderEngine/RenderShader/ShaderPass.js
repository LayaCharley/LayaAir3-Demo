import { ShaderCompileDefineBase, ShaderProcessInfo } from "../../webgl/utils/ShaderCompileDefineBase";
import { LayaGL } from "../../layagl/LayaGL";
import { Shader3D } from "../../RenderEngine/RenderShader/Shader3D";
import { ShaderVariant } from "../../RenderEngine/RenderShader/ShaderVariantCollection";
export class ShaderPass extends ShaderCompileDefineBase {
    constructor(owner, compiledObj) {
        super(owner, null, compiledObj);
        this._tags = {};
        this.statefirst = false;
        this._renderState = LayaGL.renderOBJCreate.createRenderState();
        this._renderState.setNull();
    }
    get renderState() {
        return this._renderState;
    }
    _addDebugShaderVariantCollection(compileDefine, outDebugDefines, outDebugDefineMask) {
        var dbugShaderVariantInfo = Shader3D._debugShaderVariantInfo;
        var debugSubShader = this._owner;
        var debugShader = debugSubShader._owner;
        var mask = compileDefine._mask;
        Shader3D._getNamesByDefineData(compileDefine, outDebugDefines);
        outDebugDefineMask.length = mask.length;
        for (var i = 0, n = mask.length; i < n; i++)
            outDebugDefineMask[i] = mask[i];
        if (dbugShaderVariantInfo)
            dbugShaderVariantInfo.setValue(debugShader, debugShader._subShaders.indexOf(debugSubShader), debugSubShader._passes.indexOf(this), outDebugDefines);
        else
            Shader3D._debugShaderVariantInfo = dbugShaderVariantInfo = new ShaderVariant(debugShader, debugShader._subShaders.indexOf(debugSubShader), debugSubShader._passes.indexOf(this), outDebugDefines);
        Shader3D.debugShaderVariantCollection.add(dbugShaderVariantInfo);
    }
    withCompile(compileDefine) {
        var debugDefineString = ShaderPass._debugDefineStrings;
        var debugDefineMask = ShaderPass._debugDefineMasks;
        var debugMaskLength;
        compileDefine._intersectionDefineDatas(this._validDefine);
        if (Shader3D.debugMode) {
            debugMaskLength = compileDefine._length;
            this._addDebugShaderVariantCollection(compileDefine, debugDefineString, debugDefineMask);
        }
        var cacheShaders = this._cacheSharders;
        var maskLength = compileDefine._length;
        if (maskLength > this._cacheShaderHierarchy) {
            this._resizeCacheShaderMap(cacheShaders, 0, maskLength);
            this._cacheShaderHierarchy = maskLength;
        }
        var mask = compileDefine._mask;
        var endIndex = compileDefine._length - 1;
        var maxEndIndex = this._cacheShaderHierarchy - 1;
        for (var i = 0; i < maxEndIndex; i++) {
            var subMask = endIndex < i ? 0 : mask[i];
            var subCacheShaders = cacheShaders[subMask];
            (subCacheShaders) || (cacheShaders[subMask] = subCacheShaders = {});
            cacheShaders = subCacheShaders;
        }
        var cacheKey = endIndex < maxEndIndex ? 0 : mask[maxEndIndex];
        var shader = cacheShaders[cacheKey];
        if (shader)
            return shader;
        let shaderProcessInfo = new ShaderProcessInfo();
        shaderProcessInfo.is2D = false;
        shaderProcessInfo.vs = this._VS;
        shaderProcessInfo.ps = this._PS;
        shaderProcessInfo.attributeMap = this._owner._attributeMap;
        shaderProcessInfo.uniformMap = this._owner._uniformMap;
        var defineString = ShaderPass._defineStrings;
        Shader3D._getNamesByDefineData(compileDefine, defineString);
        shaderProcessInfo.defineString = defineString;
        shader = LayaGL.renderOBJCreate.createShaderInstance(shaderProcessInfo, this);
        cacheShaders[cacheKey] = shader;
        if (Shader3D.debugMode) {
            var defStr = "";
            var defCommonStr = "";
            var defMask = "";
            var spriteCommonNode = "";
            for (var i = 0, n = debugMaskLength; i < n; i++) {
                (i == n - 1) ? defMask += debugDefineMask[i] : defMask += debugDefineMask[i] + ",";
            }
            for (var i = 0, n = debugDefineString.length; i < n; i++) {
                if (Shader3D._configDefineValues.has(Shader3D.getDefineByName(debugDefineString[i])))
                    defCommonStr += debugDefineString[i] + ",";
                else
                    defStr += debugDefineString[i] + ",";
            }
            for (var j = 0; j < this.nodeCommonMap.length; j++) {
                spriteCommonNode += this.nodeCommonMap[j] + ",";
            }
            console.log("%cLayaAir: Shader Compile Information---ShaderName:" + this._owner._owner._name +
                " SubShaderIndex:" + this._owner._owner._subShaders.indexOf(this._owner) +
                " PassIndex:" + this._owner._passes.indexOf(this) +
                " DefineMask:[" + defMask + "]" +
                " DefineNames:[" + defStr + "]" +
                " Environment Macro DefineNames:[" + defCommonStr + "]" +
                "Sprite CommonNode:[" + spriteCommonNode + "]", "color:green");
        }
        return shader;
    }
}
ShaderPass._defineStrings = [];
ShaderPass._debugDefineStrings = [];
ShaderPass._debugDefineMasks = [];

//# sourceMappingURL=ShaderPass.js.map
