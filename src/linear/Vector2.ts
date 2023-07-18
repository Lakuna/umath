import { epsilon, type Vector } from "@lakuna/umath";
import type { Matrix2Like } from "@lakuna/umath/Matrix2";
import type { Matrix3Like } from "@lakuna/umath/Matrix3";
import type { Matrix4Like } from "@lakuna/umath/Matrix4";
import Vector3, { type Vector3Like } from "@lakuna/umath/Vector3";

/** A quantity with magnitude and direction in two dimensions. */
export type Vector2Like = Vector2 | [number, number];

/**
 * Creates a vector with the given values.
 * @param x The first component.
 * @param y The second component.
 * @param out The vector to store the result in.
 * @returns A new vector.
 */
export function fromValues<T extends Vector2Like>(x: number, y: number, out: T): T {
	out[0] = x;
	out[1] = y;
	return out;
}

/**
 * Determines whether two vectors are roughly equivalent.
 * @param a The first vector.
 * @param b The second vector.
 * @returns Whether the vectors are equivalent.
 */
export function equals(a: Vector2Like, b: Vector2Like): boolean {
	const a0: number = a[0];
	const a1: number = a[1];

	const b0: number = b[0];
	const b1: number = b[1];

	return Math.abs(a0 - b0) <= epsilon * Math.max(1, Math.abs(a0), Math.abs(b0))
		&& Math.abs(a1 - b1) <= epsilon * Math.max(1, Math.abs(a1), Math.abs(b1));
}

/**
 * Determines whether two vectors are exactly equivalent.
 * @param a The first vector.
 * @param b The second vector.
 * @returns Whether the vectors are equivalent.
 */
export function exactEquals(a: Vector2Like, b: Vector2Like): boolean {
	return a[0] == b[0]
		&& a[1] == b[1];
}

/**
 * Adds two vectors.
 * @param a The augend.
 * @param b The addend.
 * @param out The vector to store the result in.
 * @returns The sum.
 */
export function add<T extends Vector2Like>(a: Vector2Like, b: Vector2Like, out: T): T {
	out[0] = a[0] + b[0];
	out[1] = a[1] + b[1];
	return out;
}

/**
 * Copies the values of one vector into another.
 * @param vector The vector to copy.
 * @param out The vector to store the result in.
 * @returns The copy.
 */
export function copy<T extends Vector2Like>(vector: Vector2Like, out: T): T {
	out[0] = vector[0];
	out[1] = vector[1];
	return out;
}

/**
 * Multiplies the components in one vector by the corresponding components in another.
 * @param a The multiplicand.
 * @param b The multiplier.
 * @param out The vector to store the result in.
 * @returns The product.
 */
export function multiply<T extends Vector2Like>(a: Vector2Like, b: Vector2Like, out: T): T {
	out[0] = a[0] * b[0];
	out[1] = a[1] * b[1];
	return out;
}

/**
 * Divides one vector by another.
 * @param a The dividend.
 * @param b The divisor.
 * @param out The vector to store the result in.
 * @returns The quotient.
 */
export function divide<T extends Vector2Like>(a: Vector2Like, b: Vector2Like, out: T): T {
	out[0] = a[0] / b[0];
	out[1] = a[1] / b[1];
	return out;
}

/**
 * Subtracts one vector from another.
 * @param a The minuend.
 * @param b The subtrahend.
 * @param out The vector to store the result in.
 * @returns The difference.
 */
export function subtract<T extends Vector2Like>(a: Vector2Like, b: Vector2Like, out: T): T {
	out[0] = a[0] - b[0];
	out[1] = a[1] - b[1];
	return out;
}

/**
 * Rounds up the components of a vector.
 * @param vector The vector.
 * @param out The vector to store the result in.
 * @returns The rounded vector.
 */
export function ceil<T extends Vector2Like>(vector: Vector2Like, out: T): T {
	out[0] = Math.ceil(vector[0]);
	out[1] = Math.ceil(vector[1]);
	return out;
}

/**
 * Rounds down the components of a vector.
 * @param vector The vector.
 * @param out The vector to store the result in.
 * @returns The rounded vector.
 */
export function floor<T extends Vector2Like>(vector: Vector2Like, out: T): T {
	out[0] = Math.floor(vector[0]);
	out[1] = Math.floor(vector[1]);
	return out;
}

/**
 * Rounds the components of a vector.
 * @param vector The vector.
 * @param out The vector to store the result in.
 * @returns The rounded vector.
 */
export function round<T extends Vector2Like>(vector: Vector2Like, out: T): T {
	out[0] = Math.round(vector[0]);
	out[1] = Math.round(vector[1]);
	return out;
}

/**
 * Returns the minimum of two vectors.
 * @param a The first vector.
 * @param b The second vector.
 * @param out The vector to store the result in.
 * @returns The minimum.
 */
export function min<T extends Vector2Like>(a: Vector2Like, b: Vector2Like, out: T): T {
	out[0] = Math.min(a[0], b[0]);
	out[1] = Math.min(a[1], b[1]);
	return out;
}

/**
 * Returns the maximum of two vectors.
 * @param a The first vector.
 * @param b The second vector.
 * @param out The vector to store the result in.
 * @returns The minimum.
 */
export function max<T extends Vector2Like>(a: Vector2Like, b: Vector2Like, out: T): T {
	out[0] = Math.max(a[0], b[0]);
	out[1] = Math.max(a[1], b[1]);
	return out;
}

/**
 * Multiplies a vector by a scalar.
 * @param vector The multiplicand.
 * @param scalar The multiplier.
 * @param out The vector to store the result in.
 * @returns The product.
 */
export function scale<T extends Vector2Like>(vector: Vector2Like, scalar: number, out: T): T {
	out[0] = vector[0] * scalar;
	out[1] = vector[1] * scalar;
	return out;
}

/**
 * Adds two vectors after multiplying the latter by a scalar.
 * @param a The augend.
 * @param b The addend.
 * @param scalar The multiplier.
 * @param out The vector to store the result in.
 * @returns The sum.
 */
export function scaleAndAdd<T extends Vector2Like>(a: Vector2Like, b: Vector2Like, scalar: number, out: T): T {
	out[0] = a[0] + b[0] * scalar;
	out[1] = a[1] + b[1] * scalar;
	return out;
}

/**
 * Calculates the Euclidean distance from one vector to another.
 * @param a The first vector.
 * @param b The second vector.
 * @returns The distance.
 * @see [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance)
 */
export function distance(a: Vector2Like, b: Vector2Like): number {
	const x: number = b[0] - a[0];
	const y: number = b[1] - a[1];
	return Math.hypot(x, y);
}

/**
 * Calculates the squared Euclidean distance from one vector to another.
 * @param a The first vector.
 * @param b The other vector.
 * @returns The squared distance.
 * @see [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance)
 */
export function squaredDistance(a: Vector2Like, b: Vector2Like): number {
	const x: number = b[0] - a[0];
	const y: number = b[1] - a[1];
	return x * x + y * y;
}

/**
 * The magnitude (length) of a vector.
 * @param vector The vector.
 * @returns The magnitude.
 */
export function magnitude(vector: Vector2Like): number {
	const x: number = vector[0];
	const y: number = vector[1];
	return Math.hypot(x, y);
}

/**
 * The squared magnitude (length) of a vector.
 * @param vector The vector.
 * @returns The squared magnitude.
 */
export function squaredMagnitude(vector: Vector2Like): number {
	const x: number = vector[0];
	const y: number = vector[1];
	return x * x + y * y;
}

/**
 * Negates a vector.
 * @param vector The vector.
 * @param out The vector to store the result in.
 * @returns The negated vector.
 */
export function negate<T extends Vector2Like>(vector: Vector2Like, out: T): T {
	out[0] = -vector[0];
	out[1] = -vector[1];
	return out;
}

/**
 * Calculates the multiplicative inverse of the components of a vector.
 * @param vector The vector.
 * @param out The vector to store the result in.
 * @returns The inverted vector.
 */
export function inverse<T extends Vector2Like>(vector: Vector2Like, out: T): T {
	out[0] = 1 / vector[0];
	out[1] = 1 / vector[1];
	return out;
}

/**
 * Normalizes a vector.
 * @param vector The vector.
 * @param out The vector to store the result in.
 * @returns The normalized vector.
 * @see [Unit vector](https://en.wikipedia.org/wiki/Unit_vector)
 */
export function normalize<T extends Vector2Like>(vector: Vector2Like, out: T): T {
	const x: number = vector[0];
	const y: number = vector[1];
	
	let len: number = x * x + y * y;
	if (len > 0) {
		len = 1 / Math.sqrt(len);
	}

	out[0] = x * len;
	out[1] = y * len;
	return out;
}

/**
 * Calculates the dot product of two vectors.
 * @param a The multiplicand.
 * @param b The multiplier.
 * @returns The dot product.
 * @see [Dot product](https://en.wikipedia.org/wiki/Dot_product)
 */
export function dot(a: Vector2Like, b: Vector2Like): number {
	return a[0] * b[0] + a[1] * b[1];
}

/**
 * Calculates the cross product of two vectors.
 * @param a The multiplicand.
 * @param b The multiplier.
 * @param out The vector to store the result in.
 * @returns The cross product.
 * @see [Cross product](https://en.wikipedia.org/wiki/Cross_product)
 */
export function cross<T extends Vector3Like>(a: Vector2Like, b: Vector2Like, out: T): T {
	out[0] = 0;
	out[1] = 0;
	out[2] = a[0] * b[1] - a[1] * b[0];
	return out;
}

/**
 * Performs a linear interpolation between two vectors.
 * @param a The first vector.
 * @param b The second vector.
 * @param t The interpolation amount (in `[0,1]`).
 * @param out The vector to store the result in.
 * @returns The interpolated vector.
 * @see [Linear interpolation](https://en.wikipedia.org/wiki/Linear_interpolation)
 */
export function lerp<T extends Vector2Like>(a: Vector2Like, b: Vector2Like, t: number, out: T): T {
	const ax: number = a[0];
	const ay: number = a[1];

	out[0] = ax + t * (b[0] - ax);
	out[1] = ay + t * (b[1] - ay);
	return out;
}

/**
 * Sets a vector to a random value with the given magnitude.
 * @param magnitude The magnitude.
 * @param out The vector to store the result in.
 * @returns The vector.
 */
export function random<T extends Vector2Like>(magnitude = 1, out: T): T {
	const r: number = Math.random() * 2 * Math.PI;

	out[0] = Math.cos(r) * magnitude;
	out[1] = Math.sin(r) * magnitude;
	return out;
}

/**
 * Transforms a vector by a two-by-two matrix.
 * @param vector The vector.
 * @param matrix The matrix.
 * @param out The vector to store the result in.
 * @returns The transformed vector.
 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
 */
export function transformMatrix2<T extends Vector2Like>(vector: Vector2Like, matrix: Matrix2Like, out: T): T {
	const x: number = vector[0];
	const y: number = vector[1];

	out[0] = matrix[0] * x + matrix[2] * y;
	out[1] = matrix[1] * x + matrix[3] * y;
	return out;
}

/**
 * Transforms a vector by a three-by-three matrix.
 * @param vector The vector.
 * @param matrix The matrix.
 * @param out The vector to store the result in.
 * @returns The transformed vector.
 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
 */
export function transformMatrix3<T extends Vector2Like>(vector: Vector2Like, matrix: Matrix3Like, out: T): T {
	const x: number = vector[0] as number;
	const y: number = vector[1] as number;

	out[0] = matrix[0] * x + matrix[3] * y + matrix[6];
	out[1] = matrix[1] * x + matrix[4] * y + matrix[7];
	return out;
}

/**
 * Transforms a vector by a four-by-four matrix.
 * @param vector The vector.
 * @param matrix The matrix.
 * @param out The vector to store the result in.
 * @returns The transformed vector.
 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
 */
export function transformMatrix4<T extends Vector2Like>(vector: Vector2Like, matrix: Matrix4Like, out: T): T {
	const x: number = vector[0] as number;
	const y: number = vector[1] as number;

	out[0] = matrix[0] * x + matrix[4] * y + matrix[12];
	out[1] = matrix[1] * x + matrix[5] * y + matrix[13];
	return out;
}

/**
 * Rotates a vector.
 * @param vector The vector.
 * @param origin The origin of the rotation.
 * @param radians The angle of rotation in radians.
 * @param out The vector to store the result in.
 * @returns The rotated vector.
 */
export function rotate<T extends Vector2Like>(vector: Vector2Like, origin: Vector2Like, radians: number, out: T): T {
	const o0: number = origin[0];
	const o1: number = origin[1];

	const p0: number = vector[0] - o0;
	const p1: number = vector[1] - o1;

	const s: number = Math.sin(radians);
	const c: number = Math.cos(radians);
	
	out[0] = p0 * c - p1 * s + o0;
	out[1] = p0 * s + p1 * c + o1;
	return out;
}

/**
 * Gets the angle from one vector to another in radians.
 * @param a The first vector.
 * @param b The second vector.
 * @returns The angular distance.
 */
export function angle(a: Vector2Like, b: Vector2Like): number {
	const x1: number = a[0];
	const y1: number = a[1];

	const x2: number = b[0];
	const y2: number = b[1];

	const magnitudeProduct: number = Math.sqrt(x1 * x1 + y1 * y1) * Math.sqrt(x2 * x2 + y2 * y2);
	const c: number = magnitudeProduct && (x1 * x2 + y1 * y2) / magnitudeProduct;
	return Math.acos(Math.min(Math.max(c, -1), 1));
}

/**
 * Sets a vector to the zero vector.
 * @param out The vector to store the result in.
 * @returns This vector.
 */
export function zero<T extends Vector2Like>(out: T): T {
	out[0] = 0;
	out[1] = 0;
	return out;
}

/**
 * A quantity with magnitude and direction in two dimensions.
 * @see [Euclidean vector](https://en.wikipedia.org/wiki/Euclidean_vector)
 */
export default class Vector2 extends Float32Array implements Vector {
    /**
     * Creates a vector with the given values.
     * @param x The first component.
     * @param y The second component.
     * @returns A new vector.
     */
    public static fromValues(x: number, y: number): Vector2;

    /**
     * Creates a vector with the given values.
     * @param x The first component.
     * @param y The second component.
     * @param out The vector to store the result in.
     * @returns A new vector.
     */
    public static fromValues<T extends Vector2Like>(x: number, y: number, out: T): T;

    public static fromValues<T extends Vector2Like>(x: number, y: number, out: T = new Vector2() as T): T {
        return fromValues(x, y, out);
    }

    /**
	 * Creates a two-dimensional zero vector.
	 * @see [Euclidean vector](https://en.wikipedia.org/wiki/Euclidean_vector)
	 */
    public constructor() {
        super(2);
    }

    /**
	 * Determines whether this vector is roughly equivalent to another.
	 * @param vector The other vector.
	 * @returns Whether the vectors are equivalent.
	 */
	public equals(vector: Vector2Like): boolean {
        return equals(this, vector);
    }

	/**
	 * Determines whether this vector is exactly equivalent to another.
	 * @param vector The other vector.
	 * @returns Whether the vectors are equivalent.
	 */
	public exactEquals(vector: Vector2Like): boolean {
        return exactEquals(this, vector);
    }

    /**
	 * Adds another vector to this one.
	 * @param vector The other vector.
	 * @returns The sum of the vectors.
	 */
	public add(vector: Vector2Like): Vector2;

    /**
	 * Adds another vector to this one.
	 * @param vector The other vector.
     * @param out The vector to store the result in.
	 * @returns The sum of the vectors.
	 */
	public add<T extends Vector2Like>(vector: Vector2Like, out: T): T;

	public add<T extends Vector2Like>(vector: Vector2Like, out: T = new Vector2() as T): T {
		return add(this, vector, out);
	}

	/**
	 * Creates a copy of this vector.
	 * @returns A copy of this vector.
	 */
	public clone(): Vector2 {
		const out: Vector2 = new Vector2();
		out[0] = this[0] as number;
		out[1] = this[1] as number;
		return out;
	}

    /**
	 * Copies the values of another vector into this one.
	 * @param vector The vector to copy.
	 * @returns This vector.
	 */
	public copy(vector: Vector2Like): this {
		return copy(vector, this);
	}

    /**
	 * Multiplies the components in this vector by the corresponding components in another.
	 * @param vector The other vector.
	 * @returns The product of the vectors.
	 */
	public multiply(vector: Vector2Like): Vector2;

    /**
	 * Multiplies the components in this vector by the corresponding components in another.
	 * @param vector The other vector.
     * @param out The vector to store the result in.
	 * @returns The product of the vectors.
	 */
	public multiply<T extends Vector2Like>(vector: Vector2Like, out: T): T;

	public multiply<T extends Vector2Like>(vector: Vector2Like, out: T = new Vector2() as T): T {
		return multiply(this, vector, out);
	}

    /**
	 * Divides this vector by another.
	 * @param vector The other vector.
	 * @returns The quotient of the vectors.
	 */
	public divide(vector: Vector2Like): Vector2;

     /**
	 * Divides this vector by another.
	 * @param vector The other vector.
     * @param out The vector to store the result in.
	 * @returns The quotient of the vectors.
	 */
	public divide<T extends Vector2Like>(vector: Vector2Like, out: T): T;

	public divide<T extends Vector2Like>(vector: Vector2Like, out: T = new Vector2() as T): T {
		return divide(this, vector, out);
	}

    /**
	 * Subtracts another vector from this one.
	 * @param vector The other vector.
	 * @returns The difference between the vectors.
	 */
	public subtract(vector: Vector2Like): Vector2;

    /**
	 * Subtracts another vector from this one.
	 * @param vector The other vector.
     * @param out The vector to store the result in.
	 * @returns The difference between the vectors.
	 */
	public subtract<T extends Vector2Like>(vector: Vector2Like, out: T): T;

	public subtract<T extends Vector2Like>(vector: Vector2Like, out: T = new Vector2() as T): T {
		return subtract(this, vector, out);
	}

	/**
	 * Rounds up the components of this vector.
	 * @returns The rounded vector.
	 */
	public ceil(): Vector2;

    /**
	 * Rounds up the components of this vector.
     * @param out The vector to store the result in.
	 * @returns The rounded vector.
	 */
	public ceil<T extends Vector2Like>(out: T): T;

    public ceil<T extends Vector2Like>(out: T = new Vector2() as T): T {
        return ceil(this, out);
    }

	/**
	 * Rounds down the components of this vector.
	 * @returns The rounded vector.
	 */
	public floor(): Vector2;

    /**
	 * Rounds down the components of this vector.
     * @param out The vector to store the result in.
	 * @returns The rounded vector.
	 */
	public floor<T extends Vector2Like>(out: T): T;

    public floor<T extends Vector2Like>(out: T = new Vector2() as T): T {
        return floor(this, out);
    }

	/**
	 * Rounds the components of this vector.
	 * @returns The rounded vector.
	 */
	public round(): Vector2;

    /**
	 * Rounds the components of this vector.
     * @param out The vector to store the result in.
	 * @returns The rounded vector.
	 */
	public round<T extends Vector2Like>(out: T): T;

    public round<T extends Vector2Like>(out: T = new Vector2() as T): T {
        return round(this, out);
    }

	/**
	 * Returns the minimum of this and another vector.
	 * @param vector The other vector.
	 * @returns The minimum.
	 */
	public min(vector: Vector2Like): Vector2;

    /**
	 * Returns the minimum of this and another vector.
	 * @param vector The other vector.
     * @param out The vector to store the result in.
	 * @returns The minimum.
	 */
	public min<T extends Vector2Like>(vector: Vector2Like, out: T): T;

    public min<T extends Vector2Like>(vector: Vector2Like, out: T = new Vector2() as T): T {
        return min(this, vector, out);
    }

	/**
	 * Returns the maximum of this and another vector.
	 * @param vector The other vector.
	 * @returns The minimum.
	 */
	public max(vector: Vector2Like): Vector2;

    /**
	 * Returns the maximum of this and another vector.
	 * @param vector The other vector.
     * @param out The vector to store the result in.
	 * @returns The minimum.
	 */
	public max<T extends Vector2Like>(vector: Vector2Like, out: T): T;

    public max<T extends Vector2Like>(vector: Vector2Like, out: T = new Vector2() as T): T {
        return max(this, vector, out);
    }

	/**
	 * Scales this vector by a scalar.
	 * @param scalar The scalar.
	 * @returns The scaled vector.
	 */
	public scale(scalar: number): Vector2;

    /**
	 * Scales this vector by a scalar.
	 * @param scalar The scalar.
     * @param out The vector to store the result in.
	 * @returns The scaled vector.
	 */
	public scale<T extends Vector2Like>(scalar: number, out: T): T;

    public scale<T extends Vector2Like>(scalar: number, out: T = new Vector2() as T): T {
        return scale(this, scalar, out);
    }

	/**
	 * Adds another vector to this one after scaling the other by a scalar.
	 * @param vector The other vector.
	 * @param scalar The scalar.
	 * @returns The sum.
	 */
	public scaleAndAdd(vector: Vector2Like, scalar: number): Vector2;

    /**
	 * Adds another vector to this one after scaling the other by a scalar.
	 * @param vector The other vector.
	 * @param scalar The scalar.
     * @param out The vector to store the result in.
	 * @returns The sum.
	 */
	public scaleAndAdd<T extends Vector2Like>(vector: Vector2Like, scalar: number, out: T): T;

    public scaleAndAdd<T extends Vector2Like>(vector: Vector2Like, scalar: number, out: T = new Vector2() as T): T {
        return scaleAndAdd(this, vector, scalar, out);
    }

	/**
	 * Calculates the Euclidean distance from this vector to another.
	 * @param vector The other vector.
	 * @returns The distance.
	 * @see [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance)
	 */
	public distance(vector: Vector2Like): number {
        return distance(this, vector);
    }

	/**
	 * Calculates the squared Euclidean distance from this vector to another.
	 * @param vector The other vector.
	 * @returns The squared distance.
	 * @see [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance)
	 */
	public squaredDistance(vector: Vector2Like): number {
        return squaredDistance(this, vector);
    }

	/** The magnitude (length) of this vector. */
	public get magnitude(): number {
        return magnitude(this);
    }

	/** The squared magnitude (length) of this vector. */
	public get squaredMagnitude(): number {
        return squaredMagnitude(this);
    }

	/**
	 * Negates this vector.
	 * @returns The negated vector.
	 */
	public negate(): Vector2;

    /**
	 * Negates this vector.
     * @param out The vector to store the result in.
	 * @returns The negated vector.
	 */
	public negate<T extends Vector2Like>(out: T): T;

    public negate<T extends Vector2Like>(out: T = new Vector2() as T): T {
        return negate(this, out);
    }

    /**
	 * Calculates the multiplicative inverse of the components of this vector.
	 * @returns The inverted vector.
	 */
	public inverse(): Vector2;

    /**
	 * Calculates the multiplicative inverse of the components of this vector.
     * @param out The vector to store the result in.
	 * @returns The inverted vector.
	 */
	public inverse<T extends Vector2Like>(out: T): T;

    public inverse<T extends Vector2Like>(out: T = new Vector2() as T): T {
        return inverse(this, out);
    }

    /**
	 * Normalizes this vector.
	 * @returns The normalized vector.
	 * @see [Unit vector](https://en.wikipedia.org/wiki/Unit_vector)
	 */
	public normalize(): Vector2;

    /**
	 * Normalizes this vector.
     * @param out The vector to store the result in.
	 * @returns The normalized vector.
	 * @see [Unit vector](https://en.wikipedia.org/wiki/Unit_vector)
	 */
	public normalize<T extends Vector2Like>(out: T): T;

    public normalize<T extends Vector2Like>(out: T = new Vector2() as T): T {
        return normalize(this, out);
    }

	/**
	 * Calculates the dot product of this and another vector.
	 * @param vector The other vector.
	 * @returns The dot product.
	 * @see [Dot product](https://en.wikipedia.org/wiki/Dot_product)
	 */
	public dot(vector: Vector2Like): number {
        return dot(this, vector);
    }

    /**
	 * Calculates the cross product of this and another vector.
	 * @param vector The other vector.
	 * @returns The cross product.
	 * @see [Cross product](https://en.wikipedia.org/wiki/Cross_product)
	 */
	public cross(vector: Vector2Like): Vector3;

    /**
	 * Calculates the cross product of this and another vector.
	 * @param vector The other vector.
     * @param out The vector to store the result in.
	 * @returns The cross product.
	 * @see [Cross product](https://en.wikipedia.org/wiki/Cross_product)
	 */
	public cross<T extends Vector3Like>(vector: Vector2Like, out: T): T;

    public cross<T extends Vector3Like>(vector: Vector2Like, out: T = new Vector3() as T): T {
        return cross(this, vector, out);
    }

	/**
	 * Performs a linear interpolation between this and another vector.
	 * @param vector The other vector.
	 * @param t The interpolation amount (in `[0,1]`).
	 * @returns The interpolated vector.
	 * @see [Linear interpolation](https://en.wikipedia.org/wiki/Linear_interpolation)
	 */
	public lerp(vector: Vector2Like, t: number): Vector2;

    /**
	 * Performs a linear interpolation between this and another vector.
	 * @param vector The other vector.
	 * @param t The interpolation amount (in `[0,1]`).
     * @param out The vector to store the result in.
	 * @returns The interpolated vector.
	 * @see [Linear interpolation](https://en.wikipedia.org/wiki/Linear_interpolation)
	 */
	public lerp<T extends Vector2Like>(vector: Vector2Like, t: number, out: T): T;

    public lerp<T extends Vector2Like>(vector: Vector2Like, t: number, out: T = new Vector2() as T): T {
        return lerp(this, vector, t, out);
    }

	/**
	 * Sets this vector to a random value with the given magnitude.
	 * @param magnitude The magnitude.
	 * @returns This vector.
	 */
	public random(magnitude = 1): this {
        return random(magnitude, this);
    }

	/**
	 * Transforms this vector by a two-by-two matrix.
	 * @param matrix The matrix.
	 * @returns The transformed vector.
	 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
	 */
	public transformMatrix2(matrix: Matrix2Like): Vector2;

    /**
	 * Transforms this vector by a two-by-two matrix.
	 * @param matrix The matrix.
     * @param out The vector to store the result in.
	 * @returns The transformed vector.
	 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
	 */
	public transformMatrix2<T extends Vector2Like>(matrix: Matrix2Like, out: T): T;

    public transformMatrix2<T extends Vector2Like>(matrix: Matrix2Like, out: T = new Vector2() as T): T {
        return transformMatrix2(this, matrix, out);
    }

    /**
	 * Transforms this vector by a three-by-three matrix.
	 * @param matrix The matrix.
	 * @returns The transformed vector.
	 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
	 */
	public transformMatrix3(matrix: Matrix3Like): Vector2;

    /**
	 * Transforms this vector by a three-by-three matrix.
	 * @param matrix The matrix.
     * @param out The vector to store the result in.
	 * @returns The transformed vector.
	 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
	 */
	public transformMatrix3<T extends Vector2Like>(matrix: Matrix3Like, out: T): T;

    public transformMatrix3<T extends Vector2Like>(matrix: Matrix3Like, out: T = new Vector2() as T): T {
        return transformMatrix3(this, matrix, out);
    }

    /**
	 * Transforms this vector by a four-by-four matrix.
	 * @param matrix The matrix.
	 * @returns The transformed vector.
	 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
	 */
	public transformMatrix4(matrix: Matrix4Like): Vector2;

    /**
	 * Transforms this vector by a four-by-four matrix.
	 * @param matrix The matrix.
     * @param out The vector to store the result in.
	 * @returns The transformed vector.
	 * @see [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
	 */
	public transformMatrix4<T extends Vector2Like>(matrix: Matrix4Like, out: T): T;

    public transformMatrix4<T extends Vector2Like>(matrix: Matrix4Like, out: T = new Vector2() as T): T {
        return transformMatrix4(this, matrix, out);
    }

    /**
     * Rotates this vector.
     * @param origin The origin of the rotation.
     * @param radians The angle of rotation in radians.
     * @returns The rotated vector.
     */
    public rotate(origin: Vector2Like, radians: number): Vector2;

    /**
     * Rotates this vector.
     * @param origin The origin of the rotation.
     * @param radians The angle of rotation in radians.
     * @param out The vector to store the result in.
     * @returns The rotated vector.
     */
    public rotate<T extends Vector2Like>(origin: Vector2Like, radians: number, out: T): T;

    public rotate<T extends Vector2Like>(origin: Vector2Like, radians: number, out: T = new Vector2() as T): T {
        return rotate(this, origin, radians, out);
    }

    /**
     * Gets the angle from this to another vector in radians.
     * @param vector The other vector.
     * @returns The angular distance.
     */
    public angle(vector: Vector2Like): number {
        return angle(this, vector);
    }

	/**
	 * Sets this to the zero vector.
	 * @returns This vector.
	 */
	public zero(): this {
        return zero(this);
    }
}
