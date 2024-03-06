import { Script } from "laya/components/Script";
import { Stat } from "laya/utils/Stat";
/**
 * ...
 * @author ...
 */
export class ScriptA extends Script {
    constructor() {
        super();
    }
    onEnable() {
        console.log(Stat.loopCount, "onEnable ScriptA");
    }
    onDisable() {
        console.log(Stat.loopCount, "onDisable ScriptA");
    }
    onDestroy() {
        console.log(Stat.loopCount, "onDestroy ScriptA");
    }
}
