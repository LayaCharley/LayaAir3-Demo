export class BlendState {
    constructor(blendType) {
        this.blendType = 0;
    }
    static create(blendType, colorBlendhash, alphaBlendComponent) {
    }
}
BlendState._blend_All_pool = {};
BlendState._blend_seperate_pool = {};
export class BlendComponent {
    constructor(blendOperationGLData, sourceBlendFactor, destinationFactor, hashindex) {
        this._hashIndex = 0;
        this._hashIndex = hashindex;
        this._blendOperationGLData = blendOperationGLData;
        this._sourceBlendFactor = sourceBlendFactor;
        this._destinationFactor = destinationFactor;
    }
    static getHash(blendOperationGLData, sourceBlendFactor, destinationFactor) {
        return (blendOperationGLData) + (sourceBlendFactor << 3) + (destinationFactor << 7);
    }
    static getBlendComponent(blendOperationGLData, sourceBlendFactor, destinationFactor) {
        let index = BlendComponent.getHash(blendOperationGLData, sourceBlendFactor, destinationFactor);
        if (!BlendComponent._pool[index])
            BlendComponent._pool[index] = new BlendComponent(blendOperationGLData, sourceBlendFactor, destinationFactor, index);
        return BlendComponent._pool[index];
    }
}
BlendComponent._pool = {};

//# sourceMappingURL=BlendState.js.map
