import { Vector3 } from "../../maths/Vector3";
import { Keyframe, WeightedMode } from "./Keyframe";
export class Vector3Keyframe extends Keyframe {
    constructor(weightMode = false) {
        super();
        this.inTangent = new Vector3();
        this.outTangent = new Vector3();
        this.value = new Vector3();
        if (weightMode) {
            this.inWeight = new Vector3(Keyframe.defaultWeight, Keyframe.defaultWeight, Keyframe.defaultWeight);
            this.outWeight = new Vector3(Keyframe.defaultWeight, Keyframe.defaultWeight, Keyframe.defaultWeight);
            this.weightedMode = new Vector3(WeightedMode.None, WeightedMode.None, WeightedMode.None);
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

//# sourceMappingURL=Vector3Keyframe.js.map
