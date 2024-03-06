(function (exports, Laya) {
    'use strict';

    class ExternalSkin {
        get source() {
            return this._source;
        }
        set source(value) {
            this._source = value;
            if (value) {
                Laya.ILaya.loader.load(value, Laya.Loader.SPINE).then((templet) => {
                    if (!this._source || templet && !templet.isCreateFromURL(this._source))
                        return;
                    this.templet = templet;
                });
            }
            else
                this.templet = null;
        }
        set items(value) {
            this._items = value;
        }
        get items() {
            return this._items;
        }
        get templet() {
            return this._templet;
        }
        set templet(value) {
            this.init(value);
        }
        init(templet) {
            this._templet = templet;
            if (!this._templet) {
                return;
            }
            this.flush();
        }
        flush() {
            if (this.target && this.target.templet && this._items && this._templet && this._templet.skeletonData) {
                if (null == this.target.templet._textures)
                    return;
                for (let i = this._items.length - 1; i >= 0; i--) {
                    let o = this._items[i];
                    let attachmentStr = o.attachment;
                    let slot = o.slot;
                    let skinStr = o.skin;
                    if (attachmentStr && slot && skinStr) {
                        let attachment = null;
                        let skins = this._templet.skeletonData.skins;
                        for (let j = skins.length - 1; j >= 0; j--) {
                            if (skins[j].name == skinStr) {
                                let skin = skins[j];
                                let attachments = skin.attachments;
                                for (let j = attachments.length - 1; j >= 0; j--) {
                                    attachment = attachments[j][attachmentStr];
                                    if (attachment) {
                                        break;
                                    }
                                }
                                break;
                            }
                        }
                        if (attachment) {
                            let regionPage = attachment.region.page;
                            this.target.templet._textures[regionPage.name] = regionPage.texture;
                            let slotObj = this.target.getSkeleton().findSlot(slot);
                            if (slotObj) {
                                slotObj.setAttachment(attachment);
                            }
                        }
                    }
                }
            }
        }
    }

    class ExternalSkinItem {
        get skin() {
            return this._skin;
        }
        set skin(value) {
            this._skin = value;
        }
        set slot(value) {
            this._slot = value;
        }
        get slot() {
            return this._slot;
        }
        set attachment(value) {
            this._attachment = value;
        }
        get attachment() {
            return this._attachment;
        }
    }

    const QUAD_TRIANGLES = [0, 1, 2, 2, 3, 0];
    class SpineSkeletonRenderer {
        constructor(templet, twoColorTint = true) {
            this.vertexEffect = null;
            this.tempColor = new spine.Color();
            this.tempColor2 = new spine.Color();
            this.vertexSize = 2 + 2 + 4;
            this.twoColorTint = false;
            this.temp = new spine.Vector2();
            this.temp2 = new spine.Vector2();
            this.temp3 = new spine.Color();
            this.temp4 = new spine.Color();
            this.twoColorTint = twoColorTint;
            if (twoColorTint)
                this.vertexSize += 4;
            this.templet = templet;
            this.vertices = templet.ns.Utils.newFloatArray(this.vertexSize * 1024);
            this.renderable = { vertices: null, numVertices: 0, numFloats: 0 };
            this.clipper = new templet.ns.SkeletonClipping();
        }
        draw(skeleton, graphics, slotRangeStart = -1, slotRangeEnd = -1) {
            let clipper = this.clipper;
            let premultipliedAlpha = this.premultipliedAlpha;
            let twoColorTint = false;
            let tempPos = this.temp;
            let tempUv = this.temp2;
            let tempLight = this.temp3;
            let tempDark = this.temp4;
            let renderable = this.renderable;
            let uvs = null;
            let triangles = null;
            let drawOrder = skeleton.drawOrder;
            let attachmentColor = null;
            let skeletonColor = skeleton.color;
            let vertexSize = 8;
            let inRange = false;
            if (slotRangeStart == -1)
                inRange = true;
            for (let i = 0, n = drawOrder.length; i < n; i++) {
                let clippedVertexSize = clipper.isClipping() ? 2 : vertexSize;
                let slot = drawOrder[i];
                if (slotRangeStart >= 0 && slotRangeStart == slot.data.index) {
                    inRange = true;
                }
                if (!inRange) {
                    clipper.clipEndWithSlot(slot);
                    continue;
                }
                if (slotRangeEnd >= 0 && slotRangeEnd == slot.data.index) {
                    inRange = false;
                }
                let attachment = slot.getAttachment();
                let name = null;
                let texture;
                if (attachment instanceof this.templet.ns.RegionAttachment) {
                    let region = attachment;
                    renderable.vertices = this.vertices;
                    renderable.numVertices = 4;
                    renderable.numFloats = clippedVertexSize << 2;
                    region.computeWorldVertices(slot.bone, renderable.vertices, 0, clippedVertexSize);
                    triangles = QUAD_TRIANGLES;
                    uvs = region.uvs;
                    name = region.region.renderObject.page.name;
                    texture = this.templet.getTexture(name);
                    attachmentColor = region.color;
                }
                else if (attachment instanceof this.templet.ns.MeshAttachment) {
                    let mesh = attachment;
                    renderable.vertices = this.vertices;
                    renderable.numVertices = (mesh.worldVerticesLength >> 1);
                    renderable.numFloats = renderable.numVertices * clippedVertexSize;
                    if (renderable.numFloats > renderable.vertices.length) {
                        renderable.vertices = this.vertices = this.templet.ns.Utils.newFloatArray(renderable.numFloats);
                    }
                    mesh.computeWorldVertices(slot, 0, mesh.worldVerticesLength, renderable.vertices, 0, clippedVertexSize);
                    triangles = mesh.triangles;
                    name = mesh.region.renderObject.page.name;
                    texture = this.templet.getTexture(name);
                    uvs = mesh.uvs;
                    attachmentColor = mesh.color;
                }
                else if (attachment instanceof this.templet.ns.ClippingAttachment) {
                    let clip = (attachment);
                    clipper.clipStart(slot, clip);
                    continue;
                }
                else {
                    clipper.clipEndWithSlot(slot);
                    continue;
                }
                if (texture != null) {
                    let slotColor = slot.color;
                    let finalColor = this.tempColor;
                    finalColor.r = skeletonColor.r * slotColor.r * attachmentColor.r;
                    finalColor.g = skeletonColor.g * slotColor.g * attachmentColor.g;
                    finalColor.b = skeletonColor.b * slotColor.b * attachmentColor.b;
                    finalColor.a = skeletonColor.a * slotColor.a * attachmentColor.a;
                    if (premultipliedAlpha) {
                        finalColor.r *= finalColor.a;
                        finalColor.g *= finalColor.a;
                        finalColor.b *= finalColor.a;
                    }
                    let slotBlendMode = slot.data.blendMode;
                    if (clipper.isClipping()) {
                        clipper.clipTriangles(renderable.vertices, renderable.numFloats, triangles, triangles.length, uvs, finalColor, null, twoColorTint);
                        let clippedVertices = new Float32Array(clipper.clippedVertices);
                        let clippedTriangles = clipper.clippedTriangles;
                        let mVertices = [];
                        let mUVs = [];
                        let colorNum = 0xffffff;
                        let alpha = 1;
                        if (this.vertexEffect != null) {
                            let vertexEffect = this.vertexEffect;
                            let verts = clippedVertices;
                            {
                                for (let v = 0, n = clippedVertices.length; v < n; v += vertexSize) {
                                    tempPos.x = verts[v];
                                    tempPos.y = verts[v + 1];
                                    tempLight.set(verts[v + 2], verts[v + 3], verts[v + 4], verts[v + 5]);
                                    tempUv.x = verts[v + 6];
                                    tempUv.y = verts[v + 7];
                                    tempDark.set(0, 0, 0, 0);
                                    vertexEffect.transform(tempPos, tempUv, tempLight, tempDark);
                                    verts[v] = tempPos.x;
                                    verts[v + 1] = tempPos.y;
                                    verts[v + 2] = tempLight.r;
                                    verts[v + 3] = tempLight.g;
                                    verts[v + 4] = tempLight.b;
                                    verts[v + 5] = tempLight.a;
                                    verts[v + 6] = tempUv.x;
                                    verts[v + 7] = tempUv.y;
                                    mVertices.push(verts[v], -verts[v + 1]);
                                    colorNum = (verts[v + 2] * 255 << 16) + (verts[v + 3] * 255 << 8) + verts[v + 4];
                                    alpha = verts[v + 5];
                                    mUVs.push(verts[v + 6], verts[v + 7]);
                                }
                            }
                        }
                        else {
                            let vi = 0;
                            while (Number.isFinite(clippedVertices[vi + 6]) && Number.isFinite(clippedVertices[vi + 7])) {
                                mVertices.push(clippedVertices[vi]);
                                mVertices.push(-clippedVertices[vi + 1]);
                                colorNum = (clippedVertices[vi + 2] * 255 << 16) + (clippedVertices[vi + 3] * 255 << 8) + clippedVertices[vi + 4] * 255;
                                alpha = clippedVertices[vi + 5];
                                mUVs.push(clippedVertices[vi + 6]);
                                mUVs.push(clippedVertices[vi + 7]);
                                vi += this.vertexSize;
                            }
                        }
                        let blendMode;
                        switch (slotBlendMode) {
                            case 1:
                                blendMode = "light";
                                break;
                            case 2:
                                blendMode = "multiply";
                                break;
                            case 3:
                                blendMode = "screen";
                                break;
                            default:
                                blendMode = "normal";
                        }
                        graphics.drawTriangles(texture.realTexture, 0, 0, mVertices, mUVs, new Uint16Array(clippedTriangles), Laya.Matrix.EMPTY, alpha, colorNum, blendMode);
                    }
                    else {
                        let verts = renderable.vertices;
                        let mVertices = [];
                        let mUVs = [];
                        let colorNum = 0xffffff;
                        let alpha = 1;
                        if (this.vertexEffect != null) {
                            let vertexEffect = this.vertexEffect;
                            {
                                for (let v = 0, u = 0, n = renderable.numFloats; v < n; v += vertexSize, u += 2) {
                                    tempPos.x = verts[v];
                                    tempPos.y = verts[v + 1];
                                    tempUv.x = uvs[u];
                                    tempUv.y = uvs[u + 1];
                                    tempLight.setFromColor(finalColor);
                                    tempDark.set(0, 0, 0, 0);
                                    vertexEffect.transform(tempPos, tempUv, tempLight, tempDark);
                                    verts[v] = tempPos.x;
                                    verts[v + 1] = tempPos.y;
                                    verts[v + 2] = tempLight.r;
                                    verts[v + 3] = tempLight.g;
                                    verts[v + 4] = tempLight.b;
                                    verts[v + 5] = tempLight.a;
                                    verts[v + 6] = tempUv.x;
                                    verts[v + 7] = tempUv.y;
                                    mVertices.push(verts[v], -verts[v + 1]);
                                    colorNum = (verts[v + 2] * 255 << 16) + (verts[v + 3] * 255 << 8) + verts[v + 4] * 255;
                                    alpha = verts[v + 5];
                                    mUVs.push(verts[v + 6], verts[v + 7]);
                                }
                            }
                        }
                        else {
                            {
                                for (let v = 2, u = 0, n = renderable.numFloats; v < n; v += vertexSize, u += 2) {
                                    verts[v] = finalColor.r;
                                    verts[v + 1] = finalColor.g;
                                    verts[v + 2] = finalColor.b;
                                    verts[v + 3] = finalColor.a;
                                    verts[v + 4] = uvs[u];
                                    verts[v + 5] = uvs[u + 1];
                                    mVertices.push(verts[v - 2], -verts[v - 1]);
                                    colorNum = (verts[v] * 255 << 16) + (verts[v + 1] * 255 << 8) + verts[v + 2] * 255;
                                    alpha = verts[v + 3];
                                    mUVs.push(verts[v + 4], verts[v + 5]);
                                }
                            }
                        }
                        let blendMode;
                        switch (slotBlendMode) {
                            case 1:
                                blendMode = "light";
                                break;
                            case 2:
                                blendMode = "multiply";
                                break;
                            case 3:
                                blendMode = "screen";
                                break;
                            default:
                                blendMode = "normal";
                        }
                        graphics.drawTriangles(texture.realTexture, 0, 0, mVertices, mUVs, new Uint16Array(triangles), Laya.Matrix.EMPTY, alpha, colorNum, blendMode);
                    }
                }
                clipper.clipEndWithSlot(slot);
            }
            clipper.clipEnd();
        }
    }

    class SpineSkeleton extends Laya.Sprite {
        constructor() {
            super();
            this._currentPlayTime = 0;
            this._pause = true;
            this._currAniName = null;
            this._playbackRate = 1.0;
            this._playAudio = true;
            this._soundChannelArr = [];
            this.trackIndex = 0;
            this._skinName = "default";
            this._animationName = "";
            this._loop = true;
        }
        get externalSkins() {
            return this._externalSkins;
        }
        set externalSkins(value) {
            if (value) {
                for (let i = value.length - 1; i >= 0; i--) {
                    value[i].target = this;
                }
            }
            this._externalSkins = value;
        }
        resetExternalSkin() {
            if (this._skeleton) {
                this._skeleton = new this._templet.ns.Skeleton(this._templet.skeletonData);
                this._flushExtSkin();
            }
        }
        get source() {
            return this._source;
        }
        set source(value) {
            this._source = value;
            if (value) {
                Laya.ILaya.loader.load(value, Laya.Loader.SPINE).then((templet) => {
                    if (!this._source || templet && !templet.isCreateFromURL(this._source))
                        return;
                    this.templet = templet;
                });
            }
            else
                this.templet = null;
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
        set currentTime(value) {
            if (!this._currAniName || !this._templet)
                return;
            value /= 1000;
            if (value < this._playStart || (!!this._playEnd && value > this._playEnd) || value > this._duration)
                throw new Error("AnimationPlayer: value must large than playStartTime,small than playEndTime.");
            this._state.update(value - this._currentPlayTime);
            this._currentPlayTime = value;
        }
        get playState() {
            if (!this._currAniName)
                return SpineSkeleton.STOPPED;
            if (this._pause)
                return SpineSkeleton.PAUSED;
            return SpineSkeleton.PLAYING;
        }
        init(templet) {
            if (this._templet) {
                this.reset();
                this.graphics.clear();
            }
            this._templet = templet;
            if (!this._templet)
                return;
            this._templet._addReference();
            this._skeleton = new templet.ns.Skeleton(this._templet.skeletonData);
            this._stateData = new templet.ns.AnimationStateData(this._skeleton.data);
            this._state = new templet.ns.AnimationState(this._stateData);
            this._renerer = new SpineSkeletonRenderer(templet, false);
            this._timeKeeper = new templet.ns.TimeKeeper();
            let skinIndex = this._templet.getSkinIndexByName(this._skinName);
            if (skinIndex != -1)
                this.showSkinByIndex(skinIndex);
            this._state.addListener({
                start: (entry) => {
                },
                interrupt: (entry) => {
                },
                end: (entry) => {
                },
                dispose: (entry) => {
                },
                complete: (entry) => {
                    if (entry.loop) {
                        this.event(Laya.Event.COMPLETE);
                    }
                    else {
                        this._currAniName = null;
                        this.event(Laya.Event.STOPPED);
                    }
                },
                event: (entry, event) => {
                    let eventData = {
                        audioValue: event.data.audioPath,
                        audioPath: event.data.audioPath,
                        floatValue: event.floatValue,
                        intValue: event.intValue,
                        name: event.data.name,
                        stringValue: event.stringValue,
                        time: event.time * 1000,
                        balance: event.balance,
                        volume: event.volume
                    };
                    this.event(Laya.Event.LABEL, eventData);
                    if (this._playAudio && eventData.audioValue) {
                        let channel = Laya.SoundManager.playSound(templet.basePath + eventData.audioValue, 1, Laya.Handler.create(this, this._onAniSoundStoped), null, (this._currentPlayTime * 1000 - eventData.time) / 1000);
                        Laya.SoundManager.playbackRate = this._playbackRate;
                        channel && this._soundChannelArr.push(channel);
                    }
                },
            });
            this._flushExtSkin();
            this.event(Laya.Event.READY);
            if (Laya.LayaEnv.isPlaying && this._animationName)
                this.play(this._animationName, this._loop, true);
        }
        play(nameOrIndex, loop, force = true, start = 0, end = 0, freshSkin = true, playAudio = true) {
            this._playAudio = playAudio;
            start /= 1000;
            end /= 1000;
            let animationName = nameOrIndex;
            if (start < 0 || end < 0)
                throw new Error("SpineSkeleton: start and end must large than zero.");
            if ((end !== 0) && (start > end))
                throw new Error("SpineSkeleton: start must less than end.");
            if (typeof animationName == "number") {
                animationName = this.getAniNameByIndex(nameOrIndex);
            }
            if (force || this._pause || this._currAniName != animationName) {
                this._currAniName = animationName;
                this._state.setAnimation(this.trackIndex, animationName, loop);
                let trackEntry = this._state.getCurrent(this.trackIndex);
                trackEntry.animationStart = start;
                if (!!end && end < trackEntry.animationEnd)
                    trackEntry.animationEnd = end;
                let animationDuration = trackEntry.animation.duration;
                this._duration = animationDuration;
                this._playStart = start;
                this._playEnd = end <= animationDuration ? end : animationDuration;
                if (this._pause) {
                    this._pause = false;
                    this.timer.frameLoop(1, this, this._update, null, true);
                }
                this._update();
            }
        }
        _update() {
            this._timeKeeper.update();
            let delta = this._timeKeeper.delta * this._playbackRate;
            let trackEntry = this._state.getCurrent(this.trackIndex);
            this._state.update(delta);
            this._state.apply(this._skeleton);
            let animationLast = trackEntry.animationLast;
            this._currentPlayTime = Math.max(0, animationLast);
            if (!this._state || !this._skeleton) {
                return;
            }
            this._skeleton.updateWorldTransform();
            this.graphics.clear();
            this._renerer.draw(this._skeleton, this.graphics, -1, -1);
        }
        _flushExtSkin() {
            if (null == this._skeleton)
                return;
            let skins = this._externalSkins;
            if (skins) {
                for (let i = skins.length - 1; i >= 0; i--) {
                    skins[i].flush();
                }
            }
        }
        getAnimNum() {
            return this._templet.skeletonData.animations.length;
        }
        getAniNameByIndex(index) {
            return this._templet.getAniNameByIndex(index);
        }
        getSlotByName(slotName) {
            return this._skeleton.findSlot(slotName);
        }
        playbackRate(value) {
            this._playbackRate = value;
        }
        showSkinByName(name) {
            this.showSkinByIndex(this._templet.getSkinIndexByName(name));
        }
        showSkinByIndex(skinIndex) {
            let newSkine = this._skeleton.data.skins[skinIndex];
            this._skeleton.setSkin(newSkine);
            this._skeleton.setSlotsToSetupPose();
        }
        stop() {
            if (!this._pause) {
                this._pause = true;
                this._currAniName = null;
                this.timer.clear(this, this._update);
                this._state.update(-this._currentPlayTime);
                this._currentPlayTime = 0;
                this.event(Laya.Event.STOPPED);
                if (this._soundChannelArr.length > 0) {
                    this._onAniSoundStoped(true);
                }
            }
        }
        paused() {
            if (!this._pause) {
                this._pause = true;
                this.timer.clear(this, this._update);
                this.event(Laya.Event.PAUSED);
                if (this._soundChannelArr.length > 0) {
                    for (let len = this._soundChannelArr.length, i = 0; i < len; i++) {
                        let channel = this._soundChannelArr[i];
                        if (!channel.isStopped) {
                            channel.pause();
                        }
                    }
                }
            }
        }
        resume() {
            if (this._pause) {
                this._pause = false;
                this.timer.frameLoop(1, this, this._update, null, true);
                if (this._soundChannelArr.length > 0) {
                    for (let len = this._soundChannelArr.length, i = 0; i < len; i++) {
                        let channel = this._soundChannelArr[i];
                        if (channel.audioBuffer) {
                            channel.resume();
                        }
                    }
                }
            }
        }
        _onAniSoundStoped(force) {
            for (let len = this._soundChannelArr.length, i = 0; i < len; i++) {
                let channel = this._soundChannelArr[i];
                if (channel.isStopped || force) {
                    !channel.isStopped && channel.stop();
                    this._soundChannelArr.splice(i, 1);
                    len--;
                    i--;
                }
            }
        }
        reset() {
            this._templet._removeReference(1);
            this._templet = null;
            this._timeKeeper = null;
            this._skeleton = null;
            this._state.clearListeners();
            this._state = null;
            this._renerer = null;
            this._currAniName = null;
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
        addAnimation(nameOrIndex, loop = false, delay = 0) {
            delay /= 1000;
            let animationName = nameOrIndex;
            if (typeof animationName == "number") {
                animationName = this.getAniNameByIndex(animationName);
            }
            this._currAniName = animationName;
            this._state.addAnimation(this.trackIndex, animationName, loop, delay);
        }
        setMix(fromNameOrIndex, toNameOrIndex, duration) {
            duration /= 1000;
            let fromName = fromNameOrIndex;
            if (typeof fromName == "number") {
                fromName = this.getAniNameByIndex(fromName);
            }
            let toName = toNameOrIndex;
            if (typeof toName == "number") {
                toName = this.getAniNameByIndex(toName);
            }
            this._stateData.setMix(fromName, toName, duration);
        }
        getBoneByName(boneName) {
            return this._skeleton.findBone(boneName);
        }
        getSkeleton() {
            return this._skeleton;
        }
        setSlotAttachment(slotName, attachmentName) {
            this._skeleton.setAttachment(slotName, attachmentName);
        }
    }
    SpineSkeleton.STOPPED = 0;
    SpineSkeleton.PAUSED = 1;
    SpineSkeleton.PLAYING = 2;

    class SpineTexture {
        constructor(tex) {
            this.realTexture = tex;
        }
        getImage() {
            var _a, _b, _c, _d;
            return {
                width: (_b = ((_a = this.realTexture) === null || _a === void 0 ? void 0 : _a.sourceWidth)) !== null && _b !== void 0 ? _b : 16,
                height: (_d = ((_c = this.realTexture) === null || _c === void 0 ? void 0 : _c.sourceHeight)) !== null && _d !== void 0 ? _d : 16,
            };
        }
        setFilters(minFilter, magFilter) {
            if (!this.realTexture)
                return;
            let filterMode;
            if (magFilter === spine.TextureFilter.Nearest)
                filterMode = Laya.FilterMode.Point;
            else
                filterMode = Laya.FilterMode.Bilinear;
            this.realTexture.bitmap.filterMode = filterMode;
        }
        convertWrapMode(mode) {
            return mode == spine.TextureWrap.ClampToEdge ? Laya.WrapMode.Clamp : (mode == spine.TextureWrap.MirroredRepeat ? Laya.WrapMode.Mirrored : Laya.WrapMode.Repeat);
        }
        setWraps(uWrap, vWrap) {
            if (!this.realTexture)
                return;
            let tex2D = this.realTexture.bitmap;
            tex2D.wrapModeU = this.convertWrapMode(uWrap);
            tex2D.wrapModeV = this.convertWrapMode(vWrap);
        }
    }

    class SpineTemplet extends Laya.Resource {
        constructor() {
            super();
            this._textures = {};
        }
        get ns() {
            return this._ns;
        }
        get basePath() {
            return this._basePath;
        }
        getTexture(name) {
            return this._textures[name];
        }
        _parse(desc, atlasText, createURL, progress) {
            this._basePath = Laya.URL.getPath(createURL);
            let version = this.getRuntimeVersion(desc);
            let parseAtlas;
            if (version == "4.0")
                parseAtlas = this.parseAtlas4;
            else
                parseAtlas = this.parseAtlas3;
            return parseAtlas.call(this, atlasText, progress).then((atlas) => {
                let atlasLoader = new this._ns.AtlasAttachmentLoader(atlas);
                if (desc instanceof ArrayBuffer) {
                    let skeletonBinary = new this._ns.SkeletonBinary(atlasLoader);
                    this.skeletonData = skeletonBinary.readSkeletonData(new Uint8Array(desc));
                }
                else {
                    let skeletonJson = new this._ns.SkeletonJson(atlasLoader);
                    this.skeletonData = skeletonJson.readSkeletonData(desc);
                }
            });
        }
        getRuntimeVersion(desc) {
            this._ns = spine;
            return SpineTemplet.RuntimeVersion;
        }
        parseAtlas3(atlasText, progress) {
            let atlasPages = [];
            new this._ns.TextureAtlas(atlasText, (path) => {
                atlasPages.push({ url: this._basePath + path });
                return new SpineTexture(null);
            });
            return Laya.ILaya.loader.load(atlasPages, null, progress === null || progress === void 0 ? void 0 : progress.createCallback()).then((res) => {
                let i = 0;
                let atlas = new this._ns.TextureAtlas(atlasText, (path) => {
                    let tex = res[i++];
                    if (tex)
                        tex._addReference();
                    let spineTex = new SpineTexture(tex);
                    this._textures[path] = spineTex;
                    return spineTex;
                });
                return atlas;
            });
        }
        parseAtlas4(atlasText, progress) {
            let atlas = new this._ns.TextureAtlas(atlasText);
            return Laya.ILaya.loader.load(atlas.pages.map((page) => this._basePath + page.name), null, progress === null || progress === void 0 ? void 0 : progress.createCallback()).then((res) => {
                let i = 0;
                for (let page of atlas.pages) {
                    let tex = res[i++];
                    if (tex)
                        tex._addReference();
                    let spineTex = new SpineTexture(tex);
                    this._textures[page.name] = spineTex;
                    page.setTexture(spineTex);
                }
                return atlas;
            });
        }
        getAniNameByIndex(index) {
            let tAni = this.skeletonData.animations[index];
            if (tAni)
                return tAni.name;
            return null;
        }
        getSkinIndexByName(skinName) {
            let skins = this.skeletonData.skins;
            let tSkinData;
            for (let i = 0, n = skins.length; i < n; i++) {
                tSkinData = skins[i];
                if (tSkinData.name == skinName) {
                    return i;
                }
            }
            return -1;
        }
        _disposeResource() {
            var _a;
            for (let k in this._textures) {
                (_a = this._textures[k].realTexture) === null || _a === void 0 ? void 0 : _a._removeReference();
            }
        }
    }
    SpineTemplet.RuntimeVersion = "3.8";

    class SpineTempletLoader {
        load(task) {
            let atlasUrl = Laya.Utils.replaceFileExtension(task.url, "atlas");
            return Promise.all([
                task.loader.fetch(task.url, task.ext == "skel" ? "arraybuffer" : "json", task.progress.createCallback()),
                task.loader.fetch(atlasUrl, "text", task.progress.createCallback())
            ]).then(res => {
                if (!res[0] || !res[1])
                    return null;
                let templet = new SpineTemplet();
                return templet._parse(res[0], res[1], task.url, task.progress).then(() => templet);
            });
        }
    }
    Laya.Loader.registerLoader(["skel"], SpineTempletLoader, Laya.Loader.SPINE);

    let c = Laya.ClassUtils.regClass;
    c("SpineSkeleton", SpineSkeleton);
    c("ExternalSkin", ExternalSkin);
    c("ExternalSkinItem", ExternalSkinItem);

    exports.ExternalSkin = ExternalSkin;
    exports.ExternalSkinItem = ExternalSkinItem;
    exports.SpineSkeleton = SpineSkeleton;
    exports.SpineSkeletonRenderer = SpineSkeletonRenderer;
    exports.SpineTemplet = SpineTemplet;
    exports.SpineTexture = SpineTexture;

})(window.Laya = window.Laya || {}, Laya);
//# sourceMappingURL=laya.spine.js.map
