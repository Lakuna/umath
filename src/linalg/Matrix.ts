/**
 * A rectangular array of numbers, arranged in rows and columns.
 * @see [Matrix](https://en.wikipedia.org/wiki/Matrix_(mathematics))
 */
export type MatrixLike = Matrix | ArrayLike<number>;

/**
 * A rectangular array of numbers, arranged in rows and columns.
 * @see [Matrix](https://en.wikipedia.org/wiki/Matrix_(mathematics))
 */
export default interface Matrix extends ArrayLike<number> {
	/** The number of rows in this matrix. */
	height: number;

	/** The number of columns in this matrix. */
	width: number;

	/**
	 * The Frobenius norm of this matrix.
	 * @see [Matrix norm](https://en.wikipedia.org/wiki/Matrix_norm)
	 */
	get frob(): number;
	
	/**
	 * Adds two matrices of the same size.
	 * @param matrix The other matrix.
	 * @returns The sum of the matrices.
	 * @see [Matrix addition](https://en.wikipedia.org/wiki/Matrix_addition)
	 */
	add(matrix: MatrixLike): Matrix;

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
	 * Multiplies this matrix by another.
	 * @param matrix The other matrix.
	 * @returns The product of the matrices.
	 * @see [Matrix multiplication](https://en.wikipedia.org/wiki/Matrix_multiplication)
	 */
	multiply(matrix: MatrixLike): Matrix;

	/**
	 * Multiplies this matrix by a scalar value.
	 * @param scalar The scalar value.
	 * @returns The product of the matrix and the scalar value.
	 * @see [Matrix multiplication](https://en.wikipedia.org/wiki/Matrix_multiplication)
	 */
	multiplyScalar(scalar: number): Matrix;

	/**
	 * Adds this matrix to another after multiplying the other by a scalar.
	 * @param matrix The other matrix.
	 * @param scalar The scalar.
	 * @returns The sum.
	 * @see [Matrix addition](https://en.wikipedia.org/wiki/Matrix_addition)
	 * @see [Matrix multiplication](https://en.wikipedia.org/wiki/Matrix_multiplication)
	 */
	multiplyScalarAndAdd(matrix: MatrixLike, scalar: number): Matrix;

	/**
	 * Subtracts another matrix from this one.
	 * @param matrix The other matrix.
	 * @returns The difference between the matrices.
	 * @see [Matrix addition](https://en.wikipedia.org/wiki/Matrix_addition)
	 */
	subtract(matrix: MatrixLike): Matrix;

	/**
	 * Transposes this matrix.
	 * @returns The transpose of this matrix.
	 * @see [Transpose](https://en.wikipedia.org/wiki/Transpose)
	 */
	transpose(): Matrix;
}
