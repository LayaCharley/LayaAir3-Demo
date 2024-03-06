import { XMLIterator } from "./XMLIterator";
import { XMLUtils } from "./XMLUtils";
import { TextStyle } from "../display/css/TextStyle";
import { Pool } from "../utils/Pool";
export var HtmlElementType;
(function (HtmlElementType) {
    HtmlElementType[HtmlElementType["Text"] = 0] = "Text";
    HtmlElementType[HtmlElementType["Link"] = 1] = "Link";
    HtmlElementType[HtmlElementType["Image"] = 2] = "Image";
    HtmlElementType[HtmlElementType["Input"] = 3] = "Input";
    HtmlElementType[HtmlElementType["Select"] = 4] = "Select";
    HtmlElementType[HtmlElementType["Object"] = 5] = "Object";
    HtmlElementType[HtmlElementType["LinkEnd"] = 6] = "LinkEnd";
})(HtmlElementType || (HtmlElementType = {}));
export class HtmlElement {
    constructor() {
        this.style = new TextStyle();
    }
    getAttr(attrName) {
        if (this._attrs == null)
            return null;
        return this._attrs[attrName];
    }
    setAttr(attrName, attrValue) {
        if (this._attrs == null)
            this._attrs = {};
        this._attrs[attrName] = attrValue;
    }
    getAttrString(attrName, defValue) {
        return XMLUtils.getString(this._attrs, attrName, defValue);
    }
    getAttrInt(attrName, defValue) {
        return XMLUtils.getInt(this._attrs, attrName, defValue);
    }
    getAttrFloat(attrName, defValue) {
        return XMLUtils.getFloat(this._attrs, attrName, defValue);
    }
    getAttrBool(attrName, defValue) {
        return XMLUtils.getBool(this._attrs, attrName, defValue);
    }
    fetchAttributes() {
        this._attrs = Object.assign({}, XMLIterator.attributes);
    }
    reset() {
        this.name = null;
        this.text = null;
        if (this.obj) {
            this.obj.release();
            Pool.recoverByClass(this.obj);
            this.obj = null;
        }
        this._attrs = null;
    }
    static getFromPool(type) {
        let ele;
        if (this.pool.length > 0)
            ele = this.pool.pop();
        else
            ele = new HtmlElement();
        ele.type = type;
        if (ele.type != HtmlElementType.Text && !ele._attrs)
            ele._attrs = {};
        return ele;
    }
    static returnToPool(ele) {
        if (Array.isArray(ele)) {
            for (let e of ele)
                e.reset();
            this.pool.push(...ele);
            ele.length = 0;
        }
        else {
            ele.reset();
            this.pool.push(ele);
        }
    }
}
HtmlElement.pool = [];

//# sourceMappingURL=HtmlElement.js.map
