export class FilterTool {
    constructor() {
    }
    static getArrByFilter(arr, filterFun) {
        var i, len = arr.length;
        var rst = [];
        for (i = 0; i < len; i++) {
            if (filterFun(arr[i]))
                rst.push(arr[i]);
        }
        return rst;
    }
    static getArr(arr, sign, value) {
        var i, len = arr.length;
        var rst = [];
        for (i = 0; i < len; i++) {
            if (arr[i][sign] == value)
                rst.push(arr[i]);
        }
        return rst;
    }
}
