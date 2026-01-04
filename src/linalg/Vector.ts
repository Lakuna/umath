/**
 * An object that could be interpreted as a vector.
 * @public
 */
export type VectorLike = Record<number, number>;

/**
 * A quantity with magnitude and direction.
 * @see {@link https://en.wikipedia.org/wiki/Euclidean_vector | Euclidean vector}
 * @public
 */
export default interface Vector extends VectorLike {
	/**
	 * Determine whether this vector is roughly equivalent to another.
	 * @param vector - The other vector.
	 * @returns Whether the vectors are equivalent.
	 */
	equals(vector: VectorLike): boolean;

	/**
	 * Determine whether this vector is exactly equivalent to another.
	 * @param vector - The other vector.
	 * @returns Whether the vectors are equivalent.
	 */
	exactEquals(vector: VectorLike): boolean;

	/**
	 * Add two vectors of the same size.
	 * @param vector - The other vector.
	 * @returns The sum of the vectors.
	 */
	add(vector: VectorLike): VectorLike;

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
	copy(vector: VectorLike): this;

	/**
	 * Multiply this vector by another.
	 * @param vector - The other vector.
	 * @returns The product of the vectors.
	 */
	multiply(vector: VectorLike): VectorLike;

	/**
	 * Divide this vector by another.
	 * @param vector - The other vector.
	 * @returns The quotient of the vectors.
	 */
	divide(vector: VectorLike): VectorLike;

	/**
	 * Subtract another vector from this one.
	 * @param vector - The other vector.
	 * @returns The difference between the vectors.
	 */
	subtract(vector: VectorLike): VectorLike;

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
	min(vector: VectorLike): VectorLike;

	/**
	 * Return the maximum of this and another vector.
	 * @param vector - The other vector.
	 * @returns The maximum.
	 */
	max(vector: VectorLike): VectorLike;

	/**
	 * Raise each component of this vector to the given power.
	 * @param exponent - The exponent (power) to raise each component to.
	 * @returns The power (result of the exponentiation).
	 */
	pow(exponent: number): VectorLike;

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
	scaleAndAdd(vector: VectorLike, scalar: number): VectorLike;

	/**
	 * Calculate the Euclidean distance between this vector and another.
	 * @param vector - The other vector.
	 * @returns The distance.
	 */
	distance(vector: VectorLike): number;

	/**
	 * Calculate the squared Euclidean distance between this vector and another.
	 * @param vector - The other vector.
	 * @returns The squared distance.
	 */
	squaredDistance(vector: VectorLike): number;

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
	 * @see {@link https://en.wikipedia.org/wiki/Unit_vector | Unit vector}
	 */
	normalize(): VectorLike;

	/**
	 * Calculate the dot product of this and another vector.
	 * @param vector - The other vector.
	 * @returns The dot product.
	 * @see {@link https://en.wikipedia.org/wiki/Dot_product | Dot product}
	 */
	dot(vector: VectorLike): number;

	/**
	 * Perform a linear interpolation between this and another vector.
	 * @param vector - The other vector.
	 * @param t - The interpolation amount (in `[0,1]`).
	 * @returns The interpolated vector.
	 */
	lerp(vector: VectorLike, t: number): VectorLike;

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
