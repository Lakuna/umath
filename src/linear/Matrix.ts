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
	 * @param row The row of the value.
	 * @param col The column of the value.
	 * @returns The value at the specified position.
	 */
	get(row: number, col: number): number | undefined;

	/**
	 * Sets the value at the given position in this matrix.
	 * @param row The row of the value.
	 * @param col The column of the value.
	 * @param val The value.
	 */
	put(row: number, col: number, val: number): void;

	/**
	 * Determines whether this matrix is roughly equivalent to another.
	 * @param matrix The other matrix.
	 * @returns Whether the matrices are equivalent.
	 */
	equals(matrix: MatrixLike): boolean;

	/**
	 * Determines whether this matrix is exactly equivalent to another.
	 * @param matrix The other matrix.
	 * @returns Whether the matrices are equivalent.
	 */
	exactEquals(matrix: MatrixLike): boolean;

	/**
	 * Adds two matrices of the same size.
	 * @param matrix The other matrix.
	 * @returns The sum of the matrices.
	 */
	add(matrix: MatrixLike): Matrix;

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
	 * @param matrix The matrix to copy.
	 * @returns This matrix.
	 */
	copy(matrix: MatrixLike): this;

	/** The Frobenius normal of this matrix. */
	get frob(): number;

	/**
	 * Multiplies this matrix by another.
	 * @param matrix The other matrix.
	 * @returns The product of the matrices.
	 */
	multiply(matrix: MatrixLike): Matrix;

	/**
	 * Multiplies this matrix by a scalar value.
	 * @param scalar The scalar value.
	 * @returns The product of the matrix and the scalar value.
	 */
	multiplyScalar(scalar: number): Matrix;

	/**
	 * Adds this matrix to another after multiplying the other by a scalar.
	 * @param matrix The other matrix.
	 * @param scalar The scalar.
	 * @returns The sum.
	 */
	multiplyScalarAndAdd(matrix: MatrixLike, scalar: number): Matrix;

	/**
	 * Subtracts another matrix from this one.
	 * @param matrix The other matrix.
	 * @returns The difference between the matrices.
	 */
	subtract(matrix: MatrixLike): Matrix;

	/**
	 * Transposes this matrix.
	 * @returns The transpose of this matrix.
	 */
	transpose(): Matrix;
}
