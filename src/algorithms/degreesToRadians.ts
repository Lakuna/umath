/**
 * Converts a given number of degrees to an equivalent number of radians.
 * @param degrees The number of degrees.
 * @returns An equivalent number of radians.
 * @see [Degree](https://en.wikipedia.org/wiki/Degree_(angle))
 * @see [Radian](https://en.wikipedia.org/wiki/Radian)
 */
export default function degreesToRadians(degrees: number): number {
	return (degrees * Math.PI) / 180;
}
