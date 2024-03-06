import { CharacterController } from "./physics/CharacterController";
import { PhysicsComponent } from "./physics/PhysicsComponent";
import { PhysicsSimulation } from "./physics/PhysicsSimulation";
import { Rigidbody3D } from "./physics/Rigidbody3D";
import { BoxColliderShape } from "./physics/shape/BoxColliderShape";
import { ColliderShape } from "./physics/shape/ColliderShape";
import { CompoundColliderShape } from "./physics/shape/CompoundColliderShape";
import { CylinderColliderShape } from "./physics/shape/CylinderColliderShape";
import { StaticPlaneColliderShape } from "./physics/shape/StaticPlaneColliderShape";
export class Physics3D {
    static __bulletinit__() {
        this._bullet = window.Physics3D;
        if (this._bullet) {
            StaticPlaneColliderShape.__init__();
            ColliderShape.__init__();
            CompoundColliderShape.__init__();
            PhysicsComponent.__init__();
            PhysicsSimulation.__init__();
            BoxColliderShape.__init__();
            CylinderColliderShape.__init__();
            CharacterController.__init__();
            Rigidbody3D.__init__();
        }
    }
}
Physics3D._bullet = null;
Physics3D._cannon = null;
Physics3D._enablePhysics = false;

//# sourceMappingURL=Physics3D.js.map
