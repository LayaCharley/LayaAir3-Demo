import { Texture2D } from "../resource/Texture2D";
import { Texture } from "../resource/Texture";
import { Loader } from "../net/Loader";
import { HDRTextureInfo } from "../RenderEngine/HDRTextureInfo";
import { KTXTextureInfo } from "../RenderEngine/KTXTextureInfo";
import { TextureDimension } from "../RenderEngine/RenderEnum/TextureDimension";
import { ClassUtils } from "../utils/ClassUtils";
import { TextureFormat } from "../RenderEngine/RenderEnum/TextureFormat";
import { Browser } from "../utils/Browser";
import { AssetDb } from "../resource/AssetDb";
import { Resource } from "../resource/Resource";
import { Utils } from "../utils/Utils";
import { RenderTexture } from "../resource/RenderTexture";
import { VideoTexture } from "../media/VideoTexture";
import { LayaEnv } from "../../LayaEnv";
var internalResources;
class Texture2DLoader {
    constructor() {
        if (!internalResources) {
            internalResources = {
                "WhiteTexture.png": Texture2D.whiteTexture,
                "BlackTexture.png": Texture2D.blackTexture,
                "GrayTexture.png": Texture2D.grayTexture,
                "NormalTexture.png": Texture2D.normalTexture,
            };
        }
    }
    load(task) {
        if (task.url.indexOf("internal/") != -1) {
            let tex = internalResources[Utils.getBaseName(task.url)];
            if (tex)
                return Promise.resolve(tex);
        }
        let meta;
        if (!task.url.startsWith("data:")) {
            meta = AssetDb.inst.metaMap[task.url];
            if (!meta && LayaEnv.isPreview) {
                return AssetDb.inst.getMeta(task.url, task.uuid).then(meta => {
                    return this.load2(task, meta);
                });
            }
        }
        return this.load2(task, meta);
    }
    load2(task, meta) {
        var _a, _b;
        let constructParams;
        let propertyParams;
        let ext = task.ext;
        let url = task.url;
        if (meta) {
            let platform = Browser.platform;
            let fileIndex = ((_a = meta.platforms) === null || _a === void 0 ? void 0 : _a[platform]) || 0;
            let fileInfo = meta.files[fileIndex];
            if (fileInfo.file) {
                url = AssetDb.inst.getSubAssetURL(url, task.uuid, fileInfo.file, fileInfo.ext);
                ext = fileInfo.ext;
            }
            constructParams = [0, 0, (_b = fileInfo.format) !== null && _b !== void 0 ? _b : 1, meta.mipmap, meta.readWrite, meta.sRGB];
            propertyParams = {
                wrapModeU: meta.wrapMode,
                wrapModeV: meta.wrapMode,
                filterMode: meta.filterMode,
                anisoLevel: meta.anisoLevel,
                premultiplyAlpha: !!meta.pma,
                hdrEncodeFormat: meta.hdrEncodeFormat,
            };
        }
        else {
            constructParams = task.options.constructParams;
            propertyParams = task.options.propertyParams;
        }
        let compress = compressedFormats.indexOf(ext) != -1 ? ext : null;
        if (compress != null) {
            return task.loader.fetch(url, "arraybuffer", task.progress.createCallback(), task.options).then(data => {
                if (!data)
                    return null;
                let tex;
                switch (compress) {
                    case "dds":
                        tex = Texture2D._parseDDS(data, propertyParams, constructParams);
                        break;
                    case "ktx":
                        let ktxInfo = KTXTextureInfo.getKTXTextureInfo(data);
                        if (ktxInfo.dimension == TextureDimension.Cube) {
                            let cls = ClassUtils.getClass("TextureCube");
                            if (cls) {
                                let tc = new cls(ktxInfo.width, ktxInfo.format, ktxInfo.mipmapCount > 1, ktxInfo.sRGB);
                                tc.setKTXData(ktxInfo);
                                tex = tc;
                            }
                            else
                                return null;
                        }
                        else if (ktxInfo.dimension == TextureDimension.Tex2D) {
                            tex = Texture2D._parseKTX(data, propertyParams, constructParams);
                        }
                        break;
                    case "pvr":
                        tex = Texture2D._parsePVR(data, propertyParams, constructParams);
                        break;
                    case "hdr":
                        tex = HDRTextureInfo._parseHDRTexture(data, propertyParams, constructParams);
                        break;
                    case "lanit.ls":
                        tex = Texture2D._SimpleAnimatorTextureParse(data, propertyParams, constructParams);
                        break;
                }
                let obsoluteInst = task.obsoluteInst;
                if (obsoluteInst && Object.getPrototypeOf(obsoluteInst) == Object.getPrototypeOf(tex))
                    tex = this.move(obsoluteInst, tex);
                if (propertyParams && propertyParams.hdrEncodeFormat)
                    tex.hdrEncodeFormat = propertyParams.hdrEncodeFormat;
                if (meta) {
                    tex._sizeGrid = meta.sizeGrid;
                    tex._stateNum = meta.stateNum;
                }
                return tex;
            });
        }
        else {
            let options = task.options;
            let premultiplyAlpha = (propertyParams && propertyParams.premultiplyAlpha) ? "premultiply" : "none";
            if (options.useWorkerLoader && premultiplyAlpha === "none")
                options = Object.assign({ workerLoaderOptions: { premultiplyAlpha } }, options);
            return task.loader.fetch(url, "image", task.progress.createCallback(), options).then(img => {
                if (img instanceof ImageBitmap)
                    return img;
                else
                    return createImageBitmap(img, options.workerLoaderOptions || { premultiplyAlpha });
            }).then(bitmapimage => {
                if (!bitmapimage)
                    return null;
                let tex = Texture2D._parseImage(bitmapimage, propertyParams, constructParams);
                let obsoluteInst = task.obsoluteInst;
                if (obsoluteInst && Object.getPrototypeOf(obsoluteInst) == Object.getPrototypeOf(tex))
                    tex = this.move(obsoluteInst, tex);
                if (meta) {
                    tex._sizeGrid = meta.sizeGrid;
                    tex._stateNum = meta.stateNum;
                }
                return tex;
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
class RenderTextureLoader {
    load(task) {
        return task.loader.fetch(task.url, "json", task.progress.createCallback(), task.options).then(data => {
            if (!data)
                return null;
            let rt = task.obsoluteInst;
            if (rt)
                rt.recreate(data.width, data.height, data.colorFormat, data.depthFormat, data.generateMipmap, data.multiSamples, data.generateDepthTexture, data.sRGB);
            else
                rt = new RenderTexture(data.width, data.height, data.colorFormat, data.depthFormat, data.generateMipmap, data.multiSamples, data.generateDepthTexture, data.sRGB);
            if (null != data.anisoLevel)
                rt.anisoLevel = data.anisoLevel;
            if (null != data.filterMode)
                rt.filterMode = data.filterMode;
            if (null != data.wrapModeU)
                rt.wrapModeU = data.wrapModeU;
            if (null != data.wrapModeV)
                rt.wrapModeV = data.wrapModeV;
            return rt;
        });
    }
}
class VideoTextureLoader {
    load(task) {
        let inst = task.obsoluteInst || new VideoTexture();
        inst.source = task.url;
        return Promise.resolve(inst);
    }
}
const propertyParams2d = { premultiplyAlpha: true };
const constructParams2d = [null, null, TextureFormat.R8G8B8A8, false, false, true];
class TextureLoader {
    wrapTex2D(task, tex2D) {
        if (!tex2D)
            return null;
        let tex = task.obsoluteInst;
        if (tex) {
            tex.setTo(tex2D);
            tex.obsolute = false;
            tex._sizeGrid = tex2D._sizeGrid;
            tex._stateNum = tex2D._stateNum;
            tex.event("reload");
            if (tex._clipCache) {
                tex._clipCache.forEach(t => {
                    t.event("reload");
                    t._sizeGrid = tex._sizeGrid;
                    t._stateNum = tex._stateNum;
                });
            }
        }
        else {
            tex = new Texture(tex2D);
            tex._sizeGrid = tex2D._sizeGrid;
            tex._stateNum = tex2D._stateNum;
        }
        return tex;
    }
    load(task) {
        let tex2D = task.loader.getRes(task.url, Loader.TEXTURE2D);
        if (!tex2D || tex2D.obsolute) {
            let url = { url: task.url, type: Loader.TEXTURE2D };
            if (!task.options.propertyParams)
                url.propertyParams = propertyParams2d;
            else if (task.options.propertyParams.premultiplyAlpha == null)
                url.propertyParams = Object.assign({}, propertyParams2d, task.options.propertyParams);
            if (!task.options.constructParams)
                url.constructParams = constructParams2d;
            else if (task.options.constructParams[5] == null)
                url.constructParams = Object.assign([], constructParams2d, task.options.constructParams);
            return task.loader.load(url, task.options, task.progress.createCallback()).then(tex2D => {
                return this.wrapTex2D(task, tex2D);
            });
        }
        else
            return Promise.resolve(this.wrapTex2D(task, tex2D));
    }
}
const compressedFormats = ["ktx", "pvr", "dds", "hdr", "lanit.ls"];
const videoFormats = ["mp4", "webm"];
Loader.registerLoader(["tga", "tif", "tiff", "png", "jpg", "jpeg", "rendertexture", ...videoFormats, ...compressedFormats], TextureLoader, Loader.IMAGE);
Loader.registerLoader([], Texture2DLoader, Loader.TEXTURE2D);
Loader.registerLoader(["rendertexture"], RenderTextureLoader, Loader.TEXTURE2D);
Loader.registerLoader(videoFormats, VideoTextureLoader, Loader.TEXTURE2D);

//# sourceMappingURL=TextureLoader.js.map
