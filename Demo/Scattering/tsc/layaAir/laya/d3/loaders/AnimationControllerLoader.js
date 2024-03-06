import { Loader } from "../../net/Loader";
import { AnimatorController } from "../component/Animator/AnimatorController";
import { URL } from "../../net/URL";
class AnimationControllerLoader {
    load(task) {
        return task.loader.fetch(task.url, "json", task.progress.createCallback(0.2), task.options).then(data => {
            let ret = new AnimatorController(data);
            if (ret.data && ret.data.controllerLayers) {
                let layers = ret.data.controllerLayers;
                let promises = [];
                for (let i = layers.length - 1; i >= 0; i--) {
                    if (layers[i].avatarMask) {
                        this.loadAvatarMask(layers[i], promises, task);
                    }
                    let states = layers[i].states;
                    this.loadStates(states, promises, task);
                }
                return Promise.all(promises).then(() => ret);
            }
            else
                return ret;
        });
    }
    loadAvatarMask(l, promises, task) {
        let basePath = URL.getPath(task.url);
        if (l.avatarMask && l.avatarMask._$uuid && '' != l.avatarMask._$uuid) {
            let url = URL.getResURLByUUID(l.avatarMask._$uuid);
            if (!url.startsWith("res://"))
                url = URL.join(basePath, url);
            promises.push(task.loader.load(url).then(res => {
                l.avatarMask = res;
            }));
        }
        else {
            l.avatarMask = null;
        }
    }
    loadStates(states, promises, task) {
        let basePath = URL.getPath(task.url);
        for (let j = states.length - 1; j >= 0; j--) {
            if (states[j].clip && states[j].clip._$uuid) {
                let url = URL.getResURLByUUID(states[j].clip._$uuid);
                if (!url.startsWith("res://"))
                    url = URL.join(basePath, url);
                promises.push(task.loader.load(url).then(res => {
                    states[j].clip = res;
                }));
            }
            if (states[j].states) {
                this.loadStates(states[j].states, promises, task);
            }
        }
    }
}
Loader.registerLoader(["controller"], AnimationControllerLoader);

//# sourceMappingURL=AnimationControllerLoader.js.map
