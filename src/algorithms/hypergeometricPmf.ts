import combinations from "./combinations.js";

/**
 * The probability mass function for the hypergeometric distribution.
 * @param N - The size of the finite population.
 * @param K - The number of objects with the desired feature in the finite population.
 * @param n - The number of draws without replacement.
 * @param k - The desired number of successes.
 * @see {@link https://en.wikipedia.org/wiki/Hypergeometric_distribution | Hypergeometric distribution}
 * @see {@link https://en.wikipedia.org/wiki/Probability_mass_function | Probability mass function}
 * @public
 */
export default function hypergeometricPmf(
	N: number,
	K: number,
	n: number,
	k: number
): number {
	return (combinations(K, k) * combinations(N - K, n - k)) / combinations(N, n);
}
