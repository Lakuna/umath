import type { default as Matrix, MatrixLike } from "./Matrix.js";
import MatrixSizeError from "../utility/MatrixSizeError.js";
import PartialMatrixError from "../utility/PartialMatrixError.js";
import approx from "../algorithms/approx.js";

/**
 * A matrix with size information.
 * @internal
 */
interface SizedMatrixLike extends MatrixLike {
	/** The width (number of columns) of the matrix. */
	width: number;

	/** The height (number of rows) of the matrix. */
	height: number;
}

/**
 * Determine whether the given `MatrixLike` has size information.
 * @internal
 */
const isSized = (matrix: MatrixLike): matrix is SizedMatrixLike =>
	"width" in matrix &&
	typeof matrix.width === "number" &&
	"height" in matrix &&
	typeof matrix.height === "number";

/**
 * A variable-size matrix.
 * @see {@link https://en.wikipedia.org/wiki/Matrix_(mathematics) | Matrix}
 * @public
 */
export default class SlowMatrix extends Float32Array implements Matrix {
	/**
	 * Create a variable-size matrix from the given columns.
	 * @param cols - The columns in the matrix.
	 */
	public constructor(...cols: number[][]) {
		super(cols.flat());

		this.width = cols.length;
		this.height = cols[0]?.length ?? 0;

		// Ensure that every column is the same height.
		for (let i = 0; i < this.width; i++) {
			if ((cols[i]?.length ?? 0) !== this.height) {
				throw new PartialMatrixError();
			}
		}
	}

	/** The number of rows in this matrix. */
	public readonly height: number;

	/** The number of columns in this matrix. */
	public readonly width: number;

	/**
	 * Get the Frobenius norm of this matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Matrix_norm | Matrix norm}
	 */
	public get frob(): number {
		return Math.hypot(...this);
	}

	/**
	 * Add two matrices of the same size.
	 * @param matrix - The other matrix.
	 * @returns The sum of the matrices.
	 * @see {@link https://en.wikipedia.org/wiki/Matrix_addition | Matrix addition}
	 */
	public add(matrix: MatrixLike): SlowMatrix {
		if (
			!isSized(matrix) ||
			this.width !== matrix.width ||
			this.height !== matrix.height
		) {
			throw new MatrixSizeError();
		}

		const cols: number[][] = [];
		for (let x = 0; x < this.width; x++) {
			for (let y = 0; y < this.height; y++) {
				const i = x * this.height + y;
				(cols[x] ??= [])[y] = (this[i] ?? 0) + (matrix[i] ?? 0);
			}
		}

		return new SlowMatrix(...cols);
	}

	/**
	 * Create a copy of this matrix.
	 * @returns A copy of this matrix.
	 */
	public clone(): SlowMatrix {
		const cols: number[][] = [];
		for (let x = 0; x < this.width; x++) {
			for (let y = 0; y < this.height; y++) {
				(cols[x] ??= [])[y] = this[x * this.height + y] ?? 0;
			}
		}

		return new SlowMatrix(...cols);
	}

	/**
	 * Copy the values of another matrix into this one.
	 * @param matrix - The matrix to copy.
	 * @returns This matrix.
	 */
	public copy(matrix: MatrixLike): this {
		if (
			!isSized(matrix) ||
			this.width !== matrix.width ||
			this.height !== matrix.height
		) {
			throw new MatrixSizeError();
		}

		for (let i = 0; i < matrix.width * matrix.height; i++) {
			this[i] = matrix[i] ?? 0;
		}

		return this;
	}

	/**
	 * Determine whether or not this matrix is roughly equivalent to another.
	 * @param matrix - The other matrix.
	 * @returns Whether or not the matrices are equivalent.
	 */
	public equals(matrix: MatrixLike): boolean {
		if (
			!isSized(matrix) ||
			this.width !== matrix.width ||
			this.height !== matrix.height
		) {
			return false;
		}

		for (let i = 0; i < this.length; i++) {
			if (approx(this[i] ?? 0, matrix[i] ?? 0)) {
				return false;
			}
		}

		return true;
	}

	/**
	 * Determine whether this matrix is exactly equivalent to another.
	 * @param matrix - The other matrix.
	 * @returns Whether the matrices are equivalent.
	 */
	public exactEquals(matrix: MatrixLike): boolean {
		if (
			!isSized(matrix) ||
			this.width !== matrix.width ||
			this.height !== matrix.height
		) {
			return false;
		}

		for (let i = 0; i < this.length; i++) {
			if (this[i] !== matrix[i]) {
				return false;
			}
		}

		return true;
	}

	/**
	 * Multiply this matrix by another.
	 * @param matrix - The other matrix.
	 * @returns The product of the matrices.
	 * @see {@link https://en.wikipedia.org/wiki/Matrix_multiplication | Matrix multiplication}
	 */
	public multiply(matrix: MatrixLike): SlowMatrix {
		if (!isSized(matrix) || this.width !== matrix.height) {
			throw new MatrixSizeError();
		}

		const n = this.height;
		const m = this.width;
		const p = matrix.width;

		const out: number[][] = [];
		for (let i = 0; i < n; i++) {
			for (let j = 0; j < p; j++) {
				let sum = 0;
				for (let k = 0; k < m; k++) {
					sum +=
						(this[k * this.height + i] ?? 0) *
						(matrix[j * matrix.height + k] ?? 0);
				}

				(out[j] ??= [])[i] = sum;
			}
		}

		return new SlowMatrix(...out);
	}

	/**
	 * Multiply this matrix by a scalar value.
	 * @param scalar - The scalar value.
	 * @returns The product of the matrix and the scalar value.
	 * @see {@link https://en.wikipedia.org/wiki/Matrix_multiplication | Matrix multiplication}
	 */
	public multiplyScalar(scalar: number): SlowMatrix {
		const out = this.clone();
		for (let i = 0; i < out.length; i++) {
			out[i] = (out[i] ?? 0) * scalar;
		}

		return out;
	}

	/**
	 * Add this matrix to another after multiplying the other by a scalar.
	 * @param matrix - The other matrix.
	 * @param scalar - The scalar.
	 * @returns The sum.
	 * @see {@link https://en.wikipedia.org/wiki/Matrix_addition | Matrix addition}
	 * @see {@link https://en.wikipedia.org/wiki/Matrix_multiplication | Matrix multiplication}
	 */
	public multiplyScalarAndAdd(matrix: MatrixLike, scalar: number): SlowMatrix {
		if (
			!isSized(matrix) ||
			this.width !== matrix.width ||
			this.height !== matrix.height
		) {
			throw new MatrixSizeError();
		}

		const scaled: SizedMatrixLike = {
			height: matrix.height,
			width: matrix.width
		};
		for (let i = 0; i < matrix.width * matrix.height; i++) {
			scaled[i] = (matrix[i] ?? 0) * scalar;
		}

		return this.add(scaled);
	}

	/**
	 * Subtract another matrix from this one.
	 * @param matrix - The other matrix.
	 * @returns The difference between the matrices.
	 * @see {@link https://en.wikipedia.org/wiki/Matrix_addition | Matrix addition}
	 */
	public subtract(matrix: MatrixLike): SlowMatrix {
		if (
			!isSized(matrix) ||
			this.width !== matrix.width ||
			this.height !== matrix.height
		) {
			throw new MatrixSizeError();
		}

		const cols: number[][] = [];
		for (let x = 0; x < this.width; x++) {
			for (let y = 0; y < this.height; y++) {
				const i = x * this.height + y;
				(cols[x] ??= [])[y] = (this[i] ?? 0) - (matrix[i] ?? 0);
			}
		}

		return new SlowMatrix(...cols);
	}

	/**
	 * Transpose this matrix.
	 * @returns The transpose of this matrix.
	 * @see {@link https://en.wikipedia.org/wiki/Transpose | Transpose}
	 */
	public transpose(): SlowMatrix {
		const cols: number[][] = [];
		for (let x = 0; x < this.width; x++) {
			for (let y = 0; y < this.height; y++) {
				(cols[y] ??= [])[x] = this[x * this.height + y] ?? 0;
			}
		}

		return new SlowMatrix(...cols);
	}
}
