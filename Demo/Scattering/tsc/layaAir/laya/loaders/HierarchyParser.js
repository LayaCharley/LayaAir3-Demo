import { Scene } from "../display/Scene";
import { Sprite } from "../display/Sprite";
import { Loader } from "../net/Loader";
import { URL } from "../net/URL";
import { ClassUtils } from "../utils/ClassUtils";
import { SerializeUtil } from "./SerializeUtil";
const errorList = [];
export class HierarchyParser {
    static parse(data, options, errors) {
        errors = errors || errorList;
        let nodeMap = {};
        let dataList = [];
        let allNodes = [];
        let outNodes = [];
        let scene;
        let inPrefab;
        let prefabNodeDict;
        let skinBaseUrl;
        let overrideData;
        if (options) {
            inPrefab = options.inPrefab;
            if (inPrefab)
                prefabNodeDict = options.prefabNodeDict;
            skinBaseUrl = options.skinBaseUrl;
            overrideData = options.overrideData;
        }
        function createChildren(data, prefab) {
            for (let child of data._$child) {
                if (child._$child) {
                    let node = createNode(child, prefab);
                    createChildren(child, child._$prefab ? node : prefab);
                    dataList.push(child);
                    allNodes.push(node);
                }
                else {
                    let node = createNode(child, prefab);
                    dataList.push(child);
                    allNodes.push(node);
                }
            }
        }
        function createNode(nodeData, prefab, runtime) {
            let node;
            let pstr;
            if (pstr = nodeData._$override) {
                if (prefab && prefabNodeDict) {
                    if (Array.isArray(pstr)) {
                        node = prefab;
                        for (let i = 0, n = pstr.length; i < n; i++) {
                            let map = prefabNodeDict.get(node);
                            node = map === null || map === void 0 ? void 0 : map[pstr[i]];
                            if (!node)
                                break;
                        }
                    }
                    else {
                        let map = prefabNodeDict.get(prefab);
                        if (map)
                            node = map[nodeData._$override];
                    }
                }
            }
            else {
                if (pstr = nodeData._$prefab) {
                    let res = Loader.getRes(URL.getResURLByUUID(pstr), Loader.HIERARCHY);
                    if (res) {
                        if (!prefabNodeDict)
                            prefabNodeDict = new Map();
                        let overrideData2 = [];
                        let testId = nodeData._$id;
                        if (overrideData) {
                            for (let i = 0, n = overrideData.length; i < n; i++) {
                                let arr = overrideData[i];
                                if (arr && arr.length > 0) {
                                    overrideData2[i] = arr.filter(d => {
                                        let od = d._$override || d._$parent;
                                        return Array.isArray(od) && od.length > n - i && od[n - i - 1] == testId;
                                    });
                                }
                                else
                                    overrideData2[i] = arr;
                            }
                        }
                        overrideData2.push(nodeData._$child);
                        node = res.create({ inPrefab: true, prefabNodeDict: prefabNodeDict, overrideData: overrideData2 }, errors);
                    }
                }
                else if (pstr = nodeData._$type) {
                    let cls = runtime !== null && runtime !== void 0 ? runtime : ClassUtils.getClass(pstr);
                    if (cls) {
                        try {
                            node = new cls();
                        }
                        catch (err) {
                            errors.push(err);
                        }
                    }
                    else {
                        errors.push(new Error(`unknown type '${pstr}'`));
                    }
                }
                if (node)
                    nodeMap[nodeData._$id] = node;
            }
            return node;
        }
        function getNodeByRef(idPath) {
            if (Array.isArray(idPath)) {
                let prefab = nodeMap[idPath[0]];
                if (prefab && idPath.length > 1)
                    return findNodeInPrefab(prefab, idPath, 1);
                else
                    return prefab;
            }
            else
                return nodeMap[idPath];
        }
        function findNodeInPrefab(prefab, idPath, startIndex = 0) {
            if (!idPath)
                return prefab;
            let map = prefabNodeDict === null || prefabNodeDict === void 0 ? void 0 : prefabNodeDict.get(prefab);
            if (!map)
                return null;
            if (Array.isArray(idPath)) {
                let node;
                for (let i = startIndex, n = idPath.length; i < n; i++) {
                    if (!map)
                        return null;
                    node = map[idPath[i]];
                    if (!node)
                        break;
                    map = prefabNodeDict.get(node);
                }
                return node;
            }
            else
                return map[idPath];
        }
        let bakedOverrideData;
        function getNodeData(node) {
            node.visible = false;
            let i = allNodes.indexOf(node);
            let nodeData = dataList[i];
            if (!overrideData)
                return nodeData;
            if (bakedOverrideData === undefined)
                bakedOverrideData = SerializeUtil.bakeOverrideData(overrideData);
            if (bakedOverrideData)
                return SerializeUtil.applyOverrideData(nodeData, bakedOverrideData);
            else
                return nodeData;
        }
        let runtime;
        if (data._$type || data._$prefab) {
            if (runtime = data._$runtime) {
                if (runtime.startsWith("res://"))
                    runtime = runtime.substring(6);
                let cls = ClassUtils.getClass(runtime);
                if (cls)
                    runtime = cls;
                else
                    errors.push(new Error(`unknown runtime '${runtime}'`));
            }
            let node = createNode(data, null, runtime);
            if (node) {
                if (data._$child)
                    createChildren(data, data._$prefab ? node : null);
                dataList.push(data);
                allNodes.push(node);
                if (node instanceof Scene)
                    scene = node;
            }
        }
        else {
            if (data._$child)
                createChildren(data, null);
        }
        let cnt = dataList.length;
        let k = 0;
        for (let i = 0; i < cnt; i++) {
            let nodeData = dataList[i];
            let node = allNodes[i];
            let children = nodeData._$child;
            if (children) {
                let num = children.length;
                if (node) {
                    if (nodeData._$prefab) {
                        for (let j = 0; j < num; j++) {
                            let m = k - num + j;
                            let n = outNodes[m];
                            if (n && !n.parent) {
                                let nodeData2 = dataList[i - num + j];
                                let parentNode = findNodeInPrefab(node, nodeData2._$parent);
                                if (parentNode) {
                                    let pos = nodeData2._$index;
                                    if (pos != null && pos < parentNode.numChildren)
                                        parentNode.addChildAt(n, pos);
                                    else
                                        parentNode.addChild(n);
                                }
                                else {
                                    node.addChildAt(n, 0);
                                }
                            }
                        }
                    }
                    else {
                        for (let j = 0; j < num; j++) {
                            let n = outNodes[k - num + j];
                            if (n) {
                                if (node === scene && n._is3D)
                                    scene._scene3D = n;
                                else
                                    node.addChild(n);
                            }
                        }
                    }
                }
                k -= num;
            }
            outNodes[k] = node;
            k++;
        }
        outNodes.length = k;
        outNodes = outNodes.filter(n => n != null);
        let topNode = outNodes[0];
        let compInitList = [];
        for (let i = 0; i < cnt; i++) {
            let components = dataList[i]._$comp;
            if (!components)
                continue;
            let node = allNodes[i];
            if (!node)
                continue;
            for (let compData of components) {
                let comp;
                if (compData._$override) {
                    let cls = ClassUtils.getClass(compData._$override);
                    if (cls)
                        comp = node.getComponent(cls);
                }
                else {
                    let cls = ClassUtils.getClass(compData._$type);
                    if (cls) {
                        comp = node.getComponent(cls);
                        if (!comp) {
                            try {
                                comp = node.addComponent(cls);
                            }
                            catch (err) {
                                errors.push(err);
                            }
                        }
                    }
                }
                if (comp)
                    compInitList.push(compData, comp);
            }
        }
        const decodeOptions = { outErrors: errors, getNodeByRef, getNodeData };
        for (let i = 0; i < cnt; i++) {
            let nodeData = dataList[i];
            let node = allNodes[i];
            if (node) {
                if (skinBaseUrl != null && (node instanceof Sprite))
                    node._skinBaseUrl = skinBaseUrl;
                SerializeUtil.decodeObj(nodeData, node, decodeOptions);
                if (runtime && nodeData._$var && node.name) {
                    try {
                        topNode[node.name] = node;
                    }
                    catch (err) {
                        errors.push(err);
                    }
                }
            }
        }
        cnt = compInitList.length;
        for (let i = 0; i < cnt; i += 2) {
            SerializeUtil.decodeObj(compInitList[i], compInitList[i + 1], decodeOptions);
        }
        if (inPrefab && prefabNodeDict && topNode)
            prefabNodeDict.set(topNode, nodeMap);
        if (errors == errorList)
            errorList.length = 0;
        return outNodes;
    }
    static collectResourceLinks(data, basePath) {
        let test = {};
        let innerUrls = [];
        function addInnerUrl(url, type) {
            if (!url)
                return "";
            let entry = test[url];
            if (entry === undefined) {
                let url2;
                if (url.length >= 36 && url.charCodeAt(8) === 45 && url.charCodeAt(13) === 45)
                    url2 = "res://" + url;
                else
                    url2 = URL.join(basePath, url);
                innerUrls.push({ url: url2, type: type });
                test[url] = entry = [url2, type];
            }
            else if (entry.indexOf(type, 1) == -1) {
                entry.push(type);
                innerUrls.push({ url: entry[0], type: type });
            }
            return entry[0];
        }
        function check(data) {
            for (let key in data) {
                let child = data[key];
                if (child == null)
                    continue;
                if (Array.isArray(child)) {
                    for (let item of child) {
                        if (item == null)
                            continue;
                        if (typeof (item) === "object") {
                            if (item._$uuid != null)
                                item._$uuid = addInnerUrl(item._$uuid, SerializeUtil.getLoadTypeByEngineType(item._$type));
                            else if (item._$prefab != null) {
                                item._$prefab = addInnerUrl(item._$prefab, Loader.HIERARCHY);
                                check(item);
                            }
                            else
                                check(item);
                        }
                    }
                }
                else if (typeof (child) === "object") {
                    if (child._$uuid != null)
                        child._$uuid = addInnerUrl(child._$uuid, SerializeUtil.getLoadTypeByEngineType(child._$type));
                    else if (child._$prefab != null) {
                        child._$prefab = addInnerUrl(child._$prefab, Loader.HIERARCHY);
                        check(child);
                    }
                    else
                        check(child);
                }
            }
        }
        check(data);
        if (data._$preloads) {
            for (let url of data._$preloads)
                innerUrls.push(url);
        }
        return innerUrls;
    }
}

//# sourceMappingURL=HierarchyParser.js.map