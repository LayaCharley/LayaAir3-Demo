import { Box } from "./Box";
import { Node } from "../display/Node";
export declare class LayoutBox extends Box {
    protected _space: number;
    protected _align: string;
    protected _itemChanged: boolean;
    addChild<T extends Node>(child: T): T;
    private onResize;
    addChildAt(child: Node, index: number): Node;
    removeChildAt(index: number): Node;
    refresh(): void;
    protected changeItems(): void;
    get space(): number;
    set space(value: number);
    get align(): string;
    set align(value: string);
    protected sortItem(items: any[]): void;
    protected _setItemChanged(): void;
}
