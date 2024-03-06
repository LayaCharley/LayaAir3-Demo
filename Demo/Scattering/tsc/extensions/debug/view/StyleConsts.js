import { Browser } from "laya/utils/Browser";
export class StyleConsts {
    constructor() {
    }
    static setViewScale(view) {
        view.scaleX = view.scaleY = StyleConsts.PanelScale;
    }
}
StyleConsts.PanelScale = Browser.onPC ? 1 : Browser.pixelRatio;
