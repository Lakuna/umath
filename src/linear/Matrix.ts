/** A rectangular array of numbers, arranged in rows and columns. */
export type MatrixLike = Matrix | ArrayLike<number>;

/**
 * A rectangular array of numbers, arranged in rows and columns.
 * @see [Wikipedia](https://en.wikipedia.org/wiki/Matrix_(mathematics))
 */
export default interface Matrix extends ArrayLike<number> {
	/** The number of columns in this matrix. */
	width: number;

	/** The number of rows in this matrix. */
	height: number;

	/**
	 * Gets the value at the given position in this matrix.
	 * @param r The row of the value.
	 * @param c The column of the value.
	 * @returns The value at the specified position.
	 */
	get(r: number, c: number): number | undefined;

	/**
	 * Sets the value at the given position in this matrix.
	 * @param r The row of the value.
	 * @param c The column of the value.
	 * @param v The value.
	 */
	put(r: number, c: number, v: number): void;

	/**
	 * Determines whether this matrix is equivalent to another.
	 * @param m The other matrix.
	 * @returns Whether the matrices are equivalent.
	 */
	equals(m: MatrixLike): boolean;

	/**
	 * Adds two matrices of the same size.
	 * @param m The other matrix.
	 * @returns The sum of the matrices.
	 */
	add(m: MatrixLike): Matrix;

	/**
	 * Calculates the adjugate of this matrix.
	 * @returns The adjugate of this matrix.
	 */
	adjoint(): Matrix;

	/**
	 * Creates a copy of this matrix.
	 * @returns A copy of this matrix.
	 */
	clone(): Matrix;

	/**
	 * Copies the values of another matrix into this one.
	 * @param m The matrix to copy.
	 * @returns This matrix.
	 */
	copy(m: MatrixLike): this;

	/** The Frobenius normal of this matrix. */
	get frob(): number;

	/**
	 * Multiplies this matrix by another.
	 * @param m The other matrix.
	 * @returns The product of the matrices.
	 */
	multiply(m: MatrixLike): Matrix;

	/**
	 * Multiplies this matrix by a scalar value.
	 * @param s The scalar value.
	 * @returns The product of the matrix and the scalar value.
	 */
	multiplyScalar(s: number): Matrix;

	/**
	 * Adds this matrix to another after multiplying the other by a scalar.
	 * @param m The other matrix.
	 * @param s The scalar.
	 * @returns The sum.
	 */
	multiplyScalarAndAdd(m: MatrixLike, s: number): Matrix;

	/**
	 * Subtracts another matrix from this one.
	 * @param m The other matrix.
	 * @returns The difference between the matrices.
	 */
	subtract(m: MatrixLike): Matrix;

	/**
	 * Transposes this matrix.
	 * @returns The transpose of this matrix.
	 */
	transpose(): Matrix;
}
