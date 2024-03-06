import { ClassUtils } from "../../../utils/ClassUtils";
import { SimpleSkinnedMeshRenderer } from "../../core/SimpleSkinnedMeshRenderer";
export class AnimatorResource {
    static getAnimatorResource(sprite, propertyKey) {
        switch (propertyKey) {
            case "simpleSkinnedMeshRenderer":
                return sprite.getComponent(SimpleSkinnedMeshRenderer);
            default:
                return sprite.getComponent(ClassUtils.getClass(propertyKey));
                break;
        }
        return null;
    }
}

//# sourceMappingURL=AnimatorResource.js.map
