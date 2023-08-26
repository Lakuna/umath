/**
 * An error resulting from trying to invert a singular matrix.
 * @see [Invertible matrix](https://en.wikipedia.org/wiki/Invertible_matrix)
 */
export default class SingularMatrixError extends Error {
	/**
	 * Creates an error resulting from trying to invert a singular matrix.
	 * @param message The message of the error.
	 */
	public constructor(message = "The matrix cannot be inverted.") {
		super(message);
		this.name = "SingularMatrixError";
	}
}
