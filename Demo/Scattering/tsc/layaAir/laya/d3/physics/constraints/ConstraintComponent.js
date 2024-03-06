import { Component } from "../../../components/Component";
import { Physics3D } from "../../Physics3D";
import { Vector3 } from "../../../maths/Vector3";
export class ConstraintComponent extends Component {
    constructor(constraintType) {
        super();
        this._anchor = new Vector3();
        this._connectAnchor = new Vector3();
        this._feedbackEnabled = false;
        this._getJointFeedBack = false;
        this._currentForce = new Vector3();
        this._currentTorque = new Vector3();
        this.disableCollisionsBetweenLinkedBodies = true;
        this._constraintType = constraintType;
        var bt = Physics3D._bullet;
        this._btframATrans = bt.btTransform_create();
        this._btframBTrans = bt.btTransform_create();
        bt.btTransform_setIdentity(this._btframATrans);
        bt.btTransform_setIdentity(this._btframBTrans);
        this._btframAPos = bt.btVector3_create(0, 0, 0);
        this._btframBPos = bt.btVector3_create(0, 0, 0);
        bt.btTransform_setOrigin(this._btframATrans, this._btframAPos);
        bt.btTransform_setOrigin(this._btframBTrans, this._btframBPos);
        this._breakForce = -1;
        this._breakTorque = -1;
    }
    get appliedImpulse() {
        if (!this._feedbackEnabled) {
            this._btConstraint.EnableFeedback(true);
            this._feedbackEnabled = true;
        }
        return this._btConstraint.AppliedImpulse;
    }
    set connectedBody(value) {
        this._connectedBody = value;
    }
    get connectedBody() {
        return this._connectedBody;
    }
    get ownBody() {
        return this._ownBody;
    }
    set ownBody(value) {
        this._ownBody = value;
    }
    get currentForce() {
        if (!this._getJointFeedBack)
            this._getFeedBackInfo();
        return this._currentForce;
    }
    get currentTorque() {
        if (!this._getJointFeedBack)
            this._getFeedBackInfo();
        return this._currentTorque;
    }
    get breakForce() {
        return this._breakForce;
    }
    set breakForce(value) {
        this._breakForce = value;
    }
    get breakTorque() {
        return this._breakTorque;
    }
    set breakTorque(value) {
        this._breakTorque = value;
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
    setOverrideNumSolverIterations(overideNumIterations) {
        var bt = Physics3D._bullet;
        bt.btTypedConstraint_setOverrideNumSolverIterations(this._btConstraint, overideNumIterations);
    }
    setConstraintEnabled(enable) {
        var bt = Physics3D._bullet;
        bt.btTypedConstraint_setEnabled(this._btConstraint, enable);
    }
    setFrames() {
        var bt = Physics3D._bullet;
        bt.btVector3_setValue(this._btframAPos, this._anchor.x, this.anchor.y, this.anchor.z);
        bt.btVector3_setValue(this._btframBPos, this._connectAnchor.x, this._connectAnchor.y, this._connectAnchor.z);
        bt.btTransform_setOrigin(this._btframATrans, this._btframAPos);
        bt.btTransform_setOrigin(this._btframBTrans, this._btframBPos);
    }
    _addToSimulation() {
    }
    _removeFromSimulation() {
    }
    _createConstraint() {
    }
    setConnectRigidBody(ownerRigid, connectRigidBody) {
        var ownerCanInSimulation = ownerRigid && !!(ownerRigid._simulation && ownerRigid._enabled && ownerRigid.colliderShape);
        var connectCanInSimulation = connectRigidBody && !!(connectRigidBody._simulation && connectRigidBody._enabled && connectRigidBody.colliderShape);
        if (!(ownerCanInSimulation && connectCanInSimulation))
            throw "ownerRigid or connectRigidBody is not in Simulation";
        if (ownerRigid != this._ownBody || connectRigidBody != this._connectedBody) {
            var canInSimulation = !!(this.enabled && this._simulation);
            canInSimulation && this._removeFromSimulation();
            this._ownBody = ownerRigid;
            this._connectedBody = connectRigidBody;
            this._createConstraint();
        }
    }
    _setConnectRigidBody(A, B) {
        this.ownBody = A;
        this.connectedBody = B;
        this._createConstraint();
    }
    getcurrentForce(out) {
        if (!this._btJointFeedBackObj)
            throw "this Constraint is not simulation";
        var bt = Physics3D._bullet;
        var applyForce = bt.btJointFeedback_getAppliedForceBodyA(this._btJointFeedBackObj);
        out.setValue(bt.btVector3_x(applyForce), bt.btVector3_y(applyForce), bt.btVector3_z(applyForce));
        return;
    }
    getPhysicsSimulation() {
        return this.owner._scene.physicsSimulation;
    }
    getcurrentTorque(out) {
        if (!this._btJointFeedBackObj)
            throw "this Constraint is not simulation";
        var bt = Physics3D._bullet;
        var applyTorque = bt.btJointFeedback_getAppliedTorqueBodyA(this._btJointFeedBackObj);
        out.setValue(bt.btVector3_x(applyTorque), bt.btVector3_y(applyTorque), bt.btVector3_z(applyTorque));
        return;
    }
    _onDestroy() {
        var physics3D = Physics3D._bullet;
        this._simulation && this._removeFromSimulation();
        if (this._btConstraint && this._btJointFeedBackObj && this._simulation) {
            physics3D.btTypedConstraint_destroy(this._btConstraint);
            physics3D.btJointFeedback_destroy(this._btJointFeedBackObj);
            this._btJointFeedBackObj = null;
            this._btConstraint = null;
        }
    }
    _isBreakConstrained() {
        this._getJointFeedBack = false;
        if (this.breakForce == -1 && this.breakTorque == -1)
            return false;
        this._getFeedBackInfo();
        var isBreakForce = this._breakForce != -1 && (Vector3.scalarLength(this._currentForce) > this._breakForce);
        var isBreakTorque = this._breakTorque != -1 && (Vector3.scalarLength(this._currentTorque) > this._breakTorque);
        if (isBreakForce || isBreakTorque) {
            this._breakConstrained();
            return true;
        }
        return false;
    }
    _parse(data) {
        this._anchor.fromArray(data.anchor);
        this._connectAnchor.fromArray(data.connectAnchor);
        this.setFrames();
    }
    _getFeedBackInfo() {
        var bt = Physics3D._bullet;
        var applyForce = bt.btJointFeedback_getAppliedForceBodyA(this._btJointFeedBackObj);
        var applyTorque = bt.btJointFeedback_getAppliedTorqueBodyA(this._btJointFeedBackObj);
        this._currentTorque.setValue(bt.btVector3_x(applyTorque), bt.btVector3_y(applyTorque), bt.btVector3_z(applyTorque));
        this._currentForce.setValue(bt.btVector3_x(applyForce), bt.btVector3_y(applyForce), bt.btVector3_z(applyForce));
        this._getJointFeedBack = true;
    }
    _breakConstrained() {
        this.destroy();
    }
}
ConstraintComponent.CONSTRAINT_POINT2POINT_CONSTRAINT_TYPE = 3;
ConstraintComponent.CONSTRAINT_HINGE_CONSTRAINT_TYPE = 4;
ConstraintComponent.CONSTRAINT_CONETWIST_CONSTRAINT_TYPE = 5;
ConstraintComponent.CONSTRAINT_D6_CONSTRAINT_TYPE = 6;
ConstraintComponent.CONSTRAINT_SLIDER_CONSTRAINT_TYPE = 7;
ConstraintComponent.CONSTRAINT_CONTACT_CONSTRAINT_TYPE = 8;
ConstraintComponent.CONSTRAINT_D6_SPRING_CONSTRAINT_TYPE = 9;
ConstraintComponent.CONSTRAINT_GEAR_CONSTRAINT_TYPE = 10;
ConstraintComponent.CONSTRAINT_FIXED_CONSTRAINT_TYPE = 11;
ConstraintComponent.CONSTRAINT_MAX_CONSTRAINT_TYPE = 12;
ConstraintComponent.CONSTRAINT_CONSTRAINT_ERP = 1;
ConstraintComponent.CONSTRAINT_CONSTRAINT_STOP_ERP = 2;
ConstraintComponent.CONSTRAINT_CONSTRAINT_CFM = 3;
ConstraintComponent.CONSTRAINT_CONSTRAINT_STOP_CFM = 4;
ConstraintComponent.tempForceV3 = new Vector3();

//# sourceMappingURL=ConstraintComponent.js.map
