import { PhysicsComponent } from "./PhysicsComponent";
export class BulletInteractive {
    constructor(mem, dbgline) {
        this.drawLine = (sx, sy, sz, ex, ey, ez, color) => {
            if (!this.dbgLine)
                return;
            this.dbgLine.color(color);
            this.dbgLine.line(sx, sy, sz, ex, ey, ez);
        };
        this.clearLine = () => {
            if (!this.dbgLine)
                return;
            this.dbgLine.clear();
        };
        this.jslog = (ptr, len) => {
            if (!this.mem)
                return;
            let td = new TextDecoder();
            let str = new Uint8Array(this.mem.buffer, ptr, len);
            let jsstr = td.decode(str);
            console.log(jsstr);
        };
        this.mem = mem;
        this.dbgLine = dbgline;
    }
    getWorldTransform(rigidBodyID, worldTransPointer) {
    }
    setWorldTransform(rigidBodyID, worldTransPointer) {
        var rigidBody = PhysicsComponent._physicObjectsMap[rigidBodyID];
        rigidBody._simulation._updatedRigidbodies++;
        rigidBody._updateTransformComponent(worldTransPointer);
    }
}

//# sourceMappingURL=BulletInteractive.js.map
