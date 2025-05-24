import epsilon from "../utility/epsilon.js";

/**
 * Determine whether or not two numbers are approximately equivalent relative to the size of the numbers (no greater than `epsilon * Math.max(1, Math.abs(a), Math.abs(b))` apart).
 * @param a - The first number.
 * @param b - The second number.
 * @returns Whether or not the two numbers are approximately equivalent.
 * @public
 */
export default function approxRelative(a: number, b: number): boolean {
	return Math.abs(a - b) <= epsilon * Math.max(1, Math.abs(a), Math.abs(b));
}
