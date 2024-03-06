import { AnimatorController2D } from "../components/AnimatorController2D";
import { Loader } from "../net/Loader";
import { URL } from "../net/URL";
class AnimationController2DLoader {
    load(task) {
        return task.loader.fetch(task.url, "json", task.progress.createCallback(0.2), task.options).then(data => {
            let ret = new AnimatorController2D(data);
            if (ret.data && ret.data.controllerLayers) {
                let layers = ret.data.controllerLayers;
                let promises = [];
                for (let i = layers.length - 1; i >= 0; i--) {
                    let states = layers[i].states;
                    this.loadStates(states, promises, task);
                }
                return Promise.all(promises).then(() => ret);
            }
            else
                return ret;
        });
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
Loader.registerLoader(["mcc"], AnimationController2DLoader);

//# sourceMappingURL=AnimationController2DLoader.js.map
