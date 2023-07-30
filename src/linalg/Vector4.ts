import type { Matrix4Like } from "#linalg/Matrix4";
import type { QuaternionLike } from "#linalg/Quaternion";
import type Vector from "#linalg/Vector";
import epsilon from "#utility/epsilon";

/** A quantity with magnitude and direction in four dimensions. */
export type Vector4Like = Vector4 | [number, number, number, number];

/**
 * Creates a vector with the given values.
 * @param x The first component.
 * @param y The second component.
 * @param z The third component.
 * @param w The fourth component.
 * @param out The vector to store the result in.
 * @returns A new vector.
 */
export function fromValues<T extends Vector4Like>(x: number, y: number, z: number, w: number, out: T): T {
	out[0] = x;
	out[1] = y;
	out[2] = z;
	out[3] = w;
	return out;
}

/**
 * Determines whether two vectors are roughly equivalent.
 * @param a The first vector.
 * @param b The second vector.
 * @returns Whether the vectors are equivalent.
 */
export function equals(a: Vector4Like, b: Vector4Like): boolean {
	const a0: number = a[0];
	const a1: number = a[1];
	const a2: number = a[2];
	const a3: number = a[3];

	const b0: number = b[0];
	const b1: number = b[1];
	const b2: number = b[2];
	const b3: number = b[3];

	return Math.abs(a0 - b0) <= epsilon * Math.max(1, Math.abs(a0), Math.abs(b0))
		&& Math.abs(a1 - b1) <= epsilon * Math.max(1, Math.abs(a1), Math.abs(b1))
		&& Math.abs(a2 - b2) <= epsilon * Math.max(1, Math.abs(a2), Math.abs(b2))
		&& Math.abs(a3 - b3) <= epsilon * Math.max(1, Math.abs(a3), Math.abs(b3));
}

/**
 * Determines whether two vectors are exactly equivalent.
 * @param a The first vector.
 * @param b The second vector.
 * @returns Whether the vectors are equivalent.
 */
export function exactEquals(a: Vector4Like,b : Vector4Like): boolean {
	return a[0] == b[0]
		&& a[1] == b[1]
		&& a[2] == b[2]
		&& a[3] == b[3];
}

/**
 * Adds two vectors.
 * @param a The augend.
 * @param b The addend.
 * @param out The vector to store the result in.
 * @returns The sum.
 */
export function add<T extends Vector4Like>(a: Vector4Like, b: Vector4Like, out: T): T {
	out[0] = a[0] + b[0];
	out[1] = a[1] + b[1];
	out[2] = a[2] + b[2];
	out[3] = a[3] + b[3];
	return out;
}

/**
 * Copies the values from one vector to another.
 * @param vector The vector to copy.
 * @param out The vector to store the result in.
 * @returns The copy.
 */
export function copy<T extends Vector4Like>(vector: Vector4Like, out: T): T {
	out[0] = vector[0];
	out[1] = vector[1];
	out[2] = vector[2];
	out[3] = vector[3];
	return out;
}

/**
 * Multiplies two vectors.
 * @param a The multiplier.
 * @param b The multiplicand.
 * @param out The vector to store the result in.
 * @returns The product.
 */
export function multiply<T extends Vector4Like>(a: Vector4Like, b: Vector4Like, out: T): T {
	out[0] = a[0] * b[0];
	out[1] = a[1] * b[1];
	out[2] = a[2] * b[2];
	out[3] = a[3] * b[3];
	return out;
}

/**
 * Divides two vectors.
 * @param a The dividend.
 * @param b The divisor.
 * @param out The vector to store the result in.
 * @returns The quotient.
 */
export function divide<T extends Vector4Like>(a: Vector4Like, b: Vector4Like, out: T): T {
	out[0] = a[0] / b[0];
	out[1] = a[1] / b[1];
	out[2] = a[2] / b[2];
	out[3] = a[3] / b[3];
	return out;
}

/**
 * Subtracts two vectors.
 * @param a The minuend.
 * @param b The subtrahend.
 * @param out The vector to store the result in.
 * @returns The difference.
 */
export function subtract<T extends Vector4Like>(a: Vector4Like, b: Vector4Like, out: T): T {
	out[0] = a[0] - b[0];
	out[1] = a[1] - b[1];
	out[2] = a[2] - b[2];
	out[3] = a[3] - b[3];
	return out;
}

/**
 * Rounds up the components of a vector.
 * @param vector The vector.
 * @param out The vector to store the result in.
 * @returns The rounded vector.
 */
export function ceil<T extends Vector4Like>(vector: Vector4Like, out: T): T {
	out[0] = Math.ceil(vector[0]);
	out[1] = Math.ceil(vector[1]);
	out[2] = Math.ceil(vector[2]);
	out[3] = Math.ceil(vector[3]);
	return out;
}

/**
 * Rounds down the components of a vector.
 * @param vector The vector.
 * @param out The vector to store the result in.
 * @returns The rounded vector.
 */
export function floor<T extends Vector4Like>(vector: Vector4Like, out: T): T {
	out[0] = Math.floor(vector[0]);
	out[1] = Math.floor(vector[1]);
	out[2] = Math.floor(vector[2]);
	out[3] = Math.floor(vector[3]);
	return out;
}

/**
 * Rounds the components of a vector.
 * @param vector The vector.
 * @param out The vector to store the result in.
 * @returns The rounded vector.
 */
export function round<T extends Vector4Like>(vector: Vector4Like, out: T): T {
	out[0] = Math.round(vector[0]);
	out[1] = Math.round(vector[1]);
	out[2] = Math.round(vector[2]);
	out[3] = Math.round(vector[3]);
	return out;
}

/**
 * Returns the minimum of two vectors.
 * @param a The first vector.
 * @param b The second vector.
 * @param out The vector to store the result in.
 * @returns The minimum.
 */
export function min<T extends Vector4Like>(a: Vector4Like, b: Vector4Like, out: T): T {
	out[0] = Math.min(a[0], b[0]);
	out[1] = Math.min(a[1], b[1]);
	out[2] = Math.min(a[2], b[2]);
	out[3] = Math.min(a[3], b[3]);
	return out;
}

/**
 * Returns the maximum of two vectors.
 * @param a The first vector.
 * @param b The second vector.
 * @param out The vector to store the result in.
 * @returns The maximum.
 */
export function max<T extends Vector4Like>(a: Vector4Like, b: Vector4Like, out: T): T {
	out[0] = Math.max(a[0], b[0]);
	out[1] = Math.max(a[1], b[1]);
	out[2] = Math.max(a[2], b[2]);
	out[3] = Math.max(a[3], b[3]);
	return out;
}

/**
 * Scales a vector by a scalar.
 * @param vector The multiplier.
 * @param scalar The multiplicand.
 * @param out The vector to store the result in.
 * @returns The product.
 */
export function scale<T extends Vector4Like>(vector: Vector4Like, scalar: number, out: T): T {
	out[0] = vector[0] * scalar;
	out[1] = vector[1] * scalar;
	out[2] = vector[2] * scalar;
	out[3] = vector[3] * scalar;
	return out;
}

/**
 * Adds two vectors after scaling the second by a scalar.
 * @param a The augend.
 * @param b The addend.
 * @param scalar The multiplicand.
 * @param out The vector to store the result in.
 * @returns The sum.
 */
export function scaleAndAdd<T extends Vector4Like>(a: Vector4Like, b: Vector4Like, scalar: number, out: T): T {
	out[0] = a[0] + b[0] * scalar;
	out[1] = a[1] + b[1] * scalar;
	out[2] = a[2] + b[2] * scalar;
	out[3] = a[3] + b[3] * scalar;
	return out;
}

/**
 * Calculates the Euclidean distance between two vectors.
 * @param a The first vector
 * @param b The second vector.
 * @returns The distance.
 * @see [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance)
 */
export function distance(a: Vector4Like, b: Vector4Like): number {
	const x: number = a[0] - b[0];
	const y: number = a[1] - b[1];
	const z: number = a[2] - b[2];
	const w: number = a[3] - b[3];
	return Math.hypot(x, y, z, w);
}

/**
 * Calculates the squared Euclidean distance between two vectors.
 * @param a The first vector.
 * @param b The second vector.
 * @returns The squared distance.
 * @see [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance)
 */
export function squaredDistance(a: Vector4Like, b: Vector4Like): number {
	const x: number = a[0] - b[0];
	const y: number = a[1] - b[1];
	const z: number = a[2] - b[2];
	const w: number = a[3] - b[3];
	return x * x + y * y + z * z + w * w;
}

/**
 * Calculates the magnitude (length) of a vector.
 * @param vector The vector.
 * @returns The magnitude.
 */
export function getMagnitude(vector: Vector4Like): number {
	const x: number = vector[0];
	const y: number = vector[1];
	const z: number = vector[2];
	const w: number = vector[3];
	return Math.hypot(x, y, z, w);
}

/**
 * Calculates the squared magnitude (length) of a vector.
 * @param vector The vector.
 * @returns The magnitude.
 */
export function getSquaredMagnitude(vector: Vector4Like): number {
	const x: number = vector[0];
	const y: number = vector[1];
	const z: number = vector[2];
	const w: number = vector[3];
	return x * x + y * y + z * z + w * w;
}

/**
 * Negates a vector.
 * @param vector The vector.
 * @param out The vector to store the result in.
 * @returns The negated vector.
 */
export function negate<T extends Vector4Like>(vector: Vector4Like, out: T): T {
	out[0] = -vector[0];
	out[1] = -vector[1];
	out[2] = -vector[2];
	out[3] = -vector[3];
	return out;
}

/**
 * Calculates the multiplicative inverse of the components of a vector.
 * @param vector The vector.
 * @param out The vector to store the result in.
 * @returns The inverted vector.
 */
export function invert<T extends Vector4Like>(vector: Vector4Like, out: T): T {
	out[0] = 1 / vector[0];
	out[1] = 1 / vector[1];
	out[2] = 1 / vector[2];
	out[3] = 1 / vector[3];
	return out;
}

/**
 * Normalizes a vector.
 * @param vector The vector.
 * @param out The vector to store the result in.
 * @returns The normalized vector.
 * @see [Unit vector](https://en.wikipedia.org/wiki/Unit_vector)
 */
export function normalize<T extends Vector4Like>(vector: Vector4Like, out: T): T {
	const x: number = vector[0];
	const y: number = vector[1];
	const z: number = vector[2];
	const w: number = vector[3];
	
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
 * Calculates the dot product of two vectors.
 * @param a The multiplier.
 * @param b The multiplicand.
 * @returns The dot product.
 * @see [Dot product](https://en.wikipedia.org/wiki/Dot_product)
 */
export function dot(a: Vector4Like, b: Vector4Like): number {
	return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}

/**
 * Calculates the cross product of three vectors in a four-dimensional space.
 * @param a The first vector.
 * @param b The second vector.
 * @param c The third vector.
 * @param out The vector to store the result in.
 * @returns The cross product.
 * @see [Cross product](https://en.wikipedia.org/wiki/Cross_product)
 */
export function cross<T extends Vector4Like>(a: Vector4Like, b: Vector4Like, c: Vector4Like, out: T): T {
	const d = b[0] * c[1] - b[1] * c[0];
	const e = b[0] * c[2] - b[2] * c[0];
	const f = b[0] * c[3] - b[3] * c[0];
	const g = b[1] * c[2] - b[2] * c[1];
	const h = b[1] * c[3] - b[3] * c[1];
	const i = b[2] * c[3] - b[3] * c[2];

	const j = a[0];
	const k = a[1];
	const l = a[2];
	const m = a[3];

	out[0] = k * i - l * h + m * g;
	out[1] = -(j * i) + l * f - m * e;
	out[2] = j * h - k * f + m * d;
	out[3] = -(j * g) + k * e - l * d;
	return out;
}

/**
 * Performs a linear interpolation between two vectors.
 * @param a The first vector.
 * @param b The second vector.
 * @param t The interpolation amount (in `[0,1]`).
 * @param out The vector to store the result in.
 * @returns The interpolated vector.
 * @see [Linear interpolation](https://en.wikipedia.org/wiki/Linear_interpolation)
 */
export function lerp<T extends Vector4Like>(a: Vector4Like, b: Vector4Like, t: number, out: T): T {
	const ax: number = a[0];
	const ay: number = a[1];
	const az: number = a[2];
	const aw: number = a[3];

	out[0] = ax + t * (b[0] - ax);
	out[1] = ay + t * (b[1] - ay);
	out[2] = az + t * (b[2] - az);
	out[3] = aw + t * (b[3] - aw);
	return out;
}

/**
 * Sets this vector to a random value with the given magnitude.
 * @param magnitude The magnitude.
 * @param out The vector to store the result in.
 * @returns This vector.
 */
export function random<T extends Vector4Like>(magnitude: number, out: T): T {
	const a: number = Math.random();
	const v1: number = a * 2 - 1;
	const v2: number = (4 * Math.random() - 2) * Math.sqrt(a * -a + a);
	const s1: number = v1 * v1 + v2 * v2;

	const b: number = Math.random();
	const v3: number = b * 2 - 1;
	const v4: number = (4 * Math.random() - 2) * Math.sqrt(b * -b + b);
	const s2: number = v3 * v3 + v4 * v4;

	const d: number = Math.sqrt((1 - s1) / s2);

	out[0] = magnitude * v1;
	out[1] = magnitude * v2;
	out[2] = magnitude * v3 * d;
	out[3] = magnitude * v4 * d;
	return out;
}

/**
 * Transforms a vector by a four-by-four matrix.
 * @param vector The vector (multiplier).
 * @param matrix The matrix (multiplicand).
 * @param out The vector to store the result in.
 * @returns The transformed vector.
 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
 */
export function transformMatrix4<T extends Vector4Like>(vector: Vector4Like, matrix: Matrix4Like, out: T): T {
	const x: number = vector[0];
	const y: number = vector[1];
	const z: number = vector[2];
	const w: number = vector[3];

	out[0] = matrix[0] * x + matrix[4] * y + matrix[8] * z + matrix[12] * w;
	out[1] = matrix[1] * x + matrix[5] * y + matrix[9] * z + matrix[13] * w;
	out[2] = matrix[2] * x + matrix[6] * y + matrix[10] * z + matrix[14] * w;
	out[3] = matrix[3] * x + matrix[7] * y + matrix[11] * z + matrix[15] * w;
	return out;
}

/**
 * Sets this to the zero vector.
 * @param out The vector to store the result in.
 * @returns This vector.
 */
export function zero<T extends Vector4Like>(out: T): T {
	out[0] = 0;
	out[1] = 0;
	out[2] = 0;
	out[3] = 0;
	return out;
}

/**
 * Transforms a vector by a quaternion.
 * @param vector The vector.
 * @param quaternion The quaternion.
 * @param out The vector to store the result in.
 * @returns The transformed vector.
 * @see [Quaternion](https://en.wikipedia.org/wiki/Quaternion)
 */
export function transformQuaternion<T extends Vector4Like>(vector: Vector4Like, quaternion: QuaternionLike, out: T): T {
	const x: number = vector[0];
	const y: number = vector[1];
	const z: number = vector[2];

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
	out[3] = vector[3];
	return out;
}

/**
 * A quantity with magnitude and direction in four dimensions.
 * @see [Euclidean vector](https://en.wikipedia.org/wiki/Euclidean_vector)
 */
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
		return fromValues(x, y, z, w, out);
	}

	/**
	 * Creates a four-dimensional zero vector.
	 * @see [Euclidean vector](https://en.wikipedia.org/wiki/Euclidean_vector)
	 */
	public constructor() {
		super(4);
	}

	/**
	 * Determines whether this vector is roughly equivalent to another.
	 * @param vector The other vector.
	 * @returns Whether the vectors are equivalent.
	 */
	public equals(vector: Vector4Like): boolean {
		return equals(this, vector);
	}

	/**
	 * Determines whether this vector is exactly equivalent to another.
	 * @param vector The other vector.
	 * @returns Whether the vectors are equivalent.
	 */
	public exactEquals(vector: Vector4Like): boolean {
		return exactEquals(this, vector);
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
		return add(this, vector, out);
	}

	/**
	 * Creates a copy of this vector.
	 * @returns The copy.
	 */
	public clone(): Vector4;

	/**
	 * Copies the values from this vector to another one.
	 * @param out The vector to store the result in.
	 * @returns The copy.
	 */
	public clone<T extends Vector4Like>(out: T): T;
	
	public clone<T extends Vector4Like>(out: T = new Vector4() as T): T {
		return copy(this, out);
	}

	/**
	 * Copies the values of another vector into this one.
	 * @param vector The vector to copy.
	 * @returns This vector.
	 */
	public copy(vector: Vector4Like): this {
		return copy(vector, this);
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
		return multiply(this, vector, out);
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
		return divide(this, vector, out);
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
		return subtract(this, vector, out);
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
		return ceil(this, out);
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
		return floor(this, out);
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
		return round(this, out);
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
		return min(this, vector, out);
	}

	/**
	 * Returns the maximum of this and another vector.
	 * @param vector The other vector.
	 * @returns The maximum.
	 */
	public max(vector: Vector4Like): Vector4;

	/**
	 * Returns the maximum of this and another vector.
	 * @param vector The other vector.
	 * @param out The vector to store the result in.
	 * @returns The maximum.
	 */
	public max<T extends Vector4Like>(vector: Vector4Like, out: T): T;

	public max<T extends Vector4Like>(vector: Vector4Like, out: T = new Vector4() as T): T {
		return max(this, vector, out);
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
		return scale(this, scalar, out);
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
	 * @param scalar The scalar.
	 * @param out The vector to store the result in.
	 * @returns The sum.
	 */
	public scaleAndAdd<T extends Vector4Like>(vector: Vector4Like, scalar: number, out: T): T;

	public scaleAndAdd<T extends Vector4Like>(vector: Vector4Like, scalar: number, out: T = new Vector4() as T): T {
		return scaleAndAdd(this, vector, scalar, out);
	}

	/**
	 * Calculates the Euclidean distance between this vector and another.
	 * @param vector The other vector.
	 * @returns The distance.
	 * @see [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance)
	 */
	public distance(vector: Vector4Like): number {
		return distance(this, vector);
	}

	/**
	 * Calculates the squared Euclidean distance between this vector and another.
	 * @param vector The other vector.
	 * @returns The squared distance.
	 * @see [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance)
	 */
	public squaredDistance(vector: Vector4Like): number {
		return squaredDistance(this, vector);
	}

	/** The magnitude (length) of this vector. */
	public get magnitude(): number {
		return getMagnitude(this);
	}

	/** The squared magnitude (length) of this vector. */
	public get squaredMagnitude(): number {
		return getSquaredMagnitude(this);
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
		return negate(this, out);
	}

	/**
	 * Calculates the multiplicative inverse of the components of this vector.
	 * @returns The inverted vector.
	 */
	public invert(): Vector4;

	/**
	 * Calculates the multiplicative inverse of the components of this vector.
	 * @param out The vector to store the result in.
	 * @returns The inverted vector.
	 */
	public invert<T extends Vector4Like>(out: T): T;

	public invert<T extends Vector4Like>(out: T = new Vector4() as T): T {
		return invert(this, out);
	}

	/**
	 * Normalizes this vector.
	 * @returns The normalized vector.
	 * @see [Unit vector](https://en.wikipedia.org/wiki/Unit_vector)
	 */
	public normalize(): Vector4;

	/**
	 * Normalizes this vector.
	 * @param out The vector to store the result in.
	 * @returns The normalized vector.
	 * @see [Unit vector](https://en.wikipedia.org/wiki/Unit_vector)
	 */
	public normalize<T extends Vector4Like>(out: T): T;

	public normalize<T extends Vector4Like>(out: T = new Vector4() as T): T {
		return normalize(this, out);
	}

	/**
	 * Calculates the dot product of this and another vector.
	 * @param vector The other vector.
	 * @returns The dot product.
	 * @see [Dot product](https://en.wikipedia.org/wiki/Dot_product)
	 */
	public dot(vector: Vector4Like): number {
		return dot(this, vector);
	}

	/**
	 * Calculates the cross product of this and two other vectors in a four-dimensional space.
	 * @param a One other vector.
	 * @param b The other other vector.
	 * @returns The cross product.
	 * @see [Cross product](https://en.wikipedia.org/wiki/Cross_product)
	 */
	public cross(a: Vector4Like, b: Vector4Like): Vector4;

	/**
	 * Calculates the cross product of this and two other vectors in a four-dimensional space.
	 * @param a One other vector.
	 * @param b The other other vector.
	 * @param out The vector to store the result in.
	 * @returns The cross product.
	 * @see [Cross product](https://en.wikipedia.org/wiki/Cross_product)
	 */
	public cross<T extends Vector4Like>(a: Vector4Like, b: Vector4Like, out: T): T;

	public cross<T extends Vector4Like>(a: Vector4Like, b: Vector4Like, out: T = new Vector4() as T): T {
		return cross(this, a, b, out);
	}

	/**
	 * Performs a linear interpolation between this and another vector.
	 * @param vector The other vector.
	 * @param t The interpolation amount (in `[0,1]`).
	 * @returns The interpolated vector.
	 * @see [Linear interpolation](https://en.wikipedia.org/wiki/Linear_interpolation)
	 */
	public lerp(vector: Vector4Like, t: number): Vector4;

	/**
	 * Performs a linear interpolation between this and another vector.
	 * @param vector The other vector.
	 * @param t The interpolation amount (in `[0,1]`).
	 * @param out The vector to store the result in.
	 * @returns The interpolated vector.
	 * @see [Linear interpolation](https://en.wikipedia.org/wiki/Linear_interpolation)
	 */
	public lerp<T extends Vector4Like>(vector: Vector4Like, t: number, out: T): T;

	public lerp<T extends Vector4Like>(vector: Vector4Like, t: number, out: T = new Vector4() as T): T {
		return lerp(this, vector, t, out);
	}

	/**
	 * Sets this vector to a random value with the given magnitude.
	 * @param magnitude The magnitude.
	 * @returns This vector.
	 */
	public random(magnitude = 1): this {
		return random(magnitude, this);
	}

	/**
	 * Transforms this vector by a four-by-four matrix.
	 * @param matrix The matrix.
	 * @returns The transformed vector.
	 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
	 */
	public transformMatrix4(matrix: Matrix4Like): Vector4;

	/**
	 * Transforms this vector by a four-by-four matrix.
	 * @param matrix The matrix.
	 * @param out The vector to store the result in.
	 * @returns The transformed vector.
	 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
	 */
	public transformMatrix4<T extends Vector4Like>(matrix: Matrix4Like, out: T): T;

	public transformMatrix4<T extends Vector4Like>(matrix: Matrix4Like, out: T = new Vector4() as T): T {
		return transformMatrix4(this, matrix, out);
	}

	/**
	 * Sets this to the zero vector.
	 * @returns This vector.
	 */
	public zero(): this {
		return zero(this);
	}

	/**
	 * Transforms this vector by a quaternion.
	 * @param quaternion The quaternion.
	 * @returns The transformed vector.
	 * @see [Quaternion](https://en.wikipedia.org/wiki/Quaternion)
	 */
	public transformQuaternion(quaternion: QuaternionLike): Vector4;

	/**
	 * Transforms this vector by a quaternion.
	 * @param quaternion The quaternion.
	 * @param out The vector to store the result in.
	 * @returns The transformed vector.
	 * @see [Quaternion](https://en.wikipedia.org/wiki/Quaternion)
	 */
	public transformQuaternion<T extends Vector4Like>(quaternion: QuaternionLike, out: T): T;

	public transformQuaternion<T extends Vector4Like>(quaternion: QuaternionLike, out: T = new Vector4() as T): T {
		return transformQuaternion(this, quaternion, out);
	}
}
