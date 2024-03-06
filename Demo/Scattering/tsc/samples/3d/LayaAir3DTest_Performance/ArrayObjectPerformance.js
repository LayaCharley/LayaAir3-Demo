import { Laya } from "Laya";
import { Stage } from "laya/display/Stage";
import { Event } from "laya/events/Event";
import { Browser } from "laya/utils/Browser";
import { Stat } from "laya/utils/Stat";
/**
 * ...
 * @author ...
 */
export class ArrayObjectPerformance {
    constructor() {
        this.c = 3;
        this.count = 3000000;
        this.offset = Math.floor(50); //2147483647+1和2147483647+0差5倍
        this.array = new Array(this.count);
        this.object = {};
        this.defineObject = {};
        Laya.init(0, 0).then(() => {
            Laya.stage.scaleMode = Stage.SCALE_FULL;
            Laya.stage.screenMode = Stage.SCREEN_NONE;
            Stat.show();
            // for (var i: number = 0; i < this.count; i++) {
            // 	this.array[this.offset + i * this.c] = this.count - i;
            // }
            // for (var i: number = 0; i < this.count; i++) {
            // 	this.object[this.offset + i * this.c] = this.count - i;
            // }
            Laya.stage.on(Event.MOUSE_DOWN, this, function () {
                var f = 0;
                var t = Browser.now();
                // for (var i: number = 0; i < this.count; i++) {
                // 	f += this.offset + i * this.c;
                // }
                // console.log("ArrayKey", Browser.now() - t);
                // f = 0;
                // t = Browser.now();
                // for (var i: number = 0; i < this.count; i++) {
                // 	f += this.offset + i * this.c;
                // }
                // console.log("ObjectKey", Browser.now() - t);
                // f = 0;
                // t = Browser.now();
                // for (var i: number; i < this.count; i++) {
                // 	f += this.array[this.offset + i * this.c];
                // }
                // console.log("Array", Browser.now() - t);
                // f = 0;
                // t = Browser.now();
                // for (var i: number = 0; i < this.count; i++) {
                // 	f += this.object[this.offset + i * this.c];
                // }
                // console.log("Object", Browser.now() - t);
                t = Browser.now();
                for (var i = 0; i < 32; i++) {
                    this.defineObject[1 << i] = 1 << i;
                }
                console.log("DefineKeyObject", Browser.now() - t);
                t = Browser.now();
                f = 0;
                for (var i = 0; i < this.count; i++) {
                    for (var j = 0; j < 32; j++)
                        f = this.defineObject[1 << j];
                }
                console.log("DefineObject", Browser.now() - t);
            });
        });
    }
}
