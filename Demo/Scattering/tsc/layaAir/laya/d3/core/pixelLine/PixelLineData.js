import { Color } from "../../../maths/Color";
import { Vector3 } from "../../../maths/Vector3";
export class PixelLineData {
    constructor() {
        this.startPosition = new Vector3();
        this.endPosition = new Vector3();
        this.startColor = new Color();
        this.endColor = new Color();
    }
    cloneTo(destObject) {
        this.startPosition.cloneTo(destObject.startPosition);
        this.endPosition.cloneTo(destObject.endPosition);
        this.startColor.cloneTo(destObject.startColor);
        this.endColor.cloneTo(destObject.endColor);
    }
}

//# sourceMappingURL=PixelLineData.js.map
