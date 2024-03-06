import { Vector2 } from "../../maths/Vector2";
import { Keyframe, WeightedMode } from "./Keyframe";
export class Vector2Keyframe extends Keyframe {
    constructor(weightMode = false) {
        super();
        this.inTangent = new Vector2();
        this.outTangent = new Vector2();
        this.value = new Vector2();
        if (weightMode) {
            this.inWeight = new Vector2(Keyframe.defaultWeight, Keyframe.defaultWeight);
            this.outWeight = new Vector2(Keyframe.defaultWeight, Keyframe.defaultWeight);
            this.weightedMode = new Vector2(WeightedMode.None, WeightedMode.None);
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

//# sourceMappingURL=Vector2Keyframe.js.map
