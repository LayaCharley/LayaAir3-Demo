import { ClassUtils } from "./laya/utils/ClassUtils";
function dummy() { }
export function regClass(assetId) {
    return function (constructor) {
        ClassUtils.regClass(assetId, constructor);
    };
}
export function classInfo(info) { return dummy; }
export function runInEditor(constructor) { }
export function property(info) { return dummy; }

//# sourceMappingURL=Decorators.js.map
