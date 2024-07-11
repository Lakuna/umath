import type { Matrix4Like } from "./Matrix4.js";

/** An object that could be interpreted as a matrix. */
export type MatrixLike = Record<number, number>;

/**
 * A rectangular array of numbers, arranged in rows and columns.
 * @see [Matrix](https://en.wikipedia.org/wiki/Matrix_(mathematics))
 */
export default interface Matrix extends MatrixLike {
	/** The number of rows in this matrix. */
	height: number;

	/** The number of columns in this matrix. */
	width: number;

	/**
	 * Get the Frobenius norm of this matrix.
	 * @see [Matrix norm](https://en.wikipedia.org/wiki/Matrix_norm)
	 */
	get frob(): number;

	/**
	 * Add two matrices of the same size.
	 * @param matrix - The other matrix.
	 * @returns The sum of the matrices.
	 * @see [Matrix addition](https://en.wikipedia.org/wiki/Matrix_addition)
	 */
	add(matrix: Matrix4Like): MatrixLike;

	/**
	 * Create a copy of this matrix.
	 * @returns A copy of this matrix.
	 */
	clone(): MatrixLike;

	/**
	 * Copy the values of another matrix into this one.
	 * @param matrix - The matrix to copy.
	 * @returns This matrix.
	 */
	copy(matrix: Matrix4Like): this;

	/**
	 * Determine whether or not this matrix is roughly equivalent to another.
	 * @param matrix - The other matrix.
	 * @returns Whether the matrices are equivalent.
	 */
	equals(matrix: Matrix4Like): boolean;

	/**
	 * Determine whether or not this matrix is exactly equivalent to another.
	 * @param matrix - The other matrix.
	 * @returns Whether the matrices are equivalent.
	 */
	exactEquals(matrix: Matrix4Like): boolean;

	/**
	 * Multiply this matrix by another.
	 * @param matrix - The other matrix.
	 * @returns The product of the matrices.
	 * @see [Matrix multiplication](https://en.wikipedia.org/wiki/Matrix_multiplication)
	 */
	multiply(matrix: Matrix4Like): MatrixLike;

	/**
	 * Multiply this matrix by a scalar value.
	 * @param scalar - The scalar value.
	 * @returns The product of the matrix and the scalar value.
	 * @see [Matrix multiplication](https://en.wikipedia.org/wiki/Matrix_multiplication)
	 */
	multiplyScalar(scalar: number): MatrixLike;

	/**
	 * Add this matrix to another after multiplying the other by a scalar.
	 * @param matrix - The other matrix.
	 * @param scalar - The scalar.
	 * @returns The sum.
	 * @see [Matrix addition](https://en.wikipedia.org/wiki/Matrix_addition)
	 * @see [Matrix multiplication](https://en.wikipedia.org/wiki/Matrix_multiplication)
	 */
	multiplyScalarAndAdd(matrix: Matrix4Like, scalar: number): MatrixLike;

	/**
	 * Subtract another matrix from this one.
	 * @param matrix - The other matrix.
	 * @returns The difference between the matrices.
	 * @see [Matrix addition](https://en.wikipedia.org/wiki/Matrix_addition)
	 */
	subtract(matrix: Matrix4Like): MatrixLike;

	/**
	 * Transpose this matrix.
	 * @returns The transpose of this matrix.
	 * @see [Transpose](https://en.wikipedia.org/wiki/Transpose)
	 */
	transpose(): MatrixLike;
}
