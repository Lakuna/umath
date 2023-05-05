/**
 * Converts a given number of degrees to an equivalent number of radians.
 * @param d The number of degrees.
 * @returns An equivalent number of radians.
 */
export default function degreesToRadians(d: number): number {
	return d * Math.PI / 180;
}
