import { AnimationClipParser03 } from "./AnimationClipParser03";
import { AnimationClipParser04 } from "./AnimationClipParser04";
import { KeyframeNodeList } from "./KeyframeNodeList";
import { Utils3D } from "../utils/Utils3D";
import { Resource } from "../../resource/Resource";
import { Byte } from "../../utils/Byte";
import { ILaya } from "../../../ILaya";
import { WeightedMode } from "../core/Keyframe";
import { Loader } from "../../net/Loader";
import { KeyFrameValueType } from "../component/Animator/KeyframeNodeOwner";
import { Quaternion } from "../../maths/Quaternion";
export class AnimationClip extends Resource {
    constructor() {
        super();
        this._duration = 0;
        this._frameRate = 0;
        this._nodes = new KeyframeNodeList();
        this.islooping = false;
        this._animationEvents = [];
    }
    static _parse(data) {
        var clip = new AnimationClip();
        var reader = new Byte(data);
        var version = reader.readUTFString();
        switch (version) {
            case "LAYAANIMATION:03":
                AnimationClipParser03.parse(clip, reader);
                break;
            case "LAYAANIMATION:04":
            case "LAYAANIMATION:COMPRESSION_04":
            case "LAYAANIMATION:WEIGHT_04":
            case "LAYAANIMATION:WEIGHT_05":
                AnimationClipParser04.parse(clip, reader, version);
                break;
            default:
                throw "unknown animationClip version.";
        }
        return clip;
    }
    static load(url, complete) {
        ILaya.loader.load(url, complete, null, Loader.ANIMATIONCLIP);
    }
    duration() {
        return this._duration;
    }
    _weightModeHermite(weightMode, nextweightMode) {
        return (((weightMode & WeightedMode.Out) == 0) && ((nextweightMode & WeightedMode.In) == 0));
    }
    _hermiteInterpolate(frame, nextFrame, t, dur) {
        var t0 = frame.outTangent, t1 = nextFrame.inTangent;
        if (Number.isFinite(t0) && Number.isFinite(t1)) {
            var t2 = t * t;
            var t3 = t2 * t;
            var a = 2.0 * t3 - 3.0 * t2 + 1.0;
            var b = t3 - 2.0 * t2 + t;
            var c = t3 - t2;
            var d = -2.0 * t3 + 3.0 * t2;
            return a * frame.value + b * t0 * dur + c * t1 * dur + d * nextFrame.value;
        }
        else
            return frame.value;
    }
    _hermiteInterpolateVector3(frame, nextFrame, t, dur, out) {
        var p0 = frame.value;
        var tan0 = frame.outTangent;
        var p1 = nextFrame.value;
        var tan1 = nextFrame.inTangent;
        var t2 = t * t;
        var t3 = t2 * t;
        var a = 2.0 * t3 - 3.0 * t2 + 1.0;
        var b = t3 - 2.0 * t2 + t;
        var c = t3 - t2;
        var d = -2.0 * t3 + 3.0 * t2;
        var t0 = tan0.x, t1 = tan1.x;
        if ((!frame.weightedMode) || this._weightModeHermite(frame.weightedMode.x, nextFrame.weightedMode.x)) {
            if (Number.isFinite(t0) && Number.isFinite(t1))
                out.x = a * p0.x + b * t0 * dur + c * t1 * dur + d * p1.x;
            else
                out.x = p0.x;
        }
        else {
            out.x = this._hermiteCurveSplineWeight(frame.value.x, frame.time, frame.outWeight.x, frame.outTangent.x, nextFrame.value.x, nextFrame.time, nextFrame.inWeight.x, nextFrame.inTangent.x, t);
        }
        t0 = tan0.y, t1 = tan1.y;
        if ((!frame.weightedMode) || this._weightModeHermite(frame.weightedMode.y, nextFrame.weightedMode.y)) {
            if (Number.isFinite(t0) && Number.isFinite(t1))
                out.y = a * p0.y + b * t0 * dur + c * t1 * dur + d * p1.y;
            else
                out.y = p0.y;
        }
        else {
            out.y = this._hermiteCurveSplineWeight(frame.value.y, frame.time, frame.outWeight.y, frame.outTangent.y, nextFrame.value.y, nextFrame.time, nextFrame.inWeight.y, nextFrame.inTangent.y, t);
        }
        t0 = tan0.z, t1 = tan1.z;
        if ((!frame.weightedMode) || this._weightModeHermite(frame.weightedMode.z, nextFrame.weightedMode.z)) {
            if (Number.isFinite(t0) && Number.isFinite(t1))
                out.z = a * p0.z + b * t0 * dur + c * t1 * dur + d * p1.z;
            else
                out.z = p0.z;
        }
        else {
            out.z = this._hermiteCurveSplineWeight(frame.value.z, frame.time, frame.outWeight.z, frame.outTangent.z, nextFrame.value.z, nextFrame.time, nextFrame.inWeight.z, nextFrame.inTangent.z, t);
        }
    }
    _hermiteInterpolateQuaternion(frame, nextFrame, t, dur, out) {
        var p0 = frame.value;
        var tan0 = frame.outTangent;
        var p1 = nextFrame.value;
        var tan1 = nextFrame.inTangent;
        var t2 = t * t;
        var t3 = t2 * t;
        var a = 2.0 * t3 - 3.0 * t2 + 1.0;
        var b = t3 - 2.0 * t2 + t;
        var c = t3 - t2;
        var d = -2.0 * t3 + 3.0 * t2;
        var t0 = tan0.x, t1 = tan1.x;
        if ((!frame.weightedMode) || this._weightModeHermite(frame.weightedMode.x, nextFrame.weightedMode.x)) {
            if (Number.isFinite(t0) && Number.isFinite(t1))
                out.x = a * p0.x + b * t0 * dur + c * t1 * dur + d * p1.x;
            else
                out.x = p0.x;
        }
        else {
            out.x = this._hermiteCurveSplineWeight(frame.value.x, frame.time, frame.outWeight.x, frame.outTangent.x, nextFrame.value.x, nextFrame.time, nextFrame.inWeight.x, nextFrame.inTangent.x, t);
        }
        t0 = tan0.y, t1 = tan1.y;
        if ((!frame.weightedMode) || this._weightModeHermite(frame.weightedMode.y, nextFrame.weightedMode.y)) {
            if (Number.isFinite(t0) && Number.isFinite(t1))
                out.y = a * p0.y + b * t0 * dur + c * t1 * dur + d * p1.y;
            else
                out.y = p0.y;
        }
        else {
            out.y = this._hermiteCurveSplineWeight(frame.value.y, frame.time, frame.outWeight.y, frame.outTangent.y, nextFrame.value.y, nextFrame.time, nextFrame.inWeight.y, nextFrame.inTangent.y, t);
        }
        t0 = tan0.z, t1 = tan1.z;
        if ((!frame.weightedMode) || this._weightModeHermite(frame.weightedMode.z, nextFrame.weightedMode.z)) {
            if (Number.isFinite(t0) && Number.isFinite(t1))
                out.z = a * p0.z + b * t0 * dur + c * t1 * dur + d * p1.z;
            else
                out.z = p0.z;
        }
        else {
            out.z = this._hermiteCurveSplineWeight(frame.value.z, frame.time, frame.outWeight.z, frame.outTangent.z, nextFrame.value.z, nextFrame.time, nextFrame.inWeight.z, nextFrame.inTangent.z, t);
        }
        t0 = tan0.w, t1 = tan1.w;
        if ((!frame.weightedMode) || this._weightModeHermite(frame.weightedMode.w, nextFrame.weightedMode.w)) {
            if (Number.isFinite(t0) && Number.isFinite(t1))
                out.w = a * p0.w + b * t0 * dur + c * t1 * dur + d * p1.w;
            else
                out.w = p0.w;
        }
        else {
            out.w = this._hermiteCurveSplineWeight(frame.value.w, frame.time, frame.outWeight.w, frame.outTangent.w, nextFrame.value.w, nextFrame.time, nextFrame.inWeight.w, nextFrame.inTangent.w, t);
        }
    }
    _hermiteInterpolateVector4(frame, nextFrame, t, dur, out) {
        var p0 = frame.value;
        var tan0 = frame.outTangent;
        var p1 = nextFrame.value;
        var tan1 = nextFrame.inTangent;
        var t2 = t * t;
        var t3 = t2 * t;
        var a = 2.0 * t3 - 3.0 * t2 + 1.0;
        var b = t3 - 2.0 * t2 + t;
        var c = t3 - t2;
        var d = -2.0 * t3 + 3.0 * t2;
        var t0 = tan0.x, t1 = tan1.x;
        if ((!frame.weightedMode) || this._weightModeHermite(frame.weightedMode.x, nextFrame.weightedMode.x)) {
            if (Number.isFinite(t0) && Number.isFinite(t1))
                out.x = a * p0.x + b * t0 * dur + c * t1 * dur + d * p1.x;
            else
                out.x = p0.x;
        }
        else {
            out.x = this._hermiteCurveSplineWeight(frame.value.x, frame.time, frame.outWeight.x, frame.outTangent.x, nextFrame.value.x, nextFrame.time, nextFrame.inWeight.x, nextFrame.inTangent.x, t);
        }
        t0 = tan0.y, t1 = tan1.y;
        if ((!frame.weightedMode) || this._weightModeHermite(frame.weightedMode.y, nextFrame.weightedMode.y)) {
            if (Number.isFinite(t0) && Number.isFinite(t1))
                out.y = a * p0.y + b * t0 * dur + c * t1 * dur + d * p1.y;
            else
                out.y = p0.y;
        }
        else {
            out.y = this._hermiteCurveSplineWeight(frame.value.y, frame.time, frame.outWeight.y, frame.outTangent.y, nextFrame.value.y, nextFrame.time, nextFrame.inWeight.y, nextFrame.inTangent.y, t);
        }
        t0 = tan0.z, t1 = tan1.z;
        if ((!frame.weightedMode) || this._weightModeHermite(frame.weightedMode.z, nextFrame.weightedMode.z)) {
            if (Number.isFinite(t0) && Number.isFinite(t1))
                out.z = a * p0.z + b * t0 * dur + c * t1 * dur + d * p1.z;
            else
                out.z = p0.z;
        }
        else {
            out.z = this._hermiteCurveSplineWeight(frame.value.z, frame.time, frame.outWeight.z, frame.outTangent.z, nextFrame.value.z, nextFrame.time, nextFrame.inWeight.z, nextFrame.inTangent.z, t);
        }
        t0 = tan0.w, t1 = tan1.w;
        if ((!frame.weightedMode) || this._weightModeHermite(frame.weightedMode.w, nextFrame.weightedMode.w)) {
            if (Number.isFinite(t0) && Number.isFinite(t1))
                out.w = a * p0.w + b * t0 * dur + c * t1 * dur + d * p1.w;
            else
                out.w = p0.w;
        }
        else {
            out.w = this._hermiteCurveSplineWeight(frame.value.w, frame.time, frame.outWeight.w, frame.outTangent.w, nextFrame.value.w, nextFrame.time, nextFrame.inWeight.w, nextFrame.inTangent.w, t);
        }
    }
    _hermiteInterpolateVector2(frame, nextFrame, t, dur, out) {
        var p0 = frame.value;
        var tan0 = frame.outTangent;
        var p1 = nextFrame.value;
        var tan1 = nextFrame.inTangent;
        var t2 = t * t;
        var t3 = t2 * t;
        var a = 2.0 * t3 - 3.0 * t2 + 1.0;
        var b = t3 - 2.0 * t2 + t;
        var c = t3 - t2;
        var d = -2.0 * t3 + 3.0 * t2;
        var t0 = tan0.x, t1 = tan1.x;
        if ((!frame.weightedMode) || this._weightModeHermite(frame.weightedMode.x, nextFrame.weightedMode.x)) {
            if (Number.isFinite(t0) && Number.isFinite(t1))
                out.x = a * p0.x + b * t0 * dur + c * t1 * dur + d * p1.x;
            else
                out.x = p0.x;
        }
        else {
            out.x = this._hermiteCurveSplineWeight(frame.value.x, frame.time, frame.outWeight.x, frame.outTangent.x, nextFrame.value.x, nextFrame.time, nextFrame.inWeight.x, nextFrame.inTangent.x, t);
        }
        t0 = tan0.y, t1 = tan1.y;
        if ((!frame.weightedMode) || this._weightModeHermite(frame.weightedMode.y, nextFrame.weightedMode.y)) {
            if (Number.isFinite(t0) && Number.isFinite(t1))
                out.y = a * p0.y + b * t0 * dur + c * t1 * dur + d * p1.y;
            else
                out.y = p0.y;
        }
        else {
            out.y = this._hermiteCurveSplineWeight(frame.value.y, frame.time, frame.outWeight.y, frame.outTangent.y, nextFrame.value.y, nextFrame.time, nextFrame.inWeight.y, nextFrame.inTangent.y, t);
        }
    }
    _hermiteCurveSplineWeight(frameValue, frametime, frameOutWeight, frameOutTangent, nextframeValue, nextframetime, nextframeInweight, nextframeIntangent, time) {
        let Eps = 2.22e-16;
        let x = time;
        let x1 = frametime;
        let y1 = frameValue;
        let wt1 = frameOutWeight;
        let x2 = nextframetime;
        let y2 = nextframeValue;
        let wt2 = nextframeInweight;
        let dx = x2 - x1;
        let dy = y2 - y1;
        dy = Math.max(Math.abs(dy), Eps) * (dy < 0 ? -1 : 1);
        let yp1 = frameOutTangent;
        let yp2 = nextframeIntangent;
        if (!Number.isFinite(yp1) || !Number.isFinite(yp2)) {
            return frameValue;
        }
        yp1 = yp1 * dx / dy;
        yp2 = yp2 * dx / dy;
        let wt2s = 1 - wt2;
        let t = 0.5;
        let t2 = 0;
        if (Math.abs(wt1 - 0.33333334) < 0.0001 && Math.abs(wt2 - 0.33333334) < 0.0001) {
            t = x;
            t2 = 1 - t;
        }
        else {
            while (true) {
                t2 = (1 - t);
                let fg = 3 * t2 * t2 * t * wt1 + 3 * t2 * t * t * wt2s + t * t * t - x;
                if (Math.abs(fg) <= 2.5 * Eps)
                    break;
                let fpg = 3 * t2 * t2 * wt1 + 6 * t2 * t * (wt2s - wt1) + 3 * t * t * (1 - wt2s);
                let fppg = 6 * t2 * (wt2s - 2 * wt1) + 6 * t * (1 - 2 * wt2s + wt1);
                let fpppg = 18 * wt1 - 18 * wt2s + 6;
                t -= (6 * fg * fpg * fpg - 3 * fg * fg * fppg) / (6 * fpg * fpg * fpg - 6 * fg * fpg * fppg + fg * fg * fpppg);
            }
        }
        let y = 3 * t2 * t2 * t * wt1 * yp1 + 3 * t2 * t * t * (1 - wt2 * yp2) + t * t * t;
        return y * dy + y1;
    }
    _curveInterpolate(frame, nextFrame, t, dur) {
        if ((!frame.weightedMode) || this._weightModeHermite(frame.weightedMode, nextFrame.weightedMode)) {
            return this._hermiteInterpolate(frame, nextFrame, t, dur);
        }
        else {
            return this._hermiteCurveSplineWeight(frame.value, frame.time, frame.outWeight, frame.outTangent, nextFrame.value, nextFrame.time, nextFrame.inWeight, nextFrame.inTangent, t);
        }
    }
    _evaluateClipDatasRealTime(nodes, playCurTime, realTimeCurrentFrameIndexes, addtive, frontPlay, outDatas, avatarMask) {
        for (var i = 0, n = nodes.count; i < n; i++) {
            var node = nodes.getNodeByIndex(i);
            var type = node.type;
            var nextFrameIndex;
            var keyFrames = node._keyFrames;
            var keyFramesCount = keyFrames.length;
            var frameIndex = realTimeCurrentFrameIndexes[i];
            if (avatarMask && (!avatarMask.getTransformActive(node.nodePath))) {
                continue;
            }
            if (frontPlay) {
                if ((frameIndex !== -1) && (playCurTime < keyFrames[frameIndex].time)) {
                    frameIndex = -1;
                    realTimeCurrentFrameIndexes[i] = frameIndex;
                }
                nextFrameIndex = frameIndex + 1;
                while (nextFrameIndex < keyFramesCount) {
                    if (keyFrames[nextFrameIndex].time > playCurTime)
                        break;
                    frameIndex++;
                    nextFrameIndex++;
                    realTimeCurrentFrameIndexes[i] = frameIndex;
                }
            }
            else {
                nextFrameIndex = frameIndex + 1;
                if ((nextFrameIndex !== keyFramesCount) && (playCurTime > keyFrames[nextFrameIndex].time)) {
                    frameIndex = keyFramesCount - 1;
                    realTimeCurrentFrameIndexes[i] = frameIndex;
                }
                nextFrameIndex = frameIndex + 1;
                while (frameIndex > -1) {
                    if (keyFrames[frameIndex].time < playCurTime)
                        break;
                    frameIndex--;
                    nextFrameIndex--;
                    realTimeCurrentFrameIndexes[i] = frameIndex;
                }
            }
            var isEnd = nextFrameIndex === keyFramesCount;
            switch (type) {
                case KeyFrameValueType.Float:
                    if (frameIndex !== -1) {
                        var frame = keyFrames[frameIndex];
                        if (isEnd) {
                            outDatas[i] = frame.value;
                        }
                        else {
                            var nextFarme = keyFrames[nextFrameIndex];
                            var d = nextFarme.time - frame.time;
                            var t;
                            if (d !== 0)
                                t = (playCurTime - frame.time) / d;
                            else
                                t = 0;
                            outDatas[i] = this._curveInterpolate(frame, nextFarme, t, d);
                        }
                    }
                    else {
                        outDatas[i] = keyFrames[0].value;
                    }
                    if (addtive)
                        outDatas[i] = outDatas[i] - keyFrames[0].value;
                    break;
                case KeyFrameValueType.Position:
                case KeyFrameValueType.RotationEuler:
                case KeyFrameValueType.Vector3:
                    var clipData = outDatas[i];
                    this._evaluateFrameNodeVector3DatasRealTime(keyFrames, frameIndex, isEnd, playCurTime, clipData);
                    if (addtive) {
                        var firstFrameValue = keyFrames[0].value;
                        clipData.x -= firstFrameValue.x;
                        clipData.y -= firstFrameValue.y;
                        clipData.z -= firstFrameValue.z;
                    }
                    break;
                case KeyFrameValueType.Rotation:
                    var clipQuat = outDatas[i];
                    this._evaluateFrameNodeQuaternionDatasRealTime(keyFrames, frameIndex, isEnd, playCurTime, clipQuat);
                    if (addtive) {
                        var tempQuat = AnimationClip._tempQuaternion0;
                        var firstFrameValueQua = keyFrames[0].value;
                        Utils3D.quaternionConjugate(firstFrameValueQua, tempQuat);
                        Quaternion.multiply(tempQuat, clipQuat, clipQuat);
                    }
                    break;
                case KeyFrameValueType.Scale:
                    clipData = outDatas[i];
                    this._evaluateFrameNodeVector3DatasRealTime(keyFrames, frameIndex, isEnd, playCurTime, clipData);
                    if (addtive) {
                        firstFrameValue = keyFrames[0].value;
                        clipData.x /= firstFrameValue.x;
                        clipData.y /= firstFrameValue.y;
                        clipData.z /= firstFrameValue.z;
                    }
                    break;
                case KeyFrameValueType.Vector2:
                    var v2Data = outDatas[i];
                    this._evaluateFrameNodeVector2DatasRealTime(keyFrames, frameIndex, isEnd, playCurTime, v2Data);
                    if (addtive) {
                        var v2FrameValue = keyFrames[0].value;
                        v2Data.x -= v2FrameValue.x;
                        v2Data.y -= v2FrameValue.y;
                    }
                    break;
                case KeyFrameValueType.Vector4:
                case KeyFrameValueType.Color:
                    var v4Data = outDatas[i];
                    this._evaluateFrameNodeVector4DatasRealTime(keyFrames, frameIndex, isEnd, playCurTime, v4Data);
                    if (addtive) {
                        var v4FrameValue = keyFrames[0].value;
                        v4Data.x -= v4FrameValue.x;
                        v4Data.y -= v4FrameValue.y;
                        v4Data.z -= v4FrameValue.z;
                        v4Data.w -= v4FrameValue.w;
                    }
                    break;
                    break;
                default:
                    throw "AnimationClip:unknown node type.";
            }
        }
    }
    _evaluateFrameNodeVector3DatasRealTime(keyFrames, frameIndex, isEnd, playCurTime, outDatas) {
        if (frameIndex !== -1) {
            var frame = keyFrames[frameIndex];
            if (isEnd) {
                var frameData = frame.value;
                outDatas.x = frameData.x;
                outDatas.y = frameData.y;
                outDatas.z = frameData.z;
            }
            else {
                var nextKeyFrame = keyFrames[frameIndex + 1];
                var t;
                var startTime = frame.time;
                var d = nextKeyFrame.time - startTime;
                if (d !== 0)
                    t = (playCurTime - startTime) / d;
                else
                    t = 0;
                this._hermiteInterpolateVector3(frame, nextKeyFrame, t, d, outDatas);
            }
        }
        else {
            var firstFrameDatas = keyFrames[0].value;
            outDatas.x = firstFrameDatas.x;
            outDatas.y = firstFrameDatas.y;
            outDatas.z = firstFrameDatas.z;
        }
    }
    _evaluateFrameNodeVector2DatasRealTime(keyFrames, frameIndex, isEnd, playCurTime, outDatas) {
        if (frameIndex !== -1) {
            var frame = keyFrames[frameIndex];
            if (isEnd) {
                var frameData = frame.value;
                outDatas.x = frameData.x;
                outDatas.y = frameData.y;
            }
            else {
                var nextKeyFrame = keyFrames[frameIndex + 1];
                var t;
                var startTime = frame.time;
                var d = nextKeyFrame.time - startTime;
                if (d !== 0)
                    t = (playCurTime - startTime) / d;
                else
                    t = 0;
                this._hermiteInterpolateVector2(frame, nextKeyFrame, t, d, outDatas);
            }
        }
        else {
            var firstFrameDatas = keyFrames[0].value;
            outDatas.x = firstFrameDatas.x;
            outDatas.y = firstFrameDatas.y;
        }
    }
    _evaluateFrameNodeVector4DatasRealTime(keyFrames, frameIndex, isEnd, playCurTime, outDatas) {
        if (frameIndex !== -1) {
            var frame = keyFrames[frameIndex];
            if (isEnd) {
                var frameData = frame.value;
                outDatas.x = frameData.x;
                outDatas.y = frameData.y;
                outDatas.z = frameData.z;
            }
            else {
                var nextKeyFrame = keyFrames[frameIndex + 1];
                var t;
                var startTime = frame.time;
                var d = nextKeyFrame.time - startTime;
                if (d !== 0)
                    t = (playCurTime - startTime) / d;
                else
                    t = 0;
                this._hermiteInterpolateVector4(frame, nextKeyFrame, t, d, outDatas);
            }
        }
        else {
            var firstFrameDatas = keyFrames[0].value;
            outDatas.x = firstFrameDatas.x;
            outDatas.y = firstFrameDatas.y;
            outDatas.z = firstFrameDatas.z;
        }
    }
    _evaluateFrameNodeQuaternionDatasRealTime(keyFrames, frameIndex, isEnd, playCurTime, outDatas) {
        if (frameIndex !== -1) {
            var frame = keyFrames[frameIndex];
            if (isEnd) {
                var frameData = frame.value;
                outDatas.x = frameData.x;
                outDatas.y = frameData.y;
                outDatas.z = frameData.z;
                outDatas.w = frameData.w;
            }
            else {
                var nextKeyFrame = keyFrames[frameIndex + 1];
                var t;
                var startTime = frame.time;
                var d = nextKeyFrame.time - startTime;
                if (d !== 0)
                    t = (playCurTime - startTime) / d;
                else
                    t = 0;
                this._hermiteInterpolateQuaternion(frame, nextKeyFrame, t, d, outDatas);
            }
        }
        else {
            var firstFrameDatas = keyFrames[0].value;
            outDatas.x = firstFrameDatas.x;
            outDatas.y = firstFrameDatas.y;
            outDatas.z = firstFrameDatas.z;
            outDatas.w = firstFrameDatas.w;
        }
    }
    _binarySearchEventIndex(time) {
        var start = 0;
        var end = this._animationEvents.length - 1;
        var mid;
        while (start <= end) {
            mid = Math.floor((start + end) / 2);
            var midValue = this._animationEvents[mid].time;
            if (midValue == time)
                return mid;
            else if (midValue > time)
                end = mid - 1;
            else
                start = mid + 1;
        }
        return start;
    }
    addEvent(event) {
        var index = this._binarySearchEventIndex(event.time);
        this._animationEvents.splice(index, 0, event);
    }
    _disposeResource() {
        this._nodes = null;
        this._nodesMap = null;
    }
}
AnimationClip._tempQuaternion0 = new Quaternion();

//# sourceMappingURL=AnimationClip.js.map
