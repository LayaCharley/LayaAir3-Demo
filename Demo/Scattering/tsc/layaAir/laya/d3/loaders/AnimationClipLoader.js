import { Loader } from "../../net/Loader";
import { AssetDb } from "../../resource/AssetDb";
import { AnimationClip } from "../animation/AnimationClip";
class AnimationClipLoader {
    load(task) {
        let url = AssetDb.inst.getSubAssetURL(task.url, task.uuid, null, "lani");
        return task.loader.fetch(url, "arraybuffer", task.progress.createCallback(), task.options).then(data => {
            if (!data) {
                return null;
            }
            return AnimationClip._parse(data);
        });
    }
}
Loader.registerLoader(["lani"], AnimationClipLoader, Loader.ANIMATIONCLIP);

//# sourceMappingURL=AnimationClipLoader.js.map
