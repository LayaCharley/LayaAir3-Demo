import { Loader } from "../net/Loader";
import { glTFResource } from "./glTFResource";
import "./extensions/KHR_texture_transform";
import "./extensions/KHR_materials_anisotropy";
import "./extensions/KHR_materials_clearcoat";
import "./extensions/KHR_materials_emissive_strength";
import "./extensions/KHR_materials_ior";
import "./extensions/KHR_materials_iridescence";
import "./extensions/KHR_materials_sheen";
import "./extensions/KHR_materials_transmission";
import "./extensions/KHR_materials_specular";
import "./extensions/KHR_materials_unlit";
class glTFLoader {
    load(task) {
        return task.loader.fetch(task.url, "json", task.progress.createCallback(0.5), task.options).then((data) => {
            let glTF = new glTFResource();
            return glTF._parse(data, task.url, task.progress).then(() => glTF);
        });
    }
}
Loader.registerLoader(["gltf"], glTFLoader);
class glbLoader {
    load(task) {
        return task.loader.fetch(task.url, "arraybuffer", task.progress.createCallback(0.5), task.options).then((data) => {
            let glTF = new glTFResource();
            return glTF._parseglb(data, task.url, task.progress).then(() => glTF);
        });
    }
}
Loader.registerLoader(["glb"], glbLoader);

//# sourceMappingURL=glTFLoader.js.map
