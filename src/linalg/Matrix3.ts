import type { Matrix4Like } from "./Matrix4.js";
import type { MatrixLike } from "./Matrix.js";
import type { QuaternionLike } from "./Quaternion.js";
import SingularMatrixError from "../utility/SingularMatrixError.js";
import type SquareMatrix from "./SquareMatrix.js";
import type { Vector2Like } from "./Vector2.js";
import epsilon from "../utility/epsilon.js";

/**
 * Numbers arranged into three columns and three rows.
 * @see [Matrix](https://en.wikipedia.org/wiki/Matrix_(mathematics))
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
 * Creates a 3x3 matrix-like object.
 * @returns A 3x3 matrix-like object.
 */
export const createMatrix3Like = () => {
	return new Float32Array(9) as Float32Array & Matrix3Like;
};

/**
 * Create a transformation matrix that represents a rotation by the given angle around the Z-axis.
 * @param r - The angle in radians.
 * @param out - The matrix to store the result in.
 * @returns The transformation matrix.
 * @see [Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix)
 */
export const fromRotation = <T extends Matrix3Like>(r: number, out: T): T => {
	const s = Math.sin(r);
	const c = Math.cos(r);

	out[0] = c;
	out[1] = s;
	out[2] = 0;
	out[3] = -s;
	out[4] = c;
	out[5] = 0;
	out[6] = 0;
	out[7] = 0;
	out[8] = 1;
	return out;
};

/**
 * Create a transformation matrix that represents a scaling by the given vector.
 * @param vector - The scaling vector.
 * @param out - The matrix to store the result in.
 * @returns The transformation matrix.
 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
 */
export const fromScaling = <T extends Matrix3Like>(
	vector: Vector2Like,
	out: T
): T => {
	out[0] = vector[0];
	out[1] = 0;
	out[2] = 0;
	out[3] = 0;
	out[4] = vector[1];
	out[5] = 0;
	out[6] = 0;
	out[7] = 0;
	out[8] = 1;
	return out;
};

/**
 * Create a transformation matrix that represents a translation by the given vector.
 * @param vector - The translation vector.
 * @param out - The matrix to store the result in.
 * @returns The transformation matrix.
 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
 */
export const fromTranslation = <T extends Matrix3Like>(
	vector: Vector2Like,
	out: T
): T => {
	out[0] = 1;
	out[1] = 0;
	out[2] = 0;
	out[3] = 0;
	out[4] = 1;
	out[5] = 0;
	out[6] = vector[0];
	out[7] = vector[1];
	out[8] = 1;
	return out;
};

/**
 * Create a transformation matrix that represents a rotation by the given quaternion.
 * @param quaternion - The quaternion.
 * @param out - The matrix to store the result in.
 * @returns The transformation matrix.
 * @see [Quaternion](https://en.wikipedia.org/wiki/Quaternion)
 * @see [Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix)
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

	out[0] = 1 - yy - zz;
	out[3] = yx - wz;
	out[6] = zx + wy;
	out[1] = yx + wz;
	out[4] = 1 - xx - zz;
	out[7] = zy - wx;
	out[2] = zx - wy;
	out[5] = zy + wx;
	out[8] = 1 - xx - yy;
	return out;
};

/**
 * Calculate a three-by-three normal (inverse transpose) matrix from a four-by-four matrix.
 * @param matrix - The four-by-four matrix.
 * @param out - The matrix to store the result in.
 * @returns The normal matrix.
 * @see [Normal matrix](https://en.wikipedia.org/wiki/Normal_matrix)
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

	out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
	out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
	out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
	out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
	out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
	out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
	out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
	out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
	out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
	return out;
};

/**
 * Generate a two-dimensional projection matrix with the given bounds.
 * @param width - The width of the projection.
 * @param height - The height of the projection.
 * @param out - The matrix to store the result in.
 * @returns The projection matrix.
 * @see [Camera matrix](https://en.wikipedia.org/wiki/Camera_matrix)
 * @see [3D projection](https://en.wikipedia.org/wiki/3D_projection)
 */
export const projection = <T extends Matrix3Like>(
	width: number,
	height: number,
	out: T
): T => {
	out[0] = 2 / width;
	out[1] = 0;
	out[2] = 0;
	out[3] = 0;
	out[4] = -2 / height;
	out[5] = 0;
	out[6] = -1;
	out[7] = 1;
	out[8] = 1;
	return out;
};

/**
 * Create a three-by-three matrix from the upper-left corner of a four-by-four matrix.
 * @param matrix - The four-by-four matrix.
 * @param out - The matrix to store the result in.
 * @returns The three-by-three matrix.
 */
export const fromMatrix4 = <T extends Matrix3Like>(
	matrix: Matrix4Like,
	out: T
): T => {
	out[0] = matrix[0];
	out[1] = matrix[1];
	out[2] = matrix[2];
	out[3] = matrix[4];
	out[4] = matrix[5];
	out[5] = matrix[6];
	out[6] = matrix[8];
	out[7] = matrix[9];
	out[8] = matrix[10];
	return out;
};

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
 * Determine whether or not two matrices are roughly equivalent.
 * @param a - The first matrix.
 * @param b - The second matrix.
 * @returns Whether or not the matrices are equivalent.
 */
export const equals = (a: Matrix3Like, b: Matrix3Like): boolean => {
	const a0 = a[0];
	const a1 = a[1];
	const a2 = a[2];
	const a3 = a[3];
	const a4 = a[4];
	const a5 = a[5];
	const a6 = a[6];
	const a7 = a[7];
	const a8 = a[8];

	const b0 = b[0];
	const b1 = b[1];
	const b2 = b[2];
	const b3 = b[3];
	const b4 = b[4];
	const b5 = b[5];
	const b6 = b[6];
	const b7 = b[7];
	const b8 = b[8];

	return (
		Math.abs(a0 - b0) <= epsilon * Math.max(1, Math.abs(a0), Math.abs(b0)) &&
		Math.abs(a1 - b1) <= epsilon * Math.max(1, Math.abs(a1), Math.abs(b1)) &&
		Math.abs(a2 - b2) <= epsilon * Math.max(1, Math.abs(a2), Math.abs(b2)) &&
		Math.abs(a3 - b3) <= epsilon * Math.max(1, Math.abs(a3), Math.abs(b3)) &&
		Math.abs(a4 - b4) <= epsilon * Math.max(1, Math.abs(a4), Math.abs(b4)) &&
		Math.abs(a5 - b5) <= epsilon * Math.max(1, Math.abs(a5), Math.abs(b5)) &&
		Math.abs(a6 - b6) <= epsilon * Math.max(1, Math.abs(a6), Math.abs(b6)) &&
		Math.abs(a7 - b7) <= epsilon * Math.max(1, Math.abs(a7), Math.abs(b7)) &&
		Math.abs(a8 - b8) <= epsilon * Math.max(1, Math.abs(a8), Math.abs(b8))
	);
};

/**
 * Determine whether or not two matrices are exactly equivalent.
 * @param a - The first matrix.
 * @param b - The second matrix.
 * @returns Whether or not the matrices are equivalent.
 */
export const exactEquals = (a: Matrix3Like, b: Matrix3Like): boolean => {
	return (
		a[0] === b[0] &&
		a[1] === b[1] &&
		a[2] === b[2] &&
		a[3] === b[3] &&
		a[4] === b[4] &&
		a[5] === b[5] &&
		a[6] === b[6] &&
		a[7] === b[7] &&
		a[8] === b[8]
	);
};

/**
 * Add two matrices.
 * @param a - The augend.
 * @param b - The addend.
 * @param out - The matrix to store the result in.
 * @returns The sum.
 * @see [Matrix addition](https://en.wikipedia.org/wiki/Matrix_addition)
 */
export const add = <T extends Matrix3Like>(
	a: Matrix3Like,
	b: Matrix3Like,
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
	out[8] = a[8] + b[8];
	return out;
};

/**
 * Calculate the adjugate of a matrix.
 * @param matrix - The matrix.
 * @param out - The matrix to store the result in.
 * @returns The adjugate of the matrix.
 * @see [Adjugate matrix](https://en.wikipedia.org/wiki/Adjugate_matrix)
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

	out[0] = a11 * a22 - a12 * a21;
	out[1] = a02 * a21 - a01 * a22;
	out[2] = a01 * a12 - a02 * a11;
	out[3] = a12 * a20 - a10 * a22;
	out[4] = a00 * a22 - a02 * a20;
	out[5] = a02 * a10 - a00 * a12;
	out[6] = a10 * a21 - a11 * a20;
	out[7] = a01 * a20 - a00 * a21;
	out[8] = a00 * a11 - a01 * a10;
	return out;
};

/**
 * Copy the values of one matrix into another.
 * @param matrix - The matrix to copy.
 * @param out - The matrix to store the result in.
 * @returns This matrix.
 */
export const copy = <T extends Matrix3Like>(matrix: Matrix3Like, out: T): T => {
	out[0] = matrix[0];
	out[1] = matrix[1];
	out[2] = matrix[2];
	out[3] = matrix[3];
	out[4] = matrix[4];
	out[5] = matrix[5];
	out[6] = matrix[6];
	out[7] = matrix[7];
	out[8] = matrix[8];
	return out;
};

/**
 * Calculate the Frobenius norm of a matrix.
 * @param matrix - The matrix.
 * @returns The Frobenius norm.
 * @see [Matrix norm](https://en.wikipedia.org/wiki/Matrix_norm)
 */
export const frob = (matrix: Matrix3Like): number => {
	return Math.hypot(
		matrix[0],
		matrix[1],
		matrix[2],
		matrix[3],
		matrix[4],
		matrix[5],
		matrix[6],
		matrix[7],
		matrix[8]
	);
};

/**
 * Multiply two matrices.
 * @param a - The multiplicand.
 * @param b - The multiplier.
 * @param out - The matrix to store the result in.
 * @returns The product of the matrices.
 * @see [Matrix multiplication](https://en.wikipedia.org/wiki/Matrix_multiplication)
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

	out[0] = b00 * a00 + b01 * a10 + b02 * a20;
	out[1] = b00 * a01 + b01 * a11 + b02 * a21;
	out[2] = b00 * a02 + b01 * a12 + b02 * a22;
	out[3] = b10 * a00 + b11 * a10 + b12 * a20;
	out[4] = b10 * a01 + b11 * a11 + b12 * a21;
	out[5] = b10 * a02 + b11 * a12 + b12 * a22;
	out[6] = b20 * a00 + b21 * a10 + b22 * a20;
	out[7] = b20 * a01 + b21 * a11 + b22 * a21;
	out[8] = b20 * a02 + b21 * a12 + b22 * a22;
	return out;
};

/**
 * Multiply a matrix by a scalar value.
 * @param matrix - The multiplicand.
 * @param scalar - The multiplier.
 * @param out - The matrix to store the result in.
 * @returns The product.
 * @see [Matrix multiplication](https://en.wikipedia.org/wiki/Matrix_multiplication)
 */
export const multiplyScalar = <T extends Matrix3Like>(
	matrix: Matrix3Like,
	scalar: number,
	out: T
): T => {
	out[0] = matrix[0] * scalar;
	out[1] = matrix[1] * scalar;
	out[2] = matrix[2] * scalar;
	out[3] = matrix[3] * scalar;
	out[4] = matrix[4] * scalar;
	out[5] = matrix[5] * scalar;
	out[6] = matrix[6] * scalar;
	out[7] = matrix[7] * scalar;
	out[8] = matrix[8] * scalar;
	return out;
};

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
export const multiplyScalarAndAdd = <T extends Matrix3Like>(
	a: Matrix3Like,
	b: Matrix3Like,
	scalar: number,
	out: T
): T => {
	out[0] = a[0] + b[0] * scalar;
	out[1] = a[1] + b[1] * scalar;
	out[2] = a[2] + b[2] * scalar;
	out[3] = a[3] + b[3] * scalar;
	out[4] = a[4] + b[4] * scalar;
	out[5] = a[5] + b[5] * scalar;
	out[6] = a[6] + b[6] * scalar;
	out[7] = a[7] + b[7] * scalar;
	out[8] = a[8] + b[8] * scalar;
	return out;
};

/**
 * Subtract two matrices.
 * @param a - The minuend.
 * @param b - The subtrahend.
 * @param out - The matrix to store the result in.
 * @returns The difference.
 * @see [Matrix addition](https://en.wikipedia.org/wiki/Matrix_addition)
 */
export const subtract = <T extends Matrix3Like>(
	a: Matrix3Like,
	b: Matrix3Like,
	out: T
): T => {
	out[0] = a[0] - b[0];
	out[1] = a[1] - b[1];
	out[2] = a[2] - b[2];
	out[3] = a[3] - b[3];
	out[4] = a[4] - b[4];
	out[5] = a[5] - b[5];
	out[6] = a[6] - b[6];
	out[7] = a[7] - b[7];
	out[8] = a[8] - b[8];
	return out;
};

/**
 * Transpose a matrix.
 * @param matrix - The matrix.
 * @param out - The matrix to store the result in.
 * @returns The transpose of the matrix.
 * @see [Transpose](https://en.wikipedia.org/wiki/Transpose)
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

	out[0] = matrix[0];
	out[1] = matrix[3];
	out[2] = matrix[6];
	out[3] = matrix[1];
	out[4] = matrix[4];
	out[5] = matrix[7];
	out[6] = matrix[2];
	out[7] = matrix[5];
	out[8] = matrix[8];
	return out;
};

/**
 * Calculate the determinant of a matrix.
 * @param matrix - The matrix.
 * @returns The determinant.
 * @see [Determinant](https://en.wikipedia.org/wiki/Determinant)
 */
export const determinant = (matrix: Matrix3Like): number => {
	const a00 = matrix[0];
	const a01 = matrix[1];
	const a02 = matrix[2];
	const a10 = matrix[3];
	const a11 = matrix[4];
	const a12 = matrix[5];
	const a20 = matrix[6];
	const a21 = matrix[7];
	const a22 = matrix[8];

	return (
		a00 * (a22 * a11 - a12 * a21) +
		a01 * (-a22 * a10 + a12 * a20) +
		a02 * (a21 * a10 - a11 * a20)
	);
};

/**
 * Reset a matrix to identity.
 * @param out - The matrix to store the result in.
 * @returns The matrix.
 * @see [Identity matrix](https://en.wikipedia.org/wiki/Identity_matrix)
 */
export const identity = <T extends Matrix3Like>(out: T): T => {
	out[0] = 1;
	out[1] = 0;
	out[2] = 0;
	out[3] = 0;
	out[4] = 1;
	out[5] = 0;
	out[6] = 0;
	out[7] = 0;
	out[8] = 1;
	return out;
};

/**
 * Invert a matrix.
 * @param matrix - The matrix.
 * @param out - The matrix to store the result in.
 * @returns The inverted matrix.
 * @see [Invertible matrix](https://en.wikipedia.org/wiki/Invertible_matrix)
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

	out[0] = b01 * det;
	out[1] = (-a22 * a01 + a02 * a21) * det;
	out[2] = (a12 * a01 - a02 * a11) * det;
	out[3] = b11 * det;
	out[4] = (a22 * a00 - a02 * a20) * det;
	out[5] = (-a12 * a00 + a02 * a10) * det;
	out[6] = b21 * det;
	out[7] = (-a21 * a00 + a01 * a20) * det;
	out[8] = (a11 * a00 - a01 * a10) * det;
	return out;
};

/**
 * Rotate a matrix by the given angle around the Z-axis.
 * @param matrix - The matrix.
 * @param radians - The angle in radians.
 * @param out - The matrix to store the result in.
 * @returns The rotated matrix.
 * @see [Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix)
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
	const a20 = matrix[6];
	const a21 = matrix[7];
	const a22 = matrix[8];

	const s = Math.sin(radians);
	const c = Math.cos(radians);

	out[0] = c * a00 + s * a10;
	out[1] = c * a01 + s * a11;
	out[2] = c * a02 + s * a12;
	out[3] = c * a10 - s * a00;
	out[4] = c * a11 - s * a01;
	out[5] = c * a12 - s * a02;
	out[6] = a20;
	out[7] = a21;
	out[8] = a22;
	return out;
};

/**
 * Scale a matrix by the given vector.
 * @param matrix - The matrix.
 * @param vector - The scaling vector.
 * @param out - The matrix to store the result in.
 * @returns The scaled matrix.
 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
 */
export const scale = <T extends Matrix3Like>(
	matrix: Matrix3Like,
	vector: Vector2Like,
	out: T
): T => {
	const x = vector[0];
	const y = vector[1];

	out[0] = matrix[0] * x;
	out[1] = matrix[1] * x;
	out[2] = matrix[2] * x;
	out[3] = matrix[3] * y;
	out[4] = matrix[4] * y;
	out[5] = matrix[5] * y;
	out[6] = matrix[6];
	out[7] = matrix[7];
	out[8] = matrix[8];
	return out;
};

/**
 * Translate a matrix by the given vector.
 * @param matrix - The matrix.
 * @param vector - The translation vector.
 * @param out - The matrix to store the result in.
 * @returns The translated matrix.
 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
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
	const a20 = matrix[6];
	const a21 = matrix[7];
	const a22 = matrix[8];

	const x = vector[0];
	const y = vector[1];

	out[0] = a00;
	out[1] = a01;
	out[2] = a02;
	out[3] = a10;
	out[4] = a11;
	out[5] = a12;
	out[6] = x * a00 + y * a10 + a20;
	out[7] = x * a01 + y * a11 + a21;
	out[8] = x * a02 + y * a12 + a22;
	return out;
};

/**
 * A three-by-three matrix.
 * @see [Matrix](https://en.wikipedia.org/wiki/Matrix_(mathematics))
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
	 * @see [Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix)
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
	 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
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
	 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
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
	 * @see [Quaternion](https://en.wikipedia.org/wiki/Quaternion)
	 * @see [Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix)
	 */
	public static fromQuaternion<T extends Matrix3Like = Matrix3>(
		quaternion: QuaternionLike,
		out: T = new Matrix3() as Matrix3 & T
	): T {
		return fromQuaternion(quaternion, out);
	}

	/**
	 * Calculate a three-by-three normal (inverse transpose) matrix from a four-by-four matrix.
	 * @param matrix - The four-by-four matrix.
	 * @param out - The matrix to store the result in.
	 * @returns The normal matrix.
	 * @see [Normal matrix](https://en.wikipedia.org/wiki/Normal_matrix)
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
	 * @see [Camera matrix](https://en.wikipedia.org/wiki/Camera_matrix)
	 * @see [3D projection](https://en.wikipedia.org/wiki/3D_projection)
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
	 * @see [Identity matrix](https://en.wikipedia.org/wiki/Identity_matrix)
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
	 * @see [Matrix addition](https://en.wikipedia.org/wiki/Matrix_addition)
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
	 * @see [Adjugate matrix](https://en.wikipedia.org/wiki/Adjugate_matrix)
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
	 * @see [Matrix norm](https://en.wikipedia.org/wiki/Matrix_norm)
	 */
	public get frob(): number {
		return frob(this);
	}

	/**
	 * Multiply this matrix by another.
	 * @param matrix - The other matrix.
	 * @param out - The matrix to store the result in.
	 * @returns The product of the matrices.
	 * @see [Matrix multiplication](https://en.wikipedia.org/wiki/Matrix_multiplication)
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
	 * @see [Matrix multiplication](https://en.wikipedia.org/wiki/Matrix_multiplication)
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
	 * @see [Matrix addition](https://en.wikipedia.org/wiki/Matrix_addition)
	 * @see [Matrix multiplication](https://en.wikipedia.org/wiki/Matrix_multiplication)
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
	 * @see [Matrix addition](https://en.wikipedia.org/wiki/Matrix_addition)
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
	 * @see [Transpose](https://en.wikipedia.org/wiki/Transpose)
	 */
	public transpose<T extends Matrix3Like = Matrix3>(
		out: T = new Matrix3() as Matrix3 & T
	): T {
		return transpose(this, out);
	}

	/**
	 * Get the determinant of this matrix.
	 * @see [Determinant](https://en.wikipedia.org/wiki/Determinant)
	 */
	public get determinant(): number {
		return determinant(this);
	}

	/**
	 * Reset this matrix to identity.
	 * @returns This matrix.
	 * @see [Identity matrix](https://en.wikipedia.org/wiki/Identity_matrix)
	 */
	public identity(): this {
		return identity(this);
	}

	/**
	 * Invert this matrix.
	 * @param out - The matrix to store the result in.
	 * @returns The inverted matrix.
	 * @see [Invertible matrix](https://en.wikipedia.org/wiki/Invertible_matrix)
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
	 * @see [Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix)
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
	 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
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
	 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
	 */
	public translate<T extends Matrix3Like = Matrix3>(
		vector: Vector2Like,
		out: T = new Matrix3() as Matrix3 & T
	): T {
		return translate(this, vector, out);
	}
}
