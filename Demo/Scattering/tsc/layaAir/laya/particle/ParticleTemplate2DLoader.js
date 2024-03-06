import { Loader } from "../net/Loader";
import { checkSetting } from "./ParticleSetting";
import { ParticleTemplate2D } from "./ParticleTemplate2D";
class ParticleTemplate2DLoader {
    load(task) {
        return task.loader.fetch(task.url, "json", task.progress.createCallback(0.2), task.options).then(data => {
            if (!data)
                return null;
            let settings = checkSetting(data);
            return task.loader.load(settings.textureName, task.options, task.progress.createCallback()).then((tex) => {
                if (!tex)
                    return null;
                return new ParticleTemplate2D(settings, tex);
            });
        });
    }
}
Loader.registerLoader(["part"], ParticleTemplate2DLoader);

//# sourceMappingURL=ParticleTemplate2DLoader.js.map
