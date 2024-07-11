import Quaternion, { type QuaternionLike } from "./Quaternion.js";
import type { default as Vector, VectorLike } from "./Vector.js";
import type { Matrix3Like } from "./Matrix3.js";
import type { Matrix4Like } from "./Matrix4.js";
import epsilon from "../utility/epsilon.js";
import { normalize as normalizeVector4 } from "./Vector4.js";

/** A quantity with magnitude and direction in three dimensions. */
export interface Vector3Like extends VectorLike {
	/** The first component of this vector. */
	0: number;

	/** The second component of this vector. */
	1: number;

	/** The third component of this vector. */
	2: number;
}

/**
 * Creates a 3x1 vector-like object.
 * @returns A 3x1 vector-like object.
 */
export function createVector3Like() {
	return new Float32Array(3) as unknown as Vector3Like;
}

/**
 * Create a vector with the given values.
 * @param x - The first component.
 * @param y - The second component.
 * @param z - The third component.
 * @param out - The vector to store the result in.
 * @returns A new vector.
 */
export function fromValues<T extends Vector3Like>(
	x: number,
	y: number,
	z: number,
	out: T
) {
	out[0] = x;
	out[1] = y;
	out[2] = z;
	return out;
}

/**
 * Determine whether or not two vectors are roughly equivalent.
 * @param a - The first vector.
 * @param b - The second vector.
 * @returns Whether or not the vectors are equivalent.
 */
export function equals(a: Vector3Like, b: Vector3Like) {
	const a0 = a[0];
	const a1 = a[1];
	const a2 = a[2];

	const b0 = b[0];
	const b1 = b[1];
	const b2 = b[2];

	return (
		Math.abs(a0 - b0) <= epsilon * Math.max(1, Math.abs(a0), Math.abs(b0)) &&
		Math.abs(a1 - b1) <= epsilon * Math.max(1, Math.abs(a1), Math.abs(b1)) &&
		Math.abs(a2 - b2) <= epsilon * Math.max(1, Math.abs(a2), Math.abs(b2))
	);
}

/**
 * Determine whether two vectors are exactly equivalent.
 * @param a - The first vector.
 * @param b - The second vector.
 * @returns Whether the vectors are equivalent.
 */
export function exactEquals(a: Vector3Like, b: Vector3Like) {
	return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}

/**
 * Add two vectors.
 * @param a - The augend.
 * @param b - The addend.
 * @param out - The vector to store the result in.
 * @returns The sum.
 */
export function add<T extends Vector3Like>(
	a: Vector3Like,
	b: Vector3Like,
	out: T
) {
	out[0] = a[0] + b[0];
	out[1] = a[1] + b[1];
	out[2] = a[2] + b[2];
	return out;
}

/**
 * Copy the values from one vector to another.
 * @param vector - The vector to copy.
 * @param out - The vector to store the result in.
 * @returns The copy.
 */
export function copy<T extends Vector3Like>(vector: Vector3Like, out: T) {
	out[0] = vector[0];
	out[1] = vector[1];
	out[2] = vector[2];
	return out;
}

/**
 * Multiply two vectors.
 * @param a - The multiplier.
 * @param b - The multiplicand.
 * @param out - The vector to store the result in.
 * @returns The product.
 */
export function multiply<T extends Vector3Like>(
	a: Vector3Like,
	b: Vector3Like,
	out: T
) {
	out[0] = a[0] * b[0];
	out[1] = a[1] * b[1];
	out[2] = a[2] * b[2];
	return out;
}

/**
 * Divide two vectors.
 * @param a - The dividend.
 * @param b - The divisor.
 * @param out - The vector to store the result in.
 * @returns The quotient.
 */
export function divide<T extends Vector3Like>(
	a: Vector3Like,
	b: Vector3Like,
	out: T
) {
	out[0] = a[0] / b[0];
	out[1] = a[1] / b[1];
	out[2] = a[2] / b[2];
	return out;
}

/**
 * Subtract two vectors.
 * @param a - The minuend.
 * @param b - The subtrahend.
 * @param out - The vector to store the result in.
 * @returns The difference.
 */
export function subtract<T extends Vector3Like>(
	a: Vector3Like,
	b: Vector3Like,
	out: T
) {
	out[0] = a[0] - b[0];
	out[1] = a[1] - b[1];
	out[2] = a[2] - b[2];
	return out;
}

/**
 * Round up the components of a vector.
 * @param vector - The vector.
 * @param out - The vector to store the result in.
 * @returns The rounded vector.
 */
export function ceil<T extends Vector3Like>(vector: Vector3Like, out: T) {
	out[0] = Math.ceil(vector[0]);
	out[1] = Math.ceil(vector[1]);
	out[2] = Math.ceil(vector[2]);
	return out;
}

/**
 * Round down the components of a vector.
 * @param vector - The vector.
 * @param out - The vector to store the result in.
 * @returns The rounded vector.
 */
export function floor<T extends Vector3Like>(vector: Vector3Like, out: T) {
	out[0] = Math.floor(vector[0]);
	out[1] = Math.floor(vector[1]);
	out[2] = Math.floor(vector[2]);
	return out;
}

/**
 * Round the components of a vector.
 * @param vector - The vector.
 * @param out - The vector to store the result in.
 * @returns The rounded vector.
 */
export function round<T extends Vector3Like>(vector: Vector3Like, out: T) {
	out[0] = Math.round(vector[0]);
	out[1] = Math.round(vector[1]);
	out[2] = Math.round(vector[2]);
	return out;
}

/**
 * Return the minimum of two vectors.
 * @param a - The first vector.
 * @param b - The second vector.
 * @param out - The vector to store the result in.
 * @returns The minimum.
 */
export function min<T extends Vector3Like>(
	a: Vector3Like,
	b: Vector3Like,
	out: T
) {
	out[0] = Math.min(a[0], b[0]);
	out[1] = Math.min(a[1], b[1]);
	out[2] = Math.min(a[2], b[2]);
	return out;
}

/**
 * Return the maximum of two vectors.
 * @param a - The first vector.
 * @param b - The second vector.
 * @param out - The vector to store the result in.
 * @returns The maximum.
 */
export function max<T extends Vector3Like>(
	a: Vector3Like,
	b: Vector3Like,
	out: T
) {
	out[0] = Math.max(a[0], b[0]);
	out[1] = Math.max(a[1], b[1]);
	out[2] = Math.max(a[2], b[2]);
	return out;
}

/**
 * Scale a vector by a scalar.
 * @param vector - The multiplier.
 * @param scalar - The multiplicand.
 * @param out - The vector to store the result in.
 * @returns The product.
 */
export function scale<T extends Vector3Like>(
	vector: Vector3Like,
	scalar: number,
	out: T
) {
	out[0] = vector[0] * scalar;
	out[1] = vector[1] * scalar;
	out[2] = vector[2] * scalar;
	return out;
}

/**
 * Add two vectors after scaling the second by a scalar.
 * @param a - The augend.
 * @param b - The addend.
 * @param scalar - The multiplicand.
 * @param out - The vector to store the result in.
 * @returns The sum.
 */
export function scaleAndAdd<T extends Vector3Like>(
	a: Vector3Like,
	b: Vector3Like,
	scalar: number,
	out: T
) {
	out[0] = a[0] + b[0] * scalar;
	out[1] = a[1] + b[1] * scalar;
	out[2] = a[2] + b[2] * scalar;
	return out;
}

/**
 * Calculate the Euclidean distance between two vectors.
 * @param a - The first vector.
 * @param b - The second vector.
 * @returns The distance.
 * @see [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance)
 */
export function distance(a: Vector3Like, b: Vector3Like) {
	const x = b[0] - a[0];
	const y = b[1] - a[1];
	const z = b[2] - a[2];
	return Math.hypot(x, y, z);
}

/**
 * Calculate the squared Euclidean distance between this vector and another.
 * @param a - The first vector.
 * @param b - The second vector.
 * @returns The squared distance.
 * @see [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance)
 */
export function squaredDistance(a: Vector3Like, b: Vector3Like) {
	const x = b[0] - a[0];
	const y = b[1] - a[1];
	const z = b[2] - a[2];
	return x * x + y * y + z * z;
}

/**
 * Calculate the magnitude (length) of a vector.
 * @param vector - The vector.
 * @returns The magnitude.
 */
export function getMagnitude(vector: Vector3Like) {
	const x = vector[0];
	const y = vector[1];
	const z = vector[2];
	return Math.hypot(x, y, z);
}

/**
 * Calculate the squared magnitude (length) of a vector.
 * @param vector - The vector.
 * @returns The squared magnitude.
 */
export function getSquaredMagnitude(vector: Vector3Like) {
	const x = vector[0];
	const y = vector[1];
	const z = vector[2];
	return x * x + y * y + z * z;
}

/**
 * Negate a vector.
 * @param vector - The vector.
 * @param out - The vector to store the result in.
 * @returns The negated vector.
 */
export function negate<T extends Vector3Like>(vector: Vector3Like, out: T) {
	out[0] = -vector[0];
	out[1] = -vector[1];
	out[2] = -vector[2];
	return out;
}

/**
 * Calculate the multiplicative inverse of the components of a vector.
 * @param vector - The vector.
 * @param out - The vector to store the result in.
 * @returns The inverted vector.
 */
export function invert<T extends Vector3Like>(vector: Vector3Like, out: T) {
	out[0] = 1 / vector[0];
	out[1] = 1 / vector[1];
	out[2] = 1 / vector[2];
	return out;
}

/**
 * Normalize a vector.
 * @param vector - The vector.
 * @param out - The vector to store the result in.
 * @returns The normalized vector.
 * @see [Unit vector](https://en.wikipedia.org/wiki/Unit_vector)
 */
export function normalize<T extends Vector3Like>(vector: Vector3Like, out: T) {
	const x = vector[0];
	const y = vector[1];
	const z = vector[2];

	let len = x * x + y * y + z * z;
	if (len > 0) {
		len = 1 / Math.sqrt(len);
	}

	out[0] = x * len;
	out[1] = y * len;
	out[2] = z * len;
	return out;
}

/**
 * Calculate the dot product of two vectors.
 * @param a - The multiplier.
 * @param b - The multiplicand.
 * @returns The dot product.
 * @see [Dot product](https://en.wikipedia.org/wiki/Dot_product)
 */
export function dot(a: Vector3Like, b: Vector3Like) {
	return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

/**
 * Calculate the cross product of two vectors.
 * @param a - The multiplier.
 * @param b - The mutliplicand.
 * @param out - The vector to store the result in.
 * @returns The cross product.
 * @see [Cross product](https://en.wikipedia.org/wiki/Cross_product)
 */
export function cross<T extends Vector3Like>(
	a: Vector3Like,
	b: Vector3Like,
	out: T
) {
	const ax = a[0];
	const ay = a[1];
	const az = a[2];

	const bx = b[0];
	const by = b[1];
	const bz = b[2];

	out[0] = ay * bz - az * by;
	out[1] = az * bx - ax * bz;
	out[2] = ax * by - ay * bx;
	return out;
}

/**
 * Perform a linear interpolation between two vectors.
 * @param a - The first vector.
 * @param b - The second vector.
 * @param t - The interpolation amount (in `[0,1]`).
 * @param out - The vector to store the result in.
 * @returns The interpolated vector.
 * @see [Linear interpolation](https://en.wikipedia.org/wiki/Linear_interpolation)
 */
export function lerp<T extends Vector3Like>(
	a: Vector3Like,
	b: Vector3Like,
	t: number,
	out: T
) {
	const ax = a[0];
	const ay = a[1];
	const az = a[2];

	out[0] = ax + t * (b[0] - ax);
	out[1] = ay + t * (b[1] - ay);
	out[2] = az + t * (b[2] - az);
	return out;
}

/**
 * Set a vector to a random value with the given magnitude.
 * @param magnitude - The magnitude.
 * @param out - The vector to store the result in.
 * @returns This vector.
 */
export function random<T extends Vector3Like>(magnitude: number, out: T) {
	const r = Math.random() * 2 * Math.PI;
	const z = Math.random() * 2 - 1;
	const zScale = Math.sqrt(1 - z * z) * magnitude;

	out[0] = Math.cos(r) * zScale;
	out[1] = Math.sin(r) * zScale;
	out[2] = z * magnitude;
	return out;
}

/**
 * Transform a vector by a three-by-three matrix.
 * @param vector - The vector (multiplier).
 * @param matrix - The matrix (multiplicand).
 * @param out - The vector to store the result in.
 * @returns The transformed vector.
 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
 */
export function transformMatrix3<T extends Vector3Like>(
	vector: Vector3Like,
	matrix: Matrix3Like,
	out: T
) {
	const x = vector[0];
	const y = vector[1];
	const z = vector[2];

	out[0] = x * matrix[0] + y * matrix[3] + z * matrix[6];
	out[1] = x * matrix[1] + y * matrix[4] + z * matrix[7];
	out[2] = x * matrix[2] + y * matrix[5] + z * matrix[8];
	return out;
}

/**
 * Transform a vector by a four-by-four matrix.
 * @param vector - The vector (multiplier).
 * @param matrix - The matrix (multiplicand).
 * @param out - The vector to store the result in.
 * @returns The transformed vector.
 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
 */
export function transformMatrix4<T extends Vector3Like>(
	vector: Vector3Like,
	matrix: Matrix4Like,
	out: T
) {
	const x = vector[0];
	const y = vector[1];
	const z = vector[2];

	const w = matrix[3] * x + matrix[7] * y + matrix[11] * z + matrix[15] || 1;

	out[0] = (matrix[0] * x + matrix[4] * y + matrix[8] * z + matrix[12]) / w;
	out[1] = (matrix[1] * x + matrix[5] * y + matrix[9] * z + matrix[13]) / w;
	out[2] = (matrix[2] * x + matrix[6] * y + matrix[10] * z + matrix[14]) / w;
	return out;
}

/**
 * Rotate a vector around the X-axis.
 * @param vector - The vector.
 * @param origin - The origin of the rotation.
 * @param r - The angle of rotation in radians.
 * @param out - The vector to store the result in.
 * @returns The rotated vector.
 */
export function rotateX<T extends Vector3Like>(
	vector: Vector3Like,
	origin: Vector3Like,
	r: number,
	out: T
) {
	const p0 = vector[0] - origin[0];
	const p1 = vector[1] - origin[1];
	const p2 = vector[2] - origin[2];

	const r1 = p1 * Math.cos(r) - p2 * Math.sin(r);
	const r2 = p1 * Math.sin(r) + p2 * Math.cos(r);

	out[0] = p0 + origin[0];
	out[1] = r1 + origin[1];
	out[2] = r2 + origin[2];
	return out;
}

/**
 * Rotate a vector around the Y-axis.
 * @param vector - The vector.
 * @param origin - The origin of the rotation.
 * @param r - The angle of rotation in radians.
 * @param out - The vector to store the result in.
 * @returns The rotated vector.
 */
export function rotateY<T extends Vector3Like>(
	vector: Vector3Like,
	origin: Vector3Like,
	r: number,
	out: T
) {
	const p0 = vector[0] - origin[0];
	const p1 = vector[1] - origin[1];
	const p2 = vector[2] - origin[2];

	const r0 = p2 * Math.sin(r) + p0 * Math.cos(r);
	const r2 = p2 * Math.cos(r) - p0 * Math.sin(r);

	out[0] = r0 + origin[0];
	out[1] = p1 + origin[1];
	out[2] = r2 + origin[2];
	return out;
}

/**
 * Rotate a vector around the Z-axis.
 * @param vector - The vector.
 * @param origin - The origin of the rotation.
 * @param r - The angle of rotation in radians.
 * @param out - The vector to store the result in.
 * @returns The rotated vector.
 */
export function rotateZ<T extends Vector3Like>(
	vector: Vector3Like,
	origin: Vector3Like,
	r: number,
	out: T
) {
	const p0 = vector[0] - origin[0];
	const p1 = vector[1] - origin[1];
	const p2 = vector[2] - origin[2];

	const r0 = p0 * Math.cos(r) - p1 * Math.sin(r);
	const r1 = p0 * Math.sin(r) + p1 * Math.cos(r);

	out[0] = r0 + origin[0];
	out[1] = r1 + origin[1];
	out[2] = p2 + origin[2];
	return out;
}

/**
 * Get the angle between two vectors in radians.
 * @param a - The first vector.
 * @param b - The second vector.
 * @returns The angular distance from the first vector to the second.
 */
export function angle(a: Vector3Like, b: Vector3Like) {
	const ax = a[0];
	const ay = a[1];
	const az = a[2];

	const bx = b[0];
	const by = b[1];
	const bz = b[2];

	const mag1 = Math.sqrt(ax * ax + ay * ay + az * az);
	const mag2 = Math.sqrt(bx * bx + by * by + bz * bz);

	const mag = mag1 * mag2;

	const cosine = mag && dot(a, b) / mag;

	return Math.acos(Math.min(Math.max(cosine, -1), 1));
}

/**
 * Set a vector to the zero vector.
 * @param out - The vector to store the result in.
 * @returns This vector.
 */
export function zero<T extends Vector3Like>(out: T) {
	out[0] = 0;
	out[1] = 0;
	out[2] = 0;
	return out;
}

/**
 * Perform a Hermite interpolation with two control points between two vectors.
 * @param a - The first vector.
 * @param b - The first control point.
 * @param c - The second control point.
 * @param d - The second vector.
 * @param t - The interpolation amount in the range `[0,1]`.
 * @param out - The vector to store the result in.
 * @returns The interpolated vector.
 * @see [Hermite interpolation](https://en.wikipedia.org/wiki/Hermite_interpolation)
 */
export function hermite<T extends Vector3Like>(
	a: Vector3Like,
	b: Vector3Like,
	c: Vector3Like,
	d: Vector3Like,
	t: number,
	out: T
) {
	const factorTimes2 = t * t;

	const factor1 = factorTimes2 * (2 * t - 3) + 1;
	const factor2 = factorTimes2 * (t - 2) + t;
	const factor3 = factorTimes2 * (t - 1);
	const factor4 = factorTimes2 * (3 - 2 * t);

	out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
	out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
	out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
	return out;
}

/**
 * Perform a Bézier interpolation with two control points between two vectors.
 * @param a - The first vector.
 * @param b - The first control point.
 * @param c - The second control point.
 * @param d - The second vector.
 * @param t - The interpolation amount in the range `[0,1]`.
 * @param out - The vector to store the result in.
 * @returns The interpolated vector.
 * @see [Bézier curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve)
 */
export function bezier<T extends Vector3Like>(
	a: Vector3Like,
	b: Vector3Like,
	c: Vector3Like,
	d: Vector3Like,
	t: number,
	out: T
) {
	const inverseFactor = 1 - t;
	const inverseFactorTimesTwo = inverseFactor * inverseFactor;
	const factorSq = t * t;

	const factor1 = inverseFactorTimesTwo * inverseFactor;
	const factor2 = 3 * t * inverseFactorTimesTwo;
	const factor3 = 3 * factorSq * inverseFactor;
	const factor4 = factorSq * t;

	out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
	out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
	out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
	return out;
}

/**
 * Transform a vector by a quaternion.
 * @param vector - The vector.
 * @param quaternion - The quaternion.
 * @param out - The vector to store the result in.
 * @returns The transformed vector.
 * @see [Quaternion](https://en.wikipedia.org/wiki/Quaternion)
 */
export function transformQuaternion<T extends Vector3Like>(
	vector: Vector3Like,
	quaternion: QuaternionLike,
	out: T
) {
	const qx = quaternion[0];
	const qy = quaternion[1];
	const qz = quaternion[2];
	const qw = quaternion[3];

	const x = vector[0];
	const y = vector[1];
	const z = vector[2];

	let uvx = qy * z - qz * y;
	let uvy = qz * x - qx * z;
	let uvz = qx * y - qy * x;

	let uuvx = qy * uvz - qz * uvy;
	let uuvy = qz * uvx - qx * uvz;
	let uuvz = qx * uvy - qy * uvx;

	const w2 = qw * 2;
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

// The unit three-dimensional vector that represents the X-axis.
const xAxis = fromValues(1, 0, 0, createVector3Like());

// The unit three-dimensional vector that represents the Y-axis.
const yAxis = fromValues(0, 1, 0, createVector3Like());

// Used to store intermediary values for some functions.
const intermediary = createVector3Like();

/**
 * Create a quaternion that represents the shortest rotation from one unit vector to another.
 * @param a - The first vector.
 * @param b - The second vector.
 * @param out - The quaternion to store the result in.
 * @returns The quaternion.
 */
export function rotationTo<T extends QuaternionLike>(
	a: Vector3Like,
	b: Vector3Like,
	out: T
) {
	const dp = dot(a, b);

	if (dp < epsilon - 1) {
		cross(xAxis, a, intermediary);
		if (getMagnitude(intermediary) < epsilon) {
			cross(yAxis, a, intermediary);
		}
		normalize(intermediary, intermediary);
		out[0] = intermediary[0];
		out[1] = intermediary[1];
		out[2] = intermediary[2];
		out[3] = 0;
		return out;
	}

	if (dp > 1 - epsilon) {
		out[0] = 0;
		out[1] = 0;
		out[2] = 0;
		out[3] = 1;
		return out;
	}

	cross(a, b, intermediary);
	out[0] = intermediary[0];
	out[1] = intermediary[1];
	out[2] = intermediary[2];
	out[3] = 1 + dp;
	return normalizeVector4(out, out);
}

/**
 * A quantity with magnitude and direction in three dimensions.
 * @see [Euclidean vector](https://en.wikipedia.org/wiki/Euclidean_vector)
 */
export default class Vector3
	extends Float32Array
	implements Vector, Vector3Like
{
	/**
	 * Create a vector with the given values.
	 * @param x - The first component.
	 * @param y - The second component.
	 * @param z - The third component.
	 * @param out - The vector to store the result in.
	 * @returns A new vector.
	 */
	public static fromValues<T extends Vector3Like>(
		x: number,
		y: number,
		z: number,
		out = new Vector3() as unknown as T
	) {
		return fromValues(x, y, z, out);
	}

	/**
	 * Create a three-dimensional zero vector.
	 * @see [Euclidean vector](https://en.wikipedia.org/wiki/Euclidean_vector)
	 */
	public constructor() {
		super(3);
	}

	/** The first component of this vector. */
	public 0: number;

	/** The second component of this vector. */
	public 1: number;

	/** The third component of this vector. */
	public 2: number;

	/**
	 * Determine whether or not this vector is roughly equivalent to another.
	 * @param vector - The other vector.
	 * @returns Whether or not the vectors are equivalent.
	 */
	public equals(vector: Vector3Like) {
		return equals(this, vector);
	}

	/**
	 * Determine whether or not this vector is exactly equivalent to another.
	 * @param vector - The other vector.
	 * @returns Whether or not the vectors are equivalent.
	 */
	public exactEquals(vector: Vector3Like) {
		return exactEquals(this, vector);
	}

	/**
	 * Add two vectors of the same size.
	 * @param vector - The other vector.
	 * @param out - The vector to store the result in.
	 * @returns The sum of the vectors.
	 */
	public add<T extends Vector3Like>(
		vector: Vector3Like,
		out: T = new Vector3() as unknown as T
	) {
		return add(this, vector, out);
	}

	/**
	 * Copy the values from this vector to another one.
	 * @param out - The vector to store the result in.
	 * @returns The copy.
	 */
	public clone<T extends Vector3Like>(out = new Vector3() as unknown as T) {
		return copy(this, out);
	}

	/**
	 * Copy the values of another vector into this one.
	 * @param vector - The vector to copy.
	 * @returns This vector.
	 */
	public copy(vector: Vector3Like) {
		return copy(vector, this);
	}

	/**
	 * Multiply this vector by another.
	 * @param vector - The other vector.
	 * @param out - The vector to store the result in.
	 * @returns The product of the vectors.
	 */
	public multiply<T extends Vector3Like>(
		vector: Vector3Like,
		out = new Vector3() as unknown as T
	) {
		return multiply(this, vector, out);
	}

	/**
	 * Divide this vector by another.
	 * @param vector - The other vector.
	 * @param out - The vector to store the result in.
	 * @returns The quotient of the vectors.
	 */
	public divide<T extends Vector3Like>(
		vector: Vector3Like,
		out = new Vector3() as unknown as T
	) {
		return divide(this, vector, out);
	}

	/**
	 * Subtract another vector from this one.
	 * @param vector - The other vector.
	 * @param out - The vector to store the result in.
	 * @returns The difference between the vectors.
	 */
	public subtract<T extends Vector3Like>(
		vector: Vector3Like,
		out = new Vector3() as unknown as T
	) {
		return subtract(this, vector, out);
	}

	/**
	 * Round up the components of this vector.
	 * @param out - The vector to store the result in.
	 * @returns The rounded vector.
	 */
	public ceil<T extends Vector3Like>(out = new Vector3() as unknown as T) {
		return ceil(this, out);
	}

	/**
	 * Round down the components of this vector.
	 * @param out - The vector to store the result in.
	 * @returns The rounded vector.
	 */
	public floor<T extends Vector3Like>(out = new Vector3() as unknown as T) {
		return floor(this, out);
	}

	/**
	 * Round the components of this vector.
	 * @param out - The vector to store the result in.
	 * @returns The rounded vector.
	 */
	public round<T extends Vector3Like>(out = new Vector3() as unknown as T) {
		return round(this, out);
	}

	/**
	 * Return the minimum of this and another vector.
	 * @param vector - The other vector.
	 * @param out - The vector to store the result in.
	 * @returns The minimum.
	 */
	public min<T extends Vector3Like>(
		vector: Vector3Like,
		out: T = new Vector3() as unknown as T
	) {
		return min(this, vector, out);
	}

	/**
	 * Return the maximum of this and another vector.
	 * @param vector - The other vector.
	 * @param out - The vector to store the result in.
	 * @returns The maximum.
	 */
	public max<T extends Vector3Like>(
		vector: Vector3Like,
		out = new Vector3() as unknown as T
	) {
		return max(this, vector, out);
	}

	/**
	 * Scale this vector by a scalar.
	 * @param scalar - The scalar.
	 * @param out - The vector to store the result in.
	 * @returns The scaled vector.
	 */
	public scale<T extends Vector3Like>(
		scalar: number,
		out = new Vector3() as unknown as T
	) {
		return scale(this, scalar, out);
	}

	/**
	 * Add another vector to this one after scaling the other by a scalar.
	 * @param vector - The other vector.
	 * @param scalar - The scalar.
	 * @param out - The vector to store the result in.
	 * @returns The sum.
	 */
	public scaleAndAdd<T extends Vector3Like>(
		vector: Vector3Like,
		scalar: number,
		out = new Vector3() as unknown as T
	) {
		return scaleAndAdd(this, vector, scalar, out);
	}

	/**
	 * Calculate the Euclidean distance between this vector and another.
	 * @param vector - The other vector.
	 * @returns The distance.
	 * @see [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance)
	 */
	public distance(vector: Vector3Like) {
		return distance(this, vector);
	}

	/**
	 * Calculate the squared Euclidean distance between this vector and another.
	 * @param vector - The other vector.
	 * @returns The squared distance.
	 * @see [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance)
	 */
	public squaredDistance(vector: Vector3Like) {
		return squaredDistance(this, vector);
	}

	/** Get the magnitude (length) of this vector. */
	public get magnitude() {
		return getMagnitude(this);
	}

	/** Get the squared magnitude (length) of this vector. */
	public get squaredMagnitude() {
		return getSquaredMagnitude(this);
	}

	/**
	 * Negate this vector.
	 * @param out - The vector to store the result in.
	 * @returns The negated vector.
	 */
	public negate<T extends Vector3Like>(out = new Vector3() as unknown as T) {
		return negate(this, out);
	}

	/**
	 * Calculate the multiplicative inverse of the components of this vector.
	 * @param out - The vector to store the result in.
	 * @returns The inverted vector.
	 */
	public invert<T extends Vector3Like>(out = new Vector3() as unknown as T) {
		return invert(this, out);
	}

	/**
	 * Normalize this vector.
	 * @param out - The vector to store the result in.
	 * @returns The normalized vector.
	 * @see [Unit vector](https://en.wikipedia.org/wiki/Unit_vector)
	 */
	public normalize<T extends Vector3Like>(out = new Vector3() as unknown as T) {
		return normalize(this, out);
	}

	/**
	 * Calculate the dot product of this and another vector.
	 * @param vector - The other vector.
	 * @returns The dot product.
	 * @see [Dot product](https://en.wikipedia.org/wiki/Dot_product)
	 */
	public dot(vector: Vector3Like) {
		return dot(this, vector);
	}

	/**
	 * Calculate the cross product of this and another vector.
	 * @param vector - The other vector.
	 * @param out - The vector to store the result in.
	 * @returns The cross product.
	 * @see [Cross product](https://en.wikipedia.org/wiki/Cross_product)
	 */
	public cross<T extends Vector3Like>(
		vector: Vector3Like,
		out = new Vector3() as unknown as T
	) {
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
	public lerp<T extends Vector3Like>(
		vector: Vector3Like,
		t: number,
		out = new Vector3() as unknown as T
	) {
		return lerp(this, vector, t, out);
	}

	/**
	 * Set this vector to a random value with the given magnitude.
	 * @param magnitude - The magnitude.
	 * @returns This vector.
	 */
	public random(magnitude = 1) {
		return random(magnitude, this);
	}

	/**
	 * Transform this vector by a three-by-three matrix.
	 * @param matrix - The matrix.
	 * @param out - The vector to store the result in.
	 * @returns The transformed vector.
	 */
	public transformMatrix3<T extends Vector3Like>(
		matrix: Matrix3Like,
		out = new Vector3() as unknown as T
	) {
		return transformMatrix3(this, matrix, out);
	}

	/**
	 * Transform this vector by a four-by-four matrix.
	 * @param matrix - The matrix.
	 * @param out - The vector to store the result in.
	 * @returns The transformed vector.
	 */
	public transformMatrix4<T extends Vector3Like>(
		matrix: Matrix4Like,
		out = new Vector3() as unknown as T
	) {
		return transformMatrix4(this, matrix, out);
	}

	/**
	 * Rotate this vector around the X-axis.
	 * @param origin - The origin of the rotation.
	 * @param r - The angle of rotation in radians.
	 * @param out - The vector to store the result in.
	 * @returns The rotated vector.
	 */
	public rotateX<T extends Vector3Like>(
		origin: Vector3Like,
		r: number,
		out = new Vector3() as unknown as T
	) {
		return rotateX(this, origin, r, out);
	}

	/**
	 * Rotate this vector around the Y-axis.
	 * @param origin - The origin of the rotation.
	 * @param r - The angle of rotation in radians.
	 * @param out - The vector to store the result in.
	 * @returns The rotated vector.
	 */
	public rotateY<T extends Vector3Like>(
		origin: Vector3Like,
		r: number,
		out = new Vector3() as unknown as T
	) {
		return rotateY(this, origin, r, out);
	}

	/**
	 * Rotate this vector around the Z-axis.
	 * @param origin - The origin of the rotation.
	 * @param r - The angle of rotation in radians.
	 * @param out - The vector to store the result in.
	 * @returns The rotated vector.
	 */
	public rotateZ<T extends Vector3Like>(
		origin: Vector3Like,
		r: number,
		out = new Vector3() as unknown as T
	) {
		return rotateZ(this, origin, r, out);
	}

	/**
	 * Get the angle from this vector to another in radians.
	 * @param vector - The other vector.
	 * @returns The angular distance from this vector to the other.
	 */
	public angle(vector: Vector3Like) {
		return angle(this, vector);
	}

	/**
	 * Set this to the zero vector.
	 * @returns This vector.
	 */
	public zero() {
		return zero(this);
	}

	/**
	 * Perform a Hermite interpolation with two control points between this vector and another.
	 * @param a - The first control point.
	 * @param b - The second control point.
	 * @param end - The other vector.
	 * @param t - The interpolation amount in the range `[0,1]`.
	 * @param out - The vector to store the result in.
	 * @returns The interpolated vector.
	 * @see [Hermite interpolation](https://en.wikipedia.org/wiki/Hermite_interpolation)
	 */
	public hermite<T extends Vector3Like>(
		a: Vector3Like,
		b: Vector3Like,
		end: Vector3Like,
		t: number,
		out = new Vector3() as unknown as T
	) {
		return hermite(this, a, b, end, t, out);
	}

	/**
	 * Perform a Bézier interpolation with two control points between this vector and another.
	 * @param a - The first control point.
	 * @param b - The second control point.
	 * @param end - The other vector.
	 * @param t - The interpolation amount in the range `[0,1]`.
	 * @param out - The vector to store the result in.
	 * @returns The interpolated vector.
	 * @see [Bézier curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve)
	 */
	public bezier<T extends Vector3Like>(
		a: Vector3Like,
		b: Vector3Like,
		end: Vector3Like,
		t: number,
		out = new Vector3() as unknown as T
	) {
		return bezier(this, a, b, end, t, out);
	}

	/**
	 * Transform this vector by a quaternion.
	 * @param quaternion - The quaternion.
	 * @param out - The vector to store the result in.
	 * @returns The transformed vector.
	 * @see [Quaternion](https://en.wikipedia.org/wiki/Quaternion)
	 */
	public transformQuaternion<T extends Vector3Like>(
		quaternion: QuaternionLike,
		out = new Vector3() as unknown as T
	) {
		return transformQuaternion(this, quaternion, out);
	}

	/**
	 * Create a quaternion that represents the shortest rotation from this unit vector to another.
	 * @param vector - The other vector.
	 * @param out - The quaternion to store the result in.
	 * @returns The quaternion.
	 */
	public rotationTo<T extends QuaternionLike>(
		vector: Vector3Like,
		out = new Quaternion() as unknown as T
	) {
		return rotationTo(this, vector, out);
	}
}
