import { Event } from "../events/Event";
import { Button } from "./Button";
export declare class Radio extends Button {
    protected _value: any;
    constructor(skin?: string, label?: string);
    protected preinitialize(): void;
    protected initialize(): void;
    protected onClick(e: Event): void;
    get value(): any;
    set value(obj: any);
}
