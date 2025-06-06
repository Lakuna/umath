/**
 * Calculate the factorial of a number.
 * @param n - The number.
 * @returns The factorial.
 * @see {@link https://en.wikipedia.org/wiki/Factorial | Factorial}
 * @public
 */
export default function factorial(n: number): number {
	if (n < 0) {
		return n % 2 ? Infinity : -Infinity; // Division by zero returns `Infinity` in JavaScript.
	}

	// Not recursive in order to avoid exceeding the maximum call stack size.
	let out = 1;
	for (let i = 2; i <= n; i++) {
		out *= i;
	}

	return out;
}
