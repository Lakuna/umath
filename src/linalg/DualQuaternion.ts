import {
	getRotation as getMatrix4Rotation,
	getTranslation as getMatrix4Translation,
	type Matrix4Like
} from "#Matrix4";
import Quaternion, {
	type QuaternionLike,
	rotateX as quaternionRotateX,
	rotateY as quaternionRotateY,
	rotateZ as quaternionRotateZ
} from "#Quaternion";
import Vector3, { type Vector3Like } from "#Vector3";
import {
	copy as xetReal,
	dot,
	getMagnitude,
	getSquaredMagnitude,
	type Vector4Like
} from "#Vector4";
import epsilon from "#epsilon";

/** A complex number that is commonly used to describe transformations. */
export type DualQuaternionLike =
	| DualQuaternion
	| [number, number, number, number, number, number, number, number];

/**
 * Creates a dual quaternion with the given values.
 * @param x1 The first real component.
 * @param y1 The second real component.
 * @param z1 The third real component.
 * @param w1 The fourth real component.
 * @param x2 The first dual component.
 * @param y2 The second dual component.
 * @param z2 The third dual component.
 * @param w2 The fourth dual component.
 * @param out The dual quaternion to store the result in.
 * @returns A new dual quaternion.
 */
export function fromValues<T extends DualQuaternionLike>(
	x1: number,
	y1: number,
	z1: number,
	w1: number,
	x2: number,
	y2: number,
	z2: number,
	w2: number,
	out: T
): T {
	out[0] = x1;
	out[1] = y1;
	out[2] = z1;
	out[3] = w1;
	out[4] = x2;
	out[5] = y2;
	out[6] = z2;
	out[7] = w2;
	return out;
}

/**
 * Copies the values from one dual quaternion to another.
 * @param dualQuaternion The dual quaternion to copy.
 * @param out The dual quaternion to store the result in.
 * @returns The copy.
 */
export function copy<T extends DualQuaternionLike>(
	dualQuaternion: DualQuaternionLike,
	out: T
): T {
	out[0] = dualQuaternion[0];
	out[1] = dualQuaternion[1];
	out[2] = dualQuaternion[2];
	out[3] = dualQuaternion[3];
	out[4] = dualQuaternion[4];
	out[5] = dualQuaternion[5];
	out[6] = dualQuaternion[6];
	out[7] = dualQuaternion[7];
	return out;
}

/**
 * Creates a dual quaternion from the given quaternion and translation.
 * @param quaternion The quaternion.
 * @param translation The translation.
 * @param out The dual quaternion to store the result in.
 * @returns The dual quaternion.
 */
export function fromRotationTranslation<T extends DualQuaternionLike>(
	quaternion: QuaternionLike,
	translation: Vector3Like,
	out: T
): T {
	const x: number = quaternion[0];
	const y: number = quaternion[1];
	const z: number = quaternion[2];
	const w: number = quaternion[3];

	const ax: number = translation[0] * 0.5;
	const ay: number = translation[1] * 0.5;
	const az: number = translation[2] * 0.5;

	out[0] = x;
	out[1] = y;
	out[2] = z;
	out[3] = w;
	out[4] = ax * w + ay * z - az * y;
	out[5] = ay * w + az * x - ax * z;
	out[6] = az * w + ax * y - ay * x;
	out[7] = -ax * x - ay * y - az * z;
	return out;
}

/**
 * Creates a dual quaternion from the given translation.
 * @param translation The translation.
 * @param out The dual quaternion to store the result in.
 * @returns The dual quaternion.
 */
export function fromTranslation<T extends DualQuaternionLike>(
	translation: Vector3Like,
	out: T
): T {
	out[0] = 0;
	out[1] = 0;
	out[2] = 0;
	out[3] = 1;
	out[4] = translation[0] * 0.5;
	out[5] = translation[1] * 0.5;
	out[6] = translation[2] * 0.5;
	out[7] = 0;
	return out;
}

/**
 * Creates a dual quaternion from the given quaternion.
 * @param quaternion The quaternion.
 * @param out The dual quaternion to store the result in.
 * @returns The dual quaternion.
 */
export function fromRotation<T extends DualQuaternionLike>(
	quaternion: QuaternionLike,
	out: T
): T {
	out[0] = quaternion[0];
	out[1] = quaternion[1];
	out[2] = quaternion[2];
	out[3] = quaternion[3];
	out[4] = 0;
	out[5] = 0;
	out[6] = 0;
	out[7] = 0;
	return out;
}

/** A quaternion that is used to store intermediary values for some functions. */
const rotation: QuaternionLike = new Float32Array(4) as QuaternionLike;

/** A vector that is used to store intermediary values for some functions. */
const translation: Vector3Like = new Float32Array(4) as Vector3Like;

/**
 * Creates a dual quaternion from the given four-by-four matrix.
 * @param matrix The matrix.
 * @param out The dual quaternion to store the result in.
 * @returns The dual quaternion.
 */
export function fromMatrix4<T extends DualQuaternionLike>(
	matrix: Matrix4Like,
	out: T
): T {
	return fromRotationTranslation(
		getMatrix4Rotation(matrix, rotation),
		getMatrix4Translation(matrix, translation),
		out
	);
}

/**
 * Sets a dual quaternion to the identity dual quaternion.
 * @param out The dual quaternion to store the result in.
 * @returns The identity dual quaternion.
 */
export function identity<T extends DualQuaternionLike>(out: T): T {
	out[0] = 0;
	out[1] = 0;
	out[2] = 0;
	out[3] = 1;
	out[4] = 0;
	out[5] = 0;
	out[6] = 0;
	out[7] = 0;
	return out;
}

/**
 * Gets the dual part of a dual quaternion.
 * @param dualQuaternion The dual quaternion.
 * @param out The quaternion to store the result in.
 * @returns The dual part.
 */
export function getDual<T extends QuaternionLike>(
	dualQuaternion: DualQuaternionLike,
	out: T
): T {
	out[0] = dualQuaternion[4];
	out[1] = dualQuaternion[5];
	out[2] = dualQuaternion[6];
	out[3] = dualQuaternion[7];
	return out;
}

/**
 * Sets the dual part of a dual quaternion.
 * @param quaternion The quaternion to set as the dual part.
 * @param out The dual quaternion to store the result in.
 * @returns The dual quaternion.
 */
export function setDual<T extends DualQuaternionLike>(
	quaternion: QuaternionLike,
	out: T
): T {
	out[4] = quaternion[0];
	out[5] = quaternion[1];
	out[6] = quaternion[2];
	out[7] = quaternion[3];
	return out;
}

/**
 * Gets the translation of a normalized dual quaternion.
 * @param dualQuaternion The dual quaternion.
 * @param out The vector to store the result in.
 * @returns The translation.
 */
export function getTranslation<T extends Vector3Like>(
	dualQuaternion: DualQuaternionLike,
	out: T
): T {
	const ax: number = dualQuaternion[4];
	const ay: number = dualQuaternion[5];
	const az: number = dualQuaternion[6];
	const aw: number = dualQuaternion[7];
	const bx: number = -dualQuaternion[0];
	const by: number = -dualQuaternion[1];
	const bz: number = -dualQuaternion[2];
	const bw: number = dualQuaternion[3];

	out[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
	out[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
	out[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
	return out;
}

/**
 * Translates a dual quaternion by the given vector.
 * @param dualQuaternion The dual quaternion.
 * @param vector The vector.
 * @param out The dual quaternion to store the result in.
 * @returns The translated dual quaternion.
 */
export function translate<T extends DualQuaternionLike>(
	dualQuaternion: DualQuaternionLike,
	vector: Vector3Like,
	out: T
): T {
	const ax1: number = dualQuaternion[0];
	const ay1: number = dualQuaternion[1];
	const az1: number = dualQuaternion[2];
	const aw1: number = dualQuaternion[3];

	const bx1: number = vector[0] * 0.5;
	const by1: number = vector[1] * 0.5;
	const bz1: number = vector[2] * 0.5;

	const ax2: number = dualQuaternion[4];
	const ay2: number = dualQuaternion[5];
	const az2: number = dualQuaternion[6];
	const aw2: number = dualQuaternion[7];

	out[0] = ax1;
	out[1] = ay1;
	out[2] = az1;
	out[3] = aw1;
	out[4] = aw1 * bx1 + ay1 * bz1 - az1 * by1 + ax2;
	out[5] = aw1 * by1 + az1 * bx1 - ax1 * bz1 + ay2;
	out[6] = aw1 * bz1 + ax1 * by1 - ay1 * bx1 + az2;
	out[7] = -ax1 * bx1 - ay1 * by1 - az1 * bz1 + aw2;
	return out;
}

/**
 * Rotates a dual quaternion around the X-axis.
 * @param dualQuaternion The dual quaternion.
 * @param radians The angle to rotate by in radians.
 * @param out The dual quaternion to store the result in.
 * @returns The rotated dual quaternion.
 */
export function rotateX<T extends DualQuaternionLike>(
	dualQuaternion: DualQuaternionLike,
	radians: number,
	out: T
): T {
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

	quaternionRotateX(
		dualQuaternion as unknown as QuaternionLike,
		radians,
		out as unknown as QuaternionLike
	);

	bx = out[0];
	by = out[1];
	bz = out[2];
	bw = out[3];

	out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
	out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
	out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
	out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
	return out;
}

/**
 * Rotates a dual quaternion around the Y-axis.
 * @param dualQuaternion The dual quaternion.
 * @param radians The angle to rotate by in radians.
 * @param out The dual quaternion to store the result in.
 * @returns The rotated dual quaternion.
 */
export function rotateY<T extends DualQuaternionLike>(
	dualQuaternion: DualQuaternionLike,
	radians: number,
	out: T
): T {
	let bx: number = -dualQuaternion[0];
	let by: number = -dualQuaternion[1];
	let bz: number = -dualQuaternion[2];
	let bw: number = dualQuaternion[3];

	const ax: number = dualQuaternion[4];
	const ay: number = dualQuaternion[5];
	const az: number = dualQuaternion[6];
	const aw: number = dualQuaternion[7];

	const ax1: number = ax * bw + aw * bx + ay * bz - az * by;
	const ay1: number = ay * bw + aw * by + az * bx - ax * bz;
	const az1: number = az * bw + aw * bz + ax * by - ay * bx;
	const aw1: number = aw * bw - ax * bx - ay * by - az * bz;

	quaternionRotateY(
		dualQuaternion as unknown as QuaternionLike,
		radians,
		out as unknown as QuaternionLike
	);

	bx = out[0];
	by = out[1];
	bz = out[2];
	bw = out[3];

	out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
	out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
	out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
	out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
	return out;
}

/**
 * Rotates a dual quaternion around the Z-axis.
 * @param dualQuaternion The dual quaternion.
 * @param radians The angle to rotate by in radians.
 * @param out The dual quaternion to store the result in.
 * @returns The rotated dual quaternion.
 */
export function rotateZ<T extends DualQuaternionLike>(
	dualQuaternion: DualQuaternionLike,
	radians: number,
	out: T
): T {
	let bx: number = -dualQuaternion[0];
	let by: number = -dualQuaternion[1];
	let bz: number = -dualQuaternion[2];
	let bw: number = dualQuaternion[3];

	const ax: number = dualQuaternion[4];
	const ay: number = dualQuaternion[5];
	const az: number = dualQuaternion[6];
	const aw: number = dualQuaternion[7];

	const ax1: number = ax * bw + aw * bx + ay * bz - az * by;
	const ay1: number = ay * bw + aw * by + az * bx - ax * bz;
	const az1: number = az * bw + aw * bz + ax * by - ay * bx;
	const aw1: number = aw * bw - ax * bx - ay * by - az * bz;

	quaternionRotateZ(
		dualQuaternion as unknown as QuaternionLike,
		radians,
		out as unknown as QuaternionLike
	);

	bx = out[0];
	by = out[1];
	bz = out[2];
	bw = out[3];

	out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
	out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
	out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
	out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
	return out;
}

/**
 * Multiplies a dual quaternion by a quaternion.
 * @param dualQuaternion The dual quaternion.
 * @param quaternion The quaternion.
 * @param out The dual quaternion to store the result in.
 * @returns The rotated dual quaternion.
 */
export function rotateByQuaternionAppend<T extends DualQuaternionLike>(
	dualQuaternion: DualQuaternionLike,
	quaternion: QuaternionLike,
	out: T
): T {
	const qx: number = quaternion[0];
	const qy: number = quaternion[1];
	const qz: number = quaternion[2];
	const qw: number = quaternion[3];

	let ax: number = dualQuaternion[0];
	let ay: number = dualQuaternion[1];
	let az: number = dualQuaternion[2];
	let aw: number = dualQuaternion[3];

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
}

/**
 * Multiplies a quaternion by a dual quaternion.
 * @param quaternion The quaternion.
 * @param dualQuaternion The dual quaternion.
 * @param out The dual quaternion to store the result in.
 * @returns The rotated dual quaternion.
 */
export function rotateByQuaternionPrepend<T extends DualQuaternionLike>(
	quaternion: QuaternionLike,
	dualQuaternion: DualQuaternionLike,
	out: T
): T {
	const qx: number = quaternion[0];
	const qy: number = quaternion[1];
	const qz: number = quaternion[2];
	const qw: number = quaternion[3];

	let bx: number = dualQuaternion[0];
	let by: number = dualQuaternion[1];
	let bz: number = dualQuaternion[2];
	let bw: number = dualQuaternion[3];

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
}

/**
 * Rotates a dual quaternion around an axis.
 * @param dualQuaternion The dual quaternion.
 * @param axis The axis.
 * @param radians The angle of the rotation in radians.
 * @param out The dual quaternion to store the result in.
 * @returns A normalized dual quaternion.
 */
export function rotateAroundAxis<T extends DualQuaternionLike>(
	dualQuaternion: DualQuaternionLike,
	axis: Vector3Like,
	radians: number,
	out: T
): T {
	if (Math.abs(radians) < 0) {
		return copy(dualQuaternion, out);
	}

	const axisLength: number = Math.hypot(axis[0], axis[1], axis[2]);

	const r: number = radians * 0.5;

	const s: number = Math.sin(r);
	const bx: number = (s * axis[0]) / axisLength;
	const by: number = (s * axis[1]) / axisLength;
	const bz: number = (s * axis[2]) / axisLength;
	const bw: number = Math.cos(r);

	let x: number = dualQuaternion[0];
	let y: number = dualQuaternion[1];
	let z: number = dualQuaternion[2];
	let w: number = dualQuaternion[3];

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
}

/**
 * Adds two dual quaternions.
 * @param a The augend.
 * @param b The addend.
 * @param out The dual quaternion to store the result in.
 * @returns The sum.
 */
export function add<T extends DualQuaternionLike>(
	a: DualQuaternionLike,
	b: DualQuaternionLike,
	out: T
): T {
	out[0] = a[0] + b[0];
	out[1] = a[1] + b[1];
	out[2] = a[2] + b[2];
	out[3] = a[3] + b[3];
	out[4] = a[4] + b[4];
	out[5] = a[5] + b[5];
	out[6] = a[6] + b[6];
	out[7] = a[7] + b[7];
	return out;
}

/**
 * Multiplies two dual quaternions.
 * @param a The multiplier.
 * @param b The multiplicand.
 * @param out The dual quaternion to store the result in.
 * @returns The product.
 */
export function multiply<T extends DualQuaternionLike>(
	a: DualQuaternionLike,
	b: DualQuaternionLike,
	out: T
): T {
	const ax0: number = a[0];
	const ay0: number = a[1];
	const az0: number = a[2];
	const aw0: number = a[3];

	const ax1: number = a[4];
	const ay1: number = a[5];
	const az1: number = a[6];
	const aw1: number = a[7];

	const bx0: number = b[0];
	const by0: number = b[1];
	const bz0: number = b[2];
	const bw0: number = b[3];

	const bx1: number = b[4];
	const by1: number = b[5];
	const bz1: number = b[6];
	const bw1: number = b[7];

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
}

/**
 * Multiplies a dual quaternion by a scalar.
 * @param dualQuaternion The multiplicand.
 * @param scalar The multiplier.
 * @param out The dual quaternion to store the result in.
 * @returns The sum.
 */
export function scale<T extends DualQuaternionLike>(
	dualQuaternion: DualQuaternionLike,
	scalar: number,
	out: T
): T {
	out[0] = dualQuaternion[0] * scalar;
	out[1] = dualQuaternion[1] * scalar;
	out[2] = dualQuaternion[2] * scalar;
	out[3] = dualQuaternion[3] * scalar;
	out[4] = dualQuaternion[4] * scalar;
	out[5] = dualQuaternion[5] * scalar;
	out[6] = dualQuaternion[6] * scalar;
	out[7] = dualQuaternion[7] * scalar;
	return out;
}

/**
 * Performs a linear interpolation between two dual quaternions.
 * @param a The first dual quaternion.
 * @param b The second dual quaternion.
 * @param t The interpolation amount in `[0,1]`.
 * @param out The dual quaternion to store the result in.
 * @returns The interpolated value.
 */
export function lerp<T extends DualQuaternionLike>(
	a: DualQuaternionLike,
	b: DualQuaternionLike,
	t: number,
	out: T
): T {
	const mt: number = 1 - t;

	if (dot(a as unknown as Vector4Like, b as unknown as Vector4Like) < epsilon) {
		t = -t;
	}

	out[0] = a[0] * mt + b[0] * t;
	out[1] = a[1] * mt + b[1] * t;
	out[2] = a[2] * mt + b[2] * t;
	out[3] = a[3] * mt + b[3] * t;
	out[4] = a[4] * mt + b[4] * t;
	out[5] = a[5] * mt + b[5] * t;
	out[6] = a[6] * mt + b[6] * t;
	out[7] = a[7] * mt + b[7] * t;
	return out;
}

/**
 * Calculates the inverse of a dual quaternion. If the dual quaternion is normalized, the conjugate is equivalent and faster to calculate.
 * @param dualQuaternion The dual quaternion.
 * @param out The dual quaternion to store the result in.
 * @returns The inverse.
 */
export function invert<T extends DualQuaternionLike>(
	dualQuaternion: DualQuaternionLike,
	out: T
): T {
	const sqm: number = getSquaredMagnitude(
		dualQuaternion as unknown as Vector4Like
	);

	out[0] = -dualQuaternion[0] / sqm;
	out[1] = -dualQuaternion[1] / sqm;
	out[2] = -dualQuaternion[2] / sqm;
	out[3] = dualQuaternion[3] / sqm;
	out[4] = -dualQuaternion[4] / sqm;
	out[5] = -dualQuaternion[5] / sqm;
	out[6] = -dualQuaternion[6] / sqm;
	out[7] = dualQuaternion[7] / sqm;
	return out;
}

/**
 * Calculates the conjugate of a dual quaternion. If the dual quaternion is normalized, this is equivalent to its inverse and faster to calculate.
 * @param dualQuaternion The dual quaternion.
 * @param out The dual quaternion to store the result in.
 * @returns The conjugate.
 */
export function conjugate<T extends DualQuaternionLike>(
	dualQuaternion: DualQuaternionLike,
	out: T
): T {
	out[0] = -dualQuaternion[0];
	out[1] = -dualQuaternion[1];
	out[2] = -dualQuaternion[2];
	out[3] = dualQuaternion[3];
	out[4] = -dualQuaternion[4];
	out[5] = -dualQuaternion[5];
	out[6] = -dualQuaternion[6];
	out[7] = dualQuaternion[7];
	return out;
}

/**
 * Normalizes a dual quaternion.
 * @param dualQuaternion The dual quaternion.
 * @param out The dual quaternion to store the result in.
 * @returns The normalized dual quaternion.
 */
export function normalize<T extends DualQuaternionLike>(
	dualQuaternion: DualQuaternionLike,
	out: T
): T {
	let magnitude: number = getSquaredMagnitude(
		dualQuaternion as unknown as Vector4Like
	);
	if (magnitude > 0) {
		magnitude = Math.sqrt(magnitude);

		const a0: number = dualQuaternion[0] / magnitude;
		const a1: number = dualQuaternion[1] / magnitude;
		const a2: number = dualQuaternion[2] / magnitude;
		const a3: number = dualQuaternion[3] / magnitude;
		const b0: number = dualQuaternion[4];
		const b1: number = dualQuaternion[5];
		const b2: number = dualQuaternion[6];
		const b3: number = dualQuaternion[7];

		const a_dot_b: number = a0 * b0 + a1 * b1 + a2 * b2 + a3 * b3;

		out[0] = a0;
		out[1] = a1;
		out[2] = a2;
		out[3] = a3;
		out[4] = (b0 - a0 * a_dot_b) / magnitude;
		out[5] = (b1 - a1 * a_dot_b) / magnitude;
		out[6] = (b2 - a2 * a_dot_b) / magnitude;
		out[7] = (b3 - a3 * a_dot_b) / magnitude;
	}
	return out;
}

/**
 * Determines whether two dual quaternions are exactly equivalent.
 * @param a The first dual quaternion.
 * @param b The second dual quaternion.
 * @returns Whether the dual quaternions are equivalent.
 */
export function exactEquals(
	a: DualQuaternionLike,
	b: DualQuaternionLike
): boolean {
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
}

/**
 * Determines whether two dual quaternions are roughly equivalent.
 * @param a The first dual quaternion.
 * @param b The second dual quaternion.
 * @returns Whether the dual quaternions are equivalent.
 */
export function equals(a: DualQuaternionLike, b: DualQuaternionLike): boolean {
	const a0: number = a[0];
	const a1: number = a[1];
	const a2: number = a[2];
	const a3: number = a[3];
	const a4: number = a[4];
	const a5: number = a[5];
	const a6: number = a[6];
	const a7: number = a[7];

	const b0: number = b[0];
	const b1: number = b[1];
	const b2: number = b[2];
	const b3: number = b[3];
	const b4: number = b[4];
	const b5: number = b[5];
	const b6: number = b[6];
	const b7: number = b[7];

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
}

/**
 * A complex number that is commonly used to describe transformations.
 * @see [Dual quaternion](https://en.wikipedia.org/wiki/Dual_quaternion)
 */
export default class DualQuaternion extends Float32Array {
	/**
	 * Creates a dual quaternion with the given values.
	 * @param x1 The first real component.
	 * @param y1 The second real component.
	 * @param z1 The third real component.
	 * @param w1 The fourth real component.
	 * @param x2 The first dual component.
	 * @param y2 The second dual component.
	 * @param z2 The third dual component.
	 * @param w2 The fourth dual component.
	 * @returns A new dual quaternion.
	 */
	public static fromValues(
		x1: number,
		y1: number,
		z1: number,
		w1: number,
		x2: number,
		y2: number,
		z2: number,
		w2: number
	): DualQuaternion;

	/**
	 * Creates a dual quaternion with the given values.
	 * @param x1 The first real component.
	 * @param y1 The second real component.
	 * @param z1 The third real component.
	 * @param w1 The fourth real component.
	 * @param x2 The first dual component.
	 * @param y2 The second dual component.
	 * @param z2 The third dual component.
	 * @param w2 The fourth dual component.
	 * @param out The dual quaternion to store the result in.
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
		out: T
	): T;

	public static fromValues<T extends DualQuaternionLike>(
		x1: number,
		y1: number,
		z1: number,
		w1: number,
		x2: number,
		y2: number,
		z2: number,
		w2: number,
		out: T = new DualQuaternion() as T
	): T {
		return fromValues(x1, y1, z1, w1, x2, y2, z2, w2, out);
	}

	/**
	 * Creates a dual quaternion from the given quaternion and translation.
	 * @param quaternion The quaternion.
	 * @param translation The translation.
	 * @returns The dual quaternion.
	 */
	public static fromRotationTranslation(
		quaternion: QuaternionLike,
		translation: Vector3Like
	): DualQuaternion;

	/**
	 * Creates a dual quaternion from the given quaternion and translation.
	 * @param quaternion The quaternion.
	 * @param translation The translation.
	 * @param out The dual quaternion to store the result in.
	 * @returns The dual quaternion.
	 */
	public static fromRotationTranslation<T extends DualQuaternionLike>(
		quaternion: QuaternionLike,
		translation: Vector3Like,
		out: T
	): T;

	public static fromRotationTranslation<T extends DualQuaternionLike>(
		quaternion: QuaternionLike,
		translation: Vector3Like,
		out: T = new DualQuaternion() as T
	): T {
		return fromRotationTranslation(quaternion, translation, out);
	}

	/**
	 * Creates a dual quaternion from the given translation.
	 * @param translation The translation.
	 * @returns The dual quaternion.
	 */
	public static fromTranslation(translation: Vector3Like): DualQuaternion;

	/**
	 * Creates a dual quaternion from the given translation.
	 * @param translation The translation.
	 * @param out The dual quaternion to store the result in.
	 * @returns The dual quaternion.
	 */
	public static fromTranslation<T extends DualQuaternionLike>(
		translation: Vector3Like,
		out: T
	): T;

	public static fromTranslation<T extends DualQuaternionLike>(
		translation: Vector3Like,
		out: T = new DualQuaternion() as T
	): T {
		return fromTranslation(translation, out);
	}

	/**
	 * Creates a dual quaternion from the given quaternion.
	 * @param quaternion The quaternion.
	 * @returns The dual quaternion.
	 */
	public static fromRotation(quaternion: QuaternionLike): DualQuaternion;

	/**
	 * Creates a dual quaternion from the given quaternion.
	 * @param quaternion The quaternion.
	 * @param out The dual quaternion to store the result in.
	 * @returns The dual quaternion.
	 */
	public static fromRotation<T extends DualQuaternionLike>(
		quaternion: QuaternionLike,
		out: T
	): T;

	public static fromRotation<T extends DualQuaternionLike>(
		quaternion: QuaternionLike,
		out: T = new DualQuaternion() as T
	): T {
		return fromRotation(quaternion, out);
	}

	/**
	 * Creates a dual quaternion from the given four-by-four matrix.
	 * @param matrix The matrix.
	 * @returns The dual quaternion.
	 */
	public static fromMatrix4(matrix: Matrix4Like): DualQuaternion;

	/**
	 * Creates a dual quaternion from the given four-by-four matrix.
	 * @param matrix The matrix.
	 * @param out The dual quaternion to store the result in.
	 * @returns The dual quaternion.
	 */
	public static fromMatrix4<T extends DualQuaternionLike>(
		matrix: Matrix4Like,
		out: T
	): T;

	public static fromMatrix4<T extends DualQuaternionLike>(
		matrix: Matrix4Like,
		out: T = new DualQuaternion() as T
	): T {
		return fromMatrix4(matrix, out);
	}

	/**
	 * Creates an identity dual quaternion.
	 * @see [Dual quaternion](https://en.wikipedia.org/wiki/Dual_quaternion)
	 */
	public constructor() {
		super(8);
		this[3] = 1;
	}

	/**
	 * Copies the values from another dual quaternion to this one.
	 * @param dualQuaternion The dual quaternion to copy.
	 * @returns This dual quaternion.
	 */
	public copy(dualQuaternion: DualQuaternionLike): this {
		return copy(dualQuaternion, this);
	}

	/**
	 * Creates a copy of this dual quaternion.
	 * @returns The copy.
	 */
	public clone(): DualQuaternion;

	/**
	 * Copies the values from this dual quaternion to another one.
	 * @param out The dual quaternion to store the result in.
	 * @returns The copy.
	 */
	public clone<T extends DualQuaternionLike>(out: T): T;

	public clone<T extends DualQuaternionLike>(
		out: T = new DualQuaternion() as T
	): T {
		return copy(this, out);
	}

	/**
	 * Sets this dual quaternion to the identity dual quaternion.
	 * @returns The identity dual quaternion.
	 */
	public identity(): this {
		return identity(this);
	}

	/**
	 * Gets the real part of this dual quaternion.
	 * @returns The real part.
	 */
	public getReal(): Quaternion;

	/**
	 * Gets the real part of this dual quaternion.
	 * @param out The quaternion to store the result in.
	 * @returns The real part.
	 */
	public getReal<T extends QuaternionLike>(out: T): T;

	public getReal<T extends QuaternionLike>(out: T = new Quaternion() as T): T {
		return xetReal(this as unknown as Vector4Like, out as Vector4Like) as T;
	}

	/**
	 * Sets the real part of this dual quaternion.
	 * @param quaternion The quaternion.
	 */
	public setReal(quaternion: QuaternionLike): void {
		xetReal(quaternion as Vector4Like, this as unknown as Vector4Like);
	}

	/**
	 * Gets the dual part of this dual quaternion.
	 * @returns The dual part.
	 */
	public getDual(): Quaternion;

	/**
	 * Gets the dual part of this dual quaternion.
	 * @param out The quaternion to store the result in.
	 * @returns The dual part.
	 */
	public getDual<T extends QuaternionLike>(out: T): T;

	public getDual<T extends QuaternionLike>(out: T = new Quaternion() as T): T {
		return getDual(this, out);
	}

	/**
	 * Sets the real part of this dual quaternion.
	 * @param quaternion The quaternion.
	 */
	public setDual(quaternion: QuaternionLike): void {
		setDual(quaternion, this);
	}

	/**
	 * Gets the translation of this normalized dual quaternion.
	 * @returns The translation.
	 */
	public getTranslation(): Vector3;

	/**
	 * Gets the translation of this normalized dual quaternion.
	 * @param out The vector to store the result in.
	 * @returns The translation.
	 */
	public getTranslation<T extends Vector3Like>(out: T): T;

	public getTranslation<T extends Vector3Like>(out: T = new Vector3() as T): T {
		return getTranslation(this, out);
	}

	/**
	 * Translates this dual quaternion by the given vector.
	 * @param vector The vector.
	 * @returns The translated dual quaternion.
	 */
	public translate(vector: Vector3Like): DualQuaternion;

	/**
	 * Translates this dual quaternion by the given vector.
	 * @param vector The vector.
	 * @param out The dual quaternion to store the result in.
	 * @returns The translated dual quaternion.
	 */
	public translate<T extends DualQuaternionLike>(
		vector: Vector3Like,
		out: T
	): T;

	public translate<T extends DualQuaternionLike>(
		vector: Vector3Like,
		out: T = new DualQuaternion() as T
	): T {
		return translate(this, vector, out);
	}

	/**
	 * Rotates this dual quaternion around the X-axis.
	 * @param radians The angle to rotate by in radians.
	 * @returns The rotated dual quaternion.
	 */
	public rotateX(radians: number): DualQuaternion;

	/**
	 * Rotates this dual quaternion around the X-axis.
	 * @param radians The angle to rotate by in radians.
	 * @param out The dual quaternion to store the result in.
	 * @returns The rotated dual quaternion.
	 */
	public rotateX<T extends DualQuaternionLike>(radians: number, out: T): T;

	public rotateX<T extends DualQuaternionLike>(
		radians: number,
		out: T = new DualQuaternion() as T
	): T {
		return rotateX(this, radians, out);
	}

	/**
	 * Rotates this dual quaternion around the Y-axis.
	 * @param radians The angle to rotate by in radians.
	 * @returns The rotated dual quaternion.
	 */
	public rotateY(radians: number): DualQuaternion;

	/**
	 * Rotates this dual quaternion around the Y-axis.
	 * @param radians The angle to rotate by in radians.
	 * @param out The dual quaternion to store the result in.
	 * @returns The rotated dual quaternion.
	 */
	public rotateY<T extends DualQuaternionLike>(radians: number, out: T): T;

	public rotateY<T extends DualQuaternionLike>(
		radians: number,
		out: T = new DualQuaternion() as T
	): T {
		return rotateY(this, radians, out);
	}

	/**
	 * Rotates this dual quaternion around the Z-axis.
	 * @param radians The angle to rotate by in radians.
	 * @returns The rotated dual quaternion.
	 */
	public rotateZ(radians: number): DualQuaternion;

	/**
	 * Rotates this dual quaternion around the Z-axis.
	 * @param radians The angle to rotate by in radians.
	 * @param out The dual quaternion to store the result in.
	 * @returns The rotated dual quaternion.
	 */
	public rotateZ<T extends DualQuaternionLike>(radians: number, out: T): T;

	public rotateZ<T extends DualQuaternionLike>(
		radians: number,
		out: T = new DualQuaternion() as T
	): T {
		return rotateZ(this, radians, out);
	}

	/**
	 * Multiplies this dual quaternion by a quaternion.
	 * @param quaternion The quaternion.
	 * @returns The rotated dual quaternion.
	 * @see [Quaternion](https://en.wikipedia.org/wiki/Quaternion)
	 */
	public rotateByQuaternionAppend(quaternion: QuaternionLike): DualQuaternion;

	/**
	 * Multiplies this dual quaternion by a quaternion.
	 * @param quaternion The quaternion.
	 * @param out The dual quaternion to store the result in.
	 * @returns The rotated dual quaternion.
	 * @see [Quaternion](https://en.wikipedia.org/wiki/Quaternion)
	 */
	public rotateByQuaternionAppend<T extends DualQuaternionLike>(
		quaternion: QuaternionLike,
		out: T
	): T;

	public rotateByQuaternionAppend<T extends DualQuaternionLike>(
		quaternion: QuaternionLike,
		out: T = new DualQuaternion() as T
	): T {
		return rotateByQuaternionAppend(this, quaternion, out);
	}

	/**
	 * Multiplies a quaternion by this dual quaternion.
	 * @param quaternion The quaternion.
	 * @returns The rotated dual quaternion.
	 * @see [Quaternion](https://en.wikipedia.org/wiki/Quaternion)
	 */
	public rotateByQuaternionPrepend(quaternion: QuaternionLike): DualQuaternion;

	/**
	 * Multiplies a quaternion by this dual quaternion.
	 * @param quaternion The quaternion.
	 * @param out The dual quaternion to store the result in.
	 * @returns The rotated dual quaternion.
	 * @see [Quaternion](https://en.wikipedia.org/wiki/Quaternion)
	 */
	public rotateByQuaternionPrepend<T extends DualQuaternionLike>(
		quaternion: QuaternionLike,
		out: T
	): T;

	public rotateByQuaternionPrepend<T extends DualQuaternionLike>(
		quaternion: QuaternionLike,
		out: T = new DualQuaternion() as T
	): T {
		return rotateByQuaternionPrepend(quaternion, this, out);
	}

	/**
	 * Rotates this dual quaternion around an axis.
	 * @param axis The axis.
	 * @param radians The angle of the rotation in radians.
	 * @returns A normalized dual quaternion.
	 */
	public rotateAroundAxis(axis: Vector3Like, radians: number): DualQuaternion;

	/**
	 * Rotates this dual quaternion around an axis.
	 * @param axis The axis.
	 * @param radians The angle of the rotation in radians.
	 * @param out The dual quaternion to store the result in.
	 * @returns A normalized dual quaternion.
	 */
	public rotateAroundAxis<T extends DualQuaternionLike>(
		axis: Vector3Like,
		radians: number,
		out: T
	): T;

	public rotateAroundAxis<T extends DualQuaternionLike>(
		axis: Vector3Like,
		radians: number,
		out: T = new DualQuaternion() as T
	): T {
		return rotateAroundAxis(this, axis, radians, out);
	}

	/**
	 * Adds another dual quaternion to this one.
	 * @param dualQuaternion The other dual quaternion.
	 * @returns The sum.
	 */
	public add(dualQuaternion: DualQuaternionLike): DualQuaternion;

	/**
	 * Adds another dual quaternion to this one.
	 * @param dualQuaternion The other dual quaternion.
	 * @param out The dual quaternion to store the result in.
	 * @returns The sum.
	 */
	public add<T extends DualQuaternionLike>(
		dualQuaternion: DualQuaternionLike,
		out: T
	): T;

	public add<T extends DualQuaternionLike>(
		dualQuaternion: DualQuaternionLike,
		out: T = new DualQuaternion() as T
	): T {
		return add(this, dualQuaternion, out);
	}

	/**
	 * Multiplies this dual quaternion by another one.
	 * @param dualQuaternion The other dual quaternion.
	 * @returns The product.
	 */
	public multiply(dualQuaternion: DualQuaternionLike): DualQuaternion;

	/**
	 * Multiplies this dual quaternion by another one.
	 * @param dualQuaternion The other dual quaternion.
	 * @param out The dual quaternion to store the result in.
	 * @returns The product.
	 */
	public multiply<T extends DualQuaternionLike>(
		dualQuaternion: DualQuaternionLike,
		out: T
	): T;

	public multiply<T extends DualQuaternionLike>(
		dualQuaternion: DualQuaternionLike,
		out: T = new DualQuaternion() as T
	): T {
		return multiply(this, dualQuaternion, out);
	}

	/**
	 * Multiplies this dual quaternion by a scalar.
	 * @param scalar The scalar.
	 * @returns The product.
	 */
	public scale(scalar: number): DualQuaternion;

	/**
	 * Multiplies this dual quaternion by a scalar.
	 * @param scalar The scalar.
	 * @param out The dual quaternion to store the result in.
	 * @returns The product.
	 */
	public scale<T extends DualQuaternionLike>(scalar: number, out: T): T;

	public scale<T extends DualQuaternionLike>(
		scalar: number,
		out: T = new DualQuaternion() as T
	): T {
		return scale(this, scalar, out);
	}

	/**
	 * Calculates the dot product of this and another dual quaternion.
	 * @param dualQuaternion The other dual quaternion.
	 * @returns The dot product.
	 * @see [Dot product](https://en.wikipedia.org/wiki/Dot_product)
	 */
	public dot(dualQuaternion: DualQuaternionLike): number {
		return dot(
			this as unknown as Vector4Like,
			dualQuaternion as unknown as Vector4Like
		);
	}

	/**
	 * Performs a linear interpolation between this and another dual quaternion.
	 * @param dualQuaternion The other dual quaternion.
	 * @param t The interpolation amount in `[0,1]`.
	 * @returns The interpolated value.
	 */
	public lerp(dualQuaternion: DualQuaternionLike, t: number): DualQuaternion;

	/**
	 * Performs a linear interpolation between this and another dual quaternion.
	 * @param dualQuaternion The other dual quaternion.
	 * @param t The interpolation amount in `[0,1]`.
	 * @param out The dual quaternion to store the result in.
	 * @returns The interpolated value.
	 */
	public lerp<T extends DualQuaternionLike>(
		dualQuaternion: DualQuaternionLike,
		t: number,
		out: T
	): T;

	public lerp<T extends DualQuaternionLike>(
		dualQuaternion: DualQuaternionLike,
		t: number,
		out: T = new DualQuaternion() as T
	): T {
		return lerp(this, dualQuaternion, t, out);
	}

	/**
	 * Calculates the inverse of this dual quaternion. If this dual quaternion is normalized, the conjugate is equivalent and faster to calculate.
	 * @returns The inverse.
	 */
	public invert(): DualQuaternion;

	/**
	 * Calculates the inverse of this dual quaternion. If this dual quaternion is normalized, the conjugate is equivalent and faster to calculate.
	 * @param out The dual quaternion to store the result in.
	 * @returns The inverse.
	 */
	public invert<T extends DualQuaternionLike>(out: T): T;

	public invert<T extends DualQuaternionLike>(
		out: T = new DualQuaternion() as T
	): T {
		return invert(this, out);
	}

	/**
	 * Calculates the conjugate of this dual quaternion. If this dual quaternion is normalized, this is equivalent to its inverse and faster to calculate.
	 * @returns The conjugate.
	 */
	public conjugate(): DualQuaternion;

	/**
	 * Calculates the conjugate of this dual quaternion. If this dual quaternion is normalized, this is equivalent to its inverse and faster to calculate.
	 * @param out The dual quaternion to store the result in.
	 * @returns The conjugate.
	 */
	public conjugate<T extends DualQuaternionLike>(out: T): T;

	public conjugate<T extends DualQuaternionLike>(
		out: T = new DualQuaternion() as T
	): T {
		return conjugate(this, out);
	}

	/** The magnitude (length) of this dual quaternion. */
	public get magnitude(): number {
		return getMagnitude(this as unknown as Vector4Like);
	}

	/** The squared magnitude (length) of this dual quaternion. */
	public get squaredMagnitude(): number {
		return getSquaredMagnitude(this as unknown as Vector4Like);
	}

	/**
	 * Normalizes this dual quaternion.
	 * @returns The normalized dual quaternion.
	 */
	public normalize(): DualQuaternion;

	/**
	 * Normalizes this dual quaternion.
	 * @param out The dual quaternion to store the result in.
	 * @returns The normalized dual quaternion.
	 */
	public normalize<T extends DualQuaternionLike>(out: T): T;

	public normalize<T extends DualQuaternionLike>(
		out: T = new DualQuaternion() as T
	): T {
		return normalize(this, out);
	}

	/**
	 * Determines whether this dual quaternion is exactly equivalent to another.
	 * @param dualQuaternion The other dual quaternion.
	 * @returns Whether the dual quaternions are equivalent.
	 */
	public exactEquals(dualQuaternion: DualQuaternionLike): boolean {
		return exactEquals(this, dualQuaternion);
	}

	/**
	 * Determines whether this dual quaternion is roughly equivalent to another.
	 * @param dualQuaternion The other dual quaternion.
	 * @returns Whether the dual quaternions are equivalent.
	 */
	public equals(dualQuaternion: DualQuaternionLike): boolean {
		return equals(this, dualQuaternion);
	}
}
