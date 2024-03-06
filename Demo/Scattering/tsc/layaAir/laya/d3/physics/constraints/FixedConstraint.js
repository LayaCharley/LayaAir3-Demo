import { ConstraintComponent } from "./ConstraintComponent";
import { Rigidbody3D } from "../Rigidbody3D";
import { Physics3D } from "../../Physics3D";
export class FixedConstraint extends ConstraintComponent {
    constructor() {
        super(ConstraintComponent.CONSTRAINT_FIXED_CONSTRAINT_TYPE);
        this.breakForce = -1;
        this.breakTorque = -1;
    }
    _addToSimulation() {
        this._simulation && this._simulation.addConstraint(this, this.disableCollisionsBetweenLinkedBodies);
    }
    _removeFromSimulation() {
        this._simulation.removeConstraint(this);
        this._simulation = null;
    }
    _createConstraint() {
        if (this.ownBody && this.ownBody._simulation && this.connectedBody && this.connectedBody._simulation) {
            var bt = Physics3D._bullet;
            this._btConstraint = bt.btFixedConstraint_create(this.ownBody.btColliderObject, this._btframATrans, this.connectedBody.btColliderObject, this._btframBTrans);
            this._btJointFeedBackObj = bt.btJointFeedback_create(this._btConstraint);
            bt.btTypedConstraint_setJointFeedback(this._btConstraint, this._btJointFeedBackObj);
            bt.btTypedConstraint_setEnabled(this._btConstraint, true);
            this._simulation = this.getPhysicsSimulation();
            this._addToSimulation();
        }
    }
    _onEnable() {
        if (this._btConstraint)
            Physics3D._bullet.btTypedConstraint_setEnabled(this._btConstraint, true);
    }
    _onDisable() {
        if (!this.connectedBody)
            this._removeFromSimulation();
        if (this._btConstraint)
            Physics3D._bullet.btTypedConstraint_setEnabled(this._btConstraint, false);
    }
    _parse(data, interactMap = null) {
        super._parse(data);
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

//# sourceMappingURL=FixedConstraint.js.map
