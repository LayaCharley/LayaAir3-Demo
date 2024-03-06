(function (exports, Laya) {
    'use strict';

    class AccelerationInfo {
        constructor() {
        }
    }

    class RotationInfo {
        constructor() {
        }
    }

    class Accelerator extends Laya.EventDispatcher {
        static get instance() {
            Accelerator._instance = Accelerator._instance || new Accelerator();
            return Accelerator._instance;
        }
        constructor() {
            super();
            this.onDeviceOrientationChange = this.onDeviceOrientationChange.bind(this);
        }
        onStartListeningToType(type) {
            if (type == Laya.Event.CHANGE)
                Laya.ILaya.Browser.window.addEventListener('devicemotion', this.onDeviceOrientationChange);
            return this;
        }
        onDeviceOrientationChange(e) {
            var interval = e.interval;
            Accelerator.acceleration.x = e.acceleration.x;
            Accelerator.acceleration.y = e.acceleration.y;
            Accelerator.acceleration.z = e.acceleration.z;
            Accelerator.accelerationIncludingGravity.x = e.accelerationIncludingGravity.x;
            Accelerator.accelerationIncludingGravity.y = e.accelerationIncludingGravity.y;
            Accelerator.accelerationIncludingGravity.z = e.accelerationIncludingGravity.z;
            Accelerator.rotationRate.alpha = e.rotationRate.gamma * -1;
            Accelerator.rotationRate.beta = e.rotationRate.alpha * -1;
            Accelerator.rotationRate.gamma = e.rotationRate.beta;
            if (Laya.ILaya.Browser.onAndroid) {
                if (Laya.ILaya.Browser.userAgent.indexOf("Chrome") > -1) {
                    Accelerator.rotationRate.alpha *= 180 / Math.PI;
                    Accelerator.rotationRate.beta *= 180 / Math.PI;
                    Accelerator.rotationRate.gamma *= 180 / Math.PI;
                }
                Accelerator.acceleration.x *= -1;
                Accelerator.accelerationIncludingGravity.x *= -1;
            }
            else if (Laya.ILaya.Browser.onIOS) {
                Accelerator.acceleration.y *= -1;
                Accelerator.acceleration.z *= -1;
                Accelerator.accelerationIncludingGravity.y *= -1;
                Accelerator.accelerationIncludingGravity.z *= -1;
                interval *= 1000;
            }
            this.event(Laya.Event.CHANGE, [Accelerator.acceleration, Accelerator.accelerationIncludingGravity, Accelerator.rotationRate, interval]);
        }
        static getTransformedAcceleration(acceleration) {
            Accelerator.transformedAcceleration = Accelerator.transformedAcceleration || new AccelerationInfo();
            Accelerator.transformedAcceleration.z = acceleration.z;
            if (Laya.ILaya.Browser.window.orientation == 90) {
                Accelerator.transformedAcceleration.x = acceleration.y;
                Accelerator.transformedAcceleration.y = -acceleration.x;
            }
            else if (Laya.ILaya.Browser.window.orientation == -90) {
                Accelerator.transformedAcceleration.x = -acceleration.y;
                Accelerator.transformedAcceleration.y = acceleration.x;
            }
            else if (!Laya.ILaya.Browser.window.orientation) {
                Accelerator.transformedAcceleration.x = acceleration.x;
                Accelerator.transformedAcceleration.y = acceleration.y;
            }
            else if (Laya.ILaya.Browser.window.orientation == 180) {
                Accelerator.transformedAcceleration.x = -acceleration.x;
                Accelerator.transformedAcceleration.y = -acceleration.y;
            }
            var tx;
            if (Laya.ILaya.stage.canvasDegree == -90) {
                tx = Accelerator.transformedAcceleration.x;
                Accelerator.transformedAcceleration.x = -Accelerator.transformedAcceleration.y;
                Accelerator.transformedAcceleration.y = tx;
            }
            else if (Laya.ILaya.stage.canvasDegree == 90) {
                tx = Accelerator.transformedAcceleration.x;
                Accelerator.transformedAcceleration.x = Accelerator.transformedAcceleration.y;
                Accelerator.transformedAcceleration.y = -tx;
            }
            return Accelerator.transformedAcceleration;
        }
    }
    Accelerator.acceleration = new AccelerationInfo();
    Accelerator.accelerationIncludingGravity = new AccelerationInfo();
    Accelerator.rotationRate = new RotationInfo();

    class Shake extends Laya.EventDispatcher {
        constructor() {
            super();
        }
        static get instance() {
            Shake._instance = Shake._instance || new Shake();
            return Shake._instance;
        }
        start(throushold, interval) {
            this.throushold = throushold;
            this.shakeInterval = interval;
            this.lastX = this.lastY = this.lastZ = NaN;
            Accelerator.instance.on(Laya.Event.CHANGE, this, this.onShake);
        }
        stop() {
            Accelerator.instance.off(Laya.Event.CHANGE, this, this.onShake);
        }
        onShake(acceleration, accelerationIncludingGravity, rotationRate, interval) {
            if (isNaN(this.lastX)) {
                this.lastX = accelerationIncludingGravity.x;
                this.lastY = accelerationIncludingGravity.y;
                this.lastZ = accelerationIncludingGravity.z;
                this.lastMillSecond = Laya.ILaya.Browser.now();
                return;
            }
            var deltaX = Math.abs(this.lastX - accelerationIncludingGravity.x);
            var deltaY = Math.abs(this.lastY - accelerationIncludingGravity.y);
            var deltaZ = Math.abs(this.lastZ - accelerationIncludingGravity.z);
            if (this.isShaked(deltaX, deltaY, deltaZ)) {
                var deltaMillSecond = Laya.ILaya.Browser.now() - this.lastMillSecond;
                if (deltaMillSecond > this.shakeInterval) {
                    this.event(Laya.Event.CHANGE);
                    this.lastMillSecond = Laya.ILaya.Browser.now();
                }
            }
            this.lastX = accelerationIncludingGravity.x;
            this.lastY = accelerationIncludingGravity.y;
            this.lastZ = accelerationIncludingGravity.z;
        }
        isShaked(deltaX, deltaY, deltaZ) {
            return (deltaX > this.throushold && deltaY > this.throushold) ||
                (deltaX > this.throushold && deltaZ > this.throushold) ||
                (deltaY > this.throushold && deltaZ > this.throushold);
        }
    }

    class GeolocationInfo {
        setPosition(pos) {
            this.pos = pos;
            this.coords = pos.coords;
        }
        get latitude() {
            return this.coords.latitude;
        }
        get longitude() {
            return this.coords.longitude;
        }
        get altitude() {
            return this.coords.altitude;
        }
        get accuracy() {
            return this.coords.accuracy;
        }
        get altitudeAccuracy() {
            return this.coords.altitudeAccuracy;
        }
        get heading() {
            return this.coords.heading;
        }
        get speed() {
            return this.coords.speed;
        }
        get timestamp() {
            return this.pos.timestamp;
        }
    }

    class Geolocation {
        constructor() {
        }
        static getCurrentPosition(onSuccess, onError = null) {
            Geolocation.navigator.geolocation.getCurrentPosition(function (pos) {
                Geolocation.position.setPosition(pos);
                onSuccess.runWith(Geolocation.position);
            }, function (error) {
                onError.runWith(error);
            }, {
                enableHighAccuracy: Geolocation.enableHighAccuracy,
                timeout: Geolocation.timeout,
                maximumAge: Geolocation.maximumAge
            });
        }
        static watchPosition(onSuccess, onError) {
            return Geolocation.navigator.geolocation.watchPosition(function (pos) {
                Geolocation.position.setPosition(pos);
                onSuccess.runWith(Geolocation.position);
            }, function (error) {
                onError.runWith(error);
            }, {
                enableHighAccuracy: Geolocation.enableHighAccuracy,
                timeout: Geolocation.timeout,
                maximumAge: Geolocation.maximumAge
            });
        }
        static clearWatch(id) {
            Geolocation.navigator.geolocation.clearWatch(id);
        }
    }
    Geolocation.navigator = navigator;
    Geolocation.position = new GeolocationInfo();
    Geolocation.PERMISSION_DENIED = 1;
    Geolocation.POSITION_UNAVAILABLE = 2;
    Geolocation.TIMEOUT = 3;
    Geolocation.supported = !!Geolocation.navigator.geolocation;
    Geolocation.enableHighAccuracy = false;
    Geolocation.timeout = 1E10;
    Geolocation.maximumAge = 0;

    class Media {
        constructor() {
        }
        static supported() {
            return !!Laya.ILaya.Browser.window.navigator.getUserMedia;
        }
        static getMedia(options, onSuccess, onError) {
            if (Laya.ILaya.Browser.window.navigator.getUserMedia) {
                Laya.ILaya.Browser.window.navigator.getUserMedia(options, function (stream) {
                    onSuccess.runWith(Laya.ILaya.Browser.window.URL.createObjectURL(stream));
                }, function (err) {
                    onError.runWith(err);
                });
            }
        }
    }

    class Gyroscope extends Laya.EventDispatcher {
        static get instance() {
            Gyroscope._instance = Gyroscope._instance || new Gyroscope(0);
            return Gyroscope._instance;
        }
        constructor(singleton) {
            super();
            this.onDeviceOrientationChange = this.onDeviceOrientationChange.bind(this);
        }
        onStartListeningToType(type) {
            if (type == Laya.Event.CHANGE)
                Laya.ILaya.Browser.window.addEventListener('deviceorientation', this.onDeviceOrientationChange);
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
            this.event(Laya.Event.CHANGE, [e.absolute, Gyroscope.info]);
        }
    }
    Gyroscope.info = new RotationInfo();

    exports.AccelerationInfo = AccelerationInfo;
    exports.Accelerator = Accelerator;
    exports.Geolocation = Geolocation;
    exports.GeolocationInfo = GeolocationInfo;
    exports.Gyroscope = Gyroscope;
    exports.Media = Media;
    exports.RotationInfo = RotationInfo;
    exports.Shake = Shake;

})(window.Laya = window.Laya || {}, Laya);
//# sourceMappingURL=laya.device.js.map
