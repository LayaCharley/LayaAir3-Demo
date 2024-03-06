import { Vector3 } from "../../maths/Vector3";
export class Ray {
    constructor(origin, direction) {
        this.origin = origin;
        this.direction = direction;
    }
    at(t, out) {
        Vector3.scale(this.direction, t, out);
        Vector3.add(this.origin, out, out);
    }
}

//# sourceMappingURL=Ray.js.map
