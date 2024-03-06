import { VertexDeclaration } from "../../../../RenderEngine/VertexDeclaration";
import { VertexElement } from "../../../../renders/VertexElement";
import { VertexElementFormat } from "../../../../renders/VertexElementFormat";
import { MaterialInstanceProperty } from "./MaterialInstanceProperty";
export var InstanceLocation;
(function (InstanceLocation) {
    InstanceLocation[InstanceLocation["CUSTOME0"] = 12] = "CUSTOME0";
    InstanceLocation[InstanceLocation["CUSTOME1"] = 13] = "CUSTOME1";
    InstanceLocation[InstanceLocation["CUSTOME2"] = 14] = "CUSTOME2";
    InstanceLocation[InstanceLocation["CUSTOME3"] = 15] = "CUSTOME3";
})(InstanceLocation || (InstanceLocation = {}));
export class MaterialInstancePropertyBlock {
    constructor() {
        this._type = 0;
        this._propertyMap = {};
    }
    _checkPropertyLegal(vertexElementFormat, propertyName, attributeLocation, prob) {
        var vecDec = prob._vertexDeclaration;
        if (vecDec._vertexElements[0]._elementFormat !== vertexElementFormat)
            throw "Data exists and format does not match";
        if (prob._name !== propertyName)
            throw "You cannot add a new property to an existing attributeLocation,Please use another attributeLocation";
    }
    _creatProperty(attributeName, arrays, vertexStride, vertexformat, attributeLocation) {
        var prob = this._propertyMap[attributeLocation] = new MaterialInstanceProperty();
        prob._name = attributeName;
        prob._value = arrays;
        prob._vertexDeclaration = new VertexDeclaration(vertexStride, [new VertexElement(0, vertexformat, attributeLocation)]);
        prob._isNeedUpdate = true;
        prob._vertexStride = vertexStride / 4;
        prob.createInstanceVertexBuffer3D();
    }
    setVectorArray(attributeName, arrays, attributeLocation) {
        var prob = this._propertyMap[attributeLocation];
        if (prob) {
            this._checkPropertyLegal(VertexElementFormat.Vector4, attributeName, attributeLocation, prob);
            prob._value = arrays;
            prob._isNeedUpdate = true;
        }
        else
            this._creatProperty(attributeName, arrays, 16, VertexElementFormat.Vector4, attributeLocation);
    }
    setVector3Array(attributeName, arrays, attributeLocation) {
        var prob = this._propertyMap[attributeLocation];
        if (prob) {
            this._checkPropertyLegal(VertexElementFormat.Vector3, attributeName, attributeLocation, prob);
            prob._value = arrays;
            prob._isNeedUpdate = true;
        }
        else
            this._creatProperty(attributeName, arrays, 12, VertexElementFormat.Vector3, attributeLocation);
    }
    setVector2Array(attributeName, arrays, attributeLocation) {
        var prob = this._propertyMap[attributeLocation];
        if (prob) {
            this._checkPropertyLegal(VertexElementFormat.Vector2, attributeName, attributeLocation, prob);
            prob._value = arrays;
            prob._isNeedUpdate = true;
        }
        else
            this._creatProperty(attributeName, arrays, 8, VertexElementFormat.Vector2, attributeLocation);
    }
    setNumberArray(attributeName, arrays, attributeLocation) {
        var prob = this._propertyMap[attributeLocation];
        if (prob) {
            this._checkPropertyLegal(VertexElementFormat.Single, attributeName, attributeLocation, prob);
            prob._value = arrays;
            prob._isNeedUpdate = true;
        }
        else
            this._creatProperty(attributeName, arrays, 4, VertexElementFormat.Single, attributeLocation);
    }
    getPropertyArray(attributeLocation) {
        var prob = this._propertyMap[attributeLocation];
        return prob ? prob._value : null;
    }
    clear() {
        for (var i in this._propertyMap) {
            this._propertyMap[i].destroy();
        }
        this._propertyMap = {};
    }
}
MaterialInstancePropertyBlock.INSTANCETYPE_ATTRIBUTE = 0;
MaterialInstancePropertyBlock.INSTANCETYPE_UNIFORMBUFFER = 1;

//# sourceMappingURL=MaterialInstancePropertyBlock.js.map
