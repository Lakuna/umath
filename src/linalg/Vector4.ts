import type { default as Vector, VectorLike } from "./Vector.js";
import type { Matrix4Like } from "./Matrix4.js";
import type { QuaternionLike } from "./Quaternion.js";
import epsilon from "../utility/epsilon.js";

/** A quantity with magnitude and direction in four dimensions. */
export interface Vector4Like extends VectorLike {
	/** The first component of this vector. */
	0: number;

	/** The second component of this vector. */
	1: number;

	/** The third component of this vector. */
	2: number;

	/** The fourth component of this vector. */
	3: number;
}

/**
 * Creates a 4x1 vector-like object.
 * @returns A 4x1 vector-like object.
 */
export const createVector4Like = () => {
	return new Float32Array(4) as unknown as Vector4Like;
};

/**
 * Create a vector with the given values.
 * @param x - The first component.
 * @param y - The second component.
 * @param z - The third component.
 * @param w - The fourth component.
 * @param out - The vector to store the result in.
 * @returns A new vector.
 */
export const fromValues = <T extends Vector4Like>(
	x: number,
	y: number,
	z: number,
	w: number,
	out: T
): T => {
	out[0] = x;
	out[1] = y;
	out[2] = z;
	out[3] = w;
	return out;
};

/**
 * Determine whether or not two vectors are roughly equivalent.
 * @param a - The first vector.
 * @param b - The second vector.
 * @returns Whether or not the vectors are equivalent.
 */
export const equals = (a: Vector4Like, b: Vector4Like): boolean => {
	const a0 = a[0];
	const a1 = a[1];
	const a2 = a[2];
	const a3 = a[3];

	const b0 = b[0];
	const b1 = b[1];
	const b2 = b[2];
	const b3 = b[3];

	return (
		Math.abs(a0 - b0) <= epsilon * Math.max(1, Math.abs(a0), Math.abs(b0)) &&
		Math.abs(a1 - b1) <= epsilon * Math.max(1, Math.abs(a1), Math.abs(b1)) &&
		Math.abs(a2 - b2) <= epsilon * Math.max(1, Math.abs(a2), Math.abs(b2)) &&
		Math.abs(a3 - b3) <= epsilon * Math.max(1, Math.abs(a3), Math.abs(b3))
	);
};

/**
 * Determine whether or not two vectors are exactly equivalent.
 * @param a - The first vector.
 * @param b - The second vector.
 * @returns Whether or not the vectors are equivalent.
 */
export const exactEquals = (a: Vector4Like, b: Vector4Like): boolean => {
	return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
};

/**
 * Add two vectors.
 * @param a - The augend.
 * @param b - The addend.
 * @param out - The vector to store the result in.
 * @returns The sum.
 */
export const add = <T extends Vector4Like>(
	a: Vector4Like,
	b: Vector4Like,
	out: T
): T => {
	out[0] = a[0] + b[0];
	out[1] = a[1] + b[1];
	out[2] = a[2] + b[2];
	out[3] = a[3] + b[3];
	return out;
};

/**
 * Copy the values from one vector to another.
 * @param vector - The vector to copy.
 * @param out - The vector to store the result in.
 * @returns The copy.
 */
export const copy = <T extends Vector4Like>(vector: Vector4Like, out: T): T => {
	out[0] = vector[0];
	out[1] = vector[1];
	out[2] = vector[2];
	out[3] = vector[3];
	return out;
};

/**
 * Multiply two vectors.
 * @param a - The multiplier.
 * @param b - The multiplicand.
 * @param out - The vector to store the result in.
 * @returns The product.
 */
export const multiply = <T extends Vector4Like>(
	a: Vector4Like,
	b: Vector4Like,
	out: T
): T => {
	out[0] = a[0] * b[0];
	out[1] = a[1] * b[1];
	out[2] = a[2] * b[2];
	out[3] = a[3] * b[3];
	return out;
};

/**
 * Divide two vectors.
 * @param a - The dividend.
 * @param b - The divisor.
 * @param out - The vector to store the result in.
 * @returns The quotient.
 */
export const divide = <T extends Vector4Like>(
	a: Vector4Like,
	b: Vector4Like,
	out: T
): T => {
	out[0] = a[0] / b[0];
	out[1] = a[1] / b[1];
	out[2] = a[2] / b[2];
	out[3] = a[3] / b[3];
	return out;
};

/**
 * Subtract two vectors.
 * @param a - The minuend.
 * @param b - The subtrahend.
 * @param out - The vector to store the result in.
 * @returns The difference.
 */
export const subtract = <T extends Vector4Like>(
	a: Vector4Like,
	b: Vector4Like,
	out: T
): T => {
	out[0] = a[0] - b[0];
	out[1] = a[1] - b[1];
	out[2] = a[2] - b[2];
	out[3] = a[3] - b[3];
	return out;
};

/**
 * Round up the components of a vector.
 * @param vector - The vector.
 * @param out - The vector to store the result in.
 * @returns The rounded vector.
 */
export const ceil = <T extends Vector4Like>(vector: Vector4Like, out: T): T => {
	out[0] = Math.ceil(vector[0]);
	out[1] = Math.ceil(vector[1]);
	out[2] = Math.ceil(vector[2]);
	out[3] = Math.ceil(vector[3]);
	return out;
};

/**
 * Round down the components of a vector.
 * @param vector - The vector.
 * @param out - The vector to store the result in.
 * @returns The rounded vector.
 */
export const floor = <T extends Vector4Like>(
	vector: Vector4Like,
	out: T
): T => {
	out[0] = Math.floor(vector[0]);
	out[1] = Math.floor(vector[1]);
	out[2] = Math.floor(vector[2]);
	out[3] = Math.floor(vector[3]);
	return out;
};

/**
 * Round the components of a vector.
 * @param vector - The vector.
 * @param out - The vector to store the result in.
 * @returns The rounded vector.
 */
export const round = <T extends Vector4Like>(
	vector: Vector4Like,
	out: T
): T => {
	out[0] = Math.round(vector[0]);
	out[1] = Math.round(vector[1]);
	out[2] = Math.round(vector[2]);
	out[3] = Math.round(vector[3]);
	return out;
};

/**
 * Return the minimum of two vectors.
 * @param a - The first vector.
 * @param b - The second vector.
 * @param out - The vector to store the result in.
 * @returns The minimum.
 */
export const min = <T extends Vector4Like>(
	a: Vector4Like,
	b: Vector4Like,
	out: T
): T => {
	out[0] = Math.min(a[0], b[0]);
	out[1] = Math.min(a[1], b[1]);
	out[2] = Math.min(a[2], b[2]);
	out[3] = Math.min(a[3], b[3]);
	return out;
};

/**
 * Return the maximum of two vectors.
 * @param a - The first vector.
 * @param b - The second vector.
 * @param out - The vector to store the result in.
 * @returns The maximum.
 */
export const max = <T extends Vector4Like>(
	a: Vector4Like,
	b: Vector4Like,
	out: T
): T => {
	out[0] = Math.max(a[0], b[0]);
	out[1] = Math.max(a[1], b[1]);
	out[2] = Math.max(a[2], b[2]);
	out[3] = Math.max(a[3], b[3]);
	return out;
};

/**
 * Scale a vector by a scalar.
 * @param vector - The multiplier.
 * @param scalar - The multiplicand.
 * @param out - The vector to store the result in.
 * @returns The product.
 */
export const scale = <T extends Vector4Like>(
	vector: Vector4Like,
	scalar: number,
	out: T
): T => {
	out[0] = vector[0] * scalar;
	out[1] = vector[1] * scalar;
	out[2] = vector[2] * scalar;
	out[3] = vector[3] * scalar;
	return out;
};

/**
 * Add two vectors after scaling the second by a scalar.
 * @param a - The augend.
 * @param b - The addend.
 * @param scalar - The multiplicand.
 * @param out - The vector to store the result in.
 * @returns The sum.
 */
export const scaleAndAdd = <T extends Vector4Like>(
	a: Vector4Like,
	b: Vector4Like,
	scalar: number,
	out: T
): T => {
	out[0] = a[0] + b[0] * scalar;
	out[1] = a[1] + b[1] * scalar;
	out[2] = a[2] + b[2] * scalar;
	out[3] = a[3] + b[3] * scalar;
	return out;
};

/**
 * Calculate the Euclidean distance between two vectors.
 * @param a - The first vector
 * @param b - The second vector.
 * @returns The distance.
 * @see [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance)
 */
export const distance = (a: Vector4Like, b: Vector4Like): number => {
	const x = a[0] - b[0];
	const y = a[1] - b[1];
	const z = a[2] - b[2];
	const w = a[3] - b[3];
	return Math.hypot(x, y, z, w);
};

/**
 * Calculate the squared Euclidean distance between two vectors.
 * @param a - The first vector.
 * @param b - The second vector.
 * @returns The squared distance.
 * @see [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance)
 */
export const squaredDistance = (a: Vector4Like, b: Vector4Like): number => {
	const x = a[0] - b[0];
	const y = a[1] - b[1];
	const z = a[2] - b[2];
	const w = a[3] - b[3];
	return x * x + y * y + z * z + w * w;
};

/**
 * Calculate the magnitude (length) of a vector.
 * @param vector - The vector.
 * @returns The magnitude.
 */
export const getMagnitude = (vector: Vector4Like): number => {
	const x = vector[0];
	const y = vector[1];
	const z = vector[2];
	const w = vector[3];
	return Math.hypot(x, y, z, w);
};

/**
 * Calculate the squared magnitude (length) of a vector.
 * @param vector - The vector.
 * @returns The magnitude.
 */
export const getSquaredMagnitude = (vector: Vector4Like): number => {
	const x = vector[0];
	const y = vector[1];
	const z = vector[2];
	const w = vector[3];
	return x * x + y * y + z * z + w * w;
};

/**
 * Negate a vector.
 * @param vector - The vector.
 * @param out - The vector to store the result in.
 * @returns The negated vector.
 */
export const negate = <T extends Vector4Like>(
	vector: Vector4Like,
	out: T
): T => {
	out[0] = -vector[0];
	out[1] = -vector[1];
	out[2] = -vector[2];
	out[3] = -vector[3];
	return out;
};

/**
 * Calculate the multiplicative inverse of the components of a vector.
 * @param vector - The vector.
 * @param out - The vector to store the result in.
 * @returns The inverted vector.
 */
export const invert = <T extends Vector4Like>(
	vector: Vector4Like,
	out: T
): T => {
	out[0] = 1 / vector[0];
	out[1] = 1 / vector[1];
	out[2] = 1 / vector[2];
	out[3] = 1 / vector[3];
	return out;
};

/**
 * Normalize a vector.
 * @param vector - The vector.
 * @param out - The vector to store the result in.
 * @returns The normalized vector.
 * @see [Unit vector](https://en.wikipedia.org/wiki/Unit_vector)
 */
export const normalize = <T extends Vector4Like>(
	vector: Vector4Like,
	out: T
): T => {
	const x = vector[0];
	const y = vector[1];
	const z = vector[2];
	const w = vector[3];

	let len = x * x + y * y + z * z + w * w;
	if (len > 0) {
		len = 1 / Math.sqrt(len);
	}

	out[0] = x * len;
	out[1] = y * len;
	out[2] = z * len;
	out[3] = w * len;
	return out;
};

/**
 * Calculate the dot product of two vectors.
 * @param a - The multiplier.
 * @param b - The multiplicand.
 * @returns The dot product.
 * @see [Dot product](https://en.wikipedia.org/wiki/Dot_product)
 */
export const dot = (a: Vector4Like, b: Vector4Like): number => {
	return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
};

/**
 * Calculate the cross product of three vectors in a four-dimensional space.
 * @param a - The first vector.
 * @param b - The second vector.
 * @param c - The third vector.
 * @param out - The vector to store the result in.
 * @returns The cross product.
 * @see [Cross product](https://en.wikipedia.org/wiki/Cross_product)
 */
export const cross = <T extends Vector4Like>(
	a: Vector4Like,
	b: Vector4Like,
	c: Vector4Like,
	out: T
): T => {
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
};

/**
 * Perform a linear interpolation between two vectors.
 * @param a - The first vector.
 * @param b - The second vector.
 * @param t - The interpolation amount (in `[0,1]`).
 * @param out - The vector to store the result in.
 * @returns The interpolated vector.
 * @see [Linear interpolation](https://en.wikipedia.org/wiki/Linear_interpolation)
 */
export const lerp = <T extends Vector4Like>(
	a: Vector4Like,
	b: Vector4Like,
	t: number,
	out: T
): T => {
	const ax = a[0];
	const ay = a[1];
	const az = a[2];
	const aw = a[3];

	out[0] = ax + t * (b[0] - ax);
	out[1] = ay + t * (b[1] - ay);
	out[2] = az + t * (b[2] - az);
	out[3] = aw + t * (b[3] - aw);
	return out;
};

/**
 * Set this vector to a random value with the given magnitude.
 * @param magnitude - The magnitude.
 * @param out - The vector to store the result in.
 * @returns This vector.
 */
export const random = <T extends Vector4Like>(magnitude: number, out: T): T => {
	const a = Math.random();
	const v1 = a * 2 - 1;
	const v2 = (4 * Math.random() - 2) * Math.sqrt(a * -a + a);
	const s1 = v1 * v1 + v2 * v2;

	const b = Math.random();
	const v3 = b * 2 - 1;
	const v4 = (4 * Math.random() - 2) * Math.sqrt(b * -b + b);
	const s2 = v3 * v3 + v4 * v4;

	const d = Math.sqrt((1 - s1) / s2);

	out[0] = magnitude * v1;
	out[1] = magnitude * v2;
	out[2] = magnitude * v3 * d;
	out[3] = magnitude * v4 * d;
	return out;
};

/**
 * Transform a vector by a four-by-four matrix.
 * @param vector - The vector (multiplier).
 * @param matrix - The matrix (multiplicand).
 * @param out - The vector to store the result in.
 * @returns The transformed vector.
 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
 */
export const transformMatrix4 = <T extends Vector4Like>(
	vector: Vector4Like,
	matrix: Matrix4Like,
	out: T
): T => {
	const x = vector[0];
	const y = vector[1];
	const z = vector[2];
	const w = vector[3];

	out[0] = matrix[0] * x + matrix[4] * y + matrix[8] * z + matrix[12] * w;
	out[1] = matrix[1] * x + matrix[5] * y + matrix[9] * z + matrix[13] * w;
	out[2] = matrix[2] * x + matrix[6] * y + matrix[10] * z + matrix[14] * w;
	out[3] = matrix[3] * x + matrix[7] * y + matrix[11] * z + matrix[15] * w;
	return out;
};

/**
 * Set a vector to the zero vector.
 * @param out - The vector to store the result in.
 * @returns This vector.
 */
export const zero = <T extends Vector4Like>(out: T): T => {
	out[0] = 0;
	out[1] = 0;
	out[2] = 0;
	out[3] = 0;
	return out;
};

/**
 * Transform a vector by a quaternion.
 * @param vector - The vector.
 * @param quaternion - The quaternion.
 * @param out - The vector to store the result in.
 * @returns The transformed vector.
 * @see [Quaternion](https://en.wikipedia.org/wiki/Quaternion)
 */
export const transformQuaternion = <T extends Vector4Like>(
	vector: Vector4Like,
	quaternion: QuaternionLike,
	out: T
): T => {
	const x = vector[0];
	const y = vector[1];
	const z = vector[2];

	const qx = quaternion[0];
	const qy = quaternion[1];
	const qz = quaternion[2];
	const qw = quaternion[3];

	const ix = qw * x + qy * z - qz * y;
	const iy = qw * y + qz * x - qx * z;
	const iz = qw * z + qx * y - qy * x;
	const iw = -qx * x - qy * y - qz * z;

	out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
	out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
	out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
	out[3] = vector[3];
	return out;
};

/**
 * A quantity with magnitude and direction in four dimensions.
 * @see [Euclidean vector](https://en.wikipedia.org/wiki/Euclidean_vector)
 */
export default class Vector4
	extends Float32Array
	implements Vector, Vector4Like
{
	/**
	 * Create a vector with the given values.
	 * @param x - The first component.
	 * @param y - The second component.
	 * @param z - The third component.
	 * @param w - The fourth component.
	 * @param out - The vector to store the result in.
	 * @returns A new vector.
	 */
	public static fromValues<T extends Vector4Like>(
		x: number,
		y: number,
		z: number,
		w: number,
		out = new Vector4() as unknown as T
	): T {
		return fromValues(x, y, z, w, out);
	}

	/**
	 * Create a four-dimensional zero vector.
	 * @see [Euclidean vector](https://en.wikipedia.org/wiki/Euclidean_vector)
	 */
	public constructor() {
		super(4);
	}

	/** The first component of this vector. */
	public 0: number;

	/** The second component of this vector. */
	public 1: number;

	/** The third component of this vector. */
	public 2: number;

	/** The fourth component of this vector. */
	public 3: number;

	/**
	 * Determine whether or not this vector is roughly equivalent to another.
	 * @param vector - The other vector.
	 * @returns Whether or no tthe vectors are equivalent.
	 */
	public equals(vector: Vector4Like): boolean {
		return equals(this, vector);
	}

	/**
	 * Determine whether or not this vector is exactly equivalent to another.
	 * @param vector - The other vector.
	 * @returns Whether the vectors are equivalent.
	 */
	public exactEquals(vector: Vector4Like): boolean {
		return exactEquals(this, vector);
	}

	/**
	 * Add two vectors of the same size.
	 * @param vector - The other vector.
	 * @param out - The vector to store the result in.
	 * @returns The sum of the vectors.
	 */
	public add<T extends Vector4Like>(
		vector: Vector4Like,
		out = new Vector4() as unknown as T
	): T {
		return add(this, vector, out);
	}

	/**
	 * Copy the values from this vector to another one.
	 * @param out - The vector to store the result in.
	 * @returns The copy.
	 */
	public clone<T extends Vector4Like>(out = new Vector4() as unknown as T): T {
		return copy(this, out);
	}

	/**
	 * Copy the values from another vector into this one.
	 * @param vector - The vector to copy.
	 * @returns This vector.
	 */
	public copy(vector: Vector4Like): this {
		return copy(vector, this);
	}

	/**
	 * Multiply this vector by another.
	 * @param vector - The other vector.
	 * @param out - The vector to store the result in.
	 * @returns The product of the vectors.
	 */
	public multiply<T extends Vector4Like>(
		vector: Vector4Like,
		out = new Vector4() as unknown as T
	): T {
		return multiply(this, vector, out);
	}

	/**
	 * Divide this vector by another.
	 * @param vector - The other vector.
	 * @param out - The vector to store the result in.
	 * @returns The quotient of the vectors.
	 */
	public divide<T extends Vector4Like>(
		vector: Vector4Like,
		out = new Vector4() as unknown as T
	): T {
		return divide(this, vector, out);
	}

	/**
	 * Subtract another vector from this one.
	 * @param vector - The other vector.
	 * @param out - The vector to store the result in.
	 * @returns The difference between the vectors.
	 */
	public subtract<T extends Vector4Like>(
		vector: Vector4Like,
		out = new Vector4() as unknown as T
	): T {
		return subtract(this, vector, out);
	}

	/**
	 * Round up the components of this vector.
	 * @param out - The vector to store the result in.
	 * @returns The rounded vector.
	 */
	public ceil<T extends Vector4Like>(out = new Vector4() as unknown as T): T {
		return ceil(this, out);
	}

	/**
	 * Round down the components of this vector.
	 * @param out - The vector to store the result in.
	 * @returns The rounded vector.
	 */
	public floor<T extends Vector4Like>(out = new Vector4() as unknown as T): T {
		return floor(this, out);
	}

	/**
	 * Round the components of this vector.
	 * @param out - The vector to store the result in.
	 * @returns The rounded vector.
	 */
	public round<T extends Vector4Like>(out = new Vector4() as unknown as T): T {
		return round(this, out);
	}

	/**
	 * Return the minimum of this and another vector.
	 * @param vector - The other vector.
	 * @param out - The vector to store the result in.
	 * @returns The minimum.
	 */
	public min<T extends Vector4Like>(
		vector: Vector4Like,
		out = new Vector4() as unknown as T
	): T {
		return min(this, vector, out);
	}

	/**
	 * Return the maximum of this and another vector.
	 * @param vector - The other vector.
	 * @param out - The vector to store the result in.
	 * @returns The maximum.
	 */
	public max<T extends Vector4Like>(
		vector: Vector4Like,
		out = new Vector4() as unknown as T
	): T {
		return max(this, vector, out);
	}

	/**
	 * Scale this vector by a scalar.
	 * @param scalar - The scalar.
	 * @param out - The vector to store the result in.
	 * @returns The scaled vector.
	 */
	public scale<T extends Vector4Like>(
		scalar: number,
		out = new Vector4() as unknown as T
	): T {
		return scale(this, scalar, out);
	}

	/**
	 * Add another vector to this one after scaling the other by a scalar.
	 * @param vector - The other vector.
	 * @param scalar - The scalar.
	 * @param out - The vector to store the result in.
	 * @returns The sum.
	 */
	public scaleAndAdd<T extends Vector4Like>(
		vector: Vector4Like,
		scalar: number,
		out = new Vector4() as unknown as T
	): T {
		return scaleAndAdd(this, vector, scalar, out);
	}

	/**
	 * Calculate the Euclidean distance between this vector and another.
	 * @param vector - The other vector.
	 * @returns The distance.
	 * @see [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance)
	 */
	public distance(vector: Vector4Like): number {
		return distance(this, vector);
	}

	/**
	 * Calculate the squared Euclidean distance between this vector and another.
	 * @param vector - The other vector.
	 * @returns The squared distance.
	 * @see [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance)
	 */
	public squaredDistance(vector: Vector4Like): number {
		return squaredDistance(this, vector);
	}

	/** Get the magnitude (length) of this vector. */
	public get magnitude(): number {
		return getMagnitude(this);
	}

	/** Get the squared magnitude (length) of this vector. */
	public get squaredMagnitude(): number {
		return getSquaredMagnitude(this);
	}

	/**
	 * Negate this vector.
	 * @param out - The vector to store the result in.
	 * @returns The negated vector.
	 */
	public negate<T extends Vector4Like>(out = new Vector4() as unknown as T): T {
		return negate(this, out);
	}

	/**
	 * Calculate the multiplicative inverse of the components of this vector.
	 * @param out - The vector to store the result in.
	 * @returns The inverted vector.
	 */
	public invert<T extends Vector4Like>(out = new Vector4() as unknown as T): T {
		return invert(this, out);
	}

	/**
	 * Normalize this vector.
	 * @param out - The vector to store the result in.
	 * @returns The normalized vector.
	 * @see [Unit vector](https://en.wikipedia.org/wiki/Unit_vector)
	 */
	public normalize<T extends Vector4Like>(
		out = new Vector4() as unknown as T
	): T {
		return normalize(this, out);
	}

	/**
	 * Calculate the dot product of this and another vector.
	 * @param vector - The other vector.
	 * @returns The dot product.
	 * @see [Dot product](https://en.wikipedia.org/wiki/Dot_product)
	 */
	public dot(vector: Vector4Like): number {
		return dot(this, vector);
	}

	/**
	 * Calculate the cross product of this and two other vectors in a four-dimensional space.
	 * @param a - One other vector.
	 * @param b - The other other vector.
	 * @param out - The vector to store the result in.
	 * @returns The cross product.
	 * @see [Cross product](https://en.wikipedia.org/wiki/Cross_product)
	 */
	public cross<T extends Vector4Like>(
		a: Vector4Like,
		b: Vector4Like,
		out = new Vector4() as unknown as T
	): T {
		return cross(this, a, b, out);
	}

	/**
	 * Perform a linear interpolation between this and another vector.
	 * @param vector - The other vector.
	 * @param t - The interpolation amount (in `[0,1]`).
	 * @param out - The vector to store the result in.
	 * @returns The interpolated vector.
	 * @see [Linear interpolation](https://en.wikipedia.org/wiki/Linear_interpolation)
	 */
	public lerp<T extends Vector4Like>(
		vector: Vector4Like,
		t: number,
		out = new Vector4() as unknown as T
	): T {
		return lerp(this, vector, t, out);
	}

	/**
	 * Set this vector to a random value with the given magnitude.
	 * @param magnitude - The magnitude.
	 * @returns This vector.
	 */
	public random(magnitude = 1): this {
		return random(magnitude, this);
	}

	/**
	 * Transform this vector by a four-by-four matrix.
	 * @param matrix - The matrix.
	 * @param out - The vector to store the result in.
	 * @returns The transformed vector.
	 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
	 */
	public transformMatrix4<T extends Vector4Like>(
		matrix: Matrix4Like,
		out = new Vector4() as unknown as T
	): T {
		return transformMatrix4(this, matrix, out);
	}

	/**
	 * Set this to the zero vector.
	 * @returns This vector.
	 */
	public zero(): this {
		return zero(this);
	}

	/**
	 * Transform this vector by a quaternion.
	 * @param quaternion - The quaternion.
	 * @param out - The vector to store the result in.
	 * @returns The transformed vector.
	 * @see [Quaternion](https://en.wikipedia.org/wiki/Quaternion)
	 */
	public transformQuaternion<T extends Vector4Like>(
		quaternion: QuaternionLike,
		out = new Vector4() as unknown as T
	): T {
		return transformQuaternion(this, quaternion, out);
	}
}
