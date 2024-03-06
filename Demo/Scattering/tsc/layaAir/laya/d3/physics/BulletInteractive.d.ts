export interface IPhyDebugDrawer {
    color(c: number): void;
    line(sx: number, sy: number, sz: number, ex: number, ey: number, ez: number): void;
    clear(): void;
}
