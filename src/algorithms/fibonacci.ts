/**
 * Calculate numbers in the Fibonacci sequence.
 * @returns The next value in the Fibonacci sequence.
 * @see [Fibonacci sequence](https://en.wikipedia.org/wiki/Fibonacci_sequence)
 */
export default function* fibonacci(): Generator<number, void> {
	let a = 0;
	let b = 1;

	while (a >= 0) {
		yield a;
		[a, b] = [b, a + b];
	}
}
