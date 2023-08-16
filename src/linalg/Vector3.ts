import type { Matrix3Like } from "#Matrix3";
import type { Matrix4Like } from "#Matrix4";
import Quaternion, { type QuaternionLike } from "#Quaternion";
import type Vector from "#Vector";
import { normalize as normalizeVector4, type Vector4Like } from "#Vector4";
import epsilon from "#epsilon";

/** A quantity with magnitude and direction in three dimensions. */
export type Vector3Like = Vector3 | [number, number, number];

/**
 * Creates a vector with the given values.
 * @param x The first component.
 * @param y The second component.
 * @param z The third component.
 * @param out The vector to store the result in.
 * @returns A new vector.
 */
export function fromValues<T extends Vector3Like>(
	x: number,
	y: number,
	z: number,
	out: T
): T {
	out[0] = x;
	out[1] = y;
	out[2] = z;
	return out;
}

/**
 * Determines whether two vectors are roughly equivalent.
 * @param a The first vector.
 * @param b The second vector.
 * @returns Whether the vectors are equivalent.
 */
export function equals(a: Vector3Like, b: Vector3Like): boolean {
	const a0: number = a[0];
	const a1: number = a[1];
	const a2: number = a[2];

	const b0: number = b[0];
	const b1: number = b[1];
	const b2: number = b[2];

	return (
		Math.abs(a0 - b0) <= epsilon * Math.max(1, Math.abs(a0), Math.abs(b0)) &&
		Math.abs(a1 - b1) <= epsilon * Math.max(1, Math.abs(a1), Math.abs(b1)) &&
		Math.abs(a2 - b2) <= epsilon * Math.max(1, Math.abs(a2), Math.abs(b2))
	);
}

/**
 * Determines whether two vectors are exactly equivalent.
 * @param a The first vector.
 * @param b The second vector.
 * @returns Whether the vectors are equivalent.
 */
export function exactEquals(a: Vector3Like, b: Vector3Like): boolean {
	return a[0] == b[0] && a[1] == b[1] && a[2] == b[2];
}

/**
 * Adds two vectors.
 * @param a The augend.
 * @param b The addend.
 * @param out The vector to store the result in.
 * @returns The sum.
 */
export function add<T extends Vector3Like>(
	a: Vector3Like,
	b: Vector3Like,
	out: T
): T {
	out[0] = a[0] + b[0];
	out[1] = a[1] + b[1];
	out[2] = a[2] + b[2];
	return out;
}

/**
 * Copies the values from one vector to another.
 * @param vector The vector to copy.
 * @param out The vector to store the result in.
 * @returns The copy.
 */
export function copy<T extends Vector3Like>(vector: Vector3Like, out: T): T {
	out[0] = vector[0];
	out[1] = vector[1];
	out[2] = vector[2];
	return out;
}

/**
 * Multiplies two vectors.
 * @param a The multiplier.
 * @param b The multiplicand.
 * @param out The vector to store the result in.
 * @returns The product.
 */
export function multiply<T extends Vector3Like>(
	a: Vector3Like,
	b: Vector3Like,
	out: T
): T {
	out[0] = a[0] * b[0];
	out[1] = a[1] * b[1];
	out[2] = a[2] * b[2];
	return out;
}

/**
 * Divides two vectors.
 * @param a The dividend.
 * @param b The divisor.
 * @param out The vector to store the result in.
 * @returns The quotient.
 */
export function divide<T extends Vector3Like>(
	a: Vector3Like,
	b: Vector3Like,
	out: T
): T {
	out[0] = a[0] / b[0];
	out[1] = a[1] / b[1];
	out[2] = a[2] / b[2];
	return out;
}

/**
 * Subtracts two vectors.
 * @param a The minuend.
 * @param b The subtrahend.
 * @param out The vector to store the result in.
 * @returns The difference.
 */
export function subtract<T extends Vector3Like>(
	a: Vector3Like,
	b: Vector3Like,
	out: T
): T {
	out[0] = a[0] - b[0];
	out[1] = a[1] - b[1];
	out[2] = a[2] - b[2];
	return out;
}

/**
 * Rounds up the components of a vector.
 * @param vector The vector.
 * @param out The vector to store the result in.
 * @returns The rounded vector.
 */
export function ceil<T extends Vector3Like>(vector: Vector3Like, out: T): T {
	out[0] = Math.ceil(vector[0]);
	out[1] = Math.ceil(vector[1]);
	out[2] = Math.ceil(vector[2]);
	return out;
}

/**
 * Rounds down the components of a vector.
 * @param vector The vector.
 * @param out The vector to store the result in.
 * @returns The rounded vector.
 */
export function floor<T extends Vector3Like>(vector: Vector3Like, out: T): T {
	out[0] = Math.floor(vector[0]);
	out[1] = Math.floor(vector[1]);
	out[2] = Math.floor(vector[2]);
	return out;
}

/**
 * Rounds the components of a vector.
 * @param vector The vector.
 * @param out The vector to store the result in.
 * @returns The rounded vector.
 */
export function round<T extends Vector3Like>(vector: Vector3Like, out: T): T {
	out[0] = Math.round(vector[0]);
	out[1] = Math.round(vector[1]);
	out[2] = Math.round(vector[2]);
	return out;
}

/**
 * Returns the minimum of two vectors.
 * @param a The first vector.
 * @param b The second vector.
 * @param out The vector to store the result in.
 * @returns The minimum.
 */
export function min<T extends Vector3Like>(
	a: Vector3Like,
	b: Vector3Like,
	out: T
): T {
	out[0] = Math.min(a[0], b[0]);
	out[1] = Math.min(a[1], b[1]);
	out[2] = Math.min(a[2], b[2]);
	return out;
}

/**
 * Returns the maximum of two vectors.
 * @param a The first vector.
 * @param b The second vector.
 * @param out The vector to store the result in.
 * @returns The maximum.
 */
export function max<T extends Vector3Like>(
	a: Vector3Like,
	b: Vector3Like,
	out: T
): T {
	out[0] = Math.max(a[0], b[0]);
	out[1] = Math.max(a[1], b[1]);
	out[2] = Math.max(a[2], b[2]);
	return out;
}

/**
 * Scales a vector by a scalar.
 * @param vector The multiplier.
 * @param scalar The multiplicand.
 * @param out The vector to store the result in.
 * @returns The product.
 */
export function scale<T extends Vector3Like>(
	vector: Vector3Like,
	scalar: number,
	out: T
): T {
	out[0] = vector[0] * scalar;
	out[1] = vector[1] * scalar;
	out[2] = vector[2] * scalar;
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
export function scaleAndAdd<T extends Vector3Like>(
	a: Vector3Like,
	b: Vector3Like,
	scalar: number,
	out: T
): T {
	out[0] = a[0] + b[0] * scalar;
	out[1] = a[1] + b[1] * scalar;
	out[2] = a[2] + b[2] * scalar;
	return out;
}

/**
 * Calculates the Euclidean distance between two vectors.
 * @param a The first vector.
 * @param b The second vector.
 * @returns The distance.
 * @see [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance)
 */
export function distance(a: Vector3Like, b: Vector3Like): number {
	const x: number = b[0] - a[0];
	const y: number = b[1] - a[1];
	const z: number = b[2] - a[2];
	return Math.hypot(x, y, z);
}

/**
 * Calculates the squared Euclidean distance between this vector and another.
 * @param a The first vector.
 * @param b The second vector.
 * @returns The squared distance.
 * @see [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance)
 */
export function squaredDistance(a: Vector3Like, b: Vector3Like): number {
	const x: number = b[0] - a[0];
	const y: number = b[1] - a[1];
	const z: number = b[2] - a[2];
	return x * x + y * y + z * z;
}

/**
 * Calculates the magnitude (length) of a vector.
 * @param vector The vector.
 * @returns The magnitude.
 */
export function getMagnitude(vector: Vector3Like): number {
	const x: number = vector[0];
	const y: number = vector[1];
	const z: number = vector[2];
	return Math.hypot(x, y, z);
}

/**
 * Calculates the squared magnitude (length) of a vector.
 * @param vector The vector.
 * @returns The squared magnitude.
 */
export function getSquaredMagnitude(vector: Vector3Like): number {
	const x: number = vector[0];
	const y: number = vector[1];
	const z: number = vector[2];
	return x * x + y * y + z * z;
}

/**
 * Negates a vector.
 * @param vector The vector.
 * @param out The vector to store the result in.
 * @returns The negated vector.
 */
export function negate<T extends Vector3Like>(vector: Vector3Like, out: T): T {
	out[0] = -vector[0];
	out[1] = -vector[1];
	out[2] = -vector[2];
	return out;
}

/**
 * Calculates the multiplicative inverse of the components of a vector.
 * @param vector The vector.
 * @param out The vector to store the result in.
 * @returns The inverted vector.
 */
export function invert<T extends Vector3Like>(vector: Vector3Like, out: T): T {
	out[0] = 1 / vector[0];
	out[1] = 1 / vector[1];
	out[2] = 1 / vector[2];
	return out;
}

/**
 * Normalizes a vector.
 * @param vector The vector.
 * @param out The vector to store the result in.
 * @returns The normalized vector.
 * @see [Unit vector](https://en.wikipedia.org/wiki/Unit_vector)
 */
export function normalize<T extends Vector3Like>(
	vector: Vector3Like,
	out: T
): T {
	const x: number = vector[0];
	const y: number = vector[1];
	const z: number = vector[2];

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
 * Calculates the dot product of two vectors.
 * @param a The multiplier.
 * @param b The multiplicand.
 * @returns The dot product.
 * @see [Dot product](https://en.wikipedia.org/wiki/Dot_product)
 */
export function dot(a: Vector3Like, b: Vector3Like): number {
	return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

/**
 * Calculates the cross product of two vectors.
 * @param a The multiplier.
 * @param b The mutliplicand.
 * @param out The vector to store the result in.
 * @returns The cross product.
 * @see [Cross product](https://en.wikipedia.org/wiki/Cross_product)
 */
export function cross<T extends Vector3Like>(
	a: Vector3Like,
	b: Vector3Like,
	out: T
): T {
	const ax: number = a[0];
	const ay: number = a[1];
	const az: number = a[2];

	const bx: number = b[0];
	const by: number = b[1];
	const bz: number = b[2];

	out[0] = ay * bz - az * by;
	out[1] = az * bx - ax * bz;
	out[2] = ax * by - ay * bx;
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
export function lerp<T extends Vector3Like>(
	a: Vector3Like,
	b: Vector3Like,
	t: number,
	out: T
): T {
	const ax: number = a[0];
	const ay: number = a[1];
	const az: number = a[2];

	out[0] = ax + t * (b[0] - ax);
	out[1] = ay + t * (b[1] - ay);
	out[2] = az + t * (b[2] - az);
	return out;
}

/**
 * Sets a vector to a random value with the given magnitude.
 * @param magnitude The magnitude.
 * @param out The vector to store the result in.
 * @returns This vector.
 */
export function random<T extends Vector3Like>(magnitude: number, out: T): T {
	const r: number = Math.random() * 2 * Math.PI;
	const z: number = Math.random() * 2 - 1;
	const zScale: number = Math.sqrt(1 - z * z) * magnitude;

	out[0] = Math.cos(r) * zScale;
	out[1] = Math.sin(r) * zScale;
	out[2] = z * magnitude;
	return out;
}

/**
 * Transforms a vector by a three-by-three matrix.
 * @param vector The vector (multiplier).
 * @param matrix The matrix (multiplicand).
 * @param out The vector to store the result in.
 * @returns The transformed vector.
 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
 */
export function transformMatrix3<T extends Vector3Like>(
	vector: Vector3Like,
	matrix: Matrix3Like,
	out: T
): T {
	const x: number = vector[0];
	const y: number = vector[1];
	const z: number = vector[2];

	out[0] = x * matrix[0] + y * matrix[3] + z * matrix[6];
	out[1] = x * matrix[1] + y * matrix[4] + z * matrix[7];
	out[2] = x * matrix[2] + y * matrix[5] + z * matrix[8];
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
export function transformMatrix4<T extends Vector3Like>(
	vector: Vector3Like,
	matrix: Matrix4Like,
	out: T
): T {
	const x: number = vector[0];
	const y: number = vector[1];
	const z: number = vector[2];

	const w: number =
		matrix[3] * x + matrix[7] * y + matrix[11] * z + matrix[15] || 1;

	out[0] = (matrix[0] * x + matrix[4] * y + matrix[8] * z + matrix[12]) / w;
	out[1] = (matrix[1] * x + matrix[5] * y + matrix[9] * z + matrix[13]) / w;
	out[2] = (matrix[2] * x + matrix[6] * y + matrix[10] * z + matrix[14]) / w;
	return out;
}

/**
 * Rotates a vector around the X-axis.
 * @param vector The vector.
 * @param origin The origin of the rotation.
 * @param radians The angle of rotation in radians.
 * @param out The vector to store the result in.
 * @returns The rotated vector.
 */
export function rotateX<T extends Vector3Like>(
	vector: Vector3Like,
	origin: Vector3Like,
	radians: number,
	out: T
): T {
	const p: Vector3Like = [
		vector[0] - origin[0],
		vector[1] - origin[1],
		vector[2] - origin[2]
	];

	const r: Vector3Like = [
		p[0],
		p[1] * Math.cos(radians) - p[2] * Math.sin(radians),
		p[1] * Math.sin(radians) + p[2] * Math.cos(radians)
	];

	out[0] = r[0] + origin[0];
	out[1] = r[1] + origin[1];
	out[2] = r[2] + origin[2];
	return out;
}

/**
 * Rotates a vector around the Y-axis.
 * @param vector The vector.
 * @param origin The origin of the rotation.
 * @param radians The angle of rotation in radians.
 * @param out The vector to store the result in.
 * @returns The rotated vector.
 */
export function rotateY<T extends Vector3Like>(
	vector: Vector3Like,
	origin: Vector3Like,
	radians: number,
	out: T
): T {
	const p: Vector3Like = [
		vector[0] - origin[0],
		vector[1] - origin[1],
		vector[2] - origin[2]
	];

	const r: Vector3Like = [
		p[2] * Math.sin(radians) + p[0] * Math.cos(radians),
		p[1],
		p[2] * Math.cos(radians) - p[0] * Math.sin(radians)
	];

	out[0] = r[0] + origin[0];
	out[1] = r[1] + origin[1];
	out[2] = r[2] + origin[2];
	return out;
}

/**
 * Rotates a vector around the Z-axis.
 * @param vector The vector.
 * @param origin The origin of the rotation.
 * @param radians The angle of rotation in radians.
 * @param out The vector to store the result in.
 * @returns The rotated vector.
 */
export function rotateZ<T extends Vector3Like>(
	vector: Vector3Like,
	origin: Vector3Like,
	radians: number,
	out: T
): T {
	const p: Vector3Like = [
		vector[0] - origin[0],
		vector[1] - origin[1],
		vector[2] - origin[2]
	];

	const r: Vector3Like = [
		p[0] * Math.cos(radians) - p[1] * Math.sin(radians),
		p[0] * Math.sin(radians) + p[1] * Math.cos(radians),
		p[2]
	];

	out[0] = r[0] + origin[0];
	out[1] = r[1] + origin[1];
	out[2] = r[2] + origin[2];
	return out;
}

/**
 * Gets the angle between two vectors in radians.
 * @param a The first vector.
 * @param b The second vector.
 * @returns The angular distance from the first vector to the second.
 */
export function angle(a: Vector3Like, b: Vector3Like): number {
	const ax: number = a[0];
	const ay: number = a[1];
	const az: number = a[2];

	const bx: number = b[0];
	const by: number = b[1];
	const bz: number = b[2];

	const mag1: number = Math.sqrt(ax * ax + ay * ay + az * az);
	const mag2: number = Math.sqrt(bx * bx + by * by + bz * bz);

	const mag: number = mag1 * mag2;

	const cosine: number = mag && dot(a, b) / mag;

	return Math.acos(Math.min(Math.max(cosine, -1), 1));
}

/**
 * Sets a vector to the zero vector.
 * @param out The vector to store the result in.
 * @returns This vector.
 */
export function zero<T extends Vector3Like>(out: T): T {
	out[0] = 0;
	out[1] = 0;
	out[2] = 0;
	return out;
}

/**
 * Performs a Hermite interpolation with two control points between two vectors.
 * @param a The first vector.
 * @param b The first control point.
 * @param c The second control point.
 * @param d The second vector.
 * @param t The interpolation amount in the range `[0,1]`.
 * @param out The vector to store the result in.
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
): T {
	const factorTimes2: number = t * t;

	const factor1: number = factorTimes2 * (2 * t - 3) + 1;
	const factor2: number = factorTimes2 * (t - 2) + t;
	const factor3: number = factorTimes2 * (t - 1);
	const factor4: number = factorTimes2 * (3 - 2 * t);

	out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
	out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
	out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
	return out;
}

/**
 * Performs a Bézier interpolation with two control points between two vectors.
 * @param a The first vector.
 * @param b The first control point.
 * @param c The second control point.
 * @param d The second vector.
 * @param t The interpolation amount in the range `[0,1]`.
 * @param out The vector to store the result in.
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
): T {
	const inverseFactor: number = 1 - t;
	const inverseFactorTimesTwo: number = inverseFactor * inverseFactor;
	const factorTimes2: number = t * t;

	const factor1: number = inverseFactorTimesTwo * inverseFactor;
	const factor2: number = 3 * t * inverseFactorTimesTwo;
	const factor3: number = 3 * factorTimes2 * inverseFactor;
	const factor4: number = factorTimes2 * t;

	out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
	out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
	out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
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
export function transformQuaternion<T extends Vector3Like>(
	vector: Vector3Like,
	quaternion: QuaternionLike,
	out: T
): T {
	const qx: number = quaternion[0];
	const qy: number = quaternion[1];
	const qz: number = quaternion[2];
	const qw: number = quaternion[3];

	const x: number = vector[0];
	const y: number = vector[1];
	const z: number = vector[2];

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

/** The unit three-dimensional vector that represents the X-axis. */
const xAxis: Vector3Like = new Float32Array([1, 0, 0]) as Vector3Like;

/** The unit three-dimensional vector that represents the Y-axis. */
const yAxis: Vector3Like = new Float32Array([0, 1, 0]) as Vector3Like;

/** A three-dimensional vector that is used to store intermediary values. */
const intermediary: Vector3Like = new Float32Array(3) as Vector3Like;

/**
 * Creates a quaternion that represents the shortest rotation from one unit vector to another.
 * @param a The first vector.
 * @param b The second vector.
 * @param out The quaternion to store the result in.
 * @returns The quaternion.
 */
export function rotationTo<T extends QuaternionLike>(
	a: Vector3Like,
	b: Vector3Like,
	out: T
): T {
	const dp: number = dot(a, b);

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
	return normalizeVector4(out as Vector4Like, out as Vector4Like) as T;
}

/**
 * A quantity with magnitude and direction in three dimensions.
 * @see [Euclidean vector](https://en.wikipedia.org/wiki/Euclidean_vector)
 */
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
	public static fromValues<T extends Vector3Like>(
		x: number,
		y: number,
		z: number,
		out: T
	): T;

	public static fromValues<T extends Vector3Like>(
		x: number,
		y: number,
		z: number,
		out: T = new Vector3() as T
	): T {
		return fromValues(x, y, z, out);
	}

	/**
	 * Creates a three-dimensional zero vector.
	 * @see [Euclidean vector](https://en.wikipedia.org/wiki/Euclidean_vector)
	 */
	public constructor() {
		super(3);
	}

	/**
	 * Determines whether this vector is roughly equivalent to another.
	 * @param vector The other vector.
	 * @returns Whether the vectors are equivalent.
	 */
	public equals(vector: Vector3Like): boolean {
		return equals(this, vector);
	}

	/**
	 * Determines whether this vector is exactly equivalent to another.
	 * @param vector The other vector.
	 * @returns Whether the vectors are equivalent.
	 */
	public exactEquals(vector: Vector3Like): boolean {
		return exactEquals(this, vector);
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

	public add<T extends Vector3Like>(
		vector: Vector3Like,
		out: T = new Vector3() as T
	): T {
		return add(this, vector, out);
	}

	/**
	 * Creates a copy of this vector.
	 * @returns The copy.
	 */
	public clone(): Vector3;

	/**
	 * Copies the values from this vector to another one.
	 * @param out The vector to store the result in.
	 * @returns The copy.
	 */
	public clone<T extends Vector3Like>(out: T): T;

	public clone<T extends Vector3Like>(out: T = new Vector3() as T): T {
		return copy(this, out);
	}

	/**
	 * Copies the values of another vector into this one.
	 * @param vector The vector to copy.
	 * @returns This vector.
	 */
	public copy(vector: Vector3Like): this {
		return copy(vector, this);
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

	public multiply<T extends Vector3Like>(
		vector: Vector3Like,
		out: T = new Vector3() as T
	): T {
		return multiply(this, vector, out);
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

	public divide<T extends Vector3Like>(
		vector: Vector3Like,
		out: T = new Vector3() as T
	): T {
		return divide(this, vector, out);
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

	public subtract<T extends Vector3Like>(
		vector: Vector3Like,
		out: T = new Vector3() as T
	): T {
		return subtract(this, vector, out);
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
		return ceil(this, out);
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
		return floor(this, out);
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
		return round(this, out);
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

	public min<T extends Vector3Like>(
		vector: Vector3Like,
		out: T = new Vector3() as T
	): T {
		return min(this, vector, out);
	}

	/**
	 * Returns the maximum of this and another vector.
	 * @param vector The other vector.
	 * @returns The maximum.
	 */
	public max(vector: Vector3Like): Vector3;

	/**
	 * Returns the maximum of this and another vector.
	 * @param vector The other vector.
	 * @param out The vector to store the result in.
	 * @returns The maximum.
	 */
	public max<T extends Vector3Like>(vector: Vector3Like, out: T): T;

	public max<T extends Vector3Like>(
		vector: Vector3Like,
		out: T = new Vector3() as T
	): T {
		return max(this, vector, out);
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

	public scale<T extends Vector3Like>(
		scalar: number,
		out: T = new Vector3() as T
	): T {
		return scale(this, scalar, out);
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
	 * @param scalar The scalar.
	 * @param out The vector to store the result in.
	 * @returns The sum.
	 */
	public scaleAndAdd<T extends Vector3Like>(
		vector: Vector3Like,
		scalar: number,
		out: T
	): T;

	public scaleAndAdd<T extends Vector3Like>(
		vector: Vector3Like,
		scalar: number,
		out: T = new Vector3() as T
	): T {
		return scaleAndAdd(this, vector, scalar, out);
	}

	/**
	 * Calculates the Euclidean distance between this vector and another.
	 * @param vector The other vector.
	 * @returns The distance.
	 * @see [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance)
	 */
	public distance(vector: Vector3Like): number {
		return distance(this, vector);
	}

	/**
	 * Calculates the squared Euclidean distance between this vector and another.
	 * @param vector The other vector.
	 * @returns The squared distance.
	 * @see [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance)
	 */
	public squaredDistance(vector: Vector3Like): number {
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
	public negate(): Vector3;

	/**
	 * Negates this vector.
	 * @param out The vector to store the result in.
	 * @returns The negated vector.
	 */
	public negate<T extends Vector3Like>(out: T): T;

	public negate<T extends Vector3Like>(out: T = new Vector3() as T): T {
		return negate(this, out);
	}

	/**
	 * Calculates the multiplicative inverse of the components of this vector.
	 * @returns The inverted vector.
	 */
	public invert(): Vector3;

	/**
	 * Calculates the multiplicative inverse of the components of this vector.
	 * @param out The vector to store the result in.
	 * @returns The inverted vector.
	 */
	public invert<T extends Vector3Like>(out: T): T;

	public invert<T extends Vector3Like>(out: T = new Vector3() as T): T {
		return invert(this, out);
	}

	/**
	 * Normalizes this vector.
	 * @returns The normalized vector.
	 * @see [Unit vector](https://en.wikipedia.org/wiki/Unit_vector)
	 */
	public normalize(): Vector3;

	/**
	 * Normalizes this vector.
	 * @param out The vector to store the result in.
	 * @returns The normalized vector.
	 * @see [Unit vector](https://en.wikipedia.org/wiki/Unit_vector)
	 */
	public normalize<T extends Vector3Like>(out: T): T;

	public normalize<T extends Vector3Like>(out: T = new Vector3() as T): T {
		return normalize(this, out);
	}

	/**
	 * Calculates the dot product of this and another vector.
	 * @param vector The other vector.
	 * @returns The dot product.
	 * @see [Dot product](https://en.wikipedia.org/wiki/Dot_product)
	 */
	public dot(vector: Vector3Like): number {
		return dot(this, vector);
	}

	/**
	 * Calculates the cross product of this and another vector.
	 * @param vector The other vector.
	 * @returns The cross product.
	 * @see [Cross product](https://en.wikipedia.org/wiki/Cross_product)
	 */
	public cross(vector: Vector3Like): Vector3;

	/**
	 * Calculates the cross product of this and another vector.
	 * @param vector The other vector.
	 * @param out The vector to store the result in.
	 * @returns The cross product.
	 * @see [Cross product](https://en.wikipedia.org/wiki/Cross_product)
	 */
	public cross<T extends Vector3Like>(vector: Vector3Like, out: T): T;

	public cross<T extends Vector3Like>(
		vector: Vector3Like,
		out: T = new Vector3() as T
	): T {
		return cross(this, vector, out);
	}

	/**
	 * Performs a linear interpolation between this and another vector.
	 * @param vector The other vector.
	 * @param t The interpolation amount (in `[0,1]`).
	 * @returns The interpolated vector.
	 * @see [Linear interpolation](https://en.wikipedia.org/wiki/Linear_interpolation)
	 */
	public lerp(vector: Vector3Like, t: number): Vector3;

	/**
	 * Performs a linear interpolation between this and another vector.
	 * @param vector The other vector.
	 * @param t The interpolation amount (in `[0,1]`).
	 * @param out The vector to store the result in.
	 * @returns The interpolated vector.
	 * @see [Linear interpolation](https://en.wikipedia.org/wiki/Linear_interpolation)
	 */
	public lerp<T extends Vector3Like>(vector: Vector3Like, t: number, out: T): T;

	public lerp<T extends Vector3Like>(
		vector: Vector3Like,
		t: number,
		out: T = new Vector3() as T
	): T {
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
	public transformMatrix3<T extends Vector3Like>(
		matrix: Matrix3Like,
		out: T
	): T;

	public transformMatrix3<T extends Vector3Like>(
		matrix: Matrix3Like,
		out: T = new Vector3() as T
	): T {
		return transformMatrix3(this, matrix, out);
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
	public transformMatrix4<T extends Vector3Like>(
		matrix: Matrix4Like,
		out: T
	): T;

	public transformMatrix4<T extends Vector3Like>(
		matrix: Matrix4Like,
		out: T = new Vector3() as T
	): T {
		return transformMatrix4(this, matrix, out);
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
	public rotateX<T extends Vector3Like>(
		origin: Vector3Like,
		radians: number,
		out: T
	): T;

	public rotateX<T extends Vector3Like>(
		origin: Vector3Like,
		radians: number,
		out: T = new Vector3() as T
	): T {
		return rotateX(this, origin, radians, out);
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
	public rotateY<T extends Vector3Like>(
		origin: Vector3Like,
		radians: number,
		out: T
	): T;

	public rotateY<T extends Vector3Like>(
		origin: Vector3Like,
		radians: number,
		out: T = new Vector3() as T
	): T {
		return rotateY(this, origin, radians, out);
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
	public rotateZ<T extends Vector3Like>(
		origin: Vector3Like,
		radians: number,
		out: T
	): T;

	public rotateZ<T extends Vector3Like>(
		origin: Vector3Like,
		radians: number,
		out: T = new Vector3() as T
	): T {
		return rotateZ(this, origin, radians, out);
	}

	/**
	 * Gets the angle from this vector to another in radians.
	 * @param vector The other vector.
	 * @returns The angular distance from this vector to the other.
	 */
	public angle(vector: Vector3Like): number {
		return angle(this, vector);
	}

	/**
	 * Sets this to the zero vector.
	 * @returns This vector.
	 */
	public zero(): this {
		return zero(this);
	}

	/**
	 * Performs a Hermite interpolation with two control points between this vector and another.
	 * @param a The first control point.
	 * @param b The second control point.
	 * @param end The other vector.
	 * @param t The interpolation amount in the range `[0,1]`.
	 * @returns The interpolated vector.
	 * @see [Hermite interpolation](https://en.wikipedia.org/wiki/Hermite_interpolation)
	 */
	public hermite(
		a: Vector3Like,
		b: Vector3Like,
		end: Vector3Like,
		t: number
	): Vector3;

	/**
	 * Performs a Hermite interpolation with two control points between this vector and another.
	 * @param a The first control point.
	 * @param b The second control point.
	 * @param end The other vector.
	 * @param t The interpolation amount in the range `[0,1]`.
	 * @param out The vector to store the result in.
	 * @returns The interpolated vector.
	 * @see [Hermite interpolation](https://en.wikipedia.org/wiki/Hermite_interpolation)
	 */
	public hermite<T extends Vector3Like>(
		a: Vector3Like,
		b: Vector3Like,
		end: Vector3Like,
		t: number,
		out: T
	): T;

	public hermite<T extends Vector3Like>(
		a: Vector3Like,
		b: Vector3Like,
		end: Vector3Like,
		t: number,
		out: T = new Vector3() as T
	): T {
		return hermite(this, a, b, end, t, out);
	}

	/**
	 * Performs a Bézier interpolation with two control points between this vector and another.
	 * @param a The first control point.
	 * @param b The second control point.
	 * @param end The other vector.
	 * @param t The interpolation amount in the range `[0,1]`.
	 * @returns The interpolated vector.
	 * @see [Bézier curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve)
	 */
	public bezier(
		a: Vector3Like,
		b: Vector3Like,
		end: Vector3Like,
		t: number
	): Vector3;

	/**
	 * Performs a Bézier interpolation with two control points between this vector and another.
	 * @param a The first control point.
	 * @param b The second control point.
	 * @param end The other vector.
	 * @param t The interpolation amount in the range `[0,1]`.
	 * @param out The vector to store the result in.
	 * @returns The interpolated vector.
	 * @see [Bézier curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve)
	 */
	public bezier<T extends Vector3Like>(
		a: Vector3Like,
		b: Vector3Like,
		end: Vector3Like,
		t: number,
		out: T
	): T;

	public bezier<T extends Vector3Like>(
		a: Vector3Like,
		b: Vector3Like,
		end: Vector3Like,
		t: number,
		out: T = new Vector3() as T
	): T {
		return bezier(this, a, b, end, t, out);
	}

	/**
	 * Transforms this vector by a quaternion.
	 * @param quaternion The quaternion.
	 * @returns The transformed vector.
	 * @see [Quaternion](https://en.wikipedia.org/wiki/Quaternion)
	 */
	public transformQuaternion(quaternion: QuaternionLike): Vector3;

	/**
	 * Transforms this vector by a quaternion.
	 * @param quaternion The quaternion.
	 * @param out The vector to store the result in.
	 * @returns The transformed vector.
	 * @see [Quaternion](https://en.wikipedia.org/wiki/Quaternion)
	 */
	public transformQuaternion<T extends Vector3Like>(
		quaternion: QuaternionLike,
		out: T
	): T;

	public transformQuaternion<T extends Vector3Like>(
		quaternion: QuaternionLike,
		out: T = new Vector3() as T
	): T {
		return transformQuaternion(this, quaternion, out);
	}

	/**
	 * Creates a quaternion that represents the shortest rotation from this vector to another.
	 * @param vector The other vector.
	 * @returns The rotation.
	 */
	public rotationTo(vector: Vector3Like): Quaternion;

	/**
	 * Creates a quaternion that represents the shortest rotation from this unit vector to another.
	 * @param vector The other vector.
	 * @param out The quaternion to store the result in.
	 * @returns The quaternion.
	 */
	public rotationTo<T extends QuaternionLike>(vector: Vector3Like, out: T): T;

	public rotationTo<T extends QuaternionLike>(
		vector: Vector3Like,
		out: T = new Quaternion() as T
	): T {
		return rotationTo(this, vector, out);
	}
}
