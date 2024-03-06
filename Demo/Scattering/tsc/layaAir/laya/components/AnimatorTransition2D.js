import { AniStateConditionType } from "./AnimatorControllerParse";
export class AnimatorTransition2D {
    constructor() {
        this.conditions = [];
        this.exitByTime = true;
        this.exitTime = 1;
        this.transduration = 0;
        this.transstartoffset = 0;
        this.mute = false;
    }
    addCondition(condition) {
        if (this.conditions.indexOf(condition) == -1) {
            this.conditions.push(condition);
        }
    }
    removeCondition(condition) {
        let index = this.conditions.indexOf(condition);
        if (index != -1) {
            this.conditions.splice(index, 0);
        }
    }
    check(normalizeTime, paramsMap, isReplay) {
        if (this.mute) {
            return false;
        }
        if (this.exitByTime && (normalizeTime < this.exitTime && !isReplay)) {
            return false;
        }
        if (null == this.conditions || 0 == this.conditions.length) {
            return true;
        }
        for (var i = 0; i < this.conditions.length; i++) {
            let con = this.conditions[i];
            let out = con.checkState(paramsMap[con.name].value);
            if (out) {
                if (con.type == AniStateConditionType.Trigger) {
                    paramsMap[con.name].value = false;
                }
                return true;
            }
        }
        return false;
    }
}

//# sourceMappingURL=AnimatorTransition2D.js.map
