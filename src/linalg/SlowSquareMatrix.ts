import MatrixSizeError from "../utility/MatrixSizeError.js";
import SingularMatrixError from "../utility/SingularMatrixError.js";
import SlowMatrix from "./SlowMatrix.js";
import type SquareMatrix from "./SquareMatrix.js";

/**
 * A variable-size matrix with the same number of rows and columns.
 * @see {@link https://en.wikipedia.org/wiki/Square_matrix | Square matrix}
 * @public
 */
export default class SlowSquareMatrix
	extends SlowMatrix
	implements SquareMatrix
{
	/**
	 * Create a variable-size matrix with the same number of rows and columns from the given columns.
	 * @param cols - The columns in the matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Square_matrix | Square matrix}
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
	 * @see {@link https://en.wikipedia.org/wiki/Determinant | Determinant}
	 */
	public get determinant(): number {
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
	 * @see {@link https://en.wikipedia.org/wiki/Adjugate_matrix | Adjugate matrix}
	 */
	public adjoint(): SlowSquareMatrix {
		return this.cofactor().transpose();
	}

	/**
	 * Create a copy of this matrix.
	 * @returns A copy of this matrix.
	 */
	public override clone(): SlowSquareMatrix {
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
	 * @see {@link https://en.wikipedia.org/wiki/Minor_(linear_algebra) | Minor}
	 */
	public cofactor(): SlowSquareMatrix {
		const out: number[][] = [];
		for (let i = 0; i < this.width; i++) {
			// Column `i`.
			for (let j = 0; j < this.height; j++) {
				// Row `j`.
				(out[j] ??= [])[i] = ((i + j) % 2 ? -1 : 1) * this.minor(i, j);
			}
		}

		return new SlowSquareMatrix(...out);
	}

	/**
	 * Reset this matrix to identity.
	 * @returns This matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Identity_matrix | Identity matrix}
	 */
	public identity(): this {
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
	 * @see {@link https://en.wikipedia.org/wiki/Invertible_matrix | Invertible matrix}
	 */
	public invert(): SlowSquareMatrix {
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
	 * @see {@link https://en.wikipedia.org/wiki/Minor_(linear_algebra) | Minor}
	 */
	public minor(row: number, col: number): number {
		return this.submatrix(row, col).determinant;
	}

	/**
	 * Create a submatrix by removing the given row and column from this matrix.
	 * @param row - The row to remove.
	 * @param col - The column to remove.
	 * @returns The submatrix.
	 */
	public submatrix(row: number, col: number): SlowSquareMatrix {
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
	 * @see {@link https://en.wikipedia.org/wiki/Transpose | Transpose}
	 */
	public override transpose(): SlowSquareMatrix {
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
