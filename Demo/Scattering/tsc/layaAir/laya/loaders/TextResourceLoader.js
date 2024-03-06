import { Loader } from "../net/Loader";
import { TextResource, TextResourceFormat } from "../resource/TextResource";
class TextAssetLoader {
    load(task) {
        return task.loader.fetch(task.url, "text", task.progress.createCallback(), task.options).then(data => {
            if (!data)
                return null;
            return new TextResource(data, TextResourceFormat.Plain);
        });
    }
}
class BytesAssetLoader {
    load(task) {
        return task.loader.fetch(task.url, "arraybuffer", task.progress.createCallback(), task.options).then(data => {
            if (!data)
                return null;
            return new TextResource(data, TextResourceFormat.Buffer);
        });
    }
}
class JsonAssetLoader {
    load(task) {
        return task.loader.fetch(task.url, "json", task.progress.createCallback(), task.options).then(data => {
            if (!data)
                return null;
            return new TextResource(data, TextResourceFormat.JSON);
        });
    }
}
class XMLAssetLoader {
    load(task) {
        return task.loader.fetch(task.url, "xml", task.progress.createCallback(), task.options).then(data => {
            if (!data)
                return null;
            return new TextResource(data, TextResourceFormat.XML);
        });
    }
}
Loader.registerLoader(["txt", "csv"], TextAssetLoader, Loader.TEXT);
Loader.registerLoader(["bin", "bytes", "fui"], BytesAssetLoader, Loader.BUFFER);
Loader.registerLoader(["json"], JsonAssetLoader, Loader.JSON);
Loader.registerLoader(["xml"], XMLAssetLoader, Loader.XML);

//# sourceMappingURL=TextResourceLoader.js.map
