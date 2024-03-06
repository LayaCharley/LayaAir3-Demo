import { KeyframeNode2D } from "./KeyframeNode2D";
import { Keyframe2D } from "./KeyFrame2D";
import { Animation2DEvent } from "./Animation2DEvent";
export class AnimationClip2DParse01 {
    static READ_DATA() {
        this._DATA.offset = this._reader.getUint32();
        this._DATA.size = this._reader.getUint32();
    }
    static READ_BLOCK() {
        var count = this._BLOCK.count = this._reader.getUint16();
        var blockStarts = this._BLOCK.blockStarts = [];
        var blockLengths = this._BLOCK.blockLengths = [];
        for (var i = 0; i < count; i++) {
            blockStarts.push(this._reader.getUint32());
            blockLengths.push(this._reader.getUint32());
        }
    }
    static READ_STRINGS() {
        var offset = this._reader.getUint32();
        var count = this._reader.getUint16();
        var prePos = this._reader.pos;
        this._reader.pos = offset + this._DATA.offset;
        for (var i = 0; i < count; i++)
            this._strings[i] = this._reader.readUTFString();
        this._reader.pos = prePos;
    }
    static parse(clip, reader, version) {
        this._clip = clip;
        this._reader = reader;
        this._version = version;
        this.READ_DATA();
        this.READ_BLOCK();
        this.READ_STRINGS();
        for (var i = 0, n = this._BLOCK.count; i < n; i++) {
            var index = reader.getUint16();
            var blockName = this._strings[index];
            var fn = this["READ_" + blockName];
            if (!fn) {
                throw new Error("model file err,no this function:" + index + " " + blockName);
            }
            else
                fn.call(this);
        }
        this._version = null;
        this._reader = null;
        this._clip = null;
        this._strings.length = 0;
    }
    static timeToFrame(second, fps) {
        return Math.round(second * fps);
    }
    static READ_ANIMATIONS2D() {
        var i, j;
        var reader = this._reader;
        var clip = this._clip;
        var node;
        var numList = [];
        var numCount = reader.getUint16();
        numList.length = numCount;
        for (i = 0; i < numCount; i++) {
            numList[i] = reader.getFloat32();
        }
        var clipDur = clip._duration = numList[reader.getInt16()];
        clip.islooping = !!reader.getByte();
        clip._frameRate = reader.getInt16();
        var nodeCount = reader.getInt16();
        var nodes = clip._nodes;
        nodes.count = nodeCount;
        var nodesMap = clip._nodesMap = {};
        var nodesDic = clip._nodesDic = {};
        for (i = 0; i < nodeCount; i++) {
            node = new KeyframeNode2D();
            nodes.setNodeByIndex(i, node);
            node._indexInList = i;
            var pathLength = reader.getUint16();
            node._setOwnerPathCount(pathLength);
            for (j = 0; j < pathLength; j++) {
                node._setOwnerPathByIndex(j, this._strings[reader.getUint16()]);
            }
            var nodePath = node._joinOwnerPath("/");
            var mapArray = nodesMap[nodePath];
            (mapArray) || (nodesMap[nodePath] = mapArray = []);
            mapArray.push(node);
            var propertyLength = reader.getUint16();
            node._setPropertyCount(propertyLength);
            for (j = 0; j < propertyLength; j++) {
                node._setPropertyByIndex(j, this._strings[reader.getUint16()]);
            }
            var fullPath = nodePath + "." + node._joinProperty(".");
            nodesDic[fullPath] = node;
            node.fullPath = fullPath;
            node.nodePath = nodePath;
            var keyframeCount = reader.getUint16();
            for (j = 0; j < keyframeCount; j++) {
                var k = new Keyframe2D();
                k.time = numList[reader.getUint16()];
                k.data = { f: this.timeToFrame(k.time, clip._frameRate), val: 0 };
                if (1 == reader.getByte()) {
                    k.data.tweenType = this._strings[reader.getUint16()];
                }
                if (1 == reader.getByte()) {
                    k.data.tweenInfo = {};
                    k.data.tweenInfo.inTangent = numList[reader.getUint16()];
                    k.data.tweenInfo.outTangent = numList[reader.getUint16()];
                    if (1 == reader.getByte()) {
                        k.data.tweenInfo.inWeight = numList[reader.getUint16()];
                    }
                    if (1 == reader.getByte()) {
                        k.data.tweenInfo.outWeight = numList[reader.getUint16()];
                    }
                }
                var num = reader.getByte();
                if (0 == num) {
                    k.data.val = numList[reader.getUint16()];
                }
                else if (1 == num) {
                    k.data.val = this._strings[reader.getUint16()];
                }
                else if (2 == num) {
                    k.data.val = !!reader.getByte();
                }
                if (1 == reader.getByte()) {
                    try {
                        k.data.extend = JSON.parse(this._strings[reader.getUint16()]);
                    }
                    catch (err) { }
                }
                node._keyFrames.push(k);
            }
        }
        var eventCount = reader.getUint16();
        for (i = 0; i < eventCount; i++) {
            var event = new Animation2DEvent();
            event.time = numList[reader.getUint16()];
            event.eventName = this._strings[reader.getUint16()];
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
                        params.push(numList[reader.getUint16()]);
                        break;
                    case 3:
                        params.push(this._strings[reader.getUint16()]);
                        break;
                    default:
                        throw new Error("unknown type.");
                }
            }
            clip.addEvent(event);
        }
    }
}
AnimationClip2DParse01._strings = [];
AnimationClip2DParse01._DATA = { offset: 0, size: 0 };
AnimationClip2DParse01._BLOCK = { count: 0 };

//# sourceMappingURL=AnimationClip2DParser01.js.map
