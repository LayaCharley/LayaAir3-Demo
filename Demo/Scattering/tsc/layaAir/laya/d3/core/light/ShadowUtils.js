import { LayaGL } from "../../../layagl/LayaGL";
import { BoundFrustum, FrustumCorner } from "../../math/BoundFrustum";
import { Plane } from "../../math/Plane";
import { Utils3D } from "../../utils/Utils3D";
import { ShadowCascadesMode } from "./ShadowCascadesMode";
import { ShadowMode } from "./ShadowMode";
import { LightType } from "./Light";
import { FilterMode } from "../../../RenderEngine/RenderEnum/FilterMode";
import { WrapMode } from "../../../RenderEngine/RenderEnum/WrapMode";
import { RenderCapable } from "../../../RenderEngine/RenderEnum/RenderCapable";
import { TextureCompareMode } from "../../../RenderEngine/RenderEnum/TextureCompareMode";
import { MathUtils3D } from "../../../maths/MathUtils3D";
import { Matrix4x4 } from "../../../maths/Matrix4x4";
import { Vector3 } from "../../../maths/Vector3";
import { RenderTexture } from "../../../resource/RenderTexture";
import { RenderTargetFormat } from "../../../RenderEngine/RenderEnum/RenderTargetFormat";
var FrustumFace;
(function (FrustumFace) {
    FrustumFace[FrustumFace["Near"] = 0] = "Near";
    FrustumFace[FrustumFace["Far"] = 1] = "Far";
    FrustumFace[FrustumFace["Left"] = 2] = "Left";
    FrustumFace[FrustumFace["Right"] = 3] = "Right";
    FrustumFace[FrustumFace["Bottom"] = 4] = "Bottom";
    FrustumFace[FrustumFace["Top"] = 5] = "Top";
})(FrustumFace || (FrustumFace = {}));
export var ShadowMapFormat;
(function (ShadowMapFormat) {
    ShadowMapFormat[ShadowMapFormat["bit16"] = 0] = "bit16";
    ShadowMapFormat[ShadowMapFormat["bit24_8"] = 1] = "bit24_8";
    ShadowMapFormat[ShadowMapFormat["bit32"] = 2] = "bit32";
})(ShadowMapFormat || (ShadowMapFormat = {}));
export class ShadowUtils {
    static init() {
        ShadowUtils._adjustNearPlane = new Plane(new Vector3(), 0);
        ShadowUtils._adjustFarPlane = new Plane(new Vector3(), 0);
    }
    static supportShadow() {
        return LayaGL.renderEngine.getCapable(RenderCapable.RenderTextureFormat_Depth);
    }
    static getTemporaryShadowTexture(witdh, height, shadowFormat) {
        let depthFormat = RenderTargetFormat.DEPTH_16;
        switch (shadowFormat) {
            case ShadowMapFormat.bit16:
                depthFormat = RenderTargetFormat.DEPTH_16;
                break;
            case ShadowMapFormat.bit24_8:
                depthFormat = RenderTargetFormat.DEPTHSTENCIL_24_8;
                break;
            case ShadowMapFormat.bit32:
                depthFormat = RenderTargetFormat.DEPTH_32;
                break;
        }
        var shadowMap = RenderTexture.createFromPool(witdh, height, depthFormat, RenderTargetFormat.None, false, 1);
        shadowMap.compareMode = TextureCompareMode.LESS;
        shadowMap.filterMode = FilterMode.Bilinear;
        shadowMap.wrapModeU = WrapMode.Clamp;
        shadowMap.wrapModeV = WrapMode.Clamp;
        return shadowMap;
    }
    static getShadowBias(light, shadowProjectionMatrix, shadowResolution, out) {
        var frustumSize;
        if (light._lightType == LightType.Directional) {
            frustumSize = 2.0 / shadowProjectionMatrix.elements[0];
        }
        else if (light._lightType == LightType.Spot) {
            frustumSize = Math.tan(light.spotAngle * 0.5 * MathUtils3D.Deg2Rad) * light.range;
        }
        else {
            console.warn("ShadowUtils:Only spot and directional shadow casters are supported now.");
            frustumSize = 0.0;
        }
        var texelSize = frustumSize / shadowResolution;
        var depthBias = -light._shadowDepthBias * texelSize;
        var normalBias = -light._shadowNormalBias * texelSize;
        if (light.shadowMode == ShadowMode.SoftHigh) {
            const kernelRadius = 2.5;
            depthBias *= kernelRadius;
            normalBias *= kernelRadius;
        }
        out.setValue(depthBias, normalBias, 0.0, 0.0);
    }
    static getCameraFrustumPlanes(cameraViewProjectMatrix, frustumPlanes) {
        BoundFrustum.getPlanesFromMatrix(cameraViewProjectMatrix, frustumPlanes[FrustumFace.Near], frustumPlanes[FrustumFace.Far], frustumPlanes[FrustumFace.Left], frustumPlanes[FrustumFace.Right], frustumPlanes[FrustumFace.Top], frustumPlanes[FrustumFace.Bottom]);
    }
    static getFarWithRadius(radius, denominator) {
        return Math.sqrt(radius * radius / denominator);
    }
    static getCascadesSplitDistance(twoSplitRatio, fourSplitRatio, cameraNear, shadowFar, fov, aspectRatio, cascadesMode, out) {
        out[0] = cameraNear;
        var range = shadowFar - cameraNear;
        var tFov = Math.tan(fov * 0.5);
        var denominator = 1.0 + tFov * tFov * (aspectRatio * aspectRatio + 1.0);
        switch (cascadesMode) {
            case ShadowCascadesMode.NoCascades:
                out[1] = ShadowUtils.getFarWithRadius(shadowFar, denominator);
                break;
            case ShadowCascadesMode.TwoCascades:
                out[1] = ShadowUtils.getFarWithRadius(cameraNear + range * twoSplitRatio, denominator);
                out[2] = ShadowUtils.getFarWithRadius(shadowFar, denominator);
                break;
            case ShadowCascadesMode.FourCascades:
                out[1] = ShadowUtils.getFarWithRadius(cameraNear + range * fourSplitRatio.x, denominator);
                out[2] = ShadowUtils.getFarWithRadius(cameraNear + range * fourSplitRatio.y, denominator);
                out[3] = ShadowUtils.getFarWithRadius(cameraNear + range * fourSplitRatio.z, denominator);
                out[4] = ShadowUtils.getFarWithRadius(shadowFar, denominator);
                break;
        }
    }
    static applySliceTransform(shadowSliceData, atlasWidth, atlasHeight, cascadeIndex, outShadowMatrices) {
        var sliceE = ShadowUtils._tempMatrix0.elements;
        var oneOverAtlasWidth = 1.0 / atlasWidth;
        var oneOverAtlasHeight = 1.0 / atlasHeight;
        sliceE[0] = shadowSliceData.resolution * oneOverAtlasWidth;
        sliceE[5] = shadowSliceData.resolution * oneOverAtlasHeight;
        sliceE[12] = shadowSliceData.offsetX * oneOverAtlasWidth;
        sliceE[13] = shadowSliceData.offsetY * oneOverAtlasHeight;
        sliceE[1] = sliceE[2] = sliceE[2] = sliceE[4] = sliceE[6] = sliceE[7] = sliceE[8] = sliceE[9] = sliceE[11] = sliceE[14] = 0;
        sliceE[10] = sliceE[15] = 1;
        var offset = cascadeIndex * 16;
        Utils3D._mulMatrixArray(sliceE, outShadowMatrices, offset, outShadowMatrices, offset);
    }
    static getDirectionLightShadowCullPlanes(cameraFrustumPlanes, cascadeIndex, splitDistance, cameraNear, direction, shadowSliceData) {
        var frustumCorners = ShadowUtils._frustumCorners;
        var backPlaneFaces = ShadowUtils._backPlaneFaces;
        var planeNeighbors = ShadowUtils._frustumPlaneNeighbors;
        var twoPlaneCorners = ShadowUtils._frustumTwoPlaneCorners;
        var edgePlanePoint2 = ShadowUtils._edgePlanePoint2;
        var out = shadowSliceData.cullPlanes;
        var near = cameraFrustumPlanes[FrustumFace.Near], far = cameraFrustumPlanes[FrustumFace.Far];
        var left = cameraFrustumPlanes[FrustumFace.Left], right = cameraFrustumPlanes[FrustumFace.Right];
        var bottom = cameraFrustumPlanes[FrustumFace.Bottom], top = cameraFrustumPlanes[FrustumFace.Top];
        var splitNearDistance = splitDistance[cascadeIndex] - cameraNear;
        var splitNear = ShadowUtils._adjustNearPlane;
        var splitFar = ShadowUtils._adjustFarPlane;
        splitNear.normal = near.normal;
        splitFar.normal = far.normal;
        splitNear.distance = near.distance - splitNearDistance;
        splitFar.distance = Math.min(-near.distance + shadowSliceData.sphereCenterZ + shadowSliceData.splitBoundSphere.radius, far.distance);
        BoundFrustum.get3PlaneInterPoint(splitNear, bottom, right, frustumCorners[FrustumCorner.nearBottomRight]);
        BoundFrustum.get3PlaneInterPoint(splitNear, top, right, frustumCorners[FrustumCorner.nearTopRight]);
        BoundFrustum.get3PlaneInterPoint(splitNear, top, left, frustumCorners[FrustumCorner.nearTopLeft]);
        BoundFrustum.get3PlaneInterPoint(splitNear, bottom, left, frustumCorners[FrustumCorner.nearBottomLeft]);
        BoundFrustum.get3PlaneInterPoint(splitFar, bottom, right, frustumCorners[FrustumCorner.FarBottomRight]);
        BoundFrustum.get3PlaneInterPoint(splitFar, top, right, frustumCorners[FrustumCorner.FarTopRight]);
        BoundFrustum.get3PlaneInterPoint(splitFar, top, left, frustumCorners[FrustumCorner.FarTopLeft]);
        BoundFrustum.get3PlaneInterPoint(splitFar, bottom, left, frustumCorners[FrustumCorner.FarBottomLeft]);
        var backIndex = 0;
        for (var i = 0; i < 6; i++) {
            var plane;
            switch (i) {
                case FrustumFace.Near:
                    plane = splitNear;
                    break;
                case FrustumFace.Far:
                    plane = splitFar;
                    break;
                default:
                    plane = cameraFrustumPlanes[i];
                    break;
            }
            if (Vector3.dot(plane.normal, direction) < 0.0) {
                plane.cloneTo(out[backIndex]);
                backPlaneFaces[backIndex] = i;
                backIndex++;
            }
        }
        var edgeIndex = backIndex;
        for (var i = 0; i < backIndex; i++) {
            var backFace = backPlaneFaces[i];
            var neighborFaces = planeNeighbors[backFace];
            for (var j = 0; j < 4; j++) {
                var neighborFace = neighborFaces[j];
                var notBackFace = true;
                for (var k = 0; k < backIndex; k++)
                    if (neighborFace == backPlaneFaces[k]) {
                        notBackFace = false;
                        break;
                    }
                if (notBackFace) {
                    var corners = twoPlaneCorners[backFace][neighborFace];
                    var point0 = frustumCorners[corners[0]];
                    var point1 = frustumCorners[corners[1]];
                    Vector3.add(point0, direction, edgePlanePoint2);
                    Plane.createPlaneBy3P(point0, point1, edgePlanePoint2, out[edgeIndex++]);
                }
            }
        }
        shadowSliceData.cullPlaneCount = edgeIndex;
    }
    static getBoundSphereByFrustum(near, far, fov, aspectRatio, cameraPos, forward, outBoundSphere) {
        var centerZ;
        var radius;
        var k = Math.sqrt(1.0 + aspectRatio * aspectRatio) * Math.tan(fov / 2.0);
        var k2 = k * k;
        var farSNear = far - near;
        var farANear = far + near;
        if (k2 > farSNear / farANear) {
            centerZ = far;
            radius = far * k;
        }
        else {
            centerZ = 0.5 * farANear * (1 + k2);
            radius = 0.5 * Math.sqrt(farSNear * farSNear + 2.0 * (far * far + near * near) * k2 + farANear * farANear * k2 * k2);
        }
        var center = outBoundSphere.center;
        outBoundSphere.radius = radius;
        Vector3.scale(forward, centerZ, center);
        Vector3.add(cameraPos, center, center);
        outBoundSphere.center = center;
        return centerZ;
    }
    static getMaxTileResolutionInAtlas(atlasWidth, atlasHeight, tileCount) {
        var resolution = Math.min(atlasWidth, atlasHeight);
        var currentTileCount = Math.floor(atlasWidth / resolution) * Math.floor(atlasHeight / resolution);
        while (currentTileCount < tileCount) {
            resolution = Math.floor(resolution >> 1);
            currentTileCount = Math.floor(atlasWidth / resolution) * Math.floor(atlasHeight / resolution);
        }
        return resolution;
    }
    static getDirectionalLightMatrices(lightUp, lightSide, lightForward, cascadeIndex, nearPlane, shadowResolution, shadowSliceData, shadowMatrices) {
        var boundSphere = shadowSliceData.splitBoundSphere;
        var center = boundSphere.center;
        var radius = boundSphere.radius;
        var halfShadowResolution = shadowResolution / 2;
        var borderRadius = radius * halfShadowResolution / (halfShadowResolution - ShadowUtils.atlasBorderSize);
        var borderDiam = borderRadius * 2.0;
        var sizeUnit = shadowResolution / borderDiam;
        var radiusUnit = borderDiam / shadowResolution;
        var upLen = Math.ceil(Vector3.dot(center, lightUp) * sizeUnit) * radiusUnit;
        var sideLen = Math.ceil(Vector3.dot(center, lightSide) * sizeUnit) * radiusUnit;
        var forwardLen = Vector3.dot(center, lightForward);
        center.x = lightUp.x * upLen + lightSide.x * sideLen + lightForward.x * forwardLen;
        center.y = lightUp.y * upLen + lightSide.y * sideLen + lightForward.y * forwardLen;
        center.z = lightUp.z * upLen + lightSide.z * sideLen + lightForward.z * forwardLen;
        boundSphere.center = center;
        var origin = shadowSliceData.position;
        var viewMatrix = shadowSliceData.viewMatrix;
        var projectMatrix = shadowSliceData.projectionMatrix;
        var viewProjectMatrix = shadowSliceData.viewProjectMatrix;
        shadowSliceData.resolution = shadowResolution;
        shadowSliceData.offsetX = (cascadeIndex % 2) * shadowResolution;
        shadowSliceData.offsetY = Math.floor(cascadeIndex / 2) * shadowResolution;
        Vector3.scale(lightForward, radius + nearPlane, origin);
        Vector3.subtract(center, origin, origin);
        Matrix4x4.createLookAt(origin, center, lightUp, viewMatrix);
        Matrix4x4.createOrthoOffCenter(-borderRadius, borderRadius, -borderRadius, borderRadius, 0.0, radius * 2.0 + nearPlane, projectMatrix);
        Matrix4x4.multiply(projectMatrix, viewMatrix, viewProjectMatrix);
        Utils3D._mulMatrixArray(ShadowUtils._shadowMapScaleOffsetMatrix.elements, viewProjectMatrix.elements, 0, shadowMatrices, cascadeIndex * 16);
    }
    static getSpotLightShadowData(shadowSpotData, spotLight, resolution, shadowParams, shadowSpotMatrices, shadowMapSize) {
        var out = shadowSpotData.position = spotLight.owner.transform.position;
        shadowSpotData.resolution = resolution;
        shadowMapSize.setValue(1.0 / resolution, 1.0 / resolution, resolution, resolution);
        shadowSpotData.offsetX = 0;
        shadowSpotData.offsetY = 0;
        var spotWorldMatrix = spotLight.lightWorldMatrix;
        var viewMatrix = shadowSpotData.viewMatrix;
        var projectMatrix = shadowSpotData.projectionMatrix;
        var viewProjectMatrix = shadowSpotData.viewProjectMatrix;
        var BoundFrustum = shadowSpotData.cameraCullInfo.boundFrustum;
        spotWorldMatrix.invert(viewMatrix);
        Matrix4x4.createPerspective(3.1416 * spotLight.spotAngle / 180.0, 1, 0.1, spotLight.range, projectMatrix);
        shadowParams.y = spotLight.shadowStrength;
        Matrix4x4.multiply(projectMatrix, viewMatrix, viewProjectMatrix);
        BoundFrustum.matrix = viewProjectMatrix;
        viewProjectMatrix.cloneTo(shadowSpotMatrices);
        shadowSpotData.cameraCullInfo.position = out;
    }
    static prepareShadowReceiverShaderValues(light, shadowMapWidth, shadowMapHeight, shadowSliceDatas, cascadeCount, shadowMapSize, shadowParams, shadowMatrices, splitBoundSpheres) {
        shadowMapSize.setValue(1.0 / shadowMapWidth, 1.0 / shadowMapHeight, shadowMapWidth, shadowMapHeight);
        shadowParams.setValue(light._shadowStrength, 0.0, 0.0, 0.0);
        if (cascadeCount > 1) {
            const matrixFloatCount = 16;
            for (var i = cascadeCount * matrixFloatCount, n = 4 * matrixFloatCount; i < n; i++)
                shadowMatrices[i] = 0.0;
            for (var i = 0; i < cascadeCount; i++) {
                var boundSphere = shadowSliceDatas[i].splitBoundSphere;
                var center = boundSphere.center;
                var radius = boundSphere.radius;
                var offset = i * 4;
                splitBoundSpheres[offset] = center.x;
                splitBoundSpheres[offset + 1] = center.y;
                splitBoundSpheres[offset + 2] = center.z;
                splitBoundSpheres[offset + 3] = radius * radius;
            }
            const sphereFloatCount = 4;
            for (var i = cascadeCount * sphereFloatCount, n = 4 * sphereFloatCount; i < n; i++)
                splitBoundSpheres[i] = 0.0;
        }
    }
}
ShadowUtils._tempMatrix0 = new Matrix4x4();
ShadowUtils._shadowMapScaleOffsetMatrix = new Matrix4x4(0.5, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.5, 0.5, 0.0, 1.0);
ShadowUtils._frustumCorners = [new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3()];
ShadowUtils._backPlaneFaces = new Array(5);
ShadowUtils._edgePlanePoint2 = new Vector3();
ShadowUtils._frustumPlaneNeighbors = [
    [FrustumFace.Left, FrustumFace.Right, FrustumFace.Top, FrustumFace.Bottom],
    [FrustumFace.Left, FrustumFace.Right, FrustumFace.Top, FrustumFace.Bottom],
    [FrustumFace.Near, FrustumFace.Far, FrustumFace.Top, FrustumFace.Bottom],
    [FrustumFace.Near, FrustumFace.Far, FrustumFace.Top, FrustumFace.Bottom],
    [FrustumFace.Near, FrustumFace.Far, FrustumFace.Left, FrustumFace.Right],
    [FrustumFace.Near, FrustumFace.Far, FrustumFace.Left, FrustumFace.Right]
];
ShadowUtils._frustumTwoPlaneCorners = [
    [[FrustumCorner.unknown, FrustumCorner.unknown], [FrustumCorner.unknown, FrustumCorner.unknown], [FrustumCorner.nearBottomLeft, FrustumCorner.nearTopLeft], [FrustumCorner.nearTopRight, FrustumCorner.nearBottomRight], [FrustumCorner.nearBottomRight, FrustumCorner.nearBottomLeft], [FrustumCorner.nearTopLeft, FrustumCorner.nearTopRight]],
    [[FrustumCorner.unknown, FrustumCorner.unknown], [FrustumCorner.unknown, FrustumCorner.unknown], [FrustumCorner.FarTopLeft, FrustumCorner.FarBottomLeft], [FrustumCorner.FarBottomRight, FrustumCorner.FarTopRight], [FrustumCorner.FarBottomLeft, FrustumCorner.FarBottomRight], [FrustumCorner.FarTopRight, FrustumCorner.FarTopLeft]],
    [[FrustumCorner.nearTopLeft, FrustumCorner.nearBottomLeft], [FrustumCorner.FarBottomLeft, FrustumCorner.FarTopLeft], [FrustumCorner.unknown, FrustumCorner.unknown], [FrustumCorner.unknown, FrustumCorner.unknown], [FrustumCorner.nearBottomLeft, FrustumCorner.FarBottomLeft], [FrustumCorner.FarTopLeft, FrustumCorner.nearTopLeft]],
    [[FrustumCorner.nearBottomRight, FrustumCorner.nearTopRight], [FrustumCorner.FarTopRight, FrustumCorner.FarBottomRight], [FrustumCorner.unknown, FrustumCorner.unknown], [FrustumCorner.unknown, FrustumCorner.unknown], [FrustumCorner.FarBottomRight, FrustumCorner.nearBottomRight], [FrustumCorner.nearTopRight, FrustumCorner.FarTopRight]],
    [[FrustumCorner.nearBottomLeft, FrustumCorner.nearBottomRight], [FrustumCorner.FarBottomRight, FrustumCorner.FarBottomLeft], [FrustumCorner.FarBottomLeft, FrustumCorner.nearBottomLeft], [FrustumCorner.nearBottomRight, FrustumCorner.FarBottomRight], [FrustumCorner.unknown, FrustumCorner.unknown], [FrustumCorner.unknown, FrustumCorner.unknown]],
    [[FrustumCorner.nearTopRight, FrustumCorner.nearTopLeft], [FrustumCorner.FarTopLeft, FrustumCorner.FarTopRight], [FrustumCorner.nearTopLeft, FrustumCorner.FarTopLeft], [FrustumCorner.FarTopRight, FrustumCorner.nearTopRight], [FrustumCorner.unknown, FrustumCorner.unknown], [FrustumCorner.unknown, FrustumCorner.unknown]]
];
ShadowUtils.atlasBorderSize = 4.0;

//# sourceMappingURL=ShadowUtils.js.map
