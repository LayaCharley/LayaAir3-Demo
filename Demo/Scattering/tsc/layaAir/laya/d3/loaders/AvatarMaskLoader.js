import { Loader } from "../../net/Loader";
import { AvatarMask } from "../component/Animator/AvatarMask";
class AvatarMaskLoader {
    load(task) {
        return task.loader.fetch(task.url, "json", task.progress.createCallback(), task.options).then(data => {
            if (!data)
                return null;
            return new AvatarMask(data);
        });
    }
}
Loader.registerLoader(["lavm"], AvatarMaskLoader);

//# sourceMappingURL=AvatarMaskLoader.js.map
