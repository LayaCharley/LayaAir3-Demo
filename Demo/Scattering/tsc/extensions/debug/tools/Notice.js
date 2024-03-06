import { EventDispatcher } from "laya/events/EventDispatcher";
export class Notice extends EventDispatcher {
    constructor() { super(); }
    static get I() {
        if (!Notice._instance) {
            Notice._instance = new Notice();
        }
        return Notice._instance;
    }
    static set I(value) {
        Notice._instance = value;
    }
    static notify(type, data = null) {
        Notice.I.event(type, data);
    }
    static listen(type, _scope, fun, args = null, cancelBefore = false) {
        if (cancelBefore)
            Notice.cancel(type, _scope, fun);
        Notice.I.on(type, _scope, fun, args);
    }
    static cancel(type, _scope, fun) {
        Notice.I.off(type, _scope, fun);
    }
}
