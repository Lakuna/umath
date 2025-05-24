const ratio = Math.PI / 180;

/**
 * Convert a number of degrees to an equivalent number of radians.
 * @param degrees - The number of degrees.
 * @returns A number of radians.
 * @see {@link https://en.wikipedia.org/wiki/Degree_(angle) | Degree}
 * @see {@link https://en.wikipedia.org/wiki/Radian | Radian}
 * @public
 */
export default function degreesToRadians(degrees: number): number {
	return degrees * ratio;
}
