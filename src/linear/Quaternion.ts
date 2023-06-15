/** A complex number that is commonly used to describe rotations. */
export type QuaternionLike = Quaternion | [number, number, number, number];

/**
 * A complex number that is commonly used to describe rotations.
 * @see [Wikipedia](https://en.wikipedia.org/wiki/Quaternion)
 */
export default class Quaternion extends Float32Array { }
