import { Script } from "laya/components/Script";
import { Stat } from "laya/utils/Stat";
/**
 * ...
 * @author ...
 */
export class ScriptC extends Script {
    constructor() {
        super();
    }
    onEnable() {
        console.log(Stat.loopCount, "onEnable ScriptC");
    }
    onDisable() {
        console.log(Stat.loopCount, "onDisable ScriptC");
    }
    onDestroy() {
        console.log(Stat.loopCount, "onDestroy ScriptC");
    }
}
