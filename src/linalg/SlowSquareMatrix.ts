import MatrixSizeError from "../utility/MatrixSizeError.js";
import SingularMatrixError from "../utility/SingularMatrixError.js";
import SlowMatrix from "./SlowMatrix.js";
import type SquareMatrix from "./SquareMatrix.js";

/**
 * A variable-size matrix with the same number of rows and columns.
 * @see [Square matrix](https://en.wikipedia.org/wiki/Square_matrix)
 */
export default class SlowSquareMatrix
	extends SlowMatrix
	implements SquareMatrix
{
	/**
	 * Create a variable-size matrix with the same number of rows and columns from the given columns.
	 * @param cols - The columns in the matrix.
	 * @see [Square matrix](https://en.wikipedia.org/wiki/Square_matrix)
	 */
	public constructor(...cols: number[][]) {
		super(...cols);

		// Ensure that every column is the same height and that the height is equal to the width.
		for (let i = 0; i < this.width; i++) {
			const col = cols[i];
			if (typeof col === "undefined" || col.length !== this.height) {
				throw new MatrixSizeError();
			}
		}
	}

	/**
	 * Get the determinant of this matrix.
	 * @see [Determinant](https://en.wikipedia.org/wiki/Determinant)
	 */
	public get determinant() {
		if (this.length < 1) {
			throw new MatrixSizeError();
		}

		if (this.length === 1) {
			return this[0] ?? 0;
		}

		let out = 0;
		for (let i = 0; i < this.width; i++) {
			const a = this[i * this.height];
			if (typeof a === "undefined") {
				throw new MatrixSizeError();
			}
			out += a * (i % 2 ? -1 : 1) * this.minor(0, i);
		}

		return out;
	}

	/**
	 * Calculate the adjugate of this matrix.
	 * @returns The adjugate of this matrix.
	 * @see [Adjugate matrix](https://en.wikipedia.org/wiki/Adjugate_matrix)
	 */
	public adjoint() {
		return this.cofactor().transpose();
	}

	/**
	 * Create a copy of this matrix.
	 * @returns A copy of this matrix.
	 */
	public override clone() {
		const cols: number[][] = [];
		for (let x = 0; x < this.width; x++) {
			for (let y = 0; y < this.height; y++) {
				const a = this[x * this.height + y];
				if (typeof a === "undefined") {
					throw new MatrixSizeError();
				}
				(cols[x] ??= [])[y] = a;
			}
		}

		return new SlowSquareMatrix(...cols);
	}

	/**
	 * Calculate the cofactor of this matrix.
	 * @returns The cofactor.
	 * @see [Minor](https://en.wikipedia.org/wiki/Minor_(linear_algebra))
	 */
	public cofactor() {
		const out: number[][] = [];
		for (let i = 0; i < this.width; i++) {
			// col i
			for (let j = 0; j < this.height; j++) {
				// row j
				(out[j] ??= [])[i] = ((i + j) % 2 ? -1 : 1) * this.minor(i, j);
			}
		}

		return new SlowSquareMatrix(...out);
	}

	/**
	 * Reset this matrix to identity.
	 * @returns This matrix.
	 * @see [Identity matrix](https://en.wikipedia.org/wiki/Identity_matrix)
	 */
	public identity() {
		for (let i = 0; i < this.width; i++) {
			for (let j = 0; j < this.height; j++) {
				this[i * this.height + j] = i === j ? 1 : 0;
			}
		}

		return this;
	}

	/**
	 * Invert this matrix.
	 * @returns The inverted matrix.
	 * @see [Invertible matrix](https://en.wikipedia.org/wiki/Invertible_matrix)
	 */
	public invert() {
		const dim = this.width;

		const clone = this.clone();
		const identity = this.clone().identity();

		for (let i = 0; i < dim; i++) {
			let diagonal = clone[i * dim + i];
			if (typeof diagonal === "undefined") {
				throw new MatrixSizeError();
			}
			if (diagonal === 0) {
				for (let ii = i + 1; ii < dim; ii++) {
					if (clone[ii * dim + i]) {
						for (let j = 0; j < dim; j++) {
							for (const matrix of [clone, identity]) {
								const a = matrix[ii * dim + j];
								const b = matrix[i * dim + j];
								if (typeof a === "undefined" || typeof b === "undefined") {
									throw new MatrixSizeError();
								}
								[matrix[i * dim + j], matrix[ii * dim + j]] = [a, b];
							}
						}

						break;
					}
				}

				diagonal = clone[i * dim + i];
				if (typeof diagonal === "undefined") {
					throw new MatrixSizeError();
				}
				if (diagonal === 0) {
					throw new SingularMatrixError();
				}
			}

			for (let ii = 0; ii < dim; ii++) {
				if (ii === i) {
					continue;
				}

				const temp = clone[ii * dim + i];
				if (typeof temp === "undefined") {
					throw new MatrixSizeError();
				}

				for (let j = 0; j < dim; j++) {
					for (const matrix of [clone, identity]) {
						const a = matrix[i * dim + j];
						const b = matrix[ii * dim + j];
						if (typeof a === "undefined" || typeof b === "undefined") {
							throw new MatrixSizeError();
						}
						matrix[ii * dim + j] = b - temp * a;
					}
				}
			}
		}

		return identity;
	}

	/**
	 * Calculate the minor of this matrix that results from removing the given row and column.
	 * @param row - The row to remove.
	 * @param col - The column to remove.
	 * @returns The minor.
	 * @see [Minor](https://en.wikipedia.org/wiki/Minor_(linear_algebra))
	 */
	public minor(row: number, col: number) {
		return this.submatrix(row, col).determinant;
	}

	/**
	 * Create a submatrix by removing the given row and column from this matrix.
	 * @param row - The row to remove.
	 * @param col - The column to remove.
	 * @returns The submatrix.
	 */
	public submatrix(row: number, col: number) {
		const cols: number[][] = [];

		for (let i = 0; i < this.width; i++) {
			if (i === col) {
				continue;
			}

			for (let j = 0; j < this.height; j++) {
				if (j === row) {
					continue;
				}

				const a = this[i * this.height + j];
				if (typeof a === "undefined") {
					throw new MatrixSizeError();
				}

				(cols[i < col ? i : i - 1] ??= [])[j < row ? j : j - 1] = a;
			}
		}

		return new SlowSquareMatrix(...cols);
	}

	/**
	 * Transpose this matrix.
	 * @returns The transpose of this matrix.
	 * @see [Transpose](https://en.wikipedia.org/wiki/Transpose)
	 */
	public override transpose() {
		const cols: number[][] = [];
		for (let x = 0; x < this.width; x++) {
			for (let y = 0; y < this.height; y++) {
				const a = this[x * this.height + y];
				if (typeof a === "undefined") {
					throw new MatrixSizeError();
				}

				(cols[y] ??= [])[x] = a;
			}
		}

		return new SlowSquareMatrix(...cols);
	}
}
