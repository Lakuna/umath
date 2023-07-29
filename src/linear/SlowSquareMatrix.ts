import { type Matrix, type SquareMatrix, epsilon, MatrixSizeError, SingularMatrixError } from "@lakuna/umath";

/**
 * A variable-size matrix with the same number of rows and columns.
 * @see [Matrix](https://en.wikipedia.org/wiki/Matrix_(mathematics))
 * @see [Square matrix](https://en.wikipedia.org/wiki/Square_matrix)
 */
export default class SlowSquareMatrix extends Float32Array implements SquareMatrix {
	/**
	 * Creates a variable-size matrix with the same number of rows and columns from the given columns.
	 * @param cols The columns in the matrix.
	 */
	public constructor(...columns: Array<Array<number>>) {
		super(columns.flat());
		this.width = columns.length;
		this.height = this.width;

		// Ensure that every column is the same height and that the height is equal to the width.
		for (let i = 0; i < this.width; i++) {
			if ((columns[i] as Array<number>).length != this.height) {
				throw new MatrixSizeError();
			}
		}
	}

	/** The number of rows in this matrix. */
	public readonly height: number;

	/** The number of columns in this matrix. */
	public readonly width: number;

	/**
	 * The determinant of this matrix.
	 * @see [Determinant](https://en.wikipedia.org/wiki/Determinant)
	 */
	public get determinant(): number {
		if (this.length <= 1) {
			return this[0] ?? 0;
		}

		let out = 0;
		for (let i = 0; i < this.height; i++) {
			out += (i % 2 ? 1 : -1) * (this[i] as number) * this.minor(0, i);
		}
		
		return out;
	}

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
	public add(matrix: Matrix): SlowSquareMatrix {
		if (this.width != matrix.width || this.height != matrix.height) {
			throw new MatrixSizeError();
		}

		const cols: Array<Array<number>> = [];
		for (let x = 0; x < this.width; x++) {
			for (let y = 0; y < this.height; y++) {
				(cols[x] ??= [])[y] = (this[x * this.height + y] as number) + (matrix[x * matrix.height + y] as number);
			}
		}

		return new SlowSquareMatrix(...cols);
	}

	/**
	 * Calculates the adjugate of this matrix.
	 * @returns The adjugate of this matrix.
	 * @see [Adjugate matrix](https://en.wikipedia.org/wiki/Adjugate_matrix)
	 */
	public adjoint(): SlowSquareMatrix {
		return this.cofactor().transpose();
	}

	/**
	 * Creates a copy of this matrix.
	 * @returns A copy of this matrix.
	 */
	public clone(): SlowSquareMatrix {
		const cols: Array<Array<number>> = [];
		for (let x = 0; x < this.width; x++) {
			for (let y = 0; y < this.height; y++) {
				(cols[x] ??= [])[y] = this[x * this.height + y] as number;
			}
		}

		return new SlowSquareMatrix(...cols);
	}

	/**
	 * Calculates the cofactor of this matrix.
	 * @returns The cofactor.
	 * @see [Minor](https://en.wikipedia.org/wiki/Minor_(linear_algebra))
	 */
	public cofactor(): SlowSquareMatrix {
		const out: Array<Array<number>> = [];
		for (let i = 0; i < this.width; i++) {
			for (let j = 0; j < this.height; j++) {
				(out[i] ??= [])[j] = ((i + j) % 2 ? -1 : 1) * this.minor(i, j);
			}
		}

		return this;
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
	 * Resets this matrix to identity.
	 * @returns This matrix.
	 * @see [Identity matrix](https://en.wikipedia.org/wiki/Identity_matrix)
	 */
	public identity(): this {
		for (let i = 0; i < this.width; i++) {
			for (let j = 0; j < this.height; j++) {
				this[i * this.height + j] = i == j ? 1 : 0;
			}
		}

		return this;
	}

	/**
	 * Inverts this matrix.
	 * @returns The inverted matrix.
	 * @see [Invertible matrix](https://en.wikipedia.org/wiki/Invertible_matrix)
	 */
	public invert(): SlowSquareMatrix {
		const dim: number = this.width;

		const clone: SlowSquareMatrix = this.clone();
		this.identity();

		for (let i = 0; i < dim; i++) {
			let diagonal: number = clone[i * dim + i] as number;
			if (!diagonal) {
				for (let ii: number = i + 1; ii < dim; ii++) {
					if (clone[ii * dim + i]) {
						for (let j = 0; j < dim; j++) {
							for (const matrix of [clone, this]) {
								[matrix[i * dim + j], matrix[ii * dim + j]] = [matrix[ii * dim + j] as number, matrix[i * dim + j] as number];
							}
						}

						break;
					}
				}

				diagonal = clone[i * dim + i] as number;
				if (!diagonal) {
					throw new SingularMatrixError();
				}
			}

			for (let ii = 0; ii < dim; ii++) {
				if (ii == i) {
					continue;
				}

				const temp: number = clone[ii * dim + i] as number;

				for (let j = 0; j < dim; j++) {
					for (const matrix of [clone, this]) {
						matrix[ii * dim + j] -= temp * (matrix[i * dim + j] as number);
					}
				}
			}
		}

		return this;
	}

	/**
	 * Calculates the minor of this matrix which results from removing the given row and column.
	 * @param row The row to remove.
	 * @param col The column to remove.
	 * @returns The minor.
	 * @see [Minor](https://en.wikipedia.org/wiki/Minor_(linear_algebra))
	 */
	public minor(row: number, col: number): number {
		return this.submatrix(row, col).determinant;
	}

	/**
	 * Multiplies this matrix by another.
	 * @param matrix The other matrix.
	 * @returns The product of the matrices.
	 * @see [Matrix multiplication](https://en.wikipedia.org/wiki/Matrix_multiplication)
	 */
	public multiply(matrix: Matrix): SlowSquareMatrix {
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

		return new SlowSquareMatrix(...out);
	}

	/**
	 * Multiplies this matrix by a scalar value.
	 * @param scalar The scalar value.
	 * @returns The product of the matrix and the scalar value.
	 * @see [Matrix multiplication](https://en.wikipedia.org/wiki/Matrix_multiplication)
	 */
	public multiplyScalar(scalar: number): SlowSquareMatrix {
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
	public multiplyScalarAndAdd(matrix: Matrix, scalar: number): SlowSquareMatrix {
		return this.add(matrix.multiplyScalar(scalar));
	}

	/**
	 * Creates a submatrix by removing the given row and column from this matrix.
	 * @param row The row to remove.
	 * @param col The column to remove.
	 * @returns The submatrix.
	 */
	public submatrix(row: number, col: number): SlowSquareMatrix {
		const cols: Array<Array<number>> = [];

		for (let i = 0; i < this.width; i++) {
			if (i == col) {
				continue;
			}

			for (let j = 0; j < this.height; j++) {
				if (j == row) {
					continue;
				}

				(cols[i] ??= [])[j] = this[i * this.height + j] as number;
			}
		}

		return new SlowSquareMatrix(...cols);
	}

	/**
	 * Subtracts another matrix from this one.
	 * @param matrix The other matrix.
	 * @returns The difference between the matrices.
	 * @see [Matrix addition](https://en.wikipedia.org/wiki/Matrix_addition)
	 */
	public subtract(matrix: Matrix): SlowSquareMatrix {
		if (this.width != matrix.width || this.height != matrix.height) {
			throw new MatrixSizeError();
		}

		const cols: Array<Array<number>> = [];
		for (let x = 0; x < this.width; x++) {
			for (let y = 0; y < this.height; y++) {
				(cols[x] ??= [])[y] = (this[x * this.height + y] as number) - (matrix[x * matrix.height + y] as number);
			}
		}

		return new SlowSquareMatrix(...cols);
	}

	/**
	 * Transposes this matrix.
	 * @returns The transpose of this matrix.
	 * @see [Transpose](https://en.wikipedia.org/wiki/Transpose)
	 */
	public transpose(): SlowSquareMatrix {
		const cols: Array<Array<number>> = [];
		for (let x = 0; x < this.width; x++) {
			for (let y = 0; y < this.height; y++) {
				(cols[y] ??= [])[x] = (this[x * this.height + y] as number);
			}
		}

		return new SlowSquareMatrix(...cols);
	}
}
