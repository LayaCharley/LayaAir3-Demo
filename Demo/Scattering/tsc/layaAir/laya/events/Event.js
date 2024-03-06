import { Point } from "../maths/Point";
export class Event {
    constructor() {
        this.touchId = 0;
        this.delta = 0;
        this.button = 0;
        this.touchPos = new Point();
    }
    static isMouseEvent(type) {
        return MOUSE_EVENTS.has(type);
    }
    setTo(type, currentTarget, target) {
        this.type = type;
        this.currentTarget = currentTarget;
        this.target = target;
        return this;
    }
    stopPropagation() {
        this._stopped = true;
    }
    get touches() {
        return this._touches;
    }
    get altKey() {
        var _a;
        return (_a = this.nativeEvent) === null || _a === void 0 ? void 0 : _a.altKey;
    }
    get ctrlKey() {
        var _a;
        return (_a = this.nativeEvent) === null || _a === void 0 ? void 0 : _a.ctrlKey;
    }
    get shiftKey() {
        var _a;
        return (_a = this.nativeEvent) === null || _a === void 0 ? void 0 : _a.shiftKey;
    }
    get metaKey() {
        var _a;
        return (_a = this.nativeEvent) === null || _a === void 0 ? void 0 : _a.metaKey;
    }
    get key() {
        return this.nativeEvent.key;
    }
    get keyCode() {
        return this.nativeEvent.keyCode;
    }
    get charCode() {
        var _a;
        return (_a = this.nativeEvent) === null || _a === void 0 ? void 0 : _a.code;
    }
    get keyLocation() {
        if (this.nativeEvent)
            return this.nativeEvent.location || this.nativeEvent.keyLocation;
        else
            return 0;
    }
    get stageX() {
        return this.touchPos.x;
    }
    get stageY() {
        return this.touchPos.y;
    }
}
Event.EMPTY = new Event();
Event.MOUSE_DOWN = "mousedown";
Event.MOUSE_UP = "mouseup";
Event.RIGHT_MOUSE_DOWN = "rightmousedown";
Event.RIGHT_MOUSE_UP = "rightmouseup";
Event.CLICK = "click";
Event.RIGHT_CLICK = "rightclick";
Event.MOUSE_MOVE = "mousemove";
Event.MOUSE_OVER = "mouseover";
Event.MOUSE_OUT = "mouseout";
Event.MOUSE_WHEEL = "mousewheel";
Event.ROLL_OVER = "mouseover";
Event.ROLL_OUT = "mouseout";
Event.DOUBLE_CLICK = "doubleclick";
Event.MOUSE_DRAG = "mousedrag";
Event.MOUSE_DRAG_END = "mousedragend";
Event.DRAG_START = "dragstart";
Event.DRAG_MOVE = "dragmove";
Event.DRAG_END = "dragend";
Event.KEY_DOWN = "keydown";
Event.KEY_PRESS = "keypress";
Event.KEY_UP = "keyup";
Event.CHANGE = "change";
Event.CHANGED = "changed";
Event.WILL_RESIZE = "willResize";
Event.RESIZE = "resize";
Event.ADDED = "added";
Event.REMOVED = "removed";
Event.DISPLAY = "display";
Event.UNDISPLAY = "undisplay";
Event.ERROR = "error";
Event.COMPLETE = "complete";
Event.LOADED = "loaded";
Event.READY = "ready";
Event.PROGRESS = "progress";
Event.INPUT = "input";
Event.RENDER = "render";
Event.OPEN = "open";
Event.MESSAGE = "message";
Event.CLOSE = "close";
Event.FRAME = "enterframe";
Event.ENTER = "enter";
Event.SELECT = "select";
Event.BLUR = "blur";
Event.FOCUS = "focus";
Event.VISIBILITY_CHANGE = "visibilitychange";
Event.FOCUS_CHANGE = "focuschange";
Event.PLAYED = "played";
Event.PAUSED = "paused";
Event.STOPPED = "stopped";
Event.START = "start";
Event.END = "end";
Event.LINK = "link";
Event.LABEL = "label";
Event.FULL_SCREEN_CHANGE = "fullscreenchange";
Event.DEVICE_LOST = "devicelost";
Event.TRANSFORM_CHANGED = "transformchanged";
Event.LAYERCHANGE = "layerChange";
Event.staticMask = "staticMask";
Event.TRIGGER_ENTER = "triggerenter";
Event.TRIGGER_STAY = "triggerstay";
Event.TRIGGER_EXIT = "triggerexit";
Event.COLLISION_ENTER = "collisionenter";
Event.COLLISION_STAY = "collisionstay";
Event.COLLISION_EXIT = "collisionexit";
Event.JOINT_BREAK = "jointbreak";
const MOUSE_EVENTS = new Set([
    Event.MOUSE_DOWN, Event.MOUSE_UP, Event.MOUSE_MOVE, Event.CLICK, Event.DOUBLE_CLICK,
    Event.RIGHT_CLICK, Event.RIGHT_MOUSE_DOWN, Event.RIGHT_MOUSE_UP,
    Event.MOUSE_OVER, Event.MOUSE_OUT, Event.MOUSE_WHEEL
]);

//# sourceMappingURL=Event.js.map
