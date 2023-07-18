import { epsilon, type AxisAngle } from "@lakuna/umath";
import Matrix3, { type Matrix3Like } from "@lakuna/umath/Matrix3";
import type { Vector3Like } from "@lakuna/umath/Vector3";

// TODO: Separate methods into individual functions.
// TODO: Link documentation to relevant articles.

/** A complex number that is commonly used to describe rotations. */
export type QuaternionLike = Quaternion | [number, number, number, number];

/**
 * A complex number that is commonly used to describe rotations.
 * @see [Wikipedia](https://en.wikipedia.org/wiki/Quaternion)
 */
export default class Quaternion extends Float32Array {
    /**
     * Creates a quaternion from a three-by-three rotation matrix.
     * @param matrix The matrix.
     * @returns The quaternion.
     */
    public static fromMatrix3(matrix: Matrix3Like): Quaternion;

    /**
     * Creates a quaternion from a three-by-three rotation matrix.
     * @param matrix The matrix.
     * @param out The quaternion to store the result in.
     * @returns The quaternion.
     */
    public static fromMatrix3<T extends QuaternionLike>(matrix: Matrix3Like, out: T): T;

    public static fromMatrix3<T extends QuaternionLike>(matrix: Matrix3Like, out: T = new Quaternion() as T): T {
        const fTrace: number = matrix[0] + matrix[4] + matrix[8];
        if (fTrace > 0) {
            let fRoot: number = Math.sqrt(fTrace + 1);
            out[3] = 0.5 * fRoot;
            fRoot = 0.5 / fRoot;
            out[0] = (matrix[5] - matrix[7]) * fRoot;
            out[1] = (matrix[6] - matrix[2]) * fRoot;
            out[2] = (matrix[1] - matrix[3]) * fRoot;
        } else {
            let i = 0;
            if (matrix[4] > matrix[0]) { i = 1; }
            if (matrix[8] > (matrix[i * 3 + i] as number)) { i = 2; }
            const j: number = (i + 1) % 3;
            const k: number = (i + 2) % 3;

            let fRoot: number = Math.sqrt((matrix[i * 3 + i] as number) - (matrix[j * 3 + j] as number) - (matrix[k * 3 + k] as number) + 1);
            out[i] = 0.5 * fRoot;
            fRoot = 0.5 / fRoot;
            out[3] = ((matrix[j * 3 + k] as number) - (matrix[k * 3 + j] as number)) * fRoot;
            out[j] = ((matrix[j * 3 + i] as number) + (matrix[i * 3 + j] as number)) * fRoot;
            out[k] = ((matrix[k * 3 + i] as number) + (matrix[i * 3 + k] as number)) * fRoot;
        }
        return out;
    }

    /**
     * Creates a quaternion from equivalent x-y-z Tait-Bryan angles
     * @param x The x angle.
     * @param y The y angle.
     * @param z The z angle.
     * @returns The quaternion.
     * @see [Euler angles](https://en.wikipedia.org/wiki/Euler_angles)
     */
    public static fromEuler(x: number, y: number, z: number): Quaternion;

    /**
     * Creates a quaternion from equivalent x-y-z Tait-Bryan angles
     * @param x The x angle.
     * @param y The y angle.
     * @param z The z angle.
     * @param out The quaternion to store the result in.
     * @returns The quaternion.
     * @see [Euler angles](https://en.wikipedia.org/wiki/Euler_angles)
     */
    public static fromEuler<T extends QuaternionLike>(x: number, y: number, z: number, out: T): T;

    public static fromEuler<T extends QuaternionLike>(x: number, y: number, z: number, out: T = new Quaternion() as T): T {
        const r: number = (0.5 * Math.PI) / 180;

        const x2: number = x * r;
        const y2: number = y * r;
        const z2: number = z * r;

        const sx: number = Math.sin(x2);
        const cx: number = Math.cos(x2);
        const sy: number = Math.sin(y2);
        const cy: number = Math.cos(y2);
        const sz: number = Math.sin(z2);
        const cz: number = Math.cos(z2);

        out[0] = sx * cy * cz - cx * sy * sz;
        out[1] = cx * sy * cz + sx * cy * sz;
        out[2] = cx * cy * sz - sx * sy * cz;
        out[3] = cx * cy * cz + sx * sy * sz;
        return out;
    }

    /**
     * Creates a quaternion with the given values.
     * @param x The first component.
     * @param y The second component.
     * @param z The third component.
     * @param w The fourth component.
     * @returns A new quaternion.
     */
    public static fromValues(x: number, y: number, z: number, w: number): Quaternion;

    /**
     * Creates a quaternion with the given values.
     * @param x The first component.
     * @param y The second component.
     * @param z The third component.
     * @param w The fourth component.
     * @param out The quaternion to store the result in.
     * @returns A new quaternion.
     */
    public static fromValues<T extends QuaternionLike>(x: number, y: number, z: number, w: number, out: T): T;

    public static fromValues<T extends QuaternionLike>(x: number, y: number, z: number, w: number, out: T = new Quaternion() as T): T {
        out[0] = x;
        out[1] = y;
        out[2] = z;
        out[3] = w;
        return out;
    }

    /**
     * Creates a quaternion with values corresponding to the given orthonormal set of vectors.
     * @param view The vector representing the viewing direction.
     * @param right The vector representing the local "right" direction.
     * @param up The vector representing the local "up" direction.
     * @returns The quaternion.
     */
    public static fromAxes(view: Vector3Like, right: Vector3Like, up: Vector3Like): Quaternion;

    /**
     * Creates a quaternion with values corresponding to the given orthonormal set of vectors.
     * @param view The vector representing the viewing direction.
     * @param right The vector representing the local "right" direction.
     * @param up The vector representing the local "up" direction.
     * @param out The quaternion to store the result in.
     * @returns The quaternion.
     */
    public static fromAxes<T extends QuaternionLike>(view: Vector3Like, right: Vector3Like, up: Vector3Like, out: T): T;

    public static fromAxes<T extends QuaternionLike>(view: Vector3Like, right: Vector3Like, up: Vector3Like, out: T = new Quaternion() as T): T {
        intermediary[0] = right[0];
        intermediary[3] = right[1];
        intermediary[6] = right[2];
        intermediary[1] = up[0];
        intermediary[4] = up[1];
        intermediary[7] = up[2];
        intermediary[2] = -view[0];
        intermediary[5] = -view[1];
        intermediary[8] = -view[2];
        return Quaternion.fromMatrix3(intermediary, out); // TODO: Normalize this output.
    }
    
    /** Creates an identity quaternion. */
    public constructor() {
        super(4);
        this[3] = 1;
    }

    /**
     * Sets this quaternion to the identity.
     * @returns This quaternion.
     */
    public identity(): this {
        this[0] = 0;
        this[1] = 0;
        this[2] = 0;
        this[3] = 1;
        return this;
    }

    /** The axis and angle that represent this quaternion. */
    public get axisAngle(): AxisAngle {
        const r: number = Math.acos(this[3] as number) * 2;
        const s: number = Math.sin(r / 2);

        return {
            axis: s > epsilon
                ? [(this[0] as number) / s, (this[1] as number) / s, (this[2] as number) / s]
                : [1, 0, 0],
            angle: r
        };
    }

    /** The axis and angle that represent this quaternion. */
    public set axisAngle(value: AxisAngle) {
        const r: number = value.angle * 0.5;
        const s: number = Math.sin(r);

        this[0] = s * value.axis[0];
        this[1] = s * value.axis[1];
        this[2] = s * value.axis[2];
        this[3] = Math.cos(r);
    }

    /**
     * Gets the angular distance between this unit quaternion and another.
     * @param quaternion The other unit quaternion.
     * @returns The angular distance in radians.
     */
    public getAngle(quaternion: QuaternionLike): number {
        const dot = this.dot(quaternion);
        return Math.acos(2 * dot * dot - 1);
    }

    /**
     * Multiplies this and another quaternion.
     * @param quaternion The other quaternion.
     * @returns The product.
     */
    public multiply(quaternion: QuaternionLike): Quaternion;

    /**
     * Multiplies this and another quaternion.
     * @param quaternion The other quaternion.
     * @param out The quaternion to store the result in.
     * @returns The product.
     */
    public multiply<T extends QuaternionLike>(quaternion: QuaternionLike, out: T): T;

    public multiply<T extends QuaternionLike>(quaternion: QuaternionLike, out: T = new Quaternion() as T): T {
        const ax: number = this[0] as number;
        const ay: number = this[1] as number;
        const az: number = this[2] as number;
        const aw: number = this[3] as number;

        const bx: number = quaternion[0];
        const by: number = quaternion[1];
        const bz: number = quaternion[2];
        const bw: number = quaternion[3];

        out[0] = ax * bw + aw * bx + ay * bz - az * by;
        out[1] = ay * bw + aw * by + az * bx - ax * bz;
        out[2] = az * bw + aw * bz + ax * by - ay * bx;
        out[3] = aw * bw - ax * bx - ay * by - az * bz;
        return out;
    }

    /**
     * Rotates this quaternion by the given angle around the X-axis.
     * @param radians The angle in radians.
     * @returns The rotated quaternion.
     */
    public rotateX(radians: number): Quaternion;

    /**
     * Rotates this quaternion by the given angle around the X-axis.
     * @param radians The angle in radians.
     * @param out The quaternion to store the result in.
     * @returns The rotated quaternion.
     */
    public rotateX<T extends QuaternionLike>(radians: number, out: T): T;

    public rotateX<T extends QuaternionLike>(radians: number, out: T = new Quaternion() as T): T {
        const r: number = radians * 0.5;

        const ax: number = this[0] as number;
        const ay: number = this[1] as number;
        const az: number = this[2] as number;
        const aw: number = this[3] as number;

        const bx: number = Math.sin(r);
        const bw: number = Math.cos(r);

        out[0] = ax * bw + aw * bx;
        out[1] = ay * bw + az * bx;
        out[2] = az * bw - ay * bx;
        out[3] = aw * bw - ax * bx;
        return out;
    }

    /**
     * Rotates this quaternion by the given angle around the Y-axis.
     * @param radians The angle in radians.
     * @returns The rotated quaternion.
     */
    public rotateY(radians: number): Quaternion;

    /**
     * Rotates this quaternion by the given angle around the Y-axis.
     * @param radians The angle in radians.
     * @param out The quaternion to store the result in.
     * @returns The rotated quaternion.
     */
    public rotateY<T extends QuaternionLike>(radians: number, out: T): T;

    public rotateY<T extends QuaternionLike>(radians: number, out: T = new Quaternion() as T): T {
        const r: number = radians * 0.5;

        const ax: number = this[0] as number;
        const ay: number = this[1] as number;
        const az: number = this[2] as number;
        const aw: number = this[3] as number;

        const by: number = Math.sin(r);
        const bw: number = Math.cos(r);

        out[0] = ax * bw - az * by;
        out[1] = ay * bw + aw * by;
        out[2] = az * bw + ax * by;
        out[3] = aw * bw - ay * by;
        return out;
    }

    /**
     * Rotates this quaternion by the given angle around the Z-axis.
     * @param radians The angle in radians.
     * @returns The rotated quaternion.
     */
    public rotateZ(radians: number): Quaternion;

    /**
     * Rotates this quaternion by the given angle around the Z-axis.
     * @param radians The angle in radians.
     * @param out The quaternion to store the result in.
     * @returns The rotated quaternion.
     */
    public rotateZ<T extends QuaternionLike>(radians: number, out: T): T;

    public rotateZ<T extends QuaternionLike>(radians: number, out: T = new Quaternion() as T): T {
        const r: number = radians * 0.5;

        const ax: number = this[0] as number;
        const ay: number = this[1] as number;
        const az: number = this[2] as number;
        const aw: number = this[3] as number;

        const bz: number = Math.sin(r);
        const bw: number = Math.cos(r);

        out[0] = ax * bw + ay * bz;
        out[1] = ay * bw - ax * bz;
        out[2] = az * bw + aw * bz;
        out[3] = aw * bw - az * bz;
        return out;
    }

    /**
     * Calculates the fourth component of this unit quaternion from the first three, ignoring the existing fourth component.
     * @returns The quaternion.
     */
    public calculateW(): Quaternion;

    /**
     * Calculates the fourth component of this unit quaternion from the first three, ignoring the existing fourth component.
     * @param out The quaternion to store the result in.
     * @returns The quaternion.
     */
    public calculateW<T extends QuaternionLike>(out: T): T;

    public calculateW<T extends QuaternionLike>(out: T = new Quaternion() as T): T {
        const x: number = this[0] as number;
        const y: number = this[1] as number;
        const z: number = this[2] as number;

        out[0] = x;
        out[1] = y;
        out[2] = z;
        out[3] = Math.sqrt(Math.abs(1 - x * x - y * y - z * z));
        return out;
    }

    /**
     * Calculates the exponential of this unit quaternion.
     * @returns The exponential.
     */
    public exp(): Quaternion;

    /**
     * Calculates the exponential of this unit quaternion.
     * @param out The quaternion to store the result in.
     * @returns The exponential.
     */
    public exp<T extends QuaternionLike>(out: T): T;

    public exp<T extends QuaternionLike>(out: T = new Quaternion() as T): T {
        const x: number = this[0] as number;
        const y: number = this[1] as number;
        const z: number = this[2] as number;
        const w: number = this[3] as number;

        const r: number = Math.sqrt(x * x + y * y + z * z);
        const et: number = Math.exp(w);
        const s: number = r > 0 ? (et * Math.sin(r)) / r : 0;

        out[0] = x * s;
        out[1] = y * s;
        out[2] = z * s;
        out[3] = et * Math.cos(r);
        return out;
    }

    /**
     * Calculates the natural logarithm of this unit quaternion.
     * @returns The natural logarithm.
     */
    public ln(): Quaternion;

    /**
     * Calculates the natural logarithm of this unit quaternion.
     * @param out The quaternion to store the result in.
     * @returns The natural logarithm.
     */
    public ln<T extends QuaternionLike>(out: T): T;

    public ln<T extends QuaternionLike>(out: T = new Quaternion() as T): T {
        const x: number = this[0] as number;
        const y: number = this[1] as number;
        const z: number = this[2] as number;
        const w: number = this[3] as number;

        const r: number = Math.sqrt(x * x + y * y + z * z);
        const t: number = r > 0 ? Math.atan2(r, w) / r : 0;

        out[0] = x * t;
        out[1] = y * t;
        out[2] = z * t;
        out[3] = 0.5 * Math.log(x * x + y * y + z * z + w * w);
        return out;
    }

    /**
     * Calculates a power of this unit quaternion.
     * @param scalar The amount to scale the quaternion by.
     * @returns The power.
     */
    public pow(scalar: number): Quaternion;

    /**
     * Calculates a power of this unit quaternion.
     * @param scalar The amount to scale the quaternion by.
     * @param out The quaternion to store the result in.
     * @returns The power.
     */
    public pow<T extends QuaternionLike>(scalar: number, out: T): T;

    public pow<T extends QuaternionLike>(scalar: number, out: T = new Quaternion() as T): T {
        return ((this.ln(out) as Quaternion).scale(scalar, out) as Quaternion).exp(out); // TODO: This doesn't work unless `out` is a `Quaternion`.
    }

    /**
     * Performs a spherical linear interpolation between this and another quaternion.
     * @param quaternion The other quaternion.
     * @param t The interpolation amount in `[0,1]`.
     * @returns The interpolated quaternion.
     */
    public slerp(quaternion: QuaternionLike, t: number): Quaternion;

    /**
     * Performs a spherical linear interpolation between this and another quaternion.
     * @param quaternion The other quaternion.
     * @param t The interpolation amount in `[0,1]`.
     * @param out The quaternion to store the result in.
     * @returns The interpolated quaternion.
     */
    public slerp<T extends QuaternionLike>(quaternion: QuaternionLike, t: number, out: T): T;

    public slerp<T extends QuaternionLike>(quaternion: QuaternionLike, t: number, out: T = new Quaternion() as T): T {
        const ax: number = this[0] as number;
        const ay: number = this[1] as number;
        const az: number = this[2] as number;
        const aw: number = this[3] as number;

        let bx: number = quaternion[0];
        let by: number = quaternion[1];
        let bz: number = quaternion[2];
        let bw: number = quaternion[3];
        
        let cosom: number = ax * bx + ay * by + az * bz + aw * bw;
        if (cosom < 0) {
            cosom = -cosom;
            bx = -bx;
            by = -by;
            bz = -bz;
            bw = -bw;
        }

        let scale0 = 0;
        let scale1 = 0;
        if (1 - cosom > epsilon) {
            const omega: number = Math.acos(cosom);
            const sinom: number = Math.sin(omega);
            scale0 = Math.sin((1 - t) * omega) / sinom;
            scale1 = Math.sin(t * omega) / sinom;
        } else {
            // Close enough to do a linear interpolation.
            scale0 = 1 - t;
            scale1 = t;
        }
        
        out[0] = scale0 * ax + scale1 * bx;
        out[1] = scale0 * ay + scale1 * by;
        out[2] = scale0 * az + scale1 * bz;
        out[3] = scale0 * aw + scale1 * bw;
        return out;
    }

    /**
     * Sets this to a random unit quaternion.
     * @returns A random unit quaternion.
     */
    public random(): this {
        const u1: number = Math.random();
        const u2: number = Math.random();
        const u3: number = Math.random();

        const sqrt1MinusU1: number = Math.sqrt(1 - u1);
        const sqrtU1: number = Math.sqrt(u1);

        this[0] = sqrt1MinusU1 * Math.sin(2 * Math.PI * u2);
        this[1] = sqrt1MinusU1 * Math.cos(2 * Math.PI * u2);
        this[2] = sqrtU1 * Math.sin(2 * Math.PI * u3);
        this[3] = sqrtU1 * Math.cos(2 * Math.PI * u3);
        return this;
    }

    /**
     * Calculates the inverse of this quaternion. If the quaternion is normalized, the conjugate is the same but faster to calculate.
     * @returns The inverse.
     */
    public invert(): Quaternion;

    /**
     * Calculates the inverse of this quaternion. If the quaternion is normalized, the conjugate is the same but faster to calculate.
     * @param out The quaternion to store the result in.
     * @returns The inverse.
     */
    public invert<T extends QuaternionLike>(out: T): T;

    public invert<T extends QuaternionLike>(out: T = new Quaternion() as T): T {
        const a0: number = this[0] as number;
        const a1: number = this[1] as number;
        const a2: number = this[2] as number;
        const a3: number = this[3] as number;

        const dot: number = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
        const invDot: number = dot ? 1 / dot : 0;

        if (dot == 0) {
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            return out;
        }

        out[0] = -a0 * invDot;
        out[1] = -a1 * invDot;
        out[2] = -a2 * invDot;
        out[3] = a3 * invDot;
        return out;
    }

    /**
     * Calculates the conjugate of this quaternion. If the quaternion is normalized, this is the same as the inverse but faster to calculate.
     * @returns The conjugate.
     */
    public conjugate(): Quaternion;

    /**
     * Calculates the inverse of this quaternion. If the quaternion is normalized, this is the same as the inverse but faster to calculate.
     * @param out The quaternion to store the result in.
     * @returns The conjugate.
     */
    public conjugate<T extends QuaternionLike>(out: T): T;

    public conjugate<T extends QuaternionLike>(out: T = new Quaternion() as T): T {
        out[0] = -(this[0] as number);
        out[1] = -(this[1] as number);
        out[2] = -(this[2] as number);
        out[3] = this[3] as number;
        return out;
    }

    /**
     * Creates a copy of this quaternion.
     * @returns A copy of this quaternion.
     */
    public clone(): Quaternion {
        const out: Quaternion = new Quaternion();
        out[0] = this[0] as number;
        out[1] = this[1] as number;
        out[2] = this[2] as number;
        out[3] = this[3] as number;
        return out;
    }

    /**
     * Copies the values of another quaternion into this one.
     * @param quaternion The quaternion to copy.
     * @returns This quaternion.
     */
    public copy(quaternion: QuaternionLike): this {
        this[0] = quaternion[0];
        this[1] = quaternion[1];
        this[2] = quaternion[2];
        this[3] = quaternion[3];
        return this;
    }

    /**
     * Adds two quaternions of the same size.
     * @param quaternion The other quaternion.
     * @returns The sum of the quaternions.
     */
    public add(quaternion: QuaternionLike): Quaternion;

    /**
     * Adds two quaternions of the same size.
     * @param quaternion The other quaternion.
     * @param out The quaternion to store the result in.
     * @returns The sum of the quaternions.
     */
    public add<T extends QuaternionLike>(quaternion: QuaternionLike, out: T): T;

    public add<T extends QuaternionLike>(quaternion: QuaternionLike, out: T = new Quaternion() as T): T {
        out[0] = (this[0] as number) + quaternion[0];
        out[1] = (this[1] as number) + quaternion[1];
        out[2] = (this[2] as number) + quaternion[2];
        out[3] = (this[3] as number) + quaternion[3];
        return out;
    }

    /**
     * Scales this quaternion by a scalar.
     * @param scalar The scalar.
     * @returns The scaled quaternion.
     */
    public scale(scalar: number): Quaternion;

    /**
     * Scales this quaternion by a scalar.
     * @param scalar The scalar.
     * @param out The quaternion to store the result in.
     * @returns The scaled quaternion.
     */
    public scale<T extends QuaternionLike>(scalar: number, out: T): T;

    public scale<T extends QuaternionLike>(scalar: number, out: T = new Quaternion() as T): T {
        out[0] = (this[0] as number) * scalar;
        out[1] = (this[1] as number) * scalar;
        out[2] = (this[2] as number) * scalar;
        out[3] = (this[3] as number) * scalar;
        return out;
    }

    /**
     * Calculates the dot product of this and another quaternion.
     * @param quaternion The other quaternion.
     * @returns The dot product.
     */
    public dot(quaternion: QuaternionLike): number {
        return (this[0] as number) * quaternion[0] + (this[1] as number) * quaternion[1] + (this[2] as number) * quaternion[2] + (this[3] as number) * quaternion[3];
    }

    /**
     * Performs a linear interpolation between this and another quaternion.
     * @param quaternion The other quaternion.
     * @param t The interpolation amount (in `[0,1]`).
     * @returns The interpolated quaternion.
     */
    public lerp(quaternion: QuaternionLike, t: number): Quaternion;

    /**
     * Performs a linear interpolation between this and another quaternion.
     * @param quaternion The other quaternion.
     * @param t The interpolation amount (in `[0,1]`).
     * @param out The quaternion to store the result in.
     * @returns The interpolated quaternion.
     */
    public lerp<T extends QuaternionLike>(quaternion: QuaternionLike, t: number, out: T): T;

    public lerp<T extends QuaternionLike>(quaternion: QuaternionLike, t: number, out: T = new Quaternion() as T): T {
        const ax: number = this[0] as number;
        const ay: number = this[1] as number;
        const az: number = this[2] as number;
        const aw: number = this[3] as number;

        out[0] = ax + t * (quaternion[0] - ax);
        out[1] = ay + t * (quaternion[1] - ay);
        out[2] = az + t * (quaternion[2] - az);
        out[3] = aw + t * (quaternion[3] - aw);
        return out;
    }

    /** The magnitude (length) of this quaternion. */
    public get magnitude(): number {
        const x: number = this[0] as number;
        const y: number = this[1] as number;
        const z: number = this[2] as number;
        const w: number = this[3] as number;
        return Math.hypot(x, y, z, w);
    }

    /** The squared magnitude (length) of this quaternion. */
    public get squaredMagnitude(): number {
        const x: number = this[0] as number;
        const y: number = this[1] as number;
        const z: number = this[2] as number;
        const w: number = this[3] as number;
        return x * x + y * y + z * z + w * w;
    }

    /**
     * Normalizes this quaternion.
     * @returns The normalized quaternion.
     */
    public normalize(): Quaternion;

    /**
     * Normalizes this quaternion.
     * @param out The quaternion to store the result in.
     * @returns The normalized quaternion.
     */
    public normalize<T extends QuaternionLike>(out: T): T;

    public normalize<T extends QuaternionLike>(out: T = new Quaternion() as T): T {
        const x: number = this[0] as number;
        const y: number = this[1] as number;
        const z: number = this[2] as number;
        const w: number = this[3] as number;
        
        let len: number = x * x + y * y + z * z + w * w;
        if (len > 0) {
            len = 1 / Math.sqrt(len);
        }

        out[0] = x * len;
        out[1] = y * len;
        out[2] = z * len;
        out[3] = w * len;
        return out;
    }

    /**
     * Determines whether this quaternion is roughly equivalent to another.
     * @param quaternion The other quaternion.
     * @returns Whether the quaternions are equivalent.
     */
    public equals(quaternion: QuaternionLike): boolean {
        const a0: number = this[0] as number;
        const a1: number = this[1] as number;
        const a2: number = this[2] as number;
        const a3: number = this[3] as number;

        const b0: number = quaternion[0];
        const b1: number = quaternion[1];
        const b2: number = quaternion[2];
        const b3: number = quaternion[3];

        return Math.abs(a0 - b0) <= epsilon * Math.max(1, Math.abs(a0), Math.abs(b0))
            && Math.abs(a1 - b1) <= epsilon * Math.max(1, Math.abs(a1), Math.abs(b1))
            && Math.abs(a2 - b2) <= epsilon * Math.max(1, Math.abs(a2), Math.abs(b2))
            && Math.abs(a3 - b3) <= epsilon * Math.max(1, Math.abs(a3), Math.abs(b3));
    }

    /**
     * Determines whether this quaternion is exactly equivalent to another.
     * @param quaternion The other quaternion.
     * @returns Whether the quaternions are equivalent.
     */
    public exactEquals(quaternion: QuaternionLike): boolean {
        return this[0] == quaternion[0]
            && this[1] == quaternion[1]
            && this[2] == quaternion[2]
            && this[3] == quaternion[3];
    }

    /**
     * Performs a spherical linear interpolation with two control points between this and another quaternion.
     * @param a The first control point.
     * @param b The second control point.
     * @param quaternion The other quaternion.
     * @param t The interpolation amount in `[0,1]`.
     * @returns The interpolated value.
     */
    public sqlerp(a: QuaternionLike, b: QuaternionLike, quaternion: QuaternionLike, t: number): Quaternion;

    /**
     * Performs a spherical linear interpolation with two control points between this and another quaternion.
     * @param a The first control point.
     * @param b The second control point.
     * @param quaternion The other quaternion.
     * @param t The interpolation amount in `[0,1]`.
     * @param out The quaternion to store the result in.
     * @returns The interpolated value.
     */
    public sqlerp<T extends QuaternionLike>(a: QuaternionLike, b: QuaternionLike, quaternion: QuaternionLike, t: number, out: T): T;

    public sqlerp<T extends QuaternionLike>(a: QuaternionLike, b: QuaternionLike, quaternion: QuaternionLike, t: number, out: T = new Quaternion() as T): T {
        this.slerp(quaternion, t, controlPointOne);
        (a as Quaternion).slerp(b, t, controlPointTwo); // TODO: This doesn't work unless `a` is a `Quaternion`.
        return controlPointOne.slerp(controlPointTwo, 2 * t * (1 - t), out);
    }
}

/** A three-by-three matrix that is used to store intermediary values for some functions. */
const intermediary: Matrix3 = new Matrix3();

/** A quaternion that is used to store intermediary values for some functions. */
const controlPointOne: Quaternion = new Quaternion();

/** A quaternion that is used to store intermediary values for some functions. */
const controlPointTwo: Quaternion = new Quaternion();
