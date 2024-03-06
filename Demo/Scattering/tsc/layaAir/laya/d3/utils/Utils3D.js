import { Texture2D } from "../../resource/Texture2D";
import { TextureGenerator } from "../resource/TextureGenerator";
import { ILaya3D } from "../../../ILaya3D";
import { HTMLCanvas } from "../../resource/HTMLCanvas";
import { TextureFormat } from "../../RenderEngine/RenderEnum/TextureFormat";
import { FilterMode } from "../../RenderEngine/RenderEnum/FilterMode";
import { WrapMode } from "../../RenderEngine/RenderEnum/WrapMode";
import { RenderTargetFormat } from "../../RenderEngine/RenderEnum/RenderTargetFormat";
import { LayaEnv } from "../../../LayaEnv";
import { Vector3 } from "../../maths/Vector3";
export class Utils3D {
    static _createFloatTextureBuffer(width, height) {
        var floatTex = new Texture2D(width, height, TextureFormat.R32G32B32A32, false, false);
        floatTex.setPixelsData(null, false, false);
        floatTex.filterMode = FilterMode.Point;
        floatTex.wrapModeU = WrapMode.Clamp;
        floatTex.wrapModeV = WrapMode.Clamp;
        floatTex.anisoLevel = 0;
        return floatTex;
    }
    static _convertToLayaVec3(bVector, out) {
        var bullet = ILaya3D.Physics3D._bullet;
        out.x = bullet.btVector3_x(bVector);
        out.y = bullet.btVector3_y(bVector);
        out.z = bullet.btVector3_z(bVector);
    }
    static _convertToBulletVec3(lVector, out) {
        ILaya3D.Physics3D._bullet.btVector3_setValue(out, lVector.x, lVector.y, lVector.z);
    }
    static _rotationTransformScaleSkinAnimation(tx, ty, tz, qx, qy, qz, qw, sx, sy, sz, outArray, outOffset) {
        var re = Utils3D._tempArray16_0;
        var se = Utils3D._tempArray16_1;
        var tse = Utils3D._tempArray16_2;
        var x2 = qx + qx;
        var y2 = qy + qy;
        var z2 = qz + qz;
        var xx = qx * x2;
        var yx = qy * x2;
        var yy = qy * y2;
        var zx = qz * x2;
        var zy = qz * y2;
        var zz = qz * z2;
        var wx = qw * x2;
        var wy = qw * y2;
        var wz = qw * z2;
        re[15] = 1;
        re[0] = 1 - yy - zz;
        re[1] = yx + wz;
        re[2] = zx - wy;
        re[4] = yx - wz;
        re[5] = 1 - xx - zz;
        re[6] = zy + wx;
        re[8] = zx + wy;
        re[9] = zy - wx;
        re[10] = 1 - xx - yy;
        se[15] = 1;
        se[0] = sx;
        se[5] = sy;
        se[10] = sz;
        var i, ai0, ai1, ai2, ai3;
        for (i = 0; i < 4; i++) {
            ai0 = re[i];
            ai1 = re[i + 4];
            ai2 = re[i + 8];
            ai3 = re[i + 12];
            tse[i] = ai0;
            tse[i + 4] = ai1;
            tse[i + 8] = ai2;
            tse[i + 12] = ai0 * tx + ai1 * ty + ai2 * tz + ai3;
        }
        for (i = 0; i < 4; i++) {
            ai0 = tse[i];
            ai1 = tse[i + 4];
            ai2 = tse[i + 8];
            ai3 = tse[i + 12];
            outArray[i + outOffset] = ai0 * se[0] + ai1 * se[1] + ai2 * se[2] + ai3 * se[3];
            outArray[i + outOffset + 4] = ai0 * se[4] + ai1 * se[5] + ai2 * se[6] + ai3 * se[7];
            outArray[i + outOffset + 8] = ai0 * se[8] + ai1 * se[9] + ai2 * se[10] + ai3 * se[11];
            outArray[i + outOffset + 12] = ai0 * se[12] + ai1 * se[13] + ai2 * se[14] + ai3 * se[15];
        }
    }
    static billboardTrans(v0, cameraDir, cameraUp, out) {
        Vector3.normalize(cameraUp, Utils3D._tempV1);
        Vector3.cross(cameraDir, cameraUp, Utils3D._tempV0);
        Vector3.normalize(Utils3D._tempV0, Utils3D._tempV0);
        Vector3.scale(Utils3D._tempV0, v0.x, out);
        Vector3.scale(cameraUp, v0.y, Utils3D._tempV1);
        Vector3.add(out, Utils3D._tempV1, out);
    }
    static PointinTriangle(A, B, C, P) {
        let v0 = C.vsub(A, Utils3D._tempVector3_0);
        let v1 = B.vsub(A, Utils3D._tempVector3_1);
        let v2 = P.vsub(A, Utils3D._tempVector3_2);
        let dot00 = v0.dot(v0);
        let dot01 = v0.dot(v1);
        let dot02 = v0.dot(v2);
        let dot11 = v1.dot(v1);
        let dot12 = v1.dot(v2);
        let inverDeno = 1 / (dot00 * dot11 - dot01 * dot01);
        let u = (dot11 * dot02 - dot01 * dot12) * inverDeno;
        if (u < 0 || u > 1) {
            return false;
        }
        let v = (dot00 * dot12 - dot01 * dot02) * inverDeno;
        if (v < 0 || v > 1) {
            return false;
        }
        return u + v <= 1;
    }
    static _computeBoneAndAnimationDatasByBindPoseMatrxix(bones, curData, inverGlobalBindPose, outBonesDatas, outAnimationDatas, boneIndexToMesh) {
        var offset = 0;
        var matOffset = 0;
        var i;
        var parentOffset;
        var boneLength = bones.length;
        for (i = 0; i < boneLength; offset += bones[i].keyframeWidth, matOffset += 16, i++) {
            Utils3D._rotationTransformScaleSkinAnimation(curData[offset + 0], curData[offset + 1], curData[offset + 2], curData[offset + 3], curData[offset + 4], curData[offset + 5], curData[offset + 6], curData[offset + 7], curData[offset + 8], curData[offset + 9], outBonesDatas, matOffset);
            if (i != 0) {
                parentOffset = bones[i].parentIndex * 16;
                Utils3D.mulMatrixByArray(outBonesDatas, parentOffset, outBonesDatas, matOffset, outBonesDatas, matOffset);
            }
        }
        var n = inverGlobalBindPose.length;
        for (i = 0; i < n; i++) {
            Utils3D.mulMatrixByArrayAndMatrixFast(outBonesDatas, boneIndexToMesh[i] * 16, inverGlobalBindPose[i], outAnimationDatas, i * 16);
        }
    }
    static _computeAnimationDatasByArrayAndMatrixFast(inverGlobalBindPose, bonesDatas, outAnimationDatas, boneIndexToMesh) {
        for (var i = 0, n = inverGlobalBindPose.length; i < n; i++)
            Utils3D.mulMatrixByArrayAndMatrixFast(bonesDatas, boneIndexToMesh[i] * 16, inverGlobalBindPose[i], outAnimationDatas, i * 16);
    }
    static _computeBoneAndAnimationDatasByBindPoseMatrxixOld(bones, curData, inverGlobalBindPose, outBonesDatas, outAnimationDatas) {
        var offset = 0;
        var matOffset = 0;
        var i;
        var parentOffset;
        var boneLength = bones.length;
        for (i = 0; i < boneLength; offset += bones[i].keyframeWidth, matOffset += 16, i++) {
            Utils3D._rotationTransformScaleSkinAnimation(curData[offset + 7], curData[offset + 8], curData[offset + 9], curData[offset + 3], curData[offset + 4], curData[offset + 5], curData[offset + 6], curData[offset + 0], curData[offset + 1], curData[offset + 2], outBonesDatas, matOffset);
            if (i != 0) {
                parentOffset = bones[i].parentIndex * 16;
                Utils3D.mulMatrixByArray(outBonesDatas, parentOffset, outBonesDatas, matOffset, outBonesDatas, matOffset);
            }
        }
        var n = inverGlobalBindPose.length;
        for (i = 0; i < n; i++) {
            var arrayOffset = i * 16;
            Utils3D.mulMatrixByArrayAndMatrixFast(outBonesDatas, arrayOffset, inverGlobalBindPose[i], outAnimationDatas, arrayOffset);
        }
    }
    static _computeAnimationDatasByArrayAndMatrixFastOld(inverGlobalBindPose, bonesDatas, outAnimationDatas) {
        var n = inverGlobalBindPose.length;
        for (var i = 0; i < n; i++) {
            var arrayOffset = i * 16;
            Utils3D.mulMatrixByArrayAndMatrixFast(bonesDatas, arrayOffset, inverGlobalBindPose[i], outAnimationDatas, arrayOffset);
        }
    }
    static _computeRootAnimationData(bones, curData, animationDatas) {
        for (var i = 0, offset = 0, matOffset = 0, boneLength = bones.length; i < boneLength; offset += bones[i].keyframeWidth, matOffset += 16, i++)
            Utils3D.createAffineTransformationArray(curData[offset + 0], curData[offset + 1], curData[offset + 2], curData[offset + 3], curData[offset + 4], curData[offset + 5], curData[offset + 6], curData[offset + 7], curData[offset + 8], curData[offset + 9], animationDatas, matOffset);
    }
    static transformVector3ArrayByQuat(sourceArray, sourceOffset, rotation, outArray, outOffset) {
        var x = sourceArray[sourceOffset], y = sourceArray[sourceOffset + 1], z = sourceArray[sourceOffset + 2], qx = rotation.x, qy = rotation.y, qz = rotation.z, qw = rotation.w, ix = qw * x + qy * z - qz * y, iy = qw * y + qz * x - qx * z, iz = qw * z + qx * y - qy * x, iw = -qx * x - qy * y - qz * z;
        outArray[outOffset] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
        outArray[outOffset + 1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
        outArray[outOffset + 2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    }
    static mulMatrixByArray(leftArray, leftOffset, rightArray, rightOffset, outArray, outOffset) {
        var i, ai0, ai1, ai2, ai3;
        if (outArray === rightArray) {
            rightArray = Utils3D._tempArray16_3;
            for (i = 0; i < 16; ++i) {
                rightArray[i] = outArray[outOffset + i];
            }
            rightOffset = 0;
        }
        for (i = 0; i < 4; i++) {
            ai0 = leftArray[leftOffset + i];
            ai1 = leftArray[leftOffset + i + 4];
            ai2 = leftArray[leftOffset + i + 8];
            ai3 = leftArray[leftOffset + i + 12];
            outArray[outOffset + i] = ai0 * rightArray[rightOffset + 0] + ai1 * rightArray[rightOffset + 1] + ai2 * rightArray[rightOffset + 2] + ai3 * rightArray[rightOffset + 3];
            outArray[outOffset + i + 4] = ai0 * rightArray[rightOffset + 4] + ai1 * rightArray[rightOffset + 5] + ai2 * rightArray[rightOffset + 6] + ai3 * rightArray[rightOffset + 7];
            outArray[outOffset + i + 8] = ai0 * rightArray[rightOffset + 8] + ai1 * rightArray[rightOffset + 9] + ai2 * rightArray[rightOffset + 10] + ai3 * rightArray[rightOffset + 11];
            outArray[outOffset + i + 12] = ai0 * rightArray[rightOffset + 12] + ai1 * rightArray[rightOffset + 13] + ai2 * rightArray[rightOffset + 14] + ai3 * rightArray[rightOffset + 15];
        }
    }
    static mulMatrixByArrayFast(leftArray, leftOffset, rightArray, rightOffset, outArray, outOffset) {
        var i, ai0, ai1, ai2, ai3;
        for (i = 0; i < 4; i++) {
            ai0 = leftArray[leftOffset + i];
            ai1 = leftArray[leftOffset + i + 4];
            ai2 = leftArray[leftOffset + i + 8];
            ai3 = leftArray[leftOffset + i + 12];
            outArray[outOffset + i] = ai0 * rightArray[rightOffset + 0] + ai1 * rightArray[rightOffset + 1] + ai2 * rightArray[rightOffset + 2] + ai3 * rightArray[rightOffset + 3];
            outArray[outOffset + i + 4] = ai0 * rightArray[rightOffset + 4] + ai1 * rightArray[rightOffset + 5] + ai2 * rightArray[rightOffset + 6] + ai3 * rightArray[rightOffset + 7];
            outArray[outOffset + i + 8] = ai0 * rightArray[rightOffset + 8] + ai1 * rightArray[rightOffset + 9] + ai2 * rightArray[rightOffset + 10] + ai3 * rightArray[rightOffset + 11];
            outArray[outOffset + i + 12] = ai0 * rightArray[rightOffset + 12] + ai1 * rightArray[rightOffset + 13] + ai2 * rightArray[rightOffset + 14] + ai3 * rightArray[rightOffset + 15];
        }
    }
    static mulMatrixByArrayAndMatrixFast(leftArray, leftOffset, rightMatrix, outArray, outOffset) {
        var i, ai0, ai1, ai2, ai3;
        var rightMatrixE = rightMatrix.elements;
        var m11 = rightMatrixE[0], m12 = rightMatrixE[1], m13 = rightMatrixE[2], m14 = rightMatrixE[3];
        var m21 = rightMatrixE[4], m22 = rightMatrixE[5], m23 = rightMatrixE[6], m24 = rightMatrixE[7];
        var m31 = rightMatrixE[8], m32 = rightMatrixE[9], m33 = rightMatrixE[10], m34 = rightMatrixE[11];
        var m41 = rightMatrixE[12], m42 = rightMatrixE[13], m43 = rightMatrixE[14], m44 = rightMatrixE[15];
        var ai0LeftOffset = leftOffset;
        var ai1LeftOffset = leftOffset + 4;
        var ai2LeftOffset = leftOffset + 8;
        var ai3LeftOffset = leftOffset + 12;
        var ai0OutOffset = outOffset;
        var ai1OutOffset = outOffset + 4;
        var ai2OutOffset = outOffset + 8;
        var ai3OutOffset = outOffset + 12;
        for (i = 0; i < 4; i++) {
            ai0 = leftArray[ai0LeftOffset + i];
            ai1 = leftArray[ai1LeftOffset + i];
            ai2 = leftArray[ai2LeftOffset + i];
            ai3 = leftArray[ai3LeftOffset + i];
            outArray[ai0OutOffset + i] = ai0 * m11 + ai1 * m12 + ai2 * m13 + ai3 * m14;
            outArray[ai1OutOffset + i] = ai0 * m21 + ai1 * m22 + ai2 * m23 + ai3 * m24;
            outArray[ai2OutOffset + i] = ai0 * m31 + ai1 * m32 + ai2 * m33 + ai3 * m34;
            outArray[ai3OutOffset + i] = ai0 * m41 + ai1 * m42 + ai2 * m43 + ai3 * m44;
        }
    }
    static createAffineTransformationArray(tX, tY, tZ, rX, rY, rZ, rW, sX, sY, sZ, outArray, outOffset) {
        var x2 = rX + rX, y2 = rY + rY, z2 = rZ + rZ;
        var xx = rX * x2, xy = rX * y2, xz = rX * z2, yy = rY * y2, yz = rY * z2, zz = rZ * z2;
        var wx = rW * x2, wy = rW * y2, wz = rW * z2;
        outArray[outOffset + 0] = (1 - (yy + zz)) * sX;
        outArray[outOffset + 1] = (xy + wz) * sX;
        outArray[outOffset + 2] = (xz - wy) * sX;
        outArray[outOffset + 3] = 0;
        outArray[outOffset + 4] = (xy - wz) * sY;
        outArray[outOffset + 5] = (1 - (xx + zz)) * sY;
        outArray[outOffset + 6] = (yz + wx) * sY;
        outArray[outOffset + 7] = 0;
        outArray[outOffset + 8] = (xz + wy) * sZ;
        outArray[outOffset + 9] = (yz - wx) * sZ;
        outArray[outOffset + 10] = (1 - (xx + yy)) * sZ;
        outArray[outOffset + 11] = 0;
        outArray[outOffset + 12] = tX;
        outArray[outOffset + 13] = tY;
        outArray[outOffset + 14] = tZ;
        outArray[outOffset + 15] = 1;
    }
    static transformVector3ArrayToVector3ArrayCoordinate(source, sourceOffset, transform, result, resultOffset) {
        var coordinateX = source[sourceOffset + 0];
        var coordinateY = source[sourceOffset + 1];
        var coordinateZ = source[sourceOffset + 2];
        var transformElem = transform.elements;
        var w = ((coordinateX * transformElem[3]) + (coordinateY * transformElem[7]) + (coordinateZ * transformElem[11]) + transformElem[15]);
        result[resultOffset] = (coordinateX * transformElem[0]) + (coordinateY * transformElem[4]) + (coordinateZ * transformElem[8]) + transformElem[12] / w;
        result[resultOffset + 1] = (coordinateX * transformElem[1]) + (coordinateY * transformElem[5]) + (coordinateZ * transformElem[9]) + transformElem[13] / w;
        result[resultOffset + 2] = (coordinateX * transformElem[2]) + (coordinateY * transformElem[6]) + (coordinateZ * transformElem[10]) + transformElem[14] / w;
    }
    static transformVector3ArrayToVector3ArrayNormal(source, sourceOffset, transform, result, resultOffset) {
        var coordinateX = source[sourceOffset + 0];
        var coordinateY = source[sourceOffset + 1];
        var coordinateZ = source[sourceOffset + 2];
        var transformElem = transform.elements;
        result[resultOffset] = coordinateX * transformElem[0] + coordinateY * transformElem[4] + coordinateZ * transformElem[8];
        result[resultOffset + 1] = coordinateX * transformElem[1] + coordinateY * transformElem[5] + coordinateZ * transformElem[9];
        result[resultOffset + 2] = coordinateX * transformElem[2] + coordinateY * transformElem[6] + coordinateZ * transformElem[10];
    }
    static transformLightingMapTexcoordArray(source, sourceOffset, lightingMapScaleOffset, result, resultOffset) {
        result[resultOffset + 0] = source[sourceOffset + 0] * lightingMapScaleOffset.x + lightingMapScaleOffset.z;
        result[resultOffset + 1] = 1.0 - ((1.0 - source[sourceOffset + 1]) * lightingMapScaleOffset.y + lightingMapScaleOffset.w);
    }
    static getURLVerion(url) {
        var index = url.indexOf("?");
        return index >= 0 ? url.substr(index) : null;
    }
    static _createAffineTransformationArray(trans, rot, scale, outE) {
        var x = rot.x, y = rot.y, z = rot.z, w = rot.w, x2 = x + x, y2 = y + y, z2 = z + z;
        var xx = x * x2, xy = x * y2, xz = x * z2, yy = y * y2, yz = y * z2, zz = z * z2;
        var wx = w * x2, wy = w * y2, wz = w * z2, sx = scale.x, sy = scale.y, sz = scale.z;
        outE[0] = (1 - (yy + zz)) * sx;
        outE[1] = (xy + wz) * sx;
        outE[2] = (xz - wy) * sx;
        outE[3] = 0;
        outE[4] = (xy - wz) * sy;
        outE[5] = (1 - (xx + zz)) * sy;
        outE[6] = (yz + wx) * sy;
        outE[7] = 0;
        outE[8] = (xz + wy) * sz;
        outE[9] = (yz - wx) * sz;
        outE[10] = (1 - (xx + yy)) * sz;
        outE[11] = 0;
        outE[12] = trans.x;
        outE[13] = trans.y;
        outE[14] = trans.z;
        outE[15] = 1;
    }
    static _mulMatrixArray(left, right, rightOffset, outArray, outOffset) {
        var l = right;
        var r = left;
        var e = outArray;
        var l11 = l[rightOffset], l12 = l[rightOffset + 1], l13 = l[rightOffset + 2], l14 = l[rightOffset + 3];
        var l21 = l[rightOffset + 4], l22 = l[rightOffset + 5], l23 = l[rightOffset + 6], l24 = l[rightOffset + 7];
        var l31 = l[rightOffset + 8], l32 = l[rightOffset + 9], l33 = l[rightOffset + 10], l34 = l[rightOffset + 11];
        var l41 = l[rightOffset + 12], l42 = l[rightOffset + 13], l43 = l[rightOffset + 14], l44 = l[rightOffset + 15];
        var r11 = r[0], r12 = r[1], r13 = r[2], r14 = r[3];
        var r21 = r[4], r22 = r[5], r23 = r[6], r24 = r[7];
        var r31 = r[8], r32 = r[9], r33 = r[10], r34 = r[11];
        var r41 = r[12], r42 = r[13], r43 = r[14], r44 = r[15];
        e[outOffset] = (l11 * r11) + (l12 * r21) + (l13 * r31) + (l14 * r41);
        e[outOffset + 1] = (l11 * r12) + (l12 * r22) + (l13 * r32) + (l14 * r42);
        e[outOffset + 2] = (l11 * r13) + (l12 * r23) + (l13 * r33) + (l14 * r43);
        e[outOffset + 3] = (l11 * r14) + (l12 * r24) + (l13 * r34) + (l14 * r44);
        e[outOffset + 4] = (l21 * r11) + (l22 * r21) + (l23 * r31) + (l24 * r41);
        e[outOffset + 5] = (l21 * r12) + (l22 * r22) + (l23 * r32) + (l24 * r42);
        e[outOffset + 6] = (l21 * r13) + (l22 * r23) + (l23 * r33) + (l24 * r43);
        e[outOffset + 7] = (l21 * r14) + (l22 * r24) + (l23 * r34) + (l24 * r44);
        e[outOffset + 8] = (l31 * r11) + (l32 * r21) + (l33 * r31) + (l34 * r41);
        e[outOffset + 9] = (l31 * r12) + (l32 * r22) + (l33 * r32) + (l34 * r42);
        e[outOffset + 10] = (l31 * r13) + (l32 * r23) + (l33 * r33) + (l34 * r43);
        e[outOffset + 11] = (l31 * r14) + (l32 * r24) + (l33 * r34) + (l34 * r44);
        e[outOffset + 12] = (l41 * r11) + (l42 * r21) + (l43 * r31) + (l44 * r41);
        e[outOffset + 13] = (l41 * r12) + (l42 * r22) + (l43 * r32) + (l44 * r42);
        e[outOffset + 14] = (l41 * r13) + (l42 * r23) + (l43 * r33) + (l44 * r43);
        e[outOffset + 15] = (l41 * r14) + (l42 * r24) + (l43 * r34) + (l44 * r44);
    }
    static arcTanAngle(x, y) {
        if (x == 0) {
            if (y == 1)
                return Math.PI / 2;
            return -Math.PI / 2;
        }
        if (x > 0)
            return Math.atan(y / x);
        if (x < 0) {
            if (y > 0)
                return Math.atan(y / x) + Math.PI;
            return Math.atan(y / x) - Math.PI;
        }
        return 0;
    }
    static angleTo(from, location, angle) {
        Vector3.subtract(location, from, TEMPVector30);
        Vector3.normalize(TEMPVector30, TEMPVector30);
        angle.x = Math.asin(TEMPVector30.y);
        angle.y = Utils3D.arcTanAngle(-TEMPVector30.z, -TEMPVector30.x);
    }
    static transformQuat(source, rotation, out) {
        var re = rotation;
        var x = source.x, y = source.y, z = source.z, qx = re[0], qy = re[1], qz = re[2], qw = re[3], ix = qw * x + qy * z - qz * y, iy = qw * y + qz * x - qx * z, iz = qw * z + qx * y - qy * x, iw = -qx * x - qy * y - qz * z;
        out.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
        out.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
        out.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    }
    static quaternionWeight(f, weight, e) {
        e.x = f.x * weight;
        e.y = f.y * weight;
        e.z = f.z * weight;
        e.w = f.w;
    }
    static quaternionConjugate(value, result) {
        result.x = -value.x;
        result.y = -value.y;
        result.z = -value.z;
        result.w = value.w;
    }
    static scaleWeight(s, w, out) {
        var sX = s.x, sY = s.y, sZ = s.z;
        out.x = sX > 0 ? Math.pow(Math.abs(sX), w) : -Math.pow(Math.abs(sX), w);
        out.y = sY > 0 ? Math.pow(Math.abs(sY), w) : -Math.pow(Math.abs(sY), w);
        out.z = sZ > 0 ? Math.pow(Math.abs(sZ), w) : -Math.pow(Math.abs(sZ), w);
    }
    static scaleBlend(sa, sb, w, out) {
        var saw = Utils3D._tempVector3_0;
        var sbw = Utils3D._tempVector3_1;
        Utils3D.scaleWeight(sa, 1.0 - w, saw);
        Utils3D.scaleWeight(sb, w, sbw);
        var sng = w > 0.5 ? sb : sa;
        out.x = sng.x > 0 ? Math.abs(saw.x * sbw.x) : -Math.abs(saw.x * sbw.x);
        out.y = sng.y > 0 ? Math.abs(saw.y * sbw.y) : -Math.abs(saw.y * sbw.y);
        out.z = sng.z > 0 ? Math.abs(saw.z * sbw.z) : -Math.abs(saw.z * sbw.z);
    }
    static matrix4x4MultiplyFFF(a, b, e) {
        var i, ai0, ai1, ai2, ai3;
        if (e === b) {
            b = new Float32Array(16);
            for (i = 0; i < 16; ++i) {
                b[i] = e[i];
            }
        }
        var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
        var b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7];
        var b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11];
        var b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
        for (i = 0; i < 4; i++) {
            ai0 = a[i];
            ai1 = a[i + 4];
            ai2 = a[i + 8];
            ai3 = a[i + 12];
            e[i] = ai0 * b0 + ai1 * b1 + ai2 * b2 + ai3 * b3;
            e[i + 4] = ai0 * b4 + ai1 * b5 + ai2 * b6 + ai3 * b7;
            e[i + 8] = ai0 * b8 + ai1 * b9 + ai2 * b10 + ai3 * b11;
            e[i + 12] = ai0 * b12 + ai1 * b13 + ai2 * b14 + ai3 * b15;
        }
    }
    static matrix4x4MultiplyMFM(left, right, out) {
        Utils3D.matrix4x4MultiplyFFF(left.elements, right, out.elements);
    }
    static _buildTexture2D(width, height, format, colorFunc, mipmaps = false) {
        var texture = new Texture2D(width, height, format, mipmaps, true);
        texture.anisoLevel = 1;
        texture.filterMode = FilterMode.Point;
        TextureGenerator._generateTexture2D(texture, width, height, colorFunc);
        return texture;
    }
    static _drawBound(debugLine, boundBox, color) {
        if (debugLine.lineCount + 12 > debugLine.maxLineCount)
            debugLine.maxLineCount += 12;
        var start = Utils3D._tempVector3_0;
        var end = Utils3D._tempVector3_1;
        var min = boundBox.min;
        var max = boundBox.max;
        start.setValue(min.x, min.y, min.z);
        end.setValue(max.x, min.y, min.z);
        debugLine.addLine(start, end, color, color);
        start.setValue(min.x, min.y, min.z);
        end.setValue(min.x, min.y, max.z);
        debugLine.addLine(start, end, color, color);
        start.setValue(max.x, min.y, min.z);
        end.setValue(max.x, min.y, max.z);
        debugLine.addLine(start, end, color, color);
        start.setValue(min.x, min.y, max.z);
        end.setValue(max.x, min.y, max.z);
        debugLine.addLine(start, end, color, color);
        start.setValue(min.x, min.y, min.z);
        end.setValue(min.x, max.y, min.z);
        debugLine.addLine(start, end, color, color);
        start.setValue(min.x, min.y, max.z);
        end.setValue(min.x, max.y, max.z);
        debugLine.addLine(start, end, color, color);
        start.setValue(max.x, min.y, min.z);
        end.setValue(max.x, max.y, min.z);
        debugLine.addLine(start, end, color, color);
        start.setValue(max.x, min.y, max.z);
        end.setValue(max.x, max.y, max.z);
        debugLine.addLine(start, end, color, color);
        start.setValue(min.x, max.y, min.z);
        end.setValue(max.x, max.y, min.z);
        debugLine.addLine(start, end, color, color);
        start.setValue(min.x, max.y, min.z);
        end.setValue(min.x, max.y, max.z);
        debugLine.addLine(start, end, color, color);
        start.setValue(max.x, max.y, min.z);
        end.setValue(max.x, max.y, max.z);
        debugLine.addLine(start, end, color, color);
        start.setValue(min.x, max.y, max.z);
        end.setValue(max.x, max.y, max.z);
        debugLine.addLine(start, end, color, color);
    }
    static _getHierarchyPath(rootSprite, checkSprite, path) {
        path.length = 0;
        var sprite = checkSprite;
        while (sprite !== rootSprite) {
            var parent = sprite._parent;
            if (parent)
                path.push(parent.getChildIndex(sprite));
            else
                return null;
            sprite = parent;
        }
        return path;
    }
    static _getNodeByHierarchyPath(rootSprite, invPath) {
        var sprite = rootSprite;
        for (var i = invPath.length - 1; i >= 0; i--) {
            sprite = sprite.getChildAt(invPath[i]);
        }
        return sprite;
    }
    static _getParentNodeByHierarchyPath(rootSprite, path) {
        let pathlength = path.length;
        let node = rootSprite;
        for (let i = 0; i < pathlength; i++) {
            if (node)
                node = node.parent;
            else
                return null;
        }
        return node;
    }
    static uint8ArrayToArrayBuffer(rendertexture) {
        let pixelArray;
        let width = rendertexture.width;
        let height = rendertexture.height;
        switch (rendertexture.colorFormat) {
            case RenderTargetFormat.R8G8B8:
                pixelArray = new Uint8Array(width * height * 4);
                break;
            case RenderTargetFormat.R8G8B8A8:
                pixelArray = new Uint8Array(width * height * 4);
                break;
            case RenderTargetFormat.R16G16B16A16:
                pixelArray = new Float32Array(width * height * 4);
                break;
            default:
                throw "this function is not surpprt " + rendertexture.format.toString() + "format Material";
        }
        rendertexture.getData(0, 0, rendertexture.width, rendertexture.height, pixelArray);
        switch (rendertexture.colorFormat) {
            case RenderTargetFormat.R16G16B16A16:
                let ori = pixelArray;
                let trans = new Uint8Array(width * height * 4);
                for (let i = 0, n = ori.length; i < n; i++) {
                    trans[i] = Math.min(Math.floor(ori[i] * 255), 255);
                }
                pixelArray = trans;
                break;
        }
        let pixels = pixelArray;
        var bs;
        if (LayaEnv.isConch) {
        }
        else {
            var canv = new HTMLCanvas(true);
            canv.lock = true;
            canv.size(width, height);
            var ctx2d = canv.getContext('2d');
            var imgdata = ctx2d.createImageData(width, height);
            imgdata.data.set(new Uint8ClampedArray(pixels));
            ctx2d.putImageData(imgdata, 0, 0);
            ;
            bs = canv.source.toDataURL();
            canv.destroy();
        }
        return bs;
    }
}
Utils3D._tempVector3_0 = new Vector3();
Utils3D._tempVector3_1 = new Vector3();
Utils3D._tempVector3_2 = new Vector3();
Utils3D._tempArray16_0 = new Float32Array(16);
Utils3D._tempArray16_1 = new Float32Array(16);
Utils3D._tempArray16_2 = new Float32Array(16);
Utils3D._tempArray16_3 = new Float32Array(16);
Utils3D._compIdToNode = new Object();
Utils3D._tempV0 = new Vector3();
Utils3D._tempV1 = new Vector3();
window.getRTBase64 = Utils3D.uint8ArrayToArrayBuffer;
const TEMPVector30 = new Vector3();

//# sourceMappingURL=Utils3D.js.map
