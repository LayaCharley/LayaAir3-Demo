import { Config } from "Config";
import { Laya } from "Laya";
import { Sprite } from "laya/display/Sprite";
import { Stage } from "laya/display/Stage";
import { Event } from "laya/events/Event";
import { BoxCollider } from "laya/physics/BoxCollider";
import { ChainCollider } from "laya/physics/ChainCollider";
import { CircleCollider } from "laya/physics/CircleCollider";
import { MouseJoint } from "laya/physics/joint/MouseJoint";
import { Physics } from "laya/physics/Physics";
import { PhysicsDebugDraw } from "laya/physics/PhysicsDebugDraw";
import { PolygonCollider } from "laya/physics/PolygonCollider";
import { RigidBody } from "laya/physics/RigidBody";
import { Stat } from "laya/utils/Stat";
/**
 * 碰撞过滤器
 */
export class Physics_CollisionFiltering {
    constructor(maincls) {
        this.Main = null;
        this.preMovementX = 0;
        this.preMovementY = 0;
        this.Main = maincls;
        Config.isAntialias = true;
        Laya.init(1200, 700).then(() => {
            Stat.show();
            Physics.enable();
            PhysicsDebugDraw.enable();
            Laya.stage.alignV = Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Stage.ALIGN_CENTER;
            Laya.stage.scaleMode = Stage.SCALE_FIXED_AUTO;
            Laya.stage.bgColor = "#232628";
            this.createHouse();
            for (let i = 1; i <= 3; i++) {
                this.createBox(300, 300, 20, 20, i);
                this.createTriangle(500, 300, 20, i);
                this.createCircle(700, 300, 10, i);
            }
        });
    }
    createHouse() {
        let house = new Sprite();
        this.Main.box2D.addChild(house);
        let rigidbody = house.addComponent(RigidBody);
        rigidbody.type = "static";
        let chainCollider = house.addComponent(ChainCollider);
        chainCollider.loop = true;
        chainCollider.points = "600,50,100,200,100,600,1100,600,1100,200";
    }
    createBox(posx, posy, width, height, ratio) {
        let box = new Sprite();
        box.on(Event.MOUSE_DOWN, this, this.mouseDown);
        this.Main.box2D.addChild(box);
        box.pos(posx, posy).size(width * ratio, height * ratio);
        let rigidbody = box.addComponent(RigidBody);
        rigidbody.category = Physics_CollisionFiltering.k_boxCategory;
        rigidbody.mask = Physics_CollisionFiltering.k_boxMask;
        let boxCollider = box.addComponent(BoxCollider);
        boxCollider.width = width * ratio;
        boxCollider.height = height * ratio;
        this.addGroup(rigidbody, ratio);
    }
    createTriangle(posx, posy, side, ratio) {
        let triangle = new Sprite();
        triangle.on(Event.MOUSE_DOWN, this, this.mouseDown);
        this.Main.box2D.addChild(triangle);
        triangle.pos(posx, posy).size(side * ratio, side * ratio);
        let rigidbody = triangle.addComponent(RigidBody);
        rigidbody.category = Physics_CollisionFiltering.k_triangleCategory;
        rigidbody.mask = Physics_CollisionFiltering.k_triangleMask;
        let polygonCollider = triangle.addComponent(PolygonCollider);
        polygonCollider.points = `0,0,0,${side * ratio},${side * ratio},0`;
        this.addGroup(rigidbody, ratio);
    }
    createCircle(posx, posy, radius, ratio) {
        let circle = new Sprite();
        circle.on(Event.MOUSE_DOWN, this, this.mouseDown);
        this.Main.box2D.addChild(circle);
        circle.pos(posx, posy).size(radius * 2 * ratio, radius * 2 * ratio);
        let rigidbody = circle.addComponent(RigidBody);
        rigidbody.category = Physics_CollisionFiltering.k_circleCategory;
        rigidbody.mask = Physics_CollisionFiltering.k_circleMask;
        let circleCollider = circle.addComponent(CircleCollider);
        circleCollider.radius = radius * ratio;
        this.addGroup(rigidbody, ratio);
    }
    addGroup(rigidbody, ratio) {
        switch (ratio) {
            case 1:
                rigidbody.group = Physics_CollisionFiltering.k_smallGroup;
                break;
            case 2:
                rigidbody.group = Physics_CollisionFiltering.k_middleGroup;
                break;
            case 3:
                rigidbody.group = Physics_CollisionFiltering.k_largeGroup;
                break;
        }
    }
    mouseDown(e) {
        this.curTarget = e.target;
        // 方案一，使用 MouseJoint
        let mouseJoint = this.curTarget.addComponent(MouseJoint);
        Laya.timer.callLater(mouseJoint, mouseJoint.onMouseDown);
        Laya.stage.on(Event.MOUSE_UP, this, this.destoryJoint);
        Laya.stage.on(Event.MOUSE_OUT, this, this.destoryJoint);
        // 方案二，自己实现，可以实现更大程度的控制
        // Laya.stage.on(Event.MOUSE_MOVE, this, this.mouseMove);
        // Laya.stage.on(Event.MOUSE_UP, this, this.mouseUp);
        // Laya.stage.on(Event.MOUSE_OUT, this, this.mouseUp);
        // let rigidbody = this.curTarget.getComponent(RigidBody);
        // rigidbody.type = "kinematic";
    }
    mouseMove(e) {
        let movementX = e.nativeEvent.movementX;
        let movementY = e.nativeEvent.movementY;
        this.preMovementX = movementX;
        this.preMovementY = movementY;
        this.curTarget.pos(Laya.stage.mouseX, Laya.stage.mouseY);
    }
    mouseUp() {
        Laya.stage.off(Event.MOUSE_MOVE, this, this.mouseMove);
        Laya.stage.off(Event.MOUSE_UP, this, this.mouseUp);
        Laya.stage.off(Event.MOUSE_OUT, this, this.mouseUp);
        let rigidbody = this.curTarget.getComponent(RigidBody);
        rigidbody.type = "dynamic";
        rigidbody.linearVelocity = [this.preMovementX, this.preMovementY];
        this.curTarget = null;
    }
    destoryJoint() {
        Laya.stage.off(Event.MOUSE_UP, this, this.destoryJoint);
        Laya.stage.off(Event.MOUSE_OUT, this, this.destoryJoint);
        let mouseJoint = this.curTarget.getComponent(MouseJoint);
        mouseJoint.destroy();
        this.curTarget = null;
    }
    dispose() {
        Laya.stage.off(Event.MOUSE_MOVE, this, this.mouseMove);
        Laya.stage.off(Event.MOUSE_UP, this, this.mouseUp);
        Laya.stage.off(Event.MOUSE_OUT, this, this.mouseUp);
        Laya.stage.off(Event.MOUSE_UP, this, this.destoryJoint);
        Laya.stage.off(Event.MOUSE_OUT, this, this.destoryJoint);
    }
}
Physics_CollisionFiltering.k_smallGroup = 1;
Physics_CollisionFiltering.k_middleGroup = 0;
Physics_CollisionFiltering.k_largeGroup = -1;
Physics_CollisionFiltering.k_triangleCategory = 0x2;
Physics_CollisionFiltering.k_boxCategory = 0x4;
Physics_CollisionFiltering.k_circleCategory = 0x8;
Physics_CollisionFiltering.k_triangleMask = 0xF;
Physics_CollisionFiltering.k_boxMask = 0xF ^ Physics_CollisionFiltering.k_circleCategory;
Physics_CollisionFiltering.k_circleMask = Physics_CollisionFiltering.k_triangleCategory | Physics_CollisionFiltering.k_boxCategory | 0x01; // 0x01为house刚体默认的category，若不设置，则会穿透house
