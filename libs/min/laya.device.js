!function(e,t){"use strict";class AccelerationInfo{constructor(){}}class RotationInfo{constructor(){}}class Accelerator extends t.EventDispatcher{constructor(){super(),this.onDeviceOrientationChange=this.onDeviceOrientationChange.bind(this)}static get instance(){return Accelerator._instance=Accelerator._instance||new Accelerator,Accelerator._instance}onStartListeningToType(e){return e==t.Event.CHANGE&&t.ILaya.Browser.window.addEventListener("devicemotion",this.onDeviceOrientationChange),this}onDeviceOrientationChange(e){var o=e.interval;Accelerator.acceleration.x=e.acceleration.x,Accelerator.acceleration.y=e.acceleration.y,Accelerator.acceleration.z=e.acceleration.z,Accelerator.accelerationIncludingGravity.x=e.accelerationIncludingGravity.x,Accelerator.accelerationIncludingGravity.y=e.accelerationIncludingGravity.y,Accelerator.accelerationIncludingGravity.z=e.accelerationIncludingGravity.z,Accelerator.rotationRate.alpha=-1*e.rotationRate.gamma,Accelerator.rotationRate.beta=-1*e.rotationRate.alpha,Accelerator.rotationRate.gamma=e.rotationRate.beta,t.ILaya.Browser.onAndroid?(t.ILaya.Browser.userAgent.indexOf("Chrome")>-1&&(Accelerator.rotationRate.alpha*=180/Math.PI,Accelerator.rotationRate.beta*=180/Math.PI,Accelerator.rotationRate.gamma*=180/Math.PI),Accelerator.acceleration.x*=-1,Accelerator.accelerationIncludingGravity.x*=-1):t.ILaya.Browser.onIOS&&(Accelerator.acceleration.y*=-1,Accelerator.acceleration.z*=-1,Accelerator.accelerationIncludingGravity.y*=-1,Accelerator.accelerationIncludingGravity.z*=-1,o*=1e3),this.event(t.Event.CHANGE,[Accelerator.acceleration,Accelerator.accelerationIncludingGravity,Accelerator.rotationRate,o])}static getTransformedAcceleration(e){var o;return Accelerator.transformedAcceleration=Accelerator.transformedAcceleration||new AccelerationInfo,Accelerator.transformedAcceleration.z=e.z,90==t.ILaya.Browser.window.orientation?(Accelerator.transformedAcceleration.x=e.y,Accelerator.transformedAcceleration.y=-e.x):-90==t.ILaya.Browser.window.orientation?(Accelerator.transformedAcceleration.x=-e.y,Accelerator.transformedAcceleration.y=e.x):t.ILaya.Browser.window.orientation?180==t.ILaya.Browser.window.orientation&&(Accelerator.transformedAcceleration.x=-e.x,Accelerator.transformedAcceleration.y=-e.y):(Accelerator.transformedAcceleration.x=e.x,Accelerator.transformedAcceleration.y=e.y),-90==t.ILaya.stage.canvasDegree?(o=Accelerator.transformedAcceleration.x,Accelerator.transformedAcceleration.x=-Accelerator.transformedAcceleration.y,Accelerator.transformedAcceleration.y=o):90==t.ILaya.stage.canvasDegree&&(o=Accelerator.transformedAcceleration.x,Accelerator.transformedAcceleration.x=Accelerator.transformedAcceleration.y,Accelerator.transformedAcceleration.y=-o),Accelerator.transformedAcceleration}}Accelerator.acceleration=new AccelerationInfo,Accelerator.accelerationIncludingGravity=new AccelerationInfo,Accelerator.rotationRate=new RotationInfo;class Shake extends t.EventDispatcher{constructor(){super()}static get instance(){return Shake._instance=Shake._instance||new Shake,Shake._instance}start(e,o){this.throushold=e,this.shakeInterval=o,this.lastX=this.lastY=this.lastZ=NaN,Accelerator.instance.on(t.Event.CHANGE,this,this.onShake)}stop(){Accelerator.instance.off(t.Event.CHANGE,this,this.onShake)}onShake(e,o,a,r){if(isNaN(this.lastX))return this.lastX=o.x,this.lastY=o.y,this.lastZ=o.z,void(this.lastMillSecond=t.ILaya.Browser.now());var c=Math.abs(this.lastX-o.x),n=Math.abs(this.lastY-o.y),i=Math.abs(this.lastZ-o.z);this.isShaked(c,n,i)&&(t.ILaya.Browser.now()-this.lastMillSecond>this.shakeInterval&&(this.event(t.Event.CHANGE),this.lastMillSecond=t.ILaya.Browser.now()));this.lastX=o.x,this.lastY=o.y,this.lastZ=o.z}isShaked(e,t,o){return e>this.throushold&&t>this.throushold||e>this.throushold&&o>this.throushold||t>this.throushold&&o>this.throushold}}class GeolocationInfo{setPosition(e){this.pos=e,this.coords=e.coords}get latitude(){return this.coords.latitude}get longitude(){return this.coords.longitude}get altitude(){return this.coords.altitude}get accuracy(){return this.coords.accuracy}get altitudeAccuracy(){return this.coords.altitudeAccuracy}get heading(){return this.coords.heading}get speed(){return this.coords.speed}get timestamp(){return this.pos.timestamp}}class Geolocation{constructor(){}static getCurrentPosition(e,t=null){Geolocation.navigator.geolocation.getCurrentPosition((function(t){Geolocation.position.setPosition(t),e.runWith(Geolocation.position)}),(function(e){t.runWith(e)}),{enableHighAccuracy:Geolocation.enableHighAccuracy,timeout:Geolocation.timeout,maximumAge:Geolocation.maximumAge})}static watchPosition(e,t){return Geolocation.navigator.geolocation.watchPosition((function(t){Geolocation.position.setPosition(t),e.runWith(Geolocation.position)}),(function(e){t.runWith(e)}),{enableHighAccuracy:Geolocation.enableHighAccuracy,timeout:Geolocation.timeout,maximumAge:Geolocation.maximumAge})}static clearWatch(e){Geolocation.navigator.geolocation.clearWatch(e)}}Geolocation.navigator=navigator,Geolocation.position=new GeolocationInfo,Geolocation.PERMISSION_DENIED=1,Geolocation.POSITION_UNAVAILABLE=2,Geolocation.TIMEOUT=3,Geolocation.supported=!!Geolocation.navigator.geolocation,Geolocation.enableHighAccuracy=!1,Geolocation.timeout=1e10,Geolocation.maximumAge=0;class Gyroscope extends t.EventDispatcher{constructor(e){super(),this.onDeviceOrientationChange=this.onDeviceOrientationChange.bind(this)}static get instance(){return Gyroscope._instance=Gyroscope._instance||new Gyroscope(0),Gyroscope._instance}onStartListeningToType(e){return e==t.Event.CHANGE&&t.ILaya.Browser.window.addEventListener("deviceorientation",this.onDeviceOrientationChange),this}onDeviceOrientationChange(e){Gyroscope.info.alpha=e.alpha,Gyroscope.info.beta=e.beta,Gyroscope.info.gamma=e.gamma,e.webkitCompassHeading&&(Gyroscope.info.alpha=-1*e.webkitCompassHeading,Gyroscope.info.compassAccuracy=e.webkitCompassAccuracy),this.event(t.Event.CHANGE,[e.absolute,Gyroscope.info])}}Gyroscope.info=new RotationInfo,e.AccelerationInfo=AccelerationInfo,e.Accelerator=Accelerator,e.Geolocation=Geolocation,e.GeolocationInfo=GeolocationInfo,e.Gyroscope=Gyroscope,e.Media=class{constructor(){}static supported(){return!!t.ILaya.Browser.window.navigator.getUserMedia}static getMedia(e,o,a){t.ILaya.Browser.window.navigator.getUserMedia&&t.ILaya.Browser.window.navigator.getUserMedia(e,(function(e){o.runWith(t.ILaya.Browser.window.URL.createObjectURL(e))}),(function(e){a.runWith(e)}))}},e.RotationInfo=RotationInfo,e.Shake=Shake}(window.Laya=window.Laya||{},Laya);
//# sourceMappingURL=laya.device.js.map