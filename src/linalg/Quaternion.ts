import {
	type Matrix3Like,
	createMatrix3Like,
	fromValues as matrix3FromValues
} from "./Matrix3.js";
import {
	type Vector3Like,
	createVector3Like,
	cross as vector3Cross,
	dot as vector3Dot,
	fromValues as vector3FromValues,
	getMagnitude as vector3GetMagnitude,
	normalize as vector3Normalize
} from "./Vector3.js";
import {
	add as vector4Add,
	copy as vector4Copy,
	dot as vector4Dot,
	exactEquals as vector4ExactEquals,
	fromValues as vector4FromValues,
	getMagnitude as vector4GetMagnitude,
	getSquaredMagnitude as vector4GetSquaredMagnitude,
	lerp as vector4Lerp,
	normalize as vector4Normalize,
	scale as vector4Scale
} from "./Vector4.js";
import type AxisAngle from "../types/AxisAngle.js";
import epsilon from "../utility/epsilon.js";

/**
 * A complex number that is commonly used to describe rotations.
 * @see {@link https://en.wikipedia.org/wiki/Quaternion | Quaternion}
 * @public
 */
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
 * @public
 */
export const createQuaternionLike = (): Float32Array & QuaternionLike => {
	return new Float32Array(4) as Float32Array & QuaternionLike;
};

/**
 * Create a quaternion with the given values.
 * @param x - The first component.
 * @param y - The second component.
 * @param z - The third component.
 * @param w - The fourth component.
 * @param out - The quaternion to store the result in.
 * @returns A new quaternion.
 * @public
 */
export const fromValues: <T extends QuaternionLike>(
	x: number,
	y: number,
	z: number,
	w: number,
	out: T
) => T = vector4FromValues;

/**
 * Add two quaternions.
 * @param a - The first quaternion
 * @param b - The second quaternion.
 * @param out - The quaternion to store the result in.
 * @returns The sum of the quaternions.
 * @public
 */
export const add: <T extends QuaternionLike>(
	a: QuaternionLike,
	b: QuaternionLike,
	out: T
) => T = vector4Add;

/**
 * Copy the values from one quaternion to another.
 * @param quaternion - The quaternion to copy.
 * @param out - The quaternion to store the result in.
 * @returns The copy.
 * @public
 */
export const copy: <T extends QuaternionLike>(
	quaternion: QuaternionLike,
	out: T
) => T = vector4Copy;

/**
 * Calculate the dot product of two quaternions.
 * @param a - The first quaternion
 * @param b - The second quaternion.
 * @returns The dot product.
 * @public
 */
export const dot: (a: QuaternionLike, b: QuaternionLike) => number = vector4Dot;

/**
 * Determine whether or not two unit quaternions point in roughly the same direction.
 * @param a - The first unit quaternion.
 * @param b - The second unit quaternion.
 * @returns Whether or not the unit quaternions point in the same direction.
 * @public
 */
export const equals = (a: QuaternionLike, b: QuaternionLike): boolean =>
	Math.abs(dot(a, b)) >= 1 - epsilon;

/**
 * Determine whether or not two quaternions are exactly equivalent.
 * @param a - The first quaternion.
 * @param b - The second quaternion.
 * @returns Whether or not the quaternions are equivalent.
 * @public
 */
export const exactEquals: (a: QuaternionLike, b: QuaternionLike) => boolean =
	vector4ExactEquals;

/**
 * Calculate the magnitude (length) of a quaternion.
 * @param quaternion - The quaternion.
 * @returns The magnitude.
 * @public
 */
export const getMagnitude: (quaternion: QuaternionLike) => number =
	vector4GetMagnitude;

/**
 * Calculate the squared magnitude (length) of a quaternion.
 * @param quaternion - The quaternion.
 * @returns The squared magnitude.
 * @public
 */
export const getSquaredMagnitude: (quaternion: QuaternionLike) => number =
	vector4GetSquaredMagnitude;

/**
 * Perform a linear interpolation between two quaternions.
 * @param a - The first quaternion.
 * @param b - The second quaternion.
 * @param t - The interpolation amount (in `[0,1]`).
 * @param out - The quaternion to store the result in.
 * @returns The interpolated quaternion.
 * @see {@link https://en.wikipedia.org/wiki/Linear_interpolation | Linear interpolation}
 * @public
 */
export const lerp: <T extends QuaternionLike>(
	a: QuaternionLike,
	b: QuaternionLike,
	t: number,
	out: T
) => T = vector4Lerp;

/**
 * Normalize a quaternion.
 * @param quaternion - The quaternion.
 * @param out - The quaternion to store the result in.
 * @returns The normalized quaternion.
 * @public
 */
export const normalize: <T extends QuaternionLike>(
	vector: QuaternionLike,
	out: T
) => T = vector4Normalize;

/**
 * Scale a quaternion by a scalar.
 * @param quaternion - The multiplier.
 * @param scalar - The multiplicand.
 * @param out - The quaternion to store the result in.
 * @returns The product.
 * @public
 */
export const scale: <T extends QuaternionLike>(
	vector: QuaternionLike,
	scalar: number,
	out: T
) => T = vector4Scale;

/**
 * Create a quaternion from a three-by-three rotation matrix.
 * @param matrix - The matrix.
 * @param out - The quaternion to store the result in.
 * @returns The quaternion (not normalized).
 * @see {@link https://en.wikipedia.org/wiki/Rotation_matrix | Rotation matrix}
 * @see Ken Shoemake. Quaternion calculus and fast animation. SIGGRAPH Course Notes, 10:101-121, 1987.
 * @public
 */
export const fromMatrix3 = <T extends QuaternionLike>(
	matrix: Matrix3Like,
	out: T
): T => {
	const m0 = matrix[0];
	const m4 = matrix[4];
	const m8 = matrix[8];

	const fTrace = m0 + m4 + m8;
	if (fTrace > 0) {
		let fRoot = Math.sqrt(fTrace + 1);
		out[3] = fRoot / 2;
		fRoot = 0.5 / fRoot;
		out[0] = (matrix[5] - matrix[7]) * fRoot;
		out[1] = (matrix[6] - matrix[2]) * fRoot;
		out[2] = (matrix[1] - matrix[3]) * fRoot;
		return out;
	}

	let i = 0 as 0 | 1 | 2;
	if (m4 > m0) {
		i = 1;
	}
	if (m8 > matrix[(i * 3 + i) as 0 | 4]) {
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
	out[i] = fRoot / 2;
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

const ratio = Math.PI / 360;

/**
 * Create a quaternion from equivalent x-y'-z" (intrinsic) Tait-Bryan angles.
 * @param x - The X angle in degrees.
 * @param y - The Y angle in degrees.
 * @param z - The Z angle in degrees.
 * @param out - The quaternion to store the result in.
 * @returns The quaternion.
 * @see {@link https://en.wikipedia.org/wiki/Euler_angles | Euler angles}
 * @public
 */
export const fromEulerXyz = <T extends QuaternionLike>(
	x: number,
	y: number,
	z: number,
	out: T
): T => {
	const x2 = x * ratio;
	const y2 = y * ratio;
	const z2 = z * ratio;

	const sx = Math.sin(x2);
	const cx = Math.cos(x2);
	const sy = Math.sin(y2);
	const cy = Math.cos(y2);
	const sz = Math.sin(z2);
	const cz = Math.cos(z2);

	const sxcy = sx * cy;
	const cxsy = cx * sy;
	const cxcy = cx * cy;
	const sxsy = sx * sy;

	return fromValues(
		sxcy * cz - cxsy * sz,
		cxsy * cz + sxcy * sz,
		cxcy * sz - sxsy * cz,
		cxcy * cz + sxsy * sz,
		out
	);
};

/**
 * Create a quaternion from equivalent x-z'-y" (intrinsic) Tait-Bryan angles.
 * @param x - The X angle in degrees.
 * @param z - The Z angle in degrees.
 * @param y - The Y angle in degrees.
 * @param out - The quaternion to store the result in.
 * @returns The quaternion.
 * @see {@link https://en.wikipedia.org/wiki/Euler_angles | Euler angles}
 * @public
 */
export const fromEulerXzy = <T extends QuaternionLike>(
	x: number,
	z: number,
	y: number,
	out: T
): T => {
	const x2 = x * ratio;
	const y2 = y * ratio;
	const z2 = z * ratio;

	const sx = Math.sin(x2);
	const cx = Math.cos(x2);
	const sy = Math.sin(y2);
	const cy = Math.cos(y2);
	const sz = Math.sin(z2);
	const cz = Math.cos(z2);

	const sxcy = sx * cy;
	const cxsy = cx * sy;
	const cxcy = cx * cy;
	const sxsy = sx * sy;

	return fromValues(
		sxcy * cz - cxsy * sz,
		cxsy * cz - sxcy * sz,
		cxcy * sz + sxsy * cz,
		cxcy * cz + sxsy * sz,
		out
	);
};

/**
 * Create a quaternion from equivalent y-x'-z" (intrinsic) Tait-Bryan angles.
 * @param y - The Y angle in degrees.
 * @param x - The X angle in degrees.
 * @param z - The Z angle in degrees.
 * @param out - The quaternion to store the result in.
 * @returns The quaternion.
 * @see {@link https://en.wikipedia.org/wiki/Euler_angles | Euler angles}
 * @public
 */
export const fromEulerYxz = <T extends QuaternionLike>(
	y: number,
	x: number,
	z: number,
	out: T
): T => {
	const x2 = x * ratio;
	const y2 = y * ratio;
	const z2 = z * ratio;

	const sx = Math.sin(x2);
	const cx = Math.cos(x2);
	const sy = Math.sin(y2);
	const cy = Math.cos(y2);
	const sz = Math.sin(z2);
	const cz = Math.cos(z2);

	const sxcy = sx * cy;
	const cxsy = cx * sy;
	const cxcy = cx * cy;
	const sxsy = sx * sy;

	return fromValues(
		sxcy * cz + cxsy * sz,
		cxsy * cz - sxcy * sz,
		cxcy * sz - sxsy * cz,
		cxcy * cz + sxsy * sz,
		out
	);
};

/**
 * Create a quaternion from equivalent y-z'-x" (intrinsic) Tait-Bryan angles.
 * @param y - The Y angle in degrees.
 * @param z - The Z angle in degrees.
 * @param x - The X angle in degrees.
 * @param out - The quaternion to store the result in.
 * @returns The quaternion.
 * @see {@link https://en.wikipedia.org/wiki/Euler_angles | Euler angles}
 * @public
 */
export const fromEulerYzx = <T extends QuaternionLike>(
	y: number,
	z: number,
	x: number,
	out: T
): T => {
	const x2 = x * ratio;
	const y2 = y * ratio;
	const z2 = z * ratio;

	const sx = Math.sin(x2);
	const cx = Math.cos(x2);
	const sy = Math.sin(y2);
	const cy = Math.cos(y2);
	const sz = Math.sin(z2);
	const cz = Math.cos(z2);

	const sxcy = sx * cy;
	const cxsy = cx * sy;
	const cxcy = cx * cy;
	const sxsy = sx * sy;

	return fromValues(
		sxcy * cz + cxsy * sz,
		cxsy * cz + sxcy * sz,
		cxcy * sz - sxsy * cz,
		cxcy * cz - sxsy * sz,
		out
	);
};

/**
 * Create a quaternion from equivalent z-x'-y" (intrinsic) Tait-Bryan angles.
 * @param z - The Z angle in degrees.
 * @param x - The X angle in degrees.
 * @param y - The Y angle in degrees.
 * @param out - The quaternion to store the result in.
 * @returns The quaternion.
 * @see {@link https://en.wikipedia.org/wiki/Euler_angles | Euler angles}
 * @public
 */
export const fromEulerZxy = <T extends QuaternionLike>(
	z: number,
	x: number,
	y: number,
	out: T
): T => {
	const x2 = x * ratio;
	const y2 = y * ratio;
	const z2 = z * ratio;

	const sx = Math.sin(x2);
	const cx = Math.cos(x2);
	const sy = Math.sin(y2);
	const cy = Math.cos(y2);
	const sz = Math.sin(z2);
	const cz = Math.cos(z2);

	const sxcy = sx * cy;
	const cxsy = cx * sy;
	const cxcy = cx * cy;
	const sxsy = sx * sy;

	return fromValues(
		sxcy * cz - cxsy * sz,
		cxsy * cz + sxcy * sz,
		cxcy * sz + sxsy * cz,
		cxcy * cz - sxsy * sz,
		out
	);
};

/**
 * Create a quaternion from equivalent z-y'-x" (intrinsic) Tait-Bryan angles.
 * @param z - The Z angle (yaw) in degrees.
 * @param y - The Y angle (pitch) in degrees.
 * @param x - The X angle (roll) in degrees.
 * @param out - The quaternion to store the result in.
 * @returns The quaternion.
 * @see {@link https://en.wikipedia.org/wiki/Euler_angles | Euler angles}
 * @public
 */
export const fromEulerZyx = <T extends QuaternionLike>(
	z: number,
	y: number,
	x: number,
	out: T
): T => {
	const x2 = x * ratio;
	const y2 = y * ratio;
	const z2 = z * ratio;

	const sx = Math.sin(x2);
	const cx = Math.cos(x2);
	const sy = Math.sin(y2);
	const cy = Math.cos(y2);
	const sz = Math.sin(z2);
	const cz = Math.cos(z2);

	const sxcy = sx * cy;
	const cxsy = cx * sy;
	const cxcy = cx * cy;
	const sxsy = sx * sy;

	return fromValues(
		sxcy * cz - cxsy * sz,
		cxsy * cz + sxcy * sz,
		cxcy * sz - sxsy * cz,
		cxcy * cz + sxsy * sz,
		out
	);
};

/**
 * Create a quaternion from equivalent z-y'-x" (intrinsic) Tait-Bryan angles.
 * @param z - The Z angle (roll) in degrees.
 * @param y - The Y angle (pitch) in degrees.
 * @param x - The X angle (yaw) in degrees.
 * @param out - The quaternion to store the result in.
 * @returns The quaternion.
 * @see {@link https://en.wikipedia.org/wiki/Euler_angles | Euler angles}
 * @public
 */
export const fromEuler: <T extends QuaternionLike>(
	z: number,
	y: number,
	x: number,
	out: T
) => T = fromEulerZyx;

// Stores intermediary values for some functions.
const im3 = createMatrix3Like();

/**
 * Create a quaternion with values corresponding to the given orthonormal set of unit vectors.
 * @param view - The unit vector representing the viewing direction.
 * @param right - The unit vector representing the local "right" direction.
 * @param up - The unit vector representing the local "up" direction.
 * @param out - The quaternion to store the result in.
 * @returns The quaternion.
 * @public
 */
export const fromAxes = <T extends QuaternionLike>(
	view: Vector3Like,
	right: Vector3Like,
	up: Vector3Like,
	out: T
): T =>
	normalize(
		fromMatrix3(
			matrix3FromValues(
				right[0],
				up[0],
				-view[0],
				right[1],
				up[1],
				-view[1],
				right[2],
				up[2],
				-view[2],
				im3
			),
			out
		),
		out
	);

/**
 * Set a quaternion to the identity.
 * @param out - The quaternion to store the result in.
 * @returns This quaternion.
 * @public
 */
export const identity = <T extends QuaternionLike>(out: T): T =>
	fromValues(0, 0, 0, 1, out);

/**
 * Calculate the axis and angle that represent a quaternion.
 * @param quaternion - The quaternion.
 * @param out - The axis and angle to store the result in.
 * @returns The axis and angle.
 * @public
 */
export const getAxisAngle = <T extends AxisAngle>(
	quaternion: QuaternionLike,
	out: T
): T => {
	const r = Math.acos(quaternion[3]) * 2;
	const s = Math.sin(r / 2);

	// TODO: Does importing `vector3FromValues` make a circular dependency?
	if (s > epsilon) {
		vector3FromValues(
			quaternion[0] / s,
			quaternion[1] / s,
			quaternion[2] / s,
			out.axis
		);
	} else {
		vector3FromValues(1, 0, 0, out.axis);
	}

	out.angle = r;
	return out;
};

/**
 * Set the axis and angle that represent a quaternion.
 * @param axisAngle - The axis and angle.
 * @param out - The quaternion to store the result in.
 * @returns The quaternion.
 * @public
 */
export const setAxisAngle = <T extends QuaternionLike>(
	{ angle, axis }: AxisAngle,
	out: T
): T => {
	const r = angle / 2;
	const s = Math.sin(r);

	return fromValues(axis[0] * s, axis[1] * s, axis[2] * s, Math.cos(r), out);
};

/**
 * Get the angular distance between two unit quaternions.
 * @param a - The first unit quaternion.
 * @param b - The second unit quaternion.
 * @returns The angular distance in radians.
 * @public
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
 * @public
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

	return fromValues(
		ax * bw + aw * bx + ay * bz - az * by,
		ay * bw + aw * by + az * bx - ax * bz,
		az * bw + aw * bz + ax * by - ay * bx,
		aw * bw - ax * bx - ay * by - az * bz,
		out
	);
};

/**
 * Rotate a quaternion by the given angle around the X-axis.
 * @param quaternion - The quaternion.
 * @param radians - The angle in radians.
 * @param out - The quaternion to store the result in.
 * @returns The rotated quaternion.
 * @public
 */
export const rotateX = <T extends QuaternionLike>(
	quaternion: QuaternionLike,
	radians: number,
	out: T
): T => {
	const ax = quaternion[0];
	const ay = quaternion[1];
	const az = quaternion[2];
	const aw = quaternion[3];

	const r = radians / 2;
	const s = Math.sin(r);
	const c = Math.cos(r);

	return fromValues(
		ax * c + aw * s,
		ay * c + az * s,
		az * c - ay * s,
		aw * c - ax * s,
		out
	);
};

/**
 * Rotate a quaternion by the given angle around the Y-axis.
 * @param quaternion - The quaternion.
 * @param radians - The angle in radians.
 * @param out - The quaternion to store the result in.
 * @returns The rotated quaternion.
 * @public
 */
export const rotateY = <T extends QuaternionLike>(
	quaternion: QuaternionLike,
	radians: number,
	out: T
): T => {
	const ax = quaternion[0];
	const ay = quaternion[1];
	const az = quaternion[2];
	const aw = quaternion[3];

	const r = radians / 2;
	const s = Math.sin(r);
	const c = Math.cos(r);

	return fromValues(
		ax * c - az * s,
		ay * c + aw * s,
		az * c + ax * s,
		aw * c - ay * s,
		out
	);
};

/**
 * Rotate a quaternion by the given angle around the Z-axis.
 * @param quaternion - The quaternion.
 * @param radians - The angle in radians.
 * @param out - The quaternion to store the result in.
 * @returns The rotated quaternion.
 * @public
 */
export const rotateZ = <T extends QuaternionLike>(
	quaternion: QuaternionLike,
	radians: number,
	out: T
): T => {
	const ax = quaternion[0];
	const ay = quaternion[1];
	const az = quaternion[2];
	const aw = quaternion[3];

	const r = radians / 2;
	const s = Math.sin(r);
	const c = Math.cos(r);

	return fromValues(
		ax * c + ay * s,
		ay * c - ax * s,
		az * c + aw * s,
		aw * c - az * s,
		out
	);
};

/**
 * Calculate the fourth component of a unit quaternion from the first three, ignoring the existing fourth component.
 * @param quaternion - The unit quaternion.
 * @param out - The quaternion to store the result in.
 * @returns The quaternion.
 * @public
 */
export const calculateW = <T extends QuaternionLike>(
	quaternion: QuaternionLike,
	out: T
): T => {
	const x = quaternion[0];
	const y = quaternion[1];
	const z = quaternion[2];

	if (quaternion !== out) {
		out[0] = x;
		out[1] = y;
		out[2] = z;
	}

	out[3] = Math.sqrt(Math.abs(1 - x * x - y * y - z * z));
	return out;
};

/**
 * Calculate the exponential of a unit quaternion.
 * @param quaternion - The unit quaternion.
 * @param out - The quaternion to store the result in.
 * @returns The exponential.
 * @public
 */
export const exp = <T extends QuaternionLike>(
	quaternion: QuaternionLike,
	out: T
): T => {
	const x = quaternion[0];
	const y = quaternion[1];
	const z = quaternion[2];

	const r = Math.sqrt(x * x + y * y + z * z); // `Math.hypot` is slower.
	const et = Math.exp(quaternion[3]);
	const s = r > 0 ? (et * Math.sin(r)) / r : 0;

	return fromValues(x * s, y * s, z * s, et * Math.cos(r), out);
};

/**
 * Calculate the natural logarithm of a unit quaternion.
 * @param quaternion - The unit quaternion.
 * @param out - The quaternion to store the result in.
 * @returns The natural logarithm.
 * @public
 */
export const ln = <T extends QuaternionLike>(
	quaternion: QuaternionLike,
	out: T
): T => {
	const x = quaternion[0];
	const y = quaternion[1];
	const z = quaternion[2];
	const w = quaternion[3];

	const xyz2 = x * x + y * y + z * z;
	const r = Math.sqrt(xyz2); // `Math.hypot` is slower.
	const t = r > 0 ? Math.atan2(r, w) / r : 0;

	return fromValues(x * t, y * t, z * t, Math.log(xyz2 + w * w) / 2, out);
};

/**
 * Calculate a scalar power of a unit quaternion.
 * @param quaternion - The unit quaternion.
 * @param scalar - The amount to scale the quaternion by.
 * @param out - The quaternion to store the result in.
 * @returns The scalar power.
 * @public
 */
export const pow = <T extends QuaternionLike>(
	quaternion: QuaternionLike,
	scalar: number,
	out: T
): T => exp(scale(ln(quaternion, out), scalar, out), out);

/**
 * Perform a spherical linear interpolation between two quaternions.
 * @param a - The first quaternion.
 * @param b - The second quaternion.
 * @param t - The interpolation amount in `[0,1]`.
 * @param out - The quaternion to store the result in.
 * @returns The interpolated quaternion.
 * @see {@link https://en.wikipedia.org/wiki/Slerp | Slerp}
 * @public
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

	return fromValues(
		ax * scale0 + bx * scale1,
		ay * scale0 + by * scale1,
		az * scale0 + bz * scale1,
		aw * scale0 + bw * scale1,
		out
	);
};

const pi2 = Math.PI * 2;

/**
 * Set a quaternion to a random unit quaternion.
 * @param out - The quaternion to store the result in.
 * @returns The quaternion.
 * @public
 */
export const random = <T extends QuaternionLike>(out: T): T => {
	const rand = Math.random();
	const sqInvRand = Math.sqrt(1 - rand);
	const sqRand = Math.sqrt(rand);
	const pi2u2 = pi2 * Math.random();
	const pi2u3 = pi2 * Math.random();

	return fromValues(
		sqInvRand * Math.sin(pi2u2),
		sqInvRand * Math.cos(pi2u2),
		sqRand * Math.sin(pi2u3),
		sqRand * Math.cos(pi2u3),
		out
	);
};

/**
 * Calculate the inverse of a quaternion. If the quaternion is normalized, the conjugate is the same but faster to calculate.
 * @param quaternion - The quaternion.
 * @param out - The quaternion to store the result in.
 * @returns The inverse.
 * @public
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

	return aDotA === 0
		? fromValues(0, 0, 0, 0, out)
		: fromValues(-a0 * invDot, -a1 * invDot, -a2 * invDot, a3 * invDot, out);
};

/**
 * Calculate the conjugate of a quaternion. If the quaternion is normalized, this is the same as the inverse but faster to calculate.
 * @param quaternion - The quaternion.
 * @param out - The quaternion to store the result in.
 * @returns The conjugate.
 * @public
 */
export const conjugate = <T extends QuaternionLike>(
	quaternion: QuaternionLike,
	out: T
): T =>
	fromValues(
		-quaternion[0],
		-quaternion[1],
		-quaternion[2],
		quaternion[3],
		out
	);

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
 * @see {@link https://en.wikipedia.org/wiki/Slerp | Slerp}
 * @public
 */
export const sqlerp = <T extends QuaternionLike>(
	a: QuaternionLike,
	b: QuaternionLike,
	c: QuaternionLike,
	d: QuaternionLike,
	t: number,
	out: T
): T =>
	slerp(
		slerp(a, d, t, controlPointOne),
		slerp(b, c, t, controlPointTwo),
		2 * t * (1 - t),
		out
	);

// The unit three-dimensional vector that represents the X-axis.
const xAxis = vector3FromValues(1, 0, 0, createVector3Like());

// The unit three-dimensional vector that represents the Y-axis.
const yAxis = vector3FromValues(0, 1, 0, createVector3Like());

// Used to store intermediary values for some functions.
const iv3 = createVector3Like();

/**
 * Create a unit quaternion that represents the shortest rotation from one unit vector to another.
 * @param a - The first unit vector.
 * @param b - The second unit vector.
 * @param out - The quaternion to store the result in.
 * @returns The unit quaternion.
 * @public
 */
export const fromRotationTo = <T extends QuaternionLike>(
	a: Vector3Like,
	b: Vector3Like,
	out: T
): T => {
	const dp = vector3Dot(a, b);

	if (dp < epsilon - 1) {
		vector3Cross(xAxis, a, iv3);
		if (vector3GetMagnitude(iv3) < epsilon) {
			vector3Cross(yAxis, a, iv3);
		}
		vector3Normalize(iv3, iv3);
		return setAxisAngle({ angle: Math.PI, axis: iv3 }, out);
	}

	if (dp > 1 - epsilon) {
		return fromValues(0, 0, 0, 1, out);
	}

	vector3Cross(a, b, iv3);
	return normalize(fromValues(iv3[0], iv3[1], iv3[2], 1 + dp, out), out);
};

/**
 * A complex number that is commonly used to describe rotations.
 * @see {@link https://en.wikipedia.org/wiki/Quaternion | Quaternion}
 * @public
 */
export default class Quaternion extends Float32Array implements QuaternionLike {
	/**
	 * Create a quaternion from a three-by-three rotation matrix.
	 * @param matrix - The matrix.
	 * @param out - The quaternion to store the result in.
	 * @returns The quaternion.
	 * @see {@link https://en.wikipedia.org/wiki/Rotation_matrix | Rotation matrix}
	 */
	public static fromMatrix3<T extends QuaternionLike = Quaternion>(
		matrix: Matrix3Like,
		out: T = new Quaternion() as Quaternion & T
	): T {
		return fromMatrix3(matrix, out);
	}

	/**
	 * Create a quaternion from equivalent z-y'-x" (intrinsic) Tait-Bryan angles.
	 * @param z - The z (roll) angle.
	 * @param y - The y (pitch) angle.
	 * @param x - The x (yaw) angle.
	 * @param out - The quaternion to store the result in.
	 * @returns The quaternion.
	 * @see {@link https://en.wikipedia.org/wiki/Euler_angles | Euler angles}
	 */
	public static fromEuler<T extends QuaternionLike = Quaternion>(
		z: number,
		y: number,
		x: number,
		out: T = new Quaternion() as Quaternion & T
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
	public static fromValues<T extends QuaternionLike = Quaternion>(
		x: number,
		y: number,
		z: number,
		w: number,
		out: T = new Quaternion() as Quaternion & T
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
	public static fromAxes<T extends QuaternionLike = Quaternion>(
		view: Vector3Like,
		right: Vector3Like,
		up: Vector3Like,
		out: T = new Quaternion() as Quaternion & T
	): T {
		return fromAxes(view, right, up, out);
	}

	/**
	 * Create a unit quaternion that represents the shortest rotation from one unit vector to another.
	 * @param a - The first unit vector.
	 * @param b - The second unit vector.
	 * @param out - The quaternion to store the result in.
	 * @returns The unit quaternion.
	 */
	public static fromRotationTo<T extends QuaternionLike = Quaternion>(
		a: Vector3Like,
		b: Vector3Like,
		out: T = new Quaternion() as Quaternion & T
	): T {
		return fromRotationTo(a, b, out);
	}

	/**
	 * Create an identity quaternion.
	 * @see {@link https://en.wikipedia.org/wiki/Quaternion | Quaternion}
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
	public multiply<T extends QuaternionLike = Quaternion>(
		quaternion: QuaternionLike,
		out: T = new Quaternion() as Quaternion & T
	): T {
		return multiply(this, quaternion, out);
	}

	/**
	 * Rotate this quaternion by the given angle around the X-axis.
	 * @param r - The angle in radians.
	 * @param out - The quaternion to store the result in.
	 * @returns The rotated quaternion.
	 */
	public rotateX<T extends QuaternionLike = Quaternion>(
		r: number,
		out: T = new Quaternion() as Quaternion & T
	): T {
		return rotateX(this, r, out);
	}

	/**
	 * Rotate this quaternion by the given angle around the Y-axis.
	 * @param r - The angle in radians.
	 * @param out - The quaternion to store the result in.
	 * @returns The rotated quaternion.
	 */
	public rotateY<T extends QuaternionLike = Quaternion>(
		r: number,
		out: T = new Quaternion() as Quaternion & T
	): T {
		return rotateY(this, r, out);
	}

	/**
	 * Rotate this quaternion by the given angle around the Z-axis.
	 * @param r - The angle in radians.
	 * @param out - The quaternion to store the result in.
	 * @returns The rotated quaternion.
	 */
	public rotateZ<T extends QuaternionLike = Quaternion>(
		r: number,
		out: T = new Quaternion() as Quaternion & T
	): T {
		return rotateZ(this, r, out);
	}

	/**
	 * Calculate the fourth component of this unit quaternion from the first three, ignoring the existing fourth component.
	 * @param out - The quaternion to store the result in.
	 * @returns The quaternion.
	 */
	public calculateW<T extends QuaternionLike = Quaternion>(
		out: T = new Quaternion() as Quaternion & T
	): T {
		return calculateW(this, out);
	}

	/**
	 * Calculate the exponential of this unit quaternion.
	 * @param out - The quaternion to store the result in.
	 * @returns The exponential.
	 */
	public exp<T extends QuaternionLike = Quaternion>(
		out: T = new Quaternion() as Quaternion & T
	): T {
		return exp(this, out);
	}

	/**
	 * Calculate the natural logarithm of this unit quaternion.
	 * @param out - The quaternion to store the result in.
	 * @returns The natural logarithm.
	 */
	public ln<T extends QuaternionLike = Quaternion>(
		out: T = new Quaternion() as Quaternion & T
	): T {
		return ln(this, out);
	}

	/**
	 * Calculate a power of this unit quaternion.
	 * @param scalar - The amount to scale the quaternion by.
	 * @param out - The quaternion to store the result in.
	 * @returns The power.
	 */
	public pow<T extends QuaternionLike = Quaternion>(
		scalar: number,
		out: T = new Quaternion() as Quaternion & T
	): T {
		return pow(this, scalar, out);
	}

	/**
	 * Perform a spherical linear interpolation between this and another quaternion.
	 * @param quaternion - The other quaternion.
	 * @param t - The interpolation amount in `[0,1]`.
	 * @param out - The quaternion to store the result in.
	 * @returns The interpolated quaternion.
	 * @see {@link https://en.wikipedia.org/wiki/Slerp | Slerp}
	 */
	public slerp<T extends QuaternionLike = Quaternion>(
		quaternion: QuaternionLike,
		t: number,
		out: T = new Quaternion() as Quaternion & T
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
	public invert<T extends QuaternionLike = Quaternion>(
		out: T = new Quaternion() as Quaternion & T
	): T {
		return invert(this, out);
	}

	/**
	 * Calculate the conjugate of this quaternion. If the quaternion is normalized, this is the same as the inverse but faster to calculate.
	 * @param out - The quaternion to store the result in.
	 * @returns The conjugate.
	 */
	public conjugate<T extends QuaternionLike = Quaternion>(
		out: T = new Quaternion() as Quaternion & T
	): T {
		return conjugate(this, out);
	}

	/**
	 * Copy the values from this quaternion to another one.
	 * @param out - The quaternion to store the result in.
	 * @returns The copy.
	 */
	public clone<T extends QuaternionLike = Quaternion>(
		out: T = new Quaternion() as Quaternion & T
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
	public add<T extends QuaternionLike = Quaternion>(
		quaternion: QuaternionLike,
		out: T = new Quaternion() as Quaternion & T
	): T {
		return add(this, quaternion, out);
	}

	/**
	 * Scale this quaternion by a scalar.
	 * @param scalar - The scalar.
	 * @param out - The quaternion to store the result in.
	 * @returns The scaled quaternion.
	 */
	public scale<T extends QuaternionLike = Quaternion>(
		scalar: number,
		out: T = new Quaternion() as Quaternion & T
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
	public lerp<T extends QuaternionLike = Quaternion>(
		quaternion: QuaternionLike,
		t: number,
		out: T = new Quaternion() as Quaternion & T
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
	public normalize<T extends QuaternionLike = Quaternion>(
		out: T = new Quaternion() as Quaternion & T
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
	 * @see {@link https://en.wikipedia.org/wiki/Slerp | Slerp}
	 */
	public sqlerp<T extends QuaternionLike = Quaternion>(
		a: QuaternionLike,
		b: QuaternionLike,
		quaternion: QuaternionLike,
		t: number,
		out: T = new Quaternion() as Quaternion & T
	): T {
		return sqlerp(this, a, b, quaternion, t, out);
	}
}
