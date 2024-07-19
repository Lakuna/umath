import {
	type Matrix4Like,
	getRotation as getMatrix4Rotation,
	getTranslation as getMatrix4Translation
} from "./Matrix4.js";
import Quaternion, {
	type QuaternionLike,
	createQuaternionLike,
	rotateX as quaternionRotateX,
	rotateY as quaternionRotateY,
	rotateZ as quaternionRotateZ
} from "./Quaternion.js";
import Vector3, { type Vector3Like, createVector3Like } from "./Vector3.js";
import {
	dot,
	getMagnitude,
	getSquaredMagnitude,
	copy as xetReal
} from "./Vector4.js";
import epsilon from "../utility/epsilon.js";

/** A complex number that is commonly used to describe transformations. */
export interface DualQuaternionLike extends Record<number, number> {
	/** The first real component of this dual quaternion. */
	0: number;

	/** The second real component of this dual quaternion. */
	1: number;

	/** The third real component of this dual quaternion. */
	2: number;

	/** The fourth real component of this dual quaternion. */
	3: number;

	/** The first dual component of this dual quaternion. */
	4: number;

	/** The second dual component of this dual quaternion. */
	5: number;

	/** The third dual component of this dual quaternion. */
	6: number;

	/** The fourth dual component of this dual quaternion. */
	7: number;
}

/**
 * Create a dual quaternion-like object.
 * @returns A dual quaternion-like object.
 */
export const createDualQuaternionLike = () => {
	return new Float32Array(8) as Float32Array & DualQuaternionLike;
};

/**
 * Create a dual quaternion with the given values.
 * @param x1 - The first real component.
 * @param y1 - The second real component.
 * @param z1 - The third real component.
 * @param w1 - The fourth real component.
 * @param x2 - The first dual component.
 * @param y2 - The second dual component.
 * @param z2 - The third dual component.
 * @param w2 - The fourth dual component.
 * @param out - The dual quaternion to store the result in.
 * @returns A new dual quaternion.
 */
export const fromValues = <T extends DualQuaternionLike>(
	x1: number,
	y1: number,
	z1: number,
	w1: number,
	x2: number,
	y2: number,
	z2: number,
	w2: number,
	out: T
): T => {
	out[0] = x1;
	out[1] = y1;
	out[2] = z1;
	out[3] = w1;
	out[4] = x2;
	out[5] = y2;
	out[6] = z2;
	out[7] = w2;
	return out;
};

/**
 * Copy the values from one dual quaternion to another.
 * @param dualQuaternion - The dual quaternion to copy.
 * @param out - The dual quaternion to store the result in.
 * @returns The copy.
 */
export const copy = <T extends DualQuaternionLike>(
	dualQuaternion: DualQuaternionLike,
	out: T
): T => {
	out[0] = dualQuaternion[0];
	out[1] = dualQuaternion[1];
	out[2] = dualQuaternion[2];
	out[3] = dualQuaternion[3];
	out[4] = dualQuaternion[4];
	out[5] = dualQuaternion[5];
	out[6] = dualQuaternion[6];
	out[7] = dualQuaternion[7];
	return out;
};

/**
 * Create a dual quaternion from the given quaternion and translation.
 * @param quaternion - The quaternion.
 * @param translation - The translation.
 * @param out - The dual quaternion to store the result in.
 * @returns The dual quaternion.
 */
export const fromRotationTranslation = <T extends DualQuaternionLike>(
	quaternion: QuaternionLike,
	translation: Vector3Like,
	out: T
): T => {
	const x = quaternion[0];
	const y = quaternion[1];
	const z = quaternion[2];
	const w = quaternion[3];

	const ax = translation[0] * 0.5;
	const ay = translation[1] * 0.5;
	const az = translation[2] * 0.5;

	out[0] = x;
	out[1] = y;
	out[2] = z;
	out[3] = w;
	out[4] = ax * w + ay * z - az * y;
	out[5] = ay * w + az * x - ax * z;
	out[6] = az * w + ax * y - ay * x;
	out[7] = -ax * x - ay * y - az * z;
	return out;
};

/**
 * Create a dual quaternion from the given translation.
 * @param translation - The translation.
 * @param out - The dual quaternion to store the result in.
 * @returns The dual quaternion.
 */
export const fromTranslation = <T extends DualQuaternionLike>(
	translation: Vector3Like,
	out: T
): T => {
	out[0] = 0;
	out[1] = 0;
	out[2] = 0;
	out[3] = 1;
	out[4] = translation[0] * 0.5;
	out[5] = translation[1] * 0.5;
	out[6] = translation[2] * 0.5;
	out[7] = 0;
	return out;
};

/**
 * Create a dual quaternion from the given quaternion.
 * @param quaternion - The quaternion.
 * @param out - The dual quaternion to store the result in.
 * @returns The dual quaternion.
 */
export const fromRotation = <T extends DualQuaternionLike>(
	quaternion: QuaternionLike,
	out: T
): T => {
	out[0] = quaternion[0];
	out[1] = quaternion[1];
	out[2] = quaternion[2];
	out[3] = quaternion[3];
	out[4] = 0;
	out[5] = 0;
	out[6] = 0;
	out[7] = 0;
	return out;
};

// Used to store intermediary values for some functions.
const rotation = createQuaternionLike();
const translation = createVector3Like();

/**
 * Create a dual quaternion from the given four-by-four matrix.
 * @param matrix - The matrix.
 * @param out - The dual quaternion to store the result in.
 * @returns The dual quaternion.
 */
export const fromMatrix4 = <T extends DualQuaternionLike>(
	matrix: Matrix4Like,
	out: T
): T => {
	return fromRotationTranslation(
		getMatrix4Rotation(matrix, rotation),
		getMatrix4Translation(matrix, translation),
		out
	);
};

/**
 * Set a dual quaternion to the identity dual quaternion.
 * @param out - The dual quaternion to store the result in.
 * @returns The identity dual quaternion.
 */
export const identity = <T extends DualQuaternionLike>(out: T): T => {
	out[0] = 0;
	out[1] = 0;
	out[2] = 0;
	out[3] = 1;
	out[4] = 0;
	out[5] = 0;
	out[6] = 0;
	out[7] = 0;
	return out;
};

/**
 * Get the dual part of a dual quaternion.
 * @param dualQuaternion - The dual quaternion.
 * @param out - The quaternion to store the result in.
 * @returns The dual part.
 */
export const getDual = <T extends QuaternionLike>(
	dualQuaternion: DualQuaternionLike,
	out: T
): T => {
	out[0] = dualQuaternion[4];
	out[1] = dualQuaternion[5];
	out[2] = dualQuaternion[6];
	out[3] = dualQuaternion[7];
	return out;
};

/**
 * Set the dual part of a dual quaternion.
 * @param quaternion - The quaternion to set as the dual part.
 * @param out - The dual quaternion to store the result in.
 * @returns The dual quaternion.
 */
export const setDual = <T extends DualQuaternionLike>(
	quaternion: QuaternionLike,
	out: T
): T => {
	out[4] = quaternion[0];
	out[5] = quaternion[1];
	out[6] = quaternion[2];
	out[7] = quaternion[3];
	return out;
};

/**
 * Get the translation of a normalized dual quaternion.
 * @param dualQuaternion - The dual quaternion.
 * @param out - The vector to store the result in.
 * @returns The translation.
 */
export const getTranslation = <T extends Vector3Like>(
	dualQuaternion: DualQuaternionLike,
	out: T
): T => {
	const ax = dualQuaternion[4];
	const ay = dualQuaternion[5];
	const az = dualQuaternion[6];
	const aw = dualQuaternion[7];
	const bx = -dualQuaternion[0];
	const by = -dualQuaternion[1];
	const bz = -dualQuaternion[2];
	const bw = dualQuaternion[3];

	out[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
	out[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
	out[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
	return out;
};

/**
 * Translate a dual quaternion by the given vector.
 * @param dualQuaternion - The dual quaternion.
 * @param vector - The vector.
 * @param out - The dual quaternion to store the result in.
 * @returns The translated dual quaternion.
 */
export const translate = <T extends DualQuaternionLike>(
	dualQuaternion: DualQuaternionLike,
	vector: Vector3Like,
	out: T
): T => {
	const ax1 = dualQuaternion[0];
	const ay1 = dualQuaternion[1];
	const az1 = dualQuaternion[2];
	const aw1 = dualQuaternion[3];

	const bx1 = vector[0] * 0.5;
	const by1 = vector[1] * 0.5;
	const bz1 = vector[2] * 0.5;

	const ax2 = dualQuaternion[4];
	const ay2 = dualQuaternion[5];
	const az2 = dualQuaternion[6];
	const aw2 = dualQuaternion[7];

	out[0] = ax1;
	out[1] = ay1;
	out[2] = az1;
	out[3] = aw1;
	out[4] = aw1 * bx1 + ay1 * bz1 - az1 * by1 + ax2;
	out[5] = aw1 * by1 + az1 * bx1 - ax1 * bz1 + ay2;
	out[6] = aw1 * bz1 + ax1 * by1 - ay1 * bx1 + az2;
	out[7] = -ax1 * bx1 - ay1 * by1 - az1 * bz1 + aw2;
	return out;
};

/**
 * Rotate a dual quaternion around the X-axis.
 * @param dualQuaternion - The dual quaternion.
 * @param radians - The angle to rotate by in radians.
 * @param out - The dual quaternion to store the result in.
 * @returns The rotated dual quaternion.
 */
export const rotateX = <T extends DualQuaternionLike>(
	dualQuaternion: DualQuaternionLike,
	radians: number,
	out: T
): T => {
	let bx = -dualQuaternion[0];
	let by = -dualQuaternion[1];
	let bz = -dualQuaternion[2];
	let bw = dualQuaternion[3];

	const ax = dualQuaternion[4];
	const ay = dualQuaternion[5];
	const az = dualQuaternion[6];
	const aw = dualQuaternion[7];

	const ax1 = ax * bw + aw * bx + ay * bz - az * by;
	const ay1 = ay * bw + aw * by + az * bx - ax * bz;
	const az1 = az * bw + aw * bz + ax * by - ay * bx;
	const aw1 = aw * bw - ax * bx - ay * by - az * bz;

	quaternionRotateX(dualQuaternion, radians, out);

	bx = out[0];
	by = out[1];
	bz = out[2];
	bw = out[3];

	out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
	out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
	out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
	out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
	return out;
};

/**
 * Rotate a dual quaternion around the Y-axis.
 * @param dualQuaternion - The dual quaternion.
 * @param radians - The angle to rotate by in radians.
 * @param out - The dual quaternion to store the result in.
 * @returns The rotated dual quaternion.
 */
export const rotateY = <T extends DualQuaternionLike>(
	dualQuaternion: DualQuaternionLike,
	radians: number,
	out: T
): T => {
	let bx = -dualQuaternion[0];
	let by = -dualQuaternion[1];
	let bz = -dualQuaternion[2];
	let bw = dualQuaternion[3];

	const ax = dualQuaternion[4];
	const ay = dualQuaternion[5];
	const az = dualQuaternion[6];
	const aw = dualQuaternion[7];

	const ax1 = ax * bw + aw * bx + ay * bz - az * by;
	const ay1 = ay * bw + aw * by + az * bx - ax * bz;
	const az1 = az * bw + aw * bz + ax * by - ay * bx;
	const aw1 = aw * bw - ax * bx - ay * by - az * bz;

	quaternionRotateY(dualQuaternion, radians, out);

	bx = out[0];
	by = out[1];
	bz = out[2];
	bw = out[3];

	out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
	out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
	out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
	out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
	return out;
};

/**
 * Rotate a dual quaternion around the Z-axis.
 * @param dualQuaternion - The dual quaternion.
 * @param radians - The angle to rotate by in radians.
 * @param out - The dual quaternion to store the result in.
 * @returns The rotated dual quaternion.
 */
export const rotateZ = <T extends DualQuaternionLike>(
	dualQuaternion: DualQuaternionLike,
	radians: number,
	out: T
): T => {
	let bx = -dualQuaternion[0];
	let by = -dualQuaternion[1];
	let bz = -dualQuaternion[2];
	let bw = dualQuaternion[3];

	const ax = dualQuaternion[4];
	const ay = dualQuaternion[5];
	const az = dualQuaternion[6];
	const aw = dualQuaternion[7];

	const ax1 = ax * bw + aw * bx + ay * bz - az * by;
	const ay1 = ay * bw + aw * by + az * bx - ax * bz;
	const az1 = az * bw + aw * bz + ax * by - ay * bx;
	const aw1 = aw * bw - ax * bx - ay * by - az * bz;

	quaternionRotateZ(dualQuaternion, radians, out);

	bx = out[0];
	by = out[1];
	bz = out[2];
	bw = out[3];

	out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
	out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
	out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
	out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
	return out;
};

/**
 * Multiply a dual quaternion by a quaternion.
 * @param dualQuaternion - The dual quaternion.
 * @param quaternion - The quaternion.
 * @param out - The dual quaternion to store the result in.
 * @returns The rotated dual quaternion.
 */
export const rotateByQuaternionAppend = <T extends DualQuaternionLike>(
	dualQuaternion: DualQuaternionLike,
	quaternion: QuaternionLike,
	out: T
): T => {
	const qx = quaternion[0];
	const qy = quaternion[1];
	const qz = quaternion[2];
	const qw = quaternion[3];

	let ax = dualQuaternion[0];
	let ay = dualQuaternion[1];
	let az = dualQuaternion[2];
	let aw = dualQuaternion[3];

	out[0] = ax * qw + aw * qx + ay * qz - az * qy;
	out[1] = ay * qw + aw * qy + az * qx - ax * qz;
	out[2] = az * qw + aw * qz + ax * qy - ay * qx;
	out[3] = aw * qw - ax * qx - ay * qy - az * qz;

	ax = dualQuaternion[4];
	ay = dualQuaternion[5];
	az = dualQuaternion[6];
	aw = dualQuaternion[7];

	out[4] = ax * qw + aw * qx + ay * qz - az * qy;
	out[5] = ay * qw + aw * qy + az * qx - ax * qz;
	out[6] = az * qw + aw * qz + ax * qy - ay * qx;
	out[7] = aw * qw - ax * qx - ay * qy - az * qz;
	return out;
};

/**
 * Multiply a quaternion by a dual quaternion.
 * @param quaternion - The quaternion.
 * @param dualQuaternion - The dual quaternion.
 * @param out - The dual quaternion to store the result in.
 * @returns The rotated dual quaternion.
 */
export const rotateByQuaternionPrepend = <T extends DualQuaternionLike>(
	quaternion: QuaternionLike,
	dualQuaternion: DualQuaternionLike,
	out: T
): T => {
	const qx = quaternion[0];
	const qy = quaternion[1];
	const qz = quaternion[2];
	const qw = quaternion[3];

	let bx = dualQuaternion[0];
	let by = dualQuaternion[1];
	let bz = dualQuaternion[2];
	let bw = dualQuaternion[3];

	out[0] = qx * bw + qw * bx + qy * bz - qz * by;
	out[1] = qy * bw + qw * by + qz * bx - qx * bz;
	out[2] = qz * bw + qw * bz + qx * by - qy * bx;
	out[3] = qw * bw - qx * bx - qy * by - qz * bz;

	bx = dualQuaternion[4];
	by = dualQuaternion[5];
	bz = dualQuaternion[6];
	bw = dualQuaternion[7];

	out[4] = qx * bw + qw * bx + qy * bz - qz * by;
	out[5] = qy * bw + qw * by + qz * bx - qx * bz;
	out[6] = qz * bw + qw * bz + qx * by - qy * bx;
	out[7] = qw * bw - qx * bx - qy * by - qz * bz;
	return out;
};

/**
 * Rotate a dual quaternion around an axis.
 * @param dualQuaternion - The dual quaternion.
 * @param axis - The axis.
 * @param radians - The angle of the rotation in radians.
 * @param out - The dual quaternion to store the result in.
 * @returns A normalized dual quaternion.
 */
export const rotateAroundAxis = <T extends DualQuaternionLike>(
	dualQuaternion: DualQuaternionLike,
	axis: Vector3Like,
	radians: number,
	out: T
): T => {
	if (Math.abs(radians) < 0) {
		return copy(dualQuaternion, out);
	}

	const axisLength = Math.hypot(axis[0], axis[1], axis[2]);

	const r = radians * 0.5;

	const s = Math.sin(r);
	const bx = (s * axis[0]) / axisLength;
	const by = (s * axis[1]) / axisLength;
	const bz = (s * axis[2]) / axisLength;
	const bw = Math.cos(r);

	let x = dualQuaternion[0];
	let y = dualQuaternion[1];
	let z = dualQuaternion[2];
	let w = dualQuaternion[3];

	out[0] = x * bw + w * bx + y * bz - z * by;
	out[1] = y * bw + w * by + z * bx - x * bz;
	out[2] = z * bw + w * bz + x * by - y * bx;
	out[3] = w * bw - x * bx - y * by - z * bz;

	x = dualQuaternion[4];
	y = dualQuaternion[5];
	z = dualQuaternion[6];
	w = dualQuaternion[7];

	out[4] = x * bw + w * bx + y * bz - z * by;
	out[5] = y * bw + w * by + z * bx - x * bz;
	out[6] = z * bw + w * bz + x * by - y * bx;
	out[7] = w * bw - x * bx - y * by - z * bz;
	return out;
};

/**
 * Add two dual quaternions.
 * @param a - The augend.
 * @param b - The addend.
 * @param out - The dual quaternion to store the result in.
 * @returns The sum.
 */
export const add = <T extends DualQuaternionLike>(
	a: DualQuaternionLike,
	b: DualQuaternionLike,
	out: T
): T => {
	out[0] = a[0] + b[0];
	out[1] = a[1] + b[1];
	out[2] = a[2] + b[2];
	out[3] = a[3] + b[3];
	out[4] = a[4] + b[4];
	out[5] = a[5] + b[5];
	out[6] = a[6] + b[6];
	out[7] = a[7] + b[7];
	return out;
};

/**
 * Multiply two dual quaternions.
 * @param a - The multiplier.
 * @param b - The multiplicand.
 * @param out - The dual quaternion to store the result in.
 * @returns The product.
 */
export const multiply = <T extends DualQuaternionLike>(
	a: DualQuaternionLike,
	b: DualQuaternionLike,
	out: T
): T => {
	const ax0 = a[0];
	const ay0 = a[1];
	const az0 = a[2];
	const aw0 = a[3];

	const ax1 = a[4];
	const ay1 = a[5];
	const az1 = a[6];
	const aw1 = a[7];

	const bx0 = b[0];
	const by0 = b[1];
	const bz0 = b[2];
	const bw0 = b[3];

	const bx1 = b[4];
	const by1 = b[5];
	const bz1 = b[6];
	const bw1 = b[7];

	out[0] = ax0 * bw0 + aw0 * bx0 + ay0 * bz0 - az0 * by0;
	out[1] = ay0 * bw0 + aw0 * by0 + az0 * bx0 - ax0 * bz0;
	out[2] = az0 * bw0 + aw0 * bz0 + ax0 * by0 - ay0 * bx0;
	out[3] = aw0 * bw0 - ax0 * bx0 - ay0 * by0 - az0 * bz0;
	out[4] =
		ax0 * bw1 +
		aw0 * bx1 +
		ay0 * bz1 -
		az0 * by1 +
		ax1 * bw0 +
		aw1 * bx0 +
		ay1 * bz0 -
		az1 * by0;
	out[5] =
		ay0 * bw1 +
		aw0 * by1 +
		az0 * bx1 -
		ax0 * bz1 +
		ay1 * bw0 +
		aw1 * by0 +
		az1 * bx0 -
		ax1 * bz0;
	out[6] =
		az0 * bw1 +
		aw0 * bz1 +
		ax0 * by1 -
		ay0 * bx1 +
		az1 * bw0 +
		aw1 * bz0 +
		ax1 * by0 -
		ay1 * bx0;
	out[7] =
		aw0 * bw1 -
		ax0 * bx1 -
		ay0 * by1 -
		az0 * bz1 +
		aw1 * bw0 -
		ax1 * bx0 -
		ay1 * by0 -
		az1 * bz0;
	return out;
};

/**
 * Multiply a dual quaternion by a scalar.
 * @param dualQuaternion - The multiplicand.
 * @param scalar - The multiplier.
 * @param out - The dual quaternion to store the result in.
 * @returns The sum.
 */
export const scale = <T extends DualQuaternionLike>(
	dualQuaternion: DualQuaternionLike,
	scalar: number,
	out: T
): T => {
	out[0] = dualQuaternion[0] * scalar;
	out[1] = dualQuaternion[1] * scalar;
	out[2] = dualQuaternion[2] * scalar;
	out[3] = dualQuaternion[3] * scalar;
	out[4] = dualQuaternion[4] * scalar;
	out[5] = dualQuaternion[5] * scalar;
	out[6] = dualQuaternion[6] * scalar;
	out[7] = dualQuaternion[7] * scalar;
	return out;
};

/**
 * Perform a linear interpolation between two dual quaternions.
 * @param a - The first dual quaternion.
 * @param b - The second dual quaternion.
 * @param t - The interpolation amount in `[0,1]`.
 * @param out - The dual quaternion to store the result in.
 * @returns The interpolated value.
 */
export const lerp = <T extends DualQuaternionLike>(
	a: DualQuaternionLike,
	b: DualQuaternionLike,
	t: number,
	out: T
): T => {
	const mt = 1 - t;
	const it = dot(a, b) < epsilon ? -t : t;

	out[0] = a[0] * mt + b[0] * it;
	out[1] = a[1] * mt + b[1] * it;
	out[2] = a[2] * mt + b[2] * it;
	out[3] = a[3] * mt + b[3] * it;
	out[4] = a[4] * mt + b[4] * it;
	out[5] = a[5] * mt + b[5] * it;
	out[6] = a[6] * mt + b[6] * it;
	out[7] = a[7] * mt + b[7] * it;
	return out;
};

/**
 * Calculate the inverse of a dual quaternion. If the dual quaternion is normalized, the conjugate is equivalent and faster to calculate.
 * @param dualQuaternion - The dual quaternion.
 * @param out - The dual quaternion to store the result in.
 * @returns The inverse.
 */
export const invert = <T extends DualQuaternionLike>(
	dualQuaternion: DualQuaternionLike,
	out: T
): T => {
	const sqm = getSquaredMagnitude(dualQuaternion);

	out[0] = -dualQuaternion[0] / sqm;
	out[1] = -dualQuaternion[1] / sqm;
	out[2] = -dualQuaternion[2] / sqm;
	out[3] = dualQuaternion[3] / sqm;
	out[4] = -dualQuaternion[4] / sqm;
	out[5] = -dualQuaternion[5] / sqm;
	out[6] = -dualQuaternion[6] / sqm;
	out[7] = dualQuaternion[7] / sqm;
	return out;
};

/**
 * Calculate the conjugate of a dual quaternion. If the dual quaternion is normalized, this is equivalent to its inverse and faster to calculate.
 * @param dualQuaternion - The dual quaternion.
 * @param out - The dual quaternion to store the result in.
 * @returns The conjugate.
 */
export const conjugate = <T extends DualQuaternionLike>(
	dualQuaternion: DualQuaternionLike,
	out: T
): T => {
	out[0] = -dualQuaternion[0];
	out[1] = -dualQuaternion[1];
	out[2] = -dualQuaternion[2];
	out[3] = dualQuaternion[3];
	out[4] = -dualQuaternion[4];
	out[5] = -dualQuaternion[5];
	out[6] = -dualQuaternion[6];
	out[7] = dualQuaternion[7];
	return out;
};

/**
 * Normalize a dual quaternion.
 * @param dualQuaternion - The dual quaternion.
 * @param out - The dual quaternion to store the result in.
 * @returns The normalized dual quaternion.
 */
export const normalize = <T extends DualQuaternionLike>(
	dualQuaternion: DualQuaternionLike,
	out: T
): T => {
	let magnitude = getSquaredMagnitude(dualQuaternion);
	if (magnitude > 0) {
		magnitude = Math.sqrt(magnitude);

		const a0 = dualQuaternion[0] / magnitude;
		const a1 = dualQuaternion[1] / magnitude;
		const a2 = dualQuaternion[2] / magnitude;
		const a3 = dualQuaternion[3] / magnitude;
		const b0 = dualQuaternion[4];
		const b1 = dualQuaternion[5];
		const b2 = dualQuaternion[6];
		const b3 = dualQuaternion[7];

		const aDotB = a0 * b0 + a1 * b1 + a2 * b2 + a3 * b3;

		out[0] = a0;
		out[1] = a1;
		out[2] = a2;
		out[3] = a3;
		out[4] = (b0 - a0 * aDotB) / magnitude;
		out[5] = (b1 - a1 * aDotB) / magnitude;
		out[6] = (b2 - a2 * aDotB) / magnitude;
		out[7] = (b3 - a3 * aDotB) / magnitude;
	}
	return out;
};

/**
 * Determine whether or not two dual quaternions are exactly equivalent.
 * @param a - The first dual quaternion.
 * @param b - The second dual quaternion.
 * @returns Whether or not the dual quaternions are equivalent.
 */
export const exactEquals = (
	a: DualQuaternionLike,
	b: DualQuaternionLike
): boolean => {
	return (
		a[0] === b[0] &&
		a[1] === b[1] &&
		a[2] === b[2] &&
		a[3] === b[3] &&
		a[4] === b[4] &&
		a[5] === b[5] &&
		a[6] === b[6] &&
		a[7] === b[7]
	);
};

/**
 * Determine whether or not two dual quaternions are roughly equivalent.
 * @param a - The first dual quaternion.
 * @param b - The second dual quaternion.
 * @returns Whether or not the dual quaternions are equivalent.
 */
export const equals = (
	a: DualQuaternionLike,
	b: DualQuaternionLike
): boolean => {
	const a0 = a[0];
	const a1 = a[1];
	const a2 = a[2];
	const a3 = a[3];
	const a4 = a[4];
	const a5 = a[5];
	const a6 = a[6];
	const a7 = a[7];

	const b0 = b[0];
	const b1 = b[1];
	const b2 = b[2];
	const b3 = b[3];
	const b4 = b[4];
	const b5 = b[5];
	const b6 = b[6];
	const b7 = b[7];

	return (
		Math.abs(a0 - b0) <= epsilon * Math.max(1, Math.abs(a0), Math.abs(b0)) &&
		Math.abs(a1 - b1) <= epsilon * Math.max(1, Math.abs(a1), Math.abs(b1)) &&
		Math.abs(a2 - b2) <= epsilon * Math.max(1, Math.abs(a2), Math.abs(b2)) &&
		Math.abs(a3 - b3) <= epsilon * Math.max(1, Math.abs(a3), Math.abs(b3)) &&
		Math.abs(a4 - b4) <= epsilon * Math.max(1, Math.abs(a4), Math.abs(b4)) &&
		Math.abs(a5 - b5) <= epsilon * Math.max(1, Math.abs(a5), Math.abs(b5)) &&
		Math.abs(a6 - b6) <= epsilon * Math.max(1, Math.abs(a6), Math.abs(b6)) &&
		Math.abs(a7 - b7) <= epsilon * Math.max(1, Math.abs(a7), Math.abs(b7))
	);
};

/**
 * A complex number that is commonly used to describe transformations.
 * @see [Dual quaternion](https://en.wikipedia.org/wiki/Dual_quaternion)
 */
export default class DualQuaternion
	extends Float32Array
	implements DualQuaternionLike
{
	/**
	 * Create a dual quaternion with the given values.
	 * @param x1 - The first real component.
	 * @param y1 - The second real component.
	 * @param z1 - The third real component.
	 * @param w1 - The fourth real component.
	 * @param x2 - The first dual component.
	 * @param y2 - The second dual component.
	 * @param z2 - The third dual component.
	 * @param w2 - The fourth dual component.
	 * @param out - The dual quaternion to store the result in.
	 * @returns A new dual quaternion.
	 */
	public static fromValues<T extends DualQuaternionLike>(
		x1: number,
		y1: number,
		z1: number,
		w1: number,
		x2: number,
		y2: number,
		z2: number,
		w2: number,
		out = new DualQuaternion() as unknown as T
	): T {
		return fromValues(x1, y1, z1, w1, x2, y2, z2, w2, out);
	}

	/**
	 * Create a dual quaternion from the given quaternion and translation.
	 * @param q - The quaternion.
	 * @param t - The translation.
	 * @param out - The dual quaternion to store the result in.
	 * @returns The dual quaternion.
	 */
	public static fromRotationTranslation<T extends DualQuaternionLike>(
		q: QuaternionLike,
		t: Vector3Like,
		out = new DualQuaternion() as unknown as T
	): T {
		return fromRotationTranslation(q, t, out);
	}

	/**
	 * Create a dual quaternion from the given translation.
	 * @param t - The translation.
	 * @param out - The dual quaternion to store the result in.
	 * @returns The dual quaternion.
	 */
	public static fromTranslation<T extends DualQuaternionLike>(
		t: Vector3Like,
		out = new DualQuaternion() as unknown as T
	): T {
		return fromTranslation(t, out);
	}

	/**
	 * Create a dual quaternion from the given quaternion.
	 * @param q - The quaternion.
	 * @param out - The dual quaternion to store the result in.
	 * @returns The dual quaternion.
	 */
	public static fromRotation<T extends DualQuaternionLike>(
		q: QuaternionLike,
		out = new DualQuaternion() as unknown as T
	): T {
		return fromRotation(q, out);
	}

	/**
	 * Create a dual quaternion from the given four-by-four matrix.
	 * @param matrix - The matrix.
	 * @param out - The dual quaternion to store the result in.
	 * @returns The dual quaternion.
	 */
	public static fromMatrix4<T extends DualQuaternionLike>(
		matrix: Matrix4Like,
		out = new DualQuaternion() as unknown as T
	): T {
		return fromMatrix4(matrix, out);
	}

	/**
	 * Create an identity dual quaternion.
	 * @see [Dual quaternion](https://en.wikipedia.org/wiki/Dual_quaternion)
	 */
	public constructor() {
		super(8);
		this[3] = 1;
	}

	/** The first real component of this dual quaternion. */
	public 0: number;

	/** The second real component of this dual quaternion. */
	public 1: number;

	/** The third real component of this dual quaternion. */
	public 2: number;

	/** The fourth real component of this dual quaternion. */
	public 3: number;

	/** The first dual component of this dual quaternion. */
	public 4: number;

	/** The second dual component of this dual quaternion. */
	public 5: number;

	/** The third dual component of this dual quaternion. */
	public 6: number;

	/** The fourth dual component of this dual quaternion. */
	public 7: number;

	/**
	 * Copy the values from another dual quaternion to this one.
	 * @param dualQuaternion - The dual quaternion to copy.
	 * @returns This dual quaternion.
	 */
	public copy(dualQuaternion: DualQuaternionLike): this {
		return copy(dualQuaternion, this);
	}

	/**
	 * Copy the values from this dual quaternion to another one.
	 * @param out - The dual quaternion to store the result in.
	 * @returns The copy.
	 */
	public clone<T extends DualQuaternionLike>(
		out = new DualQuaternion() as unknown as T
	): T {
		return copy(this, out);
	}

	/**
	 * Set this dual quaternion to the identity dual quaternion.
	 * @returns The identity dual quaternion.
	 */
	public identity(): this {
		return identity(this);
	}

	/**
	 * Get the real part of this dual quaternion.
	 * @param out - The quaternion to store the result in.
	 * @returns The real part.
	 */
	public getReal<T extends QuaternionLike>(
		out = new Quaternion() as unknown as T
	): T {
		return xetReal(this, out);
	}

	/**
	 * Set the real part of this dual quaternion.
	 * @param q - The quaternion.
	 */
	public setReal(q: QuaternionLike): void {
		xetReal(q, this);
	}

	/**
	 * Get the dual part of this dual quaternion.
	 * @param out - The quaternion to store the result in.
	 * @returns The dual part.
	 */
	public getDual<T extends QuaternionLike>(
		out = new Quaternion() as unknown as T
	): T {
		return getDual(this, out);
	}

	/**
	 * Set the real part of this dual quaternion.
	 * @param q - The quaternion.
	 */
	public setDual(q: QuaternionLike): void {
		setDual(q, this);
	}

	/**
	 * Get the translation of this normalized dual quaternion.
	 * @param out - The vector to store the result in.
	 * @returns The translation.
	 */
	public getTranslation<T extends Vector3Like>(
		out = new Vector3() as unknown as T
	): T {
		return getTranslation(this, out);
	}

	/**
	 * Translate this dual quaternion by the given vector.
	 * @param v - The vector.
	 * @param out - The dual quaternion to store the result in.
	 * @returns The translated dual quaternion.
	 */
	public translate<T extends DualQuaternionLike>(
		v: Vector3Like,
		out = new DualQuaternion() as unknown as T
	): T {
		return translate(this, v, out);
	}

	/**
	 * Rotate this dual quaternion around the X-axis.
	 * @param r - The angle to rotate by in radians.
	 * @param out - The dual quaternion to store the result in.
	 * @returns The rotated dual quaternion.
	 */
	public rotateX<T extends DualQuaternionLike>(
		r: number,
		out = new DualQuaternion() as unknown as T
	): T {
		return rotateX(this, r, out);
	}

	/**
	 * Rotate this dual quaternion around the Y-axis.
	 * @param r - The angle to rotate by in radians.
	 * @param out - The dual quaternion to store the result in.
	 * @returns The rotated dual quaternion.
	 */
	public rotateY<T extends DualQuaternionLike>(
		r: number,
		out = new DualQuaternion() as unknown as T
	): T {
		return rotateY(this, r, out);
	}

	/**
	 * Rotate this dual quaternion around the Z-axis.
	 * @param r - The angle to rotate by in radians.
	 * @param out - The dual quaternion to store the result in.
	 * @returns The rotated dual quaternion.
	 */
	public rotateZ<T extends DualQuaternionLike>(
		r: number,
		out = new DualQuaternion() as unknown as T
	): T {
		return rotateZ(this, r, out);
	}

	/**
	 * Multiply this dual quaternion by a quaternion.
	 * @param q - The quaternion.
	 * @param out - The dual quaternion to store the result in.
	 * @returns The rotated dual quaternion.
	 * @see [Quaternion](https://en.wikipedia.org/wiki/Quaternion)
	 */
	public rotateByQuaternionAppend<T extends DualQuaternionLike>(
		q: QuaternionLike,
		out = new DualQuaternion() as unknown as T
	): T {
		return rotateByQuaternionAppend(this, q, out);
	}

	/**
	 * Multiply a quaternion by this dual quaternion.
	 * @param q - The quaternion.
	 * @param out - The dual quaternion to store the result in.
	 * @returns The rotated dual quaternion.
	 * @see [Quaternion](https://en.wikipedia.org/wiki/Quaternion)
	 */
	public rotateByQuaternionPrepend<T extends DualQuaternionLike>(
		q: QuaternionLike,
		out = new DualQuaternion() as unknown as T
	): T {
		return rotateByQuaternionPrepend(q, this, out);
	}

	/**
	 * Rotate this dual quaternion around an axis.
	 * @param axis - The axis.
	 * @param r - The angle of the rotation in radians.
	 * @param out - The dual quaternion to store the result in.
	 * @returns A normalized dual quaternion.
	 */
	public rotateAroundAxis<T extends DualQuaternionLike>(
		axis: Vector3Like,
		r: number,
		out = new DualQuaternion() as unknown as T
	): T {
		return rotateAroundAxis(this, axis, r, out);
	}

	/**
	 * Add another dual quaternion to this one.
	 * @param dq - The other dual quaternion.
	 * @param out - The dual quaternion to store the result in.
	 * @returns The sum.
	 */
	public add<T extends DualQuaternionLike>(
		dq: DualQuaternionLike,
		out = new DualQuaternion() as unknown as T
	): T {
		return add(this, dq, out);
	}

	/**
	 * Multiply this dual quaternion by another one.
	 * @param dq - The other dual quaternion.
	 * @param out - The dual quaternion to store the result in.
	 * @returns The product.
	 */
	public multiply<T extends DualQuaternionLike>(
		dq: DualQuaternionLike,
		out = new DualQuaternion() as unknown as T
	): T {
		return multiply(this, dq, out);
	}

	/**
	 * Multiply this dual quaternion by a scalar.
	 * @param s - The scalar.
	 * @param out - The dual quaternion to store the result in.
	 * @returns The product.
	 */
	public scale<T extends DualQuaternionLike>(
		s: number,
		out = new DualQuaternion() as unknown as T
	): T {
		return scale(this, s, out);
	}

	/**
	 * Calculate the dot product of this and another dual quaternion.
	 * @param dq - The other dual quaternion.
	 * @returns The dot product.
	 * @see [Dot product](https://en.wikipedia.org/wiki/Dot_product)
	 */
	public dot(dq: DualQuaternionLike): number {
		return dot(this, dq);
	}

	/**
	 * Perform a linear interpolation between this and another dual quaternion.
	 * @param dq - The other dual quaternion.
	 * @param t - The interpolation amount in `[0,1]`.
	 * @param out - The dual quaternion to store the result in.
	 * @returns The interpolated value.
	 */
	public lerp<T extends DualQuaternionLike>(
		dq: DualQuaternionLike,
		t: number,
		out = new DualQuaternion() as unknown as T
	): T {
		return lerp(this, dq, t, out);
	}

	/**
	 * Calculate the inverse of this dual quaternion. If this dual quaternion is normalized, the conjugate is equivalent and faster to calculate.
	 * @param out - The dual quaternion to store the result in.
	 * @returns The inverse.
	 */
	public invert<T extends DualQuaternionLike>(
		out = new DualQuaternion() as unknown as T
	): T {
		return invert(this, out);
	}

	/**
	 * Calculate the conjugate of this dual quaternion. If this dual quaternion is normalized, this is equivalent to its inverse and faster to calculate.
	 * @param out - The dual quaternion to store the result in.
	 * @returns The conjugate.
	 */
	public conjugate<T extends DualQuaternionLike>(
		out = new DualQuaternion() as unknown as T
	): T {
		return conjugate(this, out);
	}

	/** Get the magnitude (length) of this dual quaternion. */
	public get magnitude(): number {
		return getMagnitude(this);
	}

	/** Get the squared magnitude (length) of this dual quaternion. */
	public get squaredMagnitude(): number {
		return getSquaredMagnitude(this);
	}

	/**
	 * Normalize this dual quaternion.
	 * @param out - The dual quaternion to store the result in.
	 * @returns The normalized dual quaternion.
	 */
	public normalize<T extends DualQuaternionLike>(
		out = new DualQuaternion() as unknown as T
	): T {
		return normalize(this, out);
	}

	/**
	 * Determine whether or not this dual quaternion is exactly equivalent to another.
	 * @param dq - The other dual quaternion.
	 * @returns Whether or not the dual quaternions are equivalent.
	 */
	public exactEquals(dq: DualQuaternionLike): boolean {
		return exactEquals(this, dq);
	}

	/**
	 * Determine whether or not this dual quaternion is roughly equivalent to another.
	 * @param dq - The other dual quaternion.
	 * @returns Whether or not the dual quaternions are equivalent.
	 */
	public equals(dq: DualQuaternionLike): boolean {
		return equals(this, dq);
	}
}
