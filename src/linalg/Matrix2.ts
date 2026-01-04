import {
	add as vector4Add,
	copy as vector4Copy,
	exactEquals as vector4ExactEquals,
	fromValues as vector4FromValues,
	getMagnitude as vector4GetMagnitude,
	scale as vector4Scale,
	scaleAndAdd as vector4ScaleAndAdd,
	subtract as vector4Subtract
} from "./Vector4.js";
import type { MatrixLike } from "./Matrix.js";
import SingularMatrixError from "../utility/SingularMatrixError.js";
import type SquareMatrix from "./SquareMatrix.js";
import type { Vector2Like } from "./Vector2.js";
import approxRelative from "../algorithms/approxRelative.js";

/**
 * Numbers arranged into two columns and two rows.
 * @see {@link https://en.wikipedia.org/wiki/Matrix_(mathematics) | Matrix}
 * @public
 */
export interface Matrix2Like extends MatrixLike {
	/** The value in the first column and first row. */
	0: number;

	/** The value in the first column and second row. */
	1: number;

	/** The value in the second column and first row. */
	2: number;

	/** The value in the second column and second row. */
	3: number;
}

/**
 * Create a two-by-two matrix-like object.
 * @returns A two-by-two matrix-like object.
 * @public
 */
export const createMatrix2Like = (): Float32Array & Matrix2Like => {
	return new Float32Array(4) as Float32Array & Matrix2Like;
};

/**
 * Create a two-by-two matrix with the given values.
 * @param c0r0 - The value in the first column and first row.
 * @param c0r1 - The value in the first column and second row.
 * @param c1r0 - The value in the second column and first row.
 * @param c1r1 - The value in the second column and second row.
 * @param out - The matrix to store the result in.
 * @returns The matrix.
 * @public
 */
export const fromValues: <T extends Matrix2Like>(
	c0r0: number,
	c0r1: number,
	c1r0: number,
	c1r1: number,
	out: T
) => T = vector4FromValues;

/**
 * Create a transformation matrix that represents a rotation by the given angle around the Z-axis.
 * @param r - The angle in radians.
 * @param out - The matrix to store the result in.
 * @returns The transformation matrix.
 * @see {@link https://en.wikipedia.org/wiki/Rotation_matrix | Rotation matrix}
 * @public
 */
export const fromRotation = <T extends Matrix2Like>(r: number, out: T): T => {
	const s = Math.sin(r);
	const c = Math.cos(r);

	return fromValues(c, s, -s, c, out);
};

/**
 * Create a transformation matrix that represents a scaling by the given vector.
 * @param vector - The scaling vector.
 * @param out - The matrix to store the result in.
 * @returns The transformation matrix.
 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
 * @public
 */
export const fromScaling = <T extends Matrix2Like>(
	vector: Vector2Like,
	out: T
): T => fromValues(vector[0], 0, 0, vector[1], out);

/**
 * Determine whether or not two matrices are roughly equivalent.
 * @param a - The first matrix.
 * @param b - The second matrix.
 * @returns Whether or not the matrices are equivalent.
 * @public
 */
export const equals = (a: Matrix2Like, b: Matrix2Like): boolean =>
	approxRelative(a[0], b[0]) &&
	approxRelative(a[1], b[1]) &&
	approxRelative(a[2], b[2]) &&
	approxRelative(a[3], b[3]);

/**
 * Determine whether or not two matrices are exactly equivalent.
 * @param a - The first matrix.
 * @param b - The second matrix.
 * @returns Whether the matrices are equivalent.
 * @public
 */
export const exactEquals: (a: Matrix2Like, b: Matrix2Like) => boolean =
	vector4ExactEquals;

/**
 * Add two matrices.
 * @param a - The augend.
 * @param b - The addend.
 * @param out - The matrix to store the result in.
 * @returns The sum.
 * @see {@link https://en.wikipedia.org/wiki/Matrix_addition | Matrix addition}
 * @public
 */
export const add: <T extends Matrix2Like>(
	a: Matrix2Like,
	b: Matrix2Like,
	out: T
) => T = vector4Add;

/**
 * Calculate the adjugate of a matrix.
 * @param matrix - The matrix.
 * @param out - The matrix to store the result in.
 * @returns The adjugate of the matrix.
 * @see {@link https://en.wikipedia.org/wiki/Adjugate_matrix | Adjugate matrix}
 * @public
 */
export const adjoint = <T extends Matrix2Like>(
	matrix: Matrix2Like,
	out: T
): T => fromValues(matrix[3], -matrix[1], -matrix[2], matrix[0], out);

/**
 * Copy the values from one matrix into another.
 * @param matrix - The matrix to copy.
 * @param out - The matrix to store the result in.
 * @returns The copy matrix.
 * @public
 */
export const copy: <T extends Matrix2Like>(matrix: Matrix2Like, out: T) => T =
	vector4Copy;

/**
 * Calculate the Frobenius norm of a matrix.
 * @param matrix - The matrix.
 * @returns The Frobenius norm.
 * @see {@link https://en.wikipedia.org/wiki/Matrix_norm | Matrix norm}
 * @public
 */
export const frob: (matrix: Matrix2Like) => number = vector4GetMagnitude;

/**
 * Multiply one matrix by another.
 * @param a - The multiplier.
 * @param b - The multiplicand.
 * @param out - The matrix to store the result in.
 * @returns The product.
 * @see {@link https://en.wikipedia.org/wiki/Matrix_multiplication | Matrix multiplication}
 * @public
 */
export const multiply = <T extends Matrix2Like>(
	a: Matrix2Like,
	b: Matrix2Like,
	out: T
): T => {
	const a0 = a[0];
	const a1 = a[1];
	const a2 = a[2];
	const a3 = a[3];

	const b0 = b[0];
	const b1 = b[1];
	const b2 = b[2];
	const b3 = b[3];

	return fromValues(
		a0 * b0 + a2 * b1,
		a1 * b0 + a3 * b1,
		a0 * b2 + a2 * b3,
		a1 * b2 + a3 * b3,
		out
	);
};

/**
 * Multiply a matrix by a scalar value.
 * @param matrix - The multiplier.
 * @param scalar - The multiplicand.
 * @param out - The matrix to store the result in.
 * @returns The product.
 * @see {@link https://en.wikipedia.org/wiki/Matrix_multiplication | Matrix multiplication}
 * @public
 */
export const multiplyScalar: <T extends Matrix2Like>(
	matrix: Matrix2Like,
	scalar: number,
	out: T
) => T = vector4Scale;

/**
 * Add a matrix to another after multiplying the other by a scalar.
 * @param a - The augend.
 * @param b - The addend.
 * @param scalar - The multiplier.
 * @param out - The matrix to store the result in.
 * @returns The sum.
 * @see {@link https://en.wikipedia.org/wiki/Matrix_addition | Matrix addition}
 * @see {@link https://en.wikipedia.org/wiki/Matrix_multiplication | Matrix multiplication}
 * @public
 */
export const multiplyScalarAndAdd: <T extends Matrix2Like>(
	a: Matrix2Like,
	b: Matrix2Like,
	scalar: number,
	out: T
) => T = vector4ScaleAndAdd;

/**
 * Subtract one matrix from another.
 * @param a - The minuend.
 * @param b - The subtrahend.
 * @param out - The matrix to store the result in.
 * @returns The difference.
 * @see {@link https://en.wikipedia.org/wiki/Matrix_addition | Matrix addition}
 * @public
 */
export const subtract: <T extends Matrix2Like>(
	a: Matrix2Like,
	b: Matrix2Like,
	out: T
) => T = vector4Subtract;

/**
 * Transpose a matrix.
 * @param matrix - The matrix.
 * @param out - The matrix to store the result in.
 * @returns The transpose of the matrix.
 * @see {@link https://en.wikipedia.org/wiki/Transpose | Transpose}
 * @public
 */
export const transpose = <T extends Matrix2Like>(
	matrix: Matrix2Like,
	out: T
): T => {
	if (out === matrix) {
		const a1 = matrix[1];
		out[1] = matrix[2];
		out[2] = a1;
		return out;
	}

	return fromValues(matrix[0], matrix[2], matrix[1], matrix[3], out);
};

/**
 * Calculate the determinant of a matrix.
 * @param matrix - The matrix.
 * @returns The determinant.
 * @see {@link https://en.wikipedia.org/wiki/Determinant | Determinant}
 * @public
 */
export const determinant = (matrix: Matrix2Like): number =>
	matrix[0] * matrix[3] - matrix[2] * matrix[1];

/**
 * Reset a matrix to identity.
 * @param out - The matrix to store the result in.
 * @returns The matrix.
 * @see {@link https://en.wikipedia.org/wiki/Identity_matrix | Identity matrix}
 * @public
 */
export const identity = <T extends Matrix2Like>(out: T): T =>
	fromValues(1, 0, 0, 1, out);

/**
 * Invert a matrix.
 * @param matrix - The matrix.
 * @param out - The matrix to store the result in.
 * @returns The inverted matrix.
 * @see {@link https://en.wikipedia.org/wiki/Invertible_matrix | Invertible matrix}
 * @public
 */
export const invert = <T extends Matrix2Like>(
	matrix: Matrix2Like,
	out: T
): T => {
	const a0 = matrix[0];
	const a1 = matrix[1];
	const a2 = matrix[2];
	const a3 = matrix[3];

	let det = a0 * a3 - a2 * a1;
	if (!det) {
		throw new SingularMatrixError();
	}
	det = 1 / det;

	return fromValues(a3 * det, -a1 * det, -a2 * det, a0 * det, out);
};

/**
 * Rotate a matrix by the given angle.
 * @param matrix - The matrix.
 * @param r - The angle in radians.
 * @param out - The matrix to store the result in.
 * @returns The rotated matrix.
 * @see {@link https://en.wikipedia.org/wiki/Rotation_matrix | Rotation matrix}
 * @public
 */
export const rotate = <T extends Matrix2Like>(
	matrix: Matrix2Like,
	r: number,
	out: T
): T => {
	const a0 = matrix[0];
	const a1 = matrix[1];
	const a2 = matrix[2];
	const a3 = matrix[3];

	const s = Math.sin(r);
	const c = Math.cos(r);

	return fromValues(
		a0 * c + a2 * s,
		a1 * c + a3 * s,
		a0 * -s + a2 * c,
		a1 * -s + a3 * c,
		out
	);
};

/**
 * Scale a matrix by the given vector.
 * @param matrix - The matrix.
 * @param vector - The scaling vector.
 * @param out - The matrix to store the result in.
 * @returns The scaled matrix.
 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
 * @public
 */
export const scale = <T extends Matrix2Like>(
	matrix: Matrix2Like,
	vector: Vector2Like,
	out: T
): T => {
	const v0 = vector[0];
	const v1 = vector[1];

	return fromValues(
		matrix[0] * v0,
		matrix[1] * v0,
		matrix[2] * v1,
		matrix[3] * v1,
		out
	);
};

/**
 * A two-by-two matrix.
 * @see {@link https://en.wikipedia.org/wiki/Matrix_(mathematics) | Matrix}
 * @public
 */
export default class Matrix2
	extends Float32Array
	implements SquareMatrix, Matrix2Like
{
	/**
	 * Create a transformation matrix that represents a rotation by the given angle around the Z-axis.
	 * @param r - The angle in radians.
	 * @returns The transformation matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Rotation_matrix | Rotation matrix}
	 */
	public static fromRotation(r: number): Matrix2 {
		return fromRotation(r, new Matrix2());
	}

	/**
	 * Create a transformation matrix that represents a scaling by the given vector.
	 * @param vector - The scaling vector.
	 * @param out - The matrix to store the result in.
	 * @returns The transformation matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
	 */
	public static fromScaling(vector: Vector2Like): Matrix2 {
		return fromScaling(vector, new Matrix2());
	}

	/**
	 * Create a two-by-two matrix with the given values.
	 * @param c0r0 - The value in the first column and first row.
	 * @param c0r1 - The value in the first column and second row.
	 * @param c1r0 - The value in the second column and first row.
	 * @param c1r1 - The value in the second column and second row.
	 * @returns The matrix.
	 */
	public static fromValues(
		c0r0: number,
		c0r1: number,
		c1r0: number,
		c1r1: number
	): Matrix2 {
		return fromValues(c0r0, c0r1, c1r0, c1r1, new Matrix2());
	}

	/**
	 * Create a two-by-two identity matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Identity_matrix | Identity matrix}
	 */
	public constructor() {
		super(4);

		this[0] = 1;
		this[3] = 1;

		this.width = 2;
		this.height = 2;
	}

	/** The value in the first column and first row. */
	public 0: number;

	/** The value in the first column and second row. */
	public 1: number;

	/** The value in the second column and first row. */
	public 2: number;

	/** The value in the second column and second row. */
	public 3: number;

	/** The number of columns in this matrix. */
	public readonly width: 2;

	/** The number of rows in this matrix. */
	public readonly height: 2;

	/**
	 * Determine whether or not this matrix is roughly equivalent to another.
	 * @param matrix - The other matrix.
	 * @returns Whether the matrices are equivalent.
	 */
	public equals(matrix: Matrix2Like): boolean {
		return equals(this, matrix);
	}

	/**
	 * Determine whether or not this matrix is exactly equivalent to another.
	 * @param matrix - The other matrix.
	 * @returns Whether the matrices are equivalent.
	 */
	public exactEquals(matrix: Matrix2Like): boolean {
		return exactEquals(this, matrix);
	}

	/**
	 * Add another matrix to this one.
	 * @param matrix - The other matrix.
	 * @returns The sum of the matrices.
	 * @see {@link https://en.wikipedia.org/wiki/Matrix_addition | Matrix addition}
	 */
	public add(matrix: Matrix2Like): Matrix2 {
		return add(this, matrix, new Matrix2());
	}

	/**
	 * Calculate the adjugate of this matrix.
	 * @returns The adjugate of this matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Adjugate_matrix | Adjugate matrix}
	 */
	public adjoint(): Matrix2 {
		return adjoint(this, new Matrix2());
	}

	/**
	 * Copy the values from this matrix to another one.
	 * @returns The copy.
	 */
	public clone(): Matrix2 {
		return copy(this, new Matrix2());
	}

	/**
	 * Copy the values of another matrix into this one.
	 * @param matrix - The matrix to copy.
	 * @returns This matrix.
	 */
	public copy(matrix: Matrix2Like): this {
		return copy(matrix, this);
	}

	/**
	 * Get the Frobenius norm of this matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Matrix_norm | Matrix norm}
	 */
	public get frob(): number {
		return frob(this);
	}

	/**
	 * Multiply this matrix by another.
	 * @param matrix - The other matrix.
	 * @returns The product of the matrices.
	 * @see {@link https://en.wikipedia.org/wiki/Matrix_multiplication | Matrix multiplication}
	 * @public
	 */
	public multiply(matrix: Matrix2Like): Matrix2 {
		return multiply(this, matrix, new Matrix2());
	}

	/**
	 * Multiply this matrix by a scalar value.
	 * @param scalar - The scalar value.
	 * @returns The product of the matrix and the scalar value.
	 * @see {@link https://en.wikipedia.org/wiki/Matrix_multiplication | Matrix multiplication}
	 */
	public multiplyScalar(scalar: number): Matrix2 {
		return multiplyScalar(this, scalar, new Matrix2());
	}

	/**
	 * Add this matrix to another after multiplying the other by a scalar.
	 * @param matrix - The other matrix.
	 * @param scalar - The scalar.
	 * @returns The sum.
	 * @see {@link https://en.wikipedia.org/wiki/Matrix_addition | Matrix addition}
	 * @see {@link https://en.wikipedia.org/wiki/Matrix_multiplication | Matrix multiplication}
	 */
	public multiplyScalarAndAdd(matrix: Matrix2Like, scalar: number): Matrix2 {
		return multiplyScalarAndAdd(this, matrix, scalar, new Matrix2());
	}

	/**
	 * Subtract another matrix from this one.
	 * @param matrix - The other matrix.
	 * @returns The difference between the matrices.
	 * @see {@link https://en.wikipedia.org/wiki/Matrix_addition | Matrix addition}
	 */
	public subtract(matrix: Matrix2Like): Matrix2 {
		return subtract(this, matrix, new Matrix2());
	}

	/**
	 * Transpose this matrix.
	 * @returns The transpose of this matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Transpose | Transpose}
	 */
	public transpose(): Matrix2 {
		return transpose(this, new Matrix2());
	}

	/**
	 * Get the determinant of this matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Determinant | Determinant}
	 */
	public get determinant(): number {
		return determinant(this);
	}

	/**
	 * Reset this matrix to identity.
	 * @returns This matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Identity_matrix | Identity matrix}
	 */
	public identity(): this {
		return identity(this);
	}

	/**
	 * Invert this matrix.
	 * @returns The inverted matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Invertible_matrix | Invertible matrix}
	 */
	public invert(): Matrix2 {
		return invert(this, new Matrix2());
	}

	/**
	 * Rotate this matrix by the given angle.
	 * @param r - The angle in radians.
	 * @returns The rotated matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Rotation_matrix | Rotation matrix}
	 */
	public rotate(r: number): Matrix2 {
		return rotate(this, r, new Matrix2());
	}

	/**
	 * Scale this matrix by the given vector.
	 * @param vector - The scaling vector.
	 * @returns The scaled matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Transformation_matrix | Transformation matrix}
	 */
	public scale(vector: Vector2Like): Matrix2 {
		return scale(this, vector, new Matrix2());
	}
}
