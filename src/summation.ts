/**
 * Recursively sums up the results of the given function.
 * @param i The index of summation.
 * @param max The upper bound of the index of summation.
 * @param term The function used to generate each term.
 */
function summationInternal(i: number, max: number, term: (i: number) => number): number {
	return term(i) + (i < max ? summationInternal(i + 1, max, term) : 0);
}

/**
 * Performs a summation.
 * @param min The lower bound (inclusive) of the index of summation.
 * @param max The upper bound (inclusive) of the index of summation.
 * @param term The function used to generate each term.
 * @returns The summation.
 */
export default function summation(min: number, max: number, term: (i: number) => number): number {
	return summationInternal(min, max, term);
}
