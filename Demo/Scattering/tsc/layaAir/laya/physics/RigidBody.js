import { ColliderBase } from "./ColliderBase";
import { Component } from "../components/Component";
import { Point } from "../maths/Point";
import { Utils } from "../utils/Utils";
import { Physics } from "./Physics";
export class RigidBody extends Component {
    constructor() {
        super(...arguments);
        this._type = "dynamic";
        this._allowSleep = true;
        this._angularVelocity = 0;
        this._angularDamping = 0;
        this._linearVelocity = { x: 0, y: 0 };
        this._linearDamping = 0;
        this._bullet = false;
        this._allowRotation = true;
        this._gravityScale = 1;
        this.group = 0;
        this.category = 1;
        this.mask = -1;
        this.label = "RigidBody";
    }
    _createBody() {
        if (this._body || !this.owner)
            return;
        var sp = this.owner;
        var box2d = window.box2d;
        var def = new box2d.b2BodyDef();
        var point = sp.localToGlobal(Point.TEMP.setTo(0, 0), false, Physics.I.worldRoot);
        def.position.Set(point.x / Physics.PIXEL_RATIO, point.y / Physics.PIXEL_RATIO);
        def.angle = Utils.toRadian(sp.rotation);
        def.allowSleep = this._allowSleep;
        def.angularDamping = this._angularDamping;
        def.angularVelocity = this._angularVelocity;
        def.bullet = this._bullet;
        def.fixedRotation = !this._allowRotation;
        def.gravityScale = this._gravityScale;
        def.linearDamping = this._linearDamping;
        var obj = this._linearVelocity;
        if (obj && obj.x != 0 || obj.y != 0) {
            def.linearVelocity = new box2d.b2Vec2(obj.x, obj.y);
        }
        def.type = box2d.b2BodyType["b2_" + this._type + "Body"];
        this._body = Physics.I._createBody(def);
        this.resetCollider(false);
    }
    _onAwake() {
        this._createBody();
    }
    _onEnable() {
        var _$this = this;
        this._createBody();
        var sp = this.owner;
        if (this.accessGetSetFunc(sp, "x", "set") && !sp._changeByRigidBody) {
            sp._changeByRigidBody = true;
            function setX(value) {
                _$this.accessGetSetFunc(sp, "x", "set")(value);
                _$this._sysPosToPhysic();
            }
            this._overSet(sp, "x", setX);
            function setY(value) {
                _$this.accessGetSetFunc(sp, "y", "set")(value);
                _$this._sysPosToPhysic();
            }
            ;
            this._overSet(sp, "y", setY);
            function setRotation(value) {
                _$this.accessGetSetFunc(sp, "rotation", "set")(value);
                _$this._sysNodeToPhysic();
            }
            ;
            this._overSet(sp, "rotation", setRotation);
            function setScaleX(value) {
                _$this.accessGetSetFunc(sp, "scaleX", "set")(value);
                _$this.resetCollider(true);
            }
            ;
            this._overSet(sp, "scaleX", setScaleX);
            function setScaleY(value) {
                _$this.accessGetSetFunc(sp, "scaleY", "set")(value);
                _$this.resetCollider(true);
            }
            ;
            this._overSet(sp, "scaleY", setScaleY);
        }
    }
    accessGetSetFunc(obj, prop, accessor) {
        if (["get", "set"].indexOf(accessor) === -1) {
            return;
        }
        let privateProp = `_$${accessor}_${prop}`;
        if (obj[privateProp]) {
            return obj[privateProp];
        }
        let ObjConstructor = obj.constructor;
        let des;
        while (ObjConstructor) {
            des = Object.getOwnPropertyDescriptor(ObjConstructor.prototype, prop);
            if (des && des[accessor]) {
                obj[privateProp] = des[accessor].bind(obj);
                break;
            }
            ObjConstructor = Object.getPrototypeOf(ObjConstructor);
        }
        return obj[privateProp];
    }
    resetCollider(resetShape) {
        var comps = this.owner.getComponents(ColliderBase);
        if (comps) {
            for (var i = 0, n = comps.length; i < n; i++) {
                var collider = comps[i];
                collider.rigidBody = this;
                if (resetShape)
                    collider.resetShape();
                else
                    collider.refresh();
            }
        }
    }
    onUpdate() {
        if (this.type != "static" && this._body.IsAwake()) {
            var pos = this._body.GetPosition();
            var ang = this._body.GetAngle();
            var sp = this.owner;
            this.accessGetSetFunc(sp, "rotation", "set")(Utils.toAngle(ang) - sp.parent.globalRotation);
            var point = sp.globalToLocal(Point.TEMP.setTo(pos.x * Physics.PIXEL_RATIO, pos.y * Physics.PIXEL_RATIO), false, Physics.I.worldRoot);
            point.x += sp.pivotX;
            point.y += sp.pivotY;
            point = sp.toParentPoint(point);
            this.accessGetSetFunc(sp, "x", "set")(point.x);
            this.accessGetSetFunc(sp, "y", "set")(point.y);
        }
    }
    _sysNodeToPhysic() {
        var sp = this.owner;
        this._body.SetAngle(Utils.toRadian(sp.rotation));
        var p = sp.localToGlobal(Point.TEMP.setTo(0, 0), false, Physics.I.worldRoot);
        this._body.SetPositionXY(p.x / Physics.PIXEL_RATIO, p.y / Physics.PIXEL_RATIO);
    }
    _sysPosToPhysic() {
        var sp = this.owner;
        var p = sp.localToGlobal(Point.TEMP.setTo(0, 0), false, Physics.I.worldRoot);
        this._body.SetPositionXY(p.x / Physics.PIXEL_RATIO, p.y / Physics.PIXEL_RATIO);
    }
    _overSet(sp, prop, getfun) {
        Object.defineProperty(sp, prop, { get: this.accessGetSetFunc(sp, prop, "get"), set: getfun, enumerable: false, configurable: true });
        ;
    }
    _onDisable() {
        this._body && Physics.I._removeBody(this._body);
        this._body = null;
        var owner = this.owner;
        if (owner._changeByRigidBody) {
            this._overSet(owner, "x", this.accessGetSetFunc(owner, "x", "set"));
            this._overSet(owner, "y", this.accessGetSetFunc(owner, "y", "set"));
            this._overSet(owner, "rotation", this.accessGetSetFunc(owner, "rotation", "set"));
            this._overSet(owner, "scaleX", this.accessGetSetFunc(owner, "scaleX", "set"));
            this._overSet(owner, "scaleY", this.accessGetSetFunc(owner, "scaleY", "set"));
            owner._changeByRigidBody = false;
        }
    }
    getBody() {
        if (!this._body)
            this._onAwake();
        return this._body;
    }
    _getOriBody() {
        return this._body;
    }
    get body() {
        if (!this._body)
            this._onAwake();
        return this._body;
    }
    applyForce(position, force) {
        if (!this._body)
            this._onAwake();
        this._body.ApplyForce(force, position);
    }
    applyForceToCenter(force) {
        if (!this._body)
            this._onAwake();
        this._body.ApplyForceToCenter(force);
    }
    applyLinearImpulse(position, impulse) {
        if (!this._body)
            this._onAwake();
        this._body.ApplyLinearImpulse(impulse, position);
    }
    applyLinearImpulseToCenter(impulse) {
        if (!this._body)
            this._onAwake();
        this._body.ApplyLinearImpulseToCenter(impulse);
    }
    applyTorque(torque) {
        if (!this._body)
            this._onAwake();
        this._body.ApplyTorque(torque);
    }
    setVelocity(velocity) {
        if (!this._body)
            this._onAwake();
        this._body.SetLinearVelocity(velocity);
    }
    setAngle(value) {
        if (!this._body)
            this._onAwake();
        this._body.SetAngle(value);
        this._body.SetAwake(true);
    }
    getMass() {
        return this._body ? this._body.GetMass() : 0;
    }
    getCenter() {
        if (!this._body)
            this._onAwake();
        var p = this._body.GetLocalCenter();
        p.x = p.x * Physics.PIXEL_RATIO;
        p.y = p.y * Physics.PIXEL_RATIO;
        return p;
    }
    getWorldCenter() {
        if (!this._body)
            this._onAwake();
        var p = this._body.GetWorldCenter();
        p.x = p.x * Physics.PIXEL_RATIO;
        p.y = p.y * Physics.PIXEL_RATIO;
        return p;
    }
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
        if (this._body)
            this._body.SetType(window.box2d.b2BodyType["b2_" + this._type + "Body"]);
    }
    get gravityScale() {
        return this._gravityScale;
    }
    set gravityScale(value) {
        this._gravityScale = value;
        if (this._body)
            this._body.SetGravityScale(value);
    }
    get allowRotation() {
        return this._allowRotation;
    }
    set allowRotation(value) {
        this._allowRotation = value;
        if (this._body)
            this._body.SetFixedRotation(!value);
    }
    get allowSleep() {
        return this._allowSleep;
    }
    set allowSleep(value) {
        this._allowSleep = value;
        if (this._body)
            this._body.SetSleepingAllowed(value);
    }
    get angularDamping() {
        return this._angularDamping;
    }
    set angularDamping(value) {
        this._angularDamping = value;
        if (this._body)
            this._body.SetAngularDamping(value);
    }
    get angularVelocity() {
        if (this._body)
            return this._body.GetAngularVelocity();
        return this._angularVelocity;
    }
    set angularVelocity(value) {
        this._angularVelocity = value;
        if (this._body)
            this._body.SetAngularVelocity(value);
    }
    get linearDamping() {
        return this._linearDamping;
    }
    set linearDamping(value) {
        this._linearDamping = value;
        if (this._body)
            this._body.SetLinearDamping(value);
    }
    get linearVelocity() {
        if (this._body) {
            var vec = this._body.GetLinearVelocity();
            return { x: vec.x, y: vec.y };
        }
        return this._linearVelocity;
    }
    set linearVelocity(value) {
        if (!value)
            return;
        if (value instanceof Array) {
            value = { x: value[0], y: value[1] };
        }
        this._linearVelocity = value;
        if (this._body)
            this._body.SetLinearVelocity(new window.box2d.b2Vec2(value.x, value.y));
    }
    get bullet() {
        return this._bullet;
    }
    set bullet(value) {
        this._bullet = value;
        if (this._body)
            this._body.SetBullet(value);
    }
}

//# sourceMappingURL=RigidBody.js.map
