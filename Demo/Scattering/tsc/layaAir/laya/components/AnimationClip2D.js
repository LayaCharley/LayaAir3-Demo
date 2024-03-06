import { AnimationClip2DParse01 } from "./AnimationClip2DParser01";
import { KeyframeNodeList2D } from "./KeyframeNodeList2D";
import { Keyframe2D } from "./KeyFrame2D";
import { Resource } from "../resource/Resource";
import { Byte } from "../utils/Byte";
export class AnimationClip2D extends Resource {
    constructor() {
        super();
        this._nodes = new KeyframeNodeList2D();
        this._animationEvents = [];
    }
    static _parse(data) {
        var clip = new AnimationClip2D();
        var reader = new Byte(data);
        var version = reader.readUTFString();
        switch (version) {
            case "LAYAANIMATION2D:01":
                AnimationClip2DParse01.parse(clip, reader, version);
                break;
            default:
                throw "unknown animationClip version.";
        }
        return clip;
    }
    duration() {
        return this._duration;
    }
    _evaluateClipDatasRealTime(playCurTime, realTimeCurrentFrameIndexes, addtive, frontPlay, outDatas) {
        var nodes = this._nodes;
        for (var i = 0, n = nodes.count; i < n; i++) {
            var node = nodes.getNodeByIndex(i);
            var nextFrameIndex;
            var keyFrames = node._keyFrames;
            var keyFramesCount = keyFrames.length;
            if (0 == keyFramesCount)
                continue;
            var frameIndex = realTimeCurrentFrameIndexes[i];
            if (frontPlay) {
                if ((-1 != frameIndex) && (playCurTime < keyFrames[frameIndex].time)) {
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
                if ((nextFrameIndex != keyFramesCount) && (playCurTime > keyFrames[nextFrameIndex].time)) {
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
            var isEnd = nextFrameIndex == keyFramesCount;
            if (-1 != frameIndex) {
                var frame = keyFrames[frameIndex];
                if (isEnd) {
                    outDatas[i] = frame.data.val;
                }
                else {
                    var nextFarme = keyFrames[nextFrameIndex];
                    var d = nextFarme.time - frame.time;
                    var t;
                    if (d !== 0)
                        t = (playCurTime - frame.time) / d;
                    else
                        t = 0;
                    outDatas[i] = this._getTweenVal(frame, nextFarme, t, d);
                }
            }
            else {
                outDatas[i] = keyFrames[0].data.val;
            }
            if (addtive && "number" == typeof keyFrames[0].data.val) {
                outDatas[i] = outDatas[i] - keyFrames[0].data.val;
            }
        }
    }
    _getTweenVal(frame, nextFrame, t, dur) {
        var start = frame.data;
        var end = nextFrame.data;
        if ("number" != typeof start.val || "number" != typeof end.val) {
            return start.val;
        }
        var tweenFun = AnimationClip2D.tween[start.tweenType];
        var poval = start.val;
        var oval = end.val;
        if (null != tweenFun) {
            return tweenFun(t, poval, oval - poval, 1);
        }
        var outTangent = 0;
        var inTangent = 0;
        var outWeight = NaN;
        var inWeight = NaN;
        if (null != start.tweenInfo) {
            outTangent = start.tweenInfo.outTangent;
            outWeight = start.tweenInfo.outWeight;
        }
        if (null != end.tweenInfo) {
            inTangent = end.tweenInfo.inTangent;
            inWeight = end.tweenInfo.inWeight;
        }
        if (isNaN(outWeight) || 0 >= outWeight)
            outWeight = Keyframe2D.defaultWeight;
        if (isNaN(inWeight) || 0 >= inWeight)
            inWeight = Keyframe2D.defaultWeight;
        if (isNaN(outTangent))
            outTangent = 0;
        if (isNaN(inTangent))
            inTangent = 0;
        if (Math.abs(outTangent) == Number.MAX_VALUE) {
            if (0 > outTangent) {
                outTangent = -Infinity;
            }
            else {
                outTangent = Infinity;
            }
        }
        if (Math.abs(inTangent) == Number.MAX_VALUE) {
            if (0 > inTangent) {
                inTangent = -Infinity;
            }
            else {
                inTangent = Infinity;
            }
        }
        var tnum;
        if ((!start.tweenInfo && !end.tweenInfo) || (Keyframe2D.defaultWeight == inWeight && Keyframe2D.defaultWeight == outWeight)) {
            tnum = AnimationClip2D.tween.hermiteInterpolate(outTangent, inTangent, poval, oval, t, dur);
        }
        else {
            tnum = this.hermiteCurveSplineWeight(poval, frame.time, outWeight, outTangent, oval, nextFrame.time, inWeight, inTangent, t);
        }
        return tnum;
    }
    _binarySearchEventIndex(time) {
        var start = 0;
        var end = this._animationEvents.length - 1;
        var mid;
        while (start <= end) {
            mid = (start + end) >> 1;
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
    hermiteCurveSplineWeight(frameValue, frametime, frameOutWeight, frameOutTangent, nextframeValue, nextframetime, nextframeInweight, nextframeIntangent, time) {
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
    addEvent(event) {
        var index = this._binarySearchEventIndex(event.time);
        this._animationEvents.splice(index, 0, event);
    }
}
AnimationClip2D.tween = {
    Linear: function (t, b, c, d) { return c * t / d + b; },
    Quad_EaseIn: function (t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    Quad_EaseOut: function (t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    Quad_EaseInOut: function (t, b, c, d) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    Cubic_EaseIn: function (t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    Cubic_EaseOut: function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    Cubic_EaseInOut: function (t, b, c, d) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    Quart_EaseIn: function (t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    Quart_EaseOut: function (t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    Quart_EaseInOut: function (t, b, c, d) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    Quint_EaseIn: function (t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    Quint_EaseOut: function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    Quint_EaseInOut: function (t, b, c, d) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    Sine_EaseIn: function (t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    Sine_EaseOut: function (t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    Sine_EaseInOut: function (t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    Expo_EaseIn: function (t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    Expo_EaseOut: function (t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    Expo_EaseInOut: function (t, b, c, d) {
        if (t == 0)
            return b;
        if (t == d)
            return b + c;
        if ((t /= d / 2) < 1)
            return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    Circ_EaseIn: function (t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    Circ_EaseOut: function (t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    Circ_EaseInOut: function (t, b, c, d) {
        if ((t /= d / 2) < 1)
            return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    Elastic_EaseIn: function (t, b, c, d, a, p) {
        if (t == 0)
            return b;
        if ((t /= d) == 1)
            return b + c;
        if (!p)
            p = d * .3;
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        }
        else
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    Elastic_EaseOut: function (t, b, c, d, a, p) {
        if (t == 0)
            return b;
        if ((t /= d) == 1)
            return b + c;
        if (!p)
            p = d * .3;
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        }
        else
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
    },
    Elastic_EaseInOut: function (t, b, c, d, a, p) {
        if (t == 0)
            return b;
        if ((t /= d / 2) == 2)
            return b + c;
        if (!p)
            p = d * (.3 * 1.5);
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        }
        else
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1)
            return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    Back_EaseIn: function (t, b, c, d, s = undefined) {
        if (s == undefined)
            s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    Back_EaseOut: function (t, b, c, d, s = undefined) {
        if (s == undefined)
            s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    Back_EaseInOut: function (t, b, c, d, s = undefined) {
        if (s == undefined)
            s = 1.70158;
        if ((t /= d / 2) < 1)
            return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    Bounce_EaseIn: function (t, b, c, d) {
        return c - AnimationClip2D.tween.Bounce_EaseOut(d - t, 0, c, d) + b;
    },
    Bounce_EaseOut: function (t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        }
        else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        }
        else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        }
        else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    },
    Bounce_EaseInOut: function (t, b, c, d) {
        if (t < d / 2)
            return AnimationClip2D.tween.Bounce_EaseIn(t * 2, 0, c, d) * .5 + b;
        else
            return AnimationClip2D.tween.Bounce_EaseOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    },
    hermiteInterpolate: function (outTangent, inTangent, startValue, endValue, t, dur) {
        if (Math.abs(outTangent) == Infinity || Math.abs(inTangent) == Infinity) {
            if (0 > outTangent || 0 < inTangent)
                return startValue;
            return startValue;
        }
        var t2 = t * t;
        var t3 = t2 * t;
        var a = 2.0 * t3 - 3.0 * t2 + 1.0;
        var b = t3 - 2.0 * t2 + t;
        var c = t3 - t2;
        var d = -2.0 * t3 + 3.0 * t2;
        return a * startValue + b * outTangent * dur + c * inTangent * dur + d * endValue;
    }
};

//# sourceMappingURL=AnimationClip2D.js.map
