import { Rectangle } from "laya/maths/Rectangle";
export class UVTools {
    constructor() {
    }
    static getUVByRec(x, y, width, height) {
        return [x, y, x + width, y, x + width, y + height, x, y + height];
    }
    static getRecFromUV(uv) {
        var rst;
        rst = new Rectangle(uv[0], uv[1], uv[2] - uv[0], uv[5] - uv[1]);
        return rst;
    }
    static isUVRight(uv) {
        if (uv[0] != uv[6])
            return false;
        if (uv[1] != uv[3])
            return false;
        if (uv[2] != uv[4])
            return false;
        if (uv[5] != uv[7])
            return false;
        return true;
    }
    static getTextureRec(texture) {
        var rst;
        rst = UVTools.getRecFromUV((texture.uv));
        rst.x *= texture.bitmap.width;
        rst.y *= texture.bitmap.height;
        rst.width *= texture.bitmap.width;
        rst.height *= texture.bitmap.height;
        return rst;
    }
}
