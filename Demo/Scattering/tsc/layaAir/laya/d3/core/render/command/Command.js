import { LayaGL } from "../../../../layagl/LayaGL";
import { Shader3D } from "../../../../RenderEngine/RenderShader/Shader3D";
export class Command {
    constructor() {
        this._commandBuffer = null;
    }
    static __init__() {
        Command._screenShaderData = LayaGL.renderOBJCreate.createShaderData(null);
        Command._screenShader = Shader3D.find("BlitScreen");
        Command.SCREENTEXTURE_ID = Shader3D.propertyNameToID(Command.SCREENTEXTURE_NAME);
        Command.SCREENTEXTUREOFFSETSCALE_ID = Shader3D.propertyNameToID(Command.SCREENTEXTUREOFFSETSCALE_NAME);
        Command.MAINTEXTURE_TEXELSIZE_ID = Shader3D.propertyNameToID(Command.MAINTEXTURE_TEXELSIZE_NAME);
    }
    run() {
    }
    recover() {
        this._commandBuffer = null;
    }
    setContext(context) {
        this._context = context;
    }
    destroy() {
        this._commandBuffer = null;
        this._context = null;
    }
}
Command.SCREENTEXTURE_NAME = "u_MainTex";
Command.SCREENTEXTUREOFFSETSCALE_NAME = "u_OffsetScale";
Command.MAINTEXTURE_TEXELSIZE_NAME = "u_MainTex_TexelSize";

//# sourceMappingURL=Command.js.map
