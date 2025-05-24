import type { default as Matrix, MatrixLike } from "./Matrix.js";

/**
 * A matrix with the same number of rows and columns.
 * @see {@link https://en.wikipedia.org/wiki/Square_matrix | Square matrix}
 * @public
 */
export default interface SquareMatrix extends Matrix {
	/**
	 * Get the determinant of this matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Determinant | Determinant}
	 */
	get determinant(): number;

	/**
	 * Calculate the adjugate of this matrix.
	 * @returns The adjugate of this matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Adjugate_matrix | Adjugate matrix}
	 */
	adjoint(): MatrixLike;

	/**
	 * Reset this matrix to identity.
	 * @returns This matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Identity_matrix | Identity matrix}
	 */
	identity(): this;

	/**
	 * Invert this matrix.
	 * @returns The inverted matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Invertible_matrix | Invertible matrix}
	 */
	invert(): MatrixLike;
}
