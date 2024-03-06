const ITEM_LAYOUT = 4;
export class Delegate {
    constructor() {
        this._flag = 0;
        this._items = [];
    }
    add(callback, target, args) {
        let arr = this._items;
        let index = arr.findIndex((value, index, arr) => value == callback && arr[index + 1] == target);
        if (index != -1) {
            arr[index + 2] = args;
            arr[index + 3] = 1;
        }
        else
            arr.push(callback, target, args, 1);
    }
    once(callback, target, args) {
        let arr = this._items;
        let index = arr.findIndex((value, index, arr) => value == callback && arr[index + 1] == target);
        if (index != -1) {
            arr[index + 2] = args;
            arr[index + 3] = 2;
        }
        else
            arr.push(callback, target, args, 2);
    }
    remove(callback, target) {
        let arr = this._items;
        let index = arr.findIndex((value, index, arr) => value == callback && arr[index + 1] == target);
        if (index != -1) {
            if (this._flag != 0) {
                arr[index + 3] = 0;
                this._flag = 2;
            }
            else
                arr.splice(index, ITEM_LAYOUT);
        }
    }
    clear() {
        let arr = this._items;
        if (this._flag != 0) {
            arr.forEach((value, index, arr) => { if (index % ITEM_LAYOUT == 3)
                arr[index] = 0; });
            this._flag = 2;
        }
        else {
            arr.length = 0;
        }
    }
    clearForTarget(target) {
        if (!target)
            return;
        let arr = this._items;
        if (this._flag != 0) {
            arr.forEach((value, index, arr) => { if ((index % ITEM_LAYOUT == 1) && arr[index] == target)
                arr[index + 2] = 0; });
            this._flag = 2;
        }
        else {
            let i = arr.length - ITEM_LAYOUT;
            while (i >= 0) {
                if (arr[i + 1] == target)
                    arr.splice(i, ITEM_LAYOUT);
                i -= ITEM_LAYOUT;
            }
        }
    }
    get count() {
        return this._items.length / ITEM_LAYOUT;
    }
    invoke(...args) {
        if (this._flag != 0)
            return;
        this._flag = 1;
        let arr = this._items;
        let cnt = arr.length;
        for (let i = 0; i < cnt; i += ITEM_LAYOUT) {
            if (0 == arr[i + 3])
                continue;
            let fixedArgs = arr[i + 2];
            if (fixedArgs != null)
                arr[i].call(arr[i + 1], ...fixedArgs, ...args);
            else
                arr[i].call(arr[i + 1], ...args);
            if (arr[i + 3] == 2) {
                arr[i + 3] = 0;
                this._flag = 2;
            }
        }
        if (this._flag == 2) {
            let cnt = arr.length;
            let i = 0;
            while (i < cnt) {
                if (arr[i + 3] == 0) {
                    arr.splice(i, ITEM_LAYOUT);
                    cnt -= ITEM_LAYOUT;
                    continue;
                }
                else
                    i += ITEM_LAYOUT;
            }
        }
        this._flag = 0;
    }
}

//# sourceMappingURL=Delegate.js.map
