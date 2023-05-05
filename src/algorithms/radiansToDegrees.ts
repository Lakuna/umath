/**
 * Converts a given number of radians to an equivalent number of degrees.
 * @param r The number of radians.
 * @returns An equivalent number of degrees.
 */
export default function radiansToDegrees(d: number): number {
	return d * 180 / Math.PI;
}
