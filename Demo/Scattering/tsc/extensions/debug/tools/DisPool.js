import { ClassTool } from "./ClassTool";
export class DisPool {
    constructor() {
    }
    static getDis(clz) {
        var clzName;
        clzName = ClassTool.getClassNameByClz(clz);
        if (!DisPool._objDic[clzName]) {
            DisPool._objDic[clzName] = [];
        }
        var disList;
        disList = DisPool._objDic[clzName];
        var i, len;
        len = disList.length;
        for (i = 0; i < len; i++) {
            if (!disList[i].parent) {
                return disList[i];
            }
        }
        disList.push(new clz());
        return disList[disList.length - 1];
    }
}
DisPool._objDic = {};
