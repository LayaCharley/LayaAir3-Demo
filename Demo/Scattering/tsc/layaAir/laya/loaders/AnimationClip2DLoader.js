import { AnimationClip2D } from "../components/AnimationClip2D";
import { Loader } from "../net/Loader";
class AnimationClip2DLoader {
    load(task) {
        return task.loader.fetch(task.url, "arraybuffer", task.progress.createCallback(), task.options).then(data => {
            if (!data)
                return null;
            return AnimationClip2D._parse(data);
        });
    }
}
Loader.registerLoader(["mc"], AnimationClip2DLoader);

//# sourceMappingURL=AnimationClip2DLoader.js.map
