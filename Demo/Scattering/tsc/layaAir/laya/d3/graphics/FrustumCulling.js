import { Plane } from "../math/Plane";
import { LayaGL } from "../../layagl/LayaGL";
import { ContainmentType } from "../math/ContainmentType";
import { CollisionUtils } from "../math/CollisionUtils";
import { Vector3 } from "../../maths/Vector3";
export class FrustumCulling {
    static __init__() {
        FrustumCulling._cameraCullInfo = LayaGL.renderOBJCreate.createCameraCullInfo();
        FrustumCulling._shadowCullInfo = LayaGL.renderOBJCreate.createShadowCullInfo();
    }
    static cullingRenderBounds(bounds, cullInfo) {
        var cullPlaneCount = cullInfo.cullPlaneCount;
        var cullPlanes = cullInfo.cullPlanes;
        var min = bounds.getMin();
        var max = bounds.getMax();
        var minX = min.x;
        var minY = min.y;
        var minZ = min.z;
        var maxX = max.x;
        var maxY = max.y;
        var maxZ = max.z;
        var pass = true;
        for (var j = 0; j < cullPlaneCount; j++) {
            var plane = cullPlanes[j];
            var normal = plane.normal;
            if (plane.distance + (normal.x * (normal.x < 0.0 ? minX : maxX)) + (normal.y * (normal.y < 0.0 ? minY : maxY)) + (normal.z * (normal.z < 0.0 ? minZ : maxZ)) < 0.0) {
                pass = false;
                break;
            }
        }
        return pass;
    }
    static cullingRenderBoundsState(bounds, cullInfo) {
        var p = FrustumCulling._tempV30, n = FrustumCulling._tempV31;
        var boxMin = bounds.min;
        var boxMax = bounds.max;
        var result = ContainmentType.Contains;
        for (var i = 0, nn = cullInfo.cullPlaneCount; i < nn; i++) {
            var plane = cullInfo.cullPlanes[i];
            var planeNor = plane.normal;
            if (planeNor.x >= 0) {
                p.x = boxMax.x;
                n.x = boxMin.x;
            }
            else {
                p.x = boxMin.x;
                n.x = boxMax.x;
            }
            if (planeNor.y >= 0) {
                p.y = boxMax.y;
                n.y = boxMin.y;
            }
            else {
                p.y = boxMin.y;
                n.y = boxMax.y;
            }
            if (planeNor.z >= 0) {
                p.z = boxMax.z;
                n.z = boxMin.z;
            }
            else {
                p.z = boxMin.z;
                n.z = boxMax.z;
            }
            if (CollisionUtils.intersectsPlaneAndPoint(plane, p) === Plane.PlaneIntersectionType_Back)
                return ContainmentType.Disjoint;
            if (CollisionUtils.intersectsPlaneAndPoint(plane, n) === Plane.PlaneIntersectionType_Back)
                result = ContainmentType.Intersects;
        }
        return result;
    }
}
FrustumCulling._tempV30 = new Vector3();
FrustumCulling._tempV31 = new Vector3();

//# sourceMappingURL=FrustumCulling.js.map
