import { ClassTool } from "../ClassTool";
import { FunHook } from "../hook/FunHook";
import { RunProfile } from "../RunProfile";
export class ClassCreateHook {
    constructor() {
        this.createInfo = {};
    }
    static get I() {
        if (!ClassCreateHook._instance) {
            ClassCreateHook._instance = new ClassCreateHook();
        }
        return ClassCreateHook._instance;
    }
    static set I(value) {
        ClassCreateHook._instance = value;
    }
    hookClass(clz) {
        if (ClassCreateHook.isInited)
            return;
        ClassCreateHook.isInited = true;
        var createFun = function (sp) {
            this.classCreated(sp, clz);
        };
        FunHook.hook(clz, "call", createFun);
    }
    classCreated(clz, oClass) {
        var key;
        key = ClassTool.getNodeClassAndName(clz);
        var depth = 0;
        var tClz;
        tClz = clz;
        while (tClz && tClz != oClass) {
            tClz = tClz.prototype;
            depth++;
        }
        if (!ClassCreateHook.I.createInfo[key]) {
            ClassCreateHook.I.createInfo[key] = 0;
        }
        ClassCreateHook.I.createInfo[key] = ClassCreateHook.I.createInfo[key] + 1;
        RunProfile.run(key, depth + 6);
    }
    getClassCreateInfo(clz) {
        var key;
        key = ClassTool.getClassName(clz);
        return RunProfile.getRunInfo(key);
    }
}
ClassCreateHook.isInited = false;
