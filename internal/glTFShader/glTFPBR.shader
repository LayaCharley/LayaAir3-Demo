/**
 * version 3.1.0
 **/
Shader3D Start
{
    type: Shader3D,
    name: glTFPBR,
    enableInstancing: true,
    supportReflectionProbe: true,
    uniformMap:{
        u_AlphaTestValue: { type: Float, default: 0.5 },
        u_BaseColorFactor: { type: Vector4, default: [1, 1, 1, 1] },
        u_BaseColorTexture: { type: Texture2D, options: { define: "BASECOLORMAP" } },
        u_BaseColorMapTransform: { type: Matrix3x3, default: [1, 0, 0, 0, 1, 0, 0, 0, 1], hidden: "!data.BASECOLORMAP_TRANSFORM" },
        u_Specular: { type: Float, default: 0.5 },
        u_MetallicFactor: { type: Float, default: 1.0 },
        u_RoughnessFactor: { type: Float, default: 1.0 },
        u_MetallicRoughnessTexture: { type: Texture2D,  options: { define: "METALLICROUGHNESSMAP" } },
        u_MetallicRoughnessMapTransform: { type: Matrix3x3, default: [1, 0, 0, 0, 1, 0, 0, 0, 1], hidden: "!data.METALLICROUGHNESSMAP_TRANSFORM" },
        u_NormalTexture: { type: Texture2D,  options: { define: "NORMALMAP" } },
        u_NormalMapTransform: { type: Matrix3x3, default: [1, 0, 0, 0, 1, 0, 0, 0, 1], hidden: "!data.NORMALMAP_TRANSFORM" },
        u_NormalScale: { type: Float, default: 1.0, hidden: "!data.u_NormalTexture" },
        u_OcclusionTexture: { type: Texture2D,  options: { define: "OCCLUSIONMAP" } },
        u_OcclusionMapTransform: { type: Matrix3x3, default: [1, 0, 0, 0, 1, 0, 0, 0, 1], hidden: "!data.OCCLUSIONMAP_TRANSFORM" },
        u_OcclusionStrength: { type: Float, default: 1.0 },

        // Emission
        u_EmissionFactor: { type: Vector3, default: [0, 0, 0], hidden: "!data.EMISSION" },
        u_EmissionTexture: { type: Texture2D,  options: { define: "EMISSIONMAP" }, hidden: "!data.EMISSION" },
        u_EmissionMapTransform: { type: Matrix3x3, default: [1, 0, 0, 0, 1, 0, 0, 0, 1], hidden: "!data.EMISSIONMAP_TRANSFORM" },
        u_EmissionStrength: { type: Float, default: 1.0, hidden: "!data.EMISSION" },

        // ClearCoat
        u_ClearCoatFactor: { type: Float, default: 0.0, hidden: "!data.CLEARCOAT" },
        u_ClearCoatTexture: { type: Texture2D, options: { define: "CLEARCOATMAP" }, hidden: "!data.CLEARCOAT" },
        u_ClearCoatMapTransform: { type: Matrix3x3, default: [1, 0, 0, 0, 1, 0, 0, 0, 1], hidden: "!data.u_ClearCoatTexture" },
        u_ClearCoatRoughness: { type: Float, default: 0.0, hidden: "!data.CLEARCOAT" },
        u_ClearCoatRoughnessTexture: { type: Texture2D, options: { define: "CLEARCOAT_ROUGHNESSMAP" }, hidden: "!data.CLEARCOAT" },
        u_ClearCoatRoughnessMapTransform: { type: Matrix3x3, default: [1, 0, 0, 0, 1, 0, 0, 0, 1], hidden: "!data.u_ClearCoatRoughnessTexture" },
        u_ClearCoatNormalTexture: { type: Texture2D, options: { define: "CLEARCOAT_NORMAL" }, hidden: "!data.CLEARCOAT" },
        u_ClearCoatNormalMapTransform: { type: Matrix3x3, default: [1, 0, 0, 0, 1, 0, 0, 0, 1], hidden: "!data.u_ClearCoatNormalTexture" },
        u_ClearCoatNormalScale: { type: Float, default: 1.0, hidden: "!data.CLEARCOAT" },

        // Anisotropy
        u_AnisotropyStrength: { type: Float, default: 0.0, hidden: "!data.ANISOTROPIC" },
        u_AnisotropyRotation: { type: Float, default: 0.0, hidden: "!data.ANISOTROPIC" },
        u_AnisotropyTexture: { type: Texture2D, options: { define: "ANISOTROPYMAP" }, hidden: "!data.ANISOTROPIC" },
        u_AnisotropyMapTransform: { type: Matrix3x3, default: [1, 0, 0, 0, 1, 0, 0, 0, 1], hidden: "!data.u_ClearCoatNormalTexture" },

        // ior
        u_Ior: { type: Float, default: 1.5, hidden: "!data.IOR"},

        // iridescence
        u_IridescenceFactor: { type: Float, default: 0.0, hidden: "!data.IRIDESCENCE" },
        u_IridescenceTexture: { type: Texture2D,  options: { define: "IRIDESCENCEMAP" }, hidden: "!data.IRIDESCENCE" },
        u_IridescenceMapTransform: { type: Matrix3x3, default: [1, 0, 0, 0, 1, 0, 0, 0, 1], hidden: "!data.IRIDESCENCEMAP_TRANSFORM" },
        u_IridescenceIor: { type: Float, default: 1.33, hidden: "!data.IRIDESCENCE" },
        u_IridescenceThicknessMinimum: { type: Float, default: 100, hidden: "!data.IRIDESCENCE" },
        u_IridescenceThicknessMaximum: { type: Float, default: 400, hidden: "!data.IRIDESCENCE" },
        u_IridescenceThicknessTexture: { type: Texture2D,  options: { define: "IRIDESCENCE_THICKNESSMAP" },  hidden: "!data.IRIDESCENCE" },
        u_IridescenceThicknessMapTransform: { type: Matrix3x3, default: [1, 0, 0, 0, 1, 0, 0, 0, 1], hidden: "!data.IRIDESCENCE_THICKNESSMAP_TRANSFORM" },

        // sheen
        u_SheenColorFactor: { type: Vector3, default: [0, 0, 0], hidden: "!data.SHEEN" },
        u_SheenColorTexture: { type: Texture2D,  options: { define: "SHEENCOLORMAP" }, hidden: "!data.SHEEN" },
        u_SheenColorMapTransform: { type: Matrix3x3, default: [1, 0, 0, 0, 1, 0, 0, 0, 1], hidden: "!data.SHEENCOLORMAP_TRANSFORM" },
        u_SheenRoughness: { type: Float, default: 0, hidden: "!data.SHEEN"},
        u_SheenRoughnessTexture: { type: Texture2D,  options: { define: "SHEEN_ROUGHNESSMAP" }, hidden: "!data.SHEEN" },
        u_SheenRoughnessMapTransform: { type: Matrix3x3, default: [1, 0, 0, 0, 1, 0, 0, 0, 1], hidden: "!data.SHEEN_ROUGHNESSMAP_TRANSFORM" },

        // specular
        u_SpecularFactor: { type: Float, default: 1.0, hidden: "!data.SPECULAR" },
        u_SpecularFactorTexture: { type: Texture2D,  options: { define: "SPECULARFACTORMAP" }, hidden: "!data.SPECULAR" },
        u_SpecularFactorMapTransfrom: { type: Matrix3x3, default: [1, 0, 0, 0, 1, 0, 0, 0, 1], hidden: "!data.SPECULARFACTORMAP_TRANSFORM" },
        u_SpecularColorFactor: { type: Vector3, default: [1, 1, 1], hidden: "!data.SPECULAR" },
        u_SpecularColorTexture: { type: Texture2D,  options: { define: "SPECULARCOLORMAP" }, hidden: "!data.SPECULAR" },
        u_SpecularColorMapTransform: { type: Matrix3x3, default: [1, 0, 0, 0, 1, 0, 0, 0, 1], hidden: "!data.SPECULARCOLORMAP_TRANSFORM" },

        // Transmission
        u_TransmissionFactor: { type: Float, default: 0.0, hidden: "!data.TRANSMISSION" },
        u_TransmissionTexture: { type: Texture2D,  options: { define: "TRANSMISSIONMAP" }, hidden: "!data.TRANSMISSION" },
        u_TransmissionMapTransform: { type: Matrix3x3, default: [1, 0, 0, 0, 1, 0, 0, 0, 1], hidden: "!data.TRANSMISSIONMAP_TRANSFORM" },
        
    },
    defines: {
        BASECOLORMAP_TRANSFORM: {type: bool, default: false, hidden: "!data.u_BaseColorTexture", position: "after u_BaseColorTexture" },
        METALLICROUGHNESSMAP_TRANSFORM: { type: bool, default: false, hidden: "!data.u_MetallicRoughnessTexture", position: "after u_MetallicRoughnessTexture" },
        NORMALMAP_TRANSFORM: { type: bool, default: false, hidden: "!data.u_NormalTexture", position: "after u_NormalTexture" },
        OCCLUSIONMAP_TRANSFORM: { type: bool, default: false, hidden: "!data.u_OcclusionTexture", position: "after u_OcclusionTexture" },

        // Emission
        EMISSION: { type: bool, default: false, position: "before u_EmissionFactor" },
        EMISSIONMAP_TRANSFORM: { type: bool, default: false, hidden: "!data.u_EmissionTexture", position: "after u_EmissionTexture", hidden: "!data.EMISSION" },

        // ClearCoat
        CLEARCOAT: { type: bool, default: false, position: "before u_ClearCoatFactor" },
        CLEARCOATMAP_TRANSFORM: { type: bool, default: false, hidden: "!data.u_ClearCoatTexture", position: "after u_ClearCoatTexture" },
        CLEARCOAT_ROUGHNESSMAP_TRANSFORM: { type: bool, default: false, hidden: "!data.u_ClearCoatRoughnessTexture", position: "after u_ClearCoatRoughnessTexture" },
        CLEARCOAT_NORMALMAP_TRANSFORM: { type: bool, default: false, hidden: "!data.u_ClearCoatNormalTexture", position: "after u_ClearCoatNormalTexture" },

        // Anisotropic
        ANISOTROPIC: { type: bool, default: false, position: "before u_AnisotropyStrength" },
        ANISOTROPYMAP_TRANSFORM: { type: bool, default: false, hidden: "!data.u_AnisotropyTexture", position: "after u_AnisotropyTexture" },

        // ior
        IOR: { type: bool, default: false, position: "before u_Ior" },

        // iridescence
        IRIDESCENCE: { type: bool, default: false, position: "before u_IridescenceFactor" },
        IRIDESCENCEMAP_TRANSFORM: { type: bool, default: false, hidden: "!data.u_IridescenceTexture", position: "after u_IridescenceTexture" },
        IRIDESCENCE_THICKNESSMAP_TRANSFORM: { type: bool, default: false, hidden: "!data.u_IridescenceThicknessTexture", position: "after u_IridescenceThicknessTexture" },

        // Sheen
        SHEEN: { type: bool, default: false, position: "before u_SheenColorFactor" },
        SHEENCOLORMAP_TRANSFORM: { type: bool, default: false, hidden: "!data.u_SheenColorTexture", position: "after u_SheenColorTexture" },
        SHEEN_ROUGHNESSMAP_TRANSFORM: { type: bool, default: false, hidden: "!data.u_SheenRoughnessTexture", position: "after u_SheenRoughnessTexture" },

        // Specular
        SPECULAR: { type: bool, default: false, position: "before u_SpecularFactor" },
        SPECULARFACTORMAP_TRANSFORM: { type: bool, default: false, hidden: "!data.u_SpecularFactorTexture", position: "after u_SpecularFactorTexture" },
        SPECULARCOLORMAP_TRANSFORM: { type: bool, default: false, hidden: "!data.u_SpecularColorTexture", position: "after u_SpecularColorTexture" },

        // Transmission
        TRANSMISSION: { type: bool, default: false, position: "before u_TransmissionFactor" },
        TRANSMISSIONMAP_TRANSFORM: { type: bool, default: false, hidden: "!data.u_TransmissionTexture", position: "after u_TransmissionTexture" },

        ENABLEVERTEXCOLOR: { type: bool, default: false },
    }
    shaderPass:[
        {
            pipeline: Forward,
            VS: forwardVS,
            FS: forwardFS
        },
        {
            pipeline: ShadowCaster,
            VS: dephtVS,
            FS: depthFS
        },
        {
            pipeline: DepthNormal
            VS: dephtNormalVS,
            FS: dephtNormalFS
        },
    ]
}
Shader3D End

GLSL Start
#defineGLSL forwardVS

    #define SHADER_NAME glTFPBRVS

    #include "Math.glsl";

    #include "Scene.glsl";
    #include "SceneFogInput.glsl";

    #include "Camera.glsl";
    #include "Sprite3DVertex.glsl";

    #include "VertexCommon.glsl";

    #include "PBRVertex.glsl";

    void main()
    {
        Vertex vertex;
        getVertexParams(vertex);

        PixelParams pixel;
        initPixelParams(pixel, vertex);

        sharePixelParams(pixel);

        gl_Position = getPositionCS(pixel.positionWS);

        gl_Position = remapPositionZ(gl_Position);

    #ifdef FOG
        FogHandle(gl_Position.z);
    #endif
    }
#endGLSL

#defineGLSL forwardFS

    #define SHADER_NAME glTFPBRFS

    #include "Color.glsl";

    #include "Scene.glsl";
    #include "SceneFog.glsl";

    #include "Camera.glsl";
    #include "Sprite3DFrag.glsl";

    #include "./glTFMetallicRoughness.glsl";

    void initSurfaceInputs(inout SurfaceInputs inputs, const in PixelParams pixel)
    {
        vec2 uv = vec2(0.0);
    #ifdef UV
        uv = pixel.uv0;
    #endif //

        // render state
        inputs.alphaTest = u_AlphaTestValue;

        // surface
        inputs.diffuseColor = u_BaseColorFactor.xyz;
        inputs.alpha = u_BaseColorFactor.w;

    #ifdef COLOR
        #ifdef ENABLEVERTEXCOLOR
        inputs.diffuseColor *= pixel.vertexColor.xyz;
        inputs.alpha *= pixel.vertexColor.a;
        #endif // ENABLEVERTEXCOLOR
    #endif // COLOR

    #ifdef BASECOLORMAP
        vec2 baseColorUV = uv;
        #ifdef BASECOLORMAP_TRANSFORM
        baseColorUV = (u_BaseColorMapTransform * vec3(baseColorUV, 1.0)).xy;
        #endif // BASECOLORMAP_TRANSFORM
        vec4 baseColorSampler = texture2D(u_BaseColorTexture, baseColorUV);
        #ifdef Gamma_u_BaseColorTexture
        baseColorSampler = gammaToLinear(baseColorSampler);
        #endif // u_BaseColorTexture_Gamma
        inputs.diffuseColor *= baseColorSampler.rgb;
        inputs.alpha *= baseColorSampler.a;
    #endif // BASECOLORMAP

        inputs.specular = u_Specular;

        inputs.specularFactor = 1.0;
        inputs.specularColor = vec3(1.0);

        inputs.specularFactor = u_SpecularFactor;
    #ifdef SPECULARFACTORMAP
        vec2 specularFactorUV = uv;
        #ifdef SPECULARFACTORMAP_TRANSFORM
        specularFactorUV = (u_SpecularFactorMapTransfrom * specularFactorUV).xy;
        #endif // SPECULARFACTORMAP_TRANSFORM
        vec4 specularFactorSampler = texture2D(u_SpecularFactorTexture, specularFactorUV);
        inputs.specularFactor *= specularFactorSampler.a;
    #endif // SPECULARFACTORMAP

        inputs.specularColor = u_SpecularColorFactor;
    #ifdef SPECULARCOLORMAP
        vec2 specularColorUV = uv;
        #ifdef SPECULARFACTORMAP_TRANSFORM
        specularColorUV = (u_SpecularColorMapTransform * specularColorUV).xy;
        #endif // SPECULARFACTORMAP_TRANSFORM
        vec4 specularColorSampler = texture2D(u_SpecularColorTexture, specularColorUV);
        #ifdef Gamma_u_SpecularColorTexture
        specularColorSampler = gammaToLinear(specularColorSampler);
        #endif // Gamma_u_SpecularColorTexture
        inputs.specularColor *= specularColorSampler.rgb;
    #endif // SPECULARCOLORMAP

        inputs.metallic = u_MetallicFactor;
        float roughness = u_RoughnessFactor;
    #ifdef METALLICROUGHNESSMAP
        vec2 metallicUV = uv;
        #ifdef METALLICROUGHNESSMAP_TRANSFORM
        metallicUV = (u_MetallicRoughnessMapTransform * vec3(metallicUV, 1.0)).xy;
        #endif METALLICROUGHNESSMAP_TRANSFORM
        vec4 metallicRoughnessSampler = texture2D(u_MetallicRoughnessTexture, metallicUV);
        inputs.metallic *= metallicRoughnessSampler.b;
        roughness *= metallicRoughnessSampler.g;
    #endif // METALLICROUGHNESSMAP
        inputs.roughness = roughness;

        float occlusion = 1.0;
    #ifdef OCCLUSIONMAP
        vec2 occlusionUV = uv;
        #ifdef OCCLUSIONMAP_TRANSFORM
        occlusionUV = (u_OcclusionMapTransform * vec3(occlusionUV, 1.0)).xy;
        #endif // OCCLUSIONMAP_TRANSFORM
        vec4 occlusionSampler = texture2D(u_OcclusionTexture, occlusionUV);
        #ifdef Gamma_u_OcclusionTexture
        occlusionSampler = gammaToLinear(occlusionSampler);
        #endif // Gamma_u_OcclusionTexture
        occlusion = occlusionSampler.r;
    #endif // OCCLUSIONMAP
        inputs.occlusion = (1.0 - u_OcclusionStrength) + occlusion * u_OcclusionStrength;

        inputs.emissionColor = u_EmissionFactor * u_EmissionStrength;
    #ifdef EMISSIONMAP
        vec2 emissionUV = uv;
        #ifdef EMISSIONMAP_TRANSFORM
        emissionUV = (u_EmissionMapTransform * vec3(emissionUV, 1.0)).xy;
        #endif // EMISSIONMAP_TRANSFORM
        vec4 emissionSampler = texture2D(u_EmissionTexture, emissionUV);
        #ifdef Gamma_u_EmissionTexture
        emissionSampler = gammaToLinear(emissionSampler);
        #endif // Gamma_u_EmissionTexture
        inputs.emissionColor *= emissionSampler.rgb;
    #endif // EMISSIONMAP

        inputs.normalTS = vec3(0.0, 0.0, 1.0);
    #ifdef NORMALMAP
        vec2 normalUV = uv;
        #ifdef NORMALMAP_TRANSFORM
        normalUV = (u_NormalMapTransform * vec3(normalUV, 1.0)).xy;
        #endif // NORMALMAP_TRANSFORM
        vec3 normalSampler = texture2D(u_NormalTexture, normalUV).xyz;
        normalSampler = normalize(normalSampler * 2.0 - 1.0);
        normalSampler.y *= -1.0;
        inputs.normalTS = normalScale(normalSampler, u_NormalScale);
    #endif // NORMALMAP

    #ifdef IOR
        inputs.ior = u_Ior;
    #endif // IOR

    #ifdef IRIDESCENCE
        float iridescenceFactor = u_IridescenceFactor;
        #ifdef IRIDESCENCEMAP
        vec2 iridescenceUV = uv;
        #ifdef IRIDESCENCEMAP_TRANSFORM
        iridescenceUV = (u_IridescenceMapTransform * vec3(iridescenceUV, 1.0)).xy;
        #endif // IRIDESCENCEMAP_TRANSFORM
        vec4 iridescenceSampler = texture2D(u_IridescenceTexture, iridescenceUV);
        iridescenceFactor *= iridescenceSampler.r;
        #endif // IRIDESCENCEMAP
        float iridescenceThickness = u_IridescenceThicknessMaximum;
        #ifdef IRIDESCENCE_THICKNESSMAP
        vec2 iridescenceThicknessUV = uv;
        #ifdef IRIDESCENCE_THICKNESSMAP_TRANSFORM
        iridescenceThicknessUV = (u_IridescenceThicknessMapTransform, vec3(iridescenceThicknessUV, 1.0)).xy;
        #endif // IRIDESCENCE_THICKNESSMAP_TRANSFORM
        vec4 iridescenceThicknessSampler = texture2D(u_IridescenceThicknessTexture, iridescenceThicknessUV);
        iridescenceThickness = mix(u_IridescenceThicknessMinimum, u_IridescenceThicknessMaximum, iridescenceThicknessSampler.g);
        #endif // IRIDESCENCE_THICKNESSMAP
        inputs.iridescence = iridescenceFactor;
        inputs.iridescenceIor = u_IridescenceIor;
        inputs.iridescenceThickness = iridescenceThickness;
    #endif // IRIDESCENCE

    #ifdef SHEEN
        vec3 sheenColor = u_SheenColorFactor;
        #ifdef SHEENCOLORMAP
        vec2 sheenColorUV = uv;
        #ifdef SHEENCOLORMAP_TRANSFORM
        sheenColorUV = (u_SheenColorMapTransform * vec3(sheenColorUV, 1.0)).xy;
        #endif // SHEENCOLORMAP_TRANSFORM
        vec4 sheenColorSampler = texture2D(u_SheenColorTexture, sheenColorUV);
        #ifdef Gamma_u_SheenColorFactor
        sheenColorSampler = gammaToLinear(sheenColorSampler);
        #endif // Gamma_u_SheenColorFactor
        sheenColor *= sheenColorSampler.rgb;
        #endif // SHEENCOLORMAP

        float sheenRoughness = u_SheenRoughness;
        #ifdef SHEEN_ROUGHNESSMAP
        vec2 sheenRoughnessUV = uv;
        #ifdef SHEEN_ROUGHNESSMAP_TRANSFORM
        sheenRoughnessUV = (u_SheenRoughnessMapTransform * vec3(sheenRoughnessUV, 1.0)).xy;
        #endif // SHEEN_ROUGHNESSMAP_TRANSFORM
        vec4 sheenRoughnessSampler = texture2D(u_SheenRoughnessTexture, sheenRoughnessUV);
        sheenRoughness *= sheenRoughnessSampler.a;
        #endif // SHEEN_ROUGHNESSMAP

        inputs.sheenColor = sheenColor;
        inputs.sheenRoughness = sheenRoughness;
    #endif // SHEEN

    #ifdef CLEARCOAT
        inputs.clearCoat = u_ClearCoatFactor;
        inputs.clearCoatRoughness = u_ClearCoatRoughness;

        #ifdef CLEARCOATMAP
        vec2 clearCoatUV = uv;
        #ifdef CLEARCOATMAP_TRANSFORM
        clearCoatUV = (u_ClearCoatMapTransform * vec3(clearCoatUV, 1.0)).xy;
        #endif // CLEARCOATMAP_TRANSFORM
        vec4 clearCoatSampler = texture2D(u_ClearCoatTexture, clearCoatUV);
        inputs.clearCoat *= clearCoatSampler.r;
        #endif // CLEARCOATMAP

        #ifdef CLEARCOAT_ROUGHNESSMAP
        vec2 clearCoatRoughnessUV = uv;
        #ifdef CLEARCOAT_ROUGHNESSMAP_TRANSFORM
        clearCoatRoughnessUV = (u_ClearCoatRoughnessMapTransform * vec3(uv, 1.0)).xy;
        #endif // CLEARCOAT_ROUGHNESSMAP_TRANSFORM
        vec4 clearcoatSampleRoughness = texture2D(u_ClearCoatRoughnessTexture, clearCoatRoughnessUV);
        inputs.clearCoatRoughness *= clearcoatSampleRoughness.g;
        #endif // CLEARCOAT_ROUGHNESSMAP

        #ifdef CLEARCOAT_NORMAL
        vec2 clearCoatNormalUV = uv;
        #ifdef CLEARCOAT_NORMALMAP_TRANSFORM
        clearCoatNormalUV = (u_ClearCoatNormalMapTransform * vec3(clearCoatNormalUV, 1.0)).xy;
        #endif // CLEARCOAT_NORMALMAP_TRANSFORM
        vec3 clearCoatNormalSampler = texture2D(u_ClearCoatNormalTexture, clearCoatNormalUV).rgb;
        clearCoatNormalSampler = normalize(clearCoatNormalSampler * 2.0 - 1.0);
        clearCoatNormalSampler.y *= -1.0;
        // todo scale
        inputs.clearCoatNormalTS = normalScale(clearCoatNormalSampler, u_ClearCoatNormalScale);
        #endif // CLEARCOAT_NORMAL
    #endif // CLEARCOAT

    #ifdef ANISOTROPIC
        inputs.anisotropy = u_AnisotropyStrength;
        vec2 direction = vec2(1.0, 0.0);

        #ifdef ANISOTROPYMAP
        vec2 anisotropyUV = uv;
        #ifdef ANISOTROPYMAP_TRANSFORM
        anisotropyUV = (u_AnisotropyMapTransform * vec3(anisotropyUV, 1.0)).xy;
        #endif // ANISOTROPYMAP_TRANSFORM
        vec3 anisotropySampler = texture2D(u_AnisotropyTexture, anisotropyUV).rgb;

        inputs.anisotropy *= anisotropySampler.b;
        direction = anisotropySampler.xy * 2.0 - 1.0;
        #endif // ANISOTROPYMAP

        vec2 anisotropyRotation = vec2(cos(u_AnisotropyRotation), sin(u_AnisotropyRotation));
        mat2 rotationMatrix = mat2(anisotropyRotation.x, anisotropyRotation.y, -anisotropyRotation.y, anisotropyRotation.x);
        inputs.anisotropyDirection = rotationMatrix * direction;

    #endif // ANISOTROPIC

    #ifdef TRANSMISSION
        float transmission = u_TransmissionFactor;
        #ifdef TRANSMISSIONMAP
        vec2 transmissionUV = uv;
        #ifdef TRANSMISSIONMAP_TRANSFORM
        transmissionUV = (u_TransmissionMapTransform * vec3(transmissionUV, 1.0)).xy;
        #endif // TRANSMISSIONMAP_TRANSFORM
        vec4 transmissionSampler = texture2D(u_TransmissionTexture, transmissionUV);
        transmission *= transmissionSampler.r;
        #endif // TRANSMISSIONMAP
        inputs.transmission = transmission;
    #endif // TRANSMISSION

    #ifdef THICKNESS

        float thicknessFactor = u_VolumeThicknessFactor;
        float attenuationDistance = u_VolumeAttenuationDistance;
        vec3 attenuationColor = u_VolumeAttenuationColor.xyz;

        #ifdef THICKNESSMAP
        vec2 thicknessUV = uv;
        #ifdef THICKNESSMAP_TRANSFORM
        thicknessUV = (u_VoluemThicknessMapTransform * vec3(thicknessUV, 1.0)).xy;
        #endif // THICKNESSMAP_TRANSFORM
        vec4 thicknessSampler = texture2D(u_VolumeThicknessTexture, thicknessUV);
        thicknessFactor *= thicknessSampler.g;
        #endif // THICKNESSMAP

        inputs.thickness = thicknessFactor;
        inputs.attenuationColor = attenuationColor;
        inputs.attenuationDistance = attenuationDistance;

    #endif // THICKNESS

    }

    void main()
    {
        PixelParams pixel;
        getPixelParams(pixel);

        SurfaceInputs inputs;
        initSurfaceInputs(inputs, pixel);

        vec4 surfaceColor = glTFMetallicRoughness(inputs, pixel);

    #ifdef FOG
        surfaceColor.rgb = sceneLitFog(surfaceColor.rgb);
    #endif // FOG

        gl_FragColor = surfaceColor;

        gl_FragColor = outputTransform(gl_FragColor);
    }
#endGLSL

#defineGLSL dephtVS

    #define SHADER_NAME glTFPBRDepthVS

    #include "DepthVertex.glsl";

    void main()
    {
        Vertex vertex;
        getVertexParams(vertex);

        mat4 worldMat = getWorldMatrix();
        vec4 pos = (worldMat * vec4(vertex.positionOS, 1.0));
        vec3 positionWS = pos.xyz / pos.w;

        mat4 normalMat = transpose(inverse(worldMat));
        vec3 normalWS = normalize((normalMat * vec4(vertex.normalOS, 0.0)).xyz);

        vec4 positionCS = DepthPositionCS(positionWS, normalWS);
        gl_Position = remapPositionZ(positionCS);
    }

#endGLSL

#defineGLSL depthFS

    #define SHADER_NAME glTFPBRDepthFS

    #include "DepthFrag.glsl";

    void main()
    {
        gl_FragColor = getDepthColor();
    }

#endGLSL

#defineGLSL dephtNormalVS

    #define SHADER_NAME glTFPBRDepthNormalVS

    #include "Math.glsl";

    #include "Camera.glsl";

    #include "Sprite3DVertex.glsl";

    #include "VertexCommon.glsl";

    #include "PBRVertex.glsl";

    varying vec4 v_PositionCS;

    void main()
    {
        Vertex vertex;
        getVertexParams(vertex);

        PixelParams pixel;
        initPixelParams(pixel, vertex);

        sharePixelParams(pixel);

        vec4 positionCS = getPositionCS(pixel.positionWS);
        v_PositionCS = positionCS;
        gl_Position = positionCS;
        gl_Position = remapPositionZ(gl_Position);
    }

#endGLSL

#defineGLSL dephtNormalFS

    #define SHADER_NAME glTFPBRDepthNormalFS

    #include "Color.glsl";

    #include "Scene.glsl";
    #include "SceneFog.glsl";

    #include "Camera.glsl";
    #include "Sprite3DFrag.glsl";

    #include "ShadingFrag.glsl";

    #include "DepthNormalFrag.glsl";

    varying vec4 v_PositionCS;

    void main()
    {
        PixelParams pixel;
        getPixelParams(pixel);

        vec3 normalWS = pixel.normalWS;

    #ifdef NORMALMAP
        #ifdef UV

        vec2 uv = pixel.uv0;

        vec3 normalSampler = texture2D(u_NormalTexture, uv).xyz;
        normalSampler = normalize(normalSampler * 2.0 - 1.0);
        normalSampler.y *= -1.0;
        vec3 normalTS = normalScale(normalSampler, u_NormalScale);
        normalWS = normalize(pixel.TBN * normalTS);

        #endif UV
    #endif // NORMALMAP

        vec4 positionCS = v_PositionCS;

        vec4 dephtNormal = encodeDepthNormal(positionCS, normalWS);

        gl_FragColor = dephtNormal;
    }

#endGLSL

GLSL End


