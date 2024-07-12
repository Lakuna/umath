/**
 * Convert a number of radians to an equivalent number of degrees.
 * @param radians - The number of radians.
 * @returns A number of degrees.
 * @see [Degree](https://en.wikipedia.org/wiki/Degree_(angle))
 * @see [Radian](https://en.wikipedia.org/wiki/Radian)
 */
export default function radiansToDegrees(radians: number): number {
	return (radians * 180) / Math.PI;
}
