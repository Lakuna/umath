/**
 * Converts a given number of degrees to an equivalent number of radians.
 * @param degrees The number of degrees.
 * @returns An equivalent number of radians.
 */
export default function degreesToRadians(degrees: number): number {
	return degrees * Math.PI / 180;
}
