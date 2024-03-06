import { Node } from "../display/Node";
import { Box } from "./Box";
import { Handler } from "../utils/Handler";
export declare class ViewStack extends Box {
    protected _items: any[];
    protected _setIndexHandler: Handler;
    protected _selectedIndex: number;
    constructor();
    setItems(views: any[]): void;
    addItem(view: Node): void;
    onAfterDeserialize(): void;
    initItems(): void;
    get selectedIndex(): number;
    set selectedIndex(value: number);
    protected setSelect(index: number, selected: boolean): void;
    get selection(): Node;
    set selection(value: Node);
    get setIndexHandler(): Handler;
    set setIndexHandler(value: Handler);
    protected setIndex(index: number): void;
    get items(): any[];
    set_dataSource(value: any): void;
}
