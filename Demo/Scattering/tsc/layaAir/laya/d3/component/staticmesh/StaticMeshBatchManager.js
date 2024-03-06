import { StaticBatchMeshRender } from "./StaticBatchMeshRender";
import { StaticMeshMergeInfo } from "./StaticMeshMergeInfo";
export class StaticMeshBatchManager {
    constructor() {
        this.meshVertexDecSet = new Set();
    }
    combine(renders) {
        for (const render of renders) {
            let haveMatch = false;
            for (const info of this.meshVertexDecSet) {
                if (info.match(render)) {
                    haveMatch = true;
                    info.addElement(render);
                }
            }
            if (!haveMatch) {
                let info = StaticMeshMergeInfo.create(render);
                info.addElement(render);
                this.meshVertexDecSet.add(info);
            }
        }
        let staticRenders = [];
        for (const info of this.meshVertexDecSet) {
            staticRenders.push(StaticBatchMeshRender.create(info));
        }
        this.meshVertexDecSet.clear();
        return staticRenders;
    }
    merge(info) {
        let staticMeshRender = StaticBatchMeshRender.create(info);
        return staticMeshRender;
    }
}

//# sourceMappingURL=StaticMeshBatchManager.js.map
