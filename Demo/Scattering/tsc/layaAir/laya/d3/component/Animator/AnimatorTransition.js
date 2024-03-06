import { AniStateConditionType } from "../../../components/AnimatorControllerParse";
export class AnimatorTransition {
    constructor() {
        this._conditions = [];
        this._exitByTime = true;
        this._exitTime = 0.85;
        this._transduration = 0.15;
        this._transstartoffset = 0;
        this._mute = false;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get mute() {
        return this._mute;
    }
    set mute(value) {
        this._mute = value;
    }
    get destState() {
        return this._destState;
    }
    set destState(value) {
        this._destState = value;
    }
    get conditions() {
        return this._conditions;
    }
    set conditions(value) {
        for (var i = this._conditions.length - 1; i >= 0; i--) {
            this.removeCondition(this._conditions[i]);
        }
        for (var i = 0; i < value.length; i++) {
            this.addCondition(value[i]);
        }
    }
    get exitByTime() {
        return this._exitByTime;
    }
    set exitByTime(value) {
        this._exitByTime = value;
    }
    set transduration(value) {
        this._transduration = Math.max(0, Math.min(value, 1.0));
    }
    get transduration() {
        return this._transduration;
    }
    set transstartoffset(value) {
        this._transstartoffset = Math.max(0, Math.min(value, 1.0));
    }
    get transstartoffset() {
        return this._transstartoffset;
    }
    set exitTime(value) {
        this._exitTime = Math.max(0, Math.min(value, 1.0));
    }
    get exitTime() {
        return this._exitTime;
    }
    addCondition(condition) {
        if (this._conditions.indexOf(condition) == -1) {
            this._conditions.push(condition);
        }
    }
    removeCondition(condition) {
        let index = this._conditions.indexOf(condition);
        if (index != -1) {
            this._conditions.splice(index, 0);
        }
    }
    check(normalizeTime, paramsMap) {
        if (this._mute) {
            return false;
        }
        if (this._conditions.length == 0) {
            if (normalizeTime > this._exitTime)
                return true;
        }
        else {
            if (this._exitByTime && normalizeTime < this._exitTime) {
                return false;
            }
            for (var i = 0; i < this._conditions.length; i++) {
                let con = this._conditions[i];
                let out = con.checkState(paramsMap[con.id]);
                if (out) {
                    if (con.type == AniStateConditionType.Trigger)
                        paramsMap[con.id] = false;
                    return true;
                }
            }
        }
        return false;
    }
}

//# sourceMappingURL=AnimatorTransition.js.map
