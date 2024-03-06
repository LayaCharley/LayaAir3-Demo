import { Prefab } from "./HierarchyResource";
export class PrefabImpl extends Prefab {
    constructor(api, data, version) {
        super(version);
        this.api = api;
        this.data = data;
    }
    create(options, errors) {
        let ret = this.api.parse(this.data, options, errors);
        if (Array.isArray(ret)) {
            if (ret.length == 1) {
                ret[0].url = this.url;
            }
            return ret[0];
        }
        else {
            ret.url = this.url;
            return ret;
        }
    }
}

//# sourceMappingURL=PrefabImpl.js.map
