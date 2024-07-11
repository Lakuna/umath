/**
 * Determine the greatest common divisor of two integers.
 * @param a - The first integer.
 * @param b - The second integer.
 * @returns The greatest common divisor.
 * @see [Greatest common divisor](https://en.wikipedia.org/wiki/Greatest_common_divisor)
 */
export default function greatestCommonDivisor(a: bigint, b: bigint): bigint;

/**
 * Determine the greatest common divisor of two integers.
 * @param a - The first integer.
 * @param b - The second integer.
 * @returns The greatest common divisor.
 * @see [Greatest common divisor](https://en.wikipedia.org/wiki/Greatest_common_divisor)
 */
export default function greatestCommonDivisor(a: number, b: number): number;

export default function greatestCommonDivisor(
	a: bigint | number,
	b: bigint | number
) {
	// Ensure that both of the integers are positive.
	let c = a < 0 ? -a : a;
	let d = b < 0 ? -b : b;

	// Apply the Euclidean algorithm.
	while (d) {
		[c, d] = [d, (c as number) % (d as number)];
	}

	return c;
}
