import { ClassUtils } from "../utils/ClassUtils";
export class HtmlParseOptions {
    constructor() {
        this.linkUnderline = HtmlParseOptions.defaultLinkUnderline;
        this.linkColor = HtmlParseOptions.defaultLinkColor;
    }
}
HtmlParseOptions.defaultLinkUnderline = true;
HtmlParseOptions.defaultLinkColor = null;
ClassUtils.regClass("HtmlParseOptions", HtmlParseOptions);

//# sourceMappingURL=HtmlParseOptions.js.map
