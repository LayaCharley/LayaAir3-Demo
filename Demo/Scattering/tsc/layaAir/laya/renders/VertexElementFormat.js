import { LayaGL } from "../layagl/LayaGL";
import { RenderParams } from "../RenderEngine/RenderEnum/RenderParams";
export class VertexElementFormat {
    static __init__() {
        VertexElementFormat._elementInfos = {
            "single": [1, LayaGL.renderEngine.getParams(RenderParams.FLOAT), 0],
            "vector2": [2, LayaGL.renderEngine.getParams(RenderParams.FLOAT), 0],
            "vector3": [3, LayaGL.renderEngine.getParams(RenderParams.FLOAT), 0],
            "vector4": [4, LayaGL.renderEngine.getParams(RenderParams.FLOAT), 0],
            "color": [4, LayaGL.renderEngine.getParams(RenderParams.FLOAT), 0],
            "byte4": [4, LayaGL.renderEngine.getParams(RenderParams.UNSIGNED_BYTE), 0],
            "byte3": [3, LayaGL.renderEngine.getParams(RenderParams.UNSIGNED_BYTE), 0],
            "byte2": [2, LayaGL.renderEngine.getParams(RenderParams.UNSIGNED_BYTE), 0],
            "byte": [1, LayaGL.renderEngine.getParams(RenderParams.UNSIGNED_BYTE), 0],
            "short2": [2, LayaGL.renderEngine.getParams(RenderParams.UNSIGNED_SHORT), 0],
            "short4": [4, LayaGL.renderEngine.getParams(RenderParams.UNSIGNED_SHORT), 0],
            "normalizedshort2": [2, LayaGL.renderEngine.getParams(RenderParams.UNSIGNED_SHORT), 1],
            "normalizedshort4": [4, LayaGL.renderEngine.getParams(RenderParams.UNSIGNED_SHORT), 1],
            "halfvector2": [2, LayaGL.renderEngine.getParams(RenderParams.FLOAT), 0],
            "halfvector4": [4, LayaGL.renderEngine.getParams(RenderParams.FLOAT), 0],
            "nbyte4": [4, LayaGL.renderEngine.getParams(RenderParams.BYTE), 1],
        };
    }
    static getElementInfos(element) {
        var info = VertexElementFormat._elementInfos[element];
        if (info)
            return info;
        else
            throw "VertexElementFormat: this vertexElementFormat is not implement.";
    }
}
VertexElementFormat.Single = "single";
VertexElementFormat.Vector2 = "vector2";
VertexElementFormat.Vector3 = "vector3";
VertexElementFormat.Vector4 = "vector4";
VertexElementFormat.Color = "color";
VertexElementFormat.Byte4 = "byte4";
VertexElementFormat.Byte3 = "byte3";
VertexElementFormat.Byte2 = "byte2";
VertexElementFormat.ByteOne = "byte";
VertexElementFormat.Short2 = "short2";
VertexElementFormat.Short4 = "short4";
VertexElementFormat.NormalizedShort2 = "normalizedshort2";
VertexElementFormat.NormalizedShort4 = "normalizedshort4";
VertexElementFormat.HalfVector2 = "halfvector2";
VertexElementFormat.HalfVector4 = "halfvector4";
VertexElementFormat.NorByte4 = "nbyte4";

//# sourceMappingURL=VertexElementFormat.js.map
