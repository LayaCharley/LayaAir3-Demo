import { AniStateConditionType, AniStateConditionNumberCompressType } from "./AnimatorControllerParse";
export class AnimatorStateCondition {
    constructor(name = null) {
        if (!name)
            return;
        this._id = AnimatorStateCondition.conditionNameToID(name);
        this._name = name;
    }
    static conditionNameToID(name) {
        if (AnimatorStateCondition._conditionNameMap[name] != null) {
            return AnimatorStateCondition._conditionNameMap[name];
        }
        else {
            var id = this._propertyNameCounter++;
            this._conditionNameMap[name] = id;
            this._conditionNameMap[id] = name;
            return id;
        }
    }
    static conditionIDToName(id) {
        return this._conditionNameMap[id];
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._id = AnimatorStateCondition.conditionNameToID(value);
        this._name = value;
    }
    get type() {
        return this._type;
    }
    checkState(value) {
        return false;
    }
}
AnimatorStateCondition._conditionNameMap = {};
AnimatorStateCondition._propertyNameCounter = 0;
export class AnimatorStateNumberCondition extends AnimatorStateCondition {
    constructor(name) {
        super(name);
        this._numberValue = 0;
        this._numberCompareFlag = AniStateConditionNumberCompressType.Greater;
        this._type = AniStateConditionType.Number;
    }
    get numberValue() {
        return this._numberValue;
    }
    set numberValue(value) {
        this._numberValue = value;
    }
    get compareFlag() {
        return this._numberCompareFlag;
    }
    set compareFlag(value) {
        this._numberCompareFlag = value;
    }
    checkState(value) {
        if (AniStateConditionNumberCompressType.Greater == this._numberCompareFlag)
            return value > this._numberValue;
        else
            return value < this._numberValue;
    }
}
export class AnimatorStateBoolCondition extends AnimatorStateCondition {
    constructor(name) {
        super(name);
        this._compareFlag = true;
        this._type = AniStateConditionType.Bool;
    }
    get compareFlag() {
        return this._compareFlag;
    }
    set compareFlag(value) {
        this._compareFlag = value;
    }
    checkState(value) {
        return this._compareFlag == value;
    }
}
export class AnimatorStateTriggerCondition extends AnimatorStateCondition {
    constructor(name) {
        super(name);
        this._type = AniStateConditionType.Trigger;
    }
    checkState(value) {
        return value;
    }
}

//# sourceMappingURL=AnimatorStateCondition.js.map
