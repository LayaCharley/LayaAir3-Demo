import { Button } from "./Button";
export class CheckBox extends Button {
    constructor(skin = null, label = "") {
        super(skin, label);
        this.toggle = true;
        this._autoSize = false;
    }
    preinitialize() {
        super.preinitialize();
        this.toggle = true;
        this._autoSize = false;
    }
    initialize() {
        super.initialize();
        this.createText();
        this._text.align = "left";
        this._text.valign = "top";
        this._text.width = null;
    }
    set_dataSource(value) {
        this._dataSource = value;
        if (value instanceof Boolean)
            this.selected = value;
        else if (typeof (value) == 'string')
            this.selected = value === "true";
        else
            super.set_dataSource(value);
    }
}

//# sourceMappingURL=CheckBox.js.map
