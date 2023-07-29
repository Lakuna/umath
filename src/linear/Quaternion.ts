import { epsilon, type AxisAngle } from "@lakuna/umath";
import { type Matrix3Like } from "@lakuna/umath/Matrix3";
import type { Vector3Like } from "@lakuna/umath/Vector3";
import Vector4, { fromValues, copy, add, scale, dot, lerp, getMagnitude, getSquaredMagnitude, normalize, equals, exactEquals, type Vector4Like } from "./Vector4.js";

/** A complex number that is commonly used to describe rotations. */
export type QuaternionLike = Quaternion | [number, number, number, number];

/**
 * Creates a quaternion from a three-by-three rotation matrix.
 * @param matrix The matrix.
 * @param out The quaternion to store the result in.
 * @returns The quaternion.
 * @see [Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix)
 */
export function fromMatrix3<T extends QuaternionLike>(matrix: Matrix3Like, out: T): T {
	const fTrace: number = matrix[0] + matrix[4] + matrix[8];
	if (fTrace > 0) {
		let fRoot: number = Math.sqrt(fTrace + 1);
		out[3] = 0.5 * fRoot;
		fRoot = 0.5 / fRoot;
		out[0] = (matrix[5] - matrix[7]) * fRoot;
		out[1] = (matrix[6] - matrix[2]) * fRoot;
		out[2] = (matrix[1] - matrix[3]) * fRoot;
		return out;
	}

	let i = 0;
	if (matrix[4] > matrix[0]) { i = 1; }
	if (matrix[8] > (matrix[i * 3 + i] as number)) { i = 2; }
	const j: number = (i + 1) % 3;
	const k: number = (i + 2) % 3;

	let fRoot: number = Math.sqrt((matrix[i * 3 + i] as number) - (matrix[j * 3 + j] as number) - (matrix[k * 3 + k] as number) + 1);
	out[i] = 0.5 * fRoot;
	fRoot = 0.5 / fRoot;
	out[3] = ((matrix[j * 3 + k] as number) - (matrix[k * 3 + j] as number)) * fRoot;
	out[j] = ((matrix[j * 3 + i] as number) + (matrix[i * 3 + j] as number)) * fRoot;
	out[k] = ((matrix[k * 3 + i] as number) + (matrix[i * 3 + k] as number)) * fRoot;
	return out;
}

/**
 * Creates a quaternion from equivalent x-y-z Tait-Bryan angles
 * @param x The x angle.
 * @param y The y angle.
 * @param z The z angle.
 * @param out The quaternion to store the result in.
 * @returns The quaternion.
 * @see [Euler angles](https://en.wikipedia.org/wiki/Euler_angles)
 */
export function fromEuler<T extends QuaternionLike>(x: number, y: number, z: number, out: T): T {
	const r: number = (0.5 * Math.PI) / 180;

	const x2: number = x * r;
	const y2: number = y * r;
	const z2: number = z * r;

	const sx: number = Math.sin(x2);
	const cx: number = Math.cos(x2);
	const sy: number = Math.sin(y2);
	const cy: number = Math.cos(y2);
	const sz: number = Math.sin(z2);
	const cz: number = Math.cos(z2);

	out[0] = sx * cy * cz - cx * sy * sz;
	out[1] = cx * sy * cz + sx * cy * sz;
	out[2] = cx * cy * sz - sx * sy * cz;
	out[3] = cx * cy * cz + sx * sy * sz;
	return out;
}

/** A three-by-three matrix that is used to store intermediary values for some functions. */
const intermediary: Matrix3Like = new Float32Array(9) as Matrix3Like;

/**
 * Creates a quaternion with values corresponding to the given orthonormal set of vectors.
 * @param view The vector representing the viewing direction.
 * @param right The vector representing the local "right" direction.
 * @param up The vector representing the local "up" direction.
 * @param out The quaternion to store the result in.
 * @returns The quaternion.
 */
export function fromAxes<T extends QuaternionLike>(view: Vector3Like, right: Vector3Like, up: Vector3Like, out: T): T {
	intermediary[0] = right[0];
	intermediary[3] = right[1];
	intermediary[6] = right[2];
	intermediary[1] = up[0];
	intermediary[4] = up[1];
	intermediary[7] = up[2];
	intermediary[2] = -view[0];
	intermediary[5] = -view[1];
	intermediary[8] = -view[2];
	return normalize(fromMatrix3(intermediary, out) as Vector4Like, out as Vector4Like) as T;
}

/**
 * Sets a quaternion to the identity.
 * @param out The quaternion to store the result in.
 * @returns This quaternion.
 */
export function identity<T extends QuaternionLike>(out: T): T {
	out[0] = 0;
	out[1] = 0;
	out[2] = 0;
	out[3] = 1;
	return out;
}

/**
 * Calculates the axis and angle that represent a quaternion.
 * @param quaternion The quaternion.
 * @param out The axis and angle to store the result in.
 * @returns The axis and angle.
 */
export function getAxisAngle<T extends AxisAngle>(quaternion: QuaternionLike, out: T): T {
	const r: number = Math.acos(quaternion[3] as number) * 2;
	const s: number = Math.sin(r / 2);

	out.axis = s > epsilon
		? [quaternion[0] / s, quaternion[1] / s, quaternion[2] / s]
		: [1, 0, 0];
	out.angle = r;
	return out;
}

/**
 * Sets the axis and angle that represent a quaternion.
 * @param quaternion The quaternion.
 * @param axisAngle The axis and angle.
 */
export function setAxisAngle(quaternion: QuaternionLike, axisAngle: AxisAngle): void {
	const r: number = axisAngle.angle * 0.5;
	const s: number = Math.sin(r);

	quaternion[0] = s * axisAngle.axis[0];
	quaternion[1] = s * axisAngle.axis[1];
	quaternion[2] = s * axisAngle.axis[2];
	quaternion[3] = Math.cos(r);
}

/**
 * Gets the angular distance between two unit quaternions.
 * @param a The first unit quaternion.
 * @param b The second unit quaternion.
 * @returns The angular distance in radians.
 */
export function getAngle(a: QuaternionLike, b: QuaternionLike): number {
	const dp = dot(a as Vector4Like, b as Vector4Like);
	return Math.acos(2 * dp * dp - 1);
}

/**
 * Multiplies two quaternions.
 * @param a The multiplier.
 * @param b The multiplicand.
 * @param out The quaternion to store the result in.
 * @returns The product.
 */
export function multiply<T extends QuaternionLike>(a: QuaternionLike, b: QuaternionLike, out: T): T {
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
 * Rotates a quaternion by the given angle around the X-axis.
 * @param quaternion The quaternion.
 * @param radians The angle in radians.
 * @param out The quaternion to store the result in.
 * @returns The rotated quaternion.
 */
export function rotateX<T extends QuaternionLike>(quaternion: QuaternionLike, radians: number, out: T): T {
	const r: number = radians * 0.5;

	const ax: number = quaternion[0];
	const ay: number = quaternion[1];
	const az: number = quaternion[2];
	const aw: number = quaternion[3];

	const bx: number = Math.sin(r);
	const bw: number = Math.cos(r);

	out[0] = ax * bw + aw * bx;
	out[1] = ay * bw + az * bx;
	out[2] = az * bw - ay * bx;
	out[3] = aw * bw - ax * bx;
	return out;
}

/**
 * Rotates a quaternion by the given angle around the Y-axis.
 * @param quaternion The quaternion.
 * @param radians The angle in radians.
 * @param out The quaternion to store the result in.
 * @returns The rotated quaternion.
 */
export function rotateY<T extends QuaternionLike>(quaternion: QuaternionLike, radians: number, out: T): T {
	const r: number = radians * 0.5;

	const ax: number = quaternion[0];
	const ay: number = quaternion[1];
	const az: number = quaternion[2];
	const aw: number = quaternion[3];

	const by: number = Math.sin(r);
	const bw: number = Math.cos(r);

	out[0] = ax * bw - az * by;
	out[1] = ay * bw + aw * by;
	out[2] = az * bw + ax * by;
	out[3] = aw * bw - ay * by;
	return out;
}

/**
 * Rotates a quaternion by the given angle around the Z-axis.
 * @param quaternion The quaternion.
 * @param radians The angle in radians.
 * @param out The quaternion to store the result in.
 * @returns The rotated quaternion.
 */
export function rotateZ<T extends QuaternionLike>(quaternion: QuaternionLike, radians: number, out: T): T {
	const r: number = radians * 0.5;

	const ax: number = quaternion[0];
	const ay: number = quaternion[1];
	const az: number = quaternion[2];
	const aw: number = quaternion[3];

	const bz: number = Math.sin(r);
	const bw: number = Math.cos(r);

	out[0] = ax * bw + ay * bz;
	out[1] = ay * bw - ax * bz;
	out[2] = az * bw + aw * bz;
	out[3] = aw * bw - az * bz;
	return out;
}

/**
 * Calculates the fourth component of a unit quaternion from the first three, ignoring the existing fourth component.
 * @param quaternion The quaternion.
 * @param out The quaternion to store the result in.
 * @returns The quaternion.
 */
export function calculateW<T extends QuaternionLike>(quaternion: QuaternionLike, out: T): T {
	const x: number = quaternion[0];
	const y: number = quaternion[1];
	const z: number = quaternion[2];

	out[0] = x;
	out[1] = y;
	out[2] = z;
	out[3] = Math.sqrt(Math.abs(1 - x * x - y * y - z * z));
	return out;
}

/**
 * Calculates the exponential of a unit quaternion.
 * @param quaternion The quaternion.
 * @param out The quaternion to store the result in.
 * @returns The exponential.
 */
export function exp<T extends QuaternionLike>(quaternion: QuaternionLike, out: T): T {
	const x: number = quaternion[0];
	const y: number = quaternion[1];
	const z: number = quaternion[2];
	const w: number = quaternion[3];

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
 * @param quaternion The quaternion.
 * @param out The quaternion to store the result in.
 * @returns The natural logarithm.
 */
export function ln<T extends QuaternionLike>(quaternion: QuaternionLike, out: T): T {
	const x: number = quaternion[0];
	const y: number = quaternion[1];
	const z: number = quaternion[2];
	const w: number = quaternion[3];

	const r: number = Math.sqrt(x * x + y * y + z * z);
	const t: number = r > 0 ? Math.atan2(r, w) / r : 0;

	out[0] = x * t;
	out[1] = y * t;
	out[2] = z * t;
	out[3] = 0.5 * Math.log(x * x + y * y + z * z + w * w);
	return out;
}

/**
 * Calculates a power of a unit quaternion.
 * @param quaternion The quaternion.
 * @param scalar The amount to scale the quaternion by.
 * @param out The quaternion to store the result in.
 * @returns The power.
 */
export function pow<T extends QuaternionLike>(quaternion: QuaternionLike, scalar: number, out: T): T {
	return exp(scale(ln(quaternion, out) as Vector4Like, scalar, out as Vector4Like) as QuaternionLike, out);
}

/**
 * Performs a spherical linear interpolation between two quaternions.
 * @param a The first quaternion.
 * @param b The second quaternion.
 * @param t The interpolation amount in `[0,1]`.
 * @param out The quaternion to store the result in.
 * @returns The interpolated quaternion.
 * @see [Slerp](https://en.wikipedia.org/wiki/Slerp)
 */
export function slerp<T extends QuaternionLike>(a: QuaternionLike, b: QuaternionLike, t: number, out: T): T {
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

	let scale0 = 0;
	let scale1 = 0;
	if (1 - cosom > epsilon) {
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
 * Sets a quaternion to a random unit quaternion.
 * @param out The quaternion to store the result in.
 * @returns The quaternion.
 */
export function random<T extends QuaternionLike>(out: T): T {
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
 * Calculates the inverse of a quaternion. If the quaternion is normalized, the conjugate is the same but faster to calculate.
 * @param quaternion The quaternion.
 * @param out The quaternion to store the result in.
 * @returns The inverse.
 */
export function invert<T extends QuaternionLike>(quaternion: QuaternionLike, out: T): T {
	const a0: number = quaternion[0];
	const a1: number = quaternion[1];
	const a2: number = quaternion[2];
	const a3: number = quaternion[3];

	const dot: number = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
	const invDot: number = dot ? 1 / dot : 0;

	if (dot == 0) {
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
}

/**
 * Calculates the conjugate of a quaternion. If the quaternion is normalized, this is the same as the inverse but faster to calculate.
 * @param quaternion The quaternion.
 * @param out The quaternion to store the result in.
 * @returns The conjugate.
 */
export function conjugate<T extends QuaternionLike>(quaternion: QuaternionLike, out: T): T {
	out[0] = -quaternion[0];
	out[1] = -quaternion[1];
	out[2] = -quaternion[2];
	out[3] = quaternion[3];
	return out;
}

/** A quaternion that is used to store intermediary values for some functions. */
const controlPointOne: QuaternionLike = new Float32Array(4) as QuaternionLike;

/** A quaternion that is used to store intermediary values for some functions. */
const controlPointTwo: QuaternionLike = new Float32Array(4) as QuaternionLike;

/**
 * Performs a spherical linear interpolation with two control points between two quaternions.
 * @param a The first quaternion.
 * @param b The first control point.
 * @param c The second control point.
 * @param d The second quaternion.
 * @param t The interpolation amount in `[0,1]`.
 * @param out The quaternion to store the result in.
 * @returns The interpolated value.
 * @see [Slerp](https://en.wikipedia.org/wiki/Slerp)
 */
export function sqlerp<T extends QuaternionLike>(a: QuaternionLike, b: QuaternionLike, c: QuaternionLike, d: QuaternionLike, t: number, out: T): T {
	slerp(a, d, t, controlPointOne);
	slerp(b, c, t, controlPointTwo);
	return slerp(controlPointOne, controlPointTwo, 2 * t * (1 - t), out);
}

/**
 * A complex number that is commonly used to describe rotations.
 * @see [Quaternion](https://en.wikipedia.org/wiki/Quaternion)
 */
export default class Quaternion extends Float32Array {
	/**
	 * Creates a quaternion from a three-by-three rotation matrix.
	 * @param matrix The matrix.
	 * @returns The quaternion.
	 * @see [Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix)
	 */
	public static fromMatrix3(matrix: Matrix3Like): Quaternion;

	/**
	 * Creates a quaternion from a three-by-three rotation matrix.
	 * @param matrix The matrix.
	 * @param out The quaternion to store the result in.
	 * @returns The quaternion.
	 * @see [Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix)
	 */
	public static fromMatrix3<T extends QuaternionLike>(matrix: Matrix3Like, out: T): T;

	public static fromMatrix3<T extends QuaternionLike>(matrix: Matrix3Like, out: T = new Quaternion() as T): T {
		return fromMatrix3(matrix, out);
	}

	/**
	 * Creates a quaternion from equivalent x-y-z Tait-Bryan angles
	 * @param x The x angle.
	 * @param y The y angle.
	 * @param z The z angle.
	 * @returns The quaternion.
	 * @see [Euler angles](https://en.wikipedia.org/wiki/Euler_angles)
	 */
	public static fromEuler(x: number, y: number, z: number): Quaternion;

	/**
	 * Creates a quaternion from equivalent x-y-z Tait-Bryan angles
	 * @param x The x angle.
	 * @param y The y angle.
	 * @param z The z angle.
	 * @param out The quaternion to store the result in.
	 * @returns The quaternion.
	 * @see [Euler angles](https://en.wikipedia.org/wiki/Euler_angles)
	 */
	public static fromEuler<T extends QuaternionLike>(x: number, y: number, z: number, out: T): T;

	public static fromEuler<T extends QuaternionLike>(x: number, y: number, z: number, out: T = new Quaternion() as T): T {
		return fromEuler(x, y, z, out);
	}

	/**
	 * Creates a quaternion with the given values.
	 * @param x The first component.
	 * @param y The second component.
	 * @param z The third component.
	 * @param w The fourth component.
	 * @returns A new quaternion.
	 */
	public static fromValues(x: number, y: number, z: number, w: number): Quaternion;

	/**
	 * Creates a quaternion with the given values.
	 * @param x The first component.
	 * @param y The second component.
	 * @param z The third component.
	 * @param w The fourth component.
	 * @param out The quaternion to store the result in.
	 * @returns A new quaternion.
	 */
	public static fromValues<T extends QuaternionLike>(x: number, y: number, z: number, w: number, out: T): T;

	public static fromValues<T extends QuaternionLike>(x: number, y: number, z: number, w: number, out: T = new Quaternion() as T): T {
		return fromValues(x, y, z, w, out as Vector4Like) as T;
	}

	/**
	 * Creates a quaternion with values corresponding to the given orthonormal set of vectors.
	 * @param view The vector representing the viewing direction.
	 * @param right The vector representing the local "right" direction.
	 * @param up The vector representing the local "up" direction.
	 * @returns The quaternion.
	 */
	public static fromAxes(view: Vector3Like, right: Vector3Like, up: Vector3Like): Quaternion;

	/**
	 * Creates a quaternion with values corresponding to the given orthonormal set of vectors.
	 * @param view The vector representing the viewing direction.
	 * @param right The vector representing the local "right" direction.
	 * @param up The vector representing the local "up" direction.
	 * @param out The quaternion to store the result in.
	 * @returns The quaternion.
	 */
	public static fromAxes<T extends QuaternionLike>(view: Vector3Like, right: Vector3Like, up: Vector3Like, out: T): T;

	public static fromAxes<T extends QuaternionLike>(view: Vector3Like, right: Vector3Like, up: Vector3Like, out: T = new Quaternion() as T): T {
		return fromAxes(view, right, up, out);
	}
	
	/**
	 * Creates an identity quaternion.
	 * @see [Quaternion](https://en.wikipedia.org/wiki/Quaternion)
	 */
	public constructor() {
		super(4);
		this[3] = 1;
	}

	/**
	 * Sets this quaternion to the identity.
	 * @returns This quaternion.
	 */
	public identity(): this {
		return identity(this);
	}

	/**
	 * Gets the axis and angle that represent this quaternion.
	 * @returns The axis and angle.
	 */
	public getAxisAngle(): AxisAngle;
	
	/**
	 * Gets the axis and angle that represent this quaternion.
	 * @param out The axis and angle to store the result in.
	 * @returns The axis and angle.
	 */
	public getAxisAngle<T extends AxisAngle>(out: T): T;
	
	public getAxisAngle<T extends AxisAngle>(out: T = {} as T): T {
		return getAxisAngle(this, out);
	}

	/**
	 * Sets the axis and angle that represent this quaternion.
	 * @param axisAngle The axis and angle.
	 */
	public setAxisAngle(axisAngle: AxisAngle): void {
		setAxisAngle(this, axisAngle);
	}

	/**
	 * Gets the angular distance between this unit quaternion and another.
	 * @param quaternion The other unit quaternion.
	 * @returns The angular distance in radians.
	 */
	public getAngle(quaternion: QuaternionLike): number {
		return getAngle(this, quaternion);
	}

	/**
	 * Multiplies this and another quaternion.
	 * @param quaternion The other quaternion.
	 * @returns The product.
	 */
	public multiply(quaternion: QuaternionLike): Quaternion;

	/**
	 * Multiplies this and another quaternion.
	 * @param quaternion The other quaternion.
	 * @param out The quaternion to store the result in.
	 * @returns The product.
	 */
	public multiply<T extends QuaternionLike>(quaternion: QuaternionLike, out: T): T;

	public multiply<T extends QuaternionLike>(quaternion: QuaternionLike, out: T = new Quaternion() as T): T {
		return multiply(this, quaternion, out);
	}

	/**
	 * Rotates this quaternion by the given angle around the X-axis.
	 * @param radians The angle in radians.
	 * @returns The rotated quaternion.
	 */
	public rotateX(radians: number): Quaternion;

	/**
	 * Rotates this quaternion by the given angle around the X-axis.
	 * @param radians The angle in radians.
	 * @param out The quaternion to store the result in.
	 * @returns The rotated quaternion.
	 */
	public rotateX<T extends QuaternionLike>(radians: number, out: T): T;

	public rotateX<T extends QuaternionLike>(radians: number, out: T = new Quaternion() as T): T {
		return rotateX(this, radians, out);
	}

	/**
	 * Rotates this quaternion by the given angle around the Y-axis.
	 * @param radians The angle in radians.
	 * @returns The rotated quaternion.
	 */
	public rotateY(radians: number): Quaternion;

	/**
	 * Rotates this quaternion by the given angle around the Y-axis.
	 * @param radians The angle in radians.
	 * @param out The quaternion to store the result in.
	 * @returns The rotated quaternion.
	 */
	public rotateY<T extends QuaternionLike>(radians: number, out: T): T;

	public rotateY<T extends QuaternionLike>(radians: number, out: T = new Quaternion() as T): T {
		return rotateY(this, radians, out);
	}

	/**
	 * Rotates this quaternion by the given angle around the Z-axis.
	 * @param radians The angle in radians.
	 * @returns The rotated quaternion.
	 */
	public rotateZ(radians: number): Quaternion;

	/**
	 * Rotates this quaternion by the given angle around the Z-axis.
	 * @param radians The angle in radians.
	 * @param out The quaternion to store the result in.
	 * @returns The rotated quaternion.
	 */
	public rotateZ<T extends QuaternionLike>(radians: number, out: T): T;

	public rotateZ<T extends QuaternionLike>(radians: number, out: T = new Quaternion() as T): T {
		return rotateZ(this, radians, out);
	}

	/**
	 * Calculates the fourth component of this unit quaternion from the first three, ignoring the existing fourth component.
	 * @returns The quaternion.
	 */
	public calculateW(): Quaternion;

	/**
	 * Calculates the fourth component of this unit quaternion from the first three, ignoring the existing fourth component.
	 * @param out The quaternion to store the result in.
	 * @returns The quaternion.
	 */
	public calculateW<T extends QuaternionLike>(out: T): T;

	public calculateW<T extends QuaternionLike>(out: T = new Quaternion() as T): T {
		return calculateW(this, out);
	}

	/**
	 * Calculates the exponential of this unit quaternion.
	 * @returns The exponential.
	 */
	public exp(): Quaternion;

	/**
	 * Calculates the exponential of this unit quaternion.
	 * @param out The quaternion to store the result in.
	 * @returns The exponential.
	 */
	public exp<T extends QuaternionLike>(out: T): T;

	public exp<T extends QuaternionLike>(out: T = new Quaternion() as T): T {
		return exp(this, out);
	}

	/**
	 * Calculates the natural logarithm of this unit quaternion.
	 * @returns The natural logarithm.
	 */
	public ln(): Quaternion;

	/**
	 * Calculates the natural logarithm of this unit quaternion.
	 * @param out The quaternion to store the result in.
	 * @returns The natural logarithm.
	 */
	public ln<T extends QuaternionLike>(out: T): T;

	public ln<T extends QuaternionLike>(out: T = new Quaternion() as T): T {
		return ln(this, out);
	}

	/**
	 * Calculates a power of this unit quaternion.
	 * @param scalar The amount to scale the quaternion by.
	 * @returns The power.
	 */
	public pow(scalar: number): Quaternion;

	/**
	 * Calculates a power of this unit quaternion.
	 * @param scalar The amount to scale the quaternion by.
	 * @param out The quaternion to store the result in.
	 * @returns The power.
	 */
	public pow<T extends QuaternionLike>(scalar: number, out: T): T;

	public pow<T extends QuaternionLike>(scalar: number, out: T = new Quaternion() as T): T {
		return pow(this, scalar, out);
	}

	/**
	 * Performs a spherical linear interpolation between this and another quaternion.
	 * @param quaternion The other quaternion.
	 * @param t The interpolation amount in `[0,1]`.
	 * @returns The interpolated quaternion.
	 * @see [Slerp](https://en.wikipedia.org/wiki/Slerp)
	 */
	public slerp(quaternion: QuaternionLike, t: number): Quaternion;

	/**
	 * Performs a spherical linear interpolation between this and another quaternion.
	 * @param quaternion The other quaternion.
	 * @param t The interpolation amount in `[0,1]`.
	 * @param out The quaternion to store the result in.
	 * @returns The interpolated quaternion.
	 * @see [Slerp](https://en.wikipedia.org/wiki/Slerp)
	 */
	public slerp<T extends QuaternionLike>(quaternion: QuaternionLike, t: number, out: T): T;

	public slerp<T extends QuaternionLike>(quaternion: QuaternionLike, t: number, out: T = new Quaternion() as T): T {
		return slerp(this, quaternion, t, out);
	}

	/**
	 * Sets this to a random unit quaternion.
	 * @returns A random unit quaternion.
	 */
	public random(): this {
		return random(this);
	}

	/**
	 * Calculates the inverse of this quaternion. If the quaternion is normalized, the conjugate is the same but faster to calculate.
	 * @returns The inverse.
	 */
	public invert(): Quaternion;

	/**
	 * Calculates the inverse of this quaternion. If the quaternion is normalized, the conjugate is the same but faster to calculate.
	 * @param out The quaternion to store the result in.
	 * @returns The inverse.
	 */
	public invert<T extends QuaternionLike>(out: T): T;

	public invert<T extends QuaternionLike>(out: T = new Quaternion() as T): T {
		return invert(this, out);
	}

	/**
	 * Calculates the conjugate of this quaternion. If the quaternion is normalized, this is the same as the inverse but faster to calculate.
	 * @returns The conjugate.
	 */
	public conjugate(): Quaternion;

	/**
	 * Calculates the conjugate of this quaternion. If the quaternion is normalized, this is the same as the inverse but faster to calculate.
	 * @param out The quaternion to store the result in.
	 * @returns The conjugate.
	 */
	public conjugate<T extends QuaternionLike>(out: T): T;

	public conjugate<T extends QuaternionLike>(out: T = new Quaternion() as T): T {
		return conjugate(this, out);
	}

	/**
	 * Creates a copy of this quaternion.
	 * @returns The copy.
	 */
	public clone(): Quaternion;

	/**
	 * Copies the values from this quaternion to another one.
	 * @param out The quaternion to store the result in.
	 * @returns The copy.
	 */
	public clone<T extends QuaternionLike>(out: T): T;
	
	public clone<T extends QuaternionLike>(out: T = new Quaternion() as T): T {
		return copy(this as unknown as Vector4Like, out as Vector4Like) as T;
	}

	/**
	 * Copies the values of another quaternion into this one.
	 * @param quaternion The quaternion to copy.
	 * @returns This quaternion.
	 */
	public copy(quaternion: QuaternionLike): this {
		return copy(quaternion as Vector4Like, this as unknown as Vector4Like) as unknown as this;
	}

	/**
	 * Adds two quaternions of the same size.
	 * @param quaternion The other quaternion.
	 * @returns The sum of the quaternions.
	 */
	public add(quaternion: QuaternionLike): Quaternion;

	/**
	 * Adds two quaternions of the same size.
	 * @param quaternion The other quaternion.
	 * @param out The quaternion to store the result in.
	 * @returns The sum of the quaternions.
	 */
	public add<T extends QuaternionLike>(quaternion: QuaternionLike, out: T): T;

	public add<T extends QuaternionLike>(quaternion: QuaternionLike, out: T = new Quaternion() as T): T {
		return add(this as unknown as Vector4Like, quaternion as Vector4Like, out as Vector4Like) as T;
	}

	/**
	 * Scales this quaternion by a scalar.
	 * @param scalar The scalar.
	 * @returns The scaled quaternion.
	 */
	public scale(scalar: number): Quaternion;

	/**
	 * Scales this quaternion by a scalar.
	 * @param scalar The scalar.
	 * @param out The quaternion to store the result in.
	 * @returns The scaled quaternion.
	 */
	public scale<T extends QuaternionLike>(scalar: number, out: T): T;

	public scale<T extends QuaternionLike>(scalar: number, out: T = new Quaternion() as T): T {
		return scale(this as unknown as Vector4Like, scalar, out as Vector4Like) as T;
	}

	/**
	 * Calculates the dot product of this and another quaternion.
	 * @param quaternion The other quaternion.
	 * @returns The dot product.
	 */
	public dot(quaternion: QuaternionLike): number {
		return dot(this as unknown as Vector4Like, quaternion as Vector4Like);
	}

	/**
	 * Performs a linear interpolation between this and another quaternion.
	 * @param quaternion The other quaternion.
	 * @param t The interpolation amount (in `[0,1]`).
	 * @returns The interpolated quaternion.
	 */
	public lerp(quaternion: QuaternionLike, t: number): Quaternion;

	/**
	 * Performs a linear interpolation between this and another quaternion.
	 * @param quaternion The other quaternion.
	 * @param t The interpolation amount (in `[0,1]`).
	 * @param out The quaternion to store the result in.
	 * @returns The interpolated quaternion.
	 */
	public lerp<T extends QuaternionLike>(quaternion: QuaternionLike, t: number, out: T): T;

	public lerp<T extends QuaternionLike>(quaternion: QuaternionLike, t: number, out: T = new Quaternion() as T): T {
		return lerp(this as unknown as Vector4Like, quaternion as Vector4Like, t, out as Vector4Like) as T;
	}

	/** The magnitude (length) of this quaternion. */
	public get magnitude(): number {
		return getMagnitude(this as unknown as Vector4Like);
	}

	/** The squared magnitude (length) of this quaternion. */
	public get squaredMagnitude(): number {
		return getSquaredMagnitude(this as unknown as Vector4Like);
	}

	/**
	 * Normalizes this quaternion.
	 * @returns The normalized quaternion.
	 */
	public normalize(): Quaternion;

	/**
	 * Normalizes this quaternion.
	 * @param out The quaternion to store the result in.
	 * @returns The normalized quaternion.
	 */
	public normalize<T extends QuaternionLike>(out: T): T;

	public normalize<T extends QuaternionLike>(out: T = new Quaternion() as T): T {
		return normalize(this as unknown as Vector4Like, out as Vector4Like) as T;
	}

	/**
	 * Determines whether this quaternion is roughly equivalent to another.
	 * @param quaternion The other quaternion.
	 * @returns Whether the quaternions are equivalent.
	 */
	public equals(quaternion: QuaternionLike): boolean {
		return equals(this as unknown as Vector4, quaternion as Vector4Like);
	}

	/**
	 * Determines whether this quaternion is exactly equivalent to another.
	 * @param quaternion The other quaternion.
	 * @returns Whether the quaternions are equivalent.
	 */
	public exactEquals(quaternion: QuaternionLike): boolean {
		return exactEquals(this as unknown as Vector4Like, quaternion as Vector4Like);
	}

	/**
	 * Performs a spherical linear interpolation with two control points between this and another quaternion.
	 * @param a The first control point.
	 * @param b The second control point.
	 * @param quaternion The other quaternion.
	 * @param t The interpolation amount in `[0,1]`.
	 * @returns The interpolated value.
	 * @see [Slerp](https://en.wikipedia.org/wiki/Slerp)
	 */
	public sqlerp(a: QuaternionLike, b: QuaternionLike, quaternion: QuaternionLike, t: number): Quaternion;

	/**
	 * Performs a spherical linear interpolation with two control points between this and another quaternion.
	 * @param a The first control point.
	 * @param b The second control point.
	 * @param quaternion The other quaternion.
	 * @param t The interpolation amount in `[0,1]`.
	 * @param out The quaternion to store the result in.
	 * @returns The interpolated value.
	 * @see [Slerp](https://en.wikipedia.org/wiki/Slerp)
	 */
	public sqlerp<T extends QuaternionLike>(a: QuaternionLike, b: QuaternionLike, quaternion: QuaternionLike, t: number, out: T): T;

	public sqlerp<T extends QuaternionLike>(a: QuaternionLike, b: QuaternionLike, quaternion: QuaternionLike, t: number, out: T = new Quaternion() as T): T {
		return sqlerp(this, a, b, quaternion, t, out);
	}
}
