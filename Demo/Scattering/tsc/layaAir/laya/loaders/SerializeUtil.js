import { ILaya } from "../../ILaya";
import { Loader } from "../net/Loader";
import { URL } from "../net/URL";
import { ClassUtils } from "../utils/ClassUtils";
export const TypedArrayClasses = {
    "Int8Array": Int8Array,
    "Uint8Array": Uint8Array,
    "Int16Array": Int16Array,
    "Uint16Array": Uint16Array,
    "Int32Array": Int32Array,
    "Uint32Array": Uint32Array,
    "Float32Array": Float32Array,
    "Float64Array": Float64Array
};
var _errors;
var _getNodeByRef;
var _getNodeData;
export class SerializeUtil {
    static decodeObj(data, obj, options) {
        if (options) {
            _errors = options.outErrors;
            _getNodeByRef = options.getNodeByRef;
            _getNodeData = options.getNodeData;
        }
        else {
            _errors = null;
            _getNodeByRef = null;
            _getNodeData = null;
        }
        SerializeUtil.isDeserializing = true;
        try {
            return SerializeUtil._decodeObj(data, obj);
        }
        finally {
            SerializeUtil.isDeserializing = false;
        }
    }
    static _decodeObj(data, obj) {
        if (data == null)
            return null;
        else if (Array.isArray(data)) {
            let arr = [];
            for (let i = 0; i < data.length; i++) {
                let v = data[i];
                if (v != null) {
                    try {
                        arr[i] = SerializeUtil._decodeObj(v);
                    }
                    catch (error) {
                        if (_errors)
                            _errors.push(error);
                        arr[i] = null;
                    }
                }
                else
                    arr[i] = null;
            }
            return arr;
        }
        else if (typeof (data) === "object") {
            if (data._$uuid != null) {
                let url = URL.getResURLByUUID(data._$uuid);
                return ILaya.loader.getRes(url, SerializeUtil.getLoadTypeByEngineType(data._$type));
            }
            if (data._$ref != null) {
                let node = _getNodeByRef === null || _getNodeByRef === void 0 ? void 0 : _getNodeByRef(data._$ref);
                if (node && data._$type) {
                    let cls = ClassUtils.getClass(data._$type);
                    if (cls)
                        return node.getComponent(cls);
                    else
                        return null;
                }
                else
                    return node;
            }
            let type = data._$type;
            if (type === "any") {
                if (data._$type)
                    return data.value;
                else
                    return data;
            }
            let typedArray = TypedArrayClasses[type];
            if (typedArray != null) {
                if (data._$type)
                    return new typedArray(data.value);
                else
                    return new typedArray(data);
            }
            if (!obj) {
                let cls = ClassUtils.getClass(type);
                if (!cls) {
                    return null;
                }
                obj = new cls();
            }
            for (let key in data) {
                if (key.startsWith("_$"))
                    continue;
                let v = data[key];
                if (v == null || typeof (v) !== "object" || Array.isArray(v)
                    || v._$type || v._$uuid || v._$ref) {
                    try {
                        let v2 = SerializeUtil._decodeObj(v);
                        obj[key] = v2;
                        if (v2 != null && v != null && v._$tmpl)
                            obj[v._$tmpl] = _getNodeData(v2);
                    }
                    catch (error) {
                        if (_errors)
                            _errors.push(error);
                    }
                }
                else {
                    let childObj = obj[key];
                    if (childObj) {
                        try {
                            SerializeUtil._decodeObj(v, childObj);
                        }
                        catch (error) {
                            if (_errors)
                                _errors.push(error);
                        }
                    }
                }
            }
            if (obj.onAfterDeserialize)
                obj.onAfterDeserialize();
            return obj;
        }
        else
            return data;
    }
    static getLoadTypeByEngineType(type) {
        switch (type) {
            case "Texture2D":
            case "RenderTexture":
                return Loader.TEXTURE2D;
            case "TextureCube":
                return Loader.TEXTURECUBE;
            case "Prefab":
                return Loader.HIERARCHY;
            default:
                return null;
        }
    }
    static bakeOverrideData(overrideData) {
        let dataMap = null;
        for (let n = overrideData.length, i = n - 1; i >= 0; i--) {
            let arr = overrideData[i];
            if (arr && arr.length > 0) {
                for (let d of arr) {
                    let od = d._$override || d._$parent;
                    let k;
                    if (Array.isArray(od))
                        k = od[n - i - 1];
                    else if (i == n - 1)
                        k = od;
                    if (k != null) {
                        if (!dataMap)
                            dataMap = {};
                        let arr2 = dataMap[k];
                        if (!arr2)
                            dataMap[k] = arr2 = [];
                        arr2.push(n - i, d);
                    }
                }
            }
        }
        return dataMap;
    }
    static applyOverrideData(nodeData, overrideDataMap) {
        function test(obj) {
            if (overrideDataMap[obj._$id])
                return true;
            let children = obj._$child;
            if (children && children.find(child => test(child)))
                return true;
            return false;
        }
        function cloneTree(obj) {
            let ret = Object.assign({}, obj);
            let children = ret._$child;
            if (children)
                ret._$child = children.map(c => cloneTree(c));
            let comps = ret._$comp;
            if (comps)
                ret._$comp = comps.map(c => Object.assign({}, c));
            return ret;
        }
        function visit(data) {
            let children = data._$child;
            if (children) {
                for (let child of children) {
                    if (child._$id)
                        visit(child);
                }
            }
            let od = overrideDataMap[data._$id];
            if (od) {
                for (let i = 0; i < od.length; i += 2) {
                    let j = od[i];
                    let e = od[i + 1];
                    let idPath;
                    if (idPath = e._$override) {
                        let toWrite;
                        if (Array.isArray(idPath)) {
                            if (j == idPath.length - 1) {
                                let k = idPath[j];
                                if (!children)
                                    data._$child = children = [];
                                else
                                    toWrite = children.find(c => c._$override == k);
                                if (!toWrite) {
                                    toWrite = { _$override: k };
                                    children.push(toWrite);
                                }
                            }
                            else if (j < idPath.length - 1) {
                                let k = idPath.slice(j);
                                if (!children)
                                    data._$child = children = [];
                                else {
                                    toWrite = children.find(c => {
                                        let o = c._$override;
                                        return Array.isArray(o) && arrayEquals(o, k);
                                    });
                                }
                                if (!toWrite) {
                                    toWrite = { _$override: k };
                                    children.push(toWrite);
                                }
                            }
                            else
                                toWrite = data;
                        }
                        else
                            toWrite = data;
                        mergeData(toWrite, e);
                        if (e._$comp) {
                            let comps = toWrite._$comp;
                            if (!comps)
                                toWrite._$comp = comps = [];
                            for (let comp of e._$comp) {
                                let compType = comp._$type || comp._$override;
                                let c = comps.find(c => c._$override == compType || c._$type == compType);
                                if (!c) {
                                    c = {};
                                    if (comp._$type)
                                        c._$type = compType;
                                    else
                                        c._$override = compType;
                                    comps.push(c);
                                }
                                mergeData(c, comp);
                            }
                        }
                    }
                    else if (idPath = e._$parent) {
                        if (!children)
                            data._$child = children = [];
                        let k;
                        if (j < idPath.length) {
                            if (j == idPath.length - 1)
                                k = idPath[j];
                            else
                                k = idPath.slice(j);
                            let toWrite = Object.assign({}, e);
                            toWrite._$parent = k;
                            children.push(toWrite);
                        }
                        else {
                            let toWrite = Object.assign({}, e);
                            delete toWrite._$parent;
                            if (data._$prefab) {
                                children.push(toWrite);
                            }
                            else {
                                delete toWrite._$index;
                                if (e._$index < children.length)
                                    children.splice(e._$index, 0, toWrite);
                                else
                                    children.push(toWrite);
                            }
                        }
                    }
                }
            }
        }
        if (test(nodeData)) {
            nodeData = cloneTree(nodeData);
            visit(nodeData);
        }
        return nodeData;
    }
}
SerializeUtil.isDeserializing = false;
function mergeData(target, overrided) {
    for (let k in overrided) {
        if (k.startsWith("_$"))
            continue;
        let v = overrided[k];
        if (v != null && typeof (v) === "object" && !Array.isArray(v) && !(v._$type || v._$uuid || v._$ref)) {
            let v2 = target[k];
            if (v2 != null && typeof (v2) === "object") {
                target[k] = v2 = Object.assign({}, v2);
                mergeData(v2, v);
            }
            else
                target[k] = v;
        }
        else
            target[k] = v;
    }
}
function arrayEquals(a, b) {
    if (a.length === b.length) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    }
    else {
        return false;
    }
}

//# sourceMappingURL=SerializeUtil.js.map
