import { Texture } from "../resource/Texture";
import { ILaya } from "../../ILaya";
import { Loader } from "../net/Loader";
import { Resource } from "../resource/Resource";
export class BitmapFont extends Resource {
    constructor() {
        super(false);
        this.dict = {};
        this.fontSize = 12;
        this.autoScaleSize = false;
        this.tint = true;
        this.maxWidth = 0;
        this.lineHeight = 12;
        this.letterSpacing = 0;
    }
    static loadFont(path, complete) {
        ILaya.loader.load(path, Loader.FONT).then(font => {
            complete && complete.runWith(font);
        });
    }
    parseFont(xml, texture) {
        var _a;
        if (xml == null || texture == null)
            return;
        this.texture = texture;
        texture._addReference();
        let scale = 1;
        let info = xml.getNode("info");
        this.fontSize = info.getAttrInt("size", 12);
        this.autoScaleSize = info.getAttrBool("autoScaleSize");
        this.lineHeight = info.getAttrInt("lineHeight", this.fontSize);
        if (this.lineHeight == 0)
            this.lineHeight = this.fontSize;
        let padding = info.getAttrString("padding", "");
        let paddingArray = padding.split(",");
        this.padding = [parseInt(paddingArray[0]), parseInt(paddingArray[1]), parseInt(paddingArray[2]), parseInt(paddingArray[3])];
        let chars = ((_a = xml.getNode("chars")) === null || _a === void 0 ? void 0 : _a.elements("char")) || [];
        let maxWidth = 0;
        let dict = this.dict;
        for (let i = 0, n = chars.length; i < n; i++) {
            let ct = chars[i];
            let id = ct.getAttrInt("id");
            let xOffset = ct.getAttrInt("xoffset") / scale;
            let yOffset = ct.getAttrInt("yoffset") / scale;
            let advance = ct.getAttrInt("xadvance") / scale;
            let x = ct.getAttrInt("x");
            let y = ct.getAttrInt("y");
            let width = ct.getAttrInt("width");
            let height = ct.getAttrInt("height");
            let tex = Texture.create(texture, x, y, width, height, xOffset, yOffset);
            if (advance == 0)
                advance = width;
            advance += this.letterSpacing;
            maxWidth = Math.max(maxWidth, advance);
            dict[id] = { x: 0, y: 0, width, height, advance, texture: tex };
        }
        if (maxWidth > 0)
            this.maxWidth = maxWidth;
        else
            this.maxWidth = this.fontSize;
        if (!dict[32])
            dict[32] = { x: 0, y: 0, advance: Math.floor(this.fontSize * 0.5) + this.letterSpacing };
    }
    _disposeResource() {
        var _a;
        if (this.texture) {
            for (let k in this.dict) {
                (_a = this.dict[k].texture) === null || _a === void 0 ? void 0 : _a.destroy();
            }
            this.texture._removeReference();
            this.dict = null;
            this.texture = null;
            this.padding = null;
        }
    }
    getTextWidth(text, fontSize) {
        let w = 0;
        for (let i = 0, n = text.length; i < n; i++) {
            let g = this.dict[text.charCodeAt(i)];
            if (g) {
                let scale = this.autoScaleSize ? (fontSize / this.fontSize) : 1;
                w += Math.round(g.advance * scale);
            }
        }
        return w;
    }
    getMaxWidth(fontSize) {
        if (fontSize != null && this.autoScaleSize)
            return Math.round(this.maxWidth * (fontSize / this.fontSize));
        else
            return this.maxWidth;
    }
    getMaxHeight(fontSize) {
        if (fontSize != null && this.autoScaleSize)
            return Math.round(this.lineHeight * (fontSize / this.fontSize));
        else
            return this.lineHeight;
    }
}

//# sourceMappingURL=BitmapFont.js.map
