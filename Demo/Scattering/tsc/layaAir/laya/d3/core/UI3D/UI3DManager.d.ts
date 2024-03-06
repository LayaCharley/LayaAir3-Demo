import { SingletonList } from "../../../utils/SingletonList";
import { Ray } from "../../math/Ray";
import { UI3D } from "./UI3D";
export declare class UI3DManager {
    _UI3Dlist: SingletonList<UI3D>;
    constructor();
    add(value: UI3D): void;
    remove(value: UI3D): void;
    update(): void;
    rayCast(ray: Ray): any;
    destory(): void;
}
