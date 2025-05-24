import type { default as Matrix, MatrixLike } from "./Matrix.js";
import MatrixSizeError from "../utility/MatrixSizeError.js";
import PartialMatrixError from "../utility/PartialMatrixError.js";
import epsilon from "../utility/epsilon.js";

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
		const firstColumn = cols[0];
		if (typeof firstColumn === "undefined") {
			throw new PartialMatrixError();
		}
		this.height = this.width && firstColumn.length;

		if (this.width < 1 || this.height < 1) {
			throw new MatrixSizeError();
		}

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
		const matrixWidth = "width" in matrix ? (matrix.width as number) : 1;
		const matrixHeight = "height" in matrix ? (matrix.height as number) : 1;
		if (this.width !== matrixWidth || this.height !== matrixHeight) {
			throw new MatrixSizeError();
		}

		const cols: number[][] = [];
		for (let x = 0; x < this.width; x++) {
			for (let y = 0; y < this.height; y++) {
				const a = this[x * this.height + y];
				const b = matrix[x * matrixHeight + y];
				if (typeof a === "undefined" || typeof b === "undefined") {
					throw new PartialMatrixError();
				}
				(cols[x] ??= [])[y] = a + b;
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
				const a = this[x * this.height + y];
				if (typeof a === "undefined") {
					throw new PartialMatrixError();
				}
				(cols[x] ??= [])[y] = a;
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
		const matrixWidth = "width" in matrix ? (matrix.width as number) : 1;
		const matrixHeight = "height" in matrix ? (matrix.height as number) : 1;
		if (this.width !== matrixWidth || this.height !== matrixHeight) {
			throw new MatrixSizeError();
		}

		for (let x = 0; x < this.width; x++) {
			for (let y = 0; y < this.height; y++) {
				const a = matrix[x * this.height + y];
				if (typeof a === "undefined") {
					throw new PartialMatrixError();
				}
				this[x * this.width + y] = a;
			}
		}

		return this;
	}

	/**
	 * Determine whether or not this matrix is roughly equivalent to another.
	 * @param matrix - The other matrix.
	 * @returns Whether or not the matrices are equivalent.
	 */
	public equals(matrix: MatrixLike): boolean {
		const matrixWidth = "width" in matrix ? (matrix.width as number) : 1;
		const matrixHeight = "height" in matrix ? (matrix.height as number) : 1;
		if (this.width !== matrixWidth || this.height !== matrixHeight) {
			return false;
		}

		for (let i = 0; i < this.length; i++) {
			const a = this[i];
			const b = matrix[i];
			if (typeof a === "undefined" || typeof b === "undefined") {
				throw new PartialMatrixError();
			}
			if (Math.abs(a - b) > epsilon) {
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
		const matrixWidth = "width" in matrix ? (matrix.width as number) : 1;
		const matrixHeight = "height" in matrix ? (matrix.height as number) : 1;
		if (this.width !== matrixWidth || this.height !== matrixHeight) {
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
		const matrixWidth = "width" in matrix ? (matrix.width as number) : 1;
		const matrixHeight = "height" in matrix ? (matrix.height as number) : 1;
		if (this.width !== matrixHeight) {
			throw new MatrixSizeError();
		}

		const n = this.height;
		const m = this.width;
		const p = matrixWidth;

		const out: number[][] = [];
		for (let i = 0; i < n; i++) {
			for (let j = 0; j < p; j++) {
				let sum = 0;
				for (let k = 0; k < m; k++) {
					const a = this[k * this.height + i];
					const b = matrix[j * matrixHeight + k];
					if (typeof a === "undefined" || typeof b === "undefined") {
						throw new PartialMatrixError();
					}
					sum += a * b;
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
			const a = out[i];
			if (typeof a === "undefined") {
				throw new PartialMatrixError();
			}
			out[i] = a * scalar;
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
		if (!("multiplyScalar" in matrix)) {
			throw new Error();
		}
		return this.add(
			(matrix.multiplyScalar as (scalar: number) => SlowMatrix)(scalar)
		);
	}

	/**
	 * Subtract another matrix from this one.
	 * @param matrix - The other matrix.
	 * @returns The difference between the matrices.
	 * @see {@link https://en.wikipedia.org/wiki/Matrix_addition | Matrix addition}
	 */
	public subtract(matrix: MatrixLike): SlowMatrix {
		const matrixWidth = "width" in matrix ? (matrix.width as number) : 1;
		const matrixHeight = "height" in matrix ? (matrix.height as number) : 1;
		if (this.width !== matrixWidth || this.height !== matrixHeight) {
			throw new MatrixSizeError();
		}

		const cols: number[][] = [];
		for (let x = 0; x < this.width; x++) {
			for (let y = 0; y < this.height; y++) {
				const a = this[x * this.height + y];
				const b = matrix[x * matrixHeight + y];
				if (typeof a === "undefined" || typeof b === "undefined") {
					throw new PartialMatrixError();
				}
				(cols[x] ??= [])[y] = a - b;
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
				const a = this[x * this.height + y];
				if (typeof a === "undefined") {
					throw new PartialMatrixError();
				}
				(cols[y] ??= [])[x] = a;
			}
		}

		return new SlowMatrix(...cols);
	}
}
