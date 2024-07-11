import Quaternion, { type QuaternionLike } from "./Quaternion.js";
import Vector3, { type Vector3Like, createVector3Like } from "./Vector3.js";
import type { DualQuaternionLike } from "./DualQuaternion.js";
import type FieldOfView from "../types/FieldOfView.js";
import MagnitudeError from "../utility/MagnitudeError.js";
import type { MatrixLike } from "./Matrix.js";
import SingularMatrixError from "../utility/SingularMatrixError.js";
import type SquareMatrix from "./SquareMatrix.js";
import epsilon from "../utility/epsilon.js";

/**
 * Numbers arranged into four columns and four rows.
 * @see [Matrix](https://en.wikipedia.org/wiki/Matrix_(mathematics))
 */
export interface Matrix4Like extends MatrixLike {
	/** The value in the first column and first row. */
	0: number;

	/** The value in the first column and second row. */
	1: number;

	/** The value in the first column and third row. */
	2: number;

	/** The value in the first column and fourth row. */
	3: number;

	/** The value in the second column and first row. */
	4: number;

	/** The value in the second column and second row. */
	5: number;

	/** The value in the second column and third row. */
	6: number;

	/** The value in the second column and fourth row. */
	7: number;

	/** The value in the third column and first row. */
	8: number;

	/** The value in the third column and second row. */
	9: number;

	/** The value in the third column and third row. */
	10: number;

	/** The value in the third column and fourth row. */
	11: number;

	/** The value in the fourth column and first row. */
	12: number;

	/** The value in the fourth column and second row. */
	13: number;

	/** The value in the fourth column and third row. */
	14: number;

	/** The value in the fourth column and fourth row. */
	15: number;
}

/**
 * Create a 4x4 matrix-like object.
 * @returns A 4x4 matrix-like object.
 */
export function createMatrix4Like() {
	return new Float32Array(16) as unknown as Matrix4Like;
}

/**
 * Create a transformation matrix that represents a translation by the given vector.
 * @param vector - The translation vector.
 * @param out - The matrix to store the result in.
 * @returns The transformation matrix.
 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
 */
export function fromTranslation<T extends Matrix4Like>(
	vector: Vector3Like,
	out: T
) {
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
 * Create a transformation matrix that represents a scaling by the given vector.
 * @param vector - The scaling vector.
 * @param out - The matrix to store the result in.
 * @returns The transformation matrix.
 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
 */
export function fromScaling<T extends Matrix4Like>(
	vector: Vector3Like,
	out: T
) {
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
 * Reset a matrix to identity.
 * @param out - The matrix to store the result in.
 * @returns The matrix.
 * @see [Identity matrix](https://en.wikipedia.org/wiki/Identity_matrix)
 */
export function identity<T extends Matrix4Like>(out: T) {
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

/**
 * Create a transformation matrix that represents a rotation by the given angle around the Z-axis.
 * @param r - The angle in radians.
 * @param axis - The axis to rotate around.
 * @param out - The matrix to store the result in.
 * @returns The transformation matrix.
 * @see [Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix)
 */
export function fromRotation<T extends Matrix4Like>(
	r: number,
	axis: Vector3Like,
	out: T
) {
	let x = axis[0];
	let y = axis[1];
	let z = axis[2];

	let len = Math.hypot(x, y, z);
	if (len === 0) {
		throw new MagnitudeError();
	}
	len = 1 / len;

	x *= len;
	y *= len;
	z *= len;

	const s = Math.sin(r);
	const c = Math.cos(r);
	const t = 1 - c;

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
 * Create a transformation matrix that represents a rotation by the given angle around the X-axis.
 * @param r - The angle in radians.
 * @param out - The matrix to store the result in.
 * @returns The transformation matrix.
 * @see [Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix)
 */
export function fromXRotation<T extends Matrix4Like>(r: number, out: T) {
	const s = Math.sin(r);
	const c = Math.cos(r);

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
 * Create a transformation matrix that represents a rotation by the given angle around the Y-axis.
 * @param r - The angle in radians.
 * @param out - The matrix to store the result in.
 * @returns The transformation matrix.
 * @see [Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix)
 */
export function fromYRotation<T extends Matrix4Like>(r: number, out: T) {
	const s = Math.sin(r);
	const c = Math.cos(r);

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
 * Create a transformation matrix that represents a rotation by the given angle around the Z-axis.
 * @param r - The angle in radians.
 * @param out - The matrix to store the result in.
 * @returns The transformation matrix.
 * @see [Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix)
 */
export function fromZRotation<T extends Matrix4Like>(r: number, out: T) {
	const s = Math.sin(r);
	const c = Math.cos(r);

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
 * Create a transformation matrix from the given rotation and translation.
 * @param rotation - The rotation quaternion.
 * @param translation - The translation vector.
 * @param out - The matrix to store the result in.
 * @returns The transformation matrix.
 * @see [Quaternion](https://en.wikipedia.org/wiki/Quaternion)
 * @see [Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix)
 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
 */
export function fromRotationTranslation<T extends Matrix4Like>(
	rotation: QuaternionLike,
	translation: Vector3Like,
	out: T
) {
	const x = rotation[0];
	const y = rotation[1];
	const z = rotation[2];
	const w = rotation[3];

	const x2 = x + x;
	const y2 = y + y;
	const z2 = z + z;
	const xx = x * x2;
	const xy = x * y2;
	const xz = x * z2;
	const yy = y * y2;
	const yz = y * z2;
	const zz = z * z2;
	const wx = w * x2;
	const wy = w * y2;
	const wz = w * z2;

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
 * Create a transformation matrix from the given rotation, translation, and scale.
 * @param rotation - The rotation quaternion.
 * @param translation - The translation vector.
 * @param scaling - The scaling vector.
 * @param out - The matrix to store the result in.
 * @returns The transformation matrix.
 * @see [Quaternion](https://en.wikipedia.org/wiki/Quaternion)
 * @see [Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix)
 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
 */
export function fromRotationTranslationScale<T extends Matrix4Like>(
	rotation: QuaternionLike,
	translation: Vector3Like,
	scaling: Vector3Like,
	out: T
) {
	const x = rotation[0];
	const y = rotation[1];
	const z = rotation[2];
	const w = rotation[3];

	const x2 = x + x;
	const y2 = y + y;
	const z2 = z + z;
	const xx = x * x2;
	const xy = x * y2;
	const xz = x * z2;
	const yy = y * y2;
	const yz = y * z2;
	const zz = z * z2;
	const wx = w * x2;
	const wy = w * y2;
	const wz = w * z2;

	const sx = scaling[0];
	const sy = scaling[1];
	const sz = scaling[2];

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
 * Create a transformation matrix from the given rotation, translation, and scale around the given origin.
 * @param rotation - The rotation quaternion.
 * @param translation - The translation vector.
 * @param scaling - The scaling vector.
 * @param origin - The origin vector.
 * @param out - The matrix to store the result in.
 * @returns The transformation matrix.
 * @see [Quaternion](https://en.wikipedia.org/wiki/Quaternion)
 * @see [Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix)
 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
 */
export function fromRotationTranslationScaleOrigin<T extends Matrix4Like>(
	rotation: QuaternionLike,
	translation: Vector3Like,
	scaling: Vector3Like,
	origin: Vector3Like,
	out: T
) {
	const x = rotation[0];
	const y = rotation[1];
	const z = rotation[2];
	const w = rotation[3];

	const x2 = x + x;
	const y2 = y + y;
	const z2 = z + z;
	const xx = x * x2;
	const xy = x * y2;
	const xz = x * z2;
	const yy = y * y2;
	const yz = y * z2;
	const zz = z * z2;
	const wx = w * x2;
	const wy = w * y2;
	const wz = w * z2;

	const sx = scaling[0];
	const sy = scaling[1];
	const sz = scaling[2];
	const ox = origin[0];
	const oy = origin[1];
	const oz = origin[2];

	const out0 = (1 - (yy + zz)) * sx;
	const out1 = (xy + wz) * sx;
	const out2 = (xz - wy) * sx;
	const out4 = (xy - wz) * sy;
	const out5 = (1 - (xx + zz)) * sy;
	const out6 = (yz + wx) * sy;
	const out8 = (xz + wy) * sz;
	const out9 = (yz - wx) * sz;
	const out10 = (1 - (xx + yy)) * sz;

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

// Used to store intermediary values in some functions.
const intermediary = createVector3Like();

/**
 * Create a transformation matrix from a dual quaternion.
 * @param quaternion - The dual quaternion.
 * @param out - The matrix to store the result in.
 * @returns The transformation matrix.
 * @see [Dual quaternion](https://en.wikipedia.org/wiki/Dual_quaternion)
 * @see [Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix)
 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
 */
export function fromDualQuaternion<T extends Matrix4Like>(
	quaternion: DualQuaternionLike,
	out: T
) {
	const bx = -quaternion[0];
	const by = -quaternion[1];
	const bz = -quaternion[2];
	const bw = quaternion[3];
	const ax = quaternion[4];
	const ay = quaternion[5];
	const az = quaternion[6];
	const aw = quaternion[7];

	const magnitude = bx * bx + by * by + bz * bz + bw * bw;
	if (magnitude > 0) {
		intermediary[0] = ((ax * bw + aw * bx + ay * bz - az * by) * 2) / magnitude;
		intermediary[1] = ((ay * bw + aw * by + az * bx - ax * bz) * 2) / magnitude;
		intermediary[2] = ((az * bw + aw * bz + ax * by - ay * bx) * 2) / magnitude;
	} else {
		intermediary[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
		intermediary[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
		intermediary[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
	}

	return fromRotationTranslation(quaternion, intermediary, out);
}

/**
 * Generate a frustum matrix with the given bounds.
 * @param left - The left bound of the frustum.
 * @param right - The right bound of the frustum.
 * @param bottom - The bottom bound of the frustum.
 * @param top - The top bound of the frustum.
 * @param near - The near bound of the frustum.
 * @param far - The far bound of the frustum.
 * @param out - The matrix to store the result in.
 * @returns The frustum matrix.
 * @see [Camera matrix](https://en.wikipedia.org/wiki/Camera_matrix)
 * @see [3D projection](https://en.wikipedia.org/wiki/3D_projection)
 */
export function frustum<T extends Matrix4Like>(
	left: number,
	right: number,
	bottom: number,
	top: number,
	near: number,
	far: number,
	out: T
) {
	const rl = 1 / (right - left);
	const tb = 1 / (top - bottom);
	const nf = 1 / (near - far);

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
 * Create a perspective projection matrix with the given bounds.
 * @param fov - The vertical field of view in radians.
 * @param aspect - The aspect ratio (typically the width of the viewport divided by its height).
 * @param near - The near bound of the frustum.
 * @param far - The far bound of the frustum.
 * @param out - The matrix to store the result in.
 * @returns The perspective projection matrix.
 * @see [Camera matrix](https://en.wikipedia.org/wiki/Camera_matrix)
 * @see [3D projection](https://en.wikipedia.org/wiki/3D_projection)
 */
export function perspective<T extends Matrix4Like>(
	fov: number,
	aspect: number,
	near: number,
	far: number,
	out: T
) {
	const f = 1 / Math.tan(fov / 2);

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

	if (far === Infinity) {
		out[10] = -1;
		out[14] = -2 * near;
	} else {
		const nf = 1 / (near - far);
		out[10] = (far + near) * nf;
		out[14] = 2 * far * near * nf;
	}

	return out;
}

/**
 * Create a perspective projection matrix from a field of view. Useful for generating projection matrices to be used with the WebXR API.
 * @param fov - The field of view.
 * @param near - The near bound of the frustum.
 * @param far - The far bound of the frustum.
 * @param out - The matrix to store the result in.
 * @returns The perspective projection matrix.
 * @see [WebXR API](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API)
 * @see [Camera matrix](https://en.wikipedia.org/wiki/Camera_matrix)
 * @see [3D projection](https://en.wikipedia.org/wiki/3D_projection)
 */
export function perspectiveFromFieldOfView<T extends Matrix4Like>(
	fov: FieldOfView,
	near: number,
	far: number,
	out: T
) {
	const upTan = Math.tan((fov.upDegrees * Math.PI) / 180);
	const downTan = Math.tan((fov.downDegrees * Math.PI) / 180);
	const leftTan = Math.tan((fov.leftDegrees * Math.PI) / 180);
	const rightTan = Math.tan((fov.rightDegrees * Math.PI) / 180);
	const xScale = 2 / (leftTan + rightTan);
	const yScale = 2 / (upTan + downTan);

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
 * Generate an orthogonal projection matrix with the given bounds.
 * @param left - The left bound of the frustum.
 * @param right - The right bound of the frustum.
 * @param bottom - The bottom bound of the frustum.
 * @param top - The top bound of the frustum.
 * @param near - The near bound of the frustum.
 * @param far - The far bound of the frustum.
 * @param out - The matrix to store the result in.
 * @returns The frustum matrix.
 * @see [Camera matrix](https://en.wikipedia.org/wiki/Camera_matrix)
 * @see [3D projection](https://en.wikipedia.org/wiki/3D_projection)
 */
export function ortho<T extends Matrix4Like>(
	left: number,
	right: number,
	bottom: number,
	top: number,
	near: number,
	far: number,
	out: T
) {
	const lr = 1 / (left - right);
	const bt = 1 / (bottom - top);
	const nf = 1 / (near - far);

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
 * Generate a look-at matrix. If you want a matrix that actually makes an object look at another object, use `targetTo` instead.
 * @param eye - The position of the viewer.
 * @param center - The point that the viewer is looking at.
 * @param up - The local up direction.
 * @param out - The matrix to store the result in.
 * @returns The look-at matrix.
 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
 */
export function lookAt<T extends Matrix4Like>(
	eye: Vector3Like,
	center: Vector3Like,
	up: Vector3Like,
	out: T
) {
	const eyex = eye[0];
	const eyey = eye[1];
	const eyez = eye[2];

	const upx = up[0];
	const upy = up[1];
	const upz = up[2];

	const centerx = center[0];
	const centery = center[1];
	const centerz = center[2];

	if (
		Math.abs(eyex - centerx) < epsilon &&
		Math.abs(eyey - centery) < epsilon &&
		Math.abs(eyez - centerz) < epsilon
	) {
		return identity(out);
	}

	let z0 = eyex - centerx;
	let z1 = eyey - centery;
	let z2 = eyez - centerz;
	let len = 1 / Math.hypot(z0, z1, z2);
	z0 *= len;
	z1 *= len;
	z2 *= len;

	let x0 = upy * z2 - upz * z1;
	let x1 = upz * z0 - upx * z2;
	let x2 = upx * z1 - upy * z0;
	len = Math.hypot(x0, x1, x2);
	if (len > 0) {
		len = 1 / len;
		x0 *= len;
		x1 *= len;
		x2 *= len;
	} else {
		x0 = 0;
		x1 = 0;
		x2 = 0;
	}

	let y0 = z1 * x2 - z2 * x1;
	let y1 = z2 * x0 - z0 * x2;
	let y2 = z0 * x1 - z1 * x0;
	len = Math.hypot(y0, y1, y2);
	if (len > 0) {
		len = 1 / len;
		y0 *= len;
		y1 *= len;
		y2 *= len;
	} else {
		y0 = 0;
		y1 = 0;
		y2 = 0;
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
 * Create a matrix that makes something look at something else.
 * @param eye - The position of the viewer.
 * @param center - The point that the viewer is looking at.
 * @param up - The local up direction.
 * @param out - The matrix to store the result in.
 * @returns The transformation matrix.
 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
 */
export function targetTo<T extends Matrix4Like>(
	eye: Vector3Like,
	target: Vector3Like,
	up: Vector3Like,
	out: T
) {
	const eyex = eye[0];
	const eyey = eye[1];
	const eyez = eye[2];

	const upx = up[0];
	const upy = up[1];
	const upz = up[2];

	let z0 = eyex - target[0];
	let z1 = eyey - target[1];
	let z2 = eyez - target[2];
	let len = z0 * z0 + z1 * z1 + z2 * z2;
	if (len > 0) {
		len = 1 / Math.sqrt(len);
		z0 *= len;
		z1 *= len;
		z2 *= len;
	}

	let x0 = upy * z2 - upz * z1;
	let x1 = upz * z0 - upx * z2;
	let x2 = upx * z1 - upy * z0;
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
 * Add two matrices.
 * @param a - The augend.
 * @param b - The addend.
 * @param out - The matrix to store the result in.
 * @returns The sum.
 * @see [Matrix addition](https://en.wikipedia.org/wiki/Matrix_addition)
 */
export function add<T extends Matrix4Like>(
	a: Matrix4Like,
	b: Matrix4Like,
	out: T
) {
	out[0] = a[0] + b[0];
	out[1] = a[1] + b[1];
	out[2] = a[2] + b[2];
	out[3] = a[3] + b[3];
	out[4] = a[4] + b[4];
	out[5] = a[5] + b[5];
	out[6] = a[6] + b[6];
	out[7] = a[7] + b[7];
	out[8] = a[8] + b[8];
	out[9] = a[9] + b[8];
	out[10] = a[10] + b[10];
	out[11] = a[11] + b[11];
	out[12] = a[12] + b[12];
	out[13] = a[13] + b[13];
	out[14] = a[14] + b[14];
	out[15] = a[15] + b[15];
	return out;
}

/**
 * Create a two-by-two matrix with the given values.
 * @param c0r0 - The value in the first column and first row.
 * @param c0r1 - The value in the first column and second row.
 * @param c0r2 - The value in the first column and third row.
 * @param c0r3 - The value in the first column and fourth row.
 * @param c1r0 - The value in the second column and first row.
 * @param c1r1 - The value in the second column and second row.
 * @param c1r2 - The value in the second column and third row.
 * @param c1r3 - The value in the second column and fourth row.
 * @param c2r0 - The value in the third column and first row.
 * @param c2r1 - The value in the third column and second row.
 * @param c2r2 - The value in the third column and third row.
 * @param c2r3 - The value in the third column and fourth row.
 * @param c3r0 - The value in the fourth column and first row.
 * @param c3r1 - The value in the fourth column and second row.
 * @param c3r2 - The value in the fourth column and third row.
 * @param c3r3 - The value in the fourth column and fourth row.
 * @param out - The matrix to store the result in.
 * @returns The matrix.
 */
export function fromValues<T extends Matrix4Like>(
	c0r0: number,
	c0r1: number,
	c0r2: number,
	c0r3: number,
	c1r0: number,
	c1r1: number,
	c1r2: number,
	c1r3: number,
	c2r0: number,
	c2r1: number,
	c2r2: number,
	c2r3: number,
	c3r0: number,
	c3r1: number,
	c3r2: number,
	c3r3: number,
	out: T
) {
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

/**
 * Determine whether or not two matrices are roughly equivalent.
 * @param a - The first matrix.
 * @param b - The second matrix.
 * @returns Whether or not the matrices are equivalent.
 */
export function equals(a: Matrix4Like, b: Matrix4Like) {
	const a0 = a[0];
	const a1 = a[1];
	const a2 = a[2];
	const a3 = a[3];
	const a4 = a[4];
	const a5 = a[5];
	const a6 = a[6];
	const a7 = a[7];
	const a8 = a[8];
	const a9 = a[9];
	const a10 = a[10];
	const a11 = a[11];
	const a12 = a[12];
	const a13 = a[13];
	const a14 = a[14];
	const a15 = a[15];

	const b0 = b[0];
	const b1 = b[1];
	const b2 = b[2];
	const b3 = b[3];
	const b4 = b[4];
	const b5 = b[5];
	const b6 = b[6];
	const b7 = b[7];
	const b8 = b[8];
	const b9 = b[9];
	const b10 = b[10];
	const b11 = b[11];
	const b12 = b[12];
	const b13 = b[13];
	const b14 = b[14];
	const b15 = b[15];

	return (
		Math.abs(a0 - b0) <= epsilon * Math.max(1, Math.abs(a0), Math.abs(b0)) &&
		Math.abs(a1 - b1) <= epsilon * Math.max(1, Math.abs(a1), Math.abs(b1)) &&
		Math.abs(a2 - b2) <= epsilon * Math.max(1, Math.abs(a2), Math.abs(b2)) &&
		Math.abs(a3 - b3) <= epsilon * Math.max(1, Math.abs(a3), Math.abs(b3)) &&
		Math.abs(a4 - b4) <= epsilon * Math.max(1, Math.abs(a4), Math.abs(b4)) &&
		Math.abs(a5 - b5) <= epsilon * Math.max(1, Math.abs(a5), Math.abs(b5)) &&
		Math.abs(a6 - b6) <= epsilon * Math.max(1, Math.abs(a6), Math.abs(b6)) &&
		Math.abs(a7 - b7) <= epsilon * Math.max(1, Math.abs(a7), Math.abs(b7)) &&
		Math.abs(a8 - b8) <= epsilon * Math.max(1, Math.abs(a8), Math.abs(b8)) &&
		Math.abs(a9 - b9) <= epsilon * Math.max(1, Math.abs(a9), Math.abs(b9)) &&
		Math.abs(a10 - b10) <=
			epsilon * Math.max(1, Math.abs(a10), Math.abs(b10)) &&
		Math.abs(a11 - b11) <=
			epsilon * Math.max(1, Math.abs(a11), Math.abs(b11)) &&
		Math.abs(a12 - b12) <=
			epsilon * Math.max(1, Math.abs(a12), Math.abs(b12)) &&
		Math.abs(a13 - b13) <=
			epsilon * Math.max(1, Math.abs(a13), Math.abs(b13)) &&
		Math.abs(a14 - b14) <=
			epsilon * Math.max(1, Math.abs(a14), Math.abs(b14)) &&
		Math.abs(a15 - b15) <= epsilon * Math.max(1, Math.abs(a15), Math.abs(b15))
	);
}

/**
 * Determine whether or not two matrices are exactly equivalent.
 * @param a - The first matrix.
 * @param b - The second matrix.
 * @returns Whether the matrices are equivalent.
 */
export function exactEquals(a: Matrix4Like, b: Matrix4Like) {
	return (
		a[0] === b[0] &&
		a[1] === b[1] &&
		a[2] === b[2] &&
		a[3] === b[3] &&
		a[4] === b[4] &&
		a[5] === b[5] &&
		a[6] === b[6] &&
		a[7] === b[7] &&
		a[8] === b[8] &&
		a[9] === b[9] &&
		a[10] === b[10] &&
		a[11] === b[11] &&
		a[12] === b[12] &&
		a[13] === b[13] &&
		a[14] === b[14] &&
		a[15] === b[15]
	);
}

/**
 * Calculate the adjugate of a matrix.
 * @param matrix - The matrix.
 * @param out - The matrix to store the result in.
 * @returns The adjugate of the matrix.
 * @see [Adjugate matrix](https://en.wikipedia.org/wiki/Adjugate_matrix)
 */
export function adjoint<T extends Matrix4Like>(matrix: Matrix4Like, out: T) {
	const a00 = matrix[0];
	const a01 = matrix[1];
	const a02 = matrix[2];
	const a03 = matrix[3];
	const a10 = matrix[4];
	const a11 = matrix[5];
	const a12 = matrix[6];
	const a13 = matrix[7];
	const a20 = matrix[8];
	const a21 = matrix[9];
	const a22 = matrix[10];
	const a23 = matrix[11];
	const a30 = matrix[12];
	const a31 = matrix[13];
	const a32 = matrix[14];
	const a33 = matrix[15];

	out[0] =
		a11 * (a22 * a33 - a23 * a32) -
		a21 * (a12 * a33 - a13 * a32) +
		a31 * (a12 * a23 - a13 * a22);
	out[1] = -(
		a01 * (a22 * a33 - a23 * a32) -
		a21 * (a02 * a33 - a03 * a32) +
		a31 * (a02 * a23 - a03 * a22)
	);
	out[2] =
		a01 * (a12 * a33 - a13 * a32) -
		a11 * (a02 * a33 - a03 * a32) +
		a31 * (a02 * a13 - a03 * a12);
	out[3] = -(
		a01 * (a12 * a23 - a13 * a22) -
		a11 * (a02 * a23 - a03 * a22) +
		a21 * (a02 * a13 - a03 * a12)
	);
	out[4] = -(
		a10 * (a22 * a33 - a23 * a32) -
		a20 * (a12 * a33 - a13 * a32) +
		a30 * (a12 * a23 - a13 * a22)
	);
	out[5] =
		a00 * (a22 * a33 - a23 * a32) -
		a20 * (a02 * a33 - a03 * a32) +
		a30 * (a02 * a23 - a03 * a22);
	out[6] = -(
		a00 * (a12 * a33 - a13 * a32) -
		a10 * (a02 * a33 - a03 * a32) +
		a30 * (a02 * a13 - a03 * a12)
	);
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
		a30 * (a01 * a23 - a03 * a21)
	);
	out[10] =
		a00 * (a11 * a33 - a13 * a31) -
		a10 * (a01 * a33 - a03 * a31) +
		a30 * (a01 * a13 - a03 * a11);
	out[11] = -(
		a00 * (a11 * a23 - a13 * a21) -
		a10 * (a01 * a23 - a03 * a21) +
		a20 * (a01 * a13 - a03 * a11)
	);
	out[12] = -(
		a10 * (a21 * a32 - a22 * a31) -
		a20 * (a11 * a32 - a12 * a31) +
		a30 * (a11 * a22 - a12 * a21)
	);
	out[13] =
		a00 * (a21 * a32 - a22 * a31) -
		a20 * (a01 * a32 - a02 * a31) +
		a30 * (a01 * a22 - a02 * a21);
	out[14] = -(
		a00 * (a11 * a32 - a12 * a31) -
		a10 * (a01 * a32 - a02 * a31) +
		a30 * (a01 * a12 - a02 * a11)
	);
	out[15] =
		a00 * (a11 * a22 - a12 * a21) -
		a10 * (a01 * a22 - a02 * a21) +
		a20 * (a01 * a12 - a02 * a11);
	return out;
}

/**
 * Copy the values of one matrix into another.
 * @param matrix - The matrix to copy.
 * @param out - The matrix to store the result in.
 * @returns This matrix.
 */
export function copy<T extends Matrix4Like>(matrix: Matrix4Like, out: T) {
	out[0] = matrix[0];
	out[1] = matrix[1];
	out[2] = matrix[2];
	out[3] = matrix[3];
	out[4] = matrix[4];
	out[5] = matrix[5];
	out[6] = matrix[6];
	out[7] = matrix[7];
	out[8] = matrix[8];
	out[9] = matrix[9];
	out[10] = matrix[10];
	out[11] = matrix[11];
	out[12] = matrix[12];
	out[13] = matrix[13];
	out[14] = matrix[14];
	out[15] = matrix[15];
	return out;
}

/**
 * Calculate the Frobenius norm of a matrix.
 * @param matrix - The matrix.
 * @returns The Frobenius norm.
 * @see [Matrix norm](https://en.wikipedia.org/wiki/Matrix_norm)
 */
export function frob(matrix: Matrix4Like) {
	return Math.hypot(
		matrix[0],
		matrix[1],
		matrix[2],
		matrix[3],
		matrix[4],
		matrix[5],
		matrix[6],
		matrix[7],
		matrix[8],
		matrix[9],
		matrix[10],
		matrix[11],
		matrix[12],
		matrix[13],
		matrix[14],
		matrix[15]
	);
}

/**
 * Multiply two matrices.
 * @param a - The multiplicand.
 * @param b - The multiplier.
 * @param out - The matrix to store the result in.
 * @returns The product.
 * @see [Matrix multiplication](https://en.wikipedia.org/wiki/Matrix_multiplication)
 */
export function multiply<T extends Matrix4Like>(
	a: Matrix4Like,
	b: Matrix4Like,
	out: T
) {
	const a00 = a[0];
	const a01 = a[1];
	const a02 = a[2];
	const a03 = a[3];
	const a10 = a[4];
	const a11 = a[5];
	const a12 = a[6];
	const a13 = a[7];
	const a20 = a[8];
	const a21 = a[9];
	const a22 = a[10];
	const a23 = a[11];
	const a30 = a[12];
	const a31 = a[13];
	const a32 = a[14];
	const a33 = a[15];

	let b0 = b[0];
	let b1 = b[1];
	let b2 = b[2];
	let b3 = b[3];
	out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
	out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
	out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
	out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
	b0 = b[4];
	b1 = b[5];
	b2 = b[6];
	b3 = b[7];
	out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
	out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
	out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
	out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
	b0 = b[8];
	b1 = b[9];
	b2 = b[10];
	b3 = b[11];
	out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
	out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
	out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
	out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
	b0 = b[12];
	b1 = b[13];
	b2 = b[14];
	b3 = b[15];
	out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
	out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
	out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
	out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
	return out;
}

/**
 * Multiply a matrix by a scalar value.
 * @param matrix - The multiplicand.
 * @param scalar - The multiplier.
 * @param out - The matrix to store the result in.
 * @returns The product.
 * @see [Matrix multiplication](https://en.wikipedia.org/wiki/Matrix_multiplication)
 */
export function multiplyScalar<T extends Matrix4Like>(
	matrix: Matrix4Like,
	scalar: number,
	out: T
) {
	out[0] = matrix[0] * scalar;
	out[1] = matrix[1] * scalar;
	out[2] = matrix[2] * scalar;
	out[3] = matrix[3] * scalar;
	out[4] = matrix[4] * scalar;
	out[5] = matrix[5] * scalar;
	out[6] = matrix[6] * scalar;
	out[7] = matrix[7] * scalar;
	out[8] = matrix[8] * scalar;
	out[9] = matrix[9] * scalar;
	out[10] = matrix[10] * scalar;
	out[11] = matrix[11] * scalar;
	out[12] = matrix[12] * scalar;
	out[13] = matrix[13] * scalar;
	out[14] = matrix[14] * scalar;
	out[15] = matrix[15] * scalar;
	return out;
}

/**
 * Add a matrix to another after multiplying the other by a scalar.
 * @param a - The augend.
 * @param b - The addend.
 * @param scalar - The multiplier.
 * @param out - The matrix to store the result in.
 * @returns The sum.
 * @see [Matrix addition](https://en.wikipedia.org/wiki/Matrix_addition)
 * @see [Matrix multiplication](https://en.wikipedia.org/wiki/Matrix_multiplication)
 */
export function multiplyScalarAndAdd<T extends Matrix4Like>(
	a: Matrix4Like,
	b: Matrix4Like,
	scalar: number,
	out: T
) {
	out[0] = a[0] + b[0] * scalar;
	out[1] = a[1] + b[1] * scalar;
	out[2] = a[2] + b[2] * scalar;
	out[3] = a[3] + b[3] * scalar;
	out[4] = a[4] + b[4] * scalar;
	out[5] = a[5] + b[5] * scalar;
	out[6] = a[6] + b[6] * scalar;
	out[7] = a[7] + b[7] * scalar;
	out[8] = a[8] + b[8] * scalar;
	out[9] = a[9] + b[9] * scalar;
	out[10] = a[10] + b[10] * scalar;
	out[11] = a[11] + b[11] * scalar;
	out[12] = a[12] + b[12] * scalar;
	out[13] = a[13] + b[13] * scalar;
	out[14] = a[14] + b[14] * scalar;
	out[15] = a[15] + b[15] * scalar;
	return out;
}

/**
 * Subtract two matrices.
 * @param a - The minuend.
 * @param b - The subtrahend.
 * @param out - The matrix to store the result in.
 * @returns The difference.
 * @see [Matrix addition](https://en.wikipedia.org/wiki/Matrix_addition)
 */
export function subtract<T extends Matrix4Like>(
	a: Matrix4Like,
	b: Matrix4Like,
	out: T
) {
	out[0] = a[0] - b[0];
	out[1] = a[1] - b[1];
	out[2] = a[2] - b[2];
	out[3] = a[3] - b[3];
	out[4] = a[4] - b[4];
	out[5] = a[5] - b[5];
	out[6] = a[6] - b[6];
	out[7] = a[7] - b[7];
	out[8] = a[8] - b[8];
	out[9] = a[9] - b[8];
	out[10] = a[10] - b[10];
	out[11] = a[11] - b[11];
	out[12] = a[12] - b[12];
	out[13] = a[13] - b[13];
	out[14] = a[14] - b[14];
	out[15] = a[15] - b[15];
	return out;
}

/**
 * Transpose a matrix.
 * @param matrix - The matrix.
 * @param out - The matrix to store the result in.
 * @returns The transpose.
 * @see [Transpose](https://en.wikipedia.org/wiki/Transpose)
 */
export function transpose<T extends Matrix4Like>(matrix: Matrix4Like, out: T) {
	if (out === matrix) {
		const a01 = matrix[1];
		const a02 = matrix[2];
		const a03 = matrix[3];
		const a12 = matrix[6];
		const a13 = matrix[7];
		const a23 = matrix[11];
		out[1] = matrix[4];
		out[2] = matrix[8];
		out[3] = matrix[12];
		out[4] = a01;
		out[6] = matrix[9];
		out[7] = matrix[13];
		out[8] = a02;
		out[9] = a12;
		out[11] = matrix[14];
		out[12] = a03;
		out[13] = a13;
		out[14] = a23;
	} else {
		out[0] = matrix[0];
		out[1] = matrix[4];
		out[2] = matrix[8];
		out[3] = matrix[12];
		out[4] = matrix[1];
		out[5] = matrix[5];
		out[6] = matrix[9];
		out[7] = matrix[13];
		out[8] = matrix[2];
		out[9] = matrix[6];
		out[10] = matrix[10];
		out[11] = matrix[14];
		out[12] = matrix[3];
		out[13] = matrix[7];
		out[14] = matrix[11];
		out[15] = matrix[15];
	}

	return out;
}

/**
 * Calculate the determinant of a matrix.
 * @param matrix - The matrix.
 * @returns The determinant.
 * @see [Determinant](https://en.wikipedia.org/wiki/Determinant)
 */
export function determinant(matrix: Matrix4Like) {
	const a00 = matrix[0];
	const a01 = matrix[1];
	const a02 = matrix[2];
	const a03 = matrix[3];
	const a10 = matrix[4];
	const a11 = matrix[5];
	const a12 = matrix[6];
	const a13 = matrix[7];
	const a20 = matrix[8];
	const a21 = matrix[9];
	const a22 = matrix[10];
	const a23 = matrix[11];
	const a30 = matrix[12];
	const a31 = matrix[13];
	const a32 = matrix[14];
	const a33 = matrix[15];

	const b00 = a00 * a11 - a01 * a10;
	const b01 = a00 * a12 - a02 * a10;
	const b02 = a00 * a13 - a03 * a10;
	const b03 = a01 * a12 - a02 * a11;
	const b04 = a01 * a13 - a03 * a11;
	const b05 = a02 * a13 - a03 * a12;
	const b06 = a20 * a31 - a21 * a30;
	const b07 = a20 * a32 - a22 * a30;
	const b08 = a20 * a33 - a23 * a30;
	const b09 = a21 * a32 - a22 * a31;
	const b10 = a21 * a33 - a23 * a31;
	const b11 = a22 * a33 - a23 * a32;

	return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
}

/**
 * Invert a matrix.
 * @param matrix - The matrix.
 * @param out - The matrix to store the result in.
 * @returns The inverted matrix.
 * @see [Invertible matrix](https://en.wikipedia.org/wiki/Invertible_matrix)
 */
export function invert<T extends Matrix4Like>(matrix: Matrix4Like, out: T) {
	const a00 = matrix[0];
	const a01 = matrix[1];
	const a02 = matrix[2];
	const a03 = matrix[3];
	const a10 = matrix[4];
	const a11 = matrix[5];
	const a12 = matrix[6];
	const a13 = matrix[7];
	const a20 = matrix[8];
	const a21 = matrix[9];
	const a22 = matrix[10];
	const a23 = matrix[11];
	const a30 = matrix[12];
	const a31 = matrix[13];
	const a32 = matrix[14];
	const a33 = matrix[15];

	const b00 = a00 * a11 - a01 * a10;
	const b01 = a00 * a12 - a02 * a10;
	const b02 = a00 * a13 - a03 * a10;
	const b03 = a01 * a12 - a02 * a11;
	const b04 = a01 * a13 - a03 * a11;
	const b05 = a02 * a13 - a03 * a12;
	const b06 = a20 * a31 - a21 * a30;
	const b07 = a20 * a32 - a22 * a30;
	const b08 = a20 * a33 - a23 * a30;
	const b09 = a21 * a32 - a22 * a31;
	const b10 = a21 * a33 - a23 * a31;
	const b11 = a22 * a33 - a23 * a32;

	let det =
		b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
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
 * Scale a matrix by the given vector.
 * @param matrix - The matrix.
 * @param vector - The scaling vector.
 * @param out - The matrix to store the result in.
 * @returns The scaled matrix.
 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
 */
export function scale<T extends Matrix4Like>(
	matrix: Matrix4Like,
	vector: Vector3Like,
	out: T
) {
	const x = vector[0];
	const y = vector[1];
	const z = vector[2];

	out[0] = matrix[0] * x;
	out[1] = matrix[1] * x;
	out[2] = matrix[2] * x;
	out[3] = matrix[3] * x;
	out[4] = matrix[4] * y;
	out[5] = matrix[5] * y;
	out[6] = matrix[6] * y;
	out[7] = matrix[7] * y;
	out[8] = matrix[8] * z;
	out[9] = matrix[9] * z;
	out[10] = matrix[10] * z;
	out[11] = matrix[11] * z;
	out[12] = matrix[12];
	out[13] = matrix[13];
	out[14] = matrix[14];
	out[15] = matrix[15];
	return out;
}

/**
 * Translate a matrix by the given vector.
 * @param matrix - The matrix.
 * @param vector - The translation vector.
 * @param out - The matrix to store the result in.
 * @returns The translated matrix.
 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
 */
export function translate<T extends Matrix4Like>(
	matrix: Matrix4Like,
	vector: Vector3Like,
	out: T
) {
	const x = vector[0];
	const y = vector[1];
	const z = vector[2];

	if (out === matrix) {
		out[12] = matrix[0] * x + matrix[4] * y + matrix[8] * z + matrix[12];
		out[13] = matrix[1] * x + matrix[5] * y + matrix[9] * z + matrix[13];
		out[14] = matrix[2] * x + matrix[6] * y + matrix[10] * z + matrix[14];
		out[15] = matrix[3] * x + matrix[7] * y + matrix[11] * z + matrix[15];
	} else {
		const a00 = matrix[0];
		const a01 = matrix[1];
		const a02 = matrix[2];
		const a03 = matrix[3];
		const a10 = matrix[4];
		const a11 = matrix[5];
		const a12 = matrix[6];
		const a13 = matrix[7];
		const a20 = matrix[8];
		const a21 = matrix[9];
		const a22 = matrix[10];
		const a23 = matrix[11];

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
		out[12] = a00 * x + a10 * y + a20 * z + matrix[12];
		out[13] = a01 * x + a11 * y + a21 * z + matrix[13];
		out[14] = a02 * x + a12 * y + a22 * z + matrix[14];
		out[15] = a03 * x + a13 * y + a23 * z + matrix[15];
	}

	return out;
}

/**
 * Rotate a matrix by the given angle around the given axis.
 * @param matrix - The matrix.
 * @param radians - The angle in radians.
 * @param axis - The axis.
 * @param out - The matrix to store the result in.
 * @returns The rotated matrix.
 * @see [Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix)
 */
export function rotate<T extends Matrix4Like>(
	matrix: Matrix4Like,
	radians: number,
	axis: Vector3Like,
	out: T
) {
	let x = axis[0];
	let y = axis[1];
	let z = axis[2];

	let len = Math.hypot(x, y, z);
	if (len < epsilon) {
		return out;
	}

	len = 1 / len;
	x *= len;
	y *= len;
	z *= len;

	const s = Math.sin(radians);
	const c = Math.cos(radians);
	const t = 1 - c;

	const a00 = matrix[0];
	const a01 = matrix[1];
	const a02 = matrix[2];
	const a03 = matrix[3];
	const a10 = matrix[4];
	const a11 = matrix[5];
	const a12 = matrix[6];
	const a13 = matrix[7];
	const a20 = matrix[8];
	const a21 = matrix[9];
	const a22 = matrix[10];
	const a23 = matrix[11];

	const b00 = x * x * t + c;
	const b01 = y * x * t + z * s;
	const b02 = z * x * t - y * s;
	const b10 = x * y * t - z * s;
	const b11 = y * y * t + c;
	const b12 = z * y * t + x * s;
	const b20 = x * z * t + y * s;
	const b21 = y * z * t - x * s;
	const b22 = z * z * t + c;

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
	if (out !== matrix) {
		out[12] = matrix[12];
		out[13] = matrix[13];
		out[14] = matrix[14];
		out[15] = matrix[15];
	}
	return out;
}

/**
 * Rotate a matrix by the given angle around the X-axis.
 * @param matrix - The matrix.
 * @param r - The angle in radians.
 * @param out - The matrix to store the result in.
 * @returns The rotated matrix.
 * @see [Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix)
 */
export function rotateX<T extends Matrix4Like>(
	matrix: Matrix4Like,
	r: number,
	out: T
) {
	const s = Math.sin(r);
	const c = Math.cos(r);

	const a10 = matrix[4];
	const a11 = matrix[5];
	const a12 = matrix[6];
	const a13 = matrix[7];
	const a20 = matrix[8];
	const a21 = matrix[9];
	const a22 = matrix[10];
	const a23 = matrix[11];

	if (out !== matrix) {
		out[0] = matrix[0];
		out[1] = matrix[1];
		out[2] = matrix[2];
		out[3] = matrix[3];
		out[12] = matrix[12];
		out[13] = matrix[13];
		out[14] = matrix[14];
		out[15] = matrix[15];
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
 * Rotate a matrix by the given angle around the Y-axis.
 * @param matrix - The matrix.
 * @param r - The angle in radians.
 * @param out - The matrix to store the result in.
 * @returns The rotated matrix.
 * @see [Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix)
 */
export function rotateY<T extends Matrix4Like>(
	matrix: Matrix4Like,
	r: number,
	out: T
) {
	const s = Math.sin(r);
	const c = Math.cos(r);

	const a00 = matrix[0];
	const a01 = matrix[1];
	const a02 = matrix[2];
	const a03 = matrix[3];
	const a20 = matrix[8];
	const a21 = matrix[9];
	const a22 = matrix[10];
	const a23 = matrix[11];

	if (out !== matrix) {
		out[4] = matrix[4];
		out[5] = matrix[5];
		out[6] = matrix[6];
		out[7] = matrix[7];
		out[12] = matrix[12];
		out[13] = matrix[13];
		out[14] = matrix[14];
		out[15] = matrix[15];
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
 * Rotate a matrix by the given angle around the Z-axis.
 * @param matrix - The matrix.
 * @param r - The angle in radians.
 * @param out - The matrix to store the result in.
 * @returns The rotated matrix.
 * @see [Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix)
 */
export function rotateZ<T extends Matrix4Like>(
	matrix: Matrix4Like,
	r: number,
	out: T
) {
	const s = Math.sin(r);
	const c = Math.cos(r);

	const a00 = matrix[0];
	const a01 = matrix[1];
	const a02 = matrix[2];
	const a03 = matrix[3];
	const a10 = matrix[4];
	const a11 = matrix[5];
	const a12 = matrix[6];
	const a13 = matrix[7];

	if (out !== matrix) {
		out[8] = matrix[8];
		out[9] = matrix[9];
		out[10] = matrix[10];
		out[11] = matrix[11];
		out[12] = matrix[12];
		out[13] = matrix[13];
		out[14] = matrix[14];
		out[15] = matrix[15];
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

/**
 * Get the translation vector component of a transformation matrix.
 * @param matrix - The matrix.
 * @param out - The vector to store the result in.
 * @returns The translation vector.
 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
 */
export function getTranslation<T extends Vector3Like>(
	matrix: Matrix4Like,
	out: T
) {
	out[0] = matrix[12];
	out[1] = matrix[13];
	out[2] = matrix[14];
	return out;
}

/**
 * Set the translation vector component of a transformation matrix.
 * @param matrix - The matrix.
 * @param translation - The translation vector.
 * @param out - The matrix to store the result in.
 * @returns The transformation matrix.
 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
 */
export function setTranslation<T extends Matrix4Like>(
	matrix: Matrix4Like,
	translation: Vector3Like,
	out: T
) {
	if (out !== matrix) {
		out[0] = matrix[0];
		out[1] = matrix[1];
		out[2] = matrix[2];
		out[3] = matrix[3];
		out[4] = matrix[4];
		out[5] = matrix[5];
		out[6] = matrix[6];
		out[7] = matrix[7];
		out[8] = matrix[8];
		out[9] = matrix[9];
		out[10] = matrix[10];
		out[11] = matrix[11];
		out[15] = matrix[15];
	}

	out[12] = translation[0];
	out[13] = translation[1];
	out[14] = translation[2];
	return out;
}

/**
 * Get the scaling factor of a transformation matrix.
 * @param matrix - The matrix.
 * @param out - The vector to store the result in.
 * @returns The scaling vector.
 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
 */
export function getScaling<T extends Vector3Like>(matrix: Matrix4Like, out: T) {
	const m11 = matrix[0];
	const m12 = matrix[1];
	const m13 = matrix[2];
	const m21 = matrix[4];
	const m22 = matrix[5];
	const m23 = matrix[6];
	const m31 = matrix[8];
	const m32 = matrix[9];
	const m33 = matrix[10];

	out[0] = Math.hypot(m11, m12, m13);
	out[1] = Math.hypot(m21, m22, m23);
	out[2] = Math.hypot(m31, m32, m33);
	return out;
}

/**
 * Get the rotational component of a transformation matrix.
 * @param matrix - The matrix.
 * @param out - The quaternion to store the result in.
 * @returns The rotation.
 * @see [Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix)
 */
export function getRotation<T extends QuaternionLike>(
	matrix: Matrix4Like,
	out: T
) {
	const scaling = getScaling(matrix, createVector3Like());

	const is1 = 1 / scaling[0];
	const is2 = 1 / scaling[1];
	const is3 = 1 / scaling[2];

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

	if (trace > 0) {
		const s = Math.sqrt(trace + 1) * 2;
		out[0] = (sm23 - sm32) / s;
		out[1] = (sm31 - sm13) / s;
		out[2] = (sm12 - sm21) / s;
		out[3] = 0.25 * s;
		return out;
	}

	if (sm11 > sm22 && sm11 > sm33) {
		const s = Math.sqrt(1 + sm11 - sm22 - sm33) * 2;
		out[0] = 0.25 * s;
		out[1] = (sm12 + sm21) / s;
		out[2] = (sm31 + sm13) / s;
		out[3] = (sm23 - sm32) / s;
		return out;
	}

	if (sm22 > sm33) {
		const s = Math.sqrt(1 + sm22 - sm11 - sm33) * 2;
		out[0] = (sm12 + sm21) / s;
		out[1] = 0.25 * s;
		out[2] = (sm23 + sm32) / s;
		out[3] = (sm31 - sm13) / s;
		return out;
	}

	const s = Math.sqrt(1 + sm33 - sm11 - sm22) * 2;
	out[0] = (sm31 + sm13) / s;
	out[1] = (sm23 + sm32) / s;
	out[2] = 0.25 * s;
	out[3] = (sm12 - sm21) / s;
	return out;
}

/**
 * A four-by-four matrix.
 * @see [Matrix](https://en.wikipedia.org/wiki/Matrix_(mathematics))
 */
export default class Matrix4
	extends Float32Array
	implements SquareMatrix, Matrix4Like
{
	/**
	 * Create a transformation matrix that represents a translation by the given vector.
	 * @param vector - The translation vector.
	 * @param out - The matrix to store the result in.
	 * @returns The transformation matrix.
	 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
	 */
	public static fromTranslation<T extends Matrix4Like>(
		vector: Vector3Like,
		out = new Matrix4() as unknown as T
	) {
		return fromTranslation(vector, out);
	}

	/**
	 * Create a transformation matrix that represents a scaling by the given vector.
	 * @param vector - The scaling vector.
	 * @param out - The matrix to store the result in.
	 * @returns The transformation matrix.
	 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
	 */
	public static fromScaling<T extends Matrix4Like>(
		vector: Vector3Like,
		out = new Matrix4() as unknown as T
	) {
		return fromScaling(vector, out);
	}

	/**
	 * Create a transformation matrix that represents a rotation by the given angle around the Z-axis.
	 * @param r - The angle in radians.
	 * @param axis - The axis to rotate around.
	 * @param out - The matrix to store the result in.
	 * @returns The transformation matrix.
	 * @see [Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix)
	 */
	public static fromRotation<T extends Matrix4Like>(
		r: number,
		axis: Vector3Like,
		out = new Matrix4() as unknown as T
	) {
		return fromRotation(r, axis, out);
	}

	/**
	 * Create a transformation matrix that represents a rotation by the given angle around the X-axis.
	 * @param r - The angle in radians.
	 * @param out - The matrix to store the result in.
	 * @returns The transformation matrix.
	 * @see [Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix)
	 */
	public static fromXRotation<T extends Matrix4Like>(
		r: number,
		out = new Matrix4() as unknown as T
	) {
		return fromXRotation(r, out);
	}

	/**
	 * Create a transformation matrix that represents a rotation by the given angle around the Y-axis.
	 * @param r - The angle in radians.
	 * @param out - The matrix to store the result in.
	 * @returns The transformation matrix.
	 * @see [Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix)
	 */
	public static fromYRotation<T extends Matrix4Like>(
		r: number,
		out = new Matrix4() as unknown as T
	) {
		return fromYRotation(r, out);
	}

	/**
	 * Create a transformation matrix that represents a rotation by the given angle around the Z-axis.
	 * @param r - The angle in radians.
	 * @param out - The matrix to store the result in.
	 * @returns The transformation matrix.
	 * @see [Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix)
	 */
	public static fromZRotation<T extends Matrix4Like>(
		r: number,
		out = new Matrix4() as unknown as T
	) {
		return fromZRotation(r, out);
	}

	/**
	 * Create a transformation matrix from the given rotation and translation.
	 * @param rotation - The rotation quaternion.
	 * @param translation - The translation vector.
	 * @param out - The matrix to store the result in.
	 * @returns The transformation matrix.
	 * @see [Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix)
	 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
	 */
	public static fromRotationTranslation<T extends Matrix4Like>(
		rotation: QuaternionLike,
		translation: Vector3Like,
		out = new Matrix4() as unknown as T
	) {
		return fromRotationTranslation(rotation, translation, out);
	}

	/**
	 * Create a transformation matrix from the given rotation, translation, and scale.
	 * @param rotation - The rotation quaternion.
	 * @param translation - The translation vector.
	 * @param scaling - The scaling vector.
	 * @param out - The matrix to store the result in.
	 * @returns The transformation matrix.
	 * @see [Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix)
	 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
	 */
	public static fromRotationTranslationScale<T extends Matrix4Like>(
		rotation: QuaternionLike,
		translation: Vector3Like,
		scaling: Vector3Like,
		out = new Matrix4() as unknown as T
	) {
		return fromRotationTranslationScale(rotation, translation, scaling, out);
	}

	/**
	 * Create a transformation matrix from the given rotation, translation, and scale around the given origin.
	 * @param rotation - The rotation quaternion.
	 * @param translation - The translation vector.
	 * @param scaling - The scaling vector.
	 * @param origin - The origin vector.
	 * @param out - The matrix to store the result in.
	 * @returns The transformation matrix.
	 * @see [Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix)
	 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
	 */
	public static fromRotationTranslationScaleOrigin<T extends Matrix4Like>(
		rotation: QuaternionLike,
		translation: Vector3Like,
		scaling: Vector3Like,
		origin: Vector3Like,
		out = new Matrix4() as unknown as T
	) {
		return fromRotationTranslationScaleOrigin(
			rotation,
			translation,
			scaling,
			origin,
			out
		);
	}

	/**
	 * Create a transformation matrix from a dual quaternion.
	 * @param quaternion - The dual quaternion.
	 * @param out - The matrix to store the result in.
	 * @returns The transformation matrix.
	 * @see [Dual quaternion](https://en.wikipedia.org/wiki/Dual_quaternion)
	 * @see [Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix)
	 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
	 */
	public static fromDualQuaternion<T extends Matrix4Like>(
		quaternion: DualQuaternionLike,
		out = new Matrix4() as unknown as T
	) {
		return fromDualQuaternion(quaternion, out);
	}

	/**
	 * Generate a frustum matrix with the given bounds.
	 * @param left - The left bound of the frustum.
	 * @param right - The right bound of the frustum.
	 * @param bottom - The bottom bound of the frustum.
	 * @param top - The top bound of the frustum.
	 * @param near - The near bound of the frustum.
	 * @param far - The far bound of the frustum.
	 * @param out - The matrix to store the result in.
	 * @returns The frustum matrix.
	 * @see [Camera matrix](https://en.wikipedia.org/wiki/Camera_matrix)
	 * @see [3D projection](https://en.wikipedia.org/wiki/3D_projection)
	 */
	public static frustum<T extends Matrix4Like>(
		left: number,
		right: number,
		bottom: number,
		top: number,
		near: number,
		far: number,
		out = new Matrix4() as unknown as T
	) {
		return frustum(left, right, bottom, top, near, far, out);
	}

	/**
	 * Create a perspective projection matrix with the given bounds.
	 * @param fov - The vertical field of view in radians.
	 * @param aspect - The aspect ratio (typically the width of the viewport divided by its height).
	 * @param near - The near bound of the frustum.
	 * @param far - The far bound of the frustum.
	 * @param out - The matrix to store the result in.
	 * @returns The perspective projection matrix.
	 * @see [Camera matrix](https://en.wikipedia.org/wiki/Camera_matrix)
	 * @see [3D projection](https://en.wikipedia.org/wiki/3D_projection)
	 */
	public static perspective<T extends Matrix4Like>(
		fov: number,
		aspect: number,
		near: number,
		far: number,
		out = new Matrix4() as unknown as T
	) {
		return perspective(fov, aspect, near, far, out);
	}

	/**
	 * Create a perspective projection matrix from a field of view. Useful for generating projection matrices to be used with the WebXR API.
	 * @param fov - The field of view.
	 * @param near - The near bound of the frustum.
	 * @param far - The far bound of the frustum.
	 * @param out - The matrix to store the result in.
	 * @returns The perspective projection matrix.
	 * @see [Camera matrix](https://en.wikipedia.org/wiki/Camera_matrix)
	 * @see [3D projection](https://en.wikipedia.org/wiki/3D_projection)
	 * @see [WebXR API](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API)
	 */
	public static perspectiveFromFieldOfView<T extends Matrix4Like>(
		fov: FieldOfView,
		near: number,
		far: number,
		out = new Matrix4() as unknown as T
	) {
		return perspectiveFromFieldOfView(fov, near, far, out);
	}

	/**
	 * Generate an orthogonal projection matrix with the given bounds.
	 * @param left - The left bound of the frustum.
	 * @param right - The right bound of the frustum.
	 * @param bottom - The bottom bound of the frustum.
	 * @param top - The top bound of the frustum.
	 * @param near - The near bound of the frustum.
	 * @param far - The far bound of the frustum.
	 * @param out - The matrix to store the result in.
	 * @returns The frustum matrix.
	 * @see [Camera matrix](https://en.wikipedia.org/wiki/Camera_matrix)
	 * @see [3D projection](https://en.wikipedia.org/wiki/3D_projection)
	 */
	public static ortho<T extends Matrix4Like>(
		left: number,
		right: number,
		bottom: number,
		top: number,
		near: number,
		far: number,
		out = new Matrix4() as unknown as T
	) {
		return ortho(left, right, bottom, top, near, far, out);
	}

	/**
	 * Generate a look-at matrix. If you want a matrix that actually makes an object look at another object, use `targetTo` instead.
	 * @param eye - The position of the viewer.
	 * @param center - The point that the viewer is looking at.
	 * @param up - The local up direction.
	 * @param out - The matrix to store the result in.
	 * @returns The look-at matrix.
	 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
	 */
	public static lookAt<T extends Matrix4Like>(
		eye: Vector3Like,
		center: Vector3Like,
		up: Vector3Like = [0, 1, 0],
		out = new Matrix4() as unknown as T
	) {
		return lookAt(eye, center, up, out);
	}

	/**
	 * Create a matrix that makes something look at something else.
	 * @param eye - The position of the viewer.
	 * @param target - The point that the viewer is looking at.
	 * @param up - The local up direction.
	 * @param out - The matrix to store the result in.
	 * @returns The transformation matrix.
	 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
	 */
	public static targetTo<T extends Matrix4Like>(
		eye: Vector3Like,
		target: Vector3Like,
		up: Vector3Like = [0, 1, 0],
		out = new Matrix4() as unknown as T
	) {
		return targetTo(eye, target, up, out);
	}

	/**
	 * Create a two-by-two matrix with the given values.
	 * @param c0r0 - The value in the first column and first row.
	 * @param c0r1 - The value in the first column and second row.
	 * @param c0r2 - The value in the first column and third row.
	 * @param c0r3 - The value in the first column and fourth row.
	 * @param c1r0 - The value in the second column and first row.
	 * @param c1r1 - The value in the second column and second row.
	 * @param c1r2 - The value in the second column and third row.
	 * @param c1r3 - The value in the second column and fourth row.
	 * @param c2r0 - The value in the third column and first row.
	 * @param c2r1 - The value in the third column and second row.
	 * @param c2r2 - The value in the third column and third row.
	 * @param c2r3 - The value in the third column and fourth row.
	 * @param c3r0 - The value in the fourth column and first row.
	 * @param c3r1 - The value in the fourth column and second row.
	 * @param c3r2 - The value in the fourth column and third row.
	 * @param c3r3 - The value in the fourth column and fourth row.
	 * @param out - The matrix to store the result in.
	 * @returns The matrix.
	 */
	public static fromValues<T extends Matrix4Like>(
		c0r0: number,
		c0r1: number,
		c0r2: number,
		c0r3: number,
		c1r0: number,
		c1r1: number,
		c1r2: number,
		c1r3: number,
		c2r0: number,
		c2r1: number,
		c2r2: number,
		c2r3: number,
		c3r0: number,
		c3r1: number,
		c3r2: number,
		c3r3: number,
		out = new Matrix4() as unknown as T
	) {
		return fromValues(
			c0r0,
			c0r1,
			c0r2,
			c0r3,
			c1r0,
			c1r1,
			c1r2,
			c1r3,
			c2r0,
			c2r1,
			c2r2,
			c2r3,
			c3r0,
			c3r1,
			c3r2,
			c3r3,
			out
		);
	}

	/**
	 * Create a four-by-four identity matrix.
	 * @see [Identity matrix](https://en.wikipedia.org/wiki/Identity_matrix)
	 */
	public constructor() {
		super(16);

		this[0] = 1;
		this[5] = 1;
		this[10] = 1;
		this[15] = 1;

		this.width = 4;
		this.height = 4;
	}

	/** The value in the first column and first row. */
	public 0: number;

	/** The value in the first column and second row. */
	public 1: number;

	/** The value in the first column and third row. */
	public 2: number;

	/** The value in the first column and fourth row. */
	public 3: number;

	/** The value in the second column and first row. */
	public 4: number;

	/** The value in the second column and second row. */
	public 5: number;

	/** The value in the second column and third row. */
	public 6: number;

	/** The value in the second column and fourth row. */
	public 7: number;

	/** The value in the third column and first row. */
	public 8: number;

	/** The value in the third column and second row. */
	public 9: number;

	/** The value in the third column and third row. */
	public 10: number;

	/** The value in the third column and fourth row. */
	public 11: number;

	/** The value in the fourth column and first row. */
	public 12: number;

	/** The value in the fourth column and second row. */
	public 13: number;

	/** The value in the fourth column and third row. */
	public 14: number;

	/** The value in the fourth column and fourth row. */
	public 15: number;

	/** The number of columns in this matrix. */
	public readonly width: 4;

	/** The number of rows in this matrix. */
	public readonly height: 4;

	/**
	 * Determine whether or not this matrix is roughly equivalent to another.
	 * @param matrix - The other matrix.
	 * @returns Whether or not the matrices are equivalent.
	 */
	public equals(matrix: Matrix4Like) {
		return equals(this, matrix);
	}

	/**
	 * Determine whether or not this matrix is exactly equivalent to another.
	 * @param matrix - The other matrix.
	 * @returns Whether or not the matrices are equivalent.
	 */
	public exactEquals(matrix: Matrix4Like) {
		return exactEquals(this, matrix);
	}

	/**
	 * Add two matrices of the same size.
	 * @param matrix - The other matrix.
	 * @param out - The matrix to store the result in.
	 * @returns The sum of the matrices.
	 * @see [Matrix addition](https://en.wikipedia.org/wiki/Matrix_addition)
	 */
	public add<T extends Matrix4Like>(
		matrix: Matrix4Like,
		out = new Matrix4() as unknown as T
	) {
		return add(this, matrix, out);
	}

	/**
	 * Calculate the adjugate of this matrix.
	 * @param out - The matrix to store the result in.
	 * @returns The adjugate of this matrix.
	 * @see [Adjugate matrix](https://en.wikipedia.org/wiki/Adjugate_matrix)
	 */
	public adjoint<T extends Matrix4Like>(out = new Matrix4() as unknown as T) {
		return adjoint(this, out);
	}

	/**
	 * Copy the values from this matrix to another one.
	 * @param out - The matrix to store the result in.
	 * @returns The copy.
	 */
	public clone<T extends Matrix4Like>(out = new Matrix4() as unknown as T) {
		return copy(this, out);
	}

	/**
	 * Copy the values of another matrix into this one.
	 * @param matrix - The matrix to copy.
	 * @returns This matrix.
	 */
	public copy(matrix: Matrix4Like) {
		return copy(matrix, this);
	}

	/**
	 * Get the Frobenius norm of this matrix.
	 * @see [Matrix norm](https://en.wikipedia.org/wiki/Matrix_norm)
	 */
	public get frob() {
		return frob(this);
	}

	/**
	 * Multiply this matrix by another.
	 * @param matrix - The other matrix.
	 * @param out - The matrix to store the result in.
	 * @returns The product of the matrices.
	 * @see [Matrix multiplication](https://en.wikipedia.org/wiki/Matrix_multiplication)
	 */
	public multiply<T extends Matrix4Like>(
		matrix: Matrix4Like,
		out = new Matrix4() as unknown as T
	) {
		return multiply(this, matrix, out);
	}

	/**
	 * Multiply this matrix by a scalar value.
	 * @param scalar - The scalar value.
	 * @param out - The matrix to store the result in.
	 * @returns The product of the matrix and the scalar value.
	 * @see [Matrix multiplication](https://en.wikipedia.org/wiki/Matrix_multiplication)
	 */
	public multiplyScalar<T extends Matrix4Like>(
		scalar: number,
		out = new Matrix4() as unknown as T
	) {
		return multiplyScalar(this, scalar, out);
	}

	/**
	 * Add this matrix to another after multiplying the other by a scalar.
	 * @param matrix - The other matrix.
	 * @param scalar - The scalar.
	 * @param out - The matrix to store the result in.
	 * @returns The sum.
	 * @see [Matrix addition](https://en.wikipedia.org/wiki/Matrix_addition)
	 * @see [Matrix multiplication](https://en.wikipedia.org/wiki/Matrix_multiplication)
	 */
	public multiplyScalarAndAdd<T extends Matrix4Like>(
		matrix: Matrix4Like,
		scalar: number,
		out = new Matrix4() as unknown as T
	) {
		return multiplyScalarAndAdd(this, matrix, scalar, out);
	}

	/**
	 * Subtract another matrix from this one.
	 * @param matrix - The other matrix.
	 * @param out - The matrix to store the result in.
	 * @returns The difference between the matrices.
	 * @see [Matrix addition](https://en.wikipedia.org/wiki/Matrix_addition)
	 */
	public subtract<T extends Matrix4Like>(
		matrix: Matrix4Like,
		out = new Matrix4() as unknown as T
	) {
		return subtract(this, matrix, out);
	}

	/**
	 * Transpose this matrix.
	 * @param out - The matrix to store the result in.
	 * @returns The transpose of this matrix.
	 * @see [Transpose](https://en.wikipedia.org/wiki/Transpose)
	 */
	public transpose<T extends Matrix4Like>(out = new Matrix4() as unknown as T) {
		return transpose(this, out);
	}

	/**
	 * Get the determinant of this matrix.
	 * @see [Determinant](https://en.wikipedia.org/wiki/Determinant)
	 */
	public get determinant() {
		return determinant(this);
	}

	/**
	 * Reset this matrix to identity.
	 * @returns This matrix.
	 * @see [Identity matrix](https://en.wikipedia.org/wiki/Identity_matrix)
	 */
	public identity() {
		return identity(this);
	}

	/**
	 * Invert this matrix.
	 * @param out - The matrix to store the result in.
	 * @returns The inverted matrix.
	 * @see [Invertible matrix](https://en.wikipedia.org/wiki/Invertible_matrix)
	 */
	public invert<T extends Matrix4Like>(out = new Matrix4() as unknown as T) {
		return invert(this, out);
	}

	/**
	 * Scale this matrix by the given vector.
	 * @param vector - The scaling vector.
	 * @param out - The matrix to store the result in.
	 * @returns The scaled matrix.
	 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
	 */
	public scale<T extends Matrix4Like>(
		vector: Vector3Like,
		out = new Matrix4() as unknown as T
	) {
		return scale(this, vector, out);
	}

	/**
	 * Translate this matrix by the given vector.
	 * @param vector - The translation vector.
	 * @param out - The matrix to store the result in.
	 * @returns The translated matrix.
	 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
	 */
	public translate<T extends Matrix4Like>(
		vector: Vector3Like,
		out = new Matrix4() as unknown as T
	) {
		return translate(this, vector, out);
	}

	/**
	 * Rotate this matrix by the given angle around the given axis.
	 * @param r - The angle in radians.
	 * @param axis - The axis.
	 * @param out - The matrix to store the result in.
	 * @returns The rotated matrix.
	 * @see [Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix)
	 */
	public rotate<T extends Matrix4Like>(
		r: number,
		axis: Vector3Like,
		out = new Matrix4() as unknown as T
	) {
		return rotate(this, r, axis, out);
	}

	/**
	 * Rotate this matrix by the given angle around the X-axis.
	 * @param r - The angle in radians.
	 * @param out - The matrix to store the result in.
	 * @returns The rotated matrix.
	 * @see [Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix)
	 */
	public rotateX<T extends Matrix4Like>(
		r: number,
		out = new Matrix4() as unknown as T
	) {
		return rotateX(this, r, out);
	}

	/**
	 * Rotate this matrix by the given angle around the Y-axis.
	 * @param r - The angle in radians.
	 * @param out - The matrix to store the result in.
	 * @returns The rotated matrix.
	 * @see [Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix)
	 */
	public rotateY<T extends Matrix4Like>(
		r: number,
		out = new Matrix4() as unknown as T
	) {
		return rotateY(this, r, out);
	}

	/**
	 * Rotate this matrix by the given angle around the Z-axis.
	 * @param r - The angle in radians.
	 * @param out - The matrix to store the result in.
	 * @returns The rotated matrix.
	 * @see [Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix)
	 */
	public rotateZ<T extends Matrix4Like>(
		r: number,
		out = new Matrix4() as unknown as T
	) {
		return rotateZ(this, r, out);
	}

	/**
	 * Get the translation vector component of this transformation matrix.
	 * @param out - The vector to store the result in.
	 * @returns The translation.
	 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
	 */
	public getTranslation<T extends Vector3Like>(
		out = new Vector3() as unknown as T
	) {
		return getTranslation(this, out);
	}

	/**
	 * Set the translation vector component of this transformation matrix.
	 * @param translation - The translation vector.
	 * @param out - The matrix to store the result in.
	 * @returns The transformation matrix.
	 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
	 */
	public setTranslation<T extends Matrix4Like>(
		translation: Vector3Like,
		out = new Matrix4() as unknown as T
	) {
		return setTranslation(this, translation, out);
	}

	/**
	 * Get the scaling vector component of this transformation matrix.
	 * @param out - The vector to store the result in.
	 * @returns The scaling.
	 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
	 */
	public getScaling<T extends Vector3Like>(
		out = new Vector3() as unknown as T
	) {
		return getScaling(this, out);
	}

	/**
	 * Get the scaling vector component of this transformation matrix.
	 * @param out - The quaternion to store the result in.
	 * @returns The rotation.
	 * @see [Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix)
	 */
	public getRotation<T extends QuaternionLike>(
		out = new Quaternion() as unknown as T
	) {
		return getRotation(this, out);
	}
}
