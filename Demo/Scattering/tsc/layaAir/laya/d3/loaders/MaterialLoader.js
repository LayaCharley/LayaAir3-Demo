import { Loader } from "../../net/Loader";
import { URL } from "../../net/URL";
import { Shader3D } from "../../RenderEngine/RenderShader/Shader3D";
import { AssetDb } from "../../resource/AssetDb";
import { MaterialParser } from "./MaterialParser";
class MaterialLoader {
    load(task) {
        return task.loader.fetch(task.url, "json", task.progress.createCallback(0.3), task.options).then(data => {
            if (!data)
                return null;
            let basePath = URL.getPath(task.url);
            let urls = MaterialParser.collectLinks(data, basePath);
            if (data.version === "LAYAMATERIAL:04") {
                let shaderName = data.props.type;
                if (!Shader3D.find(shaderName)) {
                    let url = AssetDb.inst.shaderName_to_URL(shaderName);
                    if (url)
                        urls.push(url);
                    else {
                        return AssetDb.inst.shaderName_to_URL_async(shaderName).then(url => {
                            if (url)
                                urls.push(url);
                            else if (data.props.shaderPath)
                                urls.push(URL.join(basePath, data.props.shaderPath));
                            else
                                Loader.warn(`unknown shaderName: ${shaderName}`);
                            return this.load2(task, data, urls);
                        });
                    }
                }
            }
            return this.load2(task, data, urls);
        });
    }
    load2(task, data, urls) {
        if (urls.length == 0) {
            let mat = MaterialParser.parse(data);
            let obsoluteInst = task.obsoluteInst;
            if (obsoluteInst)
                mat = this.move(obsoluteInst, mat);
            return Promise.resolve(mat);
        }
        return task.loader.load(urls, task.options, task.progress.createCallback()).then(() => {
            let mat = MaterialParser.parse(data);
            let obsoluteInst = task.obsoluteInst;
            if (task.obsoluteInst)
                mat = this.move(obsoluteInst, mat);
            return mat;
        });
    }
    move(obsoluteInst, mat) {
        obsoluteInst._shaderValues.reset();
        obsoluteInst.setShaderName(mat._shader.name);
        mat._shaderValues.cloneTo(obsoluteInst._shaderValues);
        obsoluteInst.renderQueue = mat.renderQueue;
        obsoluteInst.obsolute = false;
        mat.destroy();
        return obsoluteInst;
    }
}
Loader.registerLoader(["lmat"], MaterialLoader, Loader.MATERIAL);

//# sourceMappingURL=MaterialLoader.js.map
