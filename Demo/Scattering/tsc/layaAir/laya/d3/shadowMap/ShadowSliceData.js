import { Plane } from "../math/Plane";
import { LayaGL } from "../../layagl/LayaGL";
import { BoundSphere } from "../math/BoundSphere";
import { Matrix4x4 } from "../../maths/Matrix4x4";
import { Vector3 } from "../../maths/Vector3";
export class ShadowSliceData {
    constructor() {
        this.cameraShaderValue = LayaGL.renderOBJCreate.createShaderData(null);
        this.position = new Vector3();
        this.viewMatrix = new Matrix4x4();
        this.projectionMatrix = new Matrix4x4();
        this.viewProjectMatrix = new Matrix4x4();
        this.cullPlanes = [new Plane(new Vector3(), 0), new Plane(new Vector3(), 0), new Plane(new Vector3(), 0), new Plane(new Vector3(), 0), new Plane(new Vector3(), 0), new Plane(new Vector3(), 0), new Plane(new Vector3(), 0), new Plane(new Vector3(), 0), new Plane(new Vector3(), 0), new Plane(new Vector3(), 0)];
        this.splitBoundSphere = new BoundSphere(new Vector3(), 0.0);
    }
}
export class ShadowSpotData {
    constructor() {
        this.cameraShaderValue = LayaGL.renderOBJCreate.createShaderData(null);
        this.position = new Vector3;
        this.viewMatrix = new Matrix4x4();
        this.projectionMatrix = new Matrix4x4();
        this.viewProjectMatrix = new Matrix4x4();
        this.cameraCullInfo = LayaGL.renderOBJCreate.createCameraCullInfo();
    }
}

//# sourceMappingURL=ShadowSliceData.js.map
