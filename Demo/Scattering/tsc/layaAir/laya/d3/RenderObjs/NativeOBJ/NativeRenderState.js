export class NativeRenderState {
    constructor() {
        this._nativeObj = new window.conchRenderState();
    }
    set cull(value) {
        this._nativeObj.cull = value;
    }
    get cull() {
        return this._nativeObj.cull;
    }
    set blend(value) {
        this._nativeObj.blend = value;
    }
    get blend() {
        return this._nativeObj.blend;
    }
    set srcBlend(value) {
        this._nativeObj.srcBlend = value;
    }
    get srcBlend() {
        return this._nativeObj.srcBlend;
    }
    set dstBlend(value) {
        this._nativeObj.dstBlend = value;
    }
    get dstBlend() {
        return this._nativeObj.dstBlend;
    }
    set srcBlendRGB(value) {
        this._nativeObj.srcBlendRGB = value;
    }
    get srcBlendRGB() {
        return this._nativeObj.srcBlendRGB;
    }
    set dstBlendRGB(value) {
        this._nativeObj.dstBlendRGB = value;
    }
    get dstBlendRGB() {
        return this._nativeObj.dstBlendRGB;
    }
    set srcBlendAlpha(value) {
        this._nativeObj.srcBlendAlpha = value;
    }
    get srcBlendAlpha() {
        return this._nativeObj.srcBlendAlpha;
    }
    set dstBlendAlpha(value) {
        this._nativeObj.dstBlendAlpha = value;
    }
    get dstBlendAlpha() {
        return this._nativeObj.dstBlendAlpha;
    }
    set blendEquation(value) {
        this._nativeObj.blendEquation = value;
    }
    get blendEquation() {
        return this._nativeObj.blendEquation;
    }
    set blendEquationRGB(value) {
        this._nativeObj.blendEquationRGB = value;
    }
    get blendEquationRGB() {
        return this._nativeObj.blendEquationRGB;
    }
    set blendEquationAlpha(value) {
        this._nativeObj.blendEquationAlpha = value;
    }
    get blendEquationAlpha() {
        return this._nativeObj.blendEquationAlpha;
    }
    set depthTest(value) {
        this._nativeObj.depthTest = value;
    }
    get depthTest() {
        return this._nativeObj.depthTest;
    }
    set depthWrite(value) {
        this._nativeObj.depthWrite = value;
    }
    get depthWrite() {
        return this._nativeObj.depthWrite;
    }
    set stencilWrite(value) {
        this._nativeObj.stencilWrite = value;
    }
    get stencilWrite() {
        return this._nativeObj.stencilWrite;
    }
    set stencilTest(value) {
        this._nativeObj.stencilTest = value;
    }
    get stencilTest() {
        return this._nativeObj.stencilTest;
    }
    set stencilRef(value) {
        this._nativeObj.stencilRef = value;
    }
    get stencilRef() {
        return this._nativeObj.stencilRef;
    }
    set stencilOp(value) {
        this._nativeObj.setStencilOp(value.x, value.y, value.z);
    }
    setNull() {
        this._nativeObj.setNull();
    }
}

//# sourceMappingURL=NativeRenderState.js.map
