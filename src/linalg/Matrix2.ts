import type { MatrixLike } from "./Matrix.js";
import SingularMatrixError from "../utility/SingularMatrixError.js";
import type SquareMatrix from "./SquareMatrix.js";
import type { Vector2Like } from "./Vector2.js";
import epsilon from "../utility/epsilon.js";

/**
 * Numbers arranged into two columns and two rows.
 * @see [Matrix](https://en.wikipedia.org/wiki/Matrix_(mathematics))
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
 * Create a 2x2 matrix-like object.
 * @returns A 2x2 matrix-like object.
 */
export const createMatrix2Like = () => {
	return new Float32Array(4) as Float32Array & Matrix2Like;
};

/**
 * Create a transformation matrix that represents a rotation by the given angle around the Z-axis.
 * @param r - The angle in radians.
 * @param out - The matrix to store the result in.
 * @returns The transformation matrix.
 * @see [Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix)
 */
export const fromRotation = <T extends Matrix2Like>(r: number, out: T): T => {
	const s = Math.sin(r);
	const c = Math.cos(r);

	out[0] = c;
	out[1] = s;
	out[2] = -s;
	out[3] = c;
	return out;
};

/**
 * Create a transformation matrix that represents a scaling by the given vector.
 * @param v - The scaling vector.
 * @param out - The matrix to store the result in.
 * @returns The transformation matrix.
 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
 */
export const fromScaling = <T extends Matrix2Like>(
	vector: Vector2Like,
	out: T
): T => {
	out[0] = vector[0];
	out[1] = 0;
	out[2] = 0;
	out[3] = vector[1];
	return out;
};

/**
 * Create a two-by-two matrix with the given values.
 * @param c0r0 - The value in the first column and first row.
 * @param c0r1 - The value in the first column and second row.
 * @param c1r0 - The value in the second column and first row.
 * @param c1r1 - The value in the second column and second row.
 * @param out - The matrix to store the result in.
 * @returns The matrix.
 */
export const fromValues = <T extends Matrix2Like>(
	c0r0: number,
	c0r1: number,
	c1r0: number,
	c1r1: number,
	out: T
): T => {
	out[0] = c0r0;
	out[1] = c0r1;
	out[2] = c1r0;
	out[3] = c1r1;
	return out;
};

/**
 * Determine whether or not two matrices are roughly equivalent.
 * @param a - The first matrix.
 * @param b - The second matrix.
 * @returns Whether or not the matrices are equivalent.
 */
export const equals = (a: Matrix2Like, b: Matrix2Like): boolean => {
	const a0 = a[0];
	const a1 = a[1];
	const a2 = a[2];
	const a3 = a[3];

	const b0 = b[0];
	const b1 = b[1];
	const b2 = b[2];
	const b3 = b[3];

	return (
		Math.abs(a0 - b0) <= epsilon * Math.max(1, Math.abs(a0), Math.abs(b0)) &&
		Math.abs(a1 - b1) <= epsilon * Math.max(1, Math.abs(a1), Math.abs(b1)) &&
		Math.abs(a2 - b2) <= epsilon * Math.max(1, Math.abs(a2), Math.abs(b2)) &&
		Math.abs(a3 - b3) <= epsilon * Math.max(1, Math.abs(a3), Math.abs(b3))
	);
};

/**
 * Determine whether or not two matrices are exactly equivalent.
 * @param a - The first matrix.
 * @param b - The second matrix.
 * @returns Whether the matrices are equivalent.
 */
export const exactEquals = (a: Matrix2Like, b: Matrix2Like): boolean => {
	return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
};

/**
 * Add two matrices.
 * @param a - The augend.
 * @param b - The addend.
 * @param out - The matrix to store the result in.
 * @returns The sum.
 * @see [Matrix addition](https://en.wikipedia.org/wiki/Matrix_addition)
 */
export const add = <T extends Matrix2Like>(
	a: Matrix2Like,
	b: Matrix2Like,
	out: T
): T => {
	out[0] = a[0] + b[0];
	out[1] = a[1] + b[1];
	out[2] = a[2] + b[2];
	out[3] = a[3] + b[3];
	return out;
};

/**
 * Calculate the adjugate of a matrix.
 * @param matrix - The matrix.
 * @param out - The matrix to store the result in.
 * @returns The adjugate of the matrix.
 * @see [Adjugate matrix](https://en.wikipedia.org/wiki/Adjugate_matrix)
 */
export const adjoint = <T extends Matrix2Like>(
	matrix: Matrix2Like,
	out: T
): T => {
	const a0 = matrix[0];
	out[0] = matrix[3];
	out[1] = -matrix[1];
	out[2] = -matrix[2];
	out[3] = a0;
	return out;
};

/**
 * Copy the values from one matrix into another.
 * @param matrix - The matrix to copy.
 * @param out - The matrix to store the result in.
 * @returns The copy matrix.
 */
export const copy = <T extends Matrix2Like>(matrix: Matrix2Like, out: T): T => {
	out[0] = matrix[0];
	out[1] = matrix[1];
	out[2] = matrix[2];
	out[3] = matrix[3];
	return out;
};

/**
 * Calculate the Frobenius norm of a matrix.
 * @param matrix - The matrix.
 * @returns The Frobenius norm.
 * @see [Matrix norm](https://en.wikipedia.org/wiki/Matrix_norm)
 */
export const frob = (matrix: Matrix2Like): number => {
	const a0 = matrix[0];
	const a1 = matrix[1];
	const a2 = matrix[2];
	const a3 = matrix[3];
	return Math.sqrt(a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3);
};

/**
 * Multiply one matrix by another.
 * @param a - The multiplicand.
 * @param b - The multiplier.
 * @param out - The matrix to store the result in.
 * @returns The product.
 * @see [Matrix multiplication](https://en.wikipedia.org/wiki/Matrix_multiplication)
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

	out[0] = a0 * b0 + a2 * b1;
	out[1] = a1 * b0 + a3 * b1;
	out[2] = a0 * b2 + a2 * b3;
	out[3] = a1 * b2 + a3 * b3;
	return out;
};

/**
 * Multiply a matrix by a scalar value.
 * @param matrix - The multiplicand.
 * @param scalar - The multiplier.
 * @param out - The matrix to store the result in.
 * @returns The product.
 * @see [Matrix multiplication](https://en.wikipedia.org/wiki/Matrix_multiplication)
 */
export const multiplyScalar = <T extends Matrix2Like>(
	matrix: Matrix2Like,
	scalar: number,
	out: T
): T => {
	out[0] = matrix[0] * scalar;
	out[1] = matrix[1] * scalar;
	out[2] = matrix[2] * scalar;
	out[3] = matrix[3] * scalar;
	return out;
};

/**
 * Add a matrix to another after multiplying the other by a scalar.
 * @param a - The augend.
 * @param b - The addend.
 * @param scalar - The multiplier.
 * @param out - The matrix to store the result in.
 * @returns The sum.
 * @see [Matrix addition](https://en.wikipedia.org/wiki/Matrix_addition)
 * @see [Matrix multiplication](https://en.wikipedia.org/wiki/Matrix_multiplication)
 */
export const multiplyScalarAndAdd = <T extends Matrix2Like>(
	a: Matrix2Like,
	b: Matrix2Like,
	scalar: number,
	out: T
): T => {
	out[0] = a[0] + b[0] * scalar;
	out[1] = a[1] + b[1] * scalar;
	out[2] = a[2] + b[2] * scalar;
	out[3] = a[3] + b[3] * scalar;
	return out;
};

/**
 * Subtract one matrix from another.
 * @param a - The minuend.
 * @param b - The subtrahend.
 * @param out - The matrix to store the result in.
 * @returns The difference.
 * @see [Matrix addition](https://en.wikipedia.org/wiki/Matrix_addition)
 */
export const subtract = <T extends Matrix2Like>(
	a: Matrix2Like,
	b: Matrix2Like,
	out: T
): T => {
	out[0] = a[0] - b[0];
	out[1] = a[1] - b[1];
	out[2] = a[2] - b[2];
	out[3] = a[3] - b[3];
	return out;
};

/**
 * Transpose a matrix.
 * @param matrix - The matrix.
 * @param out - The matrix to store the result in.
 * @returns The transpose of the matrix.
 * @see [Transpose](https://en.wikipedia.org/wiki/Transpose)
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

	out[0] = matrix[0];
	out[1] = matrix[2];
	out[2] = matrix[1];
	out[3] = matrix[3];
	return out;
};

/**
 * Calculate the determinant of a matrix.
 * @param matrix-  The matrix.
 * @returns The determinant.
 * @see [Determinant](https://en.wikipedia.org/wiki/Determinant)
 */
export const determinant = (matrix: Matrix2Like): number => {
	return matrix[0] * matrix[3] - matrix[2] * matrix[1];
};

/**
 * Reset a matrix to identity.
 * @param out - The matrix to store the result in.
 * @returns The matrix.
 * @see [Identity matrix](https://en.wikipedia.org/wiki/Identity_matrix)
 */
export const identity = <T extends Matrix2Like>(out: T): T => {
	out[0] = 1;
	out[1] = 0;
	out[2] = 0;
	out[3] = 1;
	return out;
};

/**
 * Invert a matrix.
 * @param matrix - The matrix.
 * @param out - The matrix to store the result in.
 * @returns The inverted matrix.
 * @see [Invertible matrix](https://en.wikipedia.org/wiki/Invertible_matrix)
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

	out[0] = a3 * det;
	out[1] = -a1 * det;
	out[2] = -a2 * det;
	out[3] = a0 * det;
	return out;
};

/**
 * Rotate a matrix by the given angle.
 * @param matrix - The matrix.
 * @param r - The angle in radians.
 * @param out - The matrix to store the result in.
 * @returns The rotated matrix.
 * @see [Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix)
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

	out[0] = a0 * c + a2 * s;
	out[1] = a1 * c + a3 * s;
	out[2] = a0 * -s + a2 * c;
	out[3] = a1 * -s + a3 * c;
	return out;
};

/**
 * Scale a matrix by the given vector.
 * @param matrix - The matrix.
 * @param vector - The scaling vector.
 * @param out - The matrix to store the result in.
 * @returns The scaled matrix.
 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
 */
export const scale = <T extends Matrix2Like>(
	matrix: Matrix2Like,
	vector: Vector2Like,
	out: T
): T => {
	const v0 = vector[0];
	const v1 = vector[1];

	out[0] = matrix[0] * v0;
	out[1] = matrix[1] * v0;
	out[2] = matrix[2] * v1;
	out[3] = matrix[3] * v1;
	return out;
};

/**
 * A two-by-two matrix.
 * @see [Matrix](https://en.wikipedia.org/wiki/Matrix_(mathematics))
 */
export default class Matrix2
	extends Float32Array
	implements SquareMatrix, Matrix2Like
{
	/**
	 * Create a transformation matrix that represents a rotation by the given angle around the Z-axis.
	 * @param r - The angle in radians.
	 * @param out - The matrix to store the result in.
	 * @returns The transformation matrix.
	 * @see [Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix)
	 */
	public static fromRotation<T extends Matrix2Like = Matrix2>(
		r: number,
		out: T = new Matrix2() as Matrix2 & T
	): T {
		return fromRotation(r, out);
	}

	/**
	 * Create a transformation matrix that represents a scaling by the given vector.
	 * @param vector - The scaling vector.
	 * @param out - The matrix to store the result in.
	 * @returns The transformation matrix.
	 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
	 */
	public static fromScaling<T extends Matrix2Like = Matrix2>(
		vector: Vector2Like,
		out: T = new Matrix2() as Matrix2 & T
	): T {
		return fromScaling(vector, out);
	}

	/**
	 * Create a two-by-two matrix with the given values.
	 * @param c0r0 - The value in the first column and first row.
	 * @param c0r1 - The value in the first column and second row.
	 * @param c1r0 - The value in the second column and first row.
	 * @param c1r1 - The value in the second column and second row.
	 * @param out - The matrix to store the result in.
	 * @returns The matrix.
	 */
	public static fromValues<T extends Matrix2Like = Matrix2>(
		c0r0: number,
		c0r1: number,
		c1r0: number,
		c1r1: number,
		out: T = new Matrix2() as Matrix2 & T
	): T {
		return fromValues(c0r0, c0r1, c1r0, c1r1, out);
	}

	/**
	 * Create a two-by-two identity matrix.
	 * @see [Identity matrix](https://en.wikipedia.org/wiki/Identity_matrix)
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
	 * @param out - The matrix to store the result in.
	 * @returns The sum of the matrices.
	 * @see [Matrix addition](https://en.wikipedia.org/wiki/Matrix_addition)
	 */
	public add<T extends Matrix2Like = Matrix2>(
		matrix: Matrix2Like,
		out: T = new Matrix2() as Matrix2 & T
	): T {
		return add(this, matrix, out);
	}

	/**
	 * Calculate the adjugate of this matrix.
	 * @param out - The matrix to store the result in.
	 * @returns The adjugate of this matrix.
	 * @see [Adjugate matrix](https://en.wikipedia.org/wiki/Adjugate_matrix)
	 */
	public adjoint<T extends Matrix2Like = Matrix2>(
		out: T = new Matrix2() as Matrix2 & T
	): T {
		return adjoint(this, out);
	}

	/**
	 * Copy the values from this matrix to another one.
	 * @param out - The matrix to store the result in.
	 * @returns The copy.
	 */
	public clone<T extends Matrix2Like = Matrix2>(
		out: T = new Matrix2() as Matrix2 & T
	): T {
		return copy(this, out);
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
	 * @see [Matrix norm](https://en.wikipedia.org/wiki/Matrix_norm)
	 */
	public get frob(): number {
		return frob(this);
	}

	/**
	 * Multiply this matrix by another.
	 * @param matrix - The other matrix.
	 * @param out - The matrix to store the result in.
	 * @returns The product of the matrices.
	 * @see [Matrix multiplication](https://en.wikipedia.org/wiki/Matrix_multiplication)
	 */
	public multiply<T extends Matrix2Like = Matrix2>(
		matrix: Matrix2Like,
		out: T = new Matrix2() as Matrix2 & T
	): T {
		return multiply(this, matrix, out);
	}

	/**
	 * Multiply this matrix by a scalar value.
	 * @param scalar - The scalar value.
	 * @param out - The matrix to store the result in.
	 * @returns The product of the matrix and the scalar value.
	 * @see [Matrix multiplication](https://en.wikipedia.org/wiki/Matrix_multiplication)
	 */
	public multiplyScalar<T extends Matrix2Like = Matrix2>(
		scalar: number,
		out: T = new Matrix2() as Matrix2 & T
	): T {
		return multiplyScalar(this, scalar, out);
	}

	/**
	 * Add this matrix to another after multiplying the other by a scalar.
	 * @param matrix - The other matrix.
	 * @param scalar - The scalar.
	 * @param out - The matrix to store the result in.
	 * @returns The sum.
	 * @see [Matrix addition](https://en.wikipedia.org/wiki/Matrix_addition)
	 * @see [Matrix multiplication](https://en.wikipedia.org/wiki/Matrix_multiplication)
	 */
	public multiplyScalarAndAdd<T extends Matrix2Like = Matrix2>(
		matrix: Matrix2Like,
		scalar: number,
		out: T = new Matrix2() as Matrix2 & T
	): T {
		return multiplyScalarAndAdd(this, matrix, scalar, out);
	}

	/**
	 * Subtract another matrix from this one.
	 * @param matrix - The other matrix.
	 * @param out - The matrix to store the result in.
	 * @returns The difference between the matrices.
	 * @see [Matrix addition](https://en.wikipedia.org/wiki/Matrix_addition)
	 */
	public subtract<T extends Matrix2Like = Matrix2>(
		matrix: Matrix2Like,
		out: T = new Matrix2() as Matrix2 & T
	): T {
		return subtract(this, matrix, out);
	}

	/**
	 * Transpose this matrix.
	 * @param out - The matrix to store the result in.
	 * @returns The transpose of this matrix.
	 * @see [Transpose](https://en.wikipedia.org/wiki/Transpose)
	 */
	public transpose<T extends Matrix2Like = Matrix2>(
		out: T = new Matrix2() as Matrix2 & T
	): T {
		return transpose(this, out);
	}

	/**
	 * Get the determinant of this matrix.
	 * @see [Determinant](https://en.wikipedia.org/wiki/Determinant)
	 */
	public get determinant(): number {
		return determinant(this);
	}

	/**
	 * Reset this matrix to identity.
	 * @returns This matrix.
	 * @see [Identity matrix](https://en.wikipedia.org/wiki/Identity_matrix)
	 */
	public identity(): this {
		return identity(this);
	}

	/**
	 * Invert this matrix.
	 * @param out - The matrix to store the result in.
	 * @returns The inverted matrix.
	 * @see [Invertible matrix](https://en.wikipedia.org/wiki/Invertible_matrix)
	 */
	public invert<T extends Matrix2Like = Matrix2>(
		out: T = new Matrix2() as Matrix2 & T
	): T {
		return invert(this, out);
	}

	/**
	 * Rotate this matrix by the given angle.
	 * @param r - The angle in radians.
	 * @param out - The matrix to store the result in.
	 * @returns The rotated matrix.
	 * @see [Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix)
	 */
	public rotate<T extends Matrix2Like = Matrix2>(
		r: number,
		out: T = new Matrix2() as Matrix2 & T
	): T {
		return rotate(this, r, out);
	}

	/**
	 * Scale this matrix by the given vector.
	 * @param vector - The scaling vector.
	 * @param out - The matrix to store the result in.
	 * @returns The scaled matrix.
	 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
	 */
	public scale<T extends Matrix2Like = Matrix2>(
		vector: Vector2Like,
		out: T = new Matrix2() as Matrix2 & T
	): T {
		return scale(this, vector, out);
	}
}
