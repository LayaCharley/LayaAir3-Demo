import { LayaEnv } from "../../LayaEnv";
import { AssetDb } from "../resource/AssetDb";
import { Utils } from "../utils/Utils";
export class URL {
    constructor(url) {
        this._url = URL.formatURL(url);
        this._path = URL.getPath(url);
    }
    static __init__() {
        URL.rootPath = URL.basePath = (location && location.protocol != undefined && location.protocol != "") ? URL.getPath(location.protocol + "//" + location.host + location.pathname) : "";
    }
    static initMiniGameExtensionOverrides() {
        if (LayaEnv.isPreview)
            return;
        URL.overrideExtension(["rendertexture", "videotexture"], "rt.json");
        URL.overrideExtension(["controller"], "controller.json");
        URL.overrideExtension(["mc"], "mc.bin");
        URL.overrideExtension(["mcc"], "mcc.json");
        URL.overrideExtension(["shader"], "shader.json");
        URL.overrideExtension(["scene3d", "scene", "taa", "prefab"], "json");
        URL.overrideExtension(["fui"], "fui.json");
        URL.overrideExtension(["glsl"], "glsl.txt");
        URL.overrideExtension(["skel"], "skel.bin");
    }
    get url() {
        return this._url;
    }
    get path() {
        return this._path;
    }
    static formatURL(url, base) {
        if (!url)
            return base || URL.basePath || "";
        if (url.startsWith("res://")) {
            let uuid = url.substring(6);
            let url2 = AssetDb.inst.UUID_to_URL(uuid);
            if (!url2)
                return url;
            url = url2;
        }
        let char1 = url.charCodeAt(0);
        if (url.indexOf(":") == -1 && char1 !== 47) {
            if (URL.customFormat != null)
                url = URL.customFormat(url);
            let ver = URL.version[url];
            if (ver != null) {
                let i = url.lastIndexOf(".");
                url = url.substring(0, i) + "-" + ver + url.substring(i);
            }
            if (char1 === 126)
                url = URL.join(URL.rootPath, url.substring(2));
            else {
                if (base == null) {
                    base = URL.basePath;
                    for (let k in URL.basePaths) {
                        if (url.startsWith(k)) {
                            base = URL.basePaths[k];
                            break;
                        }
                    }
                }
                url = URL.join(base, url);
            }
        }
        return url;
    }
    static postFormatURL(url) {
        if (URL.hasExtOverrides) {
            let extold = Utils.getFileExtension(url);
            let ext = URL.overrideFileExts[extold];
            if (ext != null)
                url = Utils.replaceFileExtension(url, ext);
        }
        return url;
    }
    static normalize(url) {
        if (url.indexOf("./") == -1)
            return url;
        let parts = url.split("/");
        let len = parts.length;
        let i = 0;
        while (i < len) {
            if (parts[i] == ".") {
                parts.splice(i, 1);
                len--;
                continue;
            }
            else if (parts[i] == '..') {
                let index = i - 1;
                if (index >= 0 && parts[index] !== '..') {
                    parts.splice(index, 2);
                    len -= 2;
                    i--;
                    continue;
                }
            }
            i++;
        }
        parts.length = len;
        return parts.join('/');
    }
    static getResURLByUUID(url) {
        if (url.length >= 36 && url.charCodeAt(8) === 45 && url.charCodeAt(13) === 45)
            return "res://" + url;
        else
            return url;
    }
    static join(base, path) {
        if (!path)
            return "";
        if (path.indexOf(":") > 0)
            return path;
        if (base) {
            let char1 = path.charCodeAt(0);
            if (char1 !== 126 && char1 !== 47) {
                if (base.charCodeAt(base.length - 1) !== 47)
                    path = base + "/" + path;
                else
                    path = base + path;
            }
        }
        return URL.normalize(path);
    }
    static getPath(url) {
        var ofs = url.lastIndexOf('/');
        return ofs > 0 ? url.substring(0, ofs + 1) : "";
    }
    static getFileName(url) {
        var ofs = url.lastIndexOf('/');
        return ofs > 0 ? url.substring(ofs + 1) : url;
    }
    static getURLVerion(url) {
        var index = url.indexOf("?");
        return index >= 0 ? url.substring(index) : null;
    }
    static overrideExtension(originalExts, targetExt) {
        for (let ext of originalExts)
            URL.overrideFileExts[ext] = targetExt;
        URL.hasExtOverrides = true;
    }
}
URL.version = {};
URL.basePath = "";
URL.basePaths = {};
URL.rootPath = "";
URL.overrideFileExts = {};
URL.customFormat = function (url) {
    return url;
};

//# sourceMappingURL=URL.js.map
