import { BaseScript } from "../../BaseScript";
import Index from "../../Index";

import Text = Laya.Text;
import Geolocation = Laya.Geolocation;
import Handler = Laya.Handler;
import Browser = Laya.Browser;
import GeolocationInfo = Laya.GeolocationInfo;
import SpriteUtils = Laya.SpriteUtils;

const { regClass, property } = Laya;

@regClass()
export class InputDevice_Map extends BaseScript {
	// 百度地图
	private map: any;
	private marker: any;
	private BMap: any = Browser.window.BMap;
	private convertor: any;

	// Div
	private mapDiv: any;

	private infoText: Text;

    constructor() {
        super();
    }

    onAwake(): void {

        this.convertor = new this.BMap.Convertor();

        super.base();
		
		this.createDom();
		this.initMap();
		this.createInfoText();

		var successHandler: Handler = new Handler(this, this.updatePosition);
		var errorHandler: Handler = new Handler(this, this.onError);

		// 使用高精度位置
		Geolocation.enableHighAccuracy = true;
		Geolocation.watchPosition(successHandler, errorHandler);

		// 绑定作用域
		this.convertToBaiduCoord = this.convertToBaiduCoord.bind(this);
	}

	onDestroy(): void {
		Browser.removeElement(this.mapDiv);
	}
    

	private createDom(): void {
		this.mapDiv = Browser.createElement("div");
		var style: any = this.mapDiv.style;
		style.position = "absolute";
		style.top = "50px";
		style.left = "0px";
		style.width = Browser.width / Browser.pixelRatio + "px";
		style.height = (Browser.height) / Browser.pixelRatio + "px";

		Browser.document.body.appendChild(this.mapDiv);

		if( Index.curPage )
			SpriteUtils.fitDOMElementInArea(this.mapDiv, this.box2D, Index.pagePos.x, Index.pagePos.y + 50, this.pageWidth, this.pageHeight - 50);
	}

	private initMap(): void {
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
		var label: any = new this.BMap.Label("当前位置", { "offset": new this.BMap.Size(-15, 30) });
		this.marker.setLabel(label);
	}

	private createInfoText(): void {
		this.infoText = new Text();
		this.owner.addChild(this.infoText);
		this.infoText.fontSize = 20;
		this.infoText.color = "#FFFFFF";
        this.infoText.text = "等待初始化数据";
		this.infoText.size(this.pageWidth, this.pageHeight);
	}

	// 更新设备位置
	private updatePosition(p: GeolocationInfo): void {
		// 转换为百度地图坐标
		var point: any = new this.BMap.Point(p.longitude, p.latitude);
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
	private convertToBaiduCoord(data: any): void {
		if (data.status == 0) {
			var position: any = data.points[0];
			// 设置标注物位置
			this.marker.setPosition(position);

			this.map.panTo(position);
			this.map.setZoom(17);
		}
	}

	private onError(e: any): void {
		if (e.code == Geolocation.TIMEOUT)
			console.log("获取位置超时");
		else if (e.code == Geolocation.POSITION_UNAVAILABLE)
			console.log("位置不可用");
		else if (e.code == Geolocation.PERMISSION_DENIED)
			console.log("无权限");
	}

}