import { LayaGL } from "../../../../layagl/LayaGL";
import { RenderContext3D } from "../RenderContext3D";
import { ScreenQuad } from "../ScreenQuad";
import { Command } from "./Command";
import { Shader3D } from "../../../../RenderEngine/RenderShader/Shader3D";
import { RenderElement } from "../RenderElement";
import { Camera } from "../../Camera";
import { Vector4 } from "../../../../maths/Vector4";
import { RenderTexture } from "../../../../resource/RenderTexture";
export class BlitFrameBufferCMD {
    constructor() {
        this._source = null;
        this._dest = null;
        this._offsetScale = null;
        this._texture_size = null;
        this._shader = null;
        this._shaderData = null;
        this._subShader = 0;
        this._viewPort = null;
        this._transform3D = LayaGL.renderOBJCreate.createTransform(null);
        this._renderElement = new RenderElement();
        this._renderElement.setTransform(this._transform3D);
        this._renderElement.setGeometry(ScreenQuad.instance);
        this._texture_size = new Vector4();
    }
    static __init__() {
        BlitFrameBufferCMD.shaderdata = LayaGL.renderOBJCreate.createShaderData(null);
        BlitFrameBufferCMD.GAMMAOUT = Shader3D.getDefineByName("GAMMAOUT");
    }
    static create(source, dest, viewport, offsetScale = null, shader = null, shaderData = null, subShader = 0) {
        var cmd;
        cmd = BlitFrameBufferCMD._pool.length > 0 ? BlitFrameBufferCMD._pool.pop() : new BlitFrameBufferCMD();
        cmd._source = source;
        cmd._dest = dest;
        cmd._offsetScale = offsetScale;
        cmd.setshader(shader, subShader, shaderData);
        cmd._source && cmd._texture_size.setValue(source.width, source.height, 1.0 / source.width, 1.0 / source.height);
        cmd._viewPort = viewport;
        return cmd;
    }
    set shaderData(value) {
        this._shaderData = value || BlitFrameBufferCMD.shaderdata;
        this._renderElement._renderElementOBJ._materialShaderData = this._shaderData;
    }
    setshader(shader, subShader, shaderData) {
        this._shader = shader || Command._screenShader;
        this._subShader = subShader || 0;
        this.shaderData = shaderData;
        this._renderElement.renderSubShader = this._shader.getSubShaderAt(this._subShader);
    }
    run() {
        if (!this._source || !this._viewPort)
            return;
        var source = this._source;
        var dest = this._dest;
        var shader = this._shader;
        var shaderData = this._shaderData;
        var viewport = this._viewPort;
        let vph = RenderContext3D.clientHeight - viewport.y - viewport.height;
        let context = RenderContext3D._instance;
        context.changeViewport(viewport.x, vph, viewport.width, viewport.height);
        context.changeScissor(viewport.x, vph, viewport.width, viewport.height);
        shaderData.setTexture(Command.SCREENTEXTURE_ID, source);
        shaderData.setVector(Command.SCREENTEXTUREOFFSETSCALE_ID, this._offsetScale || BlitFrameBufferCMD._defaultOffsetScale);
        source && (shaderData.setVector(Command.MAINTEXTURE_TEXELSIZE_ID, this._texture_size));
        (RenderTexture.currentActive) && (RenderTexture.currentActive._end());
        if (!dest) {
            shaderData.addDefine(BlitFrameBufferCMD.GAMMAOUT);
        }
        else {
            dest._start();
            shaderData.removeDefine(BlitFrameBufferCMD.GAMMAOUT);
        }
        var subShader = shader.getSubShaderAt(this._subShader);
        var passes = subShader._passes;
        ScreenQuad.instance.invertY = false;
        context.destTarget = dest;
        context._contextOBJ.applyContext(Camera._updateMark);
        context.drawRenderElement(this._renderElement);
    }
    recover() {
        BlitFrameBufferCMD._pool.push(this);
        this._source = null;
        this._dest = null;
        this._offsetScale = null;
        this._shader = null;
        this._shaderData = null;
        this._viewPort = null;
    }
}
BlitFrameBufferCMD._pool = [];
BlitFrameBufferCMD._defaultOffsetScale = new Vector4(0, 0, 1, 1);

//# sourceMappingURL=BlitFrameBufferCMD.js.map
