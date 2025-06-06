import type { Vector3Like } from "../linalg/Vector3.js";

/**
 * An axis and an angle to rotate around it.
 * @public
 */
export default interface AxisAngle {
	/** The axis to rotate around. */
	axis: Vector3Like;

	/** The angle to rotate around the axis by in radians. */
	angle: number;
}
