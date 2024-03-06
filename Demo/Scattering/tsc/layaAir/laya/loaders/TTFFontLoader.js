import { ILaya } from "../../ILaya";
import { LayaEnv } from "../../LayaEnv";
import { Loader } from "../net/Loader";
import { URL } from "../net/URL";
import { Browser } from "../utils/Browser";
import { Utils } from "../utils/Utils";
const testString = "LayaTTFFont";
class TTFFontLoader {
    load(task) {
        let fontName = Utils.replaceFileExtension(Utils.getBaseName(task.url), "");
        if (LayaEnv.isConch) {
            return task.loader.fetch(task.url, "arraybuffer").then(data => {
                if (data)
                    window["conchTextCanvas"].setFontFaceFromBuffer(fontName, data);
                return { family: fontName };
            });
        }
        else if (window.FontFace) {
            let fontFace = new window.FontFace(fontName, "url('" + URL.postFormatURL(URL.formatURL(task.url)) + "')");
            document.fonts.add(fontFace);
            return fontFace.load().then(() => {
                return fontFace;
            });
        }
        else {
            let fontTxt = "40px " + fontName;
            let txtWidth = Browser.measureText(testString, fontTxt).width;
            let fontStyle = Browser.createElement("style");
            fontStyle.type = "text/css";
            document.body.appendChild(fontStyle);
            fontStyle.textContent = "@font-face { font-family:'" + fontName + "'; src:url('" + URL.postFormatURL(URL.formatURL(task.url)) + "');}";
            return new Promise((resolve) => {
                let checkComplete = () => {
                    if (Browser.measureText(testString, fontTxt).width != txtWidth)
                        complete();
                };
                let complete = () => {
                    ILaya.systemTimer.clear(this, checkComplete);
                    ILaya.systemTimer.clear(this, complete);
                    resolve({ family: fontName });
                };
                ILaya.systemTimer.once(10000, this, complete);
                ILaya.systemTimer.loop(20, this, checkComplete);
            });
        }
    }
}
Loader.registerLoader(["ttf", "woff", "woff2", "otf"], TTFFontLoader, Loader.TTF);

//# sourceMappingURL=TTFFontLoader.js.map
