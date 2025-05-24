/**
 * An error resulting from trying to invert a singular matrix.
 * @see {@link https://en.wikipedia.org/wiki/Invertible_matrix | Invertible matrix}
 * @public
 */
export default class SingularMatrixError extends Error {
	/**
	 * Create an error resulting from trying to invert a singular matrix.
	 * @param message - The message of the error.
	 */
	public constructor(message = "The matrix cannot be inverted.") {
		super(message);
		this.name = "SingularMatrixError";
	}
}
