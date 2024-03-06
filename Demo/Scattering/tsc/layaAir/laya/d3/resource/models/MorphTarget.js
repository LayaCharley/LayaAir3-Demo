export class MorphTarget {
    constructor() {
        this.fullWeight = 1;
    }
}
export class MorphTargetChannel {
    constructor() {
        this.targetCount = 0;
        this.targets = new Array();
    }
    getTargetByIndex(index) {
        return this.targets[index];
    }
    addTarget(target) {
        this.targetCount++;
        this.targets.push(target);
        this.targets.sort((a, b) => {
            return a.fullWeight - b.fullWeight;
        });
    }
}

//# sourceMappingURL=MorphTarget.js.map
