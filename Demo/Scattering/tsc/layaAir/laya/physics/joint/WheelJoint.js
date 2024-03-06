import { JointBase } from "./JointBase";
import { Point } from "../../maths/Point";
import { Physics } from "../Physics";
import { RigidBody } from "../RigidBody";
export class WheelJoint extends JointBase {
    constructor() {
        super(...arguments);
        this.anchor = [0, 0];
        this.collideConnected = false;
        this.axis = [1, 0];
        this._frequency = 5;
        this._dampingRatio = 0.7;
        this._enableMotor = false;
        this._motorSpeed = 0;
        this._maxMotorTorque = 10000;
        this._enableLimit = true;
        this._lowerTranslation = 0;
        this._upperTranslation = 0;
    }
    _createJoint() {
        if (!this._joint) {
            if (!this.otherBody)
                throw "otherBody can not be empty";
            this.selfBody = this.selfBody || this.owner.getComponent(RigidBody);
            if (!this.selfBody)
                throw "selfBody can not be empty";
            var box2d = window.box2d;
            var def = WheelJoint._temp || (WheelJoint._temp = new box2d.b2WheelJointDef());
            var anchorPos = this.selfBody.owner.localToGlobal(Point.TEMP.setTo(this.anchor[0], this.anchor[1]), false, Physics.I.worldRoot);
            var anchorVec = new box2d.b2Vec2(anchorPos.x / Physics.PIXEL_RATIO, anchorPos.y / Physics.PIXEL_RATIO);
            def.Initialize(this.otherBody.getBody(), this.selfBody.getBody(), anchorVec, new box2d.b2Vec2(this.axis[0], this.axis[1]));
            def.enableMotor = this._enableMotor;
            def.motorSpeed = this._motorSpeed;
            def.maxMotorTorque = this._maxMotorTorque;
            box2d.b2LinearStiffness(def, this._frequency, this._dampingRatio, def.bodyA, def.bodyB);
            def.collideConnected = this.collideConnected;
            def.enableLimit = this._enableLimit;
            def.lowerTranslation = this._lowerTranslation / Physics.PIXEL_RATIO;
            def.upperTranslation = this._upperTranslation / Physics.PIXEL_RATIO;
            this._joint = Physics.I._createJoint(def);
        }
    }
    get frequency() {
        return this._frequency;
    }
    set frequency(value) {
        this._frequency = value;
        if (this._joint) {
            let out = {};
            let box2d = window.box2d;
            let bodyA = this.otherBody ? this.otherBody.getBody() : Physics.I._emptyBody;
            let bodyB = this.selfBody.getBody();
            box2d.b2LinearStiffness(out, this._frequency, this._dampingRatio, bodyA, bodyB);
            this._joint.SetStiffness(out.stiffness);
            this._joint.SetDamping(out.damping);
        }
    }
    get damping() {
        return this._dampingRatio;
    }
    set damping(value) {
        this._dampingRatio = value;
        if (this._joint) {
            let out = {};
            let box2d = window.box2d;
            let bodyA = this.otherBody ? this.otherBody.getBody() : Physics.I._emptyBody;
            let bodyB = this.selfBody.getBody();
            box2d.b2LinearStiffness(out, this._frequency, this._dampingRatio, bodyA, bodyB);
            this._joint.SetDamping(out.damping);
        }
    }
    get enableMotor() {
        return this._enableMotor;
    }
    set enableMotor(value) {
        this._enableMotor = value;
        if (this._joint)
            this._joint.EnableMotor(value);
    }
    get motorSpeed() {
        return this._motorSpeed;
    }
    set motorSpeed(value) {
        this._motorSpeed = value;
        if (this._joint)
            this._joint.SetMotorSpeed(value);
    }
    get maxMotorTorque() {
        return this._maxMotorTorque;
    }
    set maxMotorTorque(value) {
        this._maxMotorTorque = value;
        if (this._joint)
            this._joint.SetMaxMotorTorque(value);
    }
    get enableLimit() {
        return this._enableLimit;
    }
    set enableLimit(value) {
        this._enableLimit = value;
        if (this._joint)
            this._joint.EnableLimit(value);
    }
    get lowerTranslation() {
        return this._lowerTranslation;
    }
    set lowerTranslation(value) {
        this._lowerTranslation = value;
        if (this._joint)
            this._joint.SetLimits(value, this._upperTranslation);
    }
    get upperTranslation() {
        return this._upperTranslation;
    }
    set upperTranslation(value) {
        this._upperTranslation = value;
        if (this._joint)
            this._joint.SetLimits(this._lowerTranslation, value);
    }
}

//# sourceMappingURL=WheelJoint.js.map
