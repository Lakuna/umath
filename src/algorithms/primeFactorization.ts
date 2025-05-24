/**
 * Factor a number into a list of prime numbers.
 * @param n - The number to factor.
 * @returns A list of prime number factors of the number.
 * @see {@link https://en.wikipedia.org/wiki/Integer_factorization | Integer factorization}
 * @public
 */
export default function primeFactorization(n: number): number[] {
	let m = n;
	const out = [];
	let divisor = 2;
	while (m >= 2) {
		if (m % divisor === 0) {
			out.push(divisor);
			m /= divisor;
			continue;
		}

		divisor++;
	}

	return out;
}
