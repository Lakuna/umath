/**
 * A generator function that returns numbers in the Fibonacci sequence.
 * @returns The next value in the Fibonacci sequence.
 * @see [Fibonacci sequence](https://en.wikipedia.org/wiki/Fibonacci_sequence)
 */
export default function* fibonacci(): Generator<number> {
	let a = 0;
	let b = 1;

	while (true) {
		yield a;
		[a, b] = [b, a + b];
	}
}
