import { UIComponent } from "./UIComponent";
export class Box extends UIComponent {
    set_dataSource(value) {
        this._dataSource = value;
        for (let name in value) {
            let comp = this.getChildByName(name);
            if (comp)
                comp.dataSource = value[name];
            else if (name in this && !(this[name] instanceof Function))
                this[name] = value[name];
        }
    }
    get bgColor() {
        return this._bgColor;
    }
    set bgColor(value) {
        this._bgColor = value;
        this.graphics.clear();
        this.graphics.drawRect(0, 0, 1, 1, this._bgColor, null, null, true);
    }
}

//# sourceMappingURL=Box.js.map
