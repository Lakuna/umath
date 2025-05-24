const ratio = 180 / Math.PI;

/**
 * Convert a number of radians to an equivalent number of degrees.
 * @param radians - The number of radians.
 * @returns A number of degrees.
 * @see {@link https://en.wikipedia.org/wiki/Degree_(angle) | Degree}
 * @see {@link https://en.wikipedia.org/wiki/Radian | Radian}
 * @public
 */
export default function radiansToDegrees(radians: number): number {
	return radians * ratio;
}
