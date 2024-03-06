import { Resource } from "../resource/Resource";
import { ClassUtils } from "../utils/ClassUtils";
import { Animation2DParm } from "./Animation2DParm";
import { AnimatorControllerLayer2D } from "./AnimatorControllerLayer2D";
import { AnimatorControllerParse, AniParmType } from "./AnimatorControllerParse";
import { AnimatorState2D } from "./AnimatorState2D";
import { AnimatorStateBoolCondition, AnimatorStateNumberCondition, AnimatorStateTriggerCondition } from "./AnimatorStateCondition";
import { AnimatorTransition2D } from "./AnimatorTransition2D";
export class AnimatorController2D extends Resource {
    constructor(data) {
        super();
        let obj = AnimatorControllerParse.parse(data);
        this.data = obj.ret;
        this.clipsID = obj.clipsID;
    }
    getLayers() {
        let layers = this.data.controllerLayers;
        let lArr = [];
        for (let i = layers.length - 1; i >= 0; i--) {
            let l = layers[i];
            let acl = new AnimatorControllerLayer2D(l.name);
            lArr.unshift(acl);
            for (let k in l) {
                if ("name" == k || "states" == k || null == l[k]) {
                    continue;
                }
                try {
                    acl[k] = l[k];
                }
                catch (err) { }
            }
            this.getState(l.states, acl, this.data);
        }
        return lArr;
    }
    createState(states, idCatch, acl) {
        if (!states)
            return null;
        let ret = {};
        let defID = null;
        for (let i = states.length - 1; i >= 0; i--) {
            let obj = states[i];
            let childStates = obj.states;
            if (childStates) {
                let groupRet = this.createState(childStates, idCatch, acl);
                if (groupRet) {
                    idCatch[obj.id] = groupRet.states[groupRet.id];
                }
                continue;
            }
            if (0 > Number(obj.id)) {
                if ("-1" == obj.id) {
                    let transitions = obj.soloTransitions;
                    if (transitions && 0 < transitions.length) {
                        defID = transitions[0].id;
                    }
                }
                continue;
            }
            let state = new AnimatorState2D();
            idCatch[obj.id] = state;
            ret[obj.id] = state;
            for (let k in obj) {
                try {
                    if ("scripts" == k) {
                        let scripts = obj[k];
                        if (scripts && Array.isArray(scripts)) {
                            for (let k = scripts.length - 1; k >= 0; k--) {
                                let uuid = scripts[k];
                                if (uuid && 0 == uuid.indexOf("res://")) {
                                    uuid = uuid.substring(6);
                                }
                                let c = ClassUtils.getClass(uuid);
                                if (c) {
                                    state.addScript(c);
                                }
                            }
                        }
                        continue;
                    }
                    else if ("soloTransitions" == k) {
                        continue;
                    }
                    else if (null != obj[k]) {
                        state[k] = obj[k];
                    }
                }
                catch (err) { }
            }
            acl.addState(state);
        }
        return { id: defID, states: ret };
    }
    getState(states, acl, data) {
        if (states) {
            let idCatch = {};
            this.createState(states, idCatch, acl);
            this.setTransitions(states, idCatch, acl, data);
        }
    }
    setExitTransition(exitRet, transitions, idCatch, data, pExitRet) {
        for (let id in exitRet) {
            let state = idCatch[id];
            if (state) {
                let ats = state.transitions;
                let sts = state.soloTransitions;
                let linArr = exitRet[id];
                for (let i = transitions.length - 1; i >= 0; i--) {
                    let t = transitions[i];
                    if ("-3" == t.id) {
                        if (null == pExitRet[id]) {
                            pExitRet[id] = [];
                        }
                        pExitRet[id].push(t);
                        continue;
                    }
                    for (let j = linArr.length - 1; j >= 0; j--) {
                        let t2 = linArr[j];
                        let ato = new AnimatorTransition2D();
                        ato.destState = idCatch[t.id];
                        if (t.conditions) {
                            this.addConditions(t.conditions, ato, data);
                        }
                        if (t2.conditions) {
                            this.addConditions(t2.conditions, ato, data);
                        }
                        for (let k in t) {
                            if ("solo" == k || "id" == k || "conditions" == k) {
                                continue;
                            }
                            else {
                                ato[k] = t[k];
                            }
                        }
                        if (t.solo) {
                            sts.unshift(ato);
                        }
                        else {
                            ats.unshift(ato);
                        }
                    }
                }
            }
        }
    }
    _getAnimatorTransition2D(o, idCatch, data) {
        let ato = new AnimatorTransition2D();
        if (idCatch[o.id]) {
            ato.destState = idCatch[o.id];
        }
        if (o.conditions) {
            this.addConditions(o.conditions, ato, data);
        }
        for (let k in o) {
            if ("solo" == k || "id" == k || "conditions" == k) {
                continue;
            }
            else {
                ato[k] = o[k];
            }
        }
        return ato;
    }
    setTransitions(states, idCatch, acl, data, pState) {
        if (!states)
            return null;
        let exitRet = {};
        for (let i = states.length - 1; i >= 0; i--) {
            let obj = states[i];
            if (obj.states) {
                let exitTransition = this.setTransitions(obj.states, idCatch, acl, data, obj);
                if (exitTransition) {
                    let transitions = obj.soloTransitions;
                    if (transitions) {
                        this.setExitTransition(exitTransition, transitions, idCatch, data, exitRet);
                    }
                }
            }
        }
        for (let i = states.length - 1; i >= 0; i--) {
            let obj = states[i];
            if (obj.states) {
                continue;
            }
            if ("-1" == obj.id) {
                if (obj.soloTransitions && 0 < obj.soloTransitions.length) {
                    if (null == pState) {
                        acl.defaultState = idCatch[obj.soloTransitions[0].id];
                        acl._enterTransition = this._getAnimatorTransition2D(obj.soloTransitions[0], idCatch, data);
                    }
                    else {
                        idCatch[pState.id] = idCatch[obj.soloTransitions[0].id];
                    }
                    continue;
                }
            }
            else if ("-2" == obj.id) {
                let transitions = obj.soloTransitions;
                if (transitions) {
                    for (let j = transitions.length - 1; j >= 0; j--) {
                        let o = transitions[j];
                        let destState = idCatch[o.id];
                        if (destState) {
                            for (let idk in idCatch) {
                                let state = idCatch[idk];
                                let ato = this._getAnimatorTransition2D(o, idCatch, data);
                                if (o.solo) {
                                    state.soloTransitions.unshift(ato);
                                }
                                else {
                                    state.transitions.unshift(ato);
                                }
                            }
                        }
                    }
                }
                continue;
            }
            else if ("-3" == obj.id) {
                continue;
            }
            let soloTransitions = obj.soloTransitions;
            if (soloTransitions && idCatch[obj.id]) {
                let ats = idCatch[obj.id].transitions;
                let sts = idCatch[obj.id].soloTransitions;
                for (let j = soloTransitions.length - 1; j >= 0; j--) {
                    let o = soloTransitions[j];
                    if ("-3" == o.id) {
                        if (null == exitRet[obj.id]) {
                            exitRet[obj.id] = [];
                        }
                        exitRet[obj.id].push(o);
                        continue;
                    }
                    let ato = this._getAnimatorTransition2D(o, idCatch, data);
                    if (o.solo) {
                        sts.unshift(ato);
                    }
                    else {
                        ats.unshift(ato);
                    }
                }
            }
        }
        return exitRet;
    }
    addConditions(arr, ato, data) {
        let parms = data.animatorParams;
        if (null == parms || 0 == parms.length)
            return;
        for (let i = 0, len = arr.length; i < len; i++) {
            let o = arr[i];
            let parm = null;
            for (let j = parms.length - 1; j >= 0; j--) {
                if (parms[j].id == o.id) {
                    parm = parms[j];
                    break;
                }
            }
            if (null == parm) {
                return;
            }
            let c;
            if (parm.type == AniParmType.Bool) {
                let b = new AnimatorStateBoolCondition(parm.name);
                b.compareFlag = Boolean(o.checkValue);
                c = b;
            }
            else if (parm.type == AniParmType.Float) {
                let n = new AnimatorStateNumberCondition(parm.name);
                n.numberValue = Number(o.checkValue);
                n.compareFlag = o.type;
                c = n;
            }
            else if (parm.type == AniParmType.Trigger) {
                let t = new AnimatorStateTriggerCondition(parm.name);
                c = t;
            }
            ato.addCondition(c);
        }
    }
    updateTo(a) {
        let currLayer = a._controllerLayers;
        for (let i = 0, len = currLayer.length; i < len; i++) {
            currLayer[i].destroy();
        }
        currLayer.length = 0;
        let layers = this.getLayers();
        for (let i = 0, len = layers.length; i < len; i++) {
            a.addControllerLayer(layers[i]);
        }
        let parms = this.data.animatorParams;
        if (parms) {
            let setParm = {};
            for (let i = parms.length - 1; i >= 0; i--) {
                let p = parms[i];
                let sp = new Animation2DParm();
                sp.name = p.name;
                sp.type = p.type;
                sp.value = p.val;
                setParm[p.name] = sp;
            }
            a.parameters = setParm;
        }
    }
}

//# sourceMappingURL=AnimatorController2D.js.map
