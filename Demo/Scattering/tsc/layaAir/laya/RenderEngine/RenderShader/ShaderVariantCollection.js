import { Shader3D } from "./Shader3D";
export class ShaderVariant {
    constructor(shader, subShaderIndex, passIndex, defines) {
        this._subShaderIndex = 0;
        this._passIndex = 0;
        this.setValue(shader, subShaderIndex, passIndex, defines);
    }
    get shader() {
        return this._shader;
    }
    get subShaderIndex() {
        return this._subShaderIndex;
    }
    get passIndex() {
        return this._passIndex;
    }
    get defineNames() {
        return this._defineNames;
    }
    setValue(shader, subShaderIndex, passIndex, defineNames) {
        if (shader) {
            var subShader = shader.getSubShaderAt(subShaderIndex);
            if (subShader) {
                var pass = subShader._passes[passIndex];
                if (pass) {
                    var validDefine = pass._validDefine;
                    for (var i = 0, n = defineNames.length; i < n; i++) {
                        var defname = defineNames[i];
                        if (!validDefine.has(Shader3D.getDefineByName(defname)))
                            throw `ShaderVariantInfo:Invalid defineName ${defname} in ${shader._name} subShaderIndex of ${subShaderIndex} passIndex of ${passIndex}.`;
                    }
                }
                else {
                    throw `ShaderVariantInfo:Shader don't have passIndex of ${passIndex}.`;
                }
            }
            else {
                throw `ShaderVariantInfo:Shader don't have subShaderIndex of ${subShaderIndex}.`;
            }
        }
        else {
            throw `ShaderVariantInfo:Shader can't be null.`;
        }
        this._shader = shader;
        this._subShaderIndex = subShaderIndex;
        this._passIndex = passIndex;
        this._defineNames = defineNames;
    }
    equal(other) {
        if (this._shader !== other._shader || this._subShaderIndex !== other._subShaderIndex || this._passIndex !== other._passIndex)
            return false;
        var defines = this._defineNames;
        var otherDefines = other._defineNames;
        if (defines.length !== otherDefines.length)
            return false;
        for (var i = 0, n = this._defineNames.length; i < n; i++) {
            if (defines[i] !== otherDefines[i])
                return false;
        }
        return true;
    }
    clone() {
        var dest = new ShaderVariant(this._shader, this._subShaderIndex, this._passIndex, this._defineNames.slice());
        return dest;
    }
}
export class ShaderVariantCollection {
    constructor() {
        this._allCompiled = false;
        this._variants = [];
    }
    get allCompiled() {
        return this._allCompiled;
    }
    get variantCount() {
        return this._variants.length;
    }
    add(variant) {
        for (var i = 0, n = this._variants.length; i < n; i++) {
            if (this._variants[i].equal(variant))
                return false;
        }
        this._variants.push(variant.clone());
        this._allCompiled = false;
        return true;
    }
    remove(variant) {
        for (var i = 0, n = this._variants.length; i < n; i++) {
            if (this._variants[i].equal(variant)) {
                this._variants.splice(i, 1);
                return true;
            }
        }
        return false;
    }
    contatins(variant) {
        for (var i = 0, n = this._variants.length; i < n; i++) {
            if (this._variants[i].equal(variant))
                return true;
        }
        return false;
    }
    getByIndex(index) {
        return this._variants[index];
    }
    clear() {
        this._variants.length = 0;
    }
    compile() {
        if (!this._allCompiled) {
            var variants = this._variants;
            for (var i = 0, n = variants.length; i < n; i++) {
                var variant = variants[i];
                Shader3D.compileShaderByDefineNames(variant._shader._name, variant._subShaderIndex, variant._passIndex, variant._defineNames, []);
            }
            this._allCompiled = true;
        }
    }
}

//# sourceMappingURL=ShaderVariantCollection.js.map
