export class QuickSort {
    sort(elements, isTransparent, left, right) {
        this.elementArray = elements;
        this.isTransparent = isTransparent;
        this._quickSort(left, right);
    }
    _quickSort(left, right) {
        if (this.elementArray.length > 1) {
            var index = this._partitionRenderObject(left, right);
            var leftIndex = index - 1;
            if (left < leftIndex)
                this._quickSort(left, leftIndex);
            if (index < right)
                this._quickSort(index, right);
        }
    }
    _partitionRenderObject(left, right) {
        var elements = this.elementArray.elements;
        var pivot = elements[Math.floor((right + left) / 2)];
        while (left <= right) {
            while (this._compare(elements[left], pivot) < 0)
                left++;
            while (this._compare(elements[right], pivot) > 0)
                right--;
            if (left < right) {
                var temp = elements[left];
                elements[left] = elements[right];
                elements[right] = temp;
                left++;
                right--;
            }
            else if (left === right) {
                left++;
                break;
            }
        }
        return left;
    }
    _compare(left, right) {
        var renderQueue = left._material.renderQueue - right._material.renderQueue;
        if (renderQueue === 0) {
            var sort = this.isTransparent ? right._baseRender._distanceForSort - left._baseRender._distanceForSort : left._baseRender._distanceForSort - right._baseRender._distanceForSort;
            return sort + right._baseRender.sortingFudge - left._baseRender.sortingFudge;
        }
        else {
            return renderQueue;
        }
    }
}

//# sourceMappingURL=QuickSort.js.map
