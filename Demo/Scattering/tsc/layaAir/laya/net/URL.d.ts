export declare class URL {
    static version: Record<string, string>;
    static basePath: string;
    static basePaths: Record<string, string>;
    static rootPath: string;
    private _url;
    private _path;
    private static overrideFileExts;
    private static hasExtOverrides;
    static __init__(): void;
    static initMiniGameExtensionOverrides(): void;
    constructor(url: string);
    get url(): string;
    get path(): string;
    static customFormat: Function;
    static formatURL(url: string, base?: string): string;
    static postFormatURL(url: string): string;
    static normalize(url: string): string;
    static getResURLByUUID(url: string): string;
    static join(base: string, path: string): string;
    static getPath(url: string): string;
    static getFileName(url: string): string;
    static getURLVerion(url: string): string;
    static overrideExtension(originalExts: Array<string>, targetExt: string): void;
}
