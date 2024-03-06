import { BaseScript } from "../../BaseScript";

import CheckBox = Laya.CheckBox;

const { regClass, property } = Laya;

@regClass()
export class UI_CheckBox extends BaseScript {

	private COL_AMOUNT: number = 2;
	private ROW_AMOUNT: number = 3;
	private HORIZONTAL_SPACING: number = 200;
	private VERTICAL_SPACING: number = 100;
	private X_OFFSET: number = 100;
	private Y_OFFSET: number = 50;

	private skins: any[];

    constructor() {
        super();
    }

    onAwake(): void {

        super.base();
		this.skins = ["resources/res/ui/checkbox (1).png", "resources/res/ui/checkbox (2).png", "resources/res/ui/checkbox (3).png", "resources/res/ui/checkbox (4).png", "resources/res/ui/checkbox (5).png", "resources/res/ui/checkbox (6).png"];

		Laya.loader.load(this.skins).then( ()=>{
            this.onCheckBoxSkinLoaded();
        } );
	}

	private onCheckBoxSkinLoaded(e: any = null): void {
		var cb: CheckBox;
		for (var i: number = 0; i < this.COL_AMOUNT; ++i) {
			for (var j: number = 0; j < this.ROW_AMOUNT; ++j) {
				cb = this.createCheckBox(this.skins[i * this.ROW_AMOUNT + j]);
				cb.selected = true;

				cb.x = this.HORIZONTAL_SPACING * i + this.X_OFFSET;
				cb.y += this.VERTICAL_SPACING * j + this.Y_OFFSET;

				// 给左边的三个CheckBox添加事件使其能够切换标签
				if (i == 0) {
					cb.y += 20;
					cb.on("change", this, this.updateLabel, [cb]);
					this.updateLabel(cb);
				}
			}
		}
	}

	private createCheckBox(skin: string): CheckBox {
		var cb: CheckBox = new CheckBox(skin);
		this.box2D.addChild(cb);

		cb.labelColors = "white";
		cb.labelSize = 20;
		cb.labelFont = "Microsoft YaHei";
		cb.labelPadding = "3,0,0,5";

		return cb;
	}

	private updateLabel(checkBox: CheckBox): void {
		checkBox.label = checkBox.selected ? "已选中" : "未选中";
	}
}