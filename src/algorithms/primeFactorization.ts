/**
 * Factors the given number into a list of prime numbers.
 * @param n The number to factor.
 * @returns A list of prime number factors of the given number,
 */
export default function primeFactorization(n: number): Array<number> {
	const out: Array<number> = [];

	let divisor = 2;
	while (n >= 2) {
		if (n % divisor == 0) {
			out.push(divisor);
			n /= divisor;
		} else {
			divisor++;
		}
	}

	return out;
}
