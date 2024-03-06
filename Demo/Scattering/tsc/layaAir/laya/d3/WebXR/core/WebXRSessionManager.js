import { ILaya } from "../../../../ILaya";
import { EventDispatcher } from "../../../events/EventDispatcher";
export class WebXRSessionManager extends EventDispatcher {
    constructor() {
        super();
        this.currentTimestamp = -1;
        this.defaultHeightCompensation = 1.7;
        this._sessionEnded = false;
    }
    get referenceSpace() {
        return this._referenceSpace;
    }
    set referenceSpace(newReferenceSpace) {
        this._referenceSpace = newReferenceSpace;
    }
    get sessionMode() {
        return this._sessionMode;
    }
    exitXR() {
        this.endXRRenderLoop();
        this.event(WebXRSessionManager.EVENT_MANAGER_END);
    }
    initializeXRGL(xrSession, gl) {
        return gl.makeXRCompatible().then(() => {
            return true;
        });
    }
    ;
    initializeAsync() {
        this._xrNavigator = navigator;
        if (!this._xrNavigator.xr) {
            return Promise.reject("WebXR not available");
        }
        return Promise.resolve();
    }
    isSessionSupportedAsync(sessionMode) {
        if (!navigator.xr) {
            return Promise.resolve(false);
        }
        else {
            this._xrNavigator = navigator;
        }
        const functionToUse = navigator.xr.isSessionSupported || navigator.xr.supportsSession;
        if (!functionToUse)
            return Promise.resolve(false);
        else {
            return navigator.xr.isSessionSupported(sessionMode);
        }
    }
    initializeSessionAsync(xrSessionMode = 'immersive-vr', xrSessionInit = {}) {
        return this._xrNavigator.xr.requestSession('immersive-vr').then((session) => {
            this.session = session;
            this._sessionMode = xrSessionMode;
            this._sessionEnded = false;
            this.session.addEventListener("end", () => {
                this._sessionEnded = true;
                this.exitXR();
            }, { once: true });
            return this.session;
        });
    }
    resetReferenceSpace() {
        this.referenceSpace = this.baseReferenceSpace;
    }
    runXRRenderLoop() {
        this.session.requestAnimationFrame.bind(this.session);
        let fn = (timestamp, xrFrame) => {
            this._updateByXrFrame(xrFrame, timestamp);
            this.event(WebXRSessionManager.EVENT_FRAME_LOOP, [xrFrame]);
            ILaya.stage._loop();
            this.session.requestAnimationFrame(fn);
        };
        this.session.requestAnimationFrame(fn);
    }
    endXRRenderLoop() {
    }
    _updateByXrFrame(xrFrame, timestamp) {
        this.currentFrame = xrFrame;
        this.currentTimestamp = timestamp;
    }
    setReferenceSpaceTypeAsync(referenceSpaceType = "local-floor") {
        return this.session
            .requestReferenceSpace(referenceSpaceType)
            .then((referenceSpace) => {
            return referenceSpace;
        }, (rejectionReason) => {
            return this.session.requestReferenceSpace("viewer").then((referenceSpace) => {
                const heightCompensation = new XRRigidTransform({ x: 0, y: -this.defaultHeightCompensation, z: 0 });
                return (referenceSpace).getOffsetReferenceSpace(heightCompensation);
            }, (rejectionReason) => {
                throw 'XR initialization failed: required "viewer" reference space type not supported.';
            });
        }).then((referenceSpace) => {
            this.referenceSpace = this.baseReferenceSpace = referenceSpace;
            return this.referenceSpace;
        });
    }
    updateRenderStateAsync(state) {
        if (state.baseLayer) {
            this._baseLayer = state.baseLayer;
        }
        return this.session.updateRenderState(state);
    }
    get currentFrameRate() {
        var _a;
        return (_a = this.session) === null || _a === void 0 ? void 0 : _a.frameRate;
    }
    get supportedFrameRates() {
        var _a;
        return (_a = this.session) === null || _a === void 0 ? void 0 : _a.supportedFrameRates;
    }
    updateTargetFrameRate(rate) {
        return this.session.updateTargetFrameRate(rate);
    }
    destroy() {
        if (!this._sessionEnded) {
            this.exitXR();
        }
    }
}
WebXRSessionManager.EVENT_MANAGER_END = "xrManagerDestory";
WebXRSessionManager.EVENT_FRAME_LOOP = "xrFrameLoop";

//# sourceMappingURL=WebXRSessionManager.js.map
