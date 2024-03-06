import { JointBase } from "./JointBase";
import { Point } from "../../maths/Point";
import { Physics } from "../Physics";
import { RigidBody } from "../RigidBody";
export class WeldJoint extends JointBase {
    constructor() {
        super(...arguments);
        this.anchor = [0, 0];
        this.collideConnected = false;
        this._frequency = 5;
        this._dampingRatio = 0.7;
    }
    _createJoint() {
        if (!this._joint) {
            if (!this.otherBody)
                throw "otherBody can not be empty";
            this.selfBody = this.selfBody || this.owner.getComponent(RigidBody);
            if (!this.selfBody)
                throw "selfBody can not be empty";
            var box2d = window.box2d;
            var def = WeldJoint._temp || (WeldJoint._temp = new box2d.b2WeldJointDef());
            var anchorPos = this.selfBody.owner.localToGlobal(Point.TEMP.setTo(this.anchor[0], this.anchor[1]), false, Physics.I.worldRoot);
            var anchorVec = new box2d.b2Vec2(anchorPos.x / Physics.PIXEL_RATIO, anchorPos.y / Physics.PIXEL_RATIO);
            def.Initialize(this.otherBody.getBody(), this.selfBody.getBody(), anchorVec);
            box2d.b2AngularStiffness(def, this._frequency, this._dampingRatio, def.bodyA, def.bodyB);
            def.collideConnected = this.collideConnected;
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
            box2d.b2AngularStiffness(out, this._frequency, this._dampingRatio, bodyA, bodyB);
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
            box2d.b2AngularStiffness(out, this._frequency, this._dampingRatio, bodyA, bodyB);
            this._joint.SetDamping(out.damping);
        }
    }
}

//# sourceMappingURL=WeldJoint.js.map
