export class ClassUtils {
    static regClass(className, classDef) {
        ClassUtils._classMap[className] = classDef;
    }
    static getClass(className) {
        return ClassUtils._classMap[className];
    }
    static getInstance(className) {
        var compClass = ClassUtils.getClass(className);
        if (compClass)
            return new compClass();
        else
            console.warn("[error] Undefined class:", className);
        return null;
    }
}
ClassUtils._classMap = {};

//# sourceMappingURL=ClassUtils.js.map
