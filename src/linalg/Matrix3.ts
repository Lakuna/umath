import type { Matrix4Like } from "./Matrix4.js";
import type { MatrixLike } from "./Matrix.js";
import type { QuaternionLike } from "./Quaternion.js";
import SingularMatrixError from "../utility/SingularMatrixError.js";
import type SquareMatrix from "./SquareMatrix.js";
import type { Vector2Like } from "./Vector2.js";
import approxRelative from "../algorithms/approxRelative.js";

/**
 * Numbers arranged into three columns and three rows.
 * @see {@link https://en.wikipedia.org/wiki/Matrix_(mathematics) | Matrix}
 * @public
 */
export interface Matrix3Like extends MatrixLike {
	/** The value in the first column and first row. */
	0: number;

	/** The value in the first column and second row. */
	1: number;

	/** The value in the first column and third row. */
	2: number;

	/** The value in the second column and first row. */
	3: number;

	/** The value in the second column and second row. */
	4: number;

	/** The value in the second column and third row. */
	5: number;

	/** The value in the third column and first row. */
	6: number;

	/** The value in the third column and second row. */
	7: number;

	/** The value in the third column and third row. */
	8: number;
}

/**
 * Creates a three-by-three matrix-like object.
 * @returns A three-by-three matrix-like object.
 * @public
 */
export const createMatrix3Like = (): Float32Array & Matrix3Like => {
	return new Float32Array(9) as Float32Array & Matrix3Like;
};

/**
 * Create a three-by-three matrix with the given values.
 * @param c0r0 - The value in the first column and first row.
 * @param c0r1 - The value in the first column and second row.
 * @param c0r2 - The value in the first column and third row.
 * @param c1r0 - The value in the second column and first row.
 * @param c1r1 - The value in the second column and second row.
 * @param c1r2 - The value in the second column and third row.
 * @param c2r0 - The value in the third column and first row.
 * @param c2r1 - The value in the third column and second row.
 * @param c2r2 - The value in the third column and third row.
 * @param out - The matrix to store the result in.
 * @returns The matrix.
 * @public
 */
export const fromValues = <T extends Matrix3Like>(
	c0r0: number,
	c0r1: number,
	c0r2: number,
	c1r0: number,
	c1r1: number,
	c1r2: number,
	c2r0: number,
	c2r1: number,
	c2r2: number,
	out: T
): T => {
	out[0] = c0r0;
	out[1] = c0r1;
	out[2] = c0r2;
	out[3] = c1r0;
	out[4] = c1r1;
	out[5] = c1r2;
	out[6] = c2r0;
	out[7] = c2r1;
	out[8] = c2r2;
	return out;
};

/**
 * Create a transformation matrix that represents a rotation by the given angle around the Z-axis. Equivalent to (but faster than) `rotate(identity(out), r, out)`.
 * @param r - The angle in radians.
 * @param out - The matrix to store the result in.
 * @returns The transformation matrix.
 * @see {@link https://en.wikipedia.org/wiki/Rotation_matrix | Rotation matrix}
 * @public
 */
export const fromRotation = <T extends Matrix3Like>(r: number, out: T): T => {
	const s = Math.sin(r);
	const c = Math.cos(r);

	return fromValues(c, s, 0, -s, c, 0, 0, 0, 1, out);
};

/**
 * Create a transformation matrix that represents a scaling by the given vector. Equivalent to (but faster than) `scale(identity(out), vector, out)`.
 * @param vector - The scaling vector.
 * @param out - The matrix to store the result in.
 * @returns The transformation matrix.
 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
 * @public
 */
export const fromScaling = <T extends Matrix3Like>(
	vector: Vector2Like,
	out: T
): T => fromValues(vector[0], 0, 0, 0, vector[1], 0, 0, 0, 1, out);

/**
 * Create a transformation matrix that represents a translation by the given vector. Equivalent to (but faster than) `translate(identity(out), vector, out)`.
 * @param vector - The translation vector.
 * @param out - The matrix to store the result in.
 * @returns The transformation matrix.
 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
 * @public
 */
export const fromTranslation = <T extends Matrix3Like>(
	vector: Vector2Like,
	out: T
): T => fromValues(1, 0, 0, 0, 1, 0, vector[0], vector[1], 1, out);

/**
 * Create a transformation matrix that represents a rotation by the given quaternion.
 * @param quaternion - The quaternion.
 * @param out - The matrix to store the result in.
 * @returns The transformation matrix.
 * @see {@link https://en.wikipedia.org/wiki/Quaternion | Quaternion}
 * @see {@link https://en.wikipedia.org/wiki/Rotation_matrix | Rotation matrix}
 * @public
 */
export const fromQuaternion = <T extends Matrix3Like>(
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
		yx - wz,
		zx + wy,
		yx + wz,
		1 - xx - zz,
		zy - wx,
		zx - wy,
		zy + wx,
		1 - xx - yy,
		out
	);
};

/**
 * Create a transformation matrix that represents a rotation by the given z-y'-x" (intrinsic) Tait-Bryan angles.
 * @param z - The z (roll) angle.
 * @param y - The y (pitch) angle.
 * @param x - The x (yaw) angle.
 * @param out - The matrix to store the result in.
 * @returns The transformation matrix.
 * @see {@link https://en.wikipedia.org/wiki/Rotation_matrix | Rotation matrix}
 * @public
 */
export const fromEuler = <T extends Matrix3Like>(
	z: number,
	y: number,
	x: number,
	out: T
): T => {
	const cz = Math.cos(z);
	const sz = Math.sin(z);
	const sy = Math.sin(y);
	const cy = Math.cos(y);
	const sx = Math.sin(x);
	const cx = Math.cos(x);

	const sysz = sy * sz;
	const cysz = cy * sz;

	return fromValues(
		cz * cx,
		sysz * cx - cy * sx,
		cysz * cx + sy * sx,
		cz * sx,
		sysz * sx + cy * cx,
		cysz * sx - sy * cx,
		-sz,
		sy * cz,
		cy * cz,
		out
	);
};

/**
 * Calculate a three-by-three normal (inverse transpose) matrix from a four-by-four matrix.
 * @param matrix - The four-by-four matrix.
 * @param out - The matrix to store the result in.
 * @returns The normal matrix.
 * @see {@link https://en.wikipedia.org/wiki/Normal_matrix | Normal matrix}
 * @public
 */
export const normalFromMatrix4 = <T extends Matrix3Like>(
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
		(a12 * b08 - a10 * b11 - a13 * b07) * det,
		(a10 * b10 - a11 * b08 + a13 * b06) * det,
		(a02 * b10 - a01 * b11 - a03 * b09) * det,
		(a00 * b11 - a02 * b08 + a03 * b07) * det,
		(a01 * b08 - a00 * b10 - a03 * b06) * det,
		(a31 * b05 - a32 * b04 + a33 * b03) * det,
		(a32 * b02 - a30 * b05 - a33 * b01) * det,
		(a30 * b04 - a31 * b02 + a33 * b00) * det,
		out
	);
};

/**
 * Generate a two-dimensional projection matrix with the given bounds.
 * @param width - The width of the projection.
 * @param height - The height of the projection.
 * @param out - The matrix to store the result in.
 * @returns The projection matrix.
 * @see {@link https://en.wikipedia.org/wiki/Camera_matrix | Camera matrix}
 * @see {@link https://en.wikipedia.org/wiki/3D_projection | 3D projection}
 * @public
 */
export const projection = <T extends Matrix3Like>(
	width: number,
	height: number,
	out: T
): T => fromValues(2 / width, 0, 0, 0, -2 / height, 0, -1, 1, 1, out);

/**
 * Create a three-by-three matrix from the upper-left corner of a four-by-four matrix.
 * @param matrix - The four-by-four matrix.
 * @param out - The matrix to store the result in.
 * @returns The three-by-three matrix.
 * @public
 */
export const fromMatrix4 = <T extends Matrix3Like>(
	matrix: Matrix4Like,
	out: T
): T =>
	fromValues(
		matrix[0],
		matrix[1],
		matrix[2],
		matrix[4],
		matrix[5],
		matrix[6],
		matrix[8],
		matrix[9],
		matrix[10],
		out
	);

/**
 * Determine whether or not two matrices are roughly equivalent.
 * @param a - The first matrix.
 * @param b - The second matrix.
 * @returns Whether or not the matrices are equivalent.
 * @public
 */
export const equals = (a: Matrix3Like, b: Matrix3Like): boolean =>
	approxRelative(a[0], b[0]) &&
	approxRelative(a[1], b[1]) &&
	approxRelative(a[2], b[2]) &&
	approxRelative(a[3], b[3]) &&
	approxRelative(a[4], b[4]) &&
	approxRelative(a[5], b[5]) &&
	approxRelative(a[6], b[6]) &&
	approxRelative(a[7], b[7]) &&
	approxRelative(a[8], b[8]);

/**
 * Determine whether or not two matrices are exactly equivalent.
 * @param a - The first matrix.
 * @param b - The second matrix.
 * @returns Whether or not the matrices are equivalent.
 * @public
 */
export const exactEquals = (a: Matrix3Like, b: Matrix3Like): boolean =>
	a[0] === b[0] &&
	a[1] === b[1] &&
	a[2] === b[2] &&
	a[3] === b[3] &&
	a[4] === b[4] &&
	a[5] === b[5] &&
	a[6] === b[6] &&
	a[7] === b[7] &&
	a[8] === b[8];

/**
 * Add two matrices.
 * @param a - The augend.
 * @param b - The addend.
 * @param out - The matrix to store the result in.
 * @returns The sum.
 * @see {@link https://en.wikipedia.org/wiki/Matrix_addition | Matrix addition}
 * @public
 */
export const add = <T extends Matrix3Like>(
	a: Matrix3Like,
	b: Matrix3Like,
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
		out
	);

/**
 * Calculate the adjugate of a matrix.
 * @param matrix - The matrix.
 * @param out - The matrix to store the result in.
 * @returns The adjugate of the matrix.
 * @see {@link https://en.wikipedia.org/wiki/Adjugate_matrix | Adjugate matrix}
 * @public
 */
export const adjoint = <T extends Matrix3Like>(
	matrix: Matrix3Like,
	out: T
): T => {
	const a00 = matrix[0];
	const a01 = matrix[1];
	const a02 = matrix[2];
	const a10 = matrix[3];
	const a11 = matrix[4];
	const a12 = matrix[5];
	const a20 = matrix[6];
	const a21 = matrix[7];
	const a22 = matrix[8];

	return fromValues(
		a11 * a22 - a12 * a21,
		a02 * a21 - a01 * a22,
		a01 * a12 - a02 * a11,
		a12 * a20 - a10 * a22,
		a00 * a22 - a02 * a20,
		a02 * a10 - a00 * a12,
		a10 * a21 - a11 * a20,
		a01 * a20 - a00 * a21,
		a00 * a11 - a01 * a10,
		out
	);
};

/**
 * Copy the values of one matrix into another.
 * @param matrix - The matrix to copy.
 * @param out - The matrix to store the result in.
 * @returns The copy matrix.
 * @public
 */
export const copy = <T extends Matrix3Like>(matrix: Matrix3Like, out: T): T =>
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
		out
	);

/**
 * Calculate the Frobenius norm of a matrix.
 * @param matrix - The matrix.
 * @returns The Frobenius norm.
 * @see {@link https://en.wikipedia.org/wiki/Matrix_norm | Matrix norm}
 * @public
 */
export const frob = (matrix: Matrix3Like): number => {
	const a00 = matrix[0];
	const a01 = matrix[1];
	const a02 = matrix[2];
	const a10 = matrix[3];
	const a11 = matrix[4];
	const a12 = matrix[5];
	const a20 = matrix[6];
	const a21 = matrix[7];
	const a22 = matrix[8];

	// `Math.hypot` is slower.
	return Math.sqrt(
		a00 * a00 +
			a01 * a01 +
			a02 * a02 +
			a10 * a10 +
			a11 * a11 +
			a12 * a12 +
			a20 * a20 +
			a21 * a21 +
			a22 * a22
	);
};

/**
 * Multiply two matrices.
 * @param a - The multiplier.
 * @param b - The multiplicand.
 * @param out - The matrix to store the result in.
 * @returns The product of the matrices.
 * @see {@link https://en.wikipedia.org/wiki/Matrix_multiplication | Matrix multiplication}
 * @public
 */
export const multiply = <T extends Matrix3Like>(
	a: Matrix3Like,
	b: Matrix3Like,
	out: T
): T => {
	const a00 = a[0];
	const a01 = a[1];
	const a02 = a[2];
	const a10 = a[3];
	const a11 = a[4];
	const a12 = a[5];
	const a20 = a[6];
	const a21 = a[7];
	const a22 = a[8];

	const b00 = b[0];
	const b01 = b[1];
	const b02 = b[2];
	const b10 = b[3];
	const b11 = b[4];
	const b12 = b[5];
	const b20 = b[6];
	const b21 = b[7];
	const b22 = b[8];

	return fromValues(
		b00 * a00 + b01 * a10 + b02 * a20,
		b00 * a01 + b01 * a11 + b02 * a21,
		b00 * a02 + b01 * a12 + b02 * a22,
		b10 * a00 + b11 * a10 + b12 * a20,
		b10 * a01 + b11 * a11 + b12 * a21,
		b10 * a02 + b11 * a12 + b12 * a22,
		b20 * a00 + b21 * a10 + b22 * a20,
		b20 * a01 + b21 * a11 + b22 * a21,
		b20 * a02 + b21 * a12 + b22 * a22,
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
export const multiplyScalar = <T extends Matrix3Like>(
	matrix: Matrix3Like,
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
export const multiplyScalarAndAdd = <T extends Matrix3Like>(
	a: Matrix3Like,
	b: Matrix3Like,
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
export const subtract = <T extends Matrix3Like>(
	a: Matrix3Like,
	b: Matrix3Like,
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
		out
	);

/**
 * Transpose a matrix.
 * @param matrix - The matrix.
 * @param out - The matrix to store the result in.
 * @returns The transpose of the matrix.
 * @see {@link https://en.wikipedia.org/wiki/Transpose | Transpose}
 * @public
 */
export const transpose = <T extends Matrix3Like>(
	matrix: Matrix3Like,
	out: T
): T => {
	if (out === matrix) {
		const a01 = matrix[1];
		const a02 = matrix[2];
		const a12 = matrix[5];
		out[1] = matrix[3];
		out[2] = matrix[6];
		out[3] = a01;
		out[5] = matrix[7];
		out[6] = a02;
		out[7] = a12;
		return out;
	}

	return fromValues(
		matrix[0],
		matrix[3],
		matrix[6],
		matrix[1],
		matrix[4],
		matrix[7],
		matrix[2],
		matrix[5],
		matrix[8],
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
export const determinant = (matrix: Matrix3Like): number => {
	const a10 = matrix[3];
	const a11 = matrix[4];
	const a12 = matrix[5];
	const a20 = matrix[6];
	const a21 = matrix[7];
	const a22 = matrix[8];

	return (
		matrix[0] * (a22 * a11 - a12 * a21) +
		matrix[1] * (-a22 * a10 + a12 * a20) +
		matrix[2] * (a21 * a10 - a11 * a20)
	);
};

/**
 * Reset a matrix to identity.
 * @param out - The matrix to store the result in.
 * @returns The matrix.
 * @see {@link https://en.wikipedia.org/wiki/Identity_matrix | Identity matrix}
 * @public
 */
export const identity = <T extends Matrix3Like>(out: T): T =>
	fromValues(1, 0, 0, 0, 1, 0, 0, 0, 1, out);

/**
 * Invert a matrix.
 * @param matrix - The matrix.
 * @param out - The matrix to store the result in.
 * @returns The inverted matrix.
 * @see {@link https://en.wikipedia.org/wiki/Invertible_matrix | Invertible matrix}
 * @public
 */
export const invert = <T extends Matrix3Like>(
	matrix: Matrix3Like,
	out: T
): T => {
	const a00 = matrix[0];
	const a01 = matrix[1];
	const a02 = matrix[2];
	const a10 = matrix[3];
	const a11 = matrix[4];
	const a12 = matrix[5];
	const a20 = matrix[6];
	const a21 = matrix[7];
	const a22 = matrix[8];

	const b01 = a22 * a11 - a12 * a21;
	const b11 = -a22 * a10 + a12 * a20;
	const b21 = a21 * a10 - a11 * a20;

	let det = a00 * b01 + a01 * b11 + a02 * b21;
	if (!det) {
		throw new SingularMatrixError();
	}
	det = 1 / det;

	return fromValues(
		b01 * det,
		(-a22 * a01 + a02 * a21) * det,
		(a12 * a01 - a02 * a11) * det,
		b11 * det,
		(a22 * a00 - a02 * a20) * det,
		(-a12 * a00 + a02 * a10) * det,
		b21 * det,
		(-a21 * a00 + a01 * a20) * det,
		(a11 * a00 - a01 * a10) * det,
		out
	);
};

/**
 * Rotate a matrix by the given angle around the Z-axis.
 * @param matrix - The matrix.
 * @param radians - The angle in radians.
 * @param out - The matrix to store the result in.
 * @returns The rotated matrix.
 * @see {@link https://en.wikipedia.org/wiki/Rotation_matrix | Rotation matrix}
 * @public
 */
export const rotate = <T extends Matrix3Like>(
	matrix: Matrix3Like,
	radians: number,
	out: T
): T => {
	const a00 = matrix[0];
	const a01 = matrix[1];
	const a02 = matrix[2];
	const a10 = matrix[3];
	const a11 = matrix[4];
	const a12 = matrix[5];

	const s = Math.sin(radians);
	const c = Math.cos(radians);

	return fromValues(
		c * a00 + s * a10,
		c * a01 + s * a11,
		c * a02 + s * a12,
		c * a10 - s * a00,
		c * a11 - s * a01,
		c * a12 - s * a02,
		matrix[6],
		matrix[7],
		matrix[8],
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
export const scale = <T extends Matrix3Like>(
	matrix: Matrix3Like,
	vector: Vector2Like,
	out: T
): T => {
	const x = vector[0];
	const y = vector[1];

	return fromValues(
		matrix[0] * x,
		matrix[1] * x,
		matrix[2] * x,
		matrix[3] * y,
		matrix[4] * y,
		matrix[5] * y,
		matrix[6],
		matrix[7],
		matrix[8],
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
export const translate = <T extends Matrix3Like>(
	matrix: Matrix3Like,
	vector: Vector2Like,
	out: T
): T => {
	const a00 = matrix[0];
	const a01 = matrix[1];
	const a02 = matrix[2];
	const a10 = matrix[3];
	const a11 = matrix[4];
	const a12 = matrix[5];

	const x = vector[0];
	const y = vector[1];

	return fromValues(
		a00,
		a01,
		a02,
		a10,
		a11,
		a12,
		x * a00 + y * a10 + matrix[6],
		x * a01 + y * a11 + matrix[7],
		x * a02 + y * a12 + matrix[8],
		out
	);
};

/**
 * A three-by-three matrix.
 * @see {@link https://en.wikipedia.org/wiki/Matrix_(mathematics) | Matrix}
 * @public
 */
export default class Matrix3
	extends Float32Array
	implements SquareMatrix, Matrix3Like
{
	/**
	 * Create a transformation matrix that represents a rotation by the given angle around the Z-axis.
	 * @param r - The angle in radians.
	 * @param out - The matrix to store the result in.
	 * @returns The transformation matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Rotation_matrix | Rotation matrix}
	 */
	public static fromRotation<T extends Matrix3Like = Matrix3>(
		r: number,
		out: T = new Matrix3() as Matrix3 & T
	): T {
		return fromRotation(r, out);
	}

	/**
	 * Create a transformation matrix that represents a scaling by the given vector.
	 * @param vector - The scaling vector.
	 * @param out - The matrix to store the result in.
	 * @returns The transformation matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
	 */
	public static fromScaling<T extends Matrix3Like = Matrix3>(
		vector: Vector2Like,
		out: T = new Matrix3() as Matrix3 & T
	): T {
		return fromScaling(vector, out);
	}

	/**
	 * Create a transformation matrix that represents a translation by the given vector.
	 * @param vector - The translation vector.
	 * @param out - The matrix to store the result in.
	 * @returns The transformation matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
	 */
	public static fromTranslation<T extends Matrix3Like = Matrix3>(
		vector: Vector2Like,
		out: T = new Matrix3() as Matrix3 & T
	): T {
		return fromTranslation(vector, out);
	}

	/**
	 * Create a transformation matrix that represents a rotation by the given quaternion.
	 * @param quaternion - The quaternion.
	 * @param out - The matrix to store the result in.
	 * @returns The transformation matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Quaternion | Quaternion}
	 * @see {@link https://en.wikipedia.org/wiki/Rotation_matrix | Rotation matrix}
	 */
	public static fromQuaternion<T extends Matrix3Like = Matrix3>(
		quaternion: QuaternionLike,
		out: T = new Matrix3() as Matrix3 & T
	): T {
		return fromQuaternion(quaternion, out);
	}

	/**
	 * Create a transformation matrix that represents a rotation by the given z-y'-x" (intrinsic) Tait-Bryan angles.
	 * @param z - The z (roll) angle.
	 * @param y - The y (pitch) angle.
	 * @param x - The x (yaw) angle.
	 * @param out - The matrix to store the result in.
	 * @returns The transformation matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Quaternion | Quaternion}
	 * @see {@link https://en.wikipedia.org/wiki/Rotation_matrix | Rotation matrix}
	 */
	public static fromEuler<T extends Matrix3Like = Matrix3>(
		z: number,
		y: number,
		x: number,
		out: T = new Matrix3() as Matrix3 & T
	): T {
		return fromEuler(z, y, x, out);
	}

	/**
	 * Calculate a three-by-three normal (inverse transpose) matrix from a four-by-four matrix.
	 * @param matrix - The four-by-four matrix.
	 * @param out - The matrix to store the result in.
	 * @returns The normal matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Normal_matrix | Normal matrix}
	 */
	public static normalFromMatrix4<T extends Matrix3Like = Matrix3>(
		matrix: Matrix4Like,
		out: T = new Matrix3() as Matrix3 & T
	): T {
		return normalFromMatrix4(matrix, out);
	}

	/**
	 * Generate a two-dimensional projection matrix with the given bounds.
	 * @param width - The width of the projection.
	 * @param height - The height of the projection.
	 * @param out - The matrix to store the result in.
	 * @returns The projection matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Camera_matrix | Camera matrix}
	 * @see {@link https://en.wikipedia.org/wiki/3D_projection | 3D projection}
	 */
	public static projection<T extends Matrix3Like = Matrix3>(
		width: number,
		height: number,
		out: T = new Matrix3() as Matrix3 & T
	): T {
		return projection(width, height, out);
	}

	/**
	 * Create a three-by-three matrix from the upper-left corner of a four-by-four matrix.
	 * @param matrix - The four-by-four matrix.
	 * @param out - The matrix to store the result in.
	 * @returns The three-by-three matrix.
	 */
	public static fromMatrix4<T extends Matrix3Like = Matrix3>(
		matrix: Matrix4Like,
		out: T = new Matrix3() as Matrix3 & T
	): T {
		return fromMatrix4(matrix, out);
	}

	/**
	 * Create a two-by-two matrix with the given values.
	 * @param c0r0 - The value in the first column and first row.
	 * @param c0r1 - The value in the first column and second row.
	 * @param c0r2 - The value in the first column and third row.
	 * @param c1r0 - The value in the second column and first row.
	 * @param c1r1 - The value in the second column and second row.
	 * @param c1r2 - The value in the second column and third row.
	 * @param c2r0 - The value in the third column and first row.
	 * @param c2r1 - The value in the third column and second row.
	 * @param c2r2 - The value in the third column and third row.
	 * @param out - The matrix to store the result in.
	 * @returns The matrix.
	 */
	public static fromValues<T extends Matrix3Like = Matrix3>(
		c0r0: number,
		c0r1: number,
		c0r2: number,
		c1r0: number,
		c1r1: number,
		c1r2: number,
		c2r0: number,
		c2r1: number,
		c2r2: number,
		out: T = new Matrix3() as Matrix3 & T
	): T {
		return fromValues(
			c0r0,
			c0r1,
			c0r2,
			c1r0,
			c1r1,
			c1r2,
			c2r0,
			c2r1,
			c2r2,
			out
		);
	}

	/**
	 * Create a three-by-three identity matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Identity_matrix | Identity matrix}
	 */
	public constructor() {
		super(9);

		this[0] = 1;
		this[4] = 1;
		this[8] = 1;

		this.width = 3;
		this.height = 3;
	}

	/** The value in the first column and first row. */
	public 0: number;

	/** The value in the first column and second row. */
	public 1: number;

	/** The value in the first column and third row. */
	public 2: number;

	/** The value in the second column and first row. */
	public 3: number;

	/** The value in the second column and second row. */
	public 4: number;

	/** The value in the second column and third row. */
	public 5: number;

	/** The value in the third column and first row. */
	public 6: number;

	/** The value in the third column and second row. */
	public 7: number;

	/** The value in the third column and third row. */
	public 8: number;

	/** The number of columns in this matrix. */
	public readonly width: 3;

	/** The number of rows in this matrix. */
	public readonly height: 3;

	/**
	 * Determine whether or not this matrix is roughly equivalent to another.
	 * @param matrix - The other matrix.
	 * @returns Whether or not the matrices are equivalent.
	 */
	public equals(matrix: Matrix3Like): boolean {
		return equals(this, matrix);
	}

	/**
	 * Determine whether or not this matrix is exactly equivalent to another.
	 * @param matrix - The other matrix.
	 * @returns Whether or not the matrices are equivalent.
	 */
	public exactEquals(matrix: Matrix3Like): boolean {
		return exactEquals(this, matrix);
	}

	/**
	 * Add two matrices of the same size.
	 * @param matrix - The other matrix.
	 * @param out - The matrix to store the result in.
	 * @returns The sum of the matrices.
	 * @see {@link https://en.wikipedia.org/wiki/Matrix_addition | Matrix addition}
	 */
	public add<T extends Matrix3Like = Matrix3>(
		matrix: Matrix3Like,
		out: T = new Matrix3() as Matrix3 & T
	): T {
		return add(this, matrix, out);
	}

	/**
	 * Calculate the adjugate of this matrix.
	 * @param out - The matrix to store the result in.
	 * @returns The adjugate of this matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Adjugate_matrix | Adjugate matrix}
	 */
	public adjoint<T extends Matrix3Like = Matrix3>(
		out: T = new Matrix3() as Matrix3 & T
	): T {
		return adjoint(this, out);
	}

	/**
	 * Copy the values from this matrix to another one.
	 * @param out - The matrix to store the result in.
	 * @returns The copy.
	 */
	public clone<T extends Matrix3Like = Matrix3>(
		out: T = new Matrix3() as Matrix3 & T
	): T {
		return copy(this, out);
	}

	/**
	 * Copy the values of another matrix into this one.
	 * @param matrix - The matrix to copy.
	 * @returns This matrix.
	 */
	public copy(matrix: Matrix3Like): this {
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
	public multiply<T extends Matrix3Like = Matrix3>(
		matrix: Matrix3Like,
		out: T = new Matrix3() as Matrix3 & T
	): T {
		return multiply(this, matrix, out);
	}

	/**
	 * Multiply this matrix by a scalar value.
	 * @param scalar - The scalar value.
	 * @param out - The matrix to store the result in.
	 * @returns The product of the matrix and the scalar value.
	 * @see {@link https://en.wikipedia.org/wiki/Matrix_multiplication | Matrix multiplication}
	 */
	public multiplyScalar<T extends Matrix3Like = Matrix3>(
		scalar: number,
		out: T = new Matrix3() as Matrix3 & T
	): T {
		return multiplyScalar(this, scalar, out);
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
	public multiplyScalarAndAdd<T extends Matrix3Like = Matrix3>(
		matrix: Matrix3Like,
		scalar: number,
		out: T = new Matrix3() as Matrix3 & T
	): T {
		return multiplyScalarAndAdd(this, matrix, scalar, out);
	}

	/**
	 * Subtract another matrix from this one.
	 * @param matrix - The other matrix.
	 * @param out - The matrix to store the result in.
	 * @returns The difference between the matrices.
	 * @see {@link https://en.wikipedia.org/wiki/Matrix_addition | Matrix addition}
	 */
	public subtract<T extends Matrix3Like = Matrix3>(
		matrix: Matrix3Like,
		out: T = new Matrix3() as Matrix3 & T
	): T {
		return subtract(this, matrix, out);
	}

	/**
	 * Transpose this matrix.
	 * @param out - The matrix to store the result in.
	 * @returns The transpose of this matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Transpose | Transpose}
	 */
	public transpose<T extends Matrix3Like = Matrix3>(
		out: T = new Matrix3() as Matrix3 & T
	): T {
		return transpose(this, out);
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
	public invert<T extends Matrix3Like = Matrix3>(
		out: T = new Matrix3() as Matrix3 & T
	): T {
		return invert(this, out);
	}

	/**
	 * Rotate this matrix by the given angle around the Z-axis.
	 * @param r - The angle in radians.
	 * @param out - The matrix to store the result in.
	 * @returns The rotated matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Rotation_matrix | Rotation matrix}
	 */
	public rotate<T extends Matrix3Like = Matrix3>(
		r: number,
		out: T = new Matrix3() as Matrix3 & T
	): T {
		return rotate(this, r, out);
	}

	/**
	 * Scale this matrix by the given vector.
	 * @param vector - The scaling vector.
	 * @param out - The matrix to store the result in.
	 * @returns The scaled matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
	 */
	public scale<T extends Matrix3Like = Matrix3>(
		vector: Vector2Like,
		out: T = new Matrix3() as Matrix3 & T
	): T {
		return scale(this, vector, out);
	}

	/**
	 * Translate this matrix by the given vector.
	 * @param vector - The translation vector.
	 * @param out - The matrix to store the result in.
	 * @returns The translated matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
	 */
	public translate<T extends Matrix3Like = Matrix3>(
		vector: Vector2Like,
		out: T = new Matrix3() as Matrix3 & T
	): T {
		return translate(this, vector, out);
	}
}
