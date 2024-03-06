import { ILaya } from "../../../../ILaya";
import { ILaya3D } from "../../../../ILaya3D";
import { Vector3 } from "../../../maths/Vector3";
import { ColliderShape } from "./ColliderShape";
export class HeightfieldTerrainShape extends ColliderShape {
    constructor(heightfieldData, heightStickWidth, heightStickLength, minHeight, maxHeight, heightScale) {
        super();
        this.dataPtr = 0;
        this.initSize = new Vector3();
        this._type = ColliderShape.SHAPETYPES_HEIGHTFIELDTERRAIN;
        var bt = ILaya3D.Physics3D._bullet;
        this.needsCustomCollisionCallback = true;
        let hfdatatype = 5;
        if (heightfieldData instanceof Uint16Array) {
            hfdatatype = 3;
        }
        else if (heightfieldData instanceof Uint8Array) {
            hfdatatype = 5;
        }
        else if (heightfieldData instanceof Float32Array) {
            hfdatatype = 0;
        }
        else {
            throw 'bad heightfield data';
        }
        this.dataPtr = bt._malloc(heightfieldData.byteLength);
        let conch = window.conch;
        if (conch) {
            bt.copyJSArray(this.dataPtr, heightfieldData.buffer);
        }
        else {
            let bulletwasm = ILaya.Laya.WasmModules['bullet'];
            let buff = bulletwasm.memory.buffer;
            let dstbuff = new Uint8Array(buff, this.dataPtr, heightfieldData.byteLength);
            dstbuff.set(new Uint8Array(heightfieldData.buffer));
        }
        this._btShape = bt.btHeightfieldTerrainShape_create(heightStickWidth, heightStickLength, this.dataPtr, heightScale, minHeight, maxHeight, hfdatatype);
    }
    setMargin(margin) {
        var bt = ILaya3D.Physics3D._bullet;
        bt.btConcaveShape_setMargin(this._btShape, margin);
    }
    _setScale(value) {
        super._setScale(value);
    }
    destroy() {
        super.destroy();
        if (this.dataPtr) {
            var bt = ILaya3D.Physics3D._bullet;
            bt._free(this.dataPtr);
        }
    }
    clone() {
        debugger;
        throw 'not imp';
    }
}

//# sourceMappingURL=HeightfieldTerrainShape.js.map
