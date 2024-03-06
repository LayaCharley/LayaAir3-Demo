import { LayaGL } from "../../layagl/LayaGL";
import { DefineDatas } from "../../RenderEngine/RenderShader/DefineDatas";
import { Shader3D } from "../../RenderEngine/RenderShader/Shader3D";
export class ShaderProcessInfo {
}
;
export class ShaderCompileDefineBase {
    constructor(owner, name, compiledObj) {
        this._validDefine = new DefineDatas();
        this._cacheShaderHierarchy = 1;
        this._cacheSharders = {};
        this._owner = owner;
        this.name = name;
        this._VS = compiledObj.vsNode;
        this._PS = compiledObj.psNode;
        this._defs = compiledObj.defs;
        for (let k of compiledObj.defs)
            this._validDefine.add(Shader3D.getDefineByName(k));
    }
    _resizeCacheShaderMap(cacheMap, hierarchy, resizeLength) {
        var end = this._cacheShaderHierarchy - 1;
        if (hierarchy == end) {
            for (var k in cacheMap) {
                var shader = cacheMap[k];
                for (var i = 0, n = resizeLength - end; i < n; i++) {
                    if (i == n - 1)
                        cacheMap[0] = shader;
                    else
                        cacheMap = cacheMap[i == 0 ? k : 0] = {};
                }
            }
        }
        else {
            ++hierarchy;
            for (var k in cacheMap)
                this._resizeCacheShaderMap(cacheMap[k], hierarchy, resizeLength);
        }
    }
    withCompile(compileDefine) {
        var debugDefineString = ShaderCompileDefineBase._debugDefineString;
        var debugDefineMask = ShaderCompileDefineBase._debugDefineMask;
        var debugMaskLength;
        compileDefine._intersectionDefineDatas(this._validDefine);
        if (Shader3D.debugMode) {
            debugMaskLength = compileDefine._length;
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
        var defineString = ShaderCompileDefineBase._defineString;
        Shader3D._getNamesByDefineData(compileDefine, defineString);
        let shaderProcessInfo = new ShaderProcessInfo();
        shaderProcessInfo.is2D = true;
        shaderProcessInfo.vs = this._VS;
        shaderProcessInfo.ps = this._PS;
        shaderProcessInfo.attributeMap = this._owner._attributeMap;
        shaderProcessInfo.uniformMap = this._owner._uniformMap;
        shaderProcessInfo.defineString = defineString;
        shader = LayaGL.renderOBJCreate.createShaderInstance(shaderProcessInfo, this);
        cacheShaders[cacheKey] = shader;
        if (Shader3D.debugMode) {
            var defStr = "";
            var defMask = "";
            for (var i = 0, n = debugMaskLength; i < n; i++)
                (i == n - 1) ? defMask += debugDefineMask[i] : defMask += debugDefineMask[i] + ",";
            for (var i = 0, n = debugDefineString.length; i < n; i++)
                (i == n - 1) ? defStr += debugDefineString[i] : defStr += debugDefineString[i] + ",";
            console.log("%cLayaAir: Shader Compile Information---ShaderName:" + this.name + " " + " DefineMask:[" + defMask + "]" + " DefineNames:[" + defStr + "]", "color:green");
        }
        return shader;
    }
}
ShaderCompileDefineBase._defineString = [];
ShaderCompileDefineBase._debugDefineString = [];
ShaderCompileDefineBase._debugDefineMask = [];

//# sourceMappingURL=ShaderCompileDefineBase.js.map
