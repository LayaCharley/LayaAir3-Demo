import { Resource } from "./Resource";
import { Texture } from "./Texture";
export declare class AtlasResource extends Resource {
    readonly dir: string;
    readonly textures: Array<Texture>;
    readonly frames: Array<Texture>;
    constructor(dir: string, textures: Array<Texture>, frames: Array<Texture>);
}
