export class LayoutTools {
    constructor() {
    }
    static layoutToXCount(items, xCount = 1, dx = 0, dY = 0, sx = 0, sy = 0) {
        var tX, tY;
        var tItem;
        var i, len;
        var tCount;
        var maxHeight;
        tCount = 0;
        maxHeight = 0;
        tX = sx;
        tY = sy;
        len = items.length;
        for (i = 0; i < len; i++) {
            tItem = items[i];
            tItem.x = tX;
            tItem.y = tY;
            if (tItem.height > maxHeight) {
                maxHeight = tItem.height;
            }
            tCount++;
            if (tCount >= xCount) {
                tCount = tCount % xCount;
                tItem.y += maxHeight + dY;
                maxHeight = 0;
            }
            else {
                tX += tItem.width + dx;
            }
        }
    }
    static layoutToWidth(items, width, dX, dY, sx, sy) {
        var tX, tY;
        var tItem;
        var i, len;
        tX = sx;
        tY = sy;
        len = items.length;
        for (i = 0; i < len; i++) {
            tItem = items[i];
            if (tX + tItem.width + dX > width) {
                tX = sx;
                tY += dY + tItem.height;
            }
            else {
            }
            tItem.x = tX;
            tItem.y = tY;
            tX += dX + tItem.width;
        }
    }
}
