import { Resource } from "./Resource";
export declare enum TextResourceFormat {
    Buffer = 0,
    Plain = 1,
    JSON = 2,
    XML = 3
}
export declare class TextResource extends Resource {
    readonly data: any;
    readonly format: TextResourceFormat;
    constructor(data: any, format: TextResourceFormat);
}
