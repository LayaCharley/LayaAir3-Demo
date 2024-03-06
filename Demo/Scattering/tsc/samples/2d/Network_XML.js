import { XML } from "laya/html/XML";
export class Network_XML {
    constructor() {
        this.setup();
    }
    setup() {
        var xmlValueContainsError = "<root><item>item a</item><item>item b</item>somethis...</root1>";
        var xmlValue = "<root><item>item a</item><item>item b</item>somethings...</root>";
        this.proessXML(xmlValueContainsError);
        console.log("\n");
        this.proessXML(xmlValue);
    }
    // 使用xml
    proessXML(source) {
        try {
            var xml = new XML(source);
        }
        catch (e) {
            console.log(e.massage);
            return;
        }
        this.printDirectChildren(xml);
    }
    // 打印直接子级
    printDirectChildren(xml) {
        var nodes = xml.elements();
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            console.log("节点名称: " + node.name);
            console.log("\n");
        }
    }
}
