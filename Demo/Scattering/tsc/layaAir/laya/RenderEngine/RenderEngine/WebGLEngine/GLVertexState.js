import { WebGLExtension } from "./GLEnum/WebGLExtension";
import { GLObject } from "./GLObject";
export class GLVertexState extends GLObject {
    constructor(engine) {
        super(engine);
        this._vertexDeclaration = [];
        if (!engine.isWebGL2)
            this._vaoExt = engine._supportCapatable.getExtension(WebGLExtension.OES_vertex_array_object);
        this._vao = this.createVertexArray();
        this._angleInstancedArrays = this._engine._supportCapatable.getExtension(WebGLExtension.ANGLE_instanced_arrays);
    }
    createVertexArray() {
        if (this._engine.isWebGL2)
            return this._gl.createVertexArray();
        else
            return this._vaoExt.createVertexArrayOES();
    }
    deleteVertexArray() {
        if (this._engine.isWebGL2)
            this._gl.deleteVertexArray(this._vao);
        else
            this._vaoExt.deleteVertexArrayOES(this._vao);
    }
    bindVertexArray() {
        if (this._engine._GLBindVertexArray == this)
            return;
        if (this._engine.isWebGL2)
            this._gl.bindVertexArray(this._vao);
        else
            this._vaoExt.bindVertexArrayOES(this._vao);
        this._engine._GLBindVertexArray = this;
    }
    unbindVertexArray() {
        if (this._engine.isWebGL2)
            this._gl.bindVertexArray(null);
        else
            this._vaoExt.bindVertexArrayOES(null);
        this._engine._GLBindVertexArray = null;
    }
    isVertexArray() {
        if (this._engine.isWebGL2)
            this._gl.isVertexArray(this._vao);
        else
            this._vaoExt.isVertexArrayOES(this._vao);
    }
    applyVertexBuffer(vertexBuffer) {
        this.clearVAO();
        this._vertexBuffers = vertexBuffer;
        if (this._engine._GLBindVertexArray == this) {
            this._vertexDeclaration.length = vertexBuffer.length;
            var i = 0;
            vertexBuffer.forEach(element => {
                var verDec = element.vertexDeclaration;
                this._vertexDeclaration[i++] = element.vertexDeclaration;
                var valueData = verDec._shaderValues;
                element.bind();
                for (var k in valueData) {
                    var loc = parseInt(k);
                    var attribute = valueData[k];
                    this._gl.enableVertexAttribArray(loc);
                    this._gl.vertexAttribPointer(loc, attribute[0], attribute[1], !!attribute[2], attribute[3], attribute[4]);
                    if (element.instanceBuffer)
                        this.vertexAttribDivisor(loc, 1);
                }
            });
        }
        else {
            throw "BufferState: must call bind() function first.";
        }
    }
    clearVAO() {
        for (let i = 0, n = this._vertexDeclaration.length; i < n; i++) {
            var verDec = this._vertexDeclaration[i];
            var valueData = verDec._shaderValues;
            for (var k in valueData) {
                var loc = parseInt(k);
                this._gl.disableVertexAttribArray(loc);
            }
        }
    }
    applyIndexBuffer(indexBuffer) {
        if (indexBuffer == null) {
            return;
        }
        if (this._engine._GLBindVertexArray == this) {
            if (this._bindedIndexBuffer !== indexBuffer) {
                indexBuffer.bind();
                this._bindedIndexBuffer = indexBuffer;
            }
        }
        else {
            throw "BufferState: must call bind() function first.";
        }
    }
    vertexAttribDivisor(index, divisor) {
        if (this._engine.isWebGL2)
            this._gl.vertexAttribDivisor(index, divisor);
        else
            this._angleInstancedArrays.vertexAttribDivisorANGLE(index, divisor);
    }
    destroy() {
        super.destroy();
        const gl = this._gl;
        this.deleteVertexArray();
        this._gl = null;
        this._engine = null;
    }
}

//# sourceMappingURL=GLVertexState.js.map
