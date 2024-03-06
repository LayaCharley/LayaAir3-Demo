import { EventDispatcher } from "../../../events/EventDispatcher";
export declare class WebXRSessionManager extends EventDispatcher {
    static EVENT_MANAGER_END: string;
    static EVENT_FRAME_LOOP: string;
    session: any;
    viewerReferenceSpace: any;
    baseReferenceSpace: any;
    currentFrame: any;
    currentTimestamp: number;
    defaultHeightCompensation: number;
    private _referenceSpace;
    private _sessionMode;
    private _sessionEnded;
    private _baseLayer;
    private _xrNavigator;
    get referenceSpace(): any;
    set referenceSpace(newReferenceSpace: any);
    get sessionMode(): any;
    exitXR(): void;
    initializeXRGL(xrSession: any, gl: WebGLRenderingContext): Promise<boolean>;
    initializeAsync(): Promise<void>;
    isSessionSupportedAsync(sessionMode: string): Promise<boolean>;
    initializeSessionAsync(xrSessionMode?: string, xrSessionInit?: {}): Promise<any>;
    resetReferenceSpace(): void;
    runXRRenderLoop(): void;
    endXRRenderLoop(): void;
    private _updateByXrFrame;
    setReferenceSpaceTypeAsync(referenceSpaceType?: string): Promise<any>;
    updateRenderStateAsync(state: any): any;
    get currentFrameRate(): number | undefined;
    get supportedFrameRates(): Float32Array | undefined;
    updateTargetFrameRate(rate: number): Promise<void>;
    destroy(): void;
}
