/**
 * Perform a summation.
 * @param min - The lower bound (inclusive) of the index of summation.
 * @param max - The upper bound (inclusive) of the index of summation.
 * @param term - The function used to generate each term.
 * @returns The sum.
 * @see {@link https://en.wikipedia.org/wiki/Summation | Summation}
 * @public
 */
export default function summation(
	min: number,
	max: number,
	term: (i: number) => number
): number {
	// Not recursive in order to avoid exceeding the maximum call stack size.
	let out = 0;
	for (let i = min; i <= max; i++) {
		out += term(i);
	}

	return out;
}
