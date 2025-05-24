import {
	type Matrix4Like,
	getScaling as matrix4GetScaling
} from "./Matrix4.js";
import Quaternion, {
	type QuaternionLike,
	rotateX as quaternionRotateX,
	rotateY as quaternionRotateY,
	rotateZ as quaternionRotateZ
} from "./Quaternion.js";
import Vector3, {
	type Vector3Like,
	createVector3Like,
	fromValues as vector3FromValues
} from "./Vector3.js";
import {
	copy as vector4Copy,
	dot as vector4Dot,
	fromValues as vector4FromValues,
	getMagnitude as vector4GetMagnitude,
	getSquaredMagnitude as vector4GetSquaredMagnitude
} from "./Vector4.js";
import approxRelative from "../algorithms/approxRelative.js";
import epsilon from "../utility/epsilon.js";

/**
 * A complex number that is commonly used to describe transformations.
 * @public
 */
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
 * @public
 */
export const createDualQuaternionLike = (): Float32Array &
	DualQuaternionLike => {
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
 * @public
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
 * @public
 */
export const copy = <T extends DualQuaternionLike>(
	dualQuaternion: DualQuaternionLike,
	out: T
): T =>
	fromValues(
		dualQuaternion[0],
		dualQuaternion[1],
		dualQuaternion[2],
		dualQuaternion[3],
		dualQuaternion[4],
		dualQuaternion[5],
		dualQuaternion[6],
		dualQuaternion[7],
		out
	);

/**
 * Create a dual quaternion from the given rotation and translation.
 * @param quaternion - The rotation quaternion.
 * @param translation - The translation vector.
 * @param out - The dual quaternion to store the result in.
 * @returns The dual quaternion.
 * @public
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

	const ax = translation[0] / 2;
	const ay = translation[1] / 2;
	const az = translation[2] / 2;

	return fromValues(
		x,
		y,
		z,
		w,
		ax * w + ay * z - az * y,
		ay * w + az * x - ax * z,
		az * w + ax * y - ay * x,
		-ax * x - ay * y - az * z,
		out
	);
};

/**
 * Create a dual quaternion from the given translation.
 * @param translation - The translation vector.
 * @param out - The dual quaternion to store the result in.
 * @returns The dual quaternion.
 * @public
 */
export const fromTranslation = <T extends DualQuaternionLike>(
	translation: Vector3Like,
	out: T
): T =>
	fromValues(
		0,
		0,
		0,
		1,
		translation[0] / 2,
		translation[1] / 2,
		translation[2] / 2,
		0,
		out
	);

/**
 * Create a dual quaternion from the given rotation.
 * @param quaternion - The rotation quaternion.
 * @param out - The dual quaternion to store the result in.
 * @returns The dual quaternion.
 * @public
 */
export const fromRotation = <T extends DualQuaternionLike>(
	quaternion: QuaternionLike,
	out: T
): T =>
	fromValues(
		quaternion[0],
		quaternion[1],
		quaternion[2],
		quaternion[3],
		0,
		0,
		0,
		0,
		out
	);

// Used to store intermediary values for some functions.
const iv3 = createVector3Like();

/**
 * Create a dual quaternion from the given four-by-four matrix. Equivalent to (but faster than) `fromRotationTranslation(getRotation(matrix, createQuaternionLike()), getTranslation(matrix, createVector3Like()), out)`.
 * @param matrix - The matrix.
 * @param out - The dual quaternion to store the result in.
 * @returns The dual quaternion.
 * @public
 */
export const fromMatrix4 = <T extends DualQuaternionLike>(
	matrix: Matrix4Like,
	out: T
): T => {
	matrix4GetScaling(matrix, iv3);

	const is1 = 1 / iv3[0];
	const is2 = 1 / iv3[1];
	const is3 = 1 / iv3[2];

	const sm11 = matrix[0] * is1;
	const sm12 = matrix[1] * is2;
	const sm13 = matrix[2] * is3;
	const sm21 = matrix[4] * is1;
	const sm22 = matrix[5] * is2;
	const sm23 = matrix[6] * is3;
	const sm31 = matrix[8] * is1;
	const sm32 = matrix[9] * is2;
	const sm33 = matrix[10] * is3;

	const trace = sm11 + sm22 + sm33;

	// eslint-disable-next-line init-declarations
	let x;
	// eslint-disable-next-line init-declarations
	let y;
	// eslint-disable-next-line init-declarations
	let z;
	// eslint-disable-next-line init-declarations
	let w;
	if (trace > 0) {
		const s = Math.sqrt(trace + 1) * 2;
		x = (sm23 - sm32) / s;
		y = (sm31 - sm13) / s;
		z = (sm12 - sm21) / s;
		w = 0.25 * s;
	} else if (sm11 > sm22 && sm11 > sm33) {
		const s = Math.sqrt(1 + sm11 - sm22 - sm33) * 2;
		x = 0.25 * s;
		y = (sm12 + sm21) / s;
		z = (sm31 + sm13) / s;
		w = (sm23 - sm32) / s;
	} else if (sm22 > sm33) {
		const s = Math.sqrt(1 + sm22 - sm11 - sm33) * 2;
		x = (sm12 + sm21) / s;
		y = 0.25 * s;
		z = (sm23 + sm32) / s;
		w = (sm31 - sm13) / s;
	} else {
		const s = Math.sqrt(1 + sm33 - sm11 - sm22) * 2;
		x = (sm31 + sm13) / s;
		y = (sm23 + sm32) / s;
		z = 0.25 * s;
		w = (sm12 - sm21) / s;
	}

	const ax = matrix[12] / 2;
	const ay = matrix[13] / 2;
	const az = matrix[14] / 2;

	return fromValues(
		x,
		y,
		z,
		w,
		ax * w + ay * z - az * y,
		ay * w + az * x - ax * z,
		az * w + ax * y - ay * x,
		-ax * x - ay * y - az * z,
		out
	);
};

/**
 * Set a dual quaternion to the identity dual quaternion.
 * @param out - The dual quaternion to store the result in.
 * @returns The identity dual quaternion.
 * @public
 */
export const identity = <T extends DualQuaternionLike>(out: T): T =>
	fromValues(0, 0, 0, 1, 0, 0, 0, 0, out);

/**
 * Get the real part of a dual quaternion.
 * @param dualQuaternion - The dual quaternion.
 * @param out - The quaternion to store the result in.
 * @returns The real part.
 * @public
 */
export const getReal: <T extends QuaternionLike>(
	dualQuaternion: DualQuaternionLike,
	out: T
) => T = vector4Copy;

/**
 * Get the dual part of a dual quaternion.
 * @param dualQuaternion - The dual quaternion.
 * @param out - The quaternion to store the result in.
 * @returns The dual part.
 * @public
 */
export const getDual = <T extends QuaternionLike>(
	dualQuaternion: DualQuaternionLike,
	out: T
): T =>
	vector4FromValues(
		dualQuaternion[4],
		dualQuaternion[5],
		dualQuaternion[6],
		dualQuaternion[7],
		out
	);

/**
 * Set the real part of a dual quaternion.
 * @param quaternion - The quaternion to set as the real part.
 * @param out - The dual quaternion to store the result in.
 * @returns The dual quaternion.
 * @public
 */
export const setReal: <T extends DualQuaternionLike>(
	quaternion: QuaternionLike,
	out: T
) => T = vector4Copy;

/**
 * Set the dual part of a dual quaternion.
 * @param quaternion - The quaternion to set as the dual part.
 * @param out - The dual quaternion to store the result in.
 * @returns The dual quaternion.
 * @public
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
 * @returns The translation vector.
 * @public
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

	return vector3FromValues(
		(ax * bw + aw * bx + ay * bz - az * by) * 2,
		(ay * bw + aw * by + az * bx - ax * bz) * 2,
		(az * bw + aw * bz + ax * by - ay * bx) * 2,
		out
	);
};

/**
 * Translate a dual quaternion by the given vector.
 * @param dualQuaternion - The dual quaternion.
 * @param vector - The vector.
 * @param out - The dual quaternion to store the result in.
 * @returns The translated dual quaternion.
 * @public
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

	const bx1 = vector[0] / 2;
	const by1 = vector[1] / 2;
	const bz1 = vector[2] / 2;

	const ax2 = dualQuaternion[4];
	const ay2 = dualQuaternion[5];
	const az2 = dualQuaternion[6];
	const aw2 = dualQuaternion[7];

	return fromValues(
		ax1,
		ay1,
		az1,
		aw1,
		aw1 * bx1 + ay1 * bz1 - az1 * by1 + ax2,
		aw1 * by1 + az1 * bx1 - ax1 * bz1 + ay2,
		aw1 * bz1 + ax1 * by1 - ay1 * bx1 + az2,
		-ax1 * bx1 - ay1 * by1 - az1 * bz1 + aw2,
		out
	);
};

/**
 * Rotate a dual quaternion around the X-axis.
 * @param dualQuaternion - The dual quaternion.
 * @param radians - The angle to rotate by in radians.
 * @param out - The dual quaternion to store the result in.
 * @returns The rotated dual quaternion.
 * @public
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
 * @public
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
 * @public
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
 * Rotate a dual quaternion by a quaternion (using the quaternion as the multiplicand).
 * @param dualQuaternion - The dual quaternion to rotate.
 * @param quaternion - The quaternion to rotate by.
 * @param out - The dual quaternion to store the result in.
 * @returns The rotated dual quaternion.
 * @public
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
 * Rotate a dual quaternion by a quaternion (using the quaternion as the multiplier).
 * @param quaternion - The quaternion to rotate by.
 * @param dualQuaternion - The dual quaternion to rotate.
 * @param out - The dual quaternion to store the result in.
 * @returns The rotated dual quaternion.
 * @public
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
 * @public
 */
export const rotateAroundAxis = <T extends DualQuaternionLike>(
	dualQuaternion: DualQuaternionLike,
	axis: Vector3Like,
	radians: number,
	out: T
): T => {
	// Negligible rotation.
	if (Math.abs(radians) < epsilon) {
		return copy(dualQuaternion, out);
	}

	const ax = axis[0];
	const ay = axis[1];
	const az = axis[2];
	const axisLength = Math.sqrt(ax * ax + ay * ay + az * az); // `Math.hypot` is slower.

	const r = radians / 2;

	const s = Math.sin(r);
	const bx = (s * ax) / axisLength;
	const by = (s * ay) / axisLength;
	const bz = (s * az) / axisLength;
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
 * @public
 */
export const add = <T extends DualQuaternionLike>(
	a: DualQuaternionLike,
	b: DualQuaternionLike,
	out: T
): T =>
	fromValues(
		a[0] + b[0],
		a[1] + b[1],
		a[2] + b[2],
		a[3] + b[3],
		a[4] + b[4],
		a[5] + b[5],
		a[6] + b[6],
		a[7] + b[7],
		out
	);

/**
 * Multiply two dual quaternions.
 * @param a - The multiplier.
 * @param b - The multiplicand.
 * @param out - The dual quaternion to store the result in.
 * @returns The product.
 * @public
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

	return fromValues(
		ax0 * bw0 + aw0 * bx0 + ay0 * bz0 - az0 * by0,
		ay0 * bw0 + aw0 * by0 + az0 * bx0 - ax0 * bz0,
		az0 * bw0 + aw0 * bz0 + ax0 * by0 - ay0 * bx0,
		aw0 * bw0 - ax0 * bx0 - ay0 * by0 - az0 * bz0,
		ax0 * bw1 +
			aw0 * bx1 +
			ay0 * bz1 -
			az0 * by1 +
			ax1 * bw0 +
			aw1 * bx0 +
			ay1 * bz0 -
			az1 * by0,
		ay0 * bw1 +
			aw0 * by1 +
			az0 * bx1 -
			ax0 * bz1 +
			ay1 * bw0 +
			aw1 * by0 +
			az1 * bx0 -
			ax1 * bz0,
		az0 * bw1 +
			aw0 * bz1 +
			ax0 * by1 -
			ay0 * bx1 +
			az1 * bw0 +
			aw1 * bz0 +
			ax1 * by0 -
			ay1 * bx0,
		aw0 * bw1 -
			ax0 * bx1 -
			ay0 * by1 -
			az0 * bz1 +
			aw1 * bw0 -
			ax1 * bx0 -
			ay1 * by0 -
			az1 * bz0,
		out
	);
};

/**
 * Multiply a dual quaternion by a scalar.
 * @param dualQuaternion - The multiplicand (dual quaternion).
 * @param scalar - The multiplier (scalar) to scale the dual quaternion by.
 * @param out - The dual quaternion to store the result in.
 * @returns The product.
 * @public
 */
export const scale = <T extends DualQuaternionLike>(
	dualQuaternion: DualQuaternionLike,
	scalar: number,
	out: T
): T =>
	fromValues(
		dualQuaternion[0] * scalar,
		dualQuaternion[1] * scalar,
		dualQuaternion[2] * scalar,
		dualQuaternion[3] * scalar,
		dualQuaternion[4] * scalar,
		dualQuaternion[5] * scalar,
		dualQuaternion[6] * scalar,
		dualQuaternion[7] * scalar,
		out
	);

/**
 * Calculate the dot product of two dual quaternions.
 * @param a - The multiplier.
 * @param b - The multiplicand.
 * @returns The dot product.
 * @see {@link https://en.wikipedia.org/wiki/Dot_product | Dot product}
 * @public
 */
export const dot: (a: DualQuaternionLike, b: DualQuaternionLike) => number =
	vector4Dot;

/**
 * Perform a linear interpolation between two dual quaternions.
 * @param a - The first dual quaternion.
 * @param b - The second dual quaternion.
 * @param t - The interpolation amount in `[0,1]`.
 * @param out - The dual quaternion to store the result in. Will not always be normalized (most noticeable when `t === 0.5`).
 * @returns The interpolated value.
 * @public
 */
export const lerp = <T extends DualQuaternionLike>(
	a: DualQuaternionLike,
	b: DualQuaternionLike,
	t: number,
	out: T
): T => {
	const mt = 1 - t;
	const it = dot(a, b) < 0 ? -t : t;

	return fromValues(
		a[0] * mt + b[0] * it,
		a[1] * mt + b[1] * it,
		a[2] * mt + b[2] * it,
		a[3] * mt + b[3] * it,
		a[4] * mt + b[4] * it,
		a[5] * mt + b[5] * it,
		a[6] * mt + b[6] * it,
		a[7] * mt + b[7] * it,
		out
	);
};

/**
 * Calculate the magnitude (length) of a dual quaternion.
 * @param dualQuaternion - The dual quaternion.
 * @returns The magnitude.
 * @public
 */
export const getMagnitude: (dualQuaternion: DualQuaternionLike) => number =
	vector4GetMagnitude;

/**
 * Calculate the squared magnitude (length) of a dual quaternion.
 * @param dualQuaternion - The dual quaternion.
 * @returns The squared magnitude.
 * @public
 */
export const getSquaredMagnitude: (
	dualQuaternion: DualQuaternionLike
) => number = vector4GetSquaredMagnitude;

/**
 * Calculate the inverse of a dual quaternion. If the dual quaternion is normalized, the conjugate is equivalent and faster to calculate.
 * @param dualQuaternion - The dual quaternion.
 * @param out - The dual quaternion to store the result in.
 * @returns The inverse.
 * @public
 */
export const invert = <T extends DualQuaternionLike>(
	dualQuaternion: DualQuaternionLike,
	out: T
): T => {
	const sqm = getSquaredMagnitude(dualQuaternion);

	return fromValues(
		-dualQuaternion[0] / sqm,
		-dualQuaternion[1] / sqm,
		-dualQuaternion[2] / sqm,
		dualQuaternion[3] / sqm,
		-dualQuaternion[4] / sqm,
		-dualQuaternion[5] / sqm,
		-dualQuaternion[6] / sqm,
		dualQuaternion[7] / sqm,
		out
	);
};

/**
 * Calculate the conjugate of a dual quaternion. If the dual quaternion is normalized, this is equivalent to its inverse and faster to calculate.
 * @param dualQuaternion - The dual quaternion.
 * @param out - The dual quaternion to store the result in.
 * @returns The conjugate.
 * @public
 */
export const conjugate = <T extends DualQuaternionLike>(
	dualQuaternion: DualQuaternionLike,
	out: T
): T =>
	fromValues(
		-dualQuaternion[0],
		-dualQuaternion[1],
		-dualQuaternion[2],
		dualQuaternion[3],
		-dualQuaternion[4],
		-dualQuaternion[5],
		-dualQuaternion[6],
		dualQuaternion[7],
		out
	);

/**
 * Normalize a dual quaternion.
 * @param dualQuaternion - The dual quaternion.
 * @param out - The dual quaternion to store the result in.
 * @returns The normalized dual quaternion.
 * @public
 */
export const normalize = <T extends DualQuaternionLike>(
	dualQuaternion: DualQuaternionLike,
	out: T
): T => {
	let magnitude = getSquaredMagnitude(dualQuaternion);
	if (magnitude <= 0) {
		return out;
	}

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

	return fromValues(
		a0,
		a1,
		a2,
		a3,
		(b0 - a0 * aDotB) / magnitude,
		(b1 - a1 * aDotB) / magnitude,
		(b2 - a2 * aDotB) / magnitude,
		(b3 - a3 * aDotB) / magnitude,
		out
	);
};

/**
 * Determine whether or not two dual quaternions are exactly equivalent.
 * @param a - The first dual quaternion.
 * @param b - The second dual quaternion.
 * @returns Whether or not the dual quaternions are equivalent.
 * @public
 */
export const exactEquals = (
	a: DualQuaternionLike,
	b: DualQuaternionLike
): boolean =>
	a[0] === b[0] &&
	a[1] === b[1] &&
	a[2] === b[2] &&
	a[3] === b[3] &&
	a[4] === b[4] &&
	a[5] === b[5] &&
	a[6] === b[6] &&
	a[7] === b[7];

/**
 * Determine whether or not two dual quaternions are roughly equivalent.
 * @param a - The first dual quaternion.
 * @param b - The second dual quaternion.
 * @returns Whether or not the dual quaternions are equivalent.
 * @public
 */
export const equals = (a: DualQuaternionLike, b: DualQuaternionLike): boolean =>
	approxRelative(a[0], b[0]) &&
	approxRelative(a[1], b[1]) &&
	approxRelative(a[2], b[2]) &&
	approxRelative(a[3], b[3]) &&
	approxRelative(a[4], b[4]) &&
	approxRelative(a[5], b[5]) &&
	approxRelative(a[6], b[6]) &&
	approxRelative(a[7], b[7]);

/**
 * A complex number that is commonly used to describe transformations.
 * @see {@link https://en.wikipedia.org/wiki/Dual_quaternion | Dual quaternion}
 * @public
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
	public static fromValues<T extends DualQuaternionLike = DualQuaternion>(
		x1: number,
		y1: number,
		z1: number,
		w1: number,
		x2: number,
		y2: number,
		z2: number,
		w2: number,
		out: T = new DualQuaternion() as DualQuaternion & T
	): T {
		return fromValues(x1, y1, z1, w1, x2, y2, z2, w2, out);
	}

	/**
	 * Create a dual quaternion from the given rotation and translation.
	 * @param q - The rotation quaternion.
	 * @param t - The translation vector.
	 * @param out - The dual quaternion to store the result in.
	 * @returns The dual quaternion.
	 */
	public static fromRotationTranslation<
		T extends DualQuaternionLike = DualQuaternion
	>(
		q: QuaternionLike,
		t: Vector3Like,
		out: T = new DualQuaternion() as DualQuaternion & T
	): T {
		return fromRotationTranslation(q, t, out);
	}

	/**
	 * Create a dual quaternion from the given translation.
	 * @param t - The translation vector.
	 * @param out - The dual quaternion to store the result in.
	 * @returns The dual quaternion.
	 */
	public static fromTranslation<T extends DualQuaternionLike = DualQuaternion>(
		t: Vector3Like,
		out: T = new DualQuaternion() as DualQuaternion & T
	): T {
		return fromTranslation(t, out);
	}

	/**
	 * Create a dual quaternion from the given rotation.
	 * @param q - The rotation quaternion.
	 * @param out - The dual quaternion to store the result in.
	 * @returns The dual quaternion.
	 */
	public static fromRotation<T extends DualQuaternionLike = DualQuaternion>(
		q: QuaternionLike,
		out: T = new DualQuaternion() as DualQuaternion & T
	): T {
		return fromRotation(q, out);
	}

	/**
	 * Create a dual quaternion from the given four-by-four matrix.
	 * @param matrix - The matrix.
	 * @param out - The dual quaternion to store the result in.
	 * @returns The dual quaternion.
	 */
	public static fromMatrix4<T extends DualQuaternionLike = DualQuaternion>(
		matrix: Matrix4Like,
		out: T = new DualQuaternion() as DualQuaternion & T
	): T {
		return fromMatrix4(matrix, out);
	}

	/**
	 * Create an identity dual quaternion.
	 * @see {@link https://en.wikipedia.org/wiki/Dual_quaternion | Dual quaternion}
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
	public clone<T extends DualQuaternionLike = DualQuaternion>(
		out: T = new DualQuaternion() as DualQuaternion & T
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
	public getReal<T extends QuaternionLike = Quaternion>(
		out: T = new Quaternion() as Quaternion & T
	): T {
		return getReal(this, out);
	}

	/**
	 * Set the real part of this dual quaternion.
	 * @param q - The quaternion.
	 */
	public setReal(q: QuaternionLike): void {
		setReal(q, this);
	}

	/**
	 * Get the dual part of this dual quaternion.
	 * @param out - The quaternion to store the result in.
	 * @returns The dual part.
	 */
	public getDual<T extends QuaternionLike = Quaternion>(
		out: T = new Quaternion() as Quaternion & T
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
	public getTranslation<T extends Vector3Like = Vector3>(
		out: T = new Vector3() as Vector3 & T
	): T {
		return getTranslation(this, out);
	}

	/**
	 * Translate this dual quaternion by the given vector.
	 * @param v - The vector.
	 * @param out - The dual quaternion to store the result in.
	 * @returns The translated dual quaternion.
	 */
	public translate<T extends DualQuaternionLike = DualQuaternion>(
		v: Vector3Like,
		out: T = new DualQuaternion() as DualQuaternion & T
	): T {
		return translate(this, v, out);
	}

	/**
	 * Rotate this dual quaternion around the X-axis.
	 * @param r - The angle to rotate by in radians.
	 * @param out - The dual quaternion to store the result in.
	 * @returns The rotated dual quaternion.
	 */
	public rotateX<T extends DualQuaternionLike = DualQuaternion>(
		r: number,
		out: T = new DualQuaternion() as DualQuaternion & T
	): T {
		return rotateX(this, r, out);
	}

	/**
	 * Rotate this dual quaternion around the Y-axis.
	 * @param r - The angle to rotate by in radians.
	 * @param out - The dual quaternion to store the result in.
	 * @returns The rotated dual quaternion.
	 */
	public rotateY<T extends DualQuaternionLike = DualQuaternion>(
		r: number,
		out: T = new DualQuaternion() as DualQuaternion & T
	): T {
		return rotateY(this, r, out);
	}

	/**
	 * Rotate this dual quaternion around the Z-axis.
	 * @param r - The angle to rotate by in radians.
	 * @param out - The dual quaternion to store the result in.
	 * @returns The rotated dual quaternion.
	 */
	public rotateZ<T extends DualQuaternionLike = DualQuaternion>(
		r: number,
		out: T = new DualQuaternion() as DualQuaternion & T
	): T {
		return rotateZ(this, r, out);
	}

	/**
	 * Rotate this dual quaternion by a quaternion (using the quaternion as the multiplicand).
	 * @param q - The quaternion.
	 * @param out - The dual quaternion to store the result in.
	 * @returns The rotated dual quaternion.
	 * @see {@link https://en.wikipedia.org/wiki/Quaternion | Quaternion}
	 */
	public rotateByQuaternionAppend<
		T extends DualQuaternionLike = DualQuaternion
	>(q: QuaternionLike, out: T = new DualQuaternion() as DualQuaternion & T): T {
		return rotateByQuaternionAppend(this, q, out);
	}

	/**
	 * Rotate this dual quaternion by a quaternion (using the quaternion as the multiplier).
	 * @param q - The quaternion.
	 * @param out - The dual quaternion to store the result in.
	 * @returns The rotated dual quaternion.
	 * @see {@link https://en.wikipedia.org/wiki/Quaternion | Quaternion}
	 */
	public rotateByQuaternionPrepend<
		T extends DualQuaternionLike = DualQuaternion
	>(q: QuaternionLike, out: T = new DualQuaternion() as DualQuaternion & T): T {
		return rotateByQuaternionPrepend(q, this, out);
	}

	/**
	 * Rotate this dual quaternion around an axis.
	 * @param axis - The axis.
	 * @param r - The angle of the rotation in radians.
	 * @param out - The dual quaternion to store the result in.
	 * @returns A normalized dual quaternion.
	 */
	public rotateAroundAxis<T extends DualQuaternionLike = DualQuaternion>(
		axis: Vector3Like,
		r: number,
		out: T = new DualQuaternion() as DualQuaternion & T
	): T {
		return rotateAroundAxis(this, axis, r, out);
	}

	/**
	 * Add another dual quaternion to this one.
	 * @param dq - The other dual quaternion.
	 * @param out - The dual quaternion to store the result in.
	 * @returns The sum.
	 */
	public add<T extends DualQuaternionLike = DualQuaternion>(
		dq: DualQuaternionLike,
		out: T = new DualQuaternion() as DualQuaternion & T
	): T {
		return add(this, dq, out);
	}

	/**
	 * Multiply this dual quaternion by another one.
	 * @param dq - The other dual quaternion.
	 * @param out - The dual quaternion to store the result in.
	 * @returns The product.
	 */
	public multiply<T extends DualQuaternionLike = DualQuaternion>(
		dq: DualQuaternionLike,
		out: T = new DualQuaternion() as DualQuaternion & T
	): T {
		return multiply(this, dq, out);
	}

	/**
	 * Multiply this dual quaternion by a scalar.
	 * @param s - The scalar.
	 * @param out - The dual quaternion to store the result in.
	 * @returns The product.
	 */
	public scale<T extends DualQuaternionLike = DualQuaternion>(
		s: number,
		out: T = new DualQuaternion() as DualQuaternion & T
	): T {
		return scale(this, s, out);
	}

	/**
	 * Calculate the dot product of this and another dual quaternion.
	 * @param dq - The other dual quaternion.
	 * @returns The dot product.
	 * @see {@link https://en.wikipedia.org/wiki/Dot_product | Dot product}
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
	public lerp<T extends DualQuaternionLike = DualQuaternion>(
		dq: DualQuaternionLike,
		t: number,
		out: T = new DualQuaternion() as DualQuaternion & T
	): T {
		return lerp(this, dq, t, out);
	}

	/**
	 * Calculate the inverse of this dual quaternion. If this dual quaternion is normalized, the conjugate is equivalent and faster to calculate.
	 * @param out - The dual quaternion to store the result in.
	 * @returns The inverse.
	 */
	public invert<T extends DualQuaternionLike = DualQuaternion>(
		out: T = new DualQuaternion() as DualQuaternion & T
	): T {
		return invert(this, out);
	}

	/**
	 * Calculate the conjugate of this dual quaternion. If this dual quaternion is normalized, this is equivalent to its inverse and faster to calculate.
	 * @param out - The dual quaternion to store the result in.
	 * @returns The conjugate.
	 */
	public conjugate<T extends DualQuaternionLike = DualQuaternion>(
		out: T = new DualQuaternion() as DualQuaternion & T
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
	public normalize<T extends DualQuaternionLike = DualQuaternion>(
		out: T = new DualQuaternion() as DualQuaternion & T
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
