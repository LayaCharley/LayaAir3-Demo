import { Component } from "../../components/Component";
import { Mesh } from "../resource/models/Mesh";
export declare class MeshFilter extends Component {
    constructor();
    get sharedMesh(): Mesh;
    set sharedMesh(value: Mesh);
    protected _onDestroy(): void;
}
