import { Vector4 } from "./Vector4";
import { MathUtils3D } from "./MathUtils3D";
export class Vector3 {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    static distanceSquared(value1, value2) {
        var x = value1.x - value2.x;
        var y = value1.y - value2.y;
        var z = value1.z - value2.z;
        return (x * x) + (y * y) + (z * z);
    }
    static distance(value1, value2) {
        var x = value1.x - value2.x;
        var y = value1.y - value2.y;
        var z = value1.z - value2.z;
        return Math.sqrt((x * x) + (y * y) + (z * z));
    }
    static min(a, b, out) {
        out.x = Math.min(a.x, b.x);
        out.y = Math.min(a.y, b.y);
        out.z = Math.min(a.z, b.z);
    }
    static max(a, b, out) {
        out.x = Math.max(a.x, b.x);
        out.y = Math.max(a.y, b.y);
        out.z = Math.max(a.z, b.z);
    }
    static transformQuat(source, rotation, out) {
        var x = source.x, y = source.y, z = source.z, qx = rotation.x, qy = rotation.y, qz = rotation.z, qw = rotation.w, ix = qw * x + qy * z - qz * y, iy = qw * y + qz * x - qx * z, iz = qw * z + qx * y - qy * x, iw = -qx * x - qy * y - qz * z;
        out.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
        out.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
        out.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    }
    static scalarLength(a) {
        var x = a.x, y = a.y, z = a.z;
        return Math.sqrt(x * x + y * y + z * z);
    }
    static scalarLengthSquared(a) {
        var x = a.x, y = a.y, z = a.z;
        return x * x + y * y + z * z;
    }
    static normalize(s, out) {
        var x = s.x, y = s.y, z = s.z;
        var len = x * x + y * y + z * z;
        if (len > 0) {
            len = 1 / Math.sqrt(len);
            out.x = x * len;
            out.y = y * len;
            out.z = z * len;
        }
    }
    static multiply(a, b, out) {
        out.x = a.x * b.x;
        out.y = a.y * b.y;
        out.z = a.z * b.z;
    }
    static scale(a, b, out) {
        out.x = a.x * b;
        out.y = a.y * b;
        out.z = a.z * b;
    }
    static lerp(a, b, t, out) {
        var ax = a.x, ay = a.y, az = a.z;
        out.x = ax + t * (b.x - ax);
        out.y = ay + t * (b.y - ay);
        out.z = az + t * (b.z - az);
    }
    static transformV3ToV3(vector, transform, result) {
        var intermediate = Vector3._tempVector4;
        Vector3.transformV3ToV4(vector, transform, intermediate);
        result.x = intermediate.x;
        result.y = intermediate.y;
        result.z = intermediate.z;
    }
    static transformV3ToV4(vector, transform, result) {
        var vectorX = vector.x;
        var vectorY = vector.y;
        var vectorZ = vector.z;
        var transformElem = transform.elements;
        result.x = (vectorX * transformElem[0]) + (vectorY * transformElem[4]) + (vectorZ * transformElem[8]) + transformElem[12];
        result.y = (vectorX * transformElem[1]) + (vectorY * transformElem[5]) + (vectorZ * transformElem[9]) + transformElem[13];
        result.z = (vectorX * transformElem[2]) + (vectorY * transformElem[6]) + (vectorZ * transformElem[10]) + transformElem[14];
        result.w = (vectorX * transformElem[3]) + (vectorY * transformElem[7]) + (vectorZ * transformElem[11]) + transformElem[15];
    }
    static TransformNormal(normal, transform, result) {
        var normalX = normal.x;
        var normalY = normal.y;
        var normalZ = normal.z;
        var transformElem = transform.elements;
        result.x = (normalX * transformElem[0]) + (normalY * transformElem[4]) + (normalZ * transformElem[8]);
        result.y = (normalX * transformElem[1]) + (normalY * transformElem[5]) + (normalZ * transformElem[9]);
        result.z = (normalX * transformElem[2]) + (normalY * transformElem[6]) + (normalZ * transformElem[10]);
    }
    static transformCoordinate(coordinate, transform, result) {
        var coordinateX = coordinate.x;
        var coordinateY = coordinate.y;
        var coordinateZ = coordinate.z;
        var transformElem = transform.elements;
        var w = coordinateX * transformElem[3] + coordinateY * transformElem[7] + coordinateZ * transformElem[11] + transformElem[15];
        result.x = (coordinateX * transformElem[0] + coordinateY * transformElem[4] + coordinateZ * transformElem[8] + transformElem[12]) / w;
        result.y = (coordinateX * transformElem[1] + coordinateY * transformElem[5] + coordinateZ * transformElem[9] + transformElem[13]) / w;
        result.z = (coordinateX * transformElem[2] + coordinateY * transformElem[6] + coordinateZ * transformElem[10] + transformElem[14]) / w;
    }
    static Clamp(value, min, max, out) {
        var x = value.x;
        var y = value.y;
        var z = value.z;
        var mineX = min.x;
        var mineY = min.y;
        var mineZ = min.z;
        var maxeX = max.x;
        var maxeY = max.y;
        var maxeZ = max.z;
        x = (x > maxeX) ? maxeX : x;
        x = (x < mineX) ? mineX : x;
        y = (y > maxeY) ? maxeY : y;
        y = (y < mineY) ? mineY : y;
        z = (z > maxeZ) ? maxeZ : z;
        z = (z < mineZ) ? mineZ : z;
        out.x = x;
        out.y = y;
        out.z = z;
    }
    static add(a, b, out) {
        out.x = a.x + b.x;
        out.y = a.y + b.y;
        out.z = a.z + b.z;
    }
    static subtract(a, b, o) {
        o.x = a.x - b.x;
        o.y = a.y - b.y;
        o.z = a.z - b.z;
    }
    static cross(a, b, o) {
        var ax = a.x, ay = a.y, az = a.z, bx = b.x, by = b.y, bz = b.z;
        o.x = ay * bz - az * by;
        o.y = az * bx - ax * bz;
        o.z = ax * by - ay * bx;
    }
    static dot(a, b) {
        return (a.x * b.x) + (a.y * b.y) + (a.z * b.z);
    }
    static equals(a, b) {
        return MathUtils3D.nearEqual(a.x, b.x) && MathUtils3D.nearEqual(a.y, b.y) && MathUtils3D.nearEqual(a.z, b.z);
    }
    equal(value) {
        return Vector3.equals(this, value);
    }
    setValue(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }
    set(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }
    fromArray(arr, offset = 0) {
        this.x = arr[offset + 0];
        this.y = arr[offset + 1];
        this.z = arr[offset + 2];
    }
    toArray() {
        return [this.x, this.y, this.z];
    }
    writeTo(arr, offset = 0) {
        arr[offset + 0] = this.x;
        arr[offset + 1] = this.y;
        arr[offset + 2] = this.z;
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    lengthSquared() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    vsub(b, out) {
        out.x = this.x - b.x;
        out.y = this.y - b.y;
        out.z = this.z - b.z;
        return out;
    }
    vadd(b, out) {
        out.x = this.x + b.x;
        out.y = this.y + b.y;
        out.z = this.z + b.z;
        return out;
    }
    scale(s, out) {
        out.x = this.x * s;
        out.y = this.y * s;
        out.z = this.z * s;
        return out;
    }
    normalize() {
        let x = this.x, y = this.y, z = this.z;
        var len = x * x + y * y + z * z;
        if (len > 0) {
            len = 1 / Math.sqrt(len);
            this.x = x * len;
            this.y = y * len;
            this.z = z * len;
        }
        return this;
    }
    dot(b) {
        return (this.x * b.x) + (this.y * b.y) + (this.z * b.z);
    }
    cross(b, o) {
        var ax = this.x, ay = this.y, az = this.z, bx = b.x, by = b.y, bz = b.z;
        o.x = ay * bz - az * by;
        o.y = az * bx - ax * bz;
        o.z = ax * by - ay * bx;
        return o;
    }
    cloneTo(destObject) {
        var destVector3 = destObject;
        destVector3.x = this.x;
        destVector3.y = this.y;
        destVector3.z = this.z;
    }
    clone() {
        var destVector3 = new Vector3();
        this.cloneTo(destVector3);
        return destVector3;
    }
    toDefault() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }
}
Vector3._tempVector4 = new Vector4();
Vector3.ZERO = new Vector3(0.0, 0.0, 0.0);
Vector3.ONE = new Vector3(1.0, 1.0, 1.0);
Vector3.NegativeUnitX = new Vector3(-1, 0, 0);
Vector3.UnitX = new Vector3(1, 0, 0);
Vector3.UnitY = new Vector3(0, 1, 0);
Vector3.UnitZ = new Vector3(0, 0, 1);
Vector3.ForwardRH = new Vector3(0, 0, -1);
Vector3.ForwardLH = new Vector3(0, 0, 1);
Vector3.Up = new Vector3(0, 1, 0);

//# sourceMappingURL=Vector3.js.map
