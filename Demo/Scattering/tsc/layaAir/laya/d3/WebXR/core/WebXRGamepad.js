import { EventDispatcher } from "../../../events/EventDispatcher";
import { Vector2 } from "../../../maths/Vector2";
export class AxiGamepad extends EventDispatcher {
    constructor(handness, length) {
        super();
        this.axisData = new Array();
        this.handness = handness;
        this.axisData.length = length;
        this.axisLength = length;
    }
    update(padGameAxi) {
        for (let i = 0, j = 0; i < padGameAxi.axes.length; i += 2, ++j) {
            if (!this.axisData[j])
                this.axisData[j] = new Vector2();
            this.axisData[j].setValue(padGameAxi.axes[i], padGameAxi.axes[i + 1]);
            this.outPutStickValue(this.axisData[j], j);
        }
    }
    outPutStickValue(value, index) {
        const eventnam = AxiGamepad.EVENT_OUTPUT + index.toString();
        this.event(eventnam, [value]);
    }
    destroy() {
        for (let i = 0; i < this.axisLength; i++) {
            let eventname = AxiGamepad.EVENT_OUTPUT + i.toString();
            this.offAll(eventname);
        }
    }
}
AxiGamepad.EVENT_OUTPUT = "outputAxi_id";
export class ButtonGamepad extends EventDispatcher {
    constructor(handness, index) {
        super();
        this.lastTouch = false;
        this.lastPress = false;
        this.lastPressValue = 0;
        this.touch = false;
        this.press = false;
        this.pressValue = 0;
        this.handness = handness;
        this.index = index;
    }
    update(padButton) {
        this.lastTouch = this.touch;
        this.lastPress = this.press;
        this.lastPressValue = this.pressValue;
        this.touch = padButton.touched;
        this.press = padButton.pressed;
        this.pressValue = padButton.value;
        if (!this.lastTouch && !this.touch) {
            return;
        }
        if (this.lastTouch != this.touch && this.touch) {
            this.touchEnter();
        }
        else if (this.lastTouch == this.touch && this.touch) {
            this.touchStay();
        }
        else if (this.lastTouch != this.touch && !this.touch) {
            this.touchOut();
        }
        if (this.lastPress != this.press && this.press) {
            this.pressEnter();
        }
        else if (this.lastPress == this.press && this.press) {
            this.pressStay();
        }
        else if (this.lastPress != this.press && !this.press) {
            this.pressOut();
        }
        if (this.touch) {
            this.outpressed();
        }
    }
    touchEnter() {
        this.event(ButtonGamepad.EVENT_TOUCH_ENTER);
    }
    touchStay() {
        this.event(ButtonGamepad.EVENT_TOUCH_STAY);
    }
    touchOut() {
        this.event(ButtonGamepad.EVENT_TOUCH_OUT);
    }
    pressEnter() {
        this.event(ButtonGamepad.EVENT_PRESS_ENTER);
    }
    pressStay() {
        this.event(ButtonGamepad.EVENT_PRESS_STAY);
    }
    pressOut() {
        this.event(ButtonGamepad.EVENT_PRESS_OUT);
    }
    outpressed() {
        this.event(ButtonGamepad.EVENT_PRESS_VALUE, [this.pressValue]);
    }
    destroy() {
        this.offAll(ButtonGamepad.EVENT_PRESS_ENTER);
        this.offAll(ButtonGamepad.EVENT_PRESS_STAY);
        this.offAll(ButtonGamepad.EVENT_PRESS_OUT);
        this.offAll(ButtonGamepad.EVENT_PRESS_ENTER);
        this.offAll(ButtonGamepad.EVENT_PRESS_STAY);
        this.offAll(ButtonGamepad.EVENT_PRESS_OUT);
        this.offAll(ButtonGamepad.EVENT_PRESS_VALUE);
    }
}
ButtonGamepad.EVENT_TOUCH_ENTER = "touchEnter";
ButtonGamepad.EVENT_TOUCH_STAY = "touchStay";
ButtonGamepad.EVENT_TOUCH_OUT = "touchOut";
ButtonGamepad.EVENT_PRESS_ENTER = "pressEnter";
ButtonGamepad.EVENT_PRESS_STAY = "pressStay";
ButtonGamepad.EVENT_PRESS_OUT = "pressOut";
ButtonGamepad.EVENT_PRESS_VALUE = "outpressed";

//# sourceMappingURL=WebXRGamepad.js.map
