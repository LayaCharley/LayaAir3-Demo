export var AniParmType;
(function (AniParmType) {
    AniParmType[AniParmType["Float"] = 0] = "Float";
    AniParmType[AniParmType["Bool"] = 1] = "Bool";
    AniParmType[AniParmType["Trigger"] = 2] = "Trigger";
})(AniParmType || (AniParmType = {}));
export var AniStateConditionType;
(function (AniStateConditionType) {
    AniStateConditionType[AniStateConditionType["Number"] = 0] = "Number";
    AniStateConditionType[AniStateConditionType["Bool"] = 1] = "Bool";
    AniStateConditionType[AniStateConditionType["Trigger"] = 2] = "Trigger";
})(AniStateConditionType || (AniStateConditionType = {}));
export var AniStateConditionNumberCompressType;
(function (AniStateConditionNumberCompressType) {
    AniStateConditionNumberCompressType[AniStateConditionNumberCompressType["Less"] = 0] = "Less";
    AniStateConditionNumberCompressType[AniStateConditionNumberCompressType["Greater"] = 1] = "Greater";
})(AniStateConditionNumberCompressType || (AniStateConditionNumberCompressType = {}));
export class AnimatorControllerParse {
    static parse(data) {
        let ret = data;
        let layers = ret.controllerLayers;
        if (null == layers) {
            layers = [];
        }
        let clipsID = [];
        for (let i = layers.length - 1; i >= 0; i--) {
            let l = layers[i];
            let states = l.states;
            if (!states) {
                states = [];
                l.states = states;
            }
            l.defaultStateName = null;
            let retobj = this.checkStates(states, clipsID, ret);
            if (retobj) {
                l.defaultStateName = retobj.enterName;
            }
            else {
                layers.splice(i, 1);
            }
        }
        return { ret: ret, clipsID: clipsID };
    }
    static checkStates(states, clipsID, data) {
        let clipState = null;
        let enterState = null;
        for (let j = states.length - 1; j >= 0; j--) {
            let state = states[j];
            if (state.states) {
                if (null == this.checkStates(state.states, clipsID, data)) {
                    states.splice(j, 1);
                }
                else {
                    if (null == clipState) {
                        clipState = [];
                    }
                    clipState.push(state);
                }
            }
            else if ("-1" == state.id) {
                enterState = state;
            }
            else if ("-2" == state.id) {
            }
            else if ("-3" == state.id) {
            }
            else if (null == state.clip || null == state.clip._$uuid || "" == state.clip._$uuid) {
                states.splice(j, 1);
            }
            else {
                if (0 > clipsID.indexOf(state.clip._$uuid)) {
                    clipsID.push(state.clip._$uuid);
                }
                this.checkNext(state, states, data);
                if (null == clipState) {
                    clipState = [];
                }
                clipState.push(state);
            }
        }
        let ret = null;
        if (clipState && enterState) {
            let defName = this.checkDefault(enterState, clipState);
            if (null != defName) {
                ret = { states: clipState, enterName: defName };
            }
        }
        return ret;
    }
    static checkNext(state, states, data) {
        let nexts = state.soloTransitions;
        if (nexts) {
            for (let i = nexts.length - 1; i >= 0; i--) {
                let next = nexts[i];
                let nState = this.getStateByID(states, next.id);
                if (!nState || (null == nState.clip && "-3" != nState.id && null == nState.states)) {
                    nexts.splice(i, 1);
                }
                else {
                    next.name = nState.name;
                    next.conditions = this.checkConditions(next.conditions, data);
                }
            }
        }
    }
    static checkConditions(conditions, data) {
        if (!conditions || 0 == conditions.length || null == data.animatorParams || 0 == data.animatorParams.length) {
            return [];
        }
        let parms = data.animatorParams;
        for (let i = conditions.length - 1; i >= 0; i--) {
            let o = conditions[i];
            let parm = null;
            for (let j = parms.length - 1; j >= 0; j--) {
                if (parms[j].id == o.id) {
                    parm = parms[j];
                    break;
                }
            }
            if (null == parm) {
                conditions.splice(i, 1);
            }
            else {
                o.name = parm.name;
                if (parm.type == AniParmType.Float) {
                    let num = Number(o.checkValue);
                    if (isNaN(num)) {
                        o.checkValue = 0;
                    }
                    num = Number(o.type);
                    if (isNaN(num)) {
                        o.type = 0;
                    }
                }
            }
        }
        return conditions;
    }
    static checkDefault(state, states) {
        let nexts = state.soloTransitions;
        let id = null;
        if (nexts && 0 < nexts.length) {
            id = nexts[0].id;
        }
        let defState = null;
        if (null != id) {
            defState = this.getStateByID(states, id);
        }
        if (null != defState && (null != defState.clip || null != defState.states)) {
            return defState.name;
        }
        for (let i = states.length - 1; i >= 0; i--) {
            if (states[i].clip) {
                return states[i].name;
            }
        }
        return null;
    }
    static getStateByID(states, id) {
        if (states) {
            for (let i = states.length - 1; i >= 0; i--) {
                if (states[i].id == id) {
                    return states[i];
                }
            }
        }
        return null;
    }
}

//# sourceMappingURL=AnimatorControllerParse.js.map
