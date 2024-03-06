export class AnimatorStateScript {
    constructor() {
        this.playStateInfo = { animator: null, layerindex: -1, playState: null };
    }
    setPlayScriptInfo(animator, layerindex, playstate) {
        this.playStateInfo.animator = animator;
        this.playStateInfo.layerindex = layerindex;
        this.playStateInfo.playState = playstate;
    }
    onStateEnter() {
    }
    onStateUpdate(normalizeTime) {
    }
    onStateExit() {
    }
}

//# sourceMappingURL=AnimatorStateScript.js.map
