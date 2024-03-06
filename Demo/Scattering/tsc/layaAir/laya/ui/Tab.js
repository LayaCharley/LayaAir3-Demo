import { Button } from "./Button";
import { UIGroup } from "./UIGroup";
export class Tab extends UIGroup {
    createItem(skin, label) {
        let btn = new Button();
        btn._skinBaseUrl = this._skinBaseUrl;
        if (skin)
            btn.skin = skin;
        btn.label = label;
        return btn;
    }
}

//# sourceMappingURL=Tab.js.map
