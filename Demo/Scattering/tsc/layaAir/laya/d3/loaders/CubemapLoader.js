import { Loader } from "../../net/Loader";
import { URL } from "../../net/URL";
import { KTXTextureInfo } from "../../RenderEngine/KTXTextureInfo";
import { TextureDimension } from "../../RenderEngine/RenderEnum/TextureDimension";
import { TextureFormat } from "../../RenderEngine/RenderEnum/TextureFormat";
import { AssetDb } from "../../resource/AssetDb";
import { Resource } from "../../resource/Resource";
import { Byte } from "../../utils/Byte";
import { Utils } from "../../utils/Utils";
import { TextureCube } from "../../resource/TextureCube";
var internalResources;
class CubemapLoader {
    constructor() {
        if (!internalResources) {
            internalResources = {
                "WhiteTextureCube.ltc": TextureCube.whiteTexture,
                "BlackTextureCube.ltc": TextureCube.blackTexture,
                "GrayTextureCube.ltc": TextureCube.grayTexture,
            };
        }
    }
    load(task) {
        if (task.url.indexOf("internal/") != -1) {
            let tex = internalResources[Utils.getBaseName(task.url)];
            if (tex)
                return Promise.resolve(tex);
        }
        if (task.ext == "ktx" || task.ext == "cubemap") {
            let url = task.url;
            if (task.ext == "cubemap")
                url = AssetDb.inst.getSubAssetURL(url, task.uuid, "0", "ktx");
            return task.loader.fetch(url, "arraybuffer", task.progress.createCallback(), task.options).then(data => {
                if (!data)
                    return null;
                let ktxInfo = KTXTextureInfo.getKTXTextureInfo(data);
                if (ktxInfo.dimension != TextureDimension.Cube) {
                    Loader.warn("ktxInfo.dimension != TextureDimension.Cube! " + task.url);
                    return null;
                }
                let tex = new TextureCube(ktxInfo.width, ktxInfo.format, ktxInfo.mipmapCount > 1, ktxInfo.sRGB);
                tex.setKTXData(ktxInfo);
                let obsoluteInst = task.obsoluteInst;
                if (obsoluteInst && (obsoluteInst instanceof TextureCube))
                    tex = this.move(obsoluteInst, tex);
                return tex;
            });
        }
        else if (task.ext == "ltcb" || task.ext == "ltcb.ls") {
            return task.loader.fetch(task.url, "arraybuffer", task.progress.createCallback(), task.options).then(data => {
                if (!data)
                    return null;
                let byte = new Byte(data);
                let version = byte.readUTFString();
                if (version !== "LAYATEXTURECUBE:0000") {
                    console.warn(`CubemapBinLoader: unknow version. ${version}`);
                    return null;
                }
                let format = byte.readUint8();
                let mipCount = byte.getUint8();
                let size = byte.readUint16();
                let filterMode = byte.getUint8();
                let wrapModeU = byte.getUint8();
                let wrapModev = byte.getUint8();
                let anisoLevel = byte.getUint8();
                let tex = new TextureCube(size, format, mipCount > 1 ? true : false);
                tex.setPixelsData(null, false, false);
                tex.filterMode = filterMode;
                tex.wrapModeU = wrapModeU;
                tex.wrapModeV = wrapModev;
                tex.anisoLevel = anisoLevel;
                let pos = byte.pos;
                let mipSize = size;
                for (let i = 0; i < mipCount; i++) {
                    let uint8Arrays = new Array(6);
                    let mipPixelLength = mipSize * mipSize * tex._getFormatByteCount();
                    for (let j = 0; j < 6; j++) {
                        uint8Arrays[j] = new Uint8Array(data, pos, mipPixelLength);
                        pos += mipPixelLength;
                    }
                    tex.updateSubPixelsData(uint8Arrays, 0, 0, mipSize, mipSize, i, false, false, false);
                    mipSize /= 2;
                }
                let obsoluteInst = task.obsoluteInst;
                if (obsoluteInst && (obsoluteInst instanceof TextureCube))
                    tex = this.move(obsoluteInst, tex);
                return tex;
            });
        }
        else {
            return task.loader.fetch(task.url, "json", task.progress.createCallback(0.2), task.options).then(data => {
                if (!data)
                    return null;
                let ltcBasePath = URL.getPath(task.url);
                let urls = [
                    URL.join(ltcBasePath, data.front),
                    URL.join(ltcBasePath, data.back),
                    URL.join(ltcBasePath, data.left),
                    URL.join(ltcBasePath, data.right),
                    URL.join(ltcBasePath, data.up),
                    URL.join(ltcBasePath, data.down)
                ];
                return Promise.all(urls.map(url => {
                    if (url)
                        return task.loader.fetch(url, "image", task.progress.createCallback(), task.options);
                    else
                        return Promise.resolve(null);
                })).then(images => {
                    var _a, _b;
                    let constructParams = task.options.constructParams;
                    let size = constructParams ? constructParams[0] : ((_b = ((_a = images[0]) === null || _a === void 0 ? void 0 : _a.width)) !== null && _b !== void 0 ? _b : 1);
                    let format = constructParams ? constructParams[1] : TextureFormat.R8G8B8A8;
                    let mipmap = constructParams ? constructParams[3] : false;
                    let srgb = constructParams ? constructParams[5] : true;
                    let tex = new TextureCube(size, format, mipmap, srgb);
                    tex.setImageData(images, false, false);
                    let obsoluteInst = task.obsoluteInst;
                    if (obsoluteInst && (obsoluteInst instanceof TextureCube))
                        tex = this.move(obsoluteInst, tex);
                    return tex;
                });
            });
        }
    }
    move(obsoluteInst, tex) {
        obsoluteInst._texture = tex._texture;
        obsoluteInst.width = tex.width;
        obsoluteInst.height = tex.height;
        obsoluteInst.obsolute = false;
        delete Resource._idResourcesMap[tex.id];
        return obsoluteInst;
    }
}
Loader.registerLoader(["ltc", "ltcb", "ltcb.ls", "cubemap"], CubemapLoader, Loader.TEXTURECUBE);

//# sourceMappingURL=CubemapLoader.js.map
