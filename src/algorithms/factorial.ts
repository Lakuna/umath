/**
 * Returns the factorial of the given number.
 * @param n The number.
 * @returns The factorial of the number.
 * @see [Factorial](https://en.wikipedia.org/wiki/Factorial)
 */
export default function factorial(n: number): number {
	return n < 0
		? Infinity * (n % 2 ? 1 : -1) // Division by zero returns `Infinity` in JavaScript.
		: n == 0
		? 1
		: n * factorial(n - 1);
}
