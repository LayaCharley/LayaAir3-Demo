import { Laya } from "Laya";
import { Sprite } from "laya/display/Sprite";
export class AtlasTools {
    constructor() {
        this.mIndex = 0;
        this.mTextureDic = {};
    }
    static getInstance() {
        return AtlasTools.mInstance = AtlasTools.mInstance || new AtlasTools();
    }
    start() {
        if (this.mSprite == null) {
            this.mSprite = new Sprite();
        }
        Laya.stage.addChild(this.mSprite);
        this.showNext();
    }
    end() {
        if (this.mSprite) {
            Laya.stage.removeChild(this.mSprite);
        }
    }
    showNext() {
        if (this.mSprite == null) {
            this.mSprite = new Sprite();
        }
        Laya.stage.addChild(this.mSprite);
        this.mIndex++;
        var tTexture;
        if (this.mTextureDic[this.mIndex]) {
            tTexture = this.mTextureDic[this.mIndex];
        }
    }
}
