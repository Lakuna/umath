import type { default as Matrix, MatrixLike } from "./Matrix.js";

/**
 * A matrix with the same number of rows and columns.
 * @see [Square matrix](https://en.wikipedia.org/wiki/Square_matrix)
 */
export default interface SquareMatrix extends Matrix {
	/**
	 * Get the determinant of this matrix.
	 * @see [Determinant](https://en.wikipedia.org/wiki/Determinant)
	 */
	get determinant(): number;

	/**
	 * Calculate the adjugate of this matrix.
	 * @returns The adjugate of this matrix.
	 * @see [Adjugate matrix](https://en.wikipedia.org/wiki/Adjugate_matrix)
	 */
	adjoint(): MatrixLike;

	/**
	 * Reset this matrix to identity.
	 * @returns This matrix.
	 * @see [Identity matrix](https://en.wikipedia.org/wiki/Identity_matrix)
	 */
	identity(): this;

	/**
	 * Invert this matrix.
	 * @returns The inverted matrix.
	 * @see [Invertible matrix](https://en.wikipedia.org/wiki/Invertible_matrix)
	 */
	invert(): MatrixLike;
}
