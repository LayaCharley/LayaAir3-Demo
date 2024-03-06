import { MathUtil } from "../../../maths/MathUtil";
import { Resource } from "../../../resource/Resource";
import { Stat } from "../../../utils/Stat";
import { VertexShurikenParticleBillboard } from "../../graphics/Vertex/VertexShurikenParticleBillboard";
import { VertexShurikenParticleMesh } from "../../graphics/Vertex/VertexShurikenParticleMesh";
import { Rand } from "../../math/Rand";
import { GeometryElement } from "../GeometryElement";
import { Emission } from "./module/Emission";
import { GradientDataNumber } from "./module/GradientDataNumber";
import { ParticleSystemShapeType } from "./module/shape/BaseShape";
import { ShuriKenParticle3DShaderDeclaration } from "./ShuriKenParticle3DShaderDeclaration";
import { ShurikenParticleData } from "./ShurikenParticleData";
import { VertexShuriKenParticle } from "../../graphics/Vertex/VertexShuriKenParticle";
import { BufferUsage } from "../../../RenderEngine/RenderEnum/BufferTargetType";
import { MeshTopology } from "../../../RenderEngine/RenderEnum/RenderPologyMode";
import { DrawType } from "../../../RenderEngine/RenderEnum/DrawType";
import { LayaGL } from "../../../layagl/LayaGL";
import { IndexFormat } from "../../../RenderEngine/RenderEnum/IndexFormat";
import { Bounds } from "../../math/Bounds";
import { Vector2 } from "../../../maths/Vector2";
import { Vector3 } from "../../../maths/Vector3";
import { Vector4 } from "../../../maths/Vector4";
import { BufferState } from "../../../webgl/utils/BufferState";
import { VertexMesh } from "../../../RenderEngine/RenderShader/VertexMesh";
export class ShurikenParticleSystem extends GeometryElement {
    constructor(render, meshTopology = MeshTopology.Triangles, drawType = DrawType.DrawElement) {
        super(meshTopology, drawType);
        this._bounds = null;
        this._gravityOffset = new Vector2();
        this._customBounds = null;
        this._useCustomBounds = false;
        this._owner = null;
        this._ownerRender = null;
        this._vertices = null;
        this._floatCountPerVertex = 0;
        this._startLifeTimeIndex = 0;
        this._timeIndex = 0;
        this._simulationUV_Index = 0;
        this._simulateUpdate = false;
        this._firstActiveElement = 0;
        this._firstNewElement = 0;
        this._firstFreeElement = 0;
        this._firstRetiredElement = 0;
        this._drawCounter = 0;
        this._bufferMaxParticles = 0;
        this._emission = null;
        this._shape = null;
        this._isEmitting = false;
        this._isPlaying = false;
        this._isPaused = false;
        this._playStartDelay = 0;
        this._frameRateTime = 0;
        this._emissionTime = 0;
        this._totalDelayTime = 0;
        this._emissionDistance = 0;
        this._emissionLastPosition = new Vector3();
        this._burstsIndex = 0;
        this._velocityOverLifetime = null;
        this._colorOverLifetime = null;
        this._sizeOverLifetime = null;
        this._rotationOverLifetime = null;
        this._textureSheetAnimation = null;
        this._startLifetimeType = 0;
        this._startLifetimeConstant = 0;
        this._startLifeTimeGradient = null;
        this._startLifetimeConstantMin = 0;
        this._startLifetimeConstantMax = 0;
        this._startLifeTimeGradientMin = null;
        this._startLifeTimeGradientMax = null;
        this._maxStartLifetime = 0;
        this._uvLength = new Vector2();
        this._vertexStride = 0;
        this._indexStride = 0;
        this._vertexBuffer = null;
        this._indexBuffer = null;
        this._bufferState = new BufferState();
        this._updateMask = 0;
        this._currentTime = 0;
        this._startUpdateLoopCount = 0;
        this._rand = null;
        this._randomSeeds = null;
        this.duration = 0;
        this.looping = false;
        this.prewarm = false;
        this.startDelayType = 0;
        this.startDelay = 0;
        this.startDelayMin = 0;
        this.startDelayMax = 0;
        this.startSpeedType = 0;
        this.startSpeedConstant = 0;
        this.startSpeedConstantMin = 0;
        this.startSpeedConstantMax = 0;
        this.dragType = 0;
        this.dragConstant = 0;
        this.dragSpeedConstantMin = 0;
        this.dragSpeedConstantMax = 0;
        this.threeDStartSize = false;
        this.startSizeType = 0;
        this.startSizeConstant = 0;
        this.startSizeConstantSeparate = null;
        this.startSizeConstantMin = 0;
        this.startSizeConstantMax = 0;
        this.startSizeConstantMinSeparate = null;
        this.startSizeConstantMaxSeparate = null;
        this.threeDStartRotation = false;
        this.startRotationType = 0;
        this.startRotationConstant = 0;
        this.startRotationConstantSeparate = null;
        this.startRotationConstantMin = 0;
        this.startRotationConstantMax = 0;
        this.startRotationConstantMinSeparate = null;
        this.startRotationConstantMaxSeparate = null;
        this.randomizeRotationDirection = 0;
        this.startColorType = 0;
        this.startColorConstant = new Vector4(1, 1, 1, 1);
        this.startColorConstantMin = new Vector4(0, 0, 0, 0);
        this.startColorConstantMax = new Vector4(1, 1, 1, 1);
        this.gravityModifier = 0;
        this.simulationSpace = 0;
        this.simulationSpeed = 1.0;
        this.scaleMode = 1;
        this.playOnAwake = false;
        this.randomSeed = null;
        this.autoRandomSeed = false;
        this.isPerformanceMode = false;
        this.indexFormat = IndexFormat.UInt16;
        this._firstActiveElement = 0;
        this._firstNewElement = 0;
        this._firstFreeElement = 0;
        this._firstRetiredElement = 0;
        this._owner = render.owner;
        this._ownerRender = render;
        this._useCustomBounds = false;
        this._currentTime = 0;
        this._bounds = new Bounds(new Vector3(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE), new Vector3(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE));
        this.bufferState = this._bufferState = new BufferState();
        this._isEmitting = false;
        this._isPlaying = false;
        this._isPaused = false;
        this._burstsIndex = 0;
        this._frameRateTime = 0;
        this._emissionTime = 0;
        this._totalDelayTime = 0;
        this._simulateUpdate = false;
        this._bufferMaxParticles = 1;
        this.duration = 5.0;
        this.looping = true;
        this.prewarm = false;
        this.startDelayType = 0;
        this.startDelay = 0.0;
        this.startDelayMin = 0.0;
        this.startDelayMax = 0.0;
        this._startLifetimeType = 0;
        this._startLifetimeConstant = 5.0;
        this._startLifeTimeGradient = new GradientDataNumber();
        this._startLifetimeConstantMin = 0.0;
        this._startLifetimeConstantMax = 5.0;
        this._startLifeTimeGradientMin = new GradientDataNumber();
        this._startLifeTimeGradientMax = new GradientDataNumber();
        this._maxStartLifetime = 5.0;
        this.startSpeedType = 0;
        this.startSpeedConstant = 5.0;
        this.startSpeedConstantMin = 0.0;
        this.startSpeedConstantMax = 5.0;
        this.dragType = 0;
        this.dragConstant = 0;
        this.dragSpeedConstantMin = 0;
        this.dragSpeedConstantMax = 0;
        this.threeDStartSize = false;
        this.startSizeType = 0;
        this.startSizeConstant = 1;
        this.startSizeConstantSeparate = new Vector3(1, 1, 1);
        this.startSizeConstantMin = 0;
        this.startSizeConstantMax = 1;
        this.startSizeConstantMinSeparate = new Vector3(0, 0, 0);
        this.startSizeConstantMaxSeparate = new Vector3(1, 1, 1);
        this.threeDStartRotation = false;
        this.startRotationType = 0;
        this.startRotationConstant = 0;
        this.startRotationConstantSeparate = new Vector3(0, 0, 0);
        this.startRotationConstantMin = 0.0;
        this.startRotationConstantMax = 0.0;
        this.startRotationConstantMinSeparate = new Vector3(0, 0, 0);
        this.startRotationConstantMaxSeparate = new Vector3(0, 0, 0);
        this.gravityModifier = 0.0;
        this.simulationSpace = 1;
        this.scaleMode = 1;
        this.playOnAwake = true;
        this._rand = new Rand(0);
        this.autoRandomSeed = true;
        this.randomSeed = new Uint32Array(1);
        this._randomSeeds = new Uint32Array(ShurikenParticleSystem._RANDOMOFFSET.length);
        this.isPerformanceMode = true;
        this._emission = new Emission();
        this._emission.enable = true;
    }
    get maxParticles() {
        return this._bufferMaxParticles - 1;
    }
    set maxParticles(value) {
        var newMaxParticles = value + 1;
        if (newMaxParticles !== this._bufferMaxParticles) {
            this._bufferMaxParticles = newMaxParticles;
            this._initBufferDatas();
        }
        this._updateParticlesSimulationRestart(0);
    }
    get emission() {
        return this._emission;
    }
    get aliveParticleCount() {
        if (this._firstNewElement >= this._firstRetiredElement)
            return this._firstNewElement - this._firstRetiredElement;
        else
            return this._bufferMaxParticles - this._firstRetiredElement + this._firstNewElement;
    }
    get emissionTime() {
        return this._emissionTime > this.duration ? this.duration : this._emissionTime;
    }
    get shape() {
        return this._shape;
    }
    set shape(value) {
        if (this._shape !== value) {
            if (value && value.enable)
                this._ownerRender._shaderValues.addDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_SHAPE);
            else
                this._ownerRender._shaderValues.removeDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_SHAPE);
            this._shape = value;
        }
    }
    get isAlive() {
        if (this._isPlaying || this.aliveParticleCount > 0)
            return true;
        return false;
    }
    get isEmitting() {
        return this._isEmitting;
    }
    get isPlaying() {
        return this._isPlaying;
    }
    get isPaused() {
        return this._isPaused;
    }
    get startLifetimeType() {
        return this._startLifetimeType;
    }
    set startLifetimeType(value) {
        var i, n;
        switch (this.startLifetimeType) {
            case 0:
                this._maxStartLifetime = this.startLifetimeConstant;
                break;
            case 1:
                this._maxStartLifetime = -Number.MAX_VALUE;
                var startLifeTimeGradient = startLifeTimeGradient;
                for (i = 0, n = startLifeTimeGradient.gradientCount; i < n; i++)
                    this._maxStartLifetime = Math.max(this._maxStartLifetime, startLifeTimeGradient.getValueByIndex(i));
                break;
            case 2:
                this._maxStartLifetime = Math.max(this.startLifetimeConstantMin, this.startLifetimeConstantMax);
                break;
            case 3:
                this._maxStartLifetime = -Number.MAX_VALUE;
                var startLifeTimeGradientMin = startLifeTimeGradientMin;
                for (i = 0, n = startLifeTimeGradientMin.gradientCount; i < n; i++)
                    this._maxStartLifetime = Math.max(this._maxStartLifetime, startLifeTimeGradientMin.getValueByIndex(i));
                var startLifeTimeGradientMax = startLifeTimeGradientMax;
                for (i = 0, n = startLifeTimeGradientMax.gradientCount; i < n; i++)
                    this._maxStartLifetime = Math.max(this._maxStartLifetime, startLifeTimeGradientMax.getValueByIndex(i));
                break;
        }
        this._startLifetimeType = value;
    }
    get startLifetimeConstant() {
        return this._startLifetimeConstant;
    }
    set startLifetimeConstant(value) {
        if (this._startLifetimeType === 0)
            this._maxStartLifetime = value;
        this._startLifetimeConstant = value;
    }
    get startLifeTimeGradient() {
        return this._startLifeTimeGradient;
    }
    set startLifeTimeGradient(value) {
        if (this._startLifetimeType === 1) {
            this._maxStartLifetime = -Number.MAX_VALUE;
            for (var i = 0, n = value.gradientCount; i < n; i++)
                this._maxStartLifetime = Math.max(this._maxStartLifetime, value.getValueByIndex(i));
        }
        this._startLifeTimeGradient = value;
    }
    get startLifetimeConstantMin() {
        return this._startLifetimeConstantMin;
    }
    set startLifetimeConstantMin(value) {
        if (this._startLifetimeType === 2)
            this._maxStartLifetime = Math.max(value, this._startLifetimeConstantMax);
        this._startLifetimeConstantMin = value;
    }
    get startLifetimeConstantMax() {
        return this._startLifetimeConstantMax;
    }
    set startLifetimeConstantMax(value) {
        if (this._startLifetimeType === 2)
            this._maxStartLifetime = Math.max(this._startLifetimeConstantMin, value);
        this._startLifetimeConstantMax = value;
    }
    get startLifeTimeGradientMin() {
        return this._startLifeTimeGradientMin;
    }
    set startLifeTimeGradientMin(value) {
        if (this._startLifetimeType === 3) {
            var i, n;
            this._maxStartLifetime = -Number.MAX_VALUE;
            for (i = 0, n = value.gradientCount; i < n; i++)
                this._maxStartLifetime = Math.max(this._maxStartLifetime, value.getValueByIndex(i));
            for (i = 0, n = this._startLifeTimeGradientMax.gradientCount; i < n; i++)
                this._maxStartLifetime = Math.max(this._maxStartLifetime, this._startLifeTimeGradientMax.getValueByIndex(i));
        }
        this._startLifeTimeGradientMin = value;
    }
    get startLifeTimeGradientMax() {
        return this._startLifeTimeGradientMax;
    }
    set startLifeTimeGradientMax(value) {
        if (this._startLifetimeType === 3) {
            var i, n;
            this._maxStartLifetime = -Number.MAX_VALUE;
            for (i = 0, n = this._startLifeTimeGradientMin.gradientCount; i < n; i++)
                this._maxStartLifetime = Math.max(this._maxStartLifetime, this._startLifeTimeGradientMin.getValueByIndex(i));
            for (i = 0, n = value.gradientCount; i < n; i++)
                this._maxStartLifetime = Math.max(this._maxStartLifetime, value.getValueByIndex(i));
        }
        this._startLifeTimeGradientMax = value;
    }
    get velocityOverLifetime() {
        return this._velocityOverLifetime;
    }
    set velocityOverLifetime(value) {
        var shaDat = this._ownerRender._shaderValues;
        shaDat.removeDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_VELOCITYOVERLIFETIMECONSTANT);
        shaDat.removeDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_VELOCITYOVERLIFETIMECURVE);
        shaDat.removeDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_VELOCITYOVERLIFETIMERANDOMCONSTANT);
        shaDat.removeDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_VELOCITYOVERLIFETIMERANDOMCURVE);
        this._velocityOverLifetime = value;
        if (value) {
            var velocity = value.velocity;
            var velocityType = velocity.type;
            if (value.enable) {
                switch (velocityType) {
                    case 0:
                        shaDat.addDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_VELOCITYOVERLIFETIMECONSTANT);
                        shaDat.setVector3(ShuriKenParticle3DShaderDeclaration.VOLVELOCITYCONST, velocity.constant);
                        break;
                    case 1:
                        shaDat.addDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_VELOCITYOVERLIFETIMECURVE);
                        shaDat.setBuffer(ShuriKenParticle3DShaderDeclaration.VOLVELOCITYGRADIENTX, velocity.gradientX._elements);
                        shaDat.setBuffer(ShuriKenParticle3DShaderDeclaration.VOLVELOCITYGRADIENTY, velocity.gradientY._elements);
                        shaDat.setBuffer(ShuriKenParticle3DShaderDeclaration.VOLVELOCITYGRADIENTZ, velocity.gradientZ._elements);
                        break;
                    case 2:
                        shaDat.addDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_VELOCITYOVERLIFETIMERANDOMCONSTANT);
                        shaDat.setVector3(ShuriKenParticle3DShaderDeclaration.VOLVELOCITYCONST, velocity.constantMin);
                        shaDat.setVector3(ShuriKenParticle3DShaderDeclaration.VOLVELOCITYCONSTMAX, velocity.constantMax);
                        break;
                    case 3:
                        shaDat.addDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_VELOCITYOVERLIFETIMERANDOMCURVE);
                        shaDat.setBuffer(ShuriKenParticle3DShaderDeclaration.VOLVELOCITYGRADIENTX, velocity.gradientXMin._elements);
                        shaDat.setBuffer(ShuriKenParticle3DShaderDeclaration.VOLVELOCITYGRADIENTXMAX, velocity.gradientXMax._elements);
                        shaDat.setBuffer(ShuriKenParticle3DShaderDeclaration.VOLVELOCITYGRADIENTY, velocity.gradientYMin._elements);
                        shaDat.setBuffer(ShuriKenParticle3DShaderDeclaration.VOLVELOCITYGRADIENTYMAX, velocity.gradientYMax._elements);
                        shaDat.setBuffer(ShuriKenParticle3DShaderDeclaration.VOLVELOCITYGRADIENTZ, velocity.gradientZMin._elements);
                        shaDat.setBuffer(ShuriKenParticle3DShaderDeclaration.VOLVELOCITYGRADIENTZMAX, velocity.gradientZMax._elements);
                        break;
                    default:
                        break;
                }
            }
            shaDat.setInt(ShuriKenParticle3DShaderDeclaration.VOLSPACETYPE, value.space);
        }
    }
    get colorOverLifetime() {
        return this._colorOverLifetime;
    }
    set colorOverLifetime(value) {
        var shaDat = this._ownerRender._shaderValues;
        shaDat.removeDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_COLOROVERLIFETIME);
        shaDat.removeDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_RANDOMCOLOROVERLIFETIME);
        this._colorOverLifetime = value;
        if (value) {
            var color = value.color;
            if (value.enable) {
                switch (color.type) {
                    case 1:
                        shaDat.addDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_COLOROVERLIFETIME);
                        let gradientColor = color.gradient;
                        shaDat.setBuffer(ShuriKenParticle3DShaderDeclaration.COLOROVERLIFEGRADIENTALPHAS, gradientColor._alphaElements);
                        shaDat.setBuffer(ShuriKenParticle3DShaderDeclaration.COLOROVERLIFEGRADIENTCOLORS, gradientColor._rgbElements);
                        let ranges = gradientColor._keyRanges;
                        ranges.setValue(1, 0, 1, 0);
                        for (let index = 0; index < gradientColor.colorRGBKeysCount; index++) {
                            let colorKey = gradientColor._rgbElements[index * 4];
                            ranges.x = Math.min(ranges.x, colorKey);
                            ranges.y = Math.max(ranges.y, colorKey);
                        }
                        for (let index = 0; index < gradientColor.colorAlphaKeysCount; index++) {
                            let alphaKey = gradientColor._alphaElements[index * 2];
                            ranges.z = Math.min(ranges.z, alphaKey);
                            ranges.w = Math.max(ranges.w, alphaKey);
                        }
                        shaDat.setVector(ShuriKenParticle3DShaderDeclaration.COLOROVERLIFEGRADIENTRANGES, ranges);
                        if (gradientColor.maxColorAlphaKeysCount == 8) {
                            shaDat.addDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_COLORKEYCOUNT_8);
                        }
                        else {
                            shaDat.removeDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_COLORKEYCOUNT_8);
                        }
                        break;
                    case 3:
                        shaDat.addDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_RANDOMCOLOROVERLIFETIME);
                        let minGradientColor = color.gradientMin;
                        let maxGradientColor = color.gradientMax;
                        shaDat.setBuffer(ShuriKenParticle3DShaderDeclaration.COLOROVERLIFEGRADIENTALPHAS, minGradientColor._alphaElements);
                        shaDat.setBuffer(ShuriKenParticle3DShaderDeclaration.COLOROVERLIFEGRADIENTCOLORS, minGradientColor._rgbElements);
                        shaDat.setBuffer(ShuriKenParticle3DShaderDeclaration.MAXCOLOROVERLIFEGRADIENTALPHAS, maxGradientColor._alphaElements);
                        shaDat.setBuffer(ShuriKenParticle3DShaderDeclaration.MAXCOLOROVERLIFEGRADIENTCOLORS, maxGradientColor._rgbElements);
                        let minRanges = minGradientColor._keyRanges;
                        minRanges.setValue(1, 0, 1, 0);
                        for (let index = 0; index < minGradientColor.colorRGBKeysCount; index++) {
                            let colorKey = minGradientColor._rgbElements[index * 4];
                            minRanges.x = Math.min(minRanges.x, colorKey);
                            minRanges.y = Math.max(minRanges.y, colorKey);
                        }
                        for (let index = 0; index < minGradientColor.colorAlphaKeysCount; index++) {
                            let alphaKey = minGradientColor._alphaElements[index * 2];
                            minRanges.z = Math.min(minRanges.z, alphaKey);
                            minRanges.w = Math.max(minRanges.w, alphaKey);
                        }
                        shaDat.setVector(ShuriKenParticle3DShaderDeclaration.COLOROVERLIFEGRADIENTRANGES, minRanges);
                        let maxRanges = maxGradientColor._keyRanges;
                        maxRanges.setValue(1, 0, 1, 0);
                        for (let index = 0; index < maxGradientColor.colorRGBKeysCount; index++) {
                            let colorKey = maxGradientColor._rgbElements[index * 4];
                            maxRanges.x = Math.min(maxRanges.x, colorKey);
                            maxRanges.y = Math.max(maxRanges.y, colorKey);
                        }
                        for (let index = 0; index < maxGradientColor.colorAlphaKeysCount; index++) {
                            let alphaKey = maxGradientColor._alphaElements[index * 2];
                            maxRanges.z = Math.min(maxRanges.z, alphaKey);
                            maxRanges.w = Math.max(maxRanges.w, alphaKey);
                        }
                        shaDat.setVector(ShuriKenParticle3DShaderDeclaration.MAXCOLOROVERLIFEGRADIENTRANGES, maxRanges);
                        let maxkeyCount = Math.max(minGradientColor.maxColorAlphaKeysCount, maxGradientColor.maxColorAlphaKeysCount);
                        if (maxkeyCount == 8) {
                            shaDat.addDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_COLORKEYCOUNT_8);
                        }
                        else {
                            shaDat.removeDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_COLORKEYCOUNT_8);
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    }
    get sizeOverLifetime() {
        return this._sizeOverLifetime;
    }
    set sizeOverLifetime(value) {
        var shaDat = this._ownerRender._shaderValues;
        shaDat.removeDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_SIZEOVERLIFETIMECURVE);
        shaDat.removeDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_SIZEOVERLIFETIMECURVESEPERATE);
        shaDat.removeDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_SIZEOVERLIFETIMERANDOMCURVES);
        shaDat.removeDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_SIZEOVERLIFETIMERANDOMCURVESSEPERATE);
        this._sizeOverLifetime = value;
        if (value) {
            var size = value.size;
            var sizeSeparate = size.separateAxes;
            var sizeType = size.type;
            if (value.enable) {
                switch (sizeType) {
                    case 0:
                        if (sizeSeparate) {
                            shaDat.addDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_SIZEOVERLIFETIMECURVESEPERATE);
                            shaDat.setBuffer(ShuriKenParticle3DShaderDeclaration.SOLSIZEGRADIENTX, size.gradientX._elements);
                            shaDat.setBuffer(ShuriKenParticle3DShaderDeclaration.SOLSIZEGRADIENTY, size.gradientY._elements);
                            shaDat.setBuffer(ShuriKenParticle3DShaderDeclaration.SOLSizeGradientZ, size.gradientZ._elements);
                        }
                        else {
                            shaDat.addDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_SIZEOVERLIFETIMECURVE);
                            shaDat.setBuffer(ShuriKenParticle3DShaderDeclaration.SOLSIZEGRADIENT, size.gradient._elements);
                        }
                        break;
                    case 2:
                        if (sizeSeparate) {
                            shaDat.addDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_SIZEOVERLIFETIMERANDOMCURVESSEPERATE);
                            shaDat.setBuffer(ShuriKenParticle3DShaderDeclaration.SOLSIZEGRADIENTX, size.gradientXMin._elements);
                            shaDat.setBuffer(ShuriKenParticle3DShaderDeclaration.SOLSIZEGRADIENTXMAX, size.gradientXMax._elements);
                            shaDat.setBuffer(ShuriKenParticle3DShaderDeclaration.SOLSIZEGRADIENTY, size.gradientYMin._elements);
                            shaDat.setBuffer(ShuriKenParticle3DShaderDeclaration.SOLSIZEGRADIENTYMAX, size.gradientYMax._elements);
                            shaDat.setBuffer(ShuriKenParticle3DShaderDeclaration.SOLSizeGradientZ, size.gradientZMin._elements);
                            shaDat.setBuffer(ShuriKenParticle3DShaderDeclaration.SOLSizeGradientZMAX, size.gradientZMax._elements);
                        }
                        else {
                            shaDat.addDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_SIZEOVERLIFETIMERANDOMCURVES);
                            shaDat.setBuffer(ShuriKenParticle3DShaderDeclaration.SOLSIZEGRADIENT, size.gradientMin._elements);
                            shaDat.setBuffer(ShuriKenParticle3DShaderDeclaration.SOLSizeGradientMax, size.gradientMax._elements);
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    }
    get rotationOverLifetime() {
        return this._rotationOverLifetime;
    }
    set rotationOverLifetime(value) {
        var shaDat = this._ownerRender._shaderValues;
        shaDat.removeDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_ROTATIONOVERLIFETIME);
        shaDat.removeDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_ROTATIONOVERLIFETIMESEPERATE);
        shaDat.removeDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_ROTATIONOVERLIFETIMECONSTANT);
        shaDat.removeDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_ROTATIONOVERLIFETIMECURVE);
        shaDat.removeDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_ROTATIONOVERLIFETIMERANDOMCONSTANTS);
        shaDat.removeDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_ROTATIONOVERLIFETIMERANDOMCURVES);
        this._rotationOverLifetime = value;
        if (value) {
            var rotation = value.angularVelocity;
            if (!rotation)
                return;
            var rotationSeparate = rotation.separateAxes;
            var rotationType = rotation.type;
            if (value.enable) {
                if (rotationSeparate) {
                    shaDat.addDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_ROTATIONOVERLIFETIMESEPERATE);
                }
                else {
                    shaDat.addDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_ROTATIONOVERLIFETIME);
                }
                switch (rotationType) {
                    case 0:
                        shaDat.addDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_ROTATIONOVERLIFETIMECONSTANT);
                        if (rotationSeparate) {
                            shaDat.setVector3(ShuriKenParticle3DShaderDeclaration.ROLANGULARVELOCITYCONSTSEPRARATE, rotation.constantSeparate);
                        }
                        else {
                            shaDat.setNumber(ShuriKenParticle3DShaderDeclaration.ROLANGULARVELOCITYCONST, rotation.constant);
                        }
                        break;
                    case 1:
                        shaDat.addDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_ROTATIONOVERLIFETIMECURVE);
                        if (rotationSeparate) {
                            shaDat.setBuffer(ShuriKenParticle3DShaderDeclaration.ROLANGULARVELOCITYGRADIENTX, rotation.gradientX._elements);
                            shaDat.setBuffer(ShuriKenParticle3DShaderDeclaration.ROLANGULARVELOCITYGRADIENTY, rotation.gradientY._elements);
                            shaDat.setBuffer(ShuriKenParticle3DShaderDeclaration.ROLANGULARVELOCITYGRADIENTZ, rotation.gradientZ._elements);
                        }
                        else {
                            shaDat.setBuffer(ShuriKenParticle3DShaderDeclaration.ROLANGULARVELOCITYGRADIENT, rotation.gradient._elements);
                        }
                        break;
                    case 2:
                        shaDat.addDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_ROTATIONOVERLIFETIMERANDOMCONSTANTS);
                        if (rotationSeparate) {
                            shaDat.setVector3(ShuriKenParticle3DShaderDeclaration.ROLANGULARVELOCITYCONSTSEPRARATE, rotation.constantMinSeparate);
                            shaDat.setVector3(ShuriKenParticle3DShaderDeclaration.ROLANGULARVELOCITYCONSTMAXSEPRARATE, rotation.constantMaxSeparate);
                        }
                        else {
                            shaDat.setNumber(ShuriKenParticle3DShaderDeclaration.ROLANGULARVELOCITYCONST, rotation.constantMin);
                            shaDat.setNumber(ShuriKenParticle3DShaderDeclaration.ROLANGULARVELOCITYCONSTMAX, rotation.constantMax);
                        }
                        break;
                    case 3:
                        shaDat.addDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_ROTATIONOVERLIFETIMERANDOMCURVES);
                        if (rotationSeparate) {
                            shaDat.setBuffer(ShuriKenParticle3DShaderDeclaration.ROLANGULARVELOCITYGRADIENTX, rotation.gradientXMin._elements);
                            shaDat.setBuffer(ShuriKenParticle3DShaderDeclaration.ROLANGULARVELOCITYGRADIENTXMAX, rotation.gradientXMax._elements);
                            shaDat.setBuffer(ShuriKenParticle3DShaderDeclaration.ROLANGULARVELOCITYGRADIENTY, rotation.gradientYMin._elements);
                            shaDat.setBuffer(ShuriKenParticle3DShaderDeclaration.ROLANGULARVELOCITYGRADIENTYMAX, rotation.gradientYMax._elements);
                            shaDat.setBuffer(ShuriKenParticle3DShaderDeclaration.ROLANGULARVELOCITYGRADIENTZ, rotation.gradientZMin._elements);
                            shaDat.setBuffer(ShuriKenParticle3DShaderDeclaration.ROLANGULARVELOCITYGRADIENTZMAX, rotation.gradientZMax._elements);
                        }
                        else {
                            shaDat.setBuffer(ShuriKenParticle3DShaderDeclaration.ROLANGULARVELOCITYGRADIENT, rotation.gradientMin._elements);
                            shaDat.setBuffer(ShuriKenParticle3DShaderDeclaration.ROLANGULARVELOCITYGRADIENTMAX, rotation.gradientMax._elements);
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    }
    get textureSheetAnimation() {
        return this._textureSheetAnimation;
    }
    set textureSheetAnimation(value) {
        var shaDat = this._ownerRender._shaderValues;
        shaDat.removeDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_TEXTURESHEETANIMATIONCURVE);
        shaDat.removeDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_TEXTURESHEETANIMATIONRANDOMCURVE);
        this._textureSheetAnimation = value;
        if (value) {
            var frameOverTime = value.frame;
            var textureAniType = frameOverTime.type;
            if (value.enable) {
                switch (textureAniType) {
                    case 1:
                        shaDat.addDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_TEXTURESHEETANIMATIONCURVE);
                        shaDat.setNumber(ShuriKenParticle3DShaderDeclaration.TEXTURESHEETANIMATIONCYCLES, value.cycles);
                        var title = value.tiles;
                        var _uvLengthE = this._uvLength;
                        _uvLengthE.x = 1.0 / title.x;
                        _uvLengthE.y = 1.0 / title.y;
                        shaDat.setVector2(ShuriKenParticle3DShaderDeclaration.TEXTURESHEETANIMATIONSUBUVLENGTH, this._uvLength);
                        shaDat.setBuffer(ShuriKenParticle3DShaderDeclaration.TEXTURESHEETANIMATIONGRADIENTUVS, frameOverTime.frameOverTimeData._elements);
                        break;
                    case 3:
                        shaDat.addDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_TEXTURESHEETANIMATIONRANDOMCURVE);
                        shaDat.setNumber(ShuriKenParticle3DShaderDeclaration.TEXTURESHEETANIMATIONCYCLES, value.cycles);
                        var title = value.tiles;
                        var _uvLengthE = this._uvLength;
                        _uvLengthE.x = 1.0 / title.x;
                        _uvLengthE.y = 1.0 / title.y;
                        shaDat.setVector2(ShuriKenParticle3DShaderDeclaration.TEXTURESHEETANIMATIONSUBUVLENGTH, this._uvLength);
                        shaDat.setBuffer(ShuriKenParticle3DShaderDeclaration.TEXTURESHEETANIMATIONGRADIENTUVS, frameOverTime.frameOverTimeDataMin._elements);
                        shaDat.setBuffer(ShuriKenParticle3DShaderDeclaration.TEXTURESHEETANIMATIONGRADIENTMAXUVS, frameOverTime.frameOverTimeDataMax._elements);
                        break;
                    default:
                        break;
                }
            }
        }
    }
    _getVertexBuffer(index = 0) {
        if (index === 0)
            return this._vertexBuffer;
        else
            return null;
    }
    _getIndexBuffer() {
        return this._indexBuffer;
    }
    _generateBounds() {
        var particleRender = this._ownerRender;
        var boundsMin = this._bounds.getMin();
        var boundsMax = this._bounds.getMax();
        var time = 0;
        switch (this.startLifetimeType) {
            case 0:
                time = this._startLifetimeConstant;
                break;
            case 2:
                time = this._startLifetimeConstantMax;
                break;
            case 1:
            case 3:
            default:
                break;
        }
        var speedOrigan = 0;
        switch (this.startSpeedType) {
            case 0:
                speedOrigan = this.startSpeedConstant;
                break;
            case 2:
                speedOrigan = this.startSpeedConstantMax;
                break;
            case 1:
            case 3:
            default:
                break;
        }
        var maxSizeScale = 0;
        if (this.threeDStartSize) {
            switch (this.startSizeType) {
                case 0:
                    maxSizeScale = Math.max(this.startSizeConstantSeparate.x, this.startSizeConstantSeparate.y, this.startSizeConstantSeparate.z);
                    break;
                case 2:
                    maxSizeScale = Math.max(this.startSizeConstantMaxSeparate.x, this.startSizeConstantMaxSeparate.y, this.startSizeConstantMaxSeparate.z);
                    break;
                case 1:
                case 3:
                default:
                    break;
            }
        }
        else {
            switch (this.startSizeType) {
                case 0:
                    maxSizeScale = this.startSizeConstant;
                    break;
                case 2:
                    maxSizeScale = this.startSizeConstantMax;
                    break;
                case 1:
                case 3:
                default:
                    break;
            }
        }
        var zDirectionSpeed = ShurikenParticleSystem._tempVector30;
        var fDirectionSpeed = ShurikenParticleSystem._tempVector31;
        var zEmisionOffsetXYZ = ShurikenParticleSystem._tempVector32;
        var fEmisionOffsetXYZ = ShurikenParticleSystem._tempVector33;
        zDirectionSpeed.setValue(0, 0, 1);
        fDirectionSpeed.setValue(0, 0, 0);
        zEmisionOffsetXYZ.setValue(0, 0, 0);
        fEmisionOffsetXYZ.setValue(0, 0, 0);
        if (this.shape && this.shape.enable) {
            switch (this.shape.shapeType) {
                case ParticleSystemShapeType.Sphere:
                    var sphere = this.shape;
                    zDirectionSpeed.setValue(1, 1, 1);
                    fDirectionSpeed.setValue(1, 1, 1);
                    zEmisionOffsetXYZ.setValue(sphere.radius, sphere.radius, sphere.radius);
                    fEmisionOffsetXYZ.setValue(sphere.radius, sphere.radius, sphere.radius);
                    break;
                case ParticleSystemShapeType.Hemisphere:
                    var hemiShpere = this.shape;
                    zDirectionSpeed.setValue(1, 1, 1);
                    fDirectionSpeed.setValue(1, 1, 1);
                    zEmisionOffsetXYZ.setValue(hemiShpere.radius, hemiShpere.radius, hemiShpere.radius);
                    fEmisionOffsetXYZ.setValue(hemiShpere.radius, hemiShpere.radius, 0.0);
                    break;
                case ParticleSystemShapeType.Cone:
                    var cone = this.shape;
                    if (cone.emitType == 0 || cone.emitType == 1) {
                        var angle = cone.angle;
                        var sinAngle = Math.sin(angle);
                        zDirectionSpeed.setValue(sinAngle, sinAngle, 1.0);
                        fDirectionSpeed.setValue(sinAngle, sinAngle, 0.0);
                        zEmisionOffsetXYZ.setValue(cone.radius, cone.radius, 0.0);
                        fEmisionOffsetXYZ.setValue(cone.radius, cone.radius, 0.0);
                        break;
                    }
                    else if (cone.emitType == 2 || cone.emitType == 3) {
                        var angle = cone.angle;
                        var sinAngle = Math.sin(angle);
                        var coneLength = cone.length;
                        zDirectionSpeed.setValue(sinAngle, sinAngle, 1.0);
                        fDirectionSpeed.setValue(sinAngle, sinAngle, 0.0);
                        var tanAngle = Math.tan(angle);
                        var rPLCT = cone.radius + coneLength * tanAngle;
                        zEmisionOffsetXYZ.setValue(rPLCT, rPLCT, coneLength);
                        fEmisionOffsetXYZ.setValue(rPLCT, rPLCT, 0.0);
                    }
                    break;
                case ParticleSystemShapeType.Box:
                    var box = this.shape;
                    if (this.shape.randomDirection != 0) {
                        zDirectionSpeed.setValue(1, 1, 1);
                        fDirectionSpeed.setValue(1, 1, 1);
                    }
                    zEmisionOffsetXYZ.setValue(box.x / 2, box.y / 2, box.z / 2);
                    fEmisionOffsetXYZ.setValue(box.x / 2, box.y / 2, box.z / 2);
                    break;
                case ParticleSystemShapeType.Circle:
                    var circle = this.shape;
                    zDirectionSpeed.setValue(1, 1, 1);
                    fDirectionSpeed.setValue(1, 1, 1);
                    zEmisionOffsetXYZ.setValue(circle.radius, circle.radius, 0);
                    fEmisionOffsetXYZ.setValue(circle.radius, circle.radius, 0);
                    break;
                default:
                    break;
            }
        }
        var meshSize = 0;
        var meshMode = particleRender.renderMode == 4;
        switch (particleRender.renderMode) {
            case 0:
            case 1:
            case 2:
            case 3:
                meshSize = ShurikenParticleSystem.halfKSqrtOf2;
                break;
            case 4:
                var meshBounds = particleRender.mesh.bounds;
                meshSize = Math.sqrt(Math.pow(meshBounds.getExtent().x, 2.0) + Math.pow(meshBounds.getExtent().y, 2.0) + Math.pow(meshBounds.getExtent().z, 2.0));
                break;
            default:
                break;
        }
        var endSizeOffset = ShurikenParticleSystem._tempVector36;
        endSizeOffset.setValue(1, 1, 1);
        if (this.sizeOverLifetime && this.sizeOverLifetime.enable) {
            var gradientSize = this.sizeOverLifetime.size;
            var maxSize = gradientSize.getMaxSizeInGradient(meshMode);
            endSizeOffset.setValue(maxSize, maxSize, maxSize);
        }
        var offsetSize = meshSize * maxSizeScale;
        Vector3.scale(endSizeOffset, offsetSize, endSizeOffset);
        var speedZOffset = ShurikenParticleSystem._tempVector34;
        var speedFOffset = ShurikenParticleSystem._tempVector35;
        if (speedOrigan > 0) {
            Vector3.scale(zDirectionSpeed, speedOrigan, speedZOffset);
            Vector3.scale(fDirectionSpeed, speedOrigan, speedFOffset);
        }
        else {
            Vector3.scale(zDirectionSpeed, -speedOrigan, speedFOffset);
            Vector3.scale(fDirectionSpeed, -speedOrigan, speedZOffset);
        }
        if (this.velocityOverLifetime && this.velocityOverLifetime.enable) {
            var gradientVelocity = this.velocityOverLifetime.velocity;
            var velocitySpeedOffset = ShurikenParticleSystem._tempVector37;
            velocitySpeedOffset.setValue(0, 0, 0);
            switch (gradientVelocity.type) {
                case 0:
                    gradientVelocity.constant.cloneTo(velocitySpeedOffset);
                    break;
                case 2:
                    gradientVelocity.constantMax.cloneTo(velocitySpeedOffset);
                    break;
                case 1:
                    var curveX = gradientVelocity.gradientX.getAverageValue();
                    var curveY = gradientVelocity.gradientY.getAverageValue();
                    var curveZ = gradientVelocity.gradientZ.getAverageValue();
                    velocitySpeedOffset.setValue(curveX, curveY, curveZ);
                    break;
                case 3:
                    var xMax = gradientVelocity.gradientXMax.getAverageValue();
                    var yMax = gradientVelocity.gradientYMax.getAverageValue();
                    var zMax = gradientVelocity.gradientZMax.getAverageValue();
                    velocitySpeedOffset.setValue(xMax, yMax, zMax);
                    break;
                default:
                    break;
            }
            if (this.velocityOverLifetime.space == 1) {
                Vector3.transformV3ToV3(velocitySpeedOffset, this._owner.transform.worldMatrix, velocitySpeedOffset);
            }
            Vector3.add(speedZOffset, velocitySpeedOffset, speedZOffset);
            Vector3.subtract(speedFOffset, velocitySpeedOffset, speedFOffset);
            Vector3.max(speedZOffset, Vector3.ZERO, speedZOffset);
            Vector3.max(speedFOffset, Vector3.ZERO, speedFOffset);
        }
        Vector3.scale(speedZOffset, time, speedZOffset);
        Vector3.scale(speedFOffset, time, speedFOffset);
        var gravity = this.gravityModifier;
        if (gravity != 0) {
            var gravityOffset = 0.5 * ShurikenParticleSystem.g * gravity * time * time;
            var speedZOffsetY = speedZOffset.y - gravityOffset;
            var speedFOffsetY = speedFOffset.y + gravityOffset;
            speedZOffsetY = speedZOffsetY > 0 ? speedZOffsetY : 0;
            speedFOffsetY = speedFOffsetY > 0 ? speedFOffsetY : 0;
            this._gravityOffset.setValue(speedZOffset.y - speedZOffsetY, speedFOffsetY - speedFOffset.y);
        }
        Vector3.add(speedZOffset, endSizeOffset, boundsMax);
        Vector3.add(boundsMax, zEmisionOffsetXYZ, boundsMax);
        Vector3.add(speedFOffset, endSizeOffset, boundsMin);
        Vector3.add(boundsMin, fEmisionOffsetXYZ, boundsMin);
        Vector3.scale(boundsMin, -1, boundsMin);
        this._bounds.setMin(boundsMin);
        this._bounds.setMax(boundsMax);
    }
    get customBounds() {
        return this._customBounds;
    }
    set customBounds(value) {
        if (value) {
            this._useCustomBounds = true;
            if (!this._customBounds) {
                this._customBounds = new Bounds(new Vector3(), new Vector3());
                this._ownerRender.geometryBounds = this._customBounds;
            }
            this._customBounds = value;
        }
        else {
            this._useCustomBounds = false;
            this._customBounds = null;
            this._ownerRender.geometryBounds = null;
        }
    }
    _simulationSupported() {
        if (this.simulationSpace == 0 && this.emission.emissionRateOverDistance > 0) {
            return false;
        }
        return true;
    }
    _updateEmission() {
        if (!this.isAlive)
            return;
        if (this._simulateUpdate) {
            this._simulateUpdate = false;
        }
        else {
            var elapsedTime = ((this._startUpdateLoopCount !== Stat.loopCount && !this._isPaused) && this._owner._scene) ? this._owner._scene.timer._delta / 1000.0 : 0;
            elapsedTime = Math.min(ShurikenParticleSystem._maxElapsedTime, elapsedTime * this.simulationSpeed);
            this._updateParticles(elapsedTime);
        }
    }
    _updateParticles(elapsedTime) {
        if (this._ownerRender.renderMode === 4 && !this._ownerRender.mesh)
            return;
        this._currentTime += elapsedTime;
        this._retireActiveParticles();
        this._freeRetiredParticles();
        this._totalDelayTime += elapsedTime;
        if (this._totalDelayTime < this._playStartDelay) {
            return;
        }
        if (this._emission.enable && this._isEmitting && !this._isPaused) {
            this._advanceTime(elapsedTime, this._currentTime);
            if (this.emission.emissionRateOverDistance > 0) {
                this._advanceDistance(this._currentTime);
            }
        }
    }
    _updateParticlesSimulationRestart(time) {
        this._firstActiveElement = 0;
        this._firstNewElement = 0;
        this._firstFreeElement = 0;
        this._firstRetiredElement = 0;
        this._burstsIndex = 0;
        this._frameRateTime = time;
        this._emissionTime = 0;
        this._emissionDistance = 0;
        this._totalDelayTime = 0;
        this._currentTime = time;
        var delayTime = time;
        if (delayTime < this._playStartDelay) {
            this._totalDelayTime = delayTime;
            return;
        }
        if (this._emission.enable) {
            this._advanceTime(time, time);
            if (this.emission.emissionRateOverDistance > 0) {
                this._advanceDistance(this._currentTime);
            }
        }
    }
    _retireActiveParticles() {
        const epsilon = 0.0001;
        while (this._firstActiveElement != this._firstNewElement) {
            var index = this._firstActiveElement * this._floatCountPerVertex * this._vertexStride;
            var timeIndex = index + this._timeIndex;
            var particleAge = this._currentTime - this._vertices[timeIndex];
            if (particleAge + epsilon < this._vertices[index + this._startLifeTimeIndex])
                break;
            this._vertices[timeIndex] = this._drawCounter;
            this._firstActiveElement++;
            if (this._firstActiveElement >= this._bufferMaxParticles)
                this._firstActiveElement = 0;
        }
    }
    _freeRetiredParticles() {
        while (this._firstRetiredElement != this._firstActiveElement) {
            var age = this._drawCounter - this._vertices[this._firstRetiredElement * this._floatCountPerVertex * this._vertexStride + this._timeIndex];
            if (false)
                if (age < 3)
                    break;
            this._firstRetiredElement++;
            if (this._firstRetiredElement >= this._bufferMaxParticles)
                this._firstRetiredElement = 0;
        }
    }
    _burst(fromTime, toTime) {
        var totalEmitCount = 0;
        var bursts = this._emission._bursts;
        for (var n = bursts.length; this._burstsIndex < n; this._burstsIndex++) {
            var burst = bursts[this._burstsIndex];
            var burstTime = burst.time;
            if (fromTime <= burstTime && burstTime < toTime) {
                var emitCount;
                if (this.autoRandomSeed) {
                    emitCount = MathUtil.lerp(burst.minCount, burst.maxCount, Math.random());
                }
                else {
                    this._rand.seed = this._randomSeeds[0];
                    emitCount = MathUtil.lerp(burst.minCount, burst.maxCount, this._rand.getFloat());
                    this._randomSeeds[0] = this._rand.seed;
                }
                totalEmitCount += emitCount;
            }
            else {
                break;
            }
        }
        return totalEmitCount;
    }
    _advanceTime(elapsedTime, emitTime) {
        var i;
        var lastEmissionTime = this._emissionTime;
        this._emissionTime += elapsedTime;
        var totalEmitCount = 0;
        if (this._emissionTime > this.duration) {
            if (this.looping) {
                totalEmitCount += this._burst(lastEmissionTime, this._emissionTime);
                this._emissionTime -= this.duration;
                this._burstsIndex = 0;
                totalEmitCount += this._burst(0, this._emissionTime);
            }
            else {
                totalEmitCount = Math.min(this.maxParticles - this.aliveParticleCount, totalEmitCount);
                for (i = 0; i < totalEmitCount; i++)
                    this.emit(emitTime);
                this._isPlaying = false;
                this.stop();
                return;
            }
        }
        else {
            totalEmitCount += this._burst(lastEmissionTime, this._emissionTime);
        }
        totalEmitCount = Math.min(this.maxParticles - this.aliveParticleCount, totalEmitCount);
        for (i = 0; i < totalEmitCount; i++)
            this.emit(emitTime);
        var emissionRate = this.emission.emissionRate;
        if (emissionRate > 0) {
            var minEmissionTime = 1 / emissionRate;
            this._frameRateTime += minEmissionTime;
            this._frameRateTime = this._currentTime - (this._currentTime - this._frameRateTime) % this._maxStartLifetime;
            while (this._frameRateTime <= emitTime) {
                if (this.emit(this._frameRateTime))
                    this._frameRateTime += minEmissionTime;
                else
                    break;
            }
            this._frameRateTime = Math.floor(emitTime / minEmissionTime) * minEmissionTime;
        }
    }
    _advanceDistance(emitTime) {
        let position = this._owner.transform.position;
        let offsetDistance = Vector3.distance(position, this._emissionLastPosition);
        let rateOverDistance = this.emission.emissionRateOverDistance;
        let distance = this._emissionDistance + offsetDistance;
        let ed = 1.0 / rateOverDistance;
        if (distance > ed) {
            let emitCount = distance * rateOverDistance;
            emitCount = Math.floor(emitCount);
            emitCount = Math.min(this.maxParticles - this.aliveParticleCount, emitCount);
            for (let index = 0; index < emitCount; index++) {
                this.emit(emitTime);
            }
            this._emissionDistance = 0;
        }
        else {
            this._emissionDistance = distance;
        }
        position.cloneTo(this._emissionLastPosition);
    }
    _initBufferDatas() {
        if (this._vertexBuffer) {
            var memorySize = this._vertexBuffer._byteLength + this._indexBuffer.indexCount * 2;
            this._vertexBuffer.destroy();
            this._indexBuffer.destroy();
            Resource._addMemory(-memorySize, -memorySize);
        }
        var render = this._ownerRender;
        var renderMode = render.renderMode;
        if (renderMode !== -1 && this.maxParticles > 0) {
            var indices, i, j, m, indexOffset, perPartOffset, vertexDeclaration;
            var vbMemorySize = 0, memorySize = 0;
            var mesh = render.mesh;
            if (renderMode === 4) {
                if (mesh) {
                    vertexDeclaration = VertexShurikenParticleMesh.vertexDeclaration;
                    this._floatCountPerVertex = vertexDeclaration.vertexStride / 4;
                    this._simulationUV_Index = vertexDeclaration.getVertexElementByUsage(VertexShuriKenParticle.PARTICLE_SIMULATIONUV).offset / 4;
                    this._startLifeTimeIndex = 12;
                    this._timeIndex = 16;
                    this._vertexStride = mesh._vertexCount;
                    var totalVertexCount = this._bufferMaxParticles * this._vertexStride;
                    var vbCount = Math.floor(totalVertexCount / 65535) + 1;
                    var lastVBVertexCount = totalVertexCount % 65535;
                    if (vbCount > 1) {
                        throw new Error("ShurikenParticleSystem:the maxParticleCount multiply mesh vertexCount is large than 65535.");
                    }
                    vbMemorySize = vertexDeclaration.vertexStride * lastVBVertexCount;
                    this._vertexBuffer = LayaGL.renderOBJCreate.createVertexBuffer3D(vbMemorySize, BufferUsage.Dynamic, false);
                    this._vertexBuffer.vertexDeclaration = vertexDeclaration;
                    this._vertices = new Float32Array(this._floatCountPerVertex * lastVBVertexCount);
                    this._indexStride = mesh._indexBuffer.indexCount;
                    var indexDatas = mesh._indexBuffer.getData();
                    var indexCount = this._bufferMaxParticles * this._indexStride;
                    this._indexBuffer = LayaGL.renderOBJCreate.createIndexBuffer3D(IndexFormat.UInt16, indexCount, BufferUsage.Static, false);
                    indices = new Uint16Array(indexCount);
                    memorySize = vbMemorySize + indexCount * 2;
                    indexOffset = 0;
                    for (i = 0; i < this._bufferMaxParticles; i++) {
                        var indexValueOffset = i * this._vertexStride;
                        for (j = 0, m = indexDatas.length; j < m; j++)
                            indices[indexOffset++] = indexValueOffset + indexDatas[j];
                    }
                    this._indexBuffer.setData(indices);
                    this._bufferState.applyState([this._vertexBuffer], this._indexBuffer);
                    this.bufferState = this._bufferState;
                }
            }
            else {
                vertexDeclaration = VertexShurikenParticleBillboard.vertexDeclaration;
                this._floatCountPerVertex = vertexDeclaration.vertexStride / 4;
                this._startLifeTimeIndex = 7;
                this._simulationUV_Index = vertexDeclaration.getVertexElementByUsage(VertexShuriKenParticle.PARTICLE_SIMULATIONUV).offset / 4;
                this._timeIndex = 11;
                this._vertexStride = 4;
                vbMemorySize = vertexDeclaration.vertexStride * this._bufferMaxParticles * this._vertexStride;
                this._vertexBuffer = LayaGL.renderOBJCreate.createVertexBuffer3D(vbMemorySize, BufferUsage.Dynamic, false);
                this._vertexBuffer.vertexDeclaration = vertexDeclaration;
                this._vertices = new Float32Array(this._floatCountPerVertex * this._bufferMaxParticles * this._vertexStride);
                for (i = 0; i < this._bufferMaxParticles; i++) {
                    perPartOffset = i * this._floatCountPerVertex * this._vertexStride;
                    this._vertices[perPartOffset] = -0.5;
                    this._vertices[perPartOffset + 1] = -0.5;
                    this._vertices[perPartOffset + 2] = 0;
                    this._vertices[perPartOffset + 3] = 1;
                    perPartOffset += this._floatCountPerVertex;
                    this._vertices[perPartOffset] = 0.5;
                    this._vertices[perPartOffset + 1] = -0.5;
                    this._vertices[perPartOffset + 2] = 1;
                    this._vertices[perPartOffset + 3] = 1;
                    perPartOffset += this._floatCountPerVertex;
                    this._vertices[perPartOffset] = 0.5;
                    this._vertices[perPartOffset + 1] = 0.5;
                    this._vertices[perPartOffset + 2] = 1;
                    this._vertices[perPartOffset + 3] = 0;
                    perPartOffset += this._floatCountPerVertex;
                    this._vertices[perPartOffset] = -0.5;
                    this._vertices[perPartOffset + 1] = 0.5;
                    this._vertices[perPartOffset + 2] = 0;
                    this._vertices[perPartOffset + 3] = 0;
                }
                this._indexStride = 6;
                this._indexBuffer = LayaGL.renderOBJCreate.createIndexBuffer3D(IndexFormat.UInt16, this._bufferMaxParticles * 6, BufferUsage.Static, false);
                indices = new Uint16Array(this._bufferMaxParticles * 6);
                for (i = 0; i < this._bufferMaxParticles; i++) {
                    indexOffset = i * 6;
                    var firstVertex = i * this._vertexStride, secondVertex = firstVertex + 2;
                    indices[indexOffset++] = firstVertex;
                    indices[indexOffset++] = secondVertex;
                    indices[indexOffset++] = firstVertex + 1;
                    indices[indexOffset++] = firstVertex;
                    indices[indexOffset++] = firstVertex + 3;
                    indices[indexOffset++] = secondVertex;
                }
                this._indexBuffer.setData(indices);
                memorySize = vbMemorySize + this._bufferMaxParticles * 6 * 2;
                this._bufferState.applyState([this._vertexBuffer], this._indexBuffer);
                this.bufferState = this._bufferState;
            }
            Resource._addMemory(memorySize, memorySize);
        }
    }
    destroy() {
        super.destroy();
        if (this._vertexBuffer) {
            var memorySize = this._vertexBuffer._byteLength;
            Resource._addMemory(-memorySize, -memorySize);
            this._vertexBuffer.destroy();
            this._vertexBuffer = null;
        }
        if (this._indexBuffer) {
            var memorySize = this._indexBuffer._byteLength;
            Resource._addMemory(-memorySize, -memorySize);
            this._indexBuffer.destroy();
            this._indexBuffer = null;
        }
        this._emission.destroy();
        this._bounds = null;
        this._customBounds = null;
        this._bufferState = null;
        this._owner = null;
        this._vertices = null;
        this._indexBuffer = null;
        this._emission = null;
        this._shape = null;
        this.startLifeTimeGradient = null;
        this.startLifeTimeGradientMin = null;
        this.startLifeTimeGradientMax = null;
        this.startSizeConstantSeparate = null;
        this.startSizeConstantMinSeparate = null;
        this.startSizeConstantMaxSeparate = null;
        this.startRotationConstantSeparate = null;
        this.startRotationConstantMinSeparate = null;
        this.startRotationConstantMaxSeparate = null;
        this.startColorConstant = null;
        this.startColorConstantMin = null;
        this.startColorConstantMax = null;
        this._velocityOverLifetime = null;
        this._colorOverLifetime = null;
        this._sizeOverLifetime = null;
        this._rotationOverLifetime = null;
        this._textureSheetAnimation = null;
    }
    emit(time) {
        var position = ShurikenParticleSystem._tempPosition;
        var direction = ShurikenParticleSystem._tempDirection;
        if (this._shape && this._shape.enable) {
            if (this.autoRandomSeed)
                this._shape.generatePositionAndDirection(position, direction);
            else
                this._shape.generatePositionAndDirection(position, direction, this._rand, this._randomSeeds);
        }
        else {
            position.x = position.y = position.z = 0;
            direction.x = direction.y = 0;
            direction.z = 1;
        }
        return this.addParticle(position, direction, time);
    }
    addParticle(position, direction, time) {
        Vector3.normalize(direction, direction);
        var nextFreeParticle = this._firstFreeElement + 1;
        if (nextFreeParticle >= this._bufferMaxParticles)
            nextFreeParticle = 0;
        if (nextFreeParticle === this._firstRetiredElement)
            return false;
        var transform = this._owner.transform;
        ShurikenParticleData.create(this, this._ownerRender);
        var particleAge = this._currentTime - time;
        if (particleAge >= ShurikenParticleData.startLifeTime)
            return true;
        var pos, rot;
        if (this.simulationSpace == 0) {
            pos = transform.position;
            rot = transform.rotation;
        }
        var startSpeed;
        switch (this.startSpeedType) {
            case 0:
                startSpeed = this.startSpeedConstant;
                break;
            case 2:
                if (this.autoRandomSeed) {
                    startSpeed = MathUtil.lerp(this.startSpeedConstantMin, this.startSpeedConstantMax, Math.random());
                }
                else {
                    this._rand.seed = this._randomSeeds[8];
                    startSpeed = MathUtil.lerp(this.startSpeedConstantMin, this.startSpeedConstantMax, this._rand.getFloat());
                    this._randomSeeds[8] = this._rand.seed;
                }
                break;
        }
        var randomVelocityX, randomVelocityY, randomVelocityZ, randomColor, randomSize, randomRotation, randomTextureAnimation;
        var needRandomVelocity = this._velocityOverLifetime && this._velocityOverLifetime.enable;
        if (needRandomVelocity) {
            var velocityType = this._velocityOverLifetime.velocity.type;
            if (velocityType === 2 || velocityType === 3) {
                if (this.autoRandomSeed) {
                    randomVelocityX = Math.random();
                    randomVelocityY = Math.random();
                    randomVelocityZ = Math.random();
                }
                else {
                    this._rand.seed = this._randomSeeds[9];
                    randomVelocityX = this._rand.getFloat();
                    randomVelocityY = this._rand.getFloat();
                    randomVelocityZ = this._rand.getFloat();
                    this._randomSeeds[9] = this._rand.seed;
                }
            }
            else {
                needRandomVelocity = false;
            }
        }
        else {
            needRandomVelocity = false;
        }
        var needRandomColor = this._colorOverLifetime && this._colorOverLifetime.enable;
        if (needRandomColor) {
            var colorType = this._colorOverLifetime.color.type;
            if (colorType === 3) {
                if (this.autoRandomSeed) {
                    randomColor = Math.random();
                }
                else {
                    this._rand.seed = this._randomSeeds[10];
                    randomColor = this._rand.getFloat();
                    this._randomSeeds[10] = this._rand.seed;
                }
            }
            else {
                needRandomColor = false;
            }
        }
        else {
            needRandomColor = false;
        }
        var needRandomSize = this._sizeOverLifetime && this._sizeOverLifetime.enable;
        if (needRandomSize) {
            var sizeType = this._sizeOverLifetime.size.type;
            if (sizeType === 3) {
                if (this.autoRandomSeed) {
                    randomSize = Math.random();
                }
                else {
                    this._rand.seed = this._randomSeeds[11];
                    randomSize = this._rand.getFloat();
                    this._randomSeeds[11] = this._rand.seed;
                }
            }
            else {
                needRandomSize = false;
            }
        }
        else {
            needRandomSize = false;
        }
        var needRandomRotation = this._rotationOverLifetime && this._rotationOverLifetime.enable;
        if (needRandomRotation) {
            var rotationType = this._rotationOverLifetime.angularVelocity.type;
            if (rotationType === 2 || rotationType === 3) {
                if (this.autoRandomSeed) {
                    randomRotation = Math.random();
                }
                else {
                    this._rand.seed = this._randomSeeds[12];
                    randomRotation = this._rand.getFloat();
                    this._randomSeeds[12] = this._rand.seed;
                }
            }
            else {
                needRandomRotation = false;
            }
        }
        else {
            needRandomRotation = false;
        }
        var needRandomTextureAnimation = this._textureSheetAnimation && this._textureSheetAnimation.enable;
        if (needRandomTextureAnimation) {
            var textureAnimationType = this._textureSheetAnimation.frame.type;
            if (textureAnimationType === 3) {
                if (this.autoRandomSeed) {
                    randomTextureAnimation = Math.random();
                }
                else {
                    this._rand.seed = this._randomSeeds[15];
                    randomTextureAnimation = this._rand.getFloat();
                    this._randomSeeds[15] = this._rand.seed;
                }
            }
            else {
                needRandomTextureAnimation = false;
            }
        }
        else {
            needRandomTextureAnimation = false;
        }
        var startIndex = this._firstFreeElement * this._floatCountPerVertex * this._vertexStride;
        var subU = ShurikenParticleData.startUVInfo[0];
        var subV = ShurikenParticleData.startUVInfo[1];
        var startU = ShurikenParticleData.startUVInfo[2];
        var startV = ShurikenParticleData.startUVInfo[3];
        var meshVertices, meshVertexStride, meshPosOffset, meshCorOffset, meshUVOffset, meshVertexIndex;
        var render = this._ownerRender;
        if (render.renderMode === 4) {
            var meshVB = render.mesh._vertexBuffer;
            meshVertices = meshVB.getFloat32Data();
            var meshVertexDeclaration = meshVB.vertexDeclaration;
            meshPosOffset = meshVertexDeclaration.getVertexElementByUsage(VertexMesh.MESH_POSITION0)._offset / 4;
            var colorElement = meshVertexDeclaration.getVertexElementByUsage(VertexMesh.MESH_COLOR0);
            meshCorOffset = colorElement ? colorElement._offset / 4 : -1;
            var uvElement = meshVertexDeclaration.getVertexElementByUsage(VertexMesh.MESH_TEXTURECOORDINATE0);
            meshUVOffset = uvElement ? uvElement._offset / 4 : -1;
            meshVertexStride = meshVertexDeclaration.vertexStride / 4;
            meshVertexIndex = 0;
        }
        for (var i = startIndex, n = startIndex + this._floatCountPerVertex * this._vertexStride; i < n; i += this._floatCountPerVertex) {
            var offset;
            if (render.renderMode === 4) {
                offset = i;
                var vertexOffset = meshVertexStride * (meshVertexIndex++);
                var meshOffset = vertexOffset + meshPosOffset;
                this._vertices[offset++] = meshVertices[meshOffset++];
                this._vertices[offset++] = meshVertices[meshOffset++];
                this._vertices[offset++] = meshVertices[meshOffset];
                if (meshCorOffset === -1) {
                    this._vertices[offset++] = 1.0;
                    this._vertices[offset++] = 1.0;
                    this._vertices[offset++] = 1.0;
                    this._vertices[offset++] = 1.0;
                }
                else {
                    meshOffset = vertexOffset + meshCorOffset;
                    this._vertices[offset++] = meshVertices[meshOffset++];
                    this._vertices[offset++] = meshVertices[meshOffset++];
                    this._vertices[offset++] = meshVertices[meshOffset++];
                    this._vertices[offset++] = meshVertices[meshOffset];
                }
                if (meshUVOffset === -1) {
                    this._vertices[offset++] = 0.0;
                    this._vertices[offset++] = 0.0;
                }
                else {
                    meshOffset = vertexOffset + meshUVOffset;
                    this._vertices[offset++] = meshVertices[meshOffset++];
                    this._vertices[offset++] = meshVertices[meshOffset];
                }
            }
            else {
                offset = i + 4;
            }
            this._vertices[offset++] = position.x;
            this._vertices[offset++] = position.y;
            this._vertices[offset++] = position.z;
            this._vertices[offset++] = ShurikenParticleData.startLifeTime;
            this._vertices[offset++] = direction.x;
            this._vertices[offset++] = direction.y;
            this._vertices[offset++] = direction.z;
            this._vertices[offset++] = time;
            this._vertices[offset++] = ShurikenParticleData.startColor.x;
            this._vertices[offset++] = ShurikenParticleData.startColor.y;
            this._vertices[offset++] = ShurikenParticleData.startColor.z;
            this._vertices[offset++] = ShurikenParticleData.startColor.w;
            this._vertices[offset++] = ShurikenParticleData.startSize[0];
            this._vertices[offset++] = ShurikenParticleData.startSize[1];
            this._vertices[offset++] = ShurikenParticleData.startSize[2];
            this._vertices[offset++] = ShurikenParticleData.startRotation[0];
            this._vertices[offset++] = ShurikenParticleData.startRotation[1];
            this._vertices[offset++] = ShurikenParticleData.startRotation[2];
            this._vertices[offset++] = startSpeed;
            needRandomColor && (this._vertices[offset + 1] = randomColor);
            needRandomSize && (this._vertices[offset + 2] = randomSize);
            needRandomRotation && (this._vertices[offset + 3] = randomRotation);
            needRandomTextureAnimation && (this._vertices[offset + 4] = randomTextureAnimation);
            if (needRandomVelocity) {
                this._vertices[offset + 5] = randomVelocityX;
                this._vertices[offset + 6] = randomVelocityY;
                this._vertices[offset + 7] = randomVelocityZ;
            }
            switch (this.simulationSpace) {
                case 0:
                    offset += 8;
                    this._vertices[offset++] = pos.x;
                    this._vertices[offset++] = pos.y;
                    this._vertices[offset++] = pos.z;
                    this._vertices[offset++] = rot.x;
                    this._vertices[offset++] = rot.y;
                    this._vertices[offset++] = rot.z;
                    this._vertices[offset++] = rot.w;
                    break;
                case 1:
                    break;
                default:
                    throw new Error("ShurikenParticleMaterial: SimulationSpace value is invalid.");
            }
            offset = i + this._simulationUV_Index;
            this._vertices[offset++] = startU;
            this._vertices[offset++] = startV;
            this._vertices[offset++] = subU;
            this._vertices[offset] = subV;
        }
        this._firstFreeElement = nextFreeParticle;
        return true;
    }
    addNewParticlesToVertexBuffer() {
        var start;
        var byteStride = this._vertexStride * this._floatCountPerVertex * 4;
        if (this._firstNewElement < this._firstFreeElement) {
            start = this._firstNewElement * byteStride;
            this._vertexBuffer.setData(this._vertices.buffer, start, start, (this._firstFreeElement - this._firstNewElement) * byteStride);
        }
        else {
            start = this._firstNewElement * byteStride;
            this._vertexBuffer.setData(this._vertices.buffer, start, start, (this._bufferMaxParticles - this._firstNewElement) * byteStride);
            if (this._firstFreeElement > 0) {
                this._vertexBuffer.setData(this._vertices.buffer, 0, 0, this._firstFreeElement * byteStride);
            }
        }
        this._firstNewElement = this._firstFreeElement;
    }
    _getType() {
        return ShurikenParticleSystem._type;
    }
    _prepareRender(state) {
        if (this._updateMask != Stat.loopCount) {
            this._updateMask = Stat.loopCount;
            this._updateEmission();
            if (this._firstNewElement != this._firstFreeElement)
                this.addNewParticlesToVertexBuffer();
            this._drawCounter++;
        }
        if (this._firstActiveElement != this._firstFreeElement)
            return true;
        else
            return false;
    }
    _updateRenderParams(state) {
        var indexCount;
        this.clearRenderParams();
        if (this._firstActiveElement < this._firstFreeElement) {
            indexCount = (this._firstFreeElement - this._firstActiveElement) * this._indexStride;
            this.setDrawElemenParams(indexCount, 2 * this._firstActiveElement * this._indexStride);
        }
        else {
            indexCount = (this._bufferMaxParticles - this._firstActiveElement) * this._indexStride;
            this.setDrawElemenParams(indexCount, 2 * this._firstActiveElement * this._indexStride);
            if (this._firstFreeElement > 0) {
                indexCount = this._firstFreeElement * this._indexStride;
                this.setDrawElemenParams(indexCount, 0);
            }
        }
    }
    play() {
        this._burstsIndex = 0;
        this._isEmitting = true;
        this._isPlaying = true;
        this._isPaused = false;
        this._emissionTime = 0;
        this._emissionDistance = 0;
        this._owner.transform.position.cloneTo(this._emissionLastPosition);
        this._totalDelayTime = 0;
        if (!this.autoRandomSeed) {
            for (var i = 0, n = this._randomSeeds.length; i < n; i++)
                this._randomSeeds[i] = this.randomSeed[0] + ShurikenParticleSystem._RANDOMOFFSET[i];
        }
        switch (this.startDelayType) {
            case 0:
                this._playStartDelay = this.startDelay;
                break;
            case 1:
                if (this.autoRandomSeed) {
                    this._playStartDelay = MathUtil.lerp(this.startDelayMin, this.startDelayMax, Math.random());
                }
                else {
                    this._rand.seed = this._randomSeeds[2];
                    this._playStartDelay = MathUtil.lerp(this.startDelayMin, this.startDelayMax, this._rand.getFloat());
                    this._randomSeeds[2] = this._rand.seed;
                }
                break;
            default:
                throw new Error("Utils3D: startDelayType is invalid.");
        }
        this._frameRateTime = this._currentTime + this._playStartDelay;
        this._startUpdateLoopCount = Stat.loopCount;
    }
    pause() {
        this._isPaused = true;
    }
    simulate(time, restart = true) {
        this._simulateUpdate = true;
        if (restart) {
            this._updateParticlesSimulationRestart(time);
        }
        else {
            this._isPaused = false;
            this._updateParticles(time);
        }
        this.pause();
    }
    stop() {
        this._burstsIndex = 0;
        this._isEmitting = false;
        this._emissionTime = 0;
    }
    cloneTo(destObject) {
        var dest = destObject;
        dest._useCustomBounds = this._useCustomBounds;
        (this._customBounds) && (this._customBounds.cloneTo(dest._customBounds));
        dest.duration = this.duration;
        dest.looping = this.looping;
        dest.prewarm = this.prewarm;
        dest.startDelayType = this.startDelayType;
        dest.startDelay = this.startDelay;
        dest.startDelayMin = this.startDelayMin;
        dest.startDelayMax = this.startDelayMax;
        dest._maxStartLifetime = this._maxStartLifetime;
        dest.startLifetimeType = this.startLifetimeType;
        dest.startLifetimeConstant = this.startLifetimeConstant;
        this.startLifeTimeGradient.cloneTo(dest.startLifeTimeGradient);
        dest.startLifetimeConstantMin = this.startLifetimeConstantMin;
        dest.startLifetimeConstantMax = this.startLifetimeConstantMax;
        this.startLifeTimeGradientMin.cloneTo(dest.startLifeTimeGradientMin);
        this.startLifeTimeGradientMax.cloneTo(dest.startLifeTimeGradientMax);
        dest.startSpeedType = this.startSpeedType;
        dest.startSpeedConstant = this.startSpeedConstant;
        dest.startSpeedConstantMin = this.startSpeedConstantMin;
        dest.startSpeedConstantMax = this.startSpeedConstantMax;
        dest.dragType = this.dragType;
        dest.dragConstant = this.dragConstant;
        dest.dragSpeedConstantMax = this.dragSpeedConstantMax;
        dest.dragSpeedConstantMin = this.dragSpeedConstantMin;
        dest.threeDStartSize = this.threeDStartSize;
        dest.startSizeType = this.startSizeType;
        dest.startSizeConstant = this.startSizeConstant;
        this.startSizeConstantSeparate.cloneTo(dest.startSizeConstantSeparate);
        dest.startSizeConstantMin = this.startSizeConstantMin;
        dest.startSizeConstantMax = this.startSizeConstantMax;
        this.startSizeConstantMinSeparate.cloneTo(dest.startSizeConstantMinSeparate);
        this.startSizeConstantMaxSeparate.cloneTo(dest.startSizeConstantMaxSeparate);
        dest.threeDStartRotation = this.threeDStartRotation;
        dest.startRotationType = this.startRotationType;
        dest.startRotationConstant = this.startRotationConstant;
        this.startRotationConstantSeparate.cloneTo(dest.startRotationConstantSeparate);
        dest.startRotationConstantMin = this.startRotationConstantMin;
        dest.startRotationConstantMax = this.startRotationConstantMax;
        this.startRotationConstantMinSeparate.cloneTo(dest.startRotationConstantMinSeparate);
        this.startRotationConstantMaxSeparate.cloneTo(dest.startRotationConstantMaxSeparate);
        dest.randomizeRotationDirection = this.randomizeRotationDirection;
        dest.startColorType = this.startColorType;
        this.startColorConstant.cloneTo(dest.startColorConstant);
        this.startColorConstantMin.cloneTo(dest.startColorConstantMin);
        this.startColorConstantMax.cloneTo(dest.startColorConstantMax);
        dest.gravityModifier = this.gravityModifier;
        dest.simulationSpace = this.simulationSpace;
        dest.simulationSpeed = this.simulationSpeed;
        dest.scaleMode = this.scaleMode;
        dest.playOnAwake = this.playOnAwake;
        dest.autoRandomSeed = this.autoRandomSeed;
        dest.randomSeed[0] = this.randomSeed[0];
        dest.maxParticles = this.maxParticles;
        (this._emission) && (dest._emission = this._emission.clone());
        (this.shape) && (dest.shape = this.shape.clone());
        (this.velocityOverLifetime) && (dest.velocityOverLifetime = this.velocityOverLifetime.clone());
        (this.colorOverLifetime) && (dest.colorOverLifetime = this.colorOverLifetime.clone());
        (this.sizeOverLifetime) && (dest.sizeOverLifetime = this.sizeOverLifetime.clone());
        (this.rotationOverLifetime) && (dest.rotationOverLifetime = this.rotationOverLifetime.clone());
        (this.textureSheetAnimation) && (dest.textureSheetAnimation = this.textureSheetAnimation.clone());
        dest.isPerformanceMode = this.isPerformanceMode;
        dest._isEmitting = this._isEmitting;
        dest._isPlaying = this._isPlaying;
        dest._isPaused = this._isPaused;
        dest._playStartDelay = this._playStartDelay;
        dest._frameRateTime = this._frameRateTime;
        dest._emissionTime = this._emissionTime;
        dest._totalDelayTime = this._totalDelayTime;
        dest._burstsIndex = this._burstsIndex;
    }
    clone() {
        var dest = new ShurikenParticleSystem(null);
        this.cloneTo(dest);
        return dest;
    }
}
ShurikenParticleSystem._RANDOMOFFSET = new Uint32Array([0x23571a3e, 0xc34f56fe, 0x13371337, 0x12460f3b, 0x6aed452e, 0xdec4aea1, 0x96aa4de3, 0x8d2c8431, 0xf3857f6f, 0xe0fbd834, 0x13740583, 0x591bc05c, 0x40eb95e4, 0xbc524e5f, 0xaf502044, 0xa614b381, 0x1034e524, 0xfc524e5f]);
ShurikenParticleSystem.halfKSqrtOf2 = 1.42 * 0.5;
ShurikenParticleSystem.g = 9.8;
ShurikenParticleSystem._maxElapsedTime = 1.0 / 3.0;
ShurikenParticleSystem._tempVector30 = new Vector3();
ShurikenParticleSystem._tempVector31 = new Vector3();
ShurikenParticleSystem._tempVector32 = new Vector3();
ShurikenParticleSystem._tempVector33 = new Vector3();
ShurikenParticleSystem._tempVector34 = new Vector3();
ShurikenParticleSystem._tempVector35 = new Vector3();
ShurikenParticleSystem._tempVector36 = new Vector3();
ShurikenParticleSystem._tempVector37 = new Vector3();
ShurikenParticleSystem._tempPosition = new Vector3();
ShurikenParticleSystem._tempDirection = new Vector3();
ShurikenParticleSystem._type = GeometryElement._typeCounter++;

//# sourceMappingURL=ShurikenParticleSystem.js.map
