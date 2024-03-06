import { Command } from "./Command";
import { MeshRenderer } from "../../../core/MeshRenderer";
import { LayaGL } from "../../../../layagl/LayaGL";
import { RenderContext3D } from "../RenderContext3D";
import { Camera } from "../../Camera";
export class DrawMeshCMD extends Command {
    constructor() {
        super();
        this._transform = LayaGL.renderOBJCreate.createTransform(null);
        this._meshRender = new MeshRenderer();
    }
    static create(mesh, matrix, material, subMeshIndex, subShaderIndex, commandBuffer) {
        var cmd;
        cmd = DrawMeshCMD._pool.length > 0 ? DrawMeshCMD._pool.pop() : new DrawMeshCMD();
        cmd._matrix = matrix;
        cmd._transform.worldMatrix = cmd._matrix;
        cmd.material = material;
        cmd._subMeshIndex = subMeshIndex;
        cmd._subShaderIndex = subShaderIndex;
        cmd.mesh = mesh;
        cmd._commandBuffer = commandBuffer;
        return cmd;
    }
    set material(value) {
        this._material && this._material._removeReference(1);
        this._material = value;
        this._material && this._material._addReference(1);
    }
    set mesh(value) {
        if (this._mesh == value)
            return;
        this._mesh = value;
        this._meshRender._onMeshChange(this._mesh);
        this._renderElemnts = this._meshRender._renderElements;
        this._renderElemnts.forEach(element => {
            element.material = this._material;
            element.setTransform(this._transform);
            element.renderSubShader = this._material._shader.getSubShaderAt(this._subShaderIndex);
            element._subShaderIndex = this._subShaderIndex;
        });
    }
    run() {
        var context = RenderContext3D._instance;
        this._meshRender.probReflection = context.scene.sceneReflectionProb;
        context._contextOBJ.applyContext(Camera._updateMark);
        let submeshs = this._mesh._subMeshes;
        if (this._subMeshIndex == -1) {
            for (let i = 0, n = submeshs.length; i < n; i++) {
                let element = this._renderElemnts[i];
                context.drawRenderElement(element);
            }
        }
        else {
            let element = this._renderElemnts[this._subMeshIndex];
            context.drawRenderElement(element);
        }
    }
    recover() {
        DrawMeshCMD._pool.push(this);
        super.recover();
        this._material && (this.material = null);
        this._mesh && (this.mesh = null);
    }
    destroy() {
        super.destroy();
        this._renderElemnts.forEach(element => {
            element.destroy();
        });
        this._material && this._material._removeReference(1);
        this._material = null;
        this._renderElemnts = null;
        this._transform = null;
        this._material = null;
        this._matrix = null;
    }
}
DrawMeshCMD._pool = [];

//# sourceMappingURL=DrawMeshCMD.js.map
