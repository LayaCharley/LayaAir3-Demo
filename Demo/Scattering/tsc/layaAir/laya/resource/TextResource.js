import { Resource } from "./Resource";
export var TextResourceFormat;
(function (TextResourceFormat) {
    TextResourceFormat[TextResourceFormat["Buffer"] = 0] = "Buffer";
    TextResourceFormat[TextResourceFormat["Plain"] = 1] = "Plain";
    TextResourceFormat[TextResourceFormat["JSON"] = 2] = "JSON";
    TextResourceFormat[TextResourceFormat["XML"] = 3] = "XML";
})(TextResourceFormat || (TextResourceFormat = {}));
export class TextResource extends Resource {
    constructor(data, format) {
        super();
        this.data = data;
        this.format = format;
    }
}

//# sourceMappingURL=TextResource.js.map
