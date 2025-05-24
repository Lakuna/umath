import type { default as Vector, VectorLike } from "./Vector.js";
import type { Matrix3Like } from "./Matrix3.js";
import type { Matrix4Like } from "./Matrix4.js";
import type { QuaternionLike } from "./Quaternion.js";
import approxRelative from "../algorithms/approxRelative.js";

/**
 * A quantity with magnitude and direction in three dimensions.
 * @public
 */
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
 * @public
 */
export const createVector3Like = (): Float32Array & Vector3Like => {
	return new Float32Array(3) as Float32Array & Vector3Like;
};

/**
 * Create a vector with the given values.
 * @param x - The first component.
 * @param y - The second component.
 * @param z - The third component.
 * @param out - The vector to store the result in.
 * @returns A new vector.
 * @public
 */
export const fromValues = <T extends Vector3Like>(
	x: number,
	y: number,
	z: number,
	out: T
): T => {
	out[0] = x;
	out[1] = y;
	out[2] = z;
	return out;
};

/**
 * Determine whether or not two vectors are roughly equivalent.
 * @param a - The first vector.
 * @param b - The second vector.
 * @returns Whether or not the vectors are equivalent.
 * @public
 */
export const equals = (a: Vector3Like, b: Vector3Like): boolean =>
	approxRelative(a[0], b[0]) &&
	approxRelative(a[1], b[1]) &&
	approxRelative(a[2], b[2]);

/**
 * Determine whether two vectors are exactly equivalent.
 * @param a - The first vector.
 * @param b - The second vector.
 * @returns Whether the vectors are equivalent.
 * @public
 */
export const exactEquals = (a: Vector3Like, b: Vector3Like): boolean =>
	a[0] === b[0] && a[1] === b[1] && a[2] === b[2];

/**
 * Add two vectors.
 * @param a - The augend.
 * @param b - The addend.
 * @param out - The vector to store the result in.
 * @returns The sum.
 * @public
 */
export const add = <T extends Vector3Like>(
	a: Vector3Like,
	b: Vector3Like,
	out: T
): T => fromValues(a[0] + b[0], a[1] + b[1], a[2] + b[2], out);

/**
 * Copy the values from one vector to another.
 * @param vector - The vector to copy.
 * @param out - The vector to store the result in.
 * @returns The copy.
 * @public
 */
export const copy = <T extends Vector3Like>(vector: Vector3Like, out: T): T =>
	fromValues(vector[0], vector[1], vector[2], out);

/**
 * Multiply two vectors.
 * @param a - The multiplier.
 * @param b - The multiplicand.
 * @param out - The vector to store the result in.
 * @returns The product.
 * @public
 */
export const multiply = <T extends Vector3Like>(
	a: Vector3Like,
	b: Vector3Like,
	out: T
): T => fromValues(a[0] * b[0], a[1] * b[1], a[2] * b[2], out);

/**
 * Divide two vectors.
 * @param a - The dividend.
 * @param b - The divisor.
 * @param out - The vector to store the result in.
 * @returns The quotient.
 * @public
 */
export const divide = <T extends Vector3Like>(
	a: Vector3Like,
	b: Vector3Like,
	out: T
): T => fromValues(a[0] / b[0], a[1] / b[1], a[2] / b[2], out);

/**
 * Subtract two vectors.
 * @param a - The minuend.
 * @param b - The subtrahend.
 * @param out - The vector to store the result in.
 * @returns The difference.
 * @public
 */
export const subtract = <T extends Vector3Like>(
	a: Vector3Like,
	b: Vector3Like,
	out: T
): T => fromValues(a[0] - b[0], a[1] - b[1], a[2] - b[2], out);

/**
 * Absolutize the components of a vector.
 * @param vector - The vector.
 * @param out - The vector to store the result in.
 * @returns The absolutized vector.
 * @public
 */
export const abs = <T extends Vector3Like>(vector: Vector3Like, out: T): T =>
	fromValues(
		Math.abs(vector[0]),
		Math.abs(vector[1]),
		Math.abs(vector[2]),
		out
	);

/**
 * Round up the components of a vector.
 * @param vector - The vector.
 * @param out - The vector to store the result in.
 * @returns The rounded vector.
 * @public
 */
export const ceil = <T extends Vector3Like>(vector: Vector3Like, out: T): T =>
	fromValues(
		Math.ceil(vector[0]),
		Math.ceil(vector[1]),
		Math.ceil(vector[2]),
		out
	);

/**
 * Round down the components of a vector.
 * @param vector - The vector.
 * @param out - The vector to store the result in.
 * @returns The rounded vector.
 * @public
 */
export const floor = <T extends Vector3Like>(vector: Vector3Like, out: T): T =>
	fromValues(
		Math.floor(vector[0]),
		Math.floor(vector[1]),
		Math.floor(vector[2]),
		out
	);

/**
 * Round the components of a vector.
 * @param vector - The vector.
 * @param out - The vector to store the result in.
 * @returns The rounded vector.
 * @public
 */
export const round = <T extends Vector3Like>(vector: Vector3Like, out: T): T =>
	fromValues(
		Math.round(vector[0]),
		Math.round(vector[1]),
		Math.round(vector[2]),
		out
	);

/**
 * Return the minimum of two vectors.
 * @param a - The first vector.
 * @param b - The second vector.
 * @param out - The vector to store the result in.
 * @returns The minimum.
 * @public
 */
export const min = <T extends Vector3Like>(
	a: Vector3Like,
	b: Vector3Like,
	out: T
): T =>
	fromValues(
		Math.min(a[0], b[0]),
		Math.min(a[1], b[1]),
		Math.min(a[2], b[2]),
		out
	);

/**
 * Return the maximum of two vectors.
 * @param a - The first vector.
 * @param b - The second vector.
 * @param out - The vector to store the result in.
 * @returns The maximum.
 * @public
 */
export const max = <T extends Vector3Like>(
	a: Vector3Like,
	b: Vector3Like,
	out: T
): T =>
	fromValues(
		Math.max(a[0], b[0]),
		Math.max(a[1], b[1]),
		Math.max(a[2], b[2]),
		out
	);

/**
 * Scale a vector by a scalar.
 * @param vector - The multiplier.
 * @param scalar - The multiplicand.
 * @param out - The vector to store the result in.
 * @returns The product.
 * @public
 */
export const scale = <T extends Vector3Like>(
	vector: Vector3Like,
	scalar: number,
	out: T
): T =>
	fromValues(vector[0] * scalar, vector[1] * scalar, vector[2] * scalar, out);

/**
 * Add two vectors after scaling the second by a scalar.
 * @param a - The augend.
 * @param b - The addend.
 * @param scalar - The multiplicand.
 * @param out - The vector to store the result in.
 * @returns The sum.
 * @public
 */
export const scaleAndAdd = <T extends Vector3Like>(
	a: Vector3Like,
	b: Vector3Like,
	scalar: number,
	out: T
): T =>
	fromValues(
		a[0] + b[0] * scalar,
		a[1] + b[1] * scalar,
		a[2] + b[2] * scalar,
		out
	);

/**
 * Calculate the Euclidean distance between two vectors.
 * @param a - The first vector.
 * @param b - The second vector.
 * @returns The distance.
 * @see {@link https://en.wikipedia.org/wiki/Euclidean_distance | Euclidean distance}
 * @public
 */
export const distance = (a: Vector3Like, b: Vector3Like): number => {
	const x = b[0] - a[0];
	const y = b[1] - a[1];
	const z = b[2] - a[2];
	return Math.sqrt(x * x + y * y + z * z); // `Math.hypot` is slower.
};

/**
 * Calculate the squared Euclidean distance between this vector and another.
 * @param a - The first vector.
 * @param b - The second vector.
 * @returns The squared distance.
 * @see {@link https://en.wikipedia.org/wiki/Euclidean_distance | Euclidean distance}
 * @public
 */
export const squaredDistance = (a: Vector3Like, b: Vector3Like): number => {
	const x = b[0] - a[0];
	const y = b[1] - a[1];
	const z = b[2] - a[2];
	return x * x + y * y + z * z;
};

/**
 * Calculate the magnitude (length) of a vector.
 * @param vector - The vector.
 * @returns The magnitude.
 * @public
 */
export const getMagnitude = (vector: Vector3Like): number => {
	const x = vector[0];
	const y = vector[1];
	const z = vector[2];
	return Math.sqrt(x * x + y * y + z * z); // `Math.hypot` is slower.
};

/**
 * Calculate the squared magnitude (length) of a vector.
 * @param vector - The vector.
 * @returns The squared magnitude.
 * @public
 */
export const getSquaredMagnitude = (vector: Vector3Like): number => {
	const x = vector[0];
	const y = vector[1];
	const z = vector[2];
	return x * x + y * y + z * z;
};

/**
 * Negate a vector.
 * @param vector - The vector.
 * @param out - The vector to store the result in.
 * @returns The negated vector.
 * @public
 */
export const negate = <T extends Vector3Like>(vector: Vector3Like, out: T): T =>
	fromValues(-vector[0], -vector[1], -vector[2], out);

/**
 * Calculate the multiplicative inverse of the components of a vector.
 * @param vector - The vector.
 * @param out - The vector to store the result in.
 * @returns The inverted vector.
 * @public
 */
export const invert = <T extends Vector3Like>(vector: Vector3Like, out: T): T =>
	fromValues(1 / vector[0], 1 / vector[1], 1 / vector[2], out);

/**
 * Normalize a vector.
 * @param vector - The vector.
 * @param out - The vector to store the result in.
 * @returns The normalized vector.
 * @see {@link https://en.wikipedia.org/wiki/Unit_vector | Unit vector}
 * @public
 */
export const normalize = <T extends Vector3Like>(
	vector: Vector3Like,
	out: T
): T => {
	const x = vector[0];
	const y = vector[1];
	const z = vector[2];

	let len = x * x + y * y + z * z;
	if (len > 0) {
		len = 1 / Math.sqrt(len);
	}

	return fromValues(x * len, y * len, z * len, out);
};

/**
 * Calculate the dot product of two vectors.
 * @param a - The multiplier.
 * @param b - The multiplicand.
 * @returns The dot product.
 * @see {@link https://en.wikipedia.org/wiki/Dot_product | Dot product}
 * @public
 */
export const dot = (a: Vector3Like, b: Vector3Like): number =>
	a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

/**
 * Calculate the cross product of two vectors.
 * @param a - The multiplier.
 * @param b - The mutliplicand.
 * @param out - The vector to store the result in.
 * @returns The cross product.
 * @see {@link https://en.wikipedia.org/wiki/Cross_product | Cross product}
 * @public
 */
export const cross = <T extends Vector3Like>(
	a: Vector3Like,
	b: Vector3Like,
	out: T
): T => {
	const ax = a[0];
	const ay = a[1];
	const az = a[2];

	const bx = b[0];
	const by = b[1];
	const bz = b[2];

	return fromValues(
		ay * bz - az * by,
		az * bx - ax * bz,
		ax * by - ay * bx,
		out
	);
};

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
export const lerp = <T extends Vector3Like>(
	a: Vector3Like,
	b: Vector3Like,
	t: number,
	out: T
): T => {
	const ax = a[0];
	const ay = a[1];
	const az = a[2];

	return fromValues(
		ax + t * (b[0] - ax),
		ay + t * (b[1] - ay),
		az + t * (b[2] - az),
		out
	);
};

/**
 * Perform a spherical linear interpolation between two vectors.
 * @param a - The first vector.
 * @param b - The second vector.
 * @param t - The interpolation amount (in `[0,1]`).
 * @param out - The vector to store the result in.
 * @returns The interpolated vector.
 * @see {@link https://en.wikipedia.org/wiki/Slerp | Slerp}
 * @public
 */
export const slerp = <T extends Vector3Like>(
	a: Vector3Like,
	b: Vector3Like,
	t: number,
	out: T
): T => {
	const angle = Math.acos(Math.min(Math.max(dot(a, b), -1), 1));
	const s = Math.sin(angle);

	const ratioA = Math.sin((1 - t) * angle) / s;
	const ratioB = Math.sin(t * angle) / s;

	return fromValues(
		ratioA * a[0] + ratioB * b[0],
		ratioA * a[1] + ratioB * b[1],
		ratioA * a[2] + ratioB * b[2],
		out
	);
};

/**
 * Set a vector to a random value with the given magnitude.
 * @param magnitude - The magnitude.
 * @param out - The vector to store the result in.
 * @returns This vector.
 * @public
 */
export const random = <T extends Vector3Like>(magnitude: number, out: T): T => {
	const r = Math.random() * 2 * Math.PI;
	const z = Math.random() * 2 - 1;
	const zScale = Math.sqrt(1 - z * z) * magnitude;

	return fromValues(
		Math.cos(r) * zScale,
		Math.sin(r) * zScale,
		z * magnitude,
		out
	);
};

/**
 * Transform a vector by a three-by-three matrix.
 * @param vector - The vector (multiplier).
 * @param matrix - The matrix (multiplicand).
 * @param out - The vector to store the result in.
 * @returns The transformed vector.
 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
 * @public
 */
export const transformMatrix3 = <T extends Vector3Like>(
	vector: Vector3Like,
	matrix: Matrix3Like,
	out: T
): T => {
	const x = vector[0];
	const y = vector[1];
	const z = vector[2];

	return fromValues(
		x * matrix[0] + y * matrix[3] + z * matrix[6],
		x * matrix[1] + y * matrix[4] + z * matrix[7],
		x * matrix[2] + y * matrix[5] + z * matrix[8],
		out
	);
};

/**
 * Transform a vector by a four-by-four matrix.
 * @param vector - The vector (multiplier).
 * @param matrix - The matrix (multiplicand).
 * @param out - The vector to store the result in.
 * @returns The transformed vector.
 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
 * @public
 */
export const transformMatrix4 = <T extends Vector3Like>(
	vector: Vector3Like,
	matrix: Matrix4Like,
	out: T
): T => {
	const x = vector[0];
	const y = vector[1];
	const z = vector[2];
	const w = matrix[3] * x + matrix[7] * y + matrix[11] * z + matrix[15] || 1;

	return fromValues(
		(matrix[0] * x + matrix[4] * y + matrix[8] * z + matrix[12]) / w,
		(matrix[1] * x + matrix[5] * y + matrix[9] * z + matrix[13]) / w,
		(matrix[2] * x + matrix[6] * y + matrix[10] * z + matrix[14]) / w,
		out
	);
};

/**
 * Rotate a vector around the X-axis.
 * @param vector - The vector.
 * @param origin - The origin of the rotation.
 * @param r - The angle of rotation in radians.
 * @param out - The vector to store the result in.
 * @returns The rotated vector.
 * @public
 */
export const rotateX = <T extends Vector3Like>(
	vector: Vector3Like,
	origin: Vector3Like,
	r: number,
	out: T
): T => {
	const o1 = origin[1];
	const o2 = origin[2];

	const p1 = vector[1] - o1;
	const p2 = vector[2] - o2;

	const c = Math.cos(r);
	const s = Math.sin(r);

	return fromValues(vector[0], p1 * c - p2 * s + o1, p1 * s + p2 * c + o2, out);
};

/**
 * Rotate a vector around the Y-axis.
 * @param vector - The vector.
 * @param origin - The origin of the rotation.
 * @param r - The angle of rotation in radians.
 * @param out - The vector to store the result in.
 * @returns The rotated vector.
 * @public
 */
export const rotateY = <T extends Vector3Like>(
	vector: Vector3Like,
	origin: Vector3Like,
	r: number,
	out: T
): T => {
	const o0 = origin[0];
	const o2 = origin[2];

	const p0 = vector[0] - o0;
	const p2 = vector[2] - o2;

	const c = Math.cos(r);
	const s = Math.sin(r);

	return fromValues(p2 * s + p0 * c + o0, vector[1], p2 * c - p0 * s + o2, out);
};

/**
 * Rotate a vector around the Z-axis.
 * @param vector - The vector.
 * @param origin - The origin of the rotation.
 * @param r - The angle of rotation in radians.
 * @param out - The vector to store the result in.
 * @returns The rotated vector.
 * @public
 */
export const rotateZ = <T extends Vector3Like>(
	vector: Vector3Like,
	origin: Vector3Like,
	r: number,
	out: T
): T => {
	const o0 = origin[0];
	const o1 = origin[1];

	const p0 = vector[0] - o0;
	const p1 = vector[1] - o1;

	const c = Math.cos(r);
	const s = Math.sin(r);

	return fromValues(p0 * c - p1 * s + o0, p0 * s + p1 * c + o1, vector[2], out);
};

/**
 * Get the angle between two vectors in radians.
 * @param a - The first vector.
 * @param b - The second vector.
 * @returns The angular distance from the first vector to the second.
 * @public
 */
export const angle = (a: Vector3Like, b: Vector3Like): number => {
	const ax = a[0];
	const ay = a[1];
	const az = a[2];

	const bx = b[0];
	const by = b[1];
	const bz = b[2];

	// `Math.hypot` is slower.
	const mag =
		Math.sqrt(ax * ax + ay * ay + az * az) *
		Math.sqrt(bx * bx + by * by + bz * bz);

	return Math.acos(Math.min(Math.max(mag && dot(a, b) / mag, -1), 1));
};

/**
 * Set a vector to the zero vector.
 * @param out - The vector to store the result in.
 * @returns This vector.
 * @public
 */
export const zero = <T extends Vector3Like>(out: T): T =>
	fromValues(0, 0, 0, out);

/**
 * Perform a Hermite interpolation with two control points between two vectors.
 * @param a - The first vector.
 * @param b - The first control point.
 * @param c - The second control point.
 * @param d - The second vector.
 * @param t - The interpolation amount in the range `[0,1]`.
 * @param out - The vector to store the result in.
 * @returns The interpolated vector.
 * @see {@link https://en.wikipedia.org/wiki/Hermite_interpolation | Hermite interpolation}
 * @public
 */
export const hermite = <T extends Vector3Like>(
	a: Vector3Like,
	b: Vector3Like,
	c: Vector3Like,
	d: Vector3Like,
	t: number,
	out: T
): T => {
	const t2 = t * t;

	const f1 = t2 * (2 * t - 3) + 1;
	const f2 = t2 * (t - 2) + t;
	const f3 = t2 * (t - 1);
	const f4 = t2 * (3 - 2 * t);

	return fromValues(
		a[0] * f1 + b[0] * f2 + c[0] * f3 + d[0] * f4,
		a[1] * f1 + b[1] * f2 + c[1] * f3 + d[1] * f4,
		a[2] * f1 + b[2] * f2 + c[2] * f3 + d[2] * f4,
		out
	);
};

/**
 * Perform a Bézier interpolation with two control points between two vectors.
 * @param a - The first vector.
 * @param b - The first control point.
 * @param c - The second control point.
 * @param d - The second vector.
 * @param t - The interpolation amount in the range `[0,1]`.
 * @param out - The vector to store the result in.
 * @returns The interpolated vector.
 * @see {@link https://en.wikipedia.org/wiki/B%C3%A9zier_curve | Bézier curve}
 * @public
 */
export const bezier = <T extends Vector3Like>(
	a: Vector3Like,
	b: Vector3Like,
	c: Vector3Like,
	d: Vector3Like,
	t: number,
	out: T
): T => {
	const invf = 1 - t;
	const invf2 = invf * invf;
	const sqf = t * t;

	const f1 = invf2 * invf;
	const f2 = 3 * t * invf2;
	const f3 = 3 * sqf * invf;
	const f4 = sqf * t;

	return fromValues(
		a[0] * f1 + b[0] * f2 + c[0] * f3 + d[0] * f4,
		a[1] * f1 + b[1] * f2 + c[1] * f3 + d[1] * f4,
		a[2] * f1 + b[2] * f2 + c[2] * f3 + d[2] * f4,
		out
	);
};

/**
 * Transform a vector by a unit quaternion.
 * @param vector - The vector.
 * @param quaternion - The unit quaternion.
 * @param out - The vector to store the result in.
 * @returns The transformed vector.
 * @see {@link https://en.wikipedia.org/wiki/Quaternion | Quaternion}
 * @see {@link https://raw.org/proof/vector-rotation-using-quaternions/ | Fast Vector Rotation using Quaternions}
 * @public
 */
export const transformQuaternion = <T extends Vector3Like>(
	vector: Vector3Like,
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

	const tx = (qy * z - qz * y) * 2;
	const ty = (qz * x - qx * z) * 2;
	const tz = (qx * y - qy * x) * 2;

	return fromValues(
		x + qw * tx + qy * tz - qz * ty,
		y + qw * ty + qz * tx - qx * tz,
		z + qw * tz + qx * ty - qy * tx,
		out
	);
};

/**
 * A quantity with magnitude and direction in three dimensions.
 * @see {@link https://en.wikipedia.org/wiki/Euclidean_vector | Euclidean vector}
 * @public
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
	public static fromValues<T extends Vector3Like = Vector3>(
		x: number,
		y: number,
		z: number,
		out: T = new Vector3() as Vector3 & T
	): T {
		return fromValues(x, y, z, out);
	}

	/**
	 * Create a three-dimensional zero vector.
	 * @see {@link https://en.wikipedia.org/wiki/Euclidean_vector | Euclidean vector}
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
	public equals(vector: Vector3Like): boolean {
		return equals(this, vector);
	}

	/**
	 * Determine whether or not this vector is exactly equivalent to another.
	 * @param vector - The other vector.
	 * @returns Whether or not the vectors are equivalent.
	 */
	public exactEquals(vector: Vector3Like): boolean {
		return exactEquals(this, vector);
	}

	/**
	 * Add two vectors of the same size.
	 * @param vector - The other vector.
	 * @param out - The vector to store the result in.
	 * @returns The sum of the vectors.
	 */
	public add<T extends Vector3Like = Vector3>(
		vector: Vector3Like,
		out: T = new Vector3() as Vector3 & T
	): T {
		return add(this, vector, out);
	}

	/**
	 * Copy the values from this vector to another one.
	 * @param out - The vector to store the result in.
	 * @returns The copy.
	 */
	public clone<T extends Vector3Like = Vector3>(
		out: T = new Vector3() as Vector3 & T
	): T {
		return copy(this, out);
	}

	/**
	 * Copy the values of another vector into this one.
	 * @param vector - The vector to copy.
	 * @returns This vector.
	 */
	public copy(vector: Vector3Like): this {
		return copy(vector, this);
	}

	/**
	 * Multiply this vector by another.
	 * @param vector - The other vector.
	 * @param out - The vector to store the result in.
	 * @returns The product of the vectors.
	 */
	public multiply<T extends Vector3Like = Vector3>(
		vector: Vector3Like,
		out: T = new Vector3() as Vector3 & T
	): T {
		return multiply(this, vector, out);
	}

	/**
	 * Divide this vector by another.
	 * @param vector - The other vector.
	 * @param out - The vector to store the result in.
	 * @returns The quotient of the vectors.
	 */
	public divide<T extends Vector3Like = Vector3>(
		vector: Vector3Like,
		out: T = new Vector3() as Vector3 & T
	): T {
		return divide(this, vector, out);
	}

	/**
	 * Subtract another vector from this one.
	 * @param vector - The other vector.
	 * @param out - The vector to store the result in.
	 * @returns The difference between the vectors.
	 */
	public subtract<T extends Vector3Like = Vector3>(
		vector: Vector3Like,
		out: T = new Vector3() as Vector3 & T
	): T {
		return subtract(this, vector, out);
	}

	/**
	 * Absolutize the components of this vector.
	 * @param out - The vector to store the result in.
	 * @returns The absolutized vector.
	 */
	public abs<T extends Vector3Like = Vector3>(
		out: T = new Vector3() as Vector3 & T
	): T {
		return abs(this, out);
	}

	/**
	 * Round up the components of this vector.
	 * @param out - The vector to store the result in.
	 * @returns The rounded vector.
	 */
	public ceil<T extends Vector3Like = Vector3>(
		out: T = new Vector3() as Vector3 & T
	): T {
		return ceil(this, out);
	}

	/**
	 * Round down the components of this vector.
	 * @param out - The vector to store the result in.
	 * @returns The rounded vector.
	 */
	public floor<T extends Vector3Like = Vector3>(
		out: T = new Vector3() as Vector3 & T
	): T {
		return floor(this, out);
	}

	/**
	 * Round the components of this vector.
	 * @param out - The vector to store the result in.
	 * @returns The rounded vector.
	 */
	public round<T extends Vector3Like = Vector3>(
		out: T = new Vector3() as Vector3 & T
	): T {
		return round(this, out);
	}

	/**
	 * Return the minimum of this and another vector.
	 * @param vector - The other vector.
	 * @param out - The vector to store the result in.
	 * @returns The minimum.
	 */
	public min<T extends Vector3Like = Vector3>(
		vector: Vector3Like,
		out: T = new Vector3() as Vector3 & T
	): T {
		return min(this, vector, out);
	}

	/**
	 * Return the maximum of this and another vector.
	 * @param vector - The other vector.
	 * @param out - The vector to store the result in.
	 * @returns The maximum.
	 */
	public max<T extends Vector3Like = Vector3>(
		vector: Vector3Like,
		out: T = new Vector3() as Vector3 & T
	): T {
		return max(this, vector, out);
	}

	/**
	 * Scale this vector by a scalar.
	 * @param scalar - The scalar.
	 * @param out - The vector to store the result in.
	 * @returns The scaled vector.
	 */
	public scale<T extends Vector3Like = Vector3>(
		scalar: number,
		out: T = new Vector3() as Vector3 & T
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
	public scaleAndAdd<T extends Vector3Like = Vector3>(
		vector: Vector3Like,
		scalar: number,
		out: T = new Vector3() as Vector3 & T
	): T {
		return scaleAndAdd(this, vector, scalar, out);
	}

	/**
	 * Calculate the Euclidean distance between this vector and another.
	 * @param vector - The other vector.
	 * @returns The distance.
	 * @see {@link https://en.wikipedia.org/wiki/Euclidean_distance | Euclidean distance}
	 */
	public distance(vector: Vector3Like): number {
		return distance(this, vector);
	}

	/**
	 * Calculate the squared Euclidean distance between this vector and another.
	 * @param vector - The other vector.
	 * @returns The squared distance.
	 * @see {@link https://en.wikipedia.org/wiki/Euclidean_distance | Euclidean distance}
	 */
	public squaredDistance(vector: Vector3Like): number {
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
	public negate<T extends Vector3Like = Vector3>(
		out: T = new Vector3() as Vector3 & T
	): T {
		return negate(this, out);
	}

	/**
	 * Calculate the multiplicative inverse of the components of this vector.
	 * @param out - The vector to store the result in.
	 * @returns The inverted vector.
	 */
	public invert<T extends Vector3Like = Vector3>(
		out: T = new Vector3() as Vector3 & T
	): T {
		return invert(this, out);
	}

	/**
	 * Normalize this vector.
	 * @param out - The vector to store the result in.
	 * @returns The normalized vector.
	 * @see {@link https://en.wikipedia.org/wiki/Unit_vector | Unit vector}
	 */
	public normalize<T extends Vector3Like = Vector3>(
		out: T = new Vector3() as Vector3 & T
	): T {
		return normalize(this, out);
	}

	/**
	 * Calculate the dot product of this and another vector.
	 * @param vector - The other vector.
	 * @returns The dot product.
	 * @see {@link https://en.wikipedia.org/wiki/Dot_product | Dot product}
	 */
	public dot(vector: Vector3Like): number {
		return dot(this, vector);
	}

	/**
	 * Calculate the cross product of this and another vector.
	 * @param vector - The other vector.
	 * @param out - The vector to store the result in.
	 * @returns The cross product.
	 * @see {@link https://en.wikipedia.org/wiki/Cross_product | Cross product}
	 */
	public cross<T extends Vector3Like = Vector3>(
		vector: Vector3Like,
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
	 * @see {@link https://en.wikipedia.org/wiki/Linear_interpolation | Linear interpolation}
	 */
	public lerp<T extends Vector3Like = Vector3>(
		vector: Vector3Like,
		t: number,
		out: T = new Vector3() as Vector3 & T
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
	 * Transform this vector by a three-by-three matrix.
	 * @param matrix - The matrix.
	 * @param out - The vector to store the result in.
	 * @returns The transformed vector.
	 */
	public transformMatrix3<T extends Vector3Like = Vector3>(
		matrix: Matrix3Like,
		out: T = new Vector3() as Vector3 & T
	): T {
		return transformMatrix3(this, matrix, out);
	}

	/**
	 * Transform this vector by a four-by-four matrix.
	 * @param matrix - The matrix.
	 * @param out - The vector to store the result in.
	 * @returns The transformed vector.
	 */
	public transformMatrix4<T extends Vector3Like = Vector3>(
		matrix: Matrix4Like,
		out: T = new Vector3() as Vector3 & T
	): T {
		return transformMatrix4(this, matrix, out);
	}

	/**
	 * Rotate this vector around the X-axis.
	 * @param origin - The origin of the rotation.
	 * @param r - The angle of rotation in radians.
	 * @param out - The vector to store the result in.
	 * @returns The rotated vector.
	 */
	public rotateX<T extends Vector3Like = Vector3>(
		origin: Vector3Like,
		r: number,
		out: T = new Vector3() as Vector3 & T
	): T {
		return rotateX(this, origin, r, out);
	}

	/**
	 * Rotate this vector around the Y-axis.
	 * @param origin - The origin of the rotation.
	 * @param r - The angle of rotation in radians.
	 * @param out - The vector to store the result in.
	 * @returns The rotated vector.
	 */
	public rotateY<T extends Vector3Like = Vector3>(
		origin: Vector3Like,
		r: number,
		out: T = new Vector3() as Vector3 & T
	): T {
		return rotateY(this, origin, r, out);
	}

	/**
	 * Rotate this vector around the Z-axis.
	 * @param origin - The origin of the rotation.
	 * @param r - The angle of rotation in radians.
	 * @param out - The vector to store the result in.
	 * @returns The rotated vector.
	 */
	public rotateZ<T extends Vector3Like = Vector3>(
		origin: Vector3Like,
		r: number,
		out: T = new Vector3() as Vector3 & T
	): T {
		return rotateZ(this, origin, r, out);
	}

	/**
	 * Get the angle from this vector to another in radians.
	 * @param vector - The other vector.
	 * @returns The angular distance from this vector to the other.
	 */
	public angle(vector: Vector3Like): number {
		return angle(this, vector);
	}

	/**
	 * Set this to the zero vector.
	 * @returns This vector.
	 */
	public zero(): this {
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
	 * @see {@link https://en.wikipedia.org/wiki/Hermite_interpolation | Hermite interpolation}
	 */
	public hermite<T extends Vector3Like = Vector3>(
		a: Vector3Like,
		b: Vector3Like,
		end: Vector3Like,
		t: number,
		out: T = new Vector3() as Vector3 & T
	): T {
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
	 * @see {@link https://en.wikipedia.org/wiki/B%C3%A9zier_curve | Bézier curve}
	 */
	public bezier<T extends Vector3Like = Vector3>(
		a: Vector3Like,
		b: Vector3Like,
		end: Vector3Like,
		t: number,
		out: T = new Vector3() as Vector3 & T
	): T {
		return bezier(this, a, b, end, t, out);
	}

	/**
	 * Transform this vector by a quaternion.
	 * @param quaternion - The quaternion.
	 * @param out - The vector to store the result in.
	 * @returns The transformed vector.
	 * @see {@link https://en.wikipedia.org/wiki/Quaternion | Quaternion}
	 */
	public transformQuaternion<T extends Vector3Like = Vector3>(
		quaternion: QuaternionLike,
		out: T = new Vector3() as Vector3 & T
	): T {
		return transformQuaternion(this, quaternion, out);
	}
}
