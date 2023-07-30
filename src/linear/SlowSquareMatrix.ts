import { type SquareMatrix, MatrixSizeError, SingularMatrixError } from "@lakuna/umath";
import SlowMatrix from "@lakuna/umath/SlowMatrix";

/**
 * A variable-size matrix with the same number of rows and columns.
 * @see [Square matrix](https://en.wikipedia.org/wiki/Square_matrix)
 */
export default class SlowSquareMatrix extends SlowMatrix implements SquareMatrix {
	/**
	 * Creates a variable-size matrix with the same number of rows and columns from the given columns.
	 * @param cols The columns in the matrix.
	 * @see [Square matrix](https://en.wikipedia.org/wiki/Square_matrix)
	 */
	public constructor(...cols: Array<Array<number>>) {
		super(...cols);

		// Ensure that every column is the same height and that the height is equal to the width.
		for (let i = 0; i < this.width; i++) {
			if ((cols[i] as Array<number>).length != this.height) {
				throw new MatrixSizeError();
			}
		}
	}

	/**
	 * The determinant of this matrix.
	 * @see [Determinant](https://en.wikipedia.org/wiki/Determinant)
	 */
	public get determinant(): number {
		if (this.length < 1) {
			throw new MatrixSizeError();
		}

		if (this.length == 1) {
			return this[0] ?? 0;
		}

		let out = 0;
		for (let i = 0; i < this.width; i++) {
			out += (this[i * this.height] as number) * (i % 2 ? -1 : 1) * this.minor(0, i);
		}
		
		return out;
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
	public override clone(): SlowSquareMatrix {
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
		for (let i = 0; i < this.width; i++) { // col i
			for (let j = 0; j < this.height; j++) { // row j
				(out[j] ??= [])[i] = ((i + j) % 2 ? -1 : 1) * this.minor(i, j);
			}
		}

		return new SlowSquareMatrix(...out);
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
		const identity: SlowSquareMatrix = this.clone().identity();

		for (let i = 0; i < dim; i++) {
			let diagonal: number = clone[i * dim + i] as number;
			if (!diagonal) {
				for (let ii: number = i + 1; ii < dim; ii++) {
					if (clone[ii * dim + i]) {
						for (let j = 0; j < dim; j++) {
							for (const matrix of [clone, identity]) {
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
					for (const matrix of [clone, identity]) {
						matrix[ii * dim + j] -= temp * (matrix[i * dim + j] as number);
					}
				}
			}
		}

		return identity;
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

				(cols[i < col ? i : i - 1] ??= [])[j < row ? j : j - 1] = this[i * this.height + j] as number;
			}
		}

		return new SlowSquareMatrix(...cols);
	}

	/**
	 * Transposes this matrix.
	 * @returns The transpose of this matrix.
	 * @see [Transpose](https://en.wikipedia.org/wiki/Transpose)
	 */
	public override transpose(): SlowSquareMatrix {
		const cols: Array<Array<number>> = [];
		for (let x = 0; x < this.width; x++) {
			for (let y = 0; y < this.height; y++) {
				(cols[y] ??= [])[x] = (this[x * this.height + y] as number);
			}
		}

		return new SlowSquareMatrix(...cols);
	}
}
