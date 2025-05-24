import type { default as Vector, VectorLike } from "./Vector.js";
import type { Matrix4Like } from "./Matrix4.js";
import type { QuaternionLike } from "./Quaternion.js";
import approxRelative from "../algorithms/approxRelative.js";

/**
 * A quantity with magnitude and direction in four dimensions.
 * @public
 */
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
 * @public
 */
export const createVector4Like = (): Float32Array & Vector4Like => {
	return new Float32Array(4) as Float32Array & Vector4Like;
};

/**
 * Create a vector with the given values.
 * @param x - The first component.
 * @param y - The second component.
 * @param z - The third component.
 * @param w - The fourth component.
 * @param out - The vector to store the result in.
 * @returns A new vector.
 * @public
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
 * @public
 */
export const equals = (a: Vector4Like, b: Vector4Like): boolean =>
	approxRelative(a[0], b[0]) &&
	approxRelative(a[1], b[1]) &&
	approxRelative(a[2], b[2]) &&
	approxRelative(a[3], b[3]);

/**
 * Determine whether or not two vectors are exactly equivalent.
 * @param a - The first vector.
 * @param b - The second vector.
 * @returns Whether or not the vectors are equivalent.
 * @public
 */
export const exactEquals = (a: Vector4Like, b: Vector4Like): boolean =>
	a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];

/**
 * Add two vectors.
 * @param a - The augend.
 * @param b - The addend.
 * @param out - The vector to store the result in.
 * @returns The sum.
 * @public
 */
export const add = <T extends Vector4Like>(
	a: Vector4Like,
	b: Vector4Like,
	out: T
): T => fromValues(a[0] + b[0], a[1] + b[1], a[2] + b[2], a[3] + b[3], out);

/**
 * Copy the values from one vector to another.
 * @param vector - The vector to copy.
 * @param out - The vector to store the result in.
 * @returns The copy.
 * @public
 */
export const copy = <T extends Vector4Like>(vector: Vector4Like, out: T): T =>
	fromValues(vector[0], vector[1], vector[2], vector[3], out);

/**
 * Multiply two vectors.
 * @param a - The multiplier.
 * @param b - The multiplicand.
 * @param out - The vector to store the result in.
 * @returns The product.
 * @public
 */
export const multiply = <T extends Vector4Like>(
	a: Vector4Like,
	b: Vector4Like,
	out: T
): T => fromValues(a[0] * b[0], a[1] * b[1], a[2] * b[2], a[3] * b[3], out);

/**
 * Divide two vectors.
 * @param a - The dividend.
 * @param b - The divisor.
 * @param out - The vector to store the result in.
 * @returns The quotient.
 * @public
 */
export const divide = <T extends Vector4Like>(
	a: Vector4Like,
	b: Vector4Like,
	out: T
): T => fromValues(a[0] / b[0], a[1] / b[1], a[2] / b[2], a[3] / b[3], out);

/**
 * Subtract two vectors.
 * @param a - The minuend.
 * @param b - The subtrahend.
 * @param out - The vector to store the result in.
 * @returns The difference.
 * @public
 */
export const subtract = <T extends Vector4Like>(
	a: Vector4Like,
	b: Vector4Like,
	out: T
): T => fromValues(a[0] - b[0], a[1] - b[1], a[2] - b[2], a[3] - b[3], out);

/**
 * Absolutize the components of a vector.
 * @param vector - The vector.
 * @param out - The vector to store the result in.
 * @returns The absolutized vector.
 * @public
 */
export const abs = <T extends Vector4Like>(vector: Vector4Like, out: T): T =>
	fromValues(
		Math.abs(vector[0]),
		Math.abs(vector[1]),
		Math.abs(vector[2]),
		Math.abs(vector[3]),
		out
	);

/**
 * Round up the components of a vector.
 * @param vector - The vector.
 * @param out - The vector to store the result in.
 * @returns The rounded vector.
 * @public
 */
export const ceil = <T extends Vector4Like>(vector: Vector4Like, out: T): T =>
	fromValues(
		Math.ceil(vector[0]),
		Math.ceil(vector[1]),
		Math.ceil(vector[2]),
		Math.ceil(vector[3]),
		out
	);

/**
 * Round down the components of a vector.
 * @param vector - The vector.
 * @param out - The vector to store the result in.
 * @returns The rounded vector.
 * @public
 */
export const floor = <T extends Vector4Like>(vector: Vector4Like, out: T): T =>
	fromValues(
		Math.floor(vector[0]),
		Math.floor(vector[1]),
		Math.floor(vector[2]),
		Math.floor(vector[3]),
		out
	);

/**
 * Round the components of a vector.
 * @param vector - The vector.
 * @param out - The vector to store the result in.
 * @returns The rounded vector.
 * @public
 */
export const round = <T extends Vector4Like>(vector: Vector4Like, out: T): T =>
	fromValues(
		Math.round(vector[0]),
		Math.round(vector[1]),
		Math.round(vector[2]),
		Math.round(vector[3]),
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
export const min = <T extends Vector4Like>(
	a: Vector4Like,
	b: Vector4Like,
	out: T
): T =>
	fromValues(
		Math.min(a[0], b[0]),
		Math.min(a[1], b[1]),
		Math.min(a[2], b[2]),
		Math.min(a[3], b[3]),
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
export const max = <T extends Vector4Like>(
	a: Vector4Like,
	b: Vector4Like,
	out: T
): T =>
	fromValues(
		Math.max(a[0], b[0]),
		Math.max(a[1], b[1]),
		Math.max(a[2], b[2]),
		Math.max(a[3], b[3]),
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
export const scale = <T extends Vector4Like>(
	vector: Vector4Like,
	scalar: number,
	out: T
): T =>
	fromValues(
		vector[0] * scalar,
		vector[1] * scalar,
		vector[2] * scalar,
		vector[3] * scalar,
		out
	);

/**
 * Add two vectors after scaling the second by a scalar.
 * @param a - The augend.
 * @param b - The addend.
 * @param scalar - The multiplicand.
 * @param out - The vector to store the result in.
 * @returns The sum.
 * @public
 */
export const scaleAndAdd = <T extends Vector4Like>(
	a: Vector4Like,
	b: Vector4Like,
	scalar: number,
	out: T
): T =>
	fromValues(
		a[0] + b[0] * scalar,
		a[1] + b[1] * scalar,
		a[2] + b[2] * scalar,
		a[3] + b[3] * scalar,
		out
	);

/**
 * Calculate the Euclidean distance between two vectors.
 * @param a - The first vector
 * @param b - The second vector.
 * @returns The distance.
 * @see {@link https://en.wikipedia.org/wiki/Euclidean_distance | Euclidean distance}
 * @public
 */
export const distance = (a: Vector4Like, b: Vector4Like): number => {
	const x = a[0] - b[0];
	const y = a[1] - b[1];
	const z = a[2] - b[2];
	const w = a[3] - b[3];
	return Math.sqrt(x * x + y * y + z * z + w * w); // `Math.hypot` is slower.
};

/**
 * Calculate the squared Euclidean distance between two vectors.
 * @param a - The first vector.
 * @param b - The second vector.
 * @returns The squared distance.
 * @see {@link https://en.wikipedia.org/wiki/Euclidean_distance | Euclidean distance}
 * @public
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
 * @public
 */
export const getMagnitude = (vector: Vector4Like): number => {
	const x = vector[0];
	const y = vector[1];
	const z = vector[2];
	const w = vector[3];
	return Math.sqrt(x * x + y * y + z * z + w * w); // `Math.hypot` is slower.
};

/**
 * Calculate the squared magnitude (length) of a vector.
 * @param vector - The vector.
 * @returns The magnitude.
 * @public
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
 * @public
 */
export const negate = <T extends Vector4Like>(vector: Vector4Like, out: T): T =>
	fromValues(-vector[0], -vector[1], -vector[2], -vector[3], out);

/**
 * Calculate the multiplicative inverse of the components of a vector.
 * @param vector - The vector.
 * @param out - The vector to store the result in.
 * @returns The inverted vector.
 * @public
 */
export const invert = <T extends Vector4Like>(vector: Vector4Like, out: T): T =>
	fromValues(1 / vector[0], 1 / vector[1], 1 / vector[2], 1 / vector[3], out);

/**
 * Normalize a vector.
 * @param vector - The vector.
 * @param out - The vector to store the result in.
 * @returns The normalized vector.
 * @see {@link https://en.wikipedia.org/wiki/Unit_vector | Unit vector}
 * @public
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

	return fromValues(x * len, y * len, z * len, w * len, out);
};

/**
 * Calculate the dot product of two vectors.
 * @param a - The multiplier.
 * @param b - The multiplicand.
 * @returns The dot product.
 * @see {@link https://en.wikipedia.org/wiki/Dot_product | Dot product}
 * @public
 */
export const dot = (a: Vector4Like, b: Vector4Like): number =>
	a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];

/**
 * Calculate the cross product of three vectors in a four-dimensional space.
 * @param a - The first vector.
 * @param b - The second vector.
 * @param c - The third vector.
 * @param out - The vector to store the result in.
 * @returns The cross product.
 * @see {@link https://en.wikipedia.org/wiki/Cross_product | Cross product}
 * @public
 */
export const cross = <T extends Vector4Like>(
	a: Vector4Like,
	b: Vector4Like,
	c: Vector4Like,
	out: T
): T => {
	const a0 = a[0];
	const a1 = a[1];
	const a2 = a[2];
	const a3 = a[3];

	const b0 = b[0];
	const b1 = b[1];
	const b2 = b[2];
	const b3 = b[3];

	const c0 = c[0];
	const c1 = c[1];
	const c2 = c[2];
	const c3 = c[3];

	const d = b0 * c1 - b1 * c0;
	const e = b0 * c2 - b2 * c0;
	const f = b0 * c3 - b3 * c0;
	const g = b1 * c2 - b2 * c1;
	const h = b1 * c3 - b3 * c1;
	const i = b2 * c3 - b3 * c2;

	return fromValues(
		a1 * i - a2 * h + a3 * g,
		-(a0 * i) + a2 * f - a3 * e,
		a0 * h - a1 * f + a3 * d,
		-(a0 * g) + a1 * e - a2 * d,
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

	return fromValues(
		ax + t * (b[0] - ax),
		ay + t * (b[1] - ay),
		az + t * (b[2] - az),
		aw + t * (b[3] - aw),
		out
	);
};

/**
 * Set this vector to a random value with the given magnitude.
 * @param magnitude - The magnitude.
 * @param out - The vector to store the result in.
 * @returns This vector.
 * @see {@link https://github.com/toji/gl-matrix/pull/458 | toji/gl-matrix#458}
 * @public
 */
export const random = <T extends Vector4Like>(magnitude: number, out: T): T => {
	const a = Math.random();
	const v1 = a * 2 - 1;
	const v2 = (4 * Math.random() - 2) * Math.sqrt(a * -a + a);

	const b = Math.random();
	const v3 = b * 2 - 1;
	const v4 = (4 * Math.random() - 2) * Math.sqrt(b * -b + b);

	const d = Math.sqrt((1 - (v1 * v1 + v2 * v2)) / (v3 * v3 + v4 * v4));

	return fromValues(
		magnitude * v1,
		magnitude * v2,
		magnitude * v3 * d,
		magnitude * v4 * d,
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
export const transformMatrix4 = <T extends Vector4Like>(
	vector: Vector4Like,
	matrix: Matrix4Like,
	out: T
): T => {
	const x = vector[0];
	const y = vector[1];
	const z = vector[2];
	const w = vector[3];

	return fromValues(
		matrix[0] * x + matrix[4] * y + matrix[8] * z + matrix[12] * w,
		matrix[1] * x + matrix[5] * y + matrix[9] * z + matrix[13] * w,
		matrix[2] * x + matrix[6] * y + matrix[10] * z + matrix[14] * w,
		matrix[3] * x + matrix[7] * y + matrix[11] * z + matrix[15] * w,
		out
	);
};

/**
 * Set a vector to the zero vector.
 * @param out - The vector to store the result in.
 * @returns This vector.
 * @public
 */
export const zero = <T extends Vector4Like>(out: T): T =>
	fromValues(0, 0, 0, 0, out);

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

	const tx = (qy * z - qz * y) * 2;
	const ty = (qz * x - qx * z) * 2;
	const tz = (qx * y - qy * x) * 2;

	return fromValues(
		x + qw * tx + qy * tz - qz * ty,
		y + qw * ty + qz * tx - qx * tz,
		z + qw * tz + qx * ty - qy * tx,
		vector[3],
		out
	);
};

/**
 * A quantity with magnitude and direction in four dimensions.
 * @see {@link https://en.wikipedia.org/wiki/Euclidean_vector | Euclidean vector}
 * @public
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
	public static fromValues<T extends Vector4Like = Vector4>(
		x: number,
		y: number,
		z: number,
		w: number,
		out: T = new Vector4() as Vector4 & T
	): T {
		return fromValues(x, y, z, w, out);
	}

	/**
	 * Create a four-dimensional zero vector.
	 * @see {@link https://en.wikipedia.org/wiki/Euclidean_vector | Euclidean vector}
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
	public add<T extends Vector4Like = Vector4>(
		vector: Vector4Like,
		out: T = new Vector4() as Vector4 & T
	): T {
		return add(this, vector, out);
	}

	/**
	 * Copy the values from this vector to another one.
	 * @param out - The vector to store the result in.
	 * @returns The copy.
	 */
	public clone<T extends Vector4Like = Vector4>(
		out: T = new Vector4() as Vector4 & T
	): T {
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
	public multiply<T extends Vector4Like = Vector4>(
		vector: Vector4Like,
		out: T = new Vector4() as Vector4 & T
	): T {
		return multiply(this, vector, out);
	}

	/**
	 * Divide this vector by another.
	 * @param vector - The other vector.
	 * @param out - The vector to store the result in.
	 * @returns The quotient of the vectors.
	 */
	public divide<T extends Vector4Like = Vector4>(
		vector: Vector4Like,
		out: T = new Vector4() as Vector4 & T
	): T {
		return divide(this, vector, out);
	}

	/**
	 * Subtract another vector from this one.
	 * @param vector - The other vector.
	 * @param out - The vector to store the result in.
	 * @returns The difference between the vectors.
	 */
	public subtract<T extends Vector4Like = Vector4>(
		vector: Vector4Like,
		out: T = new Vector4() as Vector4 & T
	): T {
		return subtract(this, vector, out);
	}

	/**
	 * Absolutize the components of this vector.
	 * @param out - The vector to store the result in.
	 * @returns The absolutized vector.
	 */
	public abs<T extends Vector4Like = Vector4>(
		out: T = new Vector4() as Vector4 & T
	): T {
		return abs(this, out);
	}

	/**
	 * Round up the components of this vector.
	 * @param out - The vector to store the result in.
	 * @returns The rounded vector.
	 */
	public ceil<T extends Vector4Like = Vector4>(
		out: T = new Vector4() as Vector4 & T
	): T {
		return ceil(this, out);
	}

	/**
	 * Round down the components of this vector.
	 * @param out - The vector to store the result in.
	 * @returns The rounded vector.
	 */
	public floor<T extends Vector4Like = Vector4>(
		out: T = new Vector4() as Vector4 & T
	): T {
		return floor(this, out);
	}

	/**
	 * Round the components of this vector.
	 * @param out - The vector to store the result in.
	 * @returns The rounded vector.
	 */
	public round<T extends Vector4Like = Vector4>(
		out: T = new Vector4() as Vector4 & T
	): T {
		return round(this, out);
	}

	/**
	 * Return the minimum of this and another vector.
	 * @param vector - The other vector.
	 * @param out - The vector to store the result in.
	 * @returns The minimum.
	 */
	public min<T extends Vector4Like = Vector4>(
		vector: Vector4Like,
		out: T = new Vector4() as Vector4 & T
	): T {
		return min(this, vector, out);
	}

	/**
	 * Return the maximum of this and another vector.
	 * @param vector - The other vector.
	 * @param out - The vector to store the result in.
	 * @returns The maximum.
	 */
	public max<T extends Vector4Like = Vector4>(
		vector: Vector4Like,
		out: T = new Vector4() as Vector4 & T
	): T {
		return max(this, vector, out);
	}

	/**
	 * Scale this vector by a scalar.
	 * @param scalar - The scalar.
	 * @param out - The vector to store the result in.
	 * @returns The scaled vector.
	 */
	public scale<T extends Vector4Like = Vector4>(
		scalar: number,
		out: T = new Vector4() as Vector4 & T
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
	public scaleAndAdd<T extends Vector4Like = Vector4>(
		vector: Vector4Like,
		scalar: number,
		out: T = new Vector4() as Vector4 & T
	): T {
		return scaleAndAdd(this, vector, scalar, out);
	}

	/**
	 * Calculate the Euclidean distance between this vector and another.
	 * @param vector - The other vector.
	 * @returns The distance.
	 * @see {@link https://en.wikipedia.org/wiki/Euclidean_distance | Euclidean distance}
	 */
	public distance(vector: Vector4Like): number {
		return distance(this, vector);
	}

	/**
	 * Calculate the squared Euclidean distance between this vector and another.
	 * @param vector - The other vector.
	 * @returns The squared distance.
	 * @see {@link https://en.wikipedia.org/wiki/Euclidean_distance | Euclidean distance}
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
	public negate<T extends Vector4Like = Vector4>(
		out: T = new Vector4() as Vector4 & T
	): T {
		return negate(this, out);
	}

	/**
	 * Calculate the multiplicative inverse of the components of this vector.
	 * @param out - The vector to store the result in.
	 * @returns The inverted vector.
	 */
	public invert<T extends Vector4Like = Vector4>(
		out: T = new Vector4() as Vector4 & T
	): T {
		return invert(this, out);
	}

	/**
	 * Normalize this vector.
	 * @param out - The vector to store the result in.
	 * @returns The normalized vector.
	 * @see {@link https://en.wikipedia.org/wiki/Unit_vector | Unit vector}
	 */
	public normalize<T extends Vector4Like = Vector4>(
		out: T = new Vector4() as Vector4 & T
	): T {
		return normalize(this, out);
	}

	/**
	 * Calculate the dot product of this and another vector.
	 * @param vector - The other vector.
	 * @returns The dot product.
	 * @see {@link https://en.wikipedia.org/wiki/Dot_product | Dot product}
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
	 * @see {@link https://en.wikipedia.org/wiki/Cross_product | Cross product}
	 */
	public cross<T extends Vector4Like = Vector4>(
		a: Vector4Like,
		b: Vector4Like,
		out: T = new Vector4() as Vector4 & T
	): T {
		return cross(this, a, b, out);
	}

	/**
	 * Perform a linear interpolation between this and another vector.
	 * @param vector - The other vector.
	 * @param t - The interpolation amount (in `[0,1]`).
	 * @param out - The vector to store the result in.
	 * @returns The interpolated vector.
	 * @see {@link https://en.wikipedia.org/wiki/Linear_interpolation | Linear interpolation}
	 */
	public lerp<T extends Vector4Like = Vector4>(
		vector: Vector4Like,
		t: number,
		out: T = new Vector4() as Vector4 & T
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
	 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
	 */
	public transformMatrix4<T extends Vector4Like = Vector4>(
		matrix: Matrix4Like,
		out: T = new Vector4() as Vector4 & T
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
	 * @see {@link https://en.wikipedia.org/wiki/Quaternion | Quaternion}
	 */
	public transformQuaternion<T extends Vector4Like = Vector4>(
		quaternion: QuaternionLike,
		out: T = new Vector4() as Vector4 & T
	): T {
		return transformQuaternion(this, quaternion, out);
	}
}
