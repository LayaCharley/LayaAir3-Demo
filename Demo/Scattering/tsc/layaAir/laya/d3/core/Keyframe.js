export var WeightedMode;
(function (WeightedMode) {
    WeightedMode[WeightedMode["None"] = 0] = "None";
    WeightedMode[WeightedMode["In"] = 1] = "In";
    WeightedMode[WeightedMode["Out"] = 2] = "Out";
    WeightedMode[WeightedMode["Both"] = 3] = "Both";
})(WeightedMode || (WeightedMode = {}));
export class Keyframe {
    constructor() {
    }
    cloneTo(destObject) {
        var destKeyFrame = destObject;
        destKeyFrame.time = this.time;
    }
    clone() {
        var dest = new Keyframe();
        this.cloneTo(dest);
        return dest;
    }
}
Keyframe.defaultWeight = 0.33333;

//# sourceMappingURL=Keyframe.js.map
