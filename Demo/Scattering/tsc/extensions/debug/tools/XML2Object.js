export class XML2Object {
    static parse(node, isFirst = true) {
        var obj = {};
        if (isFirst)
            obj.Name = node.localName;
        var numOfChilds = node.children.length;
        var childs = [];
        var children = {};
        obj.c = children;
        obj.cList = childs;
        for (var i = 0; i < numOfChilds; i++) {
            var childNode = node.children[i];
            var childNodeName = childNode.localName;
            var value;
            var numOfAttributes;
            value = XML2Object.parse(childNode, true);
            childs.push(value);
            if (children[childNodeName]) {
                if (XML2Object.getTypeof(children[childNodeName]) == "array") {
                    children[childNodeName].push(value);
                }
                else {
                    children[childNodeName] = [children[childNodeName], value];
                }
            }
            else if (XML2Object.isArray(childNodeName)) {
                children[childNodeName] = [value];
            }
            else {
                children[childNodeName] = value;
            }
        }
        numOfAttributes = 0;
        if (node.attributes) {
            numOfAttributes = node.attributes.length;
            var prop = {};
            obj.p = prop;
            for (i = 0; i < numOfAttributes; i++) {
                prop[node.attributes[i].name.toString()] = String(node.attributes[i].nodeValue);
            }
        }
        if (numOfChilds == 0) {
            if (numOfAttributes == 0) {
                obj = "";
            }
            else {
            }
        }
        return obj;
    }
    static getArr(v) {
        if (!v)
            return [];
        if (XML2Object.getTypeof(v) == "array")
            return v;
        return [v];
    }
    static get arrays() {
        if (!XML2Object._arrays) {
            XML2Object._arrays = [];
        }
        return XML2Object._arrays;
    }
    static set arrays(a) {
        XML2Object._arrays = a;
    }
    static isArray(nodeName) {
        var numOfArrays = XML2Object._arrays ? XML2Object._arrays.length : 0;
        for (var i = 0; i < numOfArrays; i++) {
            if (nodeName == XML2Object._arrays[i]) {
                return true;
            }
        }
        return false;
    }
    static getTypeof(o) {
        if (typeof (o) == "object") {
            if (o.length == null) {
                return "object";
            }
            else if (typeof (o.length) == "number") {
                return "array";
            }
            else {
                return "object";
            }
        }
        else {
            return typeof (o);
        }
    }
}
