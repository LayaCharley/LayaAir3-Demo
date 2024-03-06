import { BaseScript } from "../../BaseScript";

import Label = Laya.Label;
import Tree = Laya.Tree;
import Box = Laya.Box;
import Handler = Laya.Handler;
import Clip = Laya.Clip;

const { regClass, property } = Laya;

@regClass()
export class UI_Tree extends BaseScript {


    constructor() {
        super();
    }

    onAwake(): void {

        super.base();
		var res: any[] = ["resources/res/ui/vscroll.png",
			"resources/res/ui/vscroll$bar.png",
			"resources/res/ui/vscroll$down.png",
			"resources/res/ui/vscroll$up.png",
			"resources/res/ui/tree/clip_selectBox.png",
			"resources/res/ui/tree/clip_tree_folder.png",
			"resources/res/ui/tree/clip_tree_arrow.png"];

		Laya.loader.load(res).then( ()=>{
            this.onLoadComplete();
        } );
	}

	private onLoadComplete(e: any = null): void {
		// 组装tree的数据
		var treeData:string = "<data>";
		for (var i: number = 0; i < 5; ++i) {
			treeData += "<item label='Directory " + (i + 1) + "' isOpen='true'>";
			for (var j: number = 0; j < 5; ++j) {
				treeData += "<leaf label='File " + (j + 1) + "'/>";
			}
			treeData += "</item>";
		}
		treeData += "</data>";
		// 解析tree的数据
		var xml: Laya.XML = new Laya.XML(treeData);

		var tree: Tree = new Tree();
		tree.scrollBarSkin = "resources/res/ui/vscroll.png";
		tree.itemRender = Item;
		tree.xml = xml;
		tree.size(300, 300);
		tree.x = (this.pageWidth - tree.width) / 2;
		tree.y = (this.pageHeight - tree.height) / 2;
		this.box2D.addChild(tree);
	}
}



// 此类对应的json对象：
// {"child": [{"type": "Clip", "props": {"x": "13", "y": "0", "left": "12", "height": "24", "name": "selectBox", "skin": "ui/clip_selectBox.png", "right": "0", "clipY": "2"}}, {"type": "Clip", "props": {"y": "4", "x": "14", "name": "folder", "clipX": "1", "skin": "ui/clip_tree_folder.png", "clipY": "3"}}, {"type": "Label", "props": {"y": "1", "text": "treeItem", "width": "150", "left": "33", "height": "22", "name": "label", "color": "#ffff00", "right": "0", "x": "33"}}, {"type": "Clip", "props": {"x": "0", "name": "arrow", "y": "5", "skin": "ui/clip_tree_arrow.png", "clipY": "2"}}], "type": "Box", "props": {"name": "render", "right": "0", "left": "0"}};
class Item extends Box {
	constructor() {
		super();
		this.right = 0;
		this.left = 0;

		var selectBox: Clip = new Clip("resources/res/ui/tree/clip_selectBox.png", 1, 2);
		selectBox.name = "selectBox";//设置 selectBox 的name 为“selectBox”时，将被识别为树结构的项的背景。2帧：悬停时背景、选中时背景。	
		selectBox.height = 32;
		selectBox.x = 13;
		selectBox.left = 12;
		this.addChild(selectBox);

		var folder: Clip = new Clip("resources/res/ui/tree/clip_tree_folder.png", 1, 3);
		folder.name = "folder";//设置 folder 的name 为“folder”时，将被识别为树结构的文件夹开启状态图表。2帧：折叠状态、打开状态。
		folder.x = 14;
		folder.y = 4;
		this.addChild(folder);

		var label: Label = new Label("treeItem");
		label.name = "label";//设置 label 的name 为“label”时，此值将用于树结构数据赋值。
		label.fontSize = 20;
		label.color = "#FFFFFF";
		label.padding = "6,0,0,13";
		label.width = 150;
		label.height = 30;
		label.x = 33;
		label.y = 1;
		label.left = 33;
		label.right = 0;
		this.addChild(label);

		var arrow: Clip = new Clip("resources/res/ui/tree/clip_tree_arrow.png", 1, 2);
		arrow.name = "arrow";//设置 arrow 的name 为“arrow”时，将被识别为树结构的文件夹开启状态图表。2帧：折叠状态、打开状态。
		arrow.x = 0;
		arrow.y = 5;
		this.addChild(arrow);
	}
}
