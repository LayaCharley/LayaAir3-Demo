import { WebGPUObject } from "./WebGPUObject";
import { WGPUBindGroupLayoutHelper } from "./WGPUBindGroupLayoutHelper";
export class WebGPUShaderInstance extends WebGPUObject {
    constructor(engine) {
        super(engine);
        this._uniformMap = [];
    }
    _WGSLShaderLanguageProcess3D(vs, fs) {
        var __vs = vs.toscript([], []);
        var __fs = fs.toscript([], []);
        this._vs = __vs.join('\n');
        this._ps = __fs.join('\n');
        this.create();
    }
    create() {
        this._vsshader = this._engine._device.createShaderModule({
            code: this._vs,
        });
        this._psshader = this._engine._device.createShaderModule({
            code: this._ps
        });
    }
    _contactBindGroupLayout(variables) {
        for (let i = 0, n = variables.length; i < n; i++) {
            let variable = variables[i];
            variable.location = this._uniformMap.length;
            this._uniformMap.push(variable);
        }
    }
    getVertexModule() {
        return this._vsshader;
    }
    getFragmentModule() {
        return this._psshader;
    }
    getUniformMap() {
        return this._uniformMap;
    }
    applyBindGroupLayoutByUniformMap(uniformMap, command) {
        let out = [];
        WGPUBindGroupLayoutHelper.getBindGroupLayoutByUniformMap(uniformMap, out);
        for (let i = 0, n = out.length; i < n; i++) {
            command.addShaderUniform(out[i]);
        }
        this._contactBindGroupLayout(out);
    }
    applyBindGroupLayout(map, command) {
        let out = [];
        WGPUBindGroupLayoutHelper.getBindGroupLayoutByMap(map, out);
        for (let i = 0, n = out.length; i < n; i++) {
            command.addShaderUniform(out[i]);
        }
        this._contactBindGroupLayout(out);
    }
    getWGPUPipelineLayout() {
        if (!this._pipelineLayout) {
            let gpubindGroups = [];
            for (let i = 0, n = this._uniformMap.length; i < n; i++) {
                gpubindGroups.push(this._uniformMap[i].groupLayout);
            }
            let pipelinelayoutDes = {
                bindGroupLayouts: gpubindGroups
            };
            this._pipelineLayout = this._engine._device.createPipelineLayout(pipelinelayoutDes);
        }
        return this._pipelineLayout;
    }
    bind() {
        return true;
    }
}

//# sourceMappingURL=WebGPUShaderInstance.js.map
