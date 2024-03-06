import { Color } from "../../../maths/Color";
import { Vector2 } from "../../../maths/Vector2";
import { Vector3 } from "../../../maths/Vector3";
import { Vector4 } from "../../../maths/Vector4";
import { Loader } from "../../../net/Loader";
import { Texture } from "../../../resource/Texture";
import { Gradient } from "../Gradient";
import { RenderableSprite3D } from "../RenderableSprite3D";
import { Sprite3D } from "../Sprite3D";
import { Burst } from "./module/Burst";
import { ColorOverLifetime } from "./module/ColorOverLifetime";
import { FrameOverTime } from "./module/FrameOverTime";
import { GradientAngularVelocity } from "./module/GradientAngularVelocity";
import { GradientColor } from "./module/GradientColor";
import { GradientDataInt } from "./module/GradientDataInt";
import { GradientDataNumber } from "./module/GradientDataNumber";
import { GradientSize } from "./module/GradientSize";
import { GradientVelocity } from "./module/GradientVelocity";
import { RotationOverLifetime } from "./module/RotationOverLifetime";
import { BoxShape } from "./module/shape/BoxShape";
import { CircleShape } from "./module/shape/CircleShape";
import { ConeShape } from "./module/shape/ConeShape";
import { HemisphereShape } from "./module/shape/HemisphereShape";
import { SphereShape } from "./module/shape/SphereShape";
import { SizeOverLifetime } from "./module/SizeOverLifetime";
import { StartFrame } from "./module/StartFrame";
import { TextureSheetAnimation } from "./module/TextureSheetAnimation";
import { VelocityOverLifetime } from "./module/VelocityOverLifetime";
import { ShurikenParticleRenderer } from "./ShurikenParticleRenderer";
export class ShuriKenParticle3D extends RenderableSprite3D {
    constructor() {
        super(null);
        this._render = this.addComponent(ShurikenParticleRenderer);
        this._particleSystem = this._render._particleSystem;
    }
    get particleSystem() {
        return this._particleSystem;
    }
    get particleRenderer() {
        return this._render;
    }
    _parseModule(module, moduleData) {
        for (var t in moduleData) {
            switch (t) {
                case "bases":
                    var bases = moduleData.bases;
                    for (var k in bases)
                        module[k] = bases[k];
                    break;
                case "vector2s":
                    var vector2s = moduleData.vector2s;
                    for (var k in vector2s) {
                        var vec2 = module[k];
                        var vec2Data = vector2s[k];
                        vec2.setValue(vec2Data[0], vec2Data[1]);
                        module[k] = vec2;
                    }
                    break;
                case "vector3s":
                    var vector3s = moduleData.vector3s;
                    for (var k in vector3s) {
                        var vec3 = module[k];
                        var vec3Data = vector3s[k];
                        vec3.setValue(vec3Data[0], vec3Data[1], vec3Data[2]);
                        module[k] = vec3;
                    }
                    break;
                case "vector4s":
                    var vector4s = moduleData.vector4s;
                    for (var k in vector4s) {
                        var vec4 = module[k];
                        var vec4Data = vector4s[k];
                        vec4.setValue(vec4Data[0], vec4Data[1], vec4Data[2], vec4Data[3]);
                        module[k] = vec4;
                    }
                    break;
                case "gradientDataNumbers":
                    var gradientDataNumbers = moduleData.gradientDataNumbers;
                    for (var k in gradientDataNumbers) {
                        var gradientNumber = module[k];
                        var gradientNumberData = moduleData[k];
                        for (var i = 0, n = gradientNumberData.length; i < n; i++) {
                            var valueData = gradientNumberData[i];
                            gradientNumber.add(valueData.key, valueData.value);
                        }
                        module[k] = gradientNumber;
                    }
                    break;
                case "resources":
                    var resources = moduleData.resources;
                    for (var k in resources) {
                        let res = Loader.getRes(resources[k]);
                        if (res && (res instanceof Texture)) {
                            res = res.bitmap;
                        }
                        module[k] = res;
                    }
                    break;
                case "bursts":
                    var burstsData = moduleData.bursts;
                    for (var i = 0, n = burstsData.length; i < n; i++) {
                        var brust = burstsData[i];
                        module.addBurst(new Burst(brust.time, brust.min, brust.max));
                    }
                    break;
                case "randomSeed":
                    module.randomSeed[0] = moduleData.randomSeed;
                    break;
                case "shapeType":
                case "type":
                case "color":
                case "size":
                case "frame":
                case "startFrame":
                case "angularVelocity":
                case "velocity":
                    break;
                default:
                    throw "ShurikenParticle3D:unknown type.";
            }
        }
    }
    _parse(data, spriteMap) {
        super._parse(data, spriteMap);
        if (data.main) {
            var particleSystem = this.particleSystem;
            var particleRender = this.particleRenderer;
            this._parseModule(particleRender, data.renderer);
            this._parseModule(particleSystem, data.main);
            this._parseModule(particleSystem.emission, data.emission);
            var shapeData = data.shape;
            if (shapeData) {
                var shape;
                switch (shapeData.shapeType) {
                    case 0:
                        shape = new SphereShape();
                        break;
                    case 1:
                        shape = new HemisphereShape();
                        break;
                    case 2:
                        shape = new ConeShape();
                        break;
                    case 3:
                        shape = new BoxShape();
                        break;
                    case 7:
                        shape = new CircleShape();
                        break;
                    default:
                        throw "ShuriKenParticle3D:unknown shape type.";
                }
                this._parseModule(shape, shapeData);
                particleSystem.shape = shape;
            }
            var velocityOverLifetimeData = data.velocityOverLifetime;
            if (velocityOverLifetimeData) {
                var velocityData = velocityOverLifetimeData.velocity;
                var velocity;
                switch (velocityData.type) {
                    case 0:
                        var constantData = velocityData.constant;
                        velocity = GradientVelocity.createByConstant(constantData ? new Vector3(constantData[0], constantData[1], constantData[2]) : new Vector3(0, 0, 0));
                        break;
                    case 1:
                        velocity = GradientVelocity.createByGradient(this._initParticleVelocity(velocityData.gradientX), this._initParticleVelocity(velocityData.gradientY), this._initParticleVelocity(velocityData.gradientZ));
                        break;
                    case 2:
                        var constantMinData = velocityData.constantMin;
                        var constantMaxData = velocityData.constantMax;
                        velocity = GradientVelocity.createByRandomTwoConstant(constantMinData ? new Vector3(constantMinData[0], constantMinData[1], constantMinData[2]) : new Vector3(0, 0, 0), constantMaxData ? new Vector3(constantMaxData[0], constantMaxData[1], constantMaxData[2]) : new Vector3(0, 0, 0));
                        break;
                    case 3:
                        velocity = GradientVelocity.createByRandomTwoGradient(this._initParticleVelocity(velocityData.gradientXMin), this._initParticleVelocity(velocityData.gradientXMax), this._initParticleVelocity(velocityData.gradientYMin), this._initParticleVelocity(velocityData.gradientYMax), this._initParticleVelocity(velocityData.gradientZMin), this._initParticleVelocity(velocityData.gradientZMax));
                        break;
                }
                var velocityOverLifetime = new VelocityOverLifetime(velocity);
                this._parseModule(velocityOverLifetime, velocityOverLifetimeData);
                particleSystem.velocityOverLifetime = velocityOverLifetime;
            }
            var colorOverLifetimeData = data.colorOverLifetime;
            if (colorOverLifetimeData) {
                var colorData = colorOverLifetimeData.color;
                let maxKeyCount = colorData.maxKeyCount;
                var color;
                switch (colorData.type) {
                    case 0:
                        var constColorData = colorData.constant;
                        color = GradientColor.createByConstant(constColorData ? new Vector4(constColorData[0], constColorData[1], constColorData[2], constColorData[3]) : new Vector4(0, 0, 0, 0));
                        break;
                    case 1:
                        color = GradientColor.createByGradient(this._initParticleColor(colorData.gradient, maxKeyCount));
                        break;
                    case 2:
                        var minConstColorData = colorData.constantMin;
                        var maxConstColorData = colorData.constantMax;
                        color = GradientColor.createByRandomTwoConstant(minConstColorData ? new Vector4(minConstColorData[0], minConstColorData[1], minConstColorData[2], minConstColorData[3]) : new Vector4(0, 0, 0, 0), minConstColorData ? new Vector4(maxConstColorData[0], maxConstColorData[1], maxConstColorData[2], maxConstColorData[3]) : new Vector4(0, 0, 0, 0));
                        break;
                    case 3:
                        color = GradientColor.createByRandomTwoGradient(this._initParticleColor(colorData.gradientMin, maxKeyCount), this._initParticleColor(colorData.gradientMax, maxKeyCount));
                        break;
                }
                var colorOverLifetime = new ColorOverLifetime(color);
                this._parseModule(colorOverLifetime, colorOverLifetimeData);
                particleSystem.colorOverLifetime = colorOverLifetime;
            }
            var sizeOverLifetimeData = data.sizeOverLifetime;
            if (sizeOverLifetimeData) {
                var sizeData = sizeOverLifetimeData.size;
                var size;
                switch (sizeData.type) {
                    case 0:
                        if (sizeData.separateAxes) {
                            size = GradientSize.createByGradientSeparate(this._initParticleSize(sizeData.gradientX), this._initParticleSize(sizeData.gradientY), this._initParticleSize(sizeData.gradientZ));
                        }
                        else {
                            size = GradientSize.createByGradient(this._initParticleSize(sizeData.gradient));
                        }
                        break;
                    case 1:
                        if (sizeData.separateAxes) {
                            var constantMinSeparateData = sizeData.constantMinSeparate;
                            var constantMaxSeparateData = sizeData.constantMaxSeparate;
                            size = GradientSize.createByRandomTwoConstantSeparate(constantMinSeparateData ? new Vector3(constantMinSeparateData[0], constantMinSeparateData[1], constantMinSeparateData[2]) : new Vector3(0, 0, 0), constantMaxSeparateData ? new Vector3(constantMaxSeparateData[0], constantMaxSeparateData[1], constantMaxSeparateData[2]) : new Vector3(0, 0, 0));
                        }
                        else {
                            size = GradientSize.createByRandomTwoConstant(sizeData.constantMin || 0, sizeData.constantMax || 0);
                        }
                        break;
                    case 2:
                        if (sizeData.separateAxes) {
                            size = GradientSize.createByRandomTwoGradientSeparate(this._initParticleSize(sizeData.gradientXMin), this._initParticleSize(sizeData.gradientYMin), this._initParticleSize(sizeData.gradientZMin), this._initParticleSize(sizeData.gradientXMax), this._initParticleSize(sizeData.gradientYMax), this._initParticleSize(sizeData.gradientZMax));
                        }
                        else {
                            size = GradientSize.createByRandomTwoGradient(this._initParticleSize(sizeData.gradientMin), this._initParticleSize(sizeData.gradientMax));
                        }
                        break;
                }
                var sizeOverLifetime = new SizeOverLifetime(size);
                this._parseModule(sizeOverLifetime, sizeOverLifetimeData);
                particleSystem.sizeOverLifetime = sizeOverLifetime;
            }
            var rotationOverLifetimeData = data.rotationOverLifetime;
            if (rotationOverLifetimeData) {
                var angularVelocityData = rotationOverLifetimeData.angularVelocity;
                var angularVelocity;
                switch (angularVelocityData.type) {
                    case 0:
                        if (angularVelocityData.separateAxes) {
                            var conSep = angularVelocityData.constantSeparate;
                            angularVelocity = GradientAngularVelocity.createByConstantSeparate(conSep ? new Vector3(conSep[0], conSep[1], conSep[2]) : new Vector3(0, 0, Math.PI / 4));
                        }
                        else {
                            angularVelocity = GradientAngularVelocity.createByConstant(angularVelocityData.constant || Math.PI / 4);
                        }
                        break;
                    case 1:
                        if (angularVelocityData.separateAxes) {
                            angularVelocity = GradientAngularVelocity.createByGradientSeparate(this._initParticleRotation(angularVelocityData.gradientX), this._initParticleRotation(angularVelocityData.gradientY), this._initParticleRotation(angularVelocityData.gradientZ));
                        }
                        else {
                            angularVelocity = GradientAngularVelocity.createByGradient(this._initParticleRotation(angularVelocityData.gradient));
                        }
                        break;
                    case 2:
                        if (angularVelocityData.separateAxes) {
                            var minSep = angularVelocityData.constantMinSeparate;
                            var maxSep = angularVelocityData.constantMaxSeparate;
                            angularVelocity = GradientAngularVelocity.createByRandomTwoConstantSeparate(minSep ? new Vector3(minSep[0], minSep[1], minSep[2]) : new Vector3(0, 0, 0), maxSep ? new Vector3(maxSep[0], maxSep[1], maxSep[2]) : new Vector3(0, 0, Math.PI / 4));
                        }
                        else {
                            angularVelocity = GradientAngularVelocity.createByRandomTwoConstant(angularVelocityData.constantMin || 0, angularVelocityData.constantMax || Math.PI / 4);
                        }
                        break;
                    case 3:
                        if (angularVelocityData.separateAxes) {
                        }
                        else {
                            angularVelocity = GradientAngularVelocity.createByRandomTwoGradient(this._initParticleRotation(angularVelocityData.gradientMin), this._initParticleRotation(angularVelocityData.gradientMax));
                        }
                        break;
                }
                var rotationOverLifetime = new RotationOverLifetime(angularVelocity);
                this._parseModule(rotationOverLifetime, rotationOverLifetimeData);
                particleSystem.rotationOverLifetime = rotationOverLifetime;
            }
            var textureSheetAnimationData = data.textureSheetAnimation;
            if (textureSheetAnimationData) {
                var frameData = textureSheetAnimationData.frame;
                var frameOverTime;
                switch (frameData.type) {
                    case 0:
                        frameOverTime = FrameOverTime.createByConstant(frameData.constant);
                        break;
                    case 1:
                        frameOverTime = FrameOverTime.createByOverTime(this._initParticleFrame(frameData.overTime));
                        break;
                    case 2:
                        frameOverTime = FrameOverTime.createByRandomTwoConstant(frameData.constantMin, frameData.constantMax);
                        break;
                    case 3:
                        frameOverTime = FrameOverTime.createByRandomTwoOverTime(this._initParticleFrame(frameData.overTimeMin), this._initParticleFrame(frameData.overTimeMax));
                        break;
                }
                var startFrameData = textureSheetAnimationData.startFrame;
                var startFrame;
                switch (startFrameData.type) {
                    case 0:
                        startFrame = StartFrame.createByConstant(startFrameData.constant);
                        break;
                    case 1:
                        startFrame = StartFrame.createByRandomTwoConstant(startFrameData.constantMin, startFrameData.constantMax);
                        break;
                }
                var textureSheetAnimation = new TextureSheetAnimation(frameOverTime, startFrame);
                this._parseModule(textureSheetAnimation, textureSheetAnimationData);
                particleSystem.textureSheetAnimation = textureSheetAnimation;
            }
        }
        else {
            this._parseOld(data);
        }
    }
    destroy(destroyChild = true) {
        if (this._destroyed)
            return;
        super.destroy(destroyChild);
    }
    _create() {
        return new Sprite3D();
    }
    _parseOld(data) {
        const anglelToRad = Math.PI / 180.0;
        var i, n;
        var particleRender = this.particleRenderer;
        var material;
        var materialData = data.material;
        (materialData) && (material = Loader.getRes(materialData.path));
        particleRender.sharedMaterial = material;
        var meshPath = data.meshPath;
        (meshPath) && (particleRender.mesh = Loader.getRes(meshPath));
        particleRender.renderMode = data.renderMode;
        particleRender.stretchedBillboardCameraSpeedScale = data.stretchedBillboardCameraSpeedScale;
        particleRender.stretchedBillboardSpeedScale = data.stretchedBillboardSpeedScale;
        particleRender.stretchedBillboardLengthScale = data.stretchedBillboardLengthScale;
        particleRender.sortingFudge = data.sortingFudge ? data.sortingFudge : 0.0;
        var particleSystem = this.particleSystem;
        particleSystem.isPerformanceMode = data.isPerformanceMode;
        particleSystem.duration = data.duration;
        particleSystem.looping = data.looping;
        particleSystem.prewarm = data.prewarm;
        particleSystem.startDelayType = data.startDelayType;
        particleSystem.startDelay = data.startDelay;
        particleSystem.startDelayMin = data.startDelayMin;
        particleSystem.startDelayMax = data.startDelayMax;
        particleSystem.startLifetimeType = data.startLifetimeType;
        particleSystem.startLifetimeConstant = data.startLifetimeConstant;
        particleSystem.startLifeTimeGradient = ShuriKenParticle3D._initStartLife(data.startLifetimeGradient);
        particleSystem.startLifetimeConstantMin = data.startLifetimeConstantMin;
        particleSystem.startLifetimeConstantMax = data.startLifetimeConstantMax;
        particleSystem.startLifeTimeGradientMin = ShuriKenParticle3D._initStartLife(data.startLifetimeGradientMin);
        particleSystem.startLifeTimeGradientMax = ShuriKenParticle3D._initStartLife(data.startLifetimeGradientMax);
        particleSystem.startSpeedType = data.startSpeedType;
        particleSystem.startSpeedConstant = data.startSpeedConstant;
        particleSystem.startSpeedConstantMin = data.startSpeedConstantMin;
        particleSystem.startSpeedConstantMax = data.startSpeedConstantMax;
        particleSystem.threeDStartSize = data.threeDStartSize;
        particleSystem.startSizeType = data.startSizeType;
        particleSystem.startSizeConstant = data.startSizeConstant;
        var startSizeConstantSeparateArray = data.startSizeConstantSeparate;
        var startSizeConstantSeparateElement = particleSystem.startSizeConstantSeparate;
        startSizeConstantSeparateElement.x = startSizeConstantSeparateArray[0];
        startSizeConstantSeparateElement.y = startSizeConstantSeparateArray[1];
        startSizeConstantSeparateElement.z = startSizeConstantSeparateArray[2];
        particleSystem.startSizeConstantMin = data.startSizeConstantMin;
        particleSystem.startSizeConstantMax = data.startSizeConstantMax;
        var startSizeConstantMinSeparateArray = data.startSizeConstantMinSeparate;
        var startSizeConstantMinSeparateElement = particleSystem.startSizeConstantMinSeparate;
        startSizeConstantMinSeparateElement.x = startSizeConstantMinSeparateArray[0];
        startSizeConstantMinSeparateElement.y = startSizeConstantMinSeparateArray[1];
        startSizeConstantMinSeparateElement.z = startSizeConstantMinSeparateArray[2];
        var startSizeConstantMaxSeparateArray = data.startSizeConstantMaxSeparate;
        var startSizeConstantMaxSeparateElement = particleSystem.startSizeConstantMaxSeparate;
        startSizeConstantMaxSeparateElement.x = startSizeConstantMaxSeparateArray[0];
        startSizeConstantMaxSeparateElement.y = startSizeConstantMaxSeparateArray[1];
        startSizeConstantMaxSeparateElement.z = startSizeConstantMaxSeparateArray[2];
        particleSystem.threeDStartRotation = data.threeDStartRotation;
        particleSystem.startRotationType = data.startRotationType;
        particleSystem.startRotationConstant = data.startRotationConstant * anglelToRad;
        var startRotationConstantSeparateArray = data.startRotationConstantSeparate;
        var startRotationConstantSeparateElement = particleSystem.startRotationConstantSeparate;
        startRotationConstantSeparateElement.x = startRotationConstantSeparateArray[0] * anglelToRad;
        startRotationConstantSeparateElement.y = startRotationConstantSeparateArray[1] * anglelToRad;
        startRotationConstantSeparateElement.z = startRotationConstantSeparateArray[2] * anglelToRad;
        particleSystem.startRotationConstantMin = data.startRotationConstantMin * anglelToRad;
        particleSystem.startRotationConstantMax = data.startRotationConstantMax * anglelToRad;
        var startRotationConstantMinSeparateArray = data.startRotationConstantMinSeparate;
        var startRotationConstantMinSeparateElement = particleSystem.startRotationConstantMinSeparate;
        startRotationConstantMinSeparateElement.x = startRotationConstantMinSeparateArray[0] * anglelToRad;
        startRotationConstantMinSeparateElement.y = startRotationConstantMinSeparateArray[1] * anglelToRad;
        startRotationConstantMinSeparateElement.z = startRotationConstantMinSeparateArray[2] * anglelToRad;
        var startRotationConstantMaxSeparateArray = data.startRotationConstantMaxSeparate;
        var startRotationConstantMaxSeparateElement = particleSystem.startRotationConstantMaxSeparate;
        startRotationConstantMaxSeparateElement.x = startRotationConstantMaxSeparateArray[0] * anglelToRad;
        startRotationConstantMaxSeparateElement.y = startRotationConstantMaxSeparateArray[1] * anglelToRad;
        startRotationConstantMaxSeparateElement.z = startRotationConstantMaxSeparateArray[2] * anglelToRad;
        particleSystem.randomizeRotationDirection = data.randomizeRotationDirection;
        particleSystem.startColorType = data.startColorType;
        var startColorConstantArray = data.startColorConstant;
        var startColorConstantElement = particleSystem.startColorConstant;
        startColorConstantElement.x = startColorConstantArray[0];
        startColorConstantElement.y = startColorConstantArray[1];
        startColorConstantElement.z = startColorConstantArray[2];
        startColorConstantElement.w = startColorConstantArray[3];
        var startColorConstantMinArray = data.startColorConstantMin;
        var startColorConstantMinElement = particleSystem.startColorConstantMin;
        startColorConstantMinElement.x = startColorConstantMinArray[0];
        startColorConstantMinElement.y = startColorConstantMinArray[1];
        startColorConstantMinElement.z = startColorConstantMinArray[2];
        startColorConstantMinElement.w = startColorConstantMinArray[3];
        var startColorConstantMaxArray = data.startColorConstantMax;
        var startColorConstantMaxElement = particleSystem.startColorConstantMax;
        startColorConstantMaxElement.x = startColorConstantMaxArray[0];
        startColorConstantMaxElement.y = startColorConstantMaxArray[1];
        startColorConstantMaxElement.z = startColorConstantMaxArray[2];
        startColorConstantMaxElement.w = startColorConstantMaxArray[3];
        particleSystem.gravityModifier = data.gravityModifier;
        particleSystem.simulationSpace = data.simulationSpace;
        (data.simulationSpeed !== undefined) && (particleSystem.simulationSpeed = data.simulationSpeed);
        particleSystem.scaleMode = data.scaleMode;
        particleSystem.playOnAwake = data.playOnAwake;
        particleSystem.maxParticles = data.maxParticles;
        var autoRandomSeed = data.autoRandomSeed;
        (autoRandomSeed != null) && (particleSystem.autoRandomSeed = autoRandomSeed);
        var randomSeed = data.randomSeed;
        (randomSeed != null) && (particleSystem.randomSeed[0] = randomSeed);
        var emissionData = data.emission;
        var emission = particleSystem.emission;
        if (emissionData) {
            emission.emissionRate = emissionData.emissionRate;
            var burstsData = emissionData.bursts;
            if (burstsData)
                for (i = 0, n = burstsData.length; i < n; i++) {
                    var brust = burstsData[i];
                    emission.addBurst(new Burst(brust.time, brust.min, brust.max));
                }
            emission.enable = emissionData.enable;
        }
        else {
            emission.enable = false;
        }
        var shapeData = data.shape;
        if (shapeData) {
            var shape;
            switch (shapeData.shapeType) {
                case 0:
                    var sphereShape;
                    shape = sphereShape = new SphereShape();
                    sphereShape.radius = shapeData.sphereRadius;
                    sphereShape.emitFromShell = shapeData.sphereEmitFromShell;
                    sphereShape.randomDirection = shapeData.sphereRandomDirection;
                    break;
                case 1:
                    var hemiSphereShape;
                    shape = hemiSphereShape = new HemisphereShape();
                    hemiSphereShape.radius = shapeData.hemiSphereRadius;
                    hemiSphereShape.emitFromShell = shapeData.hemiSphereEmitFromShell;
                    hemiSphereShape.randomDirection = shapeData.hemiSphereRandomDirection;
                    break;
                case 2:
                    var coneShape;
                    shape = coneShape = new ConeShape();
                    coneShape.angle = shapeData.coneAngle * anglelToRad;
                    coneShape.radius = shapeData.coneRadius;
                    coneShape.length = shapeData.coneLength;
                    coneShape.emitType = shapeData.coneEmitType;
                    coneShape.randomDirection = shapeData.coneRandomDirection;
                    break;
                case 3:
                    var boxShape;
                    shape = boxShape = new BoxShape();
                    boxShape.x = shapeData.boxX;
                    boxShape.y = shapeData.boxY;
                    boxShape.z = shapeData.boxZ;
                    boxShape.randomDirection = shapeData.boxRandomDirection;
                    break;
                case 7:
                    var circleShape;
                    shape = circleShape = new CircleShape();
                    circleShape.radius = shapeData.circleRadius;
                    circleShape.arc = shapeData.circleArc * anglelToRad;
                    circleShape.emitFromEdge = shapeData.circleEmitFromEdge;
                    circleShape.randomDirection = shapeData.circleRandomDirection;
                    break;
                default:
                    var tempShape;
                    shape = tempShape = new CircleShape();
                    tempShape.radius = shapeData.circleRadius;
                    tempShape.arc = shapeData.circleArc * anglelToRad;
                    tempShape.emitFromEdge = shapeData.circleEmitFromEdge;
                    tempShape.randomDirection = shapeData.circleRandomDirection;
                    break;
            }
            shape.enable = shapeData.enable;
            particleSystem.shape = shape;
        }
        var velocityOverLifetimeData = data.velocityOverLifetime;
        if (velocityOverLifetimeData) {
            var velocityData = velocityOverLifetimeData.velocity;
            var velocity;
            switch (velocityData.type) {
                case 0:
                    var constantData = velocityData.constant;
                    velocity = GradientVelocity.createByConstant(new Vector3(constantData[0], constantData[1], constantData[2]));
                    break;
                case 1:
                    velocity = GradientVelocity.createByGradient(this._initParticleVelocity(velocityData.gradientX), this._initParticleVelocity(velocityData.gradientY), this._initParticleVelocity(velocityData.gradientZ));
                    break;
                case 2:
                    var constantMinData = velocityData.constantMin;
                    var constantMaxData = velocityData.constantMax;
                    velocity = GradientVelocity.createByRandomTwoConstant(new Vector3(constantMinData[0], constantMinData[1], constantMinData[2]), new Vector3(constantMaxData[0], constantMaxData[1], constantMaxData[2]));
                    break;
                case 3:
                    velocity = GradientVelocity.createByRandomTwoGradient(this._initParticleVelocity(velocityData.gradientXMin), this._initParticleVelocity(velocityData.gradientXMax), this._initParticleVelocity(velocityData.gradientYMin), this._initParticleVelocity(velocityData.gradientYMax), this._initParticleVelocity(velocityData.gradientZMin), this._initParticleVelocity(velocityData.gradientZMax));
                    break;
            }
            var velocityOverLifetime = new VelocityOverLifetime(velocity);
            velocityOverLifetime.space = velocityOverLifetimeData.space;
            velocityOverLifetime.enable = velocityOverLifetimeData.enable;
            particleSystem.velocityOverLifetime = velocityOverLifetime;
        }
        var colorOverLifetimeData = data.colorOverLifetime;
        if (colorOverLifetimeData) {
            var colorData = colorOverLifetimeData.color;
            var color;
            switch (colorData.type) {
                case 0:
                    var constColorData = colorData.constant;
                    color = GradientColor.createByConstant(new Vector4(constColorData[0], constColorData[1], constColorData[2], constColorData[3]));
                    break;
                case 1:
                    color = GradientColor.createByGradient(this._initParticleColor(colorData.gradient));
                    break;
                case 2:
                    var minConstColorData = colorData.constantMin;
                    var maxConstColorData = colorData.constantMax;
                    color = GradientColor.createByRandomTwoConstant(new Vector4(minConstColorData[0], minConstColorData[1], minConstColorData[2], minConstColorData[3]), new Vector4(maxConstColorData[0], maxConstColorData[1], maxConstColorData[2], maxConstColorData[3]));
                    break;
                case 3:
                    color = GradientColor.createByRandomTwoGradient(this._initParticleColor(colorData.gradientMin), this._initParticleColor(colorData.gradientMax));
                    break;
            }
            var colorOverLifetime = new ColorOverLifetime(color);
            colorOverLifetime.enable = colorOverLifetimeData.enable;
            particleSystem.colorOverLifetime = colorOverLifetime;
        }
        var sizeOverLifetimeData = data.sizeOverLifetime;
        if (sizeOverLifetimeData) {
            var sizeData = sizeOverLifetimeData.size;
            var size;
            switch (sizeData.type) {
                case 0:
                    if (sizeData.separateAxes) {
                        size = GradientSize.createByGradientSeparate(this._initParticleSize(sizeData.gradientX), this._initParticleSize(sizeData.gradientY), this._initParticleSize(sizeData.gradientZ));
                    }
                    else {
                        size = GradientSize.createByGradient(this._initParticleSize(sizeData.gradient));
                    }
                    break;
                case 1:
                    if (sizeData.separateAxes) {
                        var constantMinSeparateData = sizeData.constantMinSeparate;
                        var constantMaxSeparateData = sizeData.constantMaxSeparate;
                        size = GradientSize.createByRandomTwoConstantSeparate(new Vector3(constantMinSeparateData[0], constantMinSeparateData[1], constantMinSeparateData[2]), new Vector3(constantMaxSeparateData[0], constantMaxSeparateData[1], constantMaxSeparateData[2]));
                    }
                    else {
                        size = GradientSize.createByRandomTwoConstant(sizeData.constantMin, sizeData.constantMax);
                    }
                    break;
                case 2:
                    if (sizeData.separateAxes) {
                        size = GradientSize.createByRandomTwoGradientSeparate(this._initParticleSize(sizeData.gradientXMin), this._initParticleSize(sizeData.gradientYMin), this._initParticleSize(sizeData.gradientZMin), this._initParticleSize(sizeData.gradientXMax), this._initParticleSize(sizeData.gradientYMax), this._initParticleSize(sizeData.gradientZMax));
                    }
                    else {
                        size = GradientSize.createByRandomTwoGradient(this._initParticleSize(sizeData.gradientMin), this._initParticleSize(sizeData.gradientMax));
                    }
                    break;
            }
            var sizeOverLifetime = new SizeOverLifetime(size);
            sizeOverLifetime.enable = sizeOverLifetimeData.enable;
            particleSystem.sizeOverLifetime = sizeOverLifetime;
        }
        var rotationOverLifetimeData = data.rotationOverLifetime;
        if (rotationOverLifetimeData) {
            var angularVelocityData = rotationOverLifetimeData.angularVelocity;
            var angularVelocity;
            switch (angularVelocityData.type) {
                case 0:
                    if (angularVelocityData.separateAxes) {
                        var conSep = angularVelocityData.constantSeparate;
                        angularVelocity = GradientAngularVelocity.createByConstantSeparate(new Vector3(conSep[0] * anglelToRad, conSep[1] * anglelToRad, conSep[2] * anglelToRad));
                    }
                    else {
                        angularVelocity = GradientAngularVelocity.createByConstant(angularVelocityData.constant * anglelToRad);
                    }
                    break;
                case 1:
                    if (angularVelocityData.separateAxes) {
                        angularVelocity = GradientAngularVelocity.createByGradientSeparate(this._initParticleRotation(angularVelocityData.gradientX), this._initParticleRotation(angularVelocityData.gradientY), this._initParticleRotation(angularVelocityData.gradientZ));
                    }
                    else {
                        angularVelocity = GradientAngularVelocity.createByGradient(this._initParticleRotation(angularVelocityData.gradient));
                    }
                    break;
                case 2:
                    if (angularVelocityData.separateAxes) {
                        var minSep = angularVelocityData.constantMinSeparate;
                        var maxSep = angularVelocityData.constantMaxSeparate;
                        angularVelocity = GradientAngularVelocity.createByRandomTwoConstantSeparate(new Vector3(minSep[0] * anglelToRad, minSep[1] * anglelToRad, minSep[2] * anglelToRad), new Vector3(maxSep[0] * anglelToRad, maxSep[1] * anglelToRad, maxSep[2] * anglelToRad));
                    }
                    else {
                        angularVelocity = GradientAngularVelocity.createByRandomTwoConstant(angularVelocityData.constantMin * anglelToRad, angularVelocityData.constantMax * anglelToRad);
                    }
                    break;
                case 3:
                    if (angularVelocityData.separateAxes) {
                    }
                    else {
                        angularVelocity = GradientAngularVelocity.createByRandomTwoGradient(this._initParticleRotation(angularVelocityData.gradientMin), this._initParticleRotation(angularVelocityData.gradientMax));
                    }
                    break;
            }
            var rotationOverLifetime = new RotationOverLifetime(angularVelocity);
            rotationOverLifetime.enable = rotationOverLifetimeData.enable;
            particleSystem.rotationOverLifetime = rotationOverLifetime;
        }
        var textureSheetAnimationData = data.textureSheetAnimation;
        if (textureSheetAnimationData) {
            var frameData = textureSheetAnimationData.frame;
            var frameOverTime;
            switch (frameData.type) {
                case 0:
                    frameOverTime = FrameOverTime.createByConstant(frameData.constant);
                    break;
                case 1:
                    frameOverTime = FrameOverTime.createByOverTime(this._initParticleFrame(frameData.overTime));
                    break;
                case 2:
                    frameOverTime = FrameOverTime.createByRandomTwoConstant(frameData.constantMin, frameData.constantMax);
                    break;
                case 3:
                    frameOverTime = FrameOverTime.createByRandomTwoOverTime(this._initParticleFrame(frameData.overTimeMin), this._initParticleFrame(frameData.overTimeMax));
                    break;
            }
            var startFrameData = textureSheetAnimationData.startFrame;
            var startFrame;
            switch (startFrameData.type) {
                case 0:
                    startFrame = StartFrame.createByConstant(startFrameData.constant);
                    break;
                case 1:
                    startFrame = StartFrame.createByRandomTwoConstant(startFrameData.constantMin, startFrameData.constantMax);
                    break;
            }
            var textureSheetAnimation = new TextureSheetAnimation(frameOverTime, startFrame);
            textureSheetAnimation.enable = textureSheetAnimationData.enable;
            var tilesData = textureSheetAnimationData.tiles;
            textureSheetAnimation.tiles = new Vector2(tilesData[0], tilesData[1]);
            textureSheetAnimation.type = textureSheetAnimationData.type;
            textureSheetAnimation.randomRow = textureSheetAnimationData.randomRow;
            var rowIndex = textureSheetAnimationData.rowIndex;
            (rowIndex !== undefined) && (textureSheetAnimation.rowIndex = rowIndex);
            textureSheetAnimation.cycles = textureSheetAnimationData.cycles;
            particleSystem.textureSheetAnimation = textureSheetAnimation;
        }
    }
    _initParticleColor(gradientColorData, maxkeyCount = 4) {
        var gradientColor = new Gradient(maxkeyCount, maxkeyCount);
        if (!gradientColorData) {
            gradientColor.addColorAlpha(0, 1);
            gradientColor.addColorAlpha(1, 1);
            gradientColor.addColorRGB(0, new Color(1.0, 1.0, 1.0, 1.0));
            gradientColor.addColorRGB(1, new Color(1.0, 1.0, 1.0, 1.0));
        }
        else {
            var alphasData = gradientColorData.alphas;
            var i, n;
            if (!alphasData) {
                gradientColor.addColorAlpha(0, 1);
                gradientColor.addColorAlpha(1, 1);
            }
            else {
                for (i = 0, n = alphasData.length; i < n; i++) {
                    if (i == maxkeyCount - 1 && n > maxkeyCount) {
                        i = n - 1;
                        console.warn(`GradientDataColor warning:alpha data length is large than ${maxkeyCount}, will ignore the middle data.`);
                    }
                    var alphaData = alphasData[i];
                    gradientColor.addColorAlpha(alphaData.key, alphaData.value);
                }
            }
            var rgbsData = gradientColorData.rgbs;
            if (!rgbsData) {
                gradientColor.addColorRGB(0, new Color(1.0, 1.0, 1.0, 1.0));
                gradientColor.addColorRGB(1, new Color(1.0, 1.0, 1.0, 1.0));
            }
            else {
                for (i = 0, n = rgbsData.length; i < n; i++) {
                    if (i == maxkeyCount - 1 && n > maxkeyCount) {
                        i = n - 1;
                        console.warn(`GradientDataColor warning:rgb data length is large than ${maxkeyCount}, will ignore the middle data.`);
                    }
                    var rgbData = rgbsData[i];
                    var rgbValue = rgbData.value;
                    gradientColor.addColorRGB(rgbData.key, new Color(rgbValue[0], rgbValue[1], rgbValue[2], 1.0));
                }
            }
        }
        return gradientColor;
    }
    _initParticleFrame(overTimeFramesData) {
        var overTimeFrame = new GradientDataInt();
        if (overTimeFramesData) {
            var framesData = overTimeFramesData.frames;
            for (var i = 0, n = framesData.length; i < n; i++) {
                var frameData = framesData[i];
                overTimeFrame.add(frameData.key, frameData.value);
            }
        }
        else {
            overTimeFrame.add(0, 0);
            overTimeFrame.add(1, 1);
        }
        return overTimeFrame;
    }
    static _initStartLife(gradientData) {
        var gradient = new GradientDataNumber();
        var startLifetimesData = gradientData.startLifetimes;
        for (var i = 0, n = startLifetimesData.length; i < n; i++) {
            var valueData = startLifetimesData[i];
            gradient.add(valueData.key, valueData.value);
        }
        return gradient;
    }
    _initParticleVelocity(gradientData) {
        var gradient = new GradientDataNumber();
        var velocitysData = gradientData.velocitys;
        for (var i = 0, n = velocitysData.length; i < n; i++) {
            var valueData = velocitysData[i];
            gradient.add(valueData.key, valueData.value);
        }
        return gradient;
    }
    _initParticleSize(gradientSizeData) {
        var gradientSize = new GradientDataNumber();
        if (gradientSizeData) {
            var sizesData = gradientSizeData.sizes;
            for (var i = 0, n = sizesData.length; i < n; i++) {
                var valueData = sizesData[i];
                gradientSize.add(valueData.key, valueData.value);
            }
        }
        else {
            gradientSize.add(0, 0);
            gradientSize.add(1, 1);
        }
        return gradientSize;
    }
    _initParticleRotation(gradientData) {
        var gradient = new GradientDataNumber();
        var angularVelocitysData = gradientData.angularVelocitys;
        for (var i = 0, n = angularVelocitysData.length; i < n; i++) {
            var valueData = angularVelocitysData[i];
            gradient.add(valueData.key, valueData.value / 180.0 * Math.PI);
        }
        return gradient;
    }
}

//# sourceMappingURL=ShuriKenParticle3D.js.map
