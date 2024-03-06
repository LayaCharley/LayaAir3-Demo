import { Graphics } from "../display/Graphics";
import { Sprite } from "../display/Sprite";
import { IHitArea } from "./IHitArea";
export declare class HitArea implements IHitArea {
    _hit: Graphics;
    _unHit: Graphics;
    contains(x: number, y: number, sp: Sprite): boolean;
    get hit(): Graphics;
    set hit(value: Graphics);
    get unHit(): Graphics;
    set unHit(value: Graphics);
    onAfterDeserialize(): void;
}
