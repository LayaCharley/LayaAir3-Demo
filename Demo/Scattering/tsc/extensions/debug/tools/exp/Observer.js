import { DifferTool } from "../DifferTool";
export class Observer {
    constructor() {
    }
    static observe(obj, callBack) {
    }
    static unobserve(obj, callBack) {
    }
    static observeDiffer(obj, sign, msg = "obDiffer") {
        var differFun = function () {
            DifferTool.differ(sign, obj, msg);
        };
        Observer.observe(obj, differFun);
    }
}
