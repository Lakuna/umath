import { matrixEpsilon, type SquareMatrix } from "./Matrix.js";
import type { Vector2Like } from "./Vector2.js";

/** Numbers arranged into two columns and two rows. */
export type Matrix2Like = Matrix2 | [
	number, number,
	number, number
];

/**
 * Creates a two-by-two matrix that is a copy of another.
 * @param a The matrix to copy.
 * @returns The new matrix.
 * @see [Source](https://glmatrix.net/)
 */
function clone(a: Matrix2Like): Matrix2 {
	const out: Matrix2 = new Matrix2();
	out[0] = a[0];
	out[1] = a[1];
	out[2] = a[2];
	out[3] = a[3];
	return out;
}

/**
 * Copies the values from one two-by-two matrix into another.
 * @param out The matrix to copy into.
 * @param a The matrix to copy.
 * @returns The matrix that was copied into.
 * @see [Source](https://glmatrix.net/)
 */
function copy<T extends Matrix2Like>(out: T, a: Matrix2Like): T {
	out[0] = a[0];
	out[1] = a[1];
	out[2] = a[2];
	out[3] = a[3];
	return out;
}

/**
 * Sets a two-by-two matrix to the identity.
 * @param out The matrix.
 * @returns The matrix.
 * @see [Source](https://glmatrix.net/)
 */
function identity<T extends Matrix2Like>(out: T): T {
	out[0] = 1;
	out[1] = 0;
	out[2] = 0;
	out[3] = 1;
	return out;
}

/**
 * Creates a two-by-two matrix from the given values.
 * @param m00 The value in the first column and first row.
 * @param m01 The value in the first column and second row.
 * @param m10 The value in the second column and first row.
 * @param m11 The value in the second column and second row.
 * @returns The new matrix.
 * @see [Source](https://glmatrix.net/)
 */
function fromValues(m00: number, m01: number, m10: number, m11: number): Matrix2 {
	const out: Matrix2 = new Matrix2();
	out[0] = m00;
	out[1] = m01;
	out[2] = m10;
	out[3] = m11;
	return out;
}

/**
 * Sets the values in a two-by-two matrix.
 * @param out The matrix.
 * @param m00 The value in the first column and first row.
 * @param m01 The value in the first column and second row.
 * @param m10 The value in the second column and first row.
 * @param m11 The value in the second column and second row.
 * @returns The matrix.
 * @see [Source](https://glmatrix.net/)
 */
function set<T extends Matrix2Like>(out: T, m00: number, m01: number, m10: number, m11: number): T {
	out[0] = m00;
	out[1] = m01;
	out[2] = m10;
	out[3] = m11;
	return out;
}

/**
 * Transposes a two-by-two matrix.
 * @param out The matrix to fill with the transpose.
 * @param a The matrix to transpose.
 * @returns The transposed matrix.
 * @see [Source](https://glmatrix.net/)
 */
function transpose<T extends Matrix2Like>(out: T, a: Matrix2Like): T {
	if (out === a) {
		const a1: number = a[1];
		out[1] = a[2];
		out[2] = a1;
		return out;
	}

	out[0] = a[0];
	out[1] = a[2];
	out[2] = a[1];
	out[3] = a[3];
	return out;
}

/**
 * Inverts a two-by-two matrix.
 * @param out The matrix to fill with the inverted matrix.
 * @param a The matrix to invert.
 * @returns The inverted matrix.
 * @see [Source](https://glmatrix.net/)
 */
function invert<T extends Matrix2Like>(out: T, a: Matrix2Like): T {
	const a0: number = a[0];
	const a1: number = a[1];
	const a2: number = a[2];
	const a3: number = a[3];

	// Calculate the determinant
	let det: number = a0 * a3 - a2 * a1;
	if (!det) {
		throw new Error("Cannot invert the matrix.");
	}
	det = 1 / det;

	out[0] = a3 * det;
	out[1] = -a1 * det;
	out[2] = -a2 * det;
	out[3] = a0 * det;
	return out;
}

/**
 * Calculates the adjugate of a two-by-two matrix.
 * @param out The matrix to fill with the adjugate.
 * @param a The matrix to calculate the adjugate of.
 * @returns The adjugate.
 * @see [Source](https://glmatrix.net/)
 */
function adjoint<T extends Matrix2Like>(out: T, a: Matrix2Like): T {
	const a0: number = a[0];
	out[0] = a[3];
	out[1] = -a[1];
	out[2] = -a[2];
	out[3] = a0;
	return out;
}

/**
 * Calculates the determinant of a two-by-two matrix.
 * @param a The matrix.
 * @returns The determinant.
 * @see [Source](https://glmatrix.net/)
 */
function determinant(a: Matrix2Like): number {
	return a[0] * a[3] - a[2] * a[1];
}

/**
 * Multiplies two two-by-two matrices.
 * @param out The matrix to fill with the product.
 * @param a The multiplier.
 * @param b The multiplicand.
 * @returns The product.
 * @see [Source](https://glmatrix.net/)
 */
function multiply<T extends Matrix2Like>(out: T, a: Matrix2Like, b: Matrix2Like): T {
	const a0: number = a[0];
	const a1: number = a[1];
	const a2: number = a[2];
	const a3: number = a[3];
	const b0: number = b[0];
	const b1: number = b[1];
	const b2: number = b[2];
	const b3: number = b[3];

	out[0] = a0 * b0 + a2 * b1;
	out[1] = a1 * b0 + a3 * b1;
	out[2] = a0 * b2 + a2 * b3;
	out[3] = a1 * b2 + a3 * b3;
	return out;
}

/**
 * Rotates a two-by-two matrix around the Z-axis.
 * @param out The matrix to fill with the rotated matrix.
 * @param a The matrix to rotate.
 * @param rad The angle to rotate by in radians.
 * @returns The rotated matrix.
 * @see [Source](https://glmatrix.net/)
 */
function rotate<T extends Matrix2Like>(out: T, a: Matrix2Like, rad: number): T {
	const a0: number = a[0];
	const a1: number = a[1];
	const a2: number = a[2];
	const a3: number = a[3];

	const s: number = Math.sin(rad);
	const c: number = Math.cos(rad);

	out[0] = a0 * c + a2 * s;
	out[1] = a1 * c + a3 * s;
	out[2] = a0 * -s + a2 * c;
	out[3] = a1 * -s + a3 * c;
	return out;
}

/**
 * Scales a two-by-two matrix.
 * @param out The matrix to fill with the scaled matrix.
 * @param a The matrix to scale.
 * @param v The vector to scale by.
 * @returns The scaled matrix.
 * @see [Source](https://glmatrix.net/)
 */
function scale<T extends Matrix2Like>(out: T, a: Matrix2Like, v: Vector2Like) {
	const a0: number = a[0];
	const a1: number = a[1];
	const a2: number = a[2];
	const a3: number = a[3];

	const v0: number = v[0];
	const v1: number = v[1];

	out[0] = a0 * v0;
	out[1] = a1 * v0;
	out[2] = a2 * v1;
	out[3] = a3 * v1;
	return out;
}

/**
 * Creates a two-by-two matrix from a rotation around the Z-axis.
 * @param out The matrix to fill with the rotation matrix.
 * @param rad The amount to rotate by in radians.
 * @returns The rotation matrix.
 * @see [Source](https://glmatrix.net/)
 */
function fromRotation<T extends Matrix2Like>(out: T, rad: number): T {
	const s: number = Math.sin(rad);
	const c: number = Math.cos(rad);

	out[0] = c;
	out[1] = s;
	out[2] = -s;
	out[3] = c;
	return out;
}

/**
 * Creates a two-by-two matrix from a scaling amount.
 * @param out The matrix to fill with the scaling matrix.
 * @param v The vector to scale by.
 * @returns The scaling matrix.
 * @see [Source](https://glmatrix.net/)
 */
function fromScaling<T extends Matrix2Like>(out: T, v: Vector2Like): T {
	out[0] = v[0];
	out[1] = 0;
	out[2] = 0;
	out[3] = v[1];
	return out;
}

/**
 * Calculates the Frobenius normal of a two-by-two matrix.
 * @param a The matrix.
 * @returns The Frobenius normal.
 * @see [Source](https://glmatrix.net/)
 */
function frob(a: Matrix2Like): number {
	return Math.hypot(a[0], a[1], a[2], a[3]);
}

/**
 * Adds two two-by-two matrices.
 * @param out The matrix to fill with the sum.
 * @param a The augend.
 * @param b The addend.
 * @returns The sum.
 * @see [Source](https://glmatrix.net/)
 */
function add<T extends Matrix2Like>(out: T, a: Matrix2Like, b: Matrix2Like): T {
	out[0] = a[0] + b[0];
	out[1] = a[1] + b[1];
	out[2] = a[2] + b[2];
	out[3] = a[3] + b[3];
	return out;
}

/**
 * Subtracts one two-by-two matrix from another.
 * @param out The matrix to fill with the difference.
 * @param a The minuend.
 * @param b The subtrahend.
 * @returns The difference.
 * @see [Source](https://glmatrix.net/)
 */
function subtract<T extends Matrix2Like>(out: T, a: Matrix2Like, b: Matrix2Like): T {
	out[0] = a[0] - b[0];
	out[1] = a[1] - b[1];
	out[2] = a[2] - b[2];
	out[3] = a[3] - b[3];
	return out;
}

/**
 * Determines whether two two-by-two matrices are exactly equivalent.
 * @param a The first matrix.
 * @param b The second matrix.
 * @returns Whether the matrices are exactly equivalent.
 * @see [Source](https://glmatrix.net/)
 */
function exactEquals(a: Matrix2Like, b: Matrix2Like): boolean {
	return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}

/**
 * Determines whether two two-by-two matrices are roughly equivalent.
 * @param a The first matrix.
 * @param b The second matrix.
 * @returns Whether the matrices are roughly equivalent.
 * @see [Source](https://glmatrix.net/)
 */
function equals(a: Matrix2Like, b: Matrix2Like): boolean {
	const a0: number = a[0];
	const a1: number = a[1];
	const a2: number = a[2];
	const a3: number = a[3];
	const b0: number = b[0];
	const b1: number = b[1];
	const b2: number = b[2];
	const b3: number = b[3];

	return Math.abs(a0 - b0) <= matrixEpsilon * Math.max(1, Math.abs(a0), Math.abs(b0))
		&& Math.abs(a1 - b1) <= matrixEpsilon * Math.max(1, Math.abs(a1), Math.abs(b1))
		&& Math.abs(a2 - b2) <= matrixEpsilon * Math.max(1, Math.abs(a2), Math.abs(b2))
		&& Math.abs(a3 - b3) <= matrixEpsilon * Math.max(1, Math.abs(a3), Math.abs(b3));
}

/**
 * Multiplies a two-by-two matrix by a scalar.
 * @param out The matrix to fill with the product.
 * @param a The multiplier.
 * @param b The multiplicand.
 * @returns The product.
 * @see [Source](https://glmatrix.net/)
 */
function multiplyScalar<T extends Matrix2Like>(out: T, a: Matrix2Like, b: number): T {
	out[0] = a[0] * b;
	out[1] = a[1] * b;
	out[2] = a[2] * b;
	out[3] = a[3] * b;
	return out;
}

/**
 * Adds two two-by-two matrices after multiplying the addend by a scalar.
 * @param out The matrix to fill with the sum.
 * @param a The augend.
 * @param b The addend.
 * @param scale The scalar.
 * @returns The sum.
 * @see [Source](https://glmatrix.net/)
 */
function multiplyScalarAndAdd<T extends Matrix2Like>(out: T, a: Matrix2Like, b: Matrix2Like, scale: number): T {
	out[0] = a[0] + b[0] * scale;
	out[1] = a[1] + b[1] * scale;
	out[2] = a[2] + b[2] * scale;
	out[3] = a[3] + b[3] * scale;
	return out;
}

/** A two-by-two matrix. */
export default class Matrix2 extends Float32Array implements SquareMatrix {
	/**
	 * Creates a two-by-two matrix.
	 * @param m00 The value in the first column and first row.
	 * @param m01 The value in the first column and second row.
	 * @param m10 The value in the second column and first row.
	 * @param m11 The value in the second column and second row.
	 */
	public static fromValues(m00: number, m01: number, m10: number, m11: number): Matrix2 {
		return fromValues(m00, m01, m10, m11);
	}

	/**
	 * Creates a matrix that rotates by the given amount around the Z-axis.
	 * @param radians The amount to rotate by in radians.
	 * @returns The matrix.
	 */
	public static fromRotation(radians: number): Matrix2 {
		return fromRotation(new Matrix2(), radians);
	}

	/**
	 * Creates a matrix that scales by the given amount.
	 * @param vector The vector to scale by.
	 * @returns The matrix.
	 */
	public static fromScaling(vector: Vector2Like): Matrix2 {
		return fromScaling(new Matrix2(), vector);
	}

	/** Creates a two-by-two identity matrix. */
	public constructor() {
		super(4);
		this[0] = 1;
		this[3] = 1;
		this.width = 2;
		this.height = 2;
	}

	/** The number of columns in this matrix. */
	public readonly width: number;

	/** The number of rows in this matrix. */
	public readonly height: number;

	/**
	 * Gets the value at the given position in this matrix.
	 * @param row The row of the value.
	 * @param column The column of the value.
	 * @returns The value at the specified position.
	 */
	public get(row: number, column: number): number | undefined {
		return this[column * this.height + row];
	}

	/**
	 * Sets the value at the given position in this matrix.
	 * @param row The row of the value.
	 * @param column The column of the value.
	 * @param value The value.
	 */
	public put(row: number, column: number, value: number): void {
		this[column * this.height + row] = value;
	}

	/**
	 * Determines whether this matrix is roughly equivalent to another.
	 * @param matrix The other matrix.
	 * @returns Whether the matrices are roughly equivalent.
	 */
	public equals(matrix: Matrix2Like): boolean {
		return equals(this, matrix);
	}

	/**
	 * Determines whether this matrix is exactly equivalent to another.
	 * @param matrix The other matrix.
	 * @returns Whether the matrices are exactly equivalent.
	 */
	public exactEquals(matrix: Matrix2Like): boolean {
		return exactEquals(this, matrix);
	}

	/**
	 * Adds two matrices of the same size.
	 * @param matrix The other matrix.
	 * @returns The sum of the matrices.
	 */
	public add(matrix: Matrix2Like): this {
		return add(this, this, matrix);
	}

	/**
	 * Calculates the adjugate of this matrix.
	 * @returns The adjugate of this matrix.
	 */
	public adjoint(): this {
		return adjoint(this, this);
	}

	/**
	 * Creates a copy of this matrix.
	 * @returns A copy of this matrix.
	 */
	public clone(): Matrix2 {
		return clone(this);
	}

	/**
	 * Copies the values of another matrix into this one.
	 * @param matrix The matrix to copy.
	 * @returns This matrix.
	 */
	public copy(matrix: Matrix2Like): this {
		return copy(this, matrix);
	}

	/** The Frobenius normal of this matrix. */
	public get frob(): number {
		return frob(this);
	}

	/**
	 * Multiplies this matrix by another.
	 * @param matrix The other matrix.
	 * @returns The product of the matrices.
	 */
	public multiply(matrix: Matrix2Like): this {
		return multiply(this, this, matrix);
	}

	/**
	 * Multiplies this matrix by a scalar value.
	 * @param scalar The scalar value.
	 * @returns The product of the matrix and the scalar value.
	 */
	public multiplyScalar(scalar: number): this {
		return multiplyScalar(this, this, scalar);
	}

	/**
	 * Adds this matrix to another after multiplying the other by a scalar.
	 * @param matrix The other matrix.
	 * @param scalar The scalar.
	 * @returns The sum.
	 */
	public multiplyScalarAndAdd(matrix: Matrix2Like, scalar: number): this {
		return multiplyScalarAndAdd(this, this, matrix, scalar);
	}

	/**
	 * Subtracts another matrix from this one.
	 * @param matrix The other matrix.
	 * @returns The difference between the matrices.
	 */
	public subtract(matrix: Matrix2Like): this {
		return subtract(this, this, matrix);
	}

	/**
	 * Transposes this matrix.
	 * @returns The transpose of this matrix.
	 */
	public transpose(): this {
		return transpose(this, this);
	}

	/**
	 * Creates a matrix by removing the specified row and column from this matrix.
	 * @param row The row to remove.
	 * @param col The column to remove.
	 * @returns A submatrix.
	 */
	public submatrix(): never {
		throw new Error("Cannot get a submatrix of a two-by-two matrix.");
	}

	/** The determinant of this matrix. */
	public get determinant(): number {
		return determinant(this);
	}

	/**
	 * Resets this matrix to identity.
	 * @returns This matrix.
	 */
	public identity(): this {
		return identity(this);
	}

	/**
	 * Inverts this matrix.
	 * @returns This matrix.
	 */
	public invert(): this {
		return invert(this, this);
	}

	/**
	 * Sets the values in this matrix.
	 * @param m00 The value in the first column and first row.
	 * @param m01 The value in the first column and second row.
	 * @param m10 The value in the second column and first row.
	 * @param m11 The value in the second column and second row.
	 * @returns This matrix.
	 */
	public fromValues(m00: number, m01: number, m10: number, m11: number): this {
		return set(this, m00, m01, m10, m11);
	}

	/**
	 * Rotates this matrix around the Z-axis.
	 * @param radians The amount to rotate by in radians.
	 * @returns This matrix.
	 */
	public rotate(radians: number): this {
		return rotate(this, this, radians);
	}

	/**
	 * Scales this matrix.
	 * @param vector The vector to scale by.
	 * @returns This matrix.
	 */
	public scale(vector: Vector2Like): this {
		return scale(this, this, vector);
	}

	/**
	 * Sets this matrix to rotate by the given amount around the Z-axis.
	 * @param radians The amount to rotate by in radians.
	 * @returns This matrix.
	 */
	public fromRotation(radians: number): this {
		return fromRotation(this, radians);
	}

	/**
	 * Sets this matrix to scale by the given amount.
	 * @param vector The vector to scale by.
	 * @returns This matrix.
	 */
	public fromScaling(vector: Vector2Like): this {
		return fromScaling(this, vector);
	}
}
