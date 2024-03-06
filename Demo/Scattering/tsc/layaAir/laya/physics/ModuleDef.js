import { ClassUtils } from "../utils/ClassUtils";
import { BoxCollider } from "./BoxCollider";
import { ChainCollider } from "./ChainCollider";
import { CircleCollider } from "./CircleCollider";
import { ColliderBase } from "./ColliderBase";
import { EdgeCollider } from "./EdgeCollider";
import { DistanceJoint } from "./joint/DistanceJoint";
import { GearJoint } from "./joint/GearJoint";
import { JointBase } from "./joint/JointBase";
import { MotorJoint } from "./joint/MotorJoint";
import { MouseJoint } from "./joint/MouseJoint";
import { PrismaticJoint } from "./joint/PrismaticJoint";
import { PulleyJoint } from "./joint/PulleyJoint";
import { RevoluteJoint } from "./joint/RevoluteJoint";
import { WeldJoint } from "./joint/WeldJoint";
import { WheelJoint } from "./joint/WheelJoint";
import { Physics } from "./Physics";
import { PhysicsDebugDraw } from "./PhysicsDebugDraw";
import { PolygonCollider } from "./PolygonCollider";
import { RigidBody } from "./RigidBody";
let c = ClassUtils.regClass;
c("Physics", Physics);
c("PhysicsDebugDraw", PhysicsDebugDraw);
c("ColliderBase", ColliderBase);
c("BoxCollider", BoxCollider);
c("ChainCollider", ChainCollider);
c("CircleCollider", CircleCollider);
c("EdgeCollider", EdgeCollider);
c("PolygonCollider", PolygonCollider);
c("RigidBody", RigidBody);
c("JointBase", JointBase);
c("DistanceJoint", DistanceJoint);
c("GearJoint", GearJoint);
c("MotorJoint", MotorJoint);
c("MouseJoint", MouseJoint);
c("PrismaticJoint", PrismaticJoint);
c("PulleyJoint", PulleyJoint);
c("RevoluteJoint", RevoluteJoint);
c("WeldJoint", WeldJoint);
c("WheelJoint", WheelJoint);

//# sourceMappingURL=ModuleDef.js.map
