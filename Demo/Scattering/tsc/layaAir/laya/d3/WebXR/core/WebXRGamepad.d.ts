import { EventDispatcher } from "../../../events/EventDispatcher";
export declare class AxiGamepad extends EventDispatcher {
    static EVENT_OUTPUT: string;
    handness: string;
    axisLength: number;
    private axisData;
    destroy(): void;
}
export declare class ButtonGamepad extends EventDispatcher {
    static EVENT_TOUCH_ENTER: string;
    static EVENT_TOUCH_STAY: string;
    static EVENT_TOUCH_OUT: string;
    static EVENT_PRESS_ENTER: string;
    static EVENT_PRESS_STAY: string;
    static EVENT_PRESS_OUT: string;
    static EVENT_PRESS_VALUE: string;
    handness: string;
    index: number;
    private lastTouch;
    private lastPress;
    private lastPressValue;
    private touch;
    private press;
    private pressValue;
    constructor(handness: string, index: number);
    destroy(): void;
}
