import { ConstraintComponent } from "./ConstraintComponent";
import { Rigidbody3D } from "../Rigidbody3D";
import { Physics3D } from "../../Physics3D";
import { Vector3 } from "../../../maths/Vector3";
export class ConfigurableConstraint extends ConstraintComponent {
    constructor() {
        super(ConstraintComponent.CONSTRAINT_D6_SPRING_CONSTRAINT_TYPE);
        this._axis = new Vector3();
        this._secondaryAxis = new Vector3();
        this._minLinearLimit = new Vector3();
        this._maxLinearLimit = new Vector3();
        this._minAngularLimit = new Vector3();
        this._maxAngularLimit = new Vector3();
        this._linearLimitSpring = new Vector3();
        this._angularLimitSpring = new Vector3();
        this._linearBounce = new Vector3();
        this._angularBounce = new Vector3();
        this._linearDamp = new Vector3();
        this._angularDamp = new Vector3();
        this._xMotion = 0;
        this._yMotion = 0;
        this._zMotion = 0;
        this._angularXMotion = 0;
        this._angularYMotion = 0;
        this._angularZMotion = 0;
        var bt = Physics3D._bullet;
        this._btAxis = bt.btVector3_create(0, 0.0, 1);
        this._btSecondaryAxis = bt.btVector3_create(0.0, 1.0, 0.0);
    }
    get axis() {
        return this._axis;
    }
    get secondaryAxis() {
        return this._secondaryAxis;
    }
    set maxAngularLimit(value) {
        value.cloneTo(this._maxAngularLimit);
    }
    set minAngularLimit(value) {
        value.cloneTo(this._minAngularLimit);
    }
    get maxAngularLimit() {
        return this._maxAngularLimit;
    }
    get minAngularLimit() {
        return this._minAngularLimit;
    }
    set maxLinearLimit(value) {
        value.cloneTo(this._maxLinearLimit);
    }
    set minLinearLimit(value) {
        value.cloneTo(this._minLinearLimit);
    }
    get maxLinearLimit() {
        return this._maxLinearLimit;
    }
    get minLinearLimit() {
        return this._minLinearLimit;
    }
    set XMotion(value) {
        if (this._xMotion != value) {
            this._xMotion = value;
            this.setLimit(ConfigurableConstraint.MOTION_LINEAR_INDEX_X, value, this._minLinearLimit.x, this._maxLinearLimit.x);
        }
    }
    get XMotion() {
        return this._xMotion;
    }
    set YMotion(value) {
        if (this._yMotion != value) {
            this._yMotion = value;
            this.setLimit(ConfigurableConstraint.MOTION_LINEAR_INDEX_Y, value, this._minLinearLimit.y, this._maxLinearLimit.y);
        }
    }
    get YMotion() {
        return this._yMotion;
    }
    set ZMotion(value) {
        if (this._zMotion != value) {
            this._zMotion = value;
            this.setLimit(ConfigurableConstraint.MOTION_LINEAR_INDEX_Z, value, this._minLinearLimit.z, this._maxLinearLimit.z);
        }
    }
    get ZMotion() {
        return this._zMotion;
    }
    set angularXMotion(value) {
        if (this._angularXMotion != value) {
            this._angularXMotion = value;
            this.setLimit(ConfigurableConstraint.MOTION_ANGULAR_INDEX_X, value, this._minAngularLimit.x, this._maxAngularLimit.x);
        }
    }
    get angularXMotion() {
        return this._angularXMotion;
    }
    set angularYMotion(value) {
        if (this._angularYMotion != value) {
            this._angularYMotion = value;
            this.setLimit(ConfigurableConstraint.MOTION_ANGULAR_INDEX_Y, value, this._minAngularLimit.y, this._maxAngularLimit.y);
        }
    }
    get angularYMotion() {
        return this._angularYMotion;
    }
    set angularZMotion(value) {
        if (this._angularZMotion != value) {
            this._angularZMotion = value;
            this.setLimit(ConfigurableConstraint.MOTION_ANGULAR_INDEX_Z, value, this._minAngularLimit.z, this._maxAngularLimit.z);
        }
    }
    get angularZMotion() {
        return this._angularZMotion;
    }
    set linearLimitSpring(value) {
        if (!Vector3.equals(this._linearLimitSpring, value)) {
            value.cloneTo(this._linearLimitSpring);
            this.setSpring(ConfigurableConstraint.MOTION_LINEAR_INDEX_X, value.x);
            this.setSpring(ConfigurableConstraint.MOTION_LINEAR_INDEX_Y, value.y);
            this.setSpring(ConfigurableConstraint.MOTION_LINEAR_INDEX_Z, value.z);
        }
    }
    get linearLimitSpring() {
        return this._linearLimitSpring;
    }
    set angularLimitSpring(value) {
        if (!Vector3.equals(this._angularLimitSpring, value)) {
            value.cloneTo(this._angularLimitSpring);
            this.setSpring(ConfigurableConstraint.MOTION_ANGULAR_INDEX_X, value.x);
            this.setSpring(ConfigurableConstraint.MOTION_ANGULAR_INDEX_Y, value.y);
            this.setSpring(ConfigurableConstraint.MOTION_ANGULAR_INDEX_Z, value.z);
        }
    }
    get angularLimitSpring() {
        return this._angularLimitSpring;
    }
    set linearBounce(value) {
        if (!Vector3.equals(this._linearBounce, value)) {
            value.cloneTo(this._linearBounce);
            this.setBounce(ConfigurableConstraint.MOTION_LINEAR_INDEX_X, value.x);
            this.setBounce(ConfigurableConstraint.MOTION_LINEAR_INDEX_Y, value.y);
            this.setBounce(ConfigurableConstraint.MOTION_LINEAR_INDEX_Z, value.z);
        }
    }
    get linearBounce() {
        return this._linearBounce;
    }
    set angularBounce(value) {
        if (!Vector3.equals(this._angularBounce, value)) {
            value.cloneTo(this._angularBounce);
            this.setBounce(ConfigurableConstraint.MOTION_ANGULAR_INDEX_X, value.x);
            this.setBounce(ConfigurableConstraint.MOTION_ANGULAR_INDEX_Y, value.y);
            this.setBounce(ConfigurableConstraint.MOTION_ANGULAR_INDEX_Z, value.z);
        }
    }
    get angularBounce() {
        return this._angularBounce;
    }
    set linearDamp(value) {
        if (!Vector3.equals(this._linearDamp, value)) {
            value.cloneTo(this._linearDamp);
            this.setDamping(ConfigurableConstraint.MOTION_LINEAR_INDEX_X, value.x);
            this.setDamping(ConfigurableConstraint.MOTION_LINEAR_INDEX_Y, value.y);
            this.setDamping(ConfigurableConstraint.MOTION_LINEAR_INDEX_Z, value.z);
        }
    }
    get linearDamp() {
        return this._linearDamp;
    }
    set angularDamp(value) {
        if (!Vector3.equals(this._angularDamp, value)) {
            value.cloneTo(this._angularDamp);
            this.setDamping(ConfigurableConstraint.MOTION_ANGULAR_INDEX_X, value.x);
            this.setDamping(ConfigurableConstraint.MOTION_ANGULAR_INDEX_Y, value.y);
            this.setDamping(ConfigurableConstraint.MOTION_ANGULAR_INDEX_Z, value.z);
        }
    }
    get angularDamp() {
        return this._angularDamp;
    }
    set anchor(value) {
        value.cloneTo(this._anchor);
        this.setFrames();
    }
    get anchor() {
        return this._anchor;
    }
    set connectAnchor(value) {
        value.cloneTo(this._connectAnchor);
        this.setFrames();
    }
    get connectAnchor() {
        return this._connectAnchor;
    }
    setAxis(axis, secondaryAxis) {
        if (!this._btConstraint)
            return;
        var bt = Physics3D._bullet;
        this._axis.setValue(axis.x, axis.y, axis.y);
        this._secondaryAxis.setValue(secondaryAxis.x, secondaryAxis.y, secondaryAxis.z);
        bt.btVector3_setValue(this._btAxis, axis.x, axis.y, axis.z);
        bt.btVector3_setValue(this._btSecondaryAxis, secondaryAxis.x, secondaryAxis.y, secondaryAxis.z);
        bt.btGeneric6DofSpring2Constraint_setAxis(this._btConstraint, this._btAxis, this._btSecondaryAxis);
    }
    setLimit(axis, motionType, low, high) {
        if (!this._btConstraint)
            return;
        var bt = Physics3D._bullet;
        switch (motionType) {
            case ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED:
                bt.btGeneric6DofSpring2Constraint_setLimit(this._btConstraint, axis, 0, 0);
                break;
            case ConfigurableConstraint.CONFIG_MOTION_TYPE_LIMITED:
                if (low < high)
                    bt.btGeneric6DofSpring2Constraint_setLimit(this._btConstraint, axis, low, high);
                break;
            case ConfigurableConstraint.CONFIG_MOTION_TYPE_FREE:
                bt.btGeneric6DofSpring2Constraint_setLimit(this._btConstraint, axis, 1, 0);
                break;
            default:
                throw "No Type of Axis Motion";
        }
    }
    setSpring(axis, springValue, limitIfNeeded = true) {
        if (!this._btConstraint)
            return;
        var bt = Physics3D._bullet;
        var enableSpring = springValue > 0;
        bt.btGeneric6DofSpring2Constraint_enableSpring(this._btConstraint, axis, enableSpring);
        if (enableSpring)
            bt.btGeneric6DofSpring2Constraint_setStiffness(this._btConstraint, axis, springValue, limitIfNeeded);
    }
    setBounce(axis, bounce) {
        if (!this._btConstraint)
            return;
        var bt = Physics3D._bullet;
        bounce = bounce <= 0 ? 0 : bounce;
        bt.btGeneric6DofSpring2Constraint_setBounce(this._btConstraint, axis, bounce);
    }
    setDamping(axis, damp, limitIfNeeded = true) {
        if (!this._btConstraint)
            return;
        var bt = Physics3D._bullet;
        damp = damp <= 0 ? 0 : damp;
        bt.btGeneric6DofSpring2Constraint_setDamping(this._btConstraint, axis, damp, limitIfNeeded);
    }
    setEquilibriumPoint(axis, equilibriumPoint) {
        var bt = Physics3D._bullet;
        bt.btGeneric6DofSpring2Constraint_setEquilibriumPoint(this._btConstraint, axis, equilibriumPoint);
    }
    enableMotor(axis, isEnableMotor) {
        var bt = Physics3D._bullet;
        bt.btGeneric6DofSpring2Constraint_enableMotor(this._btConstraint, axis, isEnableMotor);
    }
    setServo(axis, onOff) {
        var bt = Physics3D._bullet;
        bt.btGeneric6DofSpring2Constraint_setServo(this._btConstraint, axis, onOff);
    }
    setTargetVelocity(axis, velocity) {
        var bt = Physics3D._bullet;
        bt.btGeneric6DofSpring2Constraint_setTargetVelocity(this._btConstraint, axis, velocity);
    }
    setTargetPosition(axis, target) {
        var bt = Physics3D._bullet;
        bt.btGeneric6DofSpring2Constraint_setServoTarget(this._btConstraint, axis, target);
    }
    setMaxMotorForce(axis, force) {
        var bt = Physics3D._bullet;
        bt.btGeneric6DofSpring2Constraint_setMaxMotorForce(this._btConstraint, axis, force);
    }
    setParam(axis, constraintParams, value) {
        var bt = Physics3D._bullet;
        bt.btTypedConstraint_setParam(this._btConstraint, axis, constraintParams, value);
    }
    setFrames() {
        super.setFrames();
        var bt = Physics3D._bullet;
        if (!this._btConstraint)
            return;
        bt.btGeneric6DofSpring2Constraint_setFrames(this._btConstraint, this._btframATrans, this._btframBTrans);
    }
    _addToSimulation() {
        this._simulation && this._simulation.addConstraint(this, this.disableCollisionsBetweenLinkedBodies);
    }
    _removeFromSimulation() {
        this._simulation.removeConstraint(this);
        this._simulation = null;
    }
    _createConstraint() {
        var bt = Physics3D._bullet;
        this._btConstraint = bt.btGeneric6DofSpring2Constraint_create(this.ownBody.btColliderObject, this._btframATrans, this.connectedBody.btColliderObject, this._btframBTrans, ConfigurableConstraint.RO_XYZ);
        this._btJointFeedBackObj = bt.btJointFeedback_create(this._btConstraint);
        bt.btTypedConstraint_setJointFeedback(this._btConstraint, this._btJointFeedBackObj);
        this._initAllConstraintInfo();
        bt.btTypedConstraint_setEnabled(this._btConstraint, true);
        this._simulation = this.getPhysicsSimulation();
        this._addToSimulation();
    }
    _initAllConstraintInfo() {
        this.setLimit(ConfigurableConstraint.MOTION_LINEAR_INDEX_X, this._xMotion, this._minLinearLimit.x, this._maxLinearLimit.x);
        this.setLimit(ConfigurableConstraint.MOTION_LINEAR_INDEX_Y, this._yMotion, this._minLinearLimit.y, this._maxLinearLimit.y);
        this.setLimit(ConfigurableConstraint.MOTION_LINEAR_INDEX_Z, this._zMotion, this._minLinearLimit.z, this._maxLinearLimit.z);
        this.setLimit(ConfigurableConstraint.MOTION_ANGULAR_INDEX_X, this._angularXMotion, this._minAngularLimit.x, this._maxAngularLimit.x);
        this.setLimit(ConfigurableConstraint.MOTION_ANGULAR_INDEX_Y, this._angularYMotion, this._minAngularLimit.y, this._maxAngularLimit.y);
        this.setLimit(ConfigurableConstraint.MOTION_ANGULAR_INDEX_Z, this._angularZMotion, this._minAngularLimit.z, this._maxAngularLimit.z);
        this.setSpring(ConfigurableConstraint.MOTION_LINEAR_INDEX_X, this._linearLimitSpring.x);
        this.setSpring(ConfigurableConstraint.MOTION_LINEAR_INDEX_Y, this._linearLimitSpring.y);
        this.setSpring(ConfigurableConstraint.MOTION_LINEAR_INDEX_Z, this._linearLimitSpring.z);
        this.setSpring(ConfigurableConstraint.MOTION_ANGULAR_INDEX_X, this._angularLimitSpring.x);
        this.setSpring(ConfigurableConstraint.MOTION_ANGULAR_INDEX_Y, this._angularLimitSpring.y);
        this.setSpring(ConfigurableConstraint.MOTION_ANGULAR_INDEX_Z, this._angularLimitSpring.z);
        this.setBounce(ConfigurableConstraint.MOTION_LINEAR_INDEX_X, this._linearBounce.x);
        this.setBounce(ConfigurableConstraint.MOTION_LINEAR_INDEX_Y, this._linearBounce.y);
        this.setBounce(ConfigurableConstraint.MOTION_LINEAR_INDEX_Z, this._linearBounce.z);
        this.setBounce(ConfigurableConstraint.MOTION_ANGULAR_INDEX_X, this._angularBounce.x);
        this.setBounce(ConfigurableConstraint.MOTION_ANGULAR_INDEX_Y, this._angularBounce.y);
        this.setBounce(ConfigurableConstraint.MOTION_ANGULAR_INDEX_Z, this._angularBounce.z);
        this.setDamping(ConfigurableConstraint.MOTION_LINEAR_INDEX_X, this._linearDamp.x);
        this.setDamping(ConfigurableConstraint.MOTION_LINEAR_INDEX_Y, this._linearDamp.y);
        this.setDamping(ConfigurableConstraint.MOTION_LINEAR_INDEX_Z, this._linearDamp.z);
        this.setDamping(ConfigurableConstraint.MOTION_ANGULAR_INDEX_X, this._angularDamp.x);
        this.setDamping(ConfigurableConstraint.MOTION_ANGULAR_INDEX_Y, this._angularDamp.y);
        this.setDamping(ConfigurableConstraint.MOTION_ANGULAR_INDEX_Z, this._angularDamp.z);
        this.setFrames();
        this.setEquilibriumPoint(0, 0);
    }
    _onEnable() {
        if (this._btConstraint)
            Physics3D._bullet.btTypedConstraint_setEnabled(this._btConstraint, true);
    }
    _onDisable() {
        if (!this.connectedBody && this._simulation)
            this._removeFromSimulation();
        if (this._btConstraint)
            Physics3D._bullet.btTypedConstraint_setEnabled(this._btConstraint, false);
    }
    _parse(data, interactMap = null) {
        super._parse(data);
        this._axis.fromArray(data.axis);
        this._secondaryAxis.fromArray(data.secondaryAxis);
        var limitlimit = data.linearLimit;
        this._minLinearLimit.setValue(-limitlimit, -limitlimit, -limitlimit);
        this._maxLinearLimit.setValue(limitlimit, limitlimit, limitlimit);
        var limitSpring = data.linearLimitSpring;
        this._linearLimitSpring.setValue(limitSpring, limitSpring, limitSpring);
        var limitDamp = data.linearLimitDamper;
        this._linearDamp.setValue(limitDamp, limitDamp, limitDamp);
        var limitBounciness = data.linearLimitBounciness;
        this._linearBounce.setValue(limitBounciness, limitBounciness, limitBounciness);
        var xlowAngularLimit = data.lowAngularXLimit;
        var xhighAngularLimit = data.highAngularXLimit;
        var yAngularLimit = data.angularYLimit;
        var zAngularLimit = data.angularZLimit;
        this._minAngularLimit.setValue(xlowAngularLimit, -yAngularLimit, -zAngularLimit);
        this._maxAngularLimit.setValue(xhighAngularLimit, yAngularLimit, zAngularLimit);
        var xhighAngularBounciness = data.highAngularXLimitBounciness;
        var ybounciness = data.angularYLimitBounciness;
        var zbounciness = data.angularZLimitBounciness;
        this._angularBounce.setValue(xhighAngularBounciness, ybounciness, zbounciness);
        var xAngularSpring = data.angularXLimitSpring;
        var yzAngularSpriny = data.angularYZLimitSpring;
        this._angularLimitSpring.setValue(xAngularSpring, yzAngularSpriny, yzAngularSpriny);
        var xAngularDamper = data.angularXLimitDamper;
        var yzAngularDamper = data.angularYZLimitDamper;
        this._angularDamp.setValue(xAngularDamper, yzAngularDamper, yzAngularDamper);
        this.XMotion = data.xMotion;
        this.YMotion = data.yMotion;
        this.ZMotion = data.zMotion;
        this.angularXMotion = data.angularXMotion;
        this.angularYMotion = data.angularYMotion;
        this.angularZMotion = data.angularZMotion;
        if (data.rigidbodyID != -1 && data.connectRigidbodyID != -1) {
            interactMap.component.push(this);
            interactMap.data.push(data);
        }
        (data.breakForce != undefined) && (this.breakForce = data.breakForce);
        (data.breakTorque != undefined) && (this.breakTorque = data.breakTorque);
    }
    _parseInteractive(data = null, spriteMap = null) {
        var rigidBodySprite = spriteMap[data.rigidbodyID];
        var rigidBody = rigidBodySprite.getComponent(Rigidbody3D);
        var connectSprite = spriteMap[data.connectRigidbodyID];
        var connectRigidbody = connectSprite.getComponent(Rigidbody3D);
        this.ownBody = rigidBody;
        this.connectedBody = connectRigidbody;
    }
}
ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED = 0;
ConfigurableConstraint.CONFIG_MOTION_TYPE_LIMITED = 1;
ConfigurableConstraint.CONFIG_MOTION_TYPE_FREE = 2;
ConfigurableConstraint.MOTION_LINEAR_INDEX_X = 0;
ConfigurableConstraint.MOTION_LINEAR_INDEX_Y = 1;
ConfigurableConstraint.MOTION_LINEAR_INDEX_Z = 2;
ConfigurableConstraint.MOTION_ANGULAR_INDEX_X = 3;
ConfigurableConstraint.MOTION_ANGULAR_INDEX_Y = 4;
ConfigurableConstraint.MOTION_ANGULAR_INDEX_Z = 5;
ConfigurableConstraint.RO_XYZ = 0;
ConfigurableConstraint.RO_XZY = 1;
ConfigurableConstraint.RO_YXZ = 2;
ConfigurableConstraint.RO_YZX = 3;
ConfigurableConstraint.RO_ZXY = 4;
ConfigurableConstraint.RO_ZYX = 5;

//# sourceMappingURL=ConfigurableConstraint.js.map
