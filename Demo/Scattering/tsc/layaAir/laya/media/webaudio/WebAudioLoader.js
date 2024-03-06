import { Loader } from "../../net/Loader";
import { WebAudioSound } from "./WebAudioSound";
class WebAudioLoader {
    load(task) {
        return task.loader.fetch(task.url, "arraybuffer", task.progress.createCallback(), task.options).then(data => {
            if (!data)
                return null;
            return WebAudioSound.ctx.decodeAudioData(data);
        });
    }
}
Loader.registerLoader(["mp3", "wav", "ogg"], WebAudioLoader, Loader.SOUND);

//# sourceMappingURL=WebAudioLoader.js.map
