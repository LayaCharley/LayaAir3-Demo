import { RotationInfo } from "./RotationInfo";
import { Event } from "../../events/Event";
import { EventDispatcher } from "../../events/EventDispatcher";
import { ILaya } from "../../../ILaya";
export class Gyroscope extends EventDispatcher {
    constructor(singleton) {
        super();
        this.onDeviceOrientationChange = this.onDeviceOrientationChange.bind(this);
    }
    static get instance() {
        Gyroscope._instance = Gyroscope._instance || new Gyroscope(0);
        return Gyroscope._instance;
    }
    onStartListeningToType(type) {
        if (type == Event.CHANGE)
            ILaya.Browser.window.addEventListener('deviceorientation', this.onDeviceOrientationChange);
        return this;
    }
    onDeviceOrientationChange(e) {
        Gyroscope.info.alpha = e.alpha;
        Gyroscope.info.beta = e.beta;
        Gyroscope.info.gamma = e.gamma;
        if (e.webkitCompassHeading) {
            Gyroscope.info.alpha = e.webkitCompassHeading * -1;
            Gyroscope.info.compassAccuracy = e.webkitCompassAccuracy;
        }
        this.event(Event.CHANGE, [e.absolute, Gyroscope.info]);
    }
}
Gyroscope.info = new RotationInfo();

//# sourceMappingURL=Gyroscope.js.map
