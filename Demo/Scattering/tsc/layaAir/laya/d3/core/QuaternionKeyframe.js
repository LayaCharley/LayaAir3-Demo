import { Quaternion } from "../../maths/Quaternion";
import { Vector4 } from "../../maths/Vector4";
import { Keyframe } from "./Keyframe";
export class QuaternionKeyframe extends Keyframe {
    constructor(weightMode = false) {
        super();
        this.inTangent = new Vector4();
        this.outTangent = new Vector4();
        this.value = new Quaternion();
        if (weightMode) {
            this.inWeight = new Vector4();
            this.outWeight = new Vector4();
            this.weightedMode = new Vector4();
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

//# sourceMappingURL=QuaternionKeyframe.js.map
