import { RenderContext3D } from "../RenderContext3D";
export declare class Command {
    constructor();
    run(): void;
    recover(): void;
    setContext(context: RenderContext3D): void;
}
