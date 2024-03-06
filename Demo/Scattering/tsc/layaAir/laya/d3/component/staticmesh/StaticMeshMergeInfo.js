export class StaticMeshMergeInfo {
    constructor() {
        this._renders = [];
        this.vertexCount = 0;
        this.indexCount = 0;
    }
    static create(render) {
        let mesh = render.getMesh();
        let owner = render.owner;
        let info = new StaticMeshMergeInfo();
        info.lightmapIndex = render.lightmapIndex;
        info.receiveShadow = render.receiveShadow;
        info.vertexDec = mesh ? mesh.getVertexDeclaration() : null;
        return info;
    }
    get renders() {
        return this._renders;
    }
    match(render) {
        let mesh = render.getMesh();
        let owner = render.owner;
        let match = true;
        match = match && this.lightmapIndex == render.lightmapIndex;
        match = match && this.receiveShadow == render.receiveShadow;
        match = match && this.vertexDec == mesh.getVertexDeclaration();
        return match;
    }
    addElement(render) {
        this.renders.push(render);
        let mesh = render.getMesh();
        this.vertexCount += mesh.vertexCount;
        this.indexCount += mesh.indexCount;
    }
    destroy() {
        this._renders = null;
    }
}

//# sourceMappingURL=StaticMeshMergeInfo.js.map
