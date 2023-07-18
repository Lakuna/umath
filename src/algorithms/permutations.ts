import { factorial } from "@lakuna/umath";

/**
 * Calculates the number of permutations.
 * @param n The total number of units.
 * @param r The number of units taken at a time.
 * @returns The number of permutations.
 * @see [Permutation](https://en.wikipedia.org/wiki/Permutation)
 */
export default function permutations(n: number, r: number): number {
	return factorial(n) / factorial(n - r);
}
