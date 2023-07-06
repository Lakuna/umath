import type Matrix from "@lakuna/umath/Matrix";

/** A matrix with the same number of rows and columns. */
export default interface SquareMatrix extends Matrix {
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
