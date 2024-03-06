import { Color } from "../../maths/Color";
import { Vector3 } from "../../maths/Vector3";
import { TextureCubeFace } from "../../resource/TextureCube";
export class SphericalHarmonicsL2 {
    constructor() {
        this._coefficients = new Float32Array(27);
    }
    getCoefficient(i, j) {
        return this._coefficients[i * 9 + j];
    }
    setCoefficient(i, j, coefficient) {
        this._coefficients[i * 9 + j] = coefficient;
    }
    setCoefficients(i, coefficient0, coefficient1, coefficient2, coefficient3, coefficient4, coefficient5, coefficient6, coefficient7, coefficient8) {
        var offset = i * 9;
        this._coefficients[offset] = coefficient0;
        this._coefficients[++offset] = coefficient1;
        this._coefficients[++offset] = coefficient2;
        this._coefficients[++offset] = coefficient3;
        this._coefficients[++offset] = coefficient4;
        this._coefficients[++offset] = coefficient5;
        this._coefficients[++offset] = coefficient6;
        this._coefficients[++offset] = coefficient7;
        this._coefficients[++offset] = coefficient8;
    }
    cloneTo(dest) {
        if (this === dest)
            return;
        var coes = this._coefficients;
        var destCoes = dest._coefficients;
        for (var i = 0; i < 27; i++)
            destCoes[i] = coes[i];
    }
}
SphericalHarmonicsL2._default = new SphericalHarmonicsL2();
export class SphericalHarmonicsL2Generater {
    static surfaceArea(u, v) {
        return Math.atan2(u * v, Math.sqrt(u * u + v * v + 1.0));
    }
    static uv2Dir(u, v, face, out_dir) {
        switch (face) {
            case TextureCubeFace.PositiveX:
                out_dir.x = 1.0;
                out_dir.y = -v;
                out_dir.z = -u;
                break;
            case TextureCubeFace.NegativeX:
                out_dir.x = -1.0;
                out_dir.y = -v;
                out_dir.z = u;
                break;
            case TextureCubeFace.PositiveY:
                out_dir.x = u;
                out_dir.y = 1.0;
                out_dir.z = v;
                break;
            case TextureCubeFace.NegativeY:
                out_dir.x = u;
                out_dir.y = -1.0;
                out_dir.z = -v;
                break;
            case TextureCubeFace.PositiveZ:
                out_dir.x = u;
                out_dir.y = -v;
                out_dir.z = 1.0;
                break;
            case TextureCubeFace.NegativeZ:
                out_dir.x = -u;
                out_dir.y = -v;
                out_dir.z = -1.0;
                break;
            default:
                break;
        }
    }
    static sh_eval_9(i, x, y, z) {
        const sqrt = Math.sqrt;
        const M_PI = Math.PI;
        switch (i) {
            case 0:
                return 0.5 * sqrt(1.0 / M_PI);
            case 1:
                return -y * 0.5 * sqrt(3.0 / M_PI);
            case 2:
                return z * 0.5 * sqrt(3.0 / M_PI);
            case 3:
                return -x * 0.5 * sqrt(3.0 / M_PI);
            case 4:
                return x * y * 0.5 * sqrt(15.0 / M_PI);
            case 5:
                return -y * z * 0.5 * sqrt(15.0 / M_PI);
            case 6:
                return (3.0 * z * z - 1.0) * 0.25 * sqrt(5.0 / M_PI);
            case 7:
                return -x * z * 0.5 * sqrt(15.0 / M_PI);
            case 8:
                return (x * x - y * y) * 0.25 * sqrt(15.0 / M_PI);
            default:
                return 0;
        }
    }
    static CalCubemapSH(cubemapPixels, pixelComponentSize, cubemapSize, isGamma = true) {
        let width = cubemapSize;
        let height = cubemapSize;
        let shr = this._tempSHR.fill(0);
        let shg = this._tempSHG.fill(0);
        let shb = this._tempSHB.fill(0);
        let dir = new Vector3();
        for (let face = 0; face < 6; face++) {
            let facePixels = cubemapPixels[face];
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    let px = x + 0.5;
                    let py = y + 0.5;
                    let u = 2.0 * (px / width) - 1.0;
                    let v = 2.0 * (py / height) - 1.0;
                    let dx = 1.0 / width;
                    let dy = 1.0 / height;
                    let x0 = u - dx;
                    let y0 = v - dy;
                    let x1 = u + dx;
                    let y1 = v + dy;
                    let da = this.surfaceArea(x0, y0) - this.surfaceArea(x0, y1) - this.surfaceArea(x1, y0) + this.surfaceArea(x1, y1);
                    this.uv2Dir(u, v, face, dir);
                    Vector3.normalize(dir, dir);
                    let pixelOffset = (x + y * width) * pixelComponentSize;
                    let r = facePixels[pixelOffset];
                    let g = facePixels[pixelOffset + 1];
                    let b = facePixels[pixelOffset + 2];
                    if (isGamma) {
                        r = Color.gammaToLinearSpace(r);
                        g = Color.gammaToLinearSpace(g);
                        b = Color.gammaToLinearSpace(b);
                    }
                    for (let s = 0; s < this.SH_Count; s++) {
                        let sh_val = this.sh_eval_9(s, dir.x, dir.y, dir.z);
                        shr[s] += r * sh_val * da;
                        shg[s] += g * sh_val * da;
                        shb[s] += b * sh_val * da;
                    }
                }
            }
        }
        let sh = new SphericalHarmonicsL2();
        for (let index = 0; index < this.SH_Count; index++) {
            let scale = this.k[index];
            let r = shr[index];
            sh.setCoefficient(0, index, r * scale);
            let g = shg[index];
            sh.setCoefficient(1, index, g * scale);
            let b = shb[index];
            sh.setCoefficient(2, index, b * scale);
        }
        return sh;
    }
    static CalGradientSH(skyColor, equatorColor, groundColor, isGamma = true) {
        console.time("Gradient SH");
        let skyPixels = this._tempSkyPixels;
        let equatorPixels = this._tempEquatorPixels;
        let groundPixels = this._tempGroundPixels;
        const fillPixelBuffer = (float32, color, isGamma) => {
            let fillColor = new Color(color.x, color.y, color.z, 1.0);
            if (isGamma) {
                fillColor.toLinear(fillColor);
            }
            let r = Math.min(fillColor.r, 1.0);
            let g = Math.min(fillColor.g, 1.0);
            let b = Math.min(fillColor.b, 1.0);
            for (let index = 0; index < float32.length; index += 3) {
                float32[index] = r;
                float32[index + 1] = g;
                float32[index + 2] = b;
            }
        };
        fillPixelBuffer(skyPixels, skyColor, isGamma);
        fillPixelBuffer(equatorPixels, equatorColor, isGamma);
        fillPixelBuffer(groundPixels, groundColor, isGamma);
        let gradientPixles = [];
        gradientPixles[TextureCubeFace.PositiveY] = skyPixels;
        gradientPixles[TextureCubeFace.NegativeY] = groundPixels;
        gradientPixles[TextureCubeFace.PositiveX] = equatorPixels;
        gradientPixles[TextureCubeFace.NegativeX] = equatorPixels;
        gradientPixles[TextureCubeFace.PositiveZ] = equatorPixels;
        gradientPixles[TextureCubeFace.NegativeZ] = equatorPixels;
        let sh = SphericalHarmonicsL2Generater.CalCubemapSH(gradientPixles, 3, this.GradientSimulateSize, false);
        console.timeEnd("Gradient SH");
        return sh;
    }
}
SphericalHarmonicsL2Generater._tempSHR = new Float32Array(9);
SphericalHarmonicsL2Generater._tempSHG = new Float32Array(9);
SphericalHarmonicsL2Generater._tempSHB = new Float32Array(9);
SphericalHarmonicsL2Generater.k = [
    0.28209479177387814347,
    -0.32573500793527994772, 0.32573500793527994772, -0.32573500793527994772,
    0.27313710764801976764, -0.27313710764801976764, 0.07884789131313000151, -0.27313710764801976764, 0.13656855382400988382
];
SphericalHarmonicsL2Generater.GradientSimulateSize = 3;
SphericalHarmonicsL2Generater.SH_Count = 9;
SphericalHarmonicsL2Generater._tempSkyPixels = new Float32Array(SphericalHarmonicsL2Generater.GradientSimulateSize * SphericalHarmonicsL2Generater.GradientSimulateSize * 3);
SphericalHarmonicsL2Generater._tempEquatorPixels = new Float32Array(SphericalHarmonicsL2Generater.GradientSimulateSize * SphericalHarmonicsL2Generater.GradientSimulateSize * 3);
SphericalHarmonicsL2Generater._tempGroundPixels = new Float32Array(SphericalHarmonicsL2Generater.GradientSimulateSize * SphericalHarmonicsL2Generater.GradientSimulateSize * 3);

//# sourceMappingURL=SphericalHarmonicsL2.js.map
