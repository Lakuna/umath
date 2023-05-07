/** A rectangular array of numbers, arranged in rows and columns. */
export type MatrixLike = Matrix | Iterable<number>;

/** The largest difference between two values in matrices for them to be considered equal. */
export const matrixEpsilon = 0.000001;

/** A rectangular array of numbers, arranged in rows and columns. */
export default interface Matrix extends Iterable<number> {
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
	 * Determines whether this matrix is roughly equal to another.
	 * @param matrix The other matrix.
	 * @returns Whether the matrices are roughly equal.
	 */
	equals(matrix: MatrixLike): boolean;

	/**
	 * Determines whether this matrix is exactly equal to another.
	 * @param matrix The other matrix.
	 * @returns Whether the matrices are exactly equal.
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

	/**
	 * Sets the values in this matrix.
	 * @param values The new values.
	 * @returns This matrix.
	 */
	fromValues(...values: Array<number>): this;
}

/** A matrix with the same number of rows and columns. */
export interface SquareMatrix extends Matrix {
	/**
	 * Creates a matrix by removing the specified row and column from this matrix.
	 * @param row The row to remove.
	 * @param col The column to remove.
	 * @returns A submatrix.
	 */
	submatrix(row: number, col: number): SquareMatrix;

	/** The determinant of this matrix. */
	get determinant(): number;

	/**
	 * Resets this matrix to identity.
	 * @returns This matrix.
	 */
	identity(): this;

	/**
	 * Inverts this matrix.
	 * @returns This matrix.
	 */
	invert(): SquareMatrix;
}
