import { Bone } from "./Bone";
import { TfConstraintData } from "./TfConstraintData";
import { PathConstraintData } from "./PathConstraintData";
import { DeformAniData } from "./DeformAniData";
import { DeformSlotData } from "./DeformSlotData";
import { DeformSlotDisplayData } from "./DeformSlotDisplayData";
import { DrawOrderData } from "./DrawOrderData";
import { EventData } from "./EventData";
import { AnimationTemplet } from "../AnimationTemplet";
import { BoneSlot } from "./BoneSlot";
import { SkinData } from "./SkinData";
import { SkinSlotDisplayData } from "./SkinSlotDisplayData";
import { SlotData } from "./SlotData";
import { Transform } from "./Transform";
import { IkConstraintData } from "./IkConstraintData";
import { Texture } from "../../resource/Texture";
import { Matrix } from "../../maths/Matrix";
import { Byte } from "../../utils/Byte";
import { IAniLib } from "../AniLibPack";
import { Skeleton } from "./Skeleton";
import { AnimationParser01 } from "../AnimationParser01";
const LAYA_ANIMATION_160_VISION = "LAYAANIMATION:1.6.0";
const LAYA_ANIMATION_VISION = "LAYAANIMATION:1.7.0";
export class Templet extends AnimationTemplet {
    constructor() {
        super(...arguments);
        this.rate = 30;
        this._graphicsCache = [];
        this.srcBoneMatrixArr = [];
        this.ikArr = [];
        this.tfArr = [];
        this.pathArr = [];
        this.boneSlotDic = {};
        this.bindBoneBoneSlotDic = {};
        this.boneSlotArray = [];
        this.skinDataArray = [];
        this.skinDic = {};
        this.subTextureDic = {};
        this.isParseFail = false;
        this.drawOrderAniArr = [];
        this.eventAniArr = [];
        this.attachmentNames = null;
        this.deformAniArr = [];
        this.skinSlotDisplayDataArr = [];
        this._isParseAudio = false;
        this.aniSectionDic = {};
        this.mBoneArr = [];
    }
    buildArmature(aniMode = 0) {
        let sk = new Skeleton(aniMode);
        sk.templet = this;
        return sk;
    }
    _parse(texture, createURL, skeletonData) {
        this._path = createURL.slice(0, createURL.lastIndexOf("/")) + "/";
        texture._addReference();
        this._mainTexture = texture;
        var reader = new Byte(skeletonData);
        this._aniVersion = reader.readUTFString();
        AnimationParser01.parse(this, reader);
        if (this._aniVersion === LAYA_ANIMATION_VISION) {
            this._isParseAudio = true;
        }
        else if (this._aniVersion != LAYA_ANIMATION_160_VISION) {
            console.log("[Error] 版本不一致，请使用IDE版本配套的重新导出" + this._aniVersion + "->" + LAYA_ANIMATION_VISION);
        }
        for (let i = 0, n = this.getAnimationCount(); i < n; i++) {
            this._graphicsCache.push([]);
        }
        var tByte = new Byte(this.getPublicExtData());
        var tX = 0, tY = 0, tWidth = 0, tHeight = 0;
        var tFrameX = 0, tFrameY = 0, tFrameWidth = 0, tFrameHeight = 0;
        var tTempleData = 0;
        var tTextureLen = tByte.getInt32();
        var tTextureName = tByte.readUTFString();
        var tTextureNameArr = tTextureName.split("\n");
        var tSrcTexturePath;
        for (let i = 0; i < tTextureLen; i++) {
            tSrcTexturePath = this._path + tTextureNameArr[i * 2];
            tTextureName = tTextureNameArr[i * 2 + 1];
            tX = tByte.getFloat32();
            tY = tByte.getFloat32();
            tWidth = tByte.getFloat32();
            tHeight = tByte.getFloat32();
            tTempleData = tByte.getFloat32();
            tFrameX = isNaN(tTempleData) ? 0 : tTempleData;
            tTempleData = tByte.getFloat32();
            tFrameY = isNaN(tTempleData) ? 0 : tTempleData;
            tTempleData = tByte.getFloat32();
            tFrameWidth = isNaN(tTempleData) ? tWidth : tTempleData;
            tTempleData = tByte.getFloat32();
            tFrameHeight = isNaN(tTempleData) ? tHeight : tTempleData;
            this.subTextureDic[tTextureName] = Texture.create(this._mainTexture, tX, tY, tWidth, tHeight, -tFrameX, -tFrameY, tFrameWidth, tFrameHeight);
        }
        var isSpine;
        isSpine = this._aniClassName != "Dragon";
        var tAniCount = tByte.getUint16();
        var tSectionArr;
        for (let i = 0; i < tAniCount; i++) {
            tSectionArr = [];
            tSectionArr.push(tByte.getUint16());
            tSectionArr.push(tByte.getUint16());
            tSectionArr.push(tByte.getUint16());
            tSectionArr.push(tByte.getUint16());
            this.aniSectionDic[i] = tSectionArr;
        }
        var tBone;
        var tParentBone;
        var tName;
        var tParentName;
        var tBoneLen = tByte.getInt16();
        var tBoneDic = {};
        var tRootBone;
        for (let i = 0; i < tBoneLen; i++) {
            tBone = new Bone();
            if (i == 0) {
                tRootBone = tBone;
            }
            else {
                tBone.root = tRootBone;
            }
            tBone.d = isSpine ? -1 : 1;
            tName = tByte.readUTFString();
            tParentName = tByte.readUTFString();
            tBone.length = tByte.getFloat32();
            if (tByte.getByte() == 1) {
                tBone.inheritRotation = false;
            }
            if (tByte.getByte() == 1) {
                tBone.inheritScale = false;
            }
            tBone.name = tName;
            if (tParentName) {
                tParentBone = tBoneDic[tParentName];
                if (tParentBone) {
                    tParentBone.addChild(tBone);
                }
                else {
                    this.mRootBone = tBone;
                }
            }
            tBoneDic[tName] = tBone;
            this.mBoneArr.push(tBone);
        }
        this.tMatrixDataLen = tByte.getUint16();
        var tLen = tByte.getUint16();
        var boneLength = Math.floor(tLen / this.tMatrixDataLen);
        var tResultTransform;
        var tMatrixArray = this.srcBoneMatrixArr;
        for (let i = 0; i < boneLength; i++) {
            tResultTransform = new Transform();
            tResultTransform.scX = tByte.getFloat32();
            tResultTransform.skX = tByte.getFloat32();
            tResultTransform.skY = tByte.getFloat32();
            tResultTransform.scY = tByte.getFloat32();
            tResultTransform.x = tByte.getFloat32();
            tResultTransform.y = tByte.getFloat32();
            if (this.tMatrixDataLen === 8) {
                tResultTransform.skewX = tByte.getFloat32();
                tResultTransform.skewY = tByte.getFloat32();
            }
            tMatrixArray.push(tResultTransform);
            tBone = this.mBoneArr[i];
            tBone.transform = tResultTransform;
        }
        var tIkConstraintData;
        var tIkLen = tByte.getUint16();
        var tIkBoneLen;
        for (let i = 0; i < tIkLen; i++) {
            tIkConstraintData = new IkConstraintData();
            tIkBoneLen = tByte.getUint16();
            for (let j = 0; j < tIkBoneLen; j++) {
                tIkConstraintData.boneNames.push(tByte.readUTFString());
                tIkConstraintData.boneIndexs.push(tByte.getInt16());
            }
            tIkConstraintData.name = tByte.readUTFString();
            tIkConstraintData.targetBoneName = tByte.readUTFString();
            tIkConstraintData.targetBoneIndex = tByte.getInt16();
            tIkConstraintData.bendDirection = tByte.getFloat32();
            tIkConstraintData.mix = tByte.getFloat32();
            tIkConstraintData.isSpine = isSpine;
            this.ikArr.push(tIkConstraintData);
        }
        var tTfConstraintData;
        var tTfLen = tByte.getUint16();
        var tTfBoneLen;
        for (let i = 0; i < tTfLen; i++) {
            tTfConstraintData = new TfConstraintData();
            tTfBoneLen = tByte.getUint16();
            for (let j = 0; j < tTfBoneLen; j++) {
                tTfConstraintData.boneIndexs.push(tByte.getInt16());
            }
            tTfConstraintData.name = tByte.getUTFString();
            tTfConstraintData.targetIndex = tByte.getInt16();
            tTfConstraintData.rotateMix = tByte.getFloat32();
            tTfConstraintData.translateMix = tByte.getFloat32();
            tTfConstraintData.scaleMix = tByte.getFloat32();
            tTfConstraintData.shearMix = tByte.getFloat32();
            tTfConstraintData.offsetRotation = tByte.getFloat32();
            tTfConstraintData.offsetX = tByte.getFloat32();
            tTfConstraintData.offsetY = tByte.getFloat32();
            tTfConstraintData.offsetScaleX = tByte.getFloat32();
            tTfConstraintData.offsetScaleY = tByte.getFloat32();
            tTfConstraintData.offsetShearY = tByte.getFloat32();
            this.tfArr.push(tTfConstraintData);
        }
        var tPathConstraintData;
        var tPathLen = tByte.getUint16();
        var tPathBoneLen;
        for (let i = 0; i < tPathLen; i++) {
            tPathConstraintData = new PathConstraintData();
            tPathConstraintData.name = tByte.readUTFString();
            tPathBoneLen = tByte.getUint16();
            for (let j = 0; j < tPathBoneLen; j++) {
                tPathConstraintData.bones.push(tByte.getInt16());
            }
            tPathConstraintData.target = tByte.readUTFString();
            tPathConstraintData.positionMode = tByte.readUTFString();
            tPathConstraintData.spacingMode = tByte.readUTFString();
            tPathConstraintData.rotateMode = tByte.readUTFString();
            tPathConstraintData.offsetRotation = tByte.getFloat32();
            tPathConstraintData.position = tByte.getFloat32();
            tPathConstraintData.spacing = tByte.getFloat32();
            tPathConstraintData.rotateMix = tByte.getFloat32();
            tPathConstraintData.translateMix = tByte.getFloat32();
            this.pathArr.push(tPathConstraintData);
        }
        var tDeformSlotLen;
        var tDeformSlotDisplayLen;
        var tDSlotIndex;
        var tDAttachment;
        var tDeformTimeLen;
        var tDTime;
        var tDeformVecticesLen;
        var tDeformAniData;
        var tDeformSlotData;
        var tDeformSlotDisplayData;
        var tDeformVectices;
        var tDeformAniLen = tByte.getInt16();
        for (let i = 0; i < tDeformAniLen; i++) {
            var tDeformSkinLen = tByte.getUint8();
            var tSkinDic = {};
            this.deformAniArr.push(tSkinDic);
            for (let f = 0; f < tDeformSkinLen; f++) {
                tDeformAniData = new DeformAniData();
                tDeformAniData.skinName = tByte.getUTFString();
                tSkinDic[tDeformAniData.skinName] = tDeformAniData;
                tDeformSlotLen = tByte.getInt16();
                for (let j = 0; j < tDeformSlotLen; j++) {
                    tDeformSlotData = new DeformSlotData();
                    tDeformAniData.deformSlotDataList.push(tDeformSlotData);
                    tDeformSlotDisplayLen = tByte.getInt16();
                    for (let k = 0; k < tDeformSlotDisplayLen; k++) {
                        tDeformSlotDisplayData = new DeformSlotDisplayData();
                        tDeformSlotData.deformSlotDisplayList.push(tDeformSlotDisplayData);
                        tDeformSlotDisplayData.slotIndex = tDSlotIndex = tByte.getInt16();
                        tDeformSlotDisplayData.attachment = tDAttachment = tByte.getUTFString();
                        tDeformTimeLen = tByte.getInt16();
                        for (let l = 0; l < tDeformTimeLen; l++) {
                            if (tByte.getByte() == 1) {
                                tDeformSlotDisplayData.tweenKeyList.push(true);
                            }
                            else {
                                tDeformSlotDisplayData.tweenKeyList.push(false);
                            }
                            tDTime = tByte.getFloat32();
                            tDeformSlotDisplayData.timeList.push(tDTime);
                            tDeformVectices = [];
                            tDeformSlotDisplayData.vectices.push(tDeformVectices);
                            tDeformVecticesLen = tByte.getInt16();
                            for (let n = 0; n < tDeformVecticesLen; n++) {
                                tDeformVectices.push(tByte.getFloat32());
                            }
                        }
                    }
                }
            }
        }
        var tDrawOrderArr;
        var tDrawOrderAniLen = tByte.getInt16();
        var tDrawOrderLen;
        var tDrawOrderData;
        var tDoLen;
        for (let i = 0; i < tDrawOrderAniLen; i++) {
            tDrawOrderLen = tByte.getInt16();
            tDrawOrderArr = [];
            for (let j = 0; j < tDrawOrderLen; j++) {
                tDrawOrderData = new DrawOrderData();
                tDrawOrderData.time = tByte.getFloat32();
                tDoLen = tByte.getInt16();
                for (let k = 0; k < tDoLen; k++) {
                    tDrawOrderData.drawOrder.push(tByte.getInt16());
                }
                tDrawOrderArr.push(tDrawOrderData);
            }
            this.drawOrderAniArr.push(tDrawOrderArr);
        }
        var tEventArr;
        var tEventAniLen = tByte.getInt16();
        var tEventLen;
        var tEventData;
        for (let i = 0; i < tEventAniLen; i++) {
            tEventLen = tByte.getInt16();
            tEventArr = [];
            for (let j = 0; j < tEventLen; j++) {
                tEventData = new EventData();
                tEventData.name = tByte.getUTFString();
                if (this._isParseAudio)
                    tEventData.audioValue = tByte.getUTFString();
                tEventData.intValue = tByte.getInt32();
                tEventData.floatValue = tByte.getFloat32();
                tEventData.stringValue = tByte.getUTFString();
                tEventData.time = tByte.getFloat32();
                tEventArr.push(tEventData);
            }
            this.eventAniArr.push(tEventArr);
        }
        var tAttachmentLen = tByte.getInt16();
        if (tAttachmentLen > 0) {
            this.attachmentNames = [];
            for (let i = 0; i < tAttachmentLen; i++) {
                this.attachmentNames.push(tByte.getUTFString());
            }
        }
        var tBoneSlotLen = tByte.getInt16();
        var tDBBoneSlot;
        var tDBBoneSlotArr;
        for (let i = 0; i < tBoneSlotLen; i++) {
            tDBBoneSlot = new BoneSlot();
            tDBBoneSlot.name = tByte.readUTFString();
            tDBBoneSlot.parent = tByte.readUTFString();
            tDBBoneSlot.attachmentName = tByte.readUTFString();
            tDBBoneSlot.srcDisplayIndex = tDBBoneSlot.displayIndex = tByte.getInt16();
            tDBBoneSlot.templet = this;
            this.boneSlotDic[tDBBoneSlot.name] = tDBBoneSlot;
            tDBBoneSlotArr = this.bindBoneBoneSlotDic[tDBBoneSlot.parent];
            if (tDBBoneSlotArr == null) {
                this.bindBoneBoneSlotDic[tDBBoneSlot.parent] = tDBBoneSlotArr = [];
            }
            tDBBoneSlotArr.push(tDBBoneSlot);
            this.boneSlotArray.push(tDBBoneSlot);
        }
        var tNameString = tByte.readUTFString();
        var tNameArray = tNameString.split("\n");
        var tNameStartIndex = 0;
        var tSkinDataLen = tByte.getUint8();
        var tSkinData, tSlotData, tDisplayData;
        var tSlotDataLen, tDisplayDataLen;
        var tUvLen, tWeightLen, tTriangleLen, tVerticeLen, tLengthLen;
        for (let i = 0; i < tSkinDataLen; i++) {
            tSkinData = new SkinData();
            tSkinData.name = tNameArray[tNameStartIndex++];
            tSlotDataLen = tByte.getUint8();
            for (let j = 0; j < tSlotDataLen; j++) {
                tSlotData = new SlotData();
                tSlotData.name = tNameArray[tNameStartIndex++];
                tDBBoneSlot = this.boneSlotDic[tSlotData.name];
                tDisplayDataLen = tByte.getUint8();
                for (let k = 0; k < tDisplayDataLen; k++) {
                    tDisplayData = new SkinSlotDisplayData();
                    this.skinSlotDisplayDataArr.push(tDisplayData);
                    tDisplayData.name = tNameArray[tNameStartIndex++];
                    tDisplayData.attachmentName = tNameArray[tNameStartIndex++];
                    tDisplayData.transform = new Transform();
                    tDisplayData.transform.scX = tByte.getFloat32();
                    tDisplayData.transform.skX = tByte.getFloat32();
                    tDisplayData.transform.skY = tByte.getFloat32();
                    tDisplayData.transform.scY = tByte.getFloat32();
                    tDisplayData.transform.x = tByte.getFloat32();
                    tDisplayData.transform.y = tByte.getFloat32();
                    tSlotData.displayArr.push(tDisplayData);
                    tDisplayData.width = tByte.getFloat32();
                    tDisplayData.height = tByte.getFloat32();
                    tDisplayData.type = tByte.getUint8();
                    tDisplayData.verLen = tByte.getUint16();
                    tBoneLen = tByte.getUint16();
                    if (tBoneLen > 0) {
                        tDisplayData.bones = [];
                        for (let l = 0; l < tBoneLen; l++) {
                            let tBoneId = tByte.getUint16();
                            tDisplayData.bones.push(tBoneId);
                        }
                    }
                    tUvLen = tByte.getUint16();
                    if (tUvLen > 0) {
                        tDisplayData.uvs = [];
                        for (let l = 0; l < tUvLen; l++) {
                            tDisplayData.uvs.push(tByte.getFloat32());
                        }
                    }
                    tWeightLen = tByte.getUint16();
                    if (tWeightLen > 0) {
                        tDisplayData.weights = [];
                        for (let l = 0; l < tWeightLen; l++) {
                            tDisplayData.weights.push(tByte.getFloat32());
                        }
                    }
                    tTriangleLen = tByte.getUint16();
                    if (tTriangleLen > 0) {
                        tDisplayData.triangles = [];
                        for (let l = 0; l < tTriangleLen; l++) {
                            tDisplayData.triangles.push(tByte.getUint16());
                        }
                    }
                    tVerticeLen = tByte.getUint16();
                    if (tVerticeLen > 0) {
                        tDisplayData.vertices = [];
                        for (let l = 0; l < tVerticeLen; l++) {
                            tDisplayData.vertices.push(tByte.getFloat32());
                        }
                    }
                    tLengthLen = tByte.getUint16();
                    if (tLengthLen > 0) {
                        tDisplayData.lengths = [];
                        for (let l = 0; l < tLengthLen; l++) {
                            tDisplayData.lengths.push(tByte.getFloat32());
                        }
                    }
                }
                tSkinData.slotArr.push(tSlotData);
            }
            this.skinDic[tSkinData.name] = tSkinData;
            this.skinDataArray.push(tSkinData);
        }
        var tReverse = tByte.getUint8();
        if (tReverse == 1) {
            this.yReverseMatrix = new Matrix(1, 0, 0, -1, 0, 0);
            if (tRootBone) {
                tRootBone.setTempMatrix(this.yReverseMatrix);
            }
        }
        else {
            if (tRootBone) {
                tRootBone.setTempMatrix(new Matrix());
            }
        }
        this.showSkinByIndex(this.boneSlotDic, 0);
    }
    getTexture(name) {
        let tTexture = this.subTextureDic[name];
        if (!tTexture) {
            tTexture = this.subTextureDic[name.substring(0, name.length - 1)];
        }
        if (tTexture == null) {
            return this._mainTexture;
        }
        return tTexture;
    }
    showSkinByIndex(boneSlotDic, skinIndex, freshDisplayIndex = true) {
        if (skinIndex < 0 && skinIndex >= this.skinDataArray.length)
            return false;
        var i, n;
        var tBoneSlot;
        var tSlotData;
        var tSkinData = this.skinDataArray[skinIndex];
        if (tSkinData) {
            for (i = 0, n = tSkinData.slotArr.length; i < n; i++) {
                tSlotData = tSkinData.slotArr[i];
                if (tSlotData) {
                    tBoneSlot = boneSlotDic[tSlotData.name];
                    if (tBoneSlot) {
                        tBoneSlot.showSlotData(tSlotData, freshDisplayIndex);
                        if (freshDisplayIndex && tBoneSlot.attachmentName != "undefined" && tBoneSlot.attachmentName != "null") {
                            tBoneSlot.showDisplayByName(tBoneSlot.attachmentName);
                        }
                        else {
                            tBoneSlot.showDisplayByIndex(tBoneSlot.displayIndex);
                        }
                    }
                }
            }
            return true;
        }
        return false;
    }
    getSkinIndexByName(skinName) {
        for (let i = 0, n = this.skinDataArray.length; i < n; i++) {
            let tSkinData = this.skinDataArray[i];
            if (tSkinData.name == skinName) {
                return i;
            }
        }
        return -1;
    }
    getGrahicsDataWithCache(aniIndex, frameIndex) {
        if (this._graphicsCache[aniIndex] && this._graphicsCache[aniIndex][frameIndex]) {
            return this._graphicsCache[aniIndex][frameIndex];
        }
        return null;
    }
    setGrahicsDataWithCache(aniIndex, frameIndex, graphics) {
        this._graphicsCache[aniIndex][frameIndex] = graphics;
    }
    deleteAniData(aniIndex) {
        if (this._anis[aniIndex]) {
            var tAniDataO = this._anis[aniIndex];
            tAniDataO.bone3DMap = null;
            tAniDataO.nodes = null;
        }
    }
    _disposeResource() {
        var _a;
        for (let k in this.subTextureDic) {
            (_a = this.subTextureDic[k]) === null || _a === void 0 ? void 0 : _a.destroy();
        }
        this._mainTexture._removeReference();
        var tSkinSlotDisplayData;
        for (var i = 0, n = this.skinSlotDisplayDataArr.length; i < n; i++) {
            tSkinSlotDisplayData = this.skinSlotDisplayDataArr[i];
            tSkinSlotDisplayData.destory();
        }
        this.skinSlotDisplayDataArr.length = 0;
    }
    getAniNameByIndex(index) {
        var tAni = this.getAnimation(index);
        if (tAni)
            return tAni.name;
        return null;
    }
}
IAniLib.Templet = Templet;

//# sourceMappingURL=Templet.js.map
