import { Event } from "../events/Event";
import { Button } from "./Button";
export class Radio extends Button {
    constructor(skin = null, label = "") {
        super(skin, label);
        this.toggle = false;
        this._autoSize = false;
    }
    preinitialize() {
        super.preinitialize();
        this.toggle = false;
        this._autoSize = false;
    }
    initialize() {
        super.initialize();
        this.createText();
        this._text.align = "left";
        this._text.valign = "top";
        this._text.width = null;
        this.on(Event.CLICK, this, this.onClick);
    }
    onClick(e) {
        this.selected = true;
    }
    get value() {
        return this._value != null ? this._value : this.label;
    }
    set value(obj) {
        this._value = obj;
    }
}

//# sourceMappingURL=Radio.js.map
