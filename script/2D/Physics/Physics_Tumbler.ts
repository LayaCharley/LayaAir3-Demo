import { BaseScript } from "../../BaseScript";

import BoxCollider = Laya.BoxCollider;
import Sprite = Laya.Sprite;
import Event = Laya.Event;
import RigidBody = Laya.RigidBody;
import RevoluteJoint = Laya.RevoluteJoint;
import Label = Laya.Label;

const { regClass, property } = Laya;

@regClass()
export class Physics_Tumbler extends BaseScript {

    private count = 0;
    private box: Sprite;
    private totalBox = 200;
    private label: Label;

    constructor() {
        super();
    }

    onStart(): void {

        super.base();

        Laya.Config.isAntialias = true;
        Laya.Physics2D.I.start();
        Laya.Physics2D.I.enableDebugDraw = true;

        this.createBox();
        this.eventListener();
    }

    createBox() {
        const width = 300, height = 20;
        const
            posx = this.pageWidth / 2,
            posy = this.pageHeight / 2;

        let box = this.box = new Sprite();
        box.size(width + height * 2, width + height * 2);
        box.pos(posx, posy);
        box.anchorX = 0.5;
        box.anchorY = 0.5;
        this.box2D.addChild(box);
        let boxBody: RigidBody = box.addComponent(RigidBody);

        let box1Shape: BoxCollider = box.addComponent(BoxCollider);
        let box2Shape: BoxCollider = box.addComponent(BoxCollider);
        let box3Shape: BoxCollider = box.addComponent(BoxCollider);
        let box4Shape: BoxCollider = box.addComponent(BoxCollider);
        box1Shape.width = width + height * 2;
        box1Shape.height = height;
        box1Shape.x = 0;
        box1Shape.y = 0;
        box2Shape.width = width + height * 2;
        box2Shape.height = height;
        box2Shape.x = 0;
        box2Shape.y = width + height;
        box3Shape.width = height;
        box3Shape.height = width + height * 2;
        box3Shape.x = 0;
        box3Shape.y = 0;
        box4Shape.width = height;
        box4Shape.height = width + height * 2;
        box4Shape.x = width + height;
        box4Shape.y = 0;

        let revoluteJoint = new RevoluteJoint();
        revoluteJoint.anchor = [box.width / 2, box.width / 2];
        revoluteJoint.motorSpeed = 0.05 * Math.PI;
        revoluteJoint.maxMotorTorque = 1e8;
        revoluteJoint.enableMotor = true;
        box.addComponentInstance(revoluteJoint);
    }

    addMiniBox() {
        if (this.count >= this.totalBox) {
            return;
        }

        let sp = new Sprite();
        this.box2D.addChild(sp);
        sp.x = this.box.x;
        sp.y = this.box.y;
        let boxBody = sp.addComponent(RigidBody);
        boxBody.type = "dynamic";
        let collider = sp.addComponent(BoxCollider);
        collider.width = 5;
        collider.height = 5;
        this.count++;
    }

    eventListener() {
        let label: Label = this.label = this.box2D.addChild(new Label("双击屏幕，将会产生100个新的小刚体")) as Label;
        label.top = 20;
        label.right = 20;
        label.fontSize = 16;
        label.color = "#e69999";
        this.box2D.on(Event.DOUBLE_CLICK, this, () => {
            this.totalBox += 100;
        });
        Laya.timer.frameLoop(1, this, this.addMiniBox);
    }

    onDestroy(): void {
        if (this.box2D) {
            this.box2D.offAll(Event.DOUBLE_CLICK);
            this.box2D.removeChild(this.label);
        }
        Laya.Physics2D.I.destroyWorld();
    }
}