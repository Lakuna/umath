import { type Matrix3Like, createMatrix3Like } from "./Matrix3.js";
import {
	add,
	copy,
	dot,
	equals,
	exactEquals,
	fromValues,
	getMagnitude,
	getSquaredMagnitude,
	lerp,
	normalize,
	scale
} from "./Vector4.js";
import type AxisAngle from "../types/AxisAngle.js";
import type { Vector3Like } from "./Vector3.js";
import epsilon from "../utility/epsilon.js";

/** A complex number that is commonly used to describe rotations. */
export interface QuaternionLike extends Record<number, number> {
	/** The first component of this quaternion. */
	0: number;

	/** The second component of this quaternion. */
	1: number;

	/** The third component of this quaternion. */
	2: number;

	/** The fourth component of this quaternion. */
	3: number;
}

/**
 * Create a quaternion-like object.
 * @returns A quaternion-like object.
 */
export const createQuaternionLike = () => {
	return new Float32Array(4) as Float32Array & QuaternionLike;
};

/**
 * Create a quaternion from a three-by-three rotation matrix.
 * @param matrix - The matrix.
 * @param out - The quaternion to store the result in.
 * @returns The quaternion.
 * @see [Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix)
 */
export const fromMatrix3 = <T extends QuaternionLike>(
	matrix: Matrix3Like,
	out: T
): T => {
	const fTrace = matrix[0] + matrix[4] + matrix[8];
	if (fTrace > 0) {
		let fRoot = Math.sqrt(fTrace + 1);
		out[3] = 0.5 * fRoot;
		fRoot = 0.5 / fRoot;
		out[0] = (matrix[5] - matrix[7]) * fRoot;
		out[1] = (matrix[6] - matrix[2]) * fRoot;
		out[2] = (matrix[1] - matrix[3]) * fRoot;
		return out;
	}

	let i = 0 as 0 | 1 | 2;
	if (matrix[4] > matrix[0]) {
		i = 1;
	}
	if (matrix[8] > matrix[(i * 3 + i) as 0 | 4]) {
		i = 2;
	}
	const j = ((i + 1) % 3) as 1 | 2 | 0;
	const k = ((i + 2) % 3) as 2 | 0 | 1;

	let fRoot: number = Math.sqrt(
		matrix[(i * 3 + i) as 0 | 4 | 7] -
			matrix[(j * 3 + j) as 4 | 7 | 0] -
			matrix[(k * 3 + k) as 7 | 0 | 4] +
			1
	);
	out[i] = 0.5 * fRoot;
	fRoot = 0.5 / fRoot;
	out[3] =
		(matrix[(j * 3 + k) as 5 | 6 | 1] - matrix[(k * 3 + j) as 7 | 2 | 3]) *
		fRoot;
	out[j] =
		(matrix[(j * 3 + i) as 3 | 7 | 2] + matrix[(i * 3 + j) as 1 | 5 | 6]) *
		fRoot;
	out[k] =
		(matrix[(k * 3 + i) as 6 | 1 | 5] + matrix[(i * 3 + k) as 2 | 3 | 7]) *
		fRoot;
	return out;
};

/**
 * Create a quaternion from equivalent X-Y-Z Tait-Bryan angles
 * @param x - The X angle.
 * @param y - The Y angle.
 * @param z - The Z angle.
 * @param out - The quaternion to store the result in.
 * @returns The quaternion.
 * @see [Euler angles](https://en.wikipedia.org/wiki/Euler_angles)
 */
export const fromEuler = <T extends QuaternionLike>(
	x: number,
	y: number,
	z: number,
	out: T
): T => {
	const r = (0.5 * Math.PI) / 180;

	const x2 = x * r;
	const y2 = y * r;
	const z2 = z * r;

	const sx = Math.sin(x2);
	const cx = Math.cos(x2);
	const sy = Math.sin(y2);
	const cy = Math.cos(y2);
	const sz = Math.sin(z2);
	const cz = Math.cos(z2);

	out[0] = sx * cy * cz - cx * sy * sz;
	out[1] = cx * sy * cz + sx * cy * sz;
	out[2] = cx * cy * sz - sx * sy * cz;
	out[3] = cx * cy * cz + sx * sy * sz;
	return out;
};

// Stores intermediary values for some functions.
const intermediary = createMatrix3Like();

/**
 * Create a quaternion with values corresponding to the given orthonormal set of vectors.
 * @param view - The vector representing the viewing direction.
 * @param right - The vector representing the local "right" direction.
 * @param up - The vector representing the local "up" direction.
 * @param out - The quaternion to store the result in.
 * @returns The quaternion.
 */
export const fromAxes = <T extends QuaternionLike>(
	view: Vector3Like,
	right: Vector3Like,
	up: Vector3Like,
	out: T
): T => {
	intermediary[0] = right[0];
	intermediary[3] = right[1];
	intermediary[6] = right[2];
	intermediary[1] = up[0];
	intermediary[4] = up[1];
	intermediary[7] = up[2];
	intermediary[2] = -view[0];
	intermediary[5] = -view[1];
	intermediary[8] = -view[2];
	return normalize(fromMatrix3(intermediary, out), out);
};

/**
 * Set a quaternion to the identity.
 * @param out - The quaternion to store the result in.
 * @returns This quaternion.
 */
export const identity = <T extends QuaternionLike>(out: T): T => {
	out[0] = 0;
	out[1] = 0;
	out[2] = 0;
	out[3] = 1;
	return out;
};

/**
 * Calculate the axis and angle that represent a quaternion.
 * @param quaternion - The quaternion.
 * @param out - The axis and angle to store the result in.
 * @returns The axis and angle.
 */
export const getAxisAngle = <T extends AxisAngle>(
	quaternion: QuaternionLike,
	out: T
): T => {
	const r = Math.acos(quaternion[3]) * 2;
	const s = Math.sin(r / 2);

	out.axis =
		s > epsilon
			? [quaternion[0] / s, quaternion[1] / s, quaternion[2] / s]
			: [1, 0, 0];
	out.angle = r;
	return out;
};

/**
 * Set the axis and angle that represent a quaternion.
 * @param axisAngle - The axis and angle.
 * @param out - The quaternion to store the result in.
 * @returns The quaternion.
 */
export const setAxisAngle = <T extends QuaternionLike>(
	axisAngle: AxisAngle,
	out: T
): T => {
	const r = axisAngle.angle * 0.5;
	const s = Math.sin(r);

	out[0] = s * axisAngle.axis[0];
	out[1] = s * axisAngle.axis[1];
	out[2] = s * axisAngle.axis[2];
	out[3] = Math.cos(r);
	return out;
};

/**
 * Get the angular distance between two unit quaternions.
 * @param a - The first unit quaternion.
 * @param b - The second unit quaternion.
 * @returns The angular distance in radians.
 */
export const getAngle = (a: QuaternionLike, b: QuaternionLike): number => {
	const dp = dot(a, b);
	return Math.acos(2 * dp * dp - 1);
};

/**
 * Multiply two quaternions.
 * @param a - The multiplier.
 * @param b - The multiplicand.
 * @param out - The quaternion to store the result in.
 * @returns The product.
 */
export const multiply = <T extends QuaternionLike>(
	a: QuaternionLike,
	b: QuaternionLike,
	out: T
): T => {
	const ax = a[0];
	const ay = a[1];
	const az = a[2];
	const aw = a[3];

	const bx = b[0];
	const by = b[1];
	const bz = b[2];
	const bw = b[3];

	out[0] = ax * bw + aw * bx + ay * bz - az * by;
	out[1] = ay * bw + aw * by + az * bx - ax * bz;
	out[2] = az * bw + aw * bz + ax * by - ay * bx;
	out[3] = aw * bw - ax * bx - ay * by - az * bz;
	return out;
};

/**
 * Rotate a quaternion by the given angle around the X-axis.
 * @param quaternion - The quaternion.
 * @param radians - The angle in radians.
 * @param out - The quaternion to store the result in.
 * @returns The rotated quaternion.
 */
export const rotateX = <T extends QuaternionLike>(
	quaternion: QuaternionLike,
	radians: number,
	out: T
): T => {
	const r = radians * 0.5;

	const ax = quaternion[0];
	const ay = quaternion[1];
	const az = quaternion[2];
	const aw = quaternion[3];

	const bx = Math.sin(r);
	const bw = Math.cos(r);

	out[0] = ax * bw + aw * bx;
	out[1] = ay * bw + az * bx;
	out[2] = az * bw - ay * bx;
	out[3] = aw * bw - ax * bx;
	return out;
};

/**
 * Rotate a quaternion by the given angle around the Y-axis.
 * @param quaternion - The quaternion.
 * @param radians - The angle in radians.
 * @param out - The quaternion to store the result in.
 * @returns The rotated quaternion.
 */
export const rotateY = <T extends QuaternionLike>(
	quaternion: QuaternionLike,
	radians: number,
	out: T
): T => {
	const r = radians * 0.5;

	const ax = quaternion[0];
	const ay = quaternion[1];
	const az = quaternion[2];
	const aw = quaternion[3];

	const by = Math.sin(r);
	const bw = Math.cos(r);

	out[0] = ax * bw - az * by;
	out[1] = ay * bw + aw * by;
	out[2] = az * bw + ax * by;
	out[3] = aw * bw - ay * by;
	return out;
};

/**
 * Rotate a quaternion by the given angle around the Z-axis.
 * @param quaternion - The quaternion.
 * @param radians - The angle in radians.
 * @param out - The quaternion to store the result in.
 * @returns The rotated quaternion.
 */
export const rotateZ = <T extends QuaternionLike>(
	quaternion: QuaternionLike,
	radians: number,
	out: T
): T => {
	const r = radians * 0.5;

	const ax = quaternion[0];
	const ay = quaternion[1];
	const az = quaternion[2];
	const aw = quaternion[3];

	const bz = Math.sin(r);
	const bw = Math.cos(r);

	out[0] = ax * bw + ay * bz;
	out[1] = ay * bw - ax * bz;
	out[2] = az * bw + aw * bz;
	out[3] = aw * bw - az * bz;
	return out;
};

/**
 * Calculate the fourth component of a unit quaternion from the first three, ignoring the existing fourth component.
 * @param quaternion - The quaternion.
 * @param out - The quaternion to store the result in.
 * @returns The quaternion.
 */
export const calculateW = <T extends QuaternionLike>(
	quaternion: QuaternionLike,
	out: T
): T => {
	const x = quaternion[0];
	const y = quaternion[1];
	const z = quaternion[2];

	out[0] = x;
	out[1] = y;
	out[2] = z;
	out[3] = Math.sqrt(Math.abs(1 - x * x - y * y - z * z));
	return out;
};

/**
 * Calculate the exponential of a unit quaternion.
 * @param quaternion - The quaternion.
 * @param out - The quaternion to store the result in.
 * @returns The exponential.
 */
export const exp = <T extends QuaternionLike>(
	quaternion: QuaternionLike,
	out: T
): T => {
	const x = quaternion[0];
	const y = quaternion[1];
	const z = quaternion[2];
	const w = quaternion[3];

	const r = Math.sqrt(x * x + y * y + z * z);
	const et = Math.exp(w);
	const s = r > 0 ? (et * Math.sin(r)) / r : 0;

	out[0] = x * s;
	out[1] = y * s;
	out[2] = z * s;
	out[3] = et * Math.cos(r);
	return out;
};

/**
 * Calculate the natural logarithm of a unit quaternion.
 * @param quaternion - The quaternion.
 * @param out - The quaternion to store the result in.
 * @returns The natural logarithm.
 */
export const ln = <T extends QuaternionLike>(
	quaternion: QuaternionLike,
	out: T
): T => {
	const x = quaternion[0];
	const y = quaternion[1];
	const z = quaternion[2];
	const w = quaternion[3];

	const r = Math.sqrt(x * x + y * y + z * z);
	const t = r > 0 ? Math.atan2(r, w) / r : 0;

	out[0] = x * t;
	out[1] = y * t;
	out[2] = z * t;
	out[3] = 0.5 * Math.log(x * x + y * y + z * z + w * w);
	return out;
};

/**
 * Calculate a power of a unit quaternion.
 * @param quaternion - The quaternion.
 * @param scalar - The amount to scale the quaternion by.
 * @param out - The quaternion to store the result in.
 * @returns The power.
 */
export const pow = <T extends QuaternionLike>(
	quaternion: QuaternionLike,
	scalar: number,
	out: T
): T => {
	return exp(scale(ln(quaternion, out), scalar, out), out);
};

/**
 * Perform a spherical linear interpolation between two quaternions.
 * @param a - The first quaternion.
 * @param b - The second quaternion.
 * @param t - The interpolation amount in `[0,1]`.
 * @param out - The quaternion to store the result in.
 * @returns The interpolated quaternion.
 * @see [Slerp](https://en.wikipedia.org/wiki/Slerp)
 */
export const slerp = <T extends QuaternionLike>(
	a: QuaternionLike,
	b: QuaternionLike,
	t: number,
	out: T
): T => {
	const ax = a[0];
	const ay = a[1];
	const az = a[2];
	const aw = a[3];

	let bx = b[0];
	let by = b[1];
	let bz = b[2];
	let bw = b[3];

	let cosom = ax * bx + ay * by + az * bz + aw * bw;
	if (cosom < 0) {
		cosom = -cosom;
		bx = -bx;
		by = -by;
		bz = -bz;
		bw = -bw;
	}

	// eslint-disable-next-line init-declarations
	let scale0;
	// eslint-disable-next-line init-declarations
	let scale1;
	if (1 - cosom > epsilon) {
		const omega = Math.acos(cosom);
		const sinom = Math.sin(omega);
		scale0 = Math.sin((1 - t) * omega) / sinom;
		scale1 = Math.sin(t * omega) / sinom;
	} else {
		// Close enough to do a linear interpolation.
		scale0 = 1 - t;
		scale1 = t;
	}

	out[0] = scale0 * ax + scale1 * bx;
	out[1] = scale0 * ay + scale1 * by;
	out[2] = scale0 * az + scale1 * bz;
	out[3] = scale0 * aw + scale1 * bw;
	return out;
};

/**
 * Set a quaternion to a random unit quaternion.
 * @param out - The quaternion to store the result in.
 * @returns The quaternion.
 */
export const random = <T extends QuaternionLike>(out: T): T => {
	const u1 = Math.random();
	const u2 = Math.random();
	const u3 = Math.random();

	const sqrt1MinusU1 = Math.sqrt(1 - u1);
	const sqrtU1 = Math.sqrt(u1);

	out[0] = sqrt1MinusU1 * Math.sin(2 * Math.PI * u2);
	out[1] = sqrt1MinusU1 * Math.cos(2 * Math.PI * u2);
	out[2] = sqrtU1 * Math.sin(2 * Math.PI * u3);
	out[3] = sqrtU1 * Math.cos(2 * Math.PI * u3);
	return out;
};

/**
 * Calculate the inverse of a quaternion. If the quaternion is normalized, the conjugate is the same but faster to calculate.
 * @param quaternion - The quaternion.
 * @param out - The quaternion to store the result in.
 * @returns The inverse.
 */
export const invert = <T extends QuaternionLike>(
	quaternion: QuaternionLike,
	out: T
): T => {
	const a0 = quaternion[0];
	const a1 = quaternion[1];
	const a2 = quaternion[2];
	const a3 = quaternion[3];

	const aDotA = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
	const invDot = aDotA ? 1 / aDotA : 0;

	if (aDotA === 0) {
		out[0] = 0;
		out[1] = 0;
		out[2] = 0;
		out[3] = 0;
		return out;
	}

	out[0] = -a0 * invDot;
	out[1] = -a1 * invDot;
	out[2] = -a2 * invDot;
	out[3] = a3 * invDot;
	return out;
};

/**
 * Calculate the conjugate of a quaternion. If the quaternion is normalized, this is the same as the inverse but faster to calculate.
 * @param quaternion - The quaternion.
 * @param out - The quaternion to store the result in.
 * @returns The conjugate.
 */
export const conjugate = <T extends QuaternionLike>(
	quaternion: QuaternionLike,
	out: T
): T => {
	out[0] = -quaternion[0];
	out[1] = -quaternion[1];
	out[2] = -quaternion[2];
	out[3] = quaternion[3];
	return out;
};

// Used to store intermediate values for some functions.
const controlPointOne = createQuaternionLike();
const controlPointTwo = createQuaternionLike();

/**
 * Perform a spherical linear interpolation with two control points between two quaternions.
 * @param a - The first quaternion.
 * @param b - The first control point.
 * @param c - The second control point.
 * @param d - The second quaternion.
 * @param t - The interpolation amount in `[0,1]`.
 * @param out - The quaternion to store the result in.
 * @returns The interpolated value.
 * @see [Slerp](https://en.wikipedia.org/wiki/Slerp)
 */
export const sqlerp = <T extends QuaternionLike>(
	a: QuaternionLike,
	b: QuaternionLike,
	c: QuaternionLike,
	d: QuaternionLike,
	t: number,
	out: T
): T => {
	slerp(a, d, t, controlPointOne);
	slerp(b, c, t, controlPointTwo);
	return slerp(controlPointOne, controlPointTwo, 2 * t * (1 - t), out);
};

/**
 * A complex number that is commonly used to describe rotations.
 * @see [Quaternion](https://en.wikipedia.org/wiki/Quaternion)
 */
export default class Quaternion extends Float32Array implements QuaternionLike {
	/**
	 * Create a quaternion from a three-by-three rotation matrix.
	 * @param matrix - The matrix.
	 * @param out - The quaternion to store the result in.
	 * @returns The quaternion.
	 * @see [Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix)
	 */
	public static fromMatrix3<T extends QuaternionLike>(
		matrix: Matrix3Like,
		out = new Quaternion() as Quaternion & T
	): T {
		return fromMatrix3(matrix, out);
	}

	/**
	 * Create a quaternion from equivalent x-y-z Tait-Bryan angles
	 * @param x - The x angle.
	 * @param y - The y angle.
	 * @param z - The z angle.
	 * @param out - The quaternion to store the result in.
	 * @returns The quaternion.
	 * @see [Euler angles](https://en.wikipedia.org/wiki/Euler_angles)
	 */
	public static fromEuler<T extends QuaternionLike>(
		x: number,
		y: number,
		z: number,
		out = new Quaternion() as Quaternion & T
	): T {
		return fromEuler(x, y, z, out);
	}

	/**
	 * Create a quaternion with the given values.
	 * @param x - The first component.
	 * @param y - The second component.
	 * @param z - The third component.
	 * @param w - The fourth component.
	 * @param out - The quaternion to store the result in.
	 * @returns A new quaternion.
	 */
	public static fromValues<T extends QuaternionLike>(
		x: number,
		y: number,
		z: number,
		w: number,
		out = new Quaternion() as Quaternion & T
	): T {
		return fromValues(x, y, z, w, out);
	}

	/**
	 * Create a quaternion with values corresponding to the given orthonormal set of vectors.
	 * @param view - The vector representing the viewing direction.
	 * @param right - The vector representing the local "right" direction.
	 * @param up - The vector representing the local "up" direction.
	 * @param out - The quaternion to store the result in.
	 * @returns The quaternion.
	 */
	public static fromAxes<T extends QuaternionLike>(
		view: Vector3Like,
		right: Vector3Like,
		up: Vector3Like,
		out = new Quaternion() as Quaternion & T
	): T {
		return fromAxes(view, right, up, out);
	}

	/**
	 * Create an identity quaternion.
	 * @see [Quaternion](https://en.wikipedia.org/wiki/Quaternion)
	 */
	public constructor() {
		super(4);
		this[3] = 1;
	}

	/** The first component of this quaternion. */
	public 0: number;

	/** The second component of this quaternion. */
	public 1: number;

	/** The third component of this quaternion. */
	public 2: number;

	/** The fourth component of this quaternion. */
	public 3: number;

	/**
	 * Set this quaternion to the identity.
	 * @returns This quaternion.
	 */
	public identity(): this {
		return identity(this);
	}

	/**
	 * Get the axis and angle that represent this quaternion.
	 * @param out - The axis and angle to store the result in.
	 * @returns The axis and angle.
	 */
	public getAxisAngle<T extends AxisAngle>(out = {} as T): T {
		return getAxisAngle(this, out);
	}

	/**
	 * Set the axis and angle that represent this quaternion.
	 * @param axisAngle - The axis and angle.
	 * @returns This quaternion.
	 */
	public setAxisAngle(axisAngle: AxisAngle): this {
		return setAxisAngle(axisAngle, this);
	}

	/**
	 * Get the angular distance between this unit quaternion and another.
	 * @param quaternion - The other unit quaternion.
	 * @returns The angular distance in radians.
	 */
	public getAngle(quaternion: QuaternionLike): number {
		return getAngle(this, quaternion);
	}

	/**
	 * Multiply this and another quaternion.
	 * @param quaternion - The other quaternion.
	 * @param out - The quaternion to store the result in.
	 * @returns The product.
	 */
	public multiply<T extends QuaternionLike>(
		quaternion: QuaternionLike,
		out = new Quaternion() as Quaternion & T
	): T {
		return multiply(this, quaternion, out);
	}

	/**
	 * Rotate this quaternion by the given angle around the X-axis.
	 * @param r - The angle in radians.
	 * @param out - The quaternion to store the result in.
	 * @returns The rotated quaternion.
	 */
	public rotateX<T extends QuaternionLike>(
		r: number,
		out = new Quaternion() as Quaternion & T
	): T {
		return rotateX(this, r, out);
	}

	/**
	 * Rotate this quaternion by the given angle around the Y-axis.
	 * @param r - The angle in radians.
	 * @param out - The quaternion to store the result in.
	 * @returns The rotated quaternion.
	 */
	public rotateY<T extends QuaternionLike>(
		r: number,
		out = new Quaternion() as Quaternion & T
	): T {
		return rotateY(this, r, out);
	}

	/**
	 * Rotate this quaternion by the given angle around the Z-axis.
	 * @param r - The angle in radians.
	 * @param out - The quaternion to store the result in.
	 * @returns The rotated quaternion.
	 */
	public rotateZ<T extends QuaternionLike>(
		r: number,
		out = new Quaternion() as Quaternion & T
	): T {
		return rotateZ(this, r, out);
	}

	/**
	 * Calculate the fourth component of this unit quaternion from the first three, ignoring the existing fourth component.
	 * @param out - The quaternion to store the result in.
	 * @returns The quaternion.
	 */
	public calculateW<T extends QuaternionLike>(
		out = new Quaternion() as Quaternion & T
	): T {
		return calculateW(this, out);
	}

	/**
	 * Calculate the exponential of this unit quaternion.
	 * @param out - The quaternion to store the result in.
	 * @returns The exponential.
	 */
	public exp<T extends QuaternionLike>(
		out = new Quaternion() as Quaternion & T
	): T {
		return exp(this, out);
	}

	/**
	 * Calculate the natural logarithm of this unit quaternion.
	 * @param out - The quaternion to store the result in.
	 * @returns The natural logarithm.
	 */
	public ln<T extends QuaternionLike>(
		out = new Quaternion() as Quaternion & T
	): T {
		return ln(this, out);
	}

	/**
	 * Calculate a power of this unit quaternion.
	 * @param scalar - The amount to scale the quaternion by.
	 * @param out - The quaternion to store the result in.
	 * @returns The power.
	 */
	public pow<T extends QuaternionLike>(
		scalar: number,
		out = new Quaternion() as Quaternion & T
	): T {
		return pow(this, scalar, out);
	}

	/**
	 * Perform a spherical linear interpolation between this and another quaternion.
	 * @param quaternion - The other quaternion.
	 * @param t - The interpolation amount in `[0,1]`.
	 * @param out - The quaternion to store the result in.
	 * @returns The interpolated quaternion.
	 * @see [Slerp](https://en.wikipedia.org/wiki/Slerp)
	 */
	public slerp<T extends QuaternionLike>(
		quaternion: QuaternionLike,
		t: number,
		out = new Quaternion() as Quaternion & T
	): T {
		return slerp(this, quaternion, t, out);
	}

	/**
	 * Set this to a random unit quaternion.
	 * @returns A random unit quaternion.
	 */
	public random(): this {
		return random(this);
	}

	/**
	 * Calculate the inverse of this quaternion. If the quaternion is normalized, the conjugate is the same but faster to calculate.
	 * @param out - The quaternion to store the result in.
	 * @returns The inverse.
	 */
	public invert<T extends QuaternionLike>(
		out = new Quaternion() as Quaternion & T
	): T {
		return invert(this, out);
	}

	/**
	 * Calculate the conjugate of this quaternion. If the quaternion is normalized, this is the same as the inverse but faster to calculate.
	 * @param out - The quaternion to store the result in.
	 * @returns The conjugate.
	 */
	public conjugate<T extends QuaternionLike>(
		out = new Quaternion() as Quaternion & T
	): T {
		return conjugate(this, out);
	}

	/**
	 * Copy the values from this quaternion to another one.
	 * @param out - The quaternion to store the result in.
	 * @returns The copy.
	 */
	public clone<T extends QuaternionLike>(
		out = new Quaternion() as Quaternion & T
	): T {
		return copy(this, out);
	}

	/**
	 * Copy the values of another quaternion into this one.
	 * @param quaternion - The quaternion to copy.
	 * @returns This quaternion.
	 */
	public copy(quaternion: QuaternionLike): this {
		return copy(quaternion, this);
	}

	/**
	 * Add two quaternions of the same size.
	 * @param quaternion - The other quaternion.
	 * @param out - The quaternion to store the result in.
	 * @returns The sum of the quaternions.
	 */
	public add<T extends QuaternionLike>(
		quaternion: QuaternionLike,
		out = new Quaternion() as Quaternion & T
	): T {
		return add(this, quaternion, out);
	}

	/**
	 * Scale this quaternion by a scalar.
	 * @param scalar - The scalar.
	 * @param out - The quaternion to store the result in.
	 * @returns The scaled quaternion.
	 */
	public scale<T extends QuaternionLike>(
		scalar: number,
		out = new Quaternion() as Quaternion & T
	): T {
		return scale(this, scalar, out);
	}

	/**
	 * Calculate the dot product of this and another quaternion.
	 * @param quaternion - The other quaternion.
	 * @returns The dot product.
	 */
	public dot(quaternion: QuaternionLike): number {
		return dot(this, quaternion);
	}

	/**
	 * Perform a linear interpolation between this and another quaternion.
	 * @param quaternion - The other quaternion.
	 * @param t - The interpolation amount (in `[0,1]`).
	 * @param out - The quaternion to store the result in.
	 * @returns The interpolated quaternion.
	 */
	public lerp<T extends QuaternionLike>(
		quaternion: QuaternionLike,
		t: number,
		out = new Quaternion() as Quaternion & T
	): T {
		return lerp(this, quaternion, t, out);
	}

	/** Get the magnitude (length) of this quaternion. */
	public get magnitude(): number {
		return getMagnitude(this);
	}

	/** Get the squared magnitude (length) of this quaternion. */
	public get squaredMagnitude(): number {
		return getSquaredMagnitude(this);
	}

	/**
	 * Normalize this quaternion.
	 * @param out - The quaternion to store the result in.
	 * @returns The normalized quaternion.
	 */
	public normalize<T extends QuaternionLike>(
		out = new Quaternion() as Quaternion & T
	): T {
		return normalize(this, out);
	}

	/**
	 * Determine whether or not this quaternion is roughly equivalent to another.
	 * @param quaternion - The other quaternion.
	 * @returns Whether or not the quaternions are equivalent.
	 */
	public equals(quaternion: QuaternionLike): boolean {
		return equals(this, quaternion);
	}

	/**
	 * Determine whether or not this quaternion is exactly equivalent to another.
	 * @param quaternion - The other quaternion.
	 * @returns Whether or not the quaternions are equivalent.
	 */
	public exactEquals(quaternion: QuaternionLike): boolean {
		return exactEquals(this, quaternion);
	}

	/**
	 * Perform a spherical linear interpolation with two control points between this and another quaternion.
	 * @param a - The first control point.
	 * @param b - The second control point.
	 * @param quaternion - The other quaternion.
	 * @param t - The interpolation amount in `[0,1]`.
	 * @param out - The quaternion to store the result in.
	 * @returns The interpolated value.
	 * @see [Slerp](https://en.wikipedia.org/wiki/Slerp)
	 */
	public sqlerp<T extends QuaternionLike>(
		a: QuaternionLike,
		b: QuaternionLike,
		quaternion: QuaternionLike,
		t: number,
		out = new Quaternion() as Quaternion & T
	): T {
		return sqlerp(this, a, b, quaternion, t, out);
	}
}
