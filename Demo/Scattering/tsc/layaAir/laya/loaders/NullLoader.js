import { Loader } from "../net/Loader";
export class NullLoader {
    load(task) {
        return Promise.resolve(null);
    }
}
Loader.registerLoader(["lighting"], NullLoader);

//# sourceMappingURL=NullLoader.js.map
