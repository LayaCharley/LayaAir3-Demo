import { Event } from "../events/Event";
import { Browser } from "../utils/Browser";
import { ImgUtils } from "../utils/ImgUtils";
import { HttpRequest } from "./HttpRequest";
import { WorkerLoader } from "./WorkerLoader";
export class Downloader {
    constructor() {
        this.httpRequestPool = [];
    }
    common(owner, url, originalUrl, contentType, onProgress, onComplete) {
        let http = this.getRequestInst();
        http.on(Event.COMPLETE, () => {
            let data = http.data;
            this.returnRequestInst(http);
            onComplete(data);
        });
        http.on(Event.ERROR, null, (error) => {
            this.returnRequestInst(http);
            onComplete(null, error);
        });
        if (onProgress)
            http.on(Event.PROGRESS, onProgress);
        http.send(url, null, "get", contentType);
        owner.$ref = http;
    }
    image(owner, url, originalUrl, onProgress, onComplete) {
        let image = new Browser.window.Image();
        image.crossOrigin = "";
        image.onload = () => {
            image.onload = null;
            image.onerror = null;
            onComplete(image);
        };
        image.onerror = () => {
            image.onload = null;
            image.onerror = null;
            onComplete(null, "");
        };
        image.src = url;
        owner.$ref = image;
    }
    imageWithBlob(owner, blob, originalUrl, onProgress, onComplete) {
        let url = ImgUtils.arrayBufferToURL(originalUrl, blob);
        this.image(owner, url, originalUrl, onProgress, onComplete);
    }
    imageWithWorker(owner, url, originalUrl, onProgress, onComplete) {
        WorkerLoader.enable = true;
        if (WorkerLoader.enable) {
            WorkerLoader.load(url, owner.workerLoaderOptions).then(ret => {
                if (ret)
                    onComplete(ret);
                else
                    onComplete(null, "workerloader failed!");
            });
        }
        else
            this.image(owner, url, originalUrl, onProgress, onComplete);
    }
    audio(owner, url, originalUrl, onProgress, onComplete) {
        let audio = Browser.createElement("audio");
        audio.crossOrigin = "";
        audio.oncanplaythrough = () => {
            audio.oncanplaythrough = null;
            audio.onerror = null;
            onComplete(audio);
        };
        audio.onerror = () => {
            audio.oncanplaythrough = null;
            audio.onerror = null;
            onComplete(null, "");
        };
        audio.src = url;
        owner.$ref = audio;
    }
    getRequestInst() {
        if (this.httpRequestPool.length == 0
            || Browser.onVVMiniGame || Browser.onHWMiniGame) {
            return new HttpRequest();
        }
        else {
            return this.httpRequestPool.pop();
        }
    }
    returnRequestInst(inst) {
        inst.reset();
        if (this.httpRequestPool.length < 10)
            this.httpRequestPool.push(inst);
    }
}

//# sourceMappingURL=Downloader.js.map
