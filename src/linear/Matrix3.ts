import SingularMatrixError from "../utility/SingularMatrixError.js";
import type { Matrix4Like } from "./Matrix4.js";
import type { QuaternionLike } from "./Quaternion.js";
import type SquareMatrix from "./SquareMatrix.js";
import type { Vector2Like } from "./Vector2.js";

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
	 * @param r The angle in radians.
	 * @returns The transformation matrix.
	 */
	public static fromRotation(r: number): Matrix3;

	/**
	 * Creates a transformation matrix that represents a rotation by the given angle around the Z-axis.
	 * @param r The angle in radians.
	 * @param out The matrix to store the result in.
	 * @returns The transformation matrix.
	 */
	public static fromRotation<T extends Matrix3Like>(r: number, out: T): T;

	public static fromRotation<T extends Matrix3Like>(r: number, out: T = new Matrix3() as T): T {
		const s: number = Math.sin(r);
		const c: number = Math.cos(r);

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
	 * @param v The scaling vector.
	 * @returns The transformation matrix.
	 */
	public static fromScaling(v: Vector2Like): Matrix3;

	/**
	 * Creates a transformation matrix that represents a scaling by the given vector.
	 * @param v The scaling vector.
	 * @param out The matrix to store the result in.
	 * @returns The transformation matrix.
	 */
	public static fromScaling<T extends Matrix3Like>(v: Vector2Like, out: T): T;

	public static fromScaling<T extends Matrix3Like>(v: Vector2Like, out: T = new Matrix3() as T): T {
		out[0] = v[0];
		out[1] = 0;
		out[2] = 0;
		out[3] = 0;
		out[4] = v[1];
		out[5] = 0;
		out[6] = 0;
		out[7] = 0;
		out[8] = 1;
		return out;
	}

	/**
	 * Creates a transformation matrix that represents a translation by the given vector.
	 * @param v The translation vector.
	 * @returns The transformation matrix.
	 */
	public static fromTranslation(v: Vector2Like): Matrix3;

	/**
	 * Creates a transformation matrix that represents a translation by the given vector.
	 * @param v The translation vector.
	 * @param out The matrix to store the result in.
	 * @returns The transformation matrix.
	 */
	public static fromTranslation<T extends Matrix3Like>(v: Vector2Like, out: T): T;

	public static fromTranslation<T extends Matrix3Like>(v: Vector2Like, out: T = new Matrix3() as T): T {
		out[0] = 1;
		out[1] = 0;
		out[2] = 0;
		out[3] = 0;
		out[4] = 1;
		out[5] = 0;
		out[6] = v[0];
		out[7] = v[1];
		out[8] = 1;
		return out;
	}

	/**
	 * Creates a transformation matrix that represents a rotation by the given quaternion.
	 * @param q The quaternion.
	 * @returns The transformation matrix.
	 */
	public static fromQuaternion(q: QuaternionLike): Matrix3;

	/**
	 * Creates a transformation matrix that represents a rotation by the given quaternion.
	 * @param q The quaternion.
	 * @param out The matrix to store the result in.
	 * @returns The transformation matrix.
	 */
	public static fromQuaternion<T extends Matrix3Like>(q: QuaternionLike, out: T): T;

	public static fromQuaternion<T extends Matrix3Like>(q: QuaternionLike, out: T = new Matrix3() as T): T {
		const x: number = q[0];
		const y: number = q[1];
		const z: number = q[2];
		const w: number = q[3];

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
	 * @param m The four-by-four matrix.
	 * @returns The normal matrix.
	 */
	public static normalFromMatrix4(m: Matrix4Like): Matrix3;

	/**
	 * Calculates a three-by-three normal (inverse transpose) matrix from a four-by-four matrix.
	 * @param m The four-by-four matrix.
	 * @param out The matrix to store the result in.
	 * @returns The normal matrix.
	 */
	public static normalFromMatrix4<T extends Matrix3Like>(m: Matrix4Like, out: T): T;

	public static normalFromMatrix4<T extends Matrix3Like>(m: Matrix4Like, out: T = new Matrix3() as T): T {
		const a00: number = m[0];
		const a01: number = m[1];
		const a02: number = m[2];
		const a03: number = m[3];
		const a10: number = m[4];
		const a11: number = m[5];
		const a12: number = m[6];
		const a13: number = m[7];
		const a20: number = m[8];
		const a21: number = m[9];
		const a22: number = m[10];
		const a23: number = m[11];
		const a30: number = m[12];
		const a31: number = m[13];
		const a32: number = m[14];
		const a33: number = m[15];

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
		
		let det: number = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
		if (!det) {
			throw new SingularMatrixError();
		}
		det = 1 / det;

		out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
		out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
		out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
		out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
		out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
		out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
		out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
		out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
		out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
		return out;
	}

	/**
	 * Generates a two-dimensional projection matrix with the given bounds.
	 * @param w The width of the projection.
	 * @param h The height of the projection.
	 * @returns The projection matrix.
	 */
	public static projection(w: number, h: number): Matrix3;

	/**
	 * Generates a two-dimensional projection matrix with the given bounds.
	 * @param w The width of the projection.
	 * @param h The height of the projection.
	 * @param out The matrix to store the result in.
	 * @returns The projection matrix.
	 */
	public static projection<T extends Matrix3Like>(w: number, h: number, out: T): T;

	public static projection<T extends Matrix3Like>(w: number, h: number, out: T = new Matrix3() as T): T {
		out[0] = 2 / w;
		out[1] = 0;
		out[2] = 0;
		out[3] = 0;
		out[4] = -2 / h;
		out[5] = 0;
		out[6] = -1;
		out[7] = 1;
		out[8] = 1;
		return out;
	}

	/**
	 * Creates a three-by-three matrix from the upper-left corner of a four-by-four matrix.
	 * @param m The four-by-four matrix.
	 * @returns The three-by-three matrix.
	 */
	public static fromMatrix4(m: Matrix4Like): Matrix3;

	/**
	 * Creates a three-by-three matrix from the upper-left corner of a four-by-four matrix.
	 * @param m The four-by-four matrix.
	 * @param out The matrix to store the result in.
	 * @returns The three-by-three matrix.
	 */
	public static fromMatrix4<T extends Matrix3Like>(m: Matrix4Like, out: T): T;

	public static fromMatrix4<T extends Matrix3Like>(m: Matrix4Like, out: T = new Matrix3() as T): T {
		out[0] = m[0];
		out[1] = m[1];
		out[2] = m[2];
		out[3] = m[4];
		out[4] = m[5];
		out[5] = m[6];
		out[6] = m[8];
		out[7] = m[9];
		out[8] = m[10];
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
	 * @param r The row of the value.
	 * @param c The column of the value.
	 * @returns The value at the specified position.
	 */
	public get(r: number, c: number): number | undefined {
		return this[c * this.height + r];
	}

	/**
	 * Sets the value at the given position in this matrix.
	 * @param r The row of the value.
	 * @param c The column of the value.
	 * @param v The value.
	 */
	public put(r: number, c: number, v: number): void {
		this[c * this.height + r] = v;
	}

	/**
	 * Determines whether this matrix is equivalent to another.
	 * @param m The other matrix.
	 * @returns Whether the matrices are equivalent.
	 */
	public equals(m: Matrix3Like): boolean {
		return this[0] == m[0]
			&& this[1] == m[1]
			&& this[2] == m[2]
			&& this[3] == m[3]
			&& this[4] == m[4]
			&& this[5] == m[5]
			&& this[6] == m[6]
			&& this[7] == m[7]
			&& this[8] == m[8];
	}

	/**
	 * Adds two matrices of the same size.
	 * @param m The other matrix.
	 * @returns The sum of the matrices.
	 */
	public add(m: Matrix3Like): Matrix3;

	/**
	 * Adds two matrices of the same size.
	 * @param m The other matrix.
	 * @param out The matrix to store the result in.
	 * @returns The sum of the matrices.
	 */
	public add<T extends Matrix3Like>(m: Matrix3Like, out: T): T;

	public add<T extends Matrix3Like>(m: Matrix3Like, out: T = new Matrix3() as T): T {
		out[0] = (this[0] as number) + m[0];
		out[1] = (this[1] as number) + m[1];
		out[2] = (this[2] as number) + m[2];
		out[3] = (this[3] as number) + m[3];
		out[4] = (this[4] as number) + m[4];
		out[5] = (this[5] as number) + m[5];
		out[6] = (this[6] as number) + m[6];
		out[7] = (this[7] as number) + m[7];
		out[8] = (this[8] as number) + m[8];
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
	 * @param m The matrix to copy.
	 * @returns This matrix.
	 */
	public copy(m: Matrix3Like): this {
		this[0] = m[0];
		this[1] = m[1];
		this[2] = m[2];
		this[3] = m[3];
		this[4] = m[4];
		this[5] = m[5];
		this[6] = m[6];
		this[7] = m[7];
		this[8] = m[8];
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
	 * @param m The other matrix.
	 * @returns The product of the matrices.
	 */
	public multiply(m: Matrix3Like): Matrix3;

	/**
	 * Multiplies this matrix by another.
	 * @param m The other matrix.
	 * @param out The matrix to store the result in.
	 * @returns The product of the matrices.
	 */
	public multiply<T extends Matrix3Like>(m: Matrix3Like, out: T): T;

	public multiply<T extends Matrix3Like>(m: Matrix3Like, out: T = new Matrix3() as T): T {
		const a00: number = this[0] as number;
		const a01: number = this[1] as number;
		const a02: number = this[2] as number;
		const a10: number = this[3] as number;
		const a11: number = this[4] as number;
		const a12: number = this[5] as number;
		const a20: number = this[6] as number;
		const a21: number = this[7] as number;
		const a22: number = this[8] as number;

		const b00: number = m[0];
		const b01: number = m[1];
		const b02: number = m[2];
		const b10: number = m[3];
		const b11: number = m[4];
		const b12: number = m[5];
		const b20: number = m[6];
		const b21: number = m[7];
		const b22: number = m[8];

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
	 * @param s The scalar value.
	 * @returns The product of the matrix and the scalar value.
	 */
	public multiplyScalar(s: number): Matrix3;

	/**
	 * Multiplies this matrix by a scalar value.
	 * @param s The scalar value.
	 * @param out The matrix to store the result in.
	 * @returns The product of the matrix and the scalar value.
	 */
	public multiplyScalar<T extends Matrix3Like>(s: number, out: T): T;

	public multiplyScalar<T extends Matrix3Like>(s: number, out: T = new Matrix3() as T): T {
		out[0] = (this[0] as number) * s;
		out[1] = (this[1] as number) * s;
		out[2] = (this[2] as number) * s;
		out[3] = (this[3] as number) * s;
		out[4] = (this[4] as number) * s;
		out[5] = (this[5] as number) * s;
		out[6] = (this[6] as number) * s;
		out[7] = (this[7] as number) * s;
		out[8] = (this[8] as number) * s;
		return out;
	}

	/**
	 * Adds this matrix to another after multiplying the other by a scalar.
	 * @param m The other matrix.
	 * @param s The scalar.
	 * @returns The sum.
	 */
	public multiplyScalarAndAdd(m: Matrix3Like, s: number): Matrix3;

	/**
	 * Adds this matrix to another after multiplying the other by a scalar.
	 * @param m The other matrix.
	 * @param s The scalar.
	 * @param out The matrix to store the result in.
	 * @returns The sum.
	 */
	public multiplyScalarAndAdd<T extends Matrix3Like>(m: Matrix3Like, s: number, out: T): T;

	public multiplyScalarAndAdd<T extends Matrix3Like>(m: Matrix3Like, s: number, out: T = new Matrix3() as T): T {
		out[0] = (this[0] as number) + m[0] * s;
		out[1] = (this[1] as number) + m[1] * s;
		out[2] = (this[2] as number) + m[2] * s;
		out[3] = (this[3] as number) + m[3] * s;
		out[4] = (this[4] as number) + m[4] * s;
		out[5] = (this[5] as number) + m[5] * s;
		out[6] = (this[6] as number) + m[6] * s;
		out[7] = (this[7] as number) + m[7] * s;
		out[8] = (this[8] as number) + m[8] * s;
		return out;
	}

	/**
	 * Subtracts another matrix from this one.
	 * @param m The other matrix.
	 * @returns The difference between the matrices.
	 */
	public subtract(m: Matrix3Like): Matrix3;

	/**
	 * Subtracts another matrix from this one.
	 * @param m The other matrix.
	 * @param out The matrix to store the result in.
	 * @returns The difference between the matrices.
	 */
	public subtract<T extends Matrix3Like>(m: Matrix3Like, out: T): T;

	public subtract<T extends Matrix3Like>(m: Matrix3Like, out: T = new Matrix3() as T): T {
		out[0] = (this[0] as number) - m[0];
		out[1] = (this[1] as number) - m[1];
		out[2] = (this[2] as number) - m[2];
		out[3] = (this[3] as number) - m[3];
		out[4] = (this[4] as number) - m[4];
		out[5] = (this[5] as number) - m[5];
		out[6] = (this[6] as number) - m[6];
		out[7] = (this[7] as number) - m[7];
		out[8] = (this[8] as number) - m[8];
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
		
		let det = a00 * b01 + a01 * b11 + a02 * b21;
		if (!det) {
			throw new SingularMatrixError();
		}
		det = 1 / det;

		out[0] = b01 * det;
		out[1] = (-a22 * a01 + a02 * a21) * det;
		out[2] = (a12 * a01 - a02 * a11) * det;
		out[3] = b11 * det;
		out[4] = (a22 * a00 - a02 * a20) * det;
		out[5] = (-a12 * a00 + a02 * a10) * det;
		out[6] = b21 * det;
		out[7] = (-a21 * a00 + a01 * a20) * det;
		out[8] = (a11 * a00 - a01 * a10) * det;
		return out;
	}

	/**
	 * Rotates this matrix by the given angle.
	 * @param r The angle in radians.
	 * @returns The rotated matrix.
	 */
	public rotate(r: number): Matrix3;

	/**
	 * Rotates this matrix by the given angle.
	 * @param r The angle in radians.
	 * @param out The matrix to store the result in.
	 * @returns The rotated matrix.
	 */
	public rotate<T extends Matrix3Like>(r: number, out: T): T;

	public rotate<T extends Matrix3Like>(r: number, out: T = new Matrix3() as T): T {
		const a00: number = this[0] as number;
		const a01: number = this[1] as number;
		const a02: number = this[2] as number;
		const a10: number = this[3] as number;
		const a11: number = this[4] as number;
		const a12: number = this[5] as number;
		const a20: number = this[6] as number;
		const a21: number = this[7] as number;
		const a22: number = this[8] as number;

		const s: number = Math.sin(r);
		const c: number = Math.cos(r);

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
	 * @param v The scaling vector.
	 * @returns The scaled matrix.
	 */
	public scale(v: Vector2Like): Matrix3;

	/**
	 * Scales this matrix by the given vector.
	 * @param v The scaling vector.
	 * @param out The matrix to store the result in.
	 * @returns The scaled matrix.
	 */
	public scale<T extends Matrix3Like>(v: Vector2Like, out: T): T;

	public scale<T extends Matrix3Like>(v: Vector2Like, out: T = new Matrix3() as T): T {
		const x: number = v[0];
		const y: number = v[1];

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
	 * @param v The translation vector.
	 * @returns The translated matrix.
	 */
	public translate(v: Vector2Like): Matrix3;

	/**
	 * Translates this matrix by the given vector.
	 * @param v The translation vector.
	 * @param out The matrix to store the result in.
	 * @returns The translated matrix.
	 */
	public translate<T extends Matrix3Like>(v: Vector2Like, out: T): T;

	public translate<T extends Matrix3Like>(v: Vector2Like, out: T = new Matrix3() as T): T {
		const a00: number = this[0] as number;
		const a01: number = this[1] as number;
		const a02: number = this[2] as number;
		const a10: number = this[3] as number;
		const a11: number = this[4] as number;
		const a12: number = this[5] as number;
		const a20: number = this[6] as number;
		const a21: number = this[7] as number;
		const a22: number = this[8] as number;
		
		const x: number = v[0];
		const y: number = v[1];

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
