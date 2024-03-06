import { GradientAngularVelocity } from "./GradientAngularVelocity";
export class RotationOverLifetime {
    constructor(angularVelocity) {
        this._angularVelocity = angularVelocity;
    }
    get angularVelocity() {
        return this._angularVelocity;
    }
    cloneTo(destObject) {
        var destRotationOverLifetime = destObject;
        this._angularVelocity.cloneTo(destRotationOverLifetime._angularVelocity);
        destRotationOverLifetime.enable = this.enable;
    }
    clone() {
        var destAngularVelocity;
        switch (this._angularVelocity.type) {
            case 0:
                if (this._angularVelocity.separateAxes)
                    destAngularVelocity = GradientAngularVelocity.createByConstantSeparate(this._angularVelocity.constantSeparate.clone());
                else
                    destAngularVelocity = GradientAngularVelocity.createByConstant(this._angularVelocity.constant);
                break;
            case 1:
                if (this._angularVelocity.separateAxes)
                    destAngularVelocity = GradientAngularVelocity.createByGradientSeparate(this._angularVelocity.gradientX.clone(), this._angularVelocity.gradientY.clone(), this._angularVelocity.gradientZ.clone());
                else
                    destAngularVelocity = GradientAngularVelocity.createByGradient(this._angularVelocity.gradient.clone());
                break;
            case 2:
                if (this._angularVelocity.separateAxes)
                    destAngularVelocity = GradientAngularVelocity.createByRandomTwoConstantSeparate(this._angularVelocity.constantMinSeparate.clone(), this._angularVelocity.constantMaxSeparate.clone());
                else
                    destAngularVelocity = GradientAngularVelocity.createByRandomTwoConstant(this._angularVelocity.constantMin, this._angularVelocity.constantMax);
                break;
            case 3:
                if (this._angularVelocity.separateAxes)
                    destAngularVelocity = GradientAngularVelocity.createByRandomTwoGradientSeparate(this._angularVelocity.gradientXMin.clone(), this._angularVelocity.gradientYMin.clone(), this._angularVelocity.gradientZMin.clone(), this._angularVelocity.gradientWMin.clone(), this._angularVelocity.gradientXMax.clone(), this._angularVelocity.gradientYMax.clone(), this._angularVelocity.gradientZMax.clone(), this._angularVelocity.gradientWMax.clone());
                else
                    destAngularVelocity = GradientAngularVelocity.createByRandomTwoGradient(this._angularVelocity.gradientMin.clone(), this._angularVelocity.gradientMax.clone());
                break;
        }
        var destRotationOverLifetime = new RotationOverLifetime(destAngularVelocity);
        destRotationOverLifetime.enable = this.enable;
        return destRotationOverLifetime;
    }
}

//# sourceMappingURL=RotationOverLifetime.js.map
