import { matrixEpsilon } from "./Matrix.js";
import type { Matrix3Like } from "./Matrix3.js";
import type { default as Vector3, Vector3Like } from "./Vector3.js";

/** A complex number that is commonly used to describe rotations. */
export type QuaternionLike = Quaternion | [number, number, number, number];

/**
 * Sets a quaternion to identity.
 * @param out The quaternion to set to identity.
 * @returns The identity.
 */
function identity<T extends QuaternionLike>(out: T): T {
	out[0] = 0;
	out[1] = 0;
	out[2] = 0;
	out[3] = 1;
	return out;
}

/**
 * Sets a quaternion to the given rotation.
 * @param out The quaternion.
 * @param axis The axis to rotate around.
 * @param rad The angle to rotate by in radians.
 * @returns The quaternion.
 */
function setAxisAngle<T extends QuaternionLike>(out: T, axis: Vector3Like, rad: number): T {
	rad *= 0.5;

	const s: number = Math.sin(rad);

	out[0] = s * axis[0];
	out[1] = s * axis[1];
	out[2] = s * axis[2];
	out[3] = Math.cos(rad);
	return out;
}

/**
 * Gets the rotation axis and angle of a quaternion.
 * @param out_axis The vector to fill with the axis.
 * @param q The quaternion.
 * @returns The angle in radians.
 */
function getAxisAngle(out_axis: Vector3Like, q: QuaternionLike): number {
	const rad: number = Math.acos(q[3]) * 2;

	const s: number = Math.sin(rad / 2);
	if (s > matrixEpsilon) {
		out_axis[0] = q[0] / s;
		out_axis[1] = q[1] / s;
		out_axis[2] = q[2] / s;
	} else {
		out_axis[0] = 1;
		out_axis[1] = 0;
		out_axis[2] = 0;
	}

	return rad;
}

/**
 * Calculates the dot product of two quaternions.
 * @param a The first quaternion.
 * @param b The second quaternion.
 * @returns The dot product.
 */
function dot(a: QuaternionLike, b: QuaternionLike): number {
	return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}

/**
 * Gets the angular distance in radians between two unit quaternions.
 * @param a The first quaternion.
 * @param b The second quaternion.
 * @returns The angular distance in radians.
 */
function getAngle(a: QuaternionLike, b: QuaternionLike): number {
	const dotproduct: number = dot(a, b);
	return Math.acos(2 * dotproduct * dotproduct - 1);
}

/**
 * Multiplies two quaternions.
 * @param out The quaternion to fill with the product.
 * @param a The multiplier.
 * @param b The multiplicand.
 * @returns The product.
 */
function multiply<T extends QuaternionLike>(out: T, a: QuaternionLike, b: QuaternionLike): T {
	const ax: number = a[0];
	const ay: number = a[1];
	const az: number = a[2];
	const aw: number = a[3];

	const bx: number = b[0];
	const by: number = b[1];
	const bz: number = b[2];
	const bw: number = b[3];

	out[0] = ax * bw + aw * bx + ay * bz - az * by;
	out[1] = ay * bw + aw * by + az * bx - ax * bz;
	out[2] = az * bw + aw * bz + ax * by - ay * bx;
	out[3] = aw * bw - ax * bx - ay * by - az * bz;
	return out;
}

/**
 * Rotates a quaternion around the X-axis.
 * @param out The quaternion to fill with the rotated quaternion.
 * @param a The quaternion to rotate.
 * @param rad The angle to rotate by in radians.
 * @returns The rotated quaternion.
 */
function rotateX<T extends QuaternionLike>(out: T, a: QuaternionLike, rad: number): T {
	rad *= 0.5;

	const ax: number = a[0];
	const ay: number = a[1];
	const az: number = a[2];
	const aw: number = a[3];

	const bx: number = Math.sin(rad);
	const bw: number = Math.cos(rad);

	out[0] = ax * bw + aw * bx;
	out[1] = ay * bw + az * bx;
	out[2] = az * bw - ay * bx;
	out[3] = aw * bw - ax * bx;
	return out;
}

/**
 * Rotates a quaternion around the Y-axis.
 * @param out The quaternion to fill with the rotated quaternion.
 * @param a The quaternion to rotate.
 * @param rad The angle to rotate by in radians.
 * @returns The rotated quaternion.
 */
function rotateY<T extends QuaternionLike>(out: T, a: QuaternionLike, rad: number): T {
	rad *= 0.5;

	const ax: number = a[0];
	const ay: number = a[1];
	const az: number = a[2];
	const aw: number = a[3];

	const by: number = Math.sin(rad);
	const bw: number = Math.cos(rad);

	out[0] = ax * bw - az * by;
	out[1] = ay * bw + aw * by;
	out[2] = az * bw + ax * by;
	out[3] = aw * bw - ay * by;
	return out;
}

/**
 * Rotates a quaternion around the Z-axis.
 * @param out The quaternion to fill with the rotated quaternion.
 * @param a The quaternion to rotate.
 * @param rad The angle to rotate by in radians.
 * @returns The rotated quaternion.
 */
function rotateZ<T extends QuaternionLike>(out: T, a: QuaternionLike, rad: number): T {
	rad *= 0.5;

	const ax: number = a[0];
	const ay: number = a[1];
	const az: number = a[2];
	const aw: number = a[3];

	const bz: number = Math.sin(rad);
	const bw: number = Math.cos(rad);

	out[0] = ax * bw + ay * bz;
	out[1] = ay * bw - ax * bz;
	out[2] = az * bw + aw * bz;
	out[3] = aw * bw - az * bz;
	return out;
}

/**
 * Calculates the `w` component of a unit quaternion, ignoring the existing `w` component.
 * @param out The quaternion to fill with the calculated quaternion.
 * @param a The quaternion to calculate the `w` component of.
 * @returns The calculated quaternion.
 */
function calculateW<T extends QuaternionLike>(out: T, a: QuaternionLike): T {
	const x: number = a[0];
	const y: number = a[1];
	const z: number = a[2];

	out[0] = x;
	out[1] = y;
	out[2] = z;
	out[3] = Math.sqrt(Math.abs(1 - x * x - y * y - z * z));
	return out;
}

/**
 * Calculates the exponential of a unit quaternion.
 * @param out The quaternion to fill with the exponential.
 * @param a The quaternion.
 * @returns The exponential.
 */
function exp<T extends QuaternionLike>(out: T, a: QuaternionLike): T {
	const x: number = a[0];
	const y: number = a[1];
	const z: number = a[2];
	const w: number = a[3];

	const r: number = Math.sqrt(x * x + y * y + z * z);
	const et: number = Math.exp(w);
	const s: number = r > 0 ? (et * Math.sin(r)) / r : 0;

	out[0] = x * s;
	out[1] = y * s;
	out[2] = z * s;
	out[3] = et * Math.cos(r);
	return out;
}

/**
 * Calculates the natural logarithm of a unit quaternion.
 * @param out The quaternion to fill with the natural logarithm.
 * @param a The quaternion.
 * @returns The natural logarithm.
 */
function ln<T extends QuaternionLike>(out: T, a: QuaternionLike): T {
	const x: number = a[0];
	const y: number = a[1];
	const z: number = a[2];
	const w: number = a[3];

	const r: number = Math.sqrt(x * x + y * y + z * z);
	const t: number = r > 0 ? Math.atan2(r, w) / r : 0;

	out[0] = x * t;
	out[1] = y * t;
	out[2] = z * t;
	out[3] = 0.5 * Math.log(x * x + y * y + z * z + w * w);
	return out;
}

/**
 * Scales a quaternion by a scalar.
 * @param out The quaternion to fill with the scaled quaternion.
 * @param a The quaternion.
 * @param b The scalar.
 * @returns The scaled quaternion.
 */
function scale<T extends QuaternionLike>(out: T, a: QuaternionLike, b: number): T {
	out[0] = a[0] * b;
	out[1] = a[1] * b;
	out[2] = a[2] * b;
	out[3] = a[3] * b;
	return out;
}

/**
 * Calculates a scalar power of a unit quaternion.
 * @param out The quaternion to fill with the power.
 * @param a The quaternion.
 * @param b The scalar.
 * @returns The power.
 */
function pow<T extends QuaternionLike>(out: T, a: QuaternionLike, b: number): T {
	ln(out, a);
	scale(out, out, b);
	exp(out, out);
	return out;
}

/**
 * Performs a spherical linear interpolation between two quaternions.
 * @param out The quaternion to fill with the interpolated value.
 * @param a The first quaternion.
 * @param b The second quaternion.
 * @param t The interpolation amount in the range `[0,1]`.
 * @returns The interpolated value.
 */
function slerp<T extends QuaternionLike>(out: T, a: QuaternionLike, b: QuaternionLike, t: number): T {
	const ax: number = a[0];
	const ay: number = a[1];
	const az: number = a[2];
	const aw: number = a[3];

	let bx: number = b[0];
	let by: number = b[1];
	let bz: number = b[2];
	let bw: number = b[3];

	let cosom: number = ax * bx + ay * by + az * bz + aw * bw;
	if (cosom < 0) {
		cosom = -cosom;
		bx = -bx;
		by = -by;
		bz = -bz;
		bw = -bw;
	}

	let scale0: number;
	let scale1: number;
	if (1 - cosom > matrixEpsilon) {
		const omega: number = Math.acos(cosom);
		const sinom: number = Math.sin(omega);
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
}

/**
 * Randomizes a quaternion.
 * @param out The quaternion.
 * @returns The quaternion.
 */
function random<T extends QuaternionLike>(out: T): T {
	const u1: number = Math.random();
	const u2: number = Math.random();
	const u3: number = Math.random();

	const sqrt1MinusU1: number = Math.sqrt(1 - u1);
	const sqrtU1: number = Math.sqrt(u1);

	out[0] = sqrt1MinusU1 * Math.sin(2 * Math.PI * u2);
	out[1] = sqrt1MinusU1 * Math.cos(2 * Math.PI * u2);
	out[2] = sqrtU1 * Math.sin(2 * Math.PI * u3);
	out[3] = sqrtU1 * Math.cos(2 * Math.PI * u3);
	return out;
}

/**
 * Inverts a quaternion.
 * @param out The quaternion to fill with the inverse.
 * @param a The quaternion.
 * @returns The inverse.
 */
function invert<T extends QuaternionLike>(out: T, a: QuaternionLike): T {
	const a0: number = a[0];
	const a1: number = a[1];
	const a2: number = a[2];
	const a3: number = a[3];

	const dot: number = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
	const invDot: number = dot ? 1 / dot : 0;

	if (dot == 0) {
		out[0] = 0;
		out[1] = 0;
		out[2] = 0;
		out[3] = 0;
	}

	out[0] = -a0 * invDot;
	out[1] = -a1 * invDot;
	out[2] = -a2 * invDot;
	out[3] = a3 * invDot;
	return out;
}

/**
 * Calculates the conjugate of a quaternion. If the quaternion is normalized, this is the same as the inverse of the quaternion (and faster to compute).
 * @param out The quaternion to fill with the conjugate.
 * @param a The quaternion.
 * @returns The conjugate.
 */
function conjugate<T extends QuaternionLike>(out: T, a: QuaternionLike): T {
	out[0] = -a[0];
	out[1] = -a[1];
	out[2] = -a[2];
	out[3] = a[3];
	return out;
}

/**
 * Creates a quaternion from a three-by-three matrix. The quaternion is not normalized.
 * @param out The quaternion to fill with the result.
 * @param m The matrix.
 * @returns The quaternion.
 */
function fromMat3<T extends QuaternionLike>(out: T, m: Matrix3Like): T {
	const fTrace: number = m[0] + m[4] + m[8];
	let fRoot: number;
	if (fTrace > 0) {
		fRoot = Math.sqrt(fTrace + 1);
		out[3] = 0.5 * fRoot;
		fRoot = 0.5 / fRoot;
		out[0] = (m[5] - m[7]) * fRoot;
		out[1] = (m[6] - m[2]) * fRoot;
		out[2] = (m[1] - m[3]) * fRoot;
	} else {
		let i = 0;
		if (m[4] > m[0]) {
			i = 1;
		}
		if (m[8] > (m[i * 3 + i] as number)) {
			i = 2;
		}
		const j: number = (i + 1) % 3;
		const k: number = (i + 2) % 3;
		fRoot = Math.sqrt((m[i * 3 + i] as number) - (m[j * 3 + j] as number) - (m[k * 3 + k] as number) + 1);
		out[i] = 0.5 * fRoot;
		fRoot = 0.5 / fRoot;
		out[3] = ((m[j * 3 + k] as number) - (m[k * 3 + j] as number)) * fRoot;
		out[j] = ((m[j * 3 + i] as number) + (m[i * 3 + j] as number)) * fRoot;
		out[k] = ((m[k * 3 + i] as number) + (m[i * 3 + k] as number)) * fRoot;
	}
	return out;
}

/**
 * Creates a quaternion from the given XYZ Tait-Bryan angles.
 * @param out The quaternion to fill with the result.
 * @param x The angle of the X rotation in radians.
 * @param y The angle of the Y rotation in radians.
 * @param z The angle of the Z rotation in radians.
 * @returns The quaternion.
 */
function fromEuler<T extends QuaternionLike>(out: T, x: number, y: number, z: number): T {
	const halfToRad: number = (0.5 * Math.PI) / 180;

	x *= halfToRad;
	y *= halfToRad;
	z *= halfToRad;

	const sx: number = Math.sin(x);
	const cx: number = Math.cos(x);
	const sy: number = Math.sin(y);
	const cy: number = Math.cos(y);
	const sz: number = Math.sin(z);
	const cz: number = Math.cos(z);

	out[0] = sx * cy * cz - cx * sy * sz;
	out[1] = cx * sy * cz + sx * cy * sz;
	out[2] = cx * cy * sz - sx * sy * cz;
	out[3] = cx * cy * cz + sx * sy * sz;
	return out;
}

/**
 * Clones a quaternion.
 * @param a The quaternion.
 * @returns The clone.
 */
function clone(a: QuaternionLike): Quaternion {
	const out: Quaternion = new Quaternion();
	out[0] = a[0];
	out[1] = a[1];
	out[2] = a[2];
	out[3] = a[3];
	return out;
}

/**
 * Creates a quaternion with the given values.
 * @param x The X component.
 * @param y The Y component.
 * @param z The Z component.
 * @param w The W component.
 * @returns The quaternion.
 */
function fromValues(x: number, y: number, z: number, w: number): Quaternion {
	const out: Quaternion = new Quaternion();
	out[0] = x;
	out[1] = y;
	out[2] = z;
	out[3] = w;
	return out;
}

/**
 * Copies the values from one quaternion into another.
 * @param out The quaternion to fill with values.
 * @param a The quaternion to copy.
 * @returns The copy.
 */
function copy<T extends QuaternionLike>(out: T, a: QuaternionLike): T {
	out[0] = a[0];
	out[1] = a[1];
	out[2] = a[2];
	out[3] = a[3];
	return out;
}

/**
 * Sets the values in a quaternion.
 * @param out The quaternion.
 * @param x The X component.
 * @param y The Y component.
 * @param z The Z component.
 * @param w The W component.
 * @returns The quaternion.
 */
function set<T extends QuaternionLike>(out: T, x: number, y: number, z: number, w: number): T {
	out[0] = x;
	out[1] = y;
	out[2] = z;
	out[3] = w;
	return out;
}

/**
 * Adds two quaternions.
 * @param out The quaternion to fill with the sum.
 * @param a The augend.
 * @param b The addend.
 * @returns The sum.
 */
function add<T extends QuaternionLike>(out: T, a: QuaternionLike, b: QuaternionLike): T {
	out[0] = a[0] + b[0];
	out[1] = a[1] + b[1];
	out[2] = a[2] + b[2];
	out[3] = a[3] + b[3];
	return out;
}

/**
 * Performs a linear interpolation between two quaternions.
 * @param out The quaternion to fill with the interpolated value.
 * @param a The first quaternion.
 * @param b The second quaternion.
 * @param t The interpolation amount in the range `[0,1]`.
 * @returns The interpolated value.
 */
function lerp<T extends QuaternionLike>(out: T, a: QuaternionLike, b: QuaternionLike, t: number): T {
	const ax: number = a[0];
	const ay: number = a[1];
	const az: number = a[2];
	const aw: number = a[3];

	out[0] = ax + t * (b[0] - ax);
	out[1] = ay + t * (b[1] - ay);
	out[2] = az + t * (b[2] - az);
	out[3] = aw + t * (b[3] - aw);
	return out;
}

/**
 * Calculates the length of a quaternion.
 * @param a The quaternion.
 * @returns The length.
 */
function length(a: QuaternionLike): number {
	const x: number = a[0];
	const y: number = a[1];
	const z: number = a[2];
	const w: number = a[3];
	return Math.hypot(x, y, z, w);
}

/**
 * Calculates the squared length of a quaternion.
 * @param a The quaternion.
 * @returns The squared length.
 */
function squaredLength(a: QuaternionLike): number {
	const x: number = a[0];
	const y: number = a[1];
	const z: number = a[2];
	const w: number = a[3];
	return x * x + y * y + z * z + w * w;
}

/**
 * Normalizes a quaternion.
 * @param out The quaternion to fill with the normalized quaternion.
 * @param a The quaternion to normalize.
 * @returns The normalized quaternion.
 */
function normalize<T extends QuaternionLike>(out: T, a: QuaternionLike): T {
	const x: number = a[0];
	const y: number = a[1];
	const z: number = a[2];
	const w: number = a[3];

	let len: number = x * x + y * y + z * z + w * w;
	if (len > 0) {
		len = 1 / Math.sqrt(len);
	}

	out[0] = x * len;
	out[1] = y * len;
	out[2] = z * len;
	out[3] = w * len;
	return out;
}

/**
 * Determines whether two quaternions are exactly equivalent.
 * @param a The first quaternion.
 * @param b The second quaternion.
 * @returns Whether the quaternions are exactly equivalent.
 */
function exactEquals(a: QuaternionLike, b: QuaternionLike): boolean {
	return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}

/**
 * Determines whether two quaternions are roughly equivalent.
 * @param a The first quaternion.
 * @param b The second quaternion.
 * @returns Whether the quaternions are roughly equivalent.
 */
function equals(a: QuaternionLike, b: QuaternionLike): boolean {
	const a0: number = a[0];
	const a1: number = a[1];
	const a2: number = a[2];
	const a3: number = a[3];

	const b0: number = b[0];
	const b1: number = b[1];
	const b2: number = b[2];
	const b3: number = b[3];

	return Math.abs(a0 - b0) <= matrixEpsilon * Math.max(1.0, Math.abs(a0), Math.abs(b0))
		&& Math.abs(a1 - b1) <= matrixEpsilon * Math.max(1.0, Math.abs(a1), Math.abs(b1))
		&& Math.abs(a2 - b2) <= matrixEpsilon * Math.max(1.0, Math.abs(a2), Math.abs(b2))
		&& Math.abs(a3 - b3) <= matrixEpsilon * Math.max(1.0, Math.abs(a3), Math.abs(b3));
}

/**
 * Calculates the dot product of two three-dimensional vectors.
 * @param a The multiplier.
 * @param b The multiplicand.
 * @returns The dot product.
 */
function vector3Dot(a: Vector3Like, b: Vector3Like): number {
	return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

/**
 * Calculates the cross product of two three-dimensional vectors.
 * @param out The vector to fill with the cross product.
 * @param a The multiplier.
 * @param b The multiplicand.
 * @returns The cross product.
 */
function vector3Cross<T extends Vector3Like>(out: T, a: Vector3Like, b: Vector3Like): T {
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
 * Calculates the length of a three-dimensional vector.
 * @param a The vector.
 * @returns The length.
 */
function vector3Length(a: Vector3Like): number {
	const x: number = a[0];
	const y: number = a[1];
	const z: number = a[2];
	return Math.hypot(x, y, z);
}

/**
 * Normalizes a three-dimensional vector.
 * @param out The vector to fill with the normalized vector.
 * @param a The vector to normalize.
 * @returns The normalized vector.
 */
function vector3Normalize<T extends Vector3Like>(out: T, a: Vector3Like): T {
	const x: number = a[0];
	const y: number = a[1];
	const z: number = a[2];

	let len: number = x * x + y * y + z * z;
	if (len > 0) {
		len = 1 / Math.sqrt(len);
	}

	out[0] = a[0] * len;
	out[1] = a[1] * len;
	out[2] = a[2] * len;
	return out;
}

/** A temporary vector used in `rotationTo`. */
const tmpvec3: Vector3Like = new Float32Array(3);

/** A unit vector representing the X-axis. */
const xUnitVec3: Vector3Like = new Float32Array([1, 0, 0]);

/** A unit vector representing the Y-axis. */
const yUnitVec3: Vector3Like = new Float32Array([0, 1, 0]);

/**
 * Sets a quaternion to represent the shortest rotation from one unit vector to another.
 * @param out The quaternion.
 * @param a The first vector.
 * @param b The second vector.
 * @returns The quaternion.
 */
function rotationTo<T extends QuaternionLike>(out: T, a: Vector3Like, b: Vector3Like): T {
	const dot: number = vector3Dot(a, b);
	if (dot < -0.999999) {
		vector3Cross(tmpvec3, xUnitVec3, a);
		if (vector3Length(tmpvec3) < 0.000001) {
			vector3Cross(tmpvec3, yUnitVec3, a);
		}
		vector3Normalize(tmpvec3, tmpvec3);
		setAxisAngle(out, tmpvec3, Math.PI);
		return out;
	} else if (dot > 0.999999) {
		out[0] = 0;
		out[1] = 0;
		out[2] = 0;
		out[3] = 1;
		return out;
	} else {
		vector3Cross(tmpvec3, a, b);
		out[0] = tmpvec3[0];
		out[1] = tmpvec3[1];
		out[2] = tmpvec3[2];
		out[3] = 1 + dot;
		return normalize(out, out);
	}
}

/** A temporary quaternion used in `sqlerp`. */
const temp1: QuaternionLike = new Float32Array(3);

/** A temporary quaternion used in `sqlerp`. */
const temp2: QuaternionLike = new Float32Array(3);

/**
 * Performs a spherical linear interpolation with two control points.
 * @param out The quaternion to fill with the interpolated value.
 * @param a The first operand.
 * @param b The second operand.
 * @param c The third operand.
 * @param d The fourth operand.
 * @param t The interpolation amount in the range `[0,1]`.
 * @returns The interpolated value.
 */
function sqlerp<T extends QuaternionLike>(out: T, a: QuaternionLike, b: QuaternionLike, c: QuaternionLike, d: QuaternionLike, t: number): T {
	slerp(temp1, a, d, t);
	slerp(temp2, b, c, t);
	slerp(out, temp1, temp2, 2 * t * (1 - t));
	return out;
}

/** A temporary three-by-three matrix used in `setAxes`. */
const matr: Matrix3Like = new Float32Array(9) as Matrix3Like;

/**
 * Sets a quaternion with values that correspond to the given unit axes.
 * @param out The quaternion.
 * @param view The viewing direction.
 * @param right The local "right" direction.
 * @param up The local "up" direction.
 * @returns The quaternion.
 */
function setAxes<T extends QuaternionLike>(out: T, view: Vector3Like, right: Vector3Like, up: Vector3Like): T {
	matr[0] = right[0];
	matr[3] = right[1];
	matr[6] = right[2];
	matr[1] = up[0];
	matr[4] = up[1];
	matr[7] = up[2];
	matr[2] = -view[0];
	matr[5] = -view[1];
	matr[8] = -view[2];
	return normalize(out, fromMat3(out, matr));
}

/**
 * A complex number that is commonly used to describe rotations.
 * @see [Wikipedia](https://en.wikipedia.org/wiki/Quaternion)
 */
export default class Quaternion extends Float32Array {
	/** Creates an identity quaternion. */
	public constructor() {
		super(4);
		this[3] = 1;
	}
}
