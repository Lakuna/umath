import epsilon from "@lakuna/umath/utility/epsilon.js";
import type { Matrix2Like } from "@lakuna/umath/linear/Matrix2.js";
import type { Matrix3Like } from "@lakuna/umath/linear/Matrix3.js";
import type { Matrix4Like } from "@lakuna/umath/linear/Matrix4.js";
import type Vector from "@lakuna/umath/linear/Vector.js";
import Vector3, { type Vector3Like } from "@lakuna/umath/linear/Vector3.js";

/** A quantity with magnitude and direction in two dimensions. */
export type Vector2Like = Vector2 | [number, number];

/** A quantity with magnitude and direction in two dimensions. */
export default class Vector2 extends Float32Array implements Vector {
    /**
     * Creates a vector with the given values.
     * @param x The first component.
     * @param y The second component.
     * @returns A new vector.
     */
    public static fromValues(x: number, y: number): Vector2;

    /**
     * Creates a vector with the given values.
     * @param x The first component.
     * @param y The second component.
     * @param out The vector to store the result in.
     * @returns A new vector.
     */
    public static fromValues<T extends Vector2Like>(x: number, y: number, out: T): T;

    public static fromValues<T extends Vector2Like>(x: number, y: number, out: T = new Vector2() as T): T {
        out[0] = x;
        out[1] = y;
        return out;
    }

    /** Creates a two-dimensional zero vector. */
    public constructor() {
        super(2);
    }

    /**
	 * Determines whether this vector is roughly equivalent to another.
	 * @param vector The other vector.
	 * @returns Whether the vectors are equivalent.
	 */
	public equals(vector: Vector2Like): boolean {
        const a0: number = this[0] as number;
        const a1: number = this[1] as number;

        const b0: number = vector[0];
        const b1: number = vector[1];

        return Math.abs(a0 - b0) <= epsilon * Math.max(1, Math.abs(a0), Math.abs(b0))
            && Math.abs(a1 - b1) <= epsilon * Math.max(1, Math.abs(a1), Math.abs(b1));
    }

	/**
	 * Determines whether this vector is exactly equivalent to another.
	 * @param vector The other vector.
	 * @returns Whether the vectors are equivalent.
	 */
	public exactEquals(vector: Vector2Like): boolean {
        return this[0] == vector[0]
            && this[1] == vector[1];
    }

    /**
	 * Adds two vectors of the same size.
	 * @param vector The other vector.
	 * @returns The sum of the vectors.
	 */
	public add(vector: Vector2Like): Vector2;

    /**
	 * Adds two vectors of the same size.
	 * @param vector The other vector.
     * @param out The vector to store the result in.
	 * @returns The sum of the vectors.
	 */
	public add<T extends Vector2Like>(vector: Vector2Like, out: T): T;

	public add<T extends Vector2Like>(vector: Vector2Like, out: T = new Vector2() as T): T {
		out[0] = (this[0] as number) + vector[0];
		out[1] = (this[1] as number) + vector[1];
		return out;
	}

	/**
	 * Creates a copy of this vector.
	 * @returns A copy of this vector.
	 */
	public clone(): Vector2 {
		const out: Vector2 = new Vector2();
		out[0] = this[0] as number;
		out[1] = this[1] as number;
		return out;
	}

    /**
	 * Copies the values of another vector into this one.
	 * @param vector The vector to copy.
	 * @returns This vector.
	 */
	public copy(vector: Vector2Like): this {
		this[0] = vector[0];
		this[1] = vector[1];
		return this;
	}

    /**
	 * Multiplies this vector by another.
	 * @param vector The other vector.
	 * @returns The product of the vectors.
	 */
	public multiply(vector: Vector2Like): Vector2;

    /**
	 * Multiplies this vector by another.
	 * @param vector The other vector.
     * @param out The vector to store the result in.
	 * @returns The product of the vectors.
	 */
	public multiply<T extends Vector2Like>(vector: Vector2Like, out: T): T;

	public multiply<T extends Vector2Like>(vector: Vector2Like, out: T = new Vector2() as T): T {
		out[0] = (this[0] as number) * vector[0];
		out[1] = (this[1] as number) * vector[1];
		return out;
	}

    /**
	 * Divides this vector by another.
	 * @param vector The other vector.
	 * @returns The quotient of the vectors.
	 */
	public divide(vector: Vector2Like): Vector2;

     /**
	 * Divides this vector by another.
	 * @param vector The other vector.
     * @param out The vector to store the result in.
	 * @returns The quotient of the vectors.
	 */
	public divide<T extends Vector2Like>(vector: Vector2Like, out: T): T;

	public divide<T extends Vector2Like>(vector: Vector2Like, out: T = new Vector2() as T): T {
		out[0] = (this[0] as number) / vector[0];
		out[1] = (this[1] as number) / vector[1];
		return out;
	}

    /**
	 * Subtracts another vector from this one.
	 * @param vector The other vector.
	 * @returns The difference between the vectors.
	 */
	public subtract(vector: Vector2Like): Vector2;

    /**
	 * Subtracts another vector from this one.
	 * @param vector The other vector.
     * @param out The vector to store the result in.
	 * @returns The difference between the vectors.
	 */
	public subtract<T extends Vector2Like>(vector: Vector2Like, out: T): T;

	public subtract<T extends Vector2Like>(vector: Vector2Like, out: T = new Vector2() as T): T {
		out[0] = (this[0] as number) - vector[0];
		out[1] = (this[1] as number) - vector[1];
		return out;
	}

	/**
	 * Rounds up the components of this vector.
	 * @returns The rounded vector.
	 */
	public ceil(): Vector2;

    /**
	 * Rounds up the components of this vector.
     * @param out The vector to store the result in.
	 * @returns The rounded vector.
	 */
	public ceil<T extends Vector2Like>(out: T): T;

    public ceil<T extends Vector2Like>(out: T = new Vector2() as T): T {
        out[0] = Math.ceil(this[0] as number);
        out[1] = Math.ceil(this[1] as number);
        return out;
    }

	/**
	 * Rounds down the components of this vector.
	 * @returns The rounded vector.
	 */
	public floor(): Vector2;

    /**
	 * Rounds down the components of this vector.
     * @param out The vector to store the result in.
	 * @returns The rounded vector.
	 */
	public floor<T extends Vector2Like>(out: T): T;

    public floor<T extends Vector2Like>(out: T = new Vector2() as T): T {
        out[0] = Math.floor(this[0] as number);
        out[1] = Math.floor(this[1] as number);
        return out;
    }

	/**
	 * Rounds the components of this vector.
	 * @returns The rounded vector.
	 */
	public round(): Vector2;

    /**
	 * Rounds the components of this vector.
     * @param out The vector to store the result in.
	 * @returns The rounded vector.
	 */
	public round<T extends Vector2Like>(out: T): T;

    public round<T extends Vector2Like>(out: T = new Vector2() as T): T {
        out[0] = Math.round(this[0] as number);
        out[1] = Math.round(this[1] as number);
        return out;
    }

	/**
	 * Returns the minimum of this and another vector.
	 * @param vector The other vector.
	 * @returns The minimum.
	 */
	public min(vector: Vector2Like): Vector2;

    /**
	 * Returns the minimum of this and another vector.
	 * @param vector The other vector.
     * @param out The vector to store the result in.
	 * @returns The minimum.
	 */
	public min<T extends Vector2Like>(vector: Vector2Like, out: T): T;

    public min<T extends Vector2Like>(vector: Vector2Like, out: T = new Vector2() as T): T {
        out[0] = Math.min(this[0] as number, vector[0]);
        out[1] = Math.min(this[1] as number, vector[1]);
        return out;
    }

	/**
	 * Returns the maximum of this and another vector.
	 * @param vector The other vector.
	 * @returns The minimum.
	 */
	public max(vector: Vector2Like): Vector2;

    /**
	 * Returns the maximum of this and another vector.
	 * @param vector The other vector.
     * @param out The vector to store the result in.
	 * @returns The minimum.
	 */
	public max<T extends Vector2Like>(vector: Vector2Like, out: T): T;

    public max<T extends Vector2Like>(vector: Vector2Like, out: T = new Vector2() as T): T {
        out[0] = Math.max(this[0] as number, vector[0]);
        out[1] = Math.max(this[1] as number, vector[1]);
        return out;
    }

	/**
	 * Scales this vector by a scalar.
	 * @param scalar The scalar.
	 * @returns The scaled vector.
	 */
	public scale(scalar: number): Vector2;

    /**
	 * Scales this vector by a scalar.
	 * @param scalar The scalar.
     * @param out The vector to store the result in.
	 * @returns The scaled vector.
	 */
	public scale<T extends Vector2Like>(scalar: number, out: T): T;

    public scale<T extends Vector2Like>(scalar: number, out: T = new Vector2() as T): T {
        out[0] = (this[0] as number) * scalar;
        out[1] = (this[1] as number) * scalar;
        return out;
    }

	/**
	 * Adds another vector to this one after scaling the other by a scalar.
	 * @param vector The other vector.
	 * @param scalar The scalar.
	 * @returns The sum.
	 */
	public scaleAndAdd(vector: Vector2Like, scalar: number): Vector2;

    /**
	 * Adds another vector to this one after scaling the other by a scalar.
	 * @param vector The other vector.
	 * @param s The scalar.
     * @param out The vector to store the result in.
	 * @returns The sum.
	 */
	public scaleAndAdd<T extends Vector2Like>(vector: Vector2Like, scalar: number, out: T): T;

    public scaleAndAdd<T extends Vector2Like>(vector: Vector2Like, scalar: number, out: T = new Vector2() as T): T {
        out[0] = (this[0] as number) + vector[0] * scalar;
        out[1] = (this[1] as number) + vector[1] * scalar;
        return out;
    }

	/**
	 * Calculates the Euclidean distance between this vector and another.
	 * @param vector The other vector.
	 * @returns The distance.
	 */
	public distance(vector: Vector2Like): number {
        const x: number = vector[0] - (this[0] as number);
        const y: number = vector[1] - (this[1] as number);
        return Math.hypot(x, y);
    }

	/**
	 * Calculates the squared Euclidean distance between this vector and another.
	 * @param vector The other vector.
	 * @returns The squared distance.
	 */
	public squaredDistance(vector: Vector2Like): number {
        const x: number = vector[0] - (this[0] as number);
        const y: number = vector[1] - (this[1] as number);
        return x * x + y * y;
    }

	/** The magnitude (length) of this vector. */
	public get magnitude(): number {
        const x: number = this[0] as number;
        const y: number = this[1] as number;
        return Math.hypot(x, y);
    }

	/** The squared magnitude (length) of this vector. */
	public get squaredMagnitude(): number {
        const x: number = this[0] as number;
        const y: number = this[1] as number;
        return x * x + y * y;
    }

	/**
	 * Negates this vector.
	 * @returns The negated vector.
	 */
	public negate(): Vector2;

    /**
	 * Negates this vector.
     * @param out The vector to store the result in.
	 * @returns The negated vector.
	 */
	public negate<T extends Vector2Like>(out: T): T;

    public negate<T extends Vector2Like>(out: T = new Vector2() as T): T {
        out[0] = -(this[0] as number);
        out[1] = -(this[1] as number);
        return out;
    }

    /**
	 * Calculates the multiplicative inverse of the components of this vector.
	 * @returns The inverted vector.
	 */
	public inverse(): Vector2;

    /**
	 * Calculates the multiplicative inverse of the components of this vector.
     * @param out The vector to store the result in.
	 * @returns The inverted vector.
	 */
	public inverse<T extends Vector2Like>(out: T): T;

    public inverse<T extends Vector2Like>(out: T = new Vector2() as T): T {
        out[0] = 1 / (this[0] as number);
        out[1] = 1 / (this[1] as number);
        return out;
    }

    /**
	 * Normalizes this vector.
	 * @returns The normalized vector.
	 */
	public normalize(): Vector2;

    /**
	 * Normalizes this vector.
     * @param out The vector to store the result in.
	 * @returns The normalized vector.
	 */
	public normalize<T extends Vector2Like>(out: T): T;

    public normalize<T extends Vector2Like>(out: T = new Vector2() as T): T {
        const x: number = this[0] as number;
        const y: number = this[1] as number;
        
        let len: number = x * x + y * y;
        if (len > 0) {
            len = 1 / Math.sqrt(len);
        }

        out[0] = x * len;
        out[1] = y * len;
        return out;
    }

	/**
	 * Calculates the dot product of this and another vector.
	 * @param vector The other vector.
	 * @returns The dot product.
	 */
	public dot(vector: Vector2Like): number {
        return (this[0] as number) * vector[0] + (this[1] as number) * vector[1];
    }

    /**
	 * Calculates the cross product of this and another vector.
	 * @param vector The other vector.
	 * @returns The cross product.
	 */
	public cross(vector: Vector2Like): Vector3;

    /**
	 * Calculates the cross product of this and another vector.
	 * @param vector The other vector.
     * @param out The vector to store the result in.
	 * @returns The cross product.
	 */
	public cross<T extends Vector3Like>(vector: Vector2Like, out: T): T;

    public cross<T extends Vector3Like>(vector: Vector2Like, out: T = new Vector3() as T): T {
        out[0] = 0;
        out[1] = 0;
        out[2] = (this[0] as number) * vector[1] - (this[1] as number) * vector[0];
        return out;
    }

	/**
	 * Performs a linear interpolation between this and another vector.
	 * @param vector The other vector.
	 * @param t The interpolation amount (in `[0,1]`).
	 * @returns The interpolated vector.
	 */
	public lerp(vector: Vector2Like, t: number): Vector2;

    /**
	 * Performs a linear interpolation between this and another vector.
	 * @param vector The other vector.
	 * @param t The interpolation amount (in `[0,1]`).
     * @param out The vector to store the result in.
	 * @returns The interpolated vector.
	 */
	public lerp<T extends Vector2Like>(vector: Vector2Like, t: number, out: T): T;

    public lerp<T extends Vector2Like>(vector: Vector2Like, t: number, out: T = new Vector2() as T): T {
        const ax: number = this[0] as number;
        const ay: number = this[1] as number;

        out[0] = ax + t * (vector[0] - ax);
        out[1] = ay + t * (vector[1] - ay);
        return out;
    }

	/**
	 * Sets this vector to a random value with the given magnitude.
	 * @param magnitude The magnitude.
	 * @returns This vector.
	 */
	public random(magnitude = 1): this {
        const r: number = Math.random() * 2 * Math.PI;

        this[0] = Math.cos(r) * magnitude;
        this[1] = Math.sin(r) * magnitude;
        return this;
    }

	/**
	 * Transforms this vector by a two-by-two matrix.
	 * @param matrix The matrix.
	 * @returns The transformed vector.
	 */
	public transformMatrix2(matrix: Matrix2Like): Vector2;

    /**
	 * Transforms this vector by a two-by-two matrix.
	 * @param matrix The matrix.
     * @param out The vector to store the result in.
	 * @returns The transformed vector.
	 */
	public transformMatrix2<T extends Vector2Like>(matrix: Matrix2Like, out: T): T;

    public transformMatrix2<T extends Vector2Like>(matrix: Matrix2Like, out: T = new Vector2() as T): T {
        const x: number = this[0] as number;
        const y: number = this[1] as number;

        out[0] = matrix[0] * x + matrix[2] * y;
        out[1] = matrix[1] * x + matrix[3] * y;
        return out;
    }

    /**
	 * Transforms this vector by a three-by-three matrix.
	 * @param matrix The matrix.
	 * @returns The transformed vector.
	 */
	public transformMatrix3(matrix: Matrix3Like): Vector2;

    /**
	 * Transforms this vector by a three-by-three matrix.
	 * @param matrix The matrix.
     * @param out The vector to store the result in.
	 * @returns The transformed vector.
	 */
	public transformMatrix3<T extends Vector2Like>(matrix: Matrix3Like, out: T): T;

    public transformMatrix3<T extends Vector2Like>(matrix: Matrix3Like, out: T = new Vector2() as T): T {
        const x: number = this[0] as number;
        const y: number = this[1] as number;

        out[0] = matrix[0] * x + matrix[3] * y + matrix[6];
        out[1] = matrix[1] * x + matrix[4] * y + matrix[7];
        return out;
    }

    /**
	 * Transforms this vector by a four-by-four matrix.
	 * @param matrix The matrix.
	 * @returns The transformed vector.
	 */
	public transformMatrix4(matrix: Matrix4Like): Vector2;

    /**
	 * Transforms this vector by a four-by-four matrix.
	 * @param matrix The matrix.
     * @param out The vector to store the result in.
	 * @returns The transformed vector.
	 */
	public transformMatrix4<T extends Vector2Like>(matrix: Matrix4Like, out: T): T;

    public transformMatrix4<T extends Vector2Like>(matrix: Matrix4Like, out: T = new Vector2() as T): T {
        const x: number = this[0] as number;
        const y: number = this[1] as number;

        out[0] = matrix[0] * x + matrix[4] * y + matrix[12];
        out[1] = matrix[1] * x + matrix[5] * y + matrix[13];
        return out;
    }

    /**
     * Rotates this vector.
     * @param origin The origin of the rotation.
     * @param radians The angle of rotation in radians.
     * @returns The rotated vector.
     */
    public rotate(origin: Vector2Like, radians: number): Vector2;

    /**
     * Rotates this vector.
     * @param origin The origin of the rotation.
     * @param radians The angle of rotation in radians.
     * @param out The vector to store the result in.
     * @returns The rotated vector.
     */
    public rotate<T extends Vector2Like>(origin: Vector2Like, radians: number, out: T): T;

    public rotate<T extends Vector2Like>(origin: Vector2Like, radians: number, out: T = new Vector2() as T): T {
        const p0: number = (this[0] as number) - origin[0];
        const p1: number = (this[1] as number) - origin[1];

        const s: number = Math.sin(radians);
        const c: number = Math.cos(radians);
        
        out[0] = p0 * c - p1 * s + origin[0];
        out[1] = p0 * s + p1 * c + origin[1];
        return out;
    }

    /**
     * Gets the angle between this and another vector in radians.
     * @param vector The other vector.
     * @returns The angular distance from this vector to the other.
     */
    public angle(vector: Vector2Like): number {
        const x1: number = this[0] as number;
        const y1: number = this[1] as number;

        const x2: number = vector[0];
        const y2: number = vector[1];

        const magnitudeProduct: number = Math.sqrt(x1 * x1 + y1 * y1) * Math.sqrt(x2 * x2 + y2 * y2);
        const c: number = magnitudeProduct && (x1 * x2 + y1 * y2) / magnitudeProduct;
        return Math.acos(Math.min(Math.max(c, -1), 1));
    }

	/**
	 * Sets this to the zero vector.
	 * @returns This vector.
	 */
	public zero(): this {
        this[0] = 0;
        this[1] = 0;
        return this;
    }
}
