import { ILoadURL } from "../../net/Loader";
import { Material } from "../core/material/Material";
export declare class MaterialParser {
    static parse(data: any): Material;
    static collectLinks(data: any, basePath: string): ILoadURL[];
    static parseLegacy(data: any): Material;
    private static _getRenderStateParams;
}
