import type { Matrix } from "@lakuna/umath";

/**
 * A matrix with the same number of rows and columns.
 * @see [Square matrix](https://en.wikipedia.org/wiki/Square_matrix)
 */
export default interface SquareMatrix extends Matrix {
	/**
	 * The determinant of this matrix.
	 * @see [Determinant](https://en.wikipedia.org/wiki/Determinant)
	 */
	get determinant(): number;

	/**
	 * Resets this matrix to identity.
	 * @returns This matrix.
	 * @see [Identity matrix](https://en.wikipedia.org/wiki/Identity_matrix)
	 */
	identity(): this;

	/**
	 * Inverts this matrix.
	 * @returns The inverted matrix.
	 * @see [Invertible matrix](https://en.wikipedia.org/wiki/Invertible_matrix)
	 */
	invert(): SquareMatrix;
}
