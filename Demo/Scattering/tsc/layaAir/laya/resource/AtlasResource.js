import { Resource } from "./Resource";
export class AtlasResource extends Resource {
    constructor(dir, textures, frames) {
        super();
        this.dir = dir;
        this.textures = textures;
        this.frames = frames;
        this.lock = true;
    }
    _disposeResource() {
        for (let tex of this.textures) {
            if (tex)
                tex.destroy();
        }
        for (let tex of this.frames)
            tex.destroy();
        this.frames.length = 0;
        this.textures.length = 0;
    }
}

//# sourceMappingURL=AtlasResource.js.map
