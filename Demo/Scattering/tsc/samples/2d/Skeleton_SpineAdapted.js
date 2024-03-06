import { SpineSkeleton } from "laya/spine/SpineSkeleton";
import { Browser } from "laya/utils/Browser";
import { Event } from "laya/events/Event";
import { Stat } from "laya/utils/Stat";
import { Laya } from "Laya";
import { Loader } from "laya/net/Loader";
export class Skeleton_SpineAdapted {
    constructor(maincls) {
        this.index = -1;
        this.Main = null;
        this.Main = maincls;
        Laya.init(Browser.width, Browser.height).then(() => {
            Laya.stage.bgColor = "#cccccc";
            Stat.show();
            Laya.loader.load("res/spine/spineboy-pma.skel", Loader.SPINE).then((templet) => {
                this.skeleton = new SpineSkeleton();
                this.skeleton.templet = templet;
                this.Main.box2D.addChild(this.skeleton);
                this.skeleton.pos(Browser.width / 2, Browser.height / 2 + 100);
                this.skeleton.scale(0.5, 0.5);
                this.skeleton.on(Event.STOPPED, this, this.play);
                this.play();
            });
        });
    }
    play() {
        if (++this.index >= this.skeleton.getAnimNum()) {
            this.index = 0;
        }
        this.skeleton.play(this.index, false, true);
    }
}
