/** A quantity with magnitude and direction. */
export type VectorLike = Vector | Iterable<number>;

// TODO: Link documentation to relevant articles.

/**
 * A quantity with magnitude and direction.
 * @see [Wikipedia](https://en.wikipedia.org/wiki/Euclidean_vector)
 */
export default interface Vector extends Iterable<number> {
	/**
	 * Determines whether this vector is roughly equivalent to another.
	 * @param vector The other vector.
	 * @returns Whether the vectors are equivalent.
	 */
	equals(vector: VectorLike): boolean;

	/**
	 * Determines whether this vector is exactly equivalent to another.
	 * @param vector The other vector.
	 * @returns Whether the vectors are equivalent.
	 */
	exactEquals(vector: VectorLike): boolean;

	/**
	 * Adds two vectors of the same size.
	 * @param vector The other vector.
	 * @returns The sum of the vectors.
	 */
	add(vector: VectorLike): Vector;

	/**
	 * Creates a copy of this vector.
	 * @returns A copy of this vector.
	 */
	clone(): Vector;

	/**
	 * Copies the values of another vector into this one.
	 * @param vector The vector to copy.
	 * @returns This vector.
	 */
	copy(vector: VectorLike): this;

	/**
	 * Multiplies this vector by another.
	 * @param vector The other vector.
	 * @returns The product of the vectors.
	 */
	multiply(vector: VectorLike): Vector;

	/**
	 * Divides this vector by another.
	 * @param vector The other vector.
	 * @returns The quotient of the vectors.
	 */
	divide(vector: VectorLike): Vector;

	/**
	 * Subtracts another vector from this one.
	 * @param vector The other vector.
	 * @returns The difference between the vectors.
	 */
	subtract(vector: VectorLike): Vector;

	/**
	 * Rounds up the components of this vector.
	 * @returns The rounded vector.
	 */
	ceil(): Vector;

	/**
	 * Rounds down the components of this vector.
	 * @returns The rounded vector.
	 */
	floor(): Vector;

	/**
	 * Rounds the components of this vector.
	 * @returns The rounded vector.
	 */
	round(): Vector;

	/**
	 * Returns the minimum of this and another vector.
	 * @param vector The other vector.
	 * @returns The minimum.
	 */
	min(vector: VectorLike): Vector;

	/**
	 * Returns the maximum of this and another vector.
	 * @param vector The other vector.
	 * @returns The maximum.
	 */
	max(vector: VectorLike): Vector;

	/**
	 * Scales this vector by a scalar.
	 * @param scalar The scalar.
	 * @returns The scaled vector.
	 */
	scale(scalar: number): Vector;

	/**
	 * Adds another vector to this one after scaling the other by a scalar.
	 * @param vector The other vector.
	 * @param scalar The scalar.
	 * @returns The sum.
	 */
	scaleAndAdd(vector: VectorLike, scalar: number): Vector;

	/**
	 * Calculates the Euclidean distance between this vector and another.
	 * @param vector The other vector.
	 * @returns The distance.
	 */
	distance(vector: VectorLike): number;

	/**
	 * Calculates the squared Euclidean distance between this vector and another.
	 * @param vector The other vector.
	 * @returns The squared distance.
	 */
	squaredDistance(vector: VectorLike): number;

	/** The magnitude (length) of this vector. */
	get magnitude(): number;

	/** The squared magnitude (length) of this vector. */
	get squaredMagnitude(): number;

	/**
	 * Negates this vector.
	 * @returns The negated vector.
	 */
	negate(): Vector;

	/**
	 * Calculates the multiplicative inverse of the components of this vector.
	 * @returns The inverted vector.
	 */
	inverse(): Vector;

	/**
	 * Normalizes this vector.
	 * @returns The normalized vector.
	 */
	normalize(): Vector;

	/**
	 * Calculates the dot product of this and another vector.
	 * @param vector The other vector.
	 * @returns The dot product.
	 */
	dot(vector: VectorLike): number;

	/**
	 * Performs a linear interpolation between this and another vector.
	 * @param vector The other vector.
	 * @param t The interpolation amount (in `[0,1]`).
	 * @returns The interpolated vector.
	 */
	lerp(vector: VectorLike, t: number): Vector;

	/**
	 * Sets this vector to a random value with the given magnitude.
	 * @param magnitude The magnitude.
	 * @returns This vector.
	 */
	random(magnitude: number): this;

	/**
	 * Sets this to the zero vector.
	 * @returns This vector.
	 */
	zero(): this;
}
