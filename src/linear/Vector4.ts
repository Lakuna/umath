import type Vector from "@lakuna/umath/linear/Vector.js";
import epsilon from "@lakuna/umath/utility/epsilon.js";
import type { Matrix4Like } from "@lakuna/umath/linear/Matrix4.js";
import type { QuaternionLike } from "@lakuna/umath/linear/Quaternion.js";

/** A quantity with magnitude and direction in four dimensions. */
export type Vector4Like = Vector4 | [number, number, number, number];

/** A quantity with magnitude and direction in four dimensions. */
export default class Vector4 extends Float32Array implements Vector {
    /**
     * Creates a vector with the given values.
     * @param x The first component.
     * @param y The second component.
     * @param z The third component.
     * @param w The fourth component.
     * @returns A new vector.
     */
    public static fromValues(x: number, y: number, z: number, w: number): Vector4;

    /**
     * Creates a vector with the given values.
     * @param x The first component.
     * @param y The second component.
     * @param z The third component.
     * @param w The fourth component.
     * @param out The vector to store the result in.
     * @returns A new vector.
     */
    public static fromValues<T extends Vector4Like>(x: number, y: number, z: number, w: number, out: T): T;

    public static fromValues<T extends Vector4Like>(x: number, y: number, z: number, w: number, out: T = new Vector4() as T): T {
        out[0] = x;
        out[1] = y;
        out[2] = z;
        out[3] = w;
        return out;
    }

    /** Creates a four-dimensional zero vector. */
    public constructor() {
        super(4);
    }

    /**
     * Determines whether this vector is roughly equivalent to another.
     * @param vector The other vector.
     * @returns Whether the vectors are equivalent.
     */
    public equals(vector: Vector4Like): boolean {
        const a0: number = this[0] as number;
        const a1: number = this[1] as number;
        const a2: number = this[2] as number;
        const a3: number = this[3] as number;

        const b0: number = vector[0];
        const b1: number = vector[1];
        const b2: number = vector[2];
        const b3: number = vector[3];

        return Math.abs(a0 - b0) <= epsilon * Math.max(1, Math.abs(a0), Math.abs(b0))
            && Math.abs(a1 - b1) <= epsilon * Math.max(1, Math.abs(a1), Math.abs(b1))
            && Math.abs(a2 - b2) <= epsilon * Math.max(1, Math.abs(a2), Math.abs(b2))
            && Math.abs(a3 - b3) <= epsilon * Math.max(1, Math.abs(a3), Math.abs(b3));
    }

    /**
     * Determines whether this vector is exactly equivalent to another.
     * @param vector The other vector.
     * @returns Whether the vectors are equivalent.
     */
    public exactEquals(vector: Vector4Like): boolean {
        return this[0] == vector[0]
            && this[1] == vector[1]
            && this[2] == vector[2]
            && this[3] == vector[3];
    }

    /**
     * Adds two vectors of the same size.
     * @param vector The other vector.
     * @returns The sum of the vectors.
     */
    public add(vector: Vector4Like): Vector4;

    /**
     * Adds two vectors of the same size.
     * @param vector The other vector.
     * @param out The vector to store the result in.
     * @returns The sum of the vectors.
     */
    public add<T extends Vector4Like>(vector: Vector4Like, out: T): T;

    public add<T extends Vector4Like>(vector: Vector4Like, out: T = new Vector4() as T): T {
        out[0] = (this[0] as number) + vector[0];
        out[1] = (this[1] as number) + vector[1];
        out[2] = (this[2] as number) + vector[2];
        out[3] = (this[3] as number) + vector[3];
        return out;
    }

    /**
     * Creates a copy of this vector.
     * @returns A copy of this vector.
     */
    public clone(): Vector4 {
        const out: Vector4 = new Vector4();
        out[0] = this[0] as number;
        out[1] = this[1] as number;
        out[2] = this[2] as number;
        out[3] = this[3] as number;
        return out;
    }

    /**
     * Copies the values of another vector into this one.
     * @param vector The vector to copy.
     * @returns This vector.
     */
    public copy(vector: Vector4Like): this {
        this[0] = vector[0];
        this[1] = vector[1];
        this[2] = vector[2];
        this[3] = vector[3];
        return this;
    }

    /**
     * Multiplies this vector by another.
     * @param vector The other vector.
     * @returns The product of the vectors.
     */
    public multiply(vector: Vector4Like): Vector4;

    /**
     * Multiplies this vector by another.
     * @param vector The other vector.
     * @param out The vector to store the result in.
     * @returns The product of the vectors.
     */
    public multiply<T extends Vector4Like>(vector: Vector4Like, out: T): T;

    public multiply<T extends Vector4Like>(vector: Vector4Like, out: T = new Vector4() as T): T {
        out[0] = (this[0] as number) * vector[0];
        out[1] = (this[1] as number) * vector[1];
        out[2] = (this[2] as number) * vector[2];
        out[3] = (this[3] as number) * vector[3];
        return out;
    }

    /**
     * Divides this vector by another.
     * @param vector The other vector.
     * @returns The quotient of the vectors.
     */
    public divide(vector: Vector4Like): Vector4;

        /**
     * Divides this vector by another.
     * @param vector The other vector.
     * @param out The vector to store the result in.
     * @returns The quotient of the vectors.
     */
    public divide<T extends Vector4Like>(vector: Vector4Like, out: T): T;

    public divide<T extends Vector4Like>(vector: Vector4Like, out: T = new Vector4() as T): T {
        out[0] = (this[0] as number) / vector[0];
        out[1] = (this[1] as number) / vector[1];
        out[2] = (this[2] as number) / vector[2];
        out[3] = (this[3] as number) / vector[3];
        return out;
    }

    /**
     * Subtracts another vector from this one.
     * @param vector The other vector.
     * @returns The difference between the vectors.
     */
    public subtract(vector: Vector4Like): Vector4;

    /**
     * Subtracts another vector from this one.
     * @param vector The other vector.
     * @param out The vector to store the result in.
     * @returns The difference between the vectors.
     */
    public subtract<T extends Vector4Like>(vector: Vector4Like, out: T): T;

    public subtract<T extends Vector4Like>(vector: Vector4Like, out: T = new Vector4() as T): T {
        out[0] = (this[0] as number) - vector[0];
        out[1] = (this[1] as number) - vector[1];
        out[2] = (this[2] as number) - vector[2];
        out[3] = (this[3] as number) - vector[3];
        return out;
    }

    /**
     * Rounds up the components of this vector.
     * @returns The rounded vector.
     */
    public ceil(): Vector4;

    /**
     * Rounds up the components of this vector.
     * @param out The vector to store the result in.
     * @returns The rounded vector.
     */
    public ceil<T extends Vector4Like>(out: T): T;

    public ceil<T extends Vector4Like>(out: T = new Vector4() as T): T {
        out[0] = Math.ceil(this[0] as number);
        out[1] = Math.ceil(this[1] as number);
        out[2] = Math.ceil(this[2] as number);
        out[3] = Math.ceil(this[3] as number);
        return out;
    }

    /**
     * Rounds down the components of this vector.
     * @returns The rounded vector.
     */
    public floor(): Vector4;

    /**
     * Rounds down the components of this vector.
     * @param out The vector to store the result in.
     * @returns The rounded vector.
     */
    public floor<T extends Vector4Like>(out: T): T;

    public floor<T extends Vector4Like>(out: T = new Vector4() as T): T {
        out[0] = Math.floor(this[0] as number);
        out[1] = Math.floor(this[1] as number);
        out[2] = Math.floor(this[2] as number);
        out[3] = Math.floor(this[3] as number);
        return out;
    }

    /**
     * Rounds the components of this vector.
     * @returns The rounded vector.
     */
    public round(): Vector4;

    /**
     * Rounds the components of this vector.
     * @param out The vector to store the result in.
     * @returns The rounded vector.
     */
    public round<T extends Vector4Like>(out: T): T;

    public round<T extends Vector4Like>(out: T = new Vector4() as T): T {
        out[0] = Math.round(this[0] as number);
        out[1] = Math.round(this[1] as number);
        out[2] = Math.round(this[2] as number);
        out[3] = Math.round(this[3] as number);
        return out;
    }

    /**
     * Returns the minimum of this and another vector.
     * @param vector The other vector.
     * @returns The minimum.
     */
    public min(vector: Vector4Like): Vector4;

    /**
     * Returns the minimum of this and another vector.
     * @param vector The other vector.
     * @param out The vector to store the result in.
     * @returns The minimum.
     */
    public min<T extends Vector4Like>(vector: Vector4Like, out: T): T;

    public min<T extends Vector4Like>(vector: Vector4Like, out: T = new Vector4() as T): T {
        out[0] = Math.min(this[0] as number, vector[0]);
        out[1] = Math.min(this[1] as number, vector[1]);
        out[2] = Math.min(this[2] as number, vector[2]);
        out[3] = Math.min(this[3] as number, vector[3]);
        return out;
    }

    /**
     * Returns the maximum of this and another vector.
     * @param vector The other vector.
     * @returns The minimum.
     */
    public max(vector: Vector4Like): Vector4;

    /**
     * Returns the maximum of this and another vector.
     * @param vector The other vector.
     * @param out The vector to store the result in.
     * @returns The minimum.
     */
    public max<T extends Vector4Like>(vector: Vector4Like, out: T): T;

    public max<T extends Vector4Like>(vector: Vector4Like, out: T = new Vector4() as T): T {
        out[0] = Math.max(this[0] as number, vector[0]);
        out[1] = Math.max(this[1] as number, vector[1]);
        out[2] = Math.max(this[2] as number, vector[2]);
        out[3] = Math.max(this[3] as number, vector[3]);
        return out;
    }

    /**
     * Scales this vector by a scalar.
     * @param scalar The scalar.
     * @returns The scaled vector.
     */
    public scale(scalar: number): Vector4;

    /**
     * Scales this vector by a scalar.
     * @param scalar The scalar.
     * @param out The vector to store the result in.
     * @returns The scaled vector.
     */
    public scale<T extends Vector4Like>(scalar: number, out: T): T;

    public scale<T extends Vector4Like>(scalar: number, out: T = new Vector4() as T): T {
        out[0] = (this[0] as number) * scalar;
        out[1] = (this[1] as number) * scalar;
        out[2] = (this[2] as number) * scalar;
        out[3] = (this[3] as number) * scalar;
        return out;
    }

    /**
     * Adds another vector to this one after scaling the other by a scalar.
     * @param vector The other vector.
     * @param scalar The scalar.
     * @returns The sum.
     */
    public scaleAndAdd(vector: Vector4Like, scalar: number): Vector4;

    /**
     * Adds another vector to this one after scaling the other by a scalar.
     * @param vector The other vector.
     * @param s The scalar.
     * @param out The vector to store the result in.
     * @returns The sum.
     */
    public scaleAndAdd<T extends Vector4Like>(vector: Vector4Like, scalar: number, out: T): T;

    public scaleAndAdd<T extends Vector4Like>(vector: Vector4Like, scalar: number, out: T = new Vector4() as T): T {
        out[0] = (this[0] as number) + vector[0] * scalar;
        out[1] = (this[1] as number) + vector[1] * scalar;
        out[2] = (this[2] as number) + vector[2] * scalar;
        out[3] = (this[3] as number) + vector[3] * scalar;
        return out;
    }

    /**
     * Calculates the Euclidean distance between this vector and another.
     * @param vector The other vector.
     * @returns The distance.
     */
    public distance(vector: Vector4Like): number {
        const x: number = vector[0] - (this[0] as number);
        const y: number = vector[1] - (this[1] as number);
        const z: number = vector[2] - (this[2] as number);
        const w: number = vector[3] - (this[3] as number);
        return Math.hypot(x, y, z, w);
    }

    /**
     * Calculates the squared Euclidean distance between this vector and another.
     * @param vector The other vector.
     * @returns The squared distance.
     */
    public squaredDistance(vector: Vector4Like): number {
        const x: number = vector[0] - (this[0] as number);
        const y: number = vector[1] - (this[1] as number);
        const z: number = vector[2] - (this[2] as number);
        const w: number = vector[3] - (this[3] as number);
        return x * x + y * y + z * z + w * w;
    }

    /** The magnitude (length) of this vector. */
    public get magnitude(): number {
        const x: number = this[0] as number;
        const y: number = this[1] as number;
        const z: number = this[2] as number;
        const w: number = this[3] as number;
        return Math.hypot(x, y, z, w);
    }

    /** The squared magnitude (length) of this vector. */
    public get squaredMagnitude(): number {
        const x: number = this[0] as number;
        const y: number = this[1] as number;
        const z: number = this[2] as number;
        const w: number = this[3] as number;
        return x * x + y * y + z * z + w * w;
    }

    /**
     * Negates this vector.
     * @returns The negated vector.
     */
    public negate(): Vector4;

    /**
     * Negates this vector.
     * @param out The vector to store the result in.
     * @returns The negated vector.
     */
    public negate<T extends Vector4Like>(out: T): T;

    public negate<T extends Vector4Like>(out: T = new Vector4() as T): T {
        out[0] = -(this[0] as number);
        out[1] = -(this[1] as number);
        out[2] = -(this[2] as number);
        out[3] = -(this[3] as number);
        return out;
    }

    /**
     * Calculates the multiplicative inverse of the components of this vector.
     * @returns The inverted vector.
     */
    public inverse(): Vector4;

    /**
     * Calculates the multiplicative inverse of the components of this vector.
     * @param out The vector to store the result in.
     * @returns The inverted vector.
     */
    public inverse<T extends Vector4Like>(out: T): T;

    public inverse<T extends Vector4Like>(out: T = new Vector4() as T): T {
        out[0] = 1 / (this[0] as number);
        out[1] = 1 / (this[1] as number);
        out[2] = 1 / (this[2] as number);
        out[3] = 1 / (this[3] as number);
        return out;
    }

    /**
     * Normalizes this vector.
     * @returns The normalized vector.
     */
    public normalize(): Vector4;

    /**
     * Normalizes this vector.
     * @param out The vector to store the result in.
     * @returns The normalized vector.
     */
    public normalize<T extends Vector4Like>(out: T): T;

    public normalize<T extends Vector4Like>(out: T = new Vector4() as T): T {
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
     * Calculates the dot product of this and another vector.
     * @param vector The other vector.
     * @returns The dot product.
     */
    public dot(vector: Vector4Like): number {
        return (this[0] as number) * vector[0] + (this[1] as number) * vector[1] + (this[2] as number) * vector[2] + (this[3] as number) * vector[3];
    }

    /**
     * Calculates the cross product of this and two other vectors in a four-dimensional space.
     * @param a One other vector.
     * @param b The other other vector.
     * @returns The cross product.
     */
    public cross(a: Vector4Like, b: Vector4Like): Vector4;

    /**
     * Calculates the cross product of this and two other vectors in a four-dimensional space.
     * @param a One other vector.
     * @param b The other other vector.
     * @param out The vector to store the result in.
     * @returns The cross product.
     */
    public cross<T extends Vector4Like>(a: Vector4Like, b: Vector4Like, out: T): T;

    public cross<T extends Vector4Like>(a: Vector4Like, b: Vector4Like, out: T = new Vector4() as T): T {
        const c = a[0] * b[1] - a[1] * b[0];
        const d = a[0] * b[2] - a[2] * b[0];
        const e = a[0] * b[3] - a[3] * b[0];
        const f = a[1] * b[2] - a[2] * b[1];
        const g = a[1] * b[3] - a[3] * b[1];
        const h = a[2] * b[3] - a[3] * b[2];

        const i = this[0] as number;
        const j = this[1] as number;
        const k = this[2] as number;
        const l = this[3] as number;

        out[0] = j * h - k * g + l * f;
        out[1] = -(i * h) + k * e - l * d;
        out[2] = i * g - j * e + l * c;
        out[3] = -(i * f) + j * d - k * c;
        return out;
    }

    /**
     * Performs a linear interpolation between this and another vector.
     * @param vector The other vector.
     * @param t The interpolation amount (in `[0,1]`).
     * @returns The interpolated vector.
     */
    public lerp(vector: Vector4Like, t: number): Vector4;

    /**
     * Performs a linear interpolation between this and another vector.
     * @param vector The other vector.
     * @param t The interpolation amount (in `[0,1]`).
     * @param out The vector to store the result in.
     * @returns The interpolated vector.
     */
    public lerp<T extends Vector4Like>(vector: Vector4Like, t: number, out: T): T;

    public lerp<T extends Vector4Like>(vector: Vector4Like, t: number, out: T = new Vector4() as T): T {
        const ax: number = this[0] as number;
        const ay: number = this[1] as number;
        const az: number = this[2] as number;
        const aw: number = this[3] as number;

        out[0] = ax + t * (vector[0] - ax);
        out[1] = ay + t * (vector[1] - ay);
        out[2] = az + t * (vector[2] - az);
        out[3] = aw + t * (vector[3] - aw);
        return out;
    }

    /**
     * Sets this vector to a random value with the given magnitude.
     * @param magnitude The magnitude.
     * @returns This vector.
     */
    public random(magnitude = 1): this {
        let v1: number;
        let v2: number;
        let s1: number;
        do {
            v1 = Math.random() * 2 - 1;
            v2 = Math.random() * 2 - 1;
            s1 = v1 * v1 + v2 * v2;
        } while (s1 >= 1);

        let v3: number;
        let v4: number;
        let s2: number;
        do {
            v3 = Math.random() * 2 - 1;
            v4 = Math.random() * 2 - 1;
            s2 = v3 * v3 + v4 * v4;
        } while (s2 >= 1);

        const d: number = Math.sqrt((1 - s1) / s2);

        this[0] = magnitude * v1;
        this[1] = magnitude * v2;
        this[2] = magnitude * v3 * d;
        this[3] = magnitude * v4 * d;
        return this;
    }

    /**
     * Transforms this vector by a four-by-four matrix.
     * @param matrix The matrix.
     * @returns The transformed vector.
     */
    public transformMatrix4(matrix: Matrix4Like): Vector4;

    /**
     * Transforms this vector by a four-by-four matrix.
     * @param matrix The matrix.
     * @param out The vector to store the result in.
     * @returns The transformed vector.
     */
    public transformMatrix4<T extends Vector4Like>(matrix: Matrix4Like, out: T): T;

    public transformMatrix4<T extends Vector4Like>(matrix: Matrix4Like, out: T = new Vector4() as T): T {
        const x: number = this[0] as number;
        const y: number = this[1] as number;
        const z: number = this[2] as number;
        const w: number = this[3] as number;

        out[0] = matrix[0] * x + matrix[4] * y + matrix[8] * z + matrix[12] * w;
        out[1] = matrix[1] * x + matrix[5] * y + matrix[9] * z + matrix[13] * w;
        out[2] = matrix[2] * x + matrix[6] * y + matrix[10] * z + matrix[14] * w;
        out[3] = matrix[3] * x + matrix[7] * y + matrix[11] * z + matrix[15] * w;
        return out;
    }

    /**
     * Sets this to the zero vector.
     * @returns This vector.
     */
    public zero(): this {
        this[0] = 0;
        this[1] = 0;
        this[2] = 0;
        this[3] = 0;
        return this;
    }

    /**
     * Transforms this vector by a quaternion.
     * @param quaternion The quaternion.
     * @returns The transformed vector.
     */
    public transformQuaternion(quaternion: QuaternionLike): Vector4;

    /**
     * Transforms this vector by a quaternion.
     * @param quaternion The quaternion.
     * @param out The vector to store the result in.
     * @returns The transformed vector.
     */
    public transformQuaternion<T extends Vector4Like>(quaternion: QuaternionLike, out: T): T;

    public transformQuaternion<T extends Vector4Like>(quaternion: QuaternionLike, out: T = new Vector4() as T): T {
        const x: number = this[0] as number;
        const y: number = this[1] as number;
        const z: number = this[2] as number;

        const qx: number = quaternion[0];
        const qy: number = quaternion[1];
        const qz: number = quaternion[2];
        const qw: number = quaternion[3];

        const ix: number = qw * x + qy * z - qz * y;
        const iy: number = qw * y + qz * x - qx * z;
        const iz: number = qw * z + qx * y - qy * x;
        const iw: number = -qx * x - qy * y - qz * z;
        
        out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
        out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
        out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
        out[3] = this[3] as number;
        return out;
    }
}
