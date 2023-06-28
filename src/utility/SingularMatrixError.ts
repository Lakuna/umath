/** An error resulting from trying to invert a singular matrix. */
export default class SingularMatrixError extends Error {
    /**
     * Creates an error resulting from trying to invert a singular matrix.
     * @param message The message of the error.
     */
    public constructor(message = "The matrix cannot be inverted.") {
        super(message);
    }
}
