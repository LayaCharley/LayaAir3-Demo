import { Vector3 } from "laya/maths/Vector3";
import { GrassCellInfo } from "./GrassCellInfo";
import { GlassRender } from "./GrassRender";
/**
 * 用来管理草皮，裁剪什么的都在这里
 */
export class GrassRenderManager {
    /**
     * 草坪渲染管理
     */
    constructor(camera) {
        //----------config-----------
        //最大Instance数  也是密度
        this.instanceCount = 1000000;
        //设置草皮大小
        this.grassCellsize = 10;
        //设置草皮最大草量
        this.cellMaxGrassNum = 1000;
        //设置草量的级数
        this.cellMipmapByDistance = 10;
        //裁剪最近距离
        this.DrawDistance = 150;
        //是否开启草地分级优化
        this.enableLevelDraw = true;
        //每降低一个等级草量减少百分比
        this.subGrassByLevel = 0.1;
        /**草皮Map*/
        this.grassMap = [];
        //更新绘画个数
        this.drawArrayLength = 0;
        this.drawGrassCellLeverlArray = [];
        this.drawGrassCellLeverlArray.length = this.cellMipmapByDistance;
        for (let index = 0; index < this.cellMipmapByDistance; index++) {
            this.drawGrassCellLeverlArray[index] = [];
        }
        this.drawGrassLevelNums = [];
        this.drawGrassLevelNums.length = this.cellMipmapByDistance;
        this.dataArrayBuffer = new Float32Array(this.instanceCount * 3);
        this.glassRender = new GlassRender(this, camera);
    }
    set enable(value) {
        if (value)
            this.glassRender.addCommandBuffer();
        else
            this.glassRender.removeCommandBuffer();
    }
    /**
     * 草皮裁剪
     */
    frustumCulling(camera) {
        //等级渲染清理
        for (let j = 0; j < this.drawGrassLevelNums.length; j++) {
            this.drawGrassLevelNums[j] = 0;
        }
        this.drawGrassCellNums = 0;
        let distance = this.DrawDistance;
        let levelDistance = this.DrawDistance / this.cellMipmapByDistance;
        let boundFrustum = camera.boundFrustum;
        let cameraPos = camera.transform.position;
        for (let i = 0, n = this.grassMap.length; i < n; i++) {
            let grasscell = this.grassMap[i];
            let grassDistance = Vector3.distance(grasscell.privotPos, cameraPos);
            if (grassDistance < distance) {
                //TODO优化
                if (boundFrustum.intersects(grasscell.bound)) {
                    if (this.enableLevelDraw) {
                        let leval = Math.floor(grassDistance / levelDistance);
                        grasscell.setDrawLevel(leval * this.subGrassByLevel);
                        this.drawGrassCellLeverlArray[leval] || (this.drawGrassCellLeverlArray[leval] = {});
                        //@ts-ignore
                        this.drawGrassCellLeverlArray[leval][this.drawGrassLevelNums[leval]] = i;
                        //@ts-ignore
                        this.drawGrassLevelNums[leval] += 1;
                    }
                    else {
                        grasscell.setDrawLevel(0);
                        this.drawGrassCellLeverlArray[0][this.drawGrassLevelNums[0]] = i;
                        //@ts-ignore
                        this.drawGrassLevelNums[0] += 1;
                    }
                    this.drawGrassCellNums++;
                }
            }
        }
    }
    /**
     * 增加草坪块
     */
    addGrassCell(grassPrivot) {
        let grassCell = new GrassCellInfo(this.cellMaxGrassNum, this.grassCellsize, grassPrivot);
        this.grassMap.push(grassCell);
    }
    /**
     * 删除草坪块
     */
    removeGrassCell(grassCell) {
        let index = this.grassMap.indexOf(grassCell);
        let lastIndex = this.grassMap.length - 1;
        this.grassMap[index] = this.grassMap[lastIndex];
        this.grassMap.length = lastIndex;
    }
    update(caemra) {
        //根据距离排序更新 最后渲染
        this.frustumCulling(caemra);
        let offset = 0;
        for (let i = 0, n = this.drawGrassLevelNums.length; i < n; i++) {
            let drawnums = this.drawGrassLevelNums[i];
            var array = this.drawGrassCellLeverlArray[i];
            for (var j = 0; j < drawnums; j++) {
                offset = this.grassMap[array[j]].setGrassCellData(this.dataArrayBuffer, offset);
            }
        }
        this.drawArrayLength = offset / 3;
        this.glassRender.changeDrawNums();
    }
}
