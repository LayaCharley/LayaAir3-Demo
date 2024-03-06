export var KeyFrameValueType;
(function (KeyFrameValueType) {
    KeyFrameValueType[KeyFrameValueType["None"] = -1] = "None";
    KeyFrameValueType[KeyFrameValueType["Float"] = 0] = "Float";
    KeyFrameValueType[KeyFrameValueType["Position"] = 1] = "Position";
    KeyFrameValueType[KeyFrameValueType["Rotation"] = 2] = "Rotation";
    KeyFrameValueType[KeyFrameValueType["Scale"] = 3] = "Scale";
    KeyFrameValueType[KeyFrameValueType["RotationEuler"] = 4] = "RotationEuler";
    KeyFrameValueType[KeyFrameValueType["Vector2"] = 5] = "Vector2";
    KeyFrameValueType[KeyFrameValueType["Vector3"] = 6] = "Vector3";
    KeyFrameValueType[KeyFrameValueType["Vector4"] = 7] = "Vector4";
    KeyFrameValueType[KeyFrameValueType["Color"] = 8] = "Color";
})(KeyFrameValueType || (KeyFrameValueType = {}));
export class KeyframeNodeOwner {
    constructor() {
        this.indexInList = -1;
        this.referenceCount = 0;
        this.updateMark = -1;
        this.type = -1;
        this.fullPath = null;
        this.nodePath = null;
        this.propertyOwner = null;
        this.property = null;
        this.defaultValue = null;
        this.value = null;
        this.crossFixedValue = null;
        this.isMaterial = false;
    }
    saveCrossFixedValue() {
        var pro = this.propertyOwner;
        if (pro) {
            switch (this.type) {
                case 0:
                    this.crossFixedValue = this.value;
                    break;
                case 1:
                case 3:
                case 4:
                    this.value.cloneTo(this.crossFixedValue);
                    break;
                case 2:
                    this.value.cloneTo(this.crossFixedValue);
                    break;
                default:
                    throw "Animator:unknown type.";
            }
        }
    }
    animatorDataSetCallBack() {
        let fn = this.callBackOwner[this.callbackFun];
        fn.apply(this.callBackOwner, this.callParams);
    }
    getCallbackNode() {
        if (this.propertyOwner && this.callbackFunData) {
            let funPropertys = this.callbackFunData.split(".");
            this.callBackOwner = this.propertyOwner;
            for (let i = 0, n = funPropertys.length - 1; i < n; i++) {
                this.callBackOwner = this.callBackOwner[funPropertys[i]];
            }
            this.callbackFun = funPropertys[funPropertys.length - 1];
        }
    }
}

//# sourceMappingURL=KeyframeNodeOwner.js.map
