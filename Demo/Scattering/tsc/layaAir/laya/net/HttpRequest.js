import { Event } from "../events/Event";
import { EventDispatcher } from "../events/EventDispatcher";
import { Browser } from "../utils/Browser";
import { XML } from "../html/XML";
export class HttpRequest extends EventDispatcher {
    constructor() {
        super(...arguments);
        this._http = new XMLHttpRequest();
    }
    send(url, data = null, method = "get", responseType = "text", headers) {
        this._responseType = responseType;
        this._data = null;
        if (Browser.onVVMiniGame || Browser.onQGMiniGame || Browser.onQQMiniGame || Browser.onAlipayMiniGame || Browser.onBLMiniGame || Browser.onHWMiniGame || Browser.onTTMiniGame || Browser.onTBMiniGame) {
            url = HttpRequest._urlEncode(url);
        }
        this._url = url;
        let http = this._http;
        http.open(method, url, true);
        if (data) {
            if (typeof (data) == 'string') {
                http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            }
            else {
                http.setRequestHeader("Content-Type", "application/json");
                if (!(data instanceof ArrayBuffer))
                    data = JSON.stringify(data);
            }
        }
        else if (Browser.onBLMiniGame && Browser.onAndroid)
            data = {};
        if (headers) {
            for (let i = 0; i < headers.length; i++) {
                http.setRequestHeader(headers[i++], headers[i]);
            }
        }
        let restype = responseType !== "arraybuffer" ? "text" : "arraybuffer";
        http.responseType = restype;
        if (http.dataType) {
            http.dataType = restype;
        }
        http.onerror = (e) => {
            this._onError(e);
        };
        http.onabort = (e) => {
            this._onAbort(e);
        };
        http.onprogress = (e) => {
            this._onProgress(e);
        };
        http.onload = (e) => {
            this._onLoad(e);
        };
        http.send(data);
    }
    _onProgress(e) {
        if (e && e.lengthComputable)
            this.event(Event.PROGRESS, e.loaded / e.total);
    }
    _onAbort(e) {
        this.error("Request was aborted by user");
    }
    _onError(e) {
        this.error("Request failed Status:" + this._http.status + " text:" + this._http.statusText);
    }
    _onLoad(e) {
        var http = this._http;
        var status = http.status !== undefined ? http.status : 200;
        if (status === 200 || status === 204 || status === 0) {
            this.complete();
        }
        else {
            this.error("[" + http.status + "]" + http.statusText + ":" + http.responseURL);
        }
    }
    error(message) {
        this.clear();
        this.event(Event.ERROR, message);
    }
    complete() {
        this.clear();
        var flag = true;
        try {
            if (this._responseType === "json") {
                this._data = JSON.parse(this._http.responseText);
            }
            else if (this._responseType === "xml") {
                this._data = new XML(this._http.responseText);
            }
            else {
                this._data = this._http.response || this._http.responseText;
            }
        }
        catch (e) {
            flag = false;
            this.error(e.message);
        }
        flag && this.event(Event.COMPLETE, this._data instanceof Array ? [this._data] : this._data);
    }
    clear() {
        var http = this._http;
        http.onerror = http.onabort = http.onprogress = http.onload = null;
    }
    get url() {
        return this._url;
    }
    get data() {
        return this._data;
    }
    get http() {
        return this._http;
    }
    reset() {
        this.offAll();
        this._data = null;
    }
}
HttpRequest._urlEncode = encodeURI;

//# sourceMappingURL=HttpRequest.js.map
