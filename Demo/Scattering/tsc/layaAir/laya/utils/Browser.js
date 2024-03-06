import { Config } from "../../Config";
import { ILaya } from "../../ILaya";
export class Browser {
    static __init__() {
        let Laya = window.Laya || ILaya.Laya;
        if (Browser._window)
            return Browser._window;
        let win = Browser._window = window;
        let doc = Browser._document = win.document;
        let u = Browser.userAgent = win.navigator.userAgent;
        let maxTouchPoints = win.navigator.maxTouchPoints || 0;
        let platform = win.navigator.platform;
        if (!!window.conch && "conchUseWXAdapter" in Browser.window) {
            window.wxMiniGame(Laya, Laya);
            Laya["MiniAdpter"].enable();
        }
        if ("my" in Browser.window) {
            if (u.indexOf('TB/') > -1 || u.indexOf('Taobao/') > -1 || u.indexOf('TM/') > -1) {
                window.tbMiniGame(Laya, Laya);
                if (!Laya["TBMiniAdapter"]) {
                    console.error("请先添加淘宝适配库,详细教程：https://ldc2.layabox.com/doc/?language=zh&nav=zh-ts-5-6-0");
                }
                else {
                    Laya["TBMiniAdapter"].enable();
                }
            }
            else if (u.indexOf('AlipayMiniGame') > -1) {
                window.aliPayMiniGame(Laya, Laya);
                if (!Laya["ALIMiniAdapter"]) {
                    console.error("请先添加阿里小游戏适配库,详细教程：https://ldc2.layabox.com/doc/?language=zh&nav=zh-ts-5-6-0");
                }
                else {
                    Laya["ALIMiniAdapter"].enable();
                }
            }
        }
        if (((u.indexOf('OPPO') == -1 && u.indexOf("MiniGame") > -1) || u.indexOf('runtime') != -1 || (u.indexOf('miniprogram') != -1 && window.isWXMiMi)) && "wx" in Browser.window) {
            if ("tt" in Browser.window) {
                window.ttMiniGame(Laya, Laya);
                if (!Laya["TTMiniAdapter"]) {
                    console.error("请引入字节跳动小游戏的适配库");
                }
                else {
                    Laya["TTMiniAdapter"].enable();
                }
            }
            else if ("bl" in Browser.window) {
                window.biliMiniGame(Laya, Laya);
                if (!Laya["BLMiniAdapter"]) {
                    console.error("请引入bilibili小游戏的适配库,详细教程：https://ldc2.layabox.com/doc/?language=zh&nav=zh-ts-5-7-0");
                }
                else {
                    Laya["BLMiniAdapter"].enable();
                }
            }
            else if ("qq" in Browser.window) {
                window.qqMiniGame(Laya, Laya);
                if (!Laya["QQMiniAdapter"]) {
                    console.error("请引入手机QQ小游戏的适配库,详细教程：https://ldc2.layabox.com/doc/?language=zh&nav=zh-ts-5-0-0");
                }
                else {
                    Laya["QQMiniAdapter"].enable();
                }
            }
            else {
                window.wxMiniGame(Laya, Laya);
                if (!Laya["MiniAdpter"]) {
                    console.error("请先添加小游戏适配库,详细教程：https://ldc2.layabox.com/doc/?nav=zh-ts-5-0-0");
                }
                else {
                    Laya["MiniAdpter"].enable();
                }
            }
        }
        if ("hbs" in Browser.window) {
            window.hwMiniGame(Laya, Laya);
            if (!Laya["HWMiniAdapter"]) {
                console.error("请先添加小游戏适配库!");
            }
            else {
                Laya["HWMiniAdapter"].enable();
            }
        }
        if (u.indexOf("SwanGame") > -1) {
            window.bdMiniGame(Laya, Laya);
            if (!Laya["BMiniAdapter"]) {
                console.error("请先添加百度小游戏适配库,详细教程：https://ldc2.layabox.com/doc/?language=zh&nav=zh-ts-5-1-0");
            }
            else {
                Laya["BMiniAdapter"].enable();
            }
        }
        if (u.indexOf('QuickGame') > -1) {
            window.miMiniGame(Laya, Laya);
            if (!Laya["KGMiniAdapter"]) {
                console.error("请先添加小米小游戏适配库,详细教程：https://ldc2.layabox.com/doc/?language=zh&nav=zh-ts-5-2-0");
            }
            else {
                Laya["KGMiniAdapter"].enable();
            }
        }
        if (u.indexOf('OPPO') > -1 && u.indexOf('MiniGame') > -1) {
            window.qgMiniGame(Laya, Laya);
            if (!Laya["QGMiniAdapter"]) {
                console.error("请先添加OPPO小游戏适配库,详细教程：https://ldc2.layabox.com/doc/?language=zh&nav=zh-ts-5-3-0");
            }
            else {
                Config.fixedFrames = false;
                Laya["QGMiniAdapter"].enable();
            }
        }
        if (u.indexOf('VVGame') > -1) {
            window.vvMiniGame(Laya, Laya);
            if (!Laya["VVMiniAdapter"]) {
                console.error("请先添加VIVO小游戏适配库,详细教程：https://ldc2.layabox.com/doc/?language=zh&nav=zh-ts-5-4-0");
            }
            else {
                Config.fixedFrames = false;
                Laya["VVMiniAdapter"].enable();
            }
        }
        win.trace = console.log;
        win.requestAnimationFrame = win.requestAnimationFrame || win.webkitRequestAnimationFrame || win.mozRequestAnimationFrame || win.oRequestAnimationFrame || win.msRequestAnimationFrame || function (fun) {
            return win.setTimeout(fun, 1000 / 60);
        };
        var bodyStyle = doc.body.style;
        bodyStyle.margin = 0;
        bodyStyle.overflow = 'hidden';
        bodyStyle['-webkit-user-select'] = 'none';
        bodyStyle['-webkit-tap-highlight-color'] = 'rgba(200,200,200,0)';
        var metas = doc.getElementsByTagName('meta');
        var i = 0, flag = false, content = 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no';
        while (i < metas.length) {
            var meta = metas[i];
            if (meta.name == 'viewport') {
                meta.content = content;
                flag = true;
                break;
            }
            i++;
        }
        if (!flag) {
            meta = doc.createElement('meta');
            meta.name = 'viewport', meta.content = content;
            doc.getElementsByTagName('head')[0].appendChild(meta);
        }
        Browser.onMobile = window.conch ? true : u.indexOf("Mobile") > -1;
        Browser.onIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        Browser.onIPhone = u.indexOf("iPhone") > -1;
        Browser.onMac = u.indexOf("Mac OS X") > -1;
        Browser.onIPad = u.indexOf("iPad") > -1 || (platform === 'MacIntel' && maxTouchPoints > 1);
        Browser.onAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
        Browser.onWP = u.indexOf("Windows Phone") > -1;
        Browser.onQQBrowser = u.indexOf("QQBrowser") > -1;
        Browser.onMQQBrowser = u.indexOf("MQQBrowser") > -1 || (u.indexOf("Mobile") > -1 && u.indexOf("QQ") > -1);
        Browser.onIE = !!win.ActiveXObject || "ActiveXObject" in win;
        Browser.onWeiXin = u.indexOf('MicroMessenger') > -1;
        Browser.onSafari = u.indexOf("Safari") > -1;
        Browser.onChrome = u.indexOf("Chrome") > -1;
        Browser.onPC = !Browser.onMobile;
        Browser.onFirefox = u.indexOf('Firefox') > -1;
        Browser.onEdge = u.indexOf('Edge') > -1;
        Browser.onMiniGame = u.indexOf('MiniGame') > -1;
        Browser.onBDMiniGame = u.indexOf('SwanGame') > -1;
        Browser.onLayaRuntime = !!window.conch;
        if (u.indexOf('OPPO') > -1 && u.indexOf('MiniGame') > -1) {
            Browser.onQGMiniGame = true;
            Browser.onMiniGame = false;
        }
        else if ("qq" in Browser.window && u.indexOf('MiniGame') > -1) {
            Browser.onQQMiniGame = true;
            Browser.onMiniGame = false;
        }
        else if ("bl" in Browser.window && u.indexOf('MiniGame') > -1) {
            Browser.onBLMiniGame = true;
            Browser.onMiniGame = false;
        }
        else if ("tt" in Browser.window && u.indexOf('MiniGame') > -1) {
            Browser.onTTMiniGame = true;
            Browser.onMiniGame = false;
        }
        Browser.onHWMiniGame = "hbs" in Browser.window;
        Browser.onVVMiniGame = u.indexOf('VVGame') > -1;
        Browser.onKGMiniGame = u.indexOf('QuickGame') > -1;
        if (u.indexOf('AlipayMiniGame') > -1) {
            Browser.onAlipayMiniGame = true;
            Browser.onMiniGame = false;
        }
        if (u.indexOf('TB/') > -1 || u.indexOf('Taobao/') > -1 || u.indexOf('TM/') > -1) {
            Browser.onTBMiniGame = true;
        }
        if (Browser.onAndroid || Browser.onIOS) {
            if (platform && (platform.indexOf("Win") != -1 || platform.indexOf("Mac") != -1))
                Browser.platform = Browser.PLATFORM_PC;
            else if (Browser.onAndroid)
                Browser.platform = Browser.PLATFORM_ANDROID;
            else
                Browser.platform = Browser.PLATFORM_IOS;
        }
        else
            Browser.platform = Browser.PLATFORM_PC;
        return win;
    }
    static get _isMiniGame() {
        return Browser.onMiniGame || Browser.onBDMiniGame || Browser.onQGMiniGame || Browser.onKGMiniGame || Browser.onVVMiniGame || Browser.onAlipayMiniGame || Browser.onQQMiniGame || Browser.onBLMiniGame || Browser.onTTMiniGame || Browser.onHWMiniGame || Browser.onTBMiniGame || (Browser.window && Browser.window.isWXMiMi);
    }
    static createElement(type) {
        Browser.__init__();
        return Browser._document.createElement(type);
    }
    static getElementById(type) {
        Browser.__init__();
        return Browser._document.getElementById(type);
    }
    static removeElement(ele) {
        if (ele && ele.parentNode)
            ele.parentNode.removeChild(ele);
    }
    static now() {
        return Date.now();
    }
    static get clientWidth() {
        Browser.__init__();
        return Browser._clientWidth || Browser._window.innerWidth || Browser._document.body.clientWidth;
    }
    static set clientWidth(value) {
        Browser._clientWidth = value;
    }
    static get clientHeight() {
        Browser.__init__();
        return Browser._clientHeight || Browser._window.innerHeight || Browser._document.body.clientHeight || Browser._document.documentElement.clientHeight;
    }
    static set clientHeight(value) {
        Browser._clientHeight = value;
    }
    static get width() {
        Browser.__init__();
        return ((ILaya.stage && ILaya.stage.canvasRotation) ? Browser.clientHeight : Browser.clientWidth) * Browser.pixelRatio;
    }
    static get height() {
        Browser.__init__();
        return ((ILaya.stage && ILaya.stage.canvasRotation) ? Browser.clientWidth : Browser.clientHeight) * Browser.pixelRatio;
    }
    static get pixelRatio() {
        if (Browser._pixelRatio < 0) {
            Browser.__init__();
            if (Browser.userAgent.indexOf("Mozilla/6.0(Linux; Android 6.0; HUAWEI NXT-AL10 Build/HUAWEINXT-AL10)") > -1)
                Browser._pixelRatio = 2;
            else {
                Browser._pixelRatio = (Browser._window.devicePixelRatio || 1);
                if (Browser._pixelRatio < 1)
                    Browser._pixelRatio = 1;
            }
        }
        return Browser._pixelRatio;
    }
    static get container() {
        if (!Browser._container) {
            Browser.__init__();
            Browser._container = Browser.createElement("div");
            Browser._container.id = "layaContainer";
            Browser._document.body.appendChild(Browser._container);
        }
        return Browser._container;
    }
    static set container(value) {
        Browser._container = value;
    }
    static get window() {
        return Browser._window || Browser.__init__();
    }
    static get document() {
        Browser.__init__();
        return Browser._document;
    }
    static getQueryString(name) {
        if (Browser.onMiniGame)
            return null;
        if (!window.location || !window.location.search)
            return null;
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substring(1).match(reg);
        if (r != null)
            return unescape(r[2]);
        return null;
    }
}
Browser.PLATFORM_PC = 0;
Browser.PLATFORM_ANDROID = 1;
Browser.PLATFORM_IOS = 2;
Browser._pixelRatio = -1;
Browser.mainCanvas = null;
Browser.hanzi = new RegExp("^[\u4E00-\u9FA5]$");
Browser.fontMap = {};
Browser.measureText = function (txt, font) {
    let isChinese = Browser.hanzi.test(txt);
    if (isChinese && Browser.fontMap[font]) {
        return Browser.fontMap[font];
    }
    let ctx = Browser.context;
    ctx.font = font;
    let r = ctx.measureText(txt);
    if (isChinese)
        Browser.fontMap[font] = r;
    return r;
};

//# sourceMappingURL=Browser.js.map
