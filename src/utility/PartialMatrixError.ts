/** An error resulting from creating a matrix that isn't a perfect rectangle. */
export default class PartialMatrixError extends Error {
	/**
	 * Creates an error resulting from creating a matrix that isn't a perfect rectangle.
	 * @param message The message of the error.
	 */
	public constructor(message = "The matrix is not rectangular.") {
		super(message);
		this.name = "PartialMatrixError";
	}
}
