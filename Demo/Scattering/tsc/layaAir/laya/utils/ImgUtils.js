import { Browser } from "./Browser";
export class ImgUtils {
    static compareVersion(curVersion, needVersion) {
        let curVersionArr = curVersion.split('.');
        let needVersionArr = needVersion.split('.');
        const len = Math.max(curVersionArr.length, needVersionArr.length);
        while (curVersionArr.length < len) {
            curVersionArr.push('0');
        }
        while (needVersionArr.length < len) {
            needVersionArr.push('0');
        }
        for (let i = 0; i < len; i++) {
            const num1 = parseInt(curVersionArr[i]);
            const num2 = parseInt(needVersionArr[i]);
            if (num1 > num2) {
                return true;
            }
            else if (num1 < num2) {
                return false;
            }
        }
        return true;
    }
    static get isSupport() {
        if (Browser._isMiniGame) {
            var version = Browser.window.wx.getSystemInfoSync().SDKVersion;
            return ImgUtils.compareVersion(version, '2.14.0');
        }
        else if (Browser.onLayaRuntime) {
            return true;
        }
        else if (Browser.window.Blob)
            return Browser.window.Blob ? true : false;
        return false;
    }
    static arrayBufferToURL(url, arrayBuffer) {
        if (!ImgUtils.isSupport)
            return url;
        if (ImgUtils.data[url])
            return ImgUtils.data[url];
        var newurl = "";
        if (Browser._isMiniGame || Browser.onLayaRuntime) {
            newurl = Browser.window.wx.createBufferURL(arrayBuffer);
        }
        else if (Browser.window.Blob) {
            let blob = new Blob([arrayBuffer], { type: 'application/octet-binary' });
            newurl = Browser.window.URL.createObjectURL(blob);
        }
        if (ImgUtils.isSavaData)
            ImgUtils.data[url] = newurl;
        return newurl;
    }
    static _arrayBufferToURL(arrayBuffer) {
        if (!ImgUtils.isSupport)
            return null;
        var newurl = "";
        if (Browser._isMiniGame || Browser.onLayaRuntime) {
            newurl = Browser.window.wx.createBufferURL(arrayBuffer);
        }
        else if (Browser.window.Blob) {
            let blob = new Blob([arrayBuffer], { type: 'application/octet-binary' });
            newurl = Browser.window.URL.createObjectURL(blob);
        }
        return newurl;
    }
    static destroy(url) {
        if (!ImgUtils.isSupport)
            return;
        var newurl = ImgUtils.data[url];
        if (newurl) {
            if (Browser._isMiniGame || Browser.onLayaRuntime)
                Browser.window.wx.revokeBufferURL(newurl);
            else if (Browser.window.Blob)
                Browser.window.URL.revokeObjectURL(newurl);
            delete ImgUtils.data[url];
        }
    }
}
ImgUtils.data = {};
ImgUtils.isSavaData = false;

//# sourceMappingURL=ImgUtils.js.map
