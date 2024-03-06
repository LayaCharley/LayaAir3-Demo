import { LayaGL } from "../../../../layagl/LayaGL";
import { Stat } from "../../../../utils/Stat";
import { RenderContext3D } from "../RenderContext3D";
import { RenderElement } from "../RenderElement";
import { ScreenQuad } from "../ScreenQuad";
import { Command } from "./Command";
import { Camera } from "../../Camera";
import { Vector4 } from "../../../../maths/Vector4";
export class BlitScreenQuadCMD extends Command {
    constructor() {
        super();
        this._source = null;
        this._dest = null;
        this._offsetScale = null;
        this._shader = null;
        this._shaderData = null;
        this._subShader = 0;
        this._sourceTexelSize = new Vector4();
        this._transform3D = LayaGL.renderOBJCreate.createTransform(null);
        this._renderElement = new RenderElement();
        this._renderElement.setTransform(this._transform3D);
        this._renderElement.setGeometry(ScreenQuad.instance);
    }
    static create(source, dest, offsetScale = null, shader = null, shaderData = null, subShader = 0, screenType = BlitScreenQuadCMD._SCREENTYPE_QUAD, commandbuffer = null) {
        var cmd;
        cmd = BlitScreenQuadCMD._pool.length > 0 ? BlitScreenQuadCMD._pool.pop() : new BlitScreenQuadCMD();
        cmd._source = source;
        cmd._dest = dest;
        cmd._offsetScale = offsetScale;
        cmd.setshader(shader, subShader, shaderData);
        cmd._commandBuffer = commandbuffer;
        return cmd;
    }
    set shaderData(value) {
        this._shaderData = value || Command._screenShaderData;
        this._renderElement._renderElementOBJ._materialShaderData = this._shaderData;
    }
    setshader(shader, subShader, shaderData) {
        this._shader = shader || Command._screenShader;
        this._subShader = subShader || 0;
        this.shaderData = shaderData;
        this._renderElement.renderSubShader = this._shader.getSubShaderAt(this._subShader);
        this._renderElement._subShaderIndex = subShader;
    }
    run() {
        this._commandBuffer && (this.setContext(this._commandBuffer._context));
        var context = this._context;
        var source;
        if (!this._source) {
            if (!this._commandBuffer._camera._internalRenderTexture)
                throw "camera internalRenderTexture is null,please set camera enableBuiltInRenderTexture";
            source = this._commandBuffer._camera._internalRenderTexture;
        }
        else
            source = this._source;
        var shaderData = this._shaderData;
        var dest = this._dest ? this._dest : this._commandBuffer._camera._internalRenderTexture;
        if (dest) {
            context.changeViewport(0, 0, dest.width, dest.height);
            context.changeScissor(0, 0, dest.width, dest.height);
        }
        else {
            let camera = this._commandBuffer._camera;
            let viewport = camera.viewport;
            let vpH = viewport.height;
            let vpY = RenderContext3D.clientHeight - viewport.y - vpH;
            context.changeViewport(viewport.x, vpY, viewport.width, vpH);
            context.changeScissor(viewport.x, vpY, viewport.width, vpH);
        }
        shaderData.setTexture(Command.SCREENTEXTURE_ID, source);
        shaderData.setVector(Command.SCREENTEXTUREOFFSETSCALE_ID, this._offsetScale || BlitScreenQuadCMD._defaultOffsetScale);
        this._sourceTexelSize.setValue(1.0 / source.width, 1.0 / source.height, source.width, source.height);
        shaderData.setVector(Command.MAINTEXTURE_TEXELSIZE_ID, this._sourceTexelSize);
        context.destTarget = dest;
        context._contextOBJ.applyContext(Camera._updateMark);
        ScreenQuad.instance.invertY = context.invertY;
        context.drawRenderElement(this._renderElement);
        Stat.blitDrawCall++;
    }
    recover() {
        BlitScreenQuadCMD._pool.push(this);
        this._source = null;
        this._dest = null;
        this._offsetScale = null;
        this._shader = null;
        this._shaderData = null;
        super.recover();
    }
    destroy() {
        this._source = null;
        this._dest = null;
        this._offsetScale = null;
        this._shader = null;
        this._shaderData = null;
        this._renderElement.destroy();
    }
}
BlitScreenQuadCMD._SCREENTYPE_QUAD = 0;
BlitScreenQuadCMD._SCREENTYPE_TRIANGLE = 1;
BlitScreenQuadCMD._pool = [];
BlitScreenQuadCMD._defaultOffsetScale = new Vector4(0, 0, 1, 1);

//# sourceMappingURL=BlitScreenQuadCMD.js.map
