import { SkinnedMeshRenderer } from "./SkinnedMeshRenderer";
import { Component } from "../../components/Component";
export declare class SimpleSkinnedMeshRenderer extends SkinnedMeshRenderer {
    constructor();
    protected _getcommonUniformMap(): string[];
    _cloneTo(dest: Component): void;
    protected _onDestroy(): void;
}
