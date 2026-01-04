import type { default as Vector, VectorLike } from "./Vector.js";
import Vector3, {
	type Vector3Like,
	fromValues as vector3FromValues
} from "./Vector3.js";
import type { Matrix2Like } from "./Matrix2.js";
import type { Matrix3Like } from "./Matrix3.js";
import type { Matrix4Like } from "./Matrix4.js";
import approxRelative from "../algorithms/approxRelative.js";

/**
 * A quantity with magnitude and direction in two dimensions.
 * @public
 */
export interface Vector2Like extends VectorLike {
	/** The first component of this vector. */
	0: number;

	/** The second component of this vector. */
	1: number;
}

/**
 * Create a 2x1 vector-like object.
 * @returns A 2x1 vector-like object.
 * @public
 */
export const createVector2Like = (): Float32Array & Vector2Like => {
	return new Float32Array(2) as Float32Array & Vector2Like;
};

/**
 * Create a vector with the given values.
 * @param x - The first component.
 * @param y - The second component.
 * @param out - The vector to store the result in.
 * @returns A new vector.
 * @public
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
 * @public
 */
export const equals = (a: Vector2Like, b: Vector2Like): boolean =>
	approxRelative(a[0], b[0]) && approxRelative(a[1], b[1]);

/**
 * Determine whether or not two vectors are exactly equivalent.
 * @param a - The first vector.
 * @param b - The second vector.
 * @returns Whether or not the vectors are equivalent.
 * @public
 */
export const exactEquals = (a: Vector2Like, b: Vector2Like): boolean =>
	a[0] === b[0] && a[1] === b[1];

/**
 * Add two vectors.
 * @param a - The augend.
 * @param b - The addend.
 * @param out - The vector to store the result in.
 * @returns The sum.
 * @public
 */
export const add = <T extends Vector2Like>(
	a: Vector2Like,
	b: Vector2Like,
	out: T
): T => fromValues(a[0] + b[0], a[1] + b[1], out);

/**
 * Copy the values of one vector into another.
 * @param vector - The vector to copy.
 * @param out - The vector to store the result in.
 * @returns The copy.
 * @public
 */
export const copy = <T extends Vector2Like>(vector: Vector2Like, out: T): T =>
	fromValues(vector[0], vector[1], out);

/**
 * Multiply the components in one vector by the corresponding components in another.
 * @param a - The multiplicand.
 * @param b - The multiplier.
 * @param out - The vector to store the result in.
 * @returns The product.
 * @public
 */
export const multiply = <T extends Vector2Like>(
	a: Vector2Like,
	b: Vector2Like,
	out: T
): T => fromValues(a[0] * b[0], a[1] * b[1], out);

/**
 * Divide one vector by another.
 * @param a - The dividend.
 * @param b - The divisor.
 * @param out - The vector to store the result in.
 * @returns The quotient.
 * @public
 */
export const divide = <T extends Vector2Like>(
	a: Vector2Like,
	b: Vector2Like,
	out: T
): T => fromValues(a[0] / b[0], a[1] / b[1], out);

/**
 * Subtract one vector from another.
 * @param a - The minuend.
 * @param b - The subtrahend.
 * @param out - The vector to store the result in.
 * @returns The difference.
 * @public
 */
export const subtract = <T extends Vector2Like>(
	a: Vector2Like,
	b: Vector2Like,
	out: T
): T => fromValues(a[0] - b[0], a[1] - b[1], out);

/**
 * Absolutize the components of a vector.
 * @param vector - The vector.
 * @param out - The vector to store the result in.
 * @returns The absolutized vector.
 * @public
 */
export const abs = <T extends Vector2Like>(vector: Vector2Like, out: T): T =>
	fromValues(Math.abs(vector[0]), Math.abs(vector[1]), out);

/**
 * Round up the components of a vector.
 * @param vector - The vector.
 * @param out - The vector to store the result in.
 * @returns The rounded vector.
 * @public
 */
export const ceil = <T extends Vector2Like>(vector: Vector2Like, out: T): T =>
	fromValues(Math.ceil(vector[0]), Math.ceil(vector[1]), out);

/**
 * Round down the components of a vector.
 * @param vector - The vector.
 * @param out - The vector to store the result in.
 * @returns The rounded vector.
 * @public
 */
export const floor = <T extends Vector2Like>(vector: Vector2Like, out: T): T =>
	fromValues(Math.floor(vector[0]), Math.floor(vector[1]), out);

/**
 * Round the components of a vector.
 * @param vector - The vector.
 * @param out - The vector to store the result in.
 * @returns The rounded vector.
 * @public
 */
export const round = <T extends Vector2Like>(vector: Vector2Like, out: T): T =>
	fromValues(Math.round(vector[0]), Math.round(vector[1]), out);

/**
 * Return the minimum of two vectors.
 * @param a - The first vector.
 * @param b - The second vector.
 * @param out - The vector to store the result in.
 * @returns The minimum.
 * @public
 */
export const min = <T extends Vector2Like>(
	a: Vector2Like,
	b: Vector2Like,
	out: T
): T => fromValues(Math.min(a[0], b[0]), Math.min(a[1], b[1]), out);

/**
 * Return the maximum of two vectors.
 * @param a - The first vector.
 * @param b - The second vector.
 * @param out - The vector to store the result in.
 * @returns The maximum.
 * @public
 */
export const max = <T extends Vector2Like>(
	a: Vector2Like,
	b: Vector2Like,
	out: T
): T => fromValues(Math.max(a[0], b[0]), Math.max(a[1], b[1]), out);

/**
 * Raise each component of a vector to the given power.
 * @param vector - The base.
 * @param scalar - The exponent (power) to raise each component to.
 * @param out - The vector to store the result in.
 * @returns The power (result of the exponentiation).
 * @public
 */
export const pow = <T extends Vector2Like>(
	vector: Vector2Like,
	scalar: number,
	out: T
): T => fromValues(vector[0] ** scalar, vector[1] ** scalar, out);

/**
 * Multiply a vector by a scalar.
 * @param vector - The multiplier.
 * @param scalar - The multiplicand.
 * @param out - The vector to store the result in.
 * @returns The product.
 * @public
 */
export const scale = <T extends Vector2Like>(
	vector: Vector2Like,
	scalar: number,
	out: T
): T => fromValues(vector[0] * scalar, vector[1] * scalar, out);

/**
 * Add two vectors after multiplying the latter by a scalar.
 * @param a - The augend.
 * @param b - The addend.
 * @param scalar - The multiplier.
 * @param out - The vector to store the result in.
 * @returns The sum.
 * @public
 */
export const scaleAndAdd = <T extends Vector2Like>(
	a: Vector2Like,
	b: Vector2Like,
	scalar: number,
	out: T
): T => fromValues(a[0] + b[0] * scalar, a[1] + b[1] * scalar, out);

/**
 * Calculate the Euclidean distance from one vector to another.
 * @param a - The first vector.
 * @param b - The second vector.
 * @returns The distance.
 * @see {@link https://en.wikipedia.org/wiki/Euclidean_distance | Euclidean distance}
 * @public
 */
export const distance = (a: Vector2Like, b: Vector2Like): number =>
	Math.hypot(b[0] - a[0], b[1] - a[1]);

/**
 * Calculate the squared Euclidean distance from one vector to another.
 * @param a - The first vector.
 * @param b - The other vector.
 * @returns The squared distance.
 * @see {@link https://en.wikipedia.org/wiki/Euclidean_distance | Euclidean distance}
 * @public
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
 * @public
 */
export const getMagnitude = (vector: Vector2Like): number =>
	Math.hypot(vector[0], vector[1]);

/**
 * Get the squared magnitude (length) of a vector.
 * @param vector - The vector.
 * @returns The squared magnitude.
 * @public
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
 * @public
 */
export const negate = <T extends Vector2Like>(vector: Vector2Like, out: T): T =>
	fromValues(-vector[0], -vector[1], out);

/**
 * Calculate the multiplicative inverse of the components of a vector.
 * @param vector - The vector.
 * @param out - The vector to store the result in.
 * @returns The inverted vector.
 * @public
 */
export const invert = <T extends Vector2Like>(vector: Vector2Like, out: T): T =>
	fromValues(1 / vector[0], 1 / vector[1], out);

/**
 * Normalize a vector.
 * @param vector - The vector.
 * @param out - The vector to store the result in.
 * @returns The normalized vector.
 * @see {@link https://en.wikipedia.org/wiki/Unit_vector | Unit vector}
 * @public
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

	return fromValues(x * len, y * len, out);
};

/**
 * Calculate the dot product of two vectors.
 * @param a - The multiplicand.
 * @param b - The multiplier.
 * @returns The dot product.
 * @see {@link https://en.wikipedia.org/wiki/Dot_product | Dot product}
 * @public
 */
export const dot = (a: Vector2Like, b: Vector2Like): number =>
	a[0] * b[0] + a[1] * b[1];

/**
 * Calculate the cross product of two vectors.
 * @param a - The multiplicand.
 * @param b - The multiplier.
 * @param out - The vector to store the result in.
 * @returns The cross product.
 * @see {@link https://en.wikipedia.org/wiki/Cross_product | Cross product}
 * @public
 */
export const cross = <T extends Vector3Like>(
	a: Vector2Like,
	b: Vector2Like,
	out: T
): T => vector3FromValues(0, 0, a[0] * b[1] - a[1] * b[0], out);

/**
 * Perform a linear interpolation between two vectors.
 * @param a - The first vector.
 * @param b - The second vector.
 * @param t - The interpolation amount (in `[0,1]`).
 * @param out - The vector to store the result in.
 * @returns The interpolated vector.
 * @see {@link https://en.wikipedia.org/wiki/Linear_interpolation | Linear interpolation}
 * @public
 */
export const lerp = <T extends Vector2Like>(
	a: Vector2Like,
	b: Vector2Like,
	t: number,
	out: T
): T => {
	const ax = a[0];
	const ay = a[1];

	return fromValues(ax + t * (b[0] - ax), ay + t * (b[1] - ay), out);
};

/**
 * Set a vector to a random value with the given magnitude.
 * @param magnitude - The magnitude.
 * @param out - The vector to store the result in.
 * @returns The vector.
 * @public
 */
export const random = <T extends Vector2Like>(magnitude: number, out: T): T => {
	const r = Math.random() * 2 * Math.PI;

	return fromValues(Math.cos(r) * magnitude, Math.sin(r) * magnitude, out);
};

/**
 * Transform a vector by a two-by-two matrix. Note that the arguments are "backwards."
 * @param vector - The vector (multiplicand).
 * @param matrix - The matrix (multiplier).
 * @param out - The vector to store the result in.
 * @returns The transformed vector.
 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
 * @public
 */
export const transformMatrix2 = <T extends Vector2Like>(
	vector: Vector2Like,
	matrix: Matrix2Like,
	out: T
): T => {
	const x = vector[0];
	const y = vector[1];

	return fromValues(
		matrix[0] * x + matrix[2] * y,
		matrix[1] * x + matrix[3] * y,
		out
	);
};

/**
 * Transform a vector by a three-by-three matrix. Note that the arguments are "backwards."
 * @param vector - The vector (multiplicand).
 * @param matrix - The matrix (multiplier).
 * @param out - The vector to store the result in.
 * @returns The transformed vector.
 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
 * @public
 */
export const transformMatrix3 = <T extends Vector2Like>(
	vector: Vector2Like,
	matrix: Matrix3Like,
	out: T
): T => {
	const x = vector[0];
	const y = vector[1];

	return fromValues(
		matrix[0] * x + matrix[3] * y + matrix[6],
		matrix[1] * x + matrix[4] * y + matrix[7],
		out
	);
};

/**
 * Transform a vector by a four-by-four matrix. Note that the arguments are "backwards."
 * @param vector - The vector (multiplicand).
 * @param matrix - The matrix (multiplier).
 * @param out - The vector to store the result in.
 * @returns The transformed vector.
 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
 * @public
 */
export const transformMatrix4 = <T extends Vector2Like>(
	vector: Vector2Like,
	matrix: Matrix4Like,
	out: T
): T => {
	const x = vector[0];
	const y = vector[1];

	return fromValues(
		matrix[0] * x + matrix[4] * y + matrix[12],
		matrix[1] * x + matrix[5] * y + matrix[13],
		out
	);
};

/**
 * Rotate a vector.
 * @param vector - The vector.
 * @param origin - The origin of the rotation.
 * @param r - The angle of rotation in radians.
 * @param out - The vector to store the result in.
 * @returns The rotated vector.
 * @public
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

	return fromValues(p0 * c - p1 * s + o0, p0 * s + p1 * c + o1, out);
};

/**
 * Get the angle from one vector to another in radians.
 * @param a - The first vector.
 * @param b - The second vector.
 * @returns The angular distance.
 * @public
 */
export const angle = (a: Vector2Like, b: Vector2Like): number => {
	const x1 = a[0];
	const y1 = a[1];

	const x2 = b[0];
	const y2 = b[1];

	const mp = Math.hypot(x1, y1) * Math.hypot(x2, y2);
	return Math.acos(Math.min(Math.max(mp && (x1 * x2 + y1 * y2) / mp, -1), 1));
};

/**
 * Set a vector to the zero vector.
 * @param out - The vector to store the result in.
 * @returns The vector.
 * @public
 */
export const zero = <T extends Vector2Like>(out: T): T => fromValues(0, 0, out);

/**
 * A quantity with magnitude and direction in two dimensions.
 * @see {@link https://en.wikipedia.org/wiki/Euclidean_vector | Euclidean vector}
 * @public
 */
export default class Vector2
	extends Float32Array
	implements Vector, Vector2Like
{
	/**
	 * Create a vector with the given values.
	 * @param x - The first component.
	 * @param y - The second component.
	 * @returns A new vector.
	 */
	public static fromValues(x: number, y: number): Vector2 {
		return fromValues(x, y, new Vector2());
	}

	/**
	 * Create a two-dimensional zero vector.
	 * @see {@link https://en.wikipedia.org/wiki/Euclidean_vector | Euclidean vector}
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
	 * @returns The sum of the vectors.
	 */
	public add(vector: Vector2Like): Vector2 {
		return add(this, vector, new Vector2());
	}

	/**
	 * Copy the values from this vector to another one.
	 * @returns The copy.
	 */
	public clone(): Vector2 {
		return copy(this, new Vector2());
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
	 * @returns The product of the vectors.
	 */
	public multiply(vector: Vector2Like): Vector2 {
		return multiply(this, vector, new Vector2());
	}

	/**
	 * Divide this vector by another.
	 * @param vector - The other vector.
	 * @returns The quotient of the vectors.
	 */
	public divide(vector: Vector2Like): Vector2 {
		return divide(this, vector, new Vector2());
	}

	/**
	 * Subtract another vector from this one.
	 * @param vector - The other vector.
	 * @returns The difference between the vectors.
	 */
	public subtract(vector: Vector2Like): Vector2 {
		return subtract(this, vector, new Vector2());
	}

	/**
	 * Absolutize the components of this vector.
	 * @returns The absolutized vector.
	 */
	public abs(): Vector2 {
		return abs(this, new Vector2());
	}

	/**
	 * Round up the components of this vector.
	 * @returns The rounded vector.
	 */
	public ceil(): Vector2 {
		return ceil(this, new Vector2());
	}

	/**
	 * Round down the components of this vector.
	 * @returns The rounded vector.
	 */
	public floor(): Vector2 {
		return floor(this, new Vector2());
	}

	/**
	 * Round the components of this vector.
	 * @returns The rounded vector.
	 */
	public round(): Vector2 {
		return round(this, new Vector2());
	}

	/**
	 * Return the minimum of this and another vector.
	 * @param vector - The other vector.
	 * @returns The minimum.
	 */
	public min(vector: Vector2Like): Vector2 {
		return min(this, vector, new Vector2());
	}

	/**
	 * Return the maximum of this and another vector.
	 * @param vector - The other vector.
	 * @returns The maximum.
	 */
	public max(vector: Vector2Like): Vector2 {
		return max(this, vector, new Vector2());
	}

	/**
	 * Raise each component of this vector to the given power.
	 * @param scalar - The exponent (power) to raise each component to.
	 * @returns The power (result of the exponentiation).
	 */
	public pow(scalar: number): Vector2 {
		return pow(this, scalar, new Vector2());
	}

	/**
	 * Scale this vector by a scalar.
	 * @param scalar - The scalar.
	 * @returns The scaled vector.
	 */
	public scale(scalar: number): Vector2 {
		return scale(this, scalar, new Vector2());
	}

	/**
	 * Add another vector to this one after scaling the other by a scalar.
	 * @param vector - The other vector.
	 * @param scalar - The scalar.
	 * @returns The sum.
	 */
	public scaleAndAdd(vector: Vector2Like, scalar: number): Vector2 {
		return scaleAndAdd(this, vector, scalar, new Vector2());
	}

	/**
	 * Calculate the Euclidean distance from this vector to another.
	 * @param vector - The other vector.
	 * @returns The distance.
	 * @see {@link https://en.wikipedia.org/wiki/Euclidean_distance | Euclidean distance}
	 */
	public distance(vector: Vector2Like): number {
		return distance(this, vector);
	}

	/**
	 * Calculate the squared Euclidean distance from this vector to another.
	 * @param vector - The other vector.
	 * @returns The squared distance.
	 * @see {@link https://en.wikipedia.org/wiki/Euclidean_distance | Euclidean distance}
	 */
	public squaredDistance(vector: Vector2Like): number {
		return squaredDistance(this, vector);
	}

	/** The magnitude (length) of this vector. */
	public get magnitude(): number {
		return getMagnitude(this);
	}

	public set magnitude(value: number) {
		scale(normalize(this, this), value, this);
	}

	/** The squared magnitude (length) of this vector. */
	public get squaredMagnitude(): number {
		return getSquaredMagnitude(this);
	}

	public set squaredMagnitude(value: number) {
		this.magnitude = Math.sqrt(value);
	}

	/**
	 * Negate this vector.
	 * @returns The negated vector.
	 */
	public negate(): Vector2 {
		return negate(this, new Vector2());
	}

	/**
	 * Calculate the multiplicative inverse of the components of this vector.
	 * @returns The inverted vector.
	 */
	public invert(): Vector2 {
		return invert(this, new Vector2());
	}

	/**
	 * Normalize this vector.
	 * @returns The normalized vector.
	 * @see {@link https://en.wikipedia.org/wiki/Unit_vector | Unit vector}
	 */
	public normalize(): Vector2 {
		return normalize(this, new Vector2());
	}

	/**
	 * Calculate the dot product of this and another vector.
	 * @param vector - The other vector.
	 * @returns The dot product.
	 * @see {@link https://en.wikipedia.org/wiki/Dot_product | Dot product}
	 */
	public dot(vector: Vector2Like): number {
		return dot(this, vector);
	}

	/**
	 * Calculate the cross product of this and another vector.
	 * @param vector - The other vector.
	 * @returns The cross product.
	 * @see {@link https://en.wikipedia.org/wiki/Cross_product | Cross product}
	 */
	public cross(vector: Vector2Like): Vector3 {
		return cross(this, vector, new Vector3());
	}

	/**
	 * Perform a linear interpolation between this and another vector.
	 * @param vector - The other vector.
	 * @param t - The interpolation amount (in `[0,1]`).
	 * @returns The interpolated vector.
	 * @see {@link https://en.wikipedia.org/wiki/Linear_interpolation | Linear interpolation}
	 */
	public lerp(vector: Vector2Like, t: number): Vector2 {
		return lerp(this, vector, t, new Vector2());
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
	 * @returns The transformed vector.
	 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
	 */
	public transformMatrix2(matrix: Matrix2Like): Vector2 {
		return transformMatrix2(this, matrix, new Vector2());
	}

	/**
	 * Transform this vector by a three-by-three matrix.
	 * @param matrix - The matrix.
	 * @returns The transformed vector.
	 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
	 */
	public transformMatrix3(matrix: Matrix3Like): Vector2 {
		return transformMatrix3(this, matrix, new Vector2());
	}

	/**
	 * Transform this vector by a four-by-four matrix.
	 * @param matrix - The matrix.
	 * @returns The transformed vector.
	 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
	 */
	public transformMatrix4(matrix: Matrix4Like): Vector2 {
		return transformMatrix4(this, matrix, new Vector2());
	}

	/**
	 * Rotate this vector.
	 * @param origin - The origin of the rotation.
	 * @param radians - The angle of rotation in radians.
	 * @returns The rotated vector.
	 */
	public rotate(origin: Vector2Like, radians: number): Vector2 {
		return rotate(this, origin, radians, new Vector2());
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
