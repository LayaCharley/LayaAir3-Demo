import { Keyframe, WeightedMode } from "./Keyframe";
export class FloatKeyframe extends Keyframe {
    constructor() {
        super();
        this.inWeight = Keyframe.defaultWeight;
        this.outWeight = Keyframe.defaultWeight;
        this.weightedMode = WeightedMode.None;
    }
    cloneTo(destObject) {
        super.cloneTo(destObject);
        var destKeyFrame = destObject;
        destKeyFrame.inTangent = this.inTangent;
        destKeyFrame.outTangent = this.outTangent;
        destKeyFrame.value = this.value;
        destKeyFrame.inTangent = this.inTangent;
        destKeyFrame.outTangent = this.outTangent;
        destKeyFrame.value = this.value;
        destKeyFrame.inWeight = this.inWeight;
        destKeyFrame.outWeight = this.outWeight;
        destKeyFrame.weightedMode = this.weightedMode;
    }
    clone() {
        let f = new FloatKeyframe();
        this.cloneTo(f);
        return f;
    }
}

//# sourceMappingURL=FloatKeyframe.js.map
