import { Laya } from "Laya";
import { Geolocation } from "laya/device/geolocation/Geolocation";
import { Stage } from "laya/display/Stage";
import { Text } from "laya/display/Text";
import { Browser } from "laya/utils/Browser";
import { Handler } from "laya/utils/Handler";
/**
 * ...
 * @author Survivor
 */
export class InputDevice_Map {
    constructor(maincls) {
        this.BMap = Browser.window.BMap;
        this.convertor = new this.BMap.Convertor();
        this.Main = null;
        this.Main = maincls;
        Laya.init(Browser.width, 255).then(() => {
            Laya.stage.scaleMode = Stage.SCALE_NOSCALE;
            this.createDom();
            this.initMap();
            this.createInfoText();
            var successHandler = new Handler(this, this.updatePosition);
            var errorHandler = new Handler(this, this.onError);
            // 使用高精度位置
            Geolocation.enableHighAccuracy = true;
            Geolocation.watchPosition(successHandler, errorHandler);
            // 绑定作用域
            this.convertToBaiduCoord = this.convertToBaiduCoord.bind(this);
        });
    }
    createDom() {
        this.mapDiv = Browser.createElement("div");
        var style = this.mapDiv.style;
        style.position = "absolute";
        style.top = Laya.stage.height / Browser.pixelRatio + "px";
        style.left = "0px";
        style.width = Browser.width / Browser.pixelRatio + "px";
        style.height = (Browser.height - Laya.stage.height) / Browser.pixelRatio + "px";
        Browser.document.body.appendChild(this.mapDiv);
    }
    initMap() {
        // 初始化地图
        this.map = new this.BMap.Map(this.mapDiv);
        // 禁用部分交互
        //map.disableDragging();
        this.map.disableKeyboard();
        this.map.disableScrollWheelZoom();
        this.map.disableDoubleClickZoom();
        this.map.disablePinchToZoom();
        // 初始地点北京，缩放系数15
        this.map.centerAndZoom(new this.BMap.Point(116.32715863448607, 39.990912172420714), 15);
        // 创建标注物
        this.marker = new this.BMap.Marker(new this.BMap.Point(0, 0));
        this.map.addOverlay(this.marker);
        var label = new this.BMap.Label("当前位置", { "offset": new this.BMap.Size(-15, 30) });
        this.marker.setLabel(label);
    }
    createInfoText() {
        this.infoText = new Text();
        this.Main.box2D.addChild(this.infoText);
        this.infoText.fontSize = 50;
        this.infoText.color = "#FFFFFF";
        this.infoText.size(Laya.stage.width, Laya.stage.height);
    }
    // 更新设备位置
    updatePosition(p) {
        // 转换为百度地图坐标
        var point = new this.BMap.Point(p.longitude, p.latitude);
        // 把原始坐标转换为百度坐标，部分设备可能获取到的是谷歌坐标，这时第三个参数改为3才是正确的。
        this.convertor.translate([point], 1, 5, this.convertToBaiduCoord);
        // 更新当前获取到的地理信息
        this.infoText.text =
            "经度：" + p.longitude +
                "\t纬度：" + p.latitude +
                "\t精度：" + p.accuracy +
                "\n海拔：" + p.altitude +
                "\t海拔精度：" + p.altitudeAccuracy +
                "\n头：" + p.heading +
                "\n速度：" + p.speed +
                "\n时间戳：" + p.timestamp;
    }
    // 将原始坐标转换为百度坐标
    convertToBaiduCoord(data) {
        if (data.status == 0) {
            var position = data.points[0];
            // 设置标注物位置
            this.marker.setPosition(position);
            this.map.panTo(position);
            this.map.setZoom(17);
        }
    }
    onError(e) {
        if (e.code == Geolocation.TIMEOUT)
            alert("获取位置超时");
        else if (e.code == Geolocation.POSITION_UNAVAILABLE)
            alert("位置不可用");
        else if (e.code == Geolocation.PERMISSION_DENIED)
            alert("无权限");
    }
    dispose() {
        Browser.document.body.removeChild(this.mapDiv);
        this.mapDiv = null;
        this.map = null;
        this.marker = null;
    }
}
