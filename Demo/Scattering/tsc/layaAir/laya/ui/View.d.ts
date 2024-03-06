import { Scene } from "../display/Scene";
export declare class View extends Scene {
    static uiMap: any;
    protected _dataSource: any;
    constructor();
    static regUI(url: string, json: any): void;
    changeData(key: string): void;
    set_dataSource(value: any): void;
}
