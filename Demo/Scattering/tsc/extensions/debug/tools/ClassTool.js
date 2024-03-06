import { ObjectTools } from "./ObjectTools";
export class ClassTool {
    constructor() {
    }
    static defineProperty(obj, name, des) {
        Object.defineProperty(obj, name, des);
        ;
    }
    static getOwnPropertyDescriptor(obj, name) {
        var rst;
        rst = Object.getOwnPropertyDescriptor(obj, name);
        ;
        return rst;
    }
    static getOwnPropertyDescriptors(obj) {
        var rst;
        rst = Object.getOwnPropertyDescriptors(obj);
        ;
        return rst;
    }
    static getOwnPropertyNames(obj) {
        var rst;
        rst = Object.getOwnPropertyNames(obj);
        ;
        return rst;
    }
    static getObjectGetSetKeys(obj, rst = null) {
        if (!rst)
            rst = [];
        var keys;
        keys = ClassTool.getOwnPropertyNames(obj);
        var key;
        for (key in keys) {
            key = keys[key];
            if (key.indexOf("_$get_") >= 0) {
                key = key.replace("_$get_", "");
                rst.push(key);
            }
        }
        if (obj["__proto__"]) {
            ClassTool.getObjectGetSetKeys(obj["__proto__"], rst);
        }
        return rst;
    }
    static getObjectDisplayAbleKeys(obj, rst = null) {
        if (!rst)
            rst = [];
        for (let key in obj) {
            let tValue = obj[key];
            let tType = typeof (tValue);
            if (key.charAt(0) == "_" || !this.displayTypes[tType])
                continue;
            rst.push(key);
        }
        let temp = obj;
        while (temp) {
            let descript = Object.getOwnPropertyDescriptors(temp);
            for (let element in descript) {
                let tValue = descript[element];
                if (!tValue.get)
                    continue;
                rst.push(element);
            }
            temp = Object.getPrototypeOf(temp);
        }
        ClassTool.getObjectGetSetKeys(obj, rst);
        rst = ObjectTools.getNoSameArr(rst);
        return rst;
    }
    static getClassName(tar) {
        if (tar instanceof Function)
            return tar.name;
        return tar["constructor"].name;
    }
    static getNodeClassAndName(tar) {
        if (!tar)
            return "null";
        var rst;
        if (tar.name) {
            rst = ClassTool.getClassName(tar) + "(" + tar.name + ")";
        }
        else {
            rst = ClassTool.getClassName(tar);
        }
        return rst;
    }
    static getClassNameByClz(clz) {
        return clz["name"];
    }
    static getClassByName(className) {
        var rst;
        rst = window["eval"](className);
        return rst;
    }
    static createObjByName(className) {
        var clz;
        clz = ClassTool.getClassByName(className);
        return new clz();
    }
}
ClassTool.displayTypes = { "boolean": true, "number": true, "string": true };
