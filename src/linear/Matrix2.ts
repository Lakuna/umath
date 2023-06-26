import type SquareMatrix from "./SquareMatrix.js";
import type { Vector2Like } from "./Vector2.js";

/** Numbers arranged into two columns and two rows. */
export type Matrix2Like = Matrix2 | [
	number, number,
	number, number
];

/** A two-by-two matrix. */
export default class Matrix2 extends Float32Array implements SquareMatrix {
	/**
	 * Creates a transformation matrix that represents a rotation by the given angle around the Z-axis.
	 * @param r The angle in radians.
	 * @returns The transformation matrix.
	 */
	public static fromRotation(r: number): Matrix2;

	/**
	 * Creates a transformation matrix that represents a rotation by the given angle around the Z-axis.
	 * @param r The angle in radians.
	 * @param out The matrix to store the result in.
	 * @returns The transformation matrix.
	 */
	public static fromRotation<T extends Matrix2Like>(r: number, out: T): T;

	public static fromRotation<T extends Matrix2Like>(r: number, out: T = new Matrix2() as T): T {
		const s: number = Math.sin(r);
		const c: number = Math.cos(r);

		out[0] = c;
		out[1] = s;
		out[2] = -s;
		out[3] = c;
		return out;
	}

	/**
	 * Creates a transformation matrix that represents a scaling by the given vector.
	 * @param v The scaling vector.
	 * @returns The transformation matrix.
	 */
	public static fromScaling(v: Vector2Like): Matrix2;

	/**
	 * Creates a transformation matrix that represents a scaling by the given vector.
	 * @param v The scaling vector.
	 * @param out The matrix to store the result in.
	 * @returns The transformation matrix.
	 */
	public static fromScaling<T extends Matrix2Like>(v: Vector2Like, out: T): T;

	public static fromScaling<T extends Matrix2Like>(v: Vector2Like, out: T = new Matrix2() as T): T {
		out[0] = v[0];
		out[1] = 0;
		out[2] = 0;
		out[3] = v[1];
		return out;
	}
	
	/**
	 * Creates a two-by-two matrix.
	 * @param c0r0 The value in the first column and first row.
	 * @param c0r1 The value in the first column and second row.
	 * @param c1r0 The value in the second column and first row.
	 * @param c1r1 The value in the second column and second row.
	 */
	public constructor(c0r0 = 1, c0r1 = 0, c1r0 = 0, c1r1 = 1) {
		super([
			c0r0, c0r1,
			c1r0, c1r1
		]);

		this.width = 2;
		this.height = 2;
	}

	/** The number of columns in this matrix. */
	public readonly width: 2;

	/** The number of rows in this matrix. */
	public readonly height: 2;

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
	public equals(m: Matrix2Like): boolean {
		return this[0] == m[0]
			&& this[1] == m[1]
			&& this[2] == m[2]
			&& this[3] == m[3];
	}

	/**
	 * Adds two matrices of the same size.
	 * @param m The other matrix.
	 * @returns The sum of the matrices.
	 */
	public add(m: Matrix2Like): Matrix2;

	/**
	 * Adds two matrices of the same size.
	 * @param m The other matrix.
	 * @param out The matrix to store the result in.
	 * @returns The sum of the matrices.
	 */
	public add<T extends Matrix2Like>(m: Matrix2Like, out: T): T;

	public add<T extends Matrix2Like>(m: Matrix2Like, out: T = new Matrix2() as T): T {
		out[0] = (this[0] as number) + m[0];
		out[1] = (this[1] as number) + m[1];
		out[2] = (this[2] as number) + m[2];
		out[3] = (this[3] as number) + m[3];
		return out;
	}

	/**
	 * Calculates the adjugate of this matrix.
	 * @returns The adjugate of this matrix.
	 */
	public adjoint(): Matrix2;

	/**
	 * Calculates the adjugate of this matrix.
	 * @param out The matrix to store the result in.
	 * @returns The adjugate of this matrix.
	 */
	public adjoint<T extends Matrix2Like>(out: T): T;

	public adjoint<T extends Matrix2Like>(out: T = new Matrix2() as T): T {
		[out[0], out[3]] = [out[3], out[0]];
		out[1] = -out[1];
		out[2] = -out[2];
		return out;
	}

	/**
	 * Creates a copy of this matrix.
	 * @returns A copy of this matrix.
	 */
	public clone(): Matrix2 {
		return new Matrix2(
			this[0], this[1],
			this[2], this[3]
		);
	}

	/**
	 * Copies the values of another matrix into this one.
	 * @param m The matrix to copy.
	 * @returns This matrix.
	 */
	public copy(m: Matrix2Like): this {
		this[0] = m[0];
		this[1] = m[1];
		this[2] = m[2];
		this[3] = m[3];
		return this;
	}

	/** The Frobenius normal of this matrix. */
	public get frob(): number {
		return Math.hypot(
			this[0] as number, this[1] as number,
			this[2] as number, this[3] as number
		);
	}

	/**
	 * Multiplies this matrix by another.
	 * @param m The other matrix.
	 * @returns The product of the matrices.
	 */
	public multiply(m: Matrix2Like): Matrix2;

	/**
	 * Multiplies this matrix by another.
	 * @param m The other matrix.
	 * @param out The matrix to store the result in.
	 * @returns The product of the matrices.
	 */
	public multiply<T extends Matrix2Like>(m: Matrix2Like, out: T): T;

	public multiply<T extends Matrix2Like>(m: Matrix2Like, out: T = new Matrix2() as T): T {
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
	public multiplyScalar(s: number): Matrix2;

	/**
	 * Multiplies this matrix by a scalar value.
	 * @param s The scalar value.
	 * @param out The matrix to store the result in.
	 * @returns The product of the matrix and the scalar value.
	 */
	public multiplyScalar<T extends Matrix2Like>(s: number, out: T): T;

	public multiplyScalar<T extends Matrix2Like>(s: number, out: T = new Matrix2() as T): T {
		out[0] = (this[0] as number) * s;
		out[1] = (this[1] as number) * s;
		out[2] = (this[2] as number) * s;
		out[3] = (this[3] as number) * s;
		return out;
	}

	/**
	 * Adds this matrix to another after multiplying the other by a scalar.
	 * @param m The other matrix.
	 * @param s The scalar.
	 * @returns The sum.
	 */
	public multiplyScalarAndAdd(m: Matrix2Like, s: number): Matrix2;

	/**
	 * Adds this matrix to another after multiplying the other by a scalar.
	 * @param m The other matrix.
	 * @param s The scalar.
	 * @param out The matrix to store the result in.
	 * @returns The sum.
	 */
	public multiplyScalarAndAdd<T extends Matrix2Like>(m: Matrix2Like, s: number, out: T): T;

	public multiplyScalarAndAdd<T extends Matrix2Like>(m: Matrix2Like, s: number, out: T = new Matrix2() as T): T {
		out[0] = (this[0] as number) + m[0] * s;
		out[1] = (this[1] as number) + m[1] * s;
		out[2] = (this[2] as number) + m[2] * s;
		out[3] = (this[3] as number) + m[3] * s;
		return out;
	}

	/**
	 * Subtracts another matrix from this one.
	 * @param m The other matrix.
	 * @returns The difference between the matrices.
	 */
	public subtract(m: Matrix2Like): Matrix2;

	/**
	 * Subtracts another matrix from this one.
	 * @param m The other matrix.
	 * @param out The matrix to store the result in.
	 * @returns The difference between the matrices.
	 */
	public subtract<T extends Matrix2Like>(m: Matrix2Like, out: T): T;

	public subtract<T extends Matrix2Like>(m: Matrix2Like, out: T = new Matrix2() as T): T {
		out[0] = (this[0] as number) - m[0];
		out[1] = (this[1] as number) - m[1];
		out[2] = (this[2] as number) - m[2];
		out[3] = (this[3] as number) - m[3];
		return out;
	}

	/**
	 * Transposes this matrix.
	 * @returns The transpose of this matrix.
	 */
	public transpose(): Matrix2;

	/**
	 * Transposes this matrix.
	 * @param out The matrix to store the result in.
	 * @returns The transpose of this matrix.
	 */
	public transpose<T extends Matrix2Like>(out: T): T;

	public transpose<T extends Matrix2Like>(out: T = new Matrix2() as T): T {
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
		throw new Error("Matrix too small.");
	}

	/** The determinant of this matrix. */
	public get determinant(): number {
		return (this[0] as number) * (this[3] as number) - (this[2] as number) * (this[1] as number);
	}

	/**
	 * Resets this matrix to identity.
	 * @returns This matrix.
	 */
	public identity(): this {
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
	public invert(): Matrix2;

	/**
	 * Inverts this matrix.
	 * @param out The matrix to store the result in.
	 * @returns The inverted matrix.
	 */
	public invert<T extends Matrix2Like>(out: T): T;

	public invert<T extends Matrix2Like>(out: T = new Matrix2() as T): T {
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
	public rotate(r: number): Matrix2;

	/**
	 * Rotates this matrix by the given angle.
	 * @param r The angle in radians.
	 * @param out The matrix to store the result in.
	 * @returns The rotated matrix.
	 */
	public rotate<T extends Matrix2Like>(r: number, out: T): T;

	public rotate<T extends Matrix2Like>(r: number, out: T = new Matrix2() as T): T {
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
	public scale(v: Vector2Like): Matrix2;

	/**
	 * Scales this matrix by the given vector.
	 * @param v The scaling vector.
	 * @param out The matrix to store the result in.
	 * @returns The scaled matrix.
	 */
	public scale<T extends Matrix2Like>(v: Vector2Like, out: T): T;

	public scale<T extends Matrix2Like>(v: Vector2Like, out: T = new Matrix2() as T): T {
		out[0] = (this[0] as number) * v[0];
		out[1] = (this[1] as number) * v[0];
		out[2] = (this[2] as number) * v[1];
		out[3] = (this[3] as number) * v[1];
		return out;
	}
}
