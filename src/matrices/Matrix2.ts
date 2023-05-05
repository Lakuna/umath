import type { SquareMatrix } from "./Matrix.js";

/** A two-by-two matrix. */
export default class Matrix2 extends Float32Array implements SquareMatrix {
	/**
	 * Creates a matrix from a given angle.
	 * @param r The angle in radians.
	 * @returns A matrix that rotates by the given angle.
	 */
	public static fromRotation(r: number): Matrix2 {
		const s: number = Math.sin(r);
		const c: number = Math.cos(r);
		return new Matrix2(c, s, -s, c);
	}

	/**
	 * Creates a matrix that scales by the given amount.
	 * @param x The amount to scale by on the X-axis.
	 * @param y The amount to scale by on the Y-axis.
	 * @returns A matrix that scales by the given amount.
	 */
	public static fromScaling(x: number, y: number): Matrix2 {
		return new Matrix2(x, 0, 0, y);
	}

	/**
	 * Creates a two-by-two matrix.
	 * @param m11 The value in the first row and first column.
	 * @param m21 The value in the second row and first column.
	 * @param m12 The value in the first row and second column.
	 * @param m22 The value i nthe second row and second column.
	 */
	public constructor(m11 = 1, m21 = 0, m12 = 0, m22 = 1) {
		super([m11, m21, m12, m22]);
		this.width = 2;
		this.height = 2;
	}

	/** The number of columns in this matrix. */
	public readonly width: number;

	/** The number of rows in this matrix. */
	public readonly height: number;

	/**
	 * Gets the value at the given position in this matrix.
	 * @param row The row of the value.
	 * @param col The column of the value.
	 * @returns The value at the specified position.
	 */
	public get(row: number, col: number): number | undefined {
		return this[col * this.height + row];
	}

	/**
	 * Sets the value at the given position in this matrix.
	 * @param row The row of the value.
	 * @param col The column of the value.
	 * @param val The value.
	 */
	public put(row: number, col: number, val: number): void {
		this[col * this.height + row] = val;
	}

	/**
	 * Determines whether this matrix is equal to another.
	 * @param matrix The other matrix.
	 * @returns Whether the matrices are equal.
	 */
	public equals(matrix: Matrix2): boolean {
		return this[0] == matrix[0]
			&& this[1] == matrix[1]
			&& this[2] == matrix[2]
			&& this[3] == matrix[3];
	}

	/**
	 * Adds two matrices of the same size.
	 * @param matrix The other matrix.
	 * @returns The sum of the matrices.
	 */
	public add(matrix: Matrix2): this {
		this[0] += matrix[0] as number;
		this[1] += matrix[1] as number;
		this[2] += matrix[2] as number;
		this[3] += matrix[3] as number;
		return this;
	}

	/**
	 * Calculates the adjugate of this matrix.
	 * @returns The adjugate of this matrix.
	 */
	public adjoint(): this {
		this.set([
			this[3] as number,
			-(this[2] as number),
			-(this[1] as number),
			this[0] as number
		]);
		return this;
	}

	/**
	 * Creates a copy of this matrix.
	 * @returns A copy of this matrix.
	 */
	public clone(): Matrix2 {
		return new Matrix2(...this);
	}

	/**
	 * Copies the values of another matrix into this one.
	 * @param matrix The matrix to copy.
	 * @returns This matrix.
	 */
	public copy(matrix: Matrix2): this {
		this.set(matrix);
		return this;
	}

	/** The Frobenius normal of this matrix. */
	public get frob(): number {
		return Math.hypot(...this);
	}

	/**
	 * Multiplies this matrix by another.
	 * @param matrix The other matrix.
	 * @returns The product of the matrices.
	 */
	public multiply(matrix: Matrix2): this {
		this.set([
			(this[0] as number) * (matrix[0] as number) + (this[2] as number) * (matrix[1] as number),
			(this[1] as number) * (matrix[0] as number) + (this[3] as number) * (matrix[1] as number),
			(this[0] as number) * (matrix[2] as number) + (this[2] as number) * (matrix[3] as number),
			(this[1] as number) * (matrix[2] as number) + (this[3] as number) * (matrix[3] as number)
		]);
		return this;
	}

	/**
	 * Multiplies this matrix by a scalar value.
	 * @param scalar The scalar value.
	 * @returns The product of the matrix and the scalar value.
	 */
	public multiplyScalar(scalar: number): this {
		this[0] *= scalar;
		this[1] *= scalar;
		this[2] *= scalar;
		this[3] *= scalar;
		return this;
	}

	/**
	 * Subtracts another matrix from this one.
	 * @param matrix The other matrix.
	 * @returns The difference between the matrices.
	 */
	public subtract(matrix: Matrix2): this {
		this[0] -= matrix[0] as number;
		this[1] -= matrix[1] as number;
		this[2] -= matrix[2] as number;
		this[3] -= matrix[3] as number;
		return this;
	}

	/**
	 * Transposes this matrix.
	 * @returns The transpose of this matrix.
	 */
	public transpose(): this {
		[this[1], this[2]] = [this[2] as number, this[1] as number];
		return this;
	}

	/**
	 * Creates a matrix by removing the specified row and column from this matrix.
	 * @param row The row to remove.
	 * @param col The column to remove.
	 * @returns A submatrix.
	 */
	public submatrix(): never {
		throw new Error("Submatrix is not supported below three-by-three.");
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
		this.set([1, 0, 0, 1]);
		return this;
	}

	/**
	 * Inverts this matrix.
	 * @returns This matrix.
	 */
	public invert(): this {
		const d: number = 1 / this.determinant;
		this.set([
			(this[3] as number) * d,
			-(this[2] as number) * d,
			-(this[1] as number) * d,
			(this[0] as number) * d
		]);
		return this;
	}

	/**
	 * Rotates this matrix.
	 * @param r The angle to rotate by in radians.
	 * @returns This matrix.
	 */
	public rotate(r: number): this {
		const s: number = Math.sin(r);
		const c: number = Math.cos(r);
		this.set([
			(this[0] as number) * c + (this[2] as number) * s,
			(this[1] as number) * c + (this[3] as number) * s,
			(this[0] as number) * -s + (this[2] as number) * c,
			(this[1] as number) * -s + (this[3] as number) * c
		]);
		return this;
	}

	/**
	 * Scales this matrix.
	 * @param x The amount to scale by on the X-axis.
	 * @param y The amount to scale by on the Y-axis.
	 * @returns This matrix.
	 */
	public scale(x: number, y: number): this {
		this[0] *= x;
		this[1] *= x;
		this[2] *= y;
		this[3] *= y;
		return this;
	}

	/**
	 * Makes this matrix rotate things by the given angle.
	 * @param r The angle in radians.
	 * @returns This matrix.
	 */
	public fromRotation(r: number): this {
		const s: number = Math.sin(r);
		const c: number = Math.cos(r);
		this.set([c, s, -s, c]);
		return this;
	}

	/**
	 * Makes this matrix scale things by the given amount.
	 * @param x The amount to scale by on the X-axis.
	 * @param y The amount to scale by on the Y-axis.
	 * @returns This matrix.
	 */
	public fromScaling(x: number, y: number): this {
		this.set([x, 0, 0, y]);
		return this;
	}
}
