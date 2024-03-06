import { BoneSlot } from "./BoneSlot";
import { AnimationPlayer } from "../AnimationPlayer";
import { Sprite } from "../../display/Sprite";
import { Handler } from "../../utils/Handler";
import { Texture } from "../../resource/Texture";
import { Templet } from "../../ani/bone/Templet";
export declare class Skeleton extends Sprite {
    protected _source: string;
    private _animationName;
    private _loop;
    constructor(aniMode?: number);
    get index(): number;
    set index(value: number);
    get total(): number;
    get player(): AnimationPlayer;
    get skinName(): string;
    set skinName(value: string);
    get animationName(): string;
    set animationName(value: string);
    get loop(): boolean;
    set loop(value: boolean);
    get templet(): Templet;
    set templet(value: Templet);
    get source(): string;
    set source(value: string);
    get aniMode(): number;
    set aniMode(value: number);
    protected init(templet: Templet): void;
    load(path: string, complete?: Handler): void;
    private _checkIsAllParsed;
    getAnimNum(): number;
    getAniNameByIndex(index: number): string;
    getSlotByName(name: string): BoneSlot;
    showSkinByName(name: string, freshSlotIndex?: boolean): void;
    showSkinByIndex(skinIndex: number, freshSlotIndex?: boolean): void;
    showSlotSkinByIndex(slotName: string, index: number): void;
    showSlotSkinByName(slotName: string, name: string): void;
    replaceSlotSkinName(slotName: string, oldName: string, newName: string): void;
    replaceSlotSkinByIndex(slotName: string, oldIndex: number, newIndex: number): void;
    setSlotSkin(slotName: string, texture: Texture): void;
    play(nameOrIndex: any, loop: boolean, force?: boolean, start?: number, end?: number, freshSkin?: boolean, playAudio?: boolean): void;
    stop(): void;
    playbackRate(value: number): void;
    paused(): void;
    resume(): void;
    destroy(destroyChild?: boolean): void;
}
