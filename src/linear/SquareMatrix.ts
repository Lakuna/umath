import type Matrix from "./Matrix.js";

/** A matrix with the same number of rows and columns. */
export default interface SquareMatrix extends Matrix {
	/**
	 * Creates a matrix by removing the specified row and column from this matrix.
	 * @param r The row to remove.
	 * @param c The column to remove.
	 * @returns A submatrix.
	 */
	submatrix(r: number, c: number): SquareMatrix;

	/** The determinant of this matrix. */
	get determinant(): number;

	/**
	 * Resets this matrix to identity.
	 * @returns This matrix.
	 */
	identity(): this;

	/**
	 * Inverts this matrix.
	 * @returns The inverted matrix.
	 */
	invert(): SquareMatrix;
}
