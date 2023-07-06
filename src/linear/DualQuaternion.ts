/** A complex number that is commonly used to describe transformations. */
export type DualQuaternionLike = DualQuaternion | [number, number, number, number, number, number, number, number];

/**
 * A complex number that is commonly used to describe transformations.
 * @see [Wikipedia](https://en.wikipedia.org/wiki/Dual_quaternion)
 */
export default class DualQuaternion extends Float32Array {
    /** Creates an identity dual quaternion. */
    public constructor() {
        super(8);
        this[3] = 1;
    }

    // TODO: `clone`.

    // TODO: `fromValues`.

    // TODO: `fromRotationTranslationValues`.

    // TODO: `fromRotationTranslation`.

    // TODO: `fromTranslation`.

    // TODO: `fromRotation`.

    // TODO: `fromMatrix4`.

    // TODO: `copy`.

    // TODO: `identity`.

    // TODO: `get+set real`.

    // TODO: `get+set dual`.

    // TODO: `get translation`.

    // TODO: `translate`.

    // TODO: `rotateX`.

    // TODO: `rotateY`.

    // TODO: `rotateZ`.

    // TODO: `rotateByQuaternionAppend`.

    // TODO: `rotateByQuaternionPrepend`.

    // TODO: `rotateAroundAxis`.

    // TODO: `add`.

    // TODO: `multiply`.

    // TODO: `scale`.

    // TODO: `dot`.

    // TODO: `lerp`.

    // TODO: `invert`.

    // TODO: `conjugate`.

    // TODO: `get magnitude`.

    // TODO: `get squaredMagnitude`.

    // TODO: `normalize`.

    // TODO: `exactEquals`.

    // TODO: `equals`.
}
