/**
 * An error resulting from trying to use a vector that is the wrong size.
 * @public
 */
export default class VectorSizeError extends Error {
	/**
	 * Create an error resulting from trying to use a vector that is the wrong size.
	 * @param message - The message of the error.
	 */
	public constructor(message = "Invalid vector dimensions.") {
		super(message);
		this.name = "VectorSizeError";
	}
}
