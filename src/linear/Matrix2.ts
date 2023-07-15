import SingularMatrixError from "@lakuna/umath/SingularMatrixError";
import epsilon from "@lakuna/umath/epsilon";
import type SquareMatrix from "@lakuna/umath/SquareMatrix";
import type { Vector2Like } from "@lakuna/umath/Vector2";

/** Numbers arranged into two columns and two rows. */
export type Matrix2Like = Matrix2 | [
	number, number,
	number, number
];

/**
 * Creates a transformation matrix that represents a rotation by the given angle around the Z-axis.
 * @param radians The angle in radians.
 * @param out The matrix to store the result in.
 * @returns The transformation matrix.
 */
export function fromRotation<T extends Matrix2Like>(radians: number, out: T): T {
	const s: number = Math.sin(radians);
	const c: number = Math.cos(radians);

	out[0] = c;
	out[1] = s;
	out[2] = -s;
	out[3] = c;
	return out;
}

/**
 * Creates a transformation matrix that represents a scaling by the given vector.
 * @param vector The scaling vector.
 * @param out The matrix to store the result in.
 * @returns The transformation matrix.
 */
export function fromScaling<T extends Matrix2Like>(vector: Vector2Like, out: T): T {
	out[0] = vector[0];
	out[1] = 0;
	out[2] = 0;
	out[3] = vector[1];
	return out;
}

/**
 * Creates a two-by-two matrix with the given values.
 * @param c0r0 The value in the first column and first row.
 * @param c0r1 The value in the first column and second row.
 * @param c1r0 The value in the second column and first row.
 * @param c1r1 The value in the second column and second row.
 * @param out The matrix to store the result in.
 * @returns The transformation matrix.
 */
export function fromValues<T extends Matrix2Like>(c0r0: number, c0r1: number, c1r0: number, c1r1: number, out: T): T {
	out[0] = c0r0;
	out[1] = c0r1;
	out[2] = c1r0;
	out[3] = c1r1;
	return out;
}

/**
 * Determines whether two matrices are roughly equivalent.
 * @param a The first matrix.
 * @param b The second matrix.
 * @returns Whether the matrices are equivalent.
 */
export function equals(a: Matrix2Like, b: Matrix2Like): boolean {
	const a0: number = a[0];
	const a1: number = a[1];
	const a2: number = a[2];
	const a3: number = a[3];

	const b0: number = b[0];
	const b1: number = b[1];
	const b2: number = b[2];
	const b3: number = b[3];

	return (Math.abs(a0 - b0) <= epsilon * Math.max(1, Math.abs(a0), Math.abs(b0))
		&& Math.abs(a1 - b1) <= epsilon * Math.max(1, Math.abs(a1), Math.abs(b1))
		&& Math.abs(a2 - b2) <= epsilon * Math.max(1, Math.abs(a2), Math.abs(b2))
		&& Math.abs(a3 - b3) <= epsilon * Math.max(1, Math.abs(a3), Math.abs(b3)));
}

/**
 * Determines whether two matrices are exactly equivalent.
 * @param a The first matrix.
 * @param b The second matrix.
 * @returns Whether the matrices are equivalent.
 */
export function exactEquals(a: Matrix2Like, b: Matrix2Like): boolean {
	return a[0] == b[0]
		&& a[1] == b[1]
		&& a[2] == b[2]
		&& a[3] == b[3];
}

/**
 * Adds two matrices.
 * @param a The augend.
 * @param b The addend.
 * @param out The matrix to store the result in.
 * @returns The sum.
 */
export function add<T extends Matrix2Like>(a: Matrix2Like, b: Matrix2Like, out: T): T {
	out[0] = a[0] + b[0];
	out[1] = a[1] + b[1];
	out[2] = a[2] + b[2];
	out[3] = a[3] + b[3];
	return out;
}

/**
 * Calculates the adjugate of a matrix.
 * @param matrix The matrix.
 * @param out The matrix to store the result in.
 * @returns The adjugate of the matrix.
 */
export function adjoint<T extends Matrix2Like>(matrix: Matrix2Like, out: T): T {
	const a0: number = matrix[0];
	out[0] = matrix[3];
	out[1] = -matrix[1];
	out[2] = -matrix[2];
	out[3] = a0;
	return out;
}

/**
 * Copies the values of one matrix to another.
 * @param matrix The matrix to copy.
 * @param out The matrix to store the result in.
 * @returns The copy matrix.
 */
export function copy<T extends Matrix2Like>(matrix: Matrix2Like, out: T): T {
	out[0] = matrix[0];
	out[1] = matrix[1];
	out[2] = matrix[2];
	out[3] = matrix[3];
	return out;
}

/**
 * Calculates the Frobenius normal of a matrix.
 * @param matrix The matrix.
 * @returns The Frobenius normal.
 */
export function frob(matrix: Matrix2Like): number {
	return Math.hypot(
		matrix[0] as number, matrix[1] as number,
		matrix[2] as number, matrix[3] as number
	);
}

/**
 * Multiplies one matrix by another.
 * @param a The multiplicand.
 * @param b The multiplier.
 * @param out The matrix to store the result in.
 * @returns The product.
 */
export function multiply<T extends Matrix2Like>(a: Matrix2Like, b: Matrix2Like, out: T): T {
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
 * Multiplies a matrix by a scalar value.
 * @param matrix The matrix.
 * @param scalar The scalar value.
 * @param out The matrix to store the result in.
 * @returns The product of the matrix and the scalar value.
 */
export function multiplyScalar<T extends Matrix2Like>(matrix: Matrix2Like, scalar: number, out: T): T {
	out[0] = matrix[0] * scalar;
	out[1] = matrix[1] * scalar;
	out[2] = matrix[2] * scalar;
	out[3] = matrix[3] * scalar;
	return out;
}

/**
 * Adds a matrix to another after multiplying the other by a scalar.
 * @param a The augend.
 * @param b The addend.
 * @param scalar The multiplier.
 * @param out The matrix to store the result in.
 * @returns The sum.
 */
export function multiplyScalarAndAdd<T extends Matrix2Like>(a: Matrix2Like, b: Matrix2Like, scalar: number, out: T): T {
	out[0] = a[0] + b[0] * scalar;
	out[1] = a[1] + b[1] * scalar;
	out[2] = a[2] + b[2] * scalar;
	out[3] = a[3] + b[3] * scalar;
	return out;
}

/**
 * Subtracts one matrix from another.
 * @param a The minuend.
 * @param b The subtrahend.
 * @param out The matrix to store the result in.
 * @returns The difference.
 */
export function subtract<T extends Matrix2Like>(a: Matrix2Like, b: Matrix2Like, out: T): T {
	out[0] = a[0] - b[0];
	out[1] = a[1] - b[1];
	out[2] = a[2] - b[2];
	out[3] = a[3] - b[3];
	return out;
}

/**
 * Transposes a matrix.
 * @param matrix The matrix.
 * @param out The matrix to store the result in.
 * @returns The transpose of the matrix.
 */
export function transpose<T extends Matrix2Like>(matrix: Matrix2Like, out: T): T {
	if (out == matrix) {
		const a1 = matrix[1];
		out[1] = matrix[2];
		out[2] = a1;
	} else {
		out[0] = matrix[0];
		out[1] = matrix[2];
		out[2] = matrix[1];
		out[3] = matrix[3];
	}
	return out;
}

/**
 * Calculates the determinant of a matrix.
 * @param matrix The matrix.
 * @returns The determinant.
 */
export function determinant(matrix: Matrix2Like): number {
	return (matrix[0] as number) * (matrix[3] as number)
		- (matrix[2] as number) * (matrix[1] as number);
}

/**
 * Resets a matrix to identity.
 * @param out The matrix to store the result in.
 * @returns The matrix.
 */
export function identity<T extends Matrix2Like>(out: T): T {
	out[0] = 1;
	out[1] = 0;
	out[2] = 0;
	out[3] = 1;
	return out;
}

/**
 * Inverts a matrix.
 * @param matrix The matrix.
 * @param out The matrix to store the result in.
 * @returns The inverted matrix.
 */
export function invert<T extends Matrix2Like>(matrix: Matrix2Like, out: T = new Matrix2() as T): T {
	const a0: number = matrix[0];
	const a1: number = matrix[1];
	const a2: number = matrix[2];
	const a3: number = matrix[3];
	
	let determinant: number = a0 * a3 - a2 * a1;
	if (!determinant) {
		throw new SingularMatrixError();
	}
	determinant = 1 / determinant;

	out[0] = a3 * determinant;
	out[1] = -a1 * determinant;
	out[2] = -a2 * determinant;
	out[3] = a0 * determinant;
	return out;
}

/**
 * Rotates a matrix by the given angle.
 * @param matrix The matrix.
 * @param radians The angle in radians.
 * @param out The matrix to store the result in.
 * @returns The rotated matrix.
 */
export function rotate<T extends Matrix2Like>(matrix: Matrix2Like, radians: number, out: T = new Matrix2() as T): T {
	const a0: number = matrix[0];
	const a1: number = matrix[1];
	const a2: number = matrix[2];
	const a3: number = matrix[3];

	const s: number = Math.sin(radians);
	const c: number = Math.cos(radians);

	out[0] = a0 * c + a2 * s;
	out[1] = a1 * c + a3 * s;
	out[2] = a0 * -s + a2 * c;
	out[3] = a1 * -s + a3 * c;
	return out;
}

/**
 * Scales a matrix by the given vector.
 * @param matrix The matrix.
 * @param vector The scaling vector.
 * @param out The matrix to store the result in.
 * @returns The scaled matrix.
 */
export function scale<T extends Matrix2Like>(matrix: Matrix2Like, vector: Vector2Like, out: T = new Matrix2() as T): T {
	const v0: number = vector[0];
	const v1: number = vector[1];

	out[0] = matrix[0] * v0;
	out[1] = matrix[1] * v0;
	out[2] = matrix[2] * v1;
	out[3] = matrix[3] * v1;
	return out;
}

/** A two-by-two matrix. */
export default class Matrix2 extends Float32Array implements SquareMatrix {
	/**
	 * Creates a transformation matrix that represents a rotation by the given angle around the Z-axis.
	 * @param radians The angle in radians.
	 * @returns The transformation matrix.
	 */
	public static fromRotation(radians: number): Matrix2;

	/**
	 * Creates a transformation matrix that represents a rotation by the given angle around the Z-axis.
	 * @param radians The angle in radians.
	 * @param out The matrix to store the result in.
	 * @returns The transformation matrix.
	 */
	public static fromRotation<T extends Matrix2Like>(radians: number, out: T): T;

	public static fromRotation<T extends Matrix2Like>(radians: number, out: T = new Matrix2() as T): T {
		return fromRotation(radians, out);
	}

	/**
	 * Creates a transformation matrix that represents a scaling by the given vector.
	 * @param vector The scaling vector.
	 * @returns The transformation matrix.
	 */
	public static fromScaling(vector: Vector2Like): Matrix2;

	/**
	 * Creates a transformation matrix that represents a scaling by the given vector.
	 * @param vector The scaling vector.
	 * @param out The matrix to store the result in.
	 * @returns The transformation matrix.
	 */
	public static fromScaling<T extends Matrix2Like>(vector: Vector2Like, out: T): T;

	public static fromScaling<T extends Matrix2Like>(vector: Vector2Like, out: T = new Matrix2() as T): T {
		return fromScaling(vector, out);
	}

	/**
	 * Creates a two-by-two matrix with the given values.
	 * @param c0r0 The value in the first column and first row.
	 * @param c0r1 The value in the first column and second row.
	 * @param c1r0 The value in the second column and first row.
	 * @param c1r1 The value in the second column and second row.
	 * @returns The transformation matrix.
	 */
	public static fromValues(c0r0: number, c0r1: number, c1r0: number, c1r1: number): Matrix2;

	/**
	 * Creates a two-by-two matrix with the given values.
	 * @param c0r0 The value in the first column and first row.
	 * @param c0r1 The value in the first column and second row.
	 * @param c1r0 The value in the second column and first row.
	 * @param c1r1 The value in the second column and second row.
	 * @param out The matrix to store the result in.
	 * @returns The transformation matrix.
	 */
	public static fromValues<T extends Matrix2Like>(c0r0: number, c0r1: number, c1r0: number, c1r1: number, out: T): T;

	public static fromValues<T extends Matrix2Like>(c0r0: number, c0r1: number, c1r0: number, c1r1: number, out: T = new Matrix2() as T): T {
		return fromValues(c0r0, c0r1, c1r0, c1r1, out);
	}

	/** Creates a two-by-two identity matrix. */
	public constructor() {
		super(4);

		this[0] =  1;
		this[3] = 1;

		this.width = 2;
		this.height = 2;
	}

	/** The number of columns in this matrix. */
	public readonly width: 2;

	/** The number of rows in this matrix. */
	public readonly height: 2;

	/**
	 * Determines whether this matrix is roughly equivalent to another.
	 * @param matrix The other matrix.
	 * @returns Whether the matrices are equivalent.
	 */
	public equals(matrix: Matrix2Like): boolean {
		return equals(this, matrix);
	}

	/**
	 * Determines whether this matrix is exactly equivalent to another.
	 * @param matrix The other matrix.
	 * @returns Whether the matrices are equivalent.
	 */
	public exactEquals(matrix: Matrix2Like): boolean {
		return exactEquals(this, matrix);
	}

	/**
	 * Adds another matrix to this one.
	 * @param matrix The other matrix.
	 * @returns The sum of the matrices.
	 */
	public add(matrix: Matrix2Like): Matrix2;

	/**
	 * Adds another matrix to this one.
	 * @param matrix The other matrix.
	 * @param out The matrix to store the result in.
	 * @returns The sum of the matrices.
	 */
	public add<T extends Matrix2Like>(matrix: Matrix2Like, out: T): T;

	public add<T extends Matrix2Like>(matrix: Matrix2Like, out: T = new Matrix2() as T): T {
		return add(this, matrix, out);
	}

	/**
	 * Calculates the adjugate of this matrix.
	 * @returns The adjugate of this matrix.
	 */
	public adjoint(): Matrix2;

	/**
	 * Calculates the adjugate of this matrix.
	 * @param out The matrix to store the result in.
	 * @returns The adjugate of this matrix.
	 */
	public adjoint<T extends Matrix2Like>(out: T): T;

	public adjoint<T extends Matrix2Like>(out: T = new Matrix2() as T): T {
		return adjoint(this, out);
	}

	/**
	 * Creates a copy of this matrix.
	 * @returns A copy of this matrix.
	 */
	public clone(): Matrix2 {
		const out: Matrix2 = new Matrix2();
		out[0] = this[0] as number;
		out[1] = this[1] as number;
		out[2] = this[2] as number;
		out[3] = this[3] as number;
		return out;
	}

	/**
	 * Copies the values of another matrix into this one.
	 * @param matrix The matrix to copy.
	 * @returns This matrix.
	 */
	public copy(matrix: Matrix2Like): this {
		return copy(matrix, this);
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
	public multiply(matrix: Matrix2Like): Matrix2;

	/**
	 * Multiplies this matrix by another.
	 * @param matrix The other matrix.
	 * @param out The matrix to store the result in.
	 * @returns The product of the matrices.
	 */
	public multiply<T extends Matrix2Like>(matrix: Matrix2Like, out: T): T;

	public multiply<T extends Matrix2Like>(matrix: Matrix2Like, out: T = new Matrix2() as T): T {
		return multiply(this, matrix, out);
	}

	/**
	 * Multiplies this matrix by a scalar value.
	 * @param scalar The scalar value.
	 * @returns The product of the matrix and the scalar value.
	 */
	public multiplyScalar(scalar: number): Matrix2;

	/**
	 * Multiplies this matrix by a scalar value.
	 * @param scalar The scalar value.
	 * @param out The matrix to store the result in.
	 * @returns The product of the matrix and the scalar value.
	 */
	public multiplyScalar<T extends Matrix2Like>(scalar: number, out: T): T;

	public multiplyScalar<T extends Matrix2Like>(scalar: number, out: T = new Matrix2() as T): T {
		return multiplyScalar(this, scalar, out);
	}

	/**
	 * Adds this matrix to another after multiplying the other by a scalar.
	 * @param matrix The other matrix.
	 * @param scalar The scalar.
	 * @returns The sum.
	 */
	public multiplyScalarAndAdd(matrix: Matrix2Like, scalar: number): Matrix2;

	/**
	 * Adds this matrix to another after multiplying the other by a scalar.
	 * @param matrix The other matrix.
	 * @param scalar The scalar.
	 * @param out The matrix to store the result in.
	 * @returns The sum.
	 */
	public multiplyScalarAndAdd<T extends Matrix2Like>(matrix: Matrix2Like, scalar: number, out: T): T;

	public multiplyScalarAndAdd<T extends Matrix2Like>(matrix: Matrix2Like, scalar: number, out: T = new Matrix2() as T): T {
		return multiplyScalarAndAdd(this, matrix, scalar, out);
	}

	/**
	 * Subtracts another matrix from this one.
	 * @param matrix The other matrix.
	 * @returns The difference between the matrices.
	 */
	public subtract(matrix: Matrix2Like): Matrix2;

	/**
	 * Subtracts another matrix from this one.
	 * @param matrix The other matrix.
	 * @param out The matrix to store the result in.
	 * @returns The difference between the matrices.
	 */
	public subtract<T extends Matrix2Like>(matrix: Matrix2Like, out: T): T;

	public subtract<T extends Matrix2Like>(matrix: Matrix2Like, out: T = new Matrix2() as T): T {
		return subtract(this, matrix, out);
	}

	/**
	 * Transposes this matrix.
	 * @returns The transpose of this matrix.
	 */
	public transpose(): Matrix2;

	/**
	 * Transposes this matrix.
	 * @param out The matrix to store the result in.
	 * @returns The transpose of this matrix.
	 */
	public transpose<T extends Matrix2Like>(out: T): T;

	public transpose<T extends Matrix2Like>(out: T = new Matrix2() as T): T {
		return transpose(this, out);
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
	 * @returns The inverted matrix.
	 */
	public invert(): Matrix2;

	/**
	 * Inverts this matrix.
	 * @param out The matrix to store the result in.
	 * @returns The inverted matrix.
	 */
	public invert<T extends Matrix2Like>(out: T): T;

	public invert<T extends Matrix2Like>(out: T = new Matrix2() as T): T {
		return invert(this, out);
	}

	/**
	 * Rotates this matrix by the given angle.
	 * @param radians The angle in radians.
	 * @returns The rotated matrix.
	 */
	public rotate(radians: number): Matrix2;

	/**
	 * Rotates this matrix by the given angle.
	 * @param radians The angle in radians.
	 * @param out The matrix to store the result in.
	 * @returns The rotated matrix.
	 */
	public rotate<T extends Matrix2Like>(radians: number, out: T): T;

	public rotate<T extends Matrix2Like>(radians: number, out: T = new Matrix2() as T): T {
		return rotate(this, radians, out);
	}

	/**
	 * Scales this matrix by the given vector.
	 * @param v The scaling vector.
	 * @returns The scaled matrix.
	 */
	public scale(v: Vector2Like): Matrix2;

	/**
	 * Scales this matrix by the given vector.
	 * @param vector The scaling vector.
	 * @param out The matrix to store the result in.
	 * @returns The scaled matrix.
	 */
	public scale<T extends Matrix2Like>(vector: Vector2Like, out: T): T;

	public scale<T extends Matrix2Like>(vector: Vector2Like, out: T = new Matrix2() as T): T {
		return scale(this, vector, out);
	}
}
