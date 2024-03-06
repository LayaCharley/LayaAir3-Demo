import { Sprite } from "./Sprite";
import { Widget } from "../components/Widget";
import { Handler } from "../utils/Handler";
import { Timer } from "../utils/Timer";
export declare class Scene extends Sprite {
    static readonly unDestroyedScenes: Set<Scene>;
    private static _root;
    private static _loadPage;
    autoDestroyAtClosed: boolean;
    _scene3D: any;
    protected _widget: Widget;
    private _timer;
    private _viewCreated;
    constructor(createChildren?: boolean);
    protected createChildren(): void;
    static setUIMap(url: string): void;
    loadScene(path: string): void;
    createView(view: any): void;
    getNodeByID(id: number): any;
    open(closeOther?: boolean, param?: any): void;
    onOpened(param: any): void;
    close(type?: string): void;
    onClosed(type?: string): void;
    destroy(destroyChild?: boolean): void;
    get_width(): number;
    get_height(): number;
    get timer(): Timer;
    set timer(value: Timer);
    get scene3D(): any;
    get top(): number;
    set top(value: number);
    get bottom(): number;
    set bottom(value: number);
    get left(): number;
    set left(value: number);
    get right(): number;
    set right(value: number);
    get centerX(): number;
    set centerX(value: number);
    get centerY(): number;
    set centerY(value: number);
    protected _shouldRefreshLayout(): void;
    protected _sizeChanged(): void;
    freshLayout(): void;
    private _getWidget;
    static get root(): Sprite;
    static load(url: string, complete?: Handler, progress?: Handler): Promise<Scene>;
    static open(url: string, closeOther?: boolean, param?: any, complete?: Handler, progress?: Handler): Promise<Scene>;
    private static _onSceneLoaded;
    static close(url: string, name?: string): boolean;
    static closeAll(): void;
    static destroy(url: string, name?: string): boolean;
    static gc(): void;
    static setLoadingPage(loadPage: Sprite): void;
    static showLoadingPage(param?: any, delay?: number): void;
    private static _showLoading;
    private static _hideLoading;
    static hideLoadingPage(delay?: number): void;
}