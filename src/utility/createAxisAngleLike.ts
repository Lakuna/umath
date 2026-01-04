import type AxisAngle from "../types/AxisAngle.js";
import { createVector3Like } from "../linalg/Vector3.js";

/**
 * Create an empty axis-angle pair.
 * @returns An empty axis-angle pair.
 * @public
 */
export default function createAxisAngleLike(): AxisAngle & {
	axis: Float32Array;
} {
	return { angle: 0, axis: createVector3Like() };
}
