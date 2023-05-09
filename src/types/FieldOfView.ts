/** A field of view. */
export default interface FieldOfView {
	/** The angle to the top of the field of view in degrees. */
	upDegrees: number;

	/** The angle to the bottom of the field of view in degrees. */
	downDegrees: number;

	/** The angle to the left edge of the field of view in degrees. */
	leftDegrees: number;

	/** The angle to the right edge of the field of view in degrees. */
	rightDegrees: number;
}
