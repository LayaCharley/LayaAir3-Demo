import { JointBase } from "./JointBase";
import { Event } from "../../events/Event";
import { Point } from "../../maths/Point";
import { Physics } from "../Physics";
import { RigidBody } from "../RigidBody";
import { ILaya } from "../../../ILaya";
export class MouseJoint extends JointBase {
    constructor() {
        super(...arguments);
        this._maxForce = 10000;
        this._frequency = 5;
        this._dampingRatio = 0.7;
    }
    _onEnable() {
        super._onEnable();
        this.owner.on(Event.MOUSE_DOWN, this, this.onMouseDown);
    }
    onMouseDown() {
        this._createJoint();
        ILaya.stage.on(Event.MOUSE_MOVE, this, this.onMouseMove);
        ILaya.stage.once(Event.MOUSE_UP, this, this.onStageMouseUp);
        ILaya.stage.once(Event.MOUSE_OUT, this, this.onStageMouseUp);
    }
    _createJoint() {
        if (!this._joint) {
            this.selfBody = this.selfBody || this.owner.getComponent(RigidBody);
            if (!this.selfBody)
                throw "selfBody can not be empty";
            var box2d = window.box2d;
            var def = MouseJoint._temp || (MouseJoint._temp = new box2d.b2MouseJointDef());
            if (this.anchor) {
                var anchorPos = this.selfBody.owner.localToGlobal(Point.TEMP.setTo(this.anchor[0], this.anchor[1]), false, Physics.I.worldRoot);
            }
            else {
                anchorPos = Physics.I.worldRoot.globalToLocal(Point.TEMP.setTo(ILaya.stage.mouseX, ILaya.stage.mouseY));
            }
            var anchorVec = new box2d.b2Vec2(anchorPos.x / Physics.PIXEL_RATIO, anchorPos.y / Physics.PIXEL_RATIO);
            def.bodyA = Physics.I._emptyBody;
            def.bodyB = this.selfBody.getBody();
            def.target = anchorVec;
            box2d.b2LinearStiffness(def, this._frequency, this._dampingRatio, def.bodyA, def.bodyB);
            def.maxForce = this._maxForce;
            this._joint = Physics.I._createJoint(def);
        }
    }
    onStageMouseUp() {
        ILaya.stage.off(Event.MOUSE_MOVE, this, this.onMouseMove);
        ILaya.stage.off(Event.MOUSE_UP, this, this.onStageMouseUp);
        ILaya.stage.off(Event.MOUSE_OUT, this, this.onStageMouseUp);
        super._onDisable();
    }
    onMouseMove() {
        this._joint.SetTarget(new window.box2d.b2Vec2(Physics.I.worldRoot.mouseX / Physics.PIXEL_RATIO, Physics.I.worldRoot.mouseY / Physics.PIXEL_RATIO));
    }
    _onDisable() {
        super._onDisable();
        this.owner.off(Event.MOUSE_DOWN, this, this.onMouseDown);
    }
    get maxForce() {
        return this._maxForce;
    }
    set maxForce(value) {
        this._maxForce = value;
        if (this._joint)
            this._joint.SetMaxForce(value);
    }
    get frequency() {
        return this._frequency;
    }
    set frequency(value) {
        this._frequency = value;
        if (this._joint) {
            let out = {};
            let box2d = window.box2d;
            let bodyA = Physics.I._emptyBody;
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
            let bodyA = Physics.I._emptyBody;
            let bodyB = this.selfBody.getBody();
            box2d.b2LinearStiffness(out, this._frequency, this._dampingRatio, bodyA, bodyB);
            this._joint.SetDamping(out.damping);
        }
    }
}

//# sourceMappingURL=MouseJoint.js.map
