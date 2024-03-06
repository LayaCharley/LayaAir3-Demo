import { Rectangle } from "laya/maths/Rectangle";
import { RenderSprite } from "laya/renders/RenderSprite";
export class CanvasTools {
    constructor() {
    }
    static createCanvas(width, height) {
        return null;
    }
    static renderSpriteToCanvas(sprite, canvas, offsetX, offsetY) {
        RenderSprite.renders[sprite._renderType]._fun(sprite, canvas.context, offsetX, offsetY);
    }
    static getImageDataFromCanvas(canvas, x = 0, y = 0, width = 0, height = 0) {
        if (width <= 0)
            width = canvas.width;
        if (height <= 0)
            height = canvas.height;
        var imgdata = canvas.context.getImageData(x, y, width, height);
        return imgdata;
    }
    static getImageDataFromCanvasByRec(canvas, rec) {
        var imgdata = canvas.context.getImageData(rec.x, rec.y, rec.width, rec.height);
        return imgdata;
    }
    static getDifferCount(imageData1, imageData2) {
        var data1 = imageData1.data;
        var data2 = imageData2.data;
        var differCount;
        differCount = 0;
        CanvasTools.walkImageData(imageData1, myWalkFun);
        return differCount;
        function myWalkFun(i, j, tarPos, data) {
            if (!CanvasTools.isPoinSame(tarPos, data1, data2))
                differCount++;
        }
    }
    static getDifferRate(imageData1, imageData2) {
        return CanvasTools.getDifferCount(imageData1, imageData2) / (imageData1.width * imageData1.height);
    }
    static getCanvasDisRec(canvas) {
        var rst;
        rst = new Rectangle;
        var imgdata;
        imgdata = CanvasTools.getImageDataFromCanvas(canvas, 0, 0);
        var maxX;
        var minX;
        var maxY;
        var minY;
        maxX = maxY = 0;
        minX = imgdata.width;
        minY = imgdata.height;
        var i, iLen;
        var j, jLen;
        iLen = imgdata.width;
        jLen = imgdata.height;
        var data;
        data = imgdata.data;
        var tarPos = 0;
        for (j = 0; j < jLen; j++) {
            for (i = 0; i < iLen; i++) {
                if (!CanvasTools.isEmptyPoint(data, tarPos)) {
                    if (minX > i)
                        minX = i;
                    if (maxX < i)
                        maxX = i;
                    if (minY > j)
                        minY = j;
                    if (maxY < j)
                        maxY = j;
                }
                tarPos += 4;
            }
        }
        rst.setTo(minX, minY, maxX - minX + 1, maxY - minY + 1);
        return rst;
    }
    static fillCanvasRec(canvas, rec, color) {
        var ctx = canvas.context;
        ctx.fillStyle = color;
        ctx.fillRect(rec.x, rec.y, rec.width, rec.height);
    }
    static isEmptyPoint(data, pos) {
        if (data[pos] == 0 && data[pos + 1] == 0 && data[pos + 2] == 0 && data[pos + 3] == 0) {
            return true;
        }
        else {
            return false;
        }
    }
    static isPoinSame(pos, data1, data2) {
        if (data1[pos] == data2[pos] && data1[pos + 1] == data2[pos + 1] && data1[pos + 2] == data2[pos + 2] && data1[pos + 3] == data2[pos + 3]) {
            return true;
        }
        else {
            return false;
        }
    }
    static walkImageData(imgdata, walkFun) {
        var i, iLen;
        var j, jLen;
        iLen = imgdata.width;
        jLen = imgdata.height;
        var tarPos = 0;
        var data = imgdata.data;
        for (i = 0; i < iLen; i++) {
            for (j = 0; j < jLen; j++) {
                walkFun(i, j, tarPos, data);
                tarPos += 4;
            }
        }
    }
    static renderSpritesToCanvas(canvas, sprites, offx = 0, offy = 0, startIndex = 0) {
        var i, len;
        len = sprites.length;
        for (i = startIndex; i < len; i++) {
            CanvasTools.renderSpriteToCanvas(sprites[i], canvas, offx, offy);
        }
    }
    static clearCanvas(canvas) {
        var preWidth;
        var preHeight;
        preWidth = canvas.width;
        preHeight = canvas.height;
        canvas.size(preWidth + 1, preHeight);
        canvas.size(preWidth, preHeight);
    }
    static getImagePixels(x, y, width, data, colorLen = 4) {
        var pos;
        pos = (x * width + y) * colorLen;
        var i, len;
        var rst;
        rst = [];
        len = colorLen;
        for (i = 0; i < len; i++) {
            rst.push(data[pos + i]);
        }
        return rst;
    }
}
