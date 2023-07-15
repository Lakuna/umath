/**
 * Determines the greatest common divisor of two integers.
 * @param a The first integer.
 * @param b The second integer.
 * @returns The greatest common divisor of the integers.
 * @see [Greatest common divisor](https://en.wikipedia.org/wiki/Greatest_common_divisor)
 */
export default function greatestCommonDivisor(a: bigint, b: bigint): bigint;

/**
 * Determines the greatest common divisor of two integers.
 * @param a The first integer.
 * @param b The second integer.
 * @returns The greatest common divisor of the integers.
 * @see [Greatest common divisor](https://en.wikipedia.org/wiki/Greatest_common_divisor)
 */
export default function greatestCommonDivisor(a: number, b: number): number;

export default function greatestCommonDivisor(a: bigint | number, b: bigint | number): bigint | number {
	// Ensure that all of the integers are positive.
	if (a < 0) { a = -a; }
	if (b < 0) { b = -b; }

	// Apply the Euclidean algorithm.
	while (b) {
		[a, b] = [b, (a as number) % (b as number)];
	}

	return a;
}
