export class MathTools {
    constructor() {
    }
    static sortBigFirst(a, b) {
        if (a == b)
            return 0;
        return b > a ? 1 : -1;
    }
    static sortSmallFirst(a, b) {
        if (a == b)
            return 0;
        return b > a ? -1 : 1;
    }
    static sortNumBigFirst(a, b) {
        return parseFloat(b) - parseFloat(a);
    }
    static sortNumSmallFirst(a, b) {
        return parseFloat(a) - parseFloat(b);
    }
    static sortByKey(key, bigFirst = false, forceNum = true) {
        var _sortFun;
        if (bigFirst) {
            _sortFun = forceNum ? MathTools.sortNumBigFirst : MathTools.sortBigFirst;
        }
        else {
            _sortFun = forceNum ? MathTools.sortNumSmallFirst : MathTools.sortSmallFirst;
        }
        return function (a, b) {
            return _sortFun(a[key], b[key]);
        };
    }
}
