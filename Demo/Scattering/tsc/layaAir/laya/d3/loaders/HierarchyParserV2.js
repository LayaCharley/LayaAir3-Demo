import { Camera } from "../core/Camera";
import { DirectionLight } from "../core/light/DirectionLight";
import { PointLight } from "../core/light/PointLight";
import { SpotLight } from "../core/light/SpotLight";
import { MeshSprite3D } from "../core/MeshSprite3D";
import { ShuriKenParticle3D } from "../core/particleShuriKen/ShuriKenParticle3D";
import { Scene3D } from "../core/scene/Scene3D";
import { SkinnedMeshSprite3D } from "../core/SkinnedMeshSprite3D";
import { Sprite3D } from "../core/Sprite3D";
import { TrailSprite3D } from "../core/trail/TrailSprite3D";
import { ClassUtils } from "../../utils/ClassUtils";
import { SimpleSkinnedMeshSprite3D } from "../core/SimpleSkinnedMeshSprite3D";
import { Loader } from "../../net/Loader";
import { URL } from "../../net/URL";
import { HierarchyLoader } from "../../loaders/HierarchyLoader";
import { ReflectionProbe } from "../component/Volume/reflectionProbe/ReflectionProbe";
class HierarchyParserV2 {
    static _createSprite3DInstance(nodeData, spriteMap, outBatchSprites) {
        let node;
        switch (nodeData.type) {
            case "Scene3D":
                node = new Scene3D();
                break;
            case "Sprite3D":
                node = new Sprite3D();
                break;
            case "MeshSprite3D":
                node = new MeshSprite3D();
                (outBatchSprites && nodeData.props.isStatic) && (outBatchSprites.push(node));
                break;
            case "SkinnedMeshSprite3D":
                node = new SkinnedMeshSprite3D();
                break;
            case "SimpleSkinnedMeshSprite3D":
                node = new SimpleSkinnedMeshSprite3D();
                break;
            case "ShuriKenParticle3D":
                node = new ShuriKenParticle3D();
                break;
            case "Camera":
                node = new Camera();
                break;
            case "DirectionLight":
                node = new DirectionLight();
                break;
            case "PointLight":
                node = new PointLight();
                break;
            case "SpotLight":
                node = new SpotLight();
                break;
            case "TrailSprite3D":
                node = new TrailSprite3D();
                break;
            case "ReflectionProbe":
                node = new Sprite3D();
                node.addComponent(ReflectionProbe);
                break;
            default:
                throw new Error("Utils3D:unidentified class type in (.lh) file.");
        }
        let childData = nodeData.child;
        if (childData) {
            for (let i = 0, n = childData.length; i < n; i++) {
                let child = HierarchyParserV2._createSprite3DInstance(childData[i], spriteMap, outBatchSprites);
                node.addChild(child);
            }
        }
        spriteMap[nodeData.instanceID] = node;
        return node;
    }
    static _createComponentInstance(nodeData, spriteMap, interactMap) {
        let node = spriteMap[nodeData.instanceID];
        node._parse(nodeData.props, spriteMap);
        let childData = nodeData.child;
        if (childData) {
            for (let i = 0, n = childData.length; i < n; i++)
                HierarchyParserV2._createComponentInstance(childData[i], spriteMap, interactMap);
        }
        let componentsData = nodeData.components;
        if (componentsData) {
            for (let j = 0, m = componentsData.length; j < m; j++) {
                let data = componentsData[j];
                let cls = ClassUtils.getClass(data.type);
                if (cls) {
                    let component = node.addComponent(cls);
                    component._parse(data, interactMap);
                }
                else {
                    console.warn(`Unidentified component type: ${data.type}.`);
                }
            }
        }
    }
    static _createNodeByJson02(nodeData, outBatchSprites) {
        let spriteMap = {};
        let interactMap = { component: [], data: [] };
        let node = HierarchyParserV2._createSprite3DInstance(nodeData, spriteMap, outBatchSprites);
        HierarchyParserV2._createComponentInstance(nodeData, spriteMap, interactMap);
        HierarchyParserV2._createInteractInstance(interactMap, spriteMap);
        return node;
    }
    static _createInteractInstance(interatMap, spriteMap) {
        let components = interatMap.component;
        let data = interatMap.data;
        for (let i = 0, n = components.length; i < n; i++) {
            components[i]._parseInteractive(data[i], spriteMap);
        }
    }
    static parse(data) {
        let json = data.data;
        let outBatchSprits = [];
        let sprite;
        switch (data.version) {
            case "LAYAHIERARCHY:02":
            case "LAYASCENE3D:02":
                sprite = HierarchyParserV2._createNodeByJson02(json, outBatchSprits);
                break;
            default:
                sprite = HierarchyParserV2._createNodeByJson(json, outBatchSprits);
        }
        return sprite;
    }
    static _createNodeByJson(nodeData, outBatchSprites) {
        let node;
        switch (nodeData.type) {
            case "Scene3D":
                node = new Scene3D();
                break;
            case "Sprite3D":
                node = new Sprite3D();
                break;
            case "MeshSprite3D":
                node = new MeshSprite3D();
                (outBatchSprites && nodeData.props.isStatic) && (outBatchSprites.push(node));
                break;
            case "SkinnedMeshSprite3D":
                node = new SkinnedMeshSprite3D();
                break;
            case "ShuriKenParticle3D":
                node = new ShuriKenParticle3D();
                break;
            case "Camera":
                node = new Camera();
                break;
            case "DirectionLight":
                node = new DirectionLight();
                break;
            case "PointLight":
                node = new PointLight();
                break;
            case "SpotLight":
                node = new SpotLight();
                break;
            case "TrailSprite3D":
                node = new TrailSprite3D();
                break;
            default:
                throw new Error(`Unidentified node type ${nodeData.type}`);
        }
        let childData = nodeData.child;
        if (childData) {
            for (let i = 0, n = childData.length; i < n; i++) {
                let child = HierarchyParserV2._createNodeByJson(childData[i], outBatchSprites);
                node.addChild(child);
            }
        }
        let componentsData = nodeData.components;
        if (componentsData) {
            for (let j = 0, m = componentsData.length; j < m; j++) {
                let data = componentsData[j];
                let clas = ClassUtils.getClass(data.type);
                if (clas) {
                    let component = node.addComponent(clas);
                    component._parse(data);
                }
                else {
                    console.warn(`Unidentified component type: ${data.type}.`);
                }
            }
        }
        node._parse(nodeData.props, null);
        return node;
    }
    static collectResourceLinks(data, basePath) {
        let test = {};
        let innerUrls = [];
        function addInnerUrl(url, type, constructParams, propertyParams) {
            let url2 = test[url];
            if (url2 === undefined) {
                url2 = URL.join(basePath, url);
                innerUrls.push({ url: url2, type: type, constructParams: constructParams, propertyParams: propertyParams });
                test[url] = url2;
            }
            return url2;
        }
        function check(nodeData) {
            let props = nodeData.props;
            switch (nodeData.type) {
                case "Scene3D":
                    let lightmaps = props.lightmaps;
                    if (lightmaps) {
                        for (let i = 0, n = lightmaps.length; i < n; i++) {
                            let lightMap = lightmaps[i];
                            if (lightMap.path) {
                                lightMap.path = addInnerUrl(lightMap.path, Loader.TEXTURE2D, lightMap.constructParams, lightMap.propertyParams);
                            }
                            else {
                                let lightmapColorData = lightMap.color;
                                lightmapColorData.path = addInnerUrl(lightmapColorData.path, Loader.TEXTURE2D, lightmapColorData.constructParams, lightmapColorData.propertyParams);
                                let lightmapDirectionData = lightMap.direction;
                                if (lightmapDirectionData)
                                    lightmapDirectionData.path = addInnerUrl(lightmapDirectionData.path, Loader.TEXTURE2D, lightmapDirectionData.constructParams, lightmapDirectionData.propertyParams);
                            }
                        }
                    }
                    let reflectionTextureData = props.reflectionTexture;
                    (reflectionTextureData) && (props.reflection = addInnerUrl(reflectionTextureData, Loader.TEXTURECUBE));
                    let reflectionData = props.reflection;
                    (reflectionData) && (props.reflection = addInnerUrl(reflectionData, Loader.TEXTURECUBE));
                    if (props.sky) {
                        let skyboxMaterial = props.sky.material;
                        (skyboxMaterial) && (skyboxMaterial.path = addInnerUrl(skyboxMaterial.path, Loader.MATERIAL));
                    }
                    break;
                case "Camera":
                    let skyboxMatData = props.skyboxMaterial;
                    (skyboxMatData) && (skyboxMatData.path = addInnerUrl(skyboxMatData.path, Loader.MATERIAL));
                    break;
                case "TrailSprite3D":
                case "MeshSprite3D":
                case "SkinnedMeshSprite3D":
                case "SimpleSkinnedMeshSprite3D":
                    let meshPath = props.meshPath;
                    (meshPath) && (props.meshPath = addInnerUrl(meshPath, Loader.MESH));
                    let materials = props.materials;
                    if (materials)
                        for (let i = 0, n = materials.length; i < n; i++)
                            materials[i].path = addInnerUrl(materials[i].path, Loader.MATERIAL);
                    if (nodeData.type == "SimpleSkinnedMeshSprite3D")
                        if (props.animatorTexture)
                            props.animatorTexture = addInnerUrl(props.animatorTexture, Loader.TEXTURE2D);
                    break;
                case "ShuriKenParticle3D":
                    if (props.main) {
                        let resources = props.renderer.resources;
                        let mesh = resources.mesh;
                        let material = resources.material;
                        (mesh) && (resources.mesh = addInnerUrl(mesh, Loader.MESH));
                        (material) && (resources.material = addInnerUrl(material, Loader.MATERIAL));
                    }
                    else {
                        let parMeshPath = props.meshPath;
                        (parMeshPath) && (props.meshPath = addInnerUrl(parMeshPath, Loader.MESH));
                        props.material.path = addInnerUrl(props.material.path, Loader.MATERIAL);
                    }
                    break;
                case "Terrain":
                    addInnerUrl(props.dataPath, Loader.TERRAINRES);
                    break;
                case "ReflectionProbe":
                    let reflection = props.reflection;
                    (reflection) && (props.reflection = addInnerUrl(reflection, Loader.TEXTURECUBE));
                    break;
            }
            let components = nodeData.components;
            if (components) {
                for (let k = 0, p = components.length; k < p; k++) {
                    let component = components[k];
                    switch (component.type) {
                        case "Animator":
                            let clipPaths = component.clipPaths;
                            if (!clipPaths) {
                                let layersData = component.layers;
                                for (let i = 0; i < layersData.length; i++) {
                                    let states = layersData[i].states;
                                    for (let j = 0, m = states.length; j < m; j++) {
                                        let clipPath = states[j].clipPath;
                                        (clipPath) && (states[j].clipPath = addInnerUrl(clipPath, Loader.ANIMATIONCLIP));
                                    }
                                }
                            }
                            else {
                                for (let i = 0, n = clipPaths.length; i < n; i++)
                                    clipPaths[i] = addInnerUrl(clipPaths[i], Loader.ANIMATIONCLIP);
                            }
                            break;
                        case "PhysicsCollider":
                        case "Rigidbody3D":
                        case "CharacterController":
                            let shapes = component.shapes;
                            for (let i = 0; i < shapes.length; i++) {
                                let shape = shapes[i];
                                if (shape.type === "MeshColliderShape") {
                                    let mesh = shape.mesh;
                                    (mesh) && (shape.mesh = addInnerUrl(mesh, Loader.MESH));
                                }
                            }
                            break;
                    }
                }
            }
            let children = nodeData.child;
            if (!children)
                return;
            for (let i = 0, n = children.length; i < n; i++)
                check(children[i]);
        }
        check(data.data);
        return innerUrls;
    }
}
HierarchyLoader.v2 = HierarchyParserV2;

//# sourceMappingURL=HierarchyParserV2.js.map
