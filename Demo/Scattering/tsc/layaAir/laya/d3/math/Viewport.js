import { Matrix4x4 } from "../../maths/Matrix4x4";
import { Vector3 } from "../../maths/Vector3";
export class Viewport {
    constructor(x, y, width, height) {
        this.minDepth = 0.0;
        this.maxDepth = 1.0;
        this.x = x !== null && x !== void 0 ? x : 0;
        this.y = y !== null && y !== void 0 ? y : 0;
        this.width = width !== null && width !== void 0 ? width : 0;
        this.height = height !== null && height !== void 0 ? height : 0;
    }
    project(source, matrix, out) {
        Vector3.transformV3ToV4(source, matrix, out);
        var x = out.x, y = out.y, z = out.z;
        var w = out.w;
        if (w !== 1.0) {
            x = x / w;
            y = y / w;
            z = z / w;
        }
        out.x = (x + 1.0) * 0.5 * this.width + this.x;
        out.y = (-y + 1.0) * 0.5 * this.height + this.y;
        out.z = z * (this.maxDepth - this.minDepth) + this.minDepth;
    }
    unprojectFromMat(source, matrix, out) {
        var matrixEleme = matrix.elements;
        out.x = (((source.x - this.x) / this.width) * 2.0) - 1.0;
        out.y = -((((source.y - this.y) / this.height) * 2.0) - 1.0);
        out.z = (source.z - this.minDepth) / (this.maxDepth - this.minDepth);
        var a = (((out.x * matrixEleme[3]) + (out.y * matrixEleme[7])) + (out.z * matrixEleme[11])) + matrixEleme[15];
        Vector3.transformV3ToV3(out, matrix, out);
        if (a !== 1.0) {
            out.x = out.x / a;
            out.y = out.y / a;
            out.z = out.z / a;
        }
    }
    unprojectFromWVP(source, projection, view, world, out) {
        Matrix4x4.multiply(projection, view, Viewport._tempMatrix4x4);
        (world) && (Matrix4x4.multiply(Viewport._tempMatrix4x4, world, Viewport._tempMatrix4x4));
        Viewport._tempMatrix4x4.invert(Viewport._tempMatrix4x4);
        this.unprojectFromMat(source, Viewport._tempMatrix4x4, out);
    }
    set(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    cloneTo(out) {
        out.x = this.x;
        out.y = this.y;
        out.width = this.width;
        out.height = this.height;
        out.minDepth = this.minDepth;
        out.maxDepth = this.maxDepth;
    }
}
Viewport._tempMatrix4x4 = new Matrix4x4();
Viewport._tempViewport = new Viewport(0, 0, 0, 0);

//# sourceMappingURL=Viewport.js.map
