import { Box } from "./Box";
import { ILaya } from "../../ILaya";
export class ScaleBox extends Box {
    constructor() {
        super(...arguments);
        this._oldW = 0;
        this._oldH = 0;
    }
    onEnable() {
        ILaya.stage.on("resize", this, this.onResize);
        this.onResize();
    }
    onDisable() {
        ILaya.stage.off("resize", this, this.onResize);
    }
    onResize() {
        if (this.width > 0 && this.height > 0) {
            let stage = ILaya.stage;
            let scale = Math.min(stage.width / this._oldW, stage.height / this._oldH);
            super.width = stage.width;
            super.height = stage.height;
            this.scale(scale, scale);
        }
    }
    set_width(value) {
        super.set_width(value);
        this._oldW = value;
    }
    set_height(value) {
        super.set_height(value);
        this._oldH = value;
    }
}

//# sourceMappingURL=ScaleBox.js.map
