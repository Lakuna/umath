/**
 * Determine the greatest common divisor of two integers.
 * @param a - The first integer.
 * @param b - The second integer.
 * @returns The greatest common divisor.
 * @see {@link https://en.wikipedia.org/wiki/Greatest_common_divisor | Greatest common divisor}
 * @public
 */
export default function greatestCommonDivisor(a: bigint, b: bigint): bigint;
/**
 * Determine the greatest common divisor of two integers.
 * @param a - The first integer.
 * @param b - The second integer.
 * @returns The greatest common divisor.
 * @see {@link https://en.wikipedia.org/wiki/Greatest_common_divisor | Greatest common divisor}
 * @public
 */
export default function greatestCommonDivisor(a: number, b: number): number;
export default function greatestCommonDivisor(
	a: bigint | number,
	b: bigint | number
): bigint | number {
	if (typeof a === "number" && typeof b === "number") {
		// Ensure that both of the integers are positive.
		let c = Math.abs(a);
		let d = Math.abs(b);

		// Apply the Euclidean algorithm.
		while (d) {
			[c, d] = [d, c % d];
		}

		return c;
	}

	if (typeof a === "number" || typeof b === "number") {
		throw new Error("Mismatched argument types.");
	}

	// Ensure that both of the integers are positive. Can't use `Math.abs` in case `a` and `b` are `bigint`s.
	let c = a < 0 ? -a : a;
	let d = b < 0 ? -b : b;

	// Apply the Euclidean algorithm.
	while (d) {
		[c, d] = [d, c % d];
	}

	return c;
}
