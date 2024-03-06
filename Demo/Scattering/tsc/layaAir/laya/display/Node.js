import { NodeFlags } from "../Const";
import { Event } from "../events/Event";
import { EventDispatcher } from "../events/EventDispatcher";
import { Pool } from "../utils/Pool";
import { Stat } from "../utils/Stat";
import { ILaya } from "../../ILaya";
const ARRAY_EMPTY = [];
export class Node extends EventDispatcher {
    constructor() {
        super();
        this._bits = 0;
        this._hideFlags = 0;
        this._children = ARRAY_EMPTY;
        this._parent = null;
        this._destroyed = false;
        this.name = "";
        this._initialize();
    }
    get url() {
        return this._url;
    }
    set url(path) {
        this._url = path;
    }
    get hideFlags() {
        return this._hideFlags;
    }
    set hideFlags(value) {
        this._hideFlags = value;
    }
    get is3D() {
        return this._is3D;
    }
    get destroyed() {
        return this._destroyed;
    }
    _initialize() {
        this._extra = {};
    }
    _setBit(type, value) {
        if (type === NodeFlags.DISPLAY) {
            var preValue = this._getBit(type);
            if (preValue != value)
                this._updateDisplayedInstage();
        }
        if (value)
            this._bits |= type;
        else
            this._bits &= ~type;
    }
    _getBit(type) {
        return (this._bits & type) != 0;
    }
    _setUpNoticeChain() {
        if (this._getBit(NodeFlags.DISPLAY))
            this._setBitUp(NodeFlags.DISPLAY);
    }
    _setBitUp(type) {
        var ele = this;
        ele._setBit(type, true);
        ele = ele._parent;
        while (ele) {
            if (ele._getBit(type))
                return;
            ele._setBit(type, true);
            ele = ele._parent;
        }
    }
    onStartListeningToType(type) {
        if (type === Event.DISPLAY || type === Event.UNDISPLAY) {
            if (!this._getBit(NodeFlags.DISPLAY))
                this._setBitUp(NodeFlags.DISPLAY);
        }
    }
    bubbleEvent(type, data) {
        let arr = _bubbleChainPool.length > 0 ? _bubbleChainPool.pop() : [];
        arr.length = 0;
        let obj = this;
        while (obj) {
            if (obj.activeInHierarchy)
                arr.push(obj);
            obj = obj.parent;
        }
        if (data instanceof Event) {
            data._stopped = false;
            for (let obj of arr) {
                data.setTo(type, obj, this);
                obj.event(type, data);
                if (data._stopped)
                    break;
            }
        }
        else {
            for (let obj of arr)
                obj.event(type, data);
        }
        _bubbleChainPool.push(arr);
    }
    hasHideFlag(flag) {
        return (this._hideFlags & flag) != 0;
    }
    destroy(destroyChild = true) {
        this._destroyed = true;
        this.destroyAllComponent();
        this._parent && this._parent.removeChild(this);
        if (this._children) {
            if (destroyChild)
                this.destroyChildren();
            else
                this.removeChildren();
        }
        this.onDestroy();
        this._children = null;
        this.offAll();
    }
    onDestroy() {
    }
    destroyChildren() {
        if (this._children) {
            for (let i = 0, n = this._children.length; i < n; i++) {
                this._children[0] && this._children[0].destroy(true);
            }
        }
    }
    addChild(node) {
        if (!node || this._destroyed || node === this)
            return node;
        if (node._zOrder)
            this._setBit(NodeFlags.HAS_ZORDER, true);
        if (node._parent === this) {
            var index = this.getChildIndex(node);
            if (index !== this._children.length - 1) {
                this._children.splice(index, 1);
                this._children.push(node);
                this._childChanged();
            }
        }
        else {
            node._parent && node._parent.removeChild(node);
            this._children === ARRAY_EMPTY && (this._children = []);
            this._children.push(node);
            node._setParent(this);
        }
        return node;
    }
    addChildren(...args) {
        var i = 0, n = args.length;
        while (i < n) {
            this.addChild(args[i++]);
        }
    }
    addChildAt(node, index) {
        if (!node || this._destroyed || node === this)
            return node;
        if (node._zOrder)
            this._setBit(NodeFlags.HAS_ZORDER, true);
        if (index >= 0 && index <= this._children.length) {
            if (node._parent === this) {
                var oldIndex = this.getChildIndex(node);
                this._children.splice(oldIndex, 1);
                this._children.splice(index, 0, node);
                this._childChanged();
            }
            else {
                node._parent && node._parent.removeChild(node);
                this._children === ARRAY_EMPTY && (this._children = []);
                this._children.splice(index, 0, node);
                node._setParent(this);
            }
            return node;
        }
        else {
            throw new Error("appendChildAt:The index is out of bounds");
        }
    }
    getChildIndex(node) {
        return this._children.indexOf(node);
    }
    getChildByName(name) {
        for (let child of this._children) {
            if (child && child.name === name)
                return child;
        }
        return null;
    }
    getChildAt(index) {
        return this._children[index] || null;
    }
    setChildIndex(node, index) {
        var childs = this._children;
        if (index < 0 || index >= childs.length) {
            throw new Error("setChildIndex:The index is out of bounds.");
        }
        var oldIndex = this.getChildIndex(node);
        if (oldIndex < 0)
            throw new Error("setChildIndex:node is must child of this object.");
        childs.splice(oldIndex, 1);
        childs.splice(index, 0, node);
        this._childChanged();
        return node;
    }
    _childChanged(child = null) {
    }
    removeChild(node) {
        if (!this._children)
            return node;
        var index = this._children.indexOf(node);
        return this.removeChildAt(index);
    }
    removeSelf() {
        this._parent && this._parent.removeChild(this);
        return this;
    }
    removeChildByName(name) {
        var node = this.getChildByName(name);
        node && this.removeChild(node);
        return node;
    }
    removeChildAt(index) {
        var node = this.getChildAt(index);
        if (node) {
            this._children.splice(index, 1);
            node._setParent(null);
        }
        return node;
    }
    removeChildren(beginIndex = 0, endIndex = 0x7fffffff) {
        if (this._children && this._children.length > 0) {
            var childs = this._children;
            if (beginIndex === 0 && endIndex >= childs.length - 1) {
                var arr = childs;
                this._children = ARRAY_EMPTY;
            }
            else {
                arr = childs.splice(beginIndex, endIndex - beginIndex + 1);
            }
            for (var i = 0, n = arr.length; i < n; i++) {
                arr[i]._setParent(null);
            }
        }
        return this;
    }
    replaceChild(newNode, oldNode) {
        var index = this._children.indexOf(oldNode);
        if (index > -1) {
            this._children.splice(index, 1, newNode);
            oldNode._setParent(null);
            newNode._setParent(this);
            return newNode;
        }
        return null;
    }
    get numChildren() {
        return this._children ? this._children.length : 0;
    }
    get parent() {
        return this._parent;
    }
    isAncestorOf(node) {
        let p = node.parent;
        while (p) {
            if (p == this)
                return true;
            p = p.parent;
        }
        return false;
    }
    ;
    _setParent(value) {
        if (this._parent !== value) {
            if (value) {
                this._parent = value;
                this._onAdded();
                this.event(Event.ADDED);
                if (this._getBit(NodeFlags.DISPLAY)) {
                    this._setUpNoticeChain();
                    value.displayedInStage && this._displayChild(this, true);
                }
                value._childChanged(this);
            }
            else {
                this._onRemoved();
                this.event(Event.REMOVED);
                let p = this._parent;
                if (this._getBit(NodeFlags.DISPLAY))
                    this._displayChild(this, false);
                this._parent = value;
                p._childChanged(this);
            }
        }
    }
    get displayedInStage() {
        if (this._getBit(NodeFlags.DISPLAY))
            return this._getBit(NodeFlags.DISPLAYED_INSTAGE);
        this._setBitUp(NodeFlags.DISPLAY);
        return this._getBit(NodeFlags.DISPLAYED_INSTAGE);
    }
    _updateDisplayedInstage() {
        var ele;
        ele = this;
        var stage = ILaya.stage;
        var displayedInStage = false;
        while (ele) {
            if (ele._getBit(NodeFlags.DISPLAY)) {
                displayedInStage = ele._getBit(NodeFlags.DISPLAYED_INSTAGE);
                break;
            }
            if (ele === stage || ele._getBit(NodeFlags.DISPLAYED_INSTAGE)) {
                displayedInStage = true;
                break;
            }
            ele = ele._parent;
        }
        this._setBit(NodeFlags.DISPLAYED_INSTAGE, displayedInStage);
    }
    _setDisplay(value) {
        if (this._getBit(NodeFlags.DISPLAYED_INSTAGE) !== value) {
            this._setBit(NodeFlags.DISPLAYED_INSTAGE, value);
            if (value)
                this.event(Event.DISPLAY);
            else
                this.event(Event.UNDISPLAY);
        }
    }
    _displayChild(node, display) {
        var childs = node._children;
        if (childs) {
            for (var i = 0, n = childs.length; i < n; i++) {
                var child = childs[i];
                if (!child)
                    continue;
                if (!child._getBit(NodeFlags.DISPLAY))
                    continue;
                if (child._children.length > 0) {
                    this._displayChild(child, display);
                }
                else {
                    child._setDisplay(display);
                }
            }
        }
        node._setDisplay(display);
    }
    contains(node) {
        if (node === this)
            return true;
        while (node) {
            if (node._parent === this)
                return true;
            node = node._parent;
        }
        return false;
    }
    timerLoop(delay, caller, method, args = null, coverBefore = true, jumpFrame = false) {
        this.timer.loop(delay, caller, method, args, coverBefore, jumpFrame);
    }
    timerOnce(delay, caller, method, args = null, coverBefore = true) {
        this.timer._create(false, false, delay, caller, method, args, coverBefore);
    }
    frameLoop(delay, caller, method, args = null, coverBefore = true) {
        this.timer._create(true, true, delay, caller, method, args, coverBefore);
    }
    frameOnce(delay, caller, method, args = null, coverBefore = true) {
        this.timer._create(true, false, delay, caller, method, args, coverBefore);
    }
    clearTimer(caller, method) {
        this.timer.clear(caller, method);
    }
    callLater(method, args = null) {
        this.timer.callLater(this, method, args);
    }
    runCallLater(method) {
        this.timer.runCallLater(this, method);
    }
    get scene() {
        return this._scene;
    }
    get active() {
        return !this._getBit(NodeFlags.NOT_READY) && !this._getBit(NodeFlags.NOT_ACTIVE);
    }
    set active(value) {
        value = !!value;
        if (!this._getBit(NodeFlags.NOT_ACTIVE) !== value) {
            if (this._activeChangeScripts && this._activeChangeScripts.length !== 0) {
                if (value)
                    throw "Node: can't set the main inActive node active in hierarchy,if the operate is in main inActive node or it's children script's onDisable Event.";
                else
                    throw "Node: can't set the main active node inActive in hierarchy,if the operate is in main active node or it's children script's onEnable Event.";
            }
            else {
                this._setBit(NodeFlags.NOT_ACTIVE, !value);
                if (this._parent) {
                    if (this._parent.activeInHierarchy) {
                        this._processActive(value, true);
                    }
                }
            }
        }
    }
    get activeInHierarchy() {
        return this._getBit(NodeFlags.ACTIVE_INHIERARCHY);
    }
    _onActive() {
        Stat.spriteCount++;
    }
    _onInActive() {
        Stat.spriteCount--;
    }
    _onActiveInScene() {
    }
    _onInActiveInScene() {
    }
    onAwake() {
    }
    onEnable() {
    }
    onDisable() {
    }
    _parse(data, spriteMap) {
    }
    _setBelongScene(scene) {
        if (!this._scene || this.scene != scene) {
            this._scene = scene;
            this._onActiveInScene();
            for (let i = 0, n = this._children.length; i < n; i++)
                this._children[i]._setBelongScene(scene);
        }
    }
    _setUnBelongScene() {
        if (this._scene !== this) {
            this._onInActiveInScene();
            this._scene = null;
            for (let i = 0, n = this._children.length; i < n; i++)
                this._children[i]._setUnBelongScene();
        }
    }
    _processActive(active, fromSetter) {
        (this._activeChangeScripts) || (this._activeChangeScripts = []);
        let arr = this._activeChangeScripts;
        if (active)
            this._activeHierarchy(arr, fromSetter);
        else
            this._inActiveHierarchy(arr, fromSetter);
        for (let i = 0, n = arr.length; i < n; i++) {
            let comp = arr[i];
            comp.owner && comp._setActive(active);
        }
        arr.length = 0;
    }
    _activeHierarchy(activeChangeScripts, fromSetter) {
        this._setBit(NodeFlags.ACTIVE_INHIERARCHY, true);
        if (this._components) {
            for (let i = 0, n = this._components.length; i < n; i++) {
                let comp = this._components[i];
                if (comp._isScript())
                    (comp._enabled) && (activeChangeScripts.push(comp));
                else
                    comp._setActive(true);
            }
        }
        this._onActive();
        for (let i = 0, n = this._children.length; i < n; i++) {
            let child = this._children[i];
            (!child._getBit(NodeFlags.NOT_ACTIVE) && !child._getBit(NodeFlags.NOT_READY)) && (child._activeHierarchy(activeChangeScripts, fromSetter));
        }
        if (!this._getBit(NodeFlags.AWAKED)) {
            this._setBit(NodeFlags.AWAKED, true);
            this.onAwake();
        }
        this.onEnable();
    }
    _inActiveHierarchy(activeChangeScripts, fromSetter) {
        this._onInActive();
        if (this._components) {
            for (let i = 0, n = this._components.length; i < n; i++) {
                let comp = this._components[i];
                if (comp._isScript())
                    comp._enabled && (activeChangeScripts.push(comp));
                else
                    comp._setActive(false);
            }
        }
        this._setBit(NodeFlags.ACTIVE_INHIERARCHY, false);
        for (let i = 0, n = this._children.length; i < n; i++) {
            let child = this._children[i];
            (child && !child._getBit(NodeFlags.NOT_ACTIVE)) && (child._inActiveHierarchy(activeChangeScripts, fromSetter));
        }
        this.onDisable();
    }
    _onAdded() {
        if (this._activeChangeScripts && this._activeChangeScripts.length !== 0) {
            throw "Node: can't set the main inActive node active in hierarchy,if the operate is in main inActive node or it's children script's onDisable Event.";
        }
        else {
            let parentScene = this._parent.scene;
            parentScene && this._setBelongScene(parentScene);
            (this._parent.activeInHierarchy && this.active) && this._processActive(true);
        }
    }
    _onRemoved() {
        if (this._activeChangeScripts && this._activeChangeScripts.length !== 0) {
            throw "Node: can't set the main active node inActive in hierarchy,if the operate is in main active node or it's children script's onEnable Event.";
        }
        else {
            (this._parent.activeInHierarchy && this.active) && this._processActive(false);
            this._parent.scene && this._setUnBelongScene();
        }
    }
    _addComponentInstance(comp) {
        var _a;
        if (!this._components)
            this._components = [];
        this._components.push(comp);
        comp._setOwner(this);
        if (this.activeInHierarchy)
            comp._setActive(true);
        (_a = this._componentsChanged) === null || _a === void 0 ? void 0 : _a.call(this, comp, 0);
    }
    _destroyComponent(comp) {
        var _a;
        if (!this._components)
            return;
        let i = this._components.indexOf(comp);
        if (i != -1) {
            this._components.splice(i, 1);
            comp._destroy();
            (_a = this._componentsChanged) === null || _a === void 0 ? void 0 : _a.call(this, comp, 1);
        }
    }
    destroyAllComponent() {
        var _a;
        if (!this._components)
            return;
        for (let i = 0, n = this._components.length; i < n; i++) {
            let item = this._components[i];
            item && !item.destroyed && item._destroy();
        }
        this._components.length = 0;
        (_a = this._componentsChanged) === null || _a === void 0 ? void 0 : _a.call(this, null, 2);
    }
    _cloneTo(destObject, srcRoot, dstRoot) {
        var destNode = destObject;
        if (this._components) {
            for (let i = 0, n = this._components.length; i < n; i++) {
                var destComponent = destNode.addComponent(this._components[i].constructor);
                this._components[i]._cloneTo(destComponent);
            }
        }
    }
    addComponentInstance(component) {
        if (component.owner)
            throw "Node:the component has belong to other node.";
        if (component._singleton && this.getComponent(component.constructor))
            console.warn("Node:the component is singleton, can't add the second one.", component);
        else
            this._addComponentInstance(component);
        return component;
    }
    addComponent(componentType) {
        let comp = Pool.createByClass(componentType);
        if (!comp) {
            throw "missing " + componentType.toString();
        }
        if (comp._singleton && this.getComponent(componentType))
            console.warn("Node:the component is singleton, can't add the second one.", comp);
        else
            this._addComponentInstance(comp);
        return comp;
    }
    getComponent(componentType) {
        if (this._components) {
            for (let i = 0, n = this._components.length; i < n; i++) {
                let comp = this._components[i];
                if (comp instanceof componentType)
                    return comp;
            }
        }
        return null;
    }
    get components() {
        return this._components || ARRAY_EMPTY;
    }
    getComponents(componentType) {
        var arr;
        if (this._components) {
            for (let i = 0, n = this._components.length; i < n; i++) {
                let comp = this._components[i];
                if (comp instanceof componentType) {
                    arr = arr || [];
                    arr.push(comp);
                }
            }
        }
        return arr;
    }
    get timer() {
        return this._scene ? this._scene.timer : ILaya.timer;
    }
    onAfterDeserialize() { }
}
const _bubbleChainPool = [];

//# sourceMappingURL=Node.js.map
