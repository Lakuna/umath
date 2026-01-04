import type Vector from "./Vector.js";
import type { VectorLike } from "./Vector.js";
import VectorSizeError from "../utility/VectorSizeError.js";
import approx from "../algorithms/approx.js";

/**
 * A vector with size information.
 * @internal
 */
interface SizedVectorLike extends VectorLike {
	/** The length (number of elements) of the vector. */
	length: number;
}

/**
 * Determine whether the given `VectorLike` has size information.
 * @internal
 */
const isSized = (vector: VectorLike): vector is SizedVectorLike =>
	"length" in vector && typeof vector.length === "number";

/**
 * A variable-size vector.
 * @see {@link https://en.wikipedia.org/wiki/Euclidean_vector | Euclidean vector}
 * @public
 */
export default class SlowVector extends Float32Array implements Vector {
	/**
	 * Create a variable-size vector from the given values.
	 * @param values - The values in the vector.
	 */
	public constructor(...values: number[]) {
		super(values);
	}

	/**
	 * Determine whether this vector is roughly equivalent to another.
	 * @param vector - The other vector.
	 * @returns Whether the vectors are equivalent.
	 */
	public equals(vector: VectorLike): boolean {
		if (!isSized(vector) || this.length !== vector.length) {
			throw new VectorSizeError();
		}

		for (let i = 0; i < this.length; i++) {
			const a = this[i];
			const b = vector[i];
			if (
				typeof a === "undefined" ||
				typeof b === "undefined" ||
				!approx(a, b)
			) {
				return false;
			}
		}

		return true;
	}

	/**
	 * Determine whether this vector is exactly equivalent to another.
	 * @param vector - The other vector.
	 * @returns Whether the vectors are equivalent.
	 */
	public exactEquals(vector: VectorLike): boolean {
		if (!isSized(vector) || this.length !== vector.length) {
			throw new VectorSizeError();
		}

		for (let i = 0; i < this.length; i++) {
			if (this[i] !== vector[i]) {
				return false;
			}
		}

		return true;
	}

	/**
	 * Add two vectors of the same size.
	 * @param vector - The other vector.
	 * @returns The sum of the vectors.
	 */
	public add(vector: VectorLike): SlowVector {
		if (!isSized(vector) || this.length !== vector.length) {
			throw new VectorSizeError();
		}

		const out = [];
		for (let i = 0; i < this.length; i++) {
			out[i] = (this[i] ?? 0) + (vector[i] ?? 0);
		}

		return new SlowVector(...out);
	}

	/**
	 * Create a copy of this vector.
	 * @returns A copy of this vector.
	 */
	public clone(): SlowVector {
		return new SlowVector(...this);
	}

	/**
	 * Copy the values of another vector into this one.
	 * @param vector - The vector to copy.
	 * @returns This vector.
	 */
	public copy(vector: VectorLike): this {
		if (!isSized(vector) || this.length !== vector.length) {
			throw new VectorSizeError();
		}

		for (let i = 0; i < vector.length; i++) {
			this[i] = vector[i] ?? 0;
		}

		return this;
	}

	/**
	 * Multiply this vector by another.
	 * @param vector - The other vector.
	 * @returns The product of the vectors.
	 */
	public multiply(vector: VectorLike): SlowVector {
		if (!isSized(vector) || this.length !== vector.length) {
			throw new VectorSizeError();
		}

		const out = [];
		for (let i = 0; i < this.length; i++) {
			out[i] = (this[i] ?? 0) * (vector[i] ?? 0);
		}

		return new SlowVector(...out);
	}

	/**
	 * Divide this vector by another.
	 * @param vector - The other vector.
	 * @returns The quotient of the vectors.
	 */
	public divide(vector: VectorLike): SlowVector {
		if (!isSized(vector) || this.length !== vector.length) {
			throw new VectorSizeError();
		}

		const out = [];
		for (let i = 0; i < this.length; i++) {
			out[i] = (this[i] ?? 0) / (vector[i] ?? 0);
		}

		return new SlowVector(...out);
	}

	/**
	 * Subtract another vector from this one.
	 * @param vector - The other vector.
	 * @returns The difference between the vectors.
	 */
	public subtract(vector: VectorLike): SlowVector {
		if (!isSized(vector) || this.length !== vector.length) {
			throw new VectorSizeError();
		}

		const out = [];
		for (let i = 0; i < this.length; i++) {
			out[i] = (this[i] ?? 0) - (vector[i] ?? 0);
		}

		return new SlowVector(...out);
	}

	/**
	 * Round up the components of this vector.
	 * @returns The rounded vector.
	 */
	public ceil(): SlowVector {
		const out = [];
		for (let i = 0; i < this.length; i++) {
			out[i] = Math.ceil(this[i] ?? 0);
		}

		return new SlowVector(...out);
	}

	/**
	 * Round down the components of this vector.
	 * @returns The rounded vector.
	 */
	public floor(): SlowVector {
		const out = [];
		for (let i = 0; i < this.length; i++) {
			out[i] = Math.floor(this[i] ?? 0);
		}

		return new SlowVector(...out);
	}

	/**
	 * Round the components of this vector.
	 * @returns The rounded vector.
	 */
	public round(): SlowVector {
		const out = [];
		for (let i = 0; i < this.length; i++) {
			out[i] = Math.round(this[i] ?? 0);
		}

		return new SlowVector(...out);
	}

	/**
	 * Return the minimum of this and another vector.
	 * @param vector - The other vector.
	 * @returns The minimum.
	 */
	public min(vector: VectorLike): SlowVector {
		if (!isSized(vector) || this.length !== vector.length) {
			throw new VectorSizeError();
		}

		const out = [];
		for (let i = 0; i < this.length; i++) {
			out[i] = Math.min(this[i] ?? 0, vector[i] ?? 0);
		}

		return new SlowVector(...out);
	}

	/**
	 * Return the maximum of this and another vector.
	 * @param vector - The other vector.
	 * @returns The maximum.
	 */
	public max(vector: VectorLike): SlowVector {
		if (!isSized(vector) || this.length !== vector.length) {
			throw new VectorSizeError();
		}

		const out = [];
		for (let i = 0; i < this.length; i++) {
			out[i] = Math.max(this[i] ?? 0, vector[i] ?? 0);
		}

		return new SlowVector(...out);
	}

	/**
	 * Raise each component of this vector to the given power.
	 * @param exponent - The exponent (power) to raise each component to.
	 * @returns The power (result of the exponentiation).
	 */
	public pow(exponent: number): SlowVector {
		const out = [];
		for (let i = 0; i < this.length; i++) {
			out[i] = (this[i] ?? 0) ** exponent;
		}

		return new SlowVector(...out);
	}

	/**
	 * Scale this vector by a scalar.
	 * @param scalar - The scalar.
	 * @returns The scaled vector.
	 */
	public scale(scalar: number): SlowVector {
		const out = [];
		for (let i = 0; i < this.length; i++) {
			out[i] = (this[i] ?? 0) * scalar;
		}

		return new SlowVector(...out);
	}

	/**
	 * Add another vector to this one after scaling the other by a scalar.
	 * @param vector - The other vector.
	 * @param scalar - The scalar.
	 * @returns The sum.
	 */
	public scaleAndAdd(vector: VectorLike, scalar: number): SlowVector {
		if (!isSized(vector)) {
			throw new VectorSizeError();
		}

		const out = [];
		for (let i = 0; i < vector.length; i++) {
			out[i] = (vector[i] ?? 0) * scalar;
		}

		return this.add(out);
	}

	/**
	 * Calculate the Euclidean distance between this vector and another.
	 * @param vector - The other vector.
	 * @returns The distance.
	 */
	public distance(vector: VectorLike): number {
		if (!isSized(vector) || this.length !== vector.length) {
			throw new VectorSizeError();
		}

		const temp = [];
		for (let i = 0; i < this.length; i++) {
			temp[i] = (vector[i] ?? 0) - (this[i] ?? 0);
		}

		return Math.hypot(...temp);
	}

	/**
	 * Calculate the squared Euclidean distance between this vector and another.
	 * @param vector - The other vector.
	 * @returns The squared distance.
	 */
	public squaredDistance(vector: VectorLike): number {
		if (!isSized(vector) || this.length !== vector.length) {
			throw new VectorSizeError();
		}

		let out = 0;
		for (let i = 0; i < this.length; i++) {
			out += ((vector[i] ?? 0) - (this[i] ?? 0)) ** 2;
		}

		return out;
	}

	/** Get the magnitude (length) of this vector. */
	public get magnitude(): number {
		return Math.hypot(...this);
	}

	/** Get the squared magnitude (length) of this vector. */
	public get squaredMagnitude(): number {
		let out = 0;
		for (let i = 0; i < this.length; i++) {
			out += (this[i] ?? 0) ** 2;
		}

		return out;
	}

	/**
	 * Negate this vector.
	 * @returns The negated vector.
	 */
	public negate(): SlowVector {
		return this.scale(-1);
	}

	/**
	 * Calculate the multiplicative inverse of the components of this vector.
	 * @returns The inverted vector.
	 */
	public invert(): SlowVector {
		const out = [];
		for (let i = 0; i < this.length; i++) {
			out[i] = 1 / (this[i] ?? 0);
		}

		return new SlowVector(...out);
	}

	/**
	 * Normalize this vector.
	 * @returns The normalized vector.
	 * @see {@link https://en.wikipedia.org/wiki/Unit_vector | Unit vector}
	 */
	public normalize(): SlowVector {
		return this.scale(1 / this.magnitude);
	}

	/**
	 * Calculate the dot product of this and another vector.
	 * @param vector - The other vector.
	 * @returns The dot product.
	 * @see {@link https://en.wikipedia.org/wiki/Dot_product | Dot product}
	 */
	public dot(vector: VectorLike): number {
		if (!isSized(vector) || this.length !== vector.length) {
			throw new VectorSizeError();
		}

		let out = 0;
		for (let i = 0; i < this.length; i++) {
			out += (this[i] ?? 0) * (vector[i] ?? 0);
		}

		return out;
	}

	/**
	 * Perform a linear interpolation between this and another vector.
	 * @param vector - The other vector.
	 * @param t - The interpolation amount (in `[0,1]`).
	 * @returns The interpolated vector.
	 */
	public lerp(vector: VectorLike, t: number): SlowVector {
		if (!isSized(vector) || this.length !== vector.length) {
			throw new VectorSizeError();
		}

		const out = [];
		for (let i = 0; i < this.length; i++) {
			const ti = this[i] ?? 0;
			out[i] = ti + t * ((vector[i] ?? 0) - ti);
		}

		return new SlowVector(...out);
	}

	/**
	 * Set this vector to a random value with the given magnitude.
	 * @param magnitude - The magnitude.
	 * @returns This vector.
	 */
	public random(magnitude: number): this {
		const temp = [];
		for (let i = 0; i < this.length; i++) {
			temp[i] = Math.random();
		}

		const randomized = new SlowVector(...temp).normalize().scale(magnitude);
		for (let i = 0; i < this.length; i++) {
			this[i] = randomized[i] ?? 0;
		}

		return this;
	}

	/**
	 * Set this to the zero vector.
	 * @returns This vector.
	 */
	public zero(): this {
		for (let i = 0; i < this.length; i++) {
			this[i] = 0;
		}

		return this;
	}
}
