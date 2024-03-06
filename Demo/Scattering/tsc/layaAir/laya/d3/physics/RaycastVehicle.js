import { ILaya3D } from "../../../ILaya3D";
import { RaycastWheel } from "./RaycastWheel";
export class btVehicleTuning {
    constructor() {
        this.suspensionStiffness = 15.88;
        this.suspensionCompression = 0.83;
        this.suspensionDamping = 0.88;
        this.maxSuspensionTravelCm = 500;
        this.frictionSlip = 10.5;
        this.maxSuspensionForce = 6000;
    }
}
export class btWheelInfo {
}
export class RaycastVehicle {
    constructor(btObj) {
        this.tuing = new btVehicleTuning();
        this.wheels = [];
        this.btVehiclePtr = btObj;
    }
    addWheel(connectionPointCS0, wheelDirectionCS0, wheelAxleCS, wheelRadius, suspensionRestLength, suspensionMaxTravel, suspensionStiffness, suspensionDamping, frictionSlip, isFrontWheel) {
        let bt = ILaya3D.Physics3D._bullet;
        let tuing = this.tuing;
        let id = this.getNumWheels();
        let wheelinfo = bt.btRaycastVehicle_addWheel(this.btVehiclePtr, connectionPointCS0.x, connectionPointCS0.y, connectionPointCS0.z, wheelDirectionCS0.x, wheelDirectionCS0.y, wheelDirectionCS0.z, wheelAxleCS.x, wheelAxleCS.y, wheelAxleCS.z, suspensionRestLength, wheelRadius, suspensionStiffness || tuing.suspensionStiffness, tuing.suspensionCompression, suspensionDamping || tuing.suspensionDamping, frictionSlip || tuing.frictionSlip, (suspensionMaxTravel ? suspensionMaxTravel * 100 : tuing.maxSuspensionTravelCm), tuing.maxSuspensionForce, isFrontWheel);
        let wheel = new RaycastWheel(wheelinfo);
        this.wheels.push(wheel);
        for (let i = 0, n = this.wheels.length; i < n; i++) {
            let cwheel = this.wheels[i];
            cwheel.btWheelPtr = this.getWheelInfo(i);
        }
        return wheel;
    }
    getNumWheels() {
        let bt = ILaya3D.Physics3D._bullet;
        return bt.btRaycastVehicle_getNumWheels(this.btVehiclePtr);
    }
    getWheelInfo(i) {
        let bt = ILaya3D.Physics3D._bullet;
        return bt.btRaycastVehicle_getWheelInfo(this.btVehiclePtr, i);
    }
}

//# sourceMappingURL=RaycastVehicle.js.map
