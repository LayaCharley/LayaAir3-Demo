var _gid = 1;
const _pi = 180 / Math.PI;
const _pi2 = Math.PI / 180;
export class Utils {
    static toRadian(angle) {
        return angle * _pi2;
    }
    static toAngle(radian) {
        return radian * _pi;
    }
    static toHexColor(color) {
        if (color < 0 || isNaN(color))
            return null;
        var str = color.toString(16);
        while (str.length < 6)
            str = "0" + str;
        return "#" + str;
    }
    static fromStringColor(value) {
        if (!value)
            return 0;
        if (value.indexOf("rgba(") >= 0 || value.indexOf("rgb(") >= 0) {
            let p1 = value.indexOf("(");
            let p2 = value.indexOf(")");
            if (p1 == -1 || p2 == -1)
                return 0;
            value = value.substring(p1 + 1, p2);
            let arr = value.split(",");
            let len = arr.length;
            for (let i = 0; i < len; i++) {
                arr[i] = parseFloat(arr[i]);
                if (isNaN(arr[i]))
                    arr[i] = 0;
            }
            if (arr.length == 4)
                return (arr[0] << 24) + (arr[1] << 16) + (arr[2] << 8) + Math.round(arr[3] * 255);
            else
                return (arr[0] << 16) + (arr[1] << 8) + arr[2];
        }
        else {
            value.charAt(0) === '#' && (value = value.substring(1));
            let len = value.length;
            if (len === 3 || len === 4) {
                let temp = "";
                for (let i = 0; i < len; i++) {
                    temp += (value[i] + value[i]);
                }
                value = temp;
            }
            return parseInt(value, 16);
        }
    }
    static getGID() {
        return _gid++;
    }
    static copyArray(source, array) {
        source || (source = []);
        if (!array)
            return source;
        source.length = array.length;
        var len = array.length;
        for (let i = 0; i < len; i++) {
            source[i] = array[i];
        }
        return source;
    }
    static transPointList(points, x, y) {
        var i, len = points.length;
        for (i = 0; i < len; i += 2) {
            points[i] += x;
            points[i + 1] += y;
        }
    }
    static parseInt(str, radix = 0) {
        var result = parseInt(str, radix);
        if (isNaN(result))
            return 0;
        return result;
    }
    static getBaseName(path) {
        let i = path.lastIndexOf("/");
        if (i != -1)
            path = path.substring(i + 1);
        i = path.indexOf("?");
        if (i != -1)
            path = path.substring(0, i);
        return path;
    }
    static getFileExtension(path) {
        let i = path.lastIndexOf(".");
        if (i != -1) {
            let ext = path.substring(i + 1).toLowerCase();
            let j = ext.indexOf("?");
            if (j != -1)
                ext = ext.substring(0, j);
            if (ext === "ls") {
                let k = path.lastIndexOf(".", i - 1);
                if (k != -1) {
                    let ext2 = path.substring(k + 1, i + 1) + ext;
                    if (ext2 === "lanit.ls" || ext2 === "ltcb.ls")
                        return ext2;
                }
            }
            return ext;
        }
        else
            return "";
    }
    static replaceFileExtension(path, newExt, excludeDot) {
        if (!path)
            return path;
        let i = path.lastIndexOf(".");
        if (newExt.length > 0 && !excludeDot)
            newExt = "." + newExt;
        if (i != -1) {
            let j = path.indexOf("?", i);
            if (j != -1)
                return path.substring(0, i) + newExt + path.substring(j);
            else
                return path.substring(0, i) + newExt;
        }
        else
            return path + newExt;
    }
}

//# sourceMappingURL=Utils.js.map
