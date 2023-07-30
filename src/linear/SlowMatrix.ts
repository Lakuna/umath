import { type Matrix, PartialMatrixError, epsilon, MatrixSizeError } from "@lakuna/umath";

/**
 * A variable-size matrix.
 * @see [Matrix](https://en.wikipedia.org/wiki/Matrix_(mathematics))
 */
export default class SlowMatrix extends Float32Array implements Matrix {
	/**
	 * Creates a variable-size matrix from the given columns.
	 * @param cols The columns in the matrix.
	 */
	public constructor(...cols: Array<Array<number>>) {
		super(cols.flat());
		this.width = cols.length;
		this.height = this.width && (cols[0] as Array<number>).length;

		if (this.width < 1 || this.height < 1) {
			throw new MatrixSizeError();
		}

		// Ensure that every column is the same height.
		for (let i = 0; i < this.width; i++) {
			if ((cols[i]?.length ?? 0) != this.height) {
				throw new PartialMatrixError();
			}
		}
	}

	/** The number of rows in this matrix. */
	public readonly height: number;

	/** The number of columns in this matrix. */
	public readonly width: number;

	/**
	 * The Frobenius norm of this matrix.
	 * @see [Matrix norm](https://en.wikipedia.org/wiki/Matrix_norm)
	 */
	public get frob(): number {
		return Math.hypot(...this);
	}

	/**
	 * Adds two matrices of the same size.
	 * @param matrix The other matrix.
	 * @returns The sum of the matrices.
	 * @see [Matrix addition](https://en.wikipedia.org/wiki/Matrix_addition)
	 */
	public add(matrix: Matrix): SlowMatrix {
		if (this.width != matrix.width || this.height != matrix.height) {
			throw new MatrixSizeError();
		}

		const cols: Array<Array<number>> = [];
		for (let x = 0; x < this.width; x++) {
			for (let y = 0; y < this.height; y++) {
				(cols[x] ??= [])[y] = (this[x * this.height + y] as number) + (matrix[x * matrix.height + y] as number);
			}
		}

		return new SlowMatrix(...cols);
	}

	/**
	 * Creates a copy of this matrix.
	 * @returns A copy of this matrix.
	 */
	public clone(): SlowMatrix {
		const cols: Array<Array<number>> = [];
		for (let x = 0; x < this.width; x++) {
			for (let y = 0; y < this.height; y++) {
				(cols[x] ??= [])[y] = this[x * this.height + y] as number;
			}
		}

		return new SlowMatrix(...cols);
	}

	/**
	 * Copies the values of another matrix into this one.
	 * @param matrix The matrix to copy.
	 * @returns This matrix.
	 */
	public copy(matrix: Matrix): this {
		if (this.width != matrix.width || this.height != matrix.height) {
			throw new MatrixSizeError();
		}

		for (let x = 0; x < this.width; x++) {
			for (let y = 0; y < this.height; y++) {
				(this[x * this.width + y] as number) = matrix[x * this.height + y] as number;
			}
		}

		return this;
	}

	/**
	 * Determines whether this matrix is roughly equivalent to another.
	 * @param matrix The other matrix.
	 * @returns Whether the matrices are equivalent.
	 */
	public equals(matrix: Matrix): boolean {
		if (this.width != matrix.width || this.height != matrix.height) {
			return false;
		}

		for (let i = 0; i < this.length; i++) {
			if (Math.abs((this[i] as number) - (matrix[i] as number)) > epsilon) {
				return false;
			}
		}

		return true;
	}

	/**
	 * Determines whether this matrix is exactly equivalent to another.
	 * @param matrix The other matrix.
	 * @returns Whether the matrices are equivalent.
	 */
	public exactEquals(matrix: Matrix): boolean {
		if (this.width != matrix.width || this.height != matrix.height) {
			return false;
		}

		for (let i = 0; i < this.length; i++) {
			if (this[i] != matrix[i]) {
				return false;
			}
		}

		return true;
	}

	/**
	 * Multiplies this matrix by another.
	 * @param matrix The other matrix.
	 * @returns The product of the matrices.
	 * @see [Matrix multiplication](https://en.wikipedia.org/wiki/Matrix_multiplication)
	 */
	public multiply(matrix: Matrix): SlowMatrix {
		if (this.width != matrix.height) {
			throw new MatrixSizeError();
		}

		const n: number = this.height;
		const m: number = this.width;
		const p: number = matrix.width;

		const out: Array<Array<number>> = [];
		for (let i = 0; i < n; i++) {
			for (let j = 0; j < p; j++) {
				let sum = 0;
				for (let k = 0; k < m; k++) {
					sum += (this[k * this.height + i] as number) * (matrix[j * matrix.height + k] as number)
				}
				(out[j] ??= [])[i] = sum;
			}
		}

		return new SlowMatrix(...out);
	}

	/**
	 * Multiplies this matrix by a scalar value.
	 * @param scalar The scalar value.
	 * @returns The product of the matrix and the scalar value.
	 * @see [Matrix multiplication](https://en.wikipedia.org/wiki/Matrix_multiplication)
	 */
	public multiplyScalar(scalar: number): SlowMatrix {
		const out = this.clone();
		for (let i = 0; i < out.length; i++) {
			out[i] *= scalar;
		}

		return out;
	}

	/**
	 * Adds this matrix to another after multiplying the other by a scalar.
	 * @param matrix The other matrix.
	 * @param scalar The scalar.
	 * @returns The sum.
	 * @see [Matrix addition](https://en.wikipedia.org/wiki/Matrix_addition)
	 * @see [Matrix multiplication](https://en.wikipedia.org/wiki/Matrix_multiplication)
	 */
	public multiplyScalarAndAdd(matrix: Matrix, scalar: number): SlowMatrix {
		return this.add(matrix.multiplyScalar(scalar));
	}

	/**
	 * Subtracts another matrix from this one.
	 * @param matrix The other matrix.
	 * @returns The difference between the matrices.
	 * @see [Matrix addition](https://en.wikipedia.org/wiki/Matrix_addition)
	 */
	public subtract(matrix: Matrix): SlowMatrix {
		if (this.width != matrix.width || this.height != matrix.height) {
			throw new MatrixSizeError();
		}

		const cols: Array<Array<number>> = [];
		for (let x = 0; x < this.width; x++) {
			for (let y = 0; y < this.height; y++) {
				(cols[x] ??= [])[y] = (this[x * this.height + y] as number) - (matrix[x * matrix.height + y] as number);
			}
		}

		return new SlowMatrix(...cols);
	}

	/**
	 * Transposes this matrix.
	 * @returns The transpose of this matrix.
	 * @see [Transpose](https://en.wikipedia.org/wiki/Transpose)
	 */
	public transpose(): SlowMatrix {
		const cols: Array<Array<number>> = [];
		for (let x = 0; x < this.width; x++) {
			for (let y = 0; y < this.height; y++) {
				(cols[y] ??= [])[x] = (this[x * this.height + y] as number);
			}
		}

		return new SlowMatrix(...cols);
	}
}
