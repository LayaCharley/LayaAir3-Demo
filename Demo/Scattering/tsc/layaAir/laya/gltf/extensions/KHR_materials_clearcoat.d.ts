declare module "../glTFInterface" {
    interface glTFMaterialClearCoat {
        clearcoatFactor?: number;
        clearcoatTexture?: glTFTextureInfo;
        clearcoatRoughnessFactor?: number;
        clearcoatRoughnessTexture?: glTFTextureInfo;
        clearcoatNormalTexture?: glTFMaterialNormalTextureInfo;
    }
}
export {};
