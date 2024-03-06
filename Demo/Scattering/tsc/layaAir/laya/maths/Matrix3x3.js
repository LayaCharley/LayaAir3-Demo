import { Vector3 } from "./Vector3";
const _DEFAULTELEMENTS = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
const _tempV30 = new Vector3();
const _tempV31 = new Vector3();
const _tempV32 = new Vector3();
export class Matrix3x3 {
    constructor(createElement = true) {
        createElement && (this.elements = _DEFAULTELEMENTS.slice());
    }
    static createRotationQuaternion(rotation, out) {
        var rotX = rotation.x;
        var rotY = rotation.y;
        var rotZ = rotation.z;
        var rotW = rotation.w;
        var xx = rotX * rotX;
        var yy = rotY * rotY;
        var zz = rotZ * rotZ;
        var xy = rotX * rotY;
        var zw = rotZ * rotW;
        var zx = rotZ * rotX;
        var yw = rotY * rotW;
        var yz = rotY * rotZ;
        var xw = rotX * rotW;
        var resultE = out.elements;
        resultE[0] = 1.0 - (2.0 * (yy + zz));
        resultE[1] = 2.0 * (xy + zw);
        resultE[2] = 2.0 * (zx - yw);
        resultE[3] = 2.0 * (xy - zw);
        resultE[4] = 1.0 - (2.0 * (zz + xx));
        resultE[5] = 2.0 * (yz + xw);
        resultE[6] = 2.0 * (zx + yw);
        resultE[7] = 2.0 * (yz - xw);
        resultE[8] = 1.0 - (2.0 * (yy + xx));
    }
    static createFromTranslation(trans, out) {
        var e = out.elements;
        e[0] = 1;
        e[1] = 0;
        e[2] = 0;
        e[3] = 0;
        e[4] = 1;
        e[5] = 0;
        e[6] = trans.x;
        e[7] = trans.y;
        e[8] = 1;
    }
    static createFromRotation(rad, out) {
        var e = out.elements;
        var s = Math.sin(rad), c = Math.cos(rad);
        e[0] = c;
        e[1] = s;
        e[2] = 0;
        e[3] = -s;
        e[4] = c;
        e[5] = 0;
        e[6] = 0;
        e[7] = 0;
        e[8] = 1;
    }
    static createFromScaling(scale, out) {
        var e = out.elements;
        e[0] = scale.x;
        e[1] = 0;
        e[2] = 0;
        e[3] = 0;
        e[4] = scale.y;
        e[5] = 0;
        e[6] = 0;
        e[7] = 0;
        e[8] = scale.z;
    }
    static createFromMatrix4x4(sou, out) {
        var souE = sou.elements;
        var outE = out.elements;
        outE[0] = souE[0];
        outE[1] = souE[1];
        outE[2] = souE[2];
        outE[3] = souE[4];
        outE[4] = souE[5];
        outE[5] = souE[6];
        outE[6] = souE[8];
        outE[7] = souE[9];
        outE[8] = souE[10];
    }
    static multiply(left, right, out) {
        var l = left.elements;
        var r = right.elements;
        var e = out.elements;
        var l11 = l[0], l12 = l[1], l13 = l[2];
        var l21 = l[3], l22 = l[4], l23 = l[5];
        var l31 = l[6], l32 = l[7], l33 = l[8];
        var r11 = r[0], r12 = r[1], r13 = r[2];
        var r21 = r[3], r22 = r[4], r23 = r[5];
        var r31 = r[6], r32 = r[7], r33 = r[8];
        e[0] = r11 * l11 + r12 * l21 + r13 * l31;
        e[1] = r11 * l12 + r12 * l22 + r13 * r32;
        e[2] = r11 * l13 + r12 * l23 + r13 * l33;
        e[3] = r21 * l11 + r22 * l21 + r23 * l31;
        e[4] = r21 * l12 + r22 * l22 + r23 * l32;
        e[5] = r21 * l13 + r22 * l23 + r23 * l33;
        e[6] = r31 * l11 + r32 * l21 + r33 * l31;
        e[7] = r31 * l12 + r32 * l22 + r33 * l32;
        e[8] = r31 * l13 + r32 * l23 + r33 * l33;
    }
    cloneByArray(destObject) {
        this.elements.set(destObject);
    }
    determinant() {
        var f = this.elements;
        var a00 = f[0], a01 = f[1], a02 = f[2];
        var a10 = f[3], a11 = f[4], a12 = f[5];
        var a20 = f[6], a21 = f[7], a22 = f[8];
        return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
    }
    translate(trans, out) {
        var e = out.elements;
        var f = this.elements;
        var a00 = f[0], a01 = f[1], a02 = f[2];
        var a10 = f[3], a11 = f[4], a12 = f[5];
        var a20 = f[6], a21 = f[7], a22 = f[8];
        var x = trans.x, y = trans.y;
        e[0] = a00;
        e[1] = a01;
        e[2] = a02;
        e[3] = a10;
        e[4] = a11;
        e[5] = a12;
        e[6] = x * a00 + y * a10 + a20;
        e[7] = x * a01 + y * a11 + a21;
        e[8] = x * a02 + y * a12 + a22;
    }
    rotate(rad, out) {
        var e = out.elements;
        var f = this.elements;
        var a00 = f[0], a01 = f[1], a02 = f[2];
        var a10 = f[3], a11 = f[4], a12 = f[5];
        var a20 = f[6], a21 = f[7], a22 = f[8];
        var s = Math.sin(rad);
        var c = Math.cos(rad);
        e[0] = c * a00 + s * a10;
        e[1] = c * a01 + s * a11;
        e[2] = c * a02 + s * a12;
        e[3] = c * a10 - s * a00;
        e[4] = c * a11 - s * a01;
        e[5] = c * a12 - s * a02;
        e[6] = a20;
        e[7] = a21;
        e[8] = a22;
    }
    scale(scale, out) {
        var e = out.elements;
        var f = this.elements;
        var x = scale.x, y = scale.y;
        e[0] = x * f[0];
        e[1] = x * f[1];
        e[2] = x * f[2];
        e[3] = y * f[3];
        e[4] = y * f[4];
        e[5] = y * f[5];
        e[6] = f[6];
        e[7] = f[7];
        e[8] = f[8];
    }
    invert(out) {
        var e = out.elements;
        var f = this.elements;
        var a00 = f[0], a01 = f[1], a02 = f[2];
        var a10 = f[3], a11 = f[4], a12 = f[5];
        var a20 = f[6], a21 = f[7], a22 = f[8];
        var b01 = a22 * a11 - a12 * a21;
        var b11 = -a22 * a10 + a12 * a20;
        var b21 = a21 * a10 - a11 * a20;
        var det = a00 * b01 + a01 * b11 + a02 * b21;
        if (!det) {
            return;
        }
        det = 1.0 / det;
        e[0] = b01 * det;
        e[1] = (-a22 * a01 + a02 * a21) * det;
        e[2] = (a12 * a01 - a02 * a11) * det;
        e[3] = b11 * det;
        e[4] = (a22 * a00 - a02 * a20) * det;
        e[5] = (-a12 * a00 + a02 * a10) * det;
        e[6] = b21 * det;
        e[7] = (-a21 * a00 + a01 * a20) * det;
        e[8] = (a11 * a00 - a01 * a10) * det;
    }
    transpose(out) {
        var e = out.elements;
        var f = this.elements;
        if (out === this) {
            var a01 = f[1], a02 = f[2], a12 = f[5];
            e[1] = f[3];
            e[2] = f[6];
            e[3] = a01;
            e[5] = f[7];
            e[6] = a02;
            e[7] = a12;
        }
        else {
            e[0] = f[0];
            e[1] = f[3];
            e[2] = f[6];
            e[3] = f[1];
            e[4] = f[4];
            e[5] = f[7];
            e[6] = f[2];
            e[7] = f[5];
            e[8] = f[8];
        }
    }
    identity() {
        this.elements.set(_DEFAULTELEMENTS);
    }
    cloneTo(destObject) {
        var i, s, d;
        s = this.elements;
        d = destObject.elements;
        if (s === d) {
            return;
        }
        d.set(s);
    }
    clone() {
        var dest = new Matrix3x3(false);
        dest.elements = this.elements.slice();
        return dest;
    }
    static lookAt(eye, target, up, out) {
        Vector3.subtract(eye, target, _tempV30);
        Vector3.normalize(_tempV30, _tempV30);
        Vector3.cross(up, _tempV30, _tempV31);
        Vector3.normalize(_tempV31, _tempV31);
        Vector3.cross(_tempV30, _tempV31, _tempV32);
        var v0 = _tempV30;
        var v1 = _tempV31;
        var v2 = _tempV32;
        var me = out.elements;
        me[0] = v1.x;
        me[3] = v1.y;
        me[6] = v1.z;
        me[1] = v2.x;
        me[4] = v2.y;
        me[7] = v2.z;
        me[2] = v0.x;
        me[5] = v0.y;
        me[8] = v0.z;
    }
    static forwardLookAt(eye, target, up, out) {
        var vx = _tempV31;
        var vy = _tempV32;
        var vz = _tempV30;
        target.vsub(eye, vz).normalize();
        up.cross(vz, vx).normalize();
        vz.cross(vx, vy);
        var m = out.elements;
        m[0] = vx.x;
        m[1] = vx.y;
        m[2] = vx.z;
        m[3] = vy.x;
        m[4] = vy.y;
        m[5] = vy.z;
        m[6] = vz.x;
        m[7] = vz.y;
        m[8] = vz.z;
    }
}
Matrix3x3.DEFAULT = new Matrix3x3();

//# sourceMappingURL=Matrix3x3.js.map
