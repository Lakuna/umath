/**
 * Converts a given number of radians to an equivalent number of degrees.
 * @param radians The number of radians.
 * @returns An equivalent number of degrees.
 */
export default function radiansToDegrees(radians: number): number {
	return radians * 180 / Math.PI;
}
