import factorial from "./factorial.js";

/**
 * Calculate the number of combinations.
 * @param n - The total number of units.
 * @param r - The number of units taken at a time.
 * @returns The number of combinations.
 * @see {@link https://en.wikipedia.org/wiki/Combination | Combination}
 * @public
 */
export default function combinations(n: number, r: number): number {
	return factorial(n) / (factorial(r) * factorial(n - r));
}
