import { Vector3 } from "../../maths/Vector3";
export class Plane {
    constructor(normal = new Vector3, d = 0) {
        this._normal = normal;
        this._distance = d;
    }
    set normal(value) {
        value.cloneTo(this._normal);
    }
    get normal() {
        return this._normal;
    }
    set distance(value) {
        this._distance = value;
    }
    get distance() {
        return this._distance;
    }
    static createPlaneBy3P(point0, point1, point2, out) {
        var x1 = point1.x - point0.x;
        var y1 = point1.y - point0.y;
        var z1 = point1.z - point0.z;
        var x2 = point2.x - point0.x;
        var y2 = point2.y - point0.y;
        var z2 = point2.z - point0.z;
        var yz = (y1 * z2) - (z1 * y2);
        var xz = (z1 * x2) - (x1 * z2);
        var xy = (x1 * y2) - (y1 * x2);
        var invPyth = 1.0 / (Math.sqrt((yz * yz) + (xz * xz) + (xy * xy)));
        var x = yz * invPyth;
        var y = xz * invPyth;
        var z = xy * invPyth;
        var normal = out.normal;
        normal.x = x;
        normal.y = y;
        normal.z = z;
        out.normal = normal.normalize();
        out.distance = -((x * point0.x) + (y * point0.y) + (z * point0.z));
    }
    normalize() {
        var normalEX = this.normal.x;
        var normalEY = this.normal.y;
        var normalEZ = this.normal.z;
        var magnitude = 1.0 / Math.sqrt(normalEX * normalEX + normalEY * normalEY + normalEZ * normalEZ);
        this.normal.x = normalEX * magnitude;
        this.normal.y = normalEY * magnitude;
        this.normal.z = normalEZ * magnitude;
        this.distance *= magnitude;
    }
    cloneTo(destObject) {
        var dest = destObject;
        this.normal.cloneTo(dest.normal);
        dest.distance = this.distance;
    }
    clone() {
        var dest = new Plane();
        this.cloneTo(dest);
        return dest;
    }
}
Plane.PlaneIntersectionType_Back = 0;
Plane.PlaneIntersectionType_Front = 1;
Plane.PlaneIntersectionType_Intersecting = 2;

//# sourceMappingURL=Plane.js.map
