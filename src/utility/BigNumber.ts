import greatestCommonDivisor from "../algorithms/greatestCommonDivisor.js";

/**
 * Types that can be converted to `bigint`s.
 * @public
 */
export type BigIntLike = Parameters<BigIntConstructor>[0];

/**
 * Types that can be converted to `BigNumber`s.
 * @public
 */
export type BigNumberLike = BigIntLike | BigNumber;

/**
 * A number with no maximum precise size.
 * @public
 */
export default class BigNumber {
	/** The dividend of this fraction. */
	public dividend: bigint;

	/** The divisor of this fraction. */
	public divisor: bigint;

	/**
	 * Create a number.
	 * @param dividend - The dividend of the number.
	 * @param divisor - The divisor of the number.
	 */
	public constructor(
		dividend: Readonly<BigNumberLike> = 0,
		divisor: Readonly<BigNumberLike> = 1
	) {
		if (divisor === 0) {
			throw new Error("Cannot divide by zero.");
		}

		if (BigNumber.is(dividend)) {
			this.dividend = dividend.dividend;
			this.divisor = dividend.divisor;
			this.divide(divisor);
			return;
		}

		this.dividend = BigInt(dividend);
		if (BigNumber.is(divisor)) {
			this.divisor = 1n;
			this.divide(divisor);
			return;
		}

		this.divisor = BigInt(divisor);
		this.simplify();
	}

	/**
	 * Utility function for narrowing `Readonly<BigNumberLike>` to `Readonly<BigNumber>` or `BigIntLike`, since `Readonly` breaks the type narrowing for TypeScript.
	 * @internal
	 */
	private static is(value: unknown): value is BigNumber | Readonly<BigNumber> {
		return value instanceof BigNumber;
	}

	/**
	 * Add a number to this number.
	 * @param n - The other number.
	 * @returns This number.
	 */
	public add(n: Readonly<BigNumberLike>): this {
		if (BigNumber.is(n)) {
			this.dividend = this.dividend * n.divisor + n.dividend * this.divisor;
			this.divisor *= n.divisor;
		} else {
			this.dividend += BigInt(n) * this.divisor;
		}

		this.simplify();
		return this;
	}

	/**
	 * Divide this number by a number.
	 * @param n - The other number.
	 * @returns This number.
	 */
	public divide(n: Readonly<BigNumberLike>): this {
		if (BigNumber.is(n)) {
			this.dividend *= n.divisor;
			this.divisor *= n.dividend;
		} else {
			this.divisor *= BigInt(n);
		}

		this.simplify();
		return this;
	}

	/**
	 * Multiply this number by a number.
	 * @param n - The other number.
	 * @returns This number.
	 */
	public multiply(n: Readonly<BigNumberLike>): this {
		if (BigNumber.is(n)) {
			this.dividend *= n.dividend;
			this.divisor *= n.divisor;
		} else {
			this.dividend *= BigInt(n);
		}

		this.simplify();
		return this;
	}

	/**
	 * Subtract a number from this number.
	 * @param n - The other number.
	 * @returns This number.
	 */
	public subtract(n: Readonly<BigNumberLike>): this {
		if (BigNumber.is(n)) {
			this.dividend = this.dividend * n.divisor - n.dividend * this.divisor;
			this.divisor *= n.divisor;
		} else {
			this.dividend -= BigInt(n) * this.divisor;
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
	public toString(): string {
		return `${this.dividend.toLocaleString()}/${this.divisor.toLocaleString()}`;
	}

	/**
	 * Simplify this fraction.
	 * @internal
	 */
	private simplify(): void {
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
}
