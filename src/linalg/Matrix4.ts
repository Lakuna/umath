import Quaternion, {
	type QuaternionLike,
	fromValues as quaternionFromValues
} from "./Quaternion.js";
import Vector3, {
	type Vector3Like,
	createVector3Like,
	fromValues as vector3FromValues
} from "./Vector3.js";
import type { DualQuaternionLike } from "./DualQuaternion.js";
import type FieldOfView from "../types/FieldOfView.js";
import MagnitudeError from "../utility/MagnitudeError.js";
import type { MatrixLike } from "./Matrix.js";
import SingularMatrixError from "../utility/SingularMatrixError.js";
import type SquareMatrix from "./SquareMatrix.js";
import approx from "../algorithms/approx.js";
import approxRelative from "../algorithms/approxRelative.js";
import degreesToRadians from "../algorithms/degreesToRadians.js";
import epsilon from "../utility/epsilon.js";

/**
 * Numbers arranged into four columns and four rows.
 * @see {@link https://en.wikipedia.org/wiki/Matrix_(mathematics) | Matrix}
 * @public
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
 * Create a four-by-four matrix-like object.
 * @returns A four-by-four matrix-like object.
 * @public
 */
export const createMatrix4Like = (): Float32Array & Matrix4Like => {
	return new Float32Array(16) as Float32Array & Matrix4Like;
};

/**
 * Create a four-by-four matrix with the given values.
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
 * @public
 */
export const fromValues = <T extends Matrix4Like>(
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
): T => {
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
};

/**
 * Create a transformation matrix that represents a translation by the given vector. Equivalent to (but faster than) `translate(identity(out), vector, out)`.
 * @param vector - The translation vector.
 * @param out - The matrix to store the result in.
 * @returns The transformation matrix.
 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
 * @public
 */
export const fromTranslation = <T extends Matrix4Like>(
	vector: Vector3Like,
	out: T
): T =>
	fromValues(
		1,
		0,
		0,
		0,
		0,
		1,
		0,
		0,
		0,
		0,
		1,
		0,
		vector[0],
		vector[1],
		vector[2],
		1,
		out
	);

/**
 * Create a transformation matrix that represents a scaling by the given vector. This is equivalent to (but faster than) `scale(identity(out), vector, out)`.
 * @param vector - The scaling vector.
 * @param out - The matrix to store the result in.
 * @returns The transformation matrix.
 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
 * @public
 */
export const fromScaling = <T extends Matrix4Like>(
	vector: Vector3Like,
	out: T
): T =>
	fromValues(
		vector[0],
		0,
		0,
		0,
		0,
		vector[1],
		0,
		0,
		0,
		0,
		vector[2],
		0,
		0,
		0,
		0,
		1,
		out
	);

/**
 * Reset a matrix to identity.
 * @param out - The matrix to store the result in.
 * @returns The matrix.
 * @see {@link https://en.wikipedia.org/wiki/Identity_matrix | Identity matrix}
 * @public
 */
export const identity = <T extends Matrix4Like>(out: T): T =>
	fromValues(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, out);

/**
 * Create a transformation matrix that represents a rotation by the given angle around the given axis. This is equivalent to (but faster than) `rotate(identity(out), radians, axis, out)`.
 * @param radians - The angle in radians.
 * @param axis - The axis to rotate around.
 * @param out - The matrix to store the result in.
 * @returns The transformation matrix.
 * @see {@link https://en.wikipedia.org/wiki/Rotation_matrix | Rotation matrix}
 * @public
 */
export const fromRotation = <T extends Matrix4Like>(
	radians: number,
	axis: Vector3Like,
	out: T
): T => {
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

	const s = Math.sin(radians);
	const c = Math.cos(radians);
	const t = 1 - c;

	return fromValues(
		x * x * t + c,
		y * x * t + z * s,
		z * x * t - y * s,
		0,
		x * y * t - z * s,
		y * y * t + c,
		z * y * t + x * s,
		0,
		x * z * t + y * s,
		y * z * t - x * s,
		z * z * t + c,
		0,
		0,
		0,
		0,
		1,
		out
	);
};

/**
 * Create a transformation matrix that represents a rotation by the given angle around the X-axis. This is equivalent to (but faster than) `rotateX(identity(out), radians, out)`.
 * @param radians - The angle in radians.
 * @param out - The matrix to store the result in.
 * @returns The transformation matrix.
 * @see {@link https://en.wikipedia.org/wiki/Rotation_matrix | Rotation matrix}
 * @public
 */
export const fromXRotation = <T extends Matrix4Like>(
	radians: number,
	out: T
): T => {
	const s = Math.sin(radians);
	const c = Math.cos(radians);

	return fromValues(1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, out);
};

/**
 * Create a transformation matrix that represents a rotation by the given angle around the Y-axis. This is equivalent to (but faster than) `rotateY(identity(out), radians, out)`.
 * @param radians - The angle in radians.
 * @param out - The matrix to store the result in.
 * @returns The transformation matrix.
 * @see {@link https://en.wikipedia.org/wiki/Rotation_matrix | Rotation matrix}
 * @public
 */
export const fromYRotation = <T extends Matrix4Like>(
	radians: number,
	out: T
): T => {
	const s = Math.sin(radians);
	const c = Math.cos(radians);

	return fromValues(c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1, out);
};

/**
 * Create a transformation matrix that represents a rotation by the given angle around the Z-axis. This is equivalent to (but faster than) `rotateZ(identity(out), radians, out)`.
 * @param radians - The angle in radians.
 * @param out - The matrix to store the result in.
 * @returns The transformation matrix.
 * @see {@link https://en.wikipedia.org/wiki/Rotation_matrix | Rotation matrix}
 * @public
 */
export const fromZRotation = <T extends Matrix4Like>(
	radians: number,
	out: T
): T => {
	const s = Math.sin(radians);
	const c = Math.cos(radians);

	return fromValues(c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, out);
};

/**
 * Create a transformation matrix from the given rotation and translation. This is equivalent to (but faster than) `multiply(translate(identity(out), translation, out), fromQuaternion(rotation, createMatrix4Like()), out)`.
 * @param rotation - The rotation quaternion.
 * @param translation - The translation vector.
 * @param out - The matrix to store the result in.
 * @returns The transformation matrix.
 * @see {@link https://en.wikipedia.org/wiki/Quaternion | Quaternion}
 * @see {@link https://en.wikipedia.org/wiki/Rotation_matrix | Rotation matrix}
 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
 * @public
 */
export const fromRotationTranslation = <T extends Matrix4Like>(
	rotation: QuaternionLike,
	translation: Vector3Like,
	out: T
): T => {
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

	return fromValues(
		1 - (yy + zz),
		xy + wz,
		xz - wy,
		0,
		xy - wz,
		1 - (xx + zz),
		yz + wx,
		0,
		xz + wy,
		yz - wx,
		1 - (xx + yy),
		0,
		translation[0],
		translation[1],
		translation[2],
		1,
		out
	);
};

/**
 * Create a transformation matrix from the given rotation, translation, and scale. This is equivalent to (but faster than) `scale(multiply(translate(identity(out), translation, out), fromQuaternion(rotation, createMatrix4Like()), out), scaling, out)`.
 * @param rotation - The rotation quaternion.
 * @param translation - The translation vector.
 * @param scaling - The scaling vector.
 * @param out - The matrix to store the result in.
 * @returns The transformation matrix.
 * @see {@link https://en.wikipedia.org/wiki/Quaternion | Quaternion}
 * @see {@link https://en.wikipedia.org/wiki/Rotation_matrix | Rotation matrix}
 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
 * @public
 */
export const fromRotationTranslationScale = <T extends Matrix4Like>(
	rotation: QuaternionLike,
	translation: Vector3Like,
	scaling: Vector3Like,
	out: T
): T => {
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

	return fromValues(
		(1 - (yy + zz)) * sx,
		(xy + wz) * sx,
		(xz - wy) * sx,
		0,
		(xy - wz) * sy,
		(1 - (xx + zz)) * sy,
		(yz + wx) * sy,
		0,
		(xz + wy) * sz,
		(yz - wx) * sz,
		(1 - (xx + yy)) * sz,
		0,
		translation[0],
		translation[1],
		translation[2],
		1,
		out
	);
};

/**
 * Create a transformation matrix from the given rotation, translation, and scale around the given origin. This is equivalent to (but faster than) `translate(scale(multiply(translate(translate(identity(out), translation, out), origin, out), fromQuaternion(rotation, createMatrix4Like()), out), scaling, out), negate(origin), out)`.
 * @param rotation - The rotation quaternion.
 * @param translation - The translation vector.
 * @param scaling - The scaling vector.
 * @param origin - The origin vector.
 * @param out - The matrix to store the result in.
 * @returns The transformation matrix.
 * @see {@link https://en.wikipedia.org/wiki/Quaternion | Quaternion}
 * @see {@link https://en.wikipedia.org/wiki/Rotation_matrix | Rotation matrix}
 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
 * @public
 */
export const fromRotationTranslationScaleOrigin = <T extends Matrix4Like>(
	rotation: QuaternionLike,
	translation: Vector3Like,
	scaling: Vector3Like,
	origin: Vector3Like,
	out: T
): T => {
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

	const o0 = (1 - (yy + zz)) * sx;
	const o1 = (xy + wz) * sx;
	const o2 = (xz - wy) * sx;
	const o4 = (xy - wz) * sy;
	const o5 = (1 - (xx + zz)) * sy;
	const o6 = (yz + wx) * sy;
	const o8 = (xz + wy) * sz;
	const o9 = (yz - wx) * sz;
	const o10 = (1 - (xx + yy)) * sz;

	return fromValues(
		o0,
		o1,
		o2,
		0,
		o4,
		o5,
		o6,
		0,
		o8,
		o9,
		o10,
		0,
		translation[0] + ox - (o0 * ox + o4 * oy + o8 * oz),
		translation[1] + oy - (o1 * ox + o5 * oy + o9 * oz),
		translation[2] + oz - (o2 * ox + o6 * oy + o10 * oz),
		1,
		out
	);
};

/**
 * Create a transformation matrix from a quaternion.
 * @param quaternion - The quaternion.
 * @param out - The matrix to store the result in.
 * @returns The transformation matrix.
 * @see {@link https://en.wikipedia.org/wiki/Rotation_matrix | Rotation matrix}
 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
 * @public
 */
export const fromQuaternion = <T extends Matrix4Like>(
	quaternion: QuaternionLike,
	out: T
): T => {
	const x = quaternion[0];
	const y = quaternion[1];
	const z = quaternion[2];
	const w = quaternion[3];

	const x2 = x + x;
	const y2 = y + y;
	const z2 = z + z;

	const xx = x * x2;
	const yx = y * x2;
	const yy = y * y2;
	const zx = z * x2;
	const zy = z * y2;
	const zz = z * z2;
	const wx = w * x2;
	const wy = w * y2;
	const wz = w * z2;

	return fromValues(
		1 - yy - zz,
		yx + wz,
		zx - wy,
		0,
		yx - wz,
		1 - xx - zz,
		zy + wx,
		0,
		zx + wy,
		zy - wx,
		1 - xx - yy,
		0,
		0,
		0,
		0,
		1,
		out
	);
};

// Used to store intermediary values in some functions.
const iv3 = createVector3Like();

/**
 * Create a transformation matrix from a dual quaternion.
 * @param quaternion - The dual quaternion.
 * @param out - The matrix to store the result in.
 * @returns The transformation matrix.
 * @see {@link https://en.wikipedia.org/wiki/Dual_quaternion | Dual quaternion}
 * @see {@link https://en.wikipedia.org/wiki/Rotation_matrix | Rotation matrix}
 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
 * @public
 */
export const fromDualQuaternion = <T extends Matrix4Like>(
	quaternion: DualQuaternionLike,
	out: T
): T => {
	const bx = -quaternion[0];
	const by = -quaternion[1];
	const bz = -quaternion[2];
	const bw = quaternion[3];
	const ax = quaternion[4];
	const ay = quaternion[5];
	const az = quaternion[6];
	const aw = quaternion[7];

	const magnitude = bx * bx + by * by + bz * bz + bw * bw;
	return fromRotationTranslation(
		quaternion,
		magnitude > 0 ?
			vector3FromValues(
				((ax * bw + aw * bx + ay * bz - az * by) * 2) / magnitude,
				((ay * bw + aw * by + az * bx - ax * bz) * 2) / magnitude,
				((az * bw + aw * bz + ax * by - ay * bx) * 2) / magnitude,
				iv3
			)
		:	vector3FromValues(
				(ax * bw + aw * bx + ay * bz - az * by) * 2,
				(ay * bw + aw * by + az * bx - ax * bz) * 2,
				(az * bw + aw * bz + ax * by - ay * bx) * 2,
				iv3
			),
		out
	);
};

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
 * @see {@link https://en.wikipedia.org/wiki/Camera_matrix | Camera matrix}
 * @see {@link https://en.wikipedia.org/wiki/3D_projection | 3D projection}
 * @public
 */
export const frustum = <T extends Matrix4Like>(
	left: number,
	right: number,
	bottom: number,
	top: number,
	near: number,
	far: number,
	out: T
): T => {
	const rl = 1 / (right - left);
	const tb = 1 / (top - bottom);

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
	out[11] = -1;
	out[12] = 0;
	out[13] = 0;
	out[15] = 0;

	if (far === Infinity) {
		out[10] = -1;
		out[14] = -2 * near;
		return out;
	}

	const nf = 1 / (near - far);
	out[10] = (far + near) * nf;
	out[14] = 2 * far * near * nf;
	return out;
};

/**
 * Create a perspective projection matrix with the given bounds such that the near and far clip planes correspond to a normalized device coordinate Z range of `[-1, 1]` (OpenGL/WebGL).
 * @param fov - The vertical field of view in radians.
 * @param aspect - The aspect ratio (typically the width of the viewport divided by its height).
 * @param near - The near bound of the frustum. Must be strictly positive.
 * @param far - The far bound of the frustum.
 * @param out - The matrix to store the result in.
 * @returns The perspective projection matrix.
 * @see {@link https://en.wikipedia.org/wiki/Camera_matrix | Camera matrix}
 * @see {@link https://en.wikipedia.org/wiki/3D_projection | 3D projection}
 * @public
 */
export const perspective = <T extends Matrix4Like>(
	fov: number,
	aspect: number,
	near: number,
	far: number,
	out: T
): T => {
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
		return out;
	}

	const nf = 1 / (near - far);
	out[10] = (far + near) * nf;
	out[14] = 2 * far * near * nf;
	return out;
};

/**
 * Create a perspective projection matrix with the given bounds such that the near and far clip planes correspond to a normalized device coordinate Z range of `[0, 1]` (WebGPU/Vulkan/DirectX/Metal).
 * @param fov - The vertical field of view in radians.
 * @param aspect - The aspect ratio (typically the width of the viewport divided by its height).
 * @param near - The near bound of the frustum. Must be strictly positive.
 * @param far - The far bound of the frustum.
 * @param out - The matrix to store the result in.
 * @returns The perspective projection matrix.
 * @see {@link https://en.wikipedia.org/wiki/Camera_matrix | Camera matrix}
 * @see {@link https://en.wikipedia.org/wiki/3D_projection | 3D projection}
 * @public
 */
export const perspectiveGpu = <T extends Matrix4Like>(
	fov: number,
	aspect: number,
	near: number,
	far: number,
	out: T
): T => {
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
		out[14] = -near;
		return out;
	}

	const fnf = far * (1 / (near - far));
	out[10] = fnf;
	out[14] = near * fnf;
	return out;
};

/**
 * Create a perspective projection matrix from a field of view. Useful for generating projection matrices to be used with the WebXR API.
 * @param fov - The field of view.
 * @param near - The near bound of the frustum.
 * @param far - The far bound of the frustum.
 * @param out - The matrix to store the result in.
 * @returns The perspective projection matrix.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API | WebXR API}
 * @see {@link https://en.wikipedia.org/wiki/Camera_matrix | Camera matrix}
 * @see {@link https://en.wikipedia.org/wiki/3D_projection | 3D projection}
 * @public
 */
export const perspectiveFromFieldOfView = <T extends Matrix4Like>(
	fov: FieldOfView,
	near: number,
	far: number,
	out: T
): T => {
	const upTan = Math.tan(degreesToRadians(fov.upDegrees));
	const downTan = Math.tan(degreesToRadians(fov.downDegrees));
	const leftTan = Math.tan(degreesToRadians(fov.leftDegrees));
	const rightTan = Math.tan(degreesToRadians(fov.rightDegrees));
	const xScale = 2 / (leftTan + rightTan);
	const yScale = 2 / (upTan + downTan);
	const nf = near - far;

	return fromValues(
		xScale,
		0,
		0,
		0,
		0,
		yScale,
		0,
		0,
		-(((leftTan - rightTan) * xScale) / 2),
		((upTan - downTan) * yScale) / 2,
		far / nf,
		-1,
		0,
		0,
		(far * near) / nf,
		0,
		out
	);
};

/**
 * Generate an orthogonal projection matrix with the given bounds such that the near and far clip planes correspond to a normalized device coordinate Z range of `[-1, 1]` (OpenGL/WebGL).
 * @param left - The left bound of the frustum.
 * @param right - The right bound of the frustum.
 * @param bottom - The bottom bound of the frustum.
 * @param top - The top bound of the frustum.
 * @param near - The near bound of the frustum.
 * @param far - The far bound of the frustum.
 * @param out - The matrix to store the result in.
 * @returns The frustum matrix.
 * @see {@link https://en.wikipedia.org/wiki/Camera_matrix | Camera matrix}
 * @see {@link https://en.wikipedia.org/wiki/3D_projection | 3D projection}
 * @public
 */
export const ortho = <T extends Matrix4Like>(
	left: number,
	right: number,
	bottom: number,
	top: number,
	near: number,
	far: number,
	out: T
): T => {
	const lr = 1 / (left - right);
	const bt = 1 / (bottom - top);
	const nf = 1 / (near - far);

	return fromValues(
		-2 * lr,
		0,
		0,
		0,
		0,
		-2 * bt,
		0,
		0,
		0,
		0,
		2 * nf,
		0,
		(left + right) * lr,
		(top + bottom) * bt,
		(far + near) * nf,
		1,
		out
	);
};

/**
 * Generate an orthogonal projection matrix with the given bounds such that the near and far clip planes correspond to a normalized device coordinate Z range of `[0, 1]` (WebGPU/Vulkan/DirectX/Metal).
 * @param left - The left bound of the frustum.
 * @param right - The right bound of the frustum.
 * @param bottom - The bottom bound of the frustum.
 * @param top - The top bound of the frustum.
 * @param near - The near bound of the frustum.
 * @param far - The far bound of the frustum.
 * @param out - The matrix to store the result in.
 * @returns The frustum matrix.
 * @see {@link https://en.wikipedia.org/wiki/Camera_matrix | Camera matrix}
 * @see {@link https://en.wikipedia.org/wiki/3D_projection | 3D projection}
 * @public
 */
export const orthoGpu = <T extends Matrix4Like>(
	left: number,
	right: number,
	bottom: number,
	top: number,
	near: number,
	far: number,
	out: T
): T => {
	const lr = 1 / (left - right);
	const bt = 1 / (bottom - top);
	const nf = 1 / (near - far);

	return fromValues(
		-2 * lr,
		0,
		0,
		0,
		0,
		-2 * bt,
		0,
		0,
		0,
		0,
		nf,
		0,
		(left + right) * lr,
		(top + bottom) * bt,
		near * nf,
		1,
		out
	);
};

/**
 * Generate a look-at matrix. If you want a matrix that actually makes an object look at another object, use `targetTo` instead.
 * @param eye - The position of the viewer.
 * @param center - The point that the viewer is looking at.
 * @param up - The local up direction.
 * @param out - The matrix to store the result in.
 * @returns The look-at matrix.
 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
 * @public
 */
export const lookAt = <T extends Matrix4Like>(
	eye: Vector3Like,
	center: Vector3Like,
	up: Vector3Like,
	out: T
): T => {
	const eyex = eye[0];
	const eyey = eye[1];
	const eyez = eye[2];

	const upx = up[0];
	const upy = up[1];
	const upz = up[2];

	const centerx = center[0];
	const centery = center[1];
	const centerz = center[2];

	if (approx(eyex, centerx) && approx(eyey, centery) && approx(eyez, centerz)) {
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
	if (len) {
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
	if (len) {
		len = 1 / len;
		y0 *= len;
		y1 *= len;
		y2 *= len;
	} else {
		y0 = 0;
		y1 = 0;
		y2 = 0;
	}

	return fromValues(
		x0,
		y0,
		z0,
		0,
		x1,
		y1,
		z1,
		0,
		x2,
		y2,
		z2,
		0,
		-(x0 * eyex + x1 * eyey + x2 * eyez),
		-(y0 * eyex + y1 * eyey + y2 * eyez),
		-(z0 * eyex + z1 * eyey + z2 * eyez),
		1,
		out
	);
};

/**
 * Create a matrix that makes something look at something else.
 * @param eye - The position of the viewer.
 * @param target - The point that the viewer is looking at.
 * @param up - The local up direction.
 * @param out - The matrix to store the result in.
 * @returns The transformation matrix.
 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
 * @public
 */
export const targetTo = <T extends Matrix4Like>(
	eye: Vector3Like,
	target: Vector3Like,
	up: Vector3Like,
	out: T
): T => {
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
	if (len) {
		len = 1 / Math.sqrt(len);
		z0 *= len;
		z1 *= len;
		z2 *= len;
	}

	let x0 = upy * z2 - upz * z1;
	let x1 = upz * z0 - upx * z2;
	let x2 = upx * z1 - upy * z0;
	len = x0 * x0 + x1 * x1 + x2 * x2;
	if (len) {
		len = 1 / Math.sqrt(len);
		x0 *= len;
		x1 *= len;
		x2 *= len;
	}

	return fromValues(
		x0,
		x1,
		x2,
		0,
		z1 * x2 - z2 * x1,
		z2 * x0 - z0 * x2,
		z0 * x1 - z1 * x0,
		0,
		z0,
		z1,
		z2,
		0,
		eyex,
		eyey,
		eyez,
		1,
		out
	);
};

/**
 * Add two matrices.
 * @param a - The augend.
 * @param b - The addend.
 * @param out - The matrix to store the result in.
 * @returns The sum.
 * @see {@link https://en.wikipedia.org/wiki/Matrix_addition | Matrix addition}
 * @public
 */
export const add = <T extends Matrix4Like>(
	a: Matrix4Like,
	b: Matrix4Like,
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
		a[8] + b[8],
		a[9] + b[8],
		a[10] + b[10],
		a[11] + b[11],
		a[12] + b[12],
		a[13] + b[13],
		a[14] + b[14],
		a[15] + b[15],
		out
	);

/**
 * Determine whether or not two matrices are roughly equivalent.
 * @param a - The first matrix.
 * @param b - The second matrix.
 * @returns Whether or not the matrices are equivalent.
 * @public
 */
export const equals = (a: Matrix4Like, b: Matrix4Like): boolean =>
	approxRelative(a[0], b[0]) &&
	approxRelative(a[1], b[1]) &&
	approxRelative(a[2], b[2]) &&
	approxRelative(a[3], b[3]) &&
	approxRelative(a[4], b[4]) &&
	approxRelative(a[5], b[5]) &&
	approxRelative(a[6], b[6]) &&
	approxRelative(a[7], b[7]) &&
	approxRelative(a[8], b[8]) &&
	approxRelative(a[9], b[9]) &&
	approxRelative(a[10], b[10]) &&
	approxRelative(a[11], b[11]) &&
	approxRelative(a[12], b[12]) &&
	approxRelative(a[13], b[13]) &&
	approxRelative(a[14], b[14]) &&
	approxRelative(a[15], b[15]);

/**
 * Determine whether or not two matrices are exactly equivalent.
 * @param a - The first matrix.
 * @param b - The second matrix.
 * @returns Whether the matrices are equivalent.
 * @public
 */
export const exactEquals = (a: Matrix4Like, b: Matrix4Like): boolean =>
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
	a[15] === b[15];

/**
 * Calculate the adjugate of a matrix.
 * @param matrix - The matrix.
 * @param out - The matrix to store the result in.
 * @returns The adjugate of the matrix.
 * @see {@link https://en.wikipedia.org/wiki/Adjugate_matrix | Adjugate matrix}
 * @public
 */
export const adjoint = <T extends Matrix4Like>(
	matrix: Matrix4Like,
	out: T
): T => {
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

	return fromValues(
		a11 * b11 - a12 * b10 + a13 * b09,
		a02 * b10 - a01 * b11 - a03 * b09,
		a31 * b05 - a32 * b04 + a33 * b03,
		a22 * b04 - a21 * b05 - a23 * b03,
		a12 * b08 - a10 * b11 - a13 * b07,
		a00 * b11 - a02 * b08 + a03 * b07,
		a32 * b02 - a30 * b05 - a33 * b01,
		a20 * b05 - a22 * b02 + a23 * b01,
		a10 * b10 - a11 * b08 + a13 * b06,
		a01 * b08 - a00 * b10 - a03 * b06,
		a30 * b04 - a31 * b02 + a33 * b00,
		a21 * b02 - a20 * b04 - a23 * b00,
		a11 * b07 - a10 * b09 - a12 * b06,
		a00 * b09 - a01 * b07 + a02 * b06,
		a31 * b01 - a30 * b03 - a32 * b00,
		a20 * b03 - a21 * b01 + a22 * b00,
		out
	);
};

/**
 * Copy the values of one matrix into another.
 * @param matrix - The matrix to copy.
 * @param out - The matrix to store the result in.
 * @returns This matrix.
 * @public
 */
export const copy = <T extends Matrix4Like>(matrix: Matrix4Like, out: T): T =>
	fromValues(
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
		matrix[15],
		out
	);

/**
 * Calculate the Frobenius norm of a matrix.
 * @param matrix - The matrix.
 * @returns The Frobenius norm.
 * @see {@link https://en.wikipedia.org/wiki/Matrix_norm | Matrix norm}
 * @public
 */
export const frob = (matrix: Matrix4Like): number =>
	Math.hypot(
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

/**
 * Multiply two matrices.
 * @param a - The multiplier.
 * @param b - The multiplicand.
 * @param out - The matrix to store the result in.
 * @returns The product.
 * @see {@link https://en.wikipedia.org/wiki/Matrix_multiplication | Matrix multiplication}
 * @public
 */
export const multiply = <T extends Matrix4Like>(
	a: Matrix4Like,
	b: Matrix4Like,
	out: T
): T => {
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

	const b00 = b[0];
	const b01 = b[1];
	const b02 = b[2];
	const b03 = b[3];
	const b10 = b[4];
	const b11 = b[5];
	const b12 = b[6];
	const b13 = b[7];
	const b20 = b[8];
	const b21 = b[9];
	const b22 = b[10];
	const b23 = b[11];
	const b30 = b[12];
	const b31 = b[13];
	const b32 = b[14];
	const b33 = b[15];

	return fromValues(
		b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
		b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
		b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
		b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
		b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
		b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
		b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
		b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
		b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
		b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
		b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
		b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
		b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
		b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
		b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
		b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
		out
	);
};

/**
 * Multiply a matrix by a scalar value.
 * @param matrix - The multiplicand.
 * @param scalar - The multiplier.
 * @param out - The matrix to store the result in.
 * @returns The product.
 * @see {@link https://en.wikipedia.org/wiki/Matrix_multiplication | Matrix multiplication}
 * @public
 */
export const multiplyScalar = <T extends Matrix4Like>(
	matrix: Matrix4Like,
	scalar: number,
	out: T
): T =>
	fromValues(
		matrix[0] * scalar,
		matrix[1] * scalar,
		matrix[2] * scalar,
		matrix[3] * scalar,
		matrix[4] * scalar,
		matrix[5] * scalar,
		matrix[6] * scalar,
		matrix[7] * scalar,
		matrix[8] * scalar,
		matrix[9] * scalar,
		matrix[10] * scalar,
		matrix[11] * scalar,
		matrix[12] * scalar,
		matrix[13] * scalar,
		matrix[14] * scalar,
		matrix[15] * scalar,
		out
	);

/**
 * Add a matrix to another after multiplying the other by a scalar.
 * @param a - The augend.
 * @param b - The addend.
 * @param scalar - The multiplier.
 * @param out - The matrix to store the result in.
 * @returns The sum.
 * @see {@link https://en.wikipedia.org/wiki/Matrix_addition | Matrix addition}
 * @see {@link https://en.wikipedia.org/wiki/Matrix_multiplication | Matrix multiplication}
 * @public
 */
export const multiplyScalarAndAdd = <T extends Matrix4Like>(
	a: Matrix4Like,
	b: Matrix4Like,
	scalar: number,
	out: T
): T =>
	fromValues(
		a[0] + b[0] * scalar,
		a[1] + b[1] * scalar,
		a[2] + b[2] * scalar,
		a[3] + b[3] * scalar,
		a[4] + b[4] * scalar,
		a[5] + b[5] * scalar,
		a[6] + b[6] * scalar,
		a[7] + b[7] * scalar,
		a[8] + b[8] * scalar,
		a[9] + b[9] * scalar,
		a[10] + b[10] * scalar,
		a[11] + b[11] * scalar,
		a[12] + b[12] * scalar,
		a[13] + b[13] * scalar,
		a[14] + b[14] * scalar,
		a[15] + b[15] * scalar,
		out
	);

/**
 * Subtract two matrices.
 * @param a - The minuend.
 * @param b - The subtrahend.
 * @param out - The matrix to store the result in.
 * @returns The difference.
 * @see {@link https://en.wikipedia.org/wiki/Matrix_addition | Matrix addition}
 * @public
 */
export const subtract = <T extends Matrix4Like>(
	a: Matrix4Like,
	b: Matrix4Like,
	out: T
): T =>
	fromValues(
		a[0] - b[0],
		a[1] - b[1],
		a[2] - b[2],
		a[3] - b[3],
		a[4] - b[4],
		a[5] - b[5],
		a[6] - b[6],
		a[7] - b[7],
		a[8] - b[8],
		a[9] - b[8],
		a[10] - b[10],
		a[11] - b[11],
		a[12] - b[12],
		a[13] - b[13],
		a[14] - b[14],
		a[15] - b[15],
		out
	);

/**
 * Transpose a matrix.
 * @param matrix - The matrix.
 * @param out - The matrix to store the result in.
 * @returns The transpose.
 * @see {@link https://en.wikipedia.org/wiki/Transpose | Transpose}
 * @public
 */
export const transpose = <T extends Matrix4Like>(
	matrix: Matrix4Like,
	out: T
): T => {
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
		return out;
	}

	return fromValues(
		matrix[0],
		matrix[4],
		matrix[8],
		matrix[12],
		matrix[1],
		matrix[5],
		matrix[9],
		matrix[13],
		matrix[2],
		matrix[6],
		matrix[10],
		matrix[14],
		matrix[3],
		matrix[7],
		matrix[11],
		matrix[15],
		out
	);
};

/**
 * Calculate the determinant of a matrix.
 * @param matrix - The matrix.
 * @returns The determinant.
 * @see {@link https://en.wikipedia.org/wiki/Determinant | Determinant}
 * @public
 */
export const determinant = (matrix: Matrix4Like): number => {
	const a00 = matrix[0];
	const a01 = matrix[1];
	const a02 = matrix[2];
	const a10 = matrix[4];
	const a11 = matrix[5];
	const a12 = matrix[6];
	const a20 = matrix[8];
	const a21 = matrix[9];
	const a22 = matrix[10];
	const a30 = matrix[12];
	const a31 = matrix[13];
	const a32 = matrix[14];

	const b0 = a00 * a11 - a01 * a10;
	const b1 = a00 * a12 - a02 * a10;
	const b2 = a01 * a12 - a02 * a11;
	const b3 = a20 * a31 - a21 * a30;
	const b4 = a20 * a32 - a22 * a30;
	const b5 = a21 * a32 - a22 * a31;

	return (
		matrix[7] * (a00 * b5 - a01 * b4 + a02 * b3) -
		matrix[3] * (a10 * b5 - a11 * b4 + a12 * b3) +
		matrix[15] * (a20 * b2 - a21 * b1 + a22 * b0) -
		matrix[11] * (a30 * b2 - a31 * b1 + a32 * b0)
	);
};

/**
 * Invert a matrix.
 * @param matrix - The matrix.
 * @param out - The matrix to store the result in.
 * @returns The inverted matrix.
 * @see {@link https://en.wikipedia.org/wiki/Invertible_matrix | Invertible matrix}
 * @public
 */
export const invert = <T extends Matrix4Like>(
	matrix: Matrix4Like,
	out: T
): T => {
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

	return fromValues(
		(a11 * b11 - a12 * b10 + a13 * b09) * det,
		(a02 * b10 - a01 * b11 - a03 * b09) * det,
		(a31 * b05 - a32 * b04 + a33 * b03) * det,
		(a22 * b04 - a21 * b05 - a23 * b03) * det,
		(a12 * b08 - a10 * b11 - a13 * b07) * det,
		(a00 * b11 - a02 * b08 + a03 * b07) * det,
		(a32 * b02 - a30 * b05 - a33 * b01) * det,
		(a20 * b05 - a22 * b02 + a23 * b01) * det,
		(a10 * b10 - a11 * b08 + a13 * b06) * det,
		(a01 * b08 - a00 * b10 - a03 * b06) * det,
		(a30 * b04 - a31 * b02 + a33 * b00) * det,
		(a21 * b02 - a20 * b04 - a23 * b00) * det,
		(a11 * b07 - a10 * b09 - a12 * b06) * det,
		(a00 * b09 - a01 * b07 + a02 * b06) * det,
		(a31 * b01 - a30 * b03 - a32 * b00) * det,
		(a20 * b03 - a21 * b01 + a22 * b00) * det,
		out
	);
};

/**
 * Scale a matrix by the given vector.
 * @param matrix - The matrix.
 * @param vector - The scaling vector.
 * @param out - The matrix to store the result in.
 * @returns The scaled matrix.
 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
 * @public
 */
export const scale = <T extends Matrix4Like>(
	matrix: Matrix4Like,
	vector: Vector3Like,
	out: T
): T => {
	const x = vector[0];
	const y = vector[1];
	const z = vector[2];

	return fromValues(
		matrix[0] * x,
		matrix[1] * x,
		matrix[2] * x,
		matrix[3] * x,
		matrix[4] * y,
		matrix[5] * y,
		matrix[6] * y,
		matrix[7] * y,
		matrix[8] * z,
		matrix[9] * z,
		matrix[10] * z,
		matrix[11] * z,
		matrix[12],
		matrix[13],
		matrix[14],
		matrix[15],
		out
	);
};

/**
 * Translate a matrix by the given vector.
 * @param matrix - The matrix.
 * @param vector - The translation vector.
 * @param out - The matrix to store the result in.
 * @returns The translated matrix.
 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
 * @public
 */
export const translate = <T extends Matrix4Like>(
	matrix: Matrix4Like,
	vector: Vector3Like,
	out: T
): T => {
	const x = vector[0];
	const y = vector[1];
	const z = vector[2];

	if (out === matrix) {
		out[12] = matrix[0] * x + matrix[4] * y + matrix[8] * z + matrix[12];
		out[13] = matrix[1] * x + matrix[5] * y + matrix[9] * z + matrix[13];
		out[14] = matrix[2] * x + matrix[6] * y + matrix[10] * z + matrix[14];
		out[15] = matrix[3] * x + matrix[7] * y + matrix[11] * z + matrix[15];
		return out;
	}

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

	return fromValues(
		a00,
		a01,
		a02,
		a03,
		a10,
		a11,
		a12,
		a13,
		a20,
		a21,
		a22,
		a23,
		a00 * x + a10 * y + a20 * z + matrix[12],
		a01 * x + a11 * y + a21 * z + matrix[13],
		a02 * x + a12 * y + a22 * z + matrix[14],
		a03 * x + a13 * y + a23 * z + matrix[15],
		out
	);
};

/**
 * Rotate a matrix by the given angle around the given axis.
 * @param matrix - The matrix.
 * @param radians - The angle in radians.
 * @param axis - The axis.
 * @param out - The matrix to store the result in.
 * @returns The rotated matrix.
 * @see {@link https://en.wikipedia.org/wiki/Rotation_matrix | Rotation matrix}
 * @public
 */
export const rotate = <T extends Matrix4Like>(
	matrix: Matrix4Like,
	radians: number,
	axis: Vector3Like,
	out: T
): T => {
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

	const xs = x * s;
	const ys = y * s;
	const zs = z * s;

	const xt = x * t;
	const yt = y * t;
	const zt = z * t;

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

	const b00 = x * xt + c;
	const b01 = y * xt + zs;
	const b02 = z * xt - ys;
	const b10 = x * yt - zs;
	const b11 = y * yt + c;
	const b12 = z * yt + xs;
	const b20 = x * zt + ys;
	const b21 = y * zt - xs;
	const b22 = z * zt + c;

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
};

/**
 * Rotate a matrix by the given angle around the X-axis.
 * @param matrix - The matrix.
 * @param r - The angle in radians.
 * @param out - The matrix to store the result in.
 * @returns The rotated matrix.
 * @see {@link https://en.wikipedia.org/wiki/Rotation_matrix | Rotation matrix}
 * @public
 */
export const rotateX = <T extends Matrix4Like>(
	matrix: Matrix4Like,
	r: number,
	out: T
): T => {
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
};

/**
 * Rotate a matrix by the given angle around the Y-axis.
 * @param matrix - The matrix.
 * @param r - The angle in radians.
 * @param out - The matrix to store the result in.
 * @returns The rotated matrix.
 * @see {@link https://en.wikipedia.org/wiki/Rotation_matrix | Rotation matrix}
 * @public
 */
export const rotateY = <T extends Matrix4Like>(
	matrix: Matrix4Like,
	r: number,
	out: T
): T => {
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
};

/**
 * Rotate a matrix by the given angle around the Z-axis.
 * @param matrix - The matrix.
 * @param r - The angle in radians.
 * @param out - The matrix to store the result in.
 * @returns The rotated matrix.
 * @see {@link https://en.wikipedia.org/wiki/Rotation_matrix | Rotation matrix}
 * @public
 */
export const rotateZ = <T extends Matrix4Like>(
	matrix: Matrix4Like,
	r: number,
	out: T
): T => {
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
};

/**
 * Get the translation vector component of a transformation matrix.
 * @param matrix - The matrix.
 * @param out - The vector to store the result in.
 * @returns The translation vector.
 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
 * @public
 */
export const getTranslation = <T extends Vector3Like>(
	matrix: Matrix4Like,
	out: T
): T => vector3FromValues(matrix[12], matrix[13], matrix[14], out);

/**
 * Set the translation vector component of a transformation matrix.
 * @param matrix - The matrix.
 * @param translation - The translation vector.
 * @param out - The matrix to store the result in.
 * @returns The transformation matrix.
 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
 * @public
 */
export const setTranslation = <T extends Matrix4Like>(
	matrix: Matrix4Like,
	translation: Vector3Like,
	out: T
): T => {
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
};

/**
 * Get the scaling factor of a transformation matrix.
 * @param matrix - The matrix.
 * @param out - The vector to store the result in.
 * @returns The scaling vector.
 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
 * @public
 */
export const getScaling = <T extends Vector3Like>(
	matrix: Matrix4Like,
	out: T
): T =>
	vector3FromValues(
		Math.hypot(matrix[0], matrix[1], matrix[2]),
		Math.hypot(matrix[4], matrix[5], matrix[6]),
		Math.hypot(matrix[8], matrix[9], matrix[10]),
		out
	);

/**
 * Get the rotational component of a transformation matrix.
 * @param matrix - The matrix.
 * @param out - The quaternion to store the result in.
 * @returns The rotation.
 * @see {@link https://en.wikipedia.org/wiki/Rotation_matrix | Rotation matrix}
 * @public
 */
export const getRotation = <T extends QuaternionLike>(
	matrix: Matrix4Like,
	out: T
): T => {
	getScaling(matrix, iv3);

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

	if (trace > 0) {
		const s = Math.sqrt(trace + 1) * 2;
		return quaternionFromValues(
			(sm23 - sm32) / s,
			(sm31 - sm13) / s,
			(sm12 - sm21) / s,
			0.25 * s,
			out
		);
	}

	if (sm11 > sm22 && sm11 > sm33) {
		const s = Math.sqrt(1 + sm11 - sm22 - sm33) * 2;
		return quaternionFromValues(
			0.25 * s,
			(sm12 + sm21) / s,
			(sm31 + sm13) / s,
			(sm23 - sm32) / s,
			out
		);
	}

	if (sm22 > sm33) {
		const s = Math.sqrt(1 + sm22 - sm11 - sm33) * 2;
		return quaternionFromValues(
			(sm12 + sm21) / s,
			0.25 * s,
			(sm23 + sm32) / s,
			(sm31 - sm13) / s,
			out
		);
	}

	const s = Math.sqrt(1 + sm33 - sm11 - sm22) * 2;
	return quaternionFromValues(
		(sm31 + sm13) / s,
		(sm23 + sm32) / s,
		0.25 * s,
		(sm12 - sm21) / s,
		out
	);
};

/**
 * A four-by-four matrix.
 * @see {@link https://en.wikipedia.org/wiki/Matrix_(mathematics) | Matrix}
 * @public
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
	 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
	 */
	public static fromTranslation(vector: Vector3Like): Matrix4 {
		return fromTranslation(vector, new Matrix4());
	}

	/**
	 * Create a transformation matrix that represents a scaling by the given vector.
	 * @param vector - The scaling vector.
	 * @param out - The matrix to store the result in.
	 * @returns The transformation matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
	 */
	public static fromScaling(vector: Vector3Like): Matrix4 {
		return fromScaling(vector, new Matrix4());
	}

	/**
	 * Create a transformation matrix that represents a rotation by the given angle around the Z-axis.
	 * @param r - The angle in radians.
	 * @param axis - The axis to rotate around.
	 * @param out - The matrix to store the result in.
	 * @returns The transformation matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Rotation_matrix | Rotation matrix}
	 */
	public static fromRotation(r: number, axis: Vector3Like): Matrix4 {
		return fromRotation(r, axis, new Matrix4());
	}

	/**
	 * Create a transformation matrix that represents a rotation by the given angle around the X-axis.
	 * @param r - The angle in radians.
	 * @param out - The matrix to store the result in.
	 * @returns The transformation matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Rotation_matrix | Rotation matrix}
	 */
	public static fromXRotation(r: number): Matrix4 {
		return fromXRotation(r, new Matrix4());
	}

	/**
	 * Create a transformation matrix that represents a rotation by the given angle around the Y-axis.
	 * @param r - The angle in radians.
	 * @param out - The matrix to store the result in.
	 * @returns The transformation matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Rotation_matrix | Rotation matrix}
	 */
	public static fromYRotation(r: number): Matrix4 {
		return fromYRotation(r, new Matrix4());
	}

	/**
	 * Create a transformation matrix that represents a rotation by the given angle around the Z-axis.
	 * @param r - The angle in radians.
	 * @param out - The matrix to store the result in.
	 * @returns The transformation matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Rotation_matrix | Rotation matrix}
	 */
	public static fromZRotation(r: number): Matrix4 {
		return fromZRotation(r, new Matrix4());
	}

	/**
	 * Create a transformation matrix from the given rotation and translation.
	 * @param rotation - The rotation quaternion.
	 * @param translation - The translation vector.
	 * @param out - The matrix to store the result in.
	 * @returns The transformation matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Rotation_matrix | Rotation matrix}
	 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
	 */
	public static fromRotationTranslation(
		rotation: QuaternionLike,
		translation: Vector3Like
	): Matrix4 {
		return fromRotationTranslation(rotation, translation, new Matrix4());
	}

	/**
	 * Create a transformation matrix from the given rotation, translation, and scale.
	 * @param rotation - The rotation quaternion.
	 * @param translation - The translation vector.
	 * @param scaling - The scaling vector.
	 * @param out - The matrix to store the result in.
	 * @returns The transformation matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Rotation_matrix | Rotation matrix}
	 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
	 */
	public static fromRotationTranslationScale(
		rotation: QuaternionLike,
		translation: Vector3Like,
		scaling: Vector3Like
	): Matrix4 {
		return fromRotationTranslationScale(
			rotation,
			translation,
			scaling,
			new Matrix4()
		);
	}

	/**
	 * Create a transformation matrix from the given rotation, translation, and scale around the given origin.
	 * @param rotation - The rotation quaternion.
	 * @param translation - The translation vector.
	 * @param scaling - The scaling vector.
	 * @param origin - The origin vector.
	 * @param out - The matrix to store the result in.
	 * @returns The transformation matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Rotation_matrix | Rotation matrix}
	 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
	 */
	public static fromRotationTranslationScaleOrigin(
		rotation: QuaternionLike,
		translation: Vector3Like,
		scaling: Vector3Like,
		origin: Vector3Like
	): Matrix4 {
		return fromRotationTranslationScaleOrigin(
			rotation,
			translation,
			scaling,
			origin,
			new Matrix4()
		);
	}

	/**
	 * Create a transformation matrix from a dual quaternion.
	 * @param quaternion - The dual quaternion.
	 * @param out - The matrix to store the result in.
	 * @returns The transformation matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Dual_quaternion | Dual quaternion}
	 * @see {@link https://en.wikipedia.org/wiki/Rotation_matrix | Rotation matrix}
	 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
	 */
	public static fromDualQuaternion(quaternion: DualQuaternionLike): Matrix4 {
		return fromDualQuaternion(quaternion, new Matrix4());
	}

	/**
	 * Create a transformation matrix from a quaternion.
	 * @param quaternion - The quaternion.
	 * @param out - The matrix to store the result in.
	 * @returns The transformation matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Rotation_matrix | Rotation matrix}
	 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
	 */
	public static fromQuaternion(quaternion: QuaternionLike): Matrix4 {
		return fromQuaternion(quaternion, new Matrix4());
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
	 * @see {@link https://en.wikipedia.org/wiki/Camera_matrix | Camera matrix}
	 * @see {@link https://en.wikipedia.org/wiki/3D_projection | 3D projection}
	 */
	public static frustum(
		left: number,
		right: number,
		bottom: number,
		top: number,
		near: number,
		far: number
	): Matrix4 {
		return frustum(left, right, bottom, top, near, far, new Matrix4());
	}

	/**
	 * Create a perspective projection matrix with the given bounds such that the near and far clip planes correspond to a normalized device coordinate Z range of `[-1, 1]` (OpenGL/WebGL).
	 * @param fov - The vertical field of view in radians.
	 * @param aspect - The aspect ratio (typically the width of the viewport divided by its height).
	 * @param near - The near bound of the frustum.
	 * @param far - The far bound of the frustum.
	 * @param out - The matrix to store the result in.
	 * @returns The perspective projection matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Camera_matrix | Camera matrix}
	 * @see {@link https://en.wikipedia.org/wiki/3D_projection | 3D projection}
	 */
	public static perspective(
		fov: number,
		aspect: number,
		near: number,
		far: number
	): Matrix4 {
		return perspective(fov, aspect, near, far, new Matrix4());
	}

	/**
	 * Create a perspective projection matrix with the given bounds such that the near and far clip planes correspond to a normalized device coordinate Z range of `[0, 1]` (WebGPU/Vulkan/DirectX/Metal).
	 * @param fov - The vertical field of view in radians.
	 * @param aspect - The aspect ratio (typically the width of the viewport divided by its height).
	 * @param near - The near bound of the frustum.
	 * @param far - The far bound of the frustum.
	 * @param out - The matrix to store the result in.
	 * @returns The perspective projection matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Camera_matrix | Camera matrix}
	 * @see {@link https://en.wikipedia.org/wiki/3D_projection | 3D projection}
	 */
	public static perspectiveGpu(
		fov: number,
		aspect: number,
		near: number,
		far: number
	): Matrix4 {
		return perspectiveGpu(fov, aspect, near, far, new Matrix4());
	}

	/**
	 * Create a perspective projection matrix from a field of view. Useful for generating projection matrices to be used with the WebXR API.
	 * @param fov - The field of view.
	 * @param near - The near bound of the frustum.
	 * @param far - The far bound of the frustum.
	 * @param out - The matrix to store the result in.
	 * @returns The perspective projection matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Camera_matrix | Camera matrix}
	 * @see {@link https://en.wikipedia.org/wiki/3D_projection | 3D projection}
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API | WebXR API}
	 */
	public static perspectiveFromFieldOfView(
		fov: FieldOfView,
		near: number,
		far: number
	): Matrix4 {
		return perspectiveFromFieldOfView(fov, near, far, new Matrix4());
	}

	/**
	 * Generate an orthogonal projection matrix with the given bounds such that the near and far clip planes correspond to a normalized device coordinate Z range of `[-1, 1]` (OpenGL/WebGL).
	 * @param left - The left bound of the frustum.
	 * @param right - The right bound of the frustum.
	 * @param bottom - The bottom bound of the frustum.
	 * @param top - The top bound of the frustum.
	 * @param near - The near bound of the frustum.
	 * @param far - The far bound of the frustum.
	 * @param out - The matrix to store the result in.
	 * @returns The frustum matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Camera_matrix | Camera matrix}
	 * @see {@link https://en.wikipedia.org/wiki/3D_projection | 3D projection}
	 */
	public static ortho(
		left: number,
		right: number,
		bottom: number,
		top: number,
		near: number,
		far: number
	): Matrix4 {
		return ortho(left, right, bottom, top, near, far, new Matrix4());
	}

	/**
	 * Generate an orthogonal projection matrix with the given bounds such that the near and far clip planes correspond to a normalized device coordinate Z range of `[0, 1]` (WebGPU/Vulkan/DirectX/Metal).
	 * @param left - The left bound of the frustum.
	 * @param right - The right bound of the frustum.
	 * @param bottom - The bottom bound of the frustum.
	 * @param top - The top bound of the frustum.
	 * @param near - The near bound of the frustum.
	 * @param far - The far bound of the frustum.
	 * @param out - The matrix to store the result in.
	 * @returns The frustum matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Camera_matrix | Camera matrix}
	 * @see {@link https://en.wikipedia.org/wiki/3D_projection | 3D projection}
	 */
	public static orthoGpu(
		left: number,
		right: number,
		bottom: number,
		top: number,
		near: number,
		far: number
	): Matrix4 {
		return orthoGpu(left, right, bottom, top, near, far, new Matrix4());
	}

	/**
	 * Generate a look-at matrix. If you want a matrix that actually makes an object look at another object, use `targetTo` instead.
	 * @param eye - The position of the viewer.
	 * @param center - The point that the viewer is looking at.
	 * @param up - The local up direction.
	 * @param out - The matrix to store the result in.
	 * @returns The look-at matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
	 */
	public static lookAt(
		eye: Vector3Like,
		center: Vector3Like,
		up: Vector3Like = [0, 1, 0]
	): Matrix4 {
		return lookAt(eye, center, up, new Matrix4());
	}

	/**
	 * Create a matrix that makes something look at something else.
	 * @param eye - The position of the viewer.
	 * @param target - The point that the viewer is looking at.
	 * @param up - The local up direction.
	 * @param out - The matrix to store the result in.
	 * @returns The transformation matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
	 */
	public static targetTo(
		eye: Vector3Like,
		target: Vector3Like,
		up: Vector3Like = [0, 1, 0]
	): Matrix4 {
		return targetTo(eye, target, up, new Matrix4());
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
	public static fromValues(
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
		c3r3: number
	): Matrix4 {
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
			new Matrix4()
		);
	}

	/**
	 * Create a four-by-four identity matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Identity_matrix | Identity matrix}
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
	public equals(matrix: Matrix4Like): boolean {
		return equals(this, matrix);
	}

	/**
	 * Determine whether or not this matrix is exactly equivalent to another.
	 * @param matrix - The other matrix.
	 * @returns Whether or not the matrices are equivalent.
	 */
	public exactEquals(matrix: Matrix4Like): boolean {
		return exactEquals(this, matrix);
	}

	/**
	 * Add two matrices of the same size.
	 * @param matrix - The other matrix.
	 * @param out - The matrix to store the result in.
	 * @returns The sum of the matrices.
	 * @see {@link https://en.wikipedia.org/wiki/Matrix_addition | Matrix addition}
	 */
	public add(matrix: Matrix4Like): Matrix4 {
		return add(this, matrix, new Matrix4());
	}

	/**
	 * Calculate the adjugate of this matrix.
	 * @param out - The matrix to store the result in.
	 * @returns The adjugate of this matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Adjugate_matrix | Adjugate matrix}
	 */
	public adjoint(): Matrix4 {
		return adjoint(this, new Matrix4());
	}

	/**
	 * Copy the values from this matrix to another one.
	 * @param out - The matrix to store the result in.
	 * @returns The copy.
	 */
	public clone(): Matrix4 {
		return copy(this, new Matrix4());
	}

	/**
	 * Copy the values of another matrix into this one.
	 * @param matrix - The matrix to copy.
	 * @returns This matrix.
	 */
	public copy(matrix: Matrix4Like): this {
		return copy(matrix, this);
	}

	/**
	 * Get the Frobenius norm of this matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Matrix_norm | Matrix norm}
	 */
	public get frob(): number {
		return frob(this);
	}

	/**
	 * Multiply this matrix by another.
	 * @param matrix - The other matrix.
	 * @param out - The matrix to store the result in.
	 * @returns The product of the matrices.
	 * @see {@link https://en.wikipedia.org/wiki/Matrix_multiplication | Matrix multiplication}
	 */
	public multiply(matrix: Matrix4Like): Matrix4 {
		return multiply(this, matrix, new Matrix4());
	}

	/**
	 * Multiply this matrix by a scalar value.
	 * @param scalar - The scalar value.
	 * @param out - The matrix to store the result in.
	 * @returns The product of the matrix and the scalar value.
	 * @see {@link https://en.wikipedia.org/wiki/Matrix_multiplication | Matrix multiplication}
	 */
	public multiplyScalar(scalar: number): Matrix4 {
		return multiplyScalar(this, scalar, new Matrix4());
	}

	/**
	 * Add this matrix to another after multiplying the other by a scalar.
	 * @param matrix - The other matrix.
	 * @param scalar - The scalar.
	 * @param out - The matrix to store the result in.
	 * @returns The sum.
	 * @see {@link https://en.wikipedia.org/wiki/Matrix_addition | Matrix addition}
	 * @see {@link https://en.wikipedia.org/wiki/Matrix_multiplication | Matrix multiplication}
	 */
	public multiplyScalarAndAdd(matrix: Matrix4Like, scalar: number): Matrix4 {
		return multiplyScalarAndAdd(this, matrix, scalar, new Matrix4());
	}

	/**
	 * Subtract another matrix from this one.
	 * @param matrix - The other matrix.
	 * @param out - The matrix to store the result in.
	 * @returns The difference between the matrices.
	 * @see {@link https://en.wikipedia.org/wiki/Matrix_addition | Matrix addition}
	 */
	public subtract(matrix: Matrix4Like): Matrix4 {
		return subtract(this, matrix, new Matrix4());
	}

	/**
	 * Transpose this matrix.
	 * @param out - The matrix to store the result in.
	 * @returns The transpose of this matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Transpose | Transpose}
	 */
	public transpose(): Matrix4 {
		return transpose(this, new Matrix4());
	}

	/**
	 * Get the determinant of this matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Determinant | Determinant}
	 */
	public get determinant(): number {
		return determinant(this);
	}

	/**
	 * Reset this matrix to identity.
	 * @returns This matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Identity_matrix | Identity matrix}
	 */
	public identity(): this {
		return identity(this);
	}

	/**
	 * Invert this matrix.
	 * @param out - The matrix to store the result in.
	 * @returns The inverted matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Invertible_matrix | Invertible matrix}
	 */
	public invert(): Matrix4 {
		return invert(this, new Matrix4());
	}

	/**
	 * Scale this matrix by the given vector.
	 * @param vector - The scaling vector.
	 * @param out - The matrix to store the result in.
	 * @returns The scaled matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
	 */
	public scale(vector: Vector3Like): Matrix4 {
		return scale(this, vector, new Matrix4());
	}

	/**
	 * Translate this matrix by the given vector.
	 * @param vector - The translation vector.
	 * @param out - The matrix to store the result in.
	 * @returns The translated matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
	 */
	public translate(vector: Vector3Like): Matrix4 {
		return translate(this, vector, new Matrix4());
	}

	/**
	 * Rotate this matrix by the given angle around the given axis.
	 * @param r - The angle in radians.
	 * @param axis - The axis.
	 * @param out - The matrix to store the result in.
	 * @returns The rotated matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Rotation_matrix | Rotation matrix}
	 */
	public rotate(r: number, axis: Vector3Like): Matrix4 {
		return rotate(this, r, axis, new Matrix4());
	}

	/**
	 * Rotate this matrix by the given angle around the X-axis.
	 * @param r - The angle in radians.
	 * @param out - The matrix to store the result in.
	 * @returns The rotated matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Rotation_matrix | Rotation matrix}
	 */
	public rotateX(r: number): Matrix4 {
		return rotateX(this, r, new Matrix4());
	}

	/**
	 * Rotate this matrix by the given angle around the Y-axis.
	 * @param r - The angle in radians.
	 * @param out - The matrix to store the result in.
	 * @returns The rotated matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Rotation_matrix | Rotation matrix}
	 */
	public rotateY(r: number): Matrix4 {
		return rotateY(this, r, new Matrix4());
	}

	/**
	 * Rotate this matrix by the given angle around the Z-axis.
	 * @param r - The angle in radians.
	 * @param out - The matrix to store the result in.
	 * @returns The rotated matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Rotation_matrix | Rotation matrix}
	 */
	public rotateZ(r: number): Matrix4 {
		return rotateZ(this, r, new Matrix4());
	}

	/**
	 * Get the translation vector component of this transformation matrix.
	 * @param out - The vector to store the result in.
	 * @returns The translation.
	 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
	 */
	public getTranslation(): Vector3 {
		return getTranslation(this, new Vector3());
	}

	/**
	 * Set the translation vector component of this transformation matrix.
	 * @param translation - The translation vector.
	 * @param out - The matrix to store the result in.
	 * @returns The transformation matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
	 */
	public setTranslation(translation: Vector3Like): Matrix4 {
		return setTranslation(this, translation, new Matrix4());
	}

	/**
	 * Get the scaling vector component of this transformation matrix.
	 * @param out - The vector to store the result in.
	 * @returns The scaling.
	 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
	 */
	public getScaling(): Vector3 {
		return getScaling(this, new Vector3());
	}

	/**
	 * Get the scaling vector component of this transformation matrix.
	 * @param out - The quaternion to store the result in.
	 * @returns The rotation.
	 * @see {@link https://en.wikipedia.org/wiki/Rotation_matrix | Rotation matrix}
	 */
	public getRotation(): Quaternion {
		return getRotation(this, new Quaternion());
	}
}
