import { BoundBox } from "laya/d3/math/BoundBox";
import { Vector3 } from "laya/maths/Vector3";
/**
 * 草皮块
 */
export class GrassCellInfo {
    constructor(maxGrassNums, cellSize, privotPos) {
        /**草皮原始位置 */
        this.privotPos = new Vector3();
        this.grassHight = 5;
        this.posArray = new Float32Array(maxGrassNums * 3);
        this.size = cellSize;
        this.privotPos = privotPos;
        this.updateGrassPos();
        this.bound = new BoundBox(new Vector3(this.privotPos.x - this.size / 2, this.privotPos.y, this.privotPos.z - this.size / 2), new Vector3(this.privotPos.x + this.size / 2, this.privotPos.y + this.grassHight, this.privotPos.z + this.size / 2));
    }
    /**
     * 更新最大草量的位置
     */
    updateGrassPos() {
        let array = this.posArray;
        let orix = this.privotPos.x;
        let oriy = this.privotPos.y;
        let oriz = this.privotPos.z;
        let size = this.size / 2;
        for (let i = 0, n = this.posArray.length / 3; i < n; i += 3) {
            var x = (Math.random() * 2 - 1) * size;
            var z = (Math.random() * 2 - 1) * size;
            array[i] = x + orix;
            array[i + 1] = oriy;
            array[i + 2] = z + oriz;
        }
    }
    /**
     * 设置绘画等级
     */
    setDrawLevel(level) {
        this.drawlevelRatio = Math.max(1 - level, 0.0);
    }
    setGrassCellData(drawArray, offset) {
        let setLength = Math.floor(this.posArray.length / 3 * this.drawlevelRatio) * 3;
        drawArray.set(this.posArray, offset);
        return setLength + offset;
    }
}
