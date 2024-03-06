import { ILaya } from "../../ILaya";
import { Point } from "../maths/Point";
import { Rectangle } from "../maths/Rectangle";
export class SpriteUtils {
    static getGlobalRecByPoints(sprite, x0, y0, x1, y1) {
        var newLTPoint;
        newLTPoint = Point.create().setTo(x0, y0);
        newLTPoint = sprite.localToGlobal(newLTPoint);
        var newRBPoint;
        newRBPoint = Point.create().setTo(x1, y1);
        newRBPoint = sprite.localToGlobal(newRBPoint);
        var rst = Rectangle._getWrapRec([newLTPoint.x, newLTPoint.y, newRBPoint.x, newRBPoint.y]);
        newLTPoint.recover();
        newRBPoint.recover();
        return rst;
    }
    static getGlobalPosAndScale(sprite) {
        return SpriteUtils.getGlobalRecByPoints(sprite, 0, 0, 1, 1);
    }
    static getTransformRelativeToWindow(coordinateSpace, x, y) {
        var stage = ILaya.stage;
        var globalTransform = SpriteUtils.getGlobalPosAndScale(coordinateSpace);
        var canvasMatrix = stage._canvasTransform.clone();
        var canvasLeft = canvasMatrix.tx;
        var canvasTop = canvasMatrix.ty;
        canvasMatrix.rotate(-Math.PI / 180 * stage.canvasDegree);
        canvasMatrix.scale(stage.clientScaleX, stage.clientScaleY);
        var perpendicular = (stage.canvasDegree % 180 != 0);
        var tx, ty;
        if (perpendicular) {
            tx = y + globalTransform.y;
            ty = x + globalTransform.x;
            tx *= canvasMatrix.d;
            ty *= canvasMatrix.a;
            if (stage.canvasDegree == 90) {
                tx = canvasLeft - tx;
                ty += canvasTop;
            }
            else {
                tx += canvasLeft;
                ty = canvasTop - ty;
            }
        }
        else {
            tx = x + globalTransform.x;
            ty = y + globalTransform.y;
            tx *= canvasMatrix.a;
            ty *= canvasMatrix.d;
            tx += canvasLeft;
            ty += canvasTop;
        }
        ty += stage['_safariOffsetY'];
        var domScaleX, domScaleY;
        if (perpendicular) {
            domScaleX = canvasMatrix.d * globalTransform.height;
            domScaleY = canvasMatrix.a * globalTransform.width;
        }
        else {
            domScaleX = canvasMatrix.a * globalTransform.width;
            domScaleY = canvasMatrix.d * globalTransform.height;
        }
        return { x: tx, y: ty, scaleX: domScaleX, scaleY: domScaleY };
    }
    static fitDOMElementInArea(dom, coordinateSpace, x, y, width, height) {
        if (!dom._fitLayaAirInitialized) {
            dom._fitLayaAirInitialized = true;
            dom.style.transformOrigin = dom.style.webKittransformOrigin = "left top";
            dom.style.position = "absolute";
        }
        var transform = SpriteUtils.getTransformRelativeToWindow(coordinateSpace, x, y);
        dom.style.transform = dom.style.webkitTransform = "scale(" + transform.scaleX + "," + transform.scaleY + ") rotate(" + (ILaya.stage.canvasDegree) + "deg)";
        dom.style.width = width + 'px';
        dom.style.height = height + 'px';
        dom.style.left = transform.x + 'px';
        dom.style.top = transform.y + 'px';
    }
    static updateOrder(array) {
        if (!array || array.length < 2)
            return false;
        var i = 1, j, len = array.length, key, c;
        while (i < len) {
            j = i;
            c = array[j];
            key = array[j]._zOrder;
            while (--j > -1) {
                if (array[j]._zOrder > key)
                    array[j + 1] = array[j];
                else
                    break;
            }
            array[j + 1] = c;
            i++;
        }
        return true;
    }
}

//# sourceMappingURL=SpriteUtils.js.map
