import { IkConstraint } from "./IkConstraint";
import { PathConstraint } from "./PathConstraint";
import { TfConstraint } from "./TfConstraint";
import { AnimationPlayer } from "../AnimationPlayer";
import { GraphicsAni } from "../GraphicsAni";
import { Sprite } from "../../display/Sprite";
import { Handler } from "../../utils/Handler";
import { Matrix } from "../../maths/Matrix";
import { Event } from "../../events/Event";
import { SoundManager } from "../../media/SoundManager";
import { Byte } from "../../utils/Byte";
import { IAniLib } from "../AniLibPack";
import { ILaya } from "../../../ILaya";
import { LayaEnv } from "../../../LayaEnv";
export class Skeleton extends Sprite {
    constructor(aniMode = 0) {
        super();
        this._boneMatrixArray = [];
        this._lastTime = 0;
        this._currAniIndex = -1;
        this._pause = true;
        this._aniClipIndex = -1;
        this._clipIndex = -1;
        this._skinIndex = 0;
        this._skinName = "default";
        this._aniMode = 0;
        this._index = -1;
        this._total = -1;
        this._indexControl = false;
        this._eventIndex = 0;
        this._drawOrderIndex = 0;
        this._drawOrder = null;
        this._lastAniClipIndex = -1;
        this._lastUpdateAniClipIndex = -1;
        this._playAudio = true;
        this._soundChannelArr = [];
        this._animationName = "";
        this._loop = true;
        this._aniMode = aniMode;
    }
    get index() {
        return this._index;
    }
    set index(value) {
        if (this.player) {
            this._index = value;
            this._player.currentTime = this._index * 1000 / this._player.cacheFrameRate;
            this._indexControl = true;
            if (this._aniClipIndex < 0 || this._aniClipIndex >= this.getAnimNum()) {
                this._aniClipIndex = 0;
                this._currAniIndex = 0;
                this._curOriginalData = new Float32Array(this._templet.getTotalkeyframesLength(this._currAniIndex));
                this._drawOrder = null;
                this._eventIndex = 0;
            }
            this._update(false);
        }
    }
    get total() {
        if (this._templet && this._player) {
            this._total = Math.floor(this._templet.getAniDuration(this._player.currentAnimationClipIndex) / 1000 * this._player.cacheFrameRate);
        }
        else {
            this._total = -1;
        }
        return this._total;
    }
    get player() {
        return this._player;
    }
    get skinName() {
        return this._skinName;
    }
    set skinName(value) {
        this._skinName = value;
        if (this._templet)
            this.showSkinByName(value);
    }
    get animationName() {
        return this._animationName;
    }
    set animationName(value) {
        this._animationName = value;
        if (this._templet)
            this.play(value, this._loop, true);
    }
    get loop() {
        return this._loop;
    }
    set loop(value) {
        this._loop = value;
        if (this._templet)
            this.play(this._animationName, this._loop, true);
    }
    get templet() {
        return this._templet;
    }
    set templet(value) {
        this.init(value);
    }
    get source() {
        return this._source;
    }
    set source(value) {
        this._source = value;
        if (value) {
            ILaya.loader.load(value).then((templet) => {
                if (!this._source || templet && !templet.isCreateFromURL(this._source))
                    return;
                this.templet = templet;
            });
        }
        else
            this.templet = null;
    }
    get aniMode() {
        return this._aniMode;
    }
    set aniMode(value) {
        this._aniMode = value;
    }
    init(templet) {
        if (this._templet) {
            this.reset();
            this.graphics.clear();
        }
        this._templet = templet;
        if (!this._templet)
            return;
        if (this._aniMode == 1) {
            this._graphicsCache = [];
            for (let i = 0, n = templet.getAnimationCount(); i < n; i++) {
                this._graphicsCache.push([]);
            }
        }
        this._yReverseMatrix = templet.yReverseMatrix;
        this._templet._addReference(1);
        this._player = new AnimationPlayer();
        this._player.templet = templet;
        this._player.play();
        this._parseSrcBoneMatrix();
        this._boneList = templet.mBoneArr;
        this._rootBone = templet.mRootBone;
        this._aniSectionDic = templet.aniSectionDic;
        if (templet.ikArr.length > 0) {
            this._ikArr = [];
            for (let i = 0, n = templet.ikArr.length; i < n; i++) {
                this._ikArr.push(new IkConstraint(templet.ikArr[i], this._boneList));
            }
        }
        if (templet.pathArr.length > 0) {
            this._pathDic = {};
            for (let i = 0, n = templet.pathArr.length; i < n; i++) {
                let tPathData = templet.pathArr[i];
                let tPathConstraint = new PathConstraint(tPathData, this._boneList);
                let tBoneSlot = this._boneSlotDic[tPathData.name];
                if (tBoneSlot) {
                    tPathConstraint = new PathConstraint(tPathData, this._boneList);
                    tPathConstraint.target = tBoneSlot;
                }
                this._pathDic[tPathData.name] = tPathConstraint;
            }
        }
        if (templet.tfArr.length > 0) {
            this._tfArr = [];
            for (let i = 0, n = templet.tfArr.length; i < n; i++) {
                this._tfArr.push(new TfConstraint(templet.tfArr[i], this._boneList));
            }
        }
        if (templet.skinDataArray.length > 0) {
            this._skinIndex = this._templet.getSkinIndexByName(this._skinName);
            if (this._skinIndex == -1)
                this._skinIndex = 0;
        }
        this._player.on(Event.PLAYED, this, this._onPlay);
        this._player.on(Event.STOPPED, this, this._onStop);
        this._player.on(Event.PAUSED, this, this._onPause);
        if (LayaEnv.isPlaying && this._animationName)
            this.play(this._animationName, this._loop, true);
    }
    load(path, complete) {
        ILaya.loader.load(path).then((templet) => {
            if (templet == null)
                return;
            if (!templet.isCreateFromURL(path))
                return;
            this.init(templet);
            this.play(0, true);
            complete && complete.runWith(this);
        });
    }
    _onPlay() {
        this.event(Event.PLAYED);
    }
    _onStop() {
        let tEventAniArr = this._templet.eventAniArr;
        let tEventArr = tEventAniArr[this._aniClipIndex];
        if (tEventArr && this._eventIndex < tEventArr.length) {
            for (; this._eventIndex < tEventArr.length; this._eventIndex++) {
                let tEventData = tEventArr[this._eventIndex];
                if (tEventData.time >= this._player.playStart && tEventData.time <= this._player.playEnd) {
                    this.event(Event.LABEL, tEventData);
                }
            }
        }
        this._drawOrder = null;
        this.event(Event.STOPPED);
    }
    _onPause() {
        this.event(Event.PAUSED);
    }
    _parseSrcBoneMatrix() {
        let n = this._templet.srcBoneMatrixArr.length;
        for (let i = 0; i < n; i++) {
            this._boneMatrixArray.push(new Matrix());
        }
        if (this._aniMode == 0) {
            this._boneSlotDic = this._templet.boneSlotDic;
            this._bindBoneBoneSlotDic = this._templet.bindBoneBoneSlotDic;
            this._boneSlotArray = this._templet.boneSlotArray;
        }
        else {
            this._boneSlotDic = {};
            this._bindBoneBoneSlotDic = {};
            this._boneSlotArray = [];
            let tArr = this._templet.boneSlotArray;
            for (let i = 0, n = tArr.length; i < n; i++) {
                let tBS = tArr[i];
                let tBSArr = this._bindBoneBoneSlotDic[tBS.parent];
                if (tBSArr == null) {
                    this._bindBoneBoneSlotDic[tBS.parent] = tBSArr = [];
                }
                this._boneSlotDic[tBS.name] = tBS = tBS.copy();
                tBSArr.push(tBS);
                this._boneSlotArray.push(tBS);
            }
        }
    }
    _emitMissedEvents(startTime, endTime, startIndex = 0) {
        let tEventAniArr = this._templet.eventAniArr;
        let tEventArr = tEventAniArr[this._player.currentAnimationClipIndex];
        if (tEventArr) {
            let len = tEventArr.length;
            for (let i = startIndex; i < len; i++) {
                let tEventData = tEventArr[i];
                if (tEventData.time >= this._player.playStart && tEventData.time <= this._player.playEnd) {
                    this.event(Event.LABEL, tEventData);
                }
            }
        }
    }
    _update(autoKey = true) {
        if (autoKey && this._pause)
            return;
        if (autoKey && this._indexControl) {
            return;
        }
        let tCurrTime = this.timer.currTimer;
        let preIndex = this._player.currentKeyframeIndex;
        let dTime = tCurrTime - this._lastTime;
        if (autoKey) {
            this._player._update(dTime);
        }
        else {
            preIndex = -1;
        }
        this._lastTime = tCurrTime;
        this._index = this._clipIndex = this._player.currentKeyframeIndex;
        if (this._index < 0)
            return;
        if (dTime > 0 && this._clipIndex == preIndex && this._lastUpdateAniClipIndex == this._aniClipIndex) {
            return;
        }
        this._lastUpdateAniClipIndex = this._aniClipIndex;
        if (preIndex > this._clipIndex && this._eventIndex != 0) {
            this._emitMissedEvents(this._player.playStart, this._player.playEnd, this._eventIndex);
            this._eventIndex = 0;
        }
        let tEventArr = this._templet.eventAniArr[this._aniClipIndex];
        if (tEventArr && this._eventIndex < tEventArr.length) {
            let tEventData = tEventArr[this._eventIndex];
            if (tEventData.time >= this._player.playStart && tEventData.time <= this._player.playEnd) {
                if (this._player.currentPlayTime >= tEventData.time) {
                    this.event(Event.LABEL, tEventData);
                    this._eventIndex++;
                    if (this._playAudio && tEventData.audioValue && tEventData.audioValue !== "null" && tEventData.audioValue !== "undefined") {
                        let channel = SoundManager.playSound(this._player.templet._path + tEventData.audioValue, 1, Handler.create(this, this._onAniSoundStoped));
                        SoundManager.playbackRate = this._player.playbackRate;
                        channel && this._soundChannelArr.push(channel);
                    }
                }
            }
            else if (tEventData.time < this._player.playStart && this._playAudio && tEventData.audioValue && tEventData.audioValue !== "null" && tEventData.audioValue !== "undefined") {
                this._eventIndex++;
                let channel = SoundManager.playSound(this._player.templet._path + tEventData.audioValue, 1, Handler.create(this, this._onAniSoundStoped), null, (this._player.currentPlayTime - tEventData.time) / 1000);
                SoundManager.playbackRate = this._player.playbackRate;
                channel && this._soundChannelArr.push(channel);
            }
            else {
                this._eventIndex++;
            }
        }
        if (this._aniMode == 0) {
            let tGraphics = this._templet.getGrahicsDataWithCache(this._aniClipIndex, this._clipIndex) || this._createGraphics();
            if (tGraphics && this.graphics != tGraphics) {
                this.graphics = tGraphics;
            }
        }
        else if (this._aniMode == 1) {
            let tGraphics = this._getGrahicsDataWithCache(this._aniClipIndex, this._clipIndex) || this._createGraphics();
            if (tGraphics && this.graphics != tGraphics) {
                this.graphics = tGraphics;
            }
        }
        else {
            this._createGraphics();
        }
    }
    _onAniSoundStoped(force) {
        for (let len = this._soundChannelArr.length, i = 0; i < len; i++) {
            let channel = this._soundChannelArr[i];
            if (channel.isStopped || force) {
                !channel.isStopped && channel.stop();
                this._soundChannelArr.splice(i, 1);
                console.log("AllChannel: ", this._soundChannelArr.length);
                console.log("now ChannelLen: ", len, " index: ", i);
                len--;
                i--;
            }
        }
    }
    _createGraphics(_clipIndex = -1) {
        if (_clipIndex == -1)
            _clipIndex = this._clipIndex;
        let curTime = _clipIndex * this._player.cacheFrameRateInterval;
        let tDrawOrderAniArr = this._templet.drawOrderAniArr;
        let tDrawOrderArr = tDrawOrderAniArr[this._aniClipIndex];
        if (tDrawOrderArr && tDrawOrderArr.length > 0) {
            this._drawOrderIndex = 0;
            let tDrawOrderData = tDrawOrderArr[this._drawOrderIndex];
            while (curTime >= tDrawOrderData.time) {
                this._drawOrder = tDrawOrderData.drawOrder;
                this._drawOrderIndex++;
                if (this._drawOrderIndex >= tDrawOrderArr.length) {
                    break;
                }
                tDrawOrderData = tDrawOrderArr[this._drawOrderIndex];
            }
        }
        if (this._aniMode == 0 || this._aniMode == 1) {
            this.graphics = GraphicsAni.create();
        }
        else {
            if (this.graphics instanceof GraphicsAni) {
                this.graphics.clear();
            }
            else {
                this.graphics = GraphicsAni.create();
            }
        }
        let tGraphics = this.graphics;
        let bones = this._templet.getNodes(this._aniClipIndex);
        let stopped = this._player.state == 0;
        this._templet.getOriginalData(this._aniClipIndex, this._curOriginalData, null, _clipIndex, stopped ? (curTime + this._player.cacheFrameRateInterval) : curTime);
        let tSectionArr = this._aniSectionDic[this._aniClipIndex];
        let tStartIndex = 0;
        let i = 0, j = 0, k = 0, n = 0;
        let boneCount = this._templet.srcBoneMatrixArr.length;
        let origDt = this._curOriginalData;
        for (i = 0, n = tSectionArr[0]; i < boneCount; i++) {
            let tSrcBone = this._boneList[i];
            let resultTrans = tSrcBone.resultTransform;
            let tParentTransform = this._templet.srcBoneMatrixArr[i];
            resultTrans.scX = tParentTransform.scX * origDt[tStartIndex++];
            resultTrans.skX = tParentTransform.skX + origDt[tStartIndex++];
            resultTrans.skY = tParentTransform.skY + origDt[tStartIndex++];
            resultTrans.scY = tParentTransform.scY * origDt[tStartIndex++];
            resultTrans.x = tParentTransform.x + origDt[tStartIndex++];
            resultTrans.y = tParentTransform.y + origDt[tStartIndex++];
            if (this._templet.tMatrixDataLen === 8) {
                resultTrans.skewX = tParentTransform.skewX + origDt[tStartIndex++];
                resultTrans.skewY = tParentTransform.skewY + origDt[tStartIndex++];
            }
        }
        let tSlotDic = {};
        let tSlotAlphaDic = {};
        for (n += tSectionArr[1]; i < n; i++) {
            let tBoneData = bones[i];
            tSlotDic[tBoneData.name] = origDt[tStartIndex++];
            tSlotAlphaDic[tBoneData.name] = origDt[tStartIndex++];
            tStartIndex += 4;
        }
        let tBendDirectionDic = {};
        let tMixDic = {};
        for (n += tSectionArr[2]; i < n; i++) {
            let tBoneData = bones[i];
            tBendDirectionDic[tBoneData.name] = origDt[tStartIndex++];
            tMixDic[tBoneData.name] = origDt[tStartIndex++];
            tStartIndex += 4;
        }
        if (this._pathDic) {
            for (n += tSectionArr[3]; i < n; i++) {
                let tBoneData = bones[i];
                let tPathConstraint = this._pathDic[tBoneData.name];
                if (tPathConstraint) {
                    let tByte = new Byte(tBoneData.extenData);
                    switch (tByte.getByte()) {
                        case 1:
                            tPathConstraint.position = origDt[tStartIndex++];
                            break;
                        case 2:
                            tPathConstraint.spacing = origDt[tStartIndex++];
                            break;
                        case 3:
                            tPathConstraint.rotateMix = origDt[tStartIndex++];
                            tPathConstraint.translateMix = origDt[tStartIndex++];
                            break;
                    }
                }
            }
        }
        this._rootBone.update(this._yReverseMatrix || Matrix.TEMP.identity());
        if (this._ikArr) {
            let tIkConstraint;
            for (i = 0, n = this._ikArr.length; i < n; i++) {
                tIkConstraint = this._ikArr[i];
                if (tIkConstraint.name in tBendDirectionDic) {
                    tIkConstraint.bendDirection = tBendDirectionDic[tIkConstraint.name];
                }
                if (tIkConstraint.name in tMixDic) {
                    tIkConstraint.mix = tMixDic[tIkConstraint.name];
                }
                tIkConstraint.apply();
            }
        }
        if (this._pathDic) {
            for (let tPathStr in this._pathDic) {
                let tPathConstraint = this._pathDic[tPathStr];
                tPathConstraint.apply(this._boneList, tGraphics);
            }
        }
        if (this._tfArr) {
            for (i = 0, k = this._tfArr.length; i < k; i++) {
                let tTfConstraint = this._tfArr[i];
                tTfConstraint.apply();
            }
        }
        for (i = 0, k = this._boneList.length; i < k; i++) {
            let tSrcBone = this._boneList[i];
            let tDBBoneSlotArr = this._bindBoneBoneSlotDic[tSrcBone.name];
            tSrcBone.resultMatrix.copyTo(this._boneMatrixArray[i]);
            if (tDBBoneSlotArr) {
                for (j = 0, n = tDBBoneSlotArr.length; j < n; j++) {
                    let tDBBoneSlot = tDBBoneSlotArr[j];
                    if (tDBBoneSlot) {
                        tDBBoneSlot.setParentMatrix(tSrcBone.resultMatrix);
                    }
                }
            }
        }
        let tDeformDic = {};
        let tDeformAniArr = this._templet.deformAniArr;
        if (tDeformAniArr && tDeformAniArr.length > 0) {
            if (this._lastAniClipIndex != this._aniClipIndex) {
                this._lastAniClipIndex = this._aniClipIndex;
                for (i = 0, n = this._boneSlotArray.length; i < n; i++) {
                    let tDBBoneSlot = this._boneSlotArray[i];
                    tDBBoneSlot.deformData = null;
                }
            }
            let tSkinDeformAni = tDeformAniArr[this._aniClipIndex];
            let tDeformAniData = (tSkinDeformAni["default"]);
            this._setDeform(tDeformAniData, tDeformDic, this._boneSlotArray, curTime);
            let tSkin;
            for (tSkin in tSkinDeformAni) {
                if (tSkin != "default" && tSkin != this._skinName) {
                    tDeformAniData = tSkinDeformAni[tSkin];
                    this._setDeform(tDeformAniData, tDeformDic, this._boneSlotArray, curTime);
                }
            }
            tDeformAniData = (tSkinDeformAni[this._skinName]);
            this._setDeform(tDeformAniData, tDeformDic, this._boneSlotArray, curTime);
        }
        if (this._drawOrder) {
            for (i = 0, n = this._drawOrder.length; i < n; i++) {
                let tDBBoneSlot = this._boneSlotArray[this._drawOrder[i]];
                let tSlotData2 = tSlotDic[tDBBoneSlot.name];
                let tSlotData3 = tSlotAlphaDic[tDBBoneSlot.name];
                if (!isNaN(tSlotData3)) {
                }
                if (!isNaN(tSlotData2) && tSlotData2 != -2) {
                    if (this._templet.attachmentNames) {
                        tDBBoneSlot.showDisplayByName(this._templet.attachmentNames[tSlotData2]);
                    }
                    else {
                        tDBBoneSlot.showDisplayByIndex(tSlotData2);
                    }
                }
                if (tDeformDic[this._drawOrder[i]]) {
                    let tObject = tDeformDic[this._drawOrder[i]];
                    if (tDBBoneSlot.currDisplayData && tObject[tDBBoneSlot.currDisplayData.attachmentName]) {
                        tDBBoneSlot.deformData = tObject[tDBBoneSlot.currDisplayData.attachmentName];
                    }
                    else {
                        tDBBoneSlot.deformData = null;
                    }
                }
                else {
                    tDBBoneSlot.deformData = null;
                }
                if (!isNaN(tSlotData3)) {
                    tDBBoneSlot.draw(tGraphics, this._boneMatrixArray, this._aniMode == 2, tSlotData3);
                }
                else {
                    tDBBoneSlot.draw(tGraphics, this._boneMatrixArray, this._aniMode == 2);
                }
                if (!isNaN(tSlotData3)) {
                }
            }
        }
        else {
            for (i = 0, n = this._boneSlotArray.length; i < n; i++) {
                let tDBBoneSlot = this._boneSlotArray[i];
                let tSlotData2 = tSlotDic[tDBBoneSlot.name];
                let tSlotData3 = tSlotAlphaDic[tDBBoneSlot.name];
                if (!isNaN(tSlotData3)) {
                }
                if (!isNaN(tSlotData2) && tSlotData2 != -2) {
                    if (this._templet.attachmentNames) {
                        tDBBoneSlot.showDisplayByName(this._templet.attachmentNames[tSlotData2]);
                    }
                    else {
                        tDBBoneSlot.showDisplayByIndex(tSlotData2);
                    }
                }
                if (tDeformDic[i]) {
                    let tObject = tDeformDic[i];
                    if (tDBBoneSlot.currDisplayData && tObject[tDBBoneSlot.currDisplayData.attachmentName]) {
                        tDBBoneSlot.deformData = tObject[tDBBoneSlot.currDisplayData.attachmentName];
                    }
                    else {
                        tDBBoneSlot.deformData = null;
                    }
                }
                else {
                    tDBBoneSlot.deformData = null;
                }
                if (!isNaN(tSlotData3)) {
                    tDBBoneSlot.draw(tGraphics, this._boneMatrixArray, this._aniMode == 2, tSlotData3);
                }
                else {
                    tDBBoneSlot.draw(tGraphics, this._boneMatrixArray, this._aniMode == 2);
                }
                if (!isNaN(tSlotData3)) {
                }
            }
        }
        if (this._aniMode == 0) {
            this._templet.setGrahicsDataWithCache(this._aniClipIndex, _clipIndex, tGraphics);
            this._checkIsAllParsed(this._aniClipIndex);
        }
        else if (this._aniMode == 1) {
            this._setGrahicsDataWithCache(this._aniClipIndex, _clipIndex, tGraphics);
        }
        return tGraphics;
    }
    _checkIsAllParsed(_aniClipIndex) {
        let len = Math.floor(0.01 + this._templet.getAniDuration(_aniClipIndex) / 1000 * this._player.cacheFrameRate);
        for (let i = 0; i < len; i++) {
            if (!this._templet.getGrahicsDataWithCache(_aniClipIndex, i))
                return;
        }
        if (!this._templet.getGrahicsDataWithCache(_aniClipIndex, len)) {
            this._createGraphics(len);
            return;
        }
        this._templet.deleteAniData(_aniClipIndex);
    }
    _setDeform(tDeformAniData, tDeformDic, _boneSlotArray, curTime) {
        if (!tDeformAniData)
            return;
        let tDeformSlotData;
        let tDeformSlotDisplayData;
        let tDBBoneSlot;
        if (tDeformAniData) {
            for (let i = 0, n = tDeformAniData.deformSlotDataList.length; i < n; i++) {
                tDeformSlotData = tDeformAniData.deformSlotDataList[i];
                for (let j = 0; j < tDeformSlotData.deformSlotDisplayList.length; j++) {
                    tDeformSlotDisplayData = tDeformSlotData.deformSlotDisplayList[j];
                    tDBBoneSlot = _boneSlotArray[tDeformSlotDisplayData.slotIndex];
                    tDeformSlotDisplayData.apply(curTime, tDBBoneSlot);
                    if (!tDeformDic[tDeformSlotDisplayData.slotIndex]) {
                        tDeformDic[tDeformSlotDisplayData.slotIndex] = {};
                    }
                    tDeformDic[tDeformSlotDisplayData.slotIndex][tDeformSlotDisplayData.attachment] = tDeformSlotDisplayData.deformData;
                }
            }
        }
    }
    getAnimNum() {
        return this._templet.getAnimationCount();
    }
    getAniNameByIndex(index) {
        return this._templet.getAniNameByIndex(index);
    }
    getSlotByName(name) {
        return this._boneSlotDic[name];
    }
    showSkinByName(name, freshSlotIndex = true) {
        this.showSkinByIndex(this._templet.getSkinIndexByName(name), freshSlotIndex);
    }
    showSkinByIndex(skinIndex, freshSlotIndex = true) {
        for (let i = 0; i < this._boneSlotArray.length; i++) {
            this._boneSlotArray[i].showSlotData(null, freshSlotIndex);
        }
        if (this._templet.showSkinByIndex(this._boneSlotDic, skinIndex, freshSlotIndex)) {
            let tSkinData = this._templet.skinDataArray[skinIndex];
            this._skinName = tSkinData.name;
        }
        this._clearCache();
    }
    showSlotSkinByIndex(slotName, index) {
        if (this._aniMode == 0)
            return;
        let tBoneSlot = this.getSlotByName(slotName);
        if (tBoneSlot) {
            tBoneSlot.showDisplayByIndex(index);
        }
        this._clearCache();
    }
    showSlotSkinByName(slotName, name) {
        if (this._aniMode == 0)
            return;
        let tBoneSlot = this.getSlotByName(slotName);
        if (tBoneSlot) {
            tBoneSlot.showDisplayByName(name);
        }
        this._clearCache();
    }
    replaceSlotSkinName(slotName, oldName, newName) {
        if (this._aniMode == 0)
            return;
        let tBoneSlot = this.getSlotByName(slotName);
        if (tBoneSlot) {
            tBoneSlot.replaceDisplayByName(oldName, newName);
        }
        this._clearCache();
    }
    replaceSlotSkinByIndex(slotName, oldIndex, newIndex) {
        if (this._aniMode == 0)
            return;
        let tBoneSlot = this.getSlotByName(slotName);
        if (tBoneSlot) {
            tBoneSlot.replaceDisplayByIndex(oldIndex, newIndex);
        }
        this._clearCache();
    }
    setSlotSkin(slotName, texture) {
        if (this._aniMode == 0)
            return;
        let tBoneSlot = this.getSlotByName(slotName);
        if (tBoneSlot) {
            tBoneSlot.replaceSkin(texture);
        }
        this._clearCache();
    }
    _clearCache() {
        if (this._aniMode == 1) {
            for (let i = 0, n = this._graphicsCache.length; i < n; i++) {
                for (let j = 0, len = this._graphicsCache[i].length; j < len; j++) {
                    var gp = this._graphicsCache[i][j];
                    if (gp && gp != this.graphics) {
                        GraphicsAni.recycle(gp);
                    }
                }
                this._graphicsCache[i].length = 0;
            }
        }
    }
    play(nameOrIndex, loop, force = true, start = 0, end = 0, freshSkin = true, playAudio = true) {
        this._playAudio = playAudio;
        this._indexControl = false;
        let index = -1;
        var duration;
        if (loop) {
            duration = 2147483647;
        }
        else {
            duration = 0;
        }
        if (typeof (nameOrIndex) == 'string') {
            for (let i = 0, n = this._templet.getAnimationCount(); i < n; i++) {
                let animation = this._templet.getAnimation(i);
                if (animation && nameOrIndex == animation.name) {
                    index = i;
                    break;
                }
            }
        }
        else {
            index = nameOrIndex;
        }
        if (index > -1 && index < this.getAnimNum()) {
            this._aniClipIndex = index;
            if (force || this._pause || this._currAniIndex != index) {
                this._currAniIndex = index;
                this._curOriginalData = new Float32Array(this._templet.getTotalkeyframesLength(index));
                this._drawOrder = null;
                this._eventIndex = 0;
                this._player.play(index, this._player.playbackRate, duration, start, end);
                if (freshSkin)
                    this._templet.showSkinByIndex(this._boneSlotDic, this._skinIndex);
                if (this._pause) {
                    this._pause = false;
                    this._lastTime = ILaya.Browser.now();
                    this.timer.frameLoop(1, this, this._update, null, true);
                }
                this._update();
            }
        }
    }
    stop() {
        if (!this._pause) {
            this._pause = true;
            if (this._player) {
                this._player.stop(true);
            }
            if (this._soundChannelArr.length > 0) {
                this._onAniSoundStoped(true);
            }
            this.timer.clear(this, this._update);
        }
    }
    playbackRate(value) {
        if (this._player) {
            this._player.playbackRate = value;
        }
    }
    paused() {
        if (!this._pause) {
            this._pause = true;
            if (this._player) {
                this._player.paused = true;
            }
            if (this._soundChannelArr.length > 0) {
                for (let len = this._soundChannelArr.length, i = 0; i < len; i++) {
                    let channel = this._soundChannelArr[i];
                    if (!channel.isStopped) {
                        channel.pause();
                    }
                }
            }
            this.timer.clear(this, this._update);
        }
    }
    resume() {
        this._indexControl = false;
        if (this._pause) {
            this._pause = false;
            if (this._player) {
                this._player.paused = false;
            }
            if (this._soundChannelArr.length > 0) {
                for (let len = this._soundChannelArr.length, i = 0; i < len; i++) {
                    let channel = this._soundChannelArr[i];
                    if (channel.audioBuffer) {
                        channel.resume();
                    }
                }
            }
            this._lastTime = ILaya.Browser.now();
            this.timer.frameLoop(1, this, this._update, null, true);
        }
    }
    _getGrahicsDataWithCache(aniIndex, frameIndex) {
        return this._graphicsCache[aniIndex][frameIndex];
    }
    _setGrahicsDataWithCache(aniIndex, frameIndex, graphics) {
        this._graphicsCache[aniIndex][frameIndex] = graphics;
    }
    reset() {
        this._templet._removeReference();
        this._templet = null;
        this._player.offAll();
        this._player = null;
        this._curOriginalData = null;
        this._boneMatrixArray.length = 0;
        this._ikArr = null;
        this._pathDic = null;
        this._tfArr = null;
        this._lastTime = 0;
        this._currAniIndex = -1;
        this._clipIndex = -1;
        this._indexControl = false;
        this._eventIndex = 0;
        this._drawOrderIndex = 0;
        this._drawOrder = null;
        this._lastAniClipIndex = -1;
        this._lastUpdateAniClipIndex = -1;
        this._pause = true;
        this.timer.clear(this, this._update);
        if (this._soundChannelArr.length > 0)
            this._onAniSoundStoped(true);
    }
    destroy(destroyChild = true) {
        super.destroy(destroyChild);
        if (this._templet)
            this.reset();
    }
}
IAniLib.Skeleton = Skeleton;

//# sourceMappingURL=Skeleton.js.map
