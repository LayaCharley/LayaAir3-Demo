import { Vector4 } from "../../maths/Vector4";
import { Keyframe, WeightedMode } from "./Keyframe";
export class Vector4Keyframe extends Keyframe {
    constructor(weightMode = false) {
        super();
        this.inTangent = new Vector4();
        this.outTangent = new Vector4();
        this.value = new Vector4();
        if (weightMode) {
            this.inWeight = new Vector4(Keyframe.defaultWeight, Keyframe.defaultWeight, Keyframe.defaultWeight, Keyframe.defaultWeight);
            this.outWeight = new Vector4(Keyframe.defaultWeight, Keyframe.defaultWeight, Keyframe.defaultWeight, Keyframe.defaultWeight);
            this.weightedMode = new Vector4(WeightedMode.None, WeightedMode.None, WeightedMode.None, WeightedMode.None);
        }
    }
    cloneTo(dest) {
        super.cloneTo(dest);
        var destKeyFarme = dest;
        this.inTangent.cloneTo(destKeyFarme.inTangent);
        this.outTangent.cloneTo(destKeyFarme.outTangent);
        this.value.cloneTo(destKeyFarme.value);
        if (this.weightedMode) {
            this.inWeight.cloneTo(destKeyFarme.inWeight);
            this.outWeight.cloneTo(destKeyFarme.outWeight);
            this.weightedMode.cloneTo(destKeyFarme.weightedMode);
        }
    }
}

//# sourceMappingURL=Vector4Keyframe.js.map
