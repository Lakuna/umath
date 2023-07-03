import type FieldOfView from "@lakuna/umath/types/FieldOfView.js";
import SingularMatrixError from "@lakuna/umath/utility/SingularMatrixError.js";
import epsilon from "@lakuna/umath/utility/epsilon.js";
import type { DualQuaternionLike } from "@lakuna/umath/linear/DualQuaternion.js";
import type { QuaternionLike } from "@lakuna/umath/linear/Quaternion.js";
import type SquareMatrix from "@lakuna/umath/linear/SquareMatrix.js";
import type { Vector3Like } from "@lakuna/umath/linear/Vector3.js";

/** Numbers arranged into four columns and four rows. */
export type Matrix4Like = Matrix4 | [
	number, number, number, number,
	number, number, number, number,
	number, number, number, number,
	number, number, number, number
];

/** A four-by-four matrix. */
export default class Matrix4 extends Float32Array implements SquareMatrix {
	/**
	 * Creates a transformation matrix that represents a translation by the given vector.
	 * @param vector The translation vector.
	 * @returns The transformation matrix.
	 */
	public static fromTranslation(vector: Vector3Like): Matrix4;

	/**
	 * Creates a transformation matrix that represents a translation by the given vector.
	 * @param vector The translation vector.
	 * @param out The matrix to store the result in.
	 * @returns The transformation matrix.
	 */
	public static fromTranslation<T extends Matrix4Like>(vector: Vector3Like, out: T): T;

	public static fromTranslation<T extends Matrix4Like>(vector: Vector3Like, out: T = new Matrix4() as T): T {
		out[0] = 1;
		out[1] = 0;
		out[2] = 0;
		out[3] = 0;
		out[4] = 0;
		out[5] = 1;
		out[6] = 0;
		out[7] = 0;
		out[8] = 0;
		out[9] = 0;
		out[10] = 1;
		out[11] = 0;
		out[12] = vector[0];
		out[13] = vector[1];
		out[14] = vector[2];
		out[15] = 1;
		return out;
	}

	/**
	 * Creates a transformation matrix that represents a scaling by the given vector.
	 * @param vector The scaling vector.
	 * @returns The transformation matrix.
	 */
	public static fromScaling(vector: Vector3Like): Matrix4;

	/**
	 * Creates a transformation matrix that represents a scaling by the given vector.
	 * @param vector The scaling vector.
	 * @param out The matrix to store the result in.
	 * @returns The transformation matrix.
	 */
	public static fromScaling<T extends Matrix4Like>(vector: Vector3Like, out: T): T;

	public static fromScaling<T extends Matrix4Like>(vector: Vector3Like, out: T = new Matrix4() as T): T {
		out[0] = vector[0];
		out[1] = 0;
		out[2] = 0;
		out[3] = 0;
		out[4] = 0;
		out[5] = vector[1];
		out[6] = 0;
		out[7] = 0;
		out[8] = 0;
		out[9] = 0;
		out[10] = vector[2];
		out[11] = 0;
		out[12] = 0;
		out[13] = 0;
		out[14] = 0;
		out[15] = 1;
		return out;
	}

	/**
	 * Creates a transformation matrix that represents a rotation by the given angle around the given axis.
	 * @param radians The angle in radians.
	 * @param axis The axis to rotate around.
	 * @returns The transformation matrix.
	 */
	public static fromRotation(radians: number, axis: Vector3Like): Matrix4;

	/**
	 * Creates a transformation matrix that represents a rotation by the given angle around the Z-axis.
	 * @param radians The angle in radians.
	 * @param axis The axis to rotate around.
	 * @param out The matrix to store the result in.
	 * @returns The transformation matrix.
	 */
	public static fromRotation<T extends Matrix4Like>(radians: number, axis: Vector3Like, out: T): T;

	public static fromRotation<T extends Matrix4Like>(radians: number, axis: Vector3Like, out: T = new Matrix4() as T): T {
		let x: number = axis[0];
		let y: number = axis[1];
		let z: number = axis[2];

		let len: number = Math.hypot(x, y, z);
		if (len == 0) {
			throw new Error("Axis too short!");
		}
		len = 1 / len;

		x *= len;
		y *= len;
		z *= len;

		const s: number = Math.sin(radians);
		const c: number = Math.cos(radians);
		const t: number = 1 - c;
		
		out[0] = x * x * t + c;
		out[1] = y * x * t + z * s;
		out[2] = z * x * t - y * s;
		out[3] = 0;
		out[4] = x * y * t - z * s;
		out[5] = y * y * t + c;
		out[6] = z * y * t + x * s;
		out[7] = 0;
		out[8] = x * z * t + y * s;
		out[9] = y * z * t - x * s;
		out[10] = z * z * t + c;
		out[11] = 0;
		out[12] = 0;
		out[13] = 0;
		out[14] = 0;
		out[15] = 1;
		return out;
	}

	/**
	 * Creates a transformation matrix that represents a rotation by the given angle around the X-axis.
	 * @param radians The angle in radians.
	 * @returns The transformation matrix.
	 */
	public static fromXRotation(radians: number): Matrix4;

	/**
	 * Creates a transformation matrix that represents a rotation by the given angle around the X-axis.
	 * @param radians The angle in radians.
	 * @param out The matrix to store the result in.
	 * @returns The transformation matrix.
	 */
	public static fromXRotation<T extends Matrix4Like>(radians: number, out: T): T;

	public static fromXRotation<T extends Matrix4Like>(radians: number, out: T = new Matrix4() as T): T {
		const s: number = Math.sin(radians);
		const c: number = Math.cos(radians);
		
		out[0] = 1;
		out[1] = 0;
		out[2] = 0;
		out[3] = 0;
		out[4] = 0;
		out[5] = c;
		out[6] = s;
		out[7] = 0;
		out[8] = 0;
		out[9] = -s;
		out[10] = c;
		out[11] = 0;
		out[12] = 0;
		out[13] = 0;
		out[14] = 0;
		out[15] = 1;
		return out;
	}

	/**
	 * Creates a transformation matrix that represents a rotation by the given angle around the Y-axis.
	 * @param radians The angle in radians.
	 * @returns The transformation matrix.
	 */
	public static fromYRotation(radians: number): Matrix4;

	/**
	 * Creates a transformation matrix that represents a rotation by the given angle around the Y-axis.
	 * @param radians The angle in radians.
	 * @param out The matrix to store the result in.
	 * @returns The transformation matrix.
	 */
	public static fromYRotation<T extends Matrix4Like>(radians: number, out: T): T;

	public static fromYRotation<T extends Matrix4Like>(radians: number, out: T = new Matrix4() as T): T {
		const s: number = Math.sin(radians);
		const c: number = Math.cos(radians);
		
		out[0] = c;
		out[1] = 0;
		out[2] = -s;
		out[3] = 0;
		out[4] = 0;
		out[5] = 1;
		out[6] = 0;
		out[7] = 0;
		out[8] = s;
		out[9] = 0;
		out[10] = c;
		out[11] = 0;
		out[12] = 0;
		out[13] = 0;
		out[14] = 0;
		out[15] = 1;
		return out;
	}

	/**
	 * Creates a transformation matrix that represents a rotation by the given angle around the Z-axis.
	 * @param radians The angle in radians.
	 * @returns The transformation matrix.
	 */
	public static fromZRotation(radians: number): Matrix4;

	/**
	 * Creates a transformation matrix that represents a rotation by the given angle around the Z-axis.
	 * @param radians The angle in radians.
	 * @param out The matrix to store the result in.
	 * @returns The transformation matrix.
	 */
	public static fromZRotation<T extends Matrix4Like>(radians: number, out: T): T;

	public static fromZRotation<T extends Matrix4Like>(radians: number, out: T = new Matrix4() as T): T {
		const s: number = Math.sin(radians);
		const c: number = Math.cos(radians);
		
		out[0] = c;
		out[1] = s;
		out[2] = 0;
		out[3] = 0;
		out[4] = -s;
		out[5] = c;
		out[6] = 0;
		out[7] = 0;
		out[8] = 0;
		out[9] = 0;
		out[10] = 1;
		out[11] = 0;
		out[12] = 0;
		out[13] = 0;
		out[14] = 0;
		out[15] = 1;
		return out;
	}

	/**
	 * Creates a transformation matrix from the given rotation and translation.
	 * @param rotation The rotation quaternion.
	 * @param translation The translation vector.
	 * @returns The transformation matrix.
	 */
	public static fromRotationTranslation(rotation: QuaternionLike, translation: Vector3Like): Matrix4;

	/**
	 * Creates a transformation matrix from the given rotation and translation.
	 * @param rotation The rotation quaternion.
	 * @param translation The translation vector.
	 * @param out The matrix to store the result in.
	 * @returns The transformation matrix.
	 */
	public static fromRotationTranslation<T extends Matrix4Like>(rotation: QuaternionLike, translation: Vector3Like, out: T): T;

	public static fromRotationTranslation<T extends Matrix4Like>(rotation: QuaternionLike, translation: Vector3Like, out: T = new Matrix4() as T): T {
		const x: number = rotation[0];
		const y: number = rotation[1];
		const z: number = rotation[2];
		const w: number = rotation[3];

		const x2: number = x + x;
		const y2: number = y + y;
		const z2: number = z + z;
		const xx: number = x * x2;
		const xy: number = x * y2;
		const xz: number = x * z2;
		const yy: number = y * y2;
		const yz: number = y * z2;
		const zz: number = z * z2;
		const wx: number = w * x2;
		const wy: number = w * y2;
		const wz: number = w * z2;

		out[0] = 1 - (yy + zz);
		out[1] = xy + wz;
		out[2] = xz - wy;
		out[3] = 0;
		out[4] = xy - wz;
		out[5] = 1 - (xx + zz);
		out[6] = yz + wx;
		out[7] = 0;
		out[8] = xz + wy;
		out[9] = yz - wx;
		out[10] = 1 - (xx + yy);
		out[11] = 0;
		out[12] = translation[0];
		out[13] = translation[1];
		out[14] = translation[2];
		out[15] = 1;
		return out;
	}

	/**
	 * Creates a transformation matrix from the given rotation, translation, and scale.
	 * @param rotation The rotation quaternion.
	 * @param translation The translation vector.
	 * @param scaling The scaling vector.
	 * @returns The transformation matrix.
	 */
	public static fromRotationTranslationScale(rotation: QuaternionLike, translation: Vector3Like, scaling: Vector3Like): Matrix4;

	/**
	 * Creates a transformation matrix from the given rotation, translation, and scale.
	 * @param rotation The rotation quaternion.
	 * @param translation The translation vector.
	 * @param scaling The scaling vector.
	 * @param out The matrix to store the result in.
	 * @returns The transformation matrix.
	 */
	public static fromRotationTranslationScale<T extends Matrix4Like>(rotation: QuaternionLike, translation: Vector3Like, scaling: Vector3Like, out: T): T;

	public static fromRotationTranslationScale<T extends Matrix4Like>(rotation: QuaternionLike, translation: Vector3Like, scaling: Vector3Like, out: T = new Matrix4() as T): T {
		const x: number = rotation[0];
		const y: number = rotation[1];
		const z: number = rotation[2];
		const w: number = rotation[3];

		const x2: number = x + x;
		const y2: number = y + y;
		const z2: number = z + z;
		const xx: number = x * x2;
		const xy: number = x * y2;
		const xz: number = x * z2;
		const yy: number = y * y2;
		const yz: number = y * z2;
		const zz: number = z * z2;
		const wx: number = w * x2;
		const wy: number = w * y2;
		const wz: number = w * z2;

		const sx: number = scaling[0];
		const sy: number = scaling[1];
		const sz: number = scaling[2];

		out[0] = (1 - (yy + zz)) * sx;
		out[1] = (xy + wz) * sx;
		out[2] = (xz - wy) * sx;
		out[3] = 0;
		out[4] = (xy - wz) * sy;
		out[5] = (1 - (xx + zz)) * sy;
		out[6] = (yz + wx) * sy;
		out[7] = 0;
		out[8] = (xz + wy) * sz;
		out[9] = (yz - wx) * sz;
		out[10] = (1 - (xx + yy)) * sz;
		out[11] = 0;
		out[12] = translation[0];
		out[13] = translation[1];
		out[14] = translation[2];
		out[15] = 1;
		return out;
	}

	/**
	 * Creates a transformation matrix from the given rotation, translation, and scale around the given origin.
	 * @param rotation The rotation quaternion.
	 * @param translation The translation vector.
	 * @param scaling The scaling vector.
	 * @param origin The origin vector.
	 * @returns The transformation matrix.
	 */
	public static fromRotationTranslationScaleOrigin(rotation: QuaternionLike, translation: Vector3Like, scaling: Vector3Like, origin: Vector3Like): Matrix4;

	/**
	 * Creates a transformation matrix from the given rotation, translation, and scale around the given origin.
	 * @param rotation The rotation quaternion.
	 * @param translation The translation vector.
	 * @param scaling The scaling vector.
	 * @param origin The origin vector.
	 * @param out The matrix to store the result in.
	 * @returns The transformation matrix.
	 */
	public static fromRotationTranslationScaleOrigin<T extends Matrix4Like>(rotation: QuaternionLike, translation: Vector3Like, scaling: Vector3Like, origin: Vector3Like, out: T): T;

	public static fromRotationTranslationScaleOrigin<T extends Matrix4Like>(rotation: QuaternionLike, translation: Vector3Like, scaling: Vector3Like, origin: Vector3Like, out: T = new Matrix4() as T): T {
		const x: number = rotation[0];
		const y: number = rotation[1];
		const z: number = rotation[2];
		const w: number = rotation[3];

		const x2: number = x + x;
		const y2: number = y + y;
		const z2: number = z + z;
		const xx: number = x * x2;
		const xy: number = x * y2;
		const xz: number = x * z2;
		const yy: number = y * y2;
		const yz: number = y * z2;
		const zz: number = z * z2;
		const wx: number = w * x2;
		const wy: number = w * y2;
		const wz: number = w * z2;

		const sx: number = scaling[0];
		const sy: number = scaling[1];
		const sz: number = scaling[2];
		const ox: number = origin[0];
		const oy: number = origin[1];
		const oz: number = origin[2];

		const out0: number = (1 - (yy + zz)) * sx;
		const out1: number = (xy + wz) * sx;
		const out2: number = (xz - wy) * sx;
		const out4: number = (xy - wz) * sy;
		const out5: number = (1 - (xx + zz)) * sy;
		const out6: number = (yz + wx) * sy;
		const out8: number = (xz + wy) * sz;
		const out9: number = (yz - wx) * sz;
		const out10: number = (1 - (xx + yy)) * sz;

		out[0] = out0;
		out[1] = out1;
		out[2] = out2;
		out[3] = 0;
		out[4] = out4;
		out[5] = out5;
		out[6] = out6;
		out[7] = 0;
		out[8] = out8;
		out[9] = out9;
		out[10] = out10;
		out[11] = 0;
		out[12] = translation[0] + ox - (out0 * ox + out4 * oy + out8 * oz);
		out[13] = translation[1] + oy - (out1 * ox + out5 * oy + out9 * oz);
		out[14] = translation[2] + oz - (out2 * ox + out6 * oy + out10 * oz);
		out[15] = 1;
		return out;
	}

	/**
	 * Creates a transformation matrix from a dual quaternion.
	 * @param quaternion The dual quaternion.
	 * @returns The transformation matrix.
	 */
	public static fromDualQuaternion(quaternion: DualQuaternionLike): Matrix4;

	/**
	 * Creates a transformation matrix from a dual quaternion.
	 * @param quaternion The dual quaternion.
	 * @param out The matrix to store the result in.
	 * @returns The transformation matrix.
	 */
	public static fromDualQuaternion<T extends Matrix4Like>(quaternion: DualQuaternionLike, out: T): T;

	public static fromDualQuaternion<T extends Matrix4Like>(quaternion: DualQuaternionLike, out: T = new Matrix4() as T): T {
		const translation: Float32Array = new Float32Array(3);

		const bx: number = -quaternion[0];
		const by: number = -quaternion[1];
		const bz: number = -quaternion[2];
		const bw: number = quaternion[3];
		const ax: number = quaternion[4];
		const ay: number = quaternion[5];
		const az: number = quaternion[6];
		const aw: number = quaternion[7];

		const magnitude: number = bx * bx + by * by + bz * bz + bw * bw;
		if (magnitude > 0) {
			translation[0] = ((ax * bw + aw * bx + ay * bz - az * by) * 2) / magnitude;
			translation[1] = ((ay * bw + aw * by + az * bx - ax * bz) * 2) / magnitude;
			translation[2] = ((az * bw + aw * bz + ax * by - ay * bx) * 2) / magnitude;
		} else {
			translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
			translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
			translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
		}

		Matrix4.fromRotationTranslation(quaternion as QuaternionLike, translation, out); // `Matrix4.fromRotationTranslation` only attempts to access the first four elements anyway.
		return out;
	}

	/**
	 * Generates a frustum matrix with the given bounds.
	 * @param left The left bound of the frustum.
	 * @param right The right bound of the frustum.
	 * @param bottom The bottom bound of the frustum.
	 * @param top The top bound of the frustum.
	 * @param near The near bound of the frustum.
	 * @param far The far bound of the frustum.
	 * @returns The frustum matrix.
	 */
	public static frustum(left: number, right: number, bottom: number, top: number, near: number, far: number): Matrix4;

	/**
	 * Generates a frustum matrix with the given bounds.
	 * @param left The left bound of the frustum.
	 * @param right The right bound of the frustum.
	 * @param bottom The bottom bound of the frustum.
	 * @param top The top bound of the frustum.
	 * @param near The near bound of the frustum.
	 * @param far The far bound of the frustum.
	 * @param out The matrix to store the result in.
	 * @returns The frustum matrix.
	 */
	public static frustum<T extends Matrix4Like>(left: number, right: number, bottom: number, top: number, near: number, far: number, out: T): T;

	public static frustum<T extends Matrix4Like>(left: number, right: number, bottom: number, top: number, near: number, far: number, out: T = new Matrix4() as T): T {
		const rl: number = 1 / (right - left);
		const tb: number = 1 / (top - bottom);
		const nf: number = 1 / (near - far);

		out[0] = near * 2 * rl;
		out[1] = 0;
		out[2] = 0;
		out[3] = 0;
		out[4] = 0;
		out[5] = near * 2 * tb;
		out[6] = 0;
		out[7] = 0;
		out[8] = (right + left) * rl;
		out[9] = (top + bottom) * tb;
		out[10] = (far + near) * nf;
		out[11] = -1;
		out[12] = 0;
		out[13] = 0;
		out[14] = far * near * 2 * nf;
		out[15] = 0;
		return out;
	}

	/**
	 * Creates a perspective projection matrix with the given bounds.
	 * @param fov The vertical field of view in radians.
	 * @param aspect The aspect ratio (typically the width of the viewport divided by its height).
	 * @param near The near bound of the frustum.
	 * @param far The far bound of the frustum.
	 * @returns The perspective projection matrix.
	 */
	public static perspective(fov: number, aspect: number, near: number, far: number): Matrix4;

	/**
	 * Creates a perspective projection matrix with the given bounds.
	 * @param fov The vertical field of view in radians.
	 * @param aspect The aspect ratio (typically the width of the viewport divided by its height).
	 * @param near The near bound of the frustum.
	 * @param far The far bound of the frustum.
	 * @param out The matrix to store the result in.
	 * @returns The perspective projection matrix.
	 */
	public static perspective<T extends Matrix4Like>(fov: number, aspect: number, near: number, far: number, out: T): T;

	public static perspective<T extends Matrix4Like>(fov: number, aspect: number, near: number, far: number, out: T = new Matrix4() as T): T {
		const f: number = 1 / Math.tan(fov / 2);

		out[0] = f / aspect;
		out[1] = 0;
		out[2] = 0;
		out[3] = 0;
		out[4] = 0;
		out[5] = f;
		out[6] = 0;
		out[7] = 0;
		out[8] = 0;
		out[9] = 0;
		out[11] = -1;
		out[12] = 0;
		out[13] = 0;
		out[15] = 0;
		
		if (far != null && far != Infinity) {
			const nf: number = 1 / (near - far);
			out[10] = (far + near) * nf;
			out[14] = 2 * far * near * nf;
		} else {
			out[10] = -1;
			out[14] = -2 * near;
		}

		return out;
	}

	/**
	 * Creates a perspective projection matrix from a field of view. Useful for generating projection matrices to be used with the WebXR API.
	 * @param fov The field of view.
	 * @param near The near bound of the frustum.
	 * @param far The far bound of the frustum.
	 * @returns The perspective projection matrix.
	 * @see [WebXR API](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API)
	 */
	public static perspectiveFromFieldOfView(fov: FieldOfView, near: number, far: number): Matrix4;

	/**
	 * Creates a perspective projection matrix from a field of view. Useful for generating projection matrices to be used with the WebXR API.
	 * @param fov The field of view.
	 * @param near The near bound of the frustum.
	 * @param far The far bound of the frustum.
	 * @param out The matrix to store the result in.
	 * @returns The perspective projection matrix.
	 * @see [WebXR API](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API)
	 */
	public static perspectiveFromFieldOfView<T extends Matrix4Like>(fov: FieldOfView, near: number, far: number, out: T): T;

	public static perspectiveFromFieldOfView<T extends Matrix4Like>(fov: FieldOfView, near: number, far: number, out: T = new Matrix4() as T): T {
		const upTan: number = Math.tan((fov.upDegrees * Math.PI) / 180);
		const downTan: number = Math.tan((fov.downDegrees * Math.PI) / 180);
		const leftTan: number = Math.tan((fov.leftDegrees * Math.PI) / 180);
		const rightTan: number = Math.tan((fov.rightDegrees * Math.PI) / 180);
		const xScale: number = 2 / (leftTan + rightTan);
		const yScale: number = 2 / (upTan + downTan);

		out[0] = xScale;
		out[1] = 0;
		out[2] = 0;
		out[3] = 0;
		out[4] = 0;
		out[5] = yScale;
		out[6] = 0;
		out[7] = 0;
		out[8] = -((leftTan - rightTan) * xScale * 0.5);
		out[9] = (upTan - downTan) * yScale * 0.5;
		out[10] = far / (near - far);
		out[11] = -1;
		out[12] = 0;
		out[13] = 0;
		out[14] = (far * near) / (near - far);
		out[15] = 0;
		return out;
	}

	/**
	 * Generates an orthogonal projection matrix with the given bounds.
	 * @param left The left bound of the frustum.
	 * @param right The right bound of the frustum.
	 * @param bottom The bottom bound of the frustum.
	 * @param top The top bound of the frustum.
	 * @param near The near bound of the frustum.
	 * @param far The far bound of the frustum.
	 * @returns The frustum matrix.
	 */
	public static ortho(left: number, right: number, bottom: number, top: number, near: number, far: number): Matrix4;

	/**
	 * Generates an orthogonal projection matrix with the given bounds.
	 * @param left The left bound of the frustum.
	 * @param right The right bound of the frustum.
	 * @param bottom The bottom bound of the frustum.
	 * @param top The top bound of the frustum.
	 * @param near The near bound of the frustum.
	 * @param far The far bound of the frustum.
	 * @param out The matrix to store the result in.
	 * @returns The frustum matrix.
	 */
	public static ortho<T extends Matrix4Like>(left: number, right: number, bottom: number, top: number, near: number, far: number, out: T): T;

	public static ortho<T extends Matrix4Like>(left: number, right: number, bottom: number, top: number, near: number, far: number, out: T = new Matrix4() as T): T {
		const lr: number = 1 / (left - right);
		const bt: number = 1 / (bottom - top);
		const nf: number = 1 / (near - far);

		out[0] = -2 * lr;
		out[1] = 0;
		out[2] = 0;
		out[3] = 0;
		out[4] = 0;
		out[5] = -2 * bt;
		out[6] = 0;
		out[7] = 0;
		out[8] = 0;
		out[9] = 0;
		out[10] = 2 * nf;
		out[11] = 0;
		out[12] = (left + right) * lr;
		out[13] = (top + bottom) * bt;
		out[14] = (far + near) * nf;
		out[15] = 1;
		return out;
	}

	/**
	 * Generates a look-at matrix. If you want a matrix that actually makes an object look at another object, use `targetTo` instead.
	 * @param eye The position of the viewer.
	 * @param center The point that the viewer is looking at.
	 * @param up The local up direction.
	 * @returns The look-at matrix.
	 */
	public static lookAt(eye: Vector3Like, center: Vector3Like, up?: Vector3Like): Matrix4;

	/**
	 * Generates a look-at matrix. If you want a matrix that actually makes an object look at another object, use `targetTo` instead.
	 * @param eye The position of the viewer.
	 * @param center The point that the viewer is looking at.
	 * @param up The local up direction.
	 * @param out The matrix to store the result in.
	 * @returns The look-at matrix.
	 */
	public static lookAt<T extends Matrix4Like>(eye: Vector3Like, center: Vector3Like, up?: Vector3Like, out?: T): T;

	public static lookAt<T extends Matrix4Like>(eye: Vector3Like, center: Vector3Like, up: Vector3Like = [0, 1, 0], out: T = new Matrix4() as T): T {
		const eyex: number = eye[0];
		const eyey: number = eye[1];
		const eyez: number = eye[2];

		const upx: number = up[0];
		const upy: number = up[1];
		const upz: number = up[2];

		const centerx: number = center[0];
		const centery: number = center[1];
		const centerz: number = center[2];

		if (Math.abs(eyex - centerx) < epsilon
			&& Math.abs(eyey - centery) < epsilon
			&& Math.abs(eyez - centerz) < epsilon) {
			out[0] = 1;
			out[1] = 0;
			out[2] = 0;
			out[3] = 0;
			out[4] = 0;
			out[5] = 1;
			out[6] = 0;
			out[7] = 0;
			out[8] = 0;
			out[9] = 0;
			out[10] = 1;
			out[11] = 0;
			out[12] = 0;
			out[13] = 0;
			out[14] = 0;
			out[15] = 1;
			return out;
		}

		let z0: number = eyex - centerx;
		let z1: number = eyey - centery;
		let z2: number = eyez - centerz;
		let len: number = 1 / Math.hypot(z0, z1, z2);
		z0 *= len;
		z1 *= len;
		z2 *= len;

		let x0: number = upy * z2 - upz * z1;
		let x1: number = upz * z0 - upx * z2;
		let x2: number = upx * z1 - upy * z0;
		len = Math.hypot(x0, x1, x2);
		if (!len) {
			x0 = 0;
			x1 = 0;
			x2 = 0;
		} else {
			len = 1 / len;
			x0 *= len;
			x1 *= len;
			x2 *= len;
		}

		let y0: number = z1 * x2 - z2 * x1;
		let y1: number = z2 * x0 - z0 * x2;
		let y2: number = z0 * x1 - z1 * x0;
		len = Math.hypot(y0, y1, y2);
		if (!len) {
			y0 = 0;
			y1 = 0;
			y2 = 0;
		} else {
			len = 1 / len;
			y0 *= len;
			y1 *= len;
			y2 *= len;
		}

		out[0] = x0;
		out[1] = y0;
		out[2] = z0;
		out[3] = 0;
		out[4] = x1;
		out[5] = y1;
		out[6] = z1;
		out[7] = 0;
		out[8] = x2;
		out[9] = y2;
		out[10] = z2;
		out[11] = 0;
		out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
		out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
		out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
		out[15] = 1;
		return out;
	}

	/**
	 * Creates a matrix that makes something look at something else.
	 * @param eye The position of the viewer.
	 * @param center The point that the viewer is looking at.
	 * @param up The local up direction.
	 * @returns The transformation matrix.
	 */
	public static targetTo(eye: Vector3Like, target: Vector3Like, up?: Vector3Like): Matrix4;

	/**
	 * Creates a matrix that makes something look at something else.
	 * @param eye The position of the viewer.
	 * @param center The point that the viewer is looking at.
	 * @param up The local up direction.
	 * @param out The matrix to store the result in.
	 * @returns The transformation matrix.
	 */
	public static targetTo<T extends Matrix4>(eye: Vector3Like, target: Vector3Like, up?: Vector3Like, out?: T): T;

	public static targetTo<T extends Matrix4>(eye: Vector3Like, target: Vector3Like, up: Vector3Like = [0, 1, 0], out: T = new Matrix4() as T): T {
		const eyex: number = eye[0];
		const eyey: number = eye[1];
		const eyez: number = eye[2];

		const upx: number = up[0];
		const upy: number = up[1];
		const upz: number = up[2];

		let z0: number = eyex - target[0];
		let z1: number = eyey - target[1];
		let z2: number = eyez - target[2];
		let len: number = z0 * z0 + z1 * z1 + z2 * z2;
		if (len > 0) {
			len = 1 / Math.sqrt(len);
			z0 *= len;
			z1 *= len;
			z2 *= len;
		}

		let x0: number = upy * z2 - upz * z1;
		let x1: number = upz * z0 - upx * z2;
		let x2: number = upx * z1 - upy * z0;
		len = x0 * x0 + x1 * x1 + x2 * x2;
		if (len > 0) {
			len = 1 / Math.sqrt(len);
			x0 *= len;
			x1 *= len;
			x2 *= len;
		}

		out[0] = x0;
		out[1] = x1;
		out[2] = x2;
		out[3] = 0;
		out[4] = z1 * x2 - z2 * x1;
		out[5] = z2 * x0 - z0 * x2;
		out[6] = z0 * x1 - z1 * x0;
		out[7] = 0;
		out[8] = z0;
		out[9] = z1;
		out[10] = z2;
		out[11] = 0;
		out[12] = eyex;
		out[13] = eyey;
		out[14] = eyez;
		out[15] = 1;
		return out;
	}

	/**
	 * Creates a two-by-two matrix with the given values.
	 * @param c0r0 The value in the first column and first row.
	 * @param c0r1 The value in the first column and second row.
	 * @param c0r2 The value in the first column and third row.
	 * @param c0r3 The value in the first column and fourth row.
	 * @param c1r0 The value in the second column and first row.
	 * @param c1r1 The value in the second column and second row.
	 * @param c1r2 The value in the second column and third row.
	 * @param c1r3 The value in the second column and fourth row.
	 * @param c2r0 The value in the third column and first row.
	 * @param c2r1 The value in the third column and second row.
	 * @param c2r2 The value in the third column and third row.
	 * @param c2r3 The value in the third column and fourth row.
	 * @param c3r0 The value in the fourth column and first row.
	 * @param c3r1 The value in the fourth column and second row.
	 * @param c3r2 The value in the fourth column and third row.
	 * @param c3r3 The value in the fourth column and fourth row.
	 * @returns The transformation matrix.
	 */
	public static fromValues(c0r0: number, c0r1: number, c0r2: number, c0r3: number, c1r0: number, c1r1: number, c1r2: number, c1r3: number, c2r0: number, c2r1: number, c2r2: number, c2r3: number, c3r0: number, c3r1: number, c3r2: number, c3r3: number): Matrix4;

	/**
	 * Creates a two-by-two matrix with the given values.
	 * @param c0r0 The value in the first column and first row.
	 * @param c0r1 The value in the first column and second row.
	 * @param c0r2 The value in the first column and third row.
	 * @param c0r3 The value in the first column and fourth row.
	 * @param c1r0 The value in the second column and first row.
	 * @param c1r1 The value in the second column and second row.
	 * @param c1r2 The value in the second column and third row.
	 * @param c1r3 The value in the second column and fourth row.
	 * @param c2r0 The value in the third column and first row.
	 * @param c2r1 The value in the third column and second row.
	 * @param c2r2 The value in the third column and third row.
	 * @param c2r3 The value in the third column and fourth row.
	 * @param c3r0 The value in the fourth column and first row.
	 * @param c3r1 The value in the fourth column and second row.
	 * @param c3r2 The value in the fourth column and third row.
	 * @param c3r3 The value in the fourth column and fourth row.
	 * @param out The matrix to store the result in.
	 * @returns The transformation matrix.
	 */
	public static fromValues<T extends Matrix4Like>(c0r0: number, c0r1: number, c0r2: number, c0r3: number, c1r0: number, c1r1: number, c1r2: number, c1r3: number, c2r0: number, c2r1: number, c2r2: number, c2r3: number, c3r0: number, c3r1: number, c3r2: number, c3r3: number, out: T): T;

	public static fromValues<T extends Matrix4Like>(c0r0: number, c0r1: number, c0r2: number, c0r3: number, c1r0: number, c1r1: number, c1r2: number, c1r3: number, c2r0: number, c2r1: number, c2r2: number, c2r3: number, c3r0: number, c3r1: number, c3r2: number, c3r3: number, out: T = new Matrix4() as T): T {
		out[0] = c0r0;
		out[1] = c0r1;
		out[2] = c0r2;
		out[3] = c0r3;
		out[4] = c1r0;
		out[5] = c1r1;
		out[6] = c1r2;
		out[7] = c1r3;
		out[8] = c2r0;
		out[9] = c2r1;
		out[10] = c2r2;
		out[11] = c2r3;
		out[12] = c3r0;
		out[13] = c3r1;
		out[14] = c3r2;
		out[15] = c3r3;
		return out;
	}
	
	/** Creates a four-by-four identity matrix. */
	public constructor() {
		super(16);

		this[0] = 1;
		this[5] = 1;
		this[10] = 1;
		this[15] = 1;

		this.width = 4;
		this.height = 4;
	}

	/** The number of columns in this matrix. */
	public readonly width: 4;

	/** The number of rows in this matrix. */
	public readonly height: 4;

	/**
	 * Gets the value at the given position in this matrix.
	 * @param row The row of the value.
	 * @param col The column of the value.
	 * @returns The value at the specified position.
	 */
	public get(row: number, col: number): number | undefined {
		return this[col * this.height + row];
	}

	/**
	 * Sets the value at the given position in this matrix.
	 * @param row The row of the value.
	 * @param col The column of the value.
	 * @param val The value.
	 */
	public put(row: number, col: number, val: number): void {
		this[col * this.height + row] = val;
	}

	/**
	 * Determines whether this matrix is roughly equivalent to another.
	 * @param matrix The other matrix.
	 * @returns Whether the matrices are equivalent.
	 */
	public equals(matrix: Matrix4Like): boolean {
		const a0: number = this[0] as number;
		const a1: number = this[1] as number;
		const a2: number = this[2] as number;
		const a3: number = this[3] as number;
		const a4: number = this[4] as number;
		const a5: number = this[5] as number;
		const a6: number = this[6] as number;
		const a7: number = this[7] as number;
		const a8: number = this[8] as number;
		const a9: number = this[9] as number;
		const a10: number = this[10] as number;
		const a11: number = this[11] as number;
		const a12: number = this[12] as number;
		const a13: number = this[13] as number;
		const a14: number = this[14] as number;
		const a15: number = this[15] as number;

		const b0: number = matrix[0];
		const b1: number = matrix[1];
		const b2: number = matrix[2];
		const b3: number = matrix[3];
		const b4: number = matrix[4];
		const b5: number = matrix[5];
		const b6: number = matrix[6];
		const b7: number = matrix[7];
		const b8: number = matrix[8];
		const b9: number = matrix[9];
		const b10: number = matrix[10];
		const b11: number = matrix[11];
		const b12: number = matrix[12];
		const b13: number = matrix[13];
		const b14: number = matrix[14];
		const b15: number = matrix[15];

		return (Math.abs(a0 - b0) <= epsilon * Math.max(1, Math.abs(a0), Math.abs(b0))
			&& Math.abs(a1 - b1) <= epsilon * Math.max(1, Math.abs(a1), Math.abs(b1))
			&& Math.abs(a2 - b2) <= epsilon * Math.max(1, Math.abs(a2), Math.abs(b2))
			&& Math.abs(a3 - b3) <= epsilon * Math.max(1, Math.abs(a3), Math.abs(b3))
			&& Math.abs(a4 - b4) <= epsilon * Math.max(1, Math.abs(a4), Math.abs(b4))
			&& Math.abs(a5 - b5) <= epsilon * Math.max(1, Math.abs(a5), Math.abs(b5))
			&& Math.abs(a6 - b6) <= epsilon * Math.max(1, Math.abs(a6), Math.abs(b6))
			&& Math.abs(a7 - b7) <= epsilon * Math.max(1, Math.abs(a7), Math.abs(b7))
			&& Math.abs(a8 - b8) <= epsilon * Math.max(1, Math.abs(a8), Math.abs(b8))
			&& Math.abs(a9 - b9) <= epsilon * Math.max(1, Math.abs(a9), Math.abs(b9))
			&& Math.abs(a10 - b10) <= epsilon * Math.max(1, Math.abs(a10), Math.abs(b10))
			&& Math.abs(a11 - b11) <= epsilon * Math.max(1, Math.abs(a11), Math.abs(b11))
			&& Math.abs(a12 - b12) <= epsilon * Math.max(1, Math.abs(a12), Math.abs(b12))
			&& Math.abs(a13 - b13) <= epsilon * Math.max(1, Math.abs(a13), Math.abs(b13))
			&& Math.abs(a14 - b14) <= epsilon * Math.max(1, Math.abs(a14), Math.abs(b14))
			&& Math.abs(a15 - b15) <= epsilon * Math.max(1, Math.abs(a15), Math.abs(b15)));
	}

	/**
	 * Determines whether this matrix is exactly equivalent to another.
	 * @param matrix The other matrix.
	 * @returns Whether the matrices are equivalent.
	 */
	public exactEquals(matrix: Matrix4Like): boolean {
		return this[0] == matrix[0]
			&& this[1] == matrix[1]
			&& this[2] == matrix[2]
			&& this[3] == matrix[3]
			&& this[4] == matrix[4]
			&& this[5] == matrix[5]
			&& this[6] == matrix[6]
			&& this[7] == matrix[7]
			&& this[8] == matrix[8]
			&& this[9] == matrix[9]
			&& this[10] == matrix[10]
			&& this[11] == matrix[11]
			&& this[12] == matrix[12]
			&& this[13] == matrix[13]
			&& this[14] == matrix[14]
			&& this[15] == matrix[15];
	}

	/**
	 * Adds two matrices of the same size.
	 * @param matrix The other matrix.
	 * @returns The sum of the matrices.
	 */
	public add(matrix: Matrix4Like): Matrix4;

	/**
	 * Adds two matrices of the same size.
	 * @param matrix The other matrix.
	 * @param out The matrix to store the result in.
	 * @returns The sum of the matrices.
	 */
	public add<T extends Matrix4Like>(matrix: Matrix4Like, out: T): T;

	public add<T extends Matrix4Like>(matrix: Matrix4Like, out: T = new Matrix4() as T): T {
		out[0] = (this[0] as number) + matrix[0];
		out[1] = (this[1] as number) + matrix[1];
		out[2] = (this[2] as number) + matrix[2];
		out[3] = (this[3] as number) + matrix[3];
		out[4] = (this[4] as number) + matrix[4];
		out[5] = (this[5] as number) + matrix[5];
		out[6] = (this[6] as number) + matrix[6];
		out[7] = (this[7] as number) + matrix[7];
		out[8] = (this[8] as number) + matrix[8];
		out[9] = (this[9] as number) + matrix[8];
		out[10] = (this[10] as number) + matrix[10];
		out[11] = (this[11] as number) + matrix[11];
		out[12] = (this[12] as number) + matrix[12];
		out[13] = (this[13] as number) + matrix[13];
		out[14] = (this[14] as number) + matrix[14];
		out[15] = (this[15] as number) + matrix[15];
		return out;
	}

	/**
	 * Calculates the adjugate of this matrix.
	 * @returns The adjugate of this matrix.
	 */
	public adjoint(): Matrix4;

	/**
	 * Calculates the adjugate of this matrix.
	 * @param out The matrix to store the result in.
	 * @returns The adjugate of this matrix.
	 */
	public adjoint<T extends Matrix4Like>(out: T): T;

	public adjoint<T extends Matrix4Like>(out: T = new Matrix4() as T): T {
		const a00: number = this[0] as number;
		const a01: number = this[1] as number;
		const a02: number = this[2] as number;
		const a03: number = this[3] as number;
		const a10: number = this[4] as number;
		const a11: number = this[5] as number;
		const a12: number = this[6] as number;
		const a13: number = this[7] as number;
		const a20: number = this[8] as number;
		const a21: number = this[9] as number;
		const a22: number = this[10] as number;
		const a23: number = this[11] as number;
		const a30: number = this[12] as number;
		const a31: number = this[13] as number;
		const a32: number = this[14] as number;
		const a33: number = this[15] as number;

		out[0] =
			a11 * (a22 * a33 - a23 * a32) -
			a21 * (a12 * a33 - a13 * a32) +
			a31 * (a12 * a23 - a13 * a22);
		out[1] = -(
			a01 * (a22 * a33 - a23 * a32) -
			a21 * (a02 * a33 - a03 * a32) +
			a31 * (a02 * a23 - a03 * a22));
		out[2] =
			a01 * (a12 * a33 - a13 * a32) -
			a11 * (a02 * a33 - a03 * a32) +
			a31 * (a02 * a13 - a03 * a12);
		out[3] = -(
			a01 * (a12 * a23 - a13 * a22) -
			a11 * (a02 * a23 - a03 * a22) +
			a21 * (a02 * a13 - a03 * a12));
		out[4] = -(
			a10 * (a22 * a33 - a23 * a32) -
			a20 * (a12 * a33 - a13 * a32) +
			a30 * (a12 * a23 - a13 * a22));
		out[5] =
			a00 * (a22 * a33 - a23 * a32) -
			a20 * (a02 * a33 - a03 * a32) +
			a30 * (a02 * a23 - a03 * a22);
		out[6] = -(
			a00 * (a12 * a33 - a13 * a32) -
			a10 * (a02 * a33 - a03 * a32) +
			a30 * (a02 * a13 - a03 * a12));
		out[7] =
			a00 * (a12 * a23 - a13 * a22) -
			a10 * (a02 * a23 - a03 * a22) +
			a20 * (a02 * a13 - a03 * a12);
		out[8] =
			a10 * (a21 * a33 - a23 * a31) -
			a20 * (a11 * a33 - a13 * a31) +
			a30 * (a11 * a23 - a13 * a21);
		out[9] = -(
			a00 * (a21 * a33 - a23 * a31) -
			a20 * (a01 * a33 - a03 * a31) +
			a30 * (a01 * a23 - a03 * a21));
		out[10] =
			a00 * (a11 * a33 - a13 * a31) -
			a10 * (a01 * a33 - a03 * a31) +
			a30 * (a01 * a13 - a03 * a11);
		out[11] = -(
			a00 * (a11 * a23 - a13 * a21) -
			a10 * (a01 * a23 - a03 * a21) +
			a20 * (a01 * a13 - a03 * a11));
		out[12] = -(
			a10 * (a21 * a32 - a22 * a31) -
			a20 * (a11 * a32 - a12 * a31) +
			a30 * (a11 * a22 - a12 * a21));
		out[13] =
			a00 * (a21 * a32 - a22 * a31) -
			a20 * (a01 * a32 - a02 * a31) +
			a30 * (a01 * a22 - a02 * a21);
		out[14] = -(
			a00 * (a11 * a32 - a12 * a31) -
			a10 * (a01 * a32 - a02 * a31) +
			a30 * (a01 * a12 - a02 * a11));
		out[15] =
			a00 * (a11 * a22 - a12 * a21) -
			a10 * (a01 * a22 - a02 * a21) +
			a20 * (a01 * a12 - a02 * a11);
		return out;
	}

	/**
	 * Creates a copy of this matrix.
	 * @returns A copy of this matrix.
	 */
	public clone(): Matrix4 {
		const out: Matrix4 = new Matrix4();
		out[0] = this[0] as number;
		out[1] = this[1] as number;
		out[2] = this[2] as number;
		out[3] = this[3] as number;
		out[4] = this[4] as number;
		out[5] = this[5] as number;
		out[6] = this[6] as number;
		out[7] = this[7] as number;
		out[8] = this[8] as number;
		out[9] = this[9] as number;
		out[10] = this[10] as number;
		out[11] = this[11] as number;
		out[12] = this[12] as number;
		out[13] = this[13] as number;
		out[14] = this[14] as number;
		out[15] = this[15] as number;
		return out;
	}

	/**
	 * Copies the values of another matrix into this one.
	 * @param matrix The matrix to copy.
	 * @returns This matrix.
	 */
	public copy(matrix: Matrix4Like): this {
		this[0] = matrix[0];
		this[1] = matrix[1];
		this[2] = matrix[2];
		this[3] = matrix[3];
		this[4] = matrix[4];
		this[5] = matrix[5];
		this[6] = matrix[6];
		this[7] = matrix[7];
		this[8] = matrix[8];
		this[9] = matrix[9];
		this[10] = matrix[10];
		this[11] = matrix[11];
		this[12] = matrix[12];
		this[13] = matrix[13];
		this[14] = matrix[14];
		this[15] = matrix[15];
		return this;
	}

	/** The Frobenius normal of this matrix. */
	public get frob(): number {
		return Math.hypot(
			this[0] as number, this[1] as number, this[2] as number, this[3] as number,
			this[4] as number, this[5] as number, this[6] as number, this[7] as number,
			this[8] as number, this[9] as number, this[10] as number, this[11] as number,
			this[12] as number, this[13] as number, this[14] as number, this[15] as number
		);
	}

	/**
	 * Multiplies this matrix by another.
	 * @param matrix The other matrix.
	 * @returns The product of the matrices.
	 */
	public multiply(matrix: Matrix4Like): Matrix4;

	/**
	 * Multiplies this matrix by another.
	 * @param matrix The other matrix.
	 * @param out The matrix to store the result in.
	 * @returns The product of the matrices.
	 */
	public multiply<T extends Matrix4Like>(matrix: Matrix4Like, out: T): T;

	public multiply<T extends Matrix4Like>(matrix: Matrix4Like, out: T = new Matrix4() as T): T {
		const a00: number = this[0] as number;
		const a01: number = this[1] as number;
		const a02: number = this[2] as number;
		const a03: number = this[3] as number;
		const a10: number = this[4] as number;
		const a11: number = this[5] as number;
		const a12: number = this[6] as number;
		const a13: number = this[7] as number;
		const a20: number = this[8] as number;
		const a21: number = this[9] as number;
		const a22: number = this[10] as number;
		const a23: number = this[11] as number;
		const a30: number = this[12] as number;
		const a31: number = this[13] as number;
		const a32: number = this[14] as number;
		const a33: number = this[15] as number;

		let b0: number = matrix[0];
		let b1: number = matrix[1];
		let b2: number = matrix[2];
		let b3: number = matrix[3];
		out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
		out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
		out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
		out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
		b0 = matrix[4];
		b1 = matrix[5];
		b2 = matrix[6];
		b3 = matrix[7];
		out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
		out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
		out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
		out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
		b0 = matrix[8];
		b1 = matrix[9];
		b2 = matrix[10];
		b3 = matrix[11];
		out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
		out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
		out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
		out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
		b0 = matrix[12];
		b1 = matrix[13];
		b2 = matrix[14];
		b3 = matrix[15];
		out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
		out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
		out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
		out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
		return out;
	}

	/**
	 * Multiplies this matrix by a scalar value.
	 * @param scalar The scalar value.
	 * @returns The product of the matrix and the scalar value.
	 */
	public multiplyScalar(scalar: number): Matrix4;

	/**
	 * Multiplies this matrix by a scalar value.
	 * @param scalar The scalar value.
	 * @param out The matrix to store the result in.
	 * @returns The product of the matrix and the scalar value.
	 */
	public multiplyScalar<T extends Matrix4Like>(scalar: number, out: T): T;

	public multiplyScalar<T extends Matrix4Like>(scalar: number, out: T = new Matrix4() as T): T {
		out[0] = (this[0] as number) * scalar;
		out[1] = (this[1] as number) * scalar;
		out[2] = (this[2] as number) * scalar;
		out[3] = (this[3] as number) * scalar;
		out[4] = (this[4] as number) * scalar;
		out[5] = (this[5] as number) * scalar;
		out[6] = (this[6] as number) * scalar;
		out[7] = (this[7] as number) * scalar;
		out[8] = (this[8] as number) * scalar;
		out[9] = (this[9] as number) * scalar;
		out[10] = (this[10] as number) * scalar;
		out[11] = (this[11] as number) * scalar;
		out[12] = (this[12] as number) * scalar;
		out[13] = (this[13] as number) * scalar;
		out[14] = (this[14] as number) * scalar;
		out[15] = (this[15] as number) * scalar;
		return out;
	}

	/**
	 * Adds this matrix to another after multiplying the other by a scalar.
	 * @param matrix The other matrix.
	 * @param scalar The scalar.
	 * @returns The sum.
	 */
	public multiplyScalarAndAdd(matrix: Matrix4Like, scalar: number): Matrix4;

	/**
	 * Adds this matrix to another after multiplying the other by a scalar.
	 * @param matrix The other matrix.
	 * @param scalar The scalar.
	 * @param out The matrix to store the result in.
	 * @returns The sum.
	 */
	public multiplyScalarAndAdd<T extends Matrix4Like>(matrix: Matrix4Like, scalar: number, out: T): T;

	public multiplyScalarAndAdd<T extends Matrix4Like>(matrix: Matrix4Like, scalar: number, out: T = new Matrix4() as T): T {
		out[0] = (this[0] as number) + matrix[0] * scalar;
		out[1] = (this[1] as number) + matrix[1] * scalar;
		out[2] = (this[2] as number) + matrix[2] * scalar;
		out[3] = (this[3] as number) + matrix[3] * scalar;
		out[4] = (this[4] as number) + matrix[4] * scalar;
		out[5] = (this[5] as number) + matrix[5] * scalar;
		out[6] = (this[6] as number) + matrix[6] * scalar;
		out[7] = (this[7] as number) + matrix[7] * scalar;
		out[8] = (this[8] as number) + matrix[8] * scalar;
		out[9] = (this[9] as number) + matrix[9] * scalar;
		out[10] = (this[10] as number) + matrix[10] * scalar;
		out[11] = (this[11] as number) + matrix[11] * scalar;
		out[12] = (this[12] as number) + matrix[12] * scalar;
		out[13] = (this[13] as number) + matrix[13] * scalar;
		out[14] = (this[14] as number) + matrix[14] * scalar;
		out[15] = (this[15] as number) + matrix[15] * scalar;
		return out;
	}

	/**
	 * Subtracts another matrix from this one.
	 * @param matrix The other matrix.
	 * @returns The difference between the matrices.
	 */
	public subtract(matrix: Matrix4Like): Matrix4;

	/**
	 * Subtracts another matrix from this one.
	 * @param matrix The other matrix.
	 * @param out The matrix to store the result in.
	 * @returns The difference between the matrices.
	 */
	public subtract<T extends Matrix4Like>(matrix: Matrix4Like, out: T): T;

	public subtract<T extends Matrix4Like>(matrix: Matrix4Like, out: T = new Matrix4() as T): T {
		out[0] = (this[0] as number) - matrix[0];
		out[1] = (this[1] as number) - matrix[1];
		out[2] = (this[2] as number) - matrix[2];
		out[3] = (this[3] as number) - matrix[3];
		out[4] = (this[4] as number) - matrix[4];
		out[5] = (this[5] as number) - matrix[5];
		out[6] = (this[6] as number) - matrix[6];
		out[7] = (this[7] as number) - matrix[7];
		out[8] = (this[8] as number) - matrix[8];
		out[9] = (this[9] as number) - matrix[8];
		out[10] = (this[10] as number) - matrix[10];
		out[11] = (this[11] as number) - matrix[11];
		out[12] = (this[12] as number) - matrix[12];
		out[13] = (this[13] as number) - matrix[13];
		out[14] = (this[14] as number) - matrix[14];
		out[15] = (this[15] as number) - matrix[15];
		return out;
	}

	/**
	 * Transposes this matrix.
	 * @returns The transpose of this matrix.
	 */
	public transpose(): Matrix4;

	/**
	 * Transposes this matrix.
	 * @param out The matrix to store the result in.
	 * @returns The transpose of this matrix.
	 */
	public transpose<T extends Matrix4Like>(out: T): T;

	public transpose<T extends Matrix4Like>(out: T = new Matrix4() as T): T {
		if (out == this as unknown as T) {
			const a01: number = this[1] as number;
			const a02: number = this[2] as number;
			const a03: number = this[3] as number;
			const a12: number = this[6] as number;
			const a13: number = this[7] as number;
			const a23: number = this[11] as number;
			out[1] = this[4] as number;
			out[2] = this[8] as number;
			out[3] = this[12] as number;
			out[4] = a01;
			out[6] = this[9] as number;
			out[7] = this[13] as number;
			out[8] = a02;
			out[9] = a12;
			out[11] = this[14] as number;
			out[12] = a03;
			out[13] = a13;
			out[14] = a23;
		} else {
			out[0] = this[0] as number;
			out[1] = this[4] as number;
			out[2] = this[8] as number;
			out[3] = this[12] as number;
			out[4] = this[1] as number;
			out[5] = this[5] as number;
			out[6] = this[9] as number;
			out[7] = this[13] as number;
			out[8] = this[2] as number;
			out[9] = this[6] as number;
			out[10] = this[10] as number;
			out[11] = this[14] as number;
			out[12] = this[3] as number;
			out[13] = this[7] as number;
			out[14] = this[11] as number;
			out[15] = this[15] as number;
		}

		return out;
	}

	/** The determinant of this matrix. */
	public get determinant(): number {
		const a00: number = this[0] as number;
		const a01: number = this[1] as number;
		const a02: number = this[2] as number;
		const a03: number = this[3] as number;
		const a10: number = this[4] as number;
		const a11: number = this[5] as number;
		const a12: number = this[6] as number;
		const a13: number = this[7] as number;
		const a20: number = this[8] as number;
		const a21: number = this[9] as number;
		const a22: number = this[10] as number;
		const a23: number = this[11] as number;
		const a30: number = this[12] as number;
		const a31: number = this[13] as number;
		const a32: number = this[14] as number;
		const a33: number = this[15] as number;

		const b00: number = a00 * a11 - a01 * a10;
		const b01: number = a00 * a12 - a02 * a10;
		const b02: number = a00 * a13 - a03 * a10;
		const b03: number = a01 * a12 - a02 * a11;
		const b04: number = a01 * a13 - a03 * a11;
		const b05: number = a02 * a13 - a03 * a12;
		const b06: number = a20 * a31 - a21 * a30;
		const b07: number = a20 * a32 - a22 * a30;
		const b08: number = a20 * a33 - a23 * a30;
		const b09: number = a21 * a32 - a22 * a31;
		const b10: number = a21 * a33 - a23 * a31;
		const b11: number = a22 * a33 - a23 * a32;
		
		return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
	}

	/**
	 * Resets this matrix to identity.
	 * @returns This matrix.
	 */
	public identity(): this {
		this[0] = 1;
		this[1] = 0;
		this[2] = 0;
		this[3] = 0;
		this[4] = 0;
		this[5] = 1;
		this[6] = 0;
		this[7] = 0;
		this[8] = 0;
		this[9] = 0;
		this[10] = 1;
		this[11] = 0;
		this[12] = 0;
		this[13] = 0;
		this[14] = 0;
		this[15] = 1;
		return this;
	}

	/**
	 * Inverts this matrix.
	 * @returns The inverted matrix.
	 */
	public invert(): Matrix4;

	/**
	 * Inverts this matrix.
	 * @param out The matrix to store the result in.
	 * @returns The inverted matrix.
	 */
	public invert<T extends Matrix4Like>(out: T): T;

	public invert<T extends Matrix4Like>(out: T = new Matrix4() as T): T {
		const a00: number = this[0] as number;
		const a01: number = this[1] as number;
		const a02: number = this[2] as number;
		const a03: number = this[3] as number;
		const a10: number = this[4] as number;
		const a11: number = this[5] as number;
		const a12: number = this[6] as number;
		const a13: number = this[7] as number;
		const a20: number = this[8] as number;
		const a21: number = this[9] as number;
		const a22: number = this[10] as number;
		const a23: number = this[11] as number;
		const a30: number = this[12] as number;
		const a31: number = this[13] as number;
		const a32: number = this[14] as number;
		const a33: number = this[15] as number;

		const b00: number = a00 * a11 - a01 * a10;
		const b01: number = a00 * a12 - a02 * a10;
		const b02: number = a00 * a13 - a03 * a10;
		const b03: number = a01 * a12 - a02 * a11;
		const b04: number = a01 * a13 - a03 * a11;
		const b05: number = a02 * a13 - a03 * a12;
		const b06: number = a20 * a31 - a21 * a30;
		const b07: number = a20 * a32 - a22 * a30;
		const b08: number = a20 * a33 - a23 * a30;
		const b09: number = a21 * a32 - a22 * a31;
		const b10: number = a21 * a33 - a23 * a31;
		const b11: number = a22 * a33 - a23 * a32;

		let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
		if (!det) {
			throw new SingularMatrixError();
		}
		det = 1 / det;

		out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
		out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
		out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
		out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
		out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
		out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
		out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
		out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
		out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
		out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
		out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
		out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
		out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
		out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
		out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
		out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
		return out;
	}

	/**
	 * Scales this matrix by the given vector.
	 * @param vector The scaling vector.
	 * @returns The scaled matrix.
	 */
	public scale(vector: Vector3Like): Matrix4;

	/**
	 * Scales this matrix by the given vector.
	 * @param vector The scaling vector.
	 * @param out The matrix to store the result in.
	 * @returns The scaled matrix.
	 */
	public scale<T extends Matrix4Like>(vector: Vector3Like, out: T): T;

	public scale<T extends Matrix4Like>(vector: Vector3Like, out: T = new Matrix4() as T): T {
		const x: number = vector[0];
		const y: number = vector[1];
		const z: number = vector[2];

		out[0] = (this[0] as number) * x;
		out[1] = (this[1] as number) * x;
		out[2] = (this[2] as number) * x;
		out[3] = (this[3] as number) * x;
		out[4] = (this[4] as number) * y;
		out[5] = (this[5] as number) * y;
		out[6] = (this[6] as number) * y;
		out[7] = (this[7] as number) * y;
		out[8] = (this[8] as number) * z;
		out[9] = (this[9] as number) * z;
		out[10] = (this[10] as number) * z;
		out[11] = (this[11] as number) * z;
		out[12] = (this[12] as number);
		out[13] = (this[13] as number);
		out[14] = (this[14] as number);
		out[15] = (this[15] as number);
		return out;
	}

	/**
	 * Translates this matrix by the given vector.
	 * @param vector The translation vector.
	 * @returns The translated matrix.
	 */
	public translate(vector: Vector3Like): Matrix4;

	/**
	 * Translates this matrix by the given vector.
	 * @param vector The translation vector.
	 * @param out The matrix to store the result in.
	 * @returns The translated matrix.
	 */
	public translate<T extends Matrix4Like>(vector: Vector3Like, out: T): T;

	public translate<T extends Matrix4Like>(vector: Vector3Like, out: T = new Matrix4() as T): T {
		const x: number = vector[0];
		const y: number = vector[1];
		const z: number = vector[2];

		if (out == this as unknown as T) {
			out[12] = (this[0] as number) * x + (this[4] as number) * y + (this[8] as number) * z + (this[12] as number);
			out[13] = (this[1] as number) * x + (this[5] as number) * y + (this[9] as number) * z + (this[13] as number);
			out[14] = (this[2] as number) * x + (this[6] as number) * y + (this[10] as number) * z + (this[14] as number);
			out[15] = (this[3] as number) * x + (this[7] as number) * y + (this[11] as number) * z + (this[15] as number);
		} else {
			const a00: number = this[0] as number;
			const a01: number = this[1] as number;
			const a02: number = this[2] as number;
			const a03: number = this[3] as number;
			const a10: number = this[4] as number;
			const a11: number = this[5] as number;
			const a12: number = this[6] as number;
			const a13: number = this[7] as number;
			const a20: number = this[8] as number;
			const a21: number = this[9] as number;
			const a22: number = this[10] as number;
			const a23: number = this[11] as number;

			out[0] = a00;
			out[1] = a01;
			out[2] = a02;
			out[3] = a03;
			out[4] = a10;
			out[5] = a11;
			out[6] = a12;
			out[7] = a13;
			out[8] = a20;
			out[9] = a21;
			out[10] = a22;
			out[11] = a23;
			out[12] = a00 * x + a10 * y + a20 * z + (this[12] as number);
			out[13] = a01 * x + a11 * y + a21 * z + (this[13] as number);
			out[14] = a02 * x + a12 * y + a22 * z + (this[14] as number);
			out[15] = a03 * x + a13 * y + a23 * z + (this[15] as number);
		}

		return out;
	}

	/**
	 * Rotates this matrix by the given angle around the given axis.
	 * @param radians The angle in radians.
	 * @param axis The axis.
	 * @returns The rotated matrix.
	 */
	public rotate(radians: number, axis: Vector3Like): Matrix4;

	/**
	 * Rotates this matrix by the given angle around the given axis.
	 * @param radians The angle in radians.
	 * @param axis The axis.
	 * @param out The matrix to store the result in.
	 * @returns The rotated matrix.
	 */
	public rotate<T extends Matrix4Like>(radians: number, axis: Vector3Like, out: T): T;

	public rotate<T extends Matrix4Like>(radians: number, axis: Vector3Like, out: T = new Matrix4() as T): T {
		let x: number = axis[0];
		let y: number = axis[1];
		let z: number = axis[2];

		let len: number = Math.hypot(x, y, z);
		if (len < epsilon) {
			return out;
		}

		len = 1 / len;
		x *= len;
		y *= len;
		z *= len;

		const s: number = Math.sin(radians);
		const c: number = Math.cos(radians);
		const t: number = 1 - c;

		const a00: number = this[0] as number;
		const a01: number = this[1] as number;
		const a02: number = this[2] as number;
		const a03: number = this[3] as number;
		const a10: number = this[4] as number;
		const a11: number = this[5] as number;
		const a12: number = this[6] as number;
		const a13: number = this[7] as number;
		const a20: number = this[8] as number;
		const a21: number = this[9] as number;
		const a22: number = this[10] as number;
		const a23: number = this[11] as number;
		
		const b00: number = x * x * t + c;
		const b01: number = y * x * t + z * s;
		const b02: number = z * x * t - y * s;
		const b10: number = x * y * t - z * s;
		const b11: number = y * y * t + c;
		const b12: number = z * y * t + x * s;
		const b20: number = x * z * t + y * s;
		const b21: number = y * z * t - x * s;
		const b22: number = z * z * t + c;
		
		out[0] = a00 * b00 + a10 * b01 + a20 * b02;
		out[1] = a01 * b00 + a11 * b01 + a21 * b02;
		out[2] = a02 * b00 + a12 * b01 + a22 * b02;
		out[3] = a03 * b00 + a13 * b01 + a23 * b02;
		out[4] = a00 * b10 + a10 * b11 + a20 * b12;
		out[5] = a01 * b10 + a11 * b11 + a21 * b12;
		out[6] = a02 * b10 + a12 * b11 + a22 * b12;
		out[7] = a03 * b10 + a13 * b11 + a23 * b12;
		out[8] = a00 * b20 + a10 * b21 + a20 * b22;
		out[9] = a01 * b20 + a11 * b21 + a21 * b22;
		out[10] = a02 * b20 + a12 * b21 + a22 * b22;
		out[11] = a03 * b20 + a13 * b21 + a23 * b22;
		if (out != this as unknown as T) {
			out[12] = this[12] as number;
			out[13] = this[13] as number;
			out[14] = this[14] as number;
			out[15] = this[15] as number;
		}
		return out;
	}

	/**
	 * Rotates this matrix by the given angle around the X-axis.
	 * @param radians The angle in radians.
	 * @returns The rotated matrix.
	 */
	public rotateX(radians: number): Matrix4;

	/**
	 * Rotates this matrix by the given angle around the X-axis.
	 * @param radians The angle in radians.
	 * @param out The matrix to store the result in.
	 * @returns The rotated matrix.
	 */
	public rotateX<T extends Matrix4Like>(radians: number, out: T): T;

	public rotateX<T extends Matrix4Like>(radians: number, out: T = new Matrix4() as T): T {
		const s: number = Math.sin(radians);
		const c: number = Math.cos(radians);

		const a10: number = this[4] as number;
		const a11: number = this[5] as number;
		const a12: number = this[6] as number;
		const a13: number = this[7] as number;
		const a20: number = this[8] as number;
		const a21: number = this[9] as number;
		const a22: number = this[10] as number;
		const a23: number = this[11] as number;

		if (out != this as unknown as T) {
			out[0] = this[0] as number;
			out[1] = this[1] as number;
			out[2] = this[2] as number;
			out[3] = this[3] as number;
			out[12] = this[12] as number;
			out[13] = this[13] as number;
			out[14] = this[14] as number;
			out[15] = this[15] as number;
		}
		
		out[4] = a10 * c + a20 * s;
		out[5] = a11 * c + a21 * s;
		out[6] = a12 * c + a22 * s;
		out[7] = a13 * c + a23 * s;
		out[8] = a20 * c - a10 * s;
		out[9] = a21 * c - a11 * s;
		out[10] = a22 * c - a12 * s;
		out[11] = a23 * c - a13 * s;
		return out;
	}

	/**
	 * Rotates this matrix by the given angle around the Y-axis.
	 * @param radians The angle in radians.
	 * @returns The rotated matrix.
	 */
	public rotateY(radians: number): Matrix4;

	/**
	 * Rotates this matrix by the given angle around the Y-axis.
	 * @param radians The angle in radians.
	 * @param out The matrix to store the result in.
	 * @returns The rotated matrix.
	 */
	public rotateY<T extends Matrix4Like>(radians: number, out: T): T;

	public rotateY<T extends Matrix4Like>(radians: number, out: T = new Matrix4() as T): T {
		const s: number = Math.sin(radians);
		const c: number = Math.cos(radians);

		const a00: number = this[0] as number;
		const a01: number = this[1] as number;
		const a02: number = this[2] as number;
		const a03: number = this[3] as number;
		const a20: number = this[8] as number;
		const a21: number = this[9] as number;
		const a22: number = this[10] as number;
		const a23: number = this[11] as number;

		if (out != this as unknown as T) {
			out[4] = this[4] as number;
			out[5] = this[5] as number;
			out[6] = this[6] as number;
			out[7] = this[7] as number;
			out[12] = this[12] as number;
			out[13] = this[13] as number;
			out[14] = this[14] as number;
			out[15] = this[15] as number;
		}
		
		out[0] = a00 * c - a20 * s;
		out[1] = a01 * c - a21 * s;
		out[2] = a02 * c - a22 * s;
		out[3] = a03 * c - a23 * s;
		out[8] = a00 * s + a20 * c;
		out[9] = a01 * s + a21 * c;
		out[10] = a02 * s + a22 * c;
		out[11] = a03 * s + a23 * c;
		return out;
	}

	/**
	 * Rotates this matrix by the given angle around the Z-axis.
	 * @param radians The angle in radians.
	 * @returns The rotated matrix.
	 */
	public rotateZ(radians: number): Matrix4;

	/**
	 * Rotates this matrix by the given angle around the Z-axis.
	 * @param radians The angle in radians.
	 * @param out The matrix to store the result in.
	 * @returns The rotated matrix.
	 */
	public rotateZ<T extends Matrix4Like>(radians: number, out: T): T;

	public rotateZ<T extends Matrix4Like>(radians: number, out: T = new Matrix4() as T): T {
		const s: number = Math.sin(radians);
		const c: number = Math.cos(radians);

		const a00: number = this[0] as number;
		const a01: number = this[1] as number;
		const a02: number = this[2] as number;
		const a03: number = this[3] as number;
		const a10: number = this[4] as number;
		const a11: number = this[5] as number;
		const a12: number = this[6] as number;
		const a13: number = this[7] as number;

		if (out != this as unknown as T) {
			out[8] = this[8] as number;
			out[9] = this[9] as number;
			out[10] = this[10] as number;
			out[11] = this[11] as number;
			out[12] = this[12] as number;
			out[13] = this[13] as number;
			out[14] = this[14] as number;
			out[15] = this[15] as number;
		}
		
		out[0] = a00 * c + a10 * s;
		out[1] = a01 * c + a11 * s;
		out[2] = a02 * c + a12 * s;
		out[3] = a03 * c + a13 * s;
		out[4] = a10 * c - a00 * s;
		out[5] = a11 * c - a01 * s;
		out[6] = a12 * c - a02 * s;
		out[7] = a13 * c - a03 * s;
		return out;
	}

	/** The translation vector component of this transformation matrix. */
	public get translation(): Vector3Like {
		return [this[12] as number, this[13] as number, this[14] as number];
	}

	/** The scaling factor of this transformation matrix. */
	public get scaling(): Vector3Like {
		const m11: number = this[0] as number;
		const m12: number = this[1] as number;
		const m13: number = this[2] as number;
		const m21: number = this[4] as number;
		const m22: number = this[5] as number;
		const m23: number = this[6] as number;
		const m31: number = this[8] as number;
		const m32: number = this[9] as number;
		const m33: number = this[10] as number;

		return [Math.hypot(m11, m12, m13), Math.hypot(m21, m22, m23), Math.hypot(m31, m32, m33)];
	}

	/** The rotational component of this transformation matrix. */
	public get rotation(): QuaternionLike {
		const scaling: Vector3Like = this.scaling;

		const is1: number = 1 / scaling[0];
		const is2: number = 1 / scaling[1];
		const is3: number = 1 / scaling[2];

		const sm11: number = (this[0] as number) * is1;
		const sm12: number = (this[1] as number) * is2;
		const sm13: number = (this[2] as number) * is3;
		const sm21: number = (this[4] as number) * is1;
		const sm22: number = (this[5] as number) * is2;
		const sm23: number = (this[6] as number) * is3;
		const sm31: number = (this[8] as number) * is1;
		const sm32: number = (this[9] as number) * is2;
		const sm33: number = (this[10] as number) * is3;

		const trace: number = sm11 + sm22 + sm33;

		if (trace > 0) {
			const s: number = Math.sqrt(trace + 1) * 2;
			return [(sm23 - sm32) / s, (sm31 - sm13) / s, (sm12 - sm21) / s, 0.25 * s];
		}
		
		if (sm11 > sm22 && sm11 > sm33) {
			const s: number = Math.sqrt(1 + sm11 - sm22 - sm33) * 2;
			return [0.25 * s, (sm12 + sm21) / s, (sm31 + sm13) / s, (sm23 - sm32) / s];
		}
		
		if (sm22 > sm33) {
			const s: number = Math.sqrt(1 + sm22 - sm11 - sm33) * 2;
			return [(sm12 + sm21) / s, 0.25 * s, (sm23 + sm32) / s, (sm31 - sm13) / s];
		}

		const s: number = Math.sqrt(1 + sm33 - sm11 - sm22) * 2;
		return [(sm31 + sm13) / s, (sm23 + sm32) / s, 0.25 * s, (sm12 - sm21) / s];
	}
}
