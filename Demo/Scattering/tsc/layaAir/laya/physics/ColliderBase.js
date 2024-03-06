import { ILaya } from "../../ILaya";
import { Component } from "../components/Component";
import { RigidBody } from "./RigidBody";
export class ColliderBase extends Component {
    constructor() {
        super();
        this._isSensor = false;
        this._density = 10;
        this._friction = 0.2;
        this._restitution = 0;
        this._singleton = false;
    }
    getDef() {
        if (!this._def) {
            var def = new window.box2d.b2FixtureDef();
            def.density = this.density;
            def.friction = this.friction;
            def.isSensor = this.isSensor;
            def.restitution = this.restitution;
            def.shape = this._shape;
            this._def = def;
        }
        return this._def;
    }
    _onEnable() {
        if (this.rigidBody)
            this.refresh();
        else
            ILaya.systemTimer.callLater(this, this._checkRigidBody);
    }
    _checkRigidBody() {
        if (!this.rigidBody) {
            var comp = this.owner.getComponent(RigidBody);
            if (comp) {
                this.rigidBody = comp;
                this.refresh();
            }
        }
    }
    _onDestroy() {
        if (this.rigidBody) {
            if (this.fixture) {
                if (this.fixture.GetBody() == this.rigidBody._getOriBody()) {
                    this.rigidBody.body.DestroyFixture(this.fixture);
                }
                this.fixture = null;
            }
            this.rigidBody = null;
            this._shape = null;
            this._def = null;
        }
    }
    get isSensor() {
        return this._isSensor;
    }
    set isSensor(value) {
        this._isSensor = value;
        if (this._def) {
            this._def.isSensor = value;
            this.refresh();
        }
    }
    get density() {
        return this._density;
    }
    set density(value) {
        this._density = value;
        if (this._def) {
            this._def.density = value;
            this.refresh();
        }
    }
    get friction() {
        return this._friction;
    }
    set friction(value) {
        this._friction = value;
        if (this._def) {
            this._def.friction = value;
            this.refresh();
        }
    }
    get restitution() {
        return this._restitution;
    }
    set restitution(value) {
        this._restitution = value;
        if (this._def) {
            this._def.restitution = value;
            this.refresh();
        }
    }
    refresh() {
        if (this.enabled && this.rigidBody) {
            var body = this.rigidBody.body;
            if (this.fixture) {
                if (this.fixture.GetBody() == this.rigidBody.body) {
                    this.rigidBody.body.DestroyFixture(this.fixture);
                }
                this.fixture.Destroy();
                this.fixture = null;
            }
            var def = this.getDef();
            def.filter.groupIndex = this.rigidBody.group;
            def.filter.categoryBits = this.rigidBody.category;
            def.filter.maskBits = this.rigidBody.mask;
            this.fixture = body.CreateFixture(def);
            this.fixture.collider = this;
        }
    }
    resetShape(re = true) {
    }
}

//# sourceMappingURL=ColliderBase.js.map
