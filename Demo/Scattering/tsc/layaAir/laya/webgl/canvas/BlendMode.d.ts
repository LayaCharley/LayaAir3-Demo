export declare class BlendMode {
    static activeBlendFunction: Function;
    static NORMAL: string;
    static MASK: string;
    static LIGHTER: string;
    static fns: any[];
    static targetFns: any[];
    static BlendNormal(): void;
    static BlendAdd(): void;
    static BlendMultiply(): void;
    static BlendScreen(): void;
    static BlendOverlay(): void;
    static BlendLight(): void;
    static BlendNormalTarget(): void;
    static BlendAddTarget(): void;
    static BlendMultiplyTarget(): void;
    static BlendScreenTarget(): void;
    static BlendOverlayTarget(): void;
    static BlendLightTarget(): void;
    static BlendMask(): void;
    static BlendDestinationOut(): void;
}
