import { Material } from "../../material/Material";
import { Command } from "./Command";
export declare class DrawRenderCMD extends Command {
    constructor();
    set material(value: Material);
    run(): void;
    recover(): void;
    destroy(): void;
}
