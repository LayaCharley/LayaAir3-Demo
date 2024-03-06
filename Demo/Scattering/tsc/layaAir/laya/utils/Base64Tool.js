export class Base64Tool {
    static init() {
        if (Base64Tool.lookup)
            return;
        Base64Tool.lookup = new Uint8Array(256);
        for (var i = 0; i < Base64Tool.chars.length; i++) {
            Base64Tool.lookup[Base64Tool.chars.charCodeAt(i)] = i;
        }
    }
    static isBase64String(str) {
        return Base64Tool.reg.test(str);
    }
    static encode(arraybuffer) {
        var bytes = new Uint8Array(arraybuffer), i, len = bytes["length"], base64 = "";
        for (i = 0; i < len; i += 3) {
            base64 += Base64Tool.chars[bytes[i] >> 2];
            base64 += Base64Tool.chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
            base64 += Base64Tool.chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
            base64 += Base64Tool.chars[bytes[i + 2] & 63];
        }
        if ((len % 3) === 2) {
            base64 = base64.substring(0, base64.length - 1) + "=";
        }
        else if (len % 3 === 1) {
            base64 = base64.substring(0, base64.length - 2) + "==";
        }
        return base64;
    }
    static decode(base64) {
        Base64Tool.init();
        var bufferLength = base64.length * 0.75, len = base64.length, i, p = 0, encoded1, encoded2, encoded3, encoded4;
        if (base64[base64.length - 1] === "=") {
            bufferLength--;
            if (base64[base64.length - 2] === "=") {
                bufferLength--;
            }
        }
        var arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
        for (i = 0; i < len; i += 4) {
            encoded1 = Base64Tool.lookup[base64.charCodeAt(i)];
            encoded2 = Base64Tool.lookup[base64.charCodeAt(i + 1)];
            encoded3 = Base64Tool.lookup[base64.charCodeAt(i + 2)];
            encoded4 = Base64Tool.lookup[base64.charCodeAt(i + 3)];
            bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
            bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
            bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
        }
        return arraybuffer;
    }
}
Base64Tool.chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
Base64Tool.reg = /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)\s*$/i;
Base64Tool.reghead = /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,/i;
Base64Tool.lookup = null;

//# sourceMappingURL=Base64Tool.js.map
