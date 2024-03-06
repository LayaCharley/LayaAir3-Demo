import { Delegate } from "../utils/Delegate";
import { Event } from "./Event";
const eventPool = [];
export class EventDispatcher {
    onStartListeningToType(type) {
    }
    hasListener(type) {
        let listeners = this._events && this._events[type];
        return !!listeners && listeners.count > 0;
    }
    event(type, data) {
        let listeners = this._events && this._events[type];
        if (!listeners)
            return false;
        let ret = listeners.count > 0;
        if (Array.isArray(data))
            listeners.invoke(...data);
        else if (data !== undefined)
            listeners.invoke(data);
        else if (data === Event.EMPTY) {
            let ev = eventPool.length > 0 ? eventPool.pop() : new Event();
            listeners.invoke(ev.setTo(type, this, this));
            ev.target = ev.currentTarget = null;
            eventPool.push(ev);
        }
        else
            listeners.invoke();
        return ret;
    }
    on(type, caller, listener, args) {
        if (arguments.length == 2) {
            listener = caller;
            caller = null;
        }
        if (!this._events)
            this._events = {};
        let listeners = this._events[type];
        if (!listeners) {
            this.onStartListeningToType(type);
            this._events[type] = listeners = new Delegate();
        }
        listeners.add(listener, caller, args);
        return this;
    }
    once(type, caller, listener, args) {
        if (arguments.length == 2) {
            listener = caller;
            caller = null;
        }
        if (!this._events)
            this._events = {};
        let listeners = this._events[type];
        if (!listeners) {
            this.onStartListeningToType(type);
            this._events[type] = listeners = new Delegate();
        }
        listeners.once(listener, caller, args);
        return this;
    }
    off(type, caller, listener) {
        if (arguments.length == 2) {
            listener = caller;
            caller = null;
        }
        let listeners = this._events && this._events[type];
        if (listeners)
            listeners.remove(listener, caller);
        return this;
    }
    offAll(type) {
        if (type == null)
            this._events = null;
        else {
            let listeners = this._events && this._events[type];
            if (listeners)
                listeners.clear();
        }
        return this;
    }
    offAllCaller(caller) {
        if (caller && this._events) {
            for (let type in this._events)
                this._events[type].clearForTarget(caller);
        }
        return this;
    }
}

//# sourceMappingURL=EventDispatcher.js.map
