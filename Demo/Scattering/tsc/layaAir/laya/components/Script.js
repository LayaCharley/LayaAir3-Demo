import { Component } from "./Component";
import { Event } from "../events/Event";
import { ILaya } from "../../ILaya";
export class Script extends Component {
    _isScript() {
        return true;
    }
    setupScript() {
        let owner = this.owner;
        let func;
        if (func = this.onTriggerEnter)
            owner.on(Event.TRIGGER_ENTER, this, func);
        if (func = this.onTriggerStay)
            owner.on(Event.TRIGGER_STAY, this, func);
        if (func = this.onTriggerExit)
            owner.on(Event.TRIGGER_EXIT, this, func);
        if (func = this.onCollisionEnter)
            owner.on(Event.COLLISION_ENTER, this, func);
        if (func = this.onCollisionStay)
            owner.on(Event.COLLISION_STAY, this, func);
        if (func = this.onCollisionExit)
            owner.on(Event.COLLISION_EXIT, this, func);
        if (func = this.onJointBreak)
            owner.on(Event.JOINT_BREAK, this, func);
        if (func = this.onMouseDown)
            owner.on(Event.MOUSE_DOWN, this, func);
        if (func = this.onMouseUp)
            owner.on(Event.MOUSE_UP, this, func);
        if (func = this.onRightMouseDown)
            owner.on(Event.RIGHT_MOUSE_DOWN, this, func);
        if (func = this.onRightMouseUp)
            owner.on(Event.RIGHT_MOUSE_UP, this, func);
        if (func = this.onMouseMove)
            owner.on(Event.MOUSE_MOVE, this, func);
        if (func = this.onMouseDrag)
            owner.on(Event.MOUSE_DRAG, this, func);
        if (func = this.onMouseDragEnd)
            owner.on(Event.MOUSE_DRAG_END, this, func);
        if (func = this.onMouseOver)
            owner.on(Event.MOUSE_OVER, this, func);
        if (func = this.onMouseOut)
            owner.on(Event.MOUSE_OUT, this, func);
        if (func = this.onMouseClick)
            owner.on(Event.CLICK, this, func);
        if (func = this.onMouseDoubleClick)
            owner.on(Event.DOUBLE_CLICK, this, func);
        if (func = this.onMouseRightClick)
            owner.on(Event.RIGHT_CLICK, this, func);
        if (func = this.onKeyDown)
            ILaya.stage.on(Event.KEY_DOWN, this, func);
        if (func = this.onKeyPress)
            ILaya.stage.on(Event.KEY_PRESS, this, func);
        if (func = this.onKeyUp)
            ILaya.stage.on(Event.KEY_UP, this, func);
    }
}

//# sourceMappingURL=Script.js.map
