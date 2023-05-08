import type { MatrixLike } from "./Matrix.js";

/** A quantity with magnitude and direction. */
export type VectorLike = Vector | Iterable<number>;

/** The largest difference between two values in vectors for them to be considered equal. */
export const vectorEpsilon = 0.000001;

/** A quantity with magnitude and direction. */
export default interface Vector extends Iterable<number> {
	/**
	 * Determines whether this vector is roughly equal to another.
	 * @param vector The other vector.
	 * @returns Whether the vectors are roughly equal.
	 */
	equals(vector: VectorLike): boolean;

	/**
	 * Determines whether this vector is exactly equal to another.
	 * @param vector The other vector.
	 * @returns Whether the vectors are exactly equal.
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
	 * Sets the values in this vector.
	 * @param values The new values.
	 * @returns This vector.
	 */
	fromValues(...values: Array<number>): this;

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
	 * @param amount The interpolation amount (in `[0,1]`).
	 * @returns The interpolated vector.
	 */
	lerp(vector: VectorLike, amount: number): Vector;

	/**
	 * Sets this vector to a random value with the given magnitude.
	 * @param magnitude The magnitude.
	 * @returns This vector.
	 */
	random(magnitude: number): this;

	/**
	 * Transforms this vector by a matrix.
	 * @param matrix The matrix.
	 * @returns The transformed vector.
	 */
	transform(matrix: MatrixLike): Vector;

	/**
	 * Sets this to the zero vector.
	 * @returns This vector.
	 */
	zero(): this;
}
