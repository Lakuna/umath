/** A complex number that is commonly used to describe transformations. */
export type DualQuaternionLike = DualQuaternion | [number, number, number, number, number, number, number, number];

/**
 * A complex number that is commonly used to describe transformations.
 * @see [Wikipedia](https://en.wikipedia.org/wiki/Dual_quaternion)
 */
export default class DualQuaternion extends Float32Array {
    /**
     * Creates a dual quaternion with the given values.
     * @param x1 The first real component.
     * @param y1 The second real component.
     * @param z1 The third real component.
     * @param w1 The fourth real component.
     * @param x2 The first dual component.
     * @param y2 The second dual component.
     * @param z2 The third dual component.
     * @param w2 The fourth dual component.
     * @returns A new dual quaternion.
     */
    public static fromValues(x1: number, y1: number, z1: number, w1: number, x2: number, y2: number, z2: number, w2: number): DualQuaternion;

    /**
     * Creates a quaternion with the given values.
     * @param x1 The first real component.
     * @param y1 The second real component.
     * @param z1 The third real component.
     * @param w1 The fourth real component.
     * @param x2 The first dual component.
     * @param y2 The second dual component.
     * @param z2 The third dual component.
     * @param w2 The fourth dual component.
     * @param out The quaternion to store the result in.
     * @returns A new quaternion.
     */
    public static fromValues<T extends DualQuaternionLike>(x1: number, y1: number, z1: number, w1: number, x2: number, y2: number, z2: number, w2: number, out: T): T;

    public static fromValues<T extends DualQuaternionLike>(x1: number, y1: number, z1: number, w1: number, x2: number, y2: number, z2: number, w2: number, out: T = new DualQuaternion() as T): T {
        out[0] = x1;
        out[1] = y1;
        out[2] = z1;
        out[3] = w1;
        out[4] = x2;
        out[5] = y2;
        out[6] = z2;
        out[7] = w2;
        return out;
    }

    /** Creates an identity dual quaternion. */
    public constructor() {
        super(8);
        this[3] = 1;
    }

    /**
     * Creates a copy of this dual quaternion.
     * @returns A copy of this dual quaternion.
     */
    public clone(): DualQuaternion {
        const out: DualQuaternion = new DualQuaternion();
        out[0] = this[0] as number;
        out[1] = this[1] as number;
        out[2] = this[2] as number;
        out[3] = this[3] as number;
        out[4] = this[4] as number;
        out[5] = this[5] as number;
        out[6] = this[6] as number;
        out[7] = this[7] as number;
        return out;
    }

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
