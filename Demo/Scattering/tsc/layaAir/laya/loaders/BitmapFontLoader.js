import { BitmapFont } from "../display/BitmapFont";
import { Loader } from "../net/Loader";
import { Utils } from "../utils/Utils";
class BitmapFontLoader {
    load(task) {
        let picUrl = Utils.replaceFileExtension(task.url, "png");
        return Promise.all([
            task.loader.fetch(task.url, "xml", task.progress.createCallback(0.2), task.options),
            task.loader.load(picUrl, task.options, task.progress.createCallback(0.8))
        ]).then(([xml, tex]) => {
            if (!xml || !tex)
                return null;
            let font = new BitmapFont();
            font.parseFont(xml, tex);
            return font;
        });
    }
}
Loader.registerLoader(["fnt"], BitmapFontLoader, Loader.FONT);

//# sourceMappingURL=BitmapFontLoader.js.map
