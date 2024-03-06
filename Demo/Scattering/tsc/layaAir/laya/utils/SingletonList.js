export class SingletonList {
    constructor() {
        this.elements = [];
        this.length = 0;
    }
    _add(element) {
        if (this.length === this.elements.length)
            this.elements.push(element);
        else
            this.elements[this.length] = element;
    }
    add(element) {
        let index = this.elements.indexOf(element);
        if ((typeof (element) != "number") && index != -1 && index < this.length)
            return;
        if (this.length === this.elements.length)
            this.elements.push(element);
        else
            this.elements[this.length] = element;
        this.length++;
    }
    indexof(element) {
        let index = this.elements.indexOf(element);
        if (index != -1 && index < this.length)
            return index;
        return -1;
    }
    remove(element) {
        let index = this.elements.indexOf(element);
        if (index != -1 && index < this.length) {
            this.elements[index] = this.elements[this.length - 1];
            this.length--;
        }
    }
    clear() {
        this.elements = [];
        this.length = 0;
    }
    clean() {
        this.elements.length = this.length;
    }
    destroy() {
        this.elements = null;
    }
}

//# sourceMappingURL=SingletonList.js.map
