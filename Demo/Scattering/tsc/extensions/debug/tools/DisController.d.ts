import { Sprite } from "laya/display/Sprite";
export declare class DisController {
    constructor();
    private arrowAxis;
    private _target;
    private recInfo;
    private static _container;
    private static init;
    set target(target: Sprite);
    get target(): Sprite;
    set type(lenType: number);
    get type(): number;
    switchType(): void;
    private updateMe;
    private static _instance;
    static get I(): DisController;
    static set I(value: DisController);
}
