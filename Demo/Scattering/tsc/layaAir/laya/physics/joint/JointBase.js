import { Component } from "../../components/Component";
import { Physics } from "../Physics";
export class JointBase extends Component {
    constructor() {
        super();
        this._singleton = false;
    }
    get joint() {
        if (!this._joint)
            this._createJoint();
        return this._joint;
    }
    _onEnable() {
        this._createJoint();
    }
    _onAwake() {
        this._createJoint();
    }
    _createJoint() {
    }
    _onDisable() {
        if (this._joint && this._joint.m_userData && !this._joint.m_userData.isDestroy) {
            Physics.I._removeJoint(this._joint);
        }
        this._joint = null;
    }
}

//# sourceMappingURL=JointBase.js.map
