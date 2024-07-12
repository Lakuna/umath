/**
 * Returns whether or not a number is prime.
 * @param n - The number.
 * @returns Whether or not the number is prime.
 * @see [Prime number](https://en.wikipedia.org/wiki/Prime_number)
 */
export default function isPrime(n: number): boolean {
	// Negatives, zero, and one can't be prime.
	if (n < 2) {
		return false;
	}

	for (let i = 2; i * i <= n; i++) {
		if (n % i === 0) {
			return false;
		}
	}

	return true;
}
