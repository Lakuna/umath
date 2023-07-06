import type Vector from "@lakuna/umath/linear/Vector.js";
import epsilon from "@lakuna/umath/utility/epsilon.js";
import type { Matrix3Like } from "@lakuna/umath/linear/Matrix3.js";
import type { Matrix4Like } from "@lakuna/umath/linear/Matrix4.js";
import type { QuaternionLike } from "@lakuna/umath/linear/Quaternion.js";

/** A quantity with magnitude and direction in three dimensions. */
export type Vector3Like = Vector3 | [number, number, number];

/** A quantity with magnitude and direction in three dimensions. */
export default class Vector3 extends Float32Array implements Vector {
    /**
     * Creates a vector with the given values.
     * @param x The first component.
     * @param y The second component.
     * @param z The third component.
     * @returns A new vector.
     */
    public static fromValues(x: number, y: number, z: number): Vector3;

    /**
     * Creates a vector with the given values.
     * @param x The first component.
     * @param y The second component.
     * @param z The third component.
     * @param out The vector to store the result in.
     * @returns A new vector.
     */
    public static fromValues<T extends Vector3Like>(x: number, y: number, z: number, out: T): T;

    public static fromValues<T extends Vector3Like>(x: number, y: number, z: number, out: T = new Vector3() as T): T {
        out[0] = x;
        out[1] = y;
        out[2] = z;
        return out;
    }

    /** Creates a three-dimensional zero vector. */
    public constructor() {
        super(3);
    }

    /**
	 * Determines whether this vector is roughly equivalent to another.
	 * @param vector The other vector.
	 * @returns Whether the vectors are equivalent.
	 */
	public equals(vector: Vector3Like): boolean {
        const a0: number = this[0] as number;
        const a1: number = this[1] as number;
        const a2: number = this[2] as number;

        const b0: number = vector[0];
        const b1: number = vector[1];
        const b2: number = vector[2];

        return Math.abs(a0 - b0) <= epsilon * Math.max(1, Math.abs(a0), Math.abs(b0))
            && Math.abs(a1 - b1) <= epsilon * Math.max(1, Math.abs(a1), Math.abs(b1))
            && Math.abs(a2 - b2) <= epsilon * Math.max(1, Math.abs(a2), Math.abs(b2));
    }

	/**
	 * Determines whether this vector is exactly equivalent to another.
	 * @param vector The other vector.
	 * @returns Whether the vectors are equivalent.
	 */
	public exactEquals(vector: Vector3Like): boolean {
        return this[0] == vector[0]
            && this[1] == vector[1]
            && this[2] == vector[2];
    }

    /**
	 * Adds two vectors of the same size.
	 * @param vector The other vector.
	 * @returns The sum of the vectors.
	 */
	public add(vector: Vector3Like): Vector3;

    /**
	 * Adds two vectors of the same size.
	 * @param vector The other vector.
     * @param out The vector to store the result in.
	 * @returns The sum of the vectors.
	 */
	public add<T extends Vector3Like>(vector: Vector3Like, out: T): T;

	public add<T extends Vector3Like>(vector: Vector3Like, out: T = new Vector3() as T): T {
		out[0] = (this[0] as number) + vector[0];
		out[1] = (this[1] as number) + vector[1];
        out[2] = (this[2] as number) + vector[2];
		return out;
	}

	/**
	 * Creates a copy of this vector.
	 * @returns A copy of this vector.
	 */
	public clone(): Vector3 {
		const out: Vector3 = new Vector3();
		out[0] = this[0] as number;
		out[1] = this[1] as number;
        out[2] = this[2] as number;
		return out;
	}

    /**
	 * Copies the values of another vector into this one.
	 * @param vector The vector to copy.
	 * @returns This vector.
	 */
	public copy(vector: Vector3Like): this {
		this[0] = vector[0];
		this[1] = vector[1];
        this[2] = vector[2];
		return this;
	}

    /**
	 * Multiplies this vector by another.
	 * @param vvector The other vector.
	 * @returns The product of the vectors.
	 */
	public multiply(vector: Vector3Like): Vector3;

    /**
	 * Multiplies this vector by another.
	 * @param vector The other vector.
     * @param out The vector to store the result in.
	 * @returns The product of the vectors.
	 */
	public multiply<T extends Vector3Like>(vector: Vector3Like, out: T): T;

	public multiply<T extends Vector3Like>(vector: Vector3Like, out: T = new Vector3() as T): T {
		out[0] = (this[0] as number) * vector[0];
		out[1] = (this[1] as number) * vector[1];
        out[2] = (this[2] as number) * vector[2];
		return out;
	}

    /**
	 * Divides this vector by another.
	 * @param vector The other vector.
	 * @returns The quotient of the vectors.
	 */
	public divide(vector: Vector3Like): Vector3;

     /**
	 * Divides this vector by another.
	 * @param vector The other vector.
     * @param out The vector to store the result in.
	 * @returns The quotient of the vectors.
	 */
	public divide<T extends Vector3Like>(vector: Vector3Like, out: T): T;

	public divide<T extends Vector3Like>(vector: Vector3Like, out: T = new Vector3() as T): T {
		out[0] = (this[0] as number) / vector[0];
		out[1] = (this[1] as number) / vector[1];
        out[2] = (this[2] as number) / vector[2];
		return out;
	}

    /**
	 * Subtracts another vector from this one.
	 * @param vector The other vector.
	 * @returns The difference between the vectors.
	 */
	public subtract(vector: Vector3Like): Vector3;

    /**
	 * Subtracts another vector from this one.
	 * @param vector The other vector.
     * @param out The vector to store the result in.
	 * @returns The difference between the vectors.
	 */
	public subtract<T extends Vector3Like>(vector: Vector3Like, out: T): T;

	public subtract<T extends Vector3Like>(vector: Vector3Like, out: T = new Vector3() as T): T {
		out[0] = (this[0] as number) - vector[0];
		out[1] = (this[1] as number) - vector[1];
        out[2] = (this[2] as number) - vector[2];
		return out;
	}

	/**
	 * Rounds up the components of this vector.
	 * @returns The rounded vector.
	 */
	public ceil(): Vector3;

    /**
	 * Rounds up the components of this vector.
     * @param out The vector to store the result in.
	 * @returns The rounded vector.
	 */
	public ceil<T extends Vector3Like>(out: T): T;

    public ceil<T extends Vector3Like>(out: T = new Vector3() as T): T {
        out[0] = Math.ceil(this[0] as number);
        out[1] = Math.ceil(this[1] as number);
        out[2] = Math.ceil(this[2] as number);
        return out;
    }

	/**
	 * Rounds down the components of this vector.
	 * @returns The rounded vector.
	 */
	public floor(): Vector3;

    /**
	 * Rounds down the components of this vector.
     * @param out The vector to store the result in.
	 * @returns The rounded vector.
	 */
	public floor<T extends Vector3Like>(out: T): T;

    public floor<T extends Vector3Like>(out: T = new Vector3() as T): T {
        out[0] = Math.floor(this[0] as number);
        out[1] = Math.floor(this[1] as number);
        out[2] = Math.floor(this[2] as number);
        return out;
    }

	/**
	 * Rounds the components of this vector.
	 * @returns The rounded vector.
	 */
	public round(): Vector3;

    /**
	 * Rounds the components of this vector.
     * @param out The vector to store the result in.
	 * @returns The rounded vector.
	 */
	public round<T extends Vector3Like>(out: T): T;

    public round<T extends Vector3Like>(out: T = new Vector3() as T): T {
        out[0] = Math.round(this[0] as number);
        out[1] = Math.round(this[1] as number);
        out[2] = Math.round(this[2] as number);
        return out;
    }

	/**
	 * Returns the minimum of this and another vector.
	 * @param vector The other vector.
	 * @returns The minimum.
	 */
	public min(vector: Vector3Like): Vector3;

    /**
	 * Returns the minimum of this and another vector.
	 * @param vector The other vector.
     * @param out The vector to store the result in.
	 * @returns The minimum.
	 */
	public min<T extends Vector3Like>(vector: Vector3Like, out: T): T;

    public min<T extends Vector3Like>(vector: Vector3Like, out: T = new Vector3() as T): T {
        out[0] = Math.min(this[0] as number, vector[0]);
        out[1] = Math.min(this[1] as number, vector[1]);
        out[2] = Math.min(this[2] as number, vector[2]);
        return out;
    }

	/**
	 * Returns the maximum of this and another vector.
	 * @param vector The other vector.
	 * @returns The minimum.
	 */
	public max(vector: Vector3Like): Vector3;

    /**
	 * Returns the maximum of this and another vector.
	 * @param vector The other vector.
     * @param out The vector to store the result in.
	 * @returns The minimum.
	 */
	public max<T extends Vector3Like>(vector: Vector3Like, out: T): T;

    public max<T extends Vector3Like>(vector: Vector3Like, out: T = new Vector3() as T): T {
        out[0] = Math.max(this[0] as number, vector[0]);
        out[1] = Math.max(this[1] as number, vector[1]);
        out[2] = Math.max(this[2] as number, vector[2]);
        return out;
    }

	/**
	 * Scales this vector by a scalar.
	 * @param scalar The scalar.
	 * @returns The scaled vector.
	 */
	public scale(scalar: number): Vector3;

    /**
	 * Scales this vector by a scalar.
	 * @param scalar The scalar.
     * @param out The vector to store the result in.
	 * @returns The scaled vector.
	 */
	public scale<T extends Vector3Like>(scalar: number, out: T): T;

    public scale<T extends Vector3Like>(scalar: number, out: T = new Vector3() as T): T {
        out[0] = (this[0] as number) * scalar;
        out[1] = (this[1] as number) * scalar;
        out[2] = (this[2] as number) * scalar;
        return out;
    }

	/**
	 * Adds another vector to this one after scaling the other by a scalar.
	 * @param vector The other vector.
	 * @param scalar The scalar.
	 * @returns The sum.
	 */
	public scaleAndAdd(vector: Vector3Like, scalar: number): Vector3;

    /**
	 * Adds another vector to this one after scaling the other by a scalar.
	 * @param vector The other vector.
	 * @param s The scalar.
     * @param out The vector to store the result in.
	 * @returns The sum.
	 */
	public scaleAndAdd<T extends Vector3Like>(vector: Vector3Like, scalar: number, out: T): T;

    public scaleAndAdd<T extends Vector3Like>(vector: Vector3Like, scalar: number, out: T = new Vector3() as T): T {
        out[0] = (this[0] as number) + vector[0] * scalar;
        out[1] = (this[1] as number) + vector[1] * scalar;
        out[2] = (this[2] as number) + vector[2] * scalar;
        return out;
    }

	/**
	 * Calculates the Euclidean distance between this vector and another.
	 * @param vector The other vector.
	 * @returns The distance.
	 */
	public distance(vector: Vector3Like): number {
        const x: number = vector[0] - (this[0] as number);
        const y: number = vector[1] - (this[1] as number);
        const z: number = vector[2] - (this[2] as number);
        return Math.hypot(x, y, z);
    }

	/**
	 * Calculates the squared Euclidean distance between this vector and another.
	 * @param vector The other vector.
	 * @returns The squared distance.
	 */
	public squaredDistance(vector: Vector3Like): number {
        const x: number = vector[0] - (this[0] as number);
        const y: number = vector[1] - (this[1] as number);
        const z: number = vector[2] - (this[2] as number);
        return x * x + y * y + z * z;
    }

	/** The magnitude (length) of this vector. */
	public get magnitude(): number {
        const x: number = this[0] as number;
        const y: number = this[1] as number;
        const z: number = this[2] as number;
        return Math.hypot(x, y, z);
    }

	/** The squared magnitude (length) of this vector. */
	public get squaredMagnitude(): number {
        const x: number = this[0] as number;
        const y: number = this[1] as number;
        const z: number = this[2] as number;
        return x * x + y * y + z * z;
    }

	/**
	 * Negates this vector.
	 * @returns The negated vector.
	 */
	public negate(): Vector3;

    /**
	 * Negates this vector.
     * @param out The vector to store the result in.
	 * @returns The negated vector.
	 */
	public negate<T extends Vector3Like>(out: T): T;

    public negate<T extends Vector3Like>(out: T = new Vector3() as T): T {
        out[0] = -(this[0] as number);
        out[1] = -(this[1] as number);
        out[2] = -(this[2] as number);
        return out;
    }

    /**
	 * Calculates the multiplicative inverse of the components of this vector.
	 * @returns The inverted vector.
	 */
	public inverse(): Vector3;

    /**
	 * Calculates the multiplicative inverse of the components of this vector.
     * @param out The vector to store the result in.
	 * @returns The inverted vector.
	 */
	public inverse<T extends Vector3Like>(out: T): T;

    public inverse<T extends Vector3Like>(out: T = new Vector3() as T): T {
        out[0] = 1 / (this[0] as number);
        out[1] = 1 / (this[1] as number);
        out[2] = 1 / (this[2] as number);
        return out;
    }

    /**
	 * Normalizes this vector.
	 * @returns The normalized vector.
	 */
	public normalize(): Vector3;

    /**
	 * Normalizes this vector.
     * @param out The vector to store the result in.
	 * @returns The normalized vector.
	 */
	public normalize<T extends Vector3Like>(out: T): T;

    public normalize<T extends Vector3Like>(out: T = new Vector3() as T): T {
        const x: number = this[0] as number;
        const y: number = this[1] as number;
        const z: number = this[2] as number;
        
        let len: number = x * x + y * y + z * z;
        if (len > 0) {
            len = 1 / Math.sqrt(len);
        }

        out[0] = x * len;
        out[1] = y * len;
        out[2] = z * len;
        return out;
    }

	/**
	 * Calculates the dot product of this and another vector.
	 * @param vector The other vector.
	 * @returns The dot product.
	 */
	public dot(vector: Vector3Like): number {
        return (this[0] as number) * vector[0] + (this[1] as number) * vector[1] + (this[2] as number) * vector[2];
    }

    /**
	 * Calculates the cross product of this and another vector.
	 * @param vector The other vector.
	 * @returns The cross product.
	 */
	public cross(vector: Vector3Like): Vector3;

    /**
	 * Calculates the cross product of this and another vector.
	 * @param vector The other vector.
     * @param out The vector to store the result in.
	 * @returns The cross product.
	 */
	public cross<T extends Vector3Like>(vector: Vector3Like, out: T): T;

    public cross<T extends Vector3Like>(vector: Vector3Like, out: T = new Vector3() as T): T {
        const ax: number = this[0] as number;
        const ay: number = this[1] as number;
        const az: number = this[2] as number;

        const bx: number = vector[0];
        const by: number = vector[1];
        const bz: number = vector[2];

        out[0] = ay * bz - az * by;
        out[1] = az * bx - ax * bz;
        out[2] = ax * by - ay * bx;
        return out;
    }

	/**
	 * Performs a linear interpolation between this and another vector.
	 * @param vector The other vector.
	 * @param t The interpolation amount (in `[0,1]`).
	 * @returns The interpolated vector.
	 */
	public lerp(vector: Vector3Like, t: number): Vector3;

    /**
	 * Performs a linear interpolation between this and another vector.
	 * @param vector The other vector.
	 * @param t The interpolation amount (in `[0,1]`).
     * @param out The vector to store the result in.
	 * @returns The interpolated vector.
	 */
	public lerp<T extends Vector3Like>(vector: Vector3Like, t: number, out: T): T;

    public lerp<T extends Vector3Like>(vector: Vector3Like, t: number, out: T = new Vector3() as T): T {
        const ax: number = this[0] as number;
        const ay: number = this[1] as number;
        const az: number = this[2] as number;

        out[0] = ax + t * (vector[0] - ax);
        out[1] = ay + t * (vector[1] - ay);
        out[2] = az + t * (vector[2] - az);
        return out;
    }

	/**
	 * Sets this vector to a random value with the given magnitude.
	 * @param magnitude The magnitude.
	 * @returns This vector.
	 */
	public random(magnitude = 1): this {
        const r: number = Math.random() * 2 * Math.PI;
        const z: number = Math.random() * 2 - 1;
        const zScale: number = Math.sqrt(1.0 - z * z) * magnitude;

        this[0] = Math.cos(r) * zScale;
        this[1] = Math.sin(r) * zScale;
        this[2] = z * magnitude;
        return this;
    }

    /**
	 * Transforms this vector by a three-by-three matrix.
	 * @param matrix The matrix.
	 * @returns The transformed vector.
	 */
	public transformMatrix3(matrix: Matrix3Like): Vector3;

    /**
	 * Transforms this vector by a three-by-three matrix.
	 * @param matrix The matrix.
     * @param out The vector to store the result in.
	 * @returns The transformed vector.
	 */
	public transformMatrix3<T extends Vector3Like>(matrix: Matrix3Like, out: T): T;

    public transformMatrix3<T extends Vector3Like>(matrix: Matrix3Like, out: T = new Vector3() as T): T {
        const x: number = this[0] as number;
        const y: number = this[1] as number;
        const z: number = this[2] as number;

        out[0] = x * matrix[0] + y * matrix[3] + z * matrix[6];
        out[1] = x * matrix[1] + y * matrix[4] + z * matrix[7];
        out[2] = x * matrix[2] + y * matrix[5] + z * matrix[8];
        return out;
    }

    /**
	 * Transforms this vector by a four-by-four matrix.
	 * @param matrix The matrix.
	 * @returns The transformed vector.
	 */
	public transformMatrix4(matrix: Matrix4Like): Vector3;

    /**
	 * Transforms this vector by a four-by-four matrix.
	 * @param matrix The matrix.
     * @param out The vector to store the result in.
	 * @returns The transformed vector.
	 */
	public transformMatrix4<T extends Vector3Like>(matrix: Matrix4Like, out: T): T;

    public transformMatrix4<T extends Vector3Like>(matrix: Matrix4Like, out: T = new Vector3() as T): T {
        const x: number = this[0] as number;
        const y: number = this[1] as number;
        const z: number = this[2] as number;

        const w: number = matrix[3] * x + matrix[7] * y + matrix[11] * z + matrix[15] || 1;

        out[0] = (matrix[0] * x + matrix[4] * y + matrix[8] * z + matrix[12]) / w;
        out[1] = (matrix[1] * x + matrix[5] * y + matrix[9] * z + matrix[13]) / w;
        out[2] = (matrix[2] * x + matrix[6] * y + matrix[10] * z + matrix[14]) / w;
        return out;
    }

    /**
     * Rotates this vector around the X-axis.
     * @param origin The origin of the rotation.
     * @param radians The angle of rotation in radians.
     * @returns The rotated vector.
     */
    public rotateX(origin: Vector3Like, radians: number): Vector3;

    /**
     * Rotates this vector around the X-axis.
     * @param origin The origin of the rotation.
     * @param radians The angle of rotation in radians.
     * @param out The vector to store the result in.
     * @returns The rotated vector.
     */
    public rotateX<T extends Vector3Like>(origin: Vector3Like, radians: number, out: T): T;

    public rotateX<T extends Vector3Like>(origin: Vector3Like, radians: number, out: T = new Vector3() as T): T {
        const p: Vector3Like = [
            (this[0] as number) - origin[0],
            (this[1] as number) - origin[1],
            (this[2] as number) - origin[2]];

        const r: Vector3Like = [
            p[0],
            p[1] * Math.cos(radians) - p[2] * Math.sin(radians),
            p[1] * Math.sin(radians) + p[2] * Math.cos(radians)];

        out[0] = r[0] + origin[0];
        out[1] = r[1] + origin[1];
        out[2] = r[2] + origin[2];
        return out;
    }

    /**
     * Rotates this vector around the Y-axis.
     * @param origin The origin of the rotation.
     * @param radians The angle of rotation in radians.
     * @returns The rotated vector.
     */
    public rotateY(origin: Vector3Like, radians: number): Vector3;

    /**
     * Rotates this vector around the Y-axis.
     * @param origin The origin of the rotation.
     * @param radians The angle of rotation in radians.
     * @param out The vector to store the result in.
     * @returns The rotated vector.
     */
    public rotateY<T extends Vector3Like>(origin: Vector3Like, radians: number, out: T): T;

    public rotateY<T extends Vector3Like>(origin: Vector3Like, radians: number, out: T = new Vector3() as T): T {
        const p: Vector3Like = [
            (this[0] as number) - origin[0],
            (this[1] as number) - origin[1],
            (this[2] as number) - origin[2]];

        const r: Vector3Like = [
            p[2] * Math.sin(radians) + p[0] * Math.cos(radians),
            p[1],
            p[2] * Math.cos(radians) - p[0] * Math.sin(radians)];

        out[0] = r[0] + origin[0];
        out[1] = r[1] + origin[1];
        out[2] = r[2] + origin[2];
        return out;
    }

    /**
     * Rotates this vector around the Z-axis.
     * @param origin The origin of the rotation.
     * @param radians The angle of rotation in radians.
     * @returns The rotated vector.
     */
    public rotateZ(origin: Vector3Like, radians: number): Vector3;

    /**
     * Rotates this vector around the Z-axis.
     * @param origin The origin of the rotation.
     * @param radians The angle of rotation in radians.
     * @param out The vector to store the result in.
     * @returns The rotated vector.
     */
    public rotateZ<T extends Vector3Like>(origin: Vector3Like, radians: number, out: T): T;

    public rotateZ<T extends Vector3Like>(origin: Vector3Like, radians: number, out: T = new Vector3() as T): T {
        const p: Vector3Like = [
            (this[0] as number) - origin[0],
            (this[1] as number) - origin[1],
            (this[2] as number) - origin[2]];

        const r: Vector3Like = [
            p[0] * Math.cos(radians) - p[1] * Math.sin(radians),
            p[0] * Math.sin(radians) + p[1] * Math.cos(radians),
            p[2]];

        out[0] = r[0] + origin[0];
        out[1] = r[1] + origin[1];
        out[2] = r[2] + origin[2];
        return out;
    }

    /**
     * Gets the angle between this and another vector in radians.
     * @param vector The other vector.
     * @returns The angular distance from this vector to the other.
     */
    public angle(vector: Vector3Like): number {
        const ax: number = this[0] as number;
        const ay: number = this[1] as number;
        const az: number = this[2] as number;

        const bx: number = vector[0];
        const by: number = vector[1];
        const bz: number = vector[2];

        const mag1: number = Math.sqrt(ax * ax + ay * ay + az * az);
        const mag2: number = Math.sqrt(bx * bx + by * by + bz * bz);

        const mag: number = mag1 * mag2;

        const cosine: number = mag && this.dot(vector) / mag;

        return Math.acos(Math.min(Math.max(cosine, -1), 1));
    }

	/**
	 * Sets this to the zero vector.
	 * @returns This vector.
	 */
	public zero(): this {
        this[0] = 0;
        this[1] = 0;
        this[2] = 0;
        return this;
    }

    /**
     * Performs a Hermite interpolation with two control points between this vector and another.
     * @param a The first control point.
     * @param b The second control point.
     * @param end The other vector.
     * @param t The interpolation amount in the range `[0,1]`.
     * @returns The interpolated vector.
     */
    public hermite(a: Vector3Like, b: Vector3Like, end: Vector3Like, t: number): Vector3;

    /**
     * Performs a Hermite interpolation with two control points between this vector and another.
     * @param a The first control point.
     * @param b The second control point.
     * @param end The other vector.
     * @param t The interpolation amount in the range `[0,1]`.
     * @param out The vector to store the result in.
     * @returns The interpolated vector.
     */
    public hermite<T extends Vector3Like>(a: Vector3Like, b: Vector3Like, end: Vector3Like, t: number, out: T): T;

    public hermite<T extends Vector3Like>(a: Vector3Like, b: Vector3Like, end: Vector3Like, t: number, out: T = new Vector3() as T): T {
        const factorTimes2: number = t * t;

        const factor1: number = factorTimes2 * (2 * t - 3) + 1;
        const factor2: number = factorTimes2 * (t - 2) + t;
        const factor3: number = factorTimes2 * (t - 1);
        const factor4: number = factorTimes2 * (3 - 2 * t);

        out[0] = (this[0] as number) * factor1 + a[0] * factor2 + b[0] * factor3 + end[0] * factor4;
        out[1] = (this[1] as number) * factor1 + a[1] * factor2 + b[1] * factor3 + end[1] * factor4;
        out[2] = (this[2] as number) * factor1 + a[2] * factor2 + b[2] * factor3 + end[2] * factor4;
        return out;
    }

    /**
     * Performs a Bézier interpolation with two control points between this vector and another.
     * @param a The first control point.
     * @param b The second control point.
     * @param end The other vector.
     * @param t The interpolation amount in the range `[0,1]`.
     * @returns The interpolated vector.
     */
    public bezier(a: Vector3Like, b: Vector3Like, end: Vector3Like, t: number): Vector3;

    /**
     * Performs a Bézier interpolation with two control points between this vector and another.
     * @param a The first control point.
     * @param b The second control point.
     * @param end The other vector.
     * @param t The interpolation amount in the range `[0,1]`.
     * @param out The vector to store the result in.
     * @returns The interpolated vector.
     */
    public bezier<T extends Vector3Like>(a: Vector3Like, b: Vector3Like, end: Vector3Like, t: number, out: T): T;

    public bezier<T extends Vector3Like>(a: Vector3Like, b: Vector3Like, end: Vector3Like, t: number, out: T = new Vector3() as T): T {
        const inverseFactor: number = 1 - t;
        const inverseFactorTimesTwo: number = inverseFactor * inverseFactor;
        const factorTimes2: number = t * t;

        const factor1: number = inverseFactorTimesTwo * inverseFactor;
        const factor2: number = 3 * t * inverseFactorTimesTwo;
        const factor3: number = 3 * factorTimes2 * inverseFactor;
        const factor4: number = factorTimes2 * t;

        out[0] = (this[0] as number) * factor1 + a[0] * factor2 + b[0] * factor3 + end[0] * factor4;
        out[1] = (this[1] as number) * factor1 + a[1] * factor2 + b[1] * factor3 + end[1] * factor4;
        out[2] = (this[2] as number) * factor1 + a[2] * factor2 + b[2] * factor3 + end[2] * factor4;
        return out;
    }

    /**
	 * Transforms this vector by a quaternion.
	 * @param quaternion The quaternion.
	 * @returns The transformed vector.
	 */
	public transformQuaternion(quaternion: QuaternionLike): Vector3;

    /**
	 * Transforms this vector by a quaternion.
	 * @param quaternion The quaternion.
     * @param out The vector to store the result in.
	 * @returns The transformed vector.
	 */
	public transformQuaternion<T extends Vector3Like>(quaternion: QuaternionLike, out: T): T;

    public transformQuaternion<T extends Vector3Like>(quaternion: QuaternionLike, out: T = new Vector3() as T): T {
        const qx: number = quaternion[0];
        const qy: number = quaternion[1];
        const qz: number = quaternion[2];
        const qw: number = quaternion[3];

        const x: number = this[0] as number;
        const y: number = this[1] as number;
        const z: number = this[2] as number;

        let uvx: number = qy * z - qz * y;
        let uvy: number = qz * x - qx * z;
        let uvz: number = qx * y - qy * x;
        
        let uuvx: number = qy * uvz - qz * uvy;
        let uuvy: number = qz * uvx - qx * uvz;
        let uuvz: number = qx * uvy - qy * uvx;
        
        const w2: number = qw * 2;
        uvx *= w2;
        uvy *= w2;
        uvz *= w2;
        
        uuvx *= 2;
        uuvy *= 2;
        uuvz *= 2;
        
        out[0] = x + uvx + uuvx;
        out[1] = y + uvy + uuvy;
        out[2] = z + uvz + uuvz;
        return out;
    }
}
