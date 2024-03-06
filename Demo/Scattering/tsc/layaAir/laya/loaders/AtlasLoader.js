import { Loader } from "../net/Loader";
import { AtlasResource } from "../resource/AtlasResource";
import { Texture } from "../resource/Texture";
import { Utils } from "../utils/Utils";
class AtlasLoader {
    load(task) {
        return task.loader.fetch(task.url, "json", task.progress.createCallback(0.2), task.options).then(data => {
            if (!data)
                return null;
            let toloadPics = [];
            if (data.meta && data.meta.image) {
                let folderPath = "";
                let i = task.url.lastIndexOf("/");
                if (i != -1)
                    folderPath = task.url.substring(0, i + 1);
                let query = "";
                i = task.url.lastIndexOf("?");
                if (i != -1)
                    query = task.url.substring(i);
                let pics = data.meta.image.split(",");
                for (let pic of pics)
                    toloadPics.push(task.loader.load(folderPath + pic + query, null, task.progress.createCallback()));
            }
            else {
                toloadPics.push(task.loader.load(Utils.replaceFileExtension(task.url, "png"), null, task.progress.createCallback()));
            }
            return Promise.all(toloadPics).then(pics => {
                let baseUrl = task.options.baseUrl || "";
                let frames = data.frames;
                let directory = (data.meta && data.meta.prefix != null) ? data.meta.prefix : task.url.substring(0, task.url.lastIndexOf(".")) + "/";
                let subTextures = [];
                let scaleRate = 1;
                if (data.meta && data.meta.scale && data.meta.scale != 1)
                    scaleRate = parseFloat(data.meta.scale);
                for (let tPic of pics) {
                    if (tPic) {
                        tPic._addReference();
                        tPic.scaleRate = scaleRate;
                    }
                }
                for (let name in frames) {
                    let obj = frames[name];
                    let tPic = pics[obj.frame.idx ? obj.frame.idx : 0];
                    if (!tPic)
                        continue;
                    let url = baseUrl + directory + (obj.filename || name);
                    let tt = Texture.create(tPic, obj.frame.x, obj.frame.y, obj.frame.w, obj.frame.h, obj.spriteSourceSize.x, obj.spriteSourceSize.y, obj.sourceSize.w, obj.sourceSize.h);
                    tt.lock = true;
                    tt._sizeGrid = obj.sizeGrid;
                    tt._stateNum = obj.stateNum;
                    task.loader.cacheRes(url, tt);
                    tt.url = url;
                    subTextures.push(tt);
                }
                return new AtlasResource(directory, pics, subTextures);
            });
        });
    }
}
Loader.registerLoader(["atlas"], AtlasLoader, Loader.ATLAS);

//# sourceMappingURL=AtlasLoader.js.map
