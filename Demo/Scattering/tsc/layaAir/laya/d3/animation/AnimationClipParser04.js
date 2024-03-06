import { KeyframeNode } from "./KeyframeNode";
import { AnimationEvent } from "./AnimationEvent";
import { FloatKeyframe } from "../core/FloatKeyframe";
import { QuaternionKeyframe } from "../core/QuaternionKeyframe";
import { Vector3Keyframe } from "../core/Vector3Keyframe";
import { HalfFloatUtils } from "../../utils/HalfFloatUtils";
import { Vector2Keyframe } from "../core/Vector2Keyframe";
import { Vector4Keyframe } from "../core/Vector4Keyframe";
import { KeyFrameValueType } from "../component/Animator/KeyframeNodeOwner";
import { WeightedMode } from "../core/Keyframe";
export class AnimationClipParser04 {
    static READ_DATA() {
        AnimationClipParser04._DATA.offset = AnimationClipParser04._reader.getUint32();
        AnimationClipParser04._DATA.size = AnimationClipParser04._reader.getUint32();
    }
    static READ_BLOCK() {
        var count = AnimationClipParser04._BLOCK.count = AnimationClipParser04._reader.getUint16();
        var blockStarts = AnimationClipParser04._BLOCK.blockStarts = [];
        var blockLengths = AnimationClipParser04._BLOCK.blockLengths = [];
        for (var i = 0; i < count; i++) {
            blockStarts.push(AnimationClipParser04._reader.getUint32());
            blockLengths.push(AnimationClipParser04._reader.getUint32());
        }
    }
    static READ_STRINGS() {
        var offset = AnimationClipParser04._reader.getUint32();
        var count = AnimationClipParser04._reader.getUint16();
        var prePos = AnimationClipParser04._reader.pos;
        AnimationClipParser04._reader.pos = offset + AnimationClipParser04._DATA.offset;
        for (var i = 0; i < count; i++)
            AnimationClipParser04._strings[i] = AnimationClipParser04._reader.readUTFString();
        AnimationClipParser04._reader.pos = prePos;
    }
    static parse(clip, reader, version) {
        AnimationClipParser04._animationClip = clip;
        AnimationClipParser04._reader = reader;
        AnimationClipParser04._version = version;
        AnimationClipParser04.READ_DATA();
        AnimationClipParser04.READ_BLOCK();
        AnimationClipParser04.READ_STRINGS();
        for (var i = 0, n = AnimationClipParser04._BLOCK.count; i < n; i++) {
            var index = reader.getUint16();
            var blockName = AnimationClipParser04._strings[index];
            var fn = AnimationClipParser04["READ_" + blockName];
            if (fn == null)
                throw new Error("model file err,no this function:" + index + " " + blockName);
            else
                fn.call(null);
        }
        AnimationClipParser04._version = null;
        AnimationClipParser04._reader = null;
        AnimationClipParser04._animationClip = null;
    }
    static READ_ANIMATIONS() {
        var i, j;
        var node;
        var reader = AnimationClipParser04._reader;
        var startTimeTypes = [];
        var startTimeTypeCount = reader.getUint16();
        startTimeTypes.length = startTimeTypeCount;
        for (i = 0; i < startTimeTypeCount; i++)
            startTimeTypes[i] = reader.getFloat32();
        var clip = AnimationClipParser04._animationClip;
        clip.name = AnimationClipParser04._strings[reader.getUint16()];
        var clipDur = clip._duration = reader.getFloat32();
        clip.islooping = !!reader.getByte();
        clip._frameRate = reader.getInt16();
        var nodeCount = reader.getInt16();
        var nodes = clip._nodes;
        nodes.count = nodeCount;
        var nodesMap = clip._nodesMap = {};
        var nodesDic = clip._nodesDic = {};
        for (i = 0; i < nodeCount; i++) {
            node = new KeyframeNode();
            if ("LAYAANIMATION:WEIGHT_05" == AnimationClipParser04._version) {
                if (1 == reader.getByte()) {
                    node.propertyChangePath = AnimationClipParser04._strings[reader.getUint16()];
                }
                if (1 == reader.getByte()) {
                    node.callbackFunData = AnimationClipParser04._strings[reader.getUint16()];
                }
                let paramLen = reader.getUint8();
                let callParms = null;
                for (j = 0; j < paramLen; j++) {
                    if (null == callParms) {
                        callParms = [];
                    }
                    callParms.push(AnimationClipParser04._strings[reader.getUint16()]);
                }
                node.callParams = callParms;
            }
            nodes.setNodeByIndex(i, node);
            node._indexInList = i;
            var type = node.type = reader.getUint8();
            var pathLength = reader.getUint16();
            node._setOwnerPathCount(pathLength);
            for (j = 0; j < pathLength; j++)
                node._setOwnerPathByIndex(j, AnimationClipParser04._strings[reader.getUint16()]);
            var nodePath = node._joinOwnerPath("/");
            var mapArray = nodesMap[nodePath];
            (mapArray) || (nodesMap[nodePath] = mapArray = []);
            mapArray.push(node);
            node.propertyOwner = AnimationClipParser04._strings[reader.getUint16()];
            var propertyLength = reader.getUint16();
            node._setPropertyCount(propertyLength);
            for (j = 0; j < propertyLength; j++)
                node._setPropertyByIndex(j, AnimationClipParser04._strings[reader.getUint16()]);
            var fullPath = nodePath + "." + node.propertyOwner + "." + node._joinProperty(".");
            nodesDic[fullPath] = node;
            node.fullPath = fullPath;
            node.nodePath = nodePath;
            var keyframeCount = reader.getUint16();
            node._setKeyframeCount(keyframeCount);
            switch (AnimationClipParser04._version) {
                case "LAYAANIMATION:04":
                    for (j = 0; j < keyframeCount; j++) {
                        switch (type) {
                            case KeyFrameValueType.Float:
                                var floatKeyframe = new FloatKeyframe();
                                node._setKeyframeByIndex(j, floatKeyframe);
                                floatKeyframe.time = startTimeTypes[reader.getUint16()];
                                floatKeyframe.inTangent = reader.getFloat32();
                                floatKeyframe.outTangent = reader.getFloat32();
                                floatKeyframe.value = reader.getFloat32();
                                break;
                            case KeyFrameValueType.Position:
                            case KeyFrameValueType.Scale:
                            case KeyFrameValueType.RotationEuler:
                            case KeyFrameValueType.Vector3:
                                var floatArrayKeyframe = new Vector3Keyframe();
                                node._setKeyframeByIndex(j, floatArrayKeyframe);
                                floatArrayKeyframe.time = startTimeTypes[reader.getUint16()];
                                var inTangent = floatArrayKeyframe.inTangent;
                                var outTangent = floatArrayKeyframe.outTangent;
                                var value = floatArrayKeyframe.value;
                                inTangent.x = reader.getFloat32();
                                inTangent.y = reader.getFloat32();
                                inTangent.z = reader.getFloat32();
                                outTangent.x = reader.getFloat32();
                                outTangent.y = reader.getFloat32();
                                outTangent.z = reader.getFloat32();
                                value.x = reader.getFloat32();
                                value.y = reader.getFloat32();
                                value.z = reader.getFloat32();
                                break;
                            case KeyFrameValueType.Rotation:
                                var quaternionKeyframe = new QuaternionKeyframe();
                                node._setKeyframeByIndex(j, quaternionKeyframe);
                                quaternionKeyframe.time = startTimeTypes[reader.getUint16()];
                                var inTangentQua = quaternionKeyframe.inTangent;
                                var outTangentQua = quaternionKeyframe.outTangent;
                                var valueQua = quaternionKeyframe.value;
                                inTangentQua.x = reader.getFloat32();
                                inTangentQua.y = reader.getFloat32();
                                inTangentQua.z = reader.getFloat32();
                                inTangentQua.w = reader.getFloat32();
                                outTangentQua.x = reader.getFloat32();
                                outTangentQua.y = reader.getFloat32();
                                outTangentQua.z = reader.getFloat32();
                                outTangentQua.w = reader.getFloat32();
                                valueQua.x = reader.getFloat32();
                                valueQua.y = reader.getFloat32();
                                valueQua.z = reader.getFloat32();
                                valueQua.w = reader.getFloat32();
                                break;
                            case KeyFrameValueType.Vector2:
                                var vec2Keyfram = new Vector2Keyframe();
                                node._setKeyframeByIndex(j, vec2Keyfram);
                                vec2Keyfram.time = startTimeTypes[reader.getUint16()];
                                var inTangentV2 = vec2Keyfram.inTangent;
                                var outTangentV2 = vec2Keyfram.outTangent;
                                var valueV2 = vec2Keyfram.value;
                                inTangentV2.x = reader.getFloat32();
                                inTangentV2.y = reader.getFloat32();
                                outTangentV2.x = reader.getFloat32();
                                outTangentV2.y = reader.getFloat32();
                                valueV2.x = reader.getFloat32();
                                valueV2.y = reader.getFloat32();
                                break;
                            case KeyFrameValueType.Vector4:
                            case KeyFrameValueType.Color:
                                var vec4Keyfram = new Vector4Keyframe();
                                node._setKeyframeByIndex(j, vec4Keyfram);
                                vec4Keyfram.time = startTimeTypes[reader.getUint16()];
                                var inTangentV4 = vec4Keyfram.inTangent;
                                var outTangentV4 = vec4Keyfram.outTangent;
                                var valueV4 = vec4Keyfram.value;
                                inTangentV4.x = reader.getFloat32();
                                inTangentV4.y = reader.getFloat32();
                                inTangentV4.z = reader.getFloat32();
                                inTangentV4.w = reader.getFloat32();
                                outTangentV4.x = reader.getFloat32();
                                outTangentV4.y = reader.getFloat32();
                                outTangentV4.z = reader.getFloat32();
                                outTangentV4.w = reader.getFloat32();
                                valueV4.x = reader.getFloat32();
                                valueV4.y = reader.getFloat32();
                                valueV4.z = reader.getFloat32();
                                valueV4.w = reader.getFloat32();
                                break;
                            default:
                                throw "AnimationClipParser04:unknown type.";
                        }
                    }
                    break;
                case "LAYAANIMATION:WEIGHT_04":
                case "LAYAANIMATION:WEIGHT_05":
                    for (j = 0; j < keyframeCount; j++) {
                        let isWeight = 1;
                        switch (type) {
                            case KeyFrameValueType.Float:
                                var floatKeyframe = new FloatKeyframe();
                                node._setKeyframeByIndex(j, floatKeyframe);
                                floatKeyframe.time = startTimeTypes[reader.getUint16()];
                                floatKeyframe.inTangent = reader.getFloat32();
                                floatKeyframe.outTangent = reader.getFloat32();
                                floatKeyframe.value = reader.getFloat32();
                                floatKeyframe.weightedMode = reader.getUint8();
                                if ("LAYAANIMATION:WEIGHT_05" == AnimationClipParser04._version) {
                                    if (WeightedMode.In == floatKeyframe.weightedMode || WeightedMode.Both == floatKeyframe.weightedMode) {
                                        floatKeyframe.inWeight = reader.getFloat32();
                                    }
                                    if (WeightedMode.Out == floatKeyframe.weightedMode || WeightedMode.Both == floatKeyframe.weightedMode) {
                                        floatKeyframe.outWeight = reader.getFloat32();
                                    }
                                }
                                else {
                                    floatKeyframe.inWeight = reader.getFloat32();
                                    floatKeyframe.outWeight = reader.getFloat32();
                                }
                                break;
                            case KeyFrameValueType.Position:
                            case KeyFrameValueType.Scale:
                            case KeyFrameValueType.RotationEuler:
                            case KeyFrameValueType.Vector3:
                                var floatArrayKeyframe = new Vector3Keyframe(true);
                                node._setKeyframeByIndex(j, floatArrayKeyframe);
                                floatArrayKeyframe.time = startTimeTypes[reader.getUint16()];
                                var inTangent = floatArrayKeyframe.inTangent;
                                var outTangent = floatArrayKeyframe.outTangent;
                                var value = floatArrayKeyframe.value;
                                let weidhtMode = floatArrayKeyframe.weightedMode;
                                let inWeight = floatArrayKeyframe.inWeight;
                                let outWeight = floatArrayKeyframe.outWeight;
                                inTangent.x = reader.getFloat32();
                                inTangent.y = reader.getFloat32();
                                inTangent.z = reader.getFloat32();
                                outTangent.x = reader.getFloat32();
                                outTangent.y = reader.getFloat32();
                                outTangent.z = reader.getFloat32();
                                value.x = reader.getFloat32();
                                value.y = reader.getFloat32();
                                value.z = reader.getFloat32();
                                if ("LAYAANIMATION:WEIGHT_05" == AnimationClipParser04._version) {
                                    isWeight = reader.getByte();
                                }
                                if (1 == isWeight) {
                                    weidhtMode.x = reader.getUint8();
                                    weidhtMode.y = reader.getUint8();
                                    weidhtMode.z = reader.getUint8();
                                    inWeight.x = reader.getFloat32();
                                    inWeight.y = reader.getFloat32();
                                    inWeight.z = reader.getFloat32();
                                    outWeight.x = reader.getFloat32();
                                    outWeight.y = reader.getFloat32();
                                    outWeight.z = reader.getFloat32();
                                }
                                break;
                            case KeyFrameValueType.Rotation:
                                var quaternionKeyframe = new QuaternionKeyframe(true);
                                node._setKeyframeByIndex(j, quaternionKeyframe);
                                quaternionKeyframe.time = startTimeTypes[reader.getUint16()];
                                var inTangentQua = quaternionKeyframe.inTangent;
                                var outTangentQua = quaternionKeyframe.outTangent;
                                var valueQua = quaternionKeyframe.value;
                                let weightModeV4 = quaternionKeyframe.weightedMode;
                                let inWeightQua = quaternionKeyframe.inWeight;
                                let outWeightQua = quaternionKeyframe.outWeight;
                                inTangentQua.x = reader.getFloat32();
                                inTangentQua.y = reader.getFloat32();
                                inTangentQua.z = reader.getFloat32();
                                inTangentQua.w = reader.getFloat32();
                                outTangentQua.x = reader.getFloat32();
                                outTangentQua.y = reader.getFloat32();
                                outTangentQua.z = reader.getFloat32();
                                outTangentQua.w = reader.getFloat32();
                                valueQua.x = reader.getFloat32();
                                valueQua.y = reader.getFloat32();
                                valueQua.z = reader.getFloat32();
                                valueQua.w = reader.getFloat32();
                                if ("LAYAANIMATION:WEIGHT_05" == AnimationClipParser04._version) {
                                    isWeight = reader.getByte();
                                }
                                if (1 == isWeight) {
                                    weightModeV4.x = reader.getUint8();
                                    weightModeV4.y = reader.getUint8();
                                    weightModeV4.z = reader.getUint8();
                                    weightModeV4.w = reader.getUint8();
                                    inWeightQua.x = reader.getFloat32();
                                    inWeightQua.y = reader.getFloat32();
                                    inWeightQua.z = reader.getFloat32();
                                    inWeightQua.w = reader.getFloat32();
                                    outWeightQua.x = reader.getFloat32();
                                    outWeightQua.y = reader.getFloat32();
                                    outWeightQua.z = reader.getFloat32();
                                    outWeightQua.w = reader.getFloat32();
                                }
                                break;
                            case KeyFrameValueType.Vector2:
                                var vec2Keyfram = new Vector2Keyframe(true);
                                node._setKeyframeByIndex(j, vec2Keyfram);
                                vec2Keyfram.time = startTimeTypes[reader.getUint16()];
                                var inTangentV2 = vec2Keyfram.inTangent;
                                var outTangentV2 = vec2Keyfram.outTangent;
                                var valueV2 = vec2Keyfram.value;
                                let weightModeV2 = vec2Keyfram.weightedMode;
                                let inWeightV2 = vec2Keyfram.inWeight;
                                let outWeightV2 = vec2Keyfram.outWeight;
                                inTangentV2.x = reader.getFloat32();
                                inTangentV2.y = reader.getFloat32();
                                outTangentV2.x = reader.getFloat32();
                                outTangentV2.y = reader.getFloat32();
                                valueV2.x = reader.getFloat32();
                                valueV2.y = reader.getFloat32();
                                if ("LAYAANIMATION:WEIGHT_05" == AnimationClipParser04._version) {
                                    isWeight = reader.getByte();
                                }
                                if (1 == isWeight) {
                                    weightModeV2.x = reader.getUint8();
                                    weightModeV2.y = reader.getUint8();
                                    inWeightV2.x = reader.getFloat32();
                                    inWeightV2.y = reader.getFloat32();
                                    outWeightV2.x = reader.getFloat32();
                                    outWeightV2.y = reader.getFloat32();
                                }
                                break;
                            case KeyFrameValueType.Vector4:
                            case KeyFrameValueType.Color:
                                var vec4Keyfram = new Vector4Keyframe(true);
                                node._setKeyframeByIndex(j, vec4Keyfram);
                                vec4Keyfram.time = startTimeTypes[reader.getUint16()];
                                var inTangentV4 = vec4Keyfram.inTangent;
                                var outTangentV4 = vec4Keyfram.outTangent;
                                var valueV4 = vec4Keyfram.value;
                                var weightMode_V4 = vec4Keyfram.weightedMode;
                                var inWeightV4 = vec4Keyfram.inWeight;
                                var outWeightV4 = vec4Keyfram.outWeight;
                                inTangentV4.x = reader.getFloat32();
                                inTangentV4.y = reader.getFloat32();
                                inTangentV4.z = reader.getFloat32();
                                inTangentV4.w = reader.getFloat32();
                                outTangentV4.x = reader.getFloat32();
                                outTangentV4.y = reader.getFloat32();
                                outTangentV4.z = reader.getFloat32();
                                outTangentV4.w = reader.getFloat32();
                                valueV4.x = reader.getFloat32();
                                valueV4.y = reader.getFloat32();
                                valueV4.z = reader.getFloat32();
                                valueV4.w = reader.getFloat32();
                                if ("LAYAANIMATION:WEIGHT_05" == AnimationClipParser04._version) {
                                    isWeight = reader.getByte();
                                }
                                if (1 == isWeight) {
                                    weightMode_V4.x = reader.getUint8();
                                    weightMode_V4.y = reader.getUint8();
                                    weightMode_V4.z = reader.getUint8();
                                    weightMode_V4.w = reader.getUint8();
                                    inWeightV4.x = reader.getFloat32();
                                    inWeightV4.y = reader.getFloat32();
                                    inWeightV4.z = reader.getFloat32();
                                    inWeightV4.w = reader.getFloat32();
                                    outWeightV4.x = reader.getFloat32();
                                    outWeightV4.y = reader.getFloat32();
                                    outWeightV4.z = reader.getFloat32();
                                    outWeightV4.w = reader.getFloat32();
                                }
                                break;
                            default:
                                throw "AnimationClipParser04:unknown type.";
                        }
                    }
                    break;
                case "LAYAANIMATION:COMPRESSION_04":
                    for (j = 0; j < keyframeCount; j++) {
                        switch (type) {
                            case KeyFrameValueType.Float:
                                floatKeyframe = new FloatKeyframe();
                                node._setKeyframeByIndex(j, floatKeyframe);
                                floatKeyframe.time = startTimeTypes[reader.getUint16()];
                                floatKeyframe.inTangent = HalfFloatUtils.convertToNumber(reader.getUint16());
                                floatKeyframe.outTangent = HalfFloatUtils.convertToNumber(reader.getUint16());
                                floatKeyframe.value = HalfFloatUtils.convertToNumber(reader.getUint16());
                                break;
                            case KeyFrameValueType.Position:
                            case KeyFrameValueType.Scale:
                            case KeyFrameValueType.RotationEuler:
                            case KeyFrameValueType.Vector3:
                                floatArrayKeyframe = new Vector3Keyframe();
                                node._setKeyframeByIndex(j, floatArrayKeyframe);
                                floatArrayKeyframe.time = startTimeTypes[reader.getUint16()];
                                inTangent = floatArrayKeyframe.inTangent;
                                outTangent = floatArrayKeyframe.outTangent;
                                value = floatArrayKeyframe.value;
                                inTangent.x = HalfFloatUtils.convertToNumber(reader.getUint16());
                                inTangent.y = HalfFloatUtils.convertToNumber(reader.getUint16());
                                inTangent.z = HalfFloatUtils.convertToNumber(reader.getUint16());
                                outTangent.x = HalfFloatUtils.convertToNumber(reader.getUint16());
                                outTangent.y = HalfFloatUtils.convertToNumber(reader.getUint16());
                                outTangent.z = HalfFloatUtils.convertToNumber(reader.getUint16());
                                value.x = HalfFloatUtils.convertToNumber(reader.getUint16());
                                value.y = HalfFloatUtils.convertToNumber(reader.getUint16());
                                value.z = HalfFloatUtils.convertToNumber(reader.getUint16());
                                break;
                            case KeyFrameValueType.Rotation:
                                quaternionKeyframe = new QuaternionKeyframe();
                                node._setKeyframeByIndex(j, quaternionKeyframe);
                                quaternionKeyframe.time = startTimeTypes[reader.getUint16()];
                                inTangentQua = quaternionKeyframe.inTangent;
                                outTangentQua = quaternionKeyframe.outTangent;
                                valueQua = quaternionKeyframe.value;
                                inTangentQua.x = HalfFloatUtils.convertToNumber(reader.getUint16());
                                inTangentQua.y = HalfFloatUtils.convertToNumber(reader.getUint16());
                                inTangentQua.z = HalfFloatUtils.convertToNumber(reader.getUint16());
                                inTangentQua.w = HalfFloatUtils.convertToNumber(reader.getUint16());
                                outTangentQua.x = HalfFloatUtils.convertToNumber(reader.getUint16());
                                outTangentQua.y = HalfFloatUtils.convertToNumber(reader.getUint16());
                                outTangentQua.z = HalfFloatUtils.convertToNumber(reader.getUint16());
                                outTangentQua.w = HalfFloatUtils.convertToNumber(reader.getUint16());
                                valueQua.x = HalfFloatUtils.convertToNumber(reader.getUint16());
                                valueQua.y = HalfFloatUtils.convertToNumber(reader.getUint16());
                                valueQua.z = HalfFloatUtils.convertToNumber(reader.getUint16());
                                valueQua.w = HalfFloatUtils.convertToNumber(reader.getUint16());
                                break;
                            case KeyFrameValueType.Vector2:
                                var vec2Keyfram = new Vector2Keyframe();
                                node._setKeyframeByIndex(j, vec2Keyfram);
                                vec2Keyfram.time = startTimeTypes[reader.getUint16()];
                                var inTangentV2 = vec2Keyfram.inTangent;
                                var outTangentV2 = vec2Keyfram.outTangent;
                                var valueV2 = vec2Keyfram.value;
                                inTangentV2.x = HalfFloatUtils.convertToNumber(reader.getUint16());
                                inTangentV2.y = HalfFloatUtils.convertToNumber(reader.getUint16());
                                outTangentV2.x = HalfFloatUtils.convertToNumber(reader.getUint16());
                                outTangentV2.y = HalfFloatUtils.convertToNumber(reader.getUint16());
                                valueV2.x = HalfFloatUtils.convertToNumber(reader.getUint16());
                                valueV2.y = HalfFloatUtils.convertToNumber(reader.getUint16());
                                break;
                            case KeyFrameValueType.Vector4:
                            case KeyFrameValueType.Color:
                                var vec4Keyfram = new Vector4Keyframe();
                                node._setKeyframeByIndex(j, vec4Keyfram);
                                vec4Keyfram.time = startTimeTypes[reader.getUint16()];
                                var inTangentV4 = vec4Keyfram.inTangent;
                                var outTangentV4 = vec4Keyfram.outTangent;
                                var valueV4 = vec4Keyfram.value;
                                inTangentV4.x = HalfFloatUtils.convertToNumber(reader.getUint16());
                                inTangentV4.y = HalfFloatUtils.convertToNumber(reader.getUint16());
                                inTangentV4.z = HalfFloatUtils.convertToNumber(reader.getUint16());
                                inTangentV4.w = HalfFloatUtils.convertToNumber(reader.getUint16());
                                outTangentV4.x = HalfFloatUtils.convertToNumber(reader.getUint16());
                                outTangentV4.y = HalfFloatUtils.convertToNumber(reader.getUint16());
                                outTangentV4.z = HalfFloatUtils.convertToNumber(reader.getUint16());
                                outTangentV4.w = HalfFloatUtils.convertToNumber(reader.getUint16());
                                valueV4.x = HalfFloatUtils.convertToNumber(reader.getUint16());
                                valueV4.y = HalfFloatUtils.convertToNumber(reader.getUint16());
                                valueV4.z = HalfFloatUtils.convertToNumber(reader.getUint16());
                                valueV4.w = HalfFloatUtils.convertToNumber(reader.getUint16());
                                break;
                            default:
                                throw "AnimationClipParser04:unknown type.";
                        }
                    }
                    break;
            }
        }
        var eventCount = reader.getUint16();
        for (i = 0; i < eventCount; i++) {
            var event = new AnimationEvent();
            event.time = Math.min(clipDur, reader.getFloat32());
            event.eventName = AnimationClipParser04._strings[reader.getUint16()];
            var params = [];
            var paramCount = reader.getUint16();
            (paramCount > 0) && (event.params = params = []);
            for (j = 0; j < paramCount; j++) {
                var eventType = reader.getByte();
                switch (eventType) {
                    case 0:
                        params.push(!!reader.getByte());
                        break;
                    case 1:
                        params.push(reader.getInt32());
                        break;
                    case 2:
                        params.push(reader.getFloat32());
                        break;
                    case 3:
                        params.push(AnimationClipParser04._strings[reader.getUint16()]);
                        break;
                    default:
                        throw new Error("unknown type.");
                }
            }
            clip.addEvent(event);
        }
    }
}
AnimationClipParser04._strings = [];
AnimationClipParser04._BLOCK = { count: 0 };
AnimationClipParser04._DATA = { offset: 0, size: 0 };

//# sourceMappingURL=AnimationClipParser04.js.map
