import { BlendFactor } from "../../RenderEngine/RenderEnum/BlendFactor";
import { RenderStateContext } from "../../RenderEngine/RenderStateContext";
export class BlendMode {
    static _init_() {
        BlendMode.fns = [
            BlendMode.BlendNormal,
            BlendMode.BlendAdd,
            BlendMode.BlendMultiply,
            BlendMode.BlendScreen,
            BlendMode.BlendOverlay,
            BlendMode.BlendLight,
            BlendMode.BlendMask,
            BlendMode.BlendDestinationOut,
            BlendMode.BlendAddOld
        ];
        BlendMode.targetFns = [
            BlendMode.BlendNormalTarget,
            BlendMode.BlendAddTarget,
            BlendMode.BlendMultiplyTarget,
            BlendMode.BlendScreenTarget,
            BlendMode.BlendOverlayTarget,
            BlendMode.BlendLightTarget,
            BlendMode.BlendMask,
            BlendMode.BlendDestinationOut,
            BlendMode.BlendAddTargetOld
        ];
    }
    static BlendNormal() {
        RenderStateContext.setBlendFunc(BlendFactor.One, BlendFactor.OneMinusSourceAlpha);
    }
    static BlendAddOld() {
        RenderStateContext.setBlendFunc(BlendFactor.One, BlendFactor.DestinationAlpha);
    }
    static BlendAdd() {
        RenderStateContext.setBlendFunc(BlendFactor.One, BlendFactor.One);
    }
    static BlendMultiply() {
        RenderStateContext.setBlendFunc(BlendFactor.DestinationColor, BlendFactor.OneMinusSourceAlpha);
    }
    static BlendScreen() {
        RenderStateContext.setBlendFunc(BlendFactor.One, BlendFactor.One);
    }
    static BlendOverlay() {
        RenderStateContext.setBlendFunc(BlendFactor.One, BlendFactor.OneMinusSourceAlpha);
    }
    static BlendLight() {
        RenderStateContext.setBlendFunc(BlendFactor.One, BlendFactor.One);
    }
    static BlendNormalTarget() {
        RenderStateContext.setBlendFunc(BlendFactor.One, BlendFactor.OneMinusSourceAlpha);
    }
    static BlendAddTargetOld() {
        RenderStateContext.setBlendFunc(BlendFactor.One, BlendFactor.DestinationAlpha);
    }
    static BlendAddTarget() {
        RenderStateContext.setBlendFunc(BlendFactor.One, BlendFactor.One);
    }
    static BlendMultiplyTarget() {
        RenderStateContext.setBlendFunc(BlendFactor.DestinationColor, BlendFactor.OneMinusSourceAlpha);
    }
    static BlendScreenTarget() {
        RenderStateContext.setBlendFunc(BlendFactor.One, BlendFactor.One);
    }
    static BlendOverlayTarget() {
        RenderStateContext.setBlendFunc(BlendFactor.One, BlendFactor.OneMinusSourceColor);
    }
    static BlendLightTarget() {
        RenderStateContext.setBlendFunc(BlendFactor.One, BlendFactor.One);
    }
    static BlendMask() {
        RenderStateContext.setBlendFunc(BlendFactor.Zero, BlendFactor.SourceAlpha);
    }
    static BlendDestinationOut() {
        RenderStateContext.setBlendFunc(BlendFactor.Zero, BlendFactor.Zero);
    }
}
BlendMode.activeBlendFunction = null;
BlendMode.NAMES = [
    "normal",
    "add",
    "multiply",
    "screen",
    "overlay",
    "light",
    "mask",
    "destination-out",
    "add_old"
];
BlendMode.TOINT = {
    "normal": 0,
    "add": 1,
    "multiply": 2,
    "screen": 3,
    "overlay": 4,
    "light": 5,
    "mask": 6,
    "destination-out": 7,
    "lighter": 1,
    "lighter_old": 8,
    "add_old": 8
};
BlendMode.NORMAL = "normal";
BlendMode.MASK = "mask";
BlendMode.LIGHTER = "lighter";

//# sourceMappingURL=BlendMode.js.map
