import SingularMatrixError from "@lakuna/umath/SingularMatrixError";
import epsilon from "@lakuna/umath/epsilon";
import type { Matrix4Like } from "@lakuna/umath/Matrix4";
import type { QuaternionLike } from "@lakuna/umath/Quaternion";
import type SquareMatrix from "@lakuna/umath/SquareMatrix";
import type { Vector2Like } from "@lakuna/umath/Vector2";

/** Numbers arranged into three columns and three rows. */
export type Matrix3Like = Matrix3 | [
	number, number, number,
	number, number, number,
	number, number, number
];

/** A three-by-three matrix. */
export default class Matrix3 extends Float32Array implements SquareMatrix {
	/**
	 * Creates a transformation matrix that represents a rotation by the given angle around the Z-axis.
	 * @param radians The angle in radians.
	 * @returns The transformation matrix.
	 */
	public static fromRotation(radians: number): Matrix3;

	/**
	 * Creates a transformation matrix that represents a rotation by the given angle around the Z-axis.
	 * @param radians The angle in radians.
	 * @param out The matrix to store the result in.
	 * @returns The transformation matrix.
	 */
	public static fromRotation<T extends Matrix3Like>(radians: number, out: T): T;

	public static fromRotation<T extends Matrix3Like>(radians: number, out: T = new Matrix3() as T): T {
		const s: number = Math.sin(radians);
		const c: number = Math.cos(radians);

		out[0] = c;
		out[1] = s;
		out[2] = 0;
		out[3] = -s;
		out[4] = c;
		out[5] = 0;
		out[6] = 0;
		out[7] = 0;
		out[8] = 1;
		return out;
	}

	/**
	 * Creates a transformation matrix that represents a scaling by the given vector.
	 * @param vector The scaling vector.
	 * @returns The transformation matrix.
	 */
	public static fromScaling(vector: Vector2Like): Matrix3;

	/**
	 * Creates a transformation matrix that represents a scaling by the given vector.
	 * @param vector The scaling vector.
	 * @param out The matrix to store the result in.
	 * @returns The transformation matrix.
	 */
	public static fromScaling<T extends Matrix3Like>(vector: Vector2Like, out: T): T;

	public static fromScaling<T extends Matrix3Like>(vector: Vector2Like, out: T = new Matrix3() as T): T {
		out[0] = vector[0];
		out[1] = 0;
		out[2] = 0;
		out[3] = 0;
		out[4] = vector[1];
		out[5] = 0;
		out[6] = 0;
		out[7] = 0;
		out[8] = 1;
		return out;
	}

	/**
	 * Creates a transformation matrix that represents a translation by the given vector.
	 * @param vector The translation vector.
	 * @returns The transformation matrix.
	 */
	public static fromTranslation(vector: Vector2Like): Matrix3;

	/**
	 * Creates a transformation matrix that represents a translation by the given vector.
	 * @param vector The translation vector.
	 * @param out The matrix to store the result in.
	 * @returns The transformation matrix.
	 */
	public static fromTranslation<T extends Matrix3Like>(vector: Vector2Like, out: T): T;

	public static fromTranslation<T extends Matrix3Like>(vector: Vector2Like, out: T = new Matrix3() as T): T {
		out[0] = 1;
		out[1] = 0;
		out[2] = 0;
		out[3] = 0;
		out[4] = 1;
		out[5] = 0;
		out[6] = vector[0];
		out[7] = vector[1];
		out[8] = 1;
		return out;
	}

	/**
	 * Creates a transformation matrix that represents a rotation by the given quaternion.
	 * @param quaternion The quaternion.
	 * @returns The transformation matrix.
	 */
	public static fromQuaternion(quaternion: QuaternionLike): Matrix3;

	/**
	 * Creates a transformation matrix that represents a rotation by the given quaternion.
	 * @param quaternion The quaternion.
	 * @param out The matrix to store the result in.
	 * @returns The transformation matrix.
	 */
	public static fromQuaternion<T extends Matrix3Like>(quaternion: QuaternionLike, out: T): T;

	public static fromQuaternion<T extends Matrix3Like>(quaternion: QuaternionLike, out: T = new Matrix3() as T): T {
		const x: number = quaternion[0];
		const y: number = quaternion[1];
		const z: number = quaternion[2];
		const w: number = quaternion[3];

		const x2: number = x + x;
		const y2: number = y + y;
		const z2: number = z + z;
		const xx: number = x * x2;
		const yx: number = y * x2;
		const yy: number = y * y2;
		const zx: number = z * x2;
		const zy: number = z * y2;
		const zz: number = z * z2;
		const wx: number = w * x2;
		const wy: number = w * y2;
		const wz: number = w * z2;

		out[0] = 1 - yy - zz;
		out[3] = yx - wz;
		out[6] = zx + wy;
		out[1] = yx + wz;
		out[4] = 1 - xx - zz;
		out[7] = zy - wx;
		out[2] = zx - wy;
		out[5] = zy + wx;
		out[8] = 1 - xx - yy;
		return out;
	}

	/**
	 * Calculates a three-by-three normal (inverse transpose) matrix from a four-by-four matrix.
	 * @param matrix The four-by-four matrix.
	 * @returns The normal matrix.
	 */
	public static normalFromMatrix4(matrix: Matrix4Like): Matrix3;

	/**
	 * Calculates a three-by-three normal (inverse transpose) matrix from a four-by-four matrix.
	 * @param matrix The four-by-four matrix.
	 * @param out The matrix to store the result in.
	 * @returns The normal matrix.
	 */
	public static normalFromMatrix4<T extends Matrix3Like>(matrix: Matrix4Like, out: T): T;

	public static normalFromMatrix4<T extends Matrix3Like>(matrix: Matrix4Like, out: T = new Matrix3() as T): T {
		const a00: number = matrix[0];
		const a01: number = matrix[1];
		const a02: number = matrix[2];
		const a03: number = matrix[3];
		const a10: number = matrix[4];
		const a11: number = matrix[5];
		const a12: number = matrix[6];
		const a13: number = matrix[7];
		const a20: number = matrix[8];
		const a21: number = matrix[9];
		const a22: number = matrix[10];
		const a23: number = matrix[11];
		const a30: number = matrix[12];
		const a31: number = matrix[13];
		const a32: number = matrix[14];
		const a33: number = matrix[15];

		const b00: number = a00 * a11 - a01 * a10;
		const b01: number = a00 * a12 - a02 * a10;
		const b02: number = a00 * a13 - a03 * a10;
		const b03: number = a01 * a12 - a02 * a11;
		const b04: number = a01 * a13 - a03 * a11;
		const b05: number = a02 * a13 - a03 * a12;
		const b06: number = a20 * a31 - a21 * a30;
		const b07: number = a20 * a32 - a22 * a30;
		const b08: number = a20 * a33 - a23 * a30;
		const b09: number = a21 * a32 - a22 * a31;
		const b10: number = a21 * a33 - a23 * a31;
		const b11: number = a22 * a33 - a23 * a32;
		
		let determinant: number = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
		if (!determinant) {
			throw new SingularMatrixError();
		}
		determinant = 1 / determinant;

		out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * determinant;
		out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * determinant;
		out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * determinant;
		out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * determinant;
		out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * determinant;
		out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * determinant;
		out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * determinant;
		out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * determinant;
		out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * determinant;
		return out;
	}

	/**
	 * Generates a two-dimensional projection matrix with the given bounds.
	 * @param width The width of the projection.
	 * @param height The height of the projection.
	 * @returns The projection matrix.
	 */
	public static projection(width: number, height: number): Matrix3;

	/**
	 * Generates a two-dimensional projection matrix with the given bounds.
	 * @param width The width of the projection.
	 * @param height The height of the projection.
	 * @param out The matrix to store the result in.
	 * @returns The projection matrix.
	 */
	public static projection<T extends Matrix3Like>(width: number, height: number, out: T): T;

	public static projection<T extends Matrix3Like>(width: number, height: number, out: T = new Matrix3() as T): T {
		out[0] = 2 / width;
		out[1] = 0;
		out[2] = 0;
		out[3] = 0;
		out[4] = -2 / height;
		out[5] = 0;
		out[6] = -1;
		out[7] = 1;
		out[8] = 1;
		return out;
	}

	/**
	 * Creates a three-by-three matrix from the upper-left corner of a four-by-four matrix.
	 * @param matrix The four-by-four matrix.
	 * @returns The three-by-three matrix.
	 */
	public static fromMatrix4(matrix: Matrix4Like): Matrix3;

	/**
	 * Creates a three-by-three matrix from the upper-left corner of a four-by-four matrix.
	 * @param matrix The four-by-four matrix.
	 * @param out The matrix to store the result in.
	 * @returns The three-by-three matrix.
	 */
	public static fromMatrix4<T extends Matrix3Like>(matrix: Matrix4Like, out: T): T;

	public static fromMatrix4<T extends Matrix3Like>(matrix: Matrix4Like, out: T = new Matrix3() as T): T {
		out[0] = matrix[0];
		out[1] = matrix[1];
		out[2] = matrix[2];
		out[3] = matrix[4];
		out[4] = matrix[5];
		out[5] = matrix[6];
		out[6] = matrix[8];
		out[7] = matrix[9];
		out[8] = matrix[10];
		return out;
	}

	/**
	 * Creates a two-by-two matrix with the given values.
	 * @param c0r0 The value in the first column and first row.
	 * @param c0r1 The value in the first column and second row.
	 * @param c0r2 The value in the first column and third row.
	 * @param c1r0 The value in the second column and first row.
	 * @param c1r1 The value in the second column and second row.
	 * @param c1r2 The value in the second column and third row.
	 * @param c2r0 The value in the third column and first row.
	 * @param c2r1 The value in the third column and second row.
	 * @param c2r2 The value in the third column and third row.
	 * @returns The transformation matrix.
	 */
	public static fromValues(c0r0: number, c0r1: number, c0r2: number, c1r0: number, c1r1: number, c1r2: number, c2r0: number, c2r1: number, c2r2: number): Matrix3;

	/**
	 * Creates a two-by-two matrix with the given values.
	 * @param c0r0 The value in the first column and first row.
	 * @param c0r1 The value in the first column and second row.
	 * @param c0r2 The value in the first column and third row.
	 * @param c1r0 The value in the second column and first row.
	 * @param c1r1 The value in the second column and second row.
	 * @param c1r2 The value in the second column and third row.
	 * @param c2r0 The value in the third column and first row.
	 * @param c2r1 The value in the third column and second row.
	 * @param c2r2 The value in the third column and third row.
	 * @param out The matrix to store the result in.
	 * @returns The transformation matrix.
	 */
	public static fromValues<T extends Matrix3Like>(c0r0: number, c0r1: number, c0r2: number, c1r0: number, c1r1: number, c1r2: number, c2r0: number, c2r1: number, c2r2: number, out: T): T;

	public static fromValues<T extends Matrix3Like>(c0r0: number, c0r1: number, c0r2: number, c1r0: number, c1r1: number, c1r2: number, c2r0: number, c2r1: number, c2r2: number, out: T = new Matrix3() as T): T {
		out[0] = c0r0;
		out[1] = c0r1;
		out[2] = c0r2;
		out[3] = c1r0;
		out[4] = c1r1;
		out[5] = c1r2;
		out[6] = c2r0;
		out[7] = c2r1;
		out[8] = c2r2;
		return out;
	}
	
	/** Creates a three-by-three identity matrix. */
	public constructor() {
		super(9);

		this[0] = 1;
		this[4] = 1;
		this[8] = 1;

		this.width = 3;
		this.height = 3;
	}

	/** The number of columns in this matrix. */
	public readonly width: 3;

	/** The number of rows in this matrix. */
	public readonly height: 3;

	/**
	 * Gets the value at the given position in this matrix.
	 * @param row The row of the value.
	 * @param col The column of the value.
	 * @returns The value at the specified position.
	 */
	public get(row: number, col: number): number | undefined {
		return this[col * this.height + row];
	}

	/**
	 * Sets the value at the given position in this matrix.
	 * @param row The row of the value.
	 * @param col The column of the value.
	 * @param val The value.
	 */
	public put(row: number, col: number, val: number): void {
		this[col * this.height + row] = val;
	}

	/**
	 * Determines whether this matrix is roughly equivalent to another.
	 * @param matrix The other matrix.
	 * @returns Whether the matrices are equivalent.
	 */
	public equals(matrix: Matrix3Like): boolean {
		const a0: number = this[0] as number;
		const a1: number = this[1] as number;
		const a2: number = this[2] as number;
		const a3: number = this[3] as number;
		const a4: number = this[4] as number;
		const a5: number = this[5] as number;
		const a6: number = this[6] as number;
		const a7: number = this[7] as number;
		const a8: number = this[8] as number;

		const b0: number = matrix[0];
		const b1: number = matrix[1];
		const b2: number = matrix[2];
		const b3: number = matrix[3];
		const b4: number = matrix[4];
		const b5: number = matrix[5];
		const b6: number = matrix[6];
		const b7: number = matrix[7];
		const b8: number = matrix[8];

		return (Math.abs(a0 - b0) <= epsilon * Math.max(1, Math.abs(a0), Math.abs(b0))
			&& Math.abs(a1 - b1) <= epsilon * Math.max(1, Math.abs(a1), Math.abs(b1))
			&& Math.abs(a2 - b2) <= epsilon * Math.max(1, Math.abs(a2), Math.abs(b2))
			&& Math.abs(a3 - b3) <= epsilon * Math.max(1, Math.abs(a3), Math.abs(b3))
			&& Math.abs(a4 - b4) <= epsilon * Math.max(1, Math.abs(a4), Math.abs(b4))
			&& Math.abs(a5 - b5) <= epsilon * Math.max(1, Math.abs(a5), Math.abs(b5))
			&& Math.abs(a6 - b6) <= epsilon * Math.max(1, Math.abs(a6), Math.abs(b6))
			&& Math.abs(a7 - b7) <= epsilon * Math.max(1, Math.abs(a7), Math.abs(b7))
			&& Math.abs(a8 - b8) <= epsilon * Math.max(1, Math.abs(a8), Math.abs(b8)));
	}

	/**
	 * Determines whether this matrix is exactly equivalent to another.
	 * @param matrix The other matrix.
	 * @returns Whether the matrices are equivalent.
	 */
	public exactEquals(matrix: Matrix3Like): boolean {
		return this[0] == matrix[0]
			&& this[1] == matrix[1]
			&& this[2] == matrix[2]
			&& this[3] == matrix[3]
			&& this[4] == matrix[4]
			&& this[5] == matrix[5]
			&& this[6] == matrix[6]
			&& this[7] == matrix[7]
			&& this[8] == matrix[8];
	}

	/**
	 * Adds two matrices of the same size.
	 * @param matrix The other matrix.
	 * @returns The sum of the matrices.
	 */
	public add(matrix: Matrix3Like): Matrix3;

	/**
	 * Adds two matrices of the same size.
	 * @param matrix The other matrix.
	 * @param out The matrix to store the result in.
	 * @returns The sum of the matrices.
	 */
	public add<T extends Matrix3Like>(matrix: Matrix3Like, out: T): T;

	public add<T extends Matrix3Like>(matrix: Matrix3Like, out: T = new Matrix3() as T): T {
		out[0] = (this[0] as number) + matrix[0];
		out[1] = (this[1] as number) + matrix[1];
		out[2] = (this[2] as number) + matrix[2];
		out[3] = (this[3] as number) + matrix[3];
		out[4] = (this[4] as number) + matrix[4];
		out[5] = (this[5] as number) + matrix[5];
		out[6] = (this[6] as number) + matrix[6];
		out[7] = (this[7] as number) + matrix[7];
		out[8] = (this[8] as number) + matrix[8];
		return out;
	}

	/**
	 * Calculates the adjugate of this matrix.
	 * @returns The adjugate of this matrix.
	 */
	public adjoint(): Matrix3;

	/**
	 * Calculates the adjugate of this matrix.
	 * @param out The matrix to store the result in.
	 * @returns The adjugate of this matrix.
	 */
	public adjoint<T extends Matrix3Like>(out: T): T;

	public adjoint<T extends Matrix3Like>(out: T = new Matrix3() as T): T {
		const a00: number = this[0] as number;
		const a01: number = this[1] as number;
		const a02: number = this[2] as number;
		const a10: number = this[3] as number;
		const a11: number = this[4] as number;
		const a12: number = this[5] as number;
		const a20: number = this[6] as number;
		const a21: number = this[7] as number;
		const a22: number = this[8] as number;

		out[0] = a11 * a22 - a12 * a21;
		out[1] = a02 * a21 - a01 * a22;
		out[2] = a01 * a12 - a02 * a11;
		out[3] = a12 * a20 - a10 * a22;
		out[4] = a00 * a22 - a02 * a20;
		out[5] = a02 * a10 - a00 * a12;
		out[6] = a10 * a21 - a11 * a20;
		out[7] = a01 * a20 - a00 * a21;
		out[8] = a00 * a11 - a01 * a10;
		return out;
	}

	/**
	 * Creates a copy of this matrix.
	 * @returns A copy of this matrix.
	 */
	public clone(): Matrix3 {
		const out: Matrix3 = new Matrix3();
		out[0] = this[0] as number;
		out[1] = this[1] as number;
		out[2] = this[2] as number;
		out[3] = this[3] as number;
		out[4] = this[4] as number;
		out[5] = this[5] as number;
		out[6] = this[6] as number;
		out[7] = this[7] as number;
		out[8] = this[8] as number;
		return out;
	}

	/**
	 * Copies the values of another matrix into this one.
	 * @param matrix The matrix to copy.
	 * @returns This matrix.
	 */
	public copy(matrix: Matrix3Like): this {
		this[0] = matrix[0];
		this[1] = matrix[1];
		this[2] = matrix[2];
		this[3] = matrix[3];
		this[4] = matrix[4];
		this[5] = matrix[5];
		this[6] = matrix[6];
		this[7] = matrix[7];
		this[8] = matrix[8];
		return this;
	}

	/** The Frobenius normal of this matrix. */
	public get frob(): number {
		return Math.hypot(
			this[0] as number, this[1] as number, this[2] as number,
			this[3] as number, this[4] as number, this[5] as number,
			this[6] as number, this[7] as number, this[8] as number
		);
	}

	/**
	 * Multiplies this matrix by another.
	 * @param matrix The other matrix.
	 * @returns The product of the matrices.
	 */
	public multiply(matrix: Matrix3Like): Matrix3;

	/**
	 * Multiplies this matrix by another.
	 * @param matrix The other matrix.
	 * @param out The matrix to store the result in.
	 * @returns The product of the matrices.
	 */
	public multiply<T extends Matrix3Like>(matrix: Matrix3Like, out: T): T;

	public multiply<T extends Matrix3Like>(matrix: Matrix3Like, out: T = new Matrix3() as T): T {
		const a00: number = this[0] as number;
		const a01: number = this[1] as number;
		const a02: number = this[2] as number;
		const a10: number = this[3] as number;
		const a11: number = this[4] as number;
		const a12: number = this[5] as number;
		const a20: number = this[6] as number;
		const a21: number = this[7] as number;
		const a22: number = this[8] as number;

		const b00: number = matrix[0];
		const b01: number = matrix[1];
		const b02: number = matrix[2];
		const b10: number = matrix[3];
		const b11: number = matrix[4];
		const b12: number = matrix[5];
		const b20: number = matrix[6];
		const b21: number = matrix[7];
		const b22: number = matrix[8];

		out[0] = b00 * a00 + b01 * a10 + b02 * a20;
		out[1] = b00 * a01 + b01 * a11 + b02 * a21;
		out[2] = b00 * a02 + b01 * a12 + b02 * a22;
		out[3] = b10 * a00 + b11 * a10 + b12 * a20;
		out[4] = b10 * a01 + b11 * a11 + b12 * a21;
		out[5] = b10 * a02 + b11 * a12 + b12 * a22;
		out[6] = b20 * a00 + b21 * a10 + b22 * a20;
		out[7] = b20 * a01 + b21 * a11 + b22 * a21;
		out[8] = b20 * a02 + b21 * a12 + b22 * a22;
		return out;
	}

	/**
	 * Multiplies this matrix by a scalar value.
	 * @param scalar The scalar value.
	 * @returns The product of the matrix and the scalar value.
	 */
	public multiplyScalar(scalar: number): Matrix3;

	/**
	 * Multiplies this matrix by a scalar value.
	 * @param scalar The scalar value.
	 * @param out The matrix to store the result in.
	 * @returns The product of the matrix and the scalar value.
	 */
	public multiplyScalar<T extends Matrix3Like>(scalar: number, out: T): T;

	public multiplyScalar<T extends Matrix3Like>(scalar: number, out: T = new Matrix3() as T): T {
		out[0] = (this[0] as number) * scalar;
		out[1] = (this[1] as number) * scalar;
		out[2] = (this[2] as number) * scalar;
		out[3] = (this[3] as number) * scalar;
		out[4] = (this[4] as number) * scalar;
		out[5] = (this[5] as number) * scalar;
		out[6] = (this[6] as number) * scalar;
		out[7] = (this[7] as number) * scalar;
		out[8] = (this[8] as number) * scalar;
		return out;
	}

	/**
	 * Adds this matrix to another after multiplying the other by a scalar.
	 * @param matrix The other matrix.
	 * @param scalar The scalar.
	 * @returns The sum.
	 */
	public multiplyScalarAndAdd(matrix: Matrix3Like, scalar: number): Matrix3;

	/**
	 * Adds this matrix to another after multiplying the other by a scalar.
	 * @param matrix The other matrix.
	 * @param scalar The scalar.
	 * @param out The matrix to store the result in.
	 * @returns The sum.
	 */
	public multiplyScalarAndAdd<T extends Matrix3Like>(matrix: Matrix3Like, scalar: number, out: T): T;

	public multiplyScalarAndAdd<T extends Matrix3Like>(matrix: Matrix3Like, scalar: number, out: T = new Matrix3() as T): T {
		out[0] = (this[0] as number) + matrix[0] * scalar;
		out[1] = (this[1] as number) + matrix[1] * scalar;
		out[2] = (this[2] as number) + matrix[2] * scalar;
		out[3] = (this[3] as number) + matrix[3] * scalar;
		out[4] = (this[4] as number) + matrix[4] * scalar;
		out[5] = (this[5] as number) + matrix[5] * scalar;
		out[6] = (this[6] as number) + matrix[6] * scalar;
		out[7] = (this[7] as number) + matrix[7] * scalar;
		out[8] = (this[8] as number) + matrix[8] * scalar;
		return out;
	}

	/**
	 * Subtracts another matrix from this one.
	 * @param matrix The other matrix.
	 * @returns The difference between the matrices.
	 */
	public subtract(matrix: Matrix3Like): Matrix3;

	/**
	 * Subtracts another matrix from this one.
	 * @param matrix The other matrix.
	 * @param out The matrix to store the result in.
	 * @returns The difference between the matrices.
	 */
	public subtract<T extends Matrix3Like>(matrix: Matrix3Like, out: T): T;

	public subtract<T extends Matrix3Like>(matrix: Matrix3Like, out: T = new Matrix3() as T): T {
		out[0] = (this[0] as number) - matrix[0];
		out[1] = (this[1] as number) - matrix[1];
		out[2] = (this[2] as number) - matrix[2];
		out[3] = (this[3] as number) - matrix[3];
		out[4] = (this[4] as number) - matrix[4];
		out[5] = (this[5] as number) - matrix[5];
		out[6] = (this[6] as number) - matrix[6];
		out[7] = (this[7] as number) - matrix[7];
		out[8] = (this[8] as number) - matrix[8];
		return out;
	}

	/**
	 * Transposes this matrix.
	 * @returns The transpose of this matrix.
	 */
	public transpose(): Matrix3;

	/**
	 * Transposes this matrix.
	 * @param out The matrix to store the result in.
	 * @returns The transpose of this matrix.
	 */
	public transpose<T extends Matrix3Like>(out: T): T;

	public transpose<T extends Matrix3Like>(out: T = new Matrix3() as T): T {
		if (out == this as unknown as T) {
			const a01: number = this[1] as number;
			const a02: number = this[2] as number;
			const a12: number = this[5] as number;
			out[1] = this[3] as number;
			out[2] = this[6] as number;
			out[3] = a01;
			out[5] = this[7] as number;
			out[6] = a02;
			out[7] = a12;
		} else {
			out[0] = this[0] as number;
			out[1] = this[3] as number;
			out[2] = this[6] as number;
			out[3] = this[1] as number;
			out[4] = this[4] as number;
			out[5] = this[7] as number;
			out[6] = this[2] as number;
			out[7] = this[5] as number;
			out[8] = this[8] as number;
		}
		return out;
	}

	/** The determinant of this matrix. */
	public get determinant(): number {
		const a00: number = this[0] as number;
		const a01: number = this[1] as number;
		const a02: number = this[2] as number;
		const a10: number = this[3] as number;
		const a11: number = this[4] as number;
		const a12: number = this[5] as number;
		const a20: number = this[6] as number;
		const a21: number = this[7] as number;
		const a22: number = this[8] as number;

		return (a00 * (a22 * a11 - a12 * a21)
			+ a01 * (-a22 * a10 + a12 * a20)
			+ a02 * (a21 * a10 - a11 * a20));
	}

	/**
	 * Resets this matrix to identity.
	 * @returns This matrix.
	 */
	public identity(): this {
		this[0] = 1;
		this[1] = 0;
		this[2] = 0;
		this[3] = 0;
		this[4] = 1;
		this[5] = 0;
		this[6] = 0;
		this[7] = 0;
		this[8] = 1;
		return this;
	}

	/**
	 * Inverts this matrix.
	 * @returns The inverted matrix.
	 */
	public invert(): Matrix3;

	/**
	 * Inverts this matrix.
	 * @param out The matrix to store the result in.
	 * @returns The inverted matrix.
	 */
	public invert<T extends Matrix3Like>(out: T): T;

	public invert<T extends Matrix3Like>(out: T = new Matrix3() as T): T {
		const a00: number = this[0] as number;
		const a01: number = this[1] as number;
		const a02: number = this[2] as number;
		const a10: number = this[3] as number;
		const a11: number = this[4] as number;
		const a12: number = this[5] as number;
		const a20: number = this[6] as number;
		const a21: number = this[7] as number;
		const a22: number = this[8] as number;

		const b01: number = a22 * a11 - a12 * a21;
		const b11: number = -a22 * a10 + a12 * a20;
		const b21: number = a21 * a10 - a11 * a20;
		
		let determinant: number = a00 * b01 + a01 * b11 + a02 * b21;
		if (!determinant) {
			throw new SingularMatrixError();
		}
		determinant = 1 / determinant;

		out[0] = b01 * determinant;
		out[1] = (-a22 * a01 + a02 * a21) * determinant;
		out[2] = (a12 * a01 - a02 * a11) * determinant;
		out[3] = b11 * determinant;
		out[4] = (a22 * a00 - a02 * a20) * determinant;
		out[5] = (-a12 * a00 + a02 * a10) * determinant;
		out[6] = b21 * determinant;
		out[7] = (-a21 * a00 + a01 * a20) * determinant;
		out[8] = (a11 * a00 - a01 * a10) * determinant;
		return out;
	}

	/**
	 * Rotates this matrix by the given angle around the Z-axis.
	 * @param radians The angle in radians.
	 * @returns The rotated matrix.
	 */
	public rotate(radians: number): Matrix3;

	/**
	 * Rotates this matrix by the given angle around the Z-axis.
	 * @param radians The angle in radians.
	 * @param out The matrix to store the result in.
	 * @returns The rotated matrix.
	 */
	public rotate<T extends Matrix3Like>(radians: number, out: T): T;

	public rotate<T extends Matrix3Like>(radians: number, out: T = new Matrix3() as T): T {
		const a00: number = this[0] as number;
		const a01: number = this[1] as number;
		const a02: number = this[2] as number;
		const a10: number = this[3] as number;
		const a11: number = this[4] as number;
		const a12: number = this[5] as number;
		const a20: number = this[6] as number;
		const a21: number = this[7] as number;
		const a22: number = this[8] as number;

		const s: number = Math.sin(radians);
		const c: number = Math.cos(radians);

		out[0] = c * a00 + s * a10;
		out[1] = c * a01 + s * a11;
		out[2] = c * a02 + s * a12;
		out[3] = c * a10 - s * a00;
		out[4] = c * a11 - s * a01;
		out[5] = c * a12 - s * a02;
		out[6] = a20;
		out[7] = a21;
		out[8] = a22;
		return out;
	}

	/**
	 * Scales this matrix by the given vector.
	 * @param vector The scaling vector.
	 * @returns The scaled matrix.
	 */
	public scale(vector: Vector2Like): Matrix3;

	/**
	 * Scales this matrix by the given vector.
	 * @param vector The scaling vector.
	 * @param out The matrix to store the result in.
	 * @returns The scaled matrix.
	 */
	public scale<T extends Matrix3Like>(vector: Vector2Like, out: T): T;

	public scale<T extends Matrix3Like>(vector: Vector2Like, out: T = new Matrix3() as T): T {
		const x: number = vector[0];
		const y: number = vector[1];

		out[0] = (this[0] as number) * x;
		out[1] = (this[1] as number) * x;
		out[2] = (this[2] as number) * x;
		out[3] = (this[3] as number) * y;
		out[4] = (this[4] as number) * y;
		out[5] = (this[5] as number) * y;
		out[6] = this[6] as number;
		out[7] = this[7] as number;
		out[8] = this[8] as number;
		return out;
	}

	/**
	 * Translates this matrix by the given vector.
	 * @param vector The translation vector.
	 * @returns The translated matrix.
	 */
	public translate(vector: Vector2Like): Matrix3;

	/**
	 * Translates this matrix by the given vector.
	 * @param vector The translation vector.
	 * @param out The matrix to store the result in.
	 * @returns The translated matrix.
	 */
	public translate<T extends Matrix3Like>(vector: Vector2Like, out: T): T;

	public translate<T extends Matrix3Like>(vector: Vector2Like, out: T = new Matrix3() as T): T {
		const a00: number = this[0] as number;
		const a01: number = this[1] as number;
		const a02: number = this[2] as number;
		const a10: number = this[3] as number;
		const a11: number = this[4] as number;
		const a12: number = this[5] as number;
		const a20: number = this[6] as number;
		const a21: number = this[7] as number;
		const a22: number = this[8] as number;
		
		const x: number = vector[0];
		const y: number = vector[1];

		out[0] = a00;
		out[1] = a01;
		out[2] = a02;
		out[3] = a10;
		out[4] = a11;
		out[5] = a12;
		out[6] = x * a00 + y * a10 + a20;
		out[7] = x * a01 + y * a11 + a21;
		out[8] = x * a02 + y * a12 + a22;
		return out;
	}
}
