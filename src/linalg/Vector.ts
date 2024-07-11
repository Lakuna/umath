import type { Vector4Like } from "./Vector4.js";

/** An object that could be interpreted as a vector. */
export type VectorLike = Record<number, number>;

/**
 * A quantity with magnitude and direction.
 * @see [Wikipedia](https://en.wikipedia.org/wiki/Euclidean_vector)
 */
export default interface Vector extends VectorLike {
	/**
	 * Determine whether this vector is roughly equivalent to another.
	 * @param vector - The other vector.
	 * @returns Whether the vectors are equivalent.
	 */
	equals(vector: Vector4Like): boolean;

	/**
	 * Determine whether this vector is exactly equivalent to another.
	 * @param vector - The other vector.
	 * @returns Whether the vectors are equivalent.
	 */
	exactEquals(vector: Vector4Like): boolean;

	/**
	 * Add two vectors of the same size.
	 * @param vector - The other vector.
	 * @returns The sum of the vectors.
	 */
	add(vector: Vector4Like): VectorLike;

	/**
	 * Create a copy of this vector.
	 * @returns A copy of this vector.
	 */
	clone(): VectorLike;

	/**
	 * Copy the values of another vector into this one.
	 * @param vector - The vector to copy.
	 * @returns This vector.
	 */
	copy(vector: Vector4Like): this;

	/**
	 * Multiply this vector by another.
	 * @param vector - The other vector.
	 * @returns The product of the vectors.
	 */
	multiply(vector: Vector4Like): VectorLike;

	/**
	 * Divide this vector by another.
	 * @param vector - The other vector.
	 * @returns The quotient of the vectors.
	 */
	divide(vector: Vector4Like): VectorLike;

	/**
	 * Subtract another vector from this one.
	 * @param vector - The other vector.
	 * @returns The difference between the vectors.
	 */
	subtract(vector: Vector4Like): VectorLike;

	/**
	 * Round up the components of this vector.
	 * @returns The rounded vector.
	 */
	ceil(): VectorLike;

	/**
	 * Round down the components of this vector.
	 * @returns The rounded vector.
	 */
	floor(): VectorLike;

	/**
	 * Round the components of this vector.
	 * @returns The rounded vector.
	 */
	round(): VectorLike;

	/**
	 * Return the minimum of this and another vector.
	 * @param vector - The other vector.
	 * @returns The minimum.
	 */
	min(vector: Vector4Like): VectorLike;

	/**
	 * Return the maximum of this and another vector.
	 * @param vector - The other vector.
	 * @returns The maximum.
	 */
	max(vector: Vector4Like): VectorLike;

	/**
	 * Scale this vector by a scalar.
	 * @param scalar - The scalar.
	 * @returns The scaled vector.
	 */
	scale(scalar: number): VectorLike;

	/**
	 * Add another vector to this one after scaling the other by a scalar.
	 * @param vector - The other vector.
	 * @param scalar - The scalar.
	 * @returns The sum.
	 */
	scaleAndAdd(vector: Vector4Like, scalar: number): VectorLike;

	/**
	 * Calculate the Euclidean distance between this vector and another.
	 * @param vector - The other vector.
	 * @returns The distance.
	 */
	distance(vector: Vector4Like): number;

	/**
	 * Calculate the squared Euclidean distance between this vector and another.
	 * @param vector - The other vector.
	 * @returns The squared distance.
	 */
	squaredDistance(vector: Vector4Like): number;

	/** Get the magnitude (length) of this vector. */
	get magnitude(): number;

	/** Get the squared magnitude (length) of this vector. */
	get squaredMagnitude(): number;

	/**
	 * Negate this vector.
	 * @returns The negated vector.
	 */
	negate(): VectorLike;

	/**
	 * Calculate the multiplicative inverse of the components of this vector.
	 * @returns The inverted vector.
	 */
	invert(): VectorLike;

	/**
	 * Normalize this vector.
	 * @returns The normalized vector.
	 * @see [Unit vector](https://en.wikipedia.org/wiki/Unit_vector)
	 */
	normalize(): VectorLike;

	/**
	 * Calculate the dot product of this and another vector.
	 * @param vector - The other vector.
	 * @returns The dot product.
	 * @see [Dot product](https://en.wikipedia.org/wiki/Dot_product)
	 */
	dot(vector: Vector4Like): number;

	/**
	 * Perform a linear interpolation between this and another vector.
	 * @param vector - The other vector.
	 * @param t - The interpolation amount (in `[0,1]`).
	 * @returns The interpolated vector.
	 */
	lerp(vector: Vector4Like, t: number): VectorLike;

	/**
	 * Set this vector to a random value with the given magnitude.
	 * @param magnitude - The magnitude.
	 * @returns This vector.
	 */
	random(magnitude: number): this;

	/**
	 * Set this to the zero vector.
	 * @returns This vector.
	 */
	zero(): this;
}
