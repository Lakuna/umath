import type { Vector3Like } from "../linalg/Vector3.js";

/**
 * An axis and an angle to rotate around it.
 * @public
 */
export default interface AxisAngle {
	/** The angle to rotate around the axis by in radians. */
	angle: number;

	/** The axis to rotate around. */
	axis: Vector3Like;
}

/**
 * An axis and an angle to rotate around it. Readonly.
 * @public
 */
export interface ReadonlyAxisAngle extends AxisAngle {
	/** The angle to rotate around the axis by in radians. */
	readonly angle: number;

	/** The axis to rotate around. */
	readonly axis: Readonly<Vector3Like>;
}
