import { Sprite } from "../display/Sprite";
import { Event } from "../events/Event";
import { Rectangle } from "../maths/Rectangle";
export class HtmlLink {
    constructor() {
        this._shape = new Sprite();
        this._shape.hitArea = this;
        this._shape.on(Event.CLICK, () => {
            this._owner.bubbleEvent(Event.LINK, this._element.getAttrString("href"));
        });
        this._rects = [];
        this._rectCnt = 0;
    }
    get element() {
        return this._element;
    }
    get width() {
        return 0;
    }
    get height() {
        return 0;
    }
    create(owner, element) {
        this._owner = owner;
        this._element = element;
        this._owner.objContainer.addChild(this._shape);
    }
    resetArea() {
        this._rectCnt = 0;
    }
    addRect(x, y, width, height) {
        let rect = this._rects[this._rectCnt];
        if (!rect)
            rect = this._rects[this._rectCnt] = new Rectangle();
        this._rectCnt++;
        rect.setTo(x, y, width, height);
    }
    contains(x, y) {
        for (let i = 0; i < this._rectCnt; i++) {
            if (this._rects[i].contains(x, y))
                return true;
        }
        return false;
    }
    pos(x, y) {
    }
    release() {
        this._shape.removeSelf();
        this._shape.offAll();
        this._owner = null;
        this._element = null;
    }
    destroy() {
        this._shape.destroy();
    }
}

//# sourceMappingURL=HtmlLink.js.map
