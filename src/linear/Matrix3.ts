import { matrixEpsilon, type SquareMatrix } from "./Matrix.js";
import Matrix2 from "./Matrix2.js";
import type { Matrix4Like } from "./Matrix4.js";
import type { QuaternionLike } from "./Quaternion.js";
import type { Vector2Like } from "./Vector2.js";

/** Numbers arranged into three columns and three rows. */
export type Matrix3Like = Matrix3 | [
	number, number, number,
	number, number, number,
	number, number, number
];

/**
 * Creates a three-by-three matrix from the upper-left corner of a four-by-four matrix.
 * @param out The matrix to fill.
 * @param a The four-by-four matrix.
 * @returns The three-by-three matrix.
 * @see [Source](https://glmatrix.net/)
 */
function fromMat4<T extends Matrix3Like>(out: T, a: Matrix4Like): T {
	out[0] = a[0];
	out[1] = a[1];
	out[2] = a[2];
	out[3] = a[4];
	out[4] = a[5];
	out[5] = a[6];
	out[6] = a[8];
	out[7] = a[9];
	out[8] = a[10];
	return out;
}

/**
 * Crates a three-by-three matrix that is a copy of another.
 * @param a The matrix to copy.
 * @returns The copy.
 * @see [Source](https://glmatrix.net/)
 */
function clone(a: Matrix3Like): Matrix3 {
	const out: Matrix3 = new Matrix3();
	out[0] = a[0];
	out[1] = a[1];
	out[2] = a[2];
	out[3] = a[3];
	out[4] = a[4];
	out[5] = a[5];
	out[6] = a[6];
	out[7] = a[7];
	out[8] = a[8];
	return out;
}

/**
 * Copies the values in one three-by-three matrix to another.
 * @param out The matrix to fill.
 * @param a The matrix to copy.
 * @returns The filled matrix.
 * @see [Source](https://glmatrix.net/)
 */
function copy<T extends Matrix3Like>(out: T, a: Matrix3Like): T {
	out[0] = a[0];
	out[1] = a[1];
	out[2] = a[2];
	out[3] = a[3];
	out[4] = a[4];
	out[5] = a[5];
	out[6] = a[6];
	out[7] = a[7];
	out[8] = a[8];
	return out;
}

/**
 * Creates a three-by-three matrix with the given values.
 * @param m00 The value in the first column and first row.
 * @param m01 The value in the first column and second row.
 * @param m02 The value in the first column and third row.
 * @param m10 The value in the second column and first row.
 * @param m11 The value in the second column and second row.
 * @param m12 The value in the second column and third row.
 * @param m20 The value in the third column and first row.
 * @param m21 The value in the third column and second row.
 * @param m22 The value in the third column and third row.
 * @returns The matrix.
 * @see [Source](https://glmatrix.net/)
 */
function fromValues(m00: number, m01: number, m02: number, m10: number, m11: number, m12: number, m20: number, m21: number, m22: number): Matrix3 {
	const out: Matrix3 = new Matrix3();
	out[0] = m00;
	out[1] = m01;
	out[2] = m02;
	out[3] = m10;
	out[4] = m11;
	out[5] = m12;
	out[6] = m20;
	out[7] = m21;
	out[8] = m22;
	return out;
}

/**
 * Sets the values in a three-by-three matrix.
 * @param m00 The value in the first column and first row.
 * @param m01 The value in the first column and second row.
 * @param m02 The value in the first column and third row.
 * @param m10 The value in the second column and first row.
 * @param m11 The value in the second column and second row.
 * @param m12 The value in the second column and third row.
 * @param m20 The value in the third column and first row.
 * @param m21 The value in the third column and second row.
 * @param m22 The value in the third column and third row.
 * @returns The matrix.
 * @see [Source](https://glmatrix.net/)
 */
export function set<T extends Matrix3Like>(out: T, m00: number, m01: number, m02: number, m10: number, m11: number, m12: number, m20: number, m21: number, m22: number): T {
	out[0] = m00;
	out[1] = m01;
	out[2] = m02;
	out[3] = m10;
	out[4] = m11;
	out[5] = m12;
	out[6] = m20;
	out[7] = m21;
	out[8] = m22;
	return out;
}

/**
 * Sets a three-by-three matrix to the identity.
 * @param out The matrix.
 * @returns The matrix.
 * @see [Source](https://glmatrix.net/)
 */
function identity<T extends Matrix3Like>(out: T): T {
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
}

/**
 * Transposes a three-by-three matrix.
 * @param out The matrix to fill with the transpose.
 * @param a The matrix to transpose.
 * @returns The transpose.
 * @see [Source](https://glmatrix.net/)
 */
function transpose<T extends Matrix3Like>(out: T, a: Matrix3Like): T {
	if (out === a) {
		const a01: number = a[1];
		const a02: number = a[2];
		const a12: number = a[5];

		out[1] = a[3];
		out[2] = a[6];
		out[3] = a01;
		out[5] = a[7];
		out[6] = a02;
		out[7] = a12;
	} else {
		out[0] = a[0];
		out[1] = a[3];
		out[2] = a[6];
		out[3] = a[1];
		out[4] = a[4];
		out[5] = a[7];
		out[6] = a[2];
		out[7] = a[5];
		out[8] = a[8];
	}
	return out;
}

/**
 * Inverts a three-by-three matrix.
 * @param out The matrix to fill with the inverted matrix.
 * @param a The matrix to invert.
 * @returns The inverted matrix.
 * @see [Source](https://glmatrix.net/)
 */
function invert<T extends Matrix3Like>(out: T, a: Matrix3Like): T {
	const a00: number = a[0];
	const a01: number = a[1];
	const a02: number = a[2];
	const a10: number = a[3];
	const a11: number = a[4];
	const a12: number = a[5];
	const a20: number = a[6];
	const a21: number = a[7];
	const a22: number = a[8];

	const b01: number = a22 * a11 - a12 * a21;
	const b11: number = -a22 * a10 + a12 * a20;
	const b21: number = a21 * a10 - a11 * a20;

	let det: number = a00 * b01 + a01 * b11 + a02 * b21;
	if (!det) {
		throw new Error("Cannot invert the matrix.");
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
}

/**
 * Calculates the adjugate of a three-by-three matrix.
 * @param out The matrix to fill with the adjugate.
 * @param a The matrix to calculate the adjugate of.
 * @returns The adjugate.
 * @see [Source](https://glmatrix.net/)
 */
function adjoint<T extends Matrix3Like>(out: T, a: Matrix3Like): T {
	const a00: number = a[0];
	const a01: number = a[1];
	const a02: number = a[2];
	const a10: number = a[3];
	const a11: number = a[4];
	const a12: number = a[5];
	const a20: number = a[6];
	const a21: number = a[7];
	const a22: number = a[8];

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
}

/**
 * Calculates the determinant of a three-by-three matrix.
 * @param a The matrix.
 * @returns The determinant.
 * @see [Source](https://glmatrix.net/)
 */
function determinant(a: Matrix3Like): number {
	const a00: number = a[0];
	const a01: number = a[1];
	const a02: number = a[2];
	const a10: number = a[3];
	const a11: number = a[4];
	const a12: number = a[5];
	const a20: number = a[6];
	const a21: number = a[7];
	const a22: number = a[8];

	return a00 * (a22 * a11 - a12 * a21)
		+ a01 * (-a22 * a10 + a12 * a20)
		+ a02 * (a21 * a10 - a11 * a20);
}

/**
 * Multiplies two three-by-three matrices.
 * @param out The matrix to fill with the product.
 * @param a The multiplier.
 * @param b The multiplicand.
 * @returns The product.
 * @see [Source](https://glmatrix.net/)
 */
function multiply<T extends Matrix3Like>(out: T, a: Matrix3Like, b: Matrix3Like): T {
	const a00: number = a[0];
	const a01: number = a[1];
	const a02: number = a[2];
	const a10: number = a[3];
	const a11: number = a[4];
	const a12: number = a[5];
	const a20: number = a[6];
	const a21: number = a[7];
	const a22: number = a[8];

	const b00: number = b[0];
	const b01: number = b[1];
	const b02: number = b[2];
	const b10: number = b[3];
	const b11: number = b[4];
	const b12: number = b[5];
	const b20: number = b[6];
	const b21: number = b[7];
	const b22: number = b[8];

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
}

/**
 * Translates a three-by-three matrix by a vector.
 * @param out The matrix to fill with the result.
 * @param a The matrix to translate.
 * @param v The amount to translate by.
 * @returns The translated matrix.
 * @see [Source](https://glmatrix.net/)
 */
function translate<T extends Matrix3Like>(out: T, a: Matrix3Like, v: Vector2Like) {
	const a00: number = a[0];
	const a01: number = a[1];
	const a02: number = a[2];
	const a10: number = a[3];
	const a11: number = a[4];
	const a12: number = a[5];
	const a20: number = a[6];
	const a21: number = a[7];
	const a22: number = a[8];

	const x: number = v[0];
	const y: number = v[1];

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
}

/**
 * Rotates a three-by-three matrix around the Z-axis.
 * @param out The matrix to fill with the rotated matrix.
 * @param a The matrix to rotate.
 * @param rad The angle to rotate by.
 * @returns The rotated matrix.
 * @see [Source](https://glmatrix.net/)
 */
function rotate<T extends Matrix3Like>(out: T, a: Matrix3Like, rad: number): T {
	const a00: number = a[0];
	const a01: number = a[1];
	const a02: number = a[2];
	const a10: number = a[3];
	const a11: number = a[4];
	const a12: number = a[5];
	const a20: number = a[6];
	const a21: number = a[7];
	const a22: number = a[8];

	const s: number = Math.sin(rad);
	const c: number = Math.cos(rad);

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
}

/**
 * Scales a three-by-three matrix.
 * @param out The matrix to fill with the scaled matrix.
 * @param a The matrix to scale.
 * @param v The amount to scale by.
 * @returns The scaled matrix.
 * @see [Source](https://glmatrix.net/)
 */
function scale<T extends Matrix3Like>(out: T, a: Matrix3Like, v: Vector2Like): T {
	const x: number = v[0];
	const y: number = v[1];

	out[0] = x * a[0];
	out[1] = x * a[1];
	out[2] = x * a[2];
	out[3] = y * a[3];
	out[4] = y * a[4];
	out[5] = y * a[5];
	out[6] = a[6];
	out[7] = a[7];
	out[8] = a[8];
	return out;
}

/**
 * Sets a three-by-three matrix to translate by an amount.
 * @param out The matrix to fill.
 * @param v The amount to translate by.
 * @returns The translation matrix.
 * @see [Source](https://glmatrix.net/)
 */
function fromTranslation<T extends Matrix3Like>(out: T, v: Vector2Like): T {
	out[0] = 1;
	out[1] = 0;
	out[2] = 0;
	out[3] = 0;
	out[4] = 1;
	out[5] = 0;
	out[6] = v[0];
	out[7] = v[1];
	out[8] = 1;
	return out;
}

/**
 * Sets a three-by-three matrix to rotate by an amount around the Z-axis.
 * @param out The matrix to fill.
 * @param rad The amount to rotate by.
 * @returns The rotation matrix.
 * @see [Source](https://glmatrix.net/)
 */
function fromRotation<T extends Matrix3Like>(out: T, rad: number): T {
	const s: number = Math.sin(rad);
	const c: number = Math.cos(rad);

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
}

/**
 * Sets a three-by-three matrix to scale by a certain amount.
 * @param out The matrix to fill.
 * @param v The amount to scale by.
 * @returns The scaling matrix.
 * @see [Source](https://glmatrix.net/)
 */
function fromScaling<T extends Matrix3Like>(out: T, v: Vector2Like): T {
	out[0] = v[0];
	out[1] = 0;
	out[2] = 0;
	out[3] = 0;
	out[4] = v[1];
	out[5] = 0;
	out[6] = 0;
	out[7] = 0;
	out[8] = 1;
	return out;
}

/**
 * Sets a three-by-three matrix to rotate by a quaternion.
 * @param out The matrix to fill.
 * @param q The quaternion.
 * @returns The rotation matrix.
 * @see [Source](https://glmatrix.net/)
 */
function fromQuat<T extends Matrix3Like>(out: T, q: QuaternionLike): T {
	const x: number = q[0];
	const y: number = q[1];
	const z: number = q[2];
	const w: number = q[3];

	const x2: number = x + x;
	const y2: number = y + y;
	const z2: number = z + z;
	const xx: number = x * x2;
	const yx: number = y * x2;
	const yy: number = y * y2;
	const zx: number = z * x2;
	const zy: number = z * y2;
	const zz: number = z * z2;
	const wx: number = w * x2;
	const wy: number = w * y2;
	const wz: number = w * z2;

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
}

/**
 * Calculates a three-by-three normal (transpose inverse) matrix from a four-by-four matrix.
 * @param out Three matrix to fill.
 * @param a The four-by-four matrix.
 * @returns The normal matrix.
 * @see [Source](https://glmatrix.net/)
 */
function normalFromMat4<T extends Matrix3Like>(out: T, a: Matrix4Like): T {
	const a00: number = a[0];
	const a01: number = a[1];
	const a02: number = a[2];
	const a03: number = a[3];
	const a10: number = a[4];
	const a11: number = a[5];
	const a12: number = a[6];
	const a13: number = a[7];
	const a20: number = a[8];
	const a21: number = a[9];
	const a22: number = a[10];
	const a23: number = a[11];
	const a30: number = a[12];
	const a31: number = a[13];
	const a32: number = a[14];
	const a33: number = a[15];

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

	let det: number = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
	if (!det) {
		throw new Error("Cannot invert the matrix.");
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
}

/**
 * Generates a two-dimensional projection matrix.
 * @param out The matrix to fill.
 * @param width The width of the projection.
 * @param height The height of the projection.
 * @returns A projection matrix.
 * @see [Source](https://glmatrix.net/)
 */
function projection<T extends Matrix3Like>(out: T, width: number, height: number): T {
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
}

/**
 * Calculates the Frobenius normal of a three-by-three matrix.
 * @returns The Frobenius normal.
 * @see [Source](https://glmatrix.net/)
 */
function frob(a: Matrix3Like): number {
	return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8]);
}

/**
 * Adds two three-by-three matrices.
 * @param out The matrix to fill with the sum.
 * @param a The augend.
 * @param b The addend.
 * @returns The sum.
 * @see [Source](https://glmatrix.net/)
 */
function add<T extends Matrix3Like>(out: T, a: Matrix3Like, b: Matrix3Like): T {
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
}

/**
 * Subtracts a three-by-three matrix from another.
 * @param out The matrix to fill with the difference.
 * @param a The minuend.
 * @param b The subtrahend.
 * @returns The difference.
 * @see [Source](https://glmatrix.net/)
 */
function subtract<T extends Matrix3Like>(out: T, a: Matrix3Like, b: Matrix3Like): T {
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
}

/**
 * Multiplies a three-by-three matrix by a scalar.
 * @param out The matrix to fill with the product.
 * @param a The multiplier.
 * @param b The multiplicand.
 * @returns The product.
 * @see [Source](https://glmatrix.net/)
 */
function multiplyScalar<T extends Matrix3Like>(out: T, a: Matrix3Like, b: number): T {
	out[0] = a[0] * b;
	out[1] = a[1] * b;
	out[2] = a[2] * b;
	out[3] = a[3] * b;
	out[4] = a[4] * b;
	out[5] = a[5] * b;
	out[6] = a[6] * b;
	out[7] = a[7] * b;
	out[8] = a[8] * b;
	return out;
}

/**
 * Adds two three-by-three matrices after multiplying the addend by a scalar.
 * @param out The matrix to fill with the sum.
 * @param a The augend.
 * @param b The addend.
 * @param scale The scalar.
 * @returns The sum.
 * @see [Source](https://glmatrix.net/)
 */
function multiplyScalarAndAdd<T extends Matrix3Like>(out: T, a: Matrix3Like, b: Matrix3Like, scale: number): T {
	out[0] = a[0] + b[0] * scale;
	out[1] = a[1] + b[1] * scale;
	out[2] = a[2] + b[2] * scale;
	out[3] = a[3] + b[3] * scale;
	out[4] = a[4] + b[4] * scale;
	out[5] = a[5] + b[5] * scale;
	out[6] = a[6] + b[6] * scale;
	out[7] = a[7] + b[7] * scale;
	out[8] = a[8] + b[8] * scale;
	return out;
}

/**
 * Determines whether two three-by-three matrices are exactly equivalent.
 * @param a The first matrix.
 * @param b The second matrix.
 * @returns Whether the matrices are exactly equivalent.
 * @see [Source](https://glmatrix.net/)
 */
function exactEquals(a: Matrix3Like, b: Matrix3Like): boolean {
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
}

/**
 * Determines whether two three-by-three matrices are roughly equivalent.
 * @param a The first matrix.
 * @param b The second matrix.
 * @returns Whether the matrices are roughly equivalent.
 * @see [Source](https://glmatrix.net/)
 */
function equals(a: Matrix3Like, b: Matrix3Like): boolean {
	const a0: number = a[0];
	const a1: number = a[1];
	const a2: number = a[2];
	const a3: number = a[3];
	const a4: number = a[4];
	const a5: number = a[5];
	const a6: number = a[6];
	const a7: number = a[7];
	const a8: number = a[8];
	const b0: number = b[0];
	const b1: number = b[1];
	const b2: number = b[2];
	const b3: number = b[3];
	const b4: number = b[4];
	const b5: number = b[5];
	const b6: number = b[6];
	const b7: number = b[7];
	const b8: number = b[8];

	return Math.abs(a0 - b0) <= matrixEpsilon * Math.max(1.0, Math.abs(a0), Math.abs(b0))
		&& Math.abs(a1 - b1) <= matrixEpsilon * Math.max(1.0, Math.abs(a1), Math.abs(b1))
		&& Math.abs(a2 - b2) <= matrixEpsilon * Math.max(1.0, Math.abs(a2), Math.abs(b2))
		&& Math.abs(a3 - b3) <= matrixEpsilon * Math.max(1.0, Math.abs(a3), Math.abs(b3))
		&& Math.abs(a4 - b4) <= matrixEpsilon * Math.max(1.0, Math.abs(a4), Math.abs(b4))
		&& Math.abs(a5 - b5) <= matrixEpsilon * Math.max(1.0, Math.abs(a5), Math.abs(b5))
		&& Math.abs(a6 - b6) <= matrixEpsilon * Math.max(1.0, Math.abs(a6), Math.abs(b6))
		&& Math.abs(a7 - b7) <= matrixEpsilon * Math.max(1.0, Math.abs(a7), Math.abs(b7))
		&& Math.abs(a8 - b8) <= matrixEpsilon * Math.max(1.0, Math.abs(a8), Math.abs(b8));
}

/** A three-by-three matrix. */
export default class Matrix3 extends Float32Array implements SquareMatrix {
	/**
	 * Creates a three-by-three matrix from values.
	 * @param m00 The value in the first column and first row.
	 * @param m01 The value in the first column and second row.
	 * @param m02 The value in the first column and third row.
	 * @param m10 The value in the second column and first row.
	 * @param m11 The value in the second column and second row.
	 * @param m12 The value in the second column and third row.
	 * @param m20 The value in the third column and first row.
	 * @param m21 The value in the third column and second row.
	 * @param m22 The value in the third column and third row.
	 * @returns The matrix.
	 */
	public static fromValues(m00: number, m01: number, m02: number, m10: number, m11: number, m12: number, m20: number, m21: number, m22: number): Matrix3 {
		return fromValues(m00, m01, m02, m10, m11, m12, m20, m21, m22);
	}

	/**
	 * Creates a three-by-three matrix from the upper-left corner of a four-by-four matrix.
	 * @param matrix The four-by-four matrix.
	 * @returns The three-by-three matrix.
	 */
	public static fromMat4(matrix: Matrix4Like): Matrix3 {
		return fromMat4(new Matrix3(), matrix);
	}

	/**
	 * Creates a three-by-three matrix that translates by an amount.
	 * @param vector The amount to translate by.
	 * @returns The matrix.
	 */
	public static fromTranslation(vector: Vector2Like): Matrix3 {
		return fromTranslation(new Matrix3(), vector);
	}

	/**
	 * Creates a three-by-three matrix that rotates by an amount around the Z-axis.
	 * @param radians The amount to rotate by in radians.
	 * @returns The matrix.
	 */
	public static fromRotation(radians: number): Matrix3 {
		return fromRotation(new Matrix3(), radians);
	}

	/**
	 * Creates a matrix that scales by an amount.
	 * @param vector The amount to scale by.
	 * @returns The matrix.
	 */
	public static fromScaling(vector: Vector2Like): Matrix3 {
		return fromScaling(new Matrix3(), vector);
	}

	/**
	 * Creates a matrix that rotates by a quaternion.
	 * @param quaternion The quaternion.
	 * @returns The matrix.
	 */
	public static fromQuat(quaternion: QuaternionLike): Matrix3 {
		return fromQuat(new Matrix3(), quaternion);
	}

	/**
	 * Creates a three-by-three normal (transpose inverse) matrix from a four-by-four matrix.
	 * @param matrix The four-by-four matrix.
	 * @returns The normal matrix.
	 */
	public static normalFromMat4(matrix: Matrix4Like): Matrix3 {
		return normalFromMat4(new Matrix3(), matrix);
	}

	/**
	 * Creates a two-dimensional projection matrix.
	 * @param width The width of the projection.
	 * @param height The height of the projection.
	 * @returns This matrix.
	 */
	public static projection(width: number, height: number): Matrix3 {
		return projection(new Matrix3(), width, height);
	}

	/** Creates a three-by-three identity matrix. */
	public constructor() {
		super(9);
		this[0] = 1;
		this[4] = 1;
		this[8] = 1;
		this.width = 3;
		this.height = 3;
	}

	/** The number of columns in this matrix. */
	public readonly width: number;

	/** The number of rows in this matrix. */
	public readonly height: number;

	/**
	 * Gets the value at the given position in this matrix.
	 * @param row The row of the value.
	 * @param column The column of the value.
	 * @returns The value at the specified position.
	 */
	public get(row: number, column: number): number | undefined {
		return this[column * this.height + row];
	}

	/**
	 * Sets the value at the given position in this matrix.
	 * @param row The row of the value.
	 * @param column The column of the value.
	 * @param value The value.
	 */
	public put(row: number, column: number, value: number): void {
		this[column * this.height + row] = value;
	}

	/**
	 * Determines whether this matrix is roughly equivalent to another.
	 * @param matrix The other matrix.
	 * @returns Whether the matrices are roughly equivalent.
	 */
	public equals(matrix: Matrix3Like): boolean {
		return equals(this, matrix);
	}

	/**
	 * Determines whether this matrix is exactly equivalent to another.
	 * @param matrix The other matrix.
	 * @returns Whether the matrices are exactly equivalent.
	 */
	public exactEquals(matrix: Matrix3Like): boolean {
		return exactEquals(this, matrix);
	}

	/**
	 * Adds two matrices of the same size.
	 * @param matrix The other matrix.
	 * @returns The sum of the matrices.
	 */
	public add(matrix: Matrix3Like): this {
		return add(this, this, matrix);
	}

	/**
	 * Calculates the adjugate of this matrix.
	 * @returns The adjugate of this matrix.
	 */
	public adjoint(): this {
		return adjoint(this, this);
	}

	/**
	 * Creates a copy of this matrix.
	 * @returns A copy of this matrix.
	 */
	public clone(): Matrix3 {
		return clone(this);
	}

	/**
	 * Copies the values of another matrix into this one.
	 * @param matrix The matrix to copy.
	 * @returns This matrix.
	 */
	public copy(matrix: Matrix3Like): this {
		return copy(this, matrix);
	}

	/** The Frobenius normal of this matrix. */
	public get frob(): number {
		return frob(this);
	}

	/**
	 * Multiplies this matrix by another.
	 * @param matrix The other matrix.
	 * @returns The product of the matrices.
	 */
	public multiply(matrix: Matrix3Like): this {
		return multiply(this, this, matrix);
	}

	/**
	 * Multiplies this matrix by a scalar value.
	 * @param scalar The scalar value.
	 * @returns The product of the matrix and the scalar value.
	 */
	public multiplyScalar(scalar: number): this {
		return multiplyScalar(this, this, scalar);
	}

	/**
	 * Adds this matrix to another after multiplying the other by a scalar.
	 * @param matrix The other matrix.
	 * @param scalar The scalar.
	 * @returns The sum.
	 */
	public multiplyScalarAndAdd(matrix: Matrix3Like, scalar: number): this {
		return multiplyScalarAndAdd(this, this, matrix, scalar);
	}

	/**
	 * Subtracts another matrix from this one.
	 * @param matrix The other matrix.
	 * @returns The difference between the matrices.
	 */
	public subtract(matrix: Matrix3Like): this {
		return subtract(this, this, matrix);
	}

	/**
	 * Transposes this matrix.
	 * @returns The transpose of this matrix.
	 */
	public transpose(): this {
		return transpose(this, this);
	}

	/**
	 * Sets the values in this matrix.
	 * @param m00 The value in the first column and first row.
	 * @param m01 The value in the first column and second row.
	 * @param m02 The value in the first column and third row.
	 * @param m10 The value in the second column and first row.
	 * @param m11 The value in the second column and second row.
	 * @param m12 The value in the second column and third row.
	 * @param m20 The value in the third column and first row.
	 * @param m21 The value in the third column and second row.
	 * @param m22 The value in the third column and third row.
	 * @returns This matrix.
	 */
	public fromValues(m00: number, m01: number, m02: number, m10: number, m11: number, m12: number, m20: number, m21: number, m22: number): this {
		return set(this, m00, m01, m02, m10, m11, m12, m20, m21, m22);
	}

	/**
	 * Creates a matrix by removing the specified row and column from this matrix.
	 * @param row The row to remove.
	 * @param column The column to remove.
	 * @returns A submatrix.
	 */
	public submatrix(row: number, column: number): Matrix2 {
		const out: Matrix2 = new Matrix2();
		let k = 0;
		for (let i = 0; i < 3; i++) {
			if (i == column) {
				continue;
			}

			for (let j = 0; j < 3; j++) {
				if (j == row) {
					continue;
				}

				out[k++] = this.get(j, i) as number;
			}
		}
		return out;
	}

	/** The determinant of this matrix. */
	public get determinant(): number {
		return determinant(this);
	}

	/**
	 * Resets this matrix to identity.
	 * @returns This matrix.
	 */
	public identity(): this {
		return identity(this);
	}

	/**
	 * Inverts this matrix.
	 * @returns This matrix.
	 */
	public invert(): this {
		return invert(this, this);
	}

	/**
	 * Sets this matrix to the upper-left corner of a four-by-four matrix.
	 * @param matrix The four-by-four matrix.
	 * @returns This matrix.
	 */
	public fromMat4(matrix: Matrix4Like): this {
		return fromMat4(this, matrix);
	}

	/**
	 * Translates this matrix.
	 * @param vector The amount to translate by.
	 * @returns This matrix.
	 */
	public translate(vector: Vector2Like): this {
		return translate(this, this, vector);
	}

	/**
	 * Rotates this matrix around the Z-axis.
	 * @param radians The amount to rotate by in radians.
	 * @returns This matrix.
	 */
	public rotate(radians: number): this {
		return rotate(this, this, radians);
	}

	/**
	 * Scales this matrix.
	 * @param vector The amount to scale by.
	 * @returns This matrix.
	 */
	public scale(vector: Vector2Like): this {
		return scale(this, this, vector);
	}

	/**
	 * Sets this matrix to translate by an amount.
	 * @param vector The amount to translate by.
	 * @returns This matrix.
	 */
	public fromTranslation(vector: Vector2Like): this {
		return fromTranslation(this, vector);
	}

	/**
	 * Sets this matrix to rotate by an amount around the Z-axis.
	 * @param radians The amount to rotate by in radians.
	 * @returns This matrix.
	 */
	public fromRotation(radians: number): this {
		return fromRotation(this, radians);
	}

	/**
	 * Sets this matrix to scale by an amount.
	 * @param vector The amount to scale by.
	 * @returns This matrix.
	 */
	public fromScaling(vector: Vector2Like): this {
		return fromScaling(this, vector);
	}

	/**
	 * Sets this matrix to rotate by a quaternion.
	 * @param quaternion The quaternion.
	 * @returns This matrix.
	 */
	public fromQuat(quaternion: QuaternionLike): this {
		return fromQuat(this, quaternion);
	}

	/**
	 * Sets this matrix to a normal (transpose inverse) matrix of a four-by-four matrix.
	 * @param matrix The four-by-four matrix.
	 * @returns This matrix.
	 */
	public normalFromMat4(matrix: Matrix4Like): this {
		return normalFromMat4(this, matrix);
	}

	/**
	 * Sets this matrix to a two-dimensional projection matrix.
	 * @param width The width of the projection.
	 * @param height The height of the projection.
	 * @returns This matrix.
	 */
	public projection(width: number, height: number): this {
		return projection(this, width, height);
	}
}
