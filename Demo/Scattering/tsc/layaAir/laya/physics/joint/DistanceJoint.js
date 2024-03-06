import { JointBase } from "./JointBase";
import { Physics } from "../Physics";
import { RigidBody } from "../RigidBody";
export class DistanceJoint extends JointBase {
    constructor() {
        super(...arguments);
        this.selfAnchor = [0, 0];
        this.otherAnchor = [0, 0];
        this.collideConnected = false;
        this._length = 0;
        this._maxLength = -1;
        this._minLength = -1;
        this._frequency = 1;
        this._dampingRatio = 0;
    }
    _createJoint() {
        if (!this._joint) {
            this.selfBody = this.selfBody || this.owner.getComponent(RigidBody);
            if (!this.selfBody)
                throw "selfBody can not be empty";
            var box2d = window.box2d;
            var def = DistanceJoint._temp || (DistanceJoint._temp = new box2d.b2DistanceJointDef());
            def.bodyA = this.otherBody ? this.otherBody.getBody() : Physics.I._emptyBody;
            def.bodyB = this.selfBody.getBody();
            def.localAnchorA.Set(this.otherAnchor[0] / Physics.PIXEL_RATIO, this.otherAnchor[1] / Physics.PIXEL_RATIO);
            def.localAnchorB.Set(this.selfAnchor[0] / Physics.PIXEL_RATIO, this.selfAnchor[1] / Physics.PIXEL_RATIO);
            box2d.b2LinearStiffness(def, this._frequency, this._dampingRatio, def.bodyA, def.bodyB);
            def.collideConnected = this.collideConnected;
            var p1 = def.bodyA.GetWorldPoint(def.localAnchorA, new box2d.b2Vec2());
            var p2 = def.bodyB.GetWorldPoint(def.localAnchorB, new box2d.b2Vec2());
            def.length = this._length / Physics.PIXEL_RATIO || box2d.b2Vec2.SubVV(p2, p1, new box2d.b2Vec2()).Length();
            def.maxLength = box2d.b2_maxFloat;
            def.minLength = 0;
            if (this._maxLength >= 0)
                def.maxLength = this._maxLength / Physics.PIXEL_RATIO;
            if (this._minLength >= 0)
                def.minLength = this._minLength / Physics.PIXEL_RATIO;
            this._joint = Physics.I._createJoint(def);
        }
    }
    get length() {
        return this._length;
    }
    set length(value) {
        this._length = value;
        if (this._joint)
            this._joint.SetLength(value / Physics.PIXEL_RATIO);
    }
    get minLength() {
        return this._minLength;
    }
    set minLength(value) {
        this._minLength = value;
        if (this._joint)
            this._joint.SetMinLength(value / Physics.PIXEL_RATIO);
    }
    get maxLength() {
        return this._maxLength;
    }
    set maxLength(value) {
        this._maxLength = value;
        if (this._joint)
            this._joint.SetMaxLength(value / Physics.PIXEL_RATIO);
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
}

//# sourceMappingURL=DistanceJoint.js.map
