import { UIGroup } from "./UIGroup";
import { Radio } from "./Radio";
export class RadioGroup extends UIGroup {
    createItem(skin, label) {
        let btn = new Radio();
        btn._skinBaseUrl = this._skinBaseUrl;
        if (skin)
            btn.skin = skin;
        btn.label = label;
        return btn;
    }
}

//# sourceMappingURL=RadioGroup.js.map
