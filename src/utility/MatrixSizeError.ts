/**
 * An error resulting from trying to use a matrix that is the wrong size.
 * @public
 */
export default class PartialMatrixError extends Error {
	/**
	 * Create an error resulting from trying to use a matrix that is the wrong size.
	 * @param message - The message of the error.
	 */
	public constructor(message = "Invalid matrix dimensions.") {
		super(message);
		this.name = "MatrixSizeError";
	}
}
