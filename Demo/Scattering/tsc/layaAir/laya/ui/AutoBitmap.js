import { Graphics } from "../display/Graphics";
import { ILaya } from "../../ILaya";
import { Draw9GridTextureCmd } from "../display/cmd/Draw9GridTextureCmd";
import { DrawTextureCmd } from "../display/cmd/DrawTextureCmd";
import { LayaEnv } from "../../LayaEnv";
export class AutoBitmap extends Graphics {
    constructor() {
        super(...arguments);
        this._width = null;
        this._height = null;
        this.uv = null;
        this._color = "#ffffff";
    }
    destroy() {
        super.destroy();
        if (this._source && !LayaEnv.isPlaying)
            this._source.off("reload", this, this._setChanged);
        this._source = null;
        this._sizeGrid = null;
        this._offset = null;
    }
    get sizeGrid() {
        return this._sizeGrid;
    }
    set sizeGrid(value) {
        this._sizeGrid = value ? value.map((v) => { return +v; }) : null;
        this._setChanged();
    }
    get width() {
        if (this._width != null)
            return this._width;
        if (this._source)
            return this._source.sourceWidth;
        return 0;
    }
    set width(value) {
        if (this._width != value) {
            this._width = value;
            this._setChanged();
        }
    }
    get height() {
        if (this._height != null)
            return this._height;
        if (this._source)
            return this._source.sourceHeight / (this._source._stateNum || this._stateNum || 1);
        return 0;
    }
    set height(value) {
        if (this._height != value) {
            this._height = value;
            this._setChanged();
        }
    }
    get source() {
        return this._source;
    }
    set source(value) {
        if (this._source && !LayaEnv.isPlaying)
            this._source.off("reload", this, this._setChanged);
        if (value) {
            this._source = value;
            this._setChanged();
            if (!LayaEnv.isPlaying)
                value.on("reload", this, this._setChanged);
        }
        else {
            this._source = null;
            this._setDrawGridCmd(null);
        }
    }
    setState(index, numStates) {
        this._stateIndex = index;
        this._stateNum = numStates;
        this._setChanged();
    }
    get color() {
        return this._color;
    }
    set color(value) {
        if (this._color != value) {
            this._color = value;
            this._setChanged();
        }
    }
    _setChanged() {
        if (!this._isChanged) {
            this._isChanged = true;
            ILaya.timer.callLater(this, this.changeSource);
        }
    }
    changeSource() {
        this._isChanged = false;
        let source = this._source;
        if (!source || !source.bitmap || !this._sp)
            return;
        let width = this.width;
        let height = this.height;
        let sizeGrid = this._sizeGrid || source._sizeGrid;
        let stateIndex = this._stateIndex;
        if (stateIndex != null) {
            let stateNum = source._stateNum || this._stateNum || 1;
            if (stateNum == 1)
                stateIndex = 0;
            else if (stateNum == 2) {
                if (stateIndex == 2)
                    stateIndex = 1;
                else
                    stateIndex = 0;
            }
            else if (stateNum == 3) {
                if (stateIndex == 3)
                    stateIndex = 0;
            }
            let h = source.height / stateNum;
            source = source.getCachedClip(0, h * stateIndex, source.width, h);
            if (!source)
                return;
        }
        let sw = source.sourceWidth;
        let sh = source.sourceHeight;
        let cmd;
        if (!sizeGrid || (sw === width && sh === height))
            cmd = DrawTextureCmd.create(source, this._offset ? this._offset[0] : 0, this._offset ? this._offset[1] : 0, width, height, null, 1, this._color, null, this.uv);
        else
            cmd = Draw9GridTextureCmd.create(source, 0, 0, width, height, sizeGrid, false, this._color);
        this._setDrawGridCmd(cmd);
    }
    _setDrawGridCmd(newcmd) {
        if (this._drawGridCmd) {
            this.removeCmd(this._drawGridCmd);
            this._drawGridCmd.recover();
        }
        this._drawGridCmd = newcmd;
        if (newcmd)
            this.addCmd(newcmd);
    }
}

//# sourceMappingURL=AutoBitmap.js.map
