import { Text } from "./Text";
import { Event } from "../events/Event";
import { ILaya } from "../../ILaya";
import { LayaEnv } from "../../LayaEnv";
import { InputManager } from "../events/InputManager";
import { Render } from "../renders/Render";
import { SpriteUtils } from "../utils/SpriteUtils";
export class Input extends Text {
    constructor() {
        super();
        this._multiline = false;
        this._editable = true;
        this._maxChars = 0;
        this._type = "text";
        Input.IOS_IFRAME = (ILaya.Browser.onIOS && ILaya.Browser.window.top != ILaya.Browser.window.self);
        this._width = 100;
        this._height = 20;
        this.multiline = false;
        this.overflow = Text.SCROLL;
        this._promptColor = "#A9A9A9";
        this.on(Event.MOUSE_DOWN, this, this._onMouseDown);
        this.on(Event.UNDISPLAY, this, this._onUnDisplay);
    }
    static __init__() {
        Input._createInputElement();
        if (ILaya.Browser.onMobile) {
            var isTrue = false;
            if (ILaya.Browser.onMiniGame || ILaya.Browser.onBDMiniGame || ILaya.Browser.onQGMiniGame || ILaya.Browser.onKGMiniGame || ILaya.Browser.onVVMiniGame || ILaya.Browser.onAlipayMiniGame || ILaya.Browser.onQQMiniGame || ILaya.Browser.onBLMiniGame || ILaya.Browser.onTTMiniGame || ILaya.Browser.onHWMiniGame || ILaya.Browser.onTBMiniGame) {
                isTrue = true;
            }
            Render.canvas.addEventListener(Input.IOS_IFRAME ? (isTrue ? "touchend" : "click") : "touchend", Input._popupInputMethod);
        }
    }
    static _popupInputMethod(e) {
        if (!InputManager.isTextInputting)
            return;
        var input = Input.inputElement;
        input.focus();
    }
    static _createInputElement() {
        Input._initInput(Input.area = ILaya.Browser.createElement("textarea"));
        Input._initInput(Input.input = ILaya.Browser.createElement("input"));
        Input.inputContainer = ILaya.Browser.createElement("div");
        Input.inputContainer.style.position = "absolute";
        Input.inputContainer.style.zIndex = '1E5';
        ILaya.Browser.container.appendChild(Input.inputContainer);
        Input.inputContainer.setPos = function (x, y) {
            Input.inputContainer.style.left = x + 'px';
            Input.inputContainer.style.top = y + 'px';
        };
    }
    static _initInput(input) {
        var style = input.style;
        style.cssText = "position:absolute;overflow:hidden;resize:none;transform-origin:0 0;-webkit-transform-origin:0 0;-moz-transform-origin:0 0;-o-transform-origin:0 0;";
        style.resize = 'none';
        style.backgroundColor = 'transparent';
        style.border = 'none';
        style.outline = 'none';
        style.zIndex = '1';
        input.addEventListener('input', Input._processInputting);
        input.addEventListener('mousemove', Input._stopEvent, { passive: false });
        input.addEventListener('mousedown', Input._stopEvent, { passive: false });
        input.addEventListener('touchmove', Input._stopEvent, { passive: false });
        input.setFontFace = function (fontFace) { input.style.fontFamily = fontFace; };
        if (!(LayaEnv.isConch && !Input.isAppUseNewInput)) {
            input.setColor = function (color) { input.style.color = color; };
            input.setFontSize = function (fontSize) { input.style.fontSize = fontSize + 'px'; };
        }
    }
    static _processInputting(e) {
        var input = Input.inputElement.target;
        if (!input)
            return;
        var value = Input.inputElement.value;
        if (input._restrictPattern) {
            value = value.replace(/\u2006|\x27/g, "");
            if (input._restrictPattern.test(value)) {
                value = value.replace(input._restrictPattern, "");
                Input.inputElement.value = value;
            }
        }
        if (value == null)
            value = "";
        input._text = value;
        input.event(Event.INPUT);
    }
    static _stopEvent(e) {
        if (e.type == 'touchmove')
            e.preventDefault();
        e.stopPropagation && e.stopPropagation();
    }
    setSelection(startIndex, endIndex) {
        this.focus = true;
        Input.inputElement.selectionStart = startIndex;
        Input.inputElement.selectionEnd = endIndex;
    }
    get multiline() {
        return this._multiline;
    }
    set multiline(value) {
        this._multiline = value;
        this.valign = value ? "top" : "middle";
    }
    get nativeInput() {
        return this._multiline ? Input.area : Input.input;
    }
    _onUnDisplay(e = null) {
        this.focus = false;
    }
    _onMouseDown(e) {
        this.focus = true;
    }
    _syncInputTransform() {
        var inputElement = this.nativeInput;
        var transform = SpriteUtils.getTransformRelativeToWindow(this, this._padding[3], this._padding[0]);
        var inputWid = this._width - this._padding[1] - this._padding[3];
        var inputHei = this._height - this._padding[0] - this._padding[2];
        if (LayaEnv.isConch && !Input.isAppUseNewInput) {
            inputElement.setScale(transform.scaleX, transform.scaleY);
            inputElement.setSize(inputWid, inputHei);
            inputElement.setPos(transform.x, transform.y);
        }
        else {
            Input.inputContainer.style.transform = Input.inputContainer.style.webkitTransform = "scale(" + transform.scaleX + "," + transform.scaleY + ") rotate(" + (ILaya.stage.canvasDegree) + "deg)";
            inputElement.style.width = inputWid + 'px';
            inputElement.style.height = inputHei + 'px';
            Input.inputContainer.style.left = transform.x + 'px';
            Input.inputContainer.style.top = transform.y + 'px';
        }
    }
    select() {
        this.nativeInput.select();
    }
    get focus() {
        return this._focus;
    }
    set focus(value) {
        var input = this.nativeInput;
        if (this._focus !== value) {
            if (value) {
                if (input.target) {
                    input.target._focusOut();
                }
                else {
                    this._setInputMethod();
                }
                input = this.nativeInput;
                input.target = this;
                this._focusIn();
            }
            else {
                input.target = null;
                this._focusOut();
                ILaya.Browser.document.body.scrollTop = 0;
                input.blur();
                if (LayaEnv.isConch && !Input.isAppUseNewInput)
                    input.setPos(-10000, -10000);
                else if (Input.inputContainer.contains(input))
                    Input.inputContainer.removeChild(input);
            }
        }
    }
    _setInputMethod() {
        Input.input.parentElement && (Input.inputContainer.removeChild(Input.input));
        Input.area.parentElement && (Input.inputContainer.removeChild(Input.area));
        if (ILaya.Browser.onAndroid) {
            Input.input = Input.inputElement = ILaya.Browser.createElement('input');
            Input._initInput(Input.input);
        }
        Input.inputElement = (this._multiline ? Input.area : Input.input);
        Input.inputContainer.appendChild(Input.inputElement);
        if (Text.RightToLeft) {
            Input.inputElement.style.direction = "rtl";
        }
    }
    _focusIn() {
        InputManager.isTextInputting = true;
        var input = this.nativeInput;
        Input.input && (Input.input.type = this._type);
        this._focus = true;
        var cssStyle = input.style;
        cssStyle.whiteSpace = (this.wordWrap ? "pre-wrap" : "nowrap");
        this._setPromptColor();
        input.readOnly = !this._editable;
        if (LayaEnv.isConch && !Input.isAppUseNewInput) {
            input.setType(this._type);
            input.setForbidEdit(!this._editable);
        }
        input.maxLength = this._maxChars <= 0 ? 1E5 : this._maxChars;
        input.value = this._text;
        input.placeholder = this._prompt;
        ILaya.stage.off(Event.KEY_DOWN, this, this._onKeyDown);
        ILaya.stage.on(Event.KEY_DOWN, this, this._onKeyDown);
        ILaya.stage.focus = this;
        this.event(Event.FOCUS);
        if (ILaya.Browser.onPC)
            input.focus();
        if (!(LayaEnv.isConch && Input.isAppUseNewInput) && !ILaya.Browser.onMiniGame && !ILaya.Browser.onBDMiniGame && !ILaya.Browser.onQGMiniGame && !ILaya.Browser.onKGMiniGame && !ILaya.Browser.onVVMiniGame && !ILaya.Browser.onAlipayMiniGame && !ILaya.Browser.onQQMiniGame && !ILaya.Browser.onBLMiniGame && !ILaya.Browser.onTTMiniGame && !ILaya.Browser.onHWMiniGame && !ILaya.Browser.onTBMiniGame) {
            this.graphics.clear(true);
            this.drawBg();
            this._hideText = true;
        }
        input.setColor(this.color);
        input.setFontSize(this.fontSize);
        input.setFontFace(this._realFont);
        if (LayaEnv.isConch && !Input.isAppUseNewInput) {
            input.setMultiAble && input.setMultiAble(this._multiline);
        }
        cssStyle.lineHeight = (this.leading + this.fontSize) + "px";
        cssStyle.fontStyle = (this.italic ? "italic" : "normal");
        cssStyle.fontWeight = (this.bold ? "bold" : "normal");
        cssStyle.textAlign = this.align;
        cssStyle.padding = "0 0";
        this._syncInputTransform();
        if (!LayaEnv.isConch && ILaya.Browser.onPC)
            ILaya.systemTimer.frameLoop(1, this, this._syncInputTransform);
    }
    _setPromptColor() {
        Input.promptStyleDOM = ILaya.Browser.getElementById("promptStyle");
        if (!Input.promptStyleDOM) {
            Input.promptStyleDOM = ILaya.Browser.createElement("style");
            Input.promptStyleDOM.setAttribute("id", "promptStyle");
            ILaya.Browser.document.head.appendChild(Input.promptStyleDOM);
        }
        Input.promptStyleDOM.innerText = "input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {" + "color:" + this._promptColor + "}" + "input:-moz-placeholder, textarea:-moz-placeholder {" + "color:" + this._promptColor + "}" + "input::-moz-placeholder, textarea::-moz-placeholder {" + "color:" + this._promptColor + "}" + "input:-ms-input-placeholder, textarea:-ms-input-placeholder {" + "color:" + this._promptColor + "}";
    }
    _focusOut() {
        if (!InputManager.isTextInputting)
            return;
        if (!InputManager.isiOSWKwebView)
            InputManager.isTextInputting = false;
        this._focus = false;
        this._hideText = false;
        this.text = this.nativeInput.value;
        this.markChanged();
        this.typeset();
        ILaya.stage.off(Event.KEY_DOWN, this, this._onKeyDown);
        ILaya.stage.focus = null;
        this.event(Event.BLUR);
        this.event(Event.CHANGE);
        if (LayaEnv.isConch && !Input.isAppUseNewInput)
            this.nativeInput.blur();
        ILaya.Browser.onPC && ILaya.systemTimer.clear(this, this._syncInputTransform);
    }
    _onKeyDown(e) {
        if (e.keyCode === 13) {
            if (ILaya.Browser.onMobile && !this._multiline)
                this.focus = false;
            this.event(Event.ENTER);
        }
    }
    miniGameTxt(value) {
        value += '';
        if (!this._multiline)
            value = value.replace(/\r?\n/g, '');
        this.text = value;
    }
    set text(value) {
        if (value == null)
            value = "";
        else if (typeof (value) !== "string")
            value = '' + value;
        if (this._focus) {
            this.nativeInput.value = value;
            this.event(Event.CHANGE);
        }
        else {
            if (!this._multiline)
                value = value.replace(/\r?\n/g, '');
            super.text = value;
        }
    }
    get text() {
        if (this._focus)
            return this.nativeInput.value;
        else
            return super.text;
    }
    set_color(value) {
        if (this._focus)
            this.nativeInput.setColor(value);
        super.set_color(value);
    }
    set bgColor(value) {
        super.bgColor = value;
        if (LayaEnv.isConch && !Input.isAppUseNewInput)
            this.nativeInput.setBgColor(value);
    }
    get bgColor() {
        return super.bgColor;
    }
    get restrict() {
        return this._restrict;
    }
    set restrict(value) {
        this._restrict = value;
        if (value) {
            value = "[^" + value + "]";
            if (value.indexOf("^^") > -1)
                value = value.replace("^^", "");
            this._restrictPattern = new RegExp(value, "g");
        }
        else
            this._restrictPattern = null;
    }
    set editable(value) {
        this._editable = value;
        if (LayaEnv.isConch && !Input.isAppUseNewInput) {
            Input.input.setForbidEdit(!value);
        }
    }
    get editable() {
        return this._editable;
    }
    get maxChars() {
        return this._maxChars;
    }
    set maxChars(value) {
        this._maxChars = value;
    }
    get prompt() {
        return this._prompt;
    }
    set prompt(value) {
        var _a;
        value = ((_a = Text.langPacks) === null || _a === void 0 ? void 0 : _a[value]) || value;
        if (this._prompt != value) {
            this._prompt = value;
            this.markChanged();
        }
    }
    get promptColor() {
        return this._promptColor;
    }
    set promptColor(value) {
        if (this._promptColor != value) {
            this._promptColor = value;
            this.markChanged();
        }
    }
    get type() {
        return this._type;
    }
    set type(value) {
        this._asPassword = value === "password";
        this._type = value;
    }
}
Input.TYPE_TEXT = "text";
Input.TYPE_PASSWORD = "password";
Input.TYPE_EMAIL = "email";
Input.TYPE_URL = "url";
Input.TYPE_NUMBER = "number";
Input.TYPE_RANGE = "range";
Input.TYPE_DATE = "date";
Input.TYPE_MONTH = "month";
Input.TYPE_WEEK = "week";
Input.TYPE_TIME = "time";
Input.TYPE_DATE_TIME = "datetime";
Input.TYPE_DATE_TIME_LOCAL = "datetime-local";
Input.TYPE_SEARCH = "search";
Input.IOS_IFRAME = false;
Input.isAppUseNewInput = false;

//# sourceMappingURL=Input.js.map
