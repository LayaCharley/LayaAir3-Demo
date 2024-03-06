import { Component } from "./Component";
export declare class ComponentDriver {
    private _onUpdates;
    private _onLateUpdates;
    private _onPreRenders;
    private _onPostRenders;
    private _toStarts;
    readonly _toDestroys: Set<Component>;
}
