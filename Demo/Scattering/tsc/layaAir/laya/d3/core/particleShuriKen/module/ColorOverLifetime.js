import { GradientColor } from "./GradientColor";
export class ColorOverLifetime {
    constructor(color) {
        this._color = color;
    }
    get color() {
        return this._color;
    }
    cloneTo(destObject) {
        var destColorOverLifetime = destObject;
        this._color.cloneTo(destColorOverLifetime._color);
        destColorOverLifetime.enable = this.enable;
    }
    clone() {
        var destColor;
        switch (this._color.type) {
            case 0:
                destColor = GradientColor.createByConstant(this._color.constant.clone());
                break;
            case 1:
                destColor = GradientColor.createByGradient(this._color.gradient.clone());
                break;
            case 2:
                destColor = GradientColor.createByRandomTwoConstant(this._color.constantMin.clone(), this._color.constantMax.clone());
                break;
            case 3:
                destColor = GradientColor.createByRandomTwoGradient(this._color.gradientMin.clone(), this._color.gradientMax.clone());
                break;
        }
        var destColorOverLifetime = new ColorOverLifetime(destColor);
        destColorOverLifetime.enable = this.enable;
        return destColorOverLifetime;
    }
}

//# sourceMappingURL=ColorOverLifetime.js.map
