/** An error resulting from trying to use a matrix that is the wrong size. */
export default class PartialMatrixError extends Error {
	/**
	 * Creates an error resulting from trying to use a matrix that is the wrong size.
	 * @param message The message of the error.
	 */
	public constructor(message = "The matrix is not the right size.") {
		super(message);
	}
}
