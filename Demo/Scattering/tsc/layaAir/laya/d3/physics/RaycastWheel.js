import { ILaya } from "../../../ILaya";
import { ILaya3D } from "../../../ILaya3D";
import { Matrix4x4 } from "../../maths/Matrix4x4";
import { Quaternion } from "../../maths/Quaternion";
import { Vector3 } from "../../maths/Vector3";
export class RaycastWheel {
    constructor(ptr) {
        var _a;
        this.worldPos = new Vector3();
        this.worldQuat = new Quaternion();
        this.worldMat = new Matrix4x4();
        this.btWheelPtr = ptr;
        this.bt = ILaya3D.Physics3D._bullet;
        this.btMemory = (_a = ILaya.Laya.WasmModules['bullet']) === null || _a === void 0 ? void 0 : _a.memory;
    }
    set engineForce(force) {
        this.bt.btWheelInfo_setEengineForce(this.btWheelPtr, force);
    }
    get engineForce() {
        return this.bt.btWheelInfo_getEengineForce(this.btWheelPtr);
    }
    set steeringValue(v) {
        this.bt.btWheelInfo_setSteeringValue(this.btWheelPtr, v);
    }
    get steeringValue() {
        return this.bt.btWheelInfo_getSteeringValue(this.btWheelPtr);
    }
    set brake(v) {
        this.bt.btWheelInfo_setBrake(this.btWheelPtr, v);
    }
    get brake() {
        return this.bt.btWheelInfo_getBrake(this.btWheelPtr);
    }
    get rotation() {
        let bt = this.bt;
        return bt.btWheelInfo_getRrotation(this.btWheelPtr);
    }
    get deltaRotation() {
        let bt = this.bt;
        return bt.btWheelInfo_getDeltaRotation(this.btWheelPtr);
    }
    get transform() {
        let bt = this.bt;
        let btrans = bt.btWheelInfo_getWorldTransform(this.btWheelPtr);
        let ret = this.worldMat;
        let retarr = ret.elements;
        if (window.conch) {
            let o = bt.btTransform_getOrigin(btrans);
            let basisptr = bt.btTransform_getBasis(btrans);
            let r0 = bt.btMatrix3x3_getRow(basisptr, 0);
            let r1 = bt.btMatrix3x3_getRow(basisptr, 1);
            let r2 = bt.btMatrix3x3_getRow(basisptr, 2);
            retarr[0] = bt.btVector3_x(r0);
            retarr[1] = bt.btVector3_x(r1);
            retarr[2] = bt.btVector3_x(r2);
            retarr[3] = 0;
            retarr[4] = bt.btVector3_y(r0);
            retarr[5] = bt.btVector3_y(r1);
            retarr[6] = bt.btVector3_y(r2);
            retarr[7] = 0;
            retarr[8] = bt.btVector3_z(r0);
            retarr[9] = bt.btVector3_z(r1);
            retarr[10] = bt.btVector3_z(r2);
            retarr[11] = 0;
            retarr[12] = bt.btVector3_x(o);
            retarr[13] = bt.btVector3_y(o);
            retarr[14] = bt.btVector3_z(o);
            retarr[15] = 1;
        }
        else {
            let mem = this.btMemory;
            let fbuff = new Float64Array(mem.buffer, btrans, 16);
            retarr[0] = fbuff[0];
            retarr[1] = fbuff[4];
            retarr[2] = fbuff[8];
            retarr[3] = 0;
            retarr[4] = fbuff[1];
            retarr[5] = fbuff[5];
            retarr[6] = fbuff[9];
            retarr[7] = 0;
            retarr[8] = fbuff[2];
            retarr[9] = fbuff[6];
            retarr[10] = fbuff[10];
            retarr[11] = 0;
            retarr[12] = fbuff[12];
            retarr[13] = fbuff[13];
            retarr[14] = fbuff[14];
            retarr[15] = 1;
        }
        return ret;
    }
    getWorldTransform() {
        let bt = this.bt;
        let btrans = bt.btWheelInfo_getWorldTransform(this.btWheelPtr);
        let btOri = bt.btTransform_getOrigin(btrans);
        let btRot = bt.btTransform_getRotation(btrans);
        this.worldPos.set(bt.btVector3_x(btOri), bt.btVector3_y(btOri), bt.btVector3_z(btOri));
        this.worldQuat.set(bt.btQuaternion_x(btRot), bt.btQuaternion_y(btRot), bt.btQuaternion_z(btRot), bt.btQuaternion_w(btRot));
    }
}

//# sourceMappingURL=RaycastWheel.js.map
