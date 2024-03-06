import { CollisionUtils } from "./CollisionUtils";
import { Vector3 } from "../../maths/Vector3";
export class BoundSphere {
    constructor(center = new Vector3, radius = 0) {
        this._center = center;
        this._radius = radius;
    }
    set center(value) {
        value.cloneTo(this._center);
    }
    get center() {
        return this._center;
    }
    set radius(value) {
        this._radius = value;
    }
    get radius() {
        return this._radius;
    }
    toDefault() {
        this._center.toDefault();
        this._radius = 0;
    }
    static createFromSubPoints(points, start, count, out) {
        if (points == null) {
            throw new Error("points");
        }
        if (start < 0 || start >= points.length) {
            throw new Error("start" + start + "Must be in the range [0, " + (points.length - 1) + "]");
        }
        if (count < 0 || (start + count) > points.length) {
            throw new Error("count" + count + "Must be in the range <= " + points.length + "}");
        }
        var upperEnd = start + count;
        var center = BoundSphere._tempVector3;
        center.x = 0;
        center.y = 0;
        center.z = 0;
        for (var i = start; i < upperEnd; ++i) {
            Vector3.add(points[i], center, center);
        }
        var outCenter = out.center;
        Vector3.scale(center, 1 / count, outCenter);
        var radius = 0.0;
        for (i = start; i < upperEnd; ++i) {
            var distance = Vector3.distanceSquared(outCenter, points[i]);
            if (distance > radius)
                radius = distance;
        }
        out.radius = Math.sqrt(radius);
    }
    static createfromPoints(points, out) {
        if (points == null) {
            throw new Error("points");
        }
        BoundSphere.createFromSubPoints(points, 0, points.length, out);
    }
    intersectsRayDistance(ray) {
        return CollisionUtils.intersectsRayAndSphereRD(ray, this);
    }
    intersectsRayPoint(ray, outPoint) {
        return CollisionUtils.intersectsRayAndSphereRP(ray, this, outPoint);
    }
    cloneTo(destObject) {
        var dest = destObject;
        this._center.cloneTo(dest._center);
        dest._radius = this._radius;
    }
    clone() {
        var dest = new BoundSphere(new Vector3(), 0);
        this.cloneTo(dest);
        return dest;
    }
}
BoundSphere._tempVector3 = new Vector3();

//# sourceMappingURL=BoundSphere.js.map
