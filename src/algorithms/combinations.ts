import factorial from "#factorial";

/**
 * Calculates the number of combinations.
 * @param n The total number of units.
 * @param r The number of units taken at a time.
 * @returns The number of combinations.
 * @see [Combination](https://en.wikipedia.org/wiki/Combination)
 */
export default function combinations(n: number, r: number): number {
	return factorial(n) / (factorial(r) * factorial(n - r));
}
