/** An error resulting from using a vector that is too small. */
export default class MagnitudeError extends Error {
    /**
     * Creates an error resulting from using a vector that is too small.
     * @param message The message of the error.
     */
    public constructor(message = "The vector is too small.") {
        super(message);
    }
}
