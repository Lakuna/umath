import type { Matrix4Like } from "./Matrix4.js";
import type SquareMatrix from "./SquareMatrix.js";
import type { Vector2Like } from "./Vector2.js";

/** Numbers arranged into three columns and three rows. */
export type Matrix3Like = Matrix3 | [
	number, number, number,
	number, number, number,
	number, number, number
];

/** A three-by-three matrix. */
export default class Matrix3 extends Float32Array implements SquareMatrix {
	/**
	 * Creates a transformation matrix that represents a rotation by the given angle around the Z-axis.
	 * @param r The angle in radians.
	 * @returns The transformation matrix.
	 */
	public static fromRotation(r: number): Matrix3;

	/**
	 * Creates a transformation matrix that represents a rotation by the given angle around the Z-axis.
	 * @param r The angle in radians.
	 * @param out The matrix to store the result in.
	 * @returns The transformation matrix.
	 */
	public static fromRotation<T extends Matrix3Like>(r: number, out: T): T;

	public static fromRotation<T extends Matrix3Like>(r: number, out: T = new Matrix3() as T): T {
		const s: number = Math.sin(r);
		const c: number = Math.cos(r);

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
	 * Creates a transformation matrix that represents a scaling by the given vector.
	 * @param v The scaling vector.
	 * @returns The transformation matrix.
	 */
	public static fromScaling(v: Vector2Like): Matrix3;

	/**
	 * Creates a transformation matrix that represents a scaling by the given vector.
	 * @param v The scaling vector.
	 * @param out The matrix to store the result in.
	 * @returns The transformation matrix.
	 */
	public static fromScaling<T extends Matrix3Like>(v: Vector2Like, out: T): T;

	public static fromScaling<T extends Matrix3Like>(v: Vector2Like, out: T = new Matrix3() as T): T {
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

	// TODO: fromTranslation

	// TODO: fromQuaternion

	// TODO: normalFromMatrix4

	// TODO: projection or fromProjection

	/**
	 * Creates a three-by-three matrix from the upper-left corner of a four-by-four matrix.
	 * @param m The four-by-four matrix.
	 * @returns The three-by-three matrix.
	 */
	public static fromMatrix4(m: Matrix4Like): Matrix3;

	/**
	 * Creates a three-by-three matrix from the upper-left corner of a four-by-four matrix.
	 * @param m The four-by-four matrix.
	 * @param out The matrix to store the result in.
	 * @returns The three-by-three matrix.
	 */
	public static fromMatrix4<T extends Matrix3Like>(m: Matrix4Like, out: T): T;

	public static fromMatrix4<T extends Matrix3Like>(m: Matrix4Like, out: T = new Matrix3() as T): T {
		out[0] = m[0];
		out[1] = m[1];
		out[2] = m[2];
		out[3] = m[4];
		out[4] = m[5];
		out[5] = m[6];
		out[6] = m[8];
		out[7] = m[9];
		out[8] = m[10];
		return out;
	}
	
	/**
	 * Creates a three-by-three matrix.
	 * @param c0r0 The value in the first column and first row.
	 * @param c0r1 The value in the first column and second row.
	 * @param c0r2 The value in the first column and third row.
	 * @param c1r0 The value in the second column and first row.
	 * @param c1r1 The value in the second column and second row.
	 * @param c1r2 The value in the second column and third row.
	 * @param c2r0 The value in the third column and first row.
	 * @param c2r1 The value in the third column and second row.
	 * @param c2r2 The value in the third column and third row.
	 */
	public constructor(c0r0 = 1, c0r1 = 0, c0r2 = 0, c1r0 = 0, c1r1 = 1, c1r2 = 0, c2r0 = 0, c2r1 = 0, c2r2 = 1) {
		super([
			c0r0, c0r1, c0r2,
			c1r0, c1r1, c1r2,
			c2r0, c2r1, c2r2
		]);

		this.width = 3;
		this.height = 3;
	}

	/** The number of columns in this matrix. */
	public readonly width: 3;

	/** The number of rows in this matrix. */
	public readonly height: 3;

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
	public equals(m: Matrix3Like): boolean {
		return this[0] == m[0]
			&& this[1] == m[1]
			&& this[2] == m[2]
			&& this[3] == m[3]
			&& this[4] == m[4]
			&& this[5] == m[5]
			&& this[6] == m[6]
			&& this[7] == m[7]
			&& this[8] == m[8];
	}

	/**
	 * Adds two matrices of the same size.
	 * @param m The other matrix.
	 * @returns The sum of the matrices.
	 */
	public add(m: Matrix3Like): Matrix3;

	/**
	 * Adds two matrices of the same size.
	 * @param m The other matrix.
	 * @param out The matrix to store the result in.
	 * @returns The sum of the matrices.
	 */
	public add<T extends Matrix3Like>(m: Matrix3Like, out: T): T;

	public add<T extends Matrix3Like>(m: Matrix3Like, out: T = new Matrix3() as T): T {
		out[0] = (this[0] as number) + m[0];
		out[1] = (this[1] as number) + m[1];
		out[2] = (this[2] as number) + m[2];
		out[3] = (this[3] as number) + m[3];
		out[4] = (this[4] as number) + m[4];
		out[5] = (this[5] as number) + m[5];
		out[6] = (this[6] as number) + m[6];
		out[7] = (this[7] as number) + m[7];
		out[8] = (this[8] as number) + m[8];
		return out;
	}

	/**
	 * Calculates the adjugate of this matrix.
	 * @returns The adjugate of this matrix.
	 */
	public adjoint(): Matrix3;

	/**
	 * Calculates the adjugate of this matrix.
	 * @param out The matrix to store the result in.
	 * @returns The adjugate of this matrix.
	 */
	public adjoint<T extends Matrix3Like>(out: T): T;

	public adjoint<T extends Matrix3Like>(out: T = new Matrix3() as T): T {
		// TODO
		[out[0], out[3]] = [out[3], out[0]];
		out[1] = -out[1];
		out[2] = -out[2];
		return out;
	}

	/**
	 * Creates a copy of this matrix.
	 * @returns A copy of this matrix.
	 */
	public clone(): Matrix3 {
		return new Matrix3(
			this[0], this[1], this[2],
			this[3], this[4], this[5],
			this[6], this[7], this[8]
		);
	}

	/**
	 * Copies the values of another matrix into this one.
	 * @param m The matrix to copy.
	 * @returns This matrix.
	 */
	public copy(m: Matrix3Like): this {
		this[0] = m[0];
		this[1] = m[1];
		this[2] = m[2];
		this[3] = m[3];
		this[4] = m[4];
		this[5] = m[5];
		this[6] = m[6];
		this[7] = m[7];
		this[8] = m[8];
		return this;
	}

	/** The Frobenius normal of this matrix. */
	public get frob(): number {
		return Math.hypot(
			this[0] as number, this[1] as number, this[2] as number,
			this[3] as number, this[4] as number, this[5] as number,
			this[6] as number, this[7] as number, this[8] as number
		);
	}

	/**
	 * Multiplies this matrix by another.
	 * @param m The other matrix.
	 * @returns The product of the matrices.
	 */
	public multiply(m: Matrix3Like): Matrix3;

	/**
	 * Multiplies this matrix by another.
	 * @param m The other matrix.
	 * @param out The matrix to store the result in.
	 * @returns The product of the matrices.
	 */
	public multiply<T extends Matrix3Like>(m: Matrix3Like, out: T): T;

	public multiply<T extends Matrix3Like>(m: Matrix3Like, out: T = new Matrix3() as T): T {
		// TODO
		[out[0], out[1], out[2], out[3]] = [
			(this[0] as number) * m[0] + (this[2] as number) * m[1],
			(this[1] as number) * m[0] + (this[3] as number) * m[1],

			(this[0] as number) * m[2] + (this[2] as number) * m[3],
			(this[1] as number) * m[2] + (this[3] as number) * m[3]
		];
		return out;
	}

	/**
	 * Multiplies this matrix by a scalar value.
	 * @param s The scalar value.
	 * @returns The product of the matrix and the scalar value.
	 */
	public multiplyScalar(s: number): Matrix3;

	/**
	 * Multiplies this matrix by a scalar value.
	 * @param s The scalar value.
	 * @param out The matrix to store the result in.
	 * @returns The product of the matrix and the scalar value.
	 */
	public multiplyScalar<T extends Matrix3Like>(s: number, out: T): T;

	public multiplyScalar<T extends Matrix3Like>(s: number, out: T = new Matrix3() as T): T {
		out[0] = (this[0] as number) * s;
		out[1] = (this[1] as number) * s;
		out[2] = (this[2] as number) * s;
		out[3] = (this[3] as number) * s;
		out[4] = (this[4] as number) * s;
		out[5] = (this[5] as number) * s;
		out[6] = (this[6] as number) * s;
		out[7] = (this[7] as number) * s;
		out[8] = (this[8] as number) * s;
		return out;
	}

	/**
	 * Adds this matrix to another after multiplying the other by a scalar.
	 * @param m The other matrix.
	 * @param s The scalar.
	 * @returns The sum.
	 */
	public multiplyScalarAndAdd(m: Matrix3Like, s: number): Matrix3;

	/**
	 * Adds this matrix to another after multiplying the other by a scalar.
	 * @param m The other matrix.
	 * @param s The scalar.
	 * @param out The matrix to store the result in.
	 * @returns The sum.
	 */
	public multiplyScalarAndAdd<T extends Matrix3Like>(m: Matrix3Like, s: number, out: T): T;

	public multiplyScalarAndAdd<T extends Matrix3Like>(m: Matrix3Like, s: number, out: T = new Matrix3() as T): T {
		out[0] = (this[0] as number) + m[0] * s;
		out[1] = (this[1] as number) + m[1] * s;
		out[2] = (this[2] as number) + m[2] * s;
		out[3] = (this[3] as number) + m[3] * s;
		out[4] = (this[4] as number) + m[4] * s;
		out[5] = (this[5] as number) + m[5] * s;
		out[6] = (this[6] as number) + m[6] * s;
		out[7] = (this[7] as number) + m[7] * s;
		out[8] = (this[8] as number) + m[8] * s;
		return out;
	}

	/**
	 * Subtracts another matrix from this one.
	 * @param m The other matrix.
	 * @returns The difference between the matrices.
	 */
	public subtract(m: Matrix3Like): Matrix3;

	/**
	 * Subtracts another matrix from this one.
	 * @param m The other matrix.
	 * @param out The matrix to store the result in.
	 * @returns The difference between the matrices.
	 */
	public subtract<T extends Matrix3Like>(m: Matrix3Like, out: T): T;

	public subtract<T extends Matrix3Like>(m: Matrix3Like, out: T = new Matrix3() as T): T {
		out[0] = (this[0] as number) - m[0];
		out[1] = (this[1] as number) - m[1];
		out[2] = (this[2] as number) - m[2];
		out[3] = (this[3] as number) - m[3];
		out[4] = (this[4] as number) - m[4];
		out[5] = (this[5] as number) - m[5];
		out[6] = (this[6] as number) - m[6];
		out[7] = (this[7] as number) - m[7];
		out[8] = (this[8] as number) - m[8];
		return out;
	}

	/**
	 * Transposes this matrix.
	 * @returns The transpose of this matrix.
	 */
	public transpose(): Matrix3;

	/**
	 * Transposes this matrix.
	 * @param out The matrix to store the result in.
	 * @returns The transpose of this matrix.
	 */
	public transpose<T extends Matrix3Like>(out: T): T;

	public transpose<T extends Matrix3Like>(out: T = new Matrix3() as T): T {
		// TODO
		out[0] = this[0] as number;
		[out[1], out[2]] = [this[2] as number, this[1] as number];
		out[3] = this[3] as number;
		return out;
	}

	/**
	 * This matrix is too small to get a submatrix.
	 * @returns Never.
	 */
	public submatrix(): never {
		// TODO
		throw new Error("Matrix too small.");
	}

	/** The determinant of this matrix. */
	public get determinant(): number {
		// TODO
		return (this[0] as number) * (this[3] as number) - (this[2] as number) * (this[1] as number);
	}

	/**
	 * Resets this matrix to identity.
	 * @returns This matrix.
	 */
	public identity(): this {
		// TODO
		this[0] = 1;
		this[1] = 0;
		this[2] = 0;
		this[3] = 1;
		return this;
	}

	/**
	 * Inverts this matrix.
	 * @returns The inverted matrix.
	 */
	public invert(): Matrix3;

	/**
	 * Inverts this matrix.
	 * @param out The matrix to store the result in.
	 * @returns The inverted matrix.
	 */
	public invert<T extends Matrix3Like>(out: T): T;

	public invert<T extends Matrix3Like>(out: T = new Matrix3() as T): T {
		// TODO
		const d: number = this.determinant;
		
		[out[0], out[3]] = [(this[3] as number) * d, (this[0] as number) * d];
		out[1] = -(this[1] as number) * d;
		out[2] = -(this[2] as number) * d;
		return out;
	}

	/**
	 * Rotates this matrix by the given angle.
	 * @param r The angle in radians.
	 * @returns The rotated matrix.
	 */
	public rotate(r: number): Matrix3;

	/**
	 * Rotates this matrix by the given angle.
	 * @param r The angle in radians.
	 * @param out The matrix to store the result in.
	 * @returns The rotated matrix.
	 */
	public rotate<T extends Matrix3Like>(r: number, out: T): T;

	public rotate<T extends Matrix3Like>(r: number, out: T = new Matrix3() as T): T {
		// TODO
		const s: number = Math.sin(r);
		const c: number = Math.cos(r);

		[out[0], out[1], out[2], out[3]] = [
			(this[0] as number) * c + (this[2] as number) * s,
			(this[1] as number) * c + (this[3] as number) * s,
			
			(this[0] as number) * -s + (this[2] as number) * c,
			(this[1] as number) * -s + (this[3] as number) * c
		];
		return out;
	}

	/**
	 * Scales this matrix by the given vector.
	 * @param v The scaling vector.
	 * @returns The scaled matrix.
	 */
	public scale(v: Vector2Like): Matrix3;

	/**
	 * Scales this matrix by the given vector.
	 * @param v The scaling vector.
	 * @param out The matrix to store the result in.
	 * @returns The scaled matrix.
	 */
	public scale<T extends Matrix3Like>(v: Vector2Like, out: T): T;

	public scale<T extends Matrix3Like>(v: Vector2Like, out: T = new Matrix3() as T): T {
		// TODO
		out[0] = (this[0] as number) * v[0];
		out[1] = (this[1] as number) * v[0];
		out[2] = (this[2] as number) * v[1];
		out[3] = (this[3] as number) * v[1];
		return out;
	}

	// TODO: translate
}
