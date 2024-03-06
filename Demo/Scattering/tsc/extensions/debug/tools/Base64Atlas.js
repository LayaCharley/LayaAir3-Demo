import { Laya } from "Laya";
import { Base64ImageTool } from "./Base64ImageTool";
import { ObjectTools } from "./ObjectTools";
import { Loader } from "laya/net/Loader";
import { Handler } from "laya/utils/Handler";
export class Base64Atlas {
    constructor(data, idKey = null) {
        this.data = data;
        if (!idKey)
            idKey = Math.random() + "key";
        this.idKey = idKey;
        this.init();
    }
    init() {
        this.replaceO = {};
        var key;
        for (key in this.data) {
            this.replaceO[key] = this.idKey + "/" + key;
        }
    }
    getAdptUrl(url) {
        return this.replaceO[url];
    }
    preLoad(completeHandler = null) {
        this._loadedHandler = completeHandler;
        Laya.loader.load(Base64ImageTool.getPreloads(this.data), new Handler(this, this.preloadEnd));
    }
    preloadEnd() {
        var key;
        for (key in this.data) {
            var tx;
            tx = Laya.loader.getRes(this.data[key]);
            Loader.cacheRes(this.replaceO[key], tx);
        }
        if (this._loadedHandler) {
            this._loadedHandler.run();
        }
    }
    replaceRes(uiObj) {
        ObjectTools.replaceValue(uiObj, this.replaceO);
    }
}
