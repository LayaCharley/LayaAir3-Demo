import { LayaGL } from "../../../layagl/LayaGL";
import { RenderCapable } from "../../../RenderEngine/RenderEnum/RenderCapable";
import { SingletonList } from "../../../utils/SingletonList";
import { RenderElement } from "../../core/render/RenderElement";
import { SubMeshInstanceBatch } from "../SubMeshInstanceBatch";
import { InstanceBatchManager } from "./InstanceBatchManager";
import { InstanceRenderElement } from "../../core/render/InstanceRenderElement";
import { Config3D } from "../../../../Config3D";
export class RenderElementBatch {
    constructor() {
        RenderElementBatch.instance = this;
        this._instanceBatchManager = InstanceBatchManager.instance;
        this._recoverList = new SingletonList();
    }
    recoverData() {
        let elements = this._recoverList.elements;
        for (let i = 0, n = this._recoverList.length; i < n; i++) {
            let element = elements[i];
            element.recover();
        }
        this._recoverList.length = 0;
    }
    batch(elements) {
        let len = elements.length;
        elements.length = 0;
        this._instanceBatchManager.updateCountMark++;
        let elementArray = elements.elements;
        for (var i = 0; i < len; i++) {
            let element = elements.elements[i];
            if (!element._canBatch) {
                elements.add(element);
                continue;
            }
            if (element.staticBatch && (!element._baseRender._probReflection || element._baseRender._probReflection._isScene) && Config3D.enableStaticBatch) {
                elements.add(element);
            }
            else if (Config3D.enableDynamicBatch && LayaGL.renderEngine.getCapable(RenderCapable.DrawElement_Instance)) {
                if (element._subShader._owner._enableInstancing && element._baseRender.lightmapIndex < 0) {
                    var insManager = this._instanceBatchManager;
                    let invertFrontFace = element._transform ? element._transform._isFrontFaceInvert : false;
                    var insBatchMarks = insManager.getInstanceBatchOpaquaMark(element._baseRender._receiveShadow, element._material._id, element._geometry._id, invertFrontFace, element._baseRender._probReflection ? element._baseRender._probReflection._id : -1);
                    if (insManager.updateCountMark === insBatchMarks.updateMark) {
                        var insBatchIndex = insBatchMarks.indexInList;
                        var insOriElement = elementArray[insBatchIndex];
                        if (insBatchMarks.batched) {
                            var instanceelements = insOriElement._instanceBatchElementList;
                            if (instanceelements.length === SubMeshInstanceBatch.maxInstanceCount) {
                                insBatchMarks.updateMark = insManager.updateCountMark;
                                insBatchMarks.indexInList = elements.length;
                                insBatchMarks.batched = false;
                                elements.add(element);
                            }
                            else {
                                instanceelements.add(element);
                            }
                        }
                        else {
                            let instanceRenderElement = InstanceRenderElement.create();
                            this._recoverList.add(instanceRenderElement);
                            instanceRenderElement._baseRender = insOriElement._baseRender;
                            instanceRenderElement._renderElementOBJ._renderShaderData = insOriElement._baseRender._shaderValues;
                            instanceRenderElement.renderType = RenderElement.RENDERTYPE_INSTANCEBATCH;
                            instanceRenderElement._geometry.subMesh = insOriElement._geometry;
                            instanceRenderElement.material = insOriElement._material;
                            instanceRenderElement.setTransform(null);
                            instanceRenderElement._subShader = insOriElement._subShader;
                            let list = instanceRenderElement._instanceBatchElementList;
                            list.length = 0;
                            list.add(insOriElement);
                            list.add(element);
                            elementArray[insBatchIndex] = instanceRenderElement;
                            insBatchMarks.batched = true;
                            instanceRenderElement._isUpdataData = true;
                            instanceRenderElement._invertFrontFace = invertFrontFace;
                        }
                    }
                    else {
                        insBatchMarks.updateMark = insManager.updateCountMark;
                        insBatchMarks.indexInList = elements.length;
                        insBatchMarks.batched = false;
                        elements.add(element);
                    }
                }
                else
                    elements.add(element);
            }
            else
                elements.add(element);
        }
    }
}

//# sourceMappingURL=RenderElementBatch.js.map
