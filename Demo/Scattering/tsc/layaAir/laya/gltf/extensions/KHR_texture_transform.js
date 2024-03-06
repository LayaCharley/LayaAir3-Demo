import { glTFResource } from "../glTFResource";
import { Matrix3x3 } from "../../maths/Matrix3x3";
import { Vector2 } from "../../maths/Vector2";
const ExtensionName = "KHR_texture_transform";
const translation = new Matrix3x3();
const rotation = new Matrix3x3();
const offset = new Vector2;
const scale = new Vector2;
export class KHR_texture_transform {
    constructor(resource) {
        this.name = ExtensionName;
        this._resource = resource;
    }
    createTransform(extension) {
        var _a;
        offset.setValue(0, 0);
        if (extension.offset) {
            offset.fromArray(extension.offset);
        }
        Matrix3x3.createFromTranslation(offset, translation);
        let rot = (_a = extension.rotation) !== null && _a !== void 0 ? _a : 0;
        Matrix3x3.createFromRotation(-rot, rotation);
        scale.setValue(1, 1);
        if (extension.scale) {
            scale.fromArray(extension.scale);
        }
        let trans = new Matrix3x3();
        Matrix3x3.multiply(translation, rotation, trans);
        trans.scale(scale, trans);
        return trans;
    }
    loadExtensionTextureInfo(info) {
        var _a;
        let extension = (_a = info.extensions) === null || _a === void 0 ? void 0 : _a.KHR_texture_transform;
        let trans = this.createTransform(extension);
        let texCoord = extension.texCoord;
        return {
            transform: trans,
            texCoord: texCoord
        };
    }
}
glTFResource.registerExtension(ExtensionName, (resource) => new KHR_texture_transform(resource));

//# sourceMappingURL=KHR_texture_transform.js.map
