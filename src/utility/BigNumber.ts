import greatestCommonDivisor from "#algorithms/greatestCommonDivisor";
import type { IntegerRepresentation } from "#types/IntegerRepresentation";

/** A number with no maximum precise size. */
export default class BigNumber {
	/**
	 * Creates a number.
	 * @param source The number.
	 */
	public constructor(source?: IntegerRepresentation);

	/**
	 * Creates a number from a fraction.
	 * @param dividend The dividend of the fraction.
	 * @param divisor The divisor of the fraction.
	 */
	public constructor(dividend?: IntegerRepresentation, divisor?: IntegerRepresentation);

	public constructor(dividend: IntegerRepresentation = 0, divisor: IntegerRepresentation = 1) {
		this.dividend = BigInt(dividend);
		this.divisor = BigInt(divisor);
		if (!this.divisor) { throw new Error("Cannot divide by zero."); }
		this.simplify();
	}

	/** The dividend of this fraction. */
	public dividend: bigint;

	/** The divisor of this fraction. */
	public divisor: bigint;

	/** Simplifies this fraction. */
	private simplify(): void {
		// Switches signs such that only the dividend can be negative.
		if (this.divisor < 0) {
			this.dividend = -this.dividend;
			this.divisor = -this.divisor;
		}

		// Divide both by their greatest common divisor.
		const gcd: bigint = greatestCommonDivisor(this.dividend, this.divisor);
		if (gcd > 1) {
			this.dividend /= gcd;
			this.divisor /= gcd;
		}
	}

	/**
	 * Adds a number to this number.
	 * @param n The other number.
	 * @returns This number.
	 */
	public add(n: IntegerRepresentation | BigNumber): this {
		if (n instanceof BigNumber) {
			this.dividend = this.dividend * n.divisor + n.dividend * this.divisor;
			this.divisor *= n.divisor;
		} else {
			this.dividend += BigInt(n) * this.divisor;
		}

		this.simplify();
		return this;
	}

	/**
	 * Subtracts a number from this number.
	 * @param n The other number.
	 * @returns This number.
	 */
	public subtract(n: IntegerRepresentation | BigNumber): this {
		if (n instanceof BigNumber) {
			this.dividend = this.dividend * n.divisor - n.dividend * this.divisor;
			this.divisor *= n.divisor;
		} else {
			this.dividend -= BigInt(n) * this.divisor;
		}

		this.simplify();
		return this;
	}

	/**
	 * Multiplies this number by a number.
	 * @param n The other number.
	 * @returns This number.
	 */
	public multiply(n: IntegerRepresentation | BigNumber): this {
		if (n instanceof BigNumber) {
			this.dividend *= n.dividend;
			this.divisor *= n.divisor;
		} else {
			this.dividend *= BigInt(n);
		}

		this.simplify();
		return this;
	}

	/**
	 * Divides this number by a number.
	 * @param n The other number.
	 * @returns This number.
	 */
	public divide(n: IntegerRepresentation | BigNumber): this {
		if (n instanceof BigNumber) {
			this.dividend *= n.divisor;
			this.divisor *= n.dividend;
		} else {
			this.divisor *= BigInt(n);
		}

		this.simplify();
		return this;
	}

	/**
	 * Converts this number to a regular `number`. Might result in loss of precision.
	 * @returns This number as a `number`.
	 */
	public toNumber(): number {
		return Number(this.dividend / this.divisor) + (Number(this.dividend % this.divisor) / Number(this.divisor));
	}

	/**
	 * Converts this number to a string.
	 * @returns A string representation of this number.
	 */
	public toString(): string {
		return `${this.dividend}/${this.divisor}`;
	}
}
