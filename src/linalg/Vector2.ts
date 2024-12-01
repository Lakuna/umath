import type { default as Vector, VectorLike } from "./Vector.js";
import Vector3, { type Vector3Like } from "./Vector3.js";
import type { Matrix2Like } from "./Matrix2.js";
import type { Matrix3Like } from "./Matrix3.js";
import type { Matrix4Like } from "./Matrix4.js";
import epsilon from "../utility/epsilon.js";

/** A quantity with magnitude and direction in two dimensions. */
export interface Vector2Like extends VectorLike {
	/** The first component of this vector. */
	0: number;

	/** The second component of this vector. */
	1: number;
}

/**
 * Create a 2x1 vector-like object.
 * @returns A 2x1 vector-like object.
 */
export const createVector2Like = () => {
	return new Float32Array(2) as Float32Array & Vector2Like;
};

/**
 * Create a vector with the given values.
 * @param x - The first component.
 * @param y - The second component.
 * @param out - The vector to store the result in.
 * @returns A new vector.
 */
export const fromValues = <T extends Vector2Like>(
	x: number,
	y: number,
	out: T
): T => {
	out[0] = x;
	out[1] = y;
	return out;
};

/**
 * Determine whether or not two vectors are roughly equivalent.
 * @param a - The first vector.
 * @param b - The second vector.
 * @returns Whether or not the vectors are equivalent.
 */
export const equals = (a: Vector2Like, b: Vector2Like): boolean => {
	const a0 = a[0];
	const a1 = a[1];

	const b0 = b[0];
	const b1 = b[1];

	return (
		Math.abs(a0 - b0) <= epsilon * Math.max(1, Math.abs(a0), Math.abs(b0)) &&
		Math.abs(a1 - b1) <= epsilon * Math.max(1, Math.abs(a1), Math.abs(b1))
	);
};

/**
 * Determine whether or not two vectors are exactly equivalent.
 * @param a - The first vector.
 * @param b - The second vector.
 * @returns Whether or not the vectors are equivalent.
 */
export const exactEquals = (a: Vector2Like, b: Vector2Like): boolean => {
	return a[0] === b[0] && a[1] === b[1];
};

/**
 * Add two vectors.
 * @param a - The augend.
 * @param b - The addend.
 * @param out - The vector to store the result in.
 * @returns The sum.
 */
export const add = <T extends Vector2Like>(
	a: Vector2Like,
	b: Vector2Like,
	out: T
): T => {
	out[0] = a[0] + b[0];
	out[1] = a[1] + b[1];
	return out;
};

/**
 * Copy the values of one vector into another.
 * @param vector - The vector to copy.
 * @param out - The vector to store the result in.
 * @returns The copy.
 */
export const copy = <T extends Vector2Like>(vector: Vector2Like, out: T): T => {
	out[0] = vector[0];
	out[1] = vector[1];
	return out;
};

/**
 * Multiply the components in one vector by the corresponding components in another.
 * @param a - The multiplicand.
 * @param b - The multiplier.
 * @param out - The vector to store the result in.
 * @returns The product.
 */
export const multiply = <T extends Vector2Like>(
	a: Vector2Like,
	b: Vector2Like,
	out: T
): T => {
	out[0] = a[0] * b[0];
	out[1] = a[1] * b[1];
	return out;
};

/**
 * Divide one vector by another.
 * @param a - The dividend.
 * @param b - The divisor.
 * @param out - The vector to store the result in.
 * @returns The quotient.
 */
export const divide = <T extends Vector2Like>(
	a: Vector2Like,
	b: Vector2Like,
	out: T
): T => {
	out[0] = a[0] / b[0];
	out[1] = a[1] / b[1];
	return out;
};

/**
 * Subtract one vector from another.
 * @param a - The minuend.
 * @param b - The subtrahend.
 * @param out - The vector to store the result in.
 * @returns The difference.
 */
export const subtract = <T extends Vector2Like>(
	a: Vector2Like,
	b: Vector2Like,
	out: T
): T => {
	out[0] = a[0] - b[0];
	out[1] = a[1] - b[1];
	return out;
};

/**
 * Round up the components of a vector.
 * @param vector - The vector.
 * @param out - The vector to store the result in.
 * @returns The rounded vector.
 */
export const ceil = <T extends Vector2Like>(vector: Vector2Like, out: T): T => {
	out[0] = Math.ceil(vector[0]);
	out[1] = Math.ceil(vector[1]);
	return out;
};

/**
 * Round down the components of a vector.
 * @param vector - The vector.
 * @param out - The vector to store the result in.
 * @returns The rounded vector.
 */
export const floor = <T extends Vector2Like>(
	vector: Vector2Like,
	out: T
): T => {
	out[0] = Math.floor(vector[0]);
	out[1] = Math.floor(vector[1]);
	return out;
};

/**
 * Round the components of a vector.
 * @param vector - The vector.
 * @param out - The vector to store the result in.
 * @returns The rounded vector.
 */
export const round = <T extends Vector2Like>(
	vector: Vector2Like,
	out: T
): T => {
	out[0] = Math.round(vector[0]);
	out[1] = Math.round(vector[1]);
	return out;
};

/**
 * Return the minimum of two vectors.
 * @param a - The first vector.
 * @param b - The second vector.
 * @param out - The vector to store the result in.
 * @returns The minimum.
 */
export const min = <T extends Vector2Like>(
	a: Vector2Like,
	b: Vector2Like,
	out: T
): T => {
	out[0] = Math.min(a[0], b[0]);
	out[1] = Math.min(a[1], b[1]);
	return out;
};

/**
 * Return the maximum of two vectors.
 * @param a - The first vector.
 * @param b - The second vector.
 * @param out - The vector to store the result in.
 * @returns The maximum.
 */
export const max = <T extends Vector2Like>(
	a: Vector2Like,
	b: Vector2Like,
	out: T
): T => {
	out[0] = Math.max(a[0], b[0]);
	out[1] = Math.max(a[1], b[1]);
	return out;
};

/**
 * Multiply a vector by a scalar.
 * @param vector - The multiplier.
 * @param scalar - The multiplicand.
 * @param out - The vector to store the result in.
 * @returns The product.
 */
export const scale = <T extends Vector2Like>(
	vector: Vector2Like,
	scalar: number,
	out: T
): T => {
	out[0] = vector[0] * scalar;
	out[1] = vector[1] * scalar;
	return out;
};

/**
 * Add two vectors after multiplying the latter by a scalar.
 * @param a - The augend.
 * @param b - The addend.
 * @param scalar - The multiplier.
 * @param out - The vector to store the result in.
 * @returns The sum.
 */
export const scaleAndAdd = <T extends Vector2Like>(
	a: Vector2Like,
	b: Vector2Like,
	scalar: number,
	out: T
): T => {
	out[0] = a[0] + b[0] * scalar;
	out[1] = a[1] + b[1] * scalar;
	return out;
};

/**
 * Calculate the Euclidean distance from one vector to another.
 * @param a - The first vector.
 * @param b - The second vector.
 * @returns The distance.
 * @see [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance)
 */
export const distance = (a: Vector2Like, b: Vector2Like): number => {
	const x = b[0] - a[0];
	const y = b[1] - a[1];
	return Math.sqrt(x * x + y * y);
};

/**
 * Calculate the squared Euclidean distance from one vector to another.
 * @param a - The first vector.
 * @param b - The other vector.
 * @returns The squared distance.
 * @see [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance)
 */
export const squaredDistance = (a: Vector2Like, b: Vector2Like): number => {
	const x = b[0] - a[0];
	const y = b[1] - a[1];
	return x * x + y * y;
};

/**
 * Get the magnitude (length) of a vector.
 * @param vector - The vector.
 * @returns The magnitude.
 */
export const getMagnitude = (vector: Vector2Like): number => {
	const x = vector[0];
	const y = vector[1];
	return Math.sqrt(x * x + y * y);
};

/**
 * Get the squared magnitude (length) of a vector.
 * @param vector - The vector.
 * @returns The squared magnitude.
 */
export const getSquaredMagnitude = (vector: Vector2Like): number => {
	const x = vector[0];
	const y = vector[1];
	return x * x + y * y;
};

/**
 * Negate a vector.
 * @param vector - The vector.
 * @param out - The vector to store the result in.
 * @returns The negated vector.
 */
export const negate = <T extends Vector2Like>(
	vector: Vector2Like,
	out: T
): T => {
	out[0] = -vector[0];
	out[1] = -vector[1];
	return out;
};

/**
 * Calculate the multiplicative inverse of the components of a vector.
 * @param vector - The vector.
 * @param out - The vector to store the result in.
 * @returns The inverted vector.
 */
export const invert = <T extends Vector2Like>(
	vector: Vector2Like,
	out: T
): T => {
	out[0] = 1 / vector[0];
	out[1] = 1 / vector[1];
	return out;
};

/**
 * Normalize a vector.
 * @param vector - The vector.
 * @param out - The vector to store the result in.
 * @returns The normalized vector.
 * @see [Unit vector](https://en.wikipedia.org/wiki/Unit_vector)
 */
export const normalize = <T extends Vector2Like>(
	vector: Vector2Like,
	out: T
): T => {
	const x = vector[0];
	const y = vector[1];

	let len = x * x + y * y;
	if (len > 0) {
		len = 1 / Math.sqrt(len);
	}

	out[0] = x * len;
	out[1] = y * len;
	return out;
};

/**
 * Calculate the dot product of two vectors.
 * @param a - The multiplicand.
 * @param b - The multiplier.
 * @returns The dot product.
 * @see [Dot product](https://en.wikipedia.org/wiki/Dot_product)
 */
export const dot = (a: Vector2Like, b: Vector2Like): number => {
	return a[0] * b[0] + a[1] * b[1];
};

/**
 * Calculate the cross product of two vectors.
 * @param a - The multiplicand.
 * @param b - The multiplier.
 * @param out - The vector to store the result in.
 * @returns The cross product.
 * @see [Cross product](https://en.wikipedia.org/wiki/Cross_product)
 */
export const cross = <T extends Vector3Like>(
	a: Vector2Like,
	b: Vector2Like,
	out: T
): T => {
	const z = a[0] * b[1] - a[1] * b[0];
	out[0] = 0;
	out[1] = 0;
	out[2] = z;
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
export const lerp = <T extends Vector2Like>(
	a: Vector2Like,
	b: Vector2Like,
	t: number,
	out: T
): T => {
	const ax = a[0];
	const ay = a[1];

	out[0] = ax + t * (b[0] - ax);
	out[1] = ay + t * (b[1] - ay);
	return out;
};

/**
 * Set a vector to a random value with the given magnitude.
 * @param magnitude - The magnitude.
 * @param out - The vector to store the result in.
 * @returns The vector.
 */
export const random = <T extends Vector2Like>(magnitude: number, out: T): T => {
	const r = Math.random() * 2 * Math.PI;

	out[0] = Math.cos(r) * magnitude;
	out[1] = Math.sin(r) * magnitude;
	return out;
};

/**
 * Transform a vector by a two-by-two matrix.
 * @param vector - The vector (multiplier).
 * @param matrix - The matrix (multiplicand).
 * @param out - The vector to store the result in.
 * @returns The transformed vector.
 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
 */
export const transformMatrix2 = <T extends Vector2Like>(
	vector: Vector2Like,
	matrix: Matrix2Like,
	out: T
): T => {
	const x = vector[0];
	const y = vector[1];

	out[0] = matrix[0] * x + matrix[2] * y;
	out[1] = matrix[1] * x + matrix[3] * y;
	return out;
};

/**
 * Transform a vector by a three-by-three matrix.
 * @param vector - The vector (multiplier).
 * @param matrix - The matrix (multiplicand).
 * @param out - The vector to store the result in.
 * @returns The transformed vector.
 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
 */
export const transformMatrix3 = <T extends Vector2Like>(
	vector: Vector2Like,
	matrix: Matrix3Like,
	out: T
): T => {
	const x = vector[0];
	const y = vector[1];

	out[0] = matrix[0] * x + matrix[3] * y + matrix[6];
	out[1] = matrix[1] * x + matrix[4] * y + matrix[7];
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
export const transformMatrix4 = <T extends Vector2Like>(
	vector: Vector2Like,
	matrix: Matrix4Like,
	out: T
): T => {
	const x = vector[0];
	const y = vector[1];

	out[0] = matrix[0] * x + matrix[4] * y + matrix[12];
	out[1] = matrix[1] * x + matrix[5] * y + matrix[13];
	return out;
};

/**
 * Rotate a vector.
 * @param vector - The vector.
 * @param origin - The origin of the rotation.
 * @param r - The angle of rotation in radians.
 * @param out - The vector to store the result in.
 * @returns The rotated vector.
 */
export const rotate = <T extends Vector2Like>(
	vector: Vector2Like,
	origin: Vector2Like,
	r: number,
	out: T
): T => {
	const o0 = origin[0];
	const o1 = origin[1];

	const p0 = vector[0] - o0;
	const p1 = vector[1] - o1;

	const s = Math.sin(r);
	const c = Math.cos(r);

	out[0] = p0 * c - p1 * s + o0;
	out[1] = p0 * s + p1 * c + o1;
	return out;
};

/**
 * Get the angle from one vector to another in radians.
 * @param a - The first vector.
 * @param b - The second vector.
 * @returns The angular distance.
 */
export const angle = (a: Vector2Like, b: Vector2Like): number => {
	const x1 = a[0];
	const y1 = a[1];

	const x2 = b[0];
	const y2 = b[1];

	const magnitudeProduct =
		Math.sqrt(x1 * x1 + y1 * y1) * Math.sqrt(x2 * x2 + y2 * y2);
	const c = magnitudeProduct && (x1 * x2 + y1 * y2) / magnitudeProduct;
	return Math.acos(Math.min(Math.max(c, -1), 1));
};

/**
 * Set a vector to the zero vector.
 * @param out - The vector to store the result in.
 * @returns This vector.
 */
export const zero = <T extends Vector2Like>(out: T): T => {
	out[0] = 0;
	out[1] = 0;
	return out;
};

/**
 * A quantity with magnitude and direction in two dimensions.
 * @see [Euclidean vector](https://en.wikipedia.org/wiki/Euclidean_vector)
 */
export default class Vector2
	extends Float32Array
	implements Vector, Vector2Like
{
	/**
	 * Create a vector with the given values.
	 * @param x - The first component.
	 * @param y - The second component.
	 * @param out - The vector to store the result in.
	 * @returns A new vector.
	 */
	public static fromValues<T extends Vector2Like = Vector2>(
		x: number,
		y: number,
		out: T = new Vector2() as Vector2 & T
	): T {
		return fromValues(x, y, out);
	}

	/**
	 * Create a two-dimensional zero vector.
	 * @see [Euclidean vector](https://en.wikipedia.org/wiki/Euclidean_vector)
	 */
	public constructor() {
		super(2);
	}

	/** The first component of this vector. */
	public 0: number;

	/** The second component of this vector. */
	public 1: number;

	/**
	 * Determine whether this vector is roughly equivalent to another.
	 * @param vector - The other vector.
	 * @returns Whether the vectors are equivalent.
	 */
	public equals(vector: Vector2Like): boolean {
		return equals(this, vector);
	}

	/**
	 * Determine whether or not this vector is exactly equivalent to another.
	 * @param vector - The other vector.
	 * @returns Whether or not the vectors are equivalent.
	 */
	public exactEquals(vector: Vector2Like): boolean {
		return exactEquals(this, vector);
	}

	/**
	 * Add another vector to this one.
	 * @param vector - The other vector.
	 * @param out - The vector to store the result in.
	 * @returns The sum of the vectors.
	 */
	public add<T extends Vector2Like = Vector2>(
		vector: Vector2Like,
		out: T = new Vector2() as Vector2 & T
	): T {
		return add(this, vector, out);
	}

	/**
	 * Copy the values from this vector to another one.
	 * @param out - The vector to store the result in.
	 * @returns The copy.
	 */
	public clone<T extends Vector2Like = Vector2>(
		out: T = new Vector2() as Vector2 & T
	): T {
		return copy(this, out);
	}

	/**
	 * Copy the values from another vector into this one.
	 * @param vector - The vector to copy.
	 * @returns This vector.
	 */
	public copy(vector: Vector2Like): this {
		return copy(vector, this);
	}

	/**
	 * Multiply the components in this vector by the corresponding components in another.
	 * @param vector - The other vector.
	 * @param out - The vector to store the result in.
	 * @returns The product of the vectors.
	 */
	public multiply<T extends Vector2Like = Vector2>(
		vector: Vector2Like,
		out: T = new Vector2() as Vector2 & T
	): T {
		return multiply(this, vector, out);
	}

	/**
	 * Divide this vector by another.
	 * @param vector - The other vector.
	 * @param out - The vector to store the result in.
	 * @returns The quotient of the vectors.
	 */
	public divide<T extends Vector2Like = Vector2>(
		vector: Vector2Like,
		out: T = new Vector2() as Vector2 & T
	): T {
		return divide(this, vector, out);
	}

	/**
	 * Subtract another vector from this one.
	 * @param vector - The other vector.
	 * @param out - The vector to store the result in.
	 * @returns The difference between the vectors.
	 */
	public subtract<T extends Vector2Like = Vector2>(
		vector: Vector2Like,
		out: T = new Vector2() as Vector2 & T
	): T {
		return subtract(this, vector, out);
	}

	/**
	 * Round up the components of this vector.
	 * @param out - The vector to store the result in.
	 * @returns The rounded vector.
	 */
	public ceil<T extends Vector2Like = Vector2>(
		out: T = new Vector2() as Vector2 & T
	): T {
		return ceil(this, out);
	}

	/**
	 * Round down the components of this vector.
	 * @param out - The vector to store the result in.
	 * @returns The rounded vector.
	 */
	public floor<T extends Vector2Like = Vector2>(
		out: T = new Vector2() as Vector2 & T
	): T {
		return floor(this, out);
	}

	/**
	 * Round the components of this vector.
	 * @param out - The vector to store the result in.
	 * @returns The rounded vector.
	 */
	public round<T extends Vector2Like = Vector2>(
		out: T = new Vector2() as Vector2 & T
	): T {
		return round(this, out);
	}

	/**
	 * Return the minimum of this and another vector.
	 * @param vector - The other vector.
	 * @param out - The vector to store the result in.
	 * @returns The minimum.
	 */
	public min<T extends Vector2Like = Vector2>(
		vector: Vector2Like,
		out: T = new Vector2() as Vector2 & T
	): T {
		return min(this, vector, out);
	}

	/**
	 * Return the maximum of this and another vector.
	 * @param vector - The other vector.
	 * @param out - The vector to store the result in.
	 * @returns The maximum.
	 */
	public max<T extends Vector2Like = Vector2>(
		vector: Vector2Like,
		out: T = new Vector2() as Vector2 & T
	): T {
		return max(this, vector, out);
	}

	/**
	 * Scale this vector by a scalar.
	 * @param scalar - The scalar.
	 * @param out - The vector to store the result in.
	 * @returns The scaled vector.
	 */
	public scale<T extends Vector2Like = Vector2>(
		scalar: number,
		out: T = new Vector2() as Vector2 & T
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
	public scaleAndAdd<T extends Vector2Like = Vector2>(
		vector: Vector2Like,
		scalar: number,
		out: T = new Vector2() as Vector2 & T
	): T {
		return scaleAndAdd(this, vector, scalar, out);
	}

	/**
	 * Calculate the Euclidean distance from this vector to another.
	 * @param vector - The other vector.
	 * @returns The distance.
	 * @see [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance)
	 */
	public distance(vector: Vector2Like): number {
		return distance(this, vector);
	}

	/**
	 * Calculate the squared Euclidean distance from this vector to another.
	 * @param vector - The other vector.
	 * @returns The squared distance.
	 * @see [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance)
	 */
	public squaredDistance(vector: Vector2Like): number {
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
	public negate<T extends Vector2Like = Vector2>(
		out: T = new Vector2() as Vector2 & T
	): T {
		return negate(this, out);
	}

	/**
	 * Calculate the multiplicative inverse of the components of this vector.
	 * @param out - The vector to store the result in.
	 * @returns The inverted vector.
	 */
	public invert<T extends Vector2Like = Vector2>(
		out: T = new Vector2() as Vector2 & T
	): T {
		return invert(this, out);
	}

	/**
	 * Normalize this vector.
	 * @param out - The vector to store the result in.
	 * @returns The normalized vector.
	 * @see [Unit vector](https://en.wikipedia.org/wiki/Unit_vector)
	 */
	public normalize<T extends Vector2Like = Vector2>(
		out: T = new Vector2() as Vector2 & T
	): T {
		return normalize(this, out);
	}

	/**
	 * Calculate the dot product of this and another vector.
	 * @param vector - The other vector.
	 * @returns The dot product.
	 * @see [Dot product](https://en.wikipedia.org/wiki/Dot_product)
	 */
	public dot(vector: Vector2Like): number {
		return dot(this, vector);
	}

	/**
	 * Calculate the cross product of this and another vector.
	 * @param vector - The other vector.
	 * @param out - The vector to store the result in.
	 * @returns The cross product.
	 * @see [Cross product](https://en.wikipedia.org/wiki/Cross_product)
	 */
	public cross<T extends Vector3Like = Vector3>(
		vector: Vector2Like,
		out: T = new Vector3() as Vector3 & T
	): T {
		return cross(this, vector, out);
	}

	/**
	 * Perform a linear interpolation between this and another vector.
	 * @param vector - The other vector.
	 * @param t - The interpolation amount (in `[0,1]`).
	 * @param out - The vector to store the result in.
	 * @returns The interpolated vector.
	 * @see [Linear interpolation](https://en.wikipedia.org/wiki/Linear_interpolation)
	 */
	public lerp<T extends Vector2Like = Vector2>(
		vector: Vector2Like,
		t: number,
		out: T = new Vector2() as Vector2 & T
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
	 * Transform this vector by a two-by-two matrix.
	 * @param matrix - The matrix.
	 * @param out - The vector to store the result in.
	 * @returns The transformed vector.
	 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
	 */
	public transformMatrix2<T extends Vector2Like = Vector2>(
		matrix: Matrix2Like,
		out: T = new Vector2() as Vector2 & T
	): T {
		return transformMatrix2(this, matrix, out);
	}

	/**
	 * Transform this vector by a three-by-three matrix.
	 * @param matrix - The matrix.
	 * @param out - The vector to store the result in.
	 * @returns The transformed vector.
	 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
	 */
	public transformMatrix3<T extends Vector2Like = Vector2>(
		matrix: Matrix3Like,
		out: T = new Vector2() as Vector2 & T
	): T {
		return transformMatrix3(this, matrix, out);
	}

	/**
	 * Transform this vector by a four-by-four matrix.
	 * @param matrix - The matrix.
	 * @param out - The vector to store the result in.
	 * @returns The transformed vector.
	 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
	 */
	public transformMatrix4<T extends Vector2Like = Vector2>(
		matrix: Matrix4Like,
		out: T = new Vector2() as Vector2 & T
	): T {
		return transformMatrix4(this, matrix, out);
	}

	/**
	 * Rotate this vector.
	 * @param origin - The origin of the rotation.
	 * @param radians - The angle of rotation in radians.
	 * @param out - The vector to store the result in.
	 * @returns The rotated vector.
	 */
	public rotate<T extends Vector2Like = Vector2>(
		origin: Vector2Like,
		radians: number,
		out: T = new Vector2() as Vector2 & T
	): T {
		return rotate(this, origin, radians, out);
	}

	/**
	 * Get the angle from this to another vector in radians.
	 * @param vector - The other vector.
	 * @returns The angular distance.
	 */
	public angle(vector: Vector2Like): number {
		return angle(this, vector);
	}

	/**
	 * Set this to the zero vector.
	 * @returns This vector.
	 */
	public zero(): this {
		return zero(this);
	}
}
