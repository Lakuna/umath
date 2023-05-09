import type FieldOfView from "../types/FieldOfView.js";
import type { DualQuaternionLike } from "./DualQuaternion.js";
import { matrixEpsilon, type SquareMatrix } from "./Matrix.js"
import Matrix3 from "./Matrix3.js";
import Quaternion, { type QuaternionLike } from "./Quaternion.js";
import Vector3, { type Vector3Like } from "./Vector3.js";

/** Numbers arranged into four columns and four rows. */
export type Matrix4Like = Matrix4 | [
	number, number, number, number,
	number, number, number, number,
	number, number, number, number,
	number, number, number, number
];

/**
 * Creates a clone of a four-by-four matrix.
 * @param a The matrix.
 * @returns A copy.
 * @see [Source](https://glmatrix.net/)
 */
function clone(a: Matrix4Like): Matrix4 {
	const out: Matrix4 = new Matrix4();
	out[0] = a[0];
	out[1] = a[1];
	out[2] = a[2];
	out[3] = a[3];
	out[4] = a[4];
	out[5] = a[5];
	out[6] = a[6];
	out[7] = a[7];
	out[8] = a[8];
	out[9] = a[9];
	out[10] = a[10];
	out[11] = a[11];
	out[12] = a[12];
	out[13] = a[13];
	out[14] = a[14];
	out[15] = a[15];
	return out;
}

/**
 * Copies the values in a four-by-four matrix into another.
 * @param out The matrix to copy into.
 * @param a The matrix to copy.
 * @returns The copy.
 * @see [Source](https://glmatrix.net/)
 */
function copy<T extends Matrix4Like>(out: T, a: Matrix4Like): T {
	out[0] = a[0];
	out[1] = a[1];
	out[2] = a[2];
	out[3] = a[3];
	out[4] = a[4];
	out[5] = a[5];
	out[6] = a[6];
	out[7] = a[7];
	out[8] = a[8];
	out[9] = a[9];
	out[10] = a[10];
	out[11] = a[11];
	out[12] = a[12];
	out[13] = a[13];
	out[14] = a[14];
	out[15] = a[15];
	return out;
}

/**
 * Creates a four-by-four matrix with the given values.
 * @param m00 The value in the first column and first row.
 * @param m01 The value in the first column and second row.
 * @param m02 The value in the first column and third row.
 * @param m03 The value in the first column and fourth row.
 * @param m10 The value in the second column and first row.
 * @param m11 The value in the second column and second row.
 * @param m12 The value in the second column and third row.
 * @param m13 The value in the second column and fourth row.
 * @param m20 The value in the third column and first row.
 * @param m21 The value in the third column and second row.
 * @param m22 The value in the third column and third row.
 * @param m23 The value in the third column and fourth row.
 * @param m30 The value in the fourth column and first row.
 * @param m31 The value in the fourth column and second row.
 * @param m32 The value in the fourth column and third row.
 * @param m33 The value in the fourth column and fourth row.
 * @returns The matrix.
 * @see [Source](https://glmatrix.net/)
 */
function fromValues(m00: number, m01: number, m02: number, m03: number, m10: number, m11: number, m12: number, m13: number, m20: number, m21: number, m22: number, m23: number, m30: number, m31: number, m32: number, m33: number): Matrix4 {
	const out: Matrix4 = new Matrix4();
	out[0] = m00;
	out[1] = m01;
	out[2] = m02;
	out[3] = m03;
	out[4] = m10;
	out[5] = m11;
	out[6] = m12;
	out[7] = m13;
	out[8] = m20;
	out[9] = m21;
	out[10] = m22;
	out[11] = m23;
	out[12] = m30;
	out[13] = m31;
	out[14] = m32;
	out[15] = m33;
	return out;
}

/**
 * Sets the values in a four-by-four matrix.
 * @param out The matrix.
 * @param m00 The value in the first column and first row.
 * @param m01 The value in the first column and second row.
 * @param m02 The value in the first column and third row.
 * @param m03 The value in the first column and fourth row.
 * @param m10 The value in the second column and first row.
 * @param m11 The value in the second column and second row.
 * @param m12 The value in the second column and third row.
 * @param m13 The value in the second column and fourth row.
 * @param m20 The value in the third column and first row.
 * @param m21 The value in the third column and second row.
 * @param m22 The value in the third column and third row.
 * @param m23 The value in the third column and fourth row.
 * @param m30 The value in the fourth column and first row.
 * @param m31 The value in the fourth column and second row.
 * @param m32 The value in the fourth column and third row.
 * @param m33 The value in the fourth column and fourth row.
 * @returns The matrix.
 * @see [Source](https://glmatrix.net/)
 */
function set<T extends Matrix4Like>(out: T, m00: number, m01: number, m02: number, m03: number, m10: number, m11: number, m12: number, m13: number, m20: number, m21: number, m22: number, m23: number, m30: number, m31: number, m32: number, m33: number): T {
	out[0] = m00;
	out[1] = m01;
	out[2] = m02;
	out[3] = m03;
	out[4] = m10;
	out[5] = m11;
	out[6] = m12;
	out[7] = m13;
	out[8] = m20;
	out[9] = m21;
	out[10] = m22;
	out[11] = m23;
	out[12] = m30;
	out[13] = m31;
	out[14] = m32;
	out[15] = m33;
	return out;
}

/**
 * Sets a four-by-four matrix to the identity.
 * @param out The matrix.
 * @returns The matrix.
 * @see [Source](https://glmatrix.net/)
 */
function identity<T extends Matrix4Like>(out: T): T {
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
 * Transposes a four-by-four matrix.
 * @param out The matrix to fill with the transpose.
 * @param a The matrix to transpose.
 * @returns The transpose.
 * @see [Source](https://glmatrix.net/)
 */
function transpose<T extends Matrix4Like>(out: T, a: Matrix4Like): T {
	if (out === a) {
		const a01: number = a[1];
		const a02: number = a[2];
		const a03: number = a[3];
		const a12: number = a[6];
		const a13: number = a[7];
		const a23: number = a[11];

		out[1] = a[4];
		out[2] = a[8];
		out[3] = a[12];
		out[4] = a01;
		out[6] = a[9];
		out[7] = a[13];
		out[8] = a02;
		out[9] = a12;
		out[11] = a[14];
		out[12] = a03;
		out[13] = a13;
		out[14] = a23;
	} else {
		out[0] = a[0];
		out[1] = a[4];
		out[2] = a[8];
		out[3] = a[12];
		out[4] = a[1];
		out[5] = a[5];
		out[6] = a[9];
		out[7] = a[13];
		out[8] = a[2];
		out[9] = a[6];
		out[10] = a[10];
		out[11] = a[14];
		out[12] = a[3];
		out[13] = a[7];
		out[14] = a[11];
		out[15] = a[15];
	}
	return out;
}

/**
 * Inverts a four-by-four matrix.
 * @param out The matrix to fill with the inverted matrix.
 * @param a The matrix to invert.
 * @returns The inverted matrix.
 * @see [Source](https://glmatrix.net/)
 */
function invert<T extends Matrix4Like>(out: T, a: Matrix4Like): T {
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
 * Calculates the adjugate of a four-by-four matrix.
 * @param out The matrix to fill with the adjugate.
 * @param a The matrix to calculate the adjugate of.
 * @returns The adjugate.
 * @see [Source](https://glmatrix.net/)
 */
function adjoint<T extends Matrix4Like>(out: T, a: Matrix4Like): T {
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

	out[0] = a11 * (a22 * a33 - a23 * a32)
		- a21 * (a12 * a33 - a13 * a32)
		+ a31 * (a12 * a23 - a13 * a22);
	out[1] = -(a01 * (a22 * a33 - a23 * a32)
		- a21 * (a02 * a33 - a03 * a32)
		+ a31 * (a02 * a23 - a03 * a22));
	out[2] = a01 * (a12 * a33 - a13 * a32)
		- a11 * (a02 * a33 - a03 * a32)
		+ a31 * (a02 * a13 - a03 * a12);
	out[3] = -(a01 * (a12 * a23 - a13 * a22)
		- a11 * (a02 * a23 - a03 * a22)
		+ a21 * (a02 * a13 - a03 * a12));
	out[4] = -(a10 * (a22 * a33 - a23 * a32)
		- a20 * (a12 * a33 - a13 * a32)
		+ a30 * (a12 * a23 - a13 * a22));
	out[5] = a00 * (a22 * a33 - a23 * a32)
		- a20 * (a02 * a33 - a03 * a32)
		+ a30 * (a02 * a23 - a03 * a22);
	out[6] = -(a00 * (a12 * a33 - a13 * a32)
		- a10 * (a02 * a33 - a03 * a32)
		+ a30 * (a02 * a13 - a03 * a12));
	out[7] = a00 * (a12 * a23 - a13 * a22)
		- a10 * (a02 * a23 - a03 * a22)
		+ a20 * (a02 * a13 - a03 * a12);
	out[8] = a10 * (a21 * a33 - a23 * a31)
		- a20 * (a11 * a33 - a13 * a31)
		+ a30 * (a11 * a23 - a13 * a21);
	out[9] = -(a00 * (a21 * a33 - a23 * a31)
		- a20 * (a01 * a33 - a03 * a31)
		+ a30 * (a01 * a23 - a03 * a21));
	out[10] = a00 * (a11 * a33 - a13 * a31)
		- a10 * (a01 * a33 - a03 * a31)
		+ a30 * (a01 * a13 - a03 * a11);
	out[11] = -(a00 * (a11 * a23 - a13 * a21)
		- a10 * (a01 * a23 - a03 * a21)
		+ a20 * (a01 * a13 - a03 * a11));
	out[12] = -(a10 * (a21 * a32 - a22 * a31)
		- a20 * (a11 * a32 - a12 * a31)
		+ a30 * (a11 * a22 - a12 * a21));
	out[13] = a00 * (a21 * a32 - a22 * a31)
		- a20 * (a01 * a32 - a02 * a31)
		+ a30 * (a01 * a22 - a02 * a21);
	out[14] = -(a00 * (a11 * a32 - a12 * a31)
		- a10 * (a01 * a32 - a02 * a31)
		+ a30 * (a01 * a12 - a02 * a11));
	out[15] = a00 * (a11 * a22 - a12 * a21)
		- a10 * (a01 * a22 - a02 * a21)
		+ a20 * (a01 * a12 - a02 * a11);
	return out;
}

/**
 * Calculates the determinant of a four-by-four matrix.
 * @param a The matrix.
 * @returns The determinant.
 * @see [Source](https://glmatrix.net/)
 */
function determinant(a: Matrix4Like): number {
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

	return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
}

/**
 * Multiplies two four-by-four matrices.
 * @param out The matrix to fill with the product.
 * @param a The multiplier.
 * @param b The multiplicand.
 * @returns The product.
 * @see [Source](https://glmatrix.net/)
 */
function multiply<T extends Matrix4Like>(out: T, a: Matrix4Like, b: Matrix4Like): T {
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

	let b0: number = b[0];
	let b1: number = b[1];
	let b2: number = b[2];
	let b3: number = b[3];

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
 * Translates a four-by-four matrix.
 * @param out The matrix to fill with the translated matrix.
 * @param a The matrix to translate.
 * @param v The amount to translate by.
 * @returns The translated matrix.
 * @see [Source](https://glmatrix.net/)
 */
function translate<T extends Matrix4Like>(out: T, a: Matrix4Like, v: Vector3Like): T {
	const x: number = v[0];
	const y: number = v[1];
	const z: number = v[2];

	if (a === out) {
		out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
		out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
		out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
		out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
	} else {
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
		out[12] = a00 * x + a10 * y + a20 * z + a[12];
		out[13] = a01 * x + a11 * y + a21 * z + a[13];
		out[14] = a02 * x + a12 * y + a22 * z + a[14];
		out[15] = a03 * x + a13 * y + a23 * z + a[15];
	}
	return out;
}

/**
 * Scales a four-by-four matrix.
 * @param out The matrix to fill with the scaled matrix.
 * @param a The matrix to scale.
 * @param v The amount to scale by.
 * @returns The scaled matrix.
 * @see [Source](https://glmatrix.net/)
 */
function scale<T extends Matrix4Like>(out: T, a: Matrix4Like, v: Vector3Like): T {
	const x: number = v[0];
	const y: number = v[1];
	const z: number = v[2];

	out[0] = a[0] * x;
	out[1] = a[1] * x;
	out[2] = a[2] * x;
	out[3] = a[3] * x;
	out[4] = a[4] * y;
	out[5] = a[5] * y;
	out[6] = a[6] * y;
	out[7] = a[7] * y;
	out[8] = a[8] * z;
	out[9] = a[9] * z;
	out[10] = a[10] * z;
	out[11] = a[11] * z;
	out[12] = a[12];
	out[13] = a[13];
	out[14] = a[14];
	out[15] = a[15];
	return out;
}

/**
 * Rotates a four-by-four matrix.
 * @param out The matrix to fill with the rotated matrix.
 * @param a The matrix to rotate.
 * @param rad The amount to rotate by in radians.
 * @param axis The axis to rotate around.
 * @returns The rotated matrix.
 * @see [Source](https://glmatrix.net/)
 */
function rotate<T extends Matrix4Like>(out: T, a: Matrix4Like, rad: number, axis: Vector3Like): T {
	let x: number = axis[0];
	let y: number = axis[1];
	let z: number = axis[2];

	let len: number = Math.hypot(x, y, z);
	if (len < matrixEpsilon) {
		throw new Error("Cannot rotate the matrix.");
	}
	len = 1 / len;

	x *= len;
	y *= len;
	z *= len;

	const s: number = Math.sin(rad);
	const c: number = Math.cos(rad);
	const t: number = 1 - c;

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

	if (a !== out) {
		out[12] = a[12];
		out[13] = a[13];
		out[14] = a[14];
		out[15] = a[15];
	}
	return out;
}

/**
 * Rotates a four-by-four matrix around the X-axis.
 * @param out The matrix to fill with the rotated matrix.
 * @param a The matrix to rotate.
 * @param rad The amount to rotate by in radians.
 * @returns The rotated matrix.
 * @see [Source](https://glmatrix.net/)
 */
function rotateX<T extends Matrix4Like>(out: T, a: Matrix4Like, rad: number): T {
	const s: number = Math.sin(rad);
	const c: number = Math.cos(rad);

	const a10: number = a[4];
	const a11: number = a[5];
	const a12: number = a[6];
	const a13: number = a[7];
	const a20: number = a[8];
	const a21: number = a[9];
	const a22: number = a[10];
	const a23: number = a[11];

	if (a !== out) {
		out[0] = a[0];
		out[1] = a[1];
		out[2] = a[2];
		out[3] = a[3];
		out[12] = a[12];
		out[13] = a[13];
		out[14] = a[14];
		out[15] = a[15];
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
 * Rotates a four-by-four matrix around the Y-axis.
 * @param out The matrix to fill with the rotated matrix.
 * @param a The matrix to rotate.
 * @param rad The amount to rotate by in radians.
 * @returns The rotated matrix.
 * @see [Source](https://glmatrix.net/)
 */
function rotateY<T extends Matrix4Like>(out: T, a: Matrix4Like, rad: number): T {
	const s: number = Math.sin(rad);
	const c: number = Math.cos(rad);

	const a00: number = a[0];
	const a01: number = a[1];
	const a02: number = a[2];
	const a03: number = a[3];
	const a20: number = a[8];
	const a21: number = a[9];
	const a22: number = a[10];
	const a23: number = a[11];

	if (a !== out) {
		out[4] = a[4];
		out[5] = a[5];
		out[6] = a[6];
		out[7] = a[7];
		out[12] = a[12];
		out[13] = a[13];
		out[14] = a[14];
		out[15] = a[15];
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
 * Rotates a four-by-four matrix around the Z-axis.
 * @param out The matrix to fill with the rotated matrix.
 * @param a The matrix to rotate.
 * @param rad The amount to rotate by in radians.
 * @returns The rotated matrix.
 * @see [Source](https://glmatrix.net/)
 */
function rotateZ<T extends Matrix4Like>(out: T, a: Matrix4Like, rad: number): T {
	const s: number = Math.sin(rad);
	const c: number = Math.cos(rad);

	const a00: number = a[0];
	const a01: number = a[1];
	const a02: number = a[2];
	const a03: number = a[3];
	const a10: number = a[4];
	const a11: number = a[5];
	const a12: number = a[6];
	const a13: number = a[7];

	if (a !== out) {
		out[8] = a[8];
		out[9] = a[9];
		out[10] = a[10];
		out[11] = a[11];
		out[12] = a[12];
		out[13] = a[13];
		out[14] = a[14];
		out[15] = a[15];
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
 * Creates a four-by-four matrix that translates by the given amount.
 * @param out The matrix to fill with the translation matrix.
 * @param v The amount to translate by.
 * @returns The translation matrix.
 * @see [Source](https://glmatrix.net/)
 */
function fromTranslation<T extends Matrix4Like>(out: T, v: Vector3Like): T {
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
	out[12] = v[0];
	out[13] = v[1];
	out[14] = v[2];
	out[15] = 1;
	return out;
}

/**
 * Creates a four-by-four matrix that scales by the given amount.
 * @param out The matrix to fill with the scaling matrix.
 * @param v The amount to scale by.
 * @returns The scaling matrix.
 * @see [Source](https://glmatrix.net/)
 */
function fromScaling<T extends Matrix4Like>(out: T, v: Vector3Like): T {
	out[0] = v[0];
	out[1] = 0;
	out[2] = 0;
	out[3] = 0;
	out[4] = 0;
	out[5] = v[1];
	out[6] = 0;
	out[7] = 0;
	out[8] = 0;
	out[9] = 0;
	out[10] = v[2];
	out[11] = 0;
	out[12] = 0;
	out[13] = 0;
	out[14] = 0;
	out[15] = 1;
	return out;
}

/**
 * Creates a four-by-four matrix that applies the given rotation.
 * @param out The matrix to fill with the rotation matrix.
 * @param rad The amount to rotate by in radians.
 * @param axis The axis to rotate around.
 * @returns The rotation matrix.
 * @see [Source](https://glmatrix.net/)
 */
function fromRotation<T extends Matrix4Like>(out: T, rad: number, axis: Vector3Like): T {
	let x: number = axis[0];
	let y: number = axis[1];
	let z: number = axis[2];

	let len: number = Math.hypot(x, y, z);
	if (len < matrixEpsilon) {
		throw new Error("Cannot rotate the matrix.");
	}
	len = 1 / len;

	x *= len;
	y *= len;
	z *= len;

	const s: number = Math.sin(rad);
	const c: number = Math.cos(rad);
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
 * Creates a four-by-four matrix that rotates around the X-axis.
 * @param out The matrix to fill with the rotation matrix.
 * @param rad The amount to rotate by in radians.
 * @returns The rotation matrix.
 * @see [Source](https://glmatrix.net/)
 */
function fromXRotation<T extends Matrix4Like>(out: T, rad: number): T {
	const s: number = Math.sin(rad);
	const c: number = Math.cos(rad);

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
 * Creates a four-by-four matrix that rotates around the Y-axis.
 * @param out The matrix to fill with the rotation matrix.
 * @param rad The amount to rotate by in radians.
 * @returns The rotation matrix.
 * @see [Source](https://glmatrix.net/)
 */
function fromYRotation<T extends Matrix4Like>(out: T, rad: number): T {
	const s: number = Math.sin(rad);
	const c: number = Math.cos(rad);

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
 * Creates a four-by-four matrix that rotates around the Z-axis.
 * @param out The matrix to fill with the rotation matrix.
 * @param rad The amount to rotate by in radians.
 * @returns The rotation matrix.
 * @see [Source](https://glmatrix.net/)
 */
function fromZRotation<T extends Matrix4Like>(out: T, rad: number): T {
	const s: number = Math.sin(rad);
	const c: number = Math.cos(rad);

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
 * Creates a four-by-four matrix that rotates by the given quaternion and translates by the given amount.
 * @param out The matrix to fill with the result.
 * @param q The quaternion to rotate by.
 * @param v The amount to translate by.
 * @returns The transformation matrix.
 * @see [Source](https://glmatrix.net/)
 */
function fromRotationTranslation<T extends Matrix4Like>(out: T, q: QuaternionLike, v: Vector3Like): T {
	const x: number = q[0];
	const y: number = q[1];
	const z: number = q[2];
	const w: number = q[3];

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
	out[12] = v[0];
	out[13] = v[1];
	out[14] = v[2];
	out[15] = 1;
	return out;
}

/**
 * Creates a four-by-four matrix from a dual quaternion.
 * @param out The matrix to fill with the transformation matrix.
 * @param a The dual quaternion.
 * @returns The transformation matrix.
 * @see [Source](https://glmatrix.net/)
 */
function fromQuat2<T extends Matrix4Like>(out: T, a: DualQuaternionLike): T {
	const bx: number = -a[0];
	const by: number = -a[1];
	const bz: number = -a[2];
	const bw: number = a[3];
	const ax: number = a[4];
	const ay: number = a[5];
	const az: number = a[6];
	const aw: number = a[7];

	const magnitude: number = bx * bx + by * by + bz * bz + bw * bw;

	let x;
	let y;
	let z;
	if (magnitude > 0) {
		x = ((ax * bw + aw * bx + ay * bz - az * by) * 2) / magnitude;
		y = ((ay * bw + aw * by + az * bx - ax * bz) * 2) / magnitude;
		z = ((az * bw + aw * bz + ax * by - ay * bx) * 2) / magnitude;
	} else {
		x = (ax * bw + aw * bx + ay * bz - az * by) * 2;
		y = (ay * bw + aw * by + az * bx - ax * bz) * 2;
		z = (az * bw + aw * bz + ax * by - ay * bx) * 2;
	}

	fromRotationTranslation(out, a as QuaternionLike, [x, y, z]);
	return out;
}

/**
 * Gets the translation component of a four-by-four matrix.
 * @param out The vector to fill with the translation.
 * @param mat The matrix.
 * @returns The translation vector.
 * @see [Source](https://glmatrix.net/)
 */
function getTranslation<T extends Vector3Like>(out: T, mat: Matrix4Like): T {
	out[0] = mat[12];
	out[1] = mat[13];
	out[2] = mat[14];
	return out;
}

/**
 * Gets the scaling component of a four-by-four matrix.
 * @param out The vector to fill with the scaling amount.
 * @param mat The matrix.
 * @returns The scaling vector.
 * @see [Source](https://glmatrix.net/)
 */
function getScaling<T extends Vector3Like>(out: T, mat: Matrix4Like): T {
	const m11: number = mat[0];
	const m12: number = mat[1];
	const m13: number = mat[2];
	const m21: number = mat[4];
	const m22: number = mat[5];
	const m23: number = mat[6];
	const m31: number = mat[8];
	const m32: number = mat[9];
	const m33: number = mat[10];

	out[0] = Math.hypot(m11, m12, m13);
	out[1] = Math.hypot(m21, m22, m23);
	out[2] = Math.hypot(m31, m32, m33);
	return out;
}

/**
 * Gets the rotation described by a four-by-four matrix as a quaternion.
 * @param out The quaternion to fill with the rotation.
 * @param mat The matrix.
 * @returns The quaternion.
 * @see [Source](https://glmatrix.net/)
 */
function getRotation<T extends QuaternionLike>(out: T, mat: Matrix4Like): T {
	const scaling: Vector3Like = new Float32Array(3) as Vector3Like;
	getScaling(scaling, mat);

	const is1: number = 1 / scaling[0];
	const is2: number = 1 / scaling[1];
	const is3: number = 1 / scaling[2];

	const sm11: number = mat[0] * is1;
	const sm12: number = mat[1] * is2;
	const sm13: number = mat[2] * is3;
	const sm21: number = mat[4] * is1;
	const sm22: number = mat[5] * is2;
	const sm23: number = mat[6] * is3;
	const sm31: number = mat[8] * is1;
	const sm32: number = mat[9] * is2;
	const sm33: number = mat[10] * is3;

	const trace: number = sm11 + sm22 + sm33;

	let S = 0;
	if (trace > 0) {
		S = Math.sqrt(trace + 1) * 2;
		out[3] = 0.25 * S;
		out[0] = (sm23 - sm32) / S;
		out[1] = (sm31 - sm13) / S;
		out[2] = (sm12 - sm21) / S;
	} else if (sm11 > sm22 && sm11 > sm33) {
		S = Math.sqrt(1 + sm11 - sm22 - sm33) * 2;
		out[3] = (sm23 - sm32) / S;
		out[0] = 0.25 * S;
		out[1] = (sm12 + sm21) / S;
		out[2] = (sm31 + sm13) / S;
	} else if (sm22 > sm33) {
		S = Math.sqrt(1 + sm22 - sm11 - sm33) * 2;
		out[3] = (sm31 - sm13) / S;
		out[0] = (sm12 + sm21) / S;
		out[1] = 0.25 * S;
		out[2] = (sm23 + sm32) / S;
	} else {
		S = Math.sqrt(1 + sm33 - sm11 - sm22) * 2;
		out[3] = (sm12 - sm21) / S;
		out[0] = (sm31 + sm13) / S;
		out[1] = (sm23 + sm32) / S;
		out[2] = 0.25 * S;
	}
	return out;
}

/**
 * Creates a four-by-four transformation matrix that applies the given rotation, translation, and scaling.
 * @param out The matrix to fill with the transformation matrix.
 * @param q The quaternion to rotate by.
 * @param v The vector to translate by.
 * @param s The vector to scale by.
 * @returns The transformation matrix.
 * @see [Source](https://glmatrix.net/)
 */
function fromRotationTranslationScale<T extends Matrix4Like>(out: T, q: QuaternionLike, v: Vector3Like, s: Vector3Like): T {
	const x: number = q[0];
	const y: number = q[1];
	const z: number = q[2];
	const w: number = q[3];

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

	const sx: number = s[0];
	const sy: number = s[1];
	const sz: number = s[2];

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
	out[12] = v[0];
	out[13] = v[1];
	out[14] = v[2];
	out[15] = 1;
	return out;
}

/**
 * Creates a four-by-four transformation matrix that translates, rotates, and scales by the given amounts around the given origin.
 * @param out The matrix to fill with the transformation matrix.
 * @param q The quaternion to rotate by.
 * @param v The vector to translate by.
 * @param s The vector to scale by.
 * @param o The origin.
 * @returns The transformation matrix.
 * @see [Source](https://glmatrix.net/)
 */
function fromRotationTranslationScaleOrigin<T extends Matrix4Like>(out: T, q: QuaternionLike, v: Vector3Like, s: Vector3Like, o: Vector3Like): T {
	const x: number = q[0];
	const y: number = q[1];
	const z: number = q[2];
	const w: number = q[3];

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

	const sx: number = s[0];
	const sy: number = s[1];
	const sz: number = s[2];
	const ox: number = o[0];
	const oy: number = o[1];
	const oz: number = o[2];

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
	out[12] = v[0] + ox - (out0 * ox + out4 * oy + out8 * oz);
	out[13] = v[1] + oy - (out1 * ox + out5 * oy + out9 * oz);
	out[14] = v[2] + oz - (out2 * ox + out6 * oy + out10 * oz);
	out[15] = 1;
	return out;
}

/**
 * Creates a four-by-four matrix that rotates by the given quaternion.
 * @param out The matrix to fill with the rotation matrix.
 * @param q The quaternion.
 * @returns The rotation matrix.
 * @see [Source](https://glmatrix.net/)
 */
function fromQuat<T extends Matrix4Like>(out: T, q: QuaternionLike): T {
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
	out[1] = yx + wz;
	out[2] = zx - wy;
	out[3] = 0;
	out[4] = yx - wz;
	out[5] = 1 - xx - zz;
	out[6] = zy + wx;
	out[7] = 0;
	out[8] = zx + wy;
	out[9] = zy - wx;
	out[10] = 1 - xx - yy;
	out[11] = 0;
	out[12] = 0;
	out[13] = 0;
	out[14] = 0;
	out[15] = 1;
	return out;
}

/**
 * Generates a four-by-four frustum matrix with the given bounds.
 * @param out The matrix to fill with the frustum matrix.
 * @param left The left bound of the frustum.
 * @param right The right bound of the frustum.
 * @param bottom The bottom bound of the frustum.
 * @param top The top bound of the frustum.
 * @param near The near bound of the frustum.
 * @param far The far bound of the frustum.
 * @returns The frustum matrix.
 * @see [Source](https://glmatrix.net/)
 */
function frustum<T extends Matrix4Like>(out: T, left: number, right: number, bottom: number, top: number, near: number, far: number): T {
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
 * Generates a four-by-four perspective matrix with the given bounds.
 * @param out The matrix to fill with the projection matrix.
 * @param fovy The vertical field of view of the projection in radians.
 * @param aspect The aspect ratio of the projection.
 * @param near The near bound of the frustum.
 * @param far The far bound of the frustum (infinite if not set).
 * @returns The projection matrix.
 * @see [Source](https://glmatrix.net/)
 */
function perspective<T extends Matrix4Like>(out: T, fovy: number, aspect: number, near: number, far?: number): T {
	const f: number = 1 / Math.tan(fovy / 2);

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

	if (far != null && far !== Infinity) {
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
 * Generates a four-by-four perspective projection matrix from a field of view.
 * @param out The matrix to fill with the projection matrix.
 * @param fov The field of view.
 * @param near The near bound of the frustum.
 * @param far The far bound of the frustum.
 * @returns The projection matrix.
 * @see [Source](https://glmatrix.net/)
 */
function perspectiveFromFieldOfView<T extends Matrix4Like>(out: T, fov: FieldOfView, near: number, far: number): T {
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
 * Generates a four-by-four orthogonal projection matrix with the given bounds.
 * @param out The matrix to fill with the projection matrix.
 * @param left The left bound of the frustum.
 * @param right The right bound of the frustum.
 * @param bottom The bottom bound of the frustum.
 * @param top The top bound of the frustum.
 * @param near The near bound of the frustum.
 * @param far The far bound of the frustum.
 * @returns The projection matrix.
 * @see [Source](https://glmatrix.net/)
 */
function ortho<T extends Matrix4Like>(out: T, left: number, right: number, bottom: number, top: number, near: number, far: number): T {
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
 * Generates a four-by-four look-at matrix.
 * @param out The matrix that the frustum matrix will be written to.
 * @param eye The position of the viewer.
 * @param center The position that the viewer is looking at.
 * @param up A vector representing the up direction.
 * @returns The frustum matrix.
 * @see [Source](https://glmatrix.net/)
 */
function lookAt<T extends Matrix4Like>(out: T, eye: Vector3Like, center: Vector3Like, up: Vector3Like): T {
	const eyex: number = eye[0];
	const eyey: number = eye[1];
	const eyez: number = eye[2];

	const upx: number = up[0];
	const upy: number = up[1];
	const upz: number = up[2];

	const centerx: number = center[0];
	const centery: number = center[1];
	const centerz: number = center[2];

	if (
		Math.abs(eyex - centerx) < matrixEpsilon
		&& Math.abs(eyey - centery) < matrixEpsilon
		&& Math.abs(eyez - centerz) < matrixEpsilon
	) {
		return identity(out);
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

	let y0 = z1 * x2 - z2 * x1;
	let y1 = z2 * x0 - z0 * x2;
	let y2 = z0 * x1 - z1 * x0;
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
 * Generates a four-by-four matrix that makes something look at something else.
 * @param out The matrix that will be written to.
 * @param eye The position of the viewer.
 * @param center The position that the viewer is looking at.
 * @param up A vector representing the up direction.
 * @returns The matrix.
 * @see [Source](https://glmatrix.net/)
 */
function targetTo<T extends Matrix4Like>(out: T, eye: Vector3Like, target: Vector3Like, up: Vector3Like): T {
	const eyex: number = eye[0];
	const eyey: number = eye[1];
	const eyez: number = eye[2];

	const upx: number = up[0];
	const upy: number = up[1];
	const upz: number = up[2];

	let z0: number = eyex - target[0];
	let z1: number = eyey - target[1];
	let z2: number = eyez - target[2];
	let len = z0 * z0 + z1 * z1 + z2 * z2;
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
 * Calculates the Frobenius normal of a four-by-four matrix.
 * @param a The matrix.
 * @returns The Frobenius normal.
 * @see [Source](https://glmatrix.net/)
 */
function frob(a: Matrix4Like): number {
	return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]);
}

/**
 * Adds two four-by-four matrices.
 * @param out The matrix to fill with the sum.
 * @param a The augend.
 * @param b The addend.
 * @returns The sum.
 * @see [Source](https://glmatrix.net/)
 */
function add<T extends Matrix4Like>(out: T, a: Matrix4Like, b: Matrix4Like): T {
	out[0] = a[0] + b[0];
	out[1] = a[1] + b[1];
	out[2] = a[2] + b[2];
	out[3] = a[3] + b[3];
	out[4] = a[4] + b[4];
	out[5] = a[5] + b[5];
	out[6] = a[6] + b[6];
	out[7] = a[7] + b[7];
	out[8] = a[8] + b[8];
	out[9] = a[9] + b[9];
	out[10] = a[10] + b[10];
	out[11] = a[11] + b[11];
	out[12] = a[12] + b[12];
	out[13] = a[13] + b[13];
	out[14] = a[14] + b[14];
	out[15] = a[15] + b[15];
	return out;
}

/**
 * Subtracts one four-by-four matrix from another.
 * @param out The matrix to fill with the difference.
 * @param a The minuend.
 * @param b The subtrahend.
 * @returns The difference.
 * @see [Source](https://glmatrix.net/)
 */
function subtract<T extends Matrix4Like>(out: T, a: Matrix4Like, b: Matrix4Like): T {
	out[0] = a[0] - b[0];
	out[1] = a[1] - b[1];
	out[2] = a[2] - b[2];
	out[3] = a[3] - b[3];
	out[4] = a[4] - b[4];
	out[5] = a[5] - b[5];
	out[6] = a[6] - b[6];
	out[7] = a[7] - b[7];
	out[8] = a[8] - b[8];
	out[9] = a[9] - b[9];
	out[10] = a[10] - b[10];
	out[11] = a[11] - b[11];
	out[12] = a[12] - b[12];
	out[13] = a[13] - b[13];
	out[14] = a[14] - b[14];
	out[15] = a[15] - b[15];
	return out;
}

/**
 * Multiplies a four-by-four matrix by a scalar.
 * @param out The matrix to fill with the product.
 * @param a The multiplier.
 * @param b The multiplicand.
 * @returns The product.
 * @see [Source](https://glmatrix.net/)
 */
function multiplyScalar<T extends Matrix4Like>(out: T, a: Matrix4Like, b: number): T {
	out[0] = a[0] * b;
	out[1] = a[1] * b;
	out[2] = a[2] * b;
	out[3] = a[3] * b;
	out[4] = a[4] * b;
	out[5] = a[5] * b;
	out[6] = a[6] * b;
	out[7] = a[7] * b;
	out[8] = a[8] * b;
	out[9] = a[9] * b;
	out[10] = a[10] * b;
	out[11] = a[11] * b;
	out[12] = a[12] * b;
	out[13] = a[13] * b;
	out[14] = a[14] * b;
	out[15] = a[15] * b;
	return out;
}

/**
 * Adds two four-by-four matrices after multiplying the addend by a scalar.
 * @param out The matrix to fill with the sum.
 * @param a The augend.
 * @param b The addend.
 * @param scale The scalar.
 * @returns The sum.
 * @see [Source](https://glmatrix.net/)
 */
function multiplyScalarAndAdd<T extends Matrix4Like>(out: T, a: Matrix4Like, b: Matrix4Like, scale: number): T {
	out[0] = a[0] + b[0] * scale;
	out[1] = a[1] + b[1] * scale;
	out[2] = a[2] + b[2] * scale;
	out[3] = a[3] + b[3] * scale;
	out[4] = a[4] + b[4] * scale;
	out[5] = a[5] + b[5] * scale;
	out[6] = a[6] + b[6] * scale;
	out[7] = a[7] + b[7] * scale;
	out[8] = a[8] + b[8] * scale;
	out[9] = a[9] + b[9] * scale;
	out[10] = a[10] + b[10] * scale;
	out[11] = a[11] + b[11] * scale;
	out[12] = a[12] + b[12] * scale;
	out[13] = a[13] + b[13] * scale;
	out[14] = a[14] + b[14] * scale;
	out[15] = a[15] + b[15] * scale;
	return out;
}

/**
 * Determines whether two four-by-four matrices are exactly equivalent.
 * @param a The first matrix.
 * @param b The second matrix.
 * @returns Whether the matrices are exactly equivalent.
 * @see [Source](https://glmatrix.net/)
 */
function exactEquals(a: Matrix4Like, b: Matrix4Like): boolean {
	return a[0] === b[0]
		&& a[1] === b[1]
		&& a[2] === b[2]
		&& a[3] === b[3]
		&& a[4] === b[4]
		&& a[5] === b[5]
		&& a[6] === b[6]
		&& a[7] === b[7]
		&& a[8] === b[8]
		&& a[9] === b[9]
		&& a[10] === b[10]
		&& a[11] === b[11]
		&& a[12] === b[12]
		&& a[13] === b[13]
		&& a[14] === b[14]
		&& a[15] === b[15];
}

/**
 * Determines whether two four-by-four matrices are roughly equivalent.
 * @param a The first matrix.
 * @param b The second matrix.
 * @returns Whether the matrices are roughly equivalent.
 * @see [Source](https://glmatrix.net/)
 */
function equals(a: Matrix4Like, b: Matrix4Like): boolean {
	const a0: number = a[0];
	const a1: number = a[1];
	const a2: number = a[2];
	const a3: number = a[3];
	const a4: number = a[4];
	const a5: number = a[5];
	const a6: number = a[6];
	const a7: number = a[7];
	const a8: number = a[8];
	const a9: number = a[9];
	const a10: number = a[10];
	const a11: number = a[11];
	const a12: number = a[12];
	const a13: number = a[13];
	const a14: number = a[14];
	const a15: number = a[15];

	const b0: number = b[0];
	const b1: number = b[1];
	const b2: number = b[2];
	const b3: number = b[3];
	const b4: number = b[4];
	const b5: number = b[5];
	const b6: number = b[6];
	const b7: number = b[7];
	const b8: number = b[8];
	const b9: number = b[9];
	const b10: number = b[10];
	const b11: number = b[11];
	const b12: number = b[12];
	const b13: number = b[13];
	const b14: number = b[14];
	const b15: number = b[15];

	return Math.abs(a0 - b0) <= matrixEpsilon * Math.max(1.0, Math.abs(a0), Math.abs(b0))
		&& Math.abs(a1 - b1) <= matrixEpsilon * Math.max(1.0, Math.abs(a1), Math.abs(b1))
		&& Math.abs(a2 - b2) <= matrixEpsilon * Math.max(1.0, Math.abs(a2), Math.abs(b2))
		&& Math.abs(a3 - b3) <= matrixEpsilon * Math.max(1.0, Math.abs(a3), Math.abs(b3))
		&& Math.abs(a4 - b4) <= matrixEpsilon * Math.max(1.0, Math.abs(a4), Math.abs(b4))
		&& Math.abs(a5 - b5) <= matrixEpsilon * Math.max(1.0, Math.abs(a5), Math.abs(b5))
		&& Math.abs(a6 - b6) <= matrixEpsilon * Math.max(1.0, Math.abs(a6), Math.abs(b6))
		&& Math.abs(a7 - b7) <= matrixEpsilon * Math.max(1.0, Math.abs(a7), Math.abs(b7))
		&& Math.abs(a8 - b8) <= matrixEpsilon * Math.max(1.0, Math.abs(a8), Math.abs(b8))
		&& Math.abs(a9 - b9) <= matrixEpsilon * Math.max(1.0, Math.abs(a9), Math.abs(b9))
		&& Math.abs(a10 - b10) <= matrixEpsilon * Math.max(1.0, Math.abs(a10), Math.abs(b10))
		&& Math.abs(a11 - b11) <= matrixEpsilon * Math.max(1.0, Math.abs(a11), Math.abs(b11))
		&& Math.abs(a12 - b12) <= matrixEpsilon * Math.max(1.0, Math.abs(a12), Math.abs(b12))
		&& Math.abs(a13 - b13) <= matrixEpsilon * Math.max(1.0, Math.abs(a13), Math.abs(b13))
		&& Math.abs(a14 - b14) <= matrixEpsilon * Math.max(1.0, Math.abs(a14), Math.abs(b14))
		&& Math.abs(a15 - b15) <= matrixEpsilon * Math.max(1.0, Math.abs(a15), Math.abs(b15));
}

/** A four-by-four matrix. */
export default class Matrix4 extends Float32Array implements SquareMatrix {
	/**
	 * Creates a four-by-four matrix with the given values.
	 * @param m00 The value in the first column and first row.
	 * @param m01 The value in the first column and second row.
	 * @param m02 The value in the first column and third row.
	 * @param m03 The value in the first column and fourth row.
	 * @param m10 The value in the second column and first row.
	 * @param m11 The value in the second column and second row.
	 * @param m12 The value in the second column and third row.
	 * @param m13 The value in the second column and fourth row.
	 * @param m20 The value in the third column and first row.
	 * @param m21 The value in the third column and second row.
	 * @param m22 The value in the third column and third row.
	 * @param m23 The value in the third column and fourth row.
	 * @param m30 The value in the fourth column and first row.
	 * @param m31 The value in the fourth column and second row.
	 * @param m32 The value in the fourth column and third row.
	 * @param m33 The value in the fourth column and fourth row.
	 * @returns The matrix.
	 */
	public static fromValues(m00: number, m01: number, m02: number, m03: number, m10: number, m11: number, m12: number, m13: number, m20: number, m21: number, m22: number, m23: number, m30: number, m31: number, m32: number, m33: number): Matrix4 {
		return fromValues(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);
	}

	/**
	 * Creates a matrix that translates by the given amount.
	 * @param vector The amount to translate by.
	 * @returns The matrix.
	 */
	public static fromTranslation(vector: Vector3Like): Matrix4 {
		return fromTranslation(new Matrix4(), vector);
	}

	/**
	 * Creates a matrix that scales by the given amount.
	 * @param vector The amount to scale by.
	 * @returns The matrix.
	 */
	public static fromScaling(vector: Vector3Like): Matrix4 {
		return fromScaling(new Matrix4(), vector);
	}

	/**
	 * Creates a matrix that rotates by the given amount.
	 * @param radians The angle to rotate by in radians.
	 * @param axis The axis to rotate around.
	 * @returns The matrix.
	 */
	public static fromRotation(radians: number, axis: Vector3Like): Matrix4 {
		return fromRotation(new Matrix4(), radians, axis);
	}

	/**
	 * Creates a matrix that rotates by the given amount around the X-axis.
	 * @param radians The angle to rotate by in radians.
	 * @returns The matrix.
	 */
	public static fromXRotation(radians: number): Matrix4 {
		return fromXRotation(new Matrix4(), radians);
	}

	/**
	 * Creates a matrix that rotates by the given amount around the Y-axis.
	 * @param radians The angle to rotate by in radians.
	 * @returns The matrix.
	 */
	public static fromYRotation(radians: number): Matrix4 {
		return fromYRotation(new Matrix4(), radians);
	}

	/**
	 * Creates a matrix that rotates by the given amount around the Z-axis.
	 * @param radians The angle to rotate by in radians.
	 * @returns The matrix.
	 */
	public static fromZRotation(radians: number): Matrix4 {
		return fromZRotation(new Matrix4(), radians);
	}

	/**
	 * Creates a matrix that rotates by the given quaternion and translates by the given amount.
	 * @param quaternion The quaternion to rotate by.
	 * @param vector The amount to translate by.
	 * @returns The matrix.
	 */
	public static fromRotationTranslation(quaternion: QuaternionLike, vector: Vector3Like): Matrix4 {
		return fromRotationTranslation(new Matrix4(), quaternion, vector);
	}

	/**
	 * Creates a matrix that transforms by a dual quaternion.
	 * @param dualQuaternion The dual quaternion.
	 * @returns The matrix.
	 */
	public static fromQuat2(dualQuaternion: DualQuaternionLike): Matrix4 {
		return fromQuat2(new Matrix4(), dualQuaternion);
	}

	/**
	 * Creates a matrix that applies the given transformations.
	 * @param rotation The quaternion to rotate by.
	 * @param translation The vector to translate by.
	 * @param scaling The vector to scale by.
	 * @returns This matrix.
	 */
	public static fromRotationTranslationScale(rotation: QuaternionLike, translation: Vector3Like, scaling: Vector3Like): Matrix4 {
		return fromRotationTranslationScale(new Matrix4(), rotation, translation, scaling);
	}

	/**
	 * Creates a matrix that applies the given transformations around the given origin.
	 * @param rotation The quaternion to rotate by.
	 * @param translation The vector to translate by.
	 * @param scaling The vector to scale by.
	 * @param origin The origin.
	 * @returns This matrix.
	 */
	public static fromRotationTranslationScaleOrigin(rotation: QuaternionLike, translation: Vector3Like, scaling: Vector3Like, origin: Vector3Like): Matrix4 {
		return fromRotationTranslationScaleOrigin(new Matrix4(), rotation, translation, scaling, origin);
	}

	/**
	 * Creates a matrix that rotates by the given quaternion.
	 * @param quaternion The quaternion to rotate by.
	 * @returns The matrix.
	 */
	public static fromQuat(quaternion: QuaternionLike): Matrix4 {
		return fromQuat(new Matrix4(), quaternion);
	}

	/**
	 * Creates a matrix that represents a frustum.
	 * @param left The left bound of the frustum.
	 * @param right The right bound of the frustum.
	 * @param bottom The bottom bound of the frustum.
	 * @param top The top bound of the frustum.
	 * @param near The near bound of the frustum.
	 * @param far The far bound of the frustum.
	 * @returns The matrix.
	 */
	public static frustum(left: number, right: number, bottom: number, top: number, near: number, far: number): Matrix4 {
		return frustum(new Matrix4(), left, right, bottom, top, near, far);
	}

	/**
	 * Creates a perspective matrix with the given bounds.
	 * @param fovy The vertical field of view of the projection in radians.
	 * @param aspect The aspect ratio of the projection.
	 * @param near The near bound of the frustum.
	 * @param far The far bound of the frustum (infinite if not set).
	 * @returns The matrix.
	 */
	public static perspective(fovy: number, aspect: number, near: number, far?: number): Matrix4 {
		return perspective(new Matrix4(), fovy, aspect, near, far);
	}

	/**
	 * Creates a perspective projection matrix from a field of view.
	 * @param fov The field of view.
	 * @param near The near bound of the frustum.
	 * @param far The far bound of the frustum.
	 * @returns The matrix.
	 */
	public static perspectiveFromFieldOfView(fov: FieldOfView, near: number, far: number): Matrix4 {
		return perspectiveFromFieldOfView(new Matrix4(), fov, near, far);
	}

	/**
	 * Creates an orthogonal projection matrix with the given bounds.
	 * @param left The left bound of the frustum.
	 * @param right The right bound of the frustum.
	 * @param bottom The bottom bound of the frustum.
	 * @param top The top bound of the frustum.
	 * @param near The near bound of the frustum.
	 * @param far The far bound of the frustum.
	 * @returns The matrix.
	 */
	public static ortho(left: number, right: number, bottom: number, top: number, near: number, far: number): Matrix4 {
		return ortho(new Matrix4(), left, right, bottom, top, near, far);
	}

	/**
	 * Creates a look-at matrix.
	 * @param eye The position of the viewer.
	 * @param center The position that the viewer is looking at.
	 * @param up A vector representing the up direction.
	 * @returns The matrix.
	 */
	public static lookAt(eye: Vector3Like, center: Vector3Like, up: Vector3Like): Matrix4 {
		return lookAt(new Matrix4(), eye, center, up);
	}

	/**
	 * Creates a matrix that makes something look at something else.
	 * @param eye The position of the viewer.
	 * @param center The position that the viewer is looking at.
	 * @param up A vector representing the up direction.
	 * @returns The matrix.
	 */
	public static targetTo(eye: Vector3Like, target: Vector3Like, up: Vector3Like): Matrix4 {
		return targetTo(new Matrix4(), eye, target, up);
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
	public readonly width: number;

	/** The number of rows in this matrix. */
	public readonly height: number;

	/** The translation component of this transformation matrix. */
	public get translation(): Vector3 {
		return getTranslation(new Vector3(), this);
	}

	/** The scaling component of this transformation matrix. */
	public get scaling(): Vector3 {
		return getScaling(new Vector3(), this);
	}

	/** The rotation component of this transformation matrix. */
	public get rotation(): Quaternion {
		return getRotation(new Quaternion(), this);
	}

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
	public equals(matrix: Matrix4Like): boolean {
		return equals(this, matrix);
	}

	/**
	 * Determines whether this matrix is exactly equivalent to another.
	 * @param matrix The other matrix.
	 * @returns Whether the matrices are exactly equivalent.
	 */
	public exactEquals(matrix: Matrix4Like): boolean {
		return exactEquals(this, matrix);
	}

	/**
	 * Adds two matrices of the same size.
	 * @param matrix The other matrix.
	 * @returns The sum of the matrices.
	 */
	public add(matrix: Matrix4Like): this {
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
	public clone(): Matrix4 {
		return clone(this);
	}

	/**
	 * Copies the values of another matrix into this one.
	 * @param matrix The matrix to copy.
	 * @returns This matrix.
	 */
	public copy(matrix: Matrix4Like): this {
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
	public multiply(matrix: Matrix4Like): this {
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
	public multiplyScalarAndAdd(matrix: Matrix4Like, scalar: number): this {
		return multiplyScalarAndAdd(this, this, matrix, scalar);
	}

	/**
	 * Subtracts another matrix from this one.
	 * @param matrix The other matrix.
	 * @returns The difference between the matrices.
	 */
	public subtract(matrix: Matrix4Like): this {
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
	 * @param m03 The value in the first column and fourth row.
	 * @param m10 The value in the second column and first row.
	 * @param m11 The value in the second column and second row.
	 * @param m12 The value in the second column and third row.
	 * @param m13 The value in the second column and fourth row.
	 * @param m20 The value in the third column and first row.
	 * @param m21 The value in the third column and second row.
	 * @param m22 The value in the third column and third row.
	 * @param m23 The value in the third column and fourth row.
	 * @param m30 The value in the fourth column and first row.
	 * @param m31 The value in the fourth column and second row.
	 * @param m32 The value in the fourth column and third row.
	 * @param m33 The value in the fourth column and fourth row.
	 * @returns This matrix.
	 */
	public fromValues(m00: number, m01: number, m02: number, m03: number, m10: number, m11: number, m12: number, m13: number, m20: number, m21: number, m22: number, m23: number, m30: number, m31: number, m32: number, m33: number): this {
		return set(this, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);
	}

	/**
	 * Creates a matrix by removing the specified row and column from this matrix.
	 * @param row The row to remove.
	 * @param column The column to remove.
	 * @returns A submatrix.
	 */
	public submatrix(row: number, column: number): Matrix3 {
		const out: Matrix3 = new Matrix3();
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
	 * Translates this matrix.
	 * @param vector The amount to translate by.
	 * @returns This vector.
	 */
	public translate(vector: Vector3Like): this {
		return translate(this, this, vector);
	}

	/**
	 * Scales this matrix.
	 * @param vector The amount to scale by.
	 * @returns This matrix.
	 */
	public scale(vector: Vector3Like): this {
		return scale(this, this, vector);
	}

	/**
	 * Rotates this matrix.
	 * @param radians The angle to rotate by in radians.
	 * @param axis The axis to rotate around.
	 * @returns This matrix.
	 */
	public rotate(radians: number, axis: Vector3Like): this {
		return rotate(this, this, radians, axis);
	}

	/**
	 * Rotates this matrix around the X-axis.
	 * @param radians The angle to rotate by in radians.
	 * @returns This matrix.
	 */
	public rotateX(radians: number): this {
		return rotateX(this, this, radians);
	}

	/**
	 * Rotates this matrix around the Y-axis.
	 * @param radians The angle to rotate by in radians.
	 * @returns This matrix.
	 */
	public rotateY(radians: number): this {
		return rotateY(this, this, radians);
	}

	/**
	 * Rotates this matrix around the Z-axis.
	 * @param radians The angle to rotate by in radians.
	 * @returns This matrix.
	 */
	public rotateZ(radians: number): this {
		return rotateZ(this, this, radians);
	}

	/**
	 * Sets this matrix to translate by the given amount.
	 * @param vector The amount to translate by.
	 * @returns This matrix.
	 */
	public fromTranslation(vector: Vector3Like): this {
		return fromTranslation(this, vector);
	}

	/**
	 * Sets this matrix to scale by the given amount.
	 * @param vector The amount to scale by.
	 * @returns This matrix.
	 */
	public fromScaling(vector: Vector3Like): this {
		return fromScaling(this, vector);
	}

	/**
	 * Sets this matrix to rotate by the given amount.
	 * @param radians The angle to rotate by in radians.
	 * @param axis The axis to rotate around.
	 * @returns This matrix.
	 */
	public fromRotation(radians: number, axis: Vector3Like): this {
		return fromRotation(this, radians, axis);
	}

	/**
	 * Sets this matrix to rotate by the given amount around the X-axis.
	 * @param radians The angle to rotate by in radians.
	 * @returns This matrix.
	 */
	public fromXRotation(radians: number): this {
		return fromXRotation(this, radians);
	}

	/**
	 * Sets this matrix to rotate by the given amount around the Y-axis.
	 * @param radians The angle to rotate by in radians.
	 * @returns This matrix.
	 */
	public fromYRotation(radians: number): this {
		return fromYRotation(this, radians);
	}

	/**
	 * Sets this matrix to rotate by the given amount around the Z-axis.
	 * @param radians The angle to rotate by in radians.
	 * @returns This matrix.
	 */
	public fromZRotation(radians: number): this {
		return fromZRotation(this, radians);
	}

	/**
	 * Sets this matrix to rotate by the given quaternion and translate by the given amount.
	 * @param quaternion The quaternion to rotate by.
	 * @param vector The amount to translate by.
	 * @returns This matrix.
	 */
	public fromRotationTranslation(quaternion: QuaternionLike, vector: Vector3Like): this {
		return fromRotationTranslation(this, quaternion, vector);
	}

	/**
	 * Sets this matrix to transform by a dual quaternion.
	 * @param dualQuaternion The dual quaternion.
	 * @returns This matrix.
	 */
	public fromQuat2(dualQuaternion: DualQuaternionLike): this {
		return fromQuat2(this, dualQuaternion);
	}

	/**
	 * Sets this matrix to apply the given transformations.
	 * @param rotation The quaternion to rotate by.
	 * @param translation The vector to translate by.
	 * @param scaling The vector to scale by.
	 * @returns This matrix.
	 */
	public fromRotationTranslationScale(rotation: QuaternionLike, translation: Vector3Like, scaling: Vector3Like): this {
		return fromRotationTranslationScale(this, rotation, translation, scaling);
	}

	/**
	 * Sets this matrix to apply the given transformations around the given origin.
	 * @param rotation The quaternion to rotate by.
	 * @param translation The vector to translate by.
	 * @param scaling The vector to scale by.
	 * @param origin The origin.
	 * @returns This matrix.
	 */
	public fromRotationTranslationScaleOrigin(rotation: QuaternionLike, translation: Vector3Like, scaling: Vector3Like, origin: Vector3Like): this {
		return fromRotationTranslationScaleOrigin(this, rotation, translation, scaling, origin);
	}

	/**
	 * Sets this matrix to rotate by the given quaternion.
	 * @param quaternion The quaternion to rotate by.
	 * @returns This matrix.
	 */
	public fromQuat(quaternion: QuaternionLike): this {
		return fromQuat(this, quaternion);
	}

	/**
	 * Makes this matrix represent a frustum.
	 * @param left The left bound of the frustum.
	 * @param right The right bound of the frustum.
	 * @param bottom The bottom bound of the frustum.
	 * @param top The top bound of the frustum.
	 * @param near The near bound of the frustum.
	 * @param far The far bound of the frustum.
	 * @returns This matrix.
	 */
	public frustum(left: number, right: number, bottom: number, top: number, near: number, far: number): this {
		return frustum(this, left, right, bottom, top, near, far);
	}

	/**
	 * Sets this matrix to a perspective matrix with the given bounds.
	 * @param fovy The vertical field of view of the projection in radians.
	 * @param aspect The aspect ratio of the projection.
	 * @param near The near bound of the frustum.
	 * @param far The far bound of the frustum (infinite if not set).
	 * @returns This matrix.
	 */
	public perspective(fovy: number, aspect: number, near: number, far?: number): this {
		return perspective(this, fovy, aspect, near, far);
	}

	/**
	 * Sets this matrix to a perspective projection matrix from a field of view.
	 * @param fov The field of view.
	 * @param near The near bound of the frustum.
	 * @param far The far bound of the frustum.
	 * @returns This matrix.
	 */
	public perspectiveFromFieldOfView(fov: FieldOfView, near: number, far: number): this {
		return perspectiveFromFieldOfView(this, fov, near, far);
	}

	/**
	 * Sets this matrix to an orthogonal projection matrix with the given bounds.
	 * @param left The left bound of the frustum.
	 * @param right The right bound of the frustum.
	 * @param bottom The bottom bound of the frustum.
	 * @param top The top bound of the frustum.
	 * @param near The near bound of the frustum.
	 * @param far The far bound of the frustum.
	 * @returns This matrix.
	 */
	public ortho(left: number, right: number, bottom: number, top: number, near: number, far: number): this {
		return ortho(this, left, right, bottom, top, near, far);
	}

	/**
	 * Sets ths matrix to a look-at matrix.
	 * @param eye The position of the viewer.
	 * @param center The position that the viewer is looking at.
	 * @param up A vector representing the up direction.
	 * @returns This matrix.
	 */
	public lookAt(eye: Vector3Like, center: Vector3Like, up: Vector3Like): this {
		return lookAt(this, eye, center, up);
	}

	/**
	 * Sets this matrix to a matrix that makes something look at something else.
	 * @param eye The position of the viewer.
	 * @param center The position that the viewer is looking at.
	 * @param up A vector representing the up direction.
	 * @returns This matrix.
	 */
	public targetTo(eye: Vector3Like, target: Vector3Like, up: Vector3Like): this {
		return targetTo(this, eye, target, up);
	}
}
