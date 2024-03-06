import { Script } from "laya/components/Script";
import { Stat } from "laya/utils/Stat";
/**
 * ...
 * @author ...
 */
export class ScriptB extends Script {
    constructor() {
        super();
    }
    onAwake() {
        console.log(Stat.loopCount, "onAwake ScriptB");
    }
    onStart() {
        console.log(Stat.loopCount, "onStart ScriptB");
    }
    onEnable() {
        console.log(Stat.loopCount, "onEnable ScriptB");
    }
    onDisable() {
        this.spriteC.active = true;
        console.log(Stat.loopCount, "onDisable ScriptB");
    }
    onDestroy() {
        console.log(Stat.loopCount, "onDestroy ScriptB");
    }
}
