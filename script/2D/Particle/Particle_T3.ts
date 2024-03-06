import { BaseScript } from "../../BaseScript";

import ParticleTemplate2D = Laya.ParticleTemplate2D;
import Particle2D = Laya.Particle2D;

const { regClass, property } = Laya;

@regClass()
export class Particle_T3 extends BaseScript {

    private sp: Particle2D;

    constructor() {
        super();
    }

    /**
     * 组件被激活后执行，此时所有节点和组件均已创建完毕，此方法只执行一次
     */
    onAwake(): void {

        super.base();
		
        Laya.loader.load("resources/res/particles/particleNew.part").then((template: ParticleTemplate2D) => {
            this.sp = new Particle2D();
            this.sp.template = template;
            this.sp.emitter.start();
            this.sp.play();
            this.box2D.addChild(this.sp);

            this.sp.x = this.pageWidth / 2;
            this.sp.y = this.pageHeight / 2;
        });
    }

    onDestroy(): void {
        if (this.sp) {
            this.sp.emitter.stop();
            this.sp.destroy();
        }
    }
}