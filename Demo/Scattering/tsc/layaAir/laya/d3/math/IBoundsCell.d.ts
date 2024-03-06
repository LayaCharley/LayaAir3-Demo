import { Bounds } from "./Bounds";
export interface IBoundsCell {
    bounds: Bounds;
    id: number;
    shadowCullPass(): boolean;
}
