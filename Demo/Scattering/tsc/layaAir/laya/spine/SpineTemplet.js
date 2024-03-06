import { ILaya } from "../../ILaya";
import { Resource } from "../resource/Resource";
import { URL } from "../net/URL";
import { SpineTexture } from "./SpineTexture";
export class SpineTemplet extends Resource {
    constructor() {
        super();
        this._textures = {};
    }
    get ns() {
        return this._ns;
    }
    get basePath() {
        return this._basePath;
    }
    getTexture(name) {
        return this._textures[name];
    }
    _parse(desc, atlasText, createURL, progress) {
        this._basePath = URL.getPath(createURL);
        let version = this.getRuntimeVersion(desc);
        let parseAtlas;
        if (version == "4.0")
            parseAtlas = this.parseAtlas4;
        else
            parseAtlas = this.parseAtlas3;
        return parseAtlas.call(this, atlasText, progress).then((atlas) => {
            let atlasLoader = new this._ns.AtlasAttachmentLoader(atlas);
            if (desc instanceof ArrayBuffer) {
                let skeletonBinary = new this._ns.SkeletonBinary(atlasLoader);
                this.skeletonData = skeletonBinary.readSkeletonData(new Uint8Array(desc));
            }
            else {
                let skeletonJson = new this._ns.SkeletonJson(atlasLoader);
                this.skeletonData = skeletonJson.readSkeletonData(desc);
            }
        });
    }
    getRuntimeVersion(desc) {
        this._ns = spine;
        return SpineTemplet.RuntimeVersion;
    }
    parseAtlas3(atlasText, progress) {
        let atlasPages = [];
        new this._ns.TextureAtlas(atlasText, (path) => {
            atlasPages.push({ url: this._basePath + path });
            return new SpineTexture(null);
        });
        return ILaya.loader.load(atlasPages, null, progress === null || progress === void 0 ? void 0 : progress.createCallback()).then((res) => {
            let i = 0;
            let atlas = new this._ns.TextureAtlas(atlasText, (path) => {
                let tex = res[i++];
                if (tex)
                    tex._addReference();
                let spineTex = new SpineTexture(tex);
                this._textures[path] = spineTex;
                return spineTex;
            });
            return atlas;
        });
    }
    parseAtlas4(atlasText, progress) {
        let atlas = new this._ns.TextureAtlas(atlasText);
        return ILaya.loader.load(atlas.pages.map((page) => this._basePath + page.name), null, progress === null || progress === void 0 ? void 0 : progress.createCallback()).then((res) => {
            let i = 0;
            for (let page of atlas.pages) {
                let tex = res[i++];
                if (tex)
                    tex._addReference();
                let spineTex = new SpineTexture(tex);
                this._textures[page.name] = spineTex;
                page.setTexture(spineTex);
            }
            return atlas;
        });
    }
    getAniNameByIndex(index) {
        let tAni = this.skeletonData.animations[index];
        if (tAni)
            return tAni.name;
        return null;
    }
    getSkinIndexByName(skinName) {
        let skins = this.skeletonData.skins;
        let tSkinData;
        for (let i = 0, n = skins.length; i < n; i++) {
            tSkinData = skins[i];
            if (tSkinData.name == skinName) {
                return i;
            }
        }
        return -1;
    }
    _disposeResource() {
        var _a;
        for (let k in this._textures) {
            (_a = this._textures[k].realTexture) === null || _a === void 0 ? void 0 : _a._removeReference();
        }
    }
}
SpineTemplet.RuntimeVersion = "3.8";

//# sourceMappingURL=SpineTemplet.js.map
