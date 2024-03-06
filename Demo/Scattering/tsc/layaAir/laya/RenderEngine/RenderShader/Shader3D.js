import { LayaGL } from "../../layagl/LayaGL";
import { ShaderCompile } from "../../webgl/utils/ShaderCompile";
import { DefineDatas } from "./DefineDatas";
import { ShaderDefine } from "./ShaderDefine";
import { ShaderVariantCollection } from "./ShaderVariantCollection";
import { SubShader } from "./SubShader";
export class Shader3D {
    constructor(name, enableInstancing, supportReflectionProbe) {
        this._enableInstancing = false;
        this._supportReflectionProbe = false;
        this._subShaders = [];
        this._name = name;
        this._enableInstancing = enableInstancing;
        this._supportReflectionProbe = supportReflectionProbe;
    }
    static init() {
        Shader3D.debugShaderVariantCollection = new ShaderVariantCollection();
    }
    static _getNamesByDefineData(defineData, out) {
        var maskMap = Shader3D._maskMap;
        var mask = defineData._mask;
        out.length = 0;
        for (var i = 0, n = defineData._length; i < n; i++) {
            var subMaskMap = maskMap[i];
            var subMask = mask[i];
            for (var j = 0; j < 32; j++) {
                var d = 1 << j;
                if (subMask > 0 && d > subMask)
                    break;
                if (subMask & d)
                    out.push(subMaskMap[d]);
            }
        }
    }
    static getDefineByName(name) {
        var define = Shader3D._defineMap[name];
        if (!define) {
            var maskMap = Shader3D._maskMap;
            var counter = Shader3D._defineCounter;
            var index = Math.floor(counter / 32);
            var value = 1 << counter % 32;
            define = new ShaderDefine(index, value);
            Shader3D._defineMap[name] = define;
            if (index == maskMap.length) {
                maskMap.length++;
                maskMap[index] = {};
            }
            maskMap[index][value] = name;
            Shader3D._defineCounter++;
        }
        return define;
    }
    static propertyNameToID(name) {
        return LayaGL.renderEngine.propertyNameToID(name);
    }
    static propertyIDToName(id) {
        return LayaGL.renderEngine.propertyIDToName(id);
    }
    static addInclude(fileName, txt) {
        ShaderCompile.addInclude(fileName, txt);
    }
    static compileShaderByDefineNames(shaderName, subShaderIndex, passIndex, defineNames, nodeCommonMap) {
        var shader = Shader3D.find(shaderName);
        if (shader) {
            var subShader = shader.getSubShaderAt(subShaderIndex);
            if (subShader) {
                var pass = subShader._passes[passIndex];
                pass.nodeCommonMap = nodeCommonMap;
                if (pass) {
                    var compileDefineDatas = Shader3D._compileDefineDatas;
                    Shader3D._configDefineValues.cloneTo(compileDefineDatas);
                    for (var i = 0, n = defineNames.length; i < n; i++)
                        compileDefineDatas.add(Shader3D.getDefineByName(defineNames[i]));
                    pass.withCompile(compileDefineDatas);
                }
                else {
                    console.warn("Shader3D: unknown passIndex.");
                }
            }
            else {
                console.warn("Shader3D: unknown subShaderIndex.");
            }
        }
        else {
            console.warn("Shader3D: unknown shader name.");
        }
    }
    static add(name, enableInstancing = false, supportReflectionProbe = false) {
        return Shader3D._preCompileShader[name] = new Shader3D(name, enableInstancing, supportReflectionProbe);
    }
    static find(name) {
        return Shader3D._preCompileShader[name];
    }
    static parse(data, basePath) {
        if (!data.name || !data.uniformMap)
            console.error("TODO");
        let shader = Shader3D.add(data.name, data.enableInstancing, data.supportReflectionProbe);
        let subshader = new SubShader(data.attributeMap ? data.attributeMap : SubShader.DefaultAttributeMap, data.uniformMap, data.defaultValue);
        shader.addSubShader(subshader);
        let passArray = data.shaderPass;
        for (var i in passArray) {
            let pass = passArray[i];
            subshader._addShaderPass(ShaderCompile.compile(pass.VS, pass.FS, basePath), pass.pipeline);
        }
        return shader;
    }
    get name() {
        return this._name;
    }
    addSubShader(subShader) {
        this._subShaders.push(subShader);
        subShader._owner = this;
    }
    getSubShaderAt(index) {
        return this._subShaders[index];
    }
}
Shader3D._configDefineValues = new DefineDatas();
Shader3D._compileDefineDatas = new DefineDatas();
Shader3D.PERIOD_CUSTOM = 0;
Shader3D.PERIOD_MATERIAL = 1;
Shader3D.PERIOD_SPRITE = 2;
Shader3D.PERIOD_CAMERA = 3;
Shader3D.PERIOD_SCENE = 4;
Shader3D._propertyNameMap = {};
Shader3D._propertyNameCounter = 0;
Shader3D._defineCounter = 0;
Shader3D._defineMap = {};
Shader3D._preCompileShader = {};
Shader3D._maskMap = [];
Shader3D.debugMode = false;

//# sourceMappingURL=Shader3D.js.map
