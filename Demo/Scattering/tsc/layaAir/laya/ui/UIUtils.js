import { ColorFilter } from "../filters/ColorFilter";
import { Utils } from "../utils/Utils";
import { WeakObject } from "../utils/WeakObject";
export class UIUtils {
    static fillArray(arr, str, type = null) {
        let temp = arr.concat();
        if (str) {
            let a = str.split(",");
            for (let i = 0, n = Math.min(temp.length, a.length); i < n; i++) {
                let value = a[i];
                temp[i] = (value == "true" ? true : (value == "false" ? false : value));
                if (type != null)
                    temp[i] = type(value);
            }
        }
        return temp;
    }
    static toColor(color) {
        return Utils.toHexColor(color);
    }
    static gray(target, isGray = true) {
        let filters = target.filters || [];
        let i = filters.indexOf(UIUtils.grayFilter);
        if (isGray) {
            if (i == -1) {
                filters.push(UIUtils.grayFilter);
                target.filters = filters;
            }
        }
        else if (i != -1) {
            filters.splice(i, 1);
            target.filters = filters;
        }
    }
    static getBindFun(value) {
        if (!UIUtils._funMap) {
            UIUtils._funMap = new WeakObject();
        }
        var fun = UIUtils._funMap.get(value);
        if (fun == null) {
            var temp = "\"" + value + "\"";
            temp = temp.replace(/^"\${|}"$/g, "").replace(/\${/g, "\"+").replace(/}/g, "+\"");
            var str = "(function(data){if(data==null)return;with(data){try{\nreturn " + temp + "\n}catch(e){}}})";
            fun = window.Laya._runScript(str);
            UIUtils._funMap.set(value, fun);
        }
        return fun;
    }
}
UIUtils.grayFilter = new ColorFilter([0.3086, 0.6094, 0.082, 0, 0, 0.3086, 0.6094, 0.082, 0, 0, 0.3086, 0.6094, 0.082, 0, 0, 0, 0, 0, 1, 0]);
UIUtils._funMap = null;

//# sourceMappingURL=UIUtils.js.map
