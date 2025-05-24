/**
 * An error resulting from using a vector that is too small or too large.
 * @public
 */
export default class MagnitudeError extends Error {
	/**
	 * Create an error resulting from using a vector that is too small or too large.
	 * @param message - The message of the error.
	 */
	public constructor(message = "The vector is too small or too large.") {
		super(message);
		this.name = "MagnitudeError";
	}
}
