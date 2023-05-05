/**
 * Returns the factorial of the given number.
 * @param n The number.
 * @returns The factorial of the number.
 */
export default function factorial(n: number): number {
	return n == 0 ? 1 : n * factorial(n - 1);
}
