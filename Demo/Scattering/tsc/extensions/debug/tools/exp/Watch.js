export class Watch {
    constructor() {
    }
    static watch(obj, name, callBack) {
        obj.watch(name, callBack);
    }
    static unwatch(obj, name, callBack) {
        obj.unwatch(name, callBack);
    }
}
