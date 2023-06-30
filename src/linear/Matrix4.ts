import SingularMatrixError from "../utility/SingularMatrixError.js";
import type SquareMatrix from "./SquareMatrix.js";
import type { Vector3Like } from "./Vector3.js";

/** Numbers arranged into four columns and four rows. */
export type Matrix4Like = Matrix4 | [
	number, number, number, number,
	number, number, number, number,
	number, number, number, number,
	number, number, number, number
];

/** A four-by-four matrix. */
export default class Matrix4 extends Float32Array implements SquareMatrix {
	// TODO: `fromTranslation`.

	// TODO: `fromScaling`.

	// TODO: `fromRotation`.

	// TODO: `fromXRotation`.

	// TODO: `fromYRotation`.

	// TODO: `fromZRotation`.

	// TODO: `fromRotationTranslation`.

	// TODO: `fromDualQuaternion`.

	// TODO: `fromRotationTranslationScale`.

	// TODO: `fromRotationTranslationScaleOrigin`.

	// TODO: `fromQuaternion`.

	// TODO: `frustum`.

	// TODO: `perspective`.

	// TODO: `perspectiveFromFieldOfView`.

	// TODO: `ortho`.

	// TODO: `lookAt`.

	// TODO: `targetTo`.

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
	 * @param r The row of the value.
	 * @param c The column of the value.
	 * @returns The value at the specified position.
	 */
	public get(r: number, c: number): number | undefined {
		return this[c * this.height + r];
	}

	/**
	 * Sets the value at the given position in this matrix.
	 * @param r The row of the value.
	 * @param c The column of the value.
	 * @param v The value.
	 */
	public put(r: number, c: number, v: number): void {
		this[c * this.height + r] = v;
	}

	/**
	 * Determines whether this matrix is equivalent to another.
	 * @param m The other matrix.
	 * @returns Whether the matrices are equivalent.
	 */
	public equals(m: Matrix4Like): boolean {
		return this[0] == m[0]
			&& this[1] == m[1]
			&& this[2] == m[2]
			&& this[3] == m[3]
			&& this[4] == m[4]
			&& this[5] == m[5]
			&& this[6] == m[6]
			&& this[7] == m[7]
			&& this[8] == m[8]
			&& this[9] == m[9]
			&& this[10] == m[10]
			&& this[11] == m[11]
			&& this[12] == m[12]
			&& this[13] == m[13]
			&& this[14] == m[14]
			&& this[15] == m[15];
	}

	/**
	 * Adds two matrices of the same size.
	 * @param m The other matrix.
	 * @returns The sum of the matrices.
	 */
	public add(m: Matrix4Like): Matrix4;

	/**
	 * Adds two matrices of the same size.
	 * @param m The other matrix.
	 * @param out The matrix to store the result in.
	 * @returns The sum of the matrices.
	 */
	public add<T extends Matrix4Like>(m: Matrix4Like, out: T): T;

	public add<T extends Matrix4Like>(m: Matrix4Like, out: T = new Matrix4() as T): T {
		out[0] = (this[0] as number) + m[0];
		out[1] = (this[1] as number) + m[1];
		out[2] = (this[2] as number) + m[2];
		out[3] = (this[3] as number) + m[3];
		out[4] = (this[4] as number) + m[4];
		out[5] = (this[5] as number) + m[5];
		out[6] = (this[6] as number) + m[6];
		out[7] = (this[7] as number) + m[7];
		out[8] = (this[8] as number) + m[8];
		out[9] = (this[9] as number) + m[8];
		out[10] = (this[10] as number) + m[10];
		out[11] = (this[11] as number) + m[11];
		out[12] = (this[12] as number) + m[12];
		out[13] = (this[13] as number) + m[13];
		out[14] = (this[14] as number) + m[14];
		out[15] = (this[15] as number) + m[15];
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
	 * @param m The matrix to copy.
	 * @returns This matrix.
	 */
	public copy(m: Matrix4Like): this {
		this[0] = m[0];
		this[1] = m[1];
		this[2] = m[2];
		this[3] = m[3];
		this[4] = m[4];
		this[5] = m[5];
		this[6] = m[6];
		this[7] = m[7];
		this[8] = m[8];
		this[9] = m[9];
		this[10] = m[10];
		this[11] = m[11];
		this[12] = m[12];
		this[13] = m[13];
		this[14] = m[14];
		this[15] = m[15];
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
	 * @param m The other matrix.
	 * @returns The product of the matrices.
	 */
	public multiply(m: Matrix4Like): Matrix4;

	/**
	 * Multiplies this matrix by another.
	 * @param m The other matrix.
	 * @param out The matrix to store the result in.
	 * @returns The product of the matrices.
	 */
	public multiply<T extends Matrix4Like>(m: Matrix4Like, out: T): T;

	public multiply<T extends Matrix4Like>(m: Matrix4Like, out: T = new Matrix4() as T): T {
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

		let b0: number = m[0];
		let b1: number = m[1];
		let b2: number = m[2];
		let b3: number = m[3];
		out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
		out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
		out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
		out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
		b0 = m[4];
		b1 = m[5];
		b2 = m[6];
		b3 = m[7];
		out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
		out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
		out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
		out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
		b0 = m[8];
		b1 = m[9];
		b2 = m[10];
		b3 = m[11];
		out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
		out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
		out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
		out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
		b0 = m[12];
		b1 = m[13];
		b2 = m[14];
		b3 = m[15];
		out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
		out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
		out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
		out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
		return out;
	}

	/**
	 * Multiplies this matrix by a scalar value.
	 * @param s The scalar value.
	 * @returns The product of the matrix and the scalar value.
	 */
	public multiplyScalar(s: number): Matrix4;

	/**
	 * Multiplies this matrix by a scalar value.
	 * @param s The scalar value.
	 * @param out The matrix to store the result in.
	 * @returns The product of the matrix and the scalar value.
	 */
	public multiplyScalar<T extends Matrix4Like>(s: number, out: T): T;

	public multiplyScalar<T extends Matrix4Like>(s: number, out: T = new Matrix4() as T): T {
		out[0] = (this[0] as number) * s;
		out[1] = (this[1] as number) * s;
		out[2] = (this[2] as number) * s;
		out[3] = (this[3] as number) * s;
		out[4] = (this[4] as number) * s;
		out[5] = (this[5] as number) * s;
		out[6] = (this[6] as number) * s;
		out[7] = (this[7] as number) * s;
		out[8] = (this[8] as number) * s;
		out[9] = (this[9] as number) * s;
		out[10] = (this[10] as number) * s;
		out[11] = (this[11] as number) * s;
		out[12] = (this[12] as number) * s;
		out[13] = (this[13] as number) * s;
		out[14] = (this[14] as number) * s;
		out[15] = (this[15] as number) * s;
		return out;
	}

	/**
	 * Adds this matrix to another after multiplying the other by a scalar.
	 * @param m The other matrix.
	 * @param s The scalar.
	 * @returns The sum.
	 */
	public multiplyScalarAndAdd(m: Matrix4Like, s: number): Matrix4;

	/**
	 * Adds this matrix to another after multiplying the other by a scalar.
	 * @param m The other matrix.
	 * @param s The scalar.
	 * @param out The matrix to store the result in.
	 * @returns The sum.
	 */
	public multiplyScalarAndAdd<T extends Matrix4Like>(m: Matrix4Like, s: number, out: T): T;

	public multiplyScalarAndAdd<T extends Matrix4Like>(m: Matrix4Like, s: number, out: T = new Matrix4() as T): T {
		out[0] = (this[0] as number) + m[0] * s;
		out[1] = (this[1] as number) + m[1] * s;
		out[2] = (this[2] as number) + m[2] * s;
		out[3] = (this[3] as number) + m[3] * s;
		out[4] = (this[4] as number) + m[4] * s;
		out[5] = (this[5] as number) + m[5] * s;
		out[6] = (this[6] as number) + m[6] * s;
		out[7] = (this[7] as number) + m[7] * s;
		out[8] = (this[8] as number) + m[8] * s;
		out[9] = (this[9] as number) + m[9] * s;
		out[10] = (this[10] as number) + m[10] * s;
		out[11] = (this[11] as number) + m[11] * s;
		out[12] = (this[12] as number) + m[12] * s;
		out[13] = (this[13] as number) + m[13] * s;
		out[14] = (this[14] as number) + m[14] * s;
		out[15] = (this[15] as number) + m[15] * s;
		return out;
	}

	/**
	 * Subtracts another matrix from this one.
	 * @param m The other matrix.
	 * @returns The difference between the matrices.
	 */
	public subtract(m: Matrix4Like): Matrix4;

	/**
	 * Subtracts another matrix from this one.
	 * @param m The other matrix.
	 * @param out The matrix to store the result in.
	 * @returns The difference between the matrices.
	 */
	public subtract<T extends Matrix4Like>(m: Matrix4Like, out: T): T;

	public subtract<T extends Matrix4Like>(m: Matrix4Like, out: T = new Matrix4() as T): T {
		out[0] = (this[0] as number) - m[0];
		out[1] = (this[1] as number) - m[1];
		out[2] = (this[2] as number) - m[2];
		out[3] = (this[3] as number) - m[3];
		out[4] = (this[4] as number) - m[4];
		out[5] = (this[5] as number) - m[5];
		out[6] = (this[6] as number) - m[6];
		out[7] = (this[7] as number) - m[7];
		out[8] = (this[8] as number) - m[8];
		out[9] = (this[9] as number) - m[8];
		out[10] = (this[10] as number) - m[10];
		out[11] = (this[11] as number) - m[11];
		out[12] = (this[12] as number) - m[12];
		out[13] = (this[13] as number) - m[13];
		out[14] = (this[14] as number) - m[14];
		out[15] = (this[15] as number) - m[15];
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
	 * @param v The scaling vector.
	 * @returns The scaled matrix.
	 */
	public scale(v: Vector3Like): Matrix4;

	/**
	 * Scales this matrix by the given vector.
	 * @param v The scaling vector.
	 * @param out The matrix to store the result in.
	 * @returns The scaled matrix.
	 */
	public scale<T extends Matrix4Like>(v: Vector3Like, out: T): T;

	public scale<T extends Matrix4Like>(v: Vector3Like, out: T = new Matrix4() as T): T {
		const x: number = v[0];
		const y: number = v[1];
		const z: number = v[2];

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
	 * @param v The translation vector.
	 * @returns The translated matrix.
	 */
	public translate(v: Vector3Like): Matrix4;

	/**
	 * Translates this matrix by the given vector.
	 * @param v The translation vector.
	 * @param out The matrix to store the result in.
	 * @returns The translated matrix.
	 */
	public translate<T extends Matrix4Like>(v: Vector3Like, out: T): T;

	public translate<T extends Matrix4Like>(v: Vector3Like, out: T = new Matrix4() as T): T {
		const x: number = v[0];
		const y: number = v[1];
		const z: number = v[2];

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

	// TODO: `rotate`.

	// TODO: `rotateX`.

	// TODO: `rotateY`.

	// TODO: `rotateZ`.

	// TODO: `get translation`.

	// TODO: `get scaling`.

	// TODO: `get rotation`.
}
