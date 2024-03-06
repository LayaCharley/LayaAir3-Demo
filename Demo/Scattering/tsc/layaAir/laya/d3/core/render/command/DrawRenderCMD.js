import { Camera } from "../../Camera";
import { Command } from "./Command";
export class DrawRenderCMD extends Command {
    constructor() {
        super();
    }
    static create(render, material, subShaderIndex, commandBuffer) {
        var cmd;
        cmd = DrawRenderCMD._pool.length > 0 ? DrawRenderCMD._pool.pop() : new DrawRenderCMD();
        cmd._render = render;
        cmd.material = material;
        cmd._subShaderIndex = subShaderIndex;
        cmd._commandBuffer = commandBuffer;
        return cmd;
    }
    _elementRender(renderElement, context) {
        renderElement.renderSubShader = this._material._shader.getSubShaderAt(this._subShaderIndex);
        renderElement.material = this._material;
        context.drawRenderElement(renderElement);
    }
    set material(value) {
        this._material && this._material._removeReference(1);
        this._material = value;
        this._material && this._material._addReference(1);
    }
    run() {
        if (!this._material)
            throw "This render command material cannot be empty";
        this.setContext(this._commandBuffer._context);
        var context = this._context;
        context._contextOBJ.applyContext(Camera._updateMark);
        var renderElements = this._render._renderElements;
        for (var i = 0, n = renderElements.length; i < n; i++) {
            var renderelement = renderElements[i];
            let mat = renderelement.material;
            this._elementRender(renderelement, context);
            renderelement.material = mat;
        }
    }
    recover() {
        DrawRenderCMD._pool.push(this);
        super.recover();
        this._material && this._material._removeReference(1);
        this._material = null;
    }
    destroy() {
        super.destroy();
        this._material && this._material._removeReference(1);
        this._material = null;
    }
}
DrawRenderCMD._pool = [];

//# sourceMappingURL=DrawRenderCMD.js.map
