import greatestCommonDivisor from "../algorithms/greatestCommonDivisor.js";

/** A number with no maximum precise size. */
export default class BigNumber {
	/**
	 * Create a number.
	 * @param dividend - The dividend of the number.
	 * @param divisor - The divisor of the number.
	 */
	public constructor(
		dividend: bigint | boolean | number | string = 0,
		divisor: bigint | boolean | number | string = 1
	) {
		if (divisor === 0) {
			throw new Error("Cannot divide by zero.");
		}

		this.dividend = BigInt(dividend);
		this.divisor = BigInt(divisor);
		this.simplify();
	}

	/** The dividend of this fraction. */
	public dividend: bigint;

	/** The divisor of this fraction. */
	public divisor: bigint;

	/**
	 * Simplify this fraction.
	 * @internal
	 */
	private simplify() {
		// Switch signs such that only the dividend can be negative.
		if (this.divisor < 0) {
			this.dividend = -this.dividend;
			this.divisor = -this.divisor;
		}

		// Divide both by their greatest common divisor.
		const gcd = greatestCommonDivisor(this.dividend, this.divisor);
		if (gcd > 1) {
			this.dividend /= gcd;
			this.divisor /= gcd;
		}
	}

	/**
	 * Add a number to this number.
	 * @param n - The other number.
	 * @returns This number.
	 */
	public add(n: bigint | boolean | number | string | BigNumber): this {
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
	 * Subtract a number from this number.
	 * @param n - The other number.
	 * @returns This number.
	 */
	public subtract(n: bigint | boolean | number | string | BigNumber): this {
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
	 * Multiply this number by a number.
	 * @param n - The other number.
	 * @returns This number.
	 */
	public multiply(n: bigint | boolean | number | string | BigNumber): this {
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
	 * Divide this number by a number.
	 * @param n - The other number.
	 * @returns This number.
	 */
	public divide(n: bigint | boolean | number | string | BigNumber): this {
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
	 * Convert this number to a regular `number`. Might result in loss of precision.
	 * @returns This number as a `number`.
	 */
	public toNumber(): number {
		return (
			Number(this.dividend / this.divisor) +
			Number(this.dividend % this.divisor) / Number(this.divisor)
		);
	}

	/**
	 * Convert this number to a string.
	 * @returns A string representation of this number.
	 */
	public toString() {
		return `${this.dividend.toLocaleString()}/${this.divisor.toLocaleString()}`;
	}
}
