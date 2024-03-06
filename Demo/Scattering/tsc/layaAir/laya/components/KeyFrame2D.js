export class Keyframe2D {
    clone() {
        var dest = new Keyframe2D();
        this.cloneTo(dest);
        return dest;
    }
    cloneTo(destObject) {
        var destKeyFrame = destObject;
        destKeyFrame.time = this.time;
    }
}
Keyframe2D.defaultWeight = 0.33333;

//# sourceMappingURL=KeyFrame2D.js.map
