import SingularMatrixError from "@lakuna/umath/utility/SingularMatrixError.js";
import epsilon from "@lakuna/umath/utility/epsilon.js";
import type SquareMatrix from "@lakuna/umath/linear/SquareMatrix.js";
import type { Vector2Like } from "@lakuna/umath/linear/Vector2.js";

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
	 * Creates a two-by-two matrix with the given values.
	 * @param c0r0 The value in the first column and first row.
	 * @param c0r1 The value in the first column and second row.
	 * @param c1r0 The value in the second column and first row.
	 * @param c1r1 The value in the second column and second row.
	 * @returns The transformation matrix.
	 */
	public static fromValues(c0r0: number, c0r1: number, c1r0: number, c1r1: number): Matrix2;

	/**
	 * Creates a two-by-two matrix with the given values.
	 * @param c0r0 The value in the first column and first row.
	 * @param c0r1 The value in the first column and second row.
	 * @param c1r0 The value in the second column and first row.
	 * @param c1r1 The value in the second column and second row.
	 * @param out The matrix to store the result in.
	 * @returns The transformation matrix.
	 */
	public static fromValues<T extends Matrix2Like>(c0r0: number, c0r1: number, c1r0: number, c1r1: number, out: T): T;

	public static fromValues<T extends Matrix2Like>(c0r0: number, c0r1: number, c1r0: number, c1r1: number, out: T = new Matrix2() as T): T {
		out[0] = c0r0;
		out[1] = c0r1;
		out[2] = c1r0;
		out[3] = c1r1;
		return out;
	}

	/** Creates a two-by-two identity matrix. */
	public constructor() {
		super(4);

		this[0] =  1;
		this[3] = 1;

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
	 * Determines whether this matrix is roughly equivalent to another.
	 * @param m The other matrix.
	 * @returns Whether the matrices are equivalent.
	 */
	public equals(m: Matrix2Like): boolean {
		const a0: number = this[0] as number;
		const a1: number = this[1] as number;
		const a2: number = this[2] as number;
		const a3: number = this[3] as number;

		const b0: number = m[0];
		const b1: number = m[1];
		const b2: number = m[2];
		const b3: number = m[3];

		return (Math.abs(a0 - b0) <= epsilon * Math.max(1, Math.abs(a0), Math.abs(b0))
			&& Math.abs(a1 - b1) <= epsilon * Math.max(1, Math.abs(a1), Math.abs(b1))
			&& Math.abs(a2 - b2) <= epsilon * Math.max(1, Math.abs(a2), Math.abs(b2))
			&& Math.abs(a3 - b3) <= epsilon * Math.max(1, Math.abs(a3), Math.abs(b3)));
	}

	/**
	 * Determines whether this matrix is exactly equivalent to another.
	 * @param m The other matrix.
	 * @returns Whether the matrices are equivalent.
	 */
	public exactEquals(m: Matrix2Like): boolean {
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
		const a0: number = this[0] as number;
		out[0] = this[3] as number;
		out[1] = -(this[1] as number);
		out[2] = -(this[2] as number);
		out[3] = a0;
		return out;
	}

	/**
	 * Creates a copy of this matrix.
	 * @returns A copy of this matrix.
	 */
	public clone(): Matrix2 {
		const out: Matrix2 = new Matrix2();
		out[0] = this[0] as number;
		out[1] = this[1] as number;
		out[2] = this[2] as number;
		out[3] = this[3] as number;
		return out;
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
		const a0: number = this[0] as number;
		const a1: number = this[1] as number;
		const a2: number = this[2] as number;
		const a3: number = this[3] as number;

		const b0: number = m[0];
		const b1: number = m[1];
		const b2: number = m[2];
		const b3: number = m[3];

		out[0] = a0 * b0 + a2 * b1;
		out[1] = a1 * b0 + a3 * b1;
		out[2] = a0 * b2 + a2 * b3;
		out[3] = a1 * b2 + a3 * b3;
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
		if (out == this as unknown as T) {
			const a1 = this[1] as number;
			out[1] = this[2] as number;
			out[2] = a1;
		} else {
			out[0] = this[0] as number;
			out[1] = this[2] as number;
			out[2] = this[1] as number;
			out[3] = this[3] as number;
		}
		return out;
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
		const a0: number = this[0] as number;
		const a1: number = this[1] as number;
		const a2: number = this[2] as number;
		const a3: number = this[3] as number;
		
		let det: number = a0 * a3 - a2 * a1;
		if (!det) {
			throw new SingularMatrixError();
		}
		det = 1 / det;

		out[0] = a3 * det;
		out[1] = -a1 * det;
		out[2] = -a2 * det;
		out[3] = a0 * det;
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
		const a0: number = this[0] as number;
		const a1: number = this[1] as number;
		const a2: number = this[2] as number;
		const a3: number = this[3] as number;

		const s: number = Math.sin(r);
		const c: number = Math.cos(r);

		out[0] = a0 * c + a2 * s;
		out[1] = a1 * c + a3 * s;
		out[2] = a0 * -s + a2 * c;
		out[3] = a1 * -s + a3 * c;
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
		const v0: number = v[0];
		const v1: number = v[1];

		out[0] = (this[0] as number) * v0;
		out[1] = (this[1] as number) * v0;
		out[2] = (this[2] as number) * v1;
		out[3] = (this[3] as number) * v1;
		return out;
	}
}
