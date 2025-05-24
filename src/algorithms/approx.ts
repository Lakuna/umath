import epsilon from "../utility/epsilon.js";

/**
 * Determine whether or not two numbers are approximately equivalent (no greater than `epsilon` apart).
 * @param a - The first number.
 * @param b - The second number.
 * @returns Whether or not the two numbers are approximately equivalent.
 * @public
 */
export default function approx(a: number, b: number): boolean {
	return Math.abs(a - b) <= epsilon;
}
