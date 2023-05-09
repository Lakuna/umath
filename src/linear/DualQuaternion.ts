/** A complex number that is commonly used to describe rotations. */
export type DualQuaternionLike = DualQuaternion | [number, number, number, number, number, number, number, number];

/**
 * A complex number that is commonly used to describe transformations.
 * @see [Wikipedia](https://en.wikipedia.org/wiki/Dual_quaternion)
 */
export default class DualQuaternion extends Float32Array {
	// TODO
}
