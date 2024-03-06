import { Laya } from "Laya";
import { Stage } from "laya/display/Stage";
import { Tab } from "laya/ui/Tab";
import { Handler } from "laya/utils/Handler";
export class UI_Tab {
    constructor(maincls) {
        this.skins = ["res/ui/tab1.png", "res/ui/tab2.png"];
        this.Main = null;
        this.Main = maincls;
        Laya.init(550, 400).then(() => {
            Laya.stage.alignV = Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Stage.ALIGN_CENTER;
            Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
            Laya.stage.bgColor = "#232628";
            Laya.stage.bgColor = "#3d3d3d";
            Laya.loader.load(this.skins, Handler.create(this, this.onSkinLoaded));
        });
    }
    onSkinLoaded(e = null) {
        var tabA = this.createTab(this.skins[0]);
        tabA.pos(40, 120);
        tabA.labelColors = "#000000,#d3d3d3,#333333";
        var tabB = this.createTab(this.skins[1]);
        tabB.pos(40, 220);
        tabB.labelColors = "#FFFFFF,#8FB299,#FFFFFF";
    }
    createTab(skin) {
        var tab = new Tab();
        tab.skin = skin;
        tab.labelBold = true;
        tab.labelSize = 20;
        tab.labelStrokeColor = "#000000";
        tab.labels = "Tab Control 1,Tab Control 2,Tab Control 3";
        tab.labelPadding = "0,0,0,0";
        tab.selectedIndex = 1;
        this.onSelect(tab.selectedIndex);
        tab.selectHandler = new Handler(this, this.onSelect);
        this.Main.box2D.addChild(tab);
        return tab;
    }
    onSelect(index) {
        console.log("当前选择的标签页索引为 " + index);
    }
}
